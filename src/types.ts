export interface Message {
  id: string;
  sender: 'student' | 'ai';
  text: string;
  timestamp: string;
  category?: string;
  quickActions?: string[];
  isError?: boolean;
}

export interface CollegeInfo {
  name: string;
  institutionType: string;
  campus: string;
  academicSession: string;
  officeHours: string;
  studentHelpDesk: string;
  generalEmail: string;
  mainPhone: string;
  isDemo: boolean;
  demoNotice: string;
  tagline?: string;
  code?: string;
  address?: string;
  overview?: string;
  timings?: string;
  gates?: string;
  affiliation?: string;
  accreditation?: string;
  established?: number;
  campusSize?: string;
}

export interface Department {
  id: string;
  name: string;
  location: string;
  code?: string;
  hod?: string;
  email?: string;
  building?: string;
  labs?: string[];
  intake?: number;
  programs?: string[];
}

export interface FacultyMember {
  id: string;
  name: string;
  department: string;
  designation: string;
  subject: string;
  cabin: string;
  subjects: string[];
  email?: string;
  officeHours?: string;
}

export interface Facility {
  id: string;
  name: string;
  location: string;
  timings: string;
  days?: string;
  inCharge?: string;
  description?: string;
  rules?: string[];
}

export interface TimetableSlot {
  time: string;
  subject: string;
  room: string;
  code?: string;
  faculty?: string;
  type?: 'Lecture' | 'Lab' | 'Tutorial' | 'Break';
}

export interface DayTimetable {
  day: string;
  slots: TimetableSlot[];
}

export interface Notice {
  id: string;
  date: string;
  title: string;
  details: string;
  venue?: string;
  department?: string;
  priority?: 'Urgent' | 'Important' | 'General';
  content?: string;
  issuedBy?: string;
}

export interface ExamInfo {
  id: string;
  examName: string;
  semester: string;
  date: string;
  timing: string;
  venue: string;
  startDate?: string;
  endDate?: string;
  admitCardDate?: string;
  cellLocation?: string;
  feeDeadline?: string;
  guidelines?: string[];
}

export interface StudentService {
  id: string;
  serviceName: string;
  location: string;
  timing: string;
  counterNumber?: string;
  inCharge?: string;
  process?: string;
}

export interface ContactEntry {
  id: string;
  office: string;
  location: string;
  timing: string;
  role?: string;
  name?: string;
  phone?: string;
  email?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface CampusDatabase {
  collegeInfo: CollegeInfo;
  departments: Department[];
  faculty: FacultyMember[];
  facilities: Facility[];
  timetable: Record<string, DayTimetable[]>;
  notices: Notice[];
  exams: ExamInfo[];
  studentServices: StudentService[];
  contacts: ContactEntry[];
  faqs: FAQItem[];
}
