package com.smartcampus.assistant.engine

import com.smartcampus.assistant.data.CampusData
import com.smartcampus.assistant.model.QueryResponse
import java.util.Calendar

object CampusQueryEngine {

    fun query(rawInput: String): QueryResponse {
        val query = rawInput.trim().lowercase()

        // 1. Timetable & Schedules
        if (query.contains("timetable") || query.contains("time table") || query.contains("schedule") ||
            query.contains("class") || query.contains("period") || query.contains("lecture") ||
            query.contains("slot") || query.contains("timing") || query.contains("monday") ||
            query.contains("tuesday") || query.contains("wednesday") || query.contains("thursday") ||
            query.contains("friday") || query.contains("saturday") || query.contains("today") ||
            query.contains("tomorrow")
        ) {
            val days = listOf("monday", "tuesday", "wednesday", "thursday", "friday", "saturday")
            var requestedDay: String? = null

            for (d in days) {
                if (query.contains(d)) {
                    requestedDay = d.replaceFirstChar { it.uppercase() }
                    break
                }
            }

            if (requestedDay == null && (query.contains("today") || query.contains("current day") || query == "timetable" || query == "time table" || query == "schedule")) {
                val cal = Calendar.getInstance()
                val dayOfWeek = cal.get(Calendar.DAY_OF_WEEK) // 1=Sunday, 2=Monday, ..., 7=Saturday
                requestedDay = when (dayOfWeek) {
                    Calendar.MONDAY -> "Monday"
                    Calendar.TUESDAY -> "Tuesday"
                    Calendar.WEDNESDAY -> "Wednesday"
                    Calendar.THURSDAY -> "Thursday"
                    Calendar.FRIDAY -> "Friday"
                    Calendar.SATURDAY -> "Saturday"
                    else -> "Monday" // Sunday fallback
                }
            } else if (requestedDay == null && query.contains("tomorrow")) {
                val cal = Calendar.getInstance()
                cal.add(Calendar.DAY_OF_YEAR, 1)
                val dayOfWeek = cal.get(Calendar.DAY_OF_WEEK)
                requestedDay = when (dayOfWeek) {
                    Calendar.MONDAY -> "Monday"
                    Calendar.TUESDAY -> "Tuesday"
                    Calendar.WEDNESDAY -> "Wednesday"
                    Calendar.THURSDAY -> "Thursday"
                    Calendar.FRIDAY -> "Friday"
                    Calendar.SATURDAY -> "Saturday"
                    else -> "Monday"
                }
            }

            if (requestedDay != null) {
                val dayData = CampusData.timetable.find { it.day.equals(requestedDay, ignoreCase = true) }
                if (dayData != null) {
                    val sb = StringBuilder()
                    sb.append("📅 **Timetable for ${dayData.day} (CSE 3rd Year / 5th Sem):**\n\n")
                    dayData.slots.forEach { s ->
                        if (s.type == "Break") {
                            sb.append("☕ **${s.time}** — ${s.subject} (${s.room})\n")
                        } else {
                            sb.append("• **${s.time}** | **${s.subject}** (${s.code})\n  Faculty: ${s.faculty} | Room: ${s.room} [${s.type}]\n")
                        }
                    }
                    return QueryResponse(
                        text = sb.toString(),
                        category = "Timetable",
                        quickActions = listOf("Monday schedule", "Wednesday schedule", "Friday schedule")
                    )
                }
            }

            // General timetable overview
            val sb = StringBuilder()
            sb.append("📅 **Apex Institute — CSE 3rd Year Academic Schedule:**\n\n")
            sb.append("Standard daily hours: **09:00 AM – 04:30 PM**\n\n")
            CampusData.timetable.take(3).forEach { dayData ->
                sb.append("🗓️ **${dayData.day}:**\n")
                dayData.slots.take(4).forEach { s ->
                    sb.append("  • ${s.time}: ${s.subject} (${s.room})\n")
                }
                sb.append("  ...and afternoon lab sessions\n\n")
            }
            sb.append("💡 *Tip: Ask for a specific day like 'Monday timetable' or 'Friday schedule'.*")
            return QueryResponse(
                text = sb.toString(),
                category = "Timetable",
                quickActions = listOf("Monday schedule", "Tuesday schedule", "Wednesday schedule")
            )
        }

        // 2. Notices & Placements
        if (query.contains("notice") || query.contains("circular") || query.contains("announcement") ||
            query.contains("engineers' day") || query.contains("engineers day") || query.contains("hackathon") ||
            query.contains("placement") || query.contains("tpo") || query.contains("job")
        ) {
            if (query.contains("placement") || query.contains("tpo") || query.contains("job")) {
                val placementNotice = CampusData.notices.find { it.id == "not-002" }
                val tpoContact = CampusData.contacts.find { it.role.contains("Placement") }
                val sb = StringBuilder()
                sb.append("💼 **Campus Placements & Drives:**\n\n")
                if (placementNotice != null) {
                    sb.append("📢 **${placementNotice.title}**\n")
                    sb.append("📅 Date: ${placementNotice.date} | Priority: ${placementNotice.priority}\n")
                    sb.append("${placementNotice.content}\n\n")
                }
                if (tpoContact != null) {
                    sb.append("👤 **Training & Placement Officer:** ${tpoContact.name}\n")
                    sb.append("📞 Phone: ${tpoContact.phone} | ✉️ Email: ${tpoContact.email}\n")
                    sb.append("🏢 Office: ${tpoContact.office}\n")
                }
                return QueryResponse(
                    text = sb.toString().trim(),
                    category = "Notices",
                    quickActions = listOf("Placement Notice", "Exam Schedule", "Faculty")
                )
            }

            val sb = StringBuilder()
            sb.append("📢 **Latest Campus Notices & Circulars:**\n\n")
            CampusData.notices.forEach { n ->
                val badge = if (n.priority == "Urgent") "🚨 [URGENT]" else if (n.priority == "Important") "⭐ [IMPORTANT]" else "📌 [NOTICE]"
                sb.append("$badge **${n.title}**\n")
                sb.append("📅 *Date:* ${n.date} | *Dept:* ${n.department}\n")
                sb.append("${n.content}\n")
                sb.append("— *Issued by: ${n.issuedBy}*\n\n")
            }
            return QueryResponse(
                text = sb.toString().trim(),
                category = "Notices",
                quickActions = listOf("Exams", "Placements", "Engineers' Day Expo")
            )
        }

        // 3. Library
        if (query.contains("library") || query.contains("book") || query.contains("borrow") ||
            query.contains("librarian") || query.contains("reading hall") || query.contains("fine")
        ) {
            val lib = CampusData.facilities.find { it.category == "Library" }
            val chief = CampusData.contacts.find { it.role.contains("Library") }
            val sb = StringBuilder()
            sb.append("📚 **Dr. APJ Abdul Kalam Central Library**\n")
            sb.append("📍 **Location:** ${lib?.location ?: "Knowledge Complex, Floors 1 & 2"}\n")
            sb.append("⏰ **Timings:** ${lib?.timings ?: "08:00 AM – 09:00 PM (Mon-Sat)"}\n\n")
            sb.append("**Key Features & Services:**\n")
            lib?.keyFeatures?.forEach { f ->
                sb.append("  • $f\n")
            }
            sb.append("\n📖 **Book Borrowing Rules:**\n")
            sb.append("  • UG Students: Up to 4 books for 14 days\n")
            sb.append("  • Renewal: 1 online extension allowed via library portal\n")
            sb.append("  • Reading Hall: Air-conditioned, open 24/7 during semester examinations\n")
            if (chief != null) {
                sb.append("\n👤 **Chief Librarian:** ${chief.name} (${chief.email} | ${chief.phone})")
            }
            return QueryResponse(
                text = sb.toString().trim(),
                category = "Library",
                quickActions = listOf("Library Timings", "Borrowing Rules", "Facilities")
            )
        }

        // 4. Facilities
        if (query.contains("facility") || query.contains("facilities") || query.contains("gym") ||
            query.contains("sports") || query.contains("canteen") || query.contains("cafeteria") ||
            query.contains("hostel") || query.contains("medical") || query.contains("doctor") ||
            query.contains("health")
        ) {
            val sb = StringBuilder()
            sb.append("🏫 **Campus Facilities & Amenities:**\n\n")
            CampusData.facilities.forEach { f ->
                sb.append("📍 **${f.name}** [${f.category}]\n")
                sb.append("  • Location: ${f.location}\n")
                sb.append("  • Timings: ${f.timings}\n")
                sb.append("  • Highlights: ${f.keyFeatures.firstOrNull() ?: ""}\n\n")
            }
            return QueryResponse(
                text = sb.toString().trim(),
                category = "Facilities",
                quickActions = listOf("Central Library", "Sports Complex", "Student Hostels")
            )
        }

        // 5. Faculty
        if (query.contains("faculty") || query.contains("professor") || query.contains("teacher") ||
            query.contains("lecturer") || query.contains("hod") || query.contains("cabin") ||
            query.contains("room c-") || query.contains("room e-") || query.contains("room m-") || query.contains("room el-") ||
            query.contains("c-201") || query.contains("c-202") || query.contains("c-203") || query.contains("c-204") ||
            query.contains("e-201") || query.contains("e-202") || query.contains("m-201") || query.contains("m-202") ||
            query.contains("el-201") || query.contains("el-202") ||
            query.contains("ankit") || query.contains("priya") || query.contains("rahul") || query.contains("neha") ||
            query.contains("amit") || query.contains("sneha") || query.contains("rajesh") || query.contains("pooja") ||
            query.contains("vivek") || query.contains("kavita") ||
            query.contains("data structures") || query.contains("programming in c") || query.contains("computer fundamentals") ||
            query.contains("database management") || query.contains("digital electronics") || query.contains("electronic devices") ||
            query.contains("engineering mechanics") || query.contains("engineering drawing") || query.contains("basic electrical") ||
            query.contains("electrical machines")
        ) {
            val matched = CampusData.faculty.filter { f ->
                query.contains(f.name.lowercase()) ||
                query.contains(f.department.lowercase()) ||
                query.contains(f.cabin.lowercase()) ||
                f.subjects.any { query.contains(it.lowercase()) }
            }
            val facultyList = if (matched.isNotEmpty()) matched else CampusData.faculty
            val sb = StringBuilder()
            sb.append("👨‍🏫 **Faculty Directory & Cabin Hours:**\n\n")
            facultyList.forEach { f ->
                sb.append("👤 **${f.name}** — ${f.designation}\n")
                sb.append("  • Dept: ${f.department} | Room: ${f.cabin}\n")
                if (f.subjects.isNotEmpty()) {
                    sb.append("  • Subject: ${f.subjects.joinToString(", ")}\n")
                }
                sb.append("  • Office Hours: ${f.officeHours} | Email: ${f.email}\n\n")
            }
            return QueryResponse(
                text = sb.toString().trim(),
                category = "Faculty",
                quickActions = listOf("Dr. Ankit Sharma (CSE)", "Dr. Amit Kumar (ECE)", "All Departments")
            )
        }

        // 6. Departments
        if (query.contains("department") || query.contains("branch") || query.contains("course") ||
            query.contains("cse") || query.contains("ece") || query.contains("mech") || query.contains("electrical") || query.contains("ee")
        ) {
            val sb = StringBuilder()
            sb.append("🎓 **Academic Departments & Programs:**\n\n")
            CampusData.departments.forEach { d ->
                sb.append("🏛️ **${d.name} (${d.code})**\n")
                sb.append("  • Head of Department: ${d.hod}\n")
                sb.append("  • HOD Office: ${d.officeLocation}\n")
                sb.append("  • Annual Intake: ${d.studentIntake} students\n")
                sb.append("  • Contact: ${d.hodEmail}\n\n")
            }
            return QueryResponse(
                text = sb.toString().trim(),
                category = "Departments",
                quickActions = listOf("CSE Department", "ECE Department", "ME Department", "Electrical Department")
            )
        }

        // 7. Exams
        if (query.contains("exam") || query.contains("midterm") || query.contains("mid-term") ||
            query.contains("endsem") || query.contains("admit card") || query.contains("hall ticket")
        ) {
            val sb = StringBuilder()
            sb.append("📝 **Examination Schedules & Hall Tickets:**\n\n")
            CampusData.exams.forEach { e ->
                sb.append("📌 **${e.examTitle}**\n")
                sb.append("  • Target Semesters: ${e.semester}\n")
                sb.append("  • Examination Period: ${e.startDate} to ${e.endDate}\n")
                sb.append("  • Hall Ticket Release: ${e.admitCardReleaseDate}\n")
                sb.append("  • Exam Cell Contact: ${e.examCellContact}\n\n")
            }
            sb.append("⚠️ *Note: 75% attendance and library clearance are required for hall ticket release.*")
            return QueryResponse(
                text = sb.toString().trim(),
                category = "Exams",
                quickActions = listOf("Mid-Sem Dates", "Notices", "Timetable")
            )
        }

        // 8. Student Services
        if (query.contains("service") || query.contains("scholarship") || query.contains("id card") ||
            query.contains("bus pass") || query.contains("bonafide") || query.contains("ragging")
        ) {
            val sb = StringBuilder()
            sb.append("🛠️ **Student Services & Administrative Helpdesks:**\n\n")
            CampusData.studentServices.forEach { s ->
                sb.append("📋 **${s.serviceName}**\n")
                sb.append("  • Office: ${s.office}\n")
                sb.append("  • Timings: ${s.timings} | Turnaround: ${s.processingDays}\n")
                sb.append("  • Procedure: ${s.instructions}\n\n")
            }
            return QueryResponse(
                text = sb.toString().trim(),
                category = "Student Services",
                quickActions = listOf("Bonafide Certificate", "Duplicate ID Card", "Bus Pass Concession")
            )
        }

        // 9. Contacts
        if (query.contains("contact") || query.contains("phone") || query.contains("email") ||
            query.contains("helpline") || query.contains("call") || query.contains("director") ||
            query.contains("dean")
        ) {
            val sb = StringBuilder()
            sb.append("📞 **Key Campus Contacts & Emergency Helplines:**\n\n")
            CampusData.contacts.forEach { c ->
                sb.append("👤 **${c.role}** — ${c.name}\n")
                sb.append("  • Office: ${c.office}\n")
                sb.append("  • Phone: ${c.phone} | Email: ${c.email}\n\n")
            }
            return QueryResponse(
                text = sb.toString().trim(),
                category = "Contacts",
                quickActions = listOf("Principal Office", "TPO Cell", "Security Room")
            )
        }

        // 10. Greetings & Overview
        if (query.contains("hello") || query.contains("hi") || query.contains("hey") ||
            query.contains("who are you") || query.contains("about college") || query.contains("help")
        ) {
            val c = CampusData.collegeInfo
            val text = "👋 **Hello! Welcome to the AI Smart Campus Assistant for ${c.name}.**\n\n" +
                    "I can provide verified information on:\n" +
                    "• 📅 **Timetable & Schedules** (Today's classes, lab sessions)\n" +
                    "• 📢 **Latest Campus Notices** (Exams, hackathons, placements)\n" +
                    "• 📚 **Central Library** (Timings, borrowing rules, e-resources)\n" +
                    "• 🏫 **Campus Facilities** (Gym, canteen, sports grounds, hostels)\n" +
                    "• 👨‍🏫 **Faculty & HODs** (Cabin numbers, office hours, email IDs)\n" +
                    "• 🎓 **Departments & Intake** (CSE, AI&DS, ECE, Mech, Civil)\n" +
                    "• 📝 **Exam Schedules & Admit Cards**\n" +
                    "• 🛠️ **Student Services** (Bonafide, ID cards, bus concessions)\n" +
                    "• 📞 **Emergency Contacts & Helplines**\n\n" +
                    "What would you like to know today?"
            return QueryResponse(
                text = text,
                category = "Overview",
                quickActions = listOf("📅 Timetable", "📢 Notices", "📚 Library", "🏫 Facilities")
            )
        }

        // Default: Strict requirement if not in database
        return QueryResponse(
            text = "Sorry, I don't have this information yet.\n\n" +
                    "Please visit the **Central Reception (Admin Block)** or contact the campus helpline at **+91-22-2890-4000** for further assistance.",
            category = "General",
            quickActions = listOf("📅 Timetable", "📢 Notices", "📚 Library", "🏫 Facilities")
        )
    }
}
