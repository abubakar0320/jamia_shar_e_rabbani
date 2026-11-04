'use client';

import React, { useState, useMemo } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import {
  Book,
  Clock,
  Award,
  ChevronLeft,
  Filter,
  Sparkles,
  CheckCircle2,
  X,
  GraduationCap,
  BookOpen,
  FileText,
  Calendar,
  Check,
  Building2,
  ShieldCheck,
  ChevronDown,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import { ALL_COURSES, CourseDetail } from '@/data/coursesData';

export default function Courses() {
  const [mounted, setMounted] = useState(false);
  const [activeFilter, setActiveFilter] = useState<'all' | 'hifz' | 'dars' | 'takhasus'>('all');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedCourse, setSelectedCourse] = useState<CourseDetail | null>(null);
  const [expandedAccordionId, setExpandedAccordionId] = useState<number | null>(null);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const filteredCourses = useMemo(() => {
    if (activeFilter === 'all') return ALL_COURSES;
    return ALL_COURSES.filter((c) => c.categoryFilter === activeFilter);
  }, [activeFilter]);

  const toggleAccordion = (id: number) => {
    setExpandedAccordionId((prev) => (prev === id ? null : id));
  };

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
        {/* --- 1. HERO SECTION --- */}
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
                <span>جامعہ شیرِ ربانی (مانانوالہ، ضلع شیخوپورہ) کے باقاعدہ و تصدیق شدہ تعلیمی شعبہ جات</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.9] md:leading-[2.1] mb-5 font-urdu">
                دینی و عصری تعلیمی شعبہ جات اور مکمل نصاب
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-slate-600 leading-[2.2] md:leading-[2.3] max-w-3xl mx-auto mb-8 font-urdu">
                حفظِ قرآن، درسِ نظامی (عالم و فاضل)، تجوید و قراءت اور تخصصات فی الفقہ کے باقاعدہ تعلیمی پروگرامز جن میں 100% مفت تعلیم، ہاسٹل، طعام اور لائبریری کی سہولیات میسر ہیں۔
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 text-xs sm:text-sm font-bold text-slate-700 font-urdu">
                <span className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-md shadow-2xs">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span>وفاق المدارس الاسلامیہ الرضویہ پاکستان سے الحاق شدہ</span>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-md shadow-2xs">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span>ہائر ایجوکیشن کمیشن (HEC) سے منظور شدہ مساوی ڈگری</span>
                </span>
                <span className="flex items-center gap-1.5 px-3 py-1 bg-white border border-slate-200 rounded-md shadow-2xs">
                  <CheckCircle2 size={16} className="text-emerald-600" />
                  <span>100% مفت رہائش و طعام</span>
                </span>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- 2. FILTER BAR --- */}
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

        {/* --- 3. COURSES GRID --- */}
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
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

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
                    <div className="text-[11px] font-bold text-emerald-700 font-urdu mb-1">
                      {course.arabicTitle}
                    </div>

                    <h3 className="text-lg md:text-xl font-black text-slate-900 mb-2 leading-[2.0] font-urdu group-hover:text-emerald-700 transition-colors">
                      {course.title}
                    </h3>

                    <p className="text-slate-600 text-xs sm:text-sm leading-[2.2] mb-4 font-urdu">
                      {course.desc}
                    </p>

                    {/* Key Highlights (First 3) */}
                    <div className="space-y-1.5 mb-5 flex-1 bg-slate-50/70 p-3 rounded-xl border border-slate-100">
                      {course.highlights.slice(0, 3).map((item, idx) => (
                        <div key={idx} className="flex items-start gap-1.5 text-[11px] sm:text-xs text-slate-700 font-urdu">
                          <Check size={13} className="text-emerald-600 shrink-0 mt-1" />
                          <span className="leading-snug">{item}</span>
                        </div>
                      ))}
                    </div>

                    {/* Duration and Certification */}
                    <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs font-bold text-slate-500 font-urdu mb-4">
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <Clock size={14} className="text-emerald-600 shrink-0" />
                        <span>دورانیہ: {course.duration}</span>
                      </div>
                      <div className="flex items-center gap-1.5 text-slate-700">
                        <Award size={14} className="text-amber-600 shrink-0" />
                        <span>وفاق المدارس الاسلامیہ الرضویہ</span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-100">
                      <button
                        onClick={() => setSelectedCourse(course)}
                        className="text-center py-2 text-xs font-bold rounded-lg border border-emerald-600 text-emerald-800 bg-emerald-50/60 hover:bg-emerald-100 transition-colors font-urdu flex items-center justify-center gap-1"
                      >
                        <Info size={13} />
                        <span>مکمل تفصیل دیکھیں</span>
                      </button>

                      <Link
                        href={`/admissions?course=${encodeURIComponent(course.title)}`}
                        className="text-center py-2 text-xs text-white font-bold rounded-lg bg-emerald-700 hover:bg-emerald-800 transition-colors shadow-2xs font-urdu flex items-center justify-center gap-1"
                      >
                        <GraduationCap size={13} />
                        <span>داخلہ لیں</span>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 4. DEEP-DIVE COMPREHENSIVE COURSE EXPLANATION ACCORDION SECTION --- */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/80">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs md:text-sm font-semibold tracking-wide inline-block mb-2 px-3 py-1 rounded-md text-emerald-800 bg-emerald-50 border border-emerald-200 font-urdu">
                تفصیلی تعلیمی کیٹلاگ و نصابی رہنما
              </span>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-[1.9] md:leading-[2.1] font-urdu">
                ہر کورس کی تفصیلی وضاحت، تدریسی کتب اور شرائطِ داخلہ
              </h2>
              <p className="text-slate-600 text-sm md:text-base leading-[2.2] md:leading-[2.3] font-urdu">
                جامعہ شیرِ ربانی کے تمام چھ کورسز کا مکمل تعارف، شامل کتب، شرائطِ داخلہ اور حاصلاتِ تعلّم پڑھنے کے لیے متعلقہ کورس پر کلک کریں۔
              </p>
            </div>

            {/* Accordion List */}
            <div className="space-y-4 text-right">
              {ALL_COURSES.map((course) => {
                const isOpen = expandedAccordionId === course.id;
                return (
                  <div
                    key={course.id}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 bg-white shadow-2xs"
                  >
                    <button
                      onClick={() => toggleAccordion(course.id)}
                      className={`w-full p-5 sm:p-6 text-right flex items-center justify-between gap-4 transition-colors ${
                        isOpen ? 'bg-emerald-50/70 border-b border-emerald-100' : 'hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex items-center gap-3 sm:gap-4 flex-1">
                        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-800 text-white flex items-center justify-center shrink-0 font-urdu font-black text-base sm:text-lg">
                          {`۰${course.id}`}
                        </div>
                        <div>
                          <div className="flex items-center gap-2 flex-wrap mb-1">
                            <span className="text-[11px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 font-urdu">
                              {course.level}
                            </span>
                            <span className="text-[11px] font-bold text-slate-500 font-urdu flex items-center gap-1">
                              <Clock size={12} /> {course.duration}
                            </span>
                          </div>
                          <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-900 font-urdu">
                            {course.title}
                          </h3>
                        </div>
                      </div>

                      <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600">
                        {isOpen ? <ChevronDown size={18} className="rotate-180 transition-transform" /> : <ChevronDown size={18} />}
                      </div>
                    </button>

                    {/* Accordion Body */}
                    {isOpen && (
                      <div className="p-6 sm:p-8 space-y-6 bg-white font-urdu">
                        {/* 1. Overview */}
                        <div>
                          <h4 className="text-base font-black text-slate-900 mb-2 flex items-center gap-2 text-emerald-800">
                            <BookOpen size={18} />
                            <span>تفصیلی تعارف و پس منظر:</span>
                          </h4>
                          <p className="text-sm sm:text-base text-slate-700 leading-[2.3]">
                            {course.overview}
                          </p>
                        </div>

                        {/* 2. Stages if applicable (e.g. Dars-e-Nizami) */}
                        {course.curriculumStages && (
                          <div className="pt-4 border-t border-slate-100">
                            <h4 className="text-base font-black text-slate-900 mb-3 flex items-center gap-2 text-emerald-800">
                              <GraduationCap size={18} />
                              <span>تعلیمی مراحل و تدریسی کتب (۸ سالہ مرحلہ وار خاکہ):</span>
                            </h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              {course.curriculumStages.map((stage, idx) => (
                                <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                                  <div className="flex items-center justify-between mb-1">
                                    <span className="font-black text-slate-900 text-sm">{stage.stage}</span>
                                    <span className="text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded">
                                      {stage.equivalent}
                                    </span>
                                  </div>
                                  <div className="text-xs text-slate-600 mt-2 space-y-1">
                                    <div>
                                      <strong className="text-slate-800">اہم مضامین: </strong>
                                      <span>{stage.subjects.join(' • ')}</span>
                                    </div>
                                    <div>
                                      <strong className="text-slate-800">نصابی کتب: </strong>
                                      <span>{stage.books.join(' • ')}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* 3. Subjects & Books */}
                        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-black text-slate-900 mb-2 flex items-center gap-2 text-emerald-800">
                              <FileText size={16} />
                              <span>تدریسی نصاب و مضامین:</span>
                            </h4>
                            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                              {course.curriculumSubjects.map((sub, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <Check size={14} className="text-emerald-600 shrink-0 mt-1" />
                                  <span>{sub}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div>
                            <h4 className="text-sm font-black text-slate-900 mb-2 flex items-center gap-2 text-emerald-800">
                              <Book size={16} />
                              <span>اہم پڑھائی جانے والی کتب:</span>
                            </h4>
                            <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700">
                              {course.booksTaught.map((book, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <Check size={14} className="text-emerald-600 shrink-0 mt-1" />
                                  <span>{book}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* 4. Eligibility & Facilities */}
                        <div className="pt-4 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="bg-amber-50/60 p-4 rounded-xl border border-amber-200/80">
                            <h4 className="text-sm font-black text-amber-950 mb-2 flex items-center gap-2">
                              <Calendar size={16} className="text-amber-700" />
                              <span>شرائطِ داخلہ و اہلیت:</span>
                            </h4>
                            <ul className="space-y-1.5 text-xs sm:text-sm text-amber-950">
                              {course.eligibility.map((item, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <CheckCircle2 size={14} className="text-amber-700 shrink-0 mt-1" />
                                  <span>{item}</span>
                                </li>
                              ))}
                            </ul>
                          </div>

                          <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200/80">
                            <h4 className="text-sm font-black text-emerald-950 mb-2 flex items-center gap-2">
                              <Building2 size={16} className="text-emerald-700" />
                              <span>جامعہ کی مفت سہولیات:</span>
                            </h4>
                            <ul className="space-y-1.5 text-xs sm:text-sm text-emerald-950">
                              {course.facilities.map((fac, idx) => (
                                <li key={idx} className="flex items-start gap-2">
                                  <ShieldCheck size={14} className="text-emerald-700 shrink-0 mt-1" />
                                  <span>{fac}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        {/* 5. Outcomes & CTAs */}
                        <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="text-xs text-slate-500 font-bold">
                            وفاق المدارس الاسلامیہ الرضویہ پاکستان سے باقاعدہ رجسٹرڈ شعبہ
                          </div>

                          <div className="flex items-center gap-3 w-full sm:w-auto">
                            <Link
                              href={`/admissions?course=${encodeURIComponent(course.title)}`}
                              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm transition-all text-center shadow-xs"
                            >
                              اس کورس میں داخلہ لیں
                            </Link>
                            <Link
                              href="/contact"
                              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-xs sm:text-sm transition-all text-center"
                            >
                              مشیر سے رابطہ
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* --- 5. ACADEMIC PATHWAYS --- */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-slate-50/70 border-b border-slate-200/80">
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
                  step: '۰۱',
                  title: 'ابتدائی مرحلہ (بنیادی دینی علوم و حفظ)',
                  desc: 'حفظِ قرآن کریم، مخارج و صفات کے بنیادی قواعد، اور عربی زبان کے بنیادی الفاظ و کلمات کی فہم پر خصوصی توجہ۔',
                  icon: <Book size={24} className="text-emerald-700" />
                },
                {
                  step: '۰۲',
                  title: 'متوسطہ و ثانوی مرحلہ (درسِ نظامی)',
                  desc: 'عربی گرائمر (نحو و صرف)، فقہِ اسلامی، ترجمہ و تفسیرِ قرآن مجید، اور بنیادی احادیثِ نبویہ کا باقاعدہ و مدلل مطالعہ۔',
                  icon: <Award size={24} className="text-teal-700" />
                },
                {
                  step: '۰۳',
                  title: 'اعلیٰ مرحلہ (عالمیہ و تخصصات فی الفقہ)',
                  desc: 'کتبِ احادیث (صحاح ستہ)، اصولِ فقہ، اصولِ افتاء، اور عصرِ حاضر کے جدید معاشی و سماجی مسائل کا گہرا تحقیقی حل۔',
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
                    <div className="text-3xl font-black text-slate-200 font-urdu">{path.step}</div>
                  </div>

                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 leading-[2.1] font-urdu">
                    {path.title}
                  </h3>

                  <p className="text-slate-600 text-xs sm:text-sm leading-[2.3] font-urdu">{path.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- 6. LEARNING METHODOLOGY --- */}
        <section className="py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/80">
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
                  جامعہ شیرِ ربانی (مانانوالہ، ضلع شیخوپورہ) میں اساتذہ سے براہِ راست روبرو فیض حاصل کرنے کی قدیم و مستند اسلامی روایت (تلقّی) کو جدید تدریسی وسائل، کتب خانوں اور تحقیقی طریقوں کے ساتھ ہم آہنگ کیا گیا ہے تاکہ فارغ التحصیل علماء دینِ اسلام کا پیغام مؤثر انداز میں پہنچا سکیں۔
                </p>

                <ul className="space-y-3.5 mb-6">
                  {[
                    'جید، باعمل اور سند یافتہ اساتذہ و شیوخِ حدیث کی براہِ راست انفرادی سرپرستی۔',
                    'کلاس رومز میں مناسب تعداد تاکہ ہر طالب علم کی علمی و باطنی تربیت پر خصوصی توجہ ممکن ہو۔',
                    'جدید اسلامک ریسرچ، کمپیوٹر کتب خانہ اور فتوٰی نویسی کے عصری طریقہ کار کی تربیت۔',
                    'صرف رٹنے کے بجائے تفہیم، استدلال اور باہمی علمی مباحث پر مشتمل امتحانی نظام۔'
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2.5">
                      <ChevronLeft size={18} className="text-emerald-700 shrink-0 mt-1" />
                      <span className="text-slate-700 text-xs sm:text-sm font-semibold font-urdu leading-[2.2]">
                        {item}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Right Column: 4 Stat Boxes */}
              <div className="lg:col-span-5 grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-5 md:p-6 border border-slate-200/80 rounded-2xl shadow-2xs text-center">
                  <div className="text-2xl md:text-3xl font-black text-slate-900 mb-1">1:15</div>
                  <div className="text-xs font-bold text-slate-500 font-urdu">استاد اور طلبہ کا مثالی تناسب</div>
                </div>

                <div className="bg-slate-50 p-5 md:p-6 border border-slate-200/80 rounded-2xl shadow-2xs text-center">
                  <div className="text-2xl md:text-3xl font-black text-slate-900 mb-1">100%</div>
                  <div className="text-xs font-bold text-slate-500 font-urdu">وفاق سے تصدیق شدہ نصاب</div>
                </div>

                <div className="bg-slate-50 p-5 md:p-6 border border-slate-200/80 rounded-2xl shadow-2xs text-center">
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

        {/* --- 7. SECONDARY CTA --- */}
        <section className="py-14 md:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/50">
          <div className="max-w-4xl mx-auto text-center">
            <span className="text-xs md:text-sm font-semibold tracking-wide inline-block mb-3 px-3 py-1 rounded-md text-emerald-800 bg-emerald-50 border border-emerald-200 font-urdu">
              تعلیمی رہنمائی و مشاورت
            </span>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-[1.9] md:leading-[2.1] font-urdu">
              کیا آپ کسی کورس کے انتخاب میں رہنمائی چاہتے ہیں؟
            </h2>

            <p className="text-sm sm:text-base text-slate-600 mb-8 max-w-2xl mx-auto leading-[2.2] md:leading-[2.3] font-urdu">
              جامعہ شیرِ ربانی (مانانوالہ، ضلع شیخوپورہ) کے تعلیمی مشیران آپ کے تعلیمی پس منظر، عمر اور مقاصد کے مطابق بہترین شعبہ تجویز کرنے کے لیے ہمہ وقت حاضر ہیں۔
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

      {/* --- DETAILED COURSE POPUP MODAL --- */}
      <AnimatePresence>
        {selectedCourse && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedCourse(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-3 sm:p-6 overflow-y-auto backdrop-blur-xs"
            dir="rtl"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col border border-slate-200"
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-7 bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 text-white relative shrink-0">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="absolute top-5 left-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                  aria-label="بند کریں"
                >
                  <X size={20} />
                </button>

                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-200 border border-emerald-400/30 font-urdu">
                    {selectedCourse.level}
                  </span>
                  <span className="text-xs font-bold text-amber-300 font-urdu flex items-center gap-1">
                    <Clock size={13} /> {selectedCourse.duration}
                  </span>
                  <span className="text-xs text-slate-300 font-urdu">
                    • وفاق المدارس الاسلامیہ الرضویہ پاکستان سے الحاق شدہ
                  </span>
                </div>

                <div className="text-xs text-amber-200/90 font-urdu mb-1">
                  {selectedCourse.arabicTitle}
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-white font-urdu leading-tight">
                  {selectedCourse.title}
                </h3>
              </div>

              {/* Modal Body Scrollable */}
              <div className="p-6 sm:p-8 space-y-7 overflow-y-auto flex-1 font-urdu text-right">
                {/* 1. Overview */}
                <div>
                  <h4 className="text-base font-black text-slate-900 mb-2 flex items-center gap-2 text-emerald-800">
                    <BookOpen size={18} />
                    <span>کورس کا تفصیلی تعارف و مقاصد:</span>
                  </h4>
                  <p className="text-sm sm:text-base text-slate-700 leading-[2.3]">
                    {selectedCourse.overview}
                  </p>
                </div>

                {/* 2. Key Highlights */}
                <div>
                  <h4 className="text-base font-black text-slate-900 mb-3 flex items-center gap-2 text-emerald-800">
                    <Sparkles size={18} />
                    <span>اہم تعلیمی خصوصیات:</span>
                  </h4>
                  <div className="grid grid-cols-1 gap-2.5 bg-slate-50 p-4 rounded-2xl border border-slate-200">
                    {selectedCourse.highlights.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-800">
                        <Check size={16} className="text-emerald-600 shrink-0 mt-1" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 3. Stages if applicable (Dars-e-Nizami) */}
                {selectedCourse.curriculumStages && (
                  <div>
                    <h4 className="text-base font-black text-slate-900 mb-3 flex items-center gap-2 text-emerald-800">
                      <GraduationCap size={18} />
                      <span>تعلیمی مراحل (عامہ، خاصہ، عالیہ، عالمیہ):</span>
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                      {selectedCourse.curriculumStages.map((stg, idx) => (
                        <div key={idx} className="p-4 rounded-xl bg-slate-50 border border-slate-200">
                          <div className="font-black text-slate-900 text-sm mb-1">{stg.stage}</div>
                          <div className="text-xs font-bold text-emerald-700 mb-2">{stg.equivalent}</div>
                          <div className="text-xs text-slate-600 space-y-1">
                            <div><strong>مضامین: </strong>{stg.subjects.join('، ')}</div>
                            <div><strong>کتب: </strong>{stg.books.join('، ')}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* 4. Curriculum Subjects & Books */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-black text-slate-900 mb-2.5 flex items-center gap-2 text-emerald-800">
                      <FileText size={16} />
                      <span>تدریسی مضامین و نصاب:</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      {selectedCourse.curriculumSubjects.map((sub, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check size={14} className="text-emerald-600 shrink-0 mt-1" />
                          <span>{sub}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-black text-slate-900 mb-2.5 flex items-center gap-2 text-emerald-800">
                      <Book size={16} />
                      <span>شامل نصابی کتب:</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
                      {selectedCourse.booksTaught.map((book, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check size={14} className="text-emerald-600 shrink-0 mt-1" />
                          <span>{book}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 5. Eligibility & Facilities */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-amber-50/70 p-4 rounded-xl border border-amber-200">
                    <h4 className="text-sm font-black text-amber-950 mb-2 flex items-center gap-2">
                      <Calendar size={16} className="text-amber-700" />
                      <span>شرائطِ داخلہ و اہلیت:</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-amber-950">
                      {selectedCourse.eligibility.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <CheckCircle2 size={14} className="text-amber-700 shrink-0 mt-1" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-emerald-50/70 p-4 rounded-xl border border-emerald-200">
                    <h4 className="text-sm font-black text-emerald-950 mb-2 flex items-center gap-2">
                      <Building2 size={16} className="text-emerald-700" />
                      <span>جامعہ کی مفت سہولیات:</span>
                    </h4>
                    <ul className="space-y-1.5 text-xs sm:text-sm text-emerald-950">
                      {selectedCourse.facilities.map((fac, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <ShieldCheck size={14} className="text-emerald-700 shrink-0 mt-1" />
                          <span>{fac}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* 6. Learning Outcomes */}
                <div>
                  <h4 className="text-sm font-black text-slate-900 mb-2 flex items-center gap-2 text-emerald-800">
                    <Award size={16} />
                    <span>حاصلاتِ تعلّم اور فکری نتائج:</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 bg-slate-50 p-4 rounded-xl border border-slate-200">
                    {selectedCourse.learningOutcomes.map((out, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-800">
                        <CheckCircle2 size={14} className="text-emerald-600 shrink-0 mt-1" />
                        <span>{out}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Footer CTAs */}
              <div className="p-4 sm:p-5 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3 shrink-0">
                <button
                  onClick={() => setSelectedCourse(null)}
                  className="px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-bold text-xs sm:text-sm hover:bg-slate-100 font-urdu"
                >
                  بند کریں
                </button>

                <div className="flex items-center gap-2.5">
                  <Link
                    href="/contact"
                    className="px-5 py-2.5 rounded-xl border border-emerald-700 text-emerald-800 font-bold text-xs sm:text-sm hover:bg-emerald-50 font-urdu"
                  >
                    تعلیمی مشیر سے رابطہ
                  </Link>

                  <Link
                    href={`/admissions?course=${encodeURIComponent(selectedCourse.title)}`}
                    className="px-6 py-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm font-urdu shadow-sm"
                  >
                    آن لائن داخلہ فارم پر کریں
                  </Link>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* --- LIGHTBOX FOR FULLSCREEN IMAGE PREVIEW --- */}
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
              onClick={(e) => {
                e.stopPropagation();
                setSelectedImage(null);
              }}
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
              onClick={(e) => e.stopPropagation()}
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
