import { CAMPUS_DATA } from '../data/collegeData';

export interface QueryResult {
  text: string;
  category?: string;
  quickActions?: string[];
}

export type CollegeCategory =
  | 'timetable'
  | 'notices'
  | 'library'
  | 'facilities'
  | 'faculty'
  | 'exams'
  | 'services'
  | 'contacts';

export const NO_DATA_AVAILABLE_MESSAGE = "Sorry, no information is available for this section yet.";
export const NOT_FOUND_MESSAGE = "Sorry, I don't have this information yet.";

/**
 * 1. Timetable Category Handler (Demo Data - CSE 1st Sem)
 * ONLY returns timetable data from uploaded PDF: "DEMO TIMETABLE – CSE 1st SEM"
 */
export function getTimetableCategoryData(subQuery?: string): QueryResult {
  const timetableObj = CAMPUS_DATA.timetable;
  const cseSchedule = timetableObj['CSE-1st-Sem'] || [];

  if (cseSchedule.length === 0) {
    return {
      text: NO_DATA_AVAILABLE_MESSAGE,
      category: 'Timetable',
      quickActions: ['Faculty', 'Notices', 'Exams'],
    };
  }

  const query = (subQuery || '').toLowerCase();
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  let requestedDay = '';

  for (const d of daysOfWeek) {
    if (query.includes(d)) {
      requestedDay = d.charAt(0).toUpperCase() + d.slice(1);
      break;
    }
  }

  // If a specific day was requested
  if (requestedDay) {
    const dayData = cseSchedule.find((d) => d.day.toLowerCase() === requestedDay.toLowerCase());
    if (dayData) {
      let scheduleText = `📅 **DEMO TIMETABLE – CSE 1st SEM (${dayData.day}):** *(Demo Data)*\n\n`;
      dayData.slots.forEach((s) => {
        scheduleText += `• **${s.time}** | **${s.subject}** | Room: **${s.room}**\n`;
      });
      return {
        text: scheduleText.trim(),
        category: 'Timetable',
        quickActions: ['Monday Timetable', 'Wednesday Timetable', 'Friday Timetable', 'All Days Timetable'],
      };
    }
  }

  // General Timetable query/button: Return full CSE 1st Sem schedule from PDF
  let response = `📅 **DEMO TIMETABLE – CSE 1st SEM** *(Demo Data)*\n\n`;

  cseSchedule.forEach((dayData) => {
    response += `🗓️ **${dayData.day}:**\n`;
    dayData.slots.forEach((s) => {
      response += `  • ${s.time} ${s.subject} | ${s.room}\n`;
    });
    response += `\n`;
  });

  return {
    text: response.trim(),
    category: 'Timetable',
    quickActions: ['Monday Timetable', 'Tuesday Timetable', 'Wednesday Timetable', 'Thursday Timetable', 'Friday Timetable'],
  };
}

/**
 * 2. Notices Category Handler (Demo Notices from uploaded PDF)
 * ONLY returns notices from uploaded PDF:
 * - 05 Sep 2026: Engineers’ Day Project Exhibition | 16 Sep 2026 | Seminar Hall
 * - 08 Sep 2026: Internal Assessment Schedule | Demo schedule at Academic Office
 * - 10 Sep 2026: Library Book Return Reminder | Return due books to library
 * - 12 Sep 2026: Campus Cleanliness Drive | Main Campus | 11:00 AM
 */
export function getNoticesCategoryData(subQuery?: string): QueryResult {
  const notices = CAMPUS_DATA.notices;
  if (!notices || notices.length === 0) {
    return {
      text: NO_DATA_AVAILABLE_MESSAGE,
      category: 'Notices',
      quickActions: ['Timetable', 'Exams', 'Faculty'],
    };
  }

  let result = `📢 **DEMO NOTICES** *(Demo Data)*\n\n`;
  notices.forEach((n, idx) => {
    result += `${idx + 1}. 📌 **${n.date}** — **${n.title}**\n`;
    result += `   ℹ️ ${n.details}\n\n`;
  });

  return {
    text: result.trim(),
    category: 'Notices',
    quickActions: ['Exam Dates', 'Timetable', 'Central Library'],
  };
}

/**
 * 3. Library Category Handler (Demo Library Data from uploaded PDF)
 * Topic: Central Library | Information: Ground Floor, Main Building | 9:00 AM–5:00 PM | Monday–Saturday
 */
