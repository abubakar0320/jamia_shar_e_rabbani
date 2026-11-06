'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { 
  GraduationCap, Mail, Phone, ChevronLeft, 
  UserCircle, BookOpen, ShieldCheck, Sparkles, 
  Award, Building2, Crown, Briefcase, Layers,
  CheckCircle2, ArrowDown
} from 'lucide-react';
import React, { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';

export interface FacultyMember {
  id: number;
  name: string;
  role: string;
  tier: 'dean' | 'principal' | 'hod' | 'teacher';
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
    // --- TIER 1: DEANS & SUPREME PATRONS (سرپرستانِ اعلیٰ و ڈینز) ---
    {
      id: 8,
      name: 'حضور ضیاء الامت جسٹس پیر محمد کرم شاہ الازہری علیہ الرحمہ',
      role: 'فکری پیشوا، بانی و مفسرِ قرآن',
      tier: 'dean',
      tierLabel: 'بانی و فکری ڈین (Founder Dean)',
      tierBadgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
      department: 'سرپرستِ اعلیٰ و فکری ڈین آف اسلامک اسٹڈیز',
      departmentColor: 'bg-amber-50 text-amber-800 border-amber-200',
      education: 'جامعہ الازہر مصر (ایم اے) و دار العلوم دیوبند',
      specialization: 'تفسیرِ قرآن، سیرت نگاری، اسلامی عدالتی قوانین و تقابلی شریعت',
      image: '/gallery/1. Zayah ul umat justice peer muhammad karam shah.jpeg',
      email: 'jamiashererabbani07@gmail.com',
      contact: '03144081516'
    },
    {
      id: 5,
      name: 'پیر سید افتخار الحسن شاہ صاحب',
      role: 'سجادہ نشین، روحانی سرپرست و مربی',
      tier: 'dean',
      tierLabel: 'سرپرستِ شوریٰ و ڈین (Dean of Spiritual Affairs)',
      tierBadgeColor: 'bg-purple-100 text-purple-900 border-purple-300',
      department: 'مجلسِ شوریٰ و ڈین آف سپرچوئل افیئرز',
      departmentColor: 'bg-purple-50 text-purple-800 border-purple-200',
      education: 'علومِ دینیہ و تصوف، سلاسلِ طریقت',
      specialization: 'تزکیہ نفس، تصوف و اخلاق، خانقاہی نظام و رہنمائی',
      image: '/gallery/5. Peer Syed Iftikhar ul hassan shah.jpeg',
      email: 'jamiashererabbani07@gmail.com',
      contact: '03144081516'
    },

    // --- TIER 2: PRINCIPAL & EXECUTIVE LEADERSHIP (پرنسپل و انتظامی قیادت) ---
    {
      id: 1,
      name: 'پروفیسر ڈاکٹر فاروق علی ربانی',
      role: 'شیخ الحدیث و پرنسپل، جامعہ شیرِ ربانی',
      tier: 'principal',
      tierLabel: 'پرنسپل و ادارتی سربراہ (Principal)',
      tierBadgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      department: 'شعبہ پرنسپل و سینئر فیکلٹی قیادت',
      departmentColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      education: 'عالمیہ (درسِ نظامی) و تخصص فی الحدیث | پی ایچ ڈی علومِ اسلامیہ',
      specialization: 'علومِ حدیث، تفاسیر، فقہِ اسلامی و نصابی اصلاحات',
      image: '/farooq-ali-rabbani.jpeg',
      email: 'jamiashererabbani07@gmail.com',
      contact: '03144081516'
    },
    {
      id: 4,
      name: 'حافظ محمد احمد علی ربانی',
      role: 'نائب مہتمم و ناظمِ تعلیمات (Director of Education)',
      tier: 'principal',
      tierLabel: 'نائب مہتمم (Vice Principal / Academic Director)',
      tierBadgeColor: 'bg-teal-100 text-teal-900 border-teal-300',
      department: 'شعبہ نظامتِ تعلیمات و تعلیمی ایڈمنسٹریشن',
      departmentColor: 'bg-teal-50 text-teal-800 border-teal-200',
      education: 'عالمیہ (درسِ نظامی)، وفاق المدارس الاسلامیہ الرضویہ',
      specialization: 'تدریسی نظم و نسق، نصاب سازی، امتحانی طریقہ کار و طلبہ کونسلنگ',
      image: '/hafiz-ahmad-ali.jpeg',
      email: 'jamiashererabbani07@gmail.com',
      contact: '+966540532511'
    },

    // --- TIER 3: HEADS OF DEPARTMENTS (صدور و نگرانِ شعبہ جات - HODs) ---
    {
      id: 13,
      name: 'پروفیسر ڈاکٹر مفتی محمد امین بھٹی صاحب',
      role: 'صدر شعبہ، شعبہ تحقیق و بین الاقوامی افتاء',
      tier: 'hod',
      tierLabel: 'ہیڈ آف ڈیپارٹمنٹ (HOD - ریسرچ و افتاء)',
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
      id: 2,
      name: 'مولانا مفتی علی حمزہ صاحب',
      role: 'نگرانِ شعبہ، شعبہ درسِ نظامی و دار الافتاء',
      tier: 'hod',
      tierLabel: 'ہیڈ آف ڈیپارٹمنٹ (HOD - درسِ نظامی)',
      tierBadgeColor: 'bg-emerald-100 text-emerald-900 border-emerald-300',
      department: 'شعبہ درسِ نظامی و علومِ شریعہ',
      departmentColor: 'bg-emerald-50 text-emerald-800 border-emerald-200',
      education: 'عالمیہ (درسِ نظامی) و تخصص فی الفقہ',
      specialization: 'فقہِ اسلامی، اصولِ فقہ، نحو و صرف اور عربی ادب',
      image: '/ali-hamza.jpeg',
      email: 'jamiashererabbani07@gmail.com',
      contact: '03144081516'
    },
    {
      id: 3,
      name: 'محترم ابوبکر صدیق صاحب',
      role: 'ہیڈ آف ڈیپارٹمنٹ، شعبہ آئی ٹی و سافٹ ویئر سسٹمز',
      tier: 'hod',
      tierLabel: 'ہیڈ آف ڈیپارٹمنٹ (HOD - آئی ٹی و سسٹمز)',
      tierBadgeColor: 'bg-blue-100 text-blue-900 border-blue-300',
      department: 'شعبہ انفارمیشن ٹیکنالوجی، پورٹلز و سافٹ ویئر سسٹمز',
      departmentColor: 'bg-blue-50 text-blue-800 border-blue-200',
      education: 'بی ایس انفارمیشن ٹیکنالوجی (BSIT)، بابا گرو نانک یونیورسٹی | گوگل و سسکو سرٹیفائیڈ',
      specialization: 'فل اسٹیک ویب ڈویلپمنٹ، کلاؤڈ انفراسٹرکچر، پورٹل آرکیٹیکچر و آئی ٹی انٹرن شپ',
      image: '/abubakar-latest.jpeg',
      email: 'abubakr.bgnu@gmail.com',
      contact: '03097354874'
    },
    {
      id: 7,
      name: 'پیر مفتی علامہ حافظ سید محمد احمد جامی شاہ نقشبندی مجددی',
      role: 'صدر شعبہ، شعبہ تحفیظ القرآن و روحانیات',
      tier: 'hod',
      tierLabel: 'ہیڈ آف ڈیپارٹمنٹ (HOD - تحفیظ القرآن)',
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
      id: 6,
      name: 'مفتی محافظ القاری مولانا محمد کاشف رفیق انجم',
      role: 'صدر شعبہ، شعبہ دعوت، خطابت و مناظرہ',
      tier: 'hod',
      tierLabel: 'ہیڈ آف ڈیپارٹمنٹ (HOD - دعوت و خطابت)',
      tierBadgeColor: 'bg-violet-100 text-violet-900 border-violet-300',
      department: 'شعبہ دعوت، خطابت، علم الکلام و مناظرہ',
      departmentColor: 'bg-violet-50 text-violet-800 border-violet-200',
      education: 'الشہادۃ العالمیہ فی العلوم الاسلامیہ، تخصص فی الفقہ والافتاء',
      specialization: 'خطابت و بلاغت، تقابلِ ادیان، فقہِ حنفی اور مناظرہ و کلام',
      image: '/gallery/6. Mufti Mohafiz al qari molana muhammad kashif rafique anjum al maroof katib ibn katib katib azam sarghooda.jpeg',
      email: 'jamiashererabbani07@gmail.com',
      contact: '03144081516'
    },

    // --- TIER 4: SENIOR TEACHING FACULTY & LECTURERS (اساتذہ کرام و محققین) ---
    {
      id: 9,
      name: 'پروفیسر پیر مفتی مولانا رانا محمد مبشر اکرم نقشبندی مجددی',
      role: 'سینئر پروفیسر، شعبہ اسلامیات و معاصر علوم',
      tier: 'teacher',
      tierLabel: 'سینئر پروفیسر (Senior Professor)',
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
      name: 'مفتی علامہ علی مرتضیٰ سیالوی',
      role: 'استاذ العلماء، شعبہ اصولِ فقہ و منطق',
      tier: 'teacher',
      tierLabel: 'استاذ العلماء (Senior Lecturer)',
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
      name: 'مفتی علامہ ذیشان علی چشتی صابری',
      role: 'مفتی و مدرس، شعبہ افتاء و میراث',
      tier: 'teacher',
      tierLabel: 'مدرسِ شریعت و مفتی (Lecturer in Fiqh)',
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
      name: 'مفتی علامہ اسد عباس چشتی',
      role: 'مدرس، شعبہ فقہ، تجوید و سیرتِ طیبہ',
      tier: 'teacher',
      tierLabel: 'مدرسِ درسِ نظامی (Lecturer)',
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
      id: 'dean',
      title: 'سرپرستانِ اعلیٰ و ڈینز (Patrons & Deans)',
      subtitle: 'جامعہ شیرِ ربانی کے فکری، روحانی اور مشاورتی سرپرست جن کے فیضان سے ادارہ مستفید ہے',
      badge: 'ڈینز و سرپرست کونسل',
      headerBg: 'bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 text-white',
      badgeBg: 'bg-amber-400 text-slate-950',
      icon: <Crown size={22} className="text-amber-300" />
    },
    {
      id: 'principal',
      title: 'پرنسپل و انتظامی قیادت (Principal & Executive Leadership)',
      subtitle: 'جامعہ کے انتظامی، نصابی اور روزمرہ تعلیمی امور کے سربراہان جن کی زیرِ نگرانی ادارہ گامزن ہے',
      badge: 'انتظامی قیادت',
      headerBg: 'bg-gradient-to-r from-emerald-900 via-emerald-800 to-teal-950 text-white',
      badgeBg: 'bg-emerald-400 text-slate-950',
      icon: <ShieldCheck size={22} className="text-emerald-300" />
    },
    {
      id: 'hod',
      title: 'صدور و نگرانِ شعبہ جات (Heads of Departments - HODs)',
      subtitle: 'جامعہ کے کلیدی تدریسی، تحقیقی، فنی، آئی ٹی اور تربیتی شعبہ جات کے نگران اور شعبہ جاتی صدور',
      badge: 'صدورِ شعبہ جات (HODs)',
      headerBg: 'bg-gradient-to-r from-teal-900 via-teal-800 to-slate-950 text-white',
      badgeBg: 'bg-teal-400 text-slate-950',
      icon: <Building2 size={22} className="text-teal-300" />
    },
    {
      id: 'teacher',
      title: 'اساتذہ کرام، مفتیان و محققین (Senior Faculty & Teachers)',
      subtitle: 'تدریسی فیکلٹی جو طلبہ کو علومِ شریعہ، فقہ، اصول، حدیث اور عربی زبان سکھاتے ہیں',
      badge: 'تدریسی فیکلٹی',
      headerBg: 'bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white',
      badgeBg: 'bg-sky-400 text-slate-950',
      icon: <BookOpen size={22} className="text-sky-300" />
    }
  ];

  const filteredFaculty = useMemo(() => {
    if (selectedTier === 'all') return faculty;
    return faculty.filter(m => m.tier === selectedTier);
  }, [faculty, selectedTier]);

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
    <div className="flex flex-col min-h-screen bg-white font-urdu" dir="rtl">
      <Header />
      
      <main className="flex-1 bg-white text-slate-900">
        
        {/* --- 1. HERO SECTION WITH INSTITUTIONAL HIERARCHY --- */}
        <section className="relative pt-16 md:pt-22 pb-14 border-b border-slate-200 bg-gradient-to-b from-slate-900 via-emerald-950 to-slate-900 text-white overflow-hidden text-right">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-800/60 border border-emerald-400/30 text-amber-300 text-xs sm:text-sm font-bold mb-4 shadow-sm">
                <Sparkles size={15} className="text-amber-400" />
                <span>جامعہ شیرِ ربانی کی باوقار علمی و ادارتی تنظیمی ساخت (Faculty Hierarchy)</span>
              </div>

              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.9] md:leading-[2.1] mb-5">
                جامعہ کی فیکلٹی، شعبہ جات اور تنظیمی قیادت
              </h1>

              <p className="text-base sm:text-lg md:text-xl text-emerald-100/90 leading-[2.2] md:leading-[2.3] max-w-3xl mx-auto mb-10">
                علم، عمل اور تقوٰی کے پیکر، متبحر علماء، شعبہ جاتی سربراہان اور محققین جو سرپرستان، پرنسپل، صدورِ شعبہ جات اور اساتذہ کے مربوط تنظیمی ڈھانچے کے تحت نسلِ نو کی آبیاری فرما رہے ہیں۔
              </p>

              {/* Organizational Flow Visualizer Pills */}
              <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/15 max-w-4xl mx-auto shadow-2xl">
                <div className="text-xs sm:text-sm font-bold text-amber-300 mb-3 text-center">
                  جامعہ کی ادارتی و تعلیمی درجہ بندی کا فلو چارٹ (Organizational Chart)
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 text-xs sm:text-sm font-bold">
                  <div className="bg-amber-400/20 border border-amber-400/40 rounded-xl p-3 flex flex-col items-center justify-center text-amber-200">
                    <Crown size={20} className="text-amber-300 mb-1" />
                    <span>۱. سرپرستان و ڈینز</span>
                    <span className="text-[10px] text-amber-300/80 mt-0.5">Deans & Patrons</span>
                  </div>
                  <div className="bg-emerald-400/20 border border-emerald-400/40 rounded-xl p-3 flex flex-col items-center justify-center text-emerald-200">
                    <ShieldCheck size={20} className="text-emerald-300 mb-1" />
                    <span>۲. پرنسپل و قیادت</span>
                    <span className="text-[10px] text-emerald-300/80 mt-0.5">Principal & Vice Principal</span>
                  </div>
                  <div className="bg-teal-400/20 border border-teal-400/40 rounded-xl p-3 flex flex-col items-center justify-center text-teal-200">
                    <Building2 size={20} className="text-teal-300 mb-1" />
                    <span>۳. صدورِ شعبہ جات (HODs)</span>
                    <span className="text-[10px] text-teal-300/80 mt-0.5">Heads of Departments</span>
                  </div>
                  <div className="bg-sky-400/20 border border-sky-400/40 rounded-xl p-3 flex flex-col items-center justify-center text-sky-200">
                    <BookOpen size={20} className="text-sky-300 mb-1" />
                    <span>۴. اساتذہ کرام و محققین</span>
                    <span className="text-[10px] text-sky-300/80 mt-0.5">Teaching Faculty & Muftis</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- 2. HIERARCHY FILTER BAR (STICKY) --- */}
        <section className="bg-white border-b border-slate-200 sticky top-0 z-30 shadow-xs">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              <button
                onClick={() => setSelectedTier('all')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                  selectedTier === 'all'
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20 scale-102'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Layers size={16} />
                <span>تمام فیکلٹی و شعبہ جات</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-sans font-bold ${
                  selectedTier === 'all' ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {tierCounts.all}
                </span>
              </button>

              <button
                onClick={() => setSelectedTier('dean')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                  selectedTier === 'dean'
                    ? 'bg-amber-700 text-white shadow-md shadow-amber-700/20 scale-102'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Crown size={16} />
                <span>سرپرستانِ اعلیٰ و ڈینز</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-sans font-bold ${
                  selectedTier === 'dean' ? 'bg-amber-800 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {tierCounts.dean || 0}
                </span>
              </button>

              <button
                onClick={() => setSelectedTier('principal')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                  selectedTier === 'principal'
                    ? 'bg-emerald-700 text-white shadow-md shadow-emerald-700/20 scale-102'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <ShieldCheck size={16} />
                <span>پرنسپل و انتظامی قیادت</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-sans font-bold ${
                  selectedTier === 'principal' ? 'bg-emerald-800 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {tierCounts.principal || 0}
                </span>
              </button>

              <button
                onClick={() => setSelectedTier('hod')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                  selectedTier === 'hod'
                    ? 'bg-teal-700 text-white shadow-md shadow-teal-700/20 scale-102'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <Building2 size={16} />
                <span>صدور و نگرانِ شعبہ جات (HODs)</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-sans font-bold ${
                  selectedTier === 'hod' ? 'bg-teal-800 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {tierCounts.hod || 0}
                </span>
              </button>

              <button
                onClick={() => setSelectedTier('teacher')}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all duration-200 shrink-0 cursor-pointer ${
                  selectedTier === 'teacher'
                    ? 'bg-sky-700 text-white shadow-md shadow-sky-700/20 scale-102'
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                }`}
              >
                <BookOpen size={16} />
                <span>اساتذہ کرام و محققین</span>
                <span className={`text-[11px] px-2 py-0.5 rounded-full font-sans font-bold ${
                  selectedTier === 'teacher' ? 'bg-sky-800 text-white' : 'bg-slate-200 text-slate-600'
                }`}>
                  {tierCounts.teacher || 0}
                </span>
              </button>
            </div>
          </div>
        </section>

        {/* --- 3. TIERED FACULTY SECTIONS (HIERARCHY LAYOUT) --- */}
        <section className="py-12 md:py-16 px-4 sm:px-6 lg:px-8 bg-slate-50/60">
          <div className="max-w-7xl mx-auto space-y-16">
            
            {TIERS_CONFIG.map((tierConfig) => {
              // If filtering by specific tier, only render that tier
              if (selectedTier !== 'all' && selectedTier !== tierConfig.id) {
                return null;
              }

              const tierMembers = faculty.filter(m => m.tier === tierConfig.id);
              if (tierMembers.length === 0) return null;

              return (
                <div key={tierConfig.id} className="scroll-mt-24">
                  {/* Tier Header Banner */}
                  <div className={`p-6 sm:p-7 rounded-3xl ${tierConfig.headerBg} shadow-lg mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-2 border-white/20`}>
                    <div className="flex items-center gap-3.5">
                      <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shrink-0">
                        {tierConfig.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`text-[11px] font-bold px-3 py-0.5 rounded-full font-urdu ${tierConfig.badgeBg}`}>
                            {tierConfig.badge}
                          </span>
                          <span className="text-xs text-white/80 font-sans font-bold">
                            ({tierMembers.length} ارکان)
                          </span>
                        </div>
                        <h2 className="text-2xl sm:text-3xl font-black text-white leading-[1.9]">
                          {tierConfig.title}
                        </h2>
                        <p className="text-xs sm:text-sm text-white/85 leading-[2.1] mt-1 max-w-3xl">
                          {tierConfig.subtitle}
                        </p>
                      </div>
                    </div>

                    <div className="text-xs text-white/70 font-sans hidden lg:block text-left" dir="ltr">
                      Tier Level: <span className="font-bold uppercase text-white">{tierConfig.id}</span>
                    </div>
                  </div>

                  {/* Tier Cards Grid */}
                  <div className={`grid grid-cols-1 sm:grid-cols-2 ${
                    tierMembers.length <= 2 ? 'lg:grid-cols-2 max-w-4xl mx-auto' :
                    tierMembers.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'
                  } gap-6`}>
                    {tierMembers.map((member, i) => (
                      <motion.div 
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.08, duration: 0.4 }}
                        className="flex flex-col bg-white border border-slate-200/90 shadow-sm hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300 group hover:border-emerald-300"
                      >
                        {/* Faculty Portrait Image */}
                        <div className="w-full aspect-[706/1024] overflow-hidden relative bg-slate-100 shrink-0">
                          <OptimizedImage 
                            src={member.image || "/images/WhatsApp.jpeg"}
                            alt={member.name}
                            fill
                            section="faculty"
                            className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                          
                          {/* Top Badges on Image */}
                          <div className="absolute top-3 right-3 left-3 flex flex-wrap items-center justify-between gap-1.5 pointer-events-none z-10">
                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg shadow-md ${member.tierBadgeColor} leading-[1.8]`}>
                              {member.tierLabel}
                            </span>
                          </div>
                        </div>
                        
                        {/* Faculty Information Body */}
                        <div className="p-5 sm:p-6 flex flex-col justify-between flex-1 text-right bg-white">
                          <div>
                            {/* Department Badge */}
                            <div className="mb-2.5">
                              <span className={`text-[11px] font-bold px-3 py-1 rounded-md border inline-block leading-[1.9] ${member.departmentColor}`}>
                                <Building2 size={12} className="inline ml-1 -mt-0.5" />
                                {member.department}
                              </span>
                            </div>

                            {/* Name */}
                            <h3 className="text-lg sm:text-xl font-black text-slate-900 mb-2 leading-[2.1] group-hover:text-emerald-700 transition-colors">
                              {member.name}
                            </h3>

                            {/* Role */}
                            <p className="text-xs font-bold text-emerald-800 mb-4 leading-[2.0]">
                              {member.role}
                            </p>
                            
                            {/* Academic Credentials Box */}
                            <div className="space-y-2.5 mb-5 text-xs">
                              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                                <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                                  <GraduationCap size={14} className="text-emerald-700 shrink-0" />
                                  <span>تعلیمی اسناد و اسناد:</span>
                                </span>
                                <span className="text-slate-600 block leading-[2.1]">{member.education}</span>
                              </div>

                              <div className="bg-slate-50 p-3 rounded-xl border border-slate-200/70">
                                <span className="font-bold text-slate-800 flex items-center gap-1.5 mb-1">
                                  <BookOpen size={14} className="text-emerald-700 shrink-0" />
                                  <span>تخصص و مہارت:</span>
                                </span>
                                <span className="text-slate-600 block leading-[2.1]">{member.specialization}</span>
                              </div>
                            </div>
                          </div>

                          {/* Card Action Buttons */}
                          <div className="flex items-center justify-between pt-4 border-t border-slate-100 gap-2">
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
                              className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all"
                            >
                              <span>پروفائل دیکھیں</span>
                              <ChevronLeft size={14} />
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
        <section className="bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 text-white py-14 px-4 sm:px-6 lg:px-8 border-t-4 border-amber-400">
          <div className="max-w-5xl mx-auto text-center">
            <Building2 size={38} className="text-amber-400 mx-auto mb-3" />
            <h2 className="text-2xl sm:text-4xl font-black text-white leading-[2.0] mb-3">
              جامعہ شیرِ ربانی کے جید اساتذہ و شیوخ سے اکتسابِ فیض کریں
            </h2>
            <p className="text-emerald-100/90 text-sm sm:text-base leading-[2.3] max-w-3xl mx-auto mb-8">
              درسِ نظامی، تخصص فی الفقہ، حفظ و تجوید، آئی ٹی سسٹمز اور تقابلِ ادیان کے لیے آن لائن داخلے جاری ہیں۔
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/admissions"
                className="px-8 py-3.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-black rounded-xl text-sm sm:text-base shadow-lg hover:shadow-xl transition-all"
              >
                آن لائن داخلہ فارم پر کریں
              </Link>
              <Link
                href="/courses"
                className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-600 text-white font-bold rounded-xl text-sm sm:text-base shadow-md border border-emerald-500/40 transition-all"
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
