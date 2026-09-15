package com.smartcampus.assistant.data

import com.smartcampus.assistant.model.*

object CampusData {
    val collegeInfo = CollegeInfo(
        name = "Apex Institute of Technology & Engineering (AITE)",
        tagline = "Empowering Next-Gen Engineers & Innovators",
        code = "AITE-4091",
        affiliation = "Affiliated to State Technical University | Approved by AICTE, New Delhi",
        establishedYear = 2004,
        address = "Plot 12, Academic Valley, Knowledge Corridor, Metro City – 400076",
        campusTimings = "Monday to Saturday: 08:30 AM – 05:30 PM (Closed on Sundays)",
        centralHelpline = "+91-22-2890-4000 / helpdesk@aite.edu.in",
        officialWebsite = "https://www.aite.edu.in"
    )

    val departments = listOf(
        Department("dept-cse", "CSE Department (Computer Science & Engineering)", "CSE", "Dr. Ankit Sharma", "hod.cse@aite.edu.in", "Room C-201, Academic Block C", 180),
        Department("dept-ece", "ECE Department (Electronics & Communication Engineering)", "ECE", "Dr. Amit Kumar", "hod.ece@aite.edu.in", "Room E-201, Academic Block E", 120),
        Department("dept-mech", "ME Department (Mechanical Engineering)", "ME", "Mr. Rajesh Yadav", "hod.mech@aite.edu.in", "Room M-201, Mechanical Block M", 60),
        Department("dept-electrical", "Electrical Department (Electrical Engineering)", "EE", "Mr. Vivek Tiwari", "hod.electrical@aite.edu.in", "Room EL-201, Electrical Block EL", 60)
    )

    val faculty = listOf(
        FacultyMember("fac-001", "Dr. Ankit Sharma", "HOD", "CSE Department", "Room C-201", "Mon - Fri: 2:00 PM – 4:00 PM", "ankit.sharma@aite.edu.in", "+91-22-2890-4101", listOf("Data Structures")),
        FacultyMember("fac-002", "Ms. Priya Verma", "Assistant Professor", "CSE Department", "Room C-202", "Mon - Fri: 11:00 AM – 1:00 PM", "priya.verma@aite.edu.in", "+91-22-2890-4102", listOf("Programming in C")),
        FacultyMember("fac-003", "Mr. Rahul Singh", "Lecturer", "CSE Department", "Room C-203", "Mon - Fri: 10:00 AM – 12:00 PM", "rahul.singh@aite.edu.in", "+91-22-2890-4103", listOf("Computer Fundamentals")),
        FacultyMember("fac-004", "Ms. Neha Gupta", "Lecturer", "CSE Department", "Room C-204", "Mon - Fri: 12:00 PM – 2:00 PM", "neha.gupta@aite.edu.in", "+91-22-2890-4104", listOf("Database Management")),
        FacultyMember("fac-005", "Dr. Amit Kumar", "HOD", "ECE Department", "Room E-201", "Mon - Fri: 2:00 PM – 4:00 PM", "amit.kumar@aite.edu.in", "+91-22-2890-4105", listOf("Digital Electronics")),
        FacultyMember("fac-006", "Ms. Sneha Patel", "Lecturer", "ECE Department", "Room E-202", "Mon - Fri: 11:00 AM – 1:00 PM", "sneha.patel@aite.edu.in", "+91-22-2890-4106", listOf("Electronic Devices")),
        FacultyMember("fac-007", "Mr. Rajesh Yadav", "HOD", "ME Department", "Room M-201", "Mon - Fri: 2:00 PM – 4:00 PM", "rajesh.yadav@aite.edu.in", "+91-22-2890-4107", listOf("Engineering Mechanics")),
        FacultyMember("fac-008", "Ms. Pooja Mishra", "Lecturer", "ME Department", "Room M-202", "Mon - Fri: 10:00 AM – 12:00 PM", "pooja.mishra@aite.edu.in", "+91-22-2890-4108", listOf("Engineering Drawing")),
        FacultyMember("fac-009", "Mr. Vivek Tiwari", "HOD", "Electrical Department", "Room EL-201", "Mon - Fri: 2:00 PM – 4:00 PM", "vivek.tiwari@aite.edu.in", "+91-22-2890-4109", listOf("Basic Electrical Engineering")),
        FacultyMember("fac-010", "Ms. Kavita Singh", "Lecturer", "Electrical Department", "Room EL-202", "Mon - Fri: 11:00 AM – 1:00 PM", "kavita.singh@aite.edu.in", "+91-22-2890-4110", listOf("Electrical Machines"))
    )