export function getLibraryCategoryData(subQuery?: string): QueryResult {
  const lib = CAMPUS_DATA.facilities.find((f) => f.id === 'fac-library');
  if (!lib) {
    return {
      text: NO_DATA_AVAILABLE_MESSAGE,
      category: 'Library',
      quickActions: ['Timetable', 'Facilities'],
    };
  }

  let text = `📚 **Central Library** *(Demo Data)*\n\n`;
  text += `📍 **Location:** ${lib.location}\n`;
  text += `⏰ **Timings:** Demo timing: ${lib.days}, ${lib.timings}\n`;
  text += `📞 **Contact:** Library Desk (Central Library | 9:00 AM–5:00 PM)\n`;
  text += `📌 **Notice:** Library Book Return Reminder: Return due books to library.\n`;

  return {
    text: text.trim(),
    category: 'Library',
    quickActions: ['Facilities', 'Timetable', 'Notices'],
  };
}

/**
 * 4. Facilities Category Handler (Demo Facilities from uploaded PDF)
 * 9 facilities from the PDF: Central Library, Computer Lab 1, Computer Lab 2,
 * Physics Lab, Electrical Lab, Workshop, Cafeteria, Seminar Hall, Sports Ground.
 */
export function getFacilitiesCategoryData(subQuery?: string): QueryResult {
  const facilities = CAMPUS_DATA.facilities;
  if (!facilities || facilities.length === 0) {
    return {
      text: NO_DATA_AVAILABLE_MESSAGE,
      category: 'Facilities',
      quickActions: ['Timetable', 'Faculty'],
    };
  }

  const query = (subQuery || '').toLowerCase();

  // Specific facility lookup
  if (query.includes('computer lab 1') || (query.includes('lab 1') && query.includes('computer'))) {
    return {
      text: `🏫 **Computer Lab 1** *(Demo Data)*\n\n📍 **Location:** CSE Block, First Floor\n⏰ **Operating Hours:** 9:00 AM–4:30 PM`,
      category: 'Facilities',
      quickActions: ['Computer Lab 2', 'Central Library', 'All Facilities'],
    };
  }
  if (query.includes('computer lab 2') || (query.includes('lab 2') && query.includes('computer'))) {
    return {
      text: `🏫 **Computer Lab 2** *(Demo Data)*\n\n📍 **Location:** CSE Block, First Floor\n⏰ **Operating Hours:** 10:00 AM–5:00 PM`,
      category: 'Facilities',
      quickActions: ['Computer Lab 1', 'Central Library', 'All Facilities'],
    };
  }
  if (query.includes('physics lab')) {
    return {
      text: `🏫 **Physics Lab** *(Demo Data)*\n\n📍 **Location:** Science Block\n⏰ **Operating Hours:** 9:00 AM–4:00 PM`,
      category: 'Facilities',
      quickActions: ['All Facilities', 'Central Library'],
    };
  }
  if (query.includes('electrical lab')) {
    return {
      text: `🏫 **Electrical Lab** *(Demo Data)*\n\n📍 **Location:** EE Block, Ground Floor\n⏰ **Operating Hours:** 9:00 AM–4:00 PM`,
      category: 'Facilities',
      quickActions: ['All Facilities', 'Workshop'],
    };
  }
  if (query.includes('workshop')) {
    return {
      text: `🏫 **Workshop** *(Demo Data)*\n\n📍 **Location:** Mechanical Block\n⏰ **Operating Hours:** 9:00 AM–4:30 PM`,
      category: 'Facilities',
      quickActions: ['All Facilities', 'Cafeteria'],
    };
  }
  if (query.includes('cafeteria') || query.includes('canteen') || query.includes('food')) {
    return {
      text: `🏫 **Cafeteria** *(Demo Data)*\n\n📍 **Location:** Main Campus\n⏰ **Operating Hours:** 9:00 AM–5:00 PM`,
      category: 'Facilities',
      quickActions: ['Sports Ground', 'All Facilities'],
    };
  }
  if (query.includes('seminar hall')) {
    return {
      text: `🏫 **Seminar Hall** *(Demo Data)*\n\n📍 **Location:** Main Building, Second Floor\n⏰ **Timings:** As per schedule (Engineers’ Day Project Exhibition on 16 Sep 2026)`,
      category: 'Facilities',
      quickActions: ['All Facilities', 'Notices'],
    };
  }
  if (query.includes('sports ground') || query.includes('sports') || query.includes('ground')) {
    return {
      text: `🏫 **Sports Ground** *(Demo Data)*\n\n📍 **Location:** East Campus\n⏰ **Operating Hours:** 6:00 AM–6:00 PM`,
      category: 'Facilities',
      quickActions: ['Cafeteria', 'All Facilities'],
    };
  }

  // General Facilities button click: lists all 9 facilities from PDF
  let summary = `🏫 **FACILITIES** *(Demo Data)*\n\n`;
  facilities.forEach((f, idx) => {
    summary += `${idx + 1}. **${f.name}**\n`;
    summary += `   📍 *Location:* ${f.location}\n`;
    summary += `   ⏰ *Timings:* ${f.timings}${f.days ? ` | ${f.days}` : ''}\n\n`;
  });

  return {
    text: summary.trim(),
    category: 'Facilities',
    quickActions: ['Central Library', 'Computer Lab 1', 'Cafeteria', 'Sports Ground'],
  };
}

