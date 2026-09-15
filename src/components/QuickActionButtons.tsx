import React from 'react';
import { Calendar, Bell, BookOpen, Building2, Users, FileText, Phone, HelpCircle } from 'lucide-react';
import { CollegeCategory } from '../utils/collegeQueryEngine';

export interface QuickActionButtonsProps {
  onCategoryClick?: (category: CollegeCategory, label: string) => void;
  onSelectAction?: (query: string) => void;
  disabled?: boolean;
}

export const QuickActionButtons: React.FC<QuickActionButtonsProps> = ({
  onCategoryClick,
  onSelectAction,
  disabled = false,
}) => {
  // Unique handler for Timetable: queries ONLY timetable data
  const handleTimetableClick = () => {
    if (onCategoryClick) {
      onCategoryClick('timetable', '📅 Timetable');
    } else if (onSelectAction) {
      onSelectAction('Show today timetable and class schedule');
    }
  };

  // Unique handler for Notices: queries ONLY notices data
  const handleNoticesClick = () => {
    if (onCategoryClick) {
      onCategoryClick('notices', '📢 Notices');
    } else if (onSelectAction) {
      onSelectAction('What are the latest college notices and announcements?');
    }
  };

  // Unique handler for Library: queries ONLY library data
  const handleLibraryClick = () => {
    if (onCategoryClick) {
      onCategoryClick('library', '📚 Library');
    } else if (onSelectAction) {
      onSelectAction('Tell me about central library timings and book lending rules');
    }
  };

  // Unique handler for Facilities: queries ONLY facilities data
  const handleFacilitiesClick = () => {
    if (onCategoryClick) {
      onCategoryClick('facilities', '🏫 Facilities');
    } else if (onSelectAction) {
      onSelectAction('What facilities are available on campus?');
    }
  };

  // Unique handler for Faculty: queries ONLY faculty data
  const handleFacultyClick = () => {
    if (onCategoryClick) {
      onCategoryClick('faculty', '👨‍🏫 Faculty');
    } else if (onSelectAction) {
      onSelectAction('Faculty list, cabins, and office hours');
    }
  };

  // Unique handler for Exam Dates: queries ONLY exam/examination data
  const handleExamDatesClick = () => {
    if (onCategoryClick) {
      onCategoryClick('exams', '📝 Exam Dates');
    } else if (onSelectAction) {
      onSelectAction('When are the mid-semester exams and admit cards?');
    }
  };

  // Unique handler for Student Services: queries ONLY student-services data
  const handleStudentServicesClick = () => {
    if (onCategoryClick) {
      onCategoryClick('services', '🧑‍🎓 Student Services');
    } else if (onSelectAction) {
      onSelectAction('What student services are available?');
    }
  };

  // Unique handler for Emergency Contacts: queries ONLY contact data
  const handleEmergencyContactsClick = () => {
    if (onCategoryClick) {
      onCategoryClick('contacts', '📞 Emergency Contacts');
    } else if (onSelectAction) {
      onSelectAction('Campus emergency helplines and contact numbers');
    }
  };

  const primaryActions = [
    {
      id: 'quick-action-timetable',
      label: '📅 Timetable',
      handler: handleTimetableClick,
      icon: Calendar,
      color: 'text-blue-600 bg-blue-50 border-blue-200 hover:bg-blue-100',
    },
    {
      id: 'quick-action-notices',
      label: '📢 Notices',
      handler: handleNoticesClick,
      icon: Bell,
      color: 'text-amber-600 bg-amber-50 border-amber-200 hover:bg-amber-100',
    },
    {
      id: 'quick-action-library',
      label: '📚 Library',
      handler: handleLibraryClick,
      icon: BookOpen,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200 hover:bg-emerald-100',
    },
    {
      id: 'quick-action-facilities',
      label: '🏫 Facilities',
      handler: handleFacilitiesClick,
      icon: Building2,
      color: 'text-purple-600 bg-purple-50 border-purple-200 hover:bg-purple-100',
    },
  ];

  const secondaryChips = [
    {
      id: 'secondary-chip-faculty',
      label: '👨‍🏫 Faculty',
      handler: handleFacultyClick,
      icon: Users,
    },
    {
      id: 'secondary-chip-exams',
      label: '📝 Exam Dates',
      handler: handleExamDatesClick,
      icon: FileText,
    },
    {
      id: 'secondary-chip-services',
      label: '🧑‍🎓 Student Services',
      handler: handleStudentServicesClick,
      icon: HelpCircle,
    },
    {
      id: 'secondary-chip-contacts',
      label: '📞 Emergency Contacts',
      handler: handleEmergencyContactsClick,
      icon: Phone,
    },
  ];

  return (
    <div className="py-2.5 px-3 bg-slate-50/90 border-t border-b border-slate-200/80 backdrop-blur-sm">
      <div className="flex items-center justify-between mb-1.5 px-0.5">
        <span className="text-[11px] font-semibold tracking-wider text-slate-500 uppercase">
          Quick Access
        </span>
        <span className="text-[10px] text-blue-600 font-medium">Tap to view</span>
      </div>

      {/* 4 Main Requested Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-1.5 sm:grid-cols-4 mb-2">
        {primaryActions.map((action, i) => {
          const Icon = action.icon;
          return (
            <button
              key={action.id}
              id={`quick-action-${i}`}
              type="button"
              disabled={disabled}
              onClick={action.handler}
              className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl border text-xs font-semibold shadow-xs transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${action.color}`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{action.label}</span>
            </button>
          );
        })}
      </div>

      {/* Secondary quick chips scrollable */}
      <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
        {secondaryChips.map((chip, idx) => {
          const ChipIcon = chip.icon;
          return (
            <button
              key={chip.id}
              id={`secondary-chip-${idx}`}
              type="button"
              disabled={disabled}
              onClick={chip.handler}
              className="flex items-center gap-1.5 shrink-0 px-2.5 py-1 rounded-full bg-white border border-slate-200 text-slate-700 text-[11px] font-medium shadow-2xs hover:bg-slate-100 hover:border-slate-300 transition-colors active:scale-95 disabled:opacity-50 cursor-pointer"
            >
              <ChipIcon className="w-3 h-3 text-slate-500" />
              <span>{chip.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
