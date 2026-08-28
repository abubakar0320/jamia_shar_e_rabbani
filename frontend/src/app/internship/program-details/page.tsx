'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { ChevronRight, Target, Clock, Users, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ProgramDetailsPage() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const domains = [
    {
      id: "it",
      title: "IT & Computer Science",
      brandColor: "bg-[#0078d4]",
      textColor: "text-[#0078d4]",
      icon: (
        <svg viewBox="0 0 64 64" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="12" width="48" height="32" rx="0" fill="#f3f2f1" stroke="#0078d4" strokeWidth="2"/>
          <path d="M24 44v8m16-8v8m-20 0h24" stroke="#0078d4" strokeWidth="2" strokeLinecap="square" />
          <path d="M16 28l6-6-6-6M28 28h8" stroke="#0078d4" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
        </svg>
      ),
      description: "Dive into the world of technology. This domain is for tech enthusiasts who want to build real-world applications, design beautiful interfaces, and solve complex problems.",
      roles: [
        { name: "Web Development", desc: "Build responsive websites using Next.js, React, and Node.js." },
        { name: "Mobile App Dev", desc: "Create native and cross-platform mobile apps for Android & iOS." },
        { name: "UI/UX Design", desc: "Design wireframes, prototypes, and user-centric interfaces." },
        { name: "Graphics Design", desc: "Create visual content, brand assets, and marketing materials." }
      ]
    },
    {
      id: "academic",
      title: "Academic & Research",
      brandColor: "bg-[#d83b01]",
      textColor: "text-[#d83b01]",
      icon: (
        <svg viewBox="0 0 64 64" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 8L8 20l24 12 24-12L32 8z" fill="#f3f2f1" stroke="#d83b01" strokeWidth="2" strokeLinejoin="miter"/>
          <path d="M16 26v16l16 8 16-8V26" fill="none" stroke="#d83b01" strokeWidth="2" strokeLinejoin="miter"/>
          <path d="M56 20v18" stroke="#d83b01" strokeWidth="2" strokeLinecap="square"/>
        </svg>
      ),
      description: "Contribute to the preservation and dissemination of Islamic knowledge. Ideal for students with strong writing skills and deep understanding of Islamic studies.",
      roles: [
        { name: "Islamic Research", desc: "Conduct in-depth research on historical and contemporary Islamic topics." },
        { name: "Translation Services", desc: "Translate texts between Arabic, Urdu, and English." },
        { name: "Content Creation", desc: "Write articles, scripts, and academic papers for publication." }
      ]
    },
    {
      id: "admin",
      title: "Management & Admin",
      brandColor: "bg-[#107c41]",
      textColor: "text-[#107c41]",
      icon: (
        <svg viewBox="0 0 64 64" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
          <rect x="24" y="16" width="16" height="16" fill="#f3f2f1" stroke="#107c41" strokeWidth="2"/>
          <path d="M16 52v-8h32v8" fill="none" stroke="#107c41" strokeWidth="2" strokeLinejoin="miter"/>
          <path d="M44 20h8v16H12V20h8" fill="none" stroke="#107c41" strokeWidth="2" strokeLinejoin="miter"/>
        </svg>
      ),
      description: "Learn the core of institutional operations. Perfect for natural leaders who want to master organizational skills, event planning, and data management.",
      roles: [
        { name: "Event Management", desc: "Plan, organize, and execute institutional events and seminars." },
        { name: "Student Affairs", desc: "Manage student queries, admissions processes, and coordination." },
        { name: "Data Entry & Analytics", desc: "Maintain records, analyze institutional data, and generate reports." }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf9f8] flex flex-col font-sans">
      <Head>
        <title>{t('Program Details')} | Internship - Jamia Shar-e-Rabbani</title>
      </Head>
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-white border-b border-[#edebe9] pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f3f2f1] text-[#605e5c] text-xs font-semibold mb-6">
              <Target size={16} className="text-[#0078d4]" />
              {t('Comprehensive Internship Program')}
            </div>
            <h1 className="text-4xl md:text-5xl font-semibold text-[#323130] mb-6 tracking-tight">
              {t('Program Details & Domains')}
            </h1>
            <p className="text-lg text-[#605e5c] max-w-3xl mx-auto leading-relaxed">
              {t('Explore the diverse fields available in our internship program. Choose the domain that aligns with your passion and career goals.')}
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 border border-[#edebe9] shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-[#faf9f8] flex items-center justify-center shrink-0 text-[#0078d4]">
                <Clock />
              </div>
              <div>
                <h3 className="font-semibold text-[#323130]">{t('Duration')}</h3>
                <p className="text-sm text-[#605e5c]">3 {t('to')} 6 {t('Months')}</p>
              </div>
            </div>
            <div className="bg-white p-6 border border-[#edebe9] shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-[#faf9f8] flex items-center justify-center shrink-0 text-[#107c41]">
                <Users />
              </div>
              <div>
                <h3 className="font-semibold text-[#323130]">{t('Eligibility')}</h3>
                <p className="text-sm text-[#605e5c]">{t('University & Madrasa Students')}</p>
              </div>
            </div>
            <div className="bg-white p-6 border border-[#edebe9] shadow-sm flex items-center gap-4">
              <div className="w-12 h-12 bg-[#faf9f8] flex items-center justify-center shrink-0 text-[#d83b01]">
                <Target />
              </div>
              <div>
                <h3 className="font-semibold text-[#323130]">{t('Format')}</h3>
                <p className="text-sm text-[#605e5c]">{t('On-Campus & Remote')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Domains Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="space-y-8">
            {domains.map((domain, index) => (
              <div 
                key={domain.id}
                className="bg-white border border-[#edebe9] shadow-sm flex flex-col md:flex-row"
              >
                {/* Visual Side */}
                <div className="w-full md:w-1/3 p-10 flex flex-col items-center justify-center text-center bg-[#faf9f8] border-r border-[#edebe9]">
                  <div className="mb-6">
                    {domain.icon}
                  </div>
                  <h2 className="text-2xl font-semibold text-[#323130] mb-3">{t(domain.title)}</h2>
                  <p className="text-[#605e5c] text-sm leading-relaxed">
                    {t(domain.description)}
                  </p>
                </div>
                
                {/* Content Side */}
                <div className="w-full md:w-2/3 p-8 md:p-10">
                  <h3 className="text-lg font-semibold text-[#323130] mb-6 flex items-center gap-2">
                    <span className={`w-1.5 h-5 ${domain.brandColor}`}></span>
                    {t('Available Roles')}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {domain.roles.map((role, rIndex) => (
                      <div key={rIndex} className="group p-4 border border-[#edebe9] hover:border-[#c8c6c4] bg-white transition-colors">
                        <h4 className={`font-semibold text-[#323130] mb-1.5 flex items-center gap-2 group-hover:${domain.textColor} transition-colors`}>
                          <ChevronRight size={14} className="text-[#8a8886] group-hover:opacity-100" />
                          {t(role.name)}
                        </h4>
                        <p className="text-sm text-[#605e5c] leading-relaxed pl-6">
                          {t(role.desc)}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-[#edebe9]">
                    <Link href="/internship#apply" className={`inline-flex items-center gap-2 px-6 py-2.5 text-white font-semibold ${domain.brandColor} hover:opacity-90 transition-opacity`}>
                      {t('Apply for')} {t(domain.title)} <ArrowRight size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-[#0078d4] text-white py-16 text-center">
           <div className="max-w-3xl mx-auto px-4">
             <h2 className="text-3xl font-semibold mb-4">{t('Ready to Kickstart Your Career?')}</h2>
             <p className="text-lg text-blue-100 mb-8">{t('Join Jamia Shar-e-Rabbani internship program and turn your academic knowledge into practical experience.')}</p>
             <Link href="/internship#apply" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-[#0078d4] font-semibold hover:bg-[#f3f2f1] transition-colors">
                {t('Submit Application')} <ArrowRight size={18} />
             </Link>
           </div>
        </div>

      </main>
      
      <Footer />
    </div>
  );
}