/**
 * 5. Faculty Category Handler (Demo Faculty from uploaded PDF)
 * All 12 faculty members across 5 departments:
 * CSE: Dr. Ankit Sharma (HOD, Data Structures, Room C-201), Ms. Priya Verma (Assistant Professor, Programming in C, Room C-202),
 * Mr. Rahul Singh (Lecturer, Computer Fundamentals, Room C-203), Ms. Neha Gupta (Lecturer, Database Management, Room C-204)
 * ECE: Dr. Amit Kumar (HOD, Digital Electronics, Room E-201), Ms. Sneha Patel (Lecturer, Electronic Devices, Room E-202)
 * Electrical: Mr. Vivek Tiwari (HOD, Basic Electrical Engineering, Room EL-201), Ms. Kavita Singh (Lecturer, Electrical Machines, Room EL-202)
 * Mechanical: Mr. Rajesh Yadav (HOD, Engineering Mechanics, Room M-201), Ms. Pooja Mishra (Lecturer, Engineering Drawing, Room M-202)
 * Civil: Dr. Rohan Mehta (HOD, Surveying, Room CE-201), Ms. Simran Joshi (Lecturer, Building Materials, Room CE-202)
 */
export function getFacultyCategoryData(subQuery?: string): QueryResult {
  const facultyList = CAMPUS_DATA.faculty;
  if (!facultyList || facultyList.length === 0) {
    return {
      text: NO_DATA_AVAILABLE_MESSAGE,
      category: 'Faculty',
      quickActions: ['Timetable', 'Notices'],
    };
  }

  const query = (subQuery || '').toLowerCase();

  // Specific faculty query
  if (query && !query.endsWith('faculty') && query !== 'faculty' && query !== 'teachers') {
    const matched = facultyList.find((f) => {
      const nameMatch = f.name.toLowerCase().includes(query) || query.includes(f.name.toLowerCase());
      const simpleName = f.name.toLowerCase().replace(/^(dr\.|ms\.|mr\.)\s*/, '');
      const subjectMatch = f.subject.toLowerCase().includes(query) || query.includes(f.subject.toLowerCase());
      const roomMatch = query.replace(/\s+/g, '').includes(f.cabin.toLowerCase().replace(/\s+/g, ''));
      return nameMatch || query.includes(simpleName) || subjectMatch || roomMatch;
    });

    if (matched) {
      let fText = `👨‍🏫 **${matched.name}** *(Demo Faculty)*\n\n`;
      fText += `🏢 **Department:** ${matched.department}\n`;
      fText += `🎓 **Designation:** ${matched.designation}\n`;
      fText += `📚 **Subject:** ${matched.subject}\n`;
      fText += `🚪 **Room / Cabin:** ${matched.cabin}\n`;
      return {
        text: fText,
        category: 'Faculty',
        quickActions: ['All Faculty (Demo)', 'CSE Department', 'Timetable'],
      };
    }
  }

  // General Faculty button: lists all 12 faculty members from the PDF
  let facText = `👨‍🏫 **FACULTY (DEMO)** *(Demo Data)*\n\n`;
  facultyList.forEach((f, idx) => {
    facText += `${idx + 1}. **${f.name}**\n`;
    facText += `   ${f.department} | ${f.designation} | ${f.subject} | **${f.cabin}**\n\n`;
  });

  return {
    text: facText.trim(),
    category: 'Faculty',
    quickActions: ['Dr. Ankit Sharma (CSE)', 'Ms. Priya Verma (CSE)', 'Dr. Amit Kumar (ECE)', 'Mr. Vivek Tiwari (EE)'],
  };
}

/**
 * 6. Exam Dates Category Handler (Demo Exams from uploaded PDF)
 * - Internal Assessment 1: CSE 1st Semester | 20 Sep 2026 | 10:00 AM–12:00 PM | C-101
 * - Internal Assessment 2: CSE 1st Semester | 15 Oct 2026 | 10:00 AM–12:00 PM | C-101
 * - Practical Assessment: CSE 1st Semester | 25 Oct 2026 | 10:00 AM onward | Respective Labs
 */
