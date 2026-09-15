import React, { useState, useEffect } from 'react';
import { Wifi, BatteryMedium, Signal, Smartphone, Maximize2, Minimize2 } from 'lucide-react';

interface AndroidFrameProps {
  children: React.ReactNode;
}

export const AndroidFrame: React.FC<AndroidFrameProps> = ({ children }) => {
  const [currentTime, setCurrentTime] = useState('09:41');
  const [isDeviceMockup, setIsDeviceMockup] = useState(true);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-slate-900/95 sm:bg-slate-800 text-slate-800 flex flex-col items-center justify-center p-0 sm:p-4 md:p-6 select-none font-sans">
      {/* Top Device Mode Toolbar for presentation (Desktop only) */}
      <div className="hidden sm:flex items-center justify-between w-full max-w-[430px] mb-2 px-2 text-slate-300 text-xs">
        <div className="flex items-center gap-1.5 font-medium">
          <Smartphone className="w-3.5 h-3.5 text-blue-400" />
          <span>Android Mobile Preview</span>
        </div>
        <button
          type="button"
          onClick={() => setIsDeviceMockup(!isDeviceMockup)}
          className="flex items-center gap-1 px-2 py-0.5 rounded-md bg-slate-700 hover:bg-slate-600 text-slate-200 text-[11px] transition-colors"
        >
          {isDeviceMockup ? (
            <>
              <Maximize2 className="w-3 h-3" />
              <span>Full Width</span>
            </>
          ) : (
            <>
              <Minimize2 className="w-3 h-3" />
              <span>Phone Frame</span>
            </>
          )}
        </button>
      </div>

      {/* Main Container: Android Phone Chassis or Fluid View */}
      <div
        className={`w-full bg-white flex flex-col overflow-hidden transition-all duration-300 ${
          isDeviceMockup
            ? 'sm:max-w-[430px] sm:h-[890px] sm:max-h-[95vh] sm:rounded-[44px] sm:border-[8px] sm:border-slate-800 sm:shadow-2xl sm:ring-1 sm:ring-slate-700/50'
            : 'max-w-3xl h-screen sm:h-[90vh] sm:rounded-2xl sm:shadow-xl sm:border border-slate-700'
        }`}
      >
        {/* Android Status Bar */}
        <div className="bg-blue-700 text-white px-5 pt-2.5 pb-1 flex items-center justify-between text-xs font-semibold shrink-0 select-none z-10">
          <span>{currentTime}</span>

          {/* Camera Notch / Hole Punch (Mockup) */}
          {isDeviceMockup && (
            <div className="hidden sm:block w-3 h-3 rounded-full bg-slate-900 border border-slate-700 mx-auto" />
          )}

          <div className="flex items-center gap-1.5 text-white/90">
            <Signal className="w-3.5 h-3.5" />
            <Wifi className="w-3.5 h-3.5" />
            <BatteryMedium className="w-4 h-4" />
          </div>
        </div>

        {/* Dynamic App Content */}
        <div className="flex-1 flex flex-col overflow-hidden relative bg-white">
          {children}
        </div>

        {/* Android Gesture Navigation Bar Pill */}
        <div className="bg-white py-2 flex justify-center items-center shrink-0 border-t border-slate-100">
          <div className="w-28 h-1 rounded-full bg-slate-300" />
        </div>
      </div>
    </div>
  );
};
