'use client';

import Link from 'next/link';
import React from 'react';
import { Menu, X, ExternalLink, Code2 } from 'lucide-react';
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
  const pathname = usePathname();
  const [isOpen, setIsOpen] = React.useState(false);

  const navItems = [
    { label: 'ہوم', href: '/', color: '#fbbf24' }, // Vibrant Amber Gold
    { label: 'ہمارے بارے میں', href: '/about', color: '#38bdf8' }, // Sky Blue
    { label: 'شعبہ جات و کورسز', href: '/courses', color: '#34d399' }, // Emerald Mint
    { label: 'تصویری گیلری', href: '/gallery', color: '#f43f5e' }, // Rose Pink - Gallery
    { label: 'علمی مضامین', href: '/articles', color: '#10b981' }, // Emerald - Articles
    { label: 'اساتذہ کرام', href: '/faculty', color: '#c084fc' }, // Violet Purple
    { label: 'سید زادے', href: '/syed-zady', color: '#f59e0b' }, // Amber - Syed Zady
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
      nameUrdu: 'وفاق المدارس الاسلامیہ الرضویہ',
      nameSub: 'wafaq.edu.pk',
      image: '/images/optimized/wafaq-logo.webp',
      href: 'https://wafaq.edu.pk',
      title: 'وفاق المدارس الاسلامیہ الرضویہ پاکستان - آفیشل پورٹل (wafaq.edu.pk)',
    },
    {
      nameUrdu: 'حکومتِ پاکستان',
      nameSub: 'Govt of Pakistan',
      image: '/images/optimized/gov-logo.webp',
      href: 'https://pakistan.gov.pk',
      title: 'حکومتِ پاکستان - آفیشل پورٹل (pakistan.gov.pk)',
    },
    {
      nameUrdu: 'حکومتِ پنجاب',
      nameSub: 'Govt of Punjab',
      image: '/images/optimized/punjab-logo.webp',
      href: 'https://punjab.gov.pk',
      title: 'حکومتِ پنجاب - آفیشل پورٹل (punjab.gov.pk)',
    },
    {
      nameUrdu: 'ہائر ایجوکیشن کمیشن',
      nameSub: 'HEC Pakistan',
      image: '/images/optimized/hec-logo.webp',
      href: 'https://hec.gov.pk',
      title: 'ہائر ایجوکیشن کمیشن پاکستان - آفیشل پورٹل (hec.gov.pk)',
    },
    {
      nameUrdu: 'پاک فوج',
      nameSub: 'Pakistan Army',
      image: '/images/optimized/army-logo.webp',
      href: 'https://pakistanarmy.gov.pk',
      title: 'پاک فوج - آفیشل پورٹل (pakistanarmy.gov.pk)',
    },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white shadow-sm font-sans print:hidden" dir="rtl">
      {/* 1. TOP HEADER: Logo & Name with National / Affiliation Logos - Single clean horizontal line, NEVER wraps */}
      <div className="bg-white border-b border-slate-100 py-2 sm:py-2.5">
        <div className="max-w-[1600px] mx-auto px-3 sm:px-6 md:px-8 flex items-center justify-between gap-2 sm:gap-4 flex-nowrap">
          
          {/* Main Institution Logo & Name (Always on RIGHT in RTL) */}
          <Link href="/" prefetch={false} className="flex items-center gap-2 sm:gap-3 group flex-shrink-0 min-w-0">
            <div className="relative w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 flex-shrink-0">
              <Image 
                src="/images/optimized/logo-icon.webp" 
                alt="لوگو جامعہ شیرِ ربانی" 
                width={56} 
                height={56} 
                className="rounded-full shadow-sm group-hover:scale-105 transition-transform border border-emerald-100 object-cover w-full h-full"
                loading="eager"
              />
            </div>
            <div className="flex flex-col text-right min-w-0">
              <span className="text-xl sm:text-2xl md:text-[28px] font-black text-emerald-800 tracking-tight leading-none group-hover:text-emerald-700 transition-colors font-urdu truncate">
                جامعہ شیرِ ربانی
              </span>
              <span className="text-[10px] sm:text-[12px] md:text-[13px] font-bold text-slate-500 tracking-normal leading-tight mt-0.5 sm:mt-1 font-urdu truncate">
                دینی و عصری تعلیمی مرکز • مانانوالہ، ضلع شیخوپورہ
              </span>
            </div>
          </Link>

          {/* Affiliation & National Logos (Always on LEFT in RTL) - Single clean horizontal line, NEVER wraps or breaks vertically */}
          <div className="flex items-center gap-1 sm:gap-2 md:gap-3 flex-nowrap flex-shrink-0">
            {officialLogos.map((item) => (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                title={item.title}
                className="flex items-center gap-1.5 group transition-all duration-200 hover:opacity-95 active:scale-95 cursor-pointer py-0.5 px-0.5 sm:px-1 rounded-md hover:bg-slate-50 flex-shrink-0"
              >
                <div className="relative w-7 h-7 sm:w-8 sm:h-8 md:w-9 md:h-9 flex-shrink-0 flex items-center justify-center p-0.5 rounded-full bg-slate-50 border border-slate-200/90 shadow-2xs group-hover:scale-105 group-hover:border-emerald-600 transition-all duration-200">
                  <Image
                    src={item.image}
                    alt={item.nameUrdu}
                    width={36}
                    height={36}
                    className="object-contain max-h-5 sm:max-h-6 md:max-h-7 w-auto"
                  />
                </div>
                <div className="hidden lg:flex flex-col text-right leading-tight">
                  <span className="text-[11px] font-black text-slate-800 tracking-tight whitespace-nowrap group-hover:text-emerald-700 transition-colors font-urdu">
                    {item.nameUrdu}
                  </span>
                  <span className="text-[8px] font-bold text-slate-600 whitespace-nowrap hidden 2xl:block">
                    {item.nameSub}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* 2. NAVBAR: Dedicated bar containing Mobile Sidebar Toggle + ALL options / menu items */}
      <nav className="bg-emerald-800 text-white shadow-md border-t border-emerald-700/60" dir="rtl">
        <div className="max-w-[1600px] mx-auto px-2 sm:px-4 md:px-8">
          <div className="flex items-center justify-between h-12 gap-2">
            
            {/* Mobile Sidebar / Hamburger Toggle Button - Placed directly in the options line */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="xl:hidden flex items-center gap-1.5 px-2.5 py-1.5 bg-emerald-900/90 hover:bg-emerald-950 text-white rounded-md text-xs font-bold font-urdu flex-shrink-0 border border-emerald-600/60 shadow-xs transition-colors"
              aria-label="مینو کھولیں"
            >
              {isOpen ? <X size={18} className="text-amber-300" /> : <Menu size={18} className="text-amber-300" />}
              <span className="text-[12px] leading-none text-emerald-100">مینو</span>
            </button>

            {/* All Navigation Links visible on ALL screen sizes right in options line */}
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto scrollbar-none [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden py-1 w-full rtl:space-x-reverse">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/' && pathname?.startsWith(item.href));
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    prefetch={false}
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
                prefetch={false}
                className="md:hidden flex-shrink-0 ml-1 px-3.5 py-1 bg-amber-400 hover:bg-amber-300 text-slate-900 text-[12px] font-bold rounded-full shadow-xs whitespace-nowrap font-urdu"
              >
                آن لائن داخلہ
              </Link>
            </div>

            {/* Desktop / Tablet Right CTA: Apply Now */}
            <div className="flex-shrink-0 ml-3 pl-3 border-l border-emerald-700/70 hidden md:flex items-center">
              <Link
                href="/admissions"
                prefetch={false}
                className="px-4 py-1.5 bg-amber-400 hover:bg-amber-300 text-slate-900 text-[13px] font-bold rounded-full shadow-sm hover:shadow transition-all whitespace-nowrap font-urdu"
              >
                آن لائن داخلہ
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Nav Overlay / Drawer */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            onClick={() => setIsOpen(false)}
            className="xl:hidden fixed inset-0 bg-slate-900/50 backdrop-blur-xs z-40 transition-opacity duration-200"
          />
          
          {/* Sidebar */}
          <div 
            className="xl:hidden fixed top-0 right-0 h-screen w-[85vw] sm:w-80 bg-white z-50 overflow-y-auto shadow-2xl flex flex-col animate-[drawerIn_0.22s_ease-out]"
          >
              <div className="px-6 py-5 flex justify-between items-center border-b border-slate-100 bg-emerald-800 text-white">
                <div className="flex items-center gap-2">
                  <Image 
                    src="/images/optimized/logo-icon.webp" 
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
                      prefetch={false}
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

                {/* Mobile Developer Profile Section */}
                <div className="pt-4 mt-4 border-t border-slate-100">
                  <div className="px-4 pb-2 text-[12px] font-bold text-slate-400 tracking-wider font-urdu">
                    سسٹم و ویب سائٹ ڈویلپر
                  </div>
                  <Link
                    href="/developer"
                    prefetch={false}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-between p-3 mx-1 rounded-xl bg-gradient-to-r from-emerald-50 to-slate-50 hover:from-emerald-100 hover:to-slate-100 border border-emerald-200/90 transition-all group shadow-2xs"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-emerald-800 text-white flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                        <Code2 size={20} className="text-amber-300" />
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-black text-slate-900 font-urdu leading-tight">
                          پروفیسر ابوبکر صدیق ربانی
                        </div>
                        <div className="text-[11px] font-bold text-emerald-800 font-urdu leading-tight mt-0.5">
                          رجسٹرار، خزانچی و ہیڈ آف ڈیپارٹمنٹس فار آل
                        </div>
                      </div>
                    </div>
                    <span className="text-[11px] font-bold text-emerald-800 font-urdu bg-white px-2.5 py-1 rounded-lg border border-emerald-200 shadow-2xs group-hover:bg-emerald-800 group-hover:text-white transition-colors">
                      پروفائل دیکھیں
                    </span>
                  </Link>
                </div>
              </div>

              <div className="p-5 border-t border-slate-100 bg-slate-50">
                <Link 
                  href="/admissions" 
                  prefetch={false}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center py-3 bg-emerald-700 text-white text-[15px] font-bold rounded-xl shadow-md hover:bg-emerald-800 transition-colors font-urdu"
                >
                  آن لائن داخلہ فارم پر کریں
                </Link>
              </div>
          </div>
        </>
      )}
    </header>
  );
};

export default Header;
