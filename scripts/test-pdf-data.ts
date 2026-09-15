import {
  queryByCategory,
  queryCollegeDatabase,
  NO_DATA_AVAILABLE_MESSAGE,
  NOT_FOUND_MESSAGE,
} from '../src/utils/collegeQueryEngine';
import { CAMPUS_DATA } from '../src/data/collegeData';

console.log('=== TEST SUITE: AI SMART CAMPUS DEMO DATA IMPORT ===\n');

// 1. Check Imported Data Records
console.log('--- 1. RECORD COUNT VERIFICATION ---');
console.log('College Info record:', CAMPUS_DATA.collegeInfo.name);
console.log('Departments count:', CAMPUS_DATA.departments.length);
console.log('Faculty count:', CAMPUS_DATA.faculty.length);
console.log('Facilities count:', CAMPUS_DATA.facilities.length);
const timetableSlots = (CAMPUS_DATA.timetable['CSE-1st-Sem'] || []).reduce(
  (acc, day) => acc + day.slots.length,
  0
);
console.log('Timetable days:', (CAMPUS_DATA.timetable['CSE-1st-Sem'] || []).length, `(${timetableSlots} total slots)`);
console.log('Notices count:', CAMPUS_DATA.notices.length);
console.log('Exams count:', CAMPUS_DATA.exams.length);
console.log('Student Services count:', CAMPUS_DATA.studentServices.length);
console.log('Contacts count:', CAMPUS_DATA.contacts.length);
console.log('FAQs count:', CAMPUS_DATA.faqs.length);

const totalRecords =
  1 + // College info
  CAMPUS_DATA.departments.length +
  CAMPUS_DATA.faculty.length +
  CAMPUS_DATA.facilities.length +
  (CAMPUS_DATA.timetable['CSE-1st-Sem'] || []).length +
  CAMPUS_DATA.notices.length +
  CAMPUS_DATA.exams.length +
  CAMPUS_DATA.studentServices.length +
  CAMPUS_DATA.contacts.length +
  CAMPUS_DATA.faqs.length;

console.log(`TOTAL RECORDS IMPORTED: ${totalRecords}\n`);

// 2. Test the 7 Quick Access Buttons
console.log('--- 2. QUICK ACCESS BUTTONS TEST ---');

// Button 1: Timetable
const btnTimetable = queryByCategory('timetable');
console.log('Button Timetable Category:', btnTimetable.category);
const passTimetable =
  btnTimetable.category === 'Timetable' &&
  btnTimetable.text.includes('DEMO TIMETABLE – CSE 1st SEM') &&
  btnTimetable.text.includes('Monday') &&
  btnTimetable.text.includes('Programming in C') &&
  !btnTimetable.text.includes('Central Library') &&
  !btnTimetable.text.includes('Dr. Ankit Sharma, Room C-201');
console.log('Timetable Button Pass:', passTimetable);

// Button 2: Notices
const btnNotices = queryByCategory('notices');
console.log('Button Notices Category:', btnNotices.category);
const passNotices =
  btnNotices.category === 'Notices' &&
  btnNotices.text.includes("Engineers’ Day Project Exhibition") &&
  btnNotices.text.includes('Internal Assessment Schedule') &&
  !btnNotices.text.includes('DEMO TIMETABLE') &&
  !btnNotices.text.includes('Computer Lab 1');
console.log('Notices Button Pass:', passNotices);

// Button 3: Library
const btnLibrary = queryByCategory('library');
console.log('Button Library Category:', btnLibrary.category);
const passLibrary =
  btnLibrary.category === 'Library' &&
  btnLibrary.text.includes('Central Library') &&
  btnLibrary.text.includes('Ground Floor, Main Building') &&
  btnLibrary.text.includes('9:00 AM–5:00 PM') &&
  !btnLibrary.text.includes('Dr. Amit Kumar') &&
  !btnLibrary.text.includes('DEMO TIMETABLE');
console.log('Library Button Pass:', passLibrary);

// Button 4: Facilities
const btnFacilities = queryByCategory('facilities');
console.log('Button Facilities Category:', btnFacilities.category);
const passFacilities =
  btnFacilities.category === 'Facilities' &&
  btnFacilities.text.includes('Central Library') &&
  btnFacilities.text.includes('Computer Lab 1') &&
  btnFacilities.text.includes('Workshop') &&
  !btnFacilities.text.includes('Dr. Ankit Sharma, Room C-201') &&
  !btnFacilities.text.includes('DEMO TIMETABLE');
console.log('Facilities Button Pass:', passFacilities);

// Button 5: Faculty
const btnFaculty = queryByCategory('faculty');
console.log('Button Faculty Category:', btnFaculty.category);
const passFaculty =
  btnFaculty.category === 'Faculty' &&
  btnFaculty.text.includes('Dr. Ankit Sharma') &&
  btnFaculty.text.includes('Room C-201') &&
  btnFaculty.text.includes('Dr. Rohan Mehta') &&
  btnFaculty.text.includes('Room CE-201') &&
  !btnFaculty.text.includes('DEMO TIMETABLE') &&
  !btnFaculty.text.includes('Internal Assessment 1');
