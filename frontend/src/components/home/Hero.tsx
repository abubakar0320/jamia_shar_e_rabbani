'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import OptimizedImage from '@/components/OptimizedImage';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';

export default function Hero() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=2000",
    "/images/mahfil.png",
    "/images/mahfil1.jpeg",
    "/images/mahfil2.jpeg",
    "/images/mahfil3.jpeg"
  ];

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images.length]);

  return (
    <section className="relative w-full overflow-hidden bg-white pt-10">
      {!mounted ? (
        <div className="h-[600px] bg-slate-100 animate-pulse" />
      ) : (
        <div className="relative w-full max-w-[1600px] mx-auto h-[600px] flex items-center">
          <div className="absolute inset-0 w-full h-full">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
                className="absolute inset-0"
              >
                <OptimizedImage 
                  src={images[currentSlide]} 
                  alt={t('hero_image_alt')}
                  fill
                  priority
                  section="hero"
                  className="object-cover object-center"
                  sizes="100vw"
                />
              </motion.div>
            </AnimatePresence>
          </div>
          
          <div className="relative z-10 w-full h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-end pb-12 md:pb-0 md:items-center">
            <div className="bg-white/90 md:bg-white backdrop-blur-md p-6 md:p-12 shadow-2xl border-t-4 border-rose-500 rounded-2xl md:rounded-3xl max-w-lg border border-slate-100 mb-8 md:mb-0 w-full">
              <span className="inline-block bg-blue-50 text-blue-600 border border-blue-200 px-4 py-1 rounded-full shadow-sm text-xs font-bold mb-4">
                {t('hero_admissions_badge')}
              </span>
              <h1 className="text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 drop-shadow-sm mb-3 md:mb-4 leading-tight">
                {t('hero_title_start')} {t('hero_title_accent')} {t('hero_title_end')}
              </h1>
              <p className="text-sm md:text-base text-slate-800 font-medium mb-6 md:mb-8">
                {t('hero_description')}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                <Link 
                  href="/admissions" 
                  className="inline-flex items-center justify-center bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/40 hover:from-rose-600 hover:to-orange-600 font-bold px-6 py-3 rounded-full transform hover:-translate-y-1 transition-all text-sm md:text-base"
                >
                  {t('hero_apply_now')}
                </Link>
                <Link 
                  href="/courses" 
                  className="inline-flex items-center justify-center px-6 py-2.5 text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 drop-shadow-sm text-sm md:text-base font-bold hover:underline group"
                >
                  {t('hero_view_programs')} <ChevronRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          </div>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {images.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`w-3 h-3 rounded-full transition-all border-2 border-white ${idx === currentSlide ? 'bg-white' : 'bg-transparent hover:bg-white/50'}`}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

