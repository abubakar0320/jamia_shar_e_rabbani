'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  GraduationCap, Mail, Phone, ChevronLeft, 
  BookOpen, ShieldCheck, Sparkles, 
  Building2, Crown, Layers, Award
} from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';

export interface FacultyMember {
  id: number;
  name: string;
  role: string;
  tier: 'akabir' | 'chancellor' | 'officers' | 'professor';
  tierLabel: string;
  tierBadgeColor: string;
  department: string;
  departmentColor: string;
  education: string;
  specialization: string;
  image: string;
  email?: string;
  contact?: string;
}

export default function Faculty() {
  const staticFaculty: FacultyMember[] = [
    // --- TIER 1: AKABIR-E-AHL-E-SUNNAT (اکابرینِ اہلِ سنت و روحانی پیشوا) ---
    {
      id: 8,
      name: 'حضور ضیاء الامت جسٹس پیر محمد کرم شاہ الازہری علیہ الرحمہ',
      role: 'فکری و روحانی پیشوا، بانی و مفسرِ قرآن (اکابرینِ اہلِ سنت)',
      tier: 'akabir',
      tierLabel: 'اکابرینِ اہلِ سنت و فکری پیشوا',
      tierBadgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      department: 'اکابرینِ اہلِ سنت و مرجعِ علمی و روحانی',
      departmentColor: 'bg-amber-50 text-amber-800 border-amber-200',
      education: 'جامعہ الازہر مصر (ایم اے) و دار العلوم دیوبند',
      specialization: 'تفسیرِ قرآن، سیرت نگاری، اسلامی عدالتی قوانین و تقابلی شریعت',
      image: '/gallery/1. حضور ضیاء الامت جسٹس پیر محمد کرم شاہ الازہری علیہ الرحمہ.jpeg',
      email: 'jamiashererabbani07@gmail.com',
      contact: '03144081516'
    },

    // --- TIER 2: CHANCELLOR, VICE CHANCELLOR & DEAN (چانسلر، وائس چانسلر و ڈین) ---
    {
      id: 14,
      name: 'مولانا الحاج صوبیدار محمد یوسف نقشبندی مجددی صاحب',
      role: 'چانسلر و سرپرستِ اعلیٰ، جامعہ شیرِ ربانی',
      tier: 'chancellor',
      tierLabel: 'چانسلر (Chancellor)',
      tierBadgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      department: 'دفترِ چانسلر و مجلسِ اعلٰی (Office of the Chancellor)',
      departmentColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      education: 'فاضل علومِ اسلامیہ، عسکری نظم و ضبط و سلاسلِ طریقت نقشبندیہ مجددیہ',
      specialization: 'سرپرستیِ ادارہ، فکری و انتظامی رہنمائی، نظم و نسق اور سلسلہ عالیہ نقشبندیہ',
      image: '/gallery/1.1مولانا الحاج صوبیدار محمد یوسف نقشبندی مجددی صاحب.jpeg',
      email: 'jamiashererabbani07@gmail.com',
      contact: '03144081516'
    },
    {
      id: 1,
      name: 'ڈاکٹر پیر ابو احمد فاروق علی ربانی نقشبندی مجددی صاحب',
      role: 'وائس چانسلر و ڈینِ فیکلٹی آف اسلامک اسٹڈیز، جامعہ شیرِ ربانی',
      tier: 'chancellor',
      tierLabel: 'وائس چانسلر و ڈین (VC & Dean)',
      tierBadgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
      department: 'دفترِ وائس چانسلر و ڈین آف اسلامک اسٹڈیز',
      departmentColor: 'bg-teal-50 text-teal-800 border-teal-200',
      education: 'پی ایچ ڈی علومِ اسلامیہ | تخصص فی الحدیث و درسِ نظامی (عالمیہ)',
      specialization: 'علومِ حدیث، تفاسیرِ قرآن، فقہِ اسلامی، نصابی اصلاحات و یونیورسٹی ایڈمنسٹریشن',
      image: '/gallery/2. ڈاکٹر پیر ابو احمد فاروق علی ربانی صاحب.jpeg',
      email: 'jamiashererabbani07@gmail.com',
      contact: '03144081516'
    },

    // --- TIER 3: OFFICERS OF THE JAMIA (کنٹرولر امتحانات، رجسٹرار، خزانچی و HOD فار آل) ---
    {
      id: 4,
      name: 'اسلامک اسکالر حافظ القاری محمد احمد ربانی صاحب',
      role: 'کنٹرولر امتحانات و ناظمِ تعلیمات (Controller of Examinations & Director of Education)',
      tier: 'officers',
      tierLabel: 'کنٹرولر امتحانات و ناظمِ تعلیمات (Controller & Director of Education)',
      tierBadgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
      department: 'دفترِ کنٹرولر امتحانات و نظامتِ تعلیمات (Examinations & Academics)',
      departmentColor: 'bg-teal-50 text-teal-800 border-teal-200',
      education: 'الشہادۃ العالمیہ فی العلوم الاسلامیہ والعربیۃ | حفظ و قرآت سبعہ عشرہ',
      specialization: 'امتحانی کنٹرول و شفافیت، نصاب سازی، تعلیمی نظم و ضبط اور طلبہ کونسلنگ',
      image: '/gallery/3. hafiz ahmad ali.jpeg',
      email: 'jamiashererabbani07@gmail.com',
      contact: '+966540532511'
    },
    {
      id: 3,
      name: 'پروفیسر ابوبکر صدیق ربانی صاحب',
      role: 'رجسٹرار، خزانچی، چیئرپرسن و ہیڈ آف ڈیپارٹمنٹس (HOD for All)',
      tier: 'officers',
      tierLabel: 'رجسٹرار، خزانچی، چیئرپرسن و HOD فار آل',
      tierBadgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      department: 'مرکزی سیکرٹریٹ: رجسٹرار، خزانچی، چیئرپرسن و آئی ٹی سسٹمز',
      departmentColor: 'bg-blue-50 text-blue-800 border-blue-200',
      education: 'بی ایس انفارمیشن ٹیکنالوجی (BSIT)، بابا گرو نانک یونیورسٹی | گوگل و سسکو سرٹیفائیڈ',
      specialization: 'یونیورسٹی رجسٹرار شپ، مالیاتی نظم و نسق (Treasurer)، چیئرپرسن شپ، تمام شعبہ جات کی نگرانی (HOD for All) و کلاؤڈ سسٹمز',
      image: '/gallery/4. abubakar-siddique.jpeg',
      email: 'abubakr.bgnu@gmail.com',
      contact: '03097354874'
    },

    // --- TIER 4: PROFESSORS & TEACHING FACULTY (پروفیسرز و تدریسی فیکلٹی) ---
    {
      id: 13,
      name: 'پروفیسر ڈاکٹر مفتی محمد امین بھٹی صاحب',
      role: 'پروفیسر، بین الاقوامی محقق و مفتیِ اعظم',
      tier: 'professor',
      tierLabel: 'پروفیسر (Professor)',
      tierBadgeColor: 'bg-indigo-100 text-indigo-900 border-indigo-300',
      department: 'شعبہ تحقیق، پی ایچ ڈی اسٹڈیز و بین الاقوامی افتاء',
      departmentColor: 'bg-indigo-50 text-indigo-800 border-indigo-200',
      education: 'پی ایچ ڈی علومِ اسلامیہ، ایم فل، الشہادۃ العالمیہ',
      specialization: 'بین الاقوامی اسلامی قوانین، عصری فقہی اجتہاد، یونیورسٹی لیول ریسرچ',
      image: '/gallery/13. Prof. Dr. Mufti Muhammad Ameen Bhatti Sahib.png',
      email: 'jamiashererabbani07@gmail.com',
      contact: '03144081516'
    },
    {
      id: 5,
      name: 'پروفیسر پیر سید افتخار الحسن شاہ صاحب',
      role: 'پروفیسر، سجادہ نشین آستانہ عالیہ و روحانی مربی',
      tier: 'professor',
      tierLabel: 'پروفیسر (Professor)',
      tierBadgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      department: 'شعبہ تصوف، اخلاقیات و روحانیات',
      departmentColor: 'bg-purple-50 text-purple-800 border-purple-200',
      education: 'علومِ دینیہ و تصوف، سلاسلِ طریقت',
      specialization: 'تزکیہ نفس، تصوف و اخلاق، خانقاہی نظام اور فکری رہنمائی',
      image: '/gallery/5. Peer Syed Iftikhar ul hassan shah.jpeg',
      email: 'jamiashererabbani07@gmail.com',
      contact: '03144081516'
    },
    {
      id: 6,
      name: 'پروفیسر مفتی محافظ القاری مولانا محمد کاشف رفیق انجم (خطیبِ اعظم سرگودھا)',
      role: 'پروفیسر، خطیبِ اعظم سرگودھا، مناظرِ اسلام و مفتیِ شریعت',
      tier: 'professor',
      tierLabel: 'پروفیسر (Professor)',
      tierBadgeColor: 'bg-violet-100 text-violet-900 border-violet-300',
      department: 'شعبہ دعوت، خطابت، علم الکلام و مناظرہ',
      departmentColor: 'bg-violet-50 text-violet-800 border-violet-200',
      education: 'الشہادۃ العالمیہ فی العلوم الاسلامیہ، تخصص فی الفقہ والافتاء',
      specialization: 'خطابت و بلاغت، تقابلِ ادیان، فقہِ حنفی اور مناظرہ و کلام',
      image: '/gallery/6. Mufti Mohafiz al qari molana muhammad kashif rafique anjum al maroof katib ibn katib katib azam sarghooda.jpeg',
      email: 'jamiashererabbani07@gmail.com',
      contact: '03144081516'
    },
    {
      id: 7,
      name: 'پروفیسر پیر مفتی علامہ حافظ سید محمد احمد جامی شاہ نقشبندی مجددی',
      role: 'پروفیسر، پیرِ طریقت، مفتیِ اعظم و سجادہ نشین',
      tier: 'professor',
      tierLabel: 'پروفیسر (Professor)',
      tierBadgeColor: 'bg-rose-100 text-rose-900 border-rose-300',
      department: 'شعبہ تحفیظ القرآن، حسنِ قرآت و تزکیہ سلوک',
      departmentColor: 'bg-rose-50 text-rose-800 border-rose-200',
      education: 'الشہادۃ العالمیہ، حفظِ قرآنِ مجید، تخصص فی الفقہ والافتاء',
      specialization: 'سلسلہ عالیہ نقشبندیہ مجددیہ، افتاء، تجوید و حفظ اور ارشاد',
      image: '/gallery/7. Peer Mufti Allama Molana Hafiz Al Qari Syed Muhammad Ahmad Al maroof Jami Shah Naqshbandi Mujadadi.jpeg',
      email: 'jamiashererabbani07@gmail.com',
      contact: '03144081516'
    },
    {
      id: 2,
      name: 'پروفیسر مولانا مفتی علی حمزہ صاحب',
      role: 'پروفیسر، استاذ الحدیث، شعبہ درسِ نظامی و دار الافتاء',
      tier: 'professor',
      tierLabel: 'پروفیسر (Professor)',
      tierBadgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      department: 'شعبہ درسِ نظامی و علومِ شریعہ',
      departmentColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      education: 'عالمیہ (درسِ نظامی) و تخصص فی الفقہ',
      specialization: 'فقہِ اسلامی، اصولِ فقہ، نحو و صرف اور عربی ادب',
      image: '/gallery/8. ali-hamza.jpeg',
      email: 'jamiashererabbani07@gmail.com',
      contact: '03144081516'
    },
    {
      id: 9,
      name: 'پروفیسر پیر مفتی مولانا رانا محمد مبشر اکرم نقشبندی مجددی',
      role: 'پروفیسر، پیرِ طریقت، محقق علومِ اسلامیہ و سینئر فیکلٹی',
      tier: 'professor',
      tierLabel: 'پروفیسر (Professor)',
      tierBadgeColor: 'bg-cyan-100 text-cyan-900 border-cyan-300',
      department: 'شعبہ اسلامیات، تقابلِ ادیان و معاصر علوم',
      departmentColor: 'bg-cyan-50 text-cyan-800 border-cyan-200',
      education: 'ایم فل / پی ایچ ڈی اسکالر علومِ اسلامیہ، الشہادۃ العالمیہ (درسِ نظامی)',
      specialization: 'یونیورسٹی سطح کی تدریس، تقابلی ادیان، فقہ اور سلسلہ نقشبندیہ',
      image: '/gallery/9. Prof. Peer Mufti Molana Rana Muhammad Mubashar Akram Naqsbandi Mujaddadi.jpeg',
      email: 'jamiashererabbani07@gmail.com',
      contact: '03144081516'
    },
    {
      id: 11,
      name: 'پروفیسر مفتی علامہ علی مرتضیٰ سیالوی (استاذ العلماء)',
      role: 'پروفیسر، استاذ العلماء، شعبہ اصولِ فقہ و منطق',
      tier: 'professor',
      tierLabel: 'پروفیسر (Professor)',
      tierBadgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
      department: 'شعبہ اصولِ فقہ، منطق و علومِ عقلیہ',
      departmentColor: 'bg-teal-50 text-teal-800 border-teal-200',
      education: 'الشہادۃ العالمیہ فی العلوم الاسلامیہ، تخصص فی الفقہ والاصول',
      specialization: 'اصولِ فقہ، نحو و صرف، منطق و فلسفہ اور علمی مناظرہ',
      image: '/gallery/11. Mufti Allama Ali Murtaza Sialwi.jpeg',
      email: 'jamiashererabbani07@gmail.com',
      contact: '03144081516'
    },
    {
      id: 10,
      name: 'پروفیسر مفتی علامہ ذیشان علی چشتی صابری',
      role: 'پروفیسر، مفتی و محقق، شعبہ افتاء و میراث',
      tier: 'professor',
      tierLabel: 'پروفیسر (Professor)',
      tierBadgeColor: 'bg-sky-100 text-sky-900 border-sky-300',
      department: 'دار الافتاء و شعبہ علم الفرائض و میراث',
      departmentColor: 'bg-sky-50 text-sky-800 border-sky-200',
      education: 'عالمیہ (درسِ نظامی)، تخصص فی الفقہ الاسلامی',
      specialization: 'فقہی فتاویٰ، فرائض و میراث، عقائد و کلام اور خطابت',
      image: '/gallery/10. Mufti Allama Zeeshan Ali Chisti Sabri.jpeg',
      email: 'jamiashererabbani07@gmail.com',
      contact: '03144081516'
    },
    {
      id: 12,
      name: 'پروفیسر مفتی علامہ اسد عباس چشتی',
      role: 'پروفیسر، مدرسِ درسِ نظامی، تجوید و سیرتِ طیبہ',
      tier: 'professor',
      tierLabel: 'پروفیسر (Professor)',
      tierBadgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      department: 'شعبہ فقہ، تجوید القرآن و سیرت النبی ﷺ',
      departmentColor: 'bg-amber-50 text-amber-800 border-amber-200',
      education: 'عالمیہ (درسِ نظامی)، تخصص فی الفقہ والافتاء',
      specialization: 'فقہِ اسلامی، تجوید و قرآت، سیرت النبی ﷺ اور تدریسِ کتب',
      image: '/gallery/12. Mufti Allama Asad Abbas Chisti.jpeg',
      email: 'jamiashererabbani07@gmail.com',
      contact: '03144081516'
    }
  ];

  const [selectedTier, setSelectedTier] = useState<string>('all');
  const [faculty, setFaculty] = useState<FacultyMember[]>(staticFaculty);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setFaculty(staticFaculty);
  }, []);

  const TIERS_CONFIG = [
    {
      id: 'akabir',
      title: 'اکابرینِ اہلِ سنت و روحانی پیشوا (Akabir-e-Ahl-e-Sunnat)',
      subtitle: 'جامعہ شیرِ ربانی کے فکری و روحانی مرجع اور مفسرِ قرآن جن کے علمی و باطنی فیضان سے ادارہ منور ہے',
      badge: 'اکابرینِ اہلِ سنت',
      headerBg: 'bg-gradient-to-r from-amber-950 via-amber-900 to-amber-950 text-white',
      badgeBg: 'bg-amber-400 text-slate-950',
      icon: <Crown size={22} className="text-amber-300 shrink-0" />
    },
    {
      id: 'chancellor',
      title: 'چانسلر، وائس چانسلر و ڈین (Chancellor, Vice Chancellor & Dean)',
      subtitle: 'جامعہ شیرِ ربانی کی سپریم قیادت، چانسلر شپ، وائس چانسلر شپ اور ڈین آف فیکلٹی',
      badge: 'چانسلر و وائس چانسلر / ڈین',
      headerBg: 'bg-gradient-to-r from-emerald-950 via-emerald-900 to-teal-950 text-white',
      badgeBg: 'bg-emerald-400 text-slate-950',
      icon: <ShieldCheck size={22} className="text-emerald-300 shrink-0" />
    },
    {
      id: 'officers',
      title: 'کنٹرولر امتحانات، رجسٹرار، خزانچی و ہیڈ آف ڈیپارٹمنٹس (Officers of the Jamia)',
      subtitle: 'جامعہ کے امتحانی، تعلیمی، رجسٹرار، مالیاتی، اور تمام شعبہ جات کی ہمہ گیر انتظامی و تیکنیکی قیادت (HOD for All)',
      badge: 'کنٹرولر امتحانات، رجسٹرار و HOD فار آل',
      headerBg: 'bg-gradient-to-r from-teal-950 via-teal-900 to-slate-950 text-white',
      badgeBg: 'bg-teal-400 text-slate-950',
      icon: <Building2 size={22} className="text-teal-300 shrink-0" />
    },
    {
      id: 'professor',
      title: 'پروفیسرز و تدریسی فیکلٹی (Professors & Teaching Faculty)',
      subtitle: 'علومِ شریعہ، فقہ، حدیث، تفسیر، تحقیق، خطابت اور قرآنی علوم کے جلیل القدر پروفیسرز اور شیوخِ کرام',
      badge: 'پروفیسرز فیکلٹی',
      headerBg: 'bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white',
      badgeBg: 'bg-sky-400 text-slate-950',
      icon: <BookOpen size={22} className="text-sky-300 shrink-0" />
    }
  ];

  const tierCounts = useMemo(() => {
    const counts: Record<string, number> = { all: faculty.length };
    faculty.forEach(m => {
      counts[m.tier] = (counts[m.tier] || 0) + 1;
    });
    return counts;
  }, [faculty]);

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-white" dir="rtl">
        <Header />
        <main className="flex-1 min-h-[500px]" />
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/40 font-urdu selection:bg-emerald-100 selection:text-emerald-900" dir="rtl">
      <Header />
      
      <main className="flex-1 bg-transparent text-slate-900">
        
        {/* --- 1. HERO SECTION (OPTIMIZED FOR MOBILE & DESKTOP) --- */}
        <section className="relative pt-12 sm:pt-16 md:pt-20 pb-10 sm:pb-14 border-b border-slate-200 bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-900 text-white overflow-hidden text-right">
          <div className="absolute top-0 right-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-72 sm:w-96 h-72 sm:h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-800/60 border border-emerald-400/30 text-amber-300 text-xs sm:text-sm font-bold mb-3 sm:mb-4 shadow-sm">
                <Sparkles size={14} className="text-amber-400 shrink-0" />
                <span>جامعہ شیرِ ربانی کی باوقار علمی و ادارتی تنظیمی ساخت (Faculty Hierarchy)</span>
              </div>

              <h1 className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.8] sm:leading-[1.9] md:leading-[2.1] mb-3 sm:mb-4">
                جامعہ کی فیکلٹی، شعبہ جات اور تنظیمی قیادت
              </h1>

              <p className="text-xs sm:text-base md:text-lg text-emerald-100/90 leading-[2.1] sm:leading-[2.2] md:leading-[2.3] max-w-3xl mx-auto mb-6 sm:mb-8 px-2">
                اکابرینِ اہلِ سنت کی فکری سرپرستی، چانسلر و وائس چانسلر / ڈین کی رہنمائی، کنٹرولر امتحانات و رجسٹرار / HOD کی مستحکم انتظامیہ اور متبحر پروفیسرز کا مربوط تنظیمی ڈھانچہ۔
              </p>

              {/* Organizational Flow Visualizer - Fully Responsive (2x2 on mobile, 4 in row on desktop) */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-3 sm:p-5 border border-white/15 max-w-4xl mx-auto shadow-2xl">
                <div className="text-xs sm:text-sm font-bold text-amber-300 mb-2.5 sm:mb-3 text-center">
                  جامعہ کی ادارتی و تعلیمی درجہ بندی کا فلو چارٹ (Organizational Hierarchy)
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm font-bold">
                  <div className="bg-amber-400/20 border border-amber-400/40 rounded-xl p-2.5 sm:p-3 flex flex-col items-center justify-center text-amber-200 text-center">
                    <Crown size={18} className="text-amber-300 mb-1 shrink-0" />
                    <span className="leading-tight">۱. اکابرینِ اہلِ سنت</span>
                    <span className="text-[10px] text-amber-300/80 mt-0.5 font-sans">Spiritual Fountainhead</span>
                  </div>
                  <div className="bg-emerald-400/20 border border-emerald-400/40 rounded-xl p-2.5 sm:p-3 flex flex-col items-center justify-center text-emerald-200 text-center">
                    <ShieldCheck size={18} className="text-emerald-300 mb-1 shrink-0" />
                    <span className="leading-tight">۲. چانسلر و وائس چانسلر</span>
                    <span className="text-[10px] text-emerald-300/80 mt-0.5 font-sans">Chancellor, VC & Dean</span>
                  </div>
                  <div className="bg-teal-400/20 border border-teal-400/40 rounded-xl p-2.5 sm:p-3 flex flex-col items-center justify-center text-teal-200 text-center">
                    <Building2 size={18} className="text-teal-300 mb-1 shrink-0" />
                    <span className="leading-tight">۳. کنٹرولر، رجسٹرار و HOD</span>
                    <span className="text-[10px] text-teal-300/80 mt-0.5 font-sans">Controller, Registrar & HOD</span>
                  </div>
                  <div className="bg-sky-400/20 border border-sky-400/40 rounded-xl p-2.5 sm:p-3 flex flex-col items-center justify-center text-sky-200 text-center">
                    <BookOpen size={18} className="text-sky-300 mb-1 shrink-0" />
                    <span className="leading-tight">۴. پروفیسرز و فیکلٹی</span>
                    <span className="text-[10px] text-sky-300/80 mt-0.5 font-sans">Teaching Faculty</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- 2. HIERARCHY FILTER BAR (STICKY & TOUCH-FRIENDLY) --- */}
        <section className="bg-white/95 backdrop-blur-md border-b border-slate-200 sticky top-0 z-30 shadow-xs">
          <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 py-2.5 sm:py-3.5">
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 scrollbar-none">
              <button
                onClick={() => setSelectedTier('all')}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                  selectedTier === 'all'
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20 scale-102'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Layers size={15} />
                <span>تمام فیکلٹی ({tierCounts.all})</span>
              </button>

              <button
                onClick={() => setSelectedTier('akabir')}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                  selectedTier === 'akabir'
                    ? 'bg-amber-700 text-white shadow-md shadow-amber-700/20 scale-102'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Crown size={15} />
                <span>اکابرینِ اہلِ سنت ({tierCounts.akabir || 0})</span>
              </button>

              <button
                onClick={() => setSelectedTier('chancellor')}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                  selectedTier === 'chancellor'
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20 scale-102'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <ShieldCheck size={15} />
                <span>چانسلر، وائس چانسلر و ڈین ({tierCounts.chancellor || 0})</span>
              </button>

              <button
                onClick={() => setSelectedTier('officers')}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                  selectedTier === 'officers'
                    ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20 scale-102'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Building2 size={15} />
                <span>کنٹرولر، رجسٹرار و HOD ({tierCounts.officers || 0})</span>
              </button>

              <button
                onClick={() => setSelectedTier('professor')}
                className={`inline-flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                  selectedTier === 'professor'
                    ? 'bg-sky-700 text-white shadow-md shadow-sky-700/20 scale-102'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <BookOpen size={15} />
                <span>پروفیسرز ({tierCounts.professor || 0})</span>
              </button>
            </div>
          </div>
        </section>

        {/* --- 3. TIERED FACULTY SECTIONS (HIERARCHY LAYOUT) --- */}
        <section className="py-8 sm:py-12 md:py-16 px-3 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto space-y-10 sm:space-y-16">
            
            {TIERS_CONFIG.map((tierConfig) => {
              if (selectedTier !== 'all' && selectedTier !== tierConfig.id) {
                return null;
              }

              const tierMembers = faculty.filter(m => m.tier === tierConfig.id);
              if (tierMembers.length === 0) return null;

              return (
                <div key={tierConfig.id} className="scroll-mt-20">
                  {/* Tier Header Banner */}
                  <div className={`p-4 sm:p-6 md:p-7 rounded-2xl sm:rounded-3xl ${tierConfig.headerBg} shadow-lg mb-6 sm:mb-8 flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 border-2 border-white/20`}>
                    <div className="flex items-start sm:items-center gap-3">
                      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl sm:rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0 mt-1 sm:mt-0">
                        {tierConfig.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[10px] sm:text-[11px] font-bold px-2.5 sm:px-3 py-0.5 rounded-full font-urdu ${tierConfig.badgeBg}`}>
                            {tierConfig.badge}
                          </span>
                          <span className="text-[11px] sm:text-xs text-white/80 font-sans font-bold">
                            ({tierMembers.length} ارکان)
                          </span>
                        </div>
                        <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white leading-[1.8] sm:leading-[1.9]">
                          {tierConfig.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-white/85 leading-relaxed mt-1 max-w-3xl">
                          {tierConfig.subtitle}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Tier Cards Grid - Responsive Grid Structure */}
                  <div className={`grid grid-cols-1 sm:grid-cols-2 ${
                    tierMembers.length === 1 ? 'max-w-md mx-auto sm:grid-cols-1' :
                    tierMembers.length === 2 ? 'lg:grid-cols-2 max-w-4xl mx-auto' :
                    tierMembers.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-3 xl:grid-cols-4'
                  } gap-4 sm:gap-6`}>
                    {tierMembers.map((member, i) => (
                      <motion.div 
                        key={member.id}
                        initial={{ opacity: 0, y: 15 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.05, duration: 0.35 }}
                        className="flex flex-col bg-white border border-slate-200/90 shadow-xs hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300 group hover:border-emerald-300"
                      >
                        {/* Faculty Portrait Image */}
                        <div className="w-full aspect-[706/1024] overflow-hidden relative bg-slate-900 shrink-0">
                          <OptimizedImage 
                            src={member.image}
                            alt={member.name}
                            fill
                            section="faculty"
                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                          
                          {/* Top Badges on Image */}
                          <div className="absolute top-2.5 sm:top-3 right-2.5 sm:right-3 left-2.5 sm:left-3 flex flex-wrap items-center justify-between gap-1.5 pointer-events-none z-10">
                            <span className={`text-[10px] sm:text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-md ${member.tierBadgeColor} leading-normal`}>
                              {member.tierLabel}
                            </span>
                          </div>
                        </div>
                        
                        {/* Faculty Information Body */}
                        <div className="p-4 sm:p-5 flex flex-col justify-between flex-1 text-right bg-white">
                          <div>
                            {/* Department Badge */}
                            <div className="mb-2">
                              <span className={`text-[10px] sm:text-[11px] font-bold px-2.5 py-0.5 rounded-md border inline-block leading-normal max-w-full truncate ${member.departmentColor}`}>
                                <Building2 size={11} className="inline ml-1 -mt-0.5" />
                                {member.department}
                              </span>
                            </div>

                            {/* Name */}
                            <h3 className="text-base sm:text-lg md:text-xl font-black text-slate-900 mb-1 leading-[1.8] group-hover:text-emerald-700 transition-colors">
                              {member.name}
                            </h3>

                            {/* Role */}
                            <p className="text-xs sm:text-sm font-bold text-emerald-800 mb-3 leading-normal">
                              {member.role}
                            </p>
                            
                            {/* Academic Credentials Box */}
                            <div className="space-y-2 mb-4 text-xs">
                              <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-100">
                                <span className="font-bold text-slate-900 flex items-center gap-1.5 mb-0.5 text-[11px]">
                                  <GraduationCap size={13} className="text-emerald-700 shrink-0" />
                                  <span>تعلیمی اسناد و اسناد:</span>
                                </span>
                                <span className="text-slate-600 block leading-relaxed text-[11px] sm:text-xs">{member.education}</span>
                              </div>

                              <div className="bg-slate-50 p-2.5 sm:p-3 rounded-xl border border-slate-100">
                                <span className="font-bold text-slate-900 flex items-center gap-1.5 mb-0.5 text-[11px]">
                                  <BookOpen size={13} className="text-emerald-700 shrink-0" />
                                  <span>تخصص و مہارت:</span>
                                </span>
                                <span className="text-slate-600 block leading-relaxed text-[11px] sm:text-xs">{member.specialization}</span>
                              </div>
                            </div>
                          </div>

                          {/* Card Action Buttons */}
                          <div className="flex items-center justify-between pt-3 border-t border-slate-100 gap-2">
                            <div className="flex gap-1.5">
                              {member.email && (
                                <Link 
                                  href={`mailto:${member.email}`} 
                                  className="p-2 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-800 transition-colors"
                                  title="ای میل ارسال کریں"
                                >
                                  <Mail size={15} />
                                </Link>
                              )}
                              {member.contact && (
                                <Link 
                                  href={`tel:${member.contact}`} 
                                  className="p-2 rounded-lg bg-slate-100 hover:bg-emerald-100 text-slate-600 hover:text-emerald-800 transition-colors"
                                  title="رابطہ کریں"
                                >
                                  <Phone size={15} />
                                </Link>
                              )}
                            </div>

                            <Link 
                              href={`/faculty-profile?id=${member.id}`}
                              className="inline-flex items-center gap-1 px-3.5 py-1.5 sm:py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all active:scale-95"
                            >
                              <span>پروفائل دیکھیں</span>
                              <ChevronLeft size={13} />
                            </Link>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              );
            })}

          </div>
        </section>

        {/* --- 4. CAMPUS FACULTY ADMISSIONS CTA --- */}
        <section className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white py-10 sm:py-14 px-4 sm:px-6 lg:px-8 border-t-4 border-amber-400">
          <div className="max-w-5xl mx-auto text-center">
            <Building2 size={36} className="text-amber-400 mx-auto mb-2.5" />
            <h2 className="text-xl sm:text-3xl md:text-4xl font-black text-white leading-[1.9] mb-2 sm:mb-3">
              جامعہ شیرِ ربانی کے جید اساتذہ و شیوخ سے اکتسابِ فیض کریں
            </h2>
            <p className="text-emerald-100/90 text-xs sm:text-base leading-[2.1] max-w-3xl mx-auto mb-6 sm:mb-8">
              درسِ نظامی، تخصص فی الفقہ، حفظ و تجوید، آئی ٹی سسٹمز اور تقابلِ ادیان کے لیے آن لائن داخلے جاری ہیں۔
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/admissions"
                className="w-full sm:w-auto px-7 py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all"
              >
                آن لائن داخلہ فارم پر کریں
              </Link>
              <Link
                href="/courses"
                className="w-full sm:w-auto px-7 py-3 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs sm:text-sm shadow-md border border-emerald-500/40 transition-all"
              >
                تمام کورسز کی تفصیلات
              </Link>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
}
