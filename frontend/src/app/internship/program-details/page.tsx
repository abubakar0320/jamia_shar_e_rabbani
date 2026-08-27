'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Head from 'next/head';
import { ChevronRight, Target, Clock, Users, ArrowRight } from 'lucide-react';

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
      theme: "from-blue-500 to-indigo-600",
      bgLight: "bg-blue-50",
      icon: (
        <svg viewBox="0 0 64 64" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="12" width="48" height="32" rx="4" fill="#E0E7FF" stroke="#4F46E5" strokeWidth="2"/>
          <path d="M24 44v8m16-8v8m-20 0h24" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M16 28l6-6-6-6M28 28h8" stroke="#4338CA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          <circle cx="44" cy="22" r="4" fill="#3B82F6" />
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
      theme: "from-amber-500 to-orange-600",
      bgLight: "bg-amber-50",
      icon: (
        <svg viewBox="0 0 64 64" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 8L8 20l24 12 24-12L32 8z" fill="#FEF3C7" stroke="#D97706" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M16 26v16c0 6 16 10 16 10s16-4 16-10V26" fill="none" stroke="#D97706" strokeWidth="2" strokeLinejoin="round"/>
          <path d="M56 20v18" stroke="#B45309" strokeWidth="2" strokeLinecap="round"/>
          <circle cx="56" cy="40" r="2" fill="#B45309"/>
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
      theme: "from-emerald-500 to-teal-600",
      bgLight: "bg-emerald-50",
      icon: (
        <svg viewBox="0 0 64 64" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
          <circle cx="32" cy="24" r="8" fill="#D1FAE5" stroke="#059669" strokeWidth="2"/>
          <path d="M16 52c0-8 8-16 16-16s16 8 16 16" fill="none" stroke="#059669" strokeWidth="2" strokeLinecap="round"/>
          <path d="M44 20l6-6 6 6M50 14v16" stroke="#047857" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Head>
        <title>{t('Program Details')} | Internship - Jamia Shar-e-Rabbani</title>
      </Head>
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-slate-900 pt-32 pb-20 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-br from-rose-500/20 to-orange-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-500/20 to-indigo-500/20 rounded-full blur-3xl translate-y-1/3 -translate-x-1/3"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 text-slate-200 text-sm font-semibold mb-6">
                <Target size={16} className="text-rose-400" />
                {t('Comprehensive Internship Program')}
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tight">
                {t('Program Details & Domains')}
              </h1>
              <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                {t('Explore the diverse fields available in our internship program. Choose the domain that aligns with your passion and career goals.')}
              </p>
            </motion.div>
          </div>
        </div>

        {/* Info Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative z-20 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-rose-50 flex items-center justify-center shrink-0">
                <Clock className="text-rose-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{t('Duration')}</h3>
                <p className="text-sm text-slate-500">3 {t('to')} 6 {t('Months')}</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-blue-50 flex items-center justify-center shrink-0">
                <Users className="text-blue-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{t('Eligibility')}</h3>
                <p className="text-sm text-slate-500">{t('University & Madrasa Students')}</p>
              </div>
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="bg-white p-6 rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-amber-50 flex items-center justify-center shrink-0">
                <Target className="text-amber-500" />
              </div>
              <div>
                <h3 className="font-bold text-slate-800">{t('Format')}</h3>
                <p className="text-sm text-slate-500">{t('On-Campus & Remote')}</p>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Domains Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="space-y-12">
            {domains.map((domain, index) => (
              <motion.div 
                key={domain.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className={`bg-white rounded-[2rem] overflow-hidden border border-slate-200 shadow-sm flex flex-col md:flex-row ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                {/* Visual Side */}
                <div className={`w-full md:w-2/5 p-12 flex flex-col items-center justify-center text-center ${domain.bgLight}`}>
                  <div className="w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center mb-6 transform -rotate-3 hover:rotate-0 transition-transform duration-300">
                    {domain.icon}
                  </div>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-800 mb-3">{t(domain.title)}</h2>
                  <p className="text-slate-600 text-sm md:text-base leading-relaxed">
                    {t(domain.description)}
                  </p>
                </div>
                
                {/* Content Side */}
                <div className="w-full md:w-3/5 p-8 md:p-12">
                  <h3 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
                    <span className={`w-2 h-6 rounded-full bg-gradient-to-b ${domain.theme}`}></span>
                    {t('Available Roles')}
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {domain.roles.map((role, rIndex) => (
                      <div key={rIndex} className="group p-5 rounded-xl border border-slate-100 hover:border-slate-200 hover:shadow-md transition-all bg-slate-50/50 hover:bg-white">
                        <h4 className="font-bold text-slate-800 mb-2 flex items-center gap-2">
                          <ChevronRight size={16} className={`opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all text-slate-400`} />
                          {t(role.name)}
                        </h4>
                        <p className="text-sm text-slate-500 leading-relaxed">
                          {t(role.desc)}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-slate-100">
                    <a href="/internship#apply" className={`inline-flex items-center gap-2 px-6 py-3 rounded-lg text-white font-bold bg-gradient-to-r ${domain.theme} shadow-lg shadow-current/20 hover:shadow-xl hover:-translate-y-0.5 transition-all`}>
                      {t('Apply for')} {t(domain.title)} <ArrowRight size={18} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-br from-slate-900 to-slate-800 py-24 mt-20 relative overflow-hidden text-center">
           <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
           <div className="relative z-10 max-w-3xl mx-auto px-4">
             <h2 className="text-3xl md:text-5xl font-black text-white mb-6">{t('Ready to Kickstart Your Career?')}</h2>
             <p className="text-lg text-slate-300 mb-10">{t('Join Jamia Shar-e-Rabbani internship program and turn your academic knowledge into practical experience.')}</p>
             <a href="/internship#apply" className="inline-flex items-center gap-2 px-8 py-4 bg-white text-slate-900 hover:bg-slate-50 font-black rounded-xl transition-all shadow-[0_10px_40px_-10px_rgba(255,255,255,0.3)] transform hover:-translate-y-1 text-lg">
                {t('Submit Application')} <ArrowRight size={20} />
             </a>
           </div>
        </div>

      </main>
      
      <Footer />
    </div>
  );
}