export function getExamsCategoryData(subQuery?: string): QueryResult {
  const exams = CAMPUS_DATA.exams;
  if (!exams || exams.length === 0) {
    return {
      text: NO_DATA_AVAILABLE_MESSAGE,
      category: 'Exams',
      quickActions: ['Timetable', 'Notices'],
    };
  }

  const query = (subQuery || '').toLowerCase();
  if (query.includes('internal assessment 1') || query.includes('ia 1') || query.includes('assessment 1')) {
    const e = exams[0];
    return {
      text: `📝 **${e.examName}** *(Demo Data)*\n\n• **Program:** ${e.semester}\n• **Date:** **${e.date}**\n• **Timing:** **${e.timing}**\n• **Venue:** **${e.venue}**`,
      category: 'Exams',
      quickActions: ['Internal Assessment 2', 'Practical Assessment', 'All Exams'],
    };
  }
  if (query.includes('internal assessment 2') || query.includes('ia 2') || query.includes('assessment 2')) {
    const e = exams[1];
    return {
      text: `📝 **${e.examName}** *(Demo Data)*\n\n• **Program:** ${e.semester}\n• **Date:** **${e.date}**\n• **Timing:** **${e.timing}**\n• **Venue:** **${e.venue}**`,
      category: 'Exams',
      quickActions: ['Internal Assessment 1', 'Practical Assessment', 'All Exams'],
    };
  }
  if (query.includes('practical assessment') || query.includes('practical')) {
    const e = exams[2];
    return {
      text: `📝 **${e.examName}** *(Demo Data)*\n\n• **Program:** ${e.semester}\n• **Date:** **${e.date}**\n• **Timing:** **${e.timing}**\n• **Venue:** **${e.venue}**`,
      category: 'Exams',
      quickActions: ['Internal Assessment 1', 'Internal Assessment 2', 'All Exams'],
    };
  }

  let exText = `📝 **DEMO EXAMS** *(Demo Data)*\n\n`;
  exams.forEach((e, idx) => {
    exText += `${idx + 1}. **${e.examName}**\n`;
    exText += `   ${e.semester} | **${e.date}** | **${e.timing}** | **${e.venue}**\n\n`;
  });

  return {
    text: exText.trim(),
    category: 'Exams',
    quickActions: ['Internal Assessment 1', 'Internal Assessment 2', 'Practical Assessment', 'Timetable'],
  };
}

/**
 * 7. Student Services Category Handler (Demo Student Services from uploaded PDF)
 * 6 services: Admission Help Desk, Scholarship Help, Examination Office, ID Card Support, Bonafide Certificate, Transfer Certificate
 */
export function getStudentServicesCategoryData(subQuery?: string): QueryResult {
  const services = CAMPUS_DATA.studentServices;
  if (!services || services.length === 0) {
    return {
      text: NO_DATA_AVAILABLE_MESSAGE,
      category: 'Student Services',
      quickActions: ['Timetable', 'Faculty'],
    };
  }

  let sText = `🧑‍🎓 **STUDENT SERVICES** *(Demo Data)*\n\n`;
  services.forEach((s, idx) => {
    sText += `${idx + 1}. **${s.serviceName}**\n`;
    sText += `   📍 *Location:* ${s.location}\n`;
    sText += `   ⏰ *Timing / Process:* ${s.timing || s.process}\n\n`;
  });

  return {
    text: sText.trim(),
    category: 'Student Services',
    quickActions: ['Admission Help Desk', 'Scholarship Help', 'Examination Office', 'ID Card Support'],
  };
}

/**
 * 8. Contacts Category Handler (Demo Contacts from uploaded PDF)
 * Principal Office, CSE Department Office, Library Desk, Examination Office, Student Help Desk
 */
export function getContactsCategoryData(subQuery?: string): QueryResult {
  const contacts = CAMPUS_DATA.contacts;
  if (!contacts || contacts.length === 0) {
    return {
      text: NO_DATA_AVAILABLE_MESSAGE,
      category: 'Contact',
      quickActions: ['Timetable', 'Student Services'],
    };
  }

  let cText = `📞 **CONTACTS (DEMO)** *(Demo Data)*\n\n`;
  contacts.forEach((c, idx) => {
    cText += `${idx + 1}. **${c.office}**\n`;
    cText += `   📍 ${c.location} | ⏰ ${c.timing}\n\n`;
  });
  cText += `• **General Email:** info@gpc-demo.edu (Demo only)\n`;
  cText += `• **Main Phone:** 00000-00000 (Demo only)\n`;

  return {
    text: cText.trim(),
    category: 'Contact',
    quickActions: ['Student Help Desk', 'Examination Office', 'CSE Department Office'],
  };
}

