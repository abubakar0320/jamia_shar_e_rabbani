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
    id: 4,
    name: 'حافظ محمد احمد علی ربانی',
    role: 'نائب مہتمم و ناظمِ تعلیمات (Director of Education)',
    designation: 'نائب مہتمم و ناظمِ تعلیمات (Director of Education)، جامعہ شیرِ ربانی',
    education: 'عالمیہ (درسِ نظامی)، وفاق المدارس الاسلامیہ الرضویہ | الشہادۃ العالمیہ فی العلوم الاسلامیہ والعربیۃ',
    specialization: 'علومِ شریعہ، تدریسی نظم و نسق، نصاب سازی و ایجوکیشنل ایڈمنسٹریشن',
    image: '/hafiz-ahmad-ali.jpeg',
    email: 'jamiashererabbani07@gmail.com',
    contact: '+966540532511',
    bio: 'حافظ محمد احمد علی ربانی جامعہ شیرِ ربانی کے نائب مہتمم اور ناظمِ تعلیمات (Director of Education) ہیں۔ آپ جامعہ کے تمام شعبہ جات (درسِ نظامی، حفظ و تجوید، تخصصات) کے یومیہ تدریسی نظم و ضبط، امتحانی نظام، اساتذہ کی علمی رہنمائی اور طلبہ کے تعلیمی معیار کی مکمل نگرانی فرماتے ہیں۔ آپ کی فکری و انتظامی بصیرت کے تحت جامعہ میں جدید تقاضوں کے مطابق دینی و عصری تعلیم کا مربوط نظام کامیابی سے جاری ہے۔',
    experience: '10+ سال کا انتظامی و تدریسی تجربہ',
    research: 'نظامِ تعلیم، اسلامی نصاب سازی، اخلاقی تربیت اور مدرسہ ایڈمنسٹریشن',
    courses: [
      'نصاب و تدریسی منصوبہ بندی (Curriculum Planning)',
      'امتحانی طریقہ کار و طلبہ کونسلنگ',
      'شعبہ تحفیظ القرآن و تجوید کی نگرانی',
      'درسِ نظامی تدریسی و اخلاقی ورکشاپس'
    ],
    languages: ['عربی', 'اردو', 'پنجابی'],
    achievements: [
      'جامعہ شیرِ ربانی کے تمام تعلیمی شعبہ جات اور امتحانی نظام کی کامیاب سربراہی۔',
      'وفاق المدارس الاسلامیہ الرضویہ کے امتحانات میں طلبہ کے شاندار نتائج و پوزیشنز کی رہنمائی۔',
      'طلبہ کی ہمہ جہت تعلیمی، اخلاقی اور فکری نشوونما کے لیے جدید تعلیمی ورکشاپس کا انعقاد۔'
    ]
  },
  {
    id: 2,
    name: 'مولانا مفتی علی حمزہ صاحب',
    role: 'استاذ الحدیث و شعبہ درسِ نظامی',
    designation: 'استاذ الحدیث و نگرانِ شعبہ درسِ نظامی',
    education: 'عالمیہ (درسِ نظامی) و تخصص فی الفقہ',
    specialization: 'فقہِ اسلامی، اصولِ فقہ و عربی ادب',
    image: '/ali-hamza.jpeg',
    email: 'jamiashererabbani07@gmail.com',
    contact: '03144081516',
    bio: 'مولانا مفتی علی حمزہ صاحب جامعہ شیرِ ربانی میں فقہ، اصولِ فقہ اور عربی ادب کے نامور مدرس ہیں۔ آپ دار الافتاء کے نگران اور طلبہ کی علمی، اخلاقی اور فکری رہنمائی میں ہمہ وقت سرگرم رہتے ہیں۔',
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
    name: 'محترم ابوبکر صدیق صاحب',
    role: 'ڈائریکٹر انفارمیشن ٹیکنالوجی و ہیڈ آف سافٹ ویئر سسٹمز',
    designation: 'ڈائریکٹر انفارمیشن ٹیکنالوجی و ہیڈ آف انٹرن شپ پروگرام، جامعہ شیرِ ربانی',
    education: 'بی ایس انفارمیشن ٹیکنالوجی (BSIT)، بابا گرو نانک یونیورسٹی | گوگل و سسکو سرٹیفائیڈ',
    specialization: 'فل اسٹیک ویب ڈویلپمنٹ، کلاؤڈ انفراسٹرکچر، تعلیمی سسٹمز و ڈیٹا بیس آرکیٹیکچر',
    image: '/abubakar-latest.jpeg',
    email: 'abubakr.bgnu@gmail.com',
    contact: '03097354874',
    bio: 'محترم ابوبکر صدیق صاحب جامعہ شیرِ ربانی کے ڈائریکٹر انفارمیشن ٹیکنالوجی اور انٹرن شپ پروگرام کے سربراہ ہیں۔ آپ نے بابا گرو نانک یونیورسٹی (BGNU) سے بی ایس انفارمیشن ٹیکنالوجی کی تعلیم مکمل کی ہے اور گوگل پروجیکٹ مینجمنٹ و سسکو سائبر سیکیورٹی سرٹیفیکیشنز کے حامل ہیں۔ جامعہ شیرِ ربانی کے تمام ڈیجیٹل انفراسٹرکچر، پورٹلز، آن لائن داخلہ فارم سسٹم، امتحانی نتائج اور کلاؤڈ سیکیورٹی کی تکنیکی نگرانی اور تعمیر آپ کے سپرد ہے۔ اس کے علاوہ آپ جامعہ کے آفیشل انٹرن شپ پروگرام کے ذریعے نوجوانوں اور طلبہ کو پریکٹیکل آئی ٹی و سافٹ ویئر ڈویلپمنٹ کی تربیت فراہم کر رہے ہیں۔',
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
  },
  {
    id: 8,
    name: 'حضور ضیاء الامت جسٹس پیر محمد کرم شاہ الازہری علیہ الرحمہ',
    role: 'بانی و فکری پیشوا، مفسرِ قرآن و سابق جسٹس سپریم کورٹ',
    designation: 'مفسرِ قرآن، بانی دار العلوم محمدیہ غوثیہ و سابق جج شریعت بینچ سپریم کورٹ آف پاکستان',
    education: 'جامعہ الازہر مصر (ایم اے)، جامعہ دار العلوم دیوبند، جامعہ محمدیہ غوثیہ',
    specialization: 'تفسیرِ قرآن، سیرت نگاری، اسلامی عدالتی قوانین اور فقہِ تقابلی',
    image: '/gallery/1. Zayah ul umat justice peer muhammad karam shah.jpeg',
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
  {
    id: 5,
    name: 'پیر سید افتخار الحسن شاہ صاحب',
    role: 'سجادہ نشین، روحانی سرپرست و مربی',
    designation: 'سجادہ نشین آستانہ عالیہ و روحانی پیشوا، جامعہ شیرِ ربانی',
    education: 'علومِ دینیہ و تصوف، سلاسلِ طریقت',
    specialization: 'تزکیہ نفس، تصوف و اخلاق، خانقاہی نظام اور فکری رہنمائی',
    image: '/gallery/5. Peer Syed Iftikhar ul hassan shah.jpeg',
    email: 'jamiashererabbani07@gmail.com',
    contact: '03144081516',
    bio: 'پیر سید افتخار الحسن شاہ صاحب معروف روحانی پیشوا، سجادہ نشین آستانہ عالیہ اور صاحبِ نسبت بزرگ ہیں۔ آپ دینِ مبین کی ترویج، تصوف و روحانیت کی آبیاری اور نوجوان نسل کے اخلاقی سدھار میں پیش پیش ہیں اور جامعہ شیرِ ربانی مانانوالہ کے عظیم سرپرست، مربی اور دعا گو ہیں۔',
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
    name: 'مفتی محافظ القاری مولانا محمد کاشف رفیق انجم',
    role: 'خطیبِ اعظم سرگودھا، مفتی و مناظرِ اسلام',
    designation: 'خطیب ابن خطیب، خطیبِ اعظم سرگودھا و مفتیِ شریعت',
    education: 'الشہادۃ العالمیہ فی العلوم الاسلامیہ، تخصص فی الفقہ والافتاء',
    specialization: 'خطابت و بلاغت، تقابلِ ادیان، فقہِ حنفی اور مناظرہ و کلام',
    image: '/gallery/6. Mufti Mohafiz al qari molana muhammad kashif rafique anjum al maroof katib ibn katib katib azam sarghooda.jpeg',
    email: 'jamiashererabbani07@gmail.com',
    contact: '03144081516',
    bio: 'مفتی محافظ القاری مولانا محمد کاشف رفیق انجم المعروف خطیب ابن خطیب، خطیبِ اعظم سرگودھا۔ آپ عالمِ اسلام کے نامور خطیب، مناظرِ اسلام، مفتی اور مصلح ہیں۔ آپ کی سحر انگیز خطابت اور استدلالی اسلوب نے ملک بھر میں حقانیتِ اسلام کا پرچم بلند کیا ہے۔ جامعہ شیرِ ربانی کے تعلیمی و دعوتی پروگرامز میں آپ کی رہنمائی گراں قدر سرمایہ ہے۔',
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
    name: 'پیر مفتی علامہ حافظ سید محمد احمد جامی شاہ نقشبندی مجددی',
    role: 'پیرِ طریقت، مفتیِ اعظم و روحانی پیشوا',
    designation: 'پیرِ طریقت، مفتیِ اعظم و سجادہ نشین، سلسلہ عالیہ نقشبندیہ مجددیہ',
    education: 'الشہادۃ العالمیہ، حفظِ قرآنِ مجید، تخصص فی الفقہ والافتاء',
    specialization: 'سلسلہ عالیہ نقشبندیہ مجددیہ، افتاء، حفظ و تجوید اور ارشاد و سلوک',
    image: '/gallery/7. Peer Mufti Allama Molana Hafiz Al Qari Syed Muhammad Ahmad Al maroof Jami Shah Naqshbandi Mujadadi.jpeg',
    email: 'jamiashererabbani07@gmail.com',
    contact: '03144081516',
    bio: 'پیر مفتی علامہ مولانا حافظ القاری سید محمد احمد المعروف جامی شاہ نقشبندی مجددی۔ آپ صاحبِ علم و تقویٰ، مسندِ افتاء کے تاجدار اور سلسلہ عالیہ نقشبندیہ مجددیہ کے مقتدر پیشوا ہیں۔ آپ نے شریعت و طریقت کے سنگم سے تشنگانِ علم و سلوک کو فیضیاب کیا ہے اور جامعہ شیرِ ربانی کے روحانی سرپرست ہیں۔',
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
    id: 9,
    name: 'پروفیسر پیر مفتی مولانا رانا محمد مبشر اکرم نقشبندی مجددی',
    role: 'پروفیسر، مفتی و پیرِ طریقت',
    designation: 'پروفیسر، مفتی و پیرِ طریقت، سلسلہ عالیہ نقشبندیہ',
    education: 'ایم فل / پی ایچ ڈی اسکالر علومِ اسلامیہ، الشہادۃ العالمیہ (درسِ نظامی)',
    specialization: 'یونیورسٹی سطح کی اسلامی تدریس، تقابلی ادیان، فقہ اور سلسلہ نقشبندیہ',
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
    id: 10,
    name: 'مفتی علامہ ذیشان علی چشتی صابری',
    role: 'مفتی، مدرسِ شریعت و خطیب',
    designation: 'مفتی و مدرسِ شریعت، سلسلہ چشتیہ صابریہ',
    education: 'عالمیہ (درسِ نظامی)، تخصص فی الفقہ الاسلامی',
    specialization: 'فقہی فتاویٰ، فرائض و میراث، عقائد و کلام اور خطابت',
    image: '/gallery/10. Mufti Allama Zeeshan Ali Chisti Sabri.jpeg',
    email: 'jamiashererabbani07@gmail.com',
    contact: '03144081516',
    bio: 'مفتی علامہ ذیشان علی چشتی صابری جید مفتی، متبحر عالم اور سلسلہ چشتیہ صابریہ کے معتبر اسکالر ہیں۔ آپ فقہِ حنفی، مسائلِ روزمرہ اور علومِ عربیہ کی تدریس میں اعلیٰ مہارت رکھتے ہیں اور جامعہ شیرِ ربانی کے مخلص فکری رفیق ہیں۔',
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
    id: 11,
    name: 'مفتی علامہ علی مرتضیٰ سیالوی',
    role: 'استاذ العلماء، مفتی و محقق',
    designation: 'استاذ العلماء، مفتی و نگرانِ تدریس',
    education: 'الشہادۃ العالمیہ فی العلوم الاسلامیہ، تخصص فی الفقہ والاصول',
    specialization: 'اصولِ فقہ، نحو و صرف، منطق و فلسفہ اور علمی مناظرہ',
    image: '/gallery/11. Mufti Allama Ali Murtaza Sialwi.jpeg',
    email: 'jamiashererabbani07@gmail.com',
    contact: '03144081516',
    bio: 'مفتی علامہ علی مرتضیٰ سیالوی درگاہ معلیٰ سیال شریف کی عظیم علمی و روحانی نسبت کے امین، جید فقیہ اور استاذ العلماء ہیں۔ آپ نے درسِ نظامی کی انتہائی دقیق کتب (اصول، منطق، بلاغت اور فقہ) کے تدریسی میدان میں منفرد مقام حاصل کیا ہے۔',
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
    id: 12,
    name: 'مفتی علامہ اسد عباس چشتی',
    role: 'مفتی، مدرسِ درسِ نظامی و خطیب',
    designation: 'مفتی، مدرسِ درسِ نظامی و خطیب، سلسلہ عالیہ چشتیہ',
    education: 'عالمیہ (درسِ نظامی)، تخصص فی الفقہ والافتاء',
    specialization: 'فقہِ اسلامی، تجوید و قرآت، سیرت النبی ﷺ اور تدریسِ کتب',
    image: '/gallery/12. Mufti Allama Asad Abbas Chisti.jpeg',
    email: 'jamiashererabbani07@gmail.com',
    contact: '03144081516',
    bio: 'مفتی علامہ اسد عباس چشتی جلیل القدر مفتی، عالمِ باعمل اور سلسلہ عالیہ چشتیہ کے باکمال فاضل ہیں۔ آپ نے علومِ شریعہ، فتاویٰ نویسی اور قرآنی علوم کی تدریس میں قابلِ قدر خدمات انجام دی ہیں اور نئی نسل کو سنتِ نبوی کے سانچے میں ڈھالنے کے لیے سرگرم عمل ہیں۔',
    experience: '10+ سال کا تدریسی و دعوتی تجربہ',
    research: 'سیرت النبی ﷺ کی معاصر افادیت، تجارتی اخلاقیات اور فقہی فتاویٰ',
    courses: ['شرح الوقایہ', 'مشکوٰۃ المصابیح (قسمِ دوم)', 'تجوید القرآن', 'سیرت النبی ﷺ'],
    languages: ['عربی', 'اردو', 'پنجابی'],
    achievements: [
      'دار الافتاء میں روزمرہ کے بیسیوں سوالات کے مستند شرعی جوابات۔',
      'طلبہ کی تلفظ، تجوید اور حسنِ قرآت کی اصلاح کے لیے خصوصی کلاسز۔',
      'جامعہ شیرِ ربانی کے فلاحی و دعوتی مشن میں فعال کردار۔'
    ]
  },
  {
    id: 13,
    name: 'پروفیسر ڈاکٹر مفتی محمد امین بھٹی صاحب',
    role: 'پروفیسر ڈاکٹر، بین الاقوامی محقق و مفتیِ اعظم',
    designation: 'پروفیسر ڈاکٹر، بین الاقوامی محقق و مفتیِ اعظم، جامعہ شیرِ ربانی',
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
              <div className="w-44 sm:w-52 md:w-60 aspect-[706/1024] bg-white rounded-2xl shadow-2xl overflow-hidden relative border-4 border-white shrink-0 mb-0 lg:-mb-24 z-20">
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
