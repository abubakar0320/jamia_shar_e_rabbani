'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { BookOpen, Target, History, Award, Users, GraduationCap, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

export default function About() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-1" />
        <Footer />
      </div>
    );
  }

  const sections = [
    {
      title: t('about_mission_title'),
      desc: t('about_mission_desc'),
      icon: <Target size={32} />,
      link: '/courses'
    },
    {
      title: t('about_vision_title'),
      desc: t('about_vision_desc'),
      icon: <GraduationCap size={32} />,
      link: '/about'
    },
    {
      title: t('about_history_title'),
      desc: t('about_history_desc'),
      icon: <History size={32} />,
      link: '/about'
    }
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-white font-sans text-slate-900">
        
        {/* --- HERO SECTION --- */}
        <section className="relative pt-24 pb-20 border-b border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 drop-shadow-sm mb-6">
                {t('about_hero_title')}
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                {t('about_hero_subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- MISSION/VISION/HISTORY GRID --- */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              {sections.map((item, i) => (
                <div key={i} className="flex flex-col p-4 border border-slate-100 rounded-2xl bg-slate-50/50">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white flex items-center justify-center text-blue-700 mb-3 md:mb-6 border border-gray-100 rounded-xl shadow-sm">
                    {React.cloneElement(item.icon, { className: "w-5 h-5 md:w-8 md:h-8" })}
                  </div>
                  <h3 className="text-sm md:text-2xl font-bold mb-2 md:mb-3 text-slate-900 leading-tight">{item.title}</h3>
                  <p className="text-xs md:text-base text-slate-600 mb-3 md:mb-6 flex-grow line-clamp-3 md:line-clamp-none">
                    {item.desc}
                  </p>
                  <Link 
                    href={item.link} 
                    className="text-blue-700 text-[10px] md:text-base font-bold flex items-center hover:underline mt-auto"
                  >
                    {t('about_learn_more')} <ChevronRight className="ml-1" size={14} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- DETAILED CONTENT SECTION --- */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1 relative aspect-video lg:aspect-square w-full">
              <Image 
                src="/images/whatsapp_1.jpeg" 
                alt={t('about_campus_image_alt') || 'Campus'}
                fill
                className="object-cover bg-gray-200 border border-slate-100" 
              />
            </div>
            
            <div className="flex-1">
              <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-slate-900">{t('about_journey_title')}</h2>
              <div className="space-y-6 text-slate-600 text-lg">
                <p>
                  {t('about_journey_p1')}
                </p>
                <p>
                  {t('about_journey_p2')}
                </p>
              </div>
              <div className="mt-10">
                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/40 hover:from-rose-600 hover:to-orange-600 font-bold rounded-full transform hover:-translate-y-1 transition-all"
                >
                  {t('about_visit_campus')} <ChevronRight className="ml-2" size={18} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* --- MESSAGE FROM PRINCIPAL --- */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-xs px-3 py-1 rounded-full font-bold mb-4 uppercase tracking-wide inline-block border bg-purple-50 text-purple-600 border-purple-200">
                  Message from Leadership
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-8 leading-tight">
                  Nurturing the Next Generation of Islamic Scholars
                </h2>
                
                <blockquote className="text-xl text-slate-700 italic border-l-4 border-purple-500 pl-6 mb-8">
                  "At Jamia Sher-e-Rabbani, we are committed to providing an educational environment that seamlessly blends classical Islamic sciences with contemporary relevance. Our goal is to cultivate scholars who are deeply rooted in the Quran and Sunnah, yet fully equipped to navigate and guide the modern world."
                </blockquote>
                <p className="text-slate-600 mb-8 text-lg">
                  We invite students from all over the world to join our diverse and dedicated community. Here, you will find unparalleled academic resources, compassionate mentors, and a spiritual sanctuary designed to bring out the very best in you.
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 flex items-center justify-center font-bold text-slate-900 border border-slate-100">
                    FR
                  </div>
                  <div>
                    <h4 className="text-lg font-semibold text-slate-900">Professor Dr. Farooq Ali Rabbani</h4>
                    <p className="text-sm font-semibold text-slate-600 uppercase tracking-wide">Principal</p>
                  </div>
                </div>
              </div>

              <div className="relative aspect-[3/4] w-full max-w-md mx-auto lg:ml-auto">
                <Image src="/farooq-ali-rabbani.jpeg" alt="Principal" fill className="object-cover border border-slate-100 bg-gray-100" />
              </div>
            </div>
          </div>
        </section>

        {/* --- CORE VALUES --- */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">Our Core Values</h2>
              <p className="text-slate-600 text-lg">The foundational principles that guide our institution, our teaching methodology, and our community.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {[
                { title: 'Academic Excellence', desc: 'Rigorous scholarship based on authentic sources and continuous intellectual growth.', icon: <BookOpen size={24} /> },
                { title: 'Spiritual Growth', desc: 'Fostering Taqwa, sincerity, and exemplary prophetic character in daily life.', icon: <Award size={24} /> },
                { title: 'Service to Ummah', desc: 'Preparing students to positively contribute to society through education and leadership.', icon: <Users size={24} /> },
                { title: 'Integrity & Ethics', desc: 'Upholding the highest standards of honesty, transparency, and moral responsibility.', icon: <Target size={24} /> }
              ].map((value, idx) => (
                <div key={idx} className={`bg-white p-4 md:p-8 border shadow-sm flex flex-col transition-all duration-300 transform hover:-translate-y-2 rounded-2xl ${idx%4===0?"border-rose-100 hover:border-rose-400 hover:shadow-[0_10px_30px_rgba(244,63,94,0.2)]":idx%4===1?"border-amber-100 hover:border-amber-400 hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]":idx%4===2?"border-emerald-100 hover:border-emerald-400 hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]":"border-blue-100 hover:border-blue-400 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)]"}`}>
                  <div className={`mb-3 md:mb-6 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl ${idx%4===0?"bg-rose-50 text-rose-600":idx%4===1?"bg-amber-50 text-amber-600":idx%4===2?"bg-emerald-50 text-emerald-600":"bg-blue-50 text-blue-600"}`}>
                    {React.cloneElement(value.icon, { className: "w-5 h-5 md:w-6 md:h-6" })}
                  </div>
                  <h3 className="text-sm md:text-xl font-bold text-slate-900 mb-1 md:mb-3">{value.title}</h3>
                  <p className="text-xs md:text-base text-slate-600 line-clamp-3 md:line-clamp-none">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- STATS SECTION --- */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500">
          <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12">
            {[
              { label: t('about_stat_founded'), val: '1995' },
              { label: t('about_stat_students'), val: '500+' },
              { label: t('about_stat_graduates'), val: '2,000+' },
              { label: t('about_stat_programs'), val: '25+' }
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-2xl md:text-5xl font-black text-white mb-1 md:mb-2">{stat.val}</div>
                <div className="text-[10px] md:text-xs font-bold text-fuchsia-100 uppercase tracking-wide">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