/**
 * Master Category Dispatcher.
 * Directly routes to the exact category handler.
 * Completely guarantees zero cross-category bleeding.
 */
export function queryByCategory(category: CollegeCategory, subQuery?: string): QueryResult {
  switch (category) {
    case 'timetable':
      return getTimetableCategoryData(subQuery);
    case 'notices':
      return getNoticesCategoryData(subQuery);
    case 'library':
      return getLibraryCategoryData(subQuery);
    case 'facilities':
      return getFacilitiesCategoryData(subQuery);
    case 'faculty':
      return getFacultyCategoryData(subQuery);
    case 'exams':
      return getExamsCategoryData(subQuery);
    case 'services':
      return getStudentServicesCategoryData(subQuery);
    case 'contacts':
      return getContactsCategoryData(subQuery);
    default:
      return {
        text: NO_DATA_AVAILABLE_MESSAGE,
        category: 'Information',
      };
  }
}

/**
 * Natural Language Query Engine grounded STRICTLY on the uploaded PDF:
 * "AI Smart Campus Demo Data.pdf".
 *
 * Rules:
 * - Search the uploaded PDF data first.
 * - Do NOT use outside college information.
 * - Do NOT hallucinate or guess.
 * - If the requested information is not present in the PDF, reply exactly:
 *   "Sorry, I don't have this information yet."
 */