    val facilities = listOf(
        Facility("fac-lib", "Dr. APJ Abdul Kalam Central Library", "Library", "Knowledge Complex, Floors 1 & 2", "08:00 AM – 09:00 PM (Mon-Sat) | Reading Hall open 24/7 during exams", listOf("Over 65,000 engineering volumes", "IEEE Xplore, ScienceDirect, Springer access", "150 high-speed PC workstations", "Quiet study zones & group discussion rooms")),
        Facility("fac-gym", "Campus Sports Complex & Gymnasium", "Sports", "Adjacent to East Ground", "Morning: 06:00 AM – 08:30 AM | Evening: 04:30 PM – 08:00 PM", listOf("Olympic-standard badminton courts", "State-of-the-art fitness center with certified trainer", "Basketball & volleyball courts", "Table tennis & chess recreation lounge")),
        Facility("fac-cafe", "Central Food Court & Green Cafeteria", "Cafeteria", "Ground Floor, Student Activity Center", "07:30 AM – 08:30 PM daily", listOf("Hygienic vegetarian & multi-cuisine counters", "Subsidized student thali (₹45)", "Fresh juice, coffee, and tea bar", "Indoor seating for 450+ students")),
        Facility("fac-med", "Campus Health Center & First-Aid Post", "Medical", "Admin Block, Ground Floor (Near Main Gate)", "24x7 Medical Assistance | Resident Medical Officer: 09:00 AM – 05:00 PM", listOf("Free basic checkup & essential medications", "Dedicated emergency ambulance on standby", "Tie-up with City Multi-Speciality Hospital (2 km away)", "Weekly dental & mental health counseling sessions")),
        Facility("fac-hostel", "Student Hostels (Sahyadri Boys & Nilgiri Girls)", "Accommodation", "Residential Campus Sector", "Resident Warden Office: 08:00 AM – 09:00 PM | Night Curfew: 09:30 PM", listOf("High-speed Wi-Fi (100 Mbps)", "24-hour power backup & RO water purifiers", "Attached laundry facility & study commons", "Biometric access security"))
    )

