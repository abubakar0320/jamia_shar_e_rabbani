'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const Header = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { label: t('Home', 'Home'), href: '/' },
    { label: t('About Us', 'About'), href: '/about' },
    { label: t('Courses', 'Courses'), href: '/courses' },
    { label: t('Faculty', 'Faculty'), href: '/faculty' },
    { label: t('Research', 'Research'), href: '/islamic-research-center' },
    { label: t('News', 'News'), href: '/news' },
    { label: t('Wafaq Results', 'Wafaq Results'), href: '/wafaq-results' },
    { label: t('Exam Mess', 'Exam Mess'), href: '/exam-mess' },
    { label: t('Donations', 'Donations'), href: '/donations' },
    { label: t('Admissions', 'Admissions'), href: '/admissions' },
    { label: t('Internship', 'Internship'), href: '/internship' },
    { label: t('Contact', 'Contact'), href: '/contact' },
  ];

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 print:hidden">
        {/* Skeleton Header: Logo & Title */}
        <div className="bg-white border-b border-slate-100 py-3 md:py-4">
          <div className="max-w-[1600px] mx-auto px-4 md:px-8 flex items-center justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 bg-slate-100 rounded-full animate-pulse" />
              <div className="flex flex-col gap-1.5">
                <div className="h-4 w-44 bg-slate-100 rounded animate-pulse" />
                <div className="h-2.5 w-28 bg-slate-50 rounded animate-pulse" />
              </div>
            </div>
          </div>
        </div>
        {/* Skeleton Navbar */}
        <div className="bg-emerald-800 h-11" />
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm font-sans print:hidden">
      {/* 1. TOP HEADER: Logo & Name only */}
      <div className="bg-white border-b border-slate-100 py-3 md:py-4">
        <div className="max-w-[1600px] mx-auto px-4 md:px-8 flex items-center justify-between">
          {/* Logo & Name */}
          <Link href="/" className="flex items-center gap-3.5 group">
            <div className="relative w-11 h-11 md:w-13 md:h-13 flex-shrink-0">
              <Image 
                src="/logo.jpeg" 
                alt="Jamia Sher-e-Rabbani Logo" 
                width={52} 
                height={52} 
                className="rounded-full shadow-sm group-hover:scale-105 transition-transform border border-emerald-100 object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-baseline gap-2">
                <span className="text-xl md:text-2xl font-black text-emerald-800 tracking-tight leading-none group-hover:text-emerald-700 transition-colors">
                  JAMIA SHER-E-RABBANI
                </span>
                <span className="hidden sm:inline-block text-xs font-bold text-emerald-700/80">
                  جامعہ شیرِ ربانی
                </span>
              </div>
              <span className="text-[10px] md:text-[11px] font-bold text-slate-500 tracking-[0.2em] leading-tight uppercase mt-1">
                Islamic Seminary & Research Center • Mananwala
              </span>
            </div>
          </Link>

          {/* Affiliation & National Logos (Wafaq, Punjab Government, Saudi Arabia, Army) */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-4 lg:gap-5">
            {/* Wafaq ul Madaris Al Islamia Al Rizvia */}
            <div className="flex items-center gap-1.5 sm:gap-2 group" title="وفاق المدارس الاسلامیہ الرضویہ پاکستان">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 flex-shrink-0 flex items-center justify-center p-0.5 rounded-full bg-slate-50 border border-slate-100 shadow-2xs group-hover:shadow-xs transition-shadow">
                <Image
                  src="/images/wafaq-logo.png"
                  alt="Wafaq ul Madaris Al Islamia Al Rizvia"
                  width={44}
                  height={44}
                  className="object-contain max-h-7 sm:max-h-9 md:max-h-10 w-auto group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="hidden 2xl:flex flex-col text-left leading-none">
                <span className="text-[11px] font-black text-slate-800 tracking-tight">وفاق المدارس</span>
                <span className="text-[9px] font-bold text-slate-500 mt-0.5">الاسلامیہ الرضویہ</span>
              </div>
            </div>

            {/* Government of the Punjab */}
            <div className="flex items-center gap-1.5 sm:gap-2 group" title="حکومت پنجاب - Government of the Punjab">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 flex-shrink-0 flex items-center justify-center p-0.5 rounded-full bg-slate-50 border border-slate-100 shadow-2xs group-hover:shadow-xs transition-shadow">
                <Image
                  src="/images/gov-logo.svg"
                  alt="Government of the Punjab"
                  width={44}
                  height={44}
                  className="object-contain max-h-7 sm:max-h-9 md:max-h-10 w-auto group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="hidden 2xl:flex flex-col text-left leading-none">
                <span className="text-[11px] font-black text-slate-800 tracking-tight">حکومتِ پنجاب</span>
                <span className="text-[9px] font-bold text-slate-500 mt-0.5">Govt of Punjab</span>
              </div>
            </div>

            {/* Kingdom of Saudi Arabia Official Emblem */}
            <div className="flex items-center gap-1.5 sm:gap-2 group" title="مملکتِ سعودی عرب - Kingdom of Saudi Arabia">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 flex-shrink-0 flex items-center justify-center p-0.5 rounded-full bg-emerald-50/70 border border-emerald-100 shadow-2xs group-hover:shadow-xs transition-shadow">
                <Image
                  src="/images/saudi-logo.svg"
                  alt="Kingdom of Saudi Arabia"
                  width={44}
                  height={44}
                  className="object-contain max-h-7 sm:max-h-9 md:max-h-10 w-auto group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="hidden 2xl:flex flex-col text-left leading-none">
                <span className="text-[11px] font-black text-slate-800 tracking-tight">مملکتِ سعودی عرب</span>
                <span className="text-[9px] font-bold text-slate-500 mt-0.5">Saudi Arabia</span>
              </div>
            </div>

            {/* Pakistan Army */}
            <div className="flex items-center gap-1.5 sm:gap-2 group" title="پاک فوج - Pakistan Army">
              <div className="relative w-8 h-8 sm:w-10 sm:h-10 md:w-11 md:h-11 flex-shrink-0 flex items-center justify-center p-0.5 rounded-full bg-slate-50 border border-slate-100 shadow-2xs group-hover:shadow-xs transition-shadow">
                <Image
                  src="/images/army-logo.png"
                  alt="Pakistan Army"
                  width={44}
                  height={44}
                  className="object-contain max-h-7 sm:max-h-9 md:max-h-10 w-auto group-hover:scale-105 transition-transform"
                />
              </div>
              <div className="hidden 2xl:flex flex-col text-left leading-none">
                <span className="text-[11px] font-black text-slate-800 tracking-tight">پاک فوج</span>
                <span className="text-[9px] font-bold text-slate-500 mt-0.5">Pakistan Army</span>
              </div>
            </div>

            {/* Mobile hamburger button */}
            <div className="xl:hidden flex items-center ml-1">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-1.5 rounded-lg text-slate-700 hover:bg-slate-100 transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 2. NAVBAR: Dedicated bar containing ALL options / menu items */}
      <nav className="bg-emerald-800 text-white shadow-md border-t border-emerald-700/60">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-8">
          <div className="flex items-center justify-between h-12">
            
            {/* All Navigation Links visible on ALL screen sizes right next to Home */}
            <div className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1 w-full rtl:space-x-reverse">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`px-3 py-1.5 text-[12px] md:text-[13px] font-bold tracking-wide rounded-md transition-all whitespace-nowrap uppercase flex-shrink-0 ${
                      isActive
                        ? 'bg-emerald-950/80 text-amber-300 shadow-xs ring-1 ring-amber-300/30'
                        : 'text-emerald-50 hover:text-white hover:bg-emerald-700/80'
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}

              {/* Mobile quick apply button inside scrollable menu */}
              <Link
                href="/admissions"
                className="md:hidden flex-shrink-0 ml-1 px-3.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-900 text-[11px] font-black rounded-full shadow-xs uppercase tracking-wider whitespace-nowrap"
              >
                {t('apply_now', 'Apply Now')}
              </Link>
            </div>

            {/* Desktop / Tablet Right CTA: Apply Now */}
            <div className="flex-shrink-0 ml-3 pl-3 border-l border-emerald-700/70 hidden md:flex items-center">
              <Link
                href="/admissions"
                className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 text-[12px] font-black rounded-full shadow-sm hover:shadow transition-all uppercase tracking-wide whitespace-nowrap"
              >
                {t('apply_now', 'Apply Now')}
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="xl:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40"
            />
            
            {/* Sidebar */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="xl:hidden fixed top-0 right-0 h-screen w-[80vw] sm:w-80 bg-white z-50 overflow-y-auto shadow-2xl flex flex-col"
            >
              <div className="px-6 py-5 flex justify-between items-center border-b border-slate-100 bg-emerald-800 text-white">
                <div className="flex items-center gap-2">
                  <Image 
                    src="/logo.jpeg" 
                    alt="Logo" 
                    width={32} 
                    height={32} 
                    className="rounded-full border border-white/20"
                  />
                  <span className="font-black text-sm tracking-tight">JAMIA SHER-E-RABBANI</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 -mr-1 rounded-lg text-emerald-100 hover:text-white hover:bg-emerald-700/60 transition-colors"
                >
                  <X size={22} />
                </button>
              </div>
              
              <div className="px-4 py-4 space-y-1 flex-grow overflow-y-auto">
                {navItems.map((item) => {
                  const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={`block px-4 py-2.5 text-sm font-bold rounded-lg transition-all ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-800 border-l-4 border-emerald-700'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-700'
                      }`}
                    >
                      {item.label}
                    </Link>
                  );
                })}
              </div>

              <div className="p-5 border-t border-slate-100 bg-slate-50">
                <Link 
                  href="/admissions" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center py-3 bg-emerald-700 text-white text-[14px] font-bold rounded-xl shadow-md hover:bg-emerald-800 transition-colors uppercase tracking-wider"
                >
                  {t('apply_now', 'Apply Now')}
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