console.log('Faculty Button Pass:', passFaculty);

// Button 6: Exam Dates
const btnExams = queryByCategory('exams');
console.log('Button Exams Category:', btnExams.category);
const passExams =
  btnExams.category === 'Exams' &&
  btnExams.text.includes('Internal Assessment 1') &&
  btnExams.text.includes('20 Sep 2026') &&
  btnExams.text.includes('Practical Assessment') &&
  !btnExams.text.includes('Dr. Ankit Sharma') &&
  !btnExams.text.includes('DEMO TIMETABLE');
console.log('Exams Button Pass:', passExams);

// Button 7: Student Services
const btnServices = queryByCategory('services');
console.log('Button Services Category:', btnServices.category);
const passServices =
  btnServices.category === 'Student Services' &&
  btnServices.text.includes('Admission Help Desk') &&
  btnServices.text.includes('Scholarship Help') &&
  btnServices.text.includes('ID Card Support') &&
  !btnServices.text.includes('Dr. Ankit Sharma') &&
  !btnServices.text.includes('DEMO TIMETABLE');
console.log('Student Services Button Pass:', passServices);

// 3. Test the 9 Sample Questions from the User Prompt
console.log('\n--- 3. USER PROMPT SAMPLE QUESTIONS TEST ---');

const q1 = queryCollegeDatabase('What is the college name?');
console.log('Q1: What is the college name?');
console.log('Answer:', q1.text.split('\n')[0]);
const passQ1 = q1.text.includes('GOVERNMENT POLYTECHNIC COLLEGE');

const q2 = queryCollegeDatabase('Where is the CSE department?');
console.log('\nQ2: Where is the CSE department?');
console.log('Answer:', q2.text);
const passQ2 = q2.text.includes('Block A, First Floor');

const q3 = queryCollegeDatabase('Who teaches Data Structures?');
console.log('\nQ3: Who teaches Data Structures?');
console.log('Answer:', q3.text);
const passQ3 = q3.text.includes('Dr. Ankit Sharma') && q3.text.includes('Room C-201');

const q4 = queryCollegeDatabase("Where is Dr. Ankit Sharma's room?");
console.log("\nQ4: Where is Dr. Ankit Sharma's room?");
console.log('Answer:', q4.text);
const passQ4 = q4.text.includes('Room C-201');

const q5 = queryCollegeDatabase('What are the library timings?');
console.log('\nQ5: What are the library timings?');
console.log('Answer:', q5.text);
const passQ5 = q5.text.includes('Monday–Saturday, 9:00 AM–5:00 PM');

const q6 = queryCollegeDatabase('Show CSE 1st semester timetable.');
console.log('\nQ6: Show CSE 1st semester timetable.');
console.log('Answer snippet:', q6.text.slice(0, 100), '...');
const passQ6 = q6.text.includes('DEMO TIMETABLE – CSE 1st SEM') && q6.text.includes('Monday') && q6.text.includes('C-101');

const q7 = queryCollegeDatabase('What are the latest notices?');
console.log('\nQ7: What are the latest notices?');
console.log('Answer snippet:', q7.text.slice(0, 100), '...');
const passQ7 = q7.text.includes("Engineers’ Day Project Exhibition") && q7.text.includes('16 Sep 2026');

const q8 = queryCollegeDatabase('When is Internal Assessment 1?');
console.log('\nQ8: When is Internal Assessment 1?');
console.log('Answer:', q8.text);
const passQ8 = q8.text.includes('Internal Assessment 1') && q8.text.includes('20 Sep 2026') && q8.text.includes('10:00 AM–12:00 PM');

const q9 = queryCollegeDatabase('What student services are available?');
console.log('\nQ9: What student services are available?');
console.log('Answer snippet:', q9.text.slice(0, 100), '...');
const passQ9 = q9.text.includes('Admission Help Desk') && q9.text.includes('Scholarship Help') && q9.text.includes('ID Card Support');

// Test Missing Information Rule (Rule 10)
console.log('\n--- 4. MISSING INFORMATION FALLBACK TEST (RULE 10) ---');
const qUnlisted = queryCollegeDatabase('What is the hostel swimming pool fee?');
console.log('Unlisted Question Answer:', qUnlisted.text);
const passUnlisted = qUnlisted.text === 'Sorry, I don\'t have this information yet.';
console.log('Unlisted Question Fallback Pass:', passUnlisted);

const allTestsPassed =
  passTimetable &&
  passNotices &&
  passLibrary &&
  passFacilities &&
  passFaculty &&
  passExams &&
  passServices &&
  passQ1 &&
  passQ2 &&
  passQ3 &&
  passQ4 &&
  passQ5 &&
  passQ6 &&
  passQ7 &&
  passQ8 &&
  passQ9 &&
  passUnlisted;

console.log('\n>>> OVERALL TEST RESULT:', allTestsPassed ? 'ALL TESTS PASSED SUCCESSFULLY! ✅' : 'FAILED ❌');

if (!allTestsPassed) {
  process.exit(1);
}
