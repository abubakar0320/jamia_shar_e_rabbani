'use client';

import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OptimizedImage from '@/components/OptimizedImage';
import { 
  GraduationCap, Mail, Phone, BookOpen, 
  Award, Languages, Calendar, MapPin, 
  ChevronLeft, ArrowRight, UserCircle,
  Briefcase, Search, FileText
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

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
  experience?: string;
  research?: string;
  courses?: string[];
  languages?: string[];
  achievements?: string[];
}

export default function FacultyProfile() {
  const { id } = useParams();
  const { t } = useTranslation();
  const [member, setMember] = useState<FacultyMember | null>(null);
  const [related, setRelated] = useState<FacultyMember[]>([]);
  const [loading, setLoading] = useState(true);

  const staticFaculty: FacultyMember[] = [
    {
      id: 1,
      name: 'faculty_member_1_name',
      role: 'faculty_member_1_role',
      designation: 'faculty_member_1_role',
      education: 'Alimiyat & Takhassus fil Hadith',
      specialization: 'Hadith Sciences & Fiqh',
      image: '/farooq-ali-rabbani.jpeg',
      email: 'shererabbani@gmail.com',
      contact: '03144081516',
      bio: 'faculty_member_1_bio',
      experience: '20+ Years',
      courses: ['Sahih al-Bukhari', 'Sunan at-Tirmidhi', 'Mishkat al-Masabih'],
      languages: ['Arabic', 'Urdu', 'English'],
      achievements: ['Authored various treatises on Hadith methodology.', 'Granted Ijazah by leading scholars of the Muslim world.']
    },
    {
      id: 2,
      name: 'faculty_member_2_name',
      role: 'faculty_member_2_role',
      designation: 'faculty_member_2_role',
      education: 'Alimiyat & Takhassus fil Fiqh',
      specialization: 'Islamic Jurisprudence & Arabic Literature',
      image: '/ali-hamza.jpeg',
      email: 'shererabbani@gmail.com',
      contact: '03144081516',
      bio: 'faculty_member_2_bio',
      experience: '15+ Years',
      courses: ['Hidayah', 'Al-Aqidah al-Tahawiyyah', 'Arabic Literature'],
      languages: ['Arabic', 'Urdu', 'Persian'],
      achievements: ['Expert in contemporary Fiqh issues.', 'Head of Darul Ifta.']
    }
  ];

  useEffect(() => {
    const data = staticFaculty;
    const found = data.find(m => m.id === Number(id));
    setMember(found || null);
    setRelated(data.filter(m => m.id !== Number(id)).slice(0, 3));
    setLoading(false);
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-20">
          <div className="w-12 h-12 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-emerald-800 font-bold uppercase tracking-widest text-[11px]">{t('Loading Profile...')}</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-20 text-center">
          <h1 className="text-4xl font-bold text-slate-900 mb-4">{t('Profile Not Found')}</h1>
          <p className="text-slate-500 mb-8">{t('The faculty member you are looking for does not exist or has been moved.')}</p>
          <Link href="/faculty" className="px-8 py-3 bg-emerald-700 text-white font-bold rounded-lg shadow-lg hover:bg-emerald-800 transition-all flex items-center gap-2">
            <ChevronLeft size={20} /> {t('Back to Faculty')}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <Header />
      
      <main className="flex-1 pb-24">
        
        {/* HEADER SECTION - UNIVERSITY STYLE */}
        <section className="bg-emerald-900 text-white pt-20 pb-40 relative overflow-hidden">
           <div className="absolute inset-0 opacity-10 pointer-events-none">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]" />
           </div>
           
           <div className="container mx-auto px-6 lg:px-12 relative z-10">
              <Link href="/faculty" className="inline-flex items-center gap-2 text-emerald-300 hover:text-white transition-colors mb-8 text-[13px] font-bold uppercase tracking-widest">
                 <ChevronLeft size={16} /> {t('Back to Directory')}
              </Link>
              
              <div className="flex flex-col lg:flex-row gap-12 items-start lg:items-end">
                  <div className="w-48 h-64 md:w-56 md:h-72 lg:w-64 lg:h-80 bg-white rounded-2xl shadow-2xl overflow-hidden relative border-4 border-white shrink-0 -mb-20 lg:-mb-32 z-20">
                    <OptimizedImage 
                      src={member.image || "/images/WhatsApp.jpeg"}
                      alt={t(member.name)}
                      fill
                      section="faculty"
                      className="object-cover"
                    />
                 </div>
                 
                 <div className="flex-1 pb-4">
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                    >
                      <h1 className="text-3xl md:text-4xl lg:text-5xl font-black mb-4 tracking-tighter leading-tight">{t(member.name)}</h1>
                      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-emerald-100/80 text-[13px] md:text-sm font-bold uppercase tracking-wider">
                         <span className="flex items-center gap-2"><Briefcase size={16} className="text-emerald-400" /> {t(member.designation || member.role)}</span>
                         <span className="flex items-center gap-2"><MapPin size={16} className="text-emerald-400" /> Jamia Sher-e-Rabbani</span>
                      </div>
                    </motion.div>
                 </div>
                 
                 <div className="lg:mb-4 w-full lg:w-auto flex flex-col sm:flex-row gap-4">
                    <Link href={`mailto:${member.email || 'shererabbani@gmail.com,shererabbani@gmail.com'}`} className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-emerald-900 font-bold rounded-xl shadow-lg hover:bg-emerald-50 transition-all text-[13px]">
                       <Mail size={18} /> {t('Email')}
                    </Link>
                    <Link href={`tel:${member.contact || '03144081516'}`} className="flex items-center justify-center gap-2 px-6 py-3 bg-emerald-800 text-white font-bold rounded-xl border border-emerald-700 hover:bg-emerald-700 transition-all text-[13px]">
                       <Phone size={18} /> {t('Call')}
                    </Link>
                 </div>
              </div>
           </div>
        </section>

        {/* CONTENT GRID */}
        <section className="container mx-auto px-6 lg:px-12 mt-32">
           <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
              
              {/* MAIN COLUMN */}
              <div className="lg:col-span-2 space-y-16">
                 
                 {/* BIOGRAPHY */}
                 <div>
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                       <UserCircle className="text-emerald-700" size={24} /> {t('Biography')}
                    </h2>
                    <div className="prose prose-slate max-w-none text-slate-600 leading-relaxed text-[15px]">
                       {member.bio ? t(member.bio) : t('Professional profile details available upon request.')}
                    </div>
                 </div>

                 {/* SPECIALIZATION & RESEARCH */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                       <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-3">
                          <BookOpen className="text-emerald-700" size={20} /> {t('Specialization')}
                       </h3>
                       <p className="text-[14px] text-slate-600 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                          {member.specialization}
                       </p>
                    </div>
                    {member.research && (
                      <div>
                        <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-3">
                           <Search className="text-emerald-700" size={20} /> {t('Research Interests')}
                        </h3>
                        <p className="text-[14px] text-slate-600 bg-white p-4 rounded-xl border border-slate-100 shadow-sm">
                           {member.research}
                        </p>
                      </div>
                    )}
                 </div>

                 {/* COURSES TAUGHT */}
                 {member.courses && member.courses.length > 0 && (
                    <div>
                       <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                          <FileText className="text-emerald-700" size={24} /> {t('Courses Taught')}
                       </h2>
                       <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          {member.courses.map((course, i) => (
                             <div key={i} className="flex items-center gap-4 bg-white p-5 rounded-2xl border border-slate-100 shadow-sm group hover:border-emerald-200 transition-colors">
                                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-emerald-700 font-bold shrink-0">
                                   0{i+1}
                                </div>
                                <span className="font-bold text-slate-800 text-[14px]">{course}</span>
                             </div>
                          ))}
                       </div>
                    </div>
                 )}

                 {/* ACHIEVEMENTS */}
                 {member.achievements && member.achievements.length > 0 && (
                    <div>
                       <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                          <Award className="text-emerald-700" size={24} /> {t('Academic Achievements')}
                       </h2>
                       <ul className="space-y-4">
                          {member.achievements.map((item, i) => (
                             <li key={i} className="flex items-start gap-4 text-slate-600 text-[14px] leading-relaxed">
                                <div className="mt-1 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center shrink-0">
                                   <div className="w-2 h-2 rounded-full bg-emerald-600" />
                                </div>
                                {item}
                             </li>
                          ))}
                       </ul>
                    </div>
                 )}
              </div>

              {/* SIDEBAR COLUMN */}
              <div className="space-y-12">
                 
                 {/* EDUCATION CARD */}
                 <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-50 rounded-bl-[100px] -mr-8 -mt-8 pointer-events-none" />
                    <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3 relative z-10">
                       <GraduationCap className="text-emerald-700" size={24} /> {t('Education')}
                    </h3>
                    <div className="space-y-6 relative z-10">
                       <div className="flex flex-col gap-2">
                          <span className="text-[13px] font-bold text-emerald-700 uppercase tracking-widest">{t('Academic Degree')}</span>
                          <p className="text-[14px] text-slate-700 font-medium leading-relaxed">{member.education}</p>
                       </div>
                       {member.experience && (
                          <div className="flex flex-col gap-2 pt-6 border-t border-slate-50">
                             <span className="text-[13px] font-bold text-emerald-700 uppercase tracking-widest">{t('Teaching Experience')}</span>
                             <p className="text-[14px] text-slate-700 font-medium leading-relaxed">{member.experience}</p>
                          </div>
                       )}
                       {member.languages && (
                          <div className="flex flex-col gap-2 pt-6 border-t border-slate-50">
                             <span className="text-[13px] font-bold text-emerald-700 uppercase tracking-widest flex items-center gap-2"><Languages size={14} /> {t('Languages')}</span>
                             <div className="flex flex-wrap gap-2 mt-2">
                                {member.languages.map(lang => (
                                   <span key={lang} className="px-3 py-1 bg-slate-100 text-slate-600 text-[11px] font-bold rounded-full uppercase tracking-tighter">{lang}</span>
                                ))}
                             </div>
                          </div>
                       )}
                    </div>
                 </div>

                 {/* RELATED FACULTY */}
                 <div className="space-y-6">
                    <h3 className="text-xl font-bold text-slate-900 px-2">{t('Related Faculty')}</h3>
                     <div className="space-y-4">
                       {related.map(item => (
                          <Link key={item.id} href={`/faculty/${item.id}`} className="flex items-center gap-4 bg-white p-4 rounded-2xl border border-slate-100 hover:shadow-lg transition-all group">
                             <div className="w-14 h-14 rounded-xl overflow-hidden relative shrink-0">
                                <OptimizedImage 
                                  src={item.image || "/images/WhatsApp.jpeg"}
                                  alt={t(item.name)}
                                  fill
                                  section="faculty"
                                  className="object-cover"
                                />
                             </div>
                             <div className="flex-1 min-w-0">
                                <h4 className="font-bold text-slate-900 text-sm truncate group-hover:text-emerald-700 transition-colors">{t(item.name)}</h4>
                                <p className="text-[11px] text-emerald-600 font-bold uppercase tracking-tighter truncate">{t(item.role)}</p>
                             </div>
                             <ArrowRight size={16} className="text-slate-300 group-hover:text-emerald-600 group-hover:translate-x-1 transition-all shrink-0" />
                          </Link>
                       ))}
                    </div>
                 </div>
              </div>

           </div>
        </section>

        {/* FINAL CTA */}
        <section className="container mx-auto px-6 lg:px-12 mt-24">
           <div className="bg-emerald-50 rounded-[40px] p-10 md:p-16 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-4">{t('Want to study under our scholars?')}</h2>
              <p className="text-slate-600 mb-8 max-w-2xl mx-auto">{t('Admissions are currently open for various academic programs. Begin your journey of sacred knowledge today.')}</p>
              <div className="flex flex-wrap justify-center gap-4">
                 <Link href="/admissions" className="px-8 py-3 bg-emerald-700 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-800 transition-all text-[13px]">
                    {t('Apply for Admission')}
                 </Link>
                 <Link href="/contact" className="px-8 py-3 bg-white text-emerald-900 font-bold rounded-xl border border-emerald-100 hover:bg-emerald-50 transition-all text-[13px]">
                    {t('Contact Academic Office')}
                 </Link>
              </div>
           </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
