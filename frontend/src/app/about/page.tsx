'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import React from 'react';
import { 
  Target, 
  History, 
  Award, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles,
  Building2,
  ShieldCheck,
  HeartHandshake,
  ChevronLeft,
  Crown
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import OptimizedImage from '@/components/OptimizedImage';

interface MilestoneLeader {
  name: string;
  role: string;
  image: string;
  profileId?: number;
}

interface Milestone {
  year: string;
  badge: string;
  title: string;
  subtitle?: string;
  description: string;
  bulletPoints?: string[];
  icon: React.ReactNode;
  leaders?: MilestoneLeader[];
}

export default function About() {
  const { t } = useTranslation();

  const milestones: Milestone[] = [
    {
      year: '1992ء',
      badge: 'سنگِ بنیاد',
      title: 'مدرسہ شیرِ ربانی کا قیام',
      subtitle: 'دینی علوم و روحانی تربیت کا آغاز',
      description: 'جامعہ شیرِ ربانی کے اس مقدس سفر کا آغاز 1992ء میں ہوا، جب مولانا منظور احمد صاحب نے اسلامی تعلیمات کے فروغ، دینی اقدار کے تحفظ اور روحانی و اخلاقی نشوونما کے عظیم وژن کے تحت اس ادارے کی بنیاد رکھی۔ مدرسہ شیرِ ربانی کا قیام مولانا منظور احمد صاحب کی بابرکت قیادت اور رہنمائی میں عمل میں آیا، جو اسلامی علوم کی ترویج اور مسلم کمیونٹی کی بے لوث خدمت کے ایک مخلصانہ مشن کا باقاعدہ آغاز تھا۔',
      icon: <Building2 className="w-5 h-5 text-emerald-700" />
    },
    {
      year: '2002ء',
      badge: 'نشاۃِ ثانیہ',
      title: 'جامعہ شیرِ ربانی میں ارتقاء',
      subtitle: 'توسیع و ترقی کا نیا دور',
      description: 'سن 2002ء میں ادارہ ترقی و توسیع کے ایک نئے دور میں داخل ہوا اور اسے نشاۃِ ثانیہ (دوسرے ارتقائی مرحلے) پر باضابطہ اپ گریڈ کیا گیا۔ اس مبارک موقع پر ادارے کا باقاعدہ نام "جامعہ شیرِ ربانی" رکھا گیا اور مولانا الحاج صوبیدار محمد یوسف نقشبندی مجددی صاحب نے ۳۰ سالہ عسکری نظم و ضبط اور ۲۴ سالہ دینی اخلاص کے ساتھ ادارے کی باگ ڈور سنبھالی اور تعلیمی و انتظامی ڈھانچے کو وسعت دی۔',
      icon: <GraduationCap className="w-5 h-5 text-emerald-700" />,
      leaders: [
        {
          name: 'مولانا الحاج صوبیدار محمد یوسف نقشبندی مجددی صاحب',
          role: 'چانسلر و سرپرستِ اعلیٰ (۳۰ سالہ عسکری نظم و ضبط و ۲۴ سالہ دینی اخلاص)',
          image: '/gallery/1.1مولانا الحاج صوبیدار محمد یوسف نقشبندی مجددی صاحب.jpeg',
          profileId: 14
        }
      ]
    },
    {
      year: '2008ء',
      badge: 'علمی قیادت',
      title: 'علمی و تعلیمی قیادت کا نیا دور',
      subtitle: 'اعلیٰ نصابی و ادارہ جاتی ترقی',
      description: 'سن 2008ء میں ڈاکٹر پیر ابو احمد فاروق علی ربانی صاحب نے بطور وائس چانسلر و ڈینِ فیکلٹی (سابق پرنسپل) ادارے کی تعلیمی باگ ڈور سنبھالی۔ ان کی علمی سرپرستی، درسِ حدیث و صحاحِ ستہ اور جدید نصابی اصلاحات کی بدولت جامعہ نے غیر معمولی تعلیمی ترقی اور ادارہ جاتی استحکام کی نئی منازل طے کیں۔',
      icon: <Award className="w-5 h-5 text-emerald-700" />,
      leaders: [
        {
          name: 'ڈاکٹر پیر ابو احمد فاروق علی ربانی صاحب',
          role: 'وائس چانسلر و ڈینِ فیکلٹی آف اسلامک اسٹڈیز (سابق پرنسپل)',
          image: '/gallery/2. ڈاکٹر پیر ابو احمد فاروق علی ربانی صاحب (جدید).jpeg',
          profileId: 1
        }
      ]
    },
    {
      year: '2022ء',
      badge: 'باقاعدہ الحاق',
      title: 'باقاعدہ رجسٹریشن اور ادارہ جاتی ارتقاء',
      subtitle: 'قومی و مستند تعلیمی الحاق',
      description: 'سن 2022ء میں جامعہ نے ایک تاریخی اور یادگار سنگِ میل عبور کیا جب جامعہ شیرِ ربانی کو باضابطہ طور پر درج ذیل اعلیٰ تعلیمی بورڈز کے ساتھ قانونی حیثیت میں رجسٹرڈ کیا گیا:',
      bulletPoints: [
        'وفاقِ وزارتِ تعلیم، حکومتِ پاکستان (Wafaq-e-Wizarat-e-Taleem)',
        'وفاق المدارس الاسلامیہ الرضویہ پاکستان (Wafaq-ul-Madaris Al-Islamia Al-Rizvia)'
      ],
      icon: <ShieldCheck className="w-5 h-5 text-emerald-700" />
    },
    {
      year: '2022ء تا حال',
      badge: 'موجودہ دور',
      title: 'قیادت، تعلیمی وژن اور جدید نظام',
      subtitle: 'دینی علوم، کردار سازی اور ڈیجیٹل سسٹم ایڈمنسٹریشن',
      description: 'سن 2022ء سے تا حال مولانا الحاج صوبیدار محمد یوسف نقشبندی مجددی صاحب بطور چانسلر و سرپرستِ اعلیٰ، ڈاکٹر پیر ابو احمد فاروق علی ربانی صاحب بطور وائس چانسلر و ڈینِ فیکلٹی، اسلامک اسکالر حافظ القاری محمد احمد ربانی صاحب بطور کنٹرولر امتحانات و ناظمِ تعلیمات، اور پروفیسر ابوبکر صدیق ربانی صاحب بطور رجسٹرار، خزانچی، چیئرپرسن و نگرانِ جملہ شعبہ جات جامعہ کی سپریم انتظامی و تعلیمی باگ ڈور سنبھالے ہوئے ہیں۔ اس مخلص ٹیم کی قیادت میں جامعہ معیاری اسلامی تعلیم کی فراہمی، اخلاقی کردار سازی، اور تقویٰ، صبر اور خدمت کے مشن کو جدید ڈیجیٹل کلاؤڈ سسٹمز کے ساتھ کامیابی سے آگے بڑھا رہا ہے۔',
      icon: <Sparkles className="w-5 h-5 text-emerald-700" />,
      leaders: [
        {
          name: 'مولانا الحاج صوبیدار محمد یوسف نقشبندی مجددی صاحب',
          role: 'چانسلر و سرپرستِ اعلیٰ',
          image: '/gallery/1.1مولانا الحاج صوبیدار محمد یوسف نقشبندی مجددی صاحب.jpeg',
          profileId: 14
        },
        {
          name: 'ڈاکٹر پیر ابو احمد فاروق علی ربانی صاحب',
          role: 'وائس چانسلر و ڈین',
          image: '/gallery/2. ڈاکٹر پیر ابو احمد فاروق علی ربانی صاحب (جدید).jpeg',
          profileId: 1
        },
        {
          name: 'اسلامک اسکالر حافظ القاری محمد احمد ربانی صاحب',
          role: 'کنٹرولر امتحانات و ناظمِ تعلیمات',
          image: '/gallery/3. hafiz ahmad ali.jpeg',
          profileId: 4
        },
        {
          name: 'پروفیسر ابوبکر صدیق ربانی صاحب',
          role: 'رجسٹرار، خزانچی و چیئرپرسن',
          image: '/gallery/4. abubakar-siddique.jpeg',
          profileId: 3
        }
      ]
    }
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-white text-slate-900 selection:bg-emerald-100 selection:text-emerald-900">
        
        {/* --- 1. HERO SECTION (اردو تعارف - Noori Nastaleeq) --- */}
        <section className="relative py-16 md:py-24 bg-gradient-to-b from-emerald-50/50 via-white to-slate-50/60 border-b border-slate-100 overflow-hidden">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold shadow-2xs font-urdu">
                <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                <span>جامعہ شیرِ ربانی مانانوالہ • سَنِ تاسیس 1992ء</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.3] font-urdu">
                ہمارا تعارف اور <span className="text-emerald-700">تاریخی سفر</span>
              </h1>
              
              <p className="text-lg sm:text-xl md:text-2xl font-bold text-emerald-800 max-w-3xl mx-auto leading-relaxed font-urdu">
                ایمان، علم اور خدمت کا تابناک سفر (A Journey of Faith, Knowledge, and Service)
              </p>
              
              <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto leading-loose text-justify sm:text-center font-urdu">
                قرآن و سنت کی تعلیمات کے فروغ، طلبہ کی روحانی تربیت اور اسلامی اقدار کے تحفظ کے لیے قائم کیا گیا اہل سنت کا مستند اور باوقار دینی و تعلیمی ادارہ۔
              </p>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <Link
                  href="/admissions"
                  className="px-6 py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm sm:text-base rounded-full shadow-md shadow-emerald-700/20 transition-all font-urdu"
                >
                  آن لائن داخلہ فارم
                </Link>
                <Link
                  href="/courses"
                  className="px-6 py-3 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base rounded-full border border-slate-200 shadow-2xs transition-all font-urdu"
                >
                  تعلیمی شعبہ جات دیکھیں
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- 2. ہمارا وژن اور رہنماء اصول (Our Vision & Principles - Noori Nastaleeq) --- */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch">
              
              {/* ہمارا وژن (Vision Card) */}
              <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-br from-emerald-800 to-emerald-950 text-white shadow-xl flex flex-col justify-between relative overflow-hidden" dir="rtl">
                <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-700/20 rounded-full blur-3xl pointer-events-none -ml-16 -mt-16" />
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-700/70 text-amber-300 text-xs font-bold mb-4 border border-emerald-600/40 font-urdu">
                    <Target className="w-3.5 h-3.5" />
                    <span>ہمارا وژن • Our Vision</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black mb-4 leading-snug text-white font-urdu">
                    ہمارا بنیادی وژن اور مقدس مقصد
                  </h2>
                  <blockquote className="text-xl sm:text-2xl font-bold leading-loose text-emerald-100 border-r-4 border-amber-400 pr-4 py-2 my-4 bg-emerald-900/40 rounded-l-xl font-urdu">
                    "علم، کردار سازی اور روحانی تربیت کے ذریعے قرآن، سنت، اسلامی علوم اور انسانیت کی مسلسل خدمت کرنا۔"
                  </blockquote>
                </div>
                <div className="pt-6 border-t border-emerald-700/60 mt-6 flex items-center justify-between text-xs sm:text-sm font-bold text-emerald-200 font-urdu">
                  <span>جامعہ شیرِ ربانی مانانوالہ</span>
                  <span className="text-amber-300">سنت و قرآن کی روشنی</span>
                </div>
              </div>

              {/* رہنماء اقدار: تقویٰ، صبر اور خدمت */}
              <div className="p-8 sm:p-10 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col justify-between" dir="rtl">
                <div>
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-4 font-urdu">
                    <HeartHandshake className="w-3.5 h-3.5" />
                    <span>رہنماء اصول • Core Values</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-3 font-urdu">
                    تقویٰ، صبر اور خدمت
                  </h3>
                  <p className="text-slate-600 text-sm sm:text-base leading-relaxed mb-6 font-urdu">
                    جامعہ شیرِ ربانی کا تعلیمی و تربیتی نظام تین سنہری نبوی اصولوں پر استوار ہے جو ہمارے ہر طالب علم اور فارغ التحصیل عالم کے کردار کی پہچان ہیں:
                  </p>
                  <div className="space-y-3.5">
                    <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-xl border border-slate-100 shadow-2xs">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm flex-shrink-0 font-urdu">
                        تقویٰ
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900 font-urdu">تقویٰ (Taqwa)</h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed font-urdu">ہر علم و عمل کو خالصتاً رضائے الٰہی، اخلاص اور قرآن و سنت کے احکامات کے تابع رکھنا۔</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-xl border border-slate-100 shadow-2xs">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm flex-shrink-0 font-urdu">
                        صبر
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900 font-urdu">صبر (Sabr)</h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed font-urdu">دینی علوم کے حصول، روحانی ریاضت اور حق کی ترویج میں ثابت قدمی اور استقامت اختیار کرنا۔</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-3.5 bg-white rounded-xl border border-slate-100 shadow-2xs">
                      <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-black text-sm flex-shrink-0 font-urdu">
                        خدمت
                      </div>
                      <div>
                        <h4 className="text-base font-bold text-slate-900 font-urdu">خدمت (Khidmat)</h4>
                        <p className="text-xs sm:text-sm text-slate-600 mt-0.5 leading-relaxed font-urdu">امتِ مسلمہ اور انسانیت کی بھلائی کے لیے بغیر کسی لالچ کے بے لوث خدمت اور رہنمائی فراہم کرنا۔</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- 3. تاریخی سفر (Our Journey Timeline in Urdu - Noori Nastaleeq) --- */}
        <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-slate-50/70 border-b border-slate-100">
          <div className="max-w-5xl mx-auto">
            
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold mb-3 font-urdu">
                <History className="w-4 h-4" />
                <span>تاریخی ارتقاء • Historical Milestones</span>
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.3] font-urdu">
                جامعہ شیرِ ربانی کا تاریخی و تعلیمی سفر
              </h2>
              <p className="text-emerald-800 font-bold text-base sm:text-lg mt-2 font-urdu">
                ایمان، علم اور خدمت کا سفر (1992ء تا حال)
              </p>
              <p className="text-slate-600 text-sm sm:text-base mt-2 leading-relaxed font-urdu">
                جامعہ شیرِ ربانی کے اس سفر کا آغاز 1992ء میں ہوا، جب مولانا منظور احمد صاحب نے اسلامی تعلیمات کے فروغ، دینی اقدار اور روحانی نشوونما کے وژن کے ساتھ اس کی بنیاد رکھی۔
              </p>
            </div>

            {/* Vertical Interactive Timeline in Urdu */}
            <div className="relative border-r-2 md:border-r-0 md:border-l-2 border-emerald-300 mr-4 sm:mr-8 md:mr-0 md:ml-32 space-y-12">
              {milestones.map((item, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: idx * 0.1 }}
                  className="relative pr-6 sm:pr-10 md:pr-0 md:pl-10 group"
                >
                  {/* Timeline Node Point */}
                  <div className="absolute -right-[17px] md:right-auto md:-left-[17px] top-1.5 w-8 h-8 rounded-full bg-white border-3 border-emerald-600 flex items-center justify-center shadow-md group-hover:scale-110 group-hover:border-emerald-700 transition-transform">
                    {item.icon}
                  </div>

                  {/* Year Tag on Left (Visible on md and above) */}
                  <div className="hidden md:block md:absolute md:-left-36 md:top-2 md:w-28 md:text-right">
                    <span className="inline-block px-3 py-1 rounded-lg bg-emerald-800 text-white font-black text-sm shadow-xs font-mono">
                      {item.year}
                    </span>
                  </div>

                  {/* Milestone Card */}
                  <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200/90 shadow-sm hover:shadow-md transition-shadow text-right" dir="rtl">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="md:hidden px-2.5 py-0.5 rounded-md bg-emerald-800 text-white text-xs font-bold font-mono">
                        {item.year}
                      </span>
                      <span className="text-xs px-2.5 py-0.5 rounded-md font-bold bg-emerald-50 text-emerald-700 border border-emerald-200 font-urdu">
                        {item.badge}
                      </span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-snug font-urdu">
                      {item.title}
                    </h3>
                    
                    {item.subtitle && (
                      <h4 className="text-xs sm:text-sm font-bold text-emerald-700 mt-1 mb-3 font-urdu">
                        {item.subtitle}
                      </h4>
                    )}

                    <p className="text-slate-600 text-sm sm:text-base leading-loose mt-2 font-urdu">
                      {item.description}
                    </p>

                    {item.bulletPoints && (
                      <div className="mt-4 pt-3.5 border-t border-slate-100 space-y-2.5">
                        {item.bulletPoints.map((pt, pIdx) => (
                          <div key={pIdx} className="flex items-start gap-2.5 text-xs sm:text-sm font-bold text-slate-800">
                            <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                            <span className="font-urdu">{pt}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Milestone Associated Leadership Thumbnails */}
                    {item.leaders && item.leaders.length > 0 && (
                      <div className="mt-4 pt-3.5 border-t border-slate-100">
                        <div className="text-[11px] font-bold text-slate-500 mb-2 font-urdu">
                          اس تاریخی مرحلے کی قیادت و شخصیات:
                        </div>
                        <div className={`grid grid-cols-1 ${item.leaders.length > 1 ? 'sm:grid-cols-2' : ''} gap-2.5`}>
                          {item.leaders.map((ldr, lIdx) => (
                            <Link 
                              key={lIdx} 
                              href={ldr.profileId ? `/faculty-profile?id=${ldr.profileId}` : '/faculty'}
                              className="flex items-center gap-2.5 p-2 rounded-xl bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 transition-all group"
                            >
                              <div className="w-11 h-13 rounded-lg overflow-hidden relative bg-slate-950 shrink-0 flex items-center justify-center border border-slate-200">
                                <OptimizedImage src={ldr.image} fill className="object-contain p-0.5" alt={ldr.name} />
                              </div>
                              <div className="flex-1 min-w-0">
                                <span className="text-xs font-bold text-slate-900 block truncate group-hover:text-emerald-800 font-urdu">{ldr.name}</span>
                                <span className="text-[10px] text-emerald-700 block truncate font-urdu">{ldr.role}</span>
                              </div>
                              <ChevronLeft size={13} className="text-slate-400 group-hover:text-emerald-700 transition-colors shrink-0" />
                            </Link>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Ending Legacy Badge (جامعہ شیرِ ربانی ورثہ) */}
            <div className="mt-14 text-center">
              <div className="inline-block p-6 sm:p-8 rounded-3xl bg-emerald-50 border border-emerald-200 max-w-2xl shadow-xs">
                <p className="text-lg sm:text-2xl font-black text-emerald-900 leading-snug font-urdu">
                  "جامعہ شیرِ ربانی – علم، ایمان اور خدمت کا ایک عظیم ورثہ"
                </p>
                <p className="text-xs sm:text-sm font-bold text-emerald-700 mt-2">
                  Jamia Sher-e-Rabbani – A Legacy of Knowledge, Faith, and Service
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* --- 4. ادارہ جاتی قیادت (Leadership in Urdu - Noori Nastaleeq) --- */}
        <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto">
            
            <div className="text-center max-w-3xl mx-auto mb-12">
              <span className="text-xs px-3.5 py-1 rounded-full font-bold uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 font-urdu">
                ادارہ جاتی قیادت • Institutional Leadership
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mt-3 font-urdu">
                جامعہ شیرِ ربانی کی مخلص قیادت و رہنمائی
              </h2>
              <p className="text-slate-600 text-sm sm:text-base mt-2 font-urdu">
                اکابرینِ اہلِ سنت کی فکری سرپرستی، چانسلر و وائس چانسلر کی رہنمائی اور مستحکم انتظامی ٹیم
              </p>
            </div>

            {/* Top Spiritual Patron Card: Huzoor Zia-ul-Ummat Justice Pir Muhammad Karam Shah Al-Azhari */}
            <div className="max-w-4xl mx-auto mb-10">
              <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-white border-2 border-amber-400/40 shadow-xl flex flex-col md:flex-row items-center gap-6 text-right" dir="rtl">
                <div className="relative w-36 sm:w-44 aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 shrink-0 border-2 border-amber-400/60 shadow-lg flex items-center justify-center">
                  <OptimizedImage
                    src="/gallery/1. حضور ضیاء الامت جسٹس پیر محمد کرم شاہ الازہری علیہ الرحمہ.jpeg"
                    alt="حضور ضیاء الامت جسٹس پیر محمد کرم شاہ الازہری علیہ الرحمہ"
                    fill
                    className="object-cover blur-xl opacity-35 scale-110 pointer-events-none"
                    aria-hidden
                  />
                  <OptimizedImage
                    src="/gallery/1. حضور ضیاء الامت جسٹس پیر محمد کرم شاہ الازہری علیہ الرحمہ.jpeg"
                    alt="حضور ضیاء الامت جسٹس پیر محمد کرم شاہ الازہری علیہ الرحمہ"
                    fill
                    section="faculty"
                    className="object-contain p-1.5 z-10 drop-shadow-md"
                  />
                </div>
                <div className="flex-1">
                  <span className="inline-block px-3 py-1 rounded-lg text-xs font-bold bg-amber-400 text-slate-950 mb-2 font-urdu">
                    <Crown size={13} className="inline ml-1 -mt-0.5" />
                    اکابرینِ اہلِ سنت و فکری پیشوا
                  </span>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-urdu leading-[1.8] mb-1">
                    حضور ضیاء الامت جسٹس پیر محمد کرم شاہ الازہری علیہ الرحمہ
                  </h3>
                  <p className="text-xs sm:text-sm font-bold text-amber-300 mb-2 font-urdu">
                    فکری و روحانی پیشوا، بانی و مفسرِ قرآن (تفسیر ضیاء القرآن و سیرت ضیاء النبی ﷺ)
                  </p>
                  <p className="text-xs sm:text-sm text-amber-100/90 leading-relaxed font-urdu mb-4">
                    مفسرِ قرآن، عظیم روحانی پیشوا، صاحبِ تفسیر ضیاء القرآن، مصنفِ ضیاء النبی ﷺ، بانی دار العلوم محمدیہ غوثیہ بھیرہ شریف و سابق جسٹس شریعت ایپلٹ بینچ سپریم کورٹ آف پاکستان۔ آپ کی علمی، فقہی اور باطنی فکر جامعہ شیرِ ربانی کے لیے ہمیشہ مشعلِ راہ ہے۔
                  </p>
                  <Link
                    href="/faculty-profile?id=8"
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs font-black shadow-md transition-all font-urdu"
                  >
                    <span>تفصیلی پروفائل دیکھیں</span>
                    <ChevronLeft size={13} />
                  </Link>
                </div>
              </div>
            </div>

            {/* 4 Core Leaders Grid: Chancellor, VC, Controller, Registrar */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
              
              {/* Leader 1: Chancellor */}
              <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-emerald-300 transition-all justify-between">
                <div className="flex flex-col items-center w-full">
                  <div className="relative w-44 sm:w-48 aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 mb-4 ring-2 ring-emerald-600/30 flex items-center justify-center border-2 border-white shadow-md">
                    <OptimizedImage 
                      src="/gallery/1.1مولانا الحاج صوبیدار محمد یوسف نقشبندی مجددی صاحب.jpeg" 
                      alt="" 
                      fill 
                      className="object-cover blur-xl opacity-35 scale-110 pointer-events-none" 
                      aria-hidden 
                    />
                    <OptimizedImage 
                      src="/gallery/1.1مولانا الحاج صوبیدار محمد یوسف نقشبندی مجددی صاحب.jpeg" 
                      alt="مولانا الحاج صوبیدار محمد یوسف نقشبندی مجددی صاحب" 
                      fill 
                      section="faculty"
                      className="object-contain p-1.5 z-10 drop-shadow-md group-hover:scale-102 transition-transform duration-300" 
                    />
                  </div>
                  <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-900 border border-emerald-300 mb-2 font-urdu">
                    چانسلر و سرپرستِ اعلیٰ
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 font-urdu leading-[1.8]">
                    مولانا الحاج صوبیدار محمد یوسف نقشبندی مجددی صاحب
                  </h3>
                  <p className="text-xs font-bold text-emerald-700 mt-0.5 mb-2.5 font-urdu">
                    چانسلر، جامعہ شیرِ ربانی
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-urdu text-justify" dir="rtl">
                    آپ ۳۰ سالہ عسکری نظم و ضبط اور ۲۴ سالہ دینی اخلاص، اور سلسلہ عالیہ نقشبندیہ مجددیہ کے روحانی فیضان کے امین ہیں۔ جامعہ شیرِ ربانی کے قیام، فکری تسلسل اور ہمہ جہت تعلیمی و رفاہی ترقی میں آپ کی مخلصانہ سرپرستی ادارے کے لیے بیش قیمت اثاثہ ہے۔
                  </p>
                </div>
                <Link
                  href="/faculty-profile?id=14"
                  className="mt-5 inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs transition-colors font-urdu"
                >
                  <span>تفصیلی پروفائل دیکھیں</span>
                  <ChevronLeft size={13} />
                </Link>
              </div>

              {/* Leader 2: Vice Chancellor & Dean */}
              <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-emerald-300 transition-all justify-between">
                <div className="flex flex-col items-center w-full">
                  <div className="relative w-44 sm:w-48 aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 mb-4 ring-2 ring-emerald-600/30 flex items-center justify-center border-2 border-white shadow-md">
                    <OptimizedImage 
                      src="/gallery/2. ڈاکٹر پیر ابو احمد فاروق علی ربانی صاحب (جدید).jpeg" 
                      alt="" 
                      fill 
                      className="object-cover blur-xl opacity-35 scale-110 pointer-events-none" 
                      aria-hidden 
                    />
                    <OptimizedImage 
                      src="/gallery/2. ڈاکٹر پیر ابو احمد فاروق علی ربانی صاحب (جدید).jpeg" 
                      alt="ڈاکٹر پیر ابو احمد فاروق علی ربانی صاحب" 
                      fill 
                      section="faculty"
                      className="object-contain p-1.5 z-10 drop-shadow-md group-hover:scale-102 transition-transform duration-300" 
                    />
                  </div>
                  <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 text-teal-900 border border-teal-300 mb-2 font-urdu">
                    وائس چانسلر و ڈین آف اسلامک اسٹڈیز
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 font-urdu leading-[1.8]">
                    ڈاکٹر پیر ابو احمد فاروق علی ربانی صاحب
                  </h3>
                  <p className="text-xs font-bold text-teal-700 mt-0.5 mb-2.5 font-urdu">
                    وائس چانسلر و ڈین (2008ء تا حال)
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-urdu text-justify" dir="rtl">
                    جامعہ شیرِ ربانی کے وائس چانسلر و ڈین ہیں۔ ڈاکٹر صاحب نے جامعہ کے تعلیمی ارتقاء، صحاحِ ستہ کی تدریس، جدید نصابی اصلاحات، اور وفاق المدارس الاسلامیہ الرضویہ و وزارتِ تعلیم سے الحاق میں کلیدی اور قائدانہ کردار ادا فرمایا۔
                  </p>
                </div>
                <Link
                  href="/faculty-profile?id=1"
                  className="mt-5 inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-xs transition-colors font-urdu"
                >
                  <span>تفصیلی پروفائل دیکھیں</span>
                  <ChevronLeft size={13} />
                </Link>
              </div>

              {/* Leader 3: Controller of Examinations */}
              <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-emerald-300 transition-all justify-between">
                <div className="flex flex-col items-center w-full">
                  <div className="relative w-44 sm:w-48 aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 mb-4 ring-2 ring-emerald-600/30 flex items-center justify-center border-2 border-white shadow-md">
                    <OptimizedImage 
                      src="/gallery/3. hafiz ahmad ali.jpeg" 
                      alt="" 
                      fill 
                      className="object-cover blur-xl opacity-35 scale-110 pointer-events-none" 
                      aria-hidden 
                    />
                    <OptimizedImage 
                      src="/gallery/3. hafiz ahmad ali.jpeg" 
                      alt="اسلامک اسکالر حافظ القاری محمد احمد ربانی صاحب" 
                      fill 
                      section="faculty"
                      className="object-contain p-1.5 z-10 drop-shadow-md group-hover:scale-102 transition-transform duration-300" 
                    />
                  </div>
                  <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-teal-100 text-teal-900 border border-teal-300 mb-2 font-urdu">
                    کنٹرولر امتحانات و ناظمِ تعلیمات
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 font-urdu leading-[1.8]">
                    اسلامک اسکالر حافظ القاری محمد احمد ربانی صاحب
                  </h3>
                  <p className="text-xs font-bold text-teal-700 mt-0.5 mb-2.5 font-urdu">
                    کنٹرولر امتحانات و ناظمِ تعلیمات (2022ء تا حال)
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-urdu text-justify" dir="rtl">
                    جامعہ شیرِ ربانی کے کنٹرولر امتحانات اور ناظمِ تعلیمات ہیں۔ روزمرہ کے تدریسی نظم و ضبط، تمام شعبہ جات (درسِ نظامی، حفظ و تجوید، تخصصات) کے سالانہ امتحانات کے انعقاد اور طلبہ کے امتحانی ریکارڈ و شفافیت کی مکمل نگرانی فرماتے ہیں۔
                  </p>
                </div>
                <Link
                  href="/faculty-profile?id=4"
                  className="mt-5 inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-teal-700 hover:bg-teal-800 text-white text-xs font-bold shadow-xs transition-colors font-urdu"
                >
                  <span>تفصیلی پروفائل دیکھیں</span>
                  <ChevronLeft size={13} />
                </Link>
              </div>

              {/* Leader 4: Registrar, Treasurer & Chairperson */}
              <div className="p-5 sm:p-6 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col items-center text-center group hover:border-emerald-300 transition-all justify-between">
                <div className="flex flex-col items-center w-full">
                  <div className="relative w-44 sm:w-48 aspect-[4/5] rounded-2xl overflow-hidden bg-slate-950 mb-4 ring-2 ring-emerald-600/30 flex items-center justify-center border-2 border-white shadow-md">
                    <OptimizedImage 
                      src="/gallery/4. abubakar-siddique.jpeg" 
                      alt="" 
                      fill 
                      className="object-cover blur-xl opacity-35 scale-110 pointer-events-none" 
                      aria-hidden 
                    />
                    <OptimizedImage 
                      src="/gallery/4. abubakar-siddique.jpeg" 
                      alt="پروفیسر ابوبکر صدیق ربانی صاحب" 
                      fill 
                      section="faculty"
                      className="object-contain p-1.5 z-10 drop-shadow-md group-hover:scale-102 transition-transform duration-300" 
                    />
                  </div>
                  <span className="px-3 py-0.5 rounded-full text-[11px] font-bold bg-blue-100 text-blue-900 border border-blue-300 mb-2 font-urdu">
                    رجسٹرار، خزانچی، چیئرپرسن و نگرانِ جملہ شعبہ جات
                  </span>
                  <h3 className="text-base sm:text-lg font-black text-slate-900 font-urdu leading-[1.8]">
                    پروفیسر ابوبکر صدیق ربانی صاحب
                  </h3>
                  <p className="text-xs font-bold text-blue-700 mt-0.5 mb-2.5 font-urdu">
                    رجسٹرار، خزانچی و چیئرپرسن (2022ء تا حال)
                  </p>
                  <p className="text-xs text-slate-600 leading-relaxed font-urdu text-justify" dir="rtl">
                    جامعہ شیرِ ربانی کے رجسٹرار، خزانچی، چیئرپرسن اور تمام شعبہ جات کے نگران ہیں۔ ادارے کا تمام تیکنیکی، مالیاتی، انتظامی اور رجسٹرار شپ کا مربوط نظام، یونیورسٹی پورٹل، کلاؤڈ سسٹمز اور آئی ٹی انٹرن شپ پروگرام آپ کی زیرِ نگرانی ہے۔
                  </p>
                </div>
                <Link
                  href="/faculty-profile?id=3"
                  className="mt-5 inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-blue-700 hover:bg-blue-800 text-white text-xs font-bold shadow-xs transition-colors font-urdu"
                >
                  <span>تفصیلی پروفائل دیکھیں</span>
                  <ChevronLeft size={13} />
                </Link>
              </div>

            </div>
          </div>
        </section>

        {/* --- 5. اہم اعداد و شمار (Stats - Noori Nastaleeq) --- */}
        <section className="py-14 px-4 sm:px-6 lg:px-8 bg-emerald-800 text-white">
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 text-center">
            <div>
              <div className="text-3xl sm:text-5xl font-black text-amber-300 mb-1 font-mono">1992ء</div>
              <div className="text-xs sm:text-sm font-bold text-emerald-100 font-urdu">سَنِ تاسیس • Founded</div>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-black text-amber-300 mb-1 font-mono">500+</div>
              <div className="text-xs sm:text-sm font-bold text-emerald-100 font-urdu">زیرِ تعلیم طلبہ • Current Students</div>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-black text-amber-300 mb-1 font-mono">2,000+</div>
              <div className="text-xs sm:text-sm font-bold text-emerald-100 font-urdu">فارغ التحصیل علماء • Graduates</div>
            </div>
            <div>
              <div className="text-3xl sm:text-5xl font-black text-amber-300 mb-1 font-mono">12+</div>
              <div className="text-xs sm:text-sm font-bold text-emerald-100 font-urdu">شعبہ جات • Specialized Programs</div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
