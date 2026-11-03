'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
  tabLabel: string;
  tabEn: string;
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
}

// Iconic Microsoft 4-Color Quad
function MicrosoftQuad() {
  return (
    <span className="inline-grid grid-cols-2 gap-0.5 w-3.5 h-3.5 shrink-0" aria-hidden="true">
      <span className="w-1.5 h-1.5 bg-[#f25022] rounded-[0.5px]" />
      <span className="w-1.5 h-1.5 bg-[#7fba00] rounded-[0.5px]" />
      <span className="w-1.5 h-1.5 bg-[#00a4ef] rounded-[0.5px]" />
      <span className="w-1.5 h-1.5 bg-[#ffb900] rounded-[0.5px]" />
    </span>
  );
}

export default function Hero() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides: SlideData[] = [
    {
      id: 'slide-1',
      image: '/images/admission.jpeg',
      tabLabel: 'داخلہ 2024-2025',
      tabEn: 'Admissions Open',
      badge: '✦ داخلہ برائے سال 2024-2025 جاری ہے • Admissions Open',
      titleStart: 'جامعہ شیرِ ربانی',
      titleAccent: 'دینی و عصری علوم',
      titleEnd: 'کا عظیم تعلیمی مرکز',
      subtitleUrdu: 'وفاق المدارس الاسلامیہ الرضویہ پاکستان سے باقاعدہ الحاق شدہ ادارہ',
      description: 'حفظِ قرآن، درسِ نظامی (عالم و فاضل کورس)، تجوید و قرات اور تخصصات فی الفقہ کی اعلیٰ ترین دینی و عصری تعلیم۔',
      caption: 'مرکزی کیمپس • جامعہ شیرِ ربانی مانانوالہ',
      ctaPrimary: { label: t('apply_now', 'آن لائن داخلہ فارم'), href: '/admissions' },
      ctaSecondary: { label: t('courses', 'شعبہ جات و کورسز'), href: '/courses' },
      fluentAccent: '#0078d4', // Microsoft Fluent Blue
    },
    {
      id: 'slide-2',
      image: '/images/mahfil.png',
      tabLabel: 'Academic Excellence',
      tabEn: 'Sacred Tradition',
      badge: '✦ وفاق المدارس الاسلامیہ الرضویہ • Affiliated Institution',
      titleStart: 'Where Sacred Tradition',
      titleAccent: 'Meets Academic',
      titleEnd: 'Excellence',
      subtitleUrdu: 'Nurturing Scholars of Faith, Character & Wisdom',
      description: 'A premier Islamic seminary dedicated to sacred Islamic scholarship, research, and holistic spiritual growth under distinguished mentors.',
      caption: 'سالانہ دستارِ فضیلت و تقسیمِ اسناد ہال',
      ctaPrimary: { label: t('apply_now', 'Apply Online'), href: '/admissions' },
      ctaSecondary: { label: t('courses', 'Explore Courses'), href: '/courses' },
      fluentAccent: '#107c41', // Microsoft Fluent Green
    },
    {
      id: 'slide-3',
      image: '/images/mahfil1.jpeg',
      tabLabel: 'روحانی و تعلیمی تربیت',
      tabEn: 'Convocation & Seminars',
      badge: '✦ سالانہ محافل و تقاریب دستارِ فضیلت • Convocation & Seminars',
      titleStart: 'روحانی تربیت و',
      titleAccent: 'علمی بصیرت',
      titleEnd: 'کا تابناک گہوارہ',
      subtitleUrdu: 'طلبہ کے لیے مفت معیاری رہائش، طعام اور پرسکون اسلامی ماحول',
      description: 'دینی علوم کے ساتھ ساتھ اخلاقی نشوونما اور جدید عصری تقاضوں سے ہم آہنگ کردار سازی کا قابلِ اعتماد ادارہ۔',
      caption: 'سالانہ روحانی اجتماع و کانفرنس',
      ctaPrimary: { label: 'نتائج وفاق المدارس', href: '/wafaq-results' },
      ctaSecondary: { label: 'جامعہ کا تعارف', href: '/about' },
      fluentAccent: '#d83b01', // Microsoft Fluent Orange
    },
    {
      id: 'slide-4',
      image: '/images/tajweed.jpeg',
      tabLabel: 'شعبہ حفظ و تجوید',
      tabEn: 'Tehfeez & Tajweed',
      badge: '✦ شعبہ حفظ و تجوید و قرات • Tehfeez & Tajweed Department',
      titleStart: 'قرآن فہمی اور',
      titleAccent: 'سنتِ مصطفیٰ ﷺ',
      titleEnd: 'کی روشنی',
      subtitleUrdu: 'معروف و مستند اساتذہ کرام کی زیرِ سرپرستی منظم نصابِ تعلیم',
      description: 'طلبہ کو دورِ جدید کے چیلنجز کا سامنا کرنے کے قابل بنانے کے لیے عربی تکلم اور تحقیقی مہارتوں کی خصوصی تربیت۔',
      caption: 'علمی و فکری سیمینار ہال',
      ctaPrimary: { label: 'داخلہ کی معلومات', href: '/admissions' },
      ctaSecondary: { label: 'ہم سے رابطہ کریں', href: '/contact' },
      fluentAccent: '#8764b8', // Microsoft Fluent Purple
    },
  ];

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  useEffect(() => {
    setMounted(true);
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  if (!mounted) {
    return (
      <section className="relative w-full h-[520px] bg-[#faf9f8] animate-pulse flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-[#0078d4] border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  const slide = slides[currentSlide];

  return (
    <section 
      className="relative w-full bg-[#faf9f8] text-[#242424] font-sans border-b border-[#edebe9] overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      style={{
        backgroundImage: 'radial-gradient(#d2d0ce 1px, transparent 1px)',
        backgroundSize: '32px 32px',
      }}
    >
      {/* Microsoft Signature 4-Color Accent Top Bar */}
      <div className="absolute top-0 inset-x-0 h-[3px] bg-gradient-to-r from-[#f25022] via-[#7fba00] via-[#00a4ef] to-[#ffb900] z-20" />

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
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.45, ease: 'easeOut' }}
                className="space-y-4 sm:space-y-5"
              >
                {/* Microsoft Fluent Badge */}
                <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md bg-white border border-[#edebe9] text-[#323130] text-xs sm:text-sm font-semibold shadow-2xs">
                  <MicrosoftQuad />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#107c41] animate-pulse" />
                  <span className="tracking-tight">{slide.badge}</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-semibold text-[#201f1e] tracking-tight leading-[1.18]">
                  <span>{slide.titleStart} </span>
                  <span 
                    className="font-bold underline decoration-[#0078d4]/30 decoration-2 underline-offset-8 transition-colors duration-300"
                    style={{ color: slide.fluentAccent }}
                  >
                    {slide.titleAccent}{' '}
                  </span>
                  <span>{slide.titleEnd}</span>
                </h1>

                {/* Subtitle Urdu */}
                <p className="text-[#107c41] font-semibold text-base sm:text-lg md:text-xl leading-relaxed flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#107c41]" />
                  <span>{slide.subtitleUrdu}</span>
                </p>

                {/* Description */}
                <p className="text-[#605e5c] text-sm sm:text-base md:text-[17px] leading-relaxed max-w-2xl font-normal">
                  {slide.description}
                </p>

                {/* Microsoft Fluent CTA Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link
                    href={slide.ctaPrimary.href}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#0078d4] hover:bg-[#106ebe] text-white font-semibold text-sm sm:text-base rounded-md shadow-xs hover:shadow-md active:scale-[0.99] transition-all tracking-wide"
                  >
                    <span>{slide.ctaPrimary.label}</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>

                  <Link
                    href={slide.ctaSecondary.href}
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white hover:bg-[#f3f2f1] text-[#201f1e] font-semibold text-sm sm:text-base rounded-md border border-[#8a8886] hover:border-[#323130] shadow-2xs hover:shadow-xs active:scale-[0.99] transition-all tracking-wide"
                  >
                    <span>{slide.ctaSecondary.label}</span>
                    <ExternalLink className="w-4 h-4 text-[#605e5c]" />
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick Trust Checklist (Microsoft Security & Trust Badge Style) */}
            <div className="pt-4 border-t border-[#edebe9] flex flex-wrap gap-2.5 sm:gap-4 text-xs sm:text-sm font-medium text-[#323130]">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-[#edebe9] shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#107c41] shrink-0" />
                <span>وفاق المدارس سے باقاعدہ الحاق</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-[#edebe9] shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#107c41] shrink-0" />
                <span>100% مفت تعلیم و ہاسٹل</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-white border border-[#edebe9] shadow-2xs">
                <CheckCircle2 className="w-4 h-4 text-[#107c41] shrink-0" />
                <span>اہلِ سنت کا مستند دینی مرکز</span>
              </div>
            </div>

          </div>

          {/* Right Column: Microsoft Fluent Side Box with Pictures */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="bg-white rounded-xl border border-[#edebe9] shadow-lg shadow-black/[0.04] p-4 sm:p-5 relative overflow-hidden backdrop-blur-sm">
              
              {/* Console Top Window Header */}
              <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-[#edebe9]">
                <div className="flex items-center gap-2">
                  <MicrosoftQuad />
                  <span className="text-xs font-semibold tracking-wider text-[#605e5c] uppercase">
                    Campus Showcase • جامعہ شیرِ ربانی
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

              {/* Main Image Stage inside Microsoft Side Box */}
              <div className="relative w-full aspect-[16/10] sm:aspect-[16/10] rounded-lg overflow-hidden border border-[#edebe9] bg-slate-100 shadow-inner group">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.03 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    className="absolute inset-0"
                  >
                    <Image
                      src={slide.image}
                      alt={slide.titleStart}
                      fill
                      priority
                      className="object-cover object-center"
                      sizes="(max-width: 1024px) 100vw, 50vw"
                    />

                    {/* Subtle soft gradient at the bottom for caption readability */}
                    <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/60 via-black/25 to-transparent pointer-events-none" />
                  </motion.div>
                </AnimatePresence>

                {/* Microsoft Fluent Frosted Caption Pill */}
                <div className="absolute bottom-3 left-3 z-10">
                  <div className="bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-md border border-white/60 shadow-md flex items-center gap-2">
                    <span 
                      className="w-2 h-2 rounded-full shrink-0" 
                      style={{ backgroundColor: slide.fluentAccent }}
                    />
                    <span className="text-xs font-semibold text-[#201f1e]">{slide.caption}</span>
                  </div>
                </div>

                {/* Verified Campus Badge */}
                <div className="absolute top-3 right-3 z-10">
                  <div className="bg-black/55 backdrop-blur-md px-2.5 py-1 rounded-md text-[11px] font-semibold text-white flex items-center gap-1.5 border border-white/20 shadow-sm">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#7fba00]" />
                    <span>تصدیق شدہ کیمپس</span>
                  </div>
                </div>

                {/* Prev & Next Floating Navigation Chevrons */}
                <button
                  onClick={prevSlide}
                  aria-label="Previous Slide"
                  className="absolute left-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-[#201f1e] flex items-center justify-center shadow-md transition-all hover:scale-105"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>

                <button
                  onClick={nextSlide}
                  aria-label="Next Slide"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 z-10 w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/90 hover:bg-white text-[#201f1e] flex items-center justify-center shadow-md transition-all hover:scale-105"
                >
                  <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
              </div>

              {/* Microsoft Fluent Segmented Interactive Navigation Tabs */}
              <div className="mt-4 pt-3.5 border-t border-[#edebe9]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[11px] font-semibold text-[#605e5c] uppercase tracking-wider">
                    Pillars Navigator
                  </span>
                  <span className="text-[11px] text-[#605e5c]">
                    وفاق المدارس سے باقاعدہ الحاق شدہ
                  </span>
                </div>

                {/* 4 Interactive Segmented Tabs */}
                <div className="grid grid-cols-4 gap-1.5">
                  {slides.map((s, idx) => {
                    const isActive = idx === currentSlide;
                    return (
                      <button
                        key={s.id}
                        onClick={() => setCurrentSlide(idx)}
                        className={`text-left p-2 rounded-md transition-all relative overflow-hidden ${
                          isActive 
                            ? 'bg-[#f3f2f1] text-[#201f1e] font-semibold shadow-2xs' 
                            : 'hover:bg-[#faf9f8] text-[#605e5c]'
                        }`}
                      >
                        <div className="text-[10px] font-mono opacity-60">0{idx + 1}</div>
                        <div className="text-[11px] font-medium truncate mt-0.5">{s.tabLabel}</div>
                        
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

      {/* Institutional Highlights Grid (Microsoft Fluent Enterprise Strip) */}
      <div className="relative z-10 bg-white border-t border-[#edebe9] py-6">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            
            <div className="flex items-center gap-3.5 p-3.5 rounded-lg bg-white hover:bg-[#faf9f8] border border-[#edebe9] hover:border-[#0078d4] shadow-2xs hover:shadow-xs transition-all group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-md bg-[#0078d4]/10 text-[#0078d4] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="text-xs sm:text-sm font-semibold text-[#201f1e]">درسِ نظامی و حفظ</div>
                <div className="text-[11px] text-[#605e5c] mt-0.5">جامع اسلامی نصاب</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-lg bg-white hover:bg-[#faf9f8] border border-[#edebe9] hover:border-[#107c41] shadow-2xs hover:shadow-xs transition-all group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-md bg-[#107c41]/10 text-[#107c41] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="text-xs sm:text-sm font-semibold text-[#201f1e]">وفاق المدارس الرضویہ</div>
                <div className="text-[11px] text-[#605e5c] mt-0.5">الحاق شدہ تعلیمی بورڈ</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-lg bg-white hover:bg-[#faf9f8] border border-[#edebe9] hover:border-[#d83b01] shadow-2xs hover:shadow-xs transition-all group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-md bg-[#d83b01]/10 text-[#d83b01] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="text-xs sm:text-sm font-semibold text-[#201f1e]">مفت رہائش و طعام</div>
                <div className="text-[11px] text-[#605e5c] mt-0.5">بہترین ہاسٹل سہولیات</div>
              </div>
            </div>

            <div className="flex items-center gap-3.5 p-3.5 rounded-lg bg-white hover:bg-[#faf9f8] border border-[#edebe9] hover:border-[#8764b8] shadow-2xs hover:shadow-xs transition-all group">
              <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-md bg-[#8764b8]/10 text-[#8764b8] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div className="leading-tight">
                <div className="text-xs sm:text-sm font-semibold text-[#201f1e]">مانانوالہ، شیخوپورہ</div>
                <div className="text-[11px] text-[#605e5c] mt-0.5">نزد ریلوے اسٹیشن</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