export function queryCollegeDatabase(userQuery: string): QueryResult {
  const query = userQuery.trim().toLowerCase();

  // Greetings
  if (/^(hi|hello|hey|greetings|good\s*(morning|afternoon|evening)|howdy)\b/i.test(query)) {
    return {
      text: `Hello! I am your AI Smart Campus Student Assistant for **${CAMPUS_DATA.collegeInfo.name}** *(Demo Knowledge Base)*.\n\nYou can ask me about:\n• 📅 Timetable (CSE 1st Sem)\n• 📢 Demo Notices\n• 📚 Central Library timings & location\n• 🏫 Campus Facilities & Labs\n• 👨‍🏫 Faculty, Rooms & Subjects\n• 📝 Demo Exam Dates (Internal & Practical Assessments)\n• 🧑‍🎓 Student Services & Help Desks\n• 📞 College Contacts & Offices\n\nHow can I help you today?`,
      category: 'Welcome',
      quickActions: ['📅 Timetable', '📢 Notices', '📚 Library', '🏫 Facilities'],
    };
  }

  // Question 1: What is the college name? / General college info
  if (
    query.includes('college name') ||
    query.includes('name of the college') ||
    query.includes('name of college') ||
    query.includes('which college') ||
    query.includes('institution name') ||
    query.includes('about college')
  ) {
    const info = CAMPUS_DATA.collegeInfo;
    let t = `🏛️ **College Name:** **${info.name}** *(Demo Knowledge Base)*\n\n`;
    t += `• **Institution Type:** ${info.institutionType}\n`;
    t += `• **Campus:** ${info.campus}\n`;
    t += `• **Academic Session:** ${info.academicSession}\n`;
    t += `• **Office Hours:** ${info.officeHours}\n`;
    t += `• **Student Help Desk:** ${info.studentHelpDesk}\n`;
    t += `• **General Email:** ${info.generalEmail}\n`;
    t += `• **Main Phone:** ${info.mainPhone}\n\n`;
    t += `⚠️ *${info.demoNotice}*`;
    return {
      text: t,
      category: 'College Information',
      quickActions: ['Departments', 'Faculty', 'Facilities', 'Timetable'],
    };
  }

  // Academic session / office hours / email / phone
  if (query.includes('office hour') || query.includes('office timing')) {
    return {
      text: `⏰ **Office Hours:** ${CAMPUS_DATA.collegeInfo.officeHours} *(Demo Data)*`,
      category: 'College Information',
      quickActions: ['Student Help Desk', 'College Name'],
    };
  }
  if (query.includes('email') || query.includes('phone') || query.includes('contact number')) {
    return {
      text: `📞 **College Contacts:**\n• General Email: ${CAMPUS_DATA.collegeInfo.generalEmail}\n• Main Phone: ${CAMPUS_DATA.collegeInfo.mainPhone}\n• Student Help Desk: ${CAMPUS_DATA.collegeInfo.studentHelpDesk} *(Demo Data)*`,
      category: 'College Information',
      quickActions: ['Student Help Desk', 'All Contacts'],
    };
  }

  // Question 2: Where is the CSE department? / Other department locations
  if (query.includes('where is the cse department') || query.includes('where is cse department') || query.includes('where is cse') || query.includes('cse department location') || query.includes('location of cse')) {
    return {
      text: `🏢 **CSE is in Block A, First Floor.** *(Demo Data)*`,
      category: 'Departments',
      quickActions: ['Dr. Ankit Sharma (HOD)', 'Computer Lab 1', 'CSE 1st Sem Timetable'],
    };
  }
  if (query.includes('where is the ece') || query.includes('where is ece') || query.includes('ece department')) {
    return {
      text: `🏢 **ECE is in Block B, First Floor.** *(Demo Data)*\n• HOD: Dr. Amit Kumar (Room E-201)`,
      category: 'Departments',
      quickActions: ['Dr. Amit Kumar', 'All Departments'],
    };
  }
  if (query.includes('electrical engineering department') || query.includes('where is electrical') || query.includes('electrical department')) {
    return {
      text: `🏢 **Electrical Engineering is in Block B, Second Floor.** *(Demo Data)*\n• HOD: Mr. Vivek Tiwari (Room EL-201)`,
      category: 'Departments',
      quickActions: ['Electrical Lab', 'All Departments'],
    };
  }
  if (query.includes('mechanical engineering department') || query.includes('where is mechanical') || query.includes('mechanical department')) {
    return {
      text: `🏢 **Mechanical Engineering is in Block C, First Floor.** *(Demo Data)*\n• HOD: Mr. Rajesh Yadav (Room M-201)\n• Workshop: Mechanical Block`,
      category: 'Departments',
      quickActions: ['Workshop', 'All Departments'],
    };
  }
  if (query.includes('civil engineering department') || query.includes('where is civil') || query.includes('civil department')) {
    return {
      text: `🏢 **Civil Engineering is in Block C, Second Floor.** *(Demo Data)*\n• HOD: Dr. Rohan Mehta (Room CE-201)`,
      category: 'Departments',
      quickActions: ['Dr. Rohan Mehta', 'All Departments'],
    };
  }
  if (query.includes('departments') || query.includes('all departments') || query.includes('list of departments')) {
    let dText = `🏢 **DEPARTMENTS** *(Demo Data)*\n\n`;
    CAMPUS_DATA.departments.forEach((d) => {
      dText += `• **${d.name}:** ${d.location}\n`;
    });
    return {
      text: dText.trim(),
      category: 'Departments',
      quickActions: ['CSE Department', 'ECE Department', 'Faculty'],
    };
  }

  // Question 3: Who teaches Data Structures?
  if (query.includes('data structures') || query.includes('who teaches data structure')) {
    return {
      text: `Demo faculty: **Dr. Ankit Sharma, Room C-201.**\n(CSE | HOD | Data Structures)`,
      category: 'Faculty',
      quickActions: ["Dr. Ankit Sharma's Room", 'Programming in C', 'CSE Faculty'],
    };
  }

  // Question 4: Where is Dr. Ankit Sharma's room?
  if (query.includes('ankit sharma') && (query.includes('room') || query.includes('cabin') || query.includes('where'))) {
    return {
      text: `Demo faculty: **Dr. Ankit Sharma, Room C-201.**\n• Department: CSE (HOD)\n• Subject: Data Structures`,
      category: 'Faculty',
      quickActions: ['Who teaches Data Structures?', 'Ms. Priya Verma (Room C-202)', 'CSE Department'],
    };
  }

  // Who teaches Programming in C? / Where is Ms. Priya Verma?
  if (query.includes('programming in c') || (query.includes('who teaches') && query.includes('c programming'))) {
    return {
      text: `Demo faculty: **Ms. Priya Verma, Room C-202.**\n(CSE | Assistant Professor | Programming in C)`,
      category: 'Faculty',
      quickActions: ['Dr. Ankit Sharma', 'Data Structures', 'CSE Timetable'],
    };
  }
  if (query.includes('priya verma')) {
    return {
      text: `Demo faculty: **Ms. Priya Verma, Room C-202.**\n• Department: CSE (Assistant Professor)\n• Subject: Programming in C`,
      category: 'Faculty',
      quickActions: ['Programming in C', 'CSE Department'],
    };
  }

  // Other specific faculty lookups from the PDF
  if (query.includes('rahul singh') || query.includes('computer fundamentals')) {
    return {
      text: `Demo faculty: **Mr. Rahul Singh, Room C-203.**\n(CSE | Lecturer | Computer Fundamentals)`,
      category: 'Faculty',
      quickActions: ['Dr. Ankit Sharma', 'Ms. Priya Verma'],
    };
  }
  if (query.includes('neha gupta') || query.includes('database management')) {
    return {
      text: `Demo faculty: **Ms. Neha Gupta, Room C-204.**\n(CSE | Lecturer | Database Management)`,
      category: 'Faculty',
      quickActions: ['Dr. Ankit Sharma', 'All Faculty'],
    };
  }
  if (query.includes('amit kumar') || query.includes('digital electronics')) {
    return {
      text: `Demo faculty: **Dr. Amit Kumar, Room E-201.**\n(ECE | HOD | Digital Electronics)`,
      category: 'Faculty',
      quickActions: ['Ms. Sneha Patel', 'ECE Department'],
    };
  }
  if (query.includes('sneha patel') || query.includes('electronic devices')) {
    return {
      text: `Demo faculty: **Ms. Sneha Patel, Room E-202.**\n(ECE | Lecturer | Electronic Devices)`,
      category: 'Faculty',
      quickActions: ['Dr. Amit Kumar', 'ECE Department'],
    };
  }
  if (query.includes('vivek tiwari') || query.includes('basic electrical engineering')) {
    return {
      text: `Demo faculty: **Mr. Vivek Tiwari, Room EL-201.**\n(Electrical | HOD | Basic Electrical Engineering)`,
      category: 'Faculty',
      quickActions: ['Ms. Kavita Singh', 'Electrical Department'],
    };
  }
  if (query.includes('kavita singh') || query.includes('electrical machines')) {
    return {
      text: `Demo faculty: **Ms. Kavita Singh, Room EL-202.**\n(Electrical | Lecturer | Electrical Machines)`,
      category: 'Faculty',
      quickActions: ['Mr. Vivek Tiwari', 'Electrical Department'],
    };
  }
  if (query.includes('rajesh yadav') || query.includes('engineering mechanics')) {
    return {
      text: `Demo faculty: **Mr. Rajesh Yadav, Room M-201.**\n(Mechanical | HOD | Engineering Mechanics)`,
      category: 'Faculty',
      quickActions: ['Ms. Pooja Mishra', 'Mechanical Department'],
    };
  }
  if (query.includes('pooja mishra') || query.includes('engineering drawing')) {
    return {
      text: `Demo faculty: **Ms. Pooja Mishra, Room M-202.**\n(Mechanical | Lecturer | Engineering Drawing)`,
      category: 'Faculty',
      quickActions: ['Mr. Rajesh Yadav', 'Mechanical Department'],
    };
  }
  if (query.includes('rohan mehta') || query.includes('surveying')) {
    return {
      text: `Demo faculty: **Dr. Rohan Mehta, Room CE-201.**\n(Civil | HOD | Surveying)`,
      category: 'Faculty',
      quickActions: ['Ms. Simran Joshi', 'Civil Department'],
    };
  }
  if (query.includes('simran joshi') || query.includes('building materials')) {
    return {
      text: `Demo faculty: **Ms. Simran Joshi, Room CE-202.**\n(Civil | Lecturer | Building Materials)`,
      category: 'Faculty',
      quickActions: ['Dr. Rohan Mehta', 'Civil Department'],
    };
  }

  // General Faculty queries
  if (query.includes('faculty') || query.includes('teachers') || query.includes('professors') || query.includes('hod')) {
    return getFacultyCategoryData(query);
  }

  // Question 5: What are the library timings? / Where is the library?
  if (query.includes('library timing') || query.includes('timings of library') || query.includes('when does library open') || query.includes('when is library open')) {
    return {
      text: `Demo timing: **Monday–Saturday, 9:00 AM–5:00 PM.**\nThe Central Library is on the Ground Floor of the Main Building. *(Demo Data)*`,
      category: 'Library',
      quickActions: ['Where is the library?', 'Library Book Return', 'All Facilities'],
    };
  }
  if (query.includes('where is the library') || query.includes('where is library') || query.includes('library location')) {
    return {
      text: `The Central Library is on the **Ground Floor of the Main Building**.\nDemo timing: Monday–Saturday, 9:00 AM–5:00 PM. *(Demo Data)*`,
      category: 'Library',
      quickActions: ['Library Timings', 'Library Desk', 'All Facilities'],
    };
  }
  if (query.includes('library')) {
    return getLibraryCategoryData(query);
  }

  // Question 6: Show CSE 1st semester timetable.
  if (
    query.includes('timetable') ||
    query.includes('time table') ||
    query.includes('class schedule') ||
    query.includes('cse 1st sem') ||
    query.includes('1st semester timetable') ||
    query.includes('routine') ||
    query.includes('monday') ||
    query.includes('tuesday') ||
    query.includes('wednesday') ||
    query.includes('thursday') ||
    query.includes('friday')
  ) {
    return getTimetableCategoryData(query);
  }

  // Question 7: What are the latest notices?
  if (query.includes('notice') || query.includes('circular') || query.includes('announcement') || query.includes('cleanliness drive') || query.includes("engineers' day") || query.includes('engineers day')) {
    return getNoticesCategoryData(query);
  }

  // Question 8: When is Internal Assessment 1? / Exams
  if (
    query.includes('internal assessment 1') ||
    query.includes('ia 1') ||
    query.includes('internal assessment 2') ||
    query.includes('ia 2') ||
    query.includes('practical assessment') ||
    query.includes('exam')
  ) {
    return getExamsCategoryData(query);
  }

  // Question 9: What student services are available? / Specific service
  if (query.includes('student service') || query.includes('services are available') || query.includes('help desk') || query.includes('bonafide') || query.includes('transfer certificate') || query.includes('scholarship')) {
    return getStudentServicesCategoryData(query);
  }

  // Where is Computer Lab 1? / Computer Lab 2?
  if (query.includes('where is computer lab 1') || query.includes('computer lab 1')) {
    return {
      text: `**Computer Lab 1 is in CSE Block, First Floor.**\nOperating hours: 9:00 AM–4:30 PM. *(Demo Data)*`,
      category: 'Facilities',
      quickActions: ['Computer Lab 2', 'Central Library', 'All Facilities'],
    };
  }
  if (query.includes('where is computer lab 2') || query.includes('computer lab 2')) {
    return {
      text: `**Computer Lab 2 is in CSE Block, First Floor.**\nOperating hours: 10:00 AM–5:00 PM. *(Demo Data)*`,
      category: 'Facilities',
      quickActions: ['Computer Lab 1', 'Central Library', 'All Facilities'],
    };
  }

  // Where is the Examination Office?
  if (query.includes('where is the examination office') || query.includes('where is examination office') || query.includes('examination office location')) {
    return {
      text: `The Examination Office is in **Academic Block, Ground Floor**.\nOperating hours: 10:00 AM–4:00 PM. *(Demo Data)*`,
      category: 'Examination',
      quickActions: ['Internal Assessment 1', 'Student Services', 'Contacts'],
    };
  }

  // Other facilities
  if (
    query.includes('facilit') ||
    query.includes('sports ground') ||
    query.includes('sports') ||
    query.includes('cafeteria') ||
    query.includes('canteen') ||
    query.includes('physics lab') ||
    query.includes('electrical lab') ||
    query.includes('workshop') ||
    query.includes('seminar hall')
  ) {
    return getFacilitiesCategoryData(query);
  }

  // Contacts
  if (query.includes('contact') || query.includes('principal office') || query.includes('phone') || query.includes('email') || query.includes('desk')) {
    return getContactsCategoryData(query);
  }

  // Check FAQs from PDF
  for (const faq of CAMPUS_DATA.faqs || []) {
    const qLower = faq.question.toLowerCase();
    if (query.includes(qLower) || qLower.includes(query)) {
      return {
        text: `${faq.answer} *(Demo Data)*`,
        category: faq.category || 'FAQs',
        quickActions: ['Where is the library?', 'Who teaches Data Structures?', 'Timetable'],
      };
    }
  }

  // If asked whether data is real:
  if (query.includes('is this real') || query.includes('is the data real') || query.includes('demo') || query.includes('sample')) {
    return {
      text: `This document contains **demo/sample information** for GOVERNMENT POLYTECHNIC COLLEGE (Academic Session 2026–27 Demo). Faculty names, rooms, timings, contacts, notices, and academic details are fictional for testing and presentation purposes.`,
      category: 'College Information',
      quickActions: ['College Name', 'Timetable', 'Notices'],
    };
  }

  // Strict Rule 10: If the requested information is not present in the PDF, reply exactly:
  // "Sorry, I don't have this information yet."
  return {
    text: NOT_FOUND_MESSAGE,
    category: 'Information',
    quickActions: ['📅 Timetable', '📢 Notices', '📚 Library', '🏫 Facilities'],
  };
}
