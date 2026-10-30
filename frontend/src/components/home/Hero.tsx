'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight, ChevronLeft, BookOpen, Award, GraduationCap, MapPin, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';

interface SlideData {
  image: string;
  badge: string;
  titleStart: string;
  titleAccent: string;
  titleEnd: string;
  subtitleUrdu: string;
  description: string;
  caption: string;
  ctaPrimary: { label: string; href: string };
  ctaSecondary: { label: string; href: string };
}

export default function Hero() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slides: SlideData[] = [
    {
      image: '/results_hero_banner.jpg',
      badge: '✦ داخلہ برائے سال 2024-2025 جاری ہے • Admissions Open',
      titleStart: 'جامعہ شیرِ ربانی',
      titleAccent: 'دینی و عصری علوم',
      titleEnd: 'کا عظیم تعلیمی مرکز',
      subtitleUrdu: 'وفاق المدارس الاسلامیہ الرضویہ پاکستان سے باقاعدہ الحاق شدہ ادارہ',
      description: 'حفظِ قرآن، درسِ نظامی (عالم و فاضل کورس)، تجوید و قرات اور تخصصات فی الفقہ کی اعلیٰ ترین دینی و عصری تعلیم۔',
      caption: 'مرکزی کیمپس • جامعہ شیرِ ربانی مانانوالہ',
      ctaPrimary: { label: t('apply_now', 'آن لائن داخلہ فارم'), href: '/admissions' },
      ctaSecondary: { label: t('courses', 'شعبہ جات و کورسز'), href: '/courses' },
    },
    {
      image: '/images/mahfil.png',
      badge: '✦ وفاق المدارس الاسلامیہ الرضویہ • Affiliated Institution',
      titleStart: 'Where Sacred Tradition',
      titleAccent: 'Meets Academic',
      titleEnd: 'Excellence',
      subtitleUrdu: 'Nurturing Scholars of Faith, Character & Wisdom',
      description: 'A premier Islamic seminary dedicated to sacred Islamic scholarship, research, and holistic spiritual growth under distinguished mentors.',
      caption: 'سالانہ دستارِ فضیلت و تقسیمِ اسناد ہال',
      ctaPrimary: { label: t('apply_now', 'Apply Online'), href: '/admissions' },
      ctaSecondary: { label: t('courses', 'Explore Courses'), href: '/courses' },
    },
    {
      image: '/images/mahfil1.jpeg',
      badge: '✦ سالانہ محافل و تقاریب دستارِ فضیلت • Convocation & Seminars',
      titleStart: 'روحانی تربیت و',
      titleAccent: 'علمی بصیرت',
      titleEnd: 'کا تابناک گہوارہ',
      subtitleUrdu: 'طلبہ کے لیے مفت معیاری رہائش، طعام اور پرسکون اسلامی ماحول',
      description: 'دینی علوم کے ساتھ ساتھ اخلاقی نشوونما اور جدید عصری تقاضوں سے ہم آہنگ کردار سازی کا قابلِ اعتماد ادارہ۔',
      caption: 'سالانہ روحانی اجتماع و کانفرنس',
      ctaPrimary: { label: 'نتائج وفاق المدارس', href: '/wafaq-results' },
      ctaSecondary: { label: 'جامعہ کا تعارف', href: '/about' },
    },
    {
      image: '/images/mahfil2.jpeg',
      badge: '✦ شعبہ حفظ و تجوید و قرات • Tehfeez & Tajweed Department',
      titleStart: 'قرآن فہمی اور',
      titleAccent: 'سنتِ مصطفیٰ ﷺ',
      titleEnd: 'کی روشنی',
      subtitleUrdu: 'معروف و مستند اساتذہ کرام کی زیرِ سرپرستی منظم نصابِ تعلیم',
      description: 'طلبہ کو دورِ جدید کے چیلنجز کا سامنا کرنے کے قابل بنانے کے لیے عربی تکلم اور تحقیقی مہارتوں کی خصوصی تربیت۔',
      caption: 'علمی و فکری سیمینار ہال',
      ctaPrimary: { label: 'داخلہ کی معلومات', href: '/admissions' },
      ctaSecondary: { label: 'ہم سے رابطہ کریں', href: '/contact' },
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
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide]);

  if (!mounted) {
    return (
      <section className="relative w-full h-[520px] bg-slate-50 animate-pulse flex items-center justify-center">
        <div className="w-12 h-12 border-3 border-emerald-600 border-t-transparent rounded-full animate-spin" />
      </section>
    );
  }

  const slide = slides[currentSlide];

  return (
    <section 
      className="relative w-full bg-gradient-to-b from-emerald-50/40 via-white to-slate-50/60 font-sans border-b border-slate-100 overflow-hidden"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Background Decorative Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/30 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-100/30 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

      {/* Main Content Area */}
      <div className="relative max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-14">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Text & Call to Action */}
          <div className="lg:col-span-6 xl:col-span-6 space-y-5 sm:space-y-6">
            
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.5 }}
                className="space-y-4 sm:space-y-5"
              >
                {/* Badge */}
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-bold shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>{slide.badge}</span>
                </div>

                {/* Main Heading */}
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-black text-slate-900 tracking-tight leading-[1.15]">
                  <span>{slide.titleStart} </span>
                  <span className="text-emerald-700 underline decoration-emerald-200 decoration-wavy decoration-2 underline-offset-8">
                    {slide.titleAccent}{' '}
                  </span>
                  <span>{slide.titleEnd}</span>
                </h1>

                {/* Subtitle Urdu */}
                <p className="text-emerald-800 font-bold text-sm sm:text-base md:text-lg leading-relaxed">
                  {slide.subtitleUrdu}
                </p>

                {/* Description */}
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed max-w-xl">
                  {slide.description}
                </p>

                {/* CTA Buttons */}
                <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
                  <Link
                    href={slide.ctaPrimary.href}
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-black text-sm sm:text-base rounded-full shadow-lg shadow-emerald-700/20 hover:shadow-emerald-700/35 hover:-translate-y-0.5 transition-all uppercase tracking-wider"
                  >
                    {slide.ctaPrimary.label}
                    <ChevronRight className="ml-1.5 w-4 h-4 sm:w-5 sm:h-5" />
                  </Link>

                  <Link
                    href={slide.ctaSecondary.href}
                    className="inline-flex items-center justify-center px-6 sm:px-7 py-3.5 bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm sm:text-base rounded-full border border-slate-200 shadow-xs hover:border-slate-300 hover:-translate-y-0.5 transition-all tracking-wide"
                  >
                    {slide.ctaSecondary.label}
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick Trust Checklist */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-4 sm:gap-6 text-xs sm:text-sm font-semibold text-slate-700">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>وفاق المدارس سے باقاعدہ الحاق</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>100% مفت تعلیم و ہاسٹل</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>اہلِ سنت کا مستند دینی مرکز</span>
              </div>
            </div>

          </div>

          {/* Right Column: Interactive Image Carousel */}
          <div className="lg:col-span-6 xl:col-span-6">
            <div className="relative w-full aspect-[16/11] sm:aspect-[16/10] lg:aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl border-4 border-white ring-1 ring-slate-200/80 bg-slate-100">
              
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: 'easeOut' }}
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
                  <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-slate-900/60 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Slide Caption Pill */}
              <div className="absolute bottom-4 left-4 z-20">
                <div className="bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-white/60 shadow-md flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-600" />
                  <span className="text-xs font-bold text-slate-800">{slide.caption}</span>
                </div>
              </div>

              {/* Prev / Next Arrows */}
              <button
                onClick={prevSlide}
                aria-label="Previous Slide"
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg border border-slate-200/80 hover:scale-105 transition-all"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <button
                onClick={nextSlide}
                aria-label="Next Slide"
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full bg-white/90 hover:bg-white text-slate-800 flex items-center justify-center shadow-lg border border-slate-200/80 hover:scale-105 transition-all"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Slide Indicator Dots */}
              <div className="absolute bottom-4 right-4 z-20 flex items-center gap-1.5 bg-black/30 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    aria-label={`Go to slide ${idx + 1}`}
                    className={`transition-all duration-300 rounded-full ${
                      idx === currentSlide
                        ? 'w-6 h-2 bg-amber-400'
                        : 'w-2 h-2 bg-white/70 hover:bg-white'
                    }`}
                  />
                ))}
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Light Institutional Highlights Grid (Matching rest of website) */}
      <div className="relative z-10 bg-white border-t border-slate-100 py-6">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-6">
            
            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50/80 hover:bg-emerald-50/50 border border-slate-100 hover:border-emerald-200 transition-all group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="leading-tight">
                <div className="text-xs sm:text-sm font-black text-slate-900">درسِ نظامی و حفظ</div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5">جامع اسلامی نصاب</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50/80 hover:bg-emerald-50/50 border border-slate-100 hover:border-emerald-200 transition-all group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <Award className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="leading-tight">
                <div className="text-xs sm:text-sm font-black text-slate-900">وفاق المدارس الرضویہ</div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5">الحاق شدہ تعلیمی بورڈ</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50/80 hover:bg-emerald-50/50 border border-slate-100 hover:border-emerald-200 transition-all group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="leading-tight">
                <div className="text-xs sm:text-sm font-black text-slate-900">مفت رہائش و طعام</div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5">بہترین ہاسٹل سہولیات</div>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3.5 rounded-2xl bg-slate-50/80 hover:bg-emerald-50/50 border border-slate-100 hover:border-emerald-200 transition-all group">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-emerald-100/70 text-emerald-800 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <div className="leading-tight">
                <div className="text-xs sm:text-sm font-black text-slate-900">مانانوالہ، شیخوپورہ</div>
                <div className="text-[10px] sm:text-xs text-slate-500 mt-0.5">نزد ریلوے اسٹیشن</div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
