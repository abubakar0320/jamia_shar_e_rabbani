'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Book, Clock, Award, ChevronLeft, Filter, Sparkles, CheckCircle2, X } from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';

interface Course {
  id: number;
  title: string;
  duration: string;
  level: string;
  desc: string;
  image?: string;
  gallery?: string[];
  programDetailsImage?: string;
  categoryFilter?: 'all' | 'hifz' | 'dars' | 'takhasus';
}

export default function Courses() {
  const [mounted, setMounted] = React.useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'hifz' | 'dars' | 'takhasus'>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Standard Authentic Urdu Course Data
  const coursesData: Course[] = useMemo(() => [
    {
      id: 1,
      title: 'شعبہ تحفیظ القرآن الکریم',
      duration: '3 تا 4 سال',
      level: 'حفظ و تجوید',
      desc: 'تجوید و حسنِ قراءت کے بنیادی و اعلیٰ قواعد کے ساتھ قرآن مجید کا مکمل حفظ اور روزانہ کی بنیاد پر باقاعدہ دور و نگرانی۔',
      image: '/images/hifaz.jpeg',
      categoryFilter: 'hifz'
    },
    {
      id: 2,
      title: 'درسِ نظامی (عالم و فاضل ڈگری کورس)',
      duration: '8 سالہ باقاعدہ ڈگری',
      level: 'شریعہ و علومِ اسلامیہ',
      desc: 'قرآن، حدیث، فقہ، اصولِ فقہ، منطق اور عربی ادب کا باقاعدہ جامع نصاب، وفاق المدارس الرضویہ اور ہائر ایجوکیشن کمیشن سے تصدیق شدہ۔',
      image: '/hadith.jpg',
      categoryFilter: 'dars'
    },
    {
      id: 3,
      title: 'تجوید و قرات سبعہ و عشرہ',
      duration: '1 تا 2 سال',
      level: 'تجوید و لہجہ',
      desc: 'مستند اور ماہر قراء کرام کے زیرِ نگرانی مخارج و صفات کی درستی، ترتیل و حدر اور قرات کی عملی و نظری مشق۔',
      image: '/images/tajweed.jpeg',
      categoryFilter: 'hifz'
    },
    {
      id: 4,
      title: 'عربی زبان و ادب کورس (لغت القرآن)',
      duration: '1 تا 2 سال',
      level: 'عربی زبان دانی',
      desc: 'کلاسیکی و جدید عربی بول چال، نحو و صرف اور فصیح عربی تحریر و تقریر پر خصوصی عملی توجہ اور روزمرہ مشق۔',
      image: '/arabic-language.jpg',
      categoryFilter: 'dars'
    },
    {
      id: 5,
      title: 'تخصص فی الفقہ والافتاء (مفتی کورس)',
      duration: '2 سالہ اعلیٰ تخصص',
      level: 'اعلیٰ فقہی تخصص',
      desc: 'فقہِ اسلامی، معاشی و جدید معاصر مسائل پر فتوٰی نویسی اور اصولِ افتاء کی گہری تحقیقی و عملی تربیت۔',
      image: '/takhasus.jpeg',
      categoryFilter: 'takhasus'
    },
    {
      id: 6,
      title: 'خصوصی درسِ نظامی برائے کالج و یونیورسٹی طلبہ',
      duration: 'لچکدار دورانیہ',
      level: 'عصری و دینی امتزاج',
      desc: 'اسکول، کالج اور یونیورسٹی کے طلبہ و ملازمین کے لیے اوقاتِ کار کے مطابق لچکدار اور منظم دینی تعلیم کا انتظام۔',
      image: '/hadith.jpg',
      categoryFilter: 'dars'
    }
  ], []);

  const filteredCourses = useMemo(() => {
    if (activeFilter === 'all') return coursesData;
    return coursesData.filter(c => c.categoryFilter === activeFilter);
  }, [activeFilter, coursesData]);

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-1 min-h-[500px]" />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-white" dir="rtl">
      <Header />
      
      <main className="flex-1 bg-white font-sans text-slate-900">
        
        {/* --- HERO SECTION --- */}
        <section className="relative pt-16 md:pt-24 pb-16 md:pb-20 border-b border-slate-200/80 bg-gradient-to-b from-slate-50 via-white to-white overflow-hidden">
          {/* Subtle Ambient Background Gradients */}
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-100/40 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold mb-5 font-urdu shadow-2xs">
                <Sparkles size={14} className="text-emerald-700" />
                <span>جامعہ شیرِ ربانی کے باقاعدہ و تصدیق شدہ تعلیمی شعبہ جات</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.9] md:leading-[2.1] mb-5 font-urdu">
                دینی و عصری تعلیمی شعبہ جات اور نصاب
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-[2.2] md:leading-[2.3] max-w-3xl mx-auto mb-8 font-urdu">
                حفظِ قرآن، درسِ نظامی (عالم و فاضل) اور تخصصات فی الفقہ کے باقاعدہ تعلیمی پروگرامز جن میں 100% مفت تعلیم، ہاسٹل، طعام اور کتب کی سہولیات میسر ہیں۔
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-bold text-slate-700 font-urdu">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-md shadow-2xs">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span>وفاق المدارس الاسلامیہ الرضویہ پاکستان سے الحاق شدہ</span>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-md shadow-2xs">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span>ہائر ایجوکیشن کمیشن (HEC) سے منظور شدہ ڈگری</span>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-md shadow-2xs">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span>100% مفت رہائش و طعام</span>
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- FILTER BAR --- */}
        <section className="py-4 px-4 sm:px-6 lg:px-8 border-b border-slate-200/80 bg-white sticky top-[108px] z-30 shadow-2xs backdrop-blur-md bg-white/95">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            
            <div className="flex items-center gap-3 flex-wrap justify-center md:justify-start w-full md:w-auto">
              <div className="flex items-center gap-1.5 text-xs sm:text-sm font-bold text-slate-700 font-urdu shrink-0">
                <Filter size={16} className="text-emerald-700" />
                <span>شعبہ جات فلٹر کریں:</span>
              </div>

              <div className="flex gap-2 flex-wrap">
                {[
                  { id: 'all', label: 'تمام شعبہ جات' },
                  { id: 'hifz', label: 'حفظ و تجوید' },
                  { id: 'dars', label: 'درسِ نظامی و عربی' },
                  { id: 'takhasus', label: 'تخصصات فی الفقہ' }
                ].map((item) => (
                  <button 
                    key={item.id} 
                    onClick={() => setActiveFilter(item.id as any)}
                    className={`px-3.5 py-1.5 text-xs sm:text-sm font-bold rounded-lg border transition-all font-urdu ${
                      activeFilter === item.id 
                        ? 'bg-emerald-800 text-white border-emerald-800 shadow-xs' 
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100 hover:border-slate-300'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="text-xs sm:text-sm font-bold text-slate-500 font-urdu">
              کل {filteredCourses.length} باقاعدہ تعلیمی پروگرامز دستیاب ہیں
            </div>

          </div>
        </section>

        {/* --- COURSES GRID --- */}
        <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/50 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredCourses.map((course, i) => (
                <motion.div 
                  key={course.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.4 }}
                  className="flex flex-col bg-white border border-slate-200/80 shadow-sm hover:shadow-xl hover:-translate-y-1 rounded-2xl overflow-hidden transition-all duration-300 group"
                >
                  {/* Course Image */}
                  <div 
                    className="aspect-[16/10] bg-slate-100 relative overflow-hidden cursor-pointer"
                    onClick={() => course.image && setSelectedImage(course.image)}
                  >
                    <OptimizedImage 
                      src={course.image || '/hadith.jpg'} 
                      alt={course.title} 
                      fill
                      section="course"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="absolute top-3 right-3">
                      <span className="text-xs px-2.5 py-1 rounded-md font-bold bg-white/95 text-emerald-800 border border-slate-100 shadow-sm font-urdu">
                        {course.level}
                      </span>
                    </div>

                    <div className="absolute bottom-2 left-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className="text-[10px] font-bold bg-black/70 text-white px-2 py-0.5 rounded font-urdu">
                        تصویر بڑی کریں
                      </span>
                    </div>
                  </div>

                  {/* Course Details Content */}
                  <div className="p-6 md:p-7 flex flex-col flex-1 text-right">
                    <h3 className="text-lg md:text-xl font-black text-slate-900 mb-3 leading-[2.2] font-urdu group-hover:text-emerald-700 transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm leading-[2.3] mb-6 font-urdu flex-1">
                      {course.desc}
                    </p>
                    
                    {/* Duration and Certification */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-500 font-urdu mb-4">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <Clock size={14} className="text-emerald-600 shrink-0" />
                        <span>دورانیہ: {course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <Award size={14} className="text-amber-600 shrink-0" />
                        <span>وفاق المدارس سے تصدیق شدہ</span>
                      </div>
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                      <Link 
                        href={`/program?id=${course.id}`} 
                        className="text-center py-2 text-xs font-bold rounded-lg border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 transition-colors font-urdu"
                      >
                        کورس تفصیلات
                      </Link>
                      
                      <Link 
                        href={`/admissions?course=${encodeURIComponent(course.title)}`}
                        className="text-center py-2 text-xs text-white font-bold rounded-lg bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-2xs font-urdu"
                      >
                        آن لائن داخلہ لیں
                      </Link>
                    </div>

                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- ACADEMIC PATHWAYS --- */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
              <span className="text-xs md:text-sm font-semibold tracking-wide inline-block mb-2 px-3 py-1 rounded-md text-emerald-800 bg-emerald-50 border border-emerald-200 font-urdu">
                منظم تعلیمی مراحل
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-[1.9] md:leading-[2.1] font-urdu">
                جامعہ کا مرحلہ وار تعلیمی نصاب و سفر
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-[2.2] md:leading-[2.3] font-urdu">
                ایک جامع و منظم تعلیمی نظام جو طالب علم کو بنیادی دینی تعلیم سے لے کر اعلیٰ فقہی و شرعی تحقیق کے مقام تک پہنچاتا ہے۔
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-right">
              {[
                { 
                  step: "۰۱", 
                  title: "ابتدائی مرحلہ (بنیادی دینی علوم)", 
                  desc: "حفظِ قرآن کریم، مخارج و صفات کے بنیادی قواعد، اور عربی زبان کے بنیادی الفاظ و کلمات کی فہم پر خصوصی توجہ۔", 
                  icon: <Book size={24} className="text-emerald-700" /> 
                },
                { 
                  step: "۰۲", 
                  title: "متوسطہ و ثانوی مرحلہ (درسِ نظامی)", 
                  desc: "عربی گرائمر (نحو و صرف)، فقہِ اسلامی، ترجمہ و تفسیرِ قرآن مجید، اور بنیادی احادیثِ نبویہ کا باقاعدہ و مدلل مطالعہ۔", 
                  icon: <Award size={24} className="text-teal-700" /> 
                },
                { 
                  step: "۰۳", 
                  title: "اعلیٰ مرحلہ (عالمیہ و تخصصات فی الفقہ)", 
                  desc: "کتبِ احادیث (صحاح ستہ)، اصولِ فقہ، اصولِ افتاء، اور عصرِ حاضر کے جدید معاشی و سماجی مسائل کا گہرا تحقیقی حل۔", 
                  icon: <Clock size={24} className="text-amber-700" /> 
                }
              ].map((path, idx) => (
                <div 
                  key={idx} 
                  className="flex flex-col p-6 md:p-8 bg-white border border-slate-200/80 shadow-2xs hover:shadow-xl rounded-2xl relative transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-slate-50 border border-slate-100">
                      {path.icon}
                    </div>
                    <div className="text-3xl font-black text-slate-200 font-urdu">
                      {path.step}
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 leading-[2.1] font-urdu">
                    {path.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-[2.3] font-urdu">
                    {path.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* --- LEARNING METHODOLOGY --- */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 border-b border-slate-200/80">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
              
              {/* Left Column: Methodology description */}
              <div className="lg:col-span-7 text-right">
                <span className="text-xs md:text-sm font-semibold tracking-wide inline-block mb-3 px-3 py-1 rounded-md text-emerald-800 bg-emerald-100/60 border border-emerald-200 font-urdu">
                  روایتی و عصری تدریس
                </span>

                <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-[1.9] md:leading-[2.1] font-urdu">
                  جامعہ شیرِ ربانی کا منفرد اور جامع طریقۂ تدریس
                </h2>

                <p className="text-slate-600 text-sm md:text-base leading-[2.3] mb-6 font-urdu">
                  جامعہ شیرِ ربانی میں اساتذہ سے براہِ راست روبرو فیض حاصل کرنے کی قدیم و مستند اسلامی روایت (تلقّی) کو جدید تدریسی وسائل، کتب خانوں اور تحقیقی طریقوں کے ساتھ ہم آہنگ کیا گیا ہے تاکہ فارغ التحصیل علماء دینِ اسلام کا پیغام مؤثر انداز میں پہنچا سکیں۔
                </p>

                <ul className="space-y-3.5 mb-6">
                  {[
                    "جید، باعمل اور سند یافتہ اساتذہ و شیوخِ حدیث کی براہِ راست انفرادی سرپرستی۔",
                    "کلاس رومز میں مناسب تعداد تاکہ ہر طالب علم کی علمی و باطنی تربیت پر خصوصی توجہ ممکن ہو۔",
                    "جدید اسلامک ریسرچ، کمپیوٹر کتب خانہ اور فتوٰی نویسی کے عصری طریقہ کار کی تربیت۔",
                    "صرف رٹنے کے بجائے تفہیم، استدلال اور باہمی علمی مباحث پر مشتمل امتحانی نظام۔"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <ChevronLeft size={18} className="text-emerald-700 shrink-0 mt-1" />
                      <span className="text-slate-700 text-xs sm:text-sm font-semibold font-urdu leading-[2.2]">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: 4 Stat Boxes */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="bg-white p-5 md:p-6 border border-slate-200/80 rounded-2xl shadow-2xs text-center">
                  <div className="text-2xl md:text-3xl font-black text-slate-900 mb-1">1:15</div>
                  <div className="text-xs font-bold text-slate-500 font-urdu">استاد اور طلبہ کا مثالی تناسب</div>
                </div>

                <div className="bg-white p-5 md:p-6 border border-slate-200/80 rounded-2xl shadow-2xs text-center">
                  <div className="text-2xl md:text-3xl font-black text-slate-900 mb-1">100%</div>
                  <div className="text-xs font-bold text-slate-500 font-urdu">وفاق سے تصدیق شدہ نصاب</div>
                </div>

                <div className="bg-white p-5 md:p-6 border border-slate-200/80 rounded-2xl shadow-2xs text-center">
                  <div className="text-2xl md:text-3xl font-black text-slate-900 mb-1">5+</div>
                  <div className="text-xs font-bold text-slate-500 font-urdu">تخصصی لائبریریاں و کتب خانے</div>
                </div>

                <div className="bg-emerald-800 p-5 md:p-6 border border-emerald-900 rounded-2xl text-center text-white shadow-md">
                  <div className="text-2xl md:text-3xl font-black mb-1 font-urdu">اعلیٰ ترین</div>
                  <div className="text-xs font-bold text-emerald-200 font-urdu">وفاق کے سالانہ امتحانات میں پوزیشنز</div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- SECONDARY CTA --- */}
        <section className="py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-white">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs md:text-sm font-semibold tracking-wide inline-block mb-3 px-3 py-1 rounded-md text-emerald-800 bg-emerald-50 border border-emerald-200 font-urdu">
              تعلیمی رہنمائی و مشاورت
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-[1.9] md:leading-[2.1] font-urdu">
              کیا آپ کسی کورس کے انتخاب میں رہنمائی چاہتے ہیں؟
            </h2>

            <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-2xl mx-auto leading-[2.2] md:leading-[2.3] font-urdu">
              جامعہ شیرِ ربانی کے تعلیمی مشیران آپ کے تعلیمی پس منظر، عمر اور مقاصد کے مطابق بہترین شعبہ تجویز کرنے کے لیے ہمہ وقت حاضر ہیں۔
            </p>

            <div className="flex flex-wrap justify-center gap-3.5">
              <Link 
                href="/contact" 
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold px-7 py-3 rounded-xl shadow-md transition-all font-urdu text-sm md:text-base"
              >
                تعلیمی مشیر سے رابطہ کریں
              </Link>
              
              <Link 
                href="/admissions" 
                className="bg-white hover:bg-slate-50 border-2 border-slate-300 text-slate-800 font-bold px-7 py-3 rounded-xl transition-all font-urdu text-sm md:text-base"
              >
                داخلے کی شرائط و فارم دیکھیں
              </Link>
            </div>
          </div>
        </section>

      </main>

      {/* LIGHTBOX FOR FULLSCREEN IMAGE PREVIEW */}
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
              className="absolute top-6 left-6 p-2 text-white hover:text-gray-300"
              aria-label="بند کریں"
            >
              <X size={26} />
            </button>
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-4xl aspect-[16/10] bg-black cursor-default rounded-xl overflow-hidden"
              onClick={e => e.stopPropagation()}
            >
              <OptimizedImage 
                src={selectedImage}
                alt="تصویر"
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
