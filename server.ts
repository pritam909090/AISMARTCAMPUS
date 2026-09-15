import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { CAMPUS_DATA } from "./src/data/collegeData";
import { queryCollegeDatabase, queryByCategory, CollegeCategory } from "./src/utils/collegeQueryEngine";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let lastGeminiFailureTime = 0;
const GEMINI_COOLDOWN_MS = 60000; // 60 seconds cooldown on network failure

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // Health check endpoint
  app.get("/api/health", (req, res) => {
    res.json({
      status: "ok",
      timestamp: new Date().toISOString(),
      appName: "AI Smart Campus – Student Assistant",
      hasGeminiKey: !!process.env.GEMINI_API_KEY,
    });
  });

  // College data API
  app.get("/api/college-data", (req, res) => {
    res.json(CAMPUS_DATA);
  });

  // AI Chat endpoint
  app.post("/api/chat", async (req, res) => {
    const { message, category, history } = req.body;

    // Direct Category Request (Strict category isolation without generic AI prompt)
    if (category && typeof category === "string") {
      const categoryResult = queryByCategory(category as CollegeCategory, typeof message === "string" ? message : undefined);
      return res.json({
        ...categoryResult,
        source: "direct-category",
      });
    }

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Message is required." });
    }

    const trimmed = message.trim();
    if (!trimmed) {
      return res.status(400).json({ error: "Message cannot be empty." });
    }

    // Attempt to use server-side Gemini 3.8 Flash if API key is provided and cooldown expired
    const isGeminiAvailable = !!process.env.GEMINI_API_KEY && (Date.now() - lastGeminiFailureTime > GEMINI_COOLDOWN_MS);

    if (isGeminiAvailable) {
      try {
        const ai = new GoogleGenAI({
          apiKey: process.env.GEMINI_API_KEY,
          httpOptions: {
            headers: {
              "User-Agent": "aistudio-build",
            },
          },
        });

        const systemInstruction = `You are the official AI Smart Campus Student Assistant for "${CAMPUS_DATA.collegeInfo.name}" (Demo Knowledge Base).

UPLOADED PDF DEMO KNOWLEDGE BASE:
${JSON.stringify(CAMPUS_DATA, null, 2)}

AI ANSWERING RULES (MANDATORY):
1. Answer ONLY from this uploaded knowledge base.
2. Never invent faculty, rooms, timings, contacts, notices, exam dates or other college facts.
3. If information is missing or not present in the PDF, reply exactly:
"Sorry, I don't have this information yet."
4. If asked whether the data is real, state that this document contains demo/sample information for GOVERNMENT POLYTECHNIC COLLEGE (Academic Session 2026–27 Demo).
5. Button mapping and category isolation must stay strictly category-specific:
   - Faculty → Faculty only (Never include timetable, library or notices)
   - Timetable → Timetable only (CSE 1st Sem)
   - Notices → Notices only (4 demo notices)
   - Library → Library data only
   - Facilities → Facilities only (9 facilities)
   - Exams → Exams only (Internal Assessment 1, 2, and Practical Assessment)
   - Student Services → Student Services only (6 services)
6. Clearly label responses as "Demo Data" where appropriate.`;

        // Format conversation history for Gemini
        const formattedContents: Array<{ role: string; parts: Array<{ text: string }> }> = [];

        if (Array.isArray(history) && history.length > 0) {
          // Take the last 6 turns to keep context tight and fast
          const recentHistory = history.slice(-6);
          for (const item of recentHistory) {
            if (item && item.text && typeof item.text === "string" && item.text.trim()) {
              const role = item.role === "student" || item.role === "user" ? "user" : "model";
              // Gemini API requirement: the first turn in contents MUST be 'user', not 'model'
              if (formattedContents.length === 0 && role === "model") {
                continue;
              }
              // Strictly avoid consecutive identical roles
              const lastRole = formattedContents[formattedContents.length - 1]?.role;
              if (lastRole === role) {
                continue;
              }
              formattedContents.push({
                role,
                parts: [{ text: item.text.trim() }],
              });
            }
          }
        }

        // If the last history turn was already 'user', pop it so the incoming turn doesn't cause duplicate 'user' turns
        if (formattedContents.length > 0 && formattedContents[formattedContents.length - 1].role === "user") {
          formattedContents.pop();
        }

        formattedContents.push({
          role: "user",
          parts: [{ text: trimmed }],
        });

        const geminiPromise = ai.models.generateContent({
          model: "gemini-3.8-flash",
          contents: formattedContents,
          config: {
            systemInstruction,
            temperature: 0.2, // Low temperature for high factual precision
          },
        });

        const timeoutPromise = new Promise<never>((_, reject) =>
          setTimeout(() => reject(new Error("Gemini request timed out after 4000ms")), 4000)
        );

        const response = await Promise.race([geminiPromise, timeoutPromise]);

        const aiReply = response.text?.trim();
        if (aiReply) {
          return res.json({
            text: aiReply,
            source: "gemini",
            quickActions: ["📅 Timetable", "📢 Notices", "📚 Library", "🏫 Facilities"],
          });
        }
      } catch (geminiError) {
        lastGeminiFailureTime = Date.now();
        console.warn("Gemini API call failed or timed out, falling back to local campus query engine:", (geminiError as Error).message);
        // Fall back gracefully to the verified deterministic query engine
      }
    }

    // Deterministic fallback knowledge engine
    const localResult = queryCollegeDatabase(trimmed);
    return res.json({
      ...localResult,
      source: "knowledge-engine",
    });
  });

  // Vite middleware for development vs static files for production
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`AI Smart Campus server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
