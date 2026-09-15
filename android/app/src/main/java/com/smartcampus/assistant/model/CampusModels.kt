package com.smartcampus.assistant.model

data class ChatMessage(
    val id: String,
    val sender: String, // "student" or "ai"
    val text: String,
    val timestamp: String,
    val category: String? = null,
    val quickActions: List<String> = emptyList()
)

data class CollegeInfo(
    val name: String,
    val tagline: String,
    val code: String,
    val affiliation: String,
    val establishedYear: Int,
    val address: String,
    val campusTimings: String,
    val centralHelpline: String,
    val officialWebsite: String
)

data class Department(
    val id: String,
    val name: String,
    val code: String,
    val hod: String,
    val hodEmail: String,
    val officeLocation: String,
    val studentIntake: Int
)

data class FacultyMember(
    val id: String,
    val name: String,
    val designation: String,
    val department: String,
    val cabin: String,
    val officeHours: String,
    val email: String,
    val phone: String,
    val subjects: List<String> = emptyList()
)

data class Facility(
    val id: String,
    val name: String,
    val category: String,
    val location: String,
    val timings: String,
    val keyFeatures: List<String>
)

data class TimetableSlot(
    val time: String,
    val subject: String,
    val code: String,
    val faculty: String,
    val room: String,
    val type: String
)

data class DayTimetable(
    val day: String,
    val slots: List<TimetableSlot>
)

data class CampusNotice(
    val id: String,
    val title: String,
    val date: String,
    val department: String,
    val priority: String,
    val content: String,
    val issuedBy: String
)

data class ExamInfo(
    val id: String,
    val examTitle: String,
    val semester: String,
    val academicYear: String,
    val startDate: String,
    val endDate: String,
    val admitCardReleaseDate: String,
    val examCellContact: String
)

data class StudentService(
    val id: String,
    val serviceName: String,
    val office: String,
    val timings: String,
    val processingDays: String,
    val instructions: String
)

data class CampusContact(
    val id: String,
    val role: String,
    val name: String,
    val office: String,
    val email: String,
    val phone: String
)

data class FAQItem(
    val id: String,
    val question: String,
    val answer: String,
    val category: String
)

data class QueryResponse(
    val text: String,
    val category: String,
    val quickActions: List<String>
)
