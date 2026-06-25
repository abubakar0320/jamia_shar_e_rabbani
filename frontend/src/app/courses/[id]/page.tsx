'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { 
  Clock, Award, CheckCircle2, 
  ChevronRight, ArrowLeft, Users, 
  ShieldCheck, Mail, Share2, GraduationCap,
  FileIcon, Eye, Download, X
} from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from '@/components/OptimizedImage';
import YouTubePlaylist from '@/components/YouTubePlaylist';

interface PlaylistData {
  id: string;
  title: string;
  category: string;
  listId: string;
  videoId?: string;
  icon: 'video' | 'book' | 'award';
  badge: string;
  description?: string;
}

interface SyllabusData {
  title: string;
  file: string;
}

interface Course {
  id: number;
  title: string;
  duration: string;
  level: string;
  desc: string;
  image?: string;
  playlistTitle?: string;
  playlistUrl?: string;
  playlistId?: string;
  videoId?: string;
  playlists?: PlaylistData[];
  syllabus?: SyllabusData[];
  gallery?: string[];
  programDetailsImage?: string;
}

export default function CourseDetails() {
  const { t } = useTranslation();
  const { id } = useParams();
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/courses/${id}`)
      .then(res => res.json())
      .then(data => {
        setCourse(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching course details:', err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center py-40 gap-4">
           <div className="w-10 h-10 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin"></div>
           <div className="text-[11px] font-bold text-emerald-800 tracking-wider uppercase">{t('Loading Program Details')}</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col bg-white">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center py-40 gap-6">
          <h1 className="text-3xl font-black text-slate-900 tracking-tight">{t('Program Not Found')}</h1>
          <Link href="/courses" className="px-6 py-3 bg-emerald-700 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-800 transition-all flex items-center gap-2 text-[13px]">
            <ArrowLeft size={18} /> {t('Back to Academic Programs')}
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header />
      
      <main className="flex-1 font-sans text-slate-900">
        
        {/* --- PROFESSIONAL HERO --- */}
        <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden bg-slate-900">
          <div className="absolute inset-0 z-0">
            <OptimizedImage 
              src={course.image || "https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=2000"} 
              alt={course.title}
              fill
              priority
              section="course"
              className="object-cover object-center opacity-40"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-900/60 to-slate-900" />
          </div>
          
          <div className="container mx-auto px-6 lg:px-12 relative z-10 pt-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <Link href="/courses" className="text-emerald-400 hover:text-emerald-300 text-[11px] font-bold uppercase tracking-[0.2em] transition-colors">{t('Academic Programs')}</Link>
                <ChevronRight size={14} className="text-slate-500" />
                <span className="text-slate-300 text-[11px] font-bold uppercase tracking-[0.2em]">{t(course.level)}</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-black text-white mb-6 tracking-tighter leading-none">
                {t(course.title)}
              </h1>
              <p className="text-lg text-slate-300 mb-8 leading-relaxed max-w-2xl font-medium">
                {t(course.desc)}
              </p>
              <div className="flex flex-wrap gap-4">
                <Link 
                  href={`/admissions?course=${encodeURIComponent(course.title)}`} 
                  className="inline-flex items-center justify-center px-8 py-3.5 bg-emerald-600 text-white text-[13px] font-bold rounded-xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/20 active:scale-95"
                >
                  {t('Apply for Enrollment')}
                </Link>
                <button className="p-3 bg-white/10 text-white rounded-xl hover:bg-white/20 transition-all backdrop-blur-sm border border-white/10">
                  <Share2 size={20} />
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- CONTENT GRID --- */}
        <section className="py-24 container mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
            
            {/* Left Column: Details */}
            <div className="lg:col-span-8 space-y-20">
              
              {/* OVERVIEW */}
              <div>
                <h2 className="text-[11px] font-bold text-emerald-600 uppercase tracking-[0.2em] mb-4">{t('Curriculum Overview')}</h2>
                <h3 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">{t('Mastering the Sacred Word')}</h3>
                <div className="prose prose-slate max-w-none text-slate-600 space-y-6 text-[15px] leading-relaxed">
                  <p>
                    {t('The {{title}} program at Jamia Sher-e-Rabbani is designed to offer a balanced and profound understanding of classical Islamic knowledge. We emphasize not just academic achievement, but the spiritual and ethical development of every student.', { title: t(course.title) })}
                  </p>
                  <p>
                    {t('Our methodology integrates traditional teaching (Dars) with modern pedagogical standards, ensuring that graduates are well-equipped to navigate contemporary challenges while remaining firmly rooted in the Quran and Sunnah.')}
                  </p>
                </div>
              </div>

              {/* PROGRAM DETAILS IMAGE (Removed as per request) */}

              {/* DYNAMIC VIDEO RESOURCES */}
              {(course.playlistId || (course.playlists && course.playlists.length > 0)) && (
                <div className="space-y-20">
                  {/* Specific Playlist Fields */}
                  {course.playlistId && (
                    <YouTubePlaylist 
                      title={course.playlistTitle || t('Arabic Language Video Lessons')}
                      category={t('Education')}
                      listId={course.playlistId}
                      videoId={course.videoId}
                      badge={t('Full Course')}
                      description={t('A comprehensive Arabic language learning series designed to help students develop Arabic reading, writing, speaking, grammar, and comprehension skills.')}
                      iconType="book"
                    />
                  )}

                  {/* Playlists Array */}
                  {course.playlists && course.playlists.map((playlist) => (
                    <YouTubePlaylist 
                      key={playlist.id}
                      title={playlist.title}
                      category={playlist.category}
                      listId={playlist.listId}
                      videoId={playlist.videoId}
                      badge={playlist.badge}
                      description={playlist.description}
                      iconType={playlist.icon}
                    />
                  ))}
                  
                  <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100 flex items-start gap-4">
                     <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-emerald-600 shrink-0">
                        <ShieldCheck size={20} />
                     </div>
                     <div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1">{t('Interactive Digital Learning')}</h4>
                        <p className="text-slate-500 text-[13px] leading-relaxed">Our video resources are curated by academic experts to provide a comprehensive spiritual and scholarly experience. Students receive full access to our digital media library.</p>
                     </div>
                  </div>
                </div>
              )}

              {/* SYLLABUS SECTION */}
              {course.syllabus && course.syllabus.length > 0 && (
                <div>
                  <h2 className="text-[11px] font-bold text-emerald-600 uppercase tracking-[0.2em] mb-4">{t('Academic Resources')}</h2>
                  <h3 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">{t('Course Syllabus & Curriculum')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {course.syllabus.map((item, i) => (
                      <div key={i} className="p-8 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col gap-6 group hover:bg-white hover:shadow-xl hover:border-emerald-200 transition-all">
                        <div className="flex items-center gap-4">
                           <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center shadow-sm">
                              <FileIcon size={24} />
                           </div>
                           <h4 className="font-black text-slate-900 text-sm uppercase tracking-tight">{t(item.title)}</h4>
                        </div>
                        <div className="flex gap-3">
                           <a 
                             href={item.file} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="flex-1 py-3 bg-emerald-700 text-white text-center font-bold text-[11px] uppercase tracking-widest rounded-xl hover:bg-emerald-800 transition-all shadow-md flex items-center justify-center gap-2"
                           >
                              <Eye size={16} /> {t('View PDF')}
                           </a>
                           <a 
                             href={item.file} 
                             download
                             className="px-6 py-3 bg-white border border-slate-200 text-slate-700 font-bold text-[11px] uppercase tracking-widest rounded-xl hover:bg-slate-50 transition-all flex items-center justify-center"
                           >
                              <Download size={16} />
                           </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PHOTO GALLERY SECTION */}
              {course.gallery && course.gallery.length > 0 && (
                <div>
                  <h2 className="text-[11px] font-bold text-emerald-600 uppercase tracking-[0.2em] mb-4">{t('Campus Life & Events')}</h2>
                  <h3 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">{t('Photo Gallery')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {course.gallery.map((imgUrl, i) => (
                      <div 
                        key={i} 
                        className="relative h-64 md:h-80 w-full rounded-[2rem] overflow-hidden shadow-md group cursor-pointer"
                        onClick={() => setSelectedImage(imgUrl)}
                      >
                        <OptimizedImage 
                          src={imgUrl} 
                          alt={`${course.title} Gallery Image ${i + 1}`}
                          fill
                          section="course"
                          className="object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                           <div className="bg-white/20 backdrop-blur-md text-white px-4 py-2 rounded-full text-sm font-bold tracking-widest uppercase">
                             {t('View Full')}
                           </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LEARNING OUTCOMES */}
              <div>
                <h2 className="text-[11px] font-bold text-emerald-600 uppercase tracking-[0.2em] mb-4">{t('Learning Outcomes')}</h2>
                <h3 className="text-3xl font-black text-slate-900 mb-8 tracking-tight">{t('What you will achieve')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    "Comprehensive textual analysis and understanding",
                    "Practical application of Islamic principles",
                    "Development of Arabic linguistic proficiency",
                    "Spiritual discipline and character building",
                    "Analytical skills for classical scholarship",
                    "Community leadership and ethical service"
                  ].map((item, i) => (
                    <div key={i} className="flex items-start gap-4 p-5 bg-white rounded-2xl border border-slate-100 shadow-sm group hover:border-emerald-200 transition-all hover:shadow-md">
                      <div className="mt-1"><CheckCircle2 size={18} className="text-emerald-500" /></div>
                      <span className="text-[14px] font-bold text-slate-700 leading-relaxed">{t(item)}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-8">
                
                {/* INFO CARD */}
                <div className="bg-slate-900 text-white p-8 md:p-10 rounded-[32px] shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-bl-[100px] pointer-events-none" />
                  <h3 className="text-xl font-black mb-10 tracking-tight flex items-center gap-3">
                    <ShieldCheck className="text-emerald-400" size={24} /> {t('Key Information')}
                  </h3>
                  
                  <div className="space-y-8">
                    {[
                      { label: 'Duration', value: course.duration, icon: Clock },
                      { label: 'Certification', value: 'Official Institution Certificate', icon: Award },
                      { label: 'Entry Level', value: course.level, icon: Users },
                      { label: 'Academic Support', value: 'shererabbani@gmail.com', icon: Mail },
                      { label: 'Academic Support', value: 'shererabbani@gmail.com', icon: Mail },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-5">
                        <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center text-emerald-400 shrink-0 border border-white/10">
                           <item.icon size={20} />
                        </div>
                        <div>
                          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1">{t(item.label)}</p>
                          <p className="text-[13px] font-bold text-white">{t(item.value)}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* ADMISSIONS CTA */}
                <div className="bg-emerald-50 p-8 md:p-10 rounded-[32px] border border-emerald-100 text-center group">
                  <div className="w-16 h-16 bg-white rounded-full shadow-lg flex items-center justify-center text-emerald-600 mx-auto mb-6 group-hover:scale-110 transition-transform">
                     <GraduationCap size={32} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900 mb-4">{t('Apply Now')}</h3>
                  <p className="text-slate-600 text-[13px] mb-8 leading-relaxed font-medium">{t('Take the first step towards your spiritual journey. Admissions for the current session are closing soon.')}</p>
                  <Link href={`/admissions?course=${encodeURIComponent(course.title)}`} className="block w-full py-4 bg-emerald-700 text-white font-bold rounded-xl shadow-xl hover:bg-emerald-800 transition-all text-[13px] uppercase tracking-widest">
                    {t('Start Application')}
                  </Link>
                </div>

              </div>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-10 cursor-zoom-out"
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
            >
              <X size={24} />
            </button>
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl cursor-default"
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
    </div>
  );
}
