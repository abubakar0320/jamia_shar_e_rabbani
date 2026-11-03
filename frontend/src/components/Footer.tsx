'use client';

import Link from 'next/link';
import { MessageCircle, Send, Video, Users } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const Footer = () => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <footer className="bg-white text-slate-600 py-10 border-t border-slate-200 print:hidden">
        <div className="max-w-[1600px] mx-auto px-6 text-center text-xs opacity-50 font-urdu">
          لوڈ ہو رہا ہے...
        </div>
      </footer>
    );
  }

  const footerSections = [
    {
      title: 'تعلیمی شعبہ جات',
      headingColor: '#10b981', // Emerald
      links: [
        { label: 'تمام کورسز و شعبہ جات', href: '/courses', color: '#34d399' },
        { label: 'حفظ القرآن الکریم', href: '/courses', color: '#fbbf24' },
        { label: 'درسِ نظامی (عالم و فاضل)', href: '/courses', color: '#38bdf8' },
        { label: 'معزز اساتذہ کرام', href: '/faculty', color: '#c084fc' },
        { label: 'نتائج وفاق المدارس', href: '/wafaq-results', color: '#fb923c' },
      ]
    },
    {
      title: 'داخلہ و سہولیات',
      headingColor: '#0284c7', // Sky Blue
      links: [
        { label: 'آن لائن داخلہ فارم', href: '/admissions', color: '#f87171' },
        { label: '100% مفت تعلیم و ہاسٹل', href: '/admissions', color: '#10b981' },
        { label: 'مستحق طلبہ کی کفالت', href: '/donations', color: '#f59e0b' },
        { label: 'انٹرن شپ پروگرام', href: '/internship', color: '#2dd4bf' },
        { label: 'لائبریری و کتب خانہ', href: '/about', color: '#818cf8' },
        { label: 'ہاسٹل و رہائشی سہولیات', href: '/about', color: '#ec4899' },
        { label: 'جامع مسجد شیرِ ربانی', href: '/about', color: '#14b8a6' },
      ]
    },
    {
      title: 'میڈیا و اعلانات',
      headingColor: '#f59e0b', // Amber Orange
      links: [
        { label: 'تازہ ترین خبریں', href: '/news', color: '#60a5fa' },
        { label: 'سالانہ دستارِ فضیلت', href: '/news', color: '#a855f7' },
        { label: 'پریس ریلیز و بیانات', href: '/news', color: '#f43f5e' },
        { label: 'تعلیمی کیلنڈر', href: '/news', color: '#34d399' },
      ]
    },
    {
      title: 'عطیات و رابطہ',
      headingColor: '#e11d48', // Rose Red
      links: [
        { label: 'آن لائن عطیات دیں', href: '/donations', color: '#10b981' },
        { label: 'زکوٰۃ و صدقات فنڈ', href: '/donations', color: '#fbbf24' },
        { label: 'طالب علم کی مکمل کفالت', href: '/donations', color: '#ec4899' },
        { label: 'ہم سے رابطہ کریں', href: '/contact', color: '#38bdf8' },
        { label: 'جامعہ کی تاریخ و تعارف', href: '/about', color: '#818cf8' },
        { label: 'اسٹاف / ایڈمن لاگ ان', href: '/admin', color: '#64748b' },
      ]
    }
  ];

  return (
    <footer 
      className="bg-white text-slate-700 font-sans mt-auto selection:bg-emerald-500/20 border-t-4 border-transparent shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] print:hidden" 
      style={{ borderImage: "linear-gradient(to right, #059669, #0d9488, #d97706) 1" }}
      dir="rtl"
    >
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-8">
        
        {/* Brand & Social Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8 border-b border-slate-200 pb-6">
          <div className="flex flex-col">
            <Link href="/" className="flex items-center mb-2 group gap-3.5">
              <Image 
                src="/logo.jpeg" 
                alt="لوگو جامعہ شیرِ ربانی" 
                width={48} 
                height={48} 
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
              {[MessageCircle, Send, Video, Users].map((Icon, i) => (
                <Link 
                  key={i} 
                  href="/contact" 
                  className={`w-9 h-9 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-600 transition-all transform hover:-translate-y-1 hover:shadow-md hover:text-white ${
                    i === 0 ? "hover:bg-emerald-600 hover:border-emerald-600" :
                    i === 1 ? "hover:bg-teal-600 hover:border-teal-600" :
                    i === 2 ? "hover:bg-rose-600 hover:border-rose-600" :
                    "hover:bg-blue-600 hover:border-blue-600"
                  }`}
                >
                  <Icon size={16} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Links Grid with Bold Colored Lines */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 mb-8 text-right">
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

        {/* Bottom Bar */}
        <div className="flex flex-col sm:flex-row justify-between items-center pt-5 border-t border-slate-200 gap-3 text-xs text-slate-500 font-urdu">
          <div>
            © {new Date().getFullYear()} جامعہ شیرِ ربانی مانانوالہ، شیخوپورہ۔ جملہ حقوق محفوظ ہیں۔
          </div>
          <div className="flex items-center gap-4 text-slate-600">
            <span>وفاق المدارس الاسلامیہ الرضویہ سے باقاعدہ الحاق شدہ</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
