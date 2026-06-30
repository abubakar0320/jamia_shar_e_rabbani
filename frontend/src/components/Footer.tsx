'use client';

import { useTranslation } from 'react-i18next';
import Link from 'next/link';
import { Globe, MessageCircle, Send, Video, Users } from 'lucide-react';
import React from 'react';
import Image from 'next/image';

const Footer = () => {
  const { t } = useTranslation();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <footer className="bg-white text-slate-600 py-10 border-t border-slate-200 print:hidden">
        <div className="max-w-[1600px] mx-auto px-6 text-center text-xs opacity-50">
          {t('Loading footer...')}
        </div>
      </footer>
    );
  }

  const footerSections = [
    {
      title: t('academics', 'Academics'),
      links: [
        { label: t('all_courses', 'All Courses'), href: '/courses' },
        { label: t('hifz_programs', 'Hifz-e-Quran'), href: '/courses' },
        { label: t('dars_e_nizami', 'Dars-e-Nizami'), href: '/courses' },
        { label: t('faculty', 'Faculty & Staff'), href: '/faculty' },
        { label: t('research', 'Research Center'), href: '/islamic-research-center' },
        { label: t('results', 'Exam Results'), href: '/results' },
      ]
    },
    {
      title: t('admissions_campus', 'Admissions & Campus'),
      links: [
        { label: t('apply_now', 'Apply Online'), href: '/admissions' },
        { label: t('fee_structure', 'Fee Structure'), href: '/admissions' },
        { label: t('scholarships', 'Scholarships'), href: '/admissions' },
        { label: t('library', 'Library'), href: '/about' },
        { label: t('boarding', 'Boarding & Hostel'), href: '/about' },
        { label: t('mosque', 'Jamia Mosque'), href: '/about' },
      ]
    },
    {
      title: t('media_news', 'Media & News'),
      links: [
        { label: t('latest_news', 'Latest News'), href: '/news' },
        { label: t('events', 'Events'), href: '/news' },
        { label: t('press', 'Press Releases'), href: '/news' },
        { label: t('academic_calendar', 'Academic Calendar'), href: '/news' },
      ]
    },
    {
      title: t('support_us', 'Support & Contact'),
      links: [
        { label: t('donations', 'Make a Donation'), href: '/donations' },
        { label: t('zakat', 'Zakat Fund'), href: '/donations' },
        { label: t('sponsor_student', 'Sponsor a Student'), href: '/donations' },
        { label: t('contact', 'Contact Us'), href: '/contact' },
        { label: t('about_us', 'About Jamia'), href: '/about' },
        { label: t('admin_login', 'Staff / Admin Login'), href: '/admin' },
      ]
    }
  ];

  return (
    <footer className="bg-white text-slate-600 font-sans mt-auto selection:bg-purple-500/30 border-t-4 border-transparent shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] print:hidden" style={{ borderImage: "linear-gradient(to right, #f43f5e, #a855f7, #3b82f6) 1" }}>
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-6">
        
        {/* Brand & Social Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6 border-b border-slate-200 pb-4">
          <div className="flex flex-col">
            <Link href="/" className="flex items-center mb-2 group gap-3">
              <Image 
                src="/logo.jpeg" 
                alt="Jamia Sher-e-Rabbani Logo" 
                width={40} 
                height={40} 
                className="rounded-full shadow-lg border-2 border-slate-100"
              />
              <div className="flex flex-col">
                <span className="text-lg md:text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 tracking-tighter leading-none transition-all group-hover:brightness-125">
                  JAMIA
                </span>
                <span className="text-[8px] md:text-[9px] font-bold text-slate-400 tracking-[0.4em] leading-tight mt-0.5 uppercase">
                  SHER-E-RABBANI
                </span>
              </div>
            </Link>
            <p className="max-w-md text-slate-400 text-[11px] leading-snug">
              {t('Dedicated to the preservation and dissemination of sacred Islamic knowledge through contemporary academic excellence.')}
            </p>
          </div>
          
          <div className="flex flex-col gap-2 mt-4 lg:mt-0">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">{t('follow_jamia', 'Connect with us')}</span>
            <div className="flex gap-2">
              {[MessageCircle, Send, Video, Users].map((Icon, i) => (
                <Link key={i} href="/contact" className={`w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-500 transition-all transform hover:-translate-y-1 hover:shadow-lg hover:text-white ${i===0?"hover:bg-rose-500 hover:border-rose-500 hover:shadow-rose-500/30":i===1?"hover:bg-amber-500 hover:border-amber-500 hover:shadow-amber-500/30":i===2?"hover:bg-emerald-500 hover:border-emerald-500 hover:shadow-emerald-500/30":"hover:bg-blue-500 hover:border-blue-500 hover:shadow-blue-500/30"}`}>
                  <Icon size={14} />
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          {footerSections.map((section, i) => (
            <div key={i} className="flex flex-col gap-2">
              <h4 className={`text-[11px] font-black uppercase tracking-widest ${i===0?"text-rose-400":i===1?"text-amber-400":i===2?"text-emerald-400":"text-blue-400"}`}>{section.title}</h4>
              <ul className="flex flex-col gap-1.5">
                {section.links.map((link, j) => (
                  <li key={j}>
                    <Link href={link.href} className={`text-xs transition-all inline-block hover:translate-x-1 ${i===0?"hover:text-rose-400":i===1?"hover:text-amber-400":i===2?"hover:text-emerald-400":"hover:text-blue-400"}`}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col lg:flex-row justify-between items-center pt-4 border-t border-slate-200 gap-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Removed missing policy links */}
          </div>
          <div className="text-[10px] font-medium text-slate-500 text-center lg:text-left">
            © {new Date().getFullYear()} Jamia Sher-e-Rabbani. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
