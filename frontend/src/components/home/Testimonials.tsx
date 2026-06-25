'use client';

import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';

export default function Testimonials() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-8 bg-white shadow-lg rounded-2xl border border-amber-100 hover:border-amber-300 hover:shadow-xl transition-all shadow-md backdrop-blur-sm border-teal-700">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto text-center"
           >
              <div className="flex justify-center gap-1 text-yellow-400 mb-4">
                 {[1,2,3,4,5].map(i => <Star key={i} size={16} fill="currentColor" />)}
              </div>
              <p className="text-xl md:text-2xl font-semibold text-slate-900 leading-snug mb-4">
                &quot;{t('testimonial_quote')}&quot;
              </p>
              <div className="flex flex-col items-center">
                 <div className="w-12 h-12 relative mb-2">
                     <OptimizedImage 
                         src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?auto=format&fit=crop&q=80&w=150" 
                         fill
                         section="student"
                         className="rounded-full object-cover" 
                         alt={t('testimonial_student_alt')} 
                         sizes="48px"
                     />
                 </div>
                 <h4 className="text-sm font-semibold text-slate-900">{t('testimonial_student_name')}</h4>
                 <p className="text-teal-600 text-xs">{t('testimonial_student_role')}</p>
              </div>
           </motion.div>
       </div>
    </section>
  );
}
