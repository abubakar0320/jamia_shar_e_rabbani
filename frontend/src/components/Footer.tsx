'use client';

import Link from 'next/link';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import { MessageCircle, Send, Video, Users, ExternalLink, ShieldCheck, Code2 } from 'lucide-react';

interface OfficialAffiliation {
  nameUrdu: string;
  nameSub: string;
  image: string;
  href: string;
  title: string;
}

const Footer = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <footer className="bg-white text-slate-600 py-10 border-t border-slate-200 print:hidden" dir="rtl">
        <div className="max-w-[1600px] mx-auto px-6 text-center text-xs opacity-50 font-urdu">
          لوڈ ہو رہا ہے...
        </div>
      </footer>
    );
  }

  // Official Affiliated & National Entities with verified official links
  const officialAffiliations: OfficialAffiliation[] = [
    {
      nameUrdu: 'وفاق المدارس الاسلامیہ الرضویہ',
      nameSub: 'wafaq.edu.pk',
      image: '/images/wafaq-logo.png',
      href: 'https://wafaq.edu.pk',
      title: 'وفاق المدارس الاسلامیہ الرضویہ پاکستان - آفیشل پورٹل',
    },
    {
      nameUrdu: 'حکومتِ پاکستان',
      nameSub: 'pakistan.gov.pk',
      image: '/images/gov-logo.svg',
      href: 'https://pakistan.gov.pk',
      title: 'حکومتِ پاکستان - آفیشل پورٹل',
    },
    {
      nameUrdu: 'حکومتِ پنجاب',
      nameSub: 'punjab.gov.pk',
      image: '/images/punjab-logo.svg',
      href: 'https://punjab.gov.pk',
      title: 'حکومتِ پنجاب - آفیشل پورٹل',
    },
    {
      nameUrdu: 'ہائر ایجوکیشن کمیشن (HEC)',
      nameSub: 'hec.gov.pk',
      image: '/images/hec-logo.png',
      href: 'https://hec.gov.pk',
      title: 'ہائر ایجوکیشن کمیشن پاکستان - آفیشل پورٹل',
    },
    {
      nameUrdu: 'پاک فوج (Pakistan Army)',
      nameSub: 'pakistanarmy.gov.pk',
      image: '/images/army-logo.png',
      href: 'https://pakistanarmy.gov.pk',
      title: 'پاک فوج - آفیشل پورٹل',
    },
  ];

  const footerSections = [
    {
      title: 'تعلیمی شعبہ جات',
      headingColor: '#10b981', // Emerald
      links: [
        { label: 'تمام کورسز و شعبہ جات', href: '/courses' },
        { label: 'علمی و تحقیقی مضامین (۲۰ مضامین)', href: '/articles' },
        { label: 'حفظ القرآن الکریم مع تجوید', href: '/courses' },
        { label: 'درسِ نظامی (عالم و فاضل کورس)', href: '/courses' },
        { label: 'معزز اساتذہ کرام', href: '/faculty' },
        { label: 'نتائج وفاق المدارس الرضویہ', href: '/wafaq-results' },
      ],
    },
    {
      title: 'داخلہ و سہولیات',
      headingColor: '#0284c7', // Sky Blue
      links: [
        { label: 'آن لائن داخلہ فارم', href: '/admissions' },
        { label: '100% مفت تعلیم و ہاسٹل', href: '/admissions' },
        { label: 'آن لائن رول نمبر سلپ', href: '/roll-number-slip' },
        { label: 'انٹرن شپ پروگرام', href: '/internship' },
        { label: 'جامعہ کی تاریخ و تعارف', href: '/about' },
        { label: 'مستحق طلبہ کی کفالت', href: '/donations' },
      ],
    },
    {
      title: 'میڈیا و اعلانات',
      headingColor: '#f59e0b', // Amber Orange
      links: [
        { label: 'تازہ ترین خبریں و تقاریب', href: '/news' },
        { label: 'علمی مقالات و کالمز', href: '/articles' },
        { label: 'سالانہ دستارِ فضیلت کانفرنس', href: '/news' },
        { label: 'پریس ریلیز و بیانات', href: '/news' },
        { label: 'تعلیمی اسناد و ریکارڈز', href: '/records' },
      ],
    },
    {
      title: 'عطیات و رابطہ',
      headingColor: '#e11d48', // Rose Red
      links: [
        { label: 'آن لائن عطیات و صدقات', href: '/donations' },
        { label: 'زکوٰۃ و امداد فنڈ', href: '/donations' },
        { label: 'ہم سے رابطہ کریں', href: '/contact' },
        { label: 'آئی ٹی ڈویلپر پورٹل', href: '/developer' },
        { label: 'اسٹاف / ایڈمن لاگ ان', href: '/admin' },
      ],
    },
  ];

  return (
    <footer 
      className="bg-white text-slate-700 font-sans mt-auto selection:bg-emerald-500/20 border-t-4 border-transparent shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] print:hidden" 
      style={{ borderImage: "linear-gradient(to right, #059669, #0d9488, #d97706) 1" }}
      dir="rtl"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-10">
        
        {/* Brand & Social Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-10 border-b border-slate-200 pb-8">
          <div className="flex flex-col">
            <Link href="/" className="flex items-center mb-2.5 group gap-3.5">
              <Image 
                src="/logo.jpeg" 
                alt="لوگو جامعہ شیرِ ربانی" 
                width={52} 
                height={52} 
                className="rounded-full shadow-md border-2 border-emerald-100 object-cover"
              />
              <div className="flex flex-col">
                <span className="text-xl md:text-2xl font-black text-emerald-800 tracking-tight leading-none transition-all group-hover:text-emerald-700 font-urdu">
                  جامعہ شیرِ ربانی مانانوالہ
                </span>
                <span className="text-[11px] md:text-xs font-bold text-slate-500 tracking-normal leading-tight mt-1 font-urdu">
                  دینی و عصری علوم کا مستند تعلیمی مرکز
                </span>
              </div>
            </Link>
            <p className="max-w-xl text-slate-600 text-xs sm:text-sm leading-[2.2] font-urdu">
              دینی و اسلامی علوم کی حفاظت، قرآن و سنت کی ترویج اور نسلِ نو کی اخلاقی و روحانی آبیاری کے لیے وقف عظیم اسلامی ادارہ۔
            </p>
          </div>
          
          <div className="flex flex-col gap-2.5">
            <span className="text-xs font-bold text-slate-700 font-urdu">سوشل میڈیا پر ہمارے ساتھ جڑیں</span>
            <div className="flex gap-2">
              {[
                { icon: MessageCircle, href: '/contact', color: 'hover:bg-emerald-600 hover:border-emerald-600', label: 'واٹس ایپ' },
                { icon: Send, href: '/contact', color: 'hover:bg-teal-600 hover:border-teal-600', label: 'ٹیلی گرام' },
                { icon: Video, href: '/contact', color: 'hover:bg-rose-600 hover:border-rose-600', label: 'یوٹیوب' },
                { icon: Users, href: '/contact', color: 'hover:bg-blue-600 hover:border-blue-600', label: 'فیس بک' },
              ].map((item, i) => {
                const IconComponent = item.icon;
                return (
                  <Link 
                    key={i} 
                    href={item.href} 
                    aria-label={item.label}
                    className={`w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 transition-all transform hover:-translate-y-1 hover:shadow-md hover:text-white ${item.color}`}
                  >
                    <IconComponent size={16} />
                  </Link>
                );
              })}
            </div>
          </div>
        </div>

        {/* Links Grid with Bold Colored Lines */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-10 text-right">
          {footerSections.map((section, i) => (
            <div key={i} className="flex flex-col">
              {/* Column Heading */}
              <h4 className="text-sm md:text-base font-bold text-slate-900 pb-1.5 font-urdu">
                {section.title}
              </h4>
              {/* Full Width Bold Colored Bar under Column Heading */}
              <span 
                className="h-[3.5px] w-full rounded-full mb-3.5 shadow-2xs block" 
                style={{ backgroundColor: section.headingColor }}
              />

              {/* Column Links with Bold Black Bar shown ONLY on hover */}
              <ul className="flex flex-col gap-2.5">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link 
                      href={link.href} 
                      className="group inline-flex flex-col text-xs sm:text-sm text-slate-800 hover:text-black font-semibold transition-all font-urdu w-fit"
                    >
                      <span className="leading-tight pb-0.5 group-hover:translate-x-[-2px] transition-transform">
                        {link.label}
                      </span>
                      {/* Bold Black Bar: hidden by default, expands on hover */}
                      <span className="h-[2.5px] w-0 group-hover:w-full rounded-full bg-slate-900 transition-all duration-300 ease-out block opacity-0 group-hover:opacity-100" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Official Affiliation & National Portals Logos Section */}
        <div className="mb-10 pt-8 border-t border-slate-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-5">
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-emerald-700 w-5 h-5" />
              <h4 className="text-sm sm:text-base font-bold text-slate-900 font-urdu">
                قومی الحاق و باضابطہ آفیشل پورٹلز
              </h4>
            </div>
            <p className="text-xs text-slate-500 font-urdu">
              جامعہ شیرِ ربانی وفاق المدارس الاسلامیہ الرضویہ پاکستان سے باقاعدہ الحاق شدہ اور ملکی تعلیمی اصولوں پر عمل پیرا ہے۔
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {officialAffiliations.map((item, idx) => (
              <a
                key={idx}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                title={item.title}
                className="group relative flex items-center gap-3 p-3 rounded-xl bg-slate-50 hover:bg-emerald-50/70 border border-slate-200 hover:border-emerald-300 transition-all duration-200 shadow-2xs hover:shadow-sm transform hover:-translate-y-0.5"
              >
                <div className="w-11 h-11 rounded-lg bg-white p-1 border border-slate-200/80 shadow-2xs flex items-center justify-center shrink-0 group-hover:border-emerald-300 transition-colors">
                  <Image
                    src={item.image}
                    alt={item.nameUrdu}
                    width={36}
                    height={36}
                    className="w-full h-full object-contain"
                  />
                </div>
                <div className="flex flex-col min-w-0 flex-1">
                  <span className="text-xs font-bold text-slate-800 group-hover:text-emerald-900 transition-colors font-urdu truncate leading-tight">
                    {item.nameUrdu}
                  </span>
                  <span className="text-[10px] text-slate-500 font-sans truncate leading-tight mt-0.5 text-left" dir="ltr">
                    {item.nameSub}
                  </span>
                </div>
                <ExternalLink size={13} className="text-slate-400 group-hover:text-emerald-600 transition-colors shrink-0" />
              </a>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-6 border-t border-slate-200 gap-3.5 text-xs text-slate-500 font-urdu">
          <div>
            © {new Date().getFullYear()} جامعہ شیرِ ربانی مانانوالہ، ضلع شیخوپورہ۔ جملہ حقوق محفوظ ہیں۔
          </div>
          
          <div className="flex flex-wrap items-center justify-center gap-3 text-slate-600">
            <span className="inline-flex items-center gap-1.5 text-emerald-800 font-semibold bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              <ShieldCheck size={14} className="text-emerald-600" />
              وفاق المدارس الاسلامیہ الرضویہ سے باقاعدہ الحاق شدہ
            </span>
            <span className="text-slate-300 hidden sm:inline">|</span>
            <Link 
              href="/developer" 
              className="inline-flex items-center gap-1.5 text-slate-700 hover:text-emerald-800 font-bold transition-colors bg-slate-50 hover:bg-emerald-50 px-2.5 py-1 rounded-full border border-slate-200 hover:border-emerald-300 group"
            >
              <Code2 size={14} className="text-emerald-600 group-hover:rotate-12 transition-transform" />
              <span>ڈویلپر: ابوبکر صدیق (آئی ٹی ایڈمن)</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