    val timetable = listOf(
        DayTimetable("Monday", listOf(
            TimetableSlot("09:00 AM - 10:00 AM", "Design & Analysis of Algorithms", "CS-501", "Dr. K. Ramanathan", "Hall 302", "Lecture"),
            TimetableSlot("10:00 AM - 11:00 AM", "Database Management Systems", "CS-502", "Prof. Aniket Joshi", "Hall 302", "Lecture"),
            TimetableSlot("11:00 AM - 11:15 AM", "Tea Break", "-", "-", "Central Foyer", "Break"),
            TimetableSlot("11:15 AM - 01:15 PM", "Full-Stack Web Tech Lab", "CS-508", "Prof. Priya Sharma", "Computer Lab 4", "Lab"),
            TimetableSlot("01:15 PM - 02:00 PM", "Lunch Break", "-", "-", "Cafeteria", "Break"),
            TimetableSlot("02:00 PM - 03:00 PM", "Software Engineering & Agile", "CS-503", "Prof. Priya Sharma", "Hall 302", "Lecture"),
            TimetableSlot("03:00 PM - 04:30 PM", "Technical Seminar / Mentor Hours", "CS-509", "Faculty Mentors", "Seminar Hall 1", "Activity")
        )),
        DayTimetable("Tuesday", listOf(
            TimetableSlot("09:00 AM - 10:00 AM", "Database Management Systems", "CS-502", "Prof. Aniket Joshi", "Hall 302", "Lecture"),
            TimetableSlot("10:00 AM - 11:00 AM", "Artificial Intelligence Fundamentals", "AI-504", "Dr. Sunita Deshmukh", "Hall 302", "Lecture"),
            TimetableSlot("11:00 AM - 11:15 AM", "Tea Break", "-", "-", "Central Foyer", "Break"),
            TimetableSlot("11:15 AM - 01:15 PM", "DBMS & SQL Query Lab", "CS-507", "Prof. Aniket Joshi", "Database Lab 2", "Lab"),
            TimetableSlot("01:15 PM - 02:00 PM", "Lunch Break", "-", "-", "Cafeteria", "Break"),
            TimetableSlot("02:00 PM - 03:00 PM", "Theory of Computation", "CS-505", "Dr. K. Ramanathan", "Hall 302", "Lecture"),
            TimetableSlot("03:00 PM - 04:00 PM", "Professional Ethics for Engineers", "HS-501", "Dr. Vandana Rao", "Hall 302", "Lecture")
        )),
        DayTimetable("Wednesday", listOf(
            TimetableSlot("09:00 AM - 10:00 AM", "Software Engineering & Agile", "CS-503", "Prof. Priya Sharma", "Hall 302", "Lecture"),
            TimetableSlot("10:00 AM - 11:00 AM", "Theory of Computation", "CS-505", "Dr. K. Ramanathan", "Hall 302", "Lecture"),
            TimetableSlot("11:00 AM - 11:15 AM", "Tea Break", "-", "-", "Central Foyer", "Break"),
            TimetableSlot("11:15 AM - 01:15 PM", "Algorithms & Competitive Coding", "CS-506", "Dr. K. Ramanathan", "Software Lab 1", "Lab"),
            TimetableSlot("01:15 PM - 02:00 PM", "Lunch Break", "-", "-", "Cafeteria", "Break"),
            TimetableSlot("02:00 PM - 03:30 PM", "Mini-Project Work", "CS-510", "Project Guides", "Innovation Hub", "Practical")
        )),
        DayTimetable("Thursday", listOf(
            TimetableSlot("09:00 AM - 10:00 AM", "Artificial Intelligence Fundamentals", "AI-504", "Dr. Sunita Deshmukh", "Hall 302", "Lecture"),
            TimetableSlot("10:00 AM - 11:00 AM", "Design & Analysis of Algorithms", "CS-501", "Dr. K. Ramanathan", "Hall 302", "Lecture"),
            TimetableSlot("11:00 AM - 11:15 AM", "Tea Break", "-", "-", "Central Foyer", "Break"),
            TimetableSlot("11:15 AM - 01:15 PM", "AI & Machine Learning Lab", "AI-506", "Dr. Sunita Deshmukh", "Nvidia GPU Lab", "Lab"),
            TimetableSlot("01:15 PM - 02:00 PM", "Lunch Break", "-", "-", "Cafeteria", "Break"),
            TimetableSlot("02:00 PM - 03:00 PM", "Database Management Systems", "CS-502", "Prof. Aniket Joshi", "Hall 302", "Lecture"),
            TimetableSlot("03:00 PM - 04:30 PM", "Library / Research Self-Study", "LIB-501", "Librarian", "Central Library", "Self Study")
        )),
        DayTimetable("Friday", listOf(
            TimetableSlot("09:00 AM - 10:00 AM", "Theory of Computation", "CS-505", "Dr. K. Ramanathan", "Hall 302", "Lecture"),
            TimetableSlot("10:00 AM - 11:00 AM", "Software Engineering & Agile", "CS-503", "Prof. Priya Sharma", "Hall 302", "Lecture"),
            TimetableSlot("11:00 AM - 11:15 AM", "Tea Break", "-", "-", "Central Foyer", "Break"),
            TimetableSlot("11:15 AM - 01:15 PM", "Cloud Computing & DevOps Workshop", "CS-511", "Industry Guest Faculty", "Cloud Lab 3", "Workshop"),
            TimetableSlot("01:15 PM - 02:00 PM", "Lunch Break", "-", "-", "Cafeteria", "Break"),
            TimetableSlot("02:00 PM - 04:00 PM", "Student Clubs & Sports Activities", "CCA-501", "Sports In-charge", "Campus Grounds", "Extracurricular")
        )),
        DayTimetable("Saturday", listOf(
            TimetableSlot("09:00 AM - 11:00 AM", "Remedial & Doubt Clearing Sessions", "REM-501", "Subject Faculties", "Classrooms 301-304", "Tutorial"),
            TimetableSlot("11:00 AM - 01:00 PM", "Coding Club Hack Session & Tech Talks", "CLUB-501", "Student Council", "Auditorium 2", "Student Club"),
            TimetableSlot("01:00 PM - 01:45 PM", "Lunch Break", "-", "-", "Cafeteria", "Break"),
            TimetableSlot("01:45 PM - 03:30 PM", "Placement Readiness & Aptitude Training", "TPO-501", "TPO Trainers", "Seminar Hall 1", "Training")
        ))
    )

    val notices = listOf(
        CampusNotice(
            "not-001",
            "Mid-Semester Examination Schedule - Autumn 2026",
            "September 12, 2026",
            "Examination Cell",
            "Urgent",
            "Mid-Semester Examinations for all B.Tech Semesters 3, 5, and 7 commence from October 6, 2026. Detailed timetable is displayed on department notice boards. Hall tickets will be issued through student portals starting September 28, 2026. Clearance of library dues is mandatory for hall ticket release.",
            "Controller of Examinations, Dr. P. S. Bhalerao"
        ),
        CampusNotice(
            "not-002",
            "Campus Placement Drive: Top Tier Tech Companies",
            "September 08, 2026",
            "Training & Placement Cell",
            "Important",
            "Registration for upcoming on-campus recruitment by Microsoft, Google Cloud, Infosys BPM, and Tata Consultancy Services opens on September 15. Eligible branches: CSE, AI&DS, ECE with CGPA 7.0 and above. Mandatory pre-placement aptitude test is scheduled on September 22 at Online Lab 1.",
            "Prof. Anand K. Shinde, Head TPO"
        ),
        CampusNotice(
            "not-003",
            "Annual Engineers' Day & Innovation Expo 2026",
            "September 05, 2026",
            "Student Affairs & Innovation Council",
            "Normal",
            "In commemoration of Sir M. Visvesvaraya, the college celebrates National Engineers' Day on September 15. Events include 24-Hour Hackathon, Hardware Robotics Arena, and Paper Presentation. Cash prizes worth ₹1,50,000 to be awarded. Register at the Student Affairs Desk before September 13.",
            "Dean of Student Affairs, Dr. Rashmi Sen"
        ),
        CampusNotice(
            "not-004",
            "National Merit & State Scholarship Submission Deadline",
            "August 30, 2026",
            "Scholarship & Welfare Desk",
            "Important",
            "Eligible SC/ST/OBC and EBC students must submit their verified scholarship application forms along with income certificates and bank passbook copies to Counter 4 before September 25, 2026 to ensure timely DBT disbursement.",
            "Student Welfare Officer, Mr. S. N. Joshi"
        )
    )

