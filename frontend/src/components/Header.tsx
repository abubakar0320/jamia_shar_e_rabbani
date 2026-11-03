'use client';

import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import React from 'react';
import { Menu, X, ExternalLink } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

interface OfficialLogoItem {
  nameUrdu: string;
  nameSub: string;
  image: string;
  href: string;
  title: string;
}

const Header = () => {
  const { t } = useTranslation();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { label: 'ہوم', href: '/', color: '#fbbf24' }, // Vibrant Amber Gold
    { label: 'ہمارے بارے میں', href: '/about', color: '#38bdf8' }, // Sky Blue
    { label: 'شعبہ جات و کورسز', href: '/courses', color: '#34d399' }, // Emerald Mint
    { label: 'اساتذہ کرام', href: '/faculty', color: '#c084fc' }, // Violet Purple
    { label: 'خبریں و اعلانات', href: '/news', color: '#60a5fa' }, // Royal Blue
    { label: 'نتائج وفاق المدارس', href: '/wafaq-results', color: '#fb923c' }, // Bright Orange
    { label: 'عطیات و صدقات', href: '/donations', color: '#a3e635' }, // Lime Green
    { label: 'آن لائن داخلہ', href: '/admissions', color: '#f87171' }, // Coral Red
    { label: 'انٹرن شپ', href: '/internship', color: '#2dd4bf' }, // Cyan Teal
    { label: 'رابطہ', href: '/contact', color: '#818cf8' }, // Indigo
  ];

  // Official Affiliated & National Entities with verified official websites
  const officialLogos: OfficialLogoItem[] = [
    {
      nameUrdu: 'وفاق المدارس',
      nameSub: 'الاسلامیہ الرضویہ',
      image: '/images/wafaq-logo.png',
      href: 'https://wafaq.edu.pk',
      title: 'وفاق المدارس الاسلامیہ الرضویہ پاکستان - آفیشل پورٹل (wafaq.edu.pk)',
    },
    {
      nameUrdu: 'حکومتِ پاکستان',
      nameSub: 'Govt of Pakistan',
      image: '/images/gov-logo.svg',
      href: 'https://pakistan.gov.pk',
      title: 'حکومتِ پاکستان - آفیشل پورٹل (pakistan.gov.pk)',
    },
    {
      nameUrdu: 'حکومتِ پنجاب',
      nameSub: 'Govt of Punjab',
      image: '/images/punjab-logo.svg',
      href: 'https://punjab.gov.pk',
      title: 'حکومتِ پنجاب - آفیشل پورٹل (punjab.gov.pk)',
    },
    {
      nameUrdu: 'ہائر ایجوکیشن کمیشن',
      nameSub: 'HEC Pakistan',
      image: '/images/hec-logo.png',
      href: 'https://hec.gov.pk',
      title: 'ہائر ایجوکیشن کمیشن پاکستان - آفیشل پورٹل (hec.gov.pk)',
    },
    {
      nameUrdu: 'پاک فوج',
      nameSub: 'Pakistan Army',
      image: '/images/army-logo.png',
      href: 'https://pakistanarmy.gov.pk',
      title: 'پاک فوج - آفیشل پورٹل (pakistanarmy.gov.pk)',
    },
  ];

  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 bg-white border-b border-gray-200 print:hidden" dir="rtl">
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
    <header className="sticky top-0 z-50 bg-white shadow-sm font-sans print:hidden" dir="rtl">
      {/* 1. TOP HEADER: Logo & Name with National / Affiliation Logos */}
      <div className="bg-white border-b border-slate-100 py-2 sm:py-3">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-6 md:px-8 flex items-center justify-between gap-3">
          
          {/* Main Institution Logo & Name (Always on RIGHT in RTL) */}
          <Link href="/" className="flex items-center gap-2.5 sm:gap-3.5 group flex-shrink-0">
            <div className="relative w-11 h-11 sm:w-13 sm:h-13 md:w-14 md:h-14 flex-shrink-0">
              <Image 
                src="/logo.jpeg" 
                alt="لوگو جامعہ شیرِ ربانی" 
                width={56} 
                height={56} 
                className="rounded-full shadow-sm group-hover:scale-105 transition-transform border border-emerald-100 object-cover"
                priority
              />
            </div>
            <div className="flex flex-col text-right">
              <span className="text-2xl sm:text-3xl md:text-[32px] font-black text-emerald-800 tracking-tight leading-none group-hover:text-emerald-700 transition-colors font-urdu">
                جامعہ شیرِ ربانی
              </span>
              <span className="text-[12px] sm:text-[13px] md:text-[14px] font-bold text-slate-500 tracking-normal leading-tight mt-1 font-urdu">
                دینی و عصری تعلیمی مرکز • مانانوالہ، شیخوپورہ
              </span>
            </div>
          </Link>

          {/* Affiliation & National Logos (Always on LEFT in RTL) */}
          <div className="flex items-center gap-2 sm:gap-3 md:gap-3.5 lg:gap-4 flex-wrap">
            
            {officialLogos.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                title={item.title}
                className="flex items-center gap-1.5 sm:gap-2 group transition-all duration-200 hover:opacity-95 active:scale-95 cursor-pointer py-0.5 px-1 rounded-md hover:bg-slate-50"
              >
                <div className="relative w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 flex-shrink-0 flex items-center justify-center p-0.5 rounded-full bg-slate-50 border border-slate-200/90 shadow-2xs group-hover:scale-110 group-hover:border-emerald-600 group-hover:shadow-xs transition-all duration-200">
                  <Image
                    src={item.image}
                    alt={item.nameUrdu}
                    width={40}
                    height={40}
                    className="object-contain max-h-7 sm:max-h-8 md:max-h-9 w-auto"
                  />
                </div>
                <div className="flex flex-col text-right leading-tight">
                  <span className="text-[10px] sm:text-[11px] md:text-[12px] font-black text-slate-800 tracking-tight whitespace-nowrap group-hover:text-emerald-700 transition-colors font-urdu">
                    {item.nameUrdu}
                  </span>
                  <span className="text-[8px] sm:text-[9px] font-bold text-slate-500 whitespace-nowrap hidden 2xl:block group-hover:text-slate-700 transition-colors">
                    {item.nameSub}
                  </span>
                </div>
              </a>
            ))}

            {/* Mobile hamburger button */}
            <div className="xl:hidden flex items-center mr-1">
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
      <nav className="bg-emerald-800 text-white shadow-md border-t border-emerald-700/60" dir="rtl">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-4 md:px-8">
          <div className="flex items-center justify-between h-12">
            
            {/* All Navigation Links visible on ALL screen sizes right next to Home */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1 w-full rtl:space-x-reverse">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative px-2.5 sm:px-3 pt-1 pb-1.5 flex flex-col items-center justify-center text-[13px] md:text-[14px] font-bold tracking-normal rounded-md transition-all whitespace-nowrap flex-shrink-0 font-urdu ${
                      isActive
                        ? 'bg-emerald-950/70 text-white'
                        : 'text-emerald-50 hover:text-white hover:bg-emerald-700/50'
                    }`}
                  >
                    <span className="leading-tight pb-1">{item.label}</span>
                    {/* Distinct Bold Colored Line under each option */}
                    <span 
                      className={`h-[3.5px] w-full rounded-full transition-all duration-200 shadow-xs ${
                        isActive ? 'scale-100 opacity-100' : 'opacity-85 group-hover:opacity-100 group-hover:scale-105'
                      }`}
                      style={{ backgroundColor: item.color }}
                    />
                  </Link>
                );
              })}

              {/* Mobile quick apply button inside scrollable menu */}
              <Link
                href="/admissions"
                className="md:hidden flex-shrink-0 ml-1 px-3.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-900 text-[12px] font-bold rounded-full shadow-xs whitespace-nowrap font-urdu"
              >
                آن لائن داخلہ
              </Link>
            </div>

            {/* Desktop / Tablet Right CTA: Apply Now */}
            <div className="flex-shrink-0 ml-3 pl-3 border-l border-emerald-700/70 hidden md:flex items-center">
              <Link
                href="/admissions"
                className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 text-[13px] font-bold rounded-full shadow-sm hover:shadow transition-all whitespace-nowrap font-urdu"
              >
                آن لائن داخلہ
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
              className="xl:hidden fixed top-0 right-0 h-screen w-[85vw] sm:w-80 bg-white z-50 overflow-y-auto shadow-2xl flex flex-col"
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
                  <span className="font-black text-lg tracking-normal font-urdu">جامعہ شیرِ ربانی</span>
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
                      className={`flex items-center justify-between px-4 py-2.5 text-sm font-bold rounded-lg transition-all font-urdu ${
                        isActive
                          ? 'bg-emerald-50 text-emerald-900 shadow-xs'
                          : 'text-slate-700 hover:bg-slate-50 hover:text-emerald-800'
                      }`}
                      style={{ borderRight: `4px solid ${item.color}` }}
                    >
                      <span>{item.label}</span>
                      <span 
                        className="w-2.5 h-2.5 rounded-full shrink-0" 
                        style={{ backgroundColor: item.color }}
                      />
                    </Link>
                  );
                })}

                {/* Mobile Official Links Section */}
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <div className="px-4 pb-2 text-[12px] font-bold text-slate-400 tracking-wider font-urdu">
                    آفیشل پورٹلز و الحاق
                  </div>
                  <div className="space-y-1">
                    {officialLogos.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between px-4 py-2 rounded-lg text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <Image
                            src={item.image}
                            alt={item.nameUrdu}
                            width={22}
                            height={22}
                            className="object-contain"
                          />
                          <span className="font-urdu">{item.nameUrdu}</span>
                        </div>
                        <ExternalLink size={14} className="text-slate-400" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-5 border-t border-slate-100 bg-slate-50">
                <Link 
                  href="/admissions" 
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center py-3 bg-emerald-700 text-white text-[15px] font-bold rounded-xl shadow-md hover:bg-emerald-800 transition-colors font-urdu"
                >
                  آن لائن داخلہ فارم پر کریں
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
