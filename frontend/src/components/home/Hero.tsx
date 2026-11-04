'use client';

import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { 
  ChevronRight, 
  ChevronLeft, 
  BookOpen, 
  Award, 
  GraduationCap, 
  MapPin, 
  CheckCircle2, 
  ShieldCheck, 
  Pause, 
  Play, 
  ArrowRight, 
  ExternalLink 
} from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SlideData {
  id: string;
  image: string;
  tabShort: string;
  tabLabel: string;
  badge: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  subtitleUrdu: string;
  description: string;
  caption: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
  fluentAccent: string;
  featurePill: string;
}

export default function Hero() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Exclusively using the 7 user-provided images (hero section 1 to 7) with tailored features
  const slides: SlideData[] = useMemo(() => [
    {
      id: 'slide-1',
      image: '/images/hero section 1.jpeg',
      tabShort: 'داخلہ جاری',
      tabLabel: 'آن لائن داخلہ 2024-25',
      badge: '✦ داخلہ برائے سال 2024-2025 باقاعدہ جاری ہے',
      titleStart: 'جامعہ شیرِ ربانی',
      titleAccent: 'دینی و عصری علوم',
      titleEnd: 'کا عظیم تعلیمی مرکز',
      subtitleUrdu: 'وفاق المدارس الاسلامیہ الرضویہ پاکستان سے باقاعدہ الحاق شدہ ادارہ',
      description: 'حفظِ قرآن، درسِ نظامی (عالم و فاضل کورس)، تجوید و قرات اور تخصصات فی الفقہ کی اعلیٰ ترین دینی و عصری تعلیم۔',
      caption: 'مرکزی کیمپس • جامعہ شیرِ ربانی مانانوالہ، ضلع شیخوپورہ',
      ctaPrimary: { label: 'آن لائن داخلہ فارم', href: '/admissions' },
      ctaSecondary: { label: 'شعبہ جات و کورسز', href: '/courses' },
      fluentAccent: '#0078d4', // Microsoft Fluent Blue
      featurePill: '100% مفت تعلیم و ہاسٹل',
    },
    {
      id: 'slide-2',
      image: '/images/hero section 2.jpeg',
      tabShort: 'درسِ نظامی',
      tabLabel: 'درسِ نظامی و شریعت',
      badge: '✦ باقاعدہ درسِ نظامی شعبہ • عالم و فاضل ڈگری پروگرام',
      titleStart: 'درسِ نظامی',
      titleAccent: 'عالم و فاضل کورس',
      titleEnd: 'کی مستند تعلیم',
      subtitleUrdu: 'قرآن، حدیث، فقہ اور اصولِ فقہ کی گہری اور مدلل تدریس',
      description: 'مستند جید علماء کرام کی زیرِ سرپرستی قدیم روایتی دینی علوم کے ساتھ ساتھ جدید عصری تقاضوں سے ہم آہنگ نصاب۔',
      caption: 'تدریسی ہال • شعبہ درسِ نظامی و کتب خانہ',
      ctaPrimary: { label: 'کورس کی تفصیلات', href: '/courses' },
      ctaSecondary: { label: 'آن لائن داخلہ', href: '/admissions' },
      fluentAccent: '#107c41', // Microsoft Fluent Green
      featurePill: 'وفاق المدارس الاسلامیہ الرضویہ سے الحاق',
    },
    {
      id: 'slide-3',
      image: '/images/hero section 3.jpeg',
      tabShort: 'حفظ و تجوید',
      tabLabel: 'شعبہ حفظ و قرات',
      badge: '✦ شعبہ تحفیظ القرآن الکریم و تجوید و قرات',
      titleStart: 'قرآن فہمی اور',
      titleAccent: 'تجوید و قرات',
      titleEnd: 'کا منور راستہ',
      subtitleUrdu: 'ماہر قراء کرام کی نگرانی میں صحیح مخارج اور لحنِ داؤدی کے ساتھ حفظِ قرآن',
      description: 'بچوں اور نوجوانوں کی حسنِ قرات، تجوید اور قرآن مجید کو مکمل قواعد کے ساتھ حفظ کروانے کا منظم شعبہ۔',
      caption: 'شعبہ تجوید و قرات • کلاس روم ویو',
      ctaPrimary: { label: 'شعبہ حفظ کی معلومات', href: '/courses' },
      ctaSecondary: { label: 'ہم سے رابطہ کریں', href: '/contact' },
      fluentAccent: '#d83b01', // Microsoft Fluent Orange
      featurePill: 'ماہر و مستند اساتذہ',
    },
    {
      id: 'slide-4',
      image: '/images/hero section 4.jpeg',
      tabShort: 'دستارِ فضیلت',
      tabLabel: 'سالانہ کانووکیشن',
      badge: '✦ سالانہ دستارِ فضیلت و تقسیمِ اسناد کانفرنس',
      titleStart: 'جامعہ شیرِ ربانی',
      titleAccent: 'سالانہ دستارِ فضیلت',
      titleEnd: 'و تقسیمِ اسناد کانفرنس',
      subtitleUrdu: 'فارغ التحصیل علماء و حفاظِ کرام کی دستار بندی اور اعزازی اسناد کی تقسیم',
      description: 'جامعہ کے فارغ التحصیل علماء، حفاظ اور قراء کرام کی خدمات کے اعتراف میں سالانہ عظیم الشان کانووکیشن اور دستارِ فضیلت کا پروقار انعقاد۔',
      caption: 'مرکزی سالانہ دستارِ فضیلت و تقسیمِ اسناد ہال',
      ctaPrimary: { label: 'نتائج وفاق المدارس الاسلامیہ الرضویہ', href: '/wafaq-results' },
      ctaSecondary: { label: 'جامعہ کا تعارف', href: '/about' },
      fluentAccent: '#008272', // Microsoft Fluent Teal
      featurePill: 'تصدیق شدہ آفیشل ڈگری',
    },
    {
      id: 'slide-5',
      image: '/images/hero section 5.jpeg',
      tabShort: 'روحانی تربیت',
      tabLabel: 'روحانی و اخلاقی تربیت',
      badge: '✦ سالانہ روحانی محافل و تربیتی سیمینارز',
      titleStart: 'روحانی تربیت و',
      titleAccent: 'علمی بصیرت',
      titleEnd: 'کا تابناک گہوارہ',
      subtitleUrdu: 'طلبہ کی باطنی و اخلاقی نشوونما اور پرسکون اسلامی ماحول',
      description: 'دینی علوم کے ساتھ ساتھ اخلاقی نشوونما، سنتِ نبوی پر عمل پیرا ہونے اور جدید دور کے چیلنجز کا سامنا کرنے کی بصیرت۔',
      caption: 'سالانہ روحانی اجتماع و کانفرنس ہال',
      ctaPrimary: { label: 'ہم سے رابطہ کریں', href: '/contact' },
      ctaSecondary: { label: 'جامعہ کا تعارف', href: '/about' },
      fluentAccent: '#8764b8', // Microsoft Fluent Purple
      featurePill: 'پرسکون اسلامی ماحول',
    },
    {
      id: 'slide-6',
      image: '/images/hero section 6.jpeg',
      tabShort: 'تحقیق و فقہ',
      tabLabel: 'تخصصات فی الفقہ',
      badge: '✦ شعبہ تخصصات فی الفقہ و اسلامک ریسرچ',
      titleStart: 'جدید فقہی مسائل اور',
      titleAccent: 'تحقیقی مہارتوں',
      titleEnd: 'کا مرکز',
      subtitleUrdu: 'عصرِ حاضر کے معاشی و سماجی مسائل کا شریعتِ مطہرہ کی روشنی میں حل',
      description: 'طلبہ کو تخصص فی الفقہ، اصولِ افتاء اور تحقیقی مقالہ جات تحریر کرنے کی اعلیٰ سطحی عملی ٹریننگ۔',
      caption: 'اسلامک ریسرچ و مفتی کورس ہال',
      ctaPrimary: { label: 'تخصص کورس تفصیلات', href: '/program?id=5' },
      ctaSecondary: { label: 'کورسز دیکھیں', href: '/courses' },
      fluentAccent: '#004e8c', // Microsoft Deep Blue
      featurePill: 'تخصص فی الفقہ و افتاء',
    },
    {
      id: 'slide-7',
      image: '/images/hero section 7.jpeg',
      tabShort: 'ہاسٹل و طعام',
      tabLabel: 'مفت رہائش و طعام',
      badge: '✦ طلبہ کے لیے مکمل کفالت • مفت رہائش و طعام',
      titleStart: 'معیاری رہائش،',
      titleAccent: 'لائبریری و کمپیوٹر لیب',
      titleEnd: 'کی سہولیات',
      subtitleUrdu: 'دور دراز سے آنے والے طلبہ کے لیے مکمل مفت معیاری طعام و ہاسٹل',
      description: 'جامعہ شیرِ ربانی میں مستحق و باصلاحیت طلبہ کو بغیر کسی فیس کے اعلیٰ رہائش، تین وقت کا معیاری کھانا اور طبی نگہداشت فراہم کی جاتی ہے۔',
      caption: 'طلبہ ہاسٹل و کیمپس رہائشی سہولیات',
      ctaPrimary: { label: 'داخلہ کی معلومات', href: '/admissions' },
      ctaSecondary: { label: 'عطیات و تعاون', href: '/donations' },
      fluentAccent: '#b4009e', // Microsoft Magenta
      featurePill: 'مفت ہاسٹل و کھانا',
    },
  ], []);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    setMounted(true);

    // Preload all 7 hero images into browser memory immediately for instant 0ms switching
    slides.forEach((s) => {
      const img = new window.Image();
      img.src = s.image;
    });

    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, slides]);

  if (!mounted) {
    return (
      <section className="relative w-full h-[540px] bg-[#faf9f8] animate-pulse flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#0078d4] border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  const slide = slides[currentSlide];

  return (
    <section 
      className="relative w-full bg-[#faf9f8] text-[#242424] border-b border-[#edebe9] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        backgroundImage: 'radial-gradient(#d2d0ce 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      {/* Elegant Jamia Signature Accent Top Bar */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-emerald-600 via-teal-500 to-amber-500 z-20" />

      {/* Subtle Microsoft Fluent Ambient Glows */}
      <div className="absolute -top-32 right-1/4 w-96 h-96 bg-[#0078d4]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 left-1/4 w-96 h-96 bg-[#107c41]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Content Area */}
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-8 sm:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Text & Call to Action */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-6">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="space-y-5 sm:space-y-6"
              >
                {/* Live Admissions & Affiliation Badge */}
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-white border border-[#edebe9] text-[#323130] text-xs sm:text-sm font-semibold shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse shrink-0" />
                  <span className="tracking-tight font-urdu">{slide.badge}</span>
                </div>

                {/* Main Heading in Noori Nastaleeq */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-semibold text-[#201f1e] tracking-tight leading-[1.9] sm:leading-[2.0] md:leading-[2.1] lg:leading-[2.2] xl:leading-[2.2] pb-1 font-urdu">
                  <span>{slide.titleStart} </span>
                  <span 
                    className="font-bold underline decoration-[#0078d4]/30 decoration-2 underline-offset-8 transition-colors duration-300"
                    style={{ color: slide.fluentAccent }}
                  >
                    {slide.titleAccent}{' '}
                  </span>
                  <span>{slide.titleEnd}</span>
                </h1>

                {/* Subtitle Urdu in Noori Nastaleeq */}
                <p className="text-[#107c41] font-semibold text-base sm:text-lg md:text-xl leading-[2.2] md:leading-[2.3] flex items-center gap-2 font-urdu">
                  <span className="w-2 h-2 rounded-full bg-[#107c41] shrink-0" />
                  <span>{slide.subtitleUrdu}</span>
                </p>

                {/* Description in Noori Nastaleeq */}
                <p className="text-[#605e5c] text-sm sm:text-base md:text-[17px] leading-[2.3] md:leading-[2.4] max-w-2xl font-normal font-urdu">
                  {slide.description}
                </p>

                {/* Microsoft Fluent CTA Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link
                    href={slide.ctaPrimary.href}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#0078d4] hover:bg-[#106ebe] text-white font-semibold text-sm sm:text-base rounded-md shadow-xs hover:shadow-md active:scale-[0.99] transition-all tracking-wide"
                  >
                    <span className="font-urdu">{slide.ctaPrimary.label}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href={slide.ctaSecondary.href}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3 bg-white hover:bg-[#f3f2f1] text-[#201f1e] font-semibold text-sm sm:text-base rounded-md border border-[#8a8886] hover:border-[#323130] shadow-2xs hover:shadow-xs active:scale-[0.99] transition-all tracking-wide"
                  >
                    <span className="font-urdu">{slide.ctaSecondary.label}</span>
                    <ExternalLink className="w-4 h-4 text-[#605e5c]" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick Trust Checklist (Noori Nastaleeq) */}
            <div className="pt-4 border-t border-[#edebe9] flex flex-wrap gap-2.5 sm:gap-4 text-xs sm:text-sm font-medium text-[#323130]">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-[#edebe9] shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#107c41] shrink-0" />
                <span className="font-urdu">وفاق المدارس الاسلامیہ الرضویہ سے باقاعدہ الحاق</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-[#edebe9] shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#107c41] shrink-0" />
                <span className="font-urdu">100% مفت تعلیم و ہاسٹل</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-[#edebe9] shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#107c41] shrink-0" />
                <span className="font-urdu">اہلِ سنت کا مستند دینی مرکز</span>
              </div>
            </div>

          </div>

          {/* Right Column: Microsoft Fluent Side Box with Pictures */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="bg-white rounded-xl border border-[#edebe9] shadow-lg shadow-black/[0.04] p-4 sm:p-5 relative overflow-hidden backdrop-blur-sm">
              
              {/* Console Top Window Header */}
              <div className="flex items-center justify-between pb-3 mb-3 border-b border-[#edebe9]">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-700 shrink-0" />
                  <span className="text-xs font-bold tracking-wide text-emerald-950 font-urdu">
                    جامعہ شیرِ ربانی
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {/* Slide index counter */}
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-[#f3f2f1] text-[#323130]">
                    0{currentSlide + 1} / 0{slides.length}
                  </span>

                  {/* Play / Pause Toggle */}
                  <button
                    onClick={() => setIsPaused(!isPaused)}
                    aria-label={isPaused ? 'Resume Slideshow' : 'Pause Slideshow'}
                    className="p-1 rounded hover:bg-[#f3f2f1] text-[#605e5c] transition-colors"
                  >
                    {isPaused ? <Play className="w-3.5 h-3.5" /> : <Pause className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>

              {/* Main Image Stage inside Microsoft Side Box - Proper Aspect Ratio with 100% full image visibility & instant zero-lag switching */}
              <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] rounded-lg overflow-hidden border border-[#edebe9] bg-[#141414] shadow-inner group">
                
                {/* All 7 slides pre-rendered & GPU-cached for instantaneous transition */}
                {slides.map((s, idx) => {
                  const isCurrent = idx === currentSlide;
                  return (
                    <div
                      key={s.id}
                      className={`absolute inset-0 transition-opacity duration-500 ease-in-out ${
                        isCurrent ? 'opacity-100 z-10 pointer-events-auto' : 'opacity-0 z-0 pointer-events-none'
                      }`}
                    >
                      {/* Ambient subtle blur to give Microsoft Fluent acrylic feel around letterbox edges */}
                      <div 
                        className="absolute inset-0 bg-cover bg-center blur-2xl opacity-35 scale-110 pointer-events-none"
                        style={{ backgroundImage: `url("${s.image}")` }}
                        aria-hidden="true"
                      />

                      {/* Foreground sharp picture - object-contain ensures 100% of the image is completely visible */}
                      <Image
                        src={s.image}
                        alt={s.titleStart}
                        fill
                        priority={idx === 0 || idx === 1}
                        unoptimized
                        className="object-contain object-center z-10 drop-shadow-md select-none"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />

                      {/* Soft gradient at bottom for high-contrast caption legibility */}
                      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/75 via-black/35 to-transparent pointer-events-none z-10" />
                    </div>
                  );
                })}

                {/* Microsoft Fluent Frosted Caption Pill */}
                <div className="absolute bottom-3 left-3 z-20 max-w-[70%]">
                  <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/60 shadow-md flex items-center gap-2">
                    <span 
                      className="w-2 h-2 rounded-full shrink-0 transition-colors duration-300" 
                      style={{ backgroundColor: slide.fluentAccent }}
                    />
                    <span className="text-xs font-semibold text-[#201f1e] truncate font-urdu">{slide.caption}</span>
                  </div>
                </div>

                {/* Verified Department / Feature Pill */}
                <div className="absolute top-3 right-3 z-20">
                  <div className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-white flex items-center gap-1.5 border border-white/20 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#7fba00]" />
                    <span className="font-urdu">{slide.featurePill}</span>
                  </div>
                </div>

                {/* Prev & Next Floating Navigation Chevrons */}
                <button
                  onClick={prevSlide}
                  aria-label="Previous Slide"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-[#201f1e] flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={nextSlide}
                  aria-label="Next Slide"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-20 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-[#201f1e] flex items-center justify-center shadow-md transition-all hover:scale-105 active:scale-95"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Microsoft Fluent Segmented Interactive Navigation Tabs for all 7 Slides */}
              <div className="mt-3.5 pt-3 border-t border-[#edebe9]">
                <div className="flex items-center justify-between mb-2 text-[11px]">
                  <div className="flex items-center gap-1.5 font-semibold text-[#201f1e]">
                    <span className="text-[#0078d4] font-mono">0{currentSlide + 1} / 07:</span>
                    <span className="font-urdu">{slide.tabLabel}</span>
                  </div>
                  <span className="text-[#605e5c] hidden sm:inline font-urdu">
                    وفاق المدارس الاسلامیہ الرضویہ سے باقاعدہ الحاق شدہ
                  </span>
                </div>

                {/* 7 Interactive Segmented Tabs */}
                <div className="grid grid-cols-7 gap-1">
                  {slides.map((s, idx) => {
                    const isActive = idx === currentSlide;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setCurrentSlide(idx)}
                        className={`text-center py-1.5 px-0.5 rounded transition-all relative overflow-hidden ${
                          isActive 
                            ? 'bg-[#f3f2f1] text-[#201f1e] font-bold shadow-2xs' 
                            : 'hover:bg-[#faf9f8] text-[#605e5c]'
                        }`}
                        title={s.tabLabel}
                      >
                        <div className="text-[10px] font-mono leading-none">0{idx + 1}</div>
                        <div className="text-[10px] font-medium truncate mt-0.5 hidden sm:block font-urdu">{s.tabShort}</div>
                        
                        {/* Animated Fluent Active Progress Line */}
                        {isActive && (
                          <motion.div
                            key={currentSlide}
                            initial={{ width: '0%' }}
                            animate={{ width: isPaused ? '100%' : '100%' }}
                            transition={{ duration: isPaused ? 0 : 6.5, ease: 'linear' }}
                            className="absolute bottom-0 inset-x-0 h-0.5"
                            style={{ backgroundColor: s.fluentAccent }}
                          />
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Institutional Highlights Grid (Noori Nastaleeq) */}
      <div className="relative z-10 bg-white border-t border-[#edebe9] py-6">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            
            <div className="flex items-center gap-3.5 p-3.5 rounded-lg bg-white hover:bg-[#faf9f8] border border-[#edebe9] hover:border-[#0078d4] shadow-2xs hover:shadow-xs transition-all group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-md bg-[#0078d4]/10 text-[#0078d4] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="text-xs sm:text-sm font-semibold text-[#201f1e] font-urdu">درسِ نظامی و حفظ</div>
                <div className="text-[11px] text-[#605e5c] mt-0.5 font-urdu">جامع اسلامی نصاب</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-lg bg-white hover:bg-[#faf9f8] border border-[#edebe9] hover:border-[#107c41] shadow-2xs hover:shadow-xs transition-all group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-md bg-[#107c41]/10 text-[#107c41] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="text-xs sm:text-sm font-semibold text-[#201f1e] font-urdu">وفاق المدارس الاسلامیہ الرضویہ</div>
                <div className="text-[11px] text-[#605e5c] mt-0.5 font-urdu">الحاق شدہ تعلیمی بورڈ</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-lg bg-white hover:bg-[#faf9f8] border border-[#edebe9] hover:border-[#d83b01] shadow-2xs hover:shadow-xs transition-all group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-md bg-[#d83b01]/10 text-[#d83b01] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="text-xs sm:text-sm font-semibold text-[#201f1e] font-urdu">مفت رہائش و طعام</div>
                <div className="text-[11px] text-[#605e5c] mt-0.5 font-urdu">بہترین ہاسٹل سہولیات</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-lg bg-white hover:bg-[#faf9f8] border border-[#edebe9] hover:border-[#8764b8] shadow-2xs hover:shadow-xs transition-all group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-md bg-[#8764b8]/10 text-[#8764b8] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="text-xs sm:text-sm font-semibold text-[#201f1e] font-urdu">مانانوالہ، ضلع شیخوپورہ</div>
                <div className="text-[11px] text-[#605e5c] mt-0.5 font-urdu">نزد ریلوے اسٹیشن</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
