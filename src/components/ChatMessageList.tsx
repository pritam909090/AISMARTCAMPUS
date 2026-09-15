import React, { useEffect, useRef, useState } from 'react';
import { Bot, User, Copy, Check, Volume2, VolumeX, AlertCircle, RefreshCw, Sparkles } from 'lucide-react';
import { Message } from '../types';

interface ChatMessageListProps {
  messages: Message[];
  isLoading: boolean;
  onSelectAction: (query: string) => void;
  onRetryLast?: () => void;
}

export const ChatMessageList: React.FC<ChatMessageListProps> = ({
  messages,
  isLoading,
  onSelectAction,
  onRetryLast,
}) => {
  const scrollEndRef = useRef<HTMLDivElement>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [speakingId, setSpeakingId] = useState<string | null>(null);

  useEffect(() => {
    scrollEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleCopy = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSpeak = (id: string, text: string) => {
    if (!('speechSynthesis' in window)) return;

    if (speakingId === id) {
      window.speechSynthesis.cancel();
      setSpeakingId(null);
      return;
    }

    window.speechSynthesis.cancel();
    // Clean markdown asterisks for smoother speech
    const cleanText = text.replace(/[*#_`]/g, '');
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.rate = 1.0;
    utterance.pitch = 1.0;
    utterance.onend = () => setSpeakingId(null);
    utterance.onerror = () => setSpeakingId(null);

    setSpeakingId(id);
    window.speechSynthesis.speak(utterance);
  };

  // Helper to render formatted markdown-like text
  const renderFormattedText = (rawText: string) => {
    const lines = rawText.split('\n');
    return (
      <div className="space-y-1.5 leading-relaxed text-[13.5px]">
        {lines.map((line, idx) => {
          if (!line.trim()) {
            return <div key={idx} className="h-1" />;
          }

          // Format bold **text**
          const formattedParts = line.split(/(\*\*.*?\*\*)/g).map((part, pIdx) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return (
                <strong key={pIdx} className="font-semibold text-slate-900">
                  {part.slice(2, -2)}
                </strong>
              );
            }
            return part;
          });

          // Bullet point line
          if (line.trim().startsWith('•') || line.trim().startsWith('-')) {
            return (
              <div key={idx} className="flex items-start gap-1.5 pl-1">
                <span className="text-blue-500 font-bold shrink-0">•</span>
                <span className="flex-1">{formattedParts}</span>
              </div>
            );
          }

          return <p key={idx}>{formattedParts}</p>;
        })}
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto px-3.5 py-4 space-y-4 bg-slate-50/50">
      {/* Session greeting info pill */}
      <div className="flex justify-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50/90 border border-blue-100/90 text-blue-800 text-[11px] font-medium shadow-2xs">
          <Sparkles className="w-3 h-3 text-blue-600" />
          <span>Apex Institute AI Knowledge Core Online</span>
        </div>
      </div>

      {messages.map((msg) => {
        const isStudent = msg.sender === 'student';

        return (
          <div
            key={msg.id}
            id={`message-${msg.id}`}
            className={`flex flex-col ${isStudent ? 'items-end' : 'items-start'}`}
          >
            <div className={`flex gap-2 max-w-[92%] sm:max-w-[85%] ${isStudent ? 'flex-row-reverse' : 'flex-row'}`}>
              {/* Avatar Icon */}
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 shadow-xs mt-0.5 ${
                  isStudent
                    ? 'bg-blue-700 text-white'
                    : 'bg-white border border-blue-200 text-blue-600'
                }`}
              >
                {isStudent ? <User className="w-3.5 h-3.5" /> : <Bot className="w-4 h-4" />}
              </div>

              {/* Message Bubble Container */}
              <div className="flex flex-col space-y-1">
                <div
                  className={`relative p-3.5 shadow-xs transition-all ${
                    isStudent
                      ? 'bg-blue-600 text-white rounded-2xl rounded-tr-xs'
                      : msg.isError
                      ? 'bg-red-50 border border-red-200 text-red-800 rounded-2xl rounded-tl-xs'
                      : 'bg-white border border-slate-200/80 text-slate-800 rounded-2xl rounded-tl-xs'
                  }`}
                >
                  {/* Category tag if available on AI response */}
                  {!isStudent && msg.category && (
                    <div className="mb-1.5 inline-block">
                      <span className="px-2 py-0.5 rounded-md text-[10px] font-semibold bg-blue-50 text-blue-700 border border-blue-100">
                        {msg.category}
                      </span>
                    </div>
                  )}

                  {/* Message Content */}
                  {isStudent ? (
                    <p className="text-[13.5px] leading-relaxed whitespace-pre-wrap font-normal">
                      {msg.text}
                    </p>
                  ) : (
                    renderFormattedText(msg.text)
                  )}

                  {/* Actions footer for AI message */}
                  {!isStudent && !msg.isError && (
                    <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-slate-400 text-[11px]">
                      <span className="text-[10px] text-slate-400">{msg.timestamp}</span>
                      <div className="flex items-center gap-1.5">
                        <button
                          type="button"
                          id={`copy-btn-${msg.id}`}
                          onClick={() => handleCopy(msg.id, msg.text)}
                          title="Copy response"
                          className="p-1 hover:text-slate-700 hover:bg-slate-100 rounded-md transition-colors"
                        >
                          {copiedId === msg.id ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                        <button
                          type="button"
                          id={`speak-btn-${msg.id}`}
                          onClick={() => handleSpeak(msg.id, msg.text)}
                          title={speakingId === msg.id ? 'Stop audio' : 'Listen audio'}
                          className={`p-1 rounded-md transition-colors ${
                            speakingId === msg.id
                              ? 'text-blue-600 bg-blue-50'
                              : 'hover:text-slate-700 hover:bg-slate-100'
                          }`}
                        >
                          {speakingId === msg.id ? (
                            <VolumeX className="w-3.5 h-3.5 animate-pulse" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Error retry option */}
                  {msg.isError && onRetryLast && (
                    <div className="mt-2 pt-2 border-t border-red-200/60 flex items-center justify-between">
                      <div className="flex items-center gap-1 text-[11px] text-red-600">
                        <AlertCircle className="w-3 h-3" />
                        <span>Could not retrieve answer</span>
                      </div>
                      <button
                        type="button"
                        onClick={onRetryLast}
                        className="inline-flex items-center gap-1 px-2 py-1 text-xs font-semibold rounded-md bg-red-100 hover:bg-red-200 text-red-700 transition-colors"
                      >
                        <RefreshCw className="w-3 h-3" />
                        <span>Retry</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* Follow-up Quick Action Chips */}
                {!isStudent && msg.quickActions && msg.quickActions.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 pt-1 pl-1">
                    {msg.quickActions.map((qa, qIdx) => (
                      <button
                        key={qIdx}
                        type="button"
                        onClick={() => onSelectAction(qa)}
                        className="text-[11px] px-2.5 py-1 rounded-full bg-white border border-blue-200/80 text-blue-700 font-medium hover:bg-blue-50 active:scale-95 transition-all shadow-2xs"
                      >
                        {qa}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <span
              className={`text-[10px] text-slate-400 mt-1 px-1 ${
                isStudent ? 'text-right' : 'text-left'
              }`}
            >
              {msg.timestamp}
            </span>
          </div>
        );
      })}

      {/* Loading Indicator */}
      {isLoading && (
        <div className="flex items-start gap-2 max-w-[85%]">
          <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-200 text-blue-600 flex items-center justify-center shrink-0 mt-0.5">
            <Bot className="w-4 h-4 animate-bounce" />
          </div>
          <div className="bg-white border border-slate-200/90 rounded-2xl rounded-tl-xs p-3.5 shadow-xs">
            <div className="flex items-center gap-2">
              <div className="flex space-x-1">
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]" />
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]" />
                <div className="w-2 h-2 rounded-full bg-blue-500 animate-bounce" />
              </div>
              <span className="text-xs text-slate-500 font-medium">
                Searching verified college records...
              </span>
            </div>
          </div>
        </div>
      )}

      <div ref={scrollEndRef} />
    </div>
  );
};
