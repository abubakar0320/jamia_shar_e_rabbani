'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  Clock, Award, CheckCircle2, 
  ChevronLeft, ArrowRight, Users, 
  ShieldCheck, Mail, Share2, GraduationCap,
  FileIcon, Eye, Download, X, BookOpen, Sparkles
} from 'lucide-react';
import React, { useEffect, useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
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

const staticCourses: Course[] = [
  {
    id: 1,
    title: 'Hifz-ul-Quran',
    duration: '3-4 Years',
    level: 'Primary',
    desc: 'Complete memorization of the Holy Quran with Tajweed rules.',
    image: '/images/hifaz.jpeg'
  },
  {
    id: 2,
    title: 'Dars-e-Nizami',
    duration: '8 Years',
    level: 'Advanced',
    desc: 'Comprehensive Islamic scholarship program covering Fiqh, Hadith, Tafseer, and Arabic Literature.',
    image: '/hadith.jpg'
  },
  {
    id: 3,
    title: "Tajweed-o-Qira'at",
    duration: '2 Years',
    level: 'Intermediate',
    desc: 'Specialized course in the art of Quranic recitation.',
    image: '/images/tajweed.jpeg'
  },
  {
    id: 4,
    title: 'Arabic Language',
    duration: '1 Year',
    level: 'Beginner/Intermediate',
    desc: 'Intensive course focusing on classical and modern Arabic grammar and conversation.',
    image: '/arabic-language.jpg'
  },
  {
    id: 5,
    title: 'Takhasusat',
    duration: '2 Years',
    level: 'Advanced',
    desc: 'Specialized Islamic research and jurisprudence studies.',
    image: '/takhasus.jpeg'
  },
  {
    id: 6,
    title: 'Khasusi Dars-e-Nizami',
    duration: '6 Years',
    level: 'Intermediate',
    desc: 'Flexible Islamic scholarship program for college and university students.',
    image: '/hadith.jpg'
  }
];

// Helper functions to translate raw database values into clean authentic Urdu while preserving original data
function translateTitle(raw: string): string {
  const t = raw.toLowerCase();
  if (t.includes('hifz') || t.includes('1_title')) return 'شعبہ تحفیظ القرآن الکریم';
  if (t.includes('dars-e-nizami') || t.includes('dars') || t.includes('2_title')) return 'درسِ نظامی (عالم و فاضل کورس)';
  if (t.includes('tajweed') || t.includes('qira') || t.includes('3_title')) return 'تجوید و قرات سبعہ و عشرہ';
  if (t.includes('arabic') || t.includes('4_title')) return 'عربی زبان و ادب (لغت القرآن)';
  if (t.includes('takhasus') || t.includes('5_title')) return 'تخصص فی الفقہ والافتاء';
  if (t.includes('khasusi') || t.includes('6_title')) return 'خصوصی درسِ نظامی برائے کالج طلبہ';
  return raw;
}

function translateDuration(raw: string): string {
  if (raw.includes('3-4')) return '3 تا 4 سال';
  if (raw.includes('8')) return '8 سالہ باقاعدہ نصاب';
  if (raw.includes('2')) return '2 سال';
  if (raw.includes('1')) return '1 سال';
  if (raw.includes('6')) return '6 سال';
  return raw;
}

function translateLevel(raw: string): string {
  const l = raw.toLowerCase();
  if (l.includes('primary') || l.includes('1_category')) return 'حفظ و تجوید';
  if (l.includes('intermediate') || l.includes('3_category')) return 'متوسطہ و تجوید';
  if (l.includes('advanced') || l.includes('2_category')) return 'اعلیٰ عالمیہ و شریعہ';
  if (l.includes('beginner') || l.includes('4_category')) return 'بنیادی و متوسطہ';
  return raw;
}

function translateDesc(raw: string, title: string): string {
  const t = title.toLowerCase();
  if (t.includes('hifz')) return 'تجوید و حسنِ قراءت کے بنیادی و اعلیٰ قواعد کے ساتھ قرآن مجید کا مکمل حفظ اور روزانہ کی بنیاد پر باقاعدہ دور۔';
  if (t.includes('dars')) return 'قرآن، حدیث، فقہ، اصولِ فقہ، منطق اور عربی ادب کا باقاعدہ جامع نصاب، وفاق المدارس الاسلامیہ الرضویہ سے تصدیق شدہ۔';
  if (t.includes('tajweed') || t.includes('qira')) return 'مستند قراء کرام کے زیرِ نگرانی مخارج و صفات کی درستی، ترتیل و حدر اور قرات کی عملی مشق۔';
  if (t.includes('arabic')) return 'جدید و کلاسیکی عربی بول چال، نحو و صرف اور فصیح عربی تحریر و تقریر پر خصوصی عملی توجہ۔';
  if (t.includes('takhasus')) return 'فقہِ اسلامی، معاشی و جدید معاصر مسائل پر فتوٰی نویسی اور اصولِ افتاء کی گہری تحقیقی و عملی تربیت۔';
  return raw;
}

function CourseDetailsContent() {
  const searchParams = useSearchParams();
  const id = searchParams.get('id');
  const [course, setCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  useEffect(() => {
    const fallbackCourse = staticCourses.find(c => c.id.toString() === String(id)) || null;
    
    fetch(`/api/courses/${id}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.title) {
          setCourse(data);
        } else {
          setCourse(fallbackCourse);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching course details:', err);
        setCourse(fallbackCourse);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-white" dir="rtl">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center py-40 gap-4">
           <div className="w-10 h-10 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin"></div>
           <div className="text-sm font-bold text-emerald-800 font-urdu">کورس کی تفصیلات لوڈ ہو رہی ہیں...</div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!course) {
    return (
      <div className="min-h-screen flex flex-col bg-white" dir="rtl">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center py-40 gap-6 text-center">
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 font-urdu">کورس دستیاب نہیں ہے</h1>
          <Link href="/courses" className="px-6 py-3 bg-emerald-700 text-white font-bold rounded-xl shadow-lg hover:bg-emerald-800 transition-all flex items-center gap-2 text-sm font-urdu">
            <ArrowRight size={18} /> تمام تعلیمی پروگرامز پر واپس جائیں
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const displayTitle = translateTitle(course.title);
  const displayDuration = translateDuration(course.duration);
  const displayLevel = translateLevel(course.level);
  const displayDesc = translateDesc(course.desc, course.title);

  const defaultOutcomes = [
    'متون کی گہری تفہیم اور تحقیقی و استدلالی صلاحیت',
    'اسلامی احکام و فقہی اصولوں کا انفرادی و اجتماعی اطلاق',
    'عربی زبان دانی، فصیح تحریر و تقریر میں مکمل روانی',
    'روحانی نظم و ضبط، تقویٰ اور اسلامی کردار سازی',
    'کلاسیکی علوم اور فنِ افتاء و تدریس میں پختگی',
    'معاشرتی قیادت اور دعوت و تبلیغ کے مؤثر اسالیب'
  ];

  return (
    <div className="min-h-screen flex flex-col bg-white" dir="rtl">
      <Header />
      
      <main className="flex-1 font-sans text-slate-900">
        
        {/* --- PROFESSIONAL HERO --- */}
        <section className="relative h-[45vh] min-h-[380px] flex items-center overflow-hidden bg-slate-900 text-white">
          <div className="absolute inset-0 z-0">
            <OptimizedImage 
              src={course.image || '/hadith.jpg'} 
              alt={displayTitle}
              fill
              priority
              section="course"
              className="object-cover object-center opacity-30 blur-xs"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/70 to-slate-950" />
          </div>
          
          <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-6 text-right">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl"
            >
              {/* Breadcrumb Navigation */}
              <div className="flex items-center gap-2 mb-4 text-xs font-bold font-urdu flex-wrap">
                <Link href="/" className="text-emerald-400 hover:text-emerald-300 transition-colors">ہوم</Link>
                <ChevronLeft size={14} className="text-slate-400 shrink-0" />
                <Link href="/courses" className="text-emerald-400 hover:text-emerald-300 transition-colors">تعلیمی شعبہ جات</Link>
                <ChevronLeft size={14} className="text-slate-400 shrink-0" />
                <span className="text-white px-2.5 py-0.5 rounded bg-emerald-800/80">{displayLevel}</span>
              </div>

              {/* Course Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-5 leading-[1.9] md:leading-[2.1] font-urdu">
                {displayTitle}
              </h1>

              {/* Course Description */}
              <p className="text-sm sm:text-base md:text-lg text-slate-200 mb-8 leading-[2.2] md:leading-[2.3] font-urdu max-w-2xl">
                {displayDesc}
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3">
                <Link 
                  href={`/admissions?course=${encodeURIComponent(displayTitle)}`} 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-bold rounded-xl shadow-lg transition-all font-urdu"
                >
                  <GraduationCap size={18} />
                  <span>آن لائن داخلہ فارم پر کریں</span>
                </Link>

                <Link 
                  href="/contact" 
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 text-sm font-bold rounded-xl transition-all font-urdu backdrop-blur-sm"
                >
                  <Mail size={16} />
                  <span>تعلیمی مشیر سے رابطہ</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- CONTENT & SIDEBAR GRID --- */}
        <section className="py-12 md:py-16 container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 md:gap-12 items-start">
            
            {/* Right Column: Details Content */}
            <div className="lg:col-span-8 space-y-12 text-right">
              
              {/* OVERVIEW */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-2xs">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md mb-3 inline-block font-urdu">
                  کورس کا تفصیلی تعارف و نصاب
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 leading-[2.0] font-urdu">
                  مستند دینی علوم اور روحانی تربیت کا گلدستہ
                </h3>
                <div className="text-slate-600 space-y-4 text-sm sm:text-base leading-[2.3] font-urdu">
                  <p>
                    جامعہ شیرِ ربانی میں <strong className="text-slate-900">{displayTitle}</strong> کا باقاعدہ تعلیمی پروگرام روایتی دینی علوم کی گہری اور مدلل تفہیم کے لیے تشکیل دیا گیا ہے۔ یہاں محض نصابی کتب کا مطالعہ نہیں بلکہ ہر طالب علم کی باطنی و اخلاقی تربیت، سنتِ نبوی پر عمل اور فکرِ اسلامی کی آبیاری پر خصوصی توجہ دی جاتی ہے۔
                  </p>
                  <p>
                    ہمارا طریقۂ تدریس قدیم مستند روایات (تلقّی و سماع) کو جدید امتحانی و تعلیمی معیارات سے ہم آہنگ کرتا ہے تاکہ فارغ التحصیل علماء و حفاظ جدید دور کے فکری چیلنجز کا احسن طریقے سے مقابلہ کر سکیں۔
                  </p>
                </div>
              </div>

              {/* DYNAMIC VIDEO PLAYLISTS (Preserved exactly from course data) */}
              {(course.playlistId || (course.playlists && course.playlists.length > 0)) && (
                <div className="space-y-8">
                  <div className="border-b border-slate-200 pb-2">
                    <span className="text-xs font-bold text-emerald-700 font-urdu block mb-1">آن لائن اسباق</span>
                    <h3 className="text-2xl font-black text-slate-900 font-urdu">ڈیجیٹل ویڈیو اسباق و لیکچرز</h3>
                  </div>

                  {/* Specific Single Playlist */}
                  {course.playlistId && (
                    <YouTubePlaylist 
                      title={course.playlistTitle || 'عربی زبان و ادب کے ویڈیو اسباق'}
                      category="علومِ اسلامیہ"
                      listId={course.playlistId}
                      videoId={course.videoId}
                      badge="مکمل کورس"
                      description="طالب علموں کے لیے عربی بول چال، نحو و صرف اور تفہیمِ قرآن کی مکمل ویڈیو سیریز۔"
                      iconType="book"
                    />
                  )}

                  {/* Multiple Playlists Array */}
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
                  
                  <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 flex items-start gap-4">
                     <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-emerald-700 shrink-0">
                        <ShieldCheck size={20} />
                     </div>
                     <div>
                        <h4 className="font-bold text-slate-900 text-sm mb-1 font-urdu">انٹرایکٹو ڈیجیٹل لرننگ</h4>
                        <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-urdu">
                          ویڈیو اسباق اور تعلیمی وسائل طلبہ کو گھر بیٹھے یا ہاسٹل میں دہرائی اور مطالعہ کے لیے فراہم کیے جاتے ہیں۔
                        </p>
                     </div>
                  </div>
                </div>
              )}

              {/* SYLLABUS SECTION (Preserved dynamically from course.syllabus) */}
              {course.syllabus && course.syllabus.length > 0 && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md mb-3 inline-block font-urdu">
                    تعلیمی وسائل و نصاب
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 leading-relaxed font-urdu">
                    کورس کا باقاعدہ نصاب اور پی ڈی ایف کتب
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {course.syllabus.map((item, i) => (
                      <div key={i} className="p-5 bg-slate-50 rounded-2xl border border-slate-200 flex flex-col justify-between gap-4 hover:border-emerald-300 transition-all">
                        <div className="flex items-center gap-3">
                           <div className="w-11 h-11 bg-red-100 text-red-600 rounded-xl flex items-center justify-center shadow-xs shrink-0">
                              <FileIcon size={22} />
                           </div>
                           <h4 className="font-bold text-slate-900 text-sm font-urdu leading-tight">{item.title}</h4>
                        </div>
                        <div className="flex gap-2 pt-2 border-t border-slate-200">
                           <a 
                             href={item.file} 
                             target="_blank" 
                             rel="noopener noreferrer"
                             className="flex-1 py-2 bg-emerald-700 text-white text-center font-bold text-xs rounded-xl hover:bg-emerald-800 transition-all flex items-center justify-center gap-1.5 font-urdu"
                           >
                              <Eye size={15} /> <span>پی ڈی ایف دیکھیں</span>
                           </a>
                           <a 
                             href={item.file} 
                             download
                             className="px-3.5 py-2 bg-white border border-slate-300 text-slate-700 font-bold text-xs rounded-xl hover:bg-slate-100 transition-all flex items-center justify-center"
                             title="ڈاؤن لوڈ کریں"
                           >
                              <Download size={15} />
                           </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* PHOTO GALLERY SECTION (Preserved dynamically from course.gallery) */}
              {course.gallery && course.gallery.length > 0 && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md mb-3 inline-block font-urdu">
                    کیمپس کی سرگرمیاں
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 leading-relaxed font-urdu">
                    تصویری گیلری و کلاس رومز
                  </h3>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4">
                    {course.gallery.map((imgUrl, i) => (
                      <div 
                        key={i} 
                        className="relative h-56 md:h-64 w-full rounded-2xl overflow-hidden shadow-sm group cursor-pointer border border-slate-200"
                        onClick={() => setSelectedImage(imgUrl)}
                      >
                        <OptimizedImage 
                          src={imgUrl} 
                          alt={`${displayTitle} تصویر ${i + 1}`}
                          fill
                          section="course"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <span className="bg-white/90 text-slate-900 px-3 py-1 rounded-lg text-xs font-bold font-urdu shadow-sm">
                             بڑی تصویر دیکھیں
                           </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* LEARNING OUTCOMES */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-2xs">
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-md mb-3 inline-block font-urdu">
                  کامیابی کے اہداف
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-6 leading-relaxed font-urdu">
                  اس تعلیمی شعبے سے فارغ التحصیل ہو کر طلبہ کیا حاصل کریں گے؟
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                  {defaultOutcomes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200/70">
                      <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                      <span className="text-xs sm:text-sm font-bold text-slate-800 leading-relaxed font-urdu">{item}</span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Left Column: Key Information Sticky Sidebar */}
            <div className="lg:col-span-4 sticky top-28 space-y-6 text-right">
              
              {/* KEY INFORMATION CARD */}
              <div className="bg-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl relative overflow-hidden border border-slate-800">
                <div className="absolute top-0 left-0 w-32 h-32 bg-emerald-500/10 rounded-br-[100px] pointer-events-none" />
                <h3 className="text-lg font-black mb-6 tracking-tight flex items-center gap-2 font-urdu pb-3 border-b border-slate-800 text-emerald-400">
                  <ShieldCheck size={20} />
                  <span>اہم تعلیمی معلومات</span>
                </h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <div className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-emerald-400 shrink-0 border border-white/10">
                       <Clock size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 font-urdu mb-0.5">کورس کا دورانیہ</p>
                      <p className="text-sm font-bold text-white font-urdu">{displayDuration}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-emerald-400 shrink-0 border border-white/10">
                       <Award size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 font-urdu mb-0.5">سند و الحاق</p>
                      <p className="text-sm font-bold text-white font-urdu">وفاق المدارس الاسلامیہ الرضویہ پاکستان</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-emerald-400 shrink-0 border border-white/10">
                       <Users size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 font-urdu mb-0.5">تعلیمی مرحلہ</p>
                      <p className="text-sm font-bold text-white font-urdu">{displayLevel}</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-emerald-400 shrink-0 border border-white/10">
                       <ShieldCheck size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 font-urdu mb-0.5">تعلیمی اخراجات</p>
                      <p className="text-sm font-bold text-amber-300 font-urdu">100% مفت تعلیم، رہائش و طعام</p>
                    </div>
                  </div>

                  <div className="flex gap-4 items-start">
                    <div className="w-9 h-9 bg-white/5 rounded-xl flex items-center justify-center text-emerald-400 shrink-0 border border-white/10">
                       <Mail size={18} />
                    </div>
                    <div>
                      <p className="text-[11px] font-bold text-slate-400 font-urdu mb-0.5">ای میل و رابطہ</p>
                      <p className="text-xs font-mono font-bold text-slate-200">jamiashererabbani07@gmail.com</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* ADMISSIONS CTA */}
              <div className="bg-emerald-50 p-6 sm:p-8 rounded-3xl border border-emerald-200 text-center">
                <div className="w-14 h-14 bg-white rounded-full shadow-md flex items-center justify-center text-emerald-700 mx-auto mb-4">
                   <GraduationCap size={28} />
                </div>
                <h4 className="text-xl font-black text-slate-900 mb-2 font-urdu">داخلہ تعلیمی سال 2024-25</h4>
                <p className="text-xs sm:text-sm text-slate-600 mb-6 font-urdu leading-relaxed">
                  جامعہ شیرِ ربانی میں دینی علوم کی تحصیل کے لیے آن لائن داخلہ فارم پر کریں۔
                </p>
                <Link 
                  href={`/admissions?course=${encodeURIComponent(displayTitle)}`} 
                  className="block w-full py-3.5 bg-emerald-700 text-white font-bold rounded-xl shadow-md hover:bg-emerald-800 transition-all font-urdu text-sm"
                >
                  آن لائن داخلہ فارم پر کریں
                </Link>
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
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 md:p-10 cursor-zoom-out"
          >
            <button 
              onClick={(e) => { e.stopPropagation(); setSelectedImage(null); }}
              className="absolute top-6 left-6 p-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
              aria-label="بند کریں"
            >
              <X size={24} />
            </button>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-5xl aspect-[16/10] bg-black cursor-default rounded-2xl overflow-hidden shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <OptimizedImage 
                src={selectedImage}
                alt="بڑی تصویر"
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

export default function CourseDetails() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-white" dir="rtl">
        <div className="w-10 h-10 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin mb-3"></div>
        <span className="text-sm font-bold text-slate-700 font-urdu">کورس کی تفصیلات لوڈ ہو رہی ہیں...</span>
      </div>
    }>
      <CourseDetailsContent />
    </Suspense>
  );
}
