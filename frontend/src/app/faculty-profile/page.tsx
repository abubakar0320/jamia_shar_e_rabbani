'use client';

import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState, Suspense } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OptimizedImage from '@/components/OptimizedImage';
import { 
  GraduationCap, Mail, Phone, BookOpen, 
  Award, Languages, Calendar, MapPin, 
  ChevronLeft, ArrowRight, UserCircle,
  Briefcase, Search, FileText, CheckCircle2,
  ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

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

const staticFaculty: FacultyMember[] = [
  {
    id: 1,
    name: 'پروفیسر ڈاکٹر فاروق علی ربانی',
    role: 'شیخ الحدیث و پرنسپل',
    designation: 'شیخ الحدیث و پرنسپل، جامعہ شیرِ ربانی',
    education: 'عالمیہ (درسِ نظامی) و تخصص فی الحدیث',
    specialization: 'علومِ حدیث، تفاسیر اور فقہِ اسلامی',
    image: '/farooq-ali-rabbani.jpeg',
    email: 'jamiashererabbani07@gmail.com',
    contact: '03144081516',
    bio: 'پروفیسر ڈاکٹر فاروق علی ربانی جامعہ شیرِ ربانی کے شیخ الحدیث اور پرنسپل ہیں۔ آپ نے 25 سال سے زائد عرصے میں ہزاروں طلبہ کو صحاحِ ستہ اور علومِ شریعہ کی تدریس فرمائی ہے۔ آپ عالمِ اسلام کے مقتدر علماء سے سند و اجازات کے حامل ہیں اور متعدد تحقیقی مقالات و کتب کے مصنف ہیں۔',
    experience: '25+ سال کا تدریسی تجربہ',
    research: 'علومِ حدیث کی درایت، اصولِ تفسیر اور معاصر فقہی مسائل',
    courses: ['صحیح البخاری الشریف', 'جامع الترمذی', 'مشکوٰۃ المصابیح', 'اصولِ حدیث و درایت'],
    languages: ['عربی', 'اردو', 'انگریزی'],
    achievements: [
      'اصولِ حدیث اور فقہ پر متعدد علمی و تحقیقی مقالات کے مصنف۔',
      'عالمِ اسلام کے کبار محدثین و اساتذہ سے متصل اسناد و اجازات۔',
      'ملک بھر میں پھیلے سینکڑوں فارغ التحصیل علماء و حفاظ کے استاد و مربی۔'
    ]
  },
  {
    id: 2,
    name: 'مولانا علی حمزہ ربانی',
    role: 'استاذ الحدیث و شعبہ درسِ نظامی',
    designation: 'استاذ الحدیث و نگرانِ شعبہ درسِ نظامی',
    education: 'عالمیہ (درسِ نظامی) و تخصص فی الفقہ',
    specialization: 'فقہِ اسلامی، اصولِ فقہ و عربی ادب',
    image: '/ali-hamza.jpeg',
    email: 'jamiashererabbani07@gmail.com',
    contact: '03144081516',
    bio: 'مولانا علی حمزہ ربانی جامعہ شیرِ ربانی میں فقہ، اصولِ فقہ اور عربی ادب کے نامور مدرس ہیں۔ آپ دار الافتاء کے نگران اور طلبہ کی علمی، اخلاقی اور فکری رہنمائی میں ہمہ وقت سرگرم رہتے ہیں۔',
    experience: '15+ سال کا تدریسی تجربہ',
    research: 'فقہِ حنفی، معاصر معاشی احکام اور اسلامی قوانین',
    courses: ['الہدایۃ فی الفقہ', 'العقیدۃ الطحاویۃ', 'مقاماتِ حریری', 'نحو و صرف و بلاغت'],
    languages: ['عربی', 'اردو', 'فارسی'],
    achievements: [
      'جدید معاشی اور معاشرتی مسائل پر فتاویٰ کی مراجعت و تحقیق۔',
      'دار الافتاء کے اہم فقہی و تدریسی امور کی کامیاب نگرانی۔',
      'طلبہ کے باہمی علمی مباحث اور تربیتی نشستوں کی سرپرستی۔'
    ]
  },
  {
    id: 3,
    name: 'محترم ابوبکر صدیق (Abubakar Siddique)',
    role: 'ڈائریکٹر انفارمیشن ٹیکنالوجی و ہیڈ آف سافٹ ویئر سسٹمز',
    designation: 'ڈائریکٹر انفارمیشن ٹیکنالوجی و ہیڈ آف انٹرن شپ پروگرام، جامعہ شیرِ ربانی',
    education: 'بی ایس انفارمیشن ٹیکنالوجی (BSIT)، بابا گرو نانک یونیورسٹی | گوگل و سسکو سرٹیفائیڈ',
    specialization: 'فل اسٹیک ویب ڈویلپمنٹ، کلاؤڈ انفراسٹرکچر، تعلیمی سسٹمز و ڈیٹا بیس آرکیٹیکچر',
    image: '/abubakar-latest.jpeg',
    email: 'abubakr.bgnu@gmail.com',
    contact: '03097354874',
    bio: 'محترم ابوبکر صدیق جامعہ شیرِ ربانی کے ڈائریکٹر انفارمیشن ٹیکنالوجی اور انٹرن شپ پروگرام کے سربراہ ہیں۔ آپ نے بابا گرو نانک یونیورسٹی (BGNU) سے بی ایس انفارمیشن ٹیکنالوجی کی تعلیم مکمل کی ہے اور گوگل پروجیکٹ مینجمنٹ و سسکو سائبر سیکیورٹی سرٹیفیکیشنز کے حامل ہیں۔ جامعہ شیرِ ربانی کے تمام ڈیجیٹل انفراسٹرکچر، پورٹلز، آن لائن داخلہ فارم سسٹم، امتحانی نتائج اور کلاؤڈ سیکیورٹی کی تکنیکی نگرانی اور تعمیر آپ کے سپرد ہے۔ اس کے علاوہ آپ جامعہ کے آفیشل انٹرن شپ پروگرام کے ذریعے نوجوانوں اور طلبہ کو پریکٹیکل آئی ٹی و سافٹ ویئر ڈویلپمنٹ کی تربیت فراہم کر رہے ہیں۔',
    experience: '5+ سال کا سافٹ ویئر ڈویلپمنٹ و ٹیکنالوجی ٹریننگ کا تجربہ',
    research: 'ایجوکیشنل مینجمنٹ سسٹمز (LMS)، کلاؤڈ انفراسٹرکچر، ڈیٹا بیس ڈیزائن اور ماڈرن ویب سیکیورٹی',
    courses: [
      'فل اسٹیک ویب ڈویلپمنٹ (Next.js, React, Node.js)',
      'ڈیٹا بیس ڈیزائن و مینجمنٹ (MongoDB, MySQL)',
      'کلاؤڈ سرور مینجمنٹ و سیکیورٹی آرکیٹیکچر',
      'پریکٹیکل آئی ٹی انٹرن شپ و پراجیکٹ مینجمنٹ'
    ],
    languages: ['اردو', 'انگریزی', 'پنجابی'],
    achievements: [
      'جامعہ شیرِ ربانی کے مکمل ڈیجیٹل سسٹم، ویب پورٹل اور رزلٹ سرچ انجن کے معمار۔',
      'گوگل (Google) پراجیکٹ مینجمنٹ اور سسکو (Cisco) نیٹ ورکنگ اسنشلز سے بین الاقوامی سند یافتہ۔',
      'جامعہ کے آفیشل آئی ٹی انٹرن شپ پروگرام کے نگران اور درجنوں نوجوانوں کے ٹیکنیکل مربی۔'
    ]
  }
];

function FacultyProfileContent() {
  const searchParams = useSearchParams();
  const idParam = searchParams.get('id');
  const facultyId = idParam ? parseInt(idParam, 10) : 1;
  const member = staticFaculty.find(m => m.id === facultyId) || staticFaculty[0];
  const related = staticFaculty.filter(m => m.id !== member.id);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50" dir="rtl">
      <Header />
      
      <main className="flex-1 pb-20">
        
        {/* HEADER SECTION */}
        <section className="bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white pt-14 pb-32 relative overflow-hidden text-right">
          <div className="absolute inset-0 opacity-15 pointer-events-none">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${member.image}")` }} />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Back to Faculty Directory */}
            <Link 
              href="/faculty" 
              className="inline-flex items-center gap-2 text-emerald-300 hover:text-white transition-colors mb-6 text-xs sm:text-sm font-bold font-urdu"
            >
              <ArrowRight size={16} /> <span>تمام اساتذہ ڈائریکٹری پر واپس جائیں</span>
            </Link>
            
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-start lg:items-end">
              {/* Profile Image Box */}
              <div className="w-44 h-56 sm:w-52 sm:h-68 md:w-60 md:h-76 bg-white rounded-2xl shadow-2xl overflow-hidden relative border-4 border-white shrink-0 mb-0 lg:-mb-24 z-20">
                <OptimizedImage 
                  src={member.image || "/images/WhatsApp.jpeg"}
                  alt={member.name}
                  fill
                  section="faculty"
                  className="object-cover object-top"
                />
              </div>
              
              {/* Profile Title & Roles */}
              <div className="flex-1 pb-2 z-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-3 leading-[1.9] md:leading-[2.1] font-urdu">
                    {member.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-emerald-200 text-xs sm:text-sm font-bold font-urdu">
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={16} className="text-emerald-400 shrink-0" />
                      <span>{member.designation || member.role}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={16} className="text-emerald-400 shrink-0" />
                      <span>جامعہ شیرِ ربانی مانانوالہ، شیخوپورہ</span>
                    </span>
                  </div>
                </motion.div>
              </div>
              
              {/* Contact Action Buttons */}
              <div className="w-full lg:w-auto flex flex-wrap sm:flex-nowrap gap-3 z-20 lg:mb-2">
                <Link 
                  href={`mailto:${member.email || 'jamiashererabbani07@gmail.com'}`} 
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-slate-900 font-bold rounded-xl shadow-md hover:bg-slate-100 transition-all text-xs sm:text-sm font-urdu"
                >
                  <Mail size={16} /> <span>ای میل بھیجیں</span>
                </Link>
                <Link 
                  href={`tel:${member.contact || '03144081516'}`} 
                  className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-700 text-white font-bold rounded-xl border border-emerald-600 hover:bg-emerald-600 transition-all text-xs sm:text-sm font-urdu"
                >
                  <Phone size={16} /> <span>رابطہ کریں</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* --- MAIN CONTENT GRID --- */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 lg:mt-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 text-right">
            
            {/* Right Main Column */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* BIOGRAPHY */}
              <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-2xs">
                <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-4 flex items-center gap-2 font-urdu">
                  <UserCircle className="text-emerald-700" size={24} />
                  <span>سوانح و علمی تعارف</span>
                </h2>
                <div className="text-slate-600 leading-[2.3] text-sm sm:text-base font-urdu">
                  {member.bio}
                </div>
              </div>

              {/* SPECIALIZATION & RESEARCH */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 font-urdu">
                    <BookOpen className="text-emerald-700" size={20} />
                    <span>تخصص و مہارت</span>
                  </h3>
                  <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200/60 font-urdu leading-[2.2]">
                    {member.specialization}
                  </p>
                </div>

                {member.research && (
                  <div className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-2xs">
                    <h3 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2 font-urdu">
                      <Search className="text-emerald-700" size={20} />
                      <span>علمی و تحقیقی میدان</span>
                    </h3>
                    <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-200/60 font-urdu leading-[2.2]">
                      {member.research}
                    </p>
                  </div>
                )}
              </div>

              {/* COURSES TAUGHT */}
              {member.courses && member.courses.length > 0 && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-6 flex items-center gap-2 font-urdu">
                    <FileText className="text-emerald-700" size={24} />
                    <span>تدریسی کتب و اسباق</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {member.courses.map((course, i) => (
                      <div key={i} className="flex items-center gap-3.5 bg-slate-50 p-4 rounded-xl border border-slate-200/70">
                        <div className="w-8 h-8 bg-emerald-100 text-emerald-800 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 font-urdu">
                          ۰{i + 1}
                        </div>
                        <span className="font-bold text-slate-900 text-sm font-urdu">{course}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ACADEMIC ACHIEVEMENTS */}
              {member.achievements && member.achievements.length > 0 && (
                <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200/80 shadow-2xs">
                  <h2 className="text-xl sm:text-2xl font-black text-slate-900 mb-5 flex items-center gap-2 font-urdu">
                    <Award className="text-emerald-700" size={24} />
                    <span>علمی و تحقیقی کارنامے</span>
                  </h2>
                  <ul className="space-y-3 font-urdu">
                    {member.achievements.map((item, i) => (
                      <li key={i} className="flex items-start gap-3 text-slate-700 text-xs sm:text-sm leading-relaxed">
                        <CheckCircle2 size={18} className="text-emerald-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {/* Left Sidebar Column */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* EDUCATION & DETAILS CARD */}
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200/80 shadow-2xs">
                <h3 className="text-lg font-black text-slate-900 mb-5 flex items-center gap-2 font-urdu pb-3 border-b border-slate-100">
                  <GraduationCap className="text-emerald-700" size={22} />
                  <span>تعلیمی کوائف و تجربہ</span>
                </h3>

                <div className="space-y-5 font-urdu">
                  <div>
                    <span className="text-xs font-bold text-slate-400 block mb-1">تعلیمی اسناد و ڈگری</span>
                    <p className="text-sm font-bold text-slate-800">{member.education}</p>
                  </div>

                  {member.experience && (
                    <div className="pt-4 border-t border-slate-100">
                      <span className="text-xs font-bold text-slate-400 block mb-1">تدریسی تجربہ</span>
                      <p className="text-sm font-bold text-slate-800">{member.experience}</p>
                    </div>
                  )}

                  {member.languages && (
                    <div className="pt-4 border-t border-slate-100">
                      <span className="text-xs font-bold text-slate-400 block mb-2">زبانیں</span>
                      <div className="flex flex-wrap gap-2">
                        {member.languages.map(lang => (
                          <span key={lang} className="px-3 py-1 bg-slate-100 text-slate-700 text-xs font-bold rounded-md">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* OTHER FACULTY MEMBERS */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200/80 shadow-2xs">
                <h3 className="text-base font-black text-slate-900 mb-4 font-urdu pb-2 border-b border-slate-100">
                  دیگر معزز اساتذہ
                </h3>
                <div className="space-y-3">
                  {related.map(item => (
                    <Link 
                      key={item.id} 
                      href={`/faculty-profile?id=${item.id}`} 
                      className="flex items-center gap-3.5 p-3 rounded-xl border border-slate-100 hover:border-emerald-300 hover:bg-emerald-50/40 transition-all group"
                    >
                      <div className="w-12 h-12 rounded-lg overflow-hidden relative shrink-0 bg-slate-100">
                        <OptimizedImage 
                          src={item.image || "/images/WhatsApp.jpeg"}
                          alt={item.name}
                          fill
                          section="faculty"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 text-xs sm:text-sm truncate group-hover:text-emerald-700 transition-colors font-urdu">
                          {item.name}
                        </h4>
                        <p className="text-[11px] text-slate-500 truncate font-urdu">
                          {item.role}
                        </p>
                      </div>
                      <ChevronLeft size={16} className="text-slate-400 group-hover:text-emerald-700 group-hover:-translate-x-1 transition-all shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* BOTTOM ADMISSIONS CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-3xl p-8 sm:p-12 shadow-lg">
            <h2 className="text-2xl sm:text-3xl font-black mb-3 font-urdu">
              کیا آپ ہمارے جید اساتذہ کے زیرِ سایہ تعلیم حاصل کرنا چاہتے ہیں؟
            </h2>
            <p className="text-emerald-100/90 text-sm sm:text-base mb-6 max-w-2xl mx-auto font-urdu">
              جامعہ شیرِ ربانی کے مختلف تعلیمی شعبہ جات میں داخلے جاری ہیں۔ علمِ نافع کے سفر کا حصہ بنیں۔
            </p>
            <div className="flex flex-wrap justify-center gap-3.5">
              <Link 
                href="/admissions" 
                className="px-7 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl shadow-md transition-all font-urdu text-sm sm:text-base"
              >
                آن لائن داخلہ فارم پر کریں
              </Link>
              <Link 
                href="/contact" 
                className="px-7 py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold rounded-xl transition-all font-urdu text-sm sm:text-base"
              >
                دفترِ تعلیمات سے رابطہ
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}

export default function FacultyProfile() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex flex-col items-center justify-center bg-white" dir="rtl">
        <div className="w-10 h-10 border-4 border-emerald-700 border-t-transparent rounded-full animate-spin mb-3"></div>
        <span className="text-sm font-bold text-slate-700 font-urdu">پروفائل لوڈ ہو رہی ہے...</span>
      </div>
    }>
      <FacultyProfileContent />
    </Suspense>
  );
}
