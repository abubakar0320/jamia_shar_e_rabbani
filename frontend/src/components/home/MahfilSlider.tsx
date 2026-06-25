'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';

const images = [
  '/images/mahfil.png',
  '/images/mahfil1.jpeg',
  '/images/mahfil2.jpeg',
  '/images/mahfil3.jpeg'
];

export default function MahfilSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevSlide = () => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <section className="py-16 md:py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-5xl font-black text-slate-800 tracking-tighter uppercase mb-12">Mahfil Highlights</h2>
          <p className="text-slate-500 font-bold max-w-2xl mx-auto">A glimpse into our recent gatherings and events.</p>
        </div>

        <div className="relative w-full max-w-5xl mx-auto aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="absolute inset-0"
            >
              <OptimizedImage
                src={images[currentIndex]}
                fill
                alt={`Mahfil Slide ${currentIndex + 1}`}
                section="campus"
                className="object-contain md:object-cover"
              />
            </motion.div>
          </AnimatePresence>

          <button 
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur-md rounded-full text-emerald-800 hover:bg-white hover:scale-110 transition-all z-20 shadow-lg"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/80 backdrop-blur-md rounded-full text-emerald-800 hover:bg-white hover:scale-110 transition-all z-20 shadow-lg"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-3 z-20">
            {images.map((_, idx) => (
              <button 
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`w-3 h-3 rounded-full transition-all ${idx === currentIndex ? 'bg-white scale-125 shadow-md' : 'bg-white/50 hover:bg-white/80'}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
