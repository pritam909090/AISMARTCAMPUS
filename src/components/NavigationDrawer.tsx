import React, { useState } from 'react';
import {
  X,
  Building,
  Users,
  Calendar,
  Bell,
  BookOpen,
  FileCheck,
  Headphones,
  Phone,
  HelpCircle,
  Sparkles,
  Award,
  Search,
  MessageSquare,
  Smartphone,
  CheckCircle2,
  AlertTriangle,
} from 'lucide-react';
import { CAMPUS_DATA } from '../data/collegeData';

interface NavigationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  activeSection: 'menu' | 'about' | 'college-info' | 'help' | 'android-app';
  onNavigate: (section: 'menu' | 'about' | 'college-info' | 'help' | 'android-app') => void;
  onAskQuestion: (question: string) => void;
}

export const NavigationDrawer: React.FC<NavigationDrawerProps> = ({
  isOpen,
  onClose,
  activeSection,
  onNavigate,
  onAskQuestion,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const categories = [
    { id: 'all', label: 'All Info' },
    { id: 'college', label: 'College Info' },
    { id: 'departments', label: 'Departments' },
    { id: 'faculty', label: 'Faculty' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'timetable', label: 'Timetable' },
    { id: 'notices', label: 'Notices' },
    { id: 'exams', label: 'Exams' },
    { id: 'services', label: 'Student Services' },
    { id: 'contacts', label: 'Contacts' },
    { id: 'faqs', label: 'FAQs' },
  ];

  const samplePrompts = [
    "What is the college name?",
    "Where is the CSE department?",
    "Who teaches Data Structures?",
    "Where is Dr. Ankit Sharma's room?",
    "What are the library timings?",
    "Show CSE 1st semester timetable.",
    "What are the latest notices?",
    "When is Internal Assessment 1?",
    "What student services are available?",
    "Where is Computer Lab 1?",
    "Where is the Examination Office?",
    "Who teaches Programming in C?",
  ];

  const term = searchTerm.toLowerCase().trim();

  return (
    <div className="fixed inset-0 z-50 flex bg-slate-900/60 backdrop-blur-xs transition-opacity animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-white h-full flex flex-col shadow-2xl overflow-hidden ml-0 mr-auto">
        {/* Top Header */}
        <div className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white p-4 shrink-0 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-white/20 flex items-center justify-center text-lg">
              🤖
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h2 className="font-bold text-sm tracking-wide">AI SMART CAMPUS</h2>
                <span className="text-[10px] bg-amber-400/90 text-slate-900 font-extrabold px-1.5 py-0.2 rounded">DEMO DATA</span>
              </div>
              <p className="text-[11px] text-blue-100">{CAMPUS_DATA.collegeInfo.name}</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close menu"
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 active:scale-95 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex bg-slate-100 border-b border-slate-200 text-xs font-semibold shrink-0">
          <button
            type="button"
            onClick={() => onNavigate('college-info')}
            className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
              activeSection === 'college-info'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Directory (Demo)
          </button>
          <button
            type="button"
            onClick={() => onNavigate('menu')}
            className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
              activeSection === 'menu'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Prompts
          </button>
          <button
            type="button"
            onClick={() => onNavigate('about')}
            className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
              activeSection === 'about'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            About
          </button>
          <button
            type="button"
            onClick={() => onNavigate('help')}
            className={`flex-1 py-2.5 text-center transition-colors border-b-2 ${
              activeSection === 'help'
                ? 'border-blue-600 text-blue-600 bg-white'
                : 'border-transparent text-slate-600 hover:text-slate-900'
            }`}
          >
            Help
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* 1. COLLEGE INFORMATION BROWSER */}
          {activeSection === 'college-info' && (
            <div className="space-y-4">
              {/* Demo Notice Banner */}
              <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <div className="text-[11px] leading-relaxed">
                  <span className="font-bold">Demo Dataset Notice:</span> This knowledge base is imported from the fictional demo PDF for testing and software presentation.
                </div>
              </div>

              {/* Search input */}
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Filter demo handbook (faculty, room, lab...)"
                  className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-slate-200 bg-slate-50 text-xs focus:outline-hidden focus:border-blue-500 focus:bg-white"
                />
              </div>

              {/* Category selector pills */}
              <div className="flex gap-1.5 overflow-x-auto no-scrollbar pb-1">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => setSelectedCategory(c.id)}
                    className={`px-2.5 py-1 rounded-full text-[11px] font-medium shrink-0 transition-all ${
                      selectedCategory === c.id
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                    }`}
                  >
                    {c.label}
                  </button>
                ))}
              </div>

              {/* 1. College Overview Card */}
              {(selectedCategory === 'all' || selectedCategory === 'college') &&
                (!term || 'college information government polytechnic college'.includes(term)) && (
                  <div className="p-3.5 rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 text-slate-800 space-y-2">
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-blue-600" />
                      <h3 className="font-bold text-xs text-blue-900">
                        {CAMPUS_DATA.collegeInfo.name}
                      </h3>
                      <span className="text-[9px] bg-blue-200 text-blue-800 px-1 rounded font-bold">Demo</span>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-700 pt-1">
                      <div>
                        <span className="font-semibold text-slate-900">Institution:</span> {CAMPUS_DATA.collegeInfo.institutionType}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900">Campus:</span> {CAMPUS_DATA.collegeInfo.campus}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900">Session:</span> {CAMPUS_DATA.collegeInfo.academicSession}
                      </div>
                      <div>
                        <span className="font-semibold text-slate-900">Office Hours:</span> {CAMPUS_DATA.collegeInfo.officeHours}
                      </div>
                      <div className="col-span-2">
                        <span className="font-semibold text-slate-900">Help Desk:</span> {CAMPUS_DATA.collegeInfo.studentHelpDesk}
                      </div>
                      <div className="col-span-2">
                        <span className="font-semibold text-slate-900">Email:</span> {CAMPUS_DATA.collegeInfo.generalEmail}
                      </div>
                      <div className="col-span-2">
                        <span className="font-semibold text-slate-900">Phone:</span> {CAMPUS_DATA.collegeInfo.mainPhone}
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        onAskQuestion("What is the college name?");
                        onClose();
                      }}
                      className="w-full mt-2 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                    >
                      <MessageSquare className="w-3 h-3" />
                      <span>Ask AI: What is the college name?</span>
                    </button>
                  </div>
                )}

              {/* 2. Departments */}
              {(selectedCategory === 'all' || selectedCategory === 'departments') && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-indigo-600" />
                    <span>Departments</span>
                  </h4>
                  {CAMPUS_DATA.departments
                    .filter((d) => !term || d.name.toLowerCase().includes(term) || d.location.toLowerCase().includes(term))
                    .map((dept) => (
                      <div
                        key={dept.id}
                        className="p-3 rounded-xl border border-slate-200 bg-white hover:border-indigo-300 transition-all flex items-center justify-between"
                      >
                        <div>
                          <div className="text-xs font-bold text-slate-900">{dept.name}</div>
                          <div className="text-[11px] text-slate-600">📍 {dept.location}</div>
                          {dept.hod && <div className="text-[10px] text-slate-500">HOD: {dept.hod}</div>}
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            onAskQuestion(`Where is the ${dept.code || dept.name} department?`);
                            onClose();
                          }}
                          className="text-xs font-semibold text-blue-600 hover:underline"
                        >
                          Ask AI →
                        </button>
                      </div>
                    ))}
                </div>
              )}

              {/* 3. Faculty Directory */}
              {(selectedCategory === 'all' || selectedCategory === 'faculty') && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-blue-600" />
                    <span>Faculty (Demo)</span>
                  </h4>
                  {CAMPUS_DATA.faculty
                    .filter(
                      (f) =>
                        !term ||
                        f.name.toLowerCase().includes(term) ||
                        f.subject.toLowerCase().includes(term) ||
                        f.cabin.toLowerCase().includes(term) ||
                        f.department.toLowerCase().includes(term)
                    )
                    .map((f) => (
                      <div
                        key={f.id}
                        className="p-3 rounded-xl border border-slate-200 bg-white hover:border-blue-300 transition-all space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{f.name}</span>
                          <span className="text-[10px] text-slate-500 font-semibold">{f.department}</span>
                        </div>
                        <p className="text-[11px] text-blue-700 font-medium">
                          {f.designation} • {f.subject}
                        </p>
                        <p className="text-[11px] text-slate-700">
                          🚪 <strong>Room:</strong> {f.cabin}
                        </p>
                        <div className="flex items-center justify-between pt-1">
                          <span className="text-[10px] text-slate-400">Office Hours: 10:00 AM–4:00 PM</span>
                          <button
                            type="button"
                            onClick={() => {
                              onAskQuestion(`Where is ${f.name}'s room?`);
                              onClose();
                            }}
                            className="text-blue-600 text-[11px] font-semibold hover:underline"
                          >
                            Ask AI →
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* 4. Facilities */}
              {(selectedCategory === 'all' || selectedCategory === 'facilities') && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-purple-600" />
                    <span>Facilities</span>
                  </h4>
                  {CAMPUS_DATA.facilities
                    .filter((fac) => !term || fac.name.toLowerCase().includes(term) || fac.location.toLowerCase().includes(term))
                    .map((fac) => (
                      <div
                        key={fac.id}
                        className="p-3 rounded-xl border border-slate-200 bg-white hover:border-purple-300 transition-all space-y-1"
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{fac.name}</span>
                          <span className="text-[10px] text-purple-700 font-medium">{fac.timings}</span>
                        </div>
                        <div className="text-[11px] text-slate-600">📍 {fac.location}</div>
                        <div className="flex items-center justify-between text-[10px] text-slate-400 pt-1">
                          <span>{fac.days || 'Demo Schedule'}</span>
                          <button
                            type="button"
                            onClick={() => {
                              onAskQuestion(`What are the timings and location of ${fac.name}?`);
                              onClose();
                            }}
                            className="text-purple-600 font-semibold hover:underline text-[11px]"
                          >
                            Ask AI →
                          </button>
                        </div>
                      </div>
                    ))}
                </div>
              )}

              {/* 5. Timetable */}
              {(selectedCategory === 'all' || selectedCategory === 'timetable') && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Demo Timetable – CSE 1st Sem</span>
                  </h4>
                  {(CAMPUS_DATA.timetable['CSE-1st-Sem'] || []).map((day) => (
                    <div key={day.day} className="p-3 rounded-xl border border-slate-200 bg-white space-y-1">
                      <div className="text-xs font-bold text-emerald-800">{day.day}</div>
                      <div className="space-y-1">
                        {day.slots.map((s, idx) => (
                          <div key={idx} className="text-[11px] text-slate-700 flex justify-between">
                            <span>{s.time} {s.subject}</span>
                            <span className="font-semibold text-slate-900">{s.room}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => {
                      onAskQuestion("Show CSE 1st semester timetable.");
                      onClose();
                    }}
                    className="w-full py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold flex items-center justify-center gap-1.5 transition-all"
                  >
                    <MessageSquare className="w-3 h-3" />
                    <span>Ask AI: Show CSE 1st semester timetable</span>
                  </button>
                </div>
              )}

              {/* 6. Notices */}
              {(selectedCategory === 'all' || selectedCategory === 'notices') && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Bell className="w-3.5 h-3.5 text-amber-600" />
                    <span>Demo Notices</span>
                  </h4>
                  {CAMPUS_DATA.notices
                    .filter((n) => !term || n.title.toLowerCase().includes(term) || n.details.toLowerCase().includes(term))
                    .map((n) => (
                      <div key={n.id} className="p-3 rounded-xl border border-slate-200 bg-white space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-bold text-slate-900">{n.title}</span>
                          <span className="text-[10px] text-amber-700 font-bold">{n.date}</span>
                        </div>
                        <div className="text-[11px] text-slate-600">{n.details}</div>
                        <button
                          type="button"
                          onClick={() => {
                            onAskQuestion(`Tell me about the notice: ${n.title}`);
                            onClose();
                          }}
                          className="text-blue-600 text-[11px] font-semibold hover:underline"
                        >
                          Ask AI →
                        </button>
                      </div>
                    ))}
                </div>
              )}

              {/* 7. Exams */}
              {(selectedCategory === 'all' || selectedCategory === 'exams') && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <FileCheck className="w-3.5 h-3.5 text-red-600" />
                    <span>Demo Exams</span>
                  </h4>
                  {CAMPUS_DATA.exams.map((ex) => (
                    <div key={ex.id} className="p-3 rounded-xl border border-red-200 bg-red-50/50 space-y-1">
                      <div className="text-xs font-bold text-red-900">{ex.examName}</div>
                      <div className="text-[11px] text-slate-700">
                        {ex.semester} | <strong>{ex.date}</strong> | {ex.timing} | Room: <strong>{ex.venue}</strong>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          onAskQuestion(`When is ${ex.examName}?`);
                          onClose();
                        }}
                        className="text-red-700 text-[11px] font-bold hover:underline"
                      >
                        Ask AI →
                      </button>
                    </div>
                  ))}
                </div>
              )}

              {/* 8. Student Services */}
              {(selectedCategory === 'all' || selectedCategory === 'services') && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Headphones className="w-3.5 h-3.5 text-blue-600" />
                    <span>Student Services</span>
                  </h4>
                  {CAMPUS_DATA.studentServices
                    .filter((s) => !term || s.serviceName.toLowerCase().includes(term) || s.location.toLowerCase().includes(term))
                    .map((s) => (
                      <div key={s.id} className="p-2.5 rounded-xl border border-slate-200 bg-white space-y-0.5">
                        <div className="text-xs font-bold text-slate-900">{s.serviceName}</div>
                        <div className="text-[11px] text-slate-600">📍 {s.location}</div>
                        <div className="text-[10px] text-slate-500">⏰ {s.timing}</div>
                      </div>
                    ))}
                </div>
              )}

              {/* 9. Contacts */}
              {(selectedCategory === 'all' || selectedCategory === 'contacts') && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-emerald-600" />
                    <span>Contacts (Demo)</span>
                  </h4>
                  {CAMPUS_DATA.contacts.map((c) => (
                    <div key={c.id} className="p-2.5 rounded-xl border border-slate-200 bg-white flex justify-between items-center">
                      <div>
                        <div className="text-xs font-bold text-slate-900">{c.office}</div>
                        <div className="text-[11px] text-slate-600">📍 {c.location}</div>
                      </div>
                      <div className="text-[10px] text-slate-500 font-medium">{c.timing}</div>
                    </div>
                  ))}
                </div>
              )}

              {/* 10. FAQs */}
              {(selectedCategory === 'all' || selectedCategory === 'faqs') && (
                <div className="space-y-2">
                  <h4 className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-purple-600" />
                    <span>Demo FAQs</span>
                  </h4>
                  {CAMPUS_DATA.faqs.map((faq) => (
                    <div key={faq.id} className="p-2.5 rounded-xl border border-slate-200 bg-white space-y-1">
                      <button
                        type="button"
                        onClick={() => {
                          onAskQuestion(faq.question);
                          onClose();
                        }}
                        className="text-xs font-bold text-blue-700 text-left hover:underline block"
                      >
                        Q: {faq.question}
                      </button>
                      <p className="text-[11px] text-slate-700">A: {faq.answer}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 2. SAMPLE PROMPTS TAB */}
          {activeSection === 'menu' && (
            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-blue-900 text-xs">
                Tap any question below to immediately ask the AI Assistant:
              </div>
              <div className="space-y-1.5">
                {samplePrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      onAskQuestion(prompt);
                      onClose();
                    }}
                    className="w-full p-2.5 text-left rounded-xl border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 bg-white transition-all text-xs text-slate-800 flex items-center justify-between gap-2"
                  >
                    <span>{prompt}</span>
                    <span className="text-blue-600 font-bold shrink-0">→</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 3. ABOUT TAB */}
          {activeSection === 'about' && (
            <div className="space-y-4 text-xs text-slate-700">
              <div className="p-4 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white space-y-2">
                <div className="text-[10px] bg-white/20 font-bold px-2 py-0.5 rounded-full inline-block">DEMO KNOWLEDGE BASE</div>
                <h3 className="text-sm font-bold">{CAMPUS_DATA.collegeInfo.name}</h3>
                <p className="text-[11px] text-blue-100 leading-relaxed">
                  {CAMPUS_DATA.collegeInfo.demoNotice}
                </p>
              </div>

              <div className="p-3 rounded-xl border border-slate-200 bg-white space-y-2">
                <h4 className="font-bold text-slate-900">Knowledge Base Statistics</h4>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  <div>• 1 College Info Record</div>
                  <div>• 5 Departments</div>
                  <div>• 12 Demo Faculty</div>
                  <div>• 9 Facilities</div>
                  <div>• 5 Days Timetable</div>
                  <div>• 4 Demo Notices</div>
                  <div>• 3 Demo Exams</div>
                  <div>• 6 Student Services</div>
                  <div>• 5 Offices/Contacts</div>
                  <div>• 7 Demo FAQs</div>
                </div>
              </div>
            </div>
          )}

          {/* 4. HELP TAB */}
          {activeSection === 'help' && (
            <div className="space-y-3 text-xs text-slate-700">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-white space-y-2">
                <h4 className="font-bold text-slate-900 flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
                  <span>How to Use the Assistant</span>
                </h4>
                <p className="text-[11px] text-slate-600 leading-relaxed">
                  Use the quick buttons at the top of the chat (Timetable, Notices, Library, Facilities, Faculty, Exam Dates, Student Services) or type any question into the message bar.
                </p>
                <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 text-[11px]">
                  <strong>Strict Answering Rule:</strong> The assistant is strictly grounded in the demo PDF dataset. Questions outside this dataset will receive: <em>"Sorry, I don't have this information yet."</em>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
