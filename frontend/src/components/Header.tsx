'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { Menu, X, Globe, Search, UserCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

const Header = () => {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const navItems = [
    { label: t('home'), href: '/' },
    { label: t('about'), href: '/about' },
    { label: t('courses'), href: '/courses' },
    { label: t('faculty'), href: '/faculty' },
    { label: t('research', 'Research'), href: '/islamic-research-center' },
    { label: t('news'), href: '/news' },
    { label: t('Results'), href: '/results' },
    { label: t('donations'), href: '/donations' },
    { label: t('admissions', 'Admissions'), href: '/admissions' },
    { label: t('contact'), href: '/contact' },
  ];

  if (!mounted) {
    return (
      <header className="bg-white border-b border-gray-200 h-[64px] lg:h-[76px] sticky top-0 z-50 print:hidden">
        <nav className="max-w-[1600px] mx-auto px-4 md:px-8 h-full flex items-center">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-slate-100 rounded-full animate-pulse" />
             <div className="flex flex-col gap-1">
                <div className="h-3 w-20 bg-slate-100 rounded animate-pulse" />
                <div className="h-2 w-12 bg-slate-50 rounded animate-pulse" />
             </div>
          </div>
        </nav>
      </header>
    );
  }

  return (
    <header className="bg-white border-b border-slate-100 sticky top-0 z-50 font-sans text-slate-900 shadow-sm backdrop-blur-md bg-white/95 print:hidden">
      <nav className="max-w-[1600px] mx-auto px-4 md:px-8">
        <div className="flex justify-between items-center h-[64px] lg:h-[76px]">
          
          {/* Logo & Desktop Nav */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center mr-6 group gap-3">
              <Image 
                src="/logo.jpeg" 
                alt="Jamia Sher-e-Rabbani Logo" 
                width={40} 
                height={40} 
                className="rounded-full shadow-sm group-hover:scale-105 transition-transform"
              />
              <div className="flex flex-col">
                <span className="text-sm font-black text-emerald-800 tracking-tighter leading-none group-hover:text-emerald-700 transition-colors">
                  JAMIA
                </span>
                <span className="text-[7px] font-bold text-slate-500 tracking-[0.3em] leading-tight mt-0.5">
                  SHER-E-RABBANI
                </span>
              </div>
            </Link>

            <div className="hidden xl:flex items-center gap-0.5 rtl:space-x-reverse">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-2.5 py-2 text-[11px] font-black text-slate-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-lg transition-all uppercase tracking-wide"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Right Utilities */}
          <div className="flex items-center space-x-3 md:space-x-6 rtl:space-x-reverse">

            <a href="/admissions" className="hidden lg:flex items-center justify-center px-5 py-2 bg-emerald-700 text-white text-[12px] font-bold rounded-full hover:bg-emerald-800 transition-all shadow-md">
              {t('apply_now')}
            </a>

            {/* Mobile menu button */}
            <div className="xl:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
              >
                {isOpen ? <X size={26} /> : <Menu size={26} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="xl:hidden fixed inset-0 bg-slate-900/40 z-40"
            />
            
            {/* Sidebar */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="xl:hidden fixed top-0 right-0 h-screen w-[75vw] sm:w-80 bg-white z-50 overflow-y-auto shadow-2xl flex flex-col"
            >
              <div className="px-6 py-5 flex justify-between items-center border-b border-slate-100">
                <span className="font-black text-emerald-800 text-lg tracking-tighter">MENU</span>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 -mr-2 rounded-lg text-slate-500 hover:bg-slate-100 transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
              
              <div className="px-6 py-6 space-y-2 flex-grow">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="block px-4 py-3 text-base font-bold text-slate-800 hover:bg-emerald-50 hover:text-emerald-700 rounded-xl transition-all"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

              <div className="p-6 border-t border-slate-100">
                <a 
                  href="/admissions" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center py-3.5 bg-emerald-700 text-white text-[15px] font-bold rounded-xl shadow-lg hover:bg-emerald-800 transition-colors"
                >
                  {t('apply_now')}
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