    val exams = listOf(
        ExamInfo(
            "exam-mid-2026",
            "Mid-Semester Theory & Practical Examinations",
            "Semesters 3, 5, 7 (All Engineering Branches)",
            "Academic Year 2026-27",
            "October 06, 2026",
            "October 14, 2026",
            "September 28, 2026 (via Student Portal)",
            "examcell@aite.edu.in / Room 108, Admin Block"
        ),
        ExamInfo(
            "exam-endsem-2026",
            "End-Semester University Final Examinations",
            "Semesters 1, 3, 5, 7",
            "Academic Year 2026-27",
            "December 02, 2026",
            "December 22, 2026",
            "November 20, 2026",
            "Controller of Examinations, Phone: +91-22-2890-4050"
        )
    )

    val studentServices = listOf(
        StudentService("srv-bonafide", "Bonafide & Character Certificate", "Student Academic Section (Counter 2)", "10:30 AM – 01:30 PM", "2 Working Days", "Submit application form along with college ID copy and current semester fee receipt."),
        StudentService("srv-idcard", "Duplicate ID Card Issuance", "Administration Office (Counter 5)", "10:00 AM – 03:00 PM", "Same Day (4 Hours)", "Submit police lost-property report copy, two passport photos, and ₹200 replacement fee challan."),
        StudentService("srv-bus", "College Bus & Metro Pass Concession", "Transport Helpdesk (Room 12)", "09:30 AM – 04:30 PM", "1 Working Day", "Collect signed concession letter for City Transport Corporation or suburban rail."),
        StudentService("srv-antiragging", "Anti-Ragging Squad & Grievance Redressal", "Dean Student Affairs (Room 102)", "24x7 Emergency Contact", "Immediate (Under 30 Minutes)", "Zero-tolerance campus. Toll-free national line: 1800-180-5522. Campus Squad: +91-9820-409100.")
    )

    val contacts = listOf(
        CampusContact("cnt-01", "Principal / Director", "Dr. Arvind S. Mathur", "Directorate, Admin Block, Floor 1", "director@aite.edu.in", "+91-22-2890-4001"),
        CampusContact("cnt-02", "Dean of Academics", "Dr. S. K. Bhattacharya", "Academic Dean Office, Room 104", "dean.academics@aite.edu.in", "+91-22-2890-4005"),
        CampusContact("cnt-03", "Training & Placement Officer (TPO)", "Prof. Anand K. Shinde", "Placement Complex, Floor 2", "placements@aite.edu.in", "+91-22-2890-4040"),
        CampusContact("cnt-04", "Central Library Chief Librarian", "Mr. R. V. Kulkarni", "Central Library Circulation Desk", "library@aite.edu.in", "+91-22-2890-4080"),
        CampusContact("cnt-05", "Campus Security Control Room (24x7)", "Chief Security Officer", "Main Gate Post 1", "security@aite.edu.in", "+91-22-2890-4999")
    )

    val faqs = listOf(
        FAQItem("faq-01", "What is the minimum attendance required to appear for exams?", "Students must maintain a minimum of 75% aggregate attendance in each registered subject. Below 75% requires medical committee review; below 60% leads to detention.", "Academic"),
        FAQItem("faq-02", "How do I connect to Campus High-Speed Wi-Fi?", "Connect to 'AITE-Campus-5G' network and authenticate on captive portal using your Student Enrollment Number and default portal password.", "IT & Network"),
        FAQItem("faq-03", "How many books can a student borrow at a time from library?", "Undergraduate students can borrow up to 4 books for 14 days. Renewal is allowed once online through the library portal if no reserve holds exist.", "Library"),
        FAQItem("faq-04", "What is the procedure if I lose my College ID card?", "Report to Security immediately, submit a duplicate ID request at Counter 5 with ₹200 challan, and you will receive a new smart card within 4 hours.", "Student Services")
    )
}
