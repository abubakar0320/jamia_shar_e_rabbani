'use client';

import React, { useState, useEffect } from 'react';

export default function FloatingWhatsApp() {
  const [mounted, setMounted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const whatsappUrl = `https://wa.me/923144081516?text=${encodeURIComponent(
    'السلام علیکم! جامعہ شیرِ ربانی کے حوالے سے معلومات درکار ہیں۔'
  )}`;

  return (
    <div 
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 print:hidden select-none"
      dir="rtl"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Tooltip / Callout Pill (Hidden on tiny screens, beautiful on mobile & desktop) */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={`hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white text-slate-800 border border-slate-200/90 shadow-xl transition-all duration-300 transform font-urdu ${
          isHovered ? 'opacity-100 translate-x-0' : 'opacity-90 translate-x-1 hover:opacity-100'
        } hover:border-emerald-400`}
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <div className="flex flex-col text-right leading-tight">
          <span className="text-xs font-black text-slate-900 flex items-center gap-1">
            <span>واٹس ایپ پر رابطہ کریں</span>
          </span>
          <span className="text-[11px] font-bold text-emerald-700 font-mono tracking-wider" dir="ltr">
            0314 4081516
          </span>
        </div>
      </a>

      {/* Main Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="جامعہ شیرِ ربانی واٹس ایپ 03144081516"
        className="relative group flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-white shadow-2xl transition-all duration-300 transform hover:scale-110 active:scale-95 focus:outline-none focus:ring-4 focus:ring-emerald-400/50"
      >
        {/* Animated Ripple Ping */}
        <span className="absolute inset-0 rounded-full bg-[#25D366] opacity-35 animate-ping pointer-events-none group-hover:opacity-0" />

        {/* WhatsApp SVG Icon */}
        <svg 
          className="w-8 h-8 sm:w-9 sm:h-9 fill-current drop-shadow-md transition-transform group-hover:rotate-6" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20.52 3.48A11.93 11.93 0 0012.06 0C5.46 0 .09 5.37.09 11.97c0 2.11.55 4.16 1.6 5.97L0 24l6.23-1.63a11.93 11.93 0 005.83 1.51h.01c6.6 0 11.97-5.37 11.97-11.97 0-3.2-1.25-6.21-3.52-8.43zM12.07 21.88h-.01a9.92 9.92 0 01-5.06-1.39l-.36-.21-3.76.99 1-3.66-.24-.38a9.92 9.92 0 01-1.52-5.26c0-5.48 4.46-9.94 9.95-9.94 2.65 0 5.15 1.03 7.03 2.91a9.88 9.88 0 012.91 7.02c0 5.48-4.46 9.94-9.95 9.94zm5.45-7.46c-.3-.15-1.77-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51-.17-.01-.37-.01-.57-.01-.2 0-.52.07-.8.37-.27.3-1.05 1.03-1.05 2.51s1.08 2.91 1.23 3.11c.15.2 2.12 3.24 5.14 4.54.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35z" />
        </svg>

        {/* Small Online Badge on the button */}
        <span className="absolute top-0 right-0 w-4 h-4 bg-emerald-400 border-2 border-white rounded-full shadow-xs" />
      </a>
    </div>
  );
}
