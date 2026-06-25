'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { Book, Clock, Award, ChevronRight, Filter } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import { X } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  duration: string;
  level: string;
  desc: string;
  image?: string;
  gallery?: string[];
  programDetailsImage?: string;
}

export default function Courses() {
  const { t } = useTranslation();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const staticCourses: Course[] = [
    {
      id: 1,
      title: 'academic_programs_1_title',
      duration: '3-4 Years',
      level: 'academic_programs_1_category',
      desc: 'academic_programs_1_desc',
      image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800'
    },
    {
      id: 2,
      title: 'academic_programs_2_title',
      duration: '8 Years',
      level: 'academic_programs_2_category',
      desc: 'academic_programs_2_desc',
      image: '/hadith.jpg'
    },
    {
      id: 3,
      title: 'academic_programs_3_title',
      duration: '2 Years',
      level: 'academic_programs_3_category',
      desc: 'academic_programs_3_desc',
      image: '/tajweed-o-qirat.jpg'
    },
    {
      id: 4,
      title: 'academic_programs_4_title',
      duration: '1 Year',
      level: 'academic_programs_4_category',
      desc: 'academic_programs_4_desc',
      image: '/arabic-language.jpg'
    },
    {
      id: 5,
      title: 'academic_programs_5_title',
      duration: '2 Years',
      level: 'academic_programs_5_category',
      desc: 'academic_programs_5_desc',
      image: '/takhasus.jpeg'
    },
    {
      id: 6,
      title: 'academic_programs_6_title',
      duration: '6 Years',
      level: 'academic_programs_6_category',
      desc: 'academic_programs_6_desc',
      image: '/hadith.jpg'
    }
  ];

  const [courses, setCourses] = useState<Course[]>(staticCourses);
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    if (!mounted) return;
    setLoading(true);
    fetch('/api/courses')
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
           setCourses(data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching courses:', err);
        setLoading(false);
      });
  }, [mounted]);

  const getCourseImage = (title: string) => {
    if (title.toLowerCase().includes('hifz')) return 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?q=80&w=800';
    if (title.toLowerCase().includes('dars')) return '/hadith.jpg';
    if (title.toLowerCase().includes('arabic')) return '/arabic-language.jpg';
    if (title.toLowerCase().includes('tajweed') || title.toLowerCase().includes('qira')) return '/tajweed-o-qirat.jpg';
    if (title.toLowerCase().includes('takhasus')) return '/takhasus.jpeg';
    return 'https://images.unsplash.com/photo-1590076175571-4b54585b3996?q=80&w=800';
  };

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-1" />
        <Footer />
      </div>
    );
  }

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
                {t('courses_hero_title')}
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                {t('courses_hero_subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- FILTER BAR --- */}
        <section className="py-6 px-4 sm:px-6 lg:px-8 border-b border-slate-100 bg-white">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-700 uppercase tracking-wide">
                <Filter size={18} />
                <span>{t('courses_filter_label')}</span>
              </div>
              <div className="flex gap-3 flex-wrap">
                {['All', 'Primary', 'Intermediate', 'Advanced'].map((cat) => (
                  <button key={cat} className="px-4 py-2 text-xs font-semibold bg-white border border-slate-100 hover:border-rose-500 hover:text-rose-500 hover:shadow-sm transition-colors uppercase tracking-wide text-slate-600">
                    {t(cat)}
                  </button>
                ))}
              </div>
            </div>
            <div className="text-xs font-semibold text-slate-600 uppercase tracking-wide">
              {t('courses_count_text', { count: courses.length, defaultValue: `${courses.length} Programs Available` })}
            </div>
          </div>
        </section>

        {/* --- COURSES GRID --- */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className="text-center py-32">
                <div className="inline-block w-8 h-8 border-4 border-slate-100 border-t-rose-500 rounded-full animate-spin"></div>
                <div className="mt-4 text-sm font-semibold text-slate-600 uppercase">{t('courses_loading')}</div>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
                {courses.map((course, i) => (
                  <div key={course.id} className={`flex flex-col bg-white border md:border-2 shadow-sm transition-all duration-300 transform hover:-translate-y-1 md:hover:-translate-y-2 group rounded-xl md:rounded-2xl overflow-hidden ${i%4===0?"border-rose-100 hover:border-rose-300 hover:shadow-[0_8px_30px_rgba(244,63,94,0.15)]":i%4===1?"border-amber-100 hover:border-amber-300 hover:shadow-[0_8px_30px_rgba(245,158,11,0.15)]":i%4===2?"border-emerald-100 hover:border-emerald-300 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]":"border-blue-100 hover:border-blue-300 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)]"}`}>
                    <div className="aspect-[4/3] md:aspect-[16/10] bg-gray-100 relative overflow-hidden">
                      <OptimizedImage 
                        src={course.image || getCourseImage(course.title)} 
                        alt={course.title} 
                        fill
                        section="course"
                        className="object-cover group-hover:scale-110 transition-transform duration-700"
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                      />
                      <div className="absolute top-2 left-2 md:top-4 md:left-4">
                        <span className={`text-[8px] md:text-[10px] px-2 md:px-3 py-0.5 md:py-1 rounded-full font-black uppercase tracking-widest border shadow-sm backdrop-blur-md ${i%4===0?"bg-rose-500/90 text-white border-rose-400":i%4===1?"bg-amber-500/90 text-white border-amber-400":i%4===2?"bg-emerald-500/90 text-white border-emerald-400":"bg-blue-500/90 text-white border-blue-400"}`}>
                          {t(course.level)}
                        </span>
                      </div>
                    </div>
                    <div className="p-3 md:p-6 flex flex-col flex-1">
                      <h3 className={`text-sm md:text-xl font-bold mb-1 md:mb-3 line-clamp-2 leading-snug ${i%4===0?"text-rose-600":i%4===1?"text-amber-600":i%4===2?"text-emerald-600":"text-blue-600"}`}>
                        {t(course.title)}
                      </h3>
                      <p className="hidden md:block text-sm text-slate-600 mb-6 flex-1 line-clamp-3">
                        {t(course.desc)}
                      </p>
                      
                      <div className="flex flex-col gap-2 md:gap-4 mt-auto">
                        <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-4 text-[9px] md:text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                          <div className="flex items-center gap-1 md:gap-1.5">
                            <Clock size={12} className={`md:w-3.5 md:h-3.5 shrink-0 ${i%4===0?"text-rose-500":i%4===1?"text-amber-500":i%4===2?"text-emerald-500":"text-blue-500"}`} />
                            {t(course.duration)}
                          </div>
                          <div className="flex items-center gap-1 md:gap-1.5">
                            <Award size={12} className={`md:w-3.5 md:h-3.5 shrink-0 ${i%4===0?"text-rose-500":i%4===1?"text-amber-500":i%4===2?"text-emerald-500":"text-blue-500"}`} />
                            <span className="hidden md:inline">{t('courses_certified_label')}</span>
                            <span className="md:hidden">Certified</span>
                          </div>
                        </div>
                        
                        <div className="flex flex-col xl:flex-row gap-2 md:gap-3 pt-2 md:pt-2 border-t border-slate-100">
                          <Link 
                            href={`/courses/${(course as any)._id || course.id}`} 
                            className={`flex-1 text-center py-1.5 md:py-2.5 text-[10px] md:text-xs font-bold rounded-lg md:rounded-xl border md:border-2 transition-colors ${i%4===0?"border-rose-100 text-rose-600 hover:bg-rose-50":i%4===1?"border-amber-100 text-amber-600 hover:bg-amber-50":i%4===2?"border-emerald-100 text-emerald-600 hover:bg-emerald-50":"border-blue-100 text-blue-600 hover:bg-blue-50"}`}
                          >
                            {t('courses_details_link')}
                          </Link>
                          <Link 
                            href={`/admissions?course=${encodeURIComponent(course.title)}`}
                            className={`flex-1 text-center py-1.5 md:py-2.5 text-[10px] md:text-xs text-white font-bold transition-all shadow-sm md:shadow-md rounded-lg md:rounded-xl hover:shadow-lg hover:-translate-y-0.5 ${i%4===0?"bg-gradient-to-r from-rose-500 to-pink-500 shadow-rose-500/30":i%4===1?"bg-gradient-to-r from-amber-500 to-orange-500 shadow-amber-500/30":i%4===2?"bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/30":"bg-gradient-to-r from-blue-500 to-indigo-500 shadow-blue-500/30"}`}
                          >
                            {t('courses_apply_button')}
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* --- ACADEMIC PATHWAYS --- */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">Our Academic Pathways</h2>
              <p className="text-slate-600 text-lg">A structured educational journey designed to take students from foundational learning to advanced Islamic scholarship.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              {[
                { step: "01", title: "Foundational Level", desc: "Focuses on memorization of the Quran, basic Tajweed, and fundamental Arabic reading and writing skills.", icon: <Book size={24} /> },
                { step: "02", title: "Intermediate Level", desc: "Introduces Arabic grammar, syntax, foundational Fiqh (jurisprudence), and the translation of the Holy Quran.", icon: <Award size={24} /> },
                { step: "03", title: "Advanced Level", desc: "Deep dive into Hadith methodology, advanced Fiqh, Usul al-Fiqh, and comparative religious studies.", icon: <Clock size={24} /> }
              ].map((path, idx) => (
                <div key={idx} className={`flex flex-col p-4 md:p-8 border shadow-sm rounded-xl md:rounded-2xl relative transition-all duration-300 transform hover:-translate-y-1 md:hover:-translate-y-2 ${idx===0?"border-rose-100 hover:border-rose-400 hover:shadow-[0_10px_30px_rgba(244,63,94,0.2)]":idx===1?"border-amber-100 hover:border-amber-400 hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]":"border-emerald-100 hover:border-emerald-400 hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]"}`}>
                  <div className={`mb-3 md:mb-4 w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-lg md:rounded-xl ${idx===0?"bg-rose-50 text-rose-600":idx===1?"bg-amber-50 text-amber-600":"bg-emerald-50 text-emerald-600"}`}>
                    {React.cloneElement(path.icon, { className: "w-5 h-5 md:w-6 md:h-6" })}
                  </div>
                  <div className="absolute top-3 right-3 md:top-6 md:right-6 text-lg md:text-2xl font-bold text-gray-200">
                    {path.step}
                  </div>
                  <h3 className="text-sm md:text-xl font-bold text-slate-900 mb-2 md:mb-3">{path.title}</h3>
                  <p className="hidden md:block text-slate-600 text-sm md:text-base">{path.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- LEARNING METHODOLOGY --- */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">Our Distinctive Learning Methodology</h2>
                <p className="text-slate-700 text-lg mb-8">
                  At Jamia Sher-e-Rabbani, we preserve the traditional Islamic pedagogy of <span className="italic">Talaqqi</span> (direct transmission of knowledge) while integrating modern educational tools and methodologies to ensure our students excel in contemporary environments.
                </p>
                <ul className="space-y-4 mb-8">
                  {[
                    "Direct mentorship from certified, highly qualified scholars.",
                    "Small class sizes ensuring personalized attention and spiritual tarbiyah.",
                    "Integration of technology in research and fatwa methodology.",
                    "Comprehensive assessment system focusing on understanding, not just memorization."
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <ChevronRight size={20} className="text-purple-600 shrink-0 mt-0.5" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-6">
                <div className="bg-white p-4 md:p-8 border border-slate-100 rounded-xl md:rounded-2xl shadow-sm text-center">
                  <div className="text-2xl md:text-4xl font-bold text-slate-900 mb-1 md:mb-2">1:15</div>
                  <div className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-wide">Teacher-Student Ratio</div>
                </div>
                <div className="bg-white p-4 md:p-8 border border-slate-100 rounded-xl md:rounded-2xl shadow-sm text-center">
                  <div className="text-2xl md:text-4xl font-bold text-slate-900 mb-1 md:mb-2">100%</div>
                  <div className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-wide">Certified Curriculum</div>
                </div>
                <div className="bg-white p-4 md:p-8 border border-slate-100 rounded-xl md:rounded-2xl shadow-sm text-center">
                  <div className="text-2xl md:text-4xl font-bold text-slate-900 mb-1 md:mb-2">5+</div>
                  <div className="text-[10px] md:text-sm font-bold text-slate-500 uppercase tracking-wide">Specialized Libraries</div>
                </div>
                <div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 p-4 md:p-8 border-none rounded-xl md:rounded-2xl text-center text-white shadow-lg shadow-purple-500/30 transform hover:-translate-y-1 transition-transform">
                  <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">Top</div>
                  <div className="text-[10px] md:text-sm font-bold text-purple-200 uppercase tracking-wide">Wafaq Rankings</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SECONDARY CTA --- */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-semibold mb-6 text-slate-900">{t('courses_cta_title')}</h2>
            <p className="text-lg text-slate-600 mb-10">{t('courses_cta_desc')}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/40 hover:from-rose-600 hover:to-orange-600 font-bold px-8 py-3 rounded-full transform hover:-translate-y-1 transition-all">
                {t('courses_cta_advisor_button')}
              </Link>
              <Link href="/admissions" className="bg-transparent border-2 border-gray-900 text-slate-900 px-8 py-3 font-semibold hover:bg-gray-100 transition-colors">
                {t('courses_cta_requirements_button')}
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* LIGHTBOX */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 cursor-zoom-out"
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              className="absolute top-6 right-6 p-2 text-white hover:text-gray-300"
            >
              <X size={24} />
            </button>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-video bg-black cursor-default"
              onClick={e => e.stopPropagation()}
            >
              <OptimizedImage 
                src={selectedImage}
                alt="Fullscreen preview"
                fill
                section="course"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </>
  );
}
