import React, { useState } from 'react';
import { Message } from './types';
import { AndroidFrame } from './components/AndroidFrame';
import { ChatHeader } from './components/ChatHeader';
import { QuickActionButtons } from './components/QuickActionButtons';
import { ChatMessageList } from './components/ChatMessageList';
import { ChatInput } from './components/ChatInput';
import { NavigationDrawer } from './components/NavigationDrawer';
import { queryCollegeDatabase, queryByCategory, CollegeCategory } from './utils/collegeQueryEngine';

export default function App() {
  const getInitialTime = () =>
    new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-msg',
      sender: 'ai',
      text: 'Hello! I am your AI Student Assistant for GOVERNMENT POLYTECHNIC COLLEGE (Demo Data). How can I help you today?',
      timestamp: getInitialTime(),
      category: 'Welcome',
      quickActions: ['📅 Timetable', '📢 Notices', '📚 Library', '🏫 Facilities'],
    },
  ]);

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [activeMenuSection, setActiveMenuSection] = useState<'menu' | 'about' | 'college-info' | 'help' | 'android-app'>('college-info');

  /**
   * Dedicated Quick Access Category Click Handler.
   * DIRECTLY queries the local collegeData category without sending a generic prompt to AI.
   * Completely eliminates cross-category bleeding and AI hallucinations.
   */
  const handleCategoryClick = (category: CollegeCategory, label: string) => {
    // 1. Directly retrieve category-isolated data from local collegeData
    const result = queryByCategory(category);

    const currentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const studentMessage: Message = {
      id: `student-${Date.now()}`,
      sender: 'student',
      text: label,
      timestamp: currentTime,
      category: result.category,
    };

    const aiMessage: Message = {
      id: `ai-${Date.now() + 1}`,
      sender: 'ai',
      text: result.text,
      timestamp: currentTime,
      category: result.category,
      quickActions: result.quickActions,
    };

    setMessages((prev) => [...prev, studentMessage, aiMessage]);
  };

  /**
   * Natural Language Chat Message Handler.
   * First checks if the prompt directly targets a category (e.g., from quick chips),
   * and routes it with category awareness.
   */
  const handleSendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isLoading) return;

    // Check if the message matches a known category label from follow-up chips or buttons
    const lower = trimmed.toLowerCase();
    if (lower === 'timetable' || lower === '📅 timetable' || lower === 'class schedule') {
      handleCategoryClick('timetable', trimmed);
      return;
    }
    if (lower === 'notices' || lower === '📢 notices' || lower === 'circulars') {
      handleCategoryClick('notices', trimmed);
      return;
    }
    if (lower === 'library' || lower === '📚 library' || lower === 'central library') {
      handleCategoryClick('library', trimmed);
      return;
    }
    if (lower === 'facilities' || lower === '🏫 facilities' || lower === 'campus facilities') {
      handleCategoryClick('facilities', trimmed);
      return;
    }
    if (lower === 'faculty' || lower === '👨‍🏫 faculty' || lower === 'faculty list' || lower === 'faculty cabins') {
      handleCategoryClick('faculty', trimmed);
      return;
    }
    if (lower === 'exams' || lower === 'exam dates' || lower === '📝 exam dates' || lower === 'examination') {
      handleCategoryClick('exams', trimmed);
      return;
    }
    if (lower === 'student services' || lower === '💳 student services' || lower === '🧑‍🎓 student services' || lower === 'services') {
      handleCategoryClick('services', trimmed);
      return;
    }
    if (lower === 'emergency contacts' || lower === '📞 emergency contacts' || lower === 'contacts') {
      handleCategoryClick('contacts', trimmed);
      return;
    }

    const studentTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const studentMessage: Message = {
      id: `student-${Date.now()}`,
      sender: 'student',
      text: trimmed,
      timestamp: studentTime,
    };

    setMessages((prev) => [...prev, studentMessage]);
    setIsLoading(true);

    try {
      // First try deterministic category-aware local query engine for verified college facts
      const localResult = queryCollegeDatabase(trimmed);

      // If local query found a specific match (not 'Not Found' and not 'Welcome'), use it immediately for 100% factual accuracy
      if (localResult.category && localResult.category !== 'Not Found' && localResult.category !== 'Welcome') {
        const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
        const aiMessage: Message = {
          id: `ai-${Date.now()}`,
          sender: 'ai',
          text: localResult.text,
          timestamp: aiTime,
          category: localResult.category,
          quickActions: localResult.quickActions,
        };
        setMessages((prev) => [...prev, aiMessage]);
        setIsLoading(false);
        return;
      }

      // If more conversational or general query, consult the backend API
      const historyPayload = messages.slice(-8).map((m) => ({
        role: m.sender,
        text: m.text,
      }));

      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4500);

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: trimmed,
          history: historyPayload,
        }),
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!res.ok) {
        throw new Error(`Server returned status ${res.status}`);
      }

      const data = await res.json();
      const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const aiMessage: Message = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: data.text || "Sorry, no information is available for this section yet.",
        timestamp: aiTime,
        category: data.category,
        quickActions: data.quickActions,
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (networkError) {
      console.warn('Chat query fallback to deterministic engine:', networkError);
      const localResult = queryCollegeDatabase(trimmed);
      const aiTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const fallbackAiMessage: Message = {
        id: `ai-local-${Date.now()}`,
        sender: 'ai',
        text: localResult.text,
        timestamp: aiTime,
        category: localResult.category,
        quickActions: localResult.quickActions,
      };

      setMessages((prev) => [...prev, fallbackAiMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    if (window.confirm('Reset conversation and clear session history?')) {
      setMessages([
        {
          id: `welcome-${Date.now()}`,
          sender: 'ai',
          text: 'Hello! How can I help you today?',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          category: 'Welcome',
          quickActions: ['📅 Timetable', '📢 Notices', '📚 Library', '🏫 Facilities'],
        },
      ]);
    }
  };

  const handleRetryLast = () => {
    const reversed = [...messages].reverse();
    const lastStudentMsg = reversed.find((m) => m.sender === 'student');
    if (lastStudentMsg) {
      handleSendMessage(lastStudentMsg.text);
    }
  };

  return (
    <AndroidFrame>
      {/* App Header */}
      <ChatHeader
        onOpenMenu={() => {
          setActiveMenuSection('college-info');
          setIsMenuOpen(true);
        }}
        onClearChat={handleClearChat}
        onOpenCollegeInfo={() => {
          setActiveMenuSection('college-info');
          setIsMenuOpen(true);
        }}
      />

      {/* Quick Action Buttons with Dedicated Category Handlers */}
      <QuickActionButtons
        onCategoryClick={handleCategoryClick}
        onSelectAction={handleSendMessage}
        disabled={isLoading}
      />

      {/* Main Conversation Message List */}
      <ChatMessageList
        messages={messages}
        isLoading={isLoading}
        onSelectAction={handleSendMessage}
        onRetryLast={handleRetryLast}
      />

      {/* Bottom Message Input Field */}
      <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />

      {/* Slide-out Navigation Drawer: About, College Information, Help */}
      <NavigationDrawer
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        activeSection={activeMenuSection}
        onNavigate={(sec) => setActiveMenuSection(sec)}
        onAskQuestion={(question) => {
          setIsMenuOpen(false);
          handleSendMessage(question);
        }}
      />
    </AndroidFrame>
  );
}
