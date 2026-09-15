import React from 'react';
import { Menu, Trash2, Info, GraduationCap } from 'lucide-react';

interface ChatHeaderProps {
  onOpenMenu: () => void;
  onClearChat: () => void;
  onOpenCollegeInfo: () => void;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
  onOpenMenu,
  onClearChat,
  onOpenCollegeInfo,
}) => {
  return (
    <header className="bg-gradient-to-r from-blue-700 via-blue-600 to-indigo-700 text-white px-4 py-3 shadow-md shrink-0 select-none">
      <div className="flex items-center justify-between">
        {/* Left: Navigation Menu Toggle */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            id="nav-menu-button"
            onClick={onOpenMenu}
            aria-label="Open navigation menu"
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 transition-all text-white"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base font-extrabold tracking-wide text-white flex items-center gap-1">
                <span>🤖</span>
                <span>AI SMART CAMPUS</span>
              </h1>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" title="System Online" />
            </div>
            <p className="text-[11px] font-medium text-blue-100 flex items-center gap-1">
              <GraduationCap className="w-3 h-3 text-blue-200" />
              <span>Student Assistant</span>
              <span className="text-blue-300">•</span>
              <span className="text-blue-200 text-[10px] bg-white/20 px-1.5 py-0.5 rounded font-semibold">Govt Polytechnic (Demo Data)</span>
            </p>
          </div>
        </div>

        {/* Right: Quick actions */}
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            id="college-info-header-button"
            onClick={onOpenCollegeInfo}
            title="Browse College Information Handbook"
            className="px-2.5 py-1 rounded-lg bg-white/15 hover:bg-white/25 active:scale-95 text-xs font-semibold text-white flex items-center gap-1 transition-all"
          >
            <Info className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Directory</span>
          </button>

          <button
            type="button"
            id="clear-chat-header-button"
            onClick={onClearChat}
            title="Reset conversation session"
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 active:scale-95 text-blue-100 hover:text-white transition-all"
            aria-label="Clear chat session"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
