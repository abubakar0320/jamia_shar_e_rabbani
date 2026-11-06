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
  Briefcase, CheckCircle2,
  ShieldCheck, Building2, Crown
} from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface FacultyMember {
  id: number;
  name: string;
  role: string;
  designation?: string;
  tier?: 'akabir' | 'chancellor' | 'officers' | 'professor';
  tierLabel?: string;
  department?: string;
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
  // --- TIER 1: AKABIR-E-AHL-E-SUNNAT (اکابرینِ اہلِ سنت و روحانی پیشوا) ---
  {
    id: 8,
    name: 'حضور ضیاء الامت جسٹس پیر محمد کرم شاہ الازہری علیہ الرحمہ',
    role: 'فکری و روحانی پیشوا، بانی و مفسرِ قرآن (اکابرینِ اہلِ سنت)',
    designation: 'مفسرِ قرآن، بانی دار العلوم محمدیہ غوثیہ و سابق جج شریعت ایپلٹ بینچ سپریم کورٹ آف پاکستان',
    tier: 'akabir',
    tierLabel: 'اکابرینِ اہلِ سنت و فکری پیشوا',
    department: 'اکابرینِ اہلِ سنت و مرجعِ علمی و روحانی',
    education: 'جامعہ الازہر مصر (ایم اے)، جامعہ دار العلوم دیوبند، جامعہ محمدیہ غوثیہ',
    specialization: 'تفسیرِ قرآن، سیرت نگاری، اسلامی عدالتی قوانین اور فقہِ تقابلی',
    image: '/gallery/1. حضور ضیاء الامت جسٹس پیر محمد کرم شاہ الازہری علیہ الرحمہ.jpeg',
    email: 'jamiashererabbani07@gmail.com',
    contact: '03144081516',
    bio: 'حضور ضیاء الامت مفسرِ قرآن جسٹس پیر محمد کرم شاہ الازہری علیہ الرحمہ برصغیر پاک و ہند کی وہ تاریخ ساز شخصیت ہیں جنہوں نے دینی اور عصری علوم کے امتزاج کی بنیاد رکھی۔ آپ دار العلوم محمدیہ غوثیہ بھیرہ شریف کے بانی، شریعت ایپلٹ بینچ سپریم کورٹ آف پاکستان کے جج اور تفسیر ضیاء القرآن و سیرت ضیاء النبی ﷺ کے شہرۂ آفاق مصنف ہیں۔ آپ کی فکر اور رہنمائی جامعہ شیرِ ربانی کے لیے ہمیشہ مشعلِ راہ ہے۔',
    experience: '50+ سالہ بے مثل علمی، تصنیفی، عدالتی و روحانی خدمات',
    research: 'تفسیرِ ضیاء القرآن (۵ جلدیں)، ضیاء النبی ﷺ (۷ جلدیں)، اسلامی قوانین کی تدوین',
    courses: ['تفسیر ضیاء القرآن', 'سیرت النبی ﷺ', 'قوانینِ شریعت و عدالتی نظام', 'عربی زبان و ادب'],
    languages: ['عربی', 'اردو', 'انگریزی', 'فارسی'],
    achievements: [
      'شاہکار تفسیرِ قرآن "ضیاء القرآن" اور سیرت النبی ﷺ کی بے نظیر تدوین۔',
      'سپریم کورٹ آف پاکستان کے شریعت بینچ میں تاریخی اسلامی فیصلے تحریر فرمائے۔',
      'جامعہ شیرِ ربانی کے اساتذہ و بانیان کے عظیم مربی اور فکری استاد۔'
    ]
  },

  // --- TIER 2: CHANCELLOR, VICE CHANCELLOR & DEAN (چانسلر، وائس چانسلر و ڈین) ---
  {
    id: 14,
    name: 'مولانا الحاج صوبیدار محمد یوسف نقشبندی مجددی صاحب',
    role: 'چانسلر و سرپرستِ اعلیٰ، جامعہ شیرِ ربانی',
    designation: 'چانسلر و سرپرستِ اعلیٰ، جامعہ شیرِ ربانی مانانوالہ',
    tier: 'chancellor',
    tierLabel: 'چانسلر (Chancellor)',
    department: 'دفترِ چانسلر و مجلسِ اعلٰی (Office of the Chancellor)',
    education: 'فاضل علومِ اسلامیہ، ۳۰ سالہ عسکری خدمات و سلاسلِ طریقت نقشبندیہ مجددیہ',
    specialization: '۳۰ سالہ عسکری نظم و ضبط، ۲۴ سالہ دینی اخلاص، سرپرستیِ ادارہ و سلسلہ عالیہ نقشبندیہ',
    image: '/gallery/1.1مولانا الحاج صوبیدار محمد یوسف نقشبندی مجددی صاحب.jpeg',
    email: 'jamiashererabbani07@gmail.com',
    contact: '03144081516',
    bio: 'مولانا الحاج صوبیدار محمد یوسف نقشبندی مجددی صاحب جامعہ شیرِ ربانی مانانوالہ کے معزز چانسلر اور سرپرستِ اعلیٰ ہیں۔ آپ ۳۰ سالہ عسکری نظم و ضبط اور ۲۴ سالہ دینی اخلاص، اور سلسلہ عالیہ نقشبندیہ مجددیہ کے روحانی فیضان کے امین ہیں۔ جامعہ شیرِ ربانی کے قیام، فکری تسلسل اور ہمہ جہت تعلیمی و رفاہی ترقی میں آپ کی مخلصانہ سرپرستی اور دعائیں ادارے کے لیے بیش قیمت اثاثہ ہیں۔ آپ کی زیرِ سرپرستی جامعہ ملک بھر میں علومِ نبویہ کی نشر و اشاعت میں نمایاں مقام رکھتا ہے۔',
    experience: '۳۰ سالہ عسکری نظم و ضبط اور ۲۴ سالہ دینی و روحانی خدمات',
    research: 'نظم و نسق، عسکری ڈسپلن، فکری تسلسل اور تصوفِ نقشبندیہ مجددیہ',
    courses: [
      'سرپرستیِ اعلیٰ و اکیڈمک کونسل سپروائزری',
      'مجلسِ شوریٰ و پالیسی رہنمائی',
      'فکری و نظریاتی استحکام',
      'سلسلہ عالیہ نقشبندیہ کے روحانی دروس'
    ],
    languages: ['عربی', 'اردو', 'پنجابی'],
    achievements: [
      'جامعہ شیرِ ربانی مانانوالہ کی چانسلر شپ اور سپریم رہنمائی۔',
      'ادارے کے انتظامی نظم و نسق اور مستحکم ترقی میں بنیادی کردار۔',
      'سلسلہ عالیہ نقشبندیہ مجددیہ کے فیضان اور خدمتِ خلق کے لیے ہمہ وقت وقف۔'
    ]
  },
  {
    id: 1,
    name: 'ڈاکٹر پیر ابو احمد فاروق علی ربانی صاحب',
    role: 'وائس چانسلر و ڈینِ فیکلٹی آف اسلامک اسٹڈیز، جامعہ شیرِ ربانی',
    designation: 'وائس چانسلر و ڈینِ فیکلٹی آف اسلامک اسٹڈیز، جامعہ شیرِ ربانی',
    tier: 'chancellor',
    tierLabel: 'وائس چانسلر و ڈین (VC & Dean)',
    department: 'دفترِ وائس چانسلر و ڈین آف اسلامک اسٹڈیز',
    education: 'پی ایچ ڈی علومِ اسلامیہ | تخصص فی الحدیث و درسِ نظامی (عالمیہ)',
    specialization: 'علومِ حدیث، تفاسیر، فقہِ اسلامی، نصابی اصلاحات و یونیورسٹی ایڈمنسٹریشن',
    image: '/gallery/2. ڈاکٹر پیر ابو احمد فاروق علی ربانی صاحب.jpeg',
    email: 'jamiashererabbani07@gmail.com',
    contact: '03144081516',
    bio: 'ڈاکٹر پیر ابو احمد فاروق علی ربانی صاحب جامعہ شیرِ ربانی کے وائس چانسلر اور ڈین ہیں۔ آپ جلیل القدر محقق، شیخ الحدیث، اور صاحبِ نسبت بزرگ ہیں۔ آپ نے 25 سال سے زائد عرصے میں ہزاروں طلبہ کو صحاحِ ستہ اور علومِ شریعہ کی تدریس فرمائی ہے۔ جامعہ کو وفاق المدارس الاسلامیہ الرضویہ سے ملحق کروانے، جدید تعلیمی مناہج کو شامل کرنے اور اکیڈمک وقار کو بامِ عروج پر پہنچانے میں آپ کی مساعی جلیلہ سنگِ میل کی حیثیت رکھتی ہیں۔',
    experience: '25+ سال کا اعلیٰ تدریسی، ادارتی و تحقیقی تجربہ',
    research: 'علومِ حدیث کی درایت، اصولِ تفسیر اور معاصر فقہی مسائل',
    courses: ['صحیح البخاری الشریف', 'جامع الترمذی', 'مشکوٰۃ المصابیح', 'اصولِ حدیث و درایت'],
    languages: ['عربی', 'اردو', 'انگریزی'],
    achievements: [
      'اصولِ حدیث اور فقہ پر متعدد علمی و تحقیقی مقالات کے مصنف۔',
      'عالمِ اسلام کے کبار محدثین و اساتذہ سے متصل اسناد و اجازات۔',
      'ملک بھر میں پھیلے سینکڑوں فارغ التحصیل علماء و حفاظ کے استاد و مربی۔'
    ]
  },

  // --- TIER 3: OFFICERS OF THE JAMIA (کنٹرولر امتحانات، رجسٹرار، خزانچی و ہیڈ آف ڈیپارٹمنٹس فار آل) ---
  {
    id: 4,
    name: 'اسلامک اسکالر حافظ القاری محمد احمد ربانی صاحب',
    role: 'کنٹرولر امتحانات و ناظمِ تعلیمات (Controller of Examinations & Director of Education)',
    designation: 'کنٹرولر امتحانات و ناظمِ تعلیمات (Controller & Director of Education)، جامعہ شیرِ ربانی',
    tier: 'officers',
    tierLabel: 'کنٹرولر امتحانات و ناظمِ تعلیمات (Controller & Academic Director)',
    department: 'دفترِ کنٹرولر امتحانات و نظامتِ تعلیمات (Examinations & Academics)',
    education: 'الشہادۃ العالمیہ فی العلوم الاسلامیہ والعربیۃ | حفظ و قرآت سبعہ عشرہ',
    specialization: 'امتحانی کنٹرول و شفافیت، نصاب سازی، تعلیمی نظم و ضبط اور طلبہ کونسلنگ',
    image: '/gallery/3. hafiz ahmad ali.jpeg',
    email: 'jamiashererabbani07@gmail.com',
    contact: '+966540532511',
    bio: 'اسلامک اسکالر حافظ القاری محمد احمد ربانی صاحب جامعہ شیرِ ربانی کے کنٹرولر امتحانات اور ناظمِ تعلیمات (Director of Education) ہیں۔ آپ جامعہ کے جملہ تعلیمی شعبہ جات (درسِ نظامی، حفظ و تجوید، تخصصات) کے سالانہ و ششماہی امتحانات، پرچہ جات کی تیاری، شفاف امتحانی ریکارڈ، رزلٹس کی تدوین اور یومیہ تدریسی نظم و ضبط کی مکمل نگرانی فرماتے ہیں۔ آپ کی زیرِ قیادت وفاق المدارس الاسلامیہ الرضویہ کے امتحانات میں جامعہ کے طلبہ شاندار پوزیشنز حاصل کر رہے ہیں۔',
    experience: '10+ سال کا امتحانی، انتظامی و تدریسی تجربہ',
    research: 'نظامِ امتحانات، اسلامی نصاب سازی، شفافیت اور تعلیمی ایڈمنسٹریشن',
    courses: [
      'کنٹرولر امتحانات (Examination Controller & Monitoring)',
      'نصاب و تدریسی منصوبہ بندی (Curriculum Planning)',
      'امتحانی طریقہ کار، شفافیت و رزلٹ سسٹم',
      'شعبہ تحفیظ القرآن و تجوید کی ہمہ گیر نگرانی'
    ],
    languages: ['عربی', 'اردو', 'پنجابی'],
    achievements: [
      'جامعہ شیرِ ربانی کے تمام تعلیمی شعبہ جات اور امتحانی نظام کی کامیاب سربراہی۔',
      'وفاق المدارس الاسلامیہ الرضویہ کے امتحانات میں طلبہ کے شاندار نتائج و پوزیشنز کی رہنمائی۔',
      'طلبہ کی ہمہ جہت تعلیمی، اخلاقی اور فکری نشوونما کے لیے جدید تعلیمی ورکشاپس کا انعقاد۔'
    ]
  },
  {
    id: 3,
    name: 'پروفیسر ابوبکر صدیق ربانی صاحب',
    role: 'رجسٹرار، خزانچی، چیئرپرسن و ہیڈ آف ڈیپارٹمنٹس فار آل',
    designation: 'رجسٹرار، خزانچی، چیئرپرسن و نگرانِ جملہ شعبہ جات، جامعہ شیرِ ربانی',
    tier: 'officers',
    tierLabel: 'رجسٹرار، خزانچی، چیئرپرسن و نگرانِ جملہ شعبہ جات',
    department: 'مرکزی سیکرٹریٹ: رجسٹرار، خزانچی، چیئرپرسن و آئی ٹی سسٹمز',
    education: 'بی ایس انفارمیشن ٹیکنالوجی (BSIT)، بابا گرو نانک یونیورسٹی | گوگل و سسکو سرٹیفائیڈ',
    specialization: 'یونیورسٹی رجسٹرار شپ، مالیاتی نظم و نسق، چیئرپرسن شپ، تمام شعبہ جات کی ہمہ گیر نگرانی و کلاؤڈ سسٹمز',
    image: '/gallery/4. abubakar-siddique.jpeg',
    email: 'abubakr.bgnu@gmail.com',
    contact: '03097354874',
    bio: 'پروفیسر ابوبکر صدیق ربانی صاحب جامعہ شیرِ ربانی کے رجسٹرار، خزانچی، چیئرپرسن اور تمام شعبہ جات کے ہیڈ آف ڈیپارٹمنٹس فار آل ہیں۔ آپ بابا گرو نانک یونیورسٹی (BGNU) سے بی ایس انفارمیشن ٹیکنالوجی کی تعلیم مکمل کر چکے ہیں اور گوگل پروجیکٹ مینجمنٹ و سسکو سائبر سیکیورٹی سرٹیفیکیشنز کے حامل ہیں۔ جامعہ شیرِ ربانی کے تمام شعبہ جات کا تیکنیکی، مالیاتی، انتظامی اور رجسٹرار شپ کا تمام تر مربوط نظام آپ کی نگرانی میں ہے۔ ادارے کا جدید ترین ویب پورٹل، ڈیٹابیس آرکیٹیکچر، آن لائن داخلہ فارمز اور خودکار امتحانی نظام آپ ہی کی فنی مہارت کا ثمر ہے، اس کے ساتھ آپ آئی ٹی انٹرن شپ پروگرام کے ذریعے نوجوانوں کی کیریئر کونسلنگ فرما رہے ہیں۔',
    experience: '5+ سال کا انتظامی، فنانشل مینجمنٹ و سافٹ ویئر آرکیٹیکچر کا تجربہ',
    research: 'یونیورسٹی رجسٹرار شپ سسٹمز، کلاؤڈ انفراسٹرکچر، فنانشل ٹریژری ماڈلز اور ماڈرن ویب سیکیورٹی',
    courses: [
      'رجسٹرار آفس مینجمنٹ و اکیڈمک ریکارڈز',
      'فنانشل ٹریژری، بجٹنگ و آڈٹ سسٹمز',
      'تمام شعبہ جات کی ہمہ گیر نگرانی (نگرانِ جملہ شعبہ جات)',
      'فل اسٹیک ویب ڈویلپمنٹ (Next.js, React, Node.js)',
      'پریکٹیکل آئی ٹی انٹرن شپ و پراجیکٹ مینجمنٹ'
    ],
    languages: ['اردو', 'انگریزی', 'پنجابی'],
    achievements: [
      'جامعہ شیرِ ربانی کے بطور رجسٹرار، خزانچی، چیئرپرسن اور تمام شعبہ جات کی قیادت۔',
      'جامعہ کے مکمل ڈیجیٹل سسٹم، ویب پورٹل اور رزلٹ سرچ انجن کے معمار۔',
      'گوگل (Google) اور سسکو (Cisco) سے بین الاقوامی سرٹیفائیڈ پروفیشنل۔',
      'جامعہ کے آفیشل آئی ٹی انٹرن شپ پروگرام کے نگران اور درجنوں نوجوانوں کے ٹیکنیکل مربی۔'
    ]
  },

  // --- TIER 4: PROFESSORS & TEACHING FACULTY (پروفیسرز و تدریسی فیکلٹی) ---
  {
    id: 13,
    name: 'پروفیسر ڈاکٹر مفتی محمد امین بھٹی صاحب',
    role: 'پروفیسر، بین الاقوامی محقق و مفتیِ اعظم',
    designation: 'پروفیسر ڈاکٹر، بین الاقوامی محقق و مفتیِ اعظم، جامعہ شیرِ ربانی',
    tier: 'professor',
    tierLabel: 'پروفیسر (Professor)',
    department: 'شعبہ تحقیق، پی ایچ ڈی اسٹڈیز و بین الاقوامی افتاء',
    education: 'پی ایچ ڈی علومِ اسلامیہ، ایم فل، الشہادۃ العالمیہ فی العلوم الاسلامیہ والعربیۃ',
    specialization: 'بین الاقوامی اسلامی قوانین، عصری فقہی اجتہاد، یونیورسٹی لیول ریسرچ',
    image: '/gallery/13. Prof. Dr. Mufti Muhammad Ameen Bhatti Sahib.png',
    email: 'jamiashererabbani07@gmail.com',
    contact: '03144081516',
    bio: 'پروفیسر ڈاکٹر مفتی محمد امین بھٹی صاحب بین الاقوامی شہرت یافتہ محقق، یونیورسٹی پروفیسر اور جید مفتی ہیں۔ آپ نے اسلامی قوانین، تقابلِ ادیان اور معاصر فکری چیلنجز پر متعدد بین الاقوامی مقالات تحریر فرمائے ہیں اور ایم فل و پی ایچ ڈی اسکالرز کی تحقیقی نگرانی فرمائی ہے۔',
    experience: '24+ سال کا تدریسی و بین الاقوامی تحقیقی تجربہ',
    research: 'بین الاقوامی قانونِ اسلام، معاصر بینکاری و تکافل، اور جدید اجتہادی مسائل',
    courses: ['بین الاقوامی قانونِ شریعت', 'معاصر فقہی اجتہاد و بینکاری', 'اصولِ تحقیق و پی ایچ ڈی تھیسس گائیڈنس', 'فلسفہ و فکرِ اسلامی'],
    languages: ['عربی', 'اردو', 'انگریزی'],
    achievements: [
      'ہائر ایجوکیشن کمیشن (HEC) سے منظور شدہ کتب و تحقیقی مقالات کے مصنف۔',
      'درجنوں پی ایچ ڈی اور ایم فل اسکالرز کے مقالہ جات کی کامیاب سپروائزری۔',
      'جامعہ شیرِ ربانی کے اعلیٰ تعلیمی و تحقیقی شعبے کے نگرانِ اعلیٰ۔'
    ]
  },
  {
    id: 5,
    name: 'پروفیسر پیر سید افتخار الحسن شاہ صاحب',
    role: 'پروفیسر، سجادہ نشین آستانہ عالیہ و روحانی مربی',
    designation: 'پروفیسر، سجادہ نشین آستانہ عالیہ و روحانی پیشوا، جامعہ شیرِ ربانی',
    tier: 'professor',
    tierLabel: 'پروفیسر (Professor)',
    department: 'شعبہ تصوف، اخلاقیات و روحانیات',
    education: 'علومِ دینیہ و تصوف، سلاسلِ طریقت',
    specialization: 'تزکیہ نفس، تصوف و اخلاق، خانقاہی نظام اور فکری رہنمائی',
    image: '/gallery/5. Peer Syed Iftikhar ul hassan shah.jpeg',
    email: 'jamiashererabbani07@gmail.com',
    contact: '03144081516',
    bio: 'پروفیسر پیر سید افتخار الحسن شاہ صاحب معروف روحانی پیشوا، سجادہ نشین آستانہ عالیہ اور صاحبِ نسبت بزرگ ہیں۔ آپ دینِ مبین کی ترویج، تصوف و روحانیت کی آبیاری اور نوجوان نسل کے اخلاقی سدھار میں پیش پیش ہیں اور جامعہ شیرِ ربانی مانانوالہ کے عظیم سرپرست، مربی اور دعا گو ہیں۔',
    experience: '30+ سالہ دینی و روحانی رہنمائی',
    research: 'تصوفِ اسلامی، تزکیۂ قلب و باطن اور خانقاہی اصلاحات',
    courses: ['تزکیۂ نفس و اخلاقیات', 'آدابِ سلوک و تصوف', 'مجالسِ ذکر و دعا', 'سیرت و اسلافِ صالحین'],
    languages: ['عربی', 'اردو', 'پنجابی'],
    achievements: [
      'ہزاروں مریدین و متوسلین کی باطنی و روحانی تربیت۔',
      'جامعہ شیرِ ربانی کے دینی و فلاحی مشن کی ہمہ وقت سرپرستی۔',
      'بین المذاہب و بین المسالک ہم آہنگی اور امن کے فروغ میں نمایاں خدمات۔'
    ]
  },
  {
    id: 6,
    name: 'پروفیسر مفتی محافظ القاری مولانا محمد کاشف رفیق انجم (خطیبِ اعظم سرگودھا)',
    role: 'پروفیسر، خطیبِ اعظم سرگودھا، مناظرِ اسلام و مفتیِ شریعت',
    designation: 'پروفیسر، خطیب ابن خطیب، خطیبِ اعظم سرگودھا و مفتیِ شریعت',
    tier: 'professor',
    tierLabel: 'پروفیسر (Professor)',
    department: 'شعبہ دعوت، خطابت، علم الکلام و مناظرہ',
    education: 'الشہادۃ العالمیہ فی العلوم الاسلامیہ، تخصص فی الفقہ والافتاء',
    specialization: 'خطابت و بلاغت، تقابلِ ادیان، فقہِ حنفی اور مناظرہ و کلام',
    image: '/gallery/6. Mufti Mohafiz al qari molana muhammad kashif rafique anjum al maroof katib ibn katib katib azam sarghooda.jpeg',
    email: 'jamiashererabbani07@gmail.com',
    contact: '03144081516',
    bio: 'پروفیسر مفتی محافظ القاری مولانا محمد کاشف رفیق انجم المعروف خطیب ابن خطیب، خطیبِ اعظم سرگودھا۔ آپ عالمِ اسلام کے نامور خطیب، مناظرِ اسلام، مفتی اور مصلح ہیں۔ آپ کی سحر انگیز خطابت اور استدلالی اسلوب نے ملک بھر میں حقانیتِ اسلام کا پرچم بلند کیا ہے۔ جامعہ شیرِ ربانی کے تعلیمی و دعوتی پروگرامز میں آپ کی رہنمائی گراں قدر سرمایہ ہے۔',
    experience: '20+ سال کا تدریسی، افتاء اور خطابت کا تجربہ',
    research: 'علم الکلام، تقابلِ مسالک و ادیان، اور ردِ فتنِ معاصرہ',
    courses: ['اصولِ مناظرہ و علم الکلام', 'فنِ خطابت و دعوت', 'تحقیقِ مسائلِ فقہیہ', 'عقائد و کلامِ اسلامی'],
    languages: ['عربی', 'اردو', 'پنجابی'],
    achievements: [
      'خطیبِ اعظم سرگودھا کے اعزاز و لقب سے نوازے گئے۔',
      'ملک کے طول و عرض میں ہزاروں عظیم الشان اجتماعات سے خطابات۔',
      'جامعہ شیرِ ربانی کے تدریسی و دعوتی پروگرامز کی فکری سرپرستی۔'
    ]
  },
  {
    id: 7,
    name: 'پروفیسر پیر مفتی علامہ حافظ سید محمد احمد جامی شاہ نقشبندی مجددی',
    role: 'پروفیسر، پیرِ طریقت، مفتیِ اعظم و سجادہ نشین',
    designation: 'پروفیسر، پیرِ طریقت، مفتیِ اعظم و سجادہ نشین، سلسلہ عالیہ نقشبندیہ مجددیہ',
    tier: 'professor',
    tierLabel: 'پروفیسر (Professor)',
    department: 'شعبہ تحفیظ القرآن، حسنِ قرآت و تزکیہ سلوک',
    education: 'الشہادۃ العالمیہ، حفظِ قرآنِ مجید، تخصص فی الفقہ والافتاء',
    specialization: 'سلسلہ عالیہ نقشبندیہ مجددیہ، افتاء، تجوید و حفظ اور ارشاد',
    image: '/gallery/7. Peer Mufti Allama Molana Hafiz Al Qari Syed Muhammad Ahmad Al maroof Jami Shah Naqshbandi Mujadadi.jpeg',
    email: 'jamiashererabbani07@gmail.com',
    contact: '03144081516',
    bio: 'پروفیسر پیر مفتی علامہ مولانا حافظ القاری سید محمد احمد المعروف جامی شاہ نقشبندی مجددی۔ آپ صاحبِ علم و تقویٰ، مسندِ افتاء کے تاجدار اور سلسلہ عالیہ نقشبندیہ مجددیہ کے مقتدر پیشوا ہیں۔ آپ نے شریعت و طریقت کے سنگم سے تشنگانِ علم و سلوک کو فیضیاب کیا ہے اور جامعہ شیرِ ربانی کے روحانی سرپرست ہیں۔',
    experience: '22+ سالہ تدریسی و روحانی خدمات',
    research: 'تصوفِ نقشبندی، فقہِ مجددی اور تجوید و قرآت کے اصول',
    courses: ['مکتوباتِ امامِ ربانی مجدد الف ثانی', 'اصولِ فقہ و افتاء', 'تجوید و حفظِ قرآن', 'سلوکِ نقشبندیہ'],
    languages: ['عربی', 'اردو', 'فارسی', 'پنجابی'],
    achievements: [
      'سلسلہ عالیہ نقشبندیہ مجددیہ کی ترویج اور خانقاہی اصلاحات۔',
      'سینکڑوں طلبہ کو حفظِ قرآن اور تجوید کی اعلیٰ اسناد سے نوازنا۔',
      'جامعہ شیرِ ربانی کے روحانی و تعلیمی شعبہ جات کی سرپرستی۔'
    ]
  },
  {
    id: 2,
    name: 'پروفیسر مولانا مفتی علی حمزہ صاحب',
    role: 'پروفیسر، استاذ الحدیث، شعبہ درسِ نظامی و دار الافتاء',
    designation: 'پروفیسر، استاذ الحدیث و سینئر فیکلٹی، جامعہ شیرِ ربانی',
    tier: 'professor',
    tierLabel: 'پروفیسر (Professor)',
    department: 'شعبہ درسِ نظامی و علومِ شریعہ',
    education: 'عالمیہ (درسِ نظامی) و تخصص فی الفقہ',
    specialization: 'فقہِ اسلامی، اصولِ فقہ، نحو و صرف اور عربی ادب',
    image: '/gallery/8. ali-hamza.jpeg',
    email: 'jamiashererabbani07@gmail.com',
    contact: '03144081516',
    bio: 'پروفیسر مولانا مفتی علی حمزہ صاحب جامعہ شیرِ ربانی میں فقہ، اصولِ فقہ اور عربی ادب کے نامور پروفیسر ہیں۔ آپ دار الافتاء کے سینئر فیکلٹی ممبر اور طلبہ کی علمی، اخلاقی اور فکری رہنمائی میں ہمہ وقت سرگرم رہتے ہیں۔',
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
    id: 9,
    name: 'پروفیسر پیر مفتی مولانا رانا محمد مبشر اکرم نقشبندی مجددی',
    role: 'پروفیسر، پیرِ طریقت، محقق علومِ اسلامیہ و سینئر فیکلٹی',
    designation: 'پروفیسر، مفتی و پیرِ طریقت، سلسلہ عالیہ نقشبندیہ',
    tier: 'professor',
    tierLabel: 'پروفیسر (Professor)',
    department: 'شعبہ اسلامیات، تقابلِ ادیان و معاصر علوم',
    education: 'ایم فل / پی ایچ ڈی اسکالر علومِ اسلامیہ، الشہادۃ العالمیہ (درسِ نظامی)',
    specialization: 'یونیورسٹی سطح کی تدریس، تقابلی ادیان، فقہ اور سلسلہ نقشبندیہ',
    image: '/gallery/9. Prof. Peer Mufti Molana Rana Muhammad Mubashar Akram Naqsbandi Mujaddadi.jpeg',
    email: 'jamiashererabbani07@gmail.com',
    contact: '03144081516',
    bio: 'پروفیسر پیر مفتی مولانا رانا محمد مبشر اکرم نقشبندی مجددی متبحر عالمِ دین، معروف پروفیسر اور صاحبِ ارشاد پیرِ طریقت ہیں۔ آپ نے یونیورسٹیوں اور مدارسِ دینیہ دونوں میں بیک وقت اعلیٰ تعلیمی و تدریسی خدمات سرانجام دی ہیں اور طلبہ کی علمی و روحانی بالیدگی میں پیش پیش ہیں۔',
    experience: '18+ سال کا تدریسی و تحقیقی تجربہ',
    research: 'معاصر اسلامی افکار، جدید تعلیمی مناہج اور صوفیانہ روایات کا ارتقاء',
    courses: ['اسلامیات و تقابلِ ادیان', 'فقہِ اسلامی اور معاصر تقاضے', 'تصوف و تصحیحِ نیت', 'اصولِ تحقیق و مقالہ نگاری'],
    languages: ['عربی', 'اردو', 'انگریزی', 'پنجابی'],
    achievements: [
      'ملکی و بین الاقوامی علمی کانفرنسز میں تحقیقی مقالات کی پیشکش۔',
      'جدید یونیورسٹی طلبہ میں اسلامی فکر و اقدار کے فروغ کے لیے خصوصی لیکچرز۔',
      'جامعہ شیرِ ربانی کے نصابی ارتقاء میں مشاورتی تعاون۔'
    ]
  },
  {
    id: 11,
    name: 'پروفیسر مفتی علامہ علی مرتضیٰ سیالوی (استاذ العلماء)',
    role: 'پروفیسر، استاذ العلماء، شعبہ اصولِ فقہ و منطق',
    designation: 'پروفیسر، استاذ العلماء، مفتی و نگرانِ تدریس',
    tier: 'professor',
    tierLabel: 'پروفیسر (Professor)',
    department: 'شعبہ اصولِ فقہ، منطق و علومِ عقلیہ',
    education: 'الشہادۃ العالمیہ فی العلوم الاسلامیہ، تخصص فی الفقہ والاصول',
    specialization: 'اصولِ فقہ، نحو و صرف، منطق و فلسفہ اور علمی مناظرہ',
    image: '/gallery/11. Mufti Allama Ali Murtaza Sialwi.jpeg',
    email: 'jamiashererabbani07@gmail.com',
    contact: '03144081516',
    bio: 'پروفیسر مفتی علامہ علی مرتضیٰ سیالوی درگاہ معلیٰ سیال شریف کی عظیم علمی و روحانی نسبت کے امین، جید فقیہ اور استاذ العلماء ہیں۔ آپ نے درسِ نظامی کی انتہائی دقیق کتب (اصول، منطق، بلاغت اور فقہ) کے تدریسی میدان میں منفرد مقام حاصل کیا ہے۔',
    experience: '16+ سال کا تدریسی تجربہ',
    research: 'اصولِ فقہ کی تطبیقات، علمِ کلام کے قواعد اور نحو و معانی',
    courses: ['نور الانوار فی اصول الفقہ', 'شرح ابن عقیل', 'مختصر المعانی', 'سلّم العلوم فی المنطق'],
    languages: ['عربی', 'اردو', 'فارسی'],
    achievements: [
      'درسِ نظامی کے درجنوں اساتذہ کرام کے استاد ہونے کا شرف۔',
      'دقیق فقہی و کلامی مسائل پر تحقیقی مقالات کی اشاعت۔',
      'جامعہ شیرِ ربانی کے امتحانی معیار اور تدریسی اسلوب کی سرپرستی۔'
    ]
  },
  {
    id: 10,
    name: 'پروفیسر مفتی علامہ ذیشان علی چشتی صابری',
    role: 'پروفیسر، مفتی و محقق، شعبہ افتاء و میراث',
    designation: 'پروفیسر، مفتی و مدرسِ شریعت، سلسلہ چشتیہ صابریہ',
    tier: 'professor',
    tierLabel: 'پروفیسر (Professor)',
    department: 'دار الافتاء و شعبہ علم الفرائض و میراث',
    education: 'عالمیہ (درسِ نظامی)، تخصص فی الفقہ الاسلامی',
    specialization: 'فقہی فتاویٰ، فرائض و میراث، عقائد و کلام اور خطابت',
    image: '/gallery/10. Mufti Allama Zeeshan Ali Chisti Sabri.jpeg',
    email: 'jamiashererabbani07@gmail.com',
    contact: '03144081516',
    bio: 'پروفیسر مفتی علامہ ذیشان علی چشتی صابری جید مفتی، متبحر عالم اور سلسلہ چشتیہ صابریہ کے معتبر اسکالر ہیں۔ آپ فقہِ حنفی، مسائلِ روزمرہ اور علومِ عربیہ کی تدریس میں اعلیٰ مہارت رکھتے ہیں اور جامعہ شیرِ ربانی کے مخلص دینی و فکری رفیق ہیں۔',
    experience: '12+ سال کا تدریسی و افتاء کا تجربہ',
    research: 'احکامِ میراث، خرید و فروخت کے جدید مسائل اور فقہِ حنفی کے قواعد',
    courses: ['علم الفرائض و تقسیمِ ترکہ', 'کنز الدقائق و قدوری', 'اصولِ الشاشی', 'فنِ خطابت'],
    languages: ['عربی', 'اردو', 'پنجابی'],
    achievements: [
      'سینکڑوں فقہی استفتاءات کے مدلل اور مستند جوابات کی تحریر۔',
      'میراث و ترکہ کی پیچیدہ قانونی و شرعی تقسیم میں مہارت۔',
      'درسِ نظامی کے طلبہ کے لیے تدریسی ورکشاپس کا انعقاد۔'
    ]
  },
  {
    id: 12,
    name: 'پروفیسر مفتی علامہ اسد عباس چشتی',
    role: 'پروفیسر، مدرسِ درسِ نظامی، تجوید و سیرتِ طیبہ',
    designation: 'پروفیسر، مفتی، مدرسِ درسِ نظامی و خطیب، سلسلہ عالیہ چشتیہ',
    tier: 'professor',
    tierLabel: 'پروفیسر (Professor)',
    department: 'شعبہ فقہ، تجوید القرآن و سیرت النبی ﷺ',
    education: 'عالمیہ (درسِ نظامی)، تخصص فی الفقہ والافتاء',
    specialization: 'فقہِ اسلامی، تجوید و قرآت، سیرت النبی ﷺ اور تدریسِ کتب',
    image: '/gallery/12. Mufti Allama Asad Abbas Chisti.jpeg',
    email: 'jamiashererabbani07@gmail.com',
    contact: '03144081516',
    bio: 'پروفیسر مفتی علامہ اسد عباس چشتی جلیل القدر مفتی، عالمِ باعمل اور سلسلہ عالیہ چشتیہ کے باکمال فاضل ہیں۔ آپ نے علومِ شریعہ، فتاویٰ نویسی اور قرآنی علوم کی تدریس میں قابلِ قدر خدمات انجام دی ہیں اور نئی نسل کو سنتِ نبوی کے سانچے میں ڈھالنے کے لیے سرگرم عمل ہیں۔',
    experience: '10+ سال کا تدریسی و دعوتی تجربہ',
    research: 'سیرت النبی ﷺ کی معاصر افادیت، تجارتی اخلاقیات اور فقہی فتاویٰ',
    courses: ['شرح الوقایہ', 'مشکوٰۃ المصابیح (قسمِ دوم)', 'تجوید القرآن', 'سیرت النبی ﷺ'],
    languages: ['عربی', 'اردو', 'پنجابی'],
    achievements: [
      'دار الافتاء میں روزمرہ کے بیسیوں سوالات کے مستند شرعی جوابات۔',
      'طلبہ کی تلفظ، تجوید اور حسنِ قرآت کی اصلاح کے لیے خصوصی کلاسز۔',
      'جامعہ شیرِ ربانی کے فلاحی و دعوتی مشن میں فعال کردار۔'
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
    <div className="min-h-screen flex flex-col bg-slate-50/50 font-urdu selection:bg-emerald-100 selection:text-emerald-900" dir="rtl">
      <Header />
      
      <main className="flex-1 pb-16 sm:pb-20">
        
        {/* HEADER SECTION (RESPONSIVE: CENTERED ON MOBILE, ALIGNED ON DESKTOP) */}
        <section className="bg-gradient-to-b from-slate-950 via-emerald-950 to-slate-900 text-white pt-10 sm:pt-14 pb-16 sm:pb-28 lg:pb-32 relative overflow-hidden text-right">
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: `url("${member.image || '/logo.jpeg'}")` }} />
          </div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Back to Faculty Directory */}
            <Link 
              href="/faculty" 
              className="inline-flex items-center gap-2 text-emerald-300 hover:text-white transition-colors mb-4 sm:mb-6 text-xs sm:text-sm font-bold"
            >
              <ArrowRight size={15} /> <span>تمام اساتذہ و فیکلٹی ڈائریکٹری پر واپس جائیں</span>
            </Link>
            
            <div className="flex flex-col lg:flex-row gap-6 lg:gap-10 items-center lg:items-end text-center lg:text-right">
              {/* Profile Image Box */}
              <div className="w-40 sm:w-52 md:w-60 aspect-[706/1024] bg-white rounded-2xl shadow-2xl overflow-hidden relative border-4 border-white shrink-0 mb-2 lg:-mb-24 z-20">
                <OptimizedImage 
                  src={member.image || "/logo.jpeg"}
                  alt={member.name}
                  fill
                  section="faculty"
                  className="object-cover object-top"
                />
              </div>
              
              {/* Profile Title & Roles */}
              <div className="flex-1 pb-2 z-20">
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  {/* Tier & Department Badges */}
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2 mb-2.5 sm:mb-3">
                    {member.tierLabel && (
                      <span className="px-3 py-1 rounded-lg text-xs font-bold bg-amber-400 text-slate-950 shadow-sm">
                        <Crown size={13} className="inline ml-1 -mt-0.5" />
                        {member.tierLabel}
                      </span>
                    )}
                    {member.department && (
                      <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-800/90 text-emerald-200 border border-emerald-500/40">
                        <Building2 size={13} className="inline ml-1 -mt-0.5" />
                        {member.department}
                      </span>
                    )}
                  </div>

                  <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black mb-2.5 leading-[1.8] sm:leading-[1.9] md:leading-[2.1]">
                    {member.name}
                  </h1>
                  
                  <div className="flex flex-wrap items-center justify-center lg:justify-start gap-x-4 gap-y-1.5 text-emerald-200 text-xs sm:text-sm font-bold">
                    <span className="flex items-center gap-1.5">
                      <Briefcase size={15} className="text-emerald-400 shrink-0" />
                      <span>{member.designation || member.role}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin size={15} className="text-emerald-400 shrink-0" />
                      <span>جامعہ شیرِ ربانی مانانوالہ، شیخوپورہ</span>
                    </span>
                  </div>
                </motion.div>
              </div>
              
              {/* Contact Action Buttons (Full width touch-targets on mobile) */}
              <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-2.5 sm:gap-3 z-20 lg:mb-2">
                <Link 
                  href={`mailto:${member.email || 'jamiashererabbani07@gmail.com'}`} 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-white text-slate-900 font-bold rounded-xl shadow-md hover:bg-slate-100 transition-all text-xs sm:text-sm"
                >
                  <Mail size={16} /> <span>ای میل بھیجیں</span>
                </Link>
                <Link 
                  href={`tel:${member.contact || '03144081516'}`} 
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 bg-emerald-700 text-white font-bold rounded-xl border border-emerald-600 hover:bg-emerald-600 transition-all text-xs sm:text-sm"
                >
                  <Phone size={16} /> <span>رابطہ کریں</span>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* --- MAIN CONTENT GRID (RESPONSIVE STACK) --- */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6 sm:mt-10 lg:mt-28">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 text-right">
            
            {/* Right Main Column */}
            <div className="lg:col-span-8 space-y-6 sm:space-y-8">
              
              {/* 1. تعارف و سوانحی خلاصہ (Biography) */}
              <div className="bg-white p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs">
                <h2 className="text-lg sm:text-2xl font-black text-slate-900 mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-slate-100 flex items-center gap-2">
                  <UserCircle className="text-emerald-700" size={22} />
                  <span>سوانحی خلاصہ و ادارتی کردار</span>
                </h2>
                <p className="text-slate-700 leading-[2.2] sm:leading-[2.4] text-xs sm:text-sm md:text-base whitespace-pre-line text-justify">
                  {member.bio}
                </p>

                {/* Experience & Research Highlights */}
                {(member.experience || member.research) && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 mt-5 sm:mt-6 pt-5 sm:pt-6 border-t border-slate-100 text-xs sm:text-sm">
                    {member.experience && (
                      <div className="bg-emerald-50/70 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-emerald-100">
                        <span className="font-bold text-emerald-950 flex items-center gap-2 mb-1">
                          <Calendar size={15} className="text-emerald-700 shrink-0" />
                          <span>تدریسی، انتظامی و قومی تجربہ:</span>
                        </span>
                        <span className="text-slate-700 leading-relaxed">{member.experience}</span>
                      </div>
                    )}
                    {member.research && (
                      <div className="bg-teal-50/70 p-3.5 sm:p-4 rounded-xl sm:rounded-2xl border border-teal-100">
                        <span className="font-bold text-teal-950 flex items-center gap-2 mb-1">
                          <BookOpen size={15} className="text-teal-700 shrink-0" />
                          <span>تحقیقی میدان و مہارت:</span>
                        </span>
                        <span className="text-slate-700 leading-relaxed">{member.research}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* 2. تدریسی مضامین و کتب (Courses / Subjects Taught) */}
              {member.courses && member.courses.length > 0 && (
                <div className="bg-white p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs">
                  <h2 className="text-lg sm:text-2xl font-black text-slate-900 mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-slate-100 flex items-center gap-2">
                    <BookOpen className="text-emerald-700" size={22} />
                    <span>تدریسی مضامین، شعبہ جاتی ذمہ داریاں و کتب</span>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 sm:gap-3.5">
                    {member.courses.map((course, idx) => (
                      <div 
                        key={idx}
                        className="flex items-center gap-2.5 p-3 sm:p-3.5 rounded-xl bg-slate-50 border border-slate-200/70 text-slate-800 text-xs sm:text-sm font-bold"
                      >
                        <span className="w-2 h-2 rounded-full bg-emerald-600 shrink-0" />
                        <span>{course}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* 3. علمی خدمات و کارنامے (Achievements & Contributions) */}
              {member.achievements && member.achievements.length > 0 && (
                <div className="bg-white p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs">
                  <h2 className="text-lg sm:text-2xl font-black text-slate-900 mb-3 sm:mb-4 pb-2.5 sm:pb-3 border-b border-slate-100 flex items-center gap-2">
                    <Award className="text-emerald-700" size={22} />
                    <span>نمایاں خدمات و کارنامے</span>
                  </h2>
                  <ul className="space-y-2.5 sm:space-y-3">
                    {member.achievements.map((ach, idx) => (
                      <li 
                        key={idx}
                        className="flex items-start gap-2.5 sm:gap-3 text-slate-700 text-xs sm:text-sm leading-[2.1] sm:leading-[2.2]"
                      >
                        <CheckCircle2 size={16} className="text-emerald-700 shrink-0 mt-1" />
                        <span>{ach}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

            </div>

            {/* Left Sidebar Column */}
            <div className="lg:col-span-4 space-y-6">
              
              {/* Quick Info Card */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs space-y-3.5 sm:space-y-4">
                <h3 className="text-base sm:text-lg font-black text-slate-900 pb-2.5 sm:pb-3 border-b border-slate-100">
                  فوری تعلیمی کوائف
                </h3>
                
                {/* Department Info */}
                {member.department && (
                  <div className="space-y-0.5">
                    <span className="text-[11px] text-slate-500 block">منسلک شعبہ:</span>
                    <span className="text-xs sm:text-sm font-bold text-slate-900 block leading-relaxed">
                      {member.department}
                    </span>
                  </div>
                )}

                {/* Education */}
                <div className="space-y-0.5">
                  <span className="text-[11px] text-slate-500 block">تعلیمی اسناد و اسناد:</span>
                  <span className="text-xs sm:text-sm font-bold text-slate-900 block leading-relaxed">
                    {member.education}
                  </span>
                </div>

                {/* Specialization */}
                <div className="space-y-0.5">
                  <span className="text-[11px] text-slate-500 block">تخصص و علمی مہارت:</span>
                  <span className="text-xs sm:text-sm font-bold text-emerald-800 block leading-relaxed">
                    {member.specialization}
                  </span>
                </div>

                {/* Languages */}
                {member.languages && member.languages.length > 0 && (
                  <div className="space-y-1.5 pt-2 border-t border-slate-100">
                    <span className="text-[11px] text-slate-500 flex items-center gap-1.5">
                      <Languages size={13} className="text-emerald-700" />
                      <span>زبانیں:</span>
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {member.languages.map((lang, idx) => (
                        <span 
                          key={idx}
                          className="px-2.5 py-0.5 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-bold"
                        >
                          {lang}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Other Faculty Members List */}
              <div className="bg-white p-5 sm:p-6 rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-xs">
                <h3 className="text-base sm:text-lg font-black text-slate-900 pb-2.5 sm:pb-3 border-b border-slate-100 mb-3.5 flex items-center justify-between">
                  <span>جامعہ کے دیگر اساتذہ و شیوخ</span>
                  <Link href="/faculty" className="text-xs text-emerald-700 hover:underline">
                    تمام دیکھیں
                  </Link>
                </h3>
                
                <div className="space-y-2.5">
                  {related.slice(0, 8).map((item) => (
                    <Link
                      key={item.id}
                      href={`/faculty-profile?id=${item.id}`}
                      className="flex items-center gap-2.5 sm:gap-3 p-2 rounded-xl hover:bg-emerald-50/70 border border-transparent hover:border-emerald-200 transition-all group"
                    >
                      <div className="w-10 sm:w-11 h-13 sm:h-14 rounded-lg sm:rounded-xl overflow-hidden relative shrink-0 border border-slate-200 bg-slate-100">
                        <OptimizedImage
                          src={item.image || "/logo.jpeg"}
                          alt={item.name}
                          fill
                          section="faculty"
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-slate-900 text-xs truncate group-hover:text-emerald-700 transition-colors">
                          {item.name}
                        </h4>
                        <p className="text-[10px] sm:text-[11px] text-slate-500 truncate mt-0.5">
                          {item.role}
                        </p>
                      </div>
                      <ChevronLeft size={15} className="text-slate-400 group-hover:text-emerald-700 group-hover:-translate-x-1 transition-all shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* BOTTOM ADMISSIONS CTA */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 sm:mt-16 text-center">
          <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 shadow-lg">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-black mb-2 sm:mb-3">
              کیا آپ ہمارے جید اساتذہ کے زیرِ سایہ تعلیم حاصل کرنا چاہتے ہیں؟
            </h2>
            <p className="text-emerald-100/90 text-xs sm:text-sm md:text-base mb-5 sm:mb-6 max-w-2xl mx-auto leading-relaxed">
              جامعہ شیرِ ربانی کے مختلف تعلیمی شعبہ جات میں داخلے جاری ہیں۔ علمِ نافع کے سفر کا حصہ بنیں۔
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link 
                href="/admissions" 
                className="w-full sm:w-auto px-6 sm:px-7 py-2.5 sm:py-3 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold rounded-xl shadow-md transition-all text-xs sm:text-sm"
              >
                آن لائن داخلہ فارم پر کریں
              </Link>
              <Link 
                href="/contact" 
                className="w-full sm:w-auto px-6 sm:px-7 py-2.5 sm:py-3 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-bold rounded-xl transition-all text-xs sm:text-sm"
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
      <div className="min-h-screen flex items-center justify-center font-urdu">
        <div className="text-center">
          <div className="inline-block w-10 h-10 border-4 border-slate-200 border-t-emerald-700 rounded-full animate-spin mb-3"></div>
          <div className="text-sm font-bold text-slate-700">پروفائل لوڈ ہو رہی ہے...</div>
        </div>
      </div>
    }>
      <FacultyProfileContent />
    </Suspense>
  );
}
