'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { GraduationCap, Mail, Phone, ChevronRight, UserCircle, BookOpen } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';

interface FacultyMember {
  id: number;
  name: string;
  role: string;
  designation?: string;
  education: string;
  specialization: string;
  contact?: string;
  email?: string;
  bio?: string;
  image?: string;
}

export default function Faculty() {
  const { t } = useTranslation();

  const staticFaculty: FacultyMember[] = [
    {
      id: 1,
      name: 'faculty_member_1_name',
      role: 'faculty_member_1_role',
      education: 'Alimiyat & Takhassus fil Hadith',
      specialization: 'Hadith Sciences & Fiqh',
      image: '/farooq-ali-rabbani.jpeg'
    },
    {
      id: 2,
      name: 'faculty_member_2_name',
      role: 'faculty_member_2_role',
      education: 'Alimiyat & Takhassus fil Fiqh',
      specialization: 'Islamic Jurisprudence & Arabic Literature',
      image: '/ali-hamza.jpeg'
    }
  ];

  const [faculty, setFaculty] = useState<FacultyMember[]>(staticFaculty);
  const [loading, setLoading] = useState(false);
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
                {t('faculty_hero_title')}
              </h1>
              <p className="text-xl text-slate-600 max-w-3xl mx-auto mb-8">
                {t('faculty_hero_subtitle')}
              </p>
            </motion.div>
          </div>
        </section>

        {/* --- FACULTY GRID --- */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">{t('faculty_leadership_title')}</h2>
              <p className="text-slate-600 text-lg">Meet our distinguished scholars and academic leaders dedicated to nurturing the next generation.</p>
            </div>
            
            {loading ? (
              <div className="text-center py-32">
                <div className="inline-block w-8 h-8 border-4 border-slate-100 border-t-rose-500 rounded-full animate-spin"></div>
                <div className="mt-4 text-sm font-semibold text-slate-600 uppercase">{t('faculty_loading')}</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {faculty.map((member, i) => (
                  <div key={member.id} className={`flex flex-col bg-white border-2 shadow-sm transition-all duration-300 transform hover:-translate-y-2 group rounded-2xl overflow-hidden ${i%4===0?"border-rose-100 hover:border-rose-300 hover:shadow-[0_8px_30px_rgba(244,63,94,0.15)]":i%4===1?"border-amber-100 hover:border-amber-300 hover:shadow-[0_8px_30px_rgba(245,158,11,0.15)]":i%4===2?"border-emerald-100 hover:border-emerald-300 hover:shadow-[0_8px_30px_rgba(16,185,129,0.15)]":"border-blue-100 hover:border-blue-300 hover:shadow-[0_8px_30px_rgba(59,130,246,0.15)]"}`}>
                    <div className="aspect-[4/5] relative bg-gray-100 overflow-hidden">
                      <OptimizedImage 
                        src={member.image || "/images/WhatsApp.jpeg"}
                        alt={member.name}
                        fill
                        section="faculty"
                        className="object-cover object-top group-hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <h3 className={`text-xl font-bold mb-1 ${i%4===0?"text-rose-600":i%4===1?"text-amber-600":i%4===2?"text-emerald-600":"text-blue-600"}`}>
                        {t(member.name)}
                      </h3>
                      <p className="text-xs font-bold mb-4 uppercase tracking-wide text-slate-500">
                        {t(member.designation || member.role)}
                      </p>
                      
                      <div className="space-y-3 mb-6 flex-1 text-sm">
                        <div>
                          <span className="font-semibold text-slate-900 block mb-0.5">{t('faculty_member_education_label', 'Education')}</span>
                          <span className="text-slate-600">{t(member.education)}</span>
                        </div>
                        <div>
                          <span className="font-semibold text-slate-900 block mb-0.5">{t('faculty_member_specialization_label', 'Specialization')}</span>
                          <span className="text-slate-600">{t(member.specialization)}</span>
                        </div>
                      </div>

                      <div className="flex gap-4 items-center pt-4 border-t border-slate-100 mt-auto">
                        <Link href={`mailto:${member.email || 'shererabbani@gmail.com'}`} className={`transition-colors ${i%4===0?"text-rose-400 hover:text-rose-600":i%4===1?"text-amber-400 hover:text-amber-600":i%4===2?"text-emerald-400 hover:text-emerald-600":"text-blue-400 hover:text-blue-600"}`}>
                          <Mail size={20} />
                        </Link>
                        <Link href={`tel:${member.contact || '03144081516'}`} className={`transition-colors ${i%4===0?"text-rose-400 hover:text-rose-600":i%4===1?"text-amber-400 hover:text-amber-600":i%4===2?"text-emerald-400 hover:text-emerald-600":"text-blue-400 hover:text-blue-600"}`}>
                          <Phone size={20} />
                        </Link>
                        <Link 
                          href={`/faculty/${member.id}`} 
                          className={`ml-auto px-4 py-1.5 text-xs font-bold rounded-xl border-2 transition-colors ${i%4===0?"border-rose-100 text-rose-600 hover:bg-rose-50":i%4===1?"border-amber-100 text-amber-600 hover:bg-amber-50":i%4===2?"border-emerald-100 text-emerald-600 hover:bg-emerald-50":"border-blue-100 text-blue-600 hover:bg-blue-50"}`}
                        >
                          {t('faculty_member_profile_link', 'View Profile')}
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* --- SCHOLARLY LINEAGE (ISNAD) --- */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <span className="text-xs px-3 py-1 rounded-full font-bold mb-4 uppercase tracking-wide inline-block border bg-purple-50 text-purple-600 border-purple-200">
                  Authentic Transmission
                </span>
                <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 leading-tight mb-6">
                  Preserving the sacred tradition of <span className="italic font-serif text-slate-600">Talaqqi</span>
                </h2>
                <p className="text-slate-600 text-lg mb-8">
                  At Jamia Sher-e-Rabbani, we do not merely teach textbooks; we transmit a living tradition. Our senior faculty members possess unbroken chains of narration (Ijazat and Asanid) in major Hadith collections and classical texts, tracing back to the original authors and ultimately to the Prophet Muhammad (Peace Be Upon Him).
                </p>
                <div className="grid grid-cols-2 gap-8 pt-8 border-t border-slate-100">
                  <div>
                    <div className="text-4xl font-semibold text-slate-900 mb-2">100%</div>
                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Faculty with Formal Ijazah</div>
                  </div>
                  <div>
                    <div className="text-4xl font-semibold text-slate-900 mb-2">20+</div>
                    <div className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Decades of Experience</div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div className="bg-white p-8 border border-rose-100 shadow-sm rounded-2xl text-center transform hover:-translate-y-2 transition-all hover:shadow-[0_10px_30px_rgba(244,63,94,0.2)]">
                  <div className="w-16 h-16 mx-auto bg-rose-50 rounded-2xl flex items-center justify-center mb-4"><BookOpen size={32} className="text-rose-500" /></div>
                  <h4 className="font-semibold text-slate-900 text-lg mb-1">Tafseer</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Exegesis</p>
                </div>
                <div className="bg-white p-8 border border-amber-100 shadow-sm rounded-2xl text-center transform hover:-translate-y-2 transition-all hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]">
                  <div className="w-16 h-16 mx-auto bg-amber-50 rounded-2xl flex items-center justify-center mb-4"><BookOpen size={32} className="text-amber-500" /></div>
                  <h4 className="font-semibold text-slate-900 text-lg mb-1">Hadith</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Prophetic Traditions</p>
                </div>
                <div className="bg-white p-8 border border-emerald-100 shadow-sm rounded-2xl text-center transform hover:-translate-y-2 transition-all hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]">
                  <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center mb-4"><BookOpen size={32} className="text-emerald-500" /></div>
                  <h4 className="font-semibold text-slate-900 text-lg mb-1">Fiqh & Ifta</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Jurisprudence</p>
                </div>
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-8 border-none rounded-2xl text-center text-white shadow-lg shadow-indigo-500/30 transform hover:-translate-y-2 transition-all">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm"><BookOpen size={32} className="text-white" /></div>
                  <h4 className="font-semibold text-white text-lg mb-1">Aqaid</h4>
                  <p className="text-xs text-blue-200 uppercase tracking-wide">Islamic Theology</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- ACADEMIC DEPARTMENTS --- */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12 max-w-2xl">
              <h2 className="text-3xl md:text-4xl font-semibold mb-4 text-slate-900">Academic Departments</h2>
              <p className="text-slate-600 text-lg">
                Our faculty is organized into specialized departments to ensure deep, focused, and high-quality instruction across all disciplines of Islamic sciences.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: 'Department of Quranic Sciences', desc: 'Focusing on Hifz, Tajweed, Qira\'at (variant readings), and the profound sciences of Tafseer.', icon: <BookOpen size={32} /> },
                { title: 'Department of Hadith', desc: 'Dedicated to the rigorous study of the Sihah Sittah, methodology of Muhadditheen, and Hadith criticism.', icon: <UserCircle size={32} /> },
                { title: 'Darul Ifta (Jurisprudence)', desc: 'Specializing in advanced Fiqh, Usul al-Fiqh, and the issuance of contemporary fatwas.', icon: <GraduationCap size={32} /> }
              ].map((dept, idx) => (
                <div key={idx} className={`bg-white border shadow-sm p-8 flex flex-col rounded-2xl transition-all duration-300 transform hover:-translate-y-2 ${idx===0?"border-rose-100 hover:border-rose-400 hover:shadow-[0_10px_30px_rgba(244,63,94,0.2)]":idx===1?"border-amber-100 hover:border-amber-400 hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]":"border-emerald-100 hover:border-emerald-400 hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]"}`}>
                  <div className={`mb-6 w-14 h-14 rounded-xl flex items-center justify-center shadow-sm border ${idx===0?"bg-rose-50 text-rose-600 border-rose-100":idx===1?"bg-amber-50 text-amber-600 border-amber-100":"bg-emerald-50 text-emerald-600 border-emerald-100"}`}>
                    {dept.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{dept.title}</h3>
                  <p className="text-slate-600 mb-6 flex-1">{dept.desc}</p>
                  <Link href="/courses" className={`font-bold inline-flex items-center hover:underline mt-auto ${idx===0?"text-rose-600":idx===1?"text-amber-600":"text-emerald-600"}`}>
                     Explore Programs <ChevronRight className="ml-1" size={16} />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- OPPORTUNITIES --- */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 bg-white p-10 border border-slate-100 shadow-sm rounded-3xl">
            <div className="flex-1">
              <h2 className="text-3xl font-semibold mb-6 text-slate-900">{t('faculty_careers_title')}</h2>
              <p className="text-lg text-slate-600 mb-8">
                {t('faculty_careers_desc')}
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/40 hover:from-rose-600 hover:to-orange-600 font-bold rounded-full transform hover:-translate-y-1 transition-all"
              >
                {t('faculty_careers_link')} <ChevronRight className="ml-2" size={18} />
              </Link>
            </div>
            <div className="flex-1 w-full relative aspect-video lg:aspect-[4/3] bg-gray-100 border border-slate-100">
               <OptimizedImage 
                src="/images/WhatsApp.jpeg" 
                fill
                section="campus"
                className="object-cover" 
                alt={t('faculty_careers_image_alt')}
              />
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
