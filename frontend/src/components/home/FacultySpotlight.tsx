'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import { ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';

export default function FacultySpotlight() {
  const { t } = useTranslation();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="py-24 bg-white min-h-[400px]" />;

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs font-semibold uppercase tracking-wide inline-block mb-3 px-3 py-1 rounded-md text-indigo-700 bg-indigo-50 border border-indigo-200">
             {t('faculty_spotlight_badge')}
          </span>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-16">{t('faculty_spotlight_heading')}</h2>
          <p className="text-slate-700 text-base">{t('faculty_spotlight_description')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-20">
           <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="flex flex-col bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-400 hover:shadow-[0_15px_30px_-10px_rgba(20,184,166,0.3)] rounded-2xl group overflow-hidden"
           >
              <div className="w-full aspect-square md:aspect-video overflow-hidden relative bg-slate-100 border-b border-gray-100">
                 <OptimizedImage 
                  src="/farooq-ali-rabbani.jpeg" 
                  fill
                  section="faculty"
                  className="object-cover object-top" 
                  alt={t('faculty_member_1_name')} 
                  sizes="(max-width: 1280px) 100vw, 50vw"
                 />
              </div>
              <div className="p-3 md:p-8 flex flex-col flex-1">
                 <h3 className="text-sm md:text-2xl font-black text-slate-900 mb-0.5 md:mb-1 line-clamp-1">{t('faculty_member_1_name')}</h3>
                 <p className="text-teal-600 font-bold text-[9px] md:text-sm mb-2 md:mb-12">{t('faculty_member_1_role')}</p>
                 <p className="hidden md:block text-slate-700 text-base mb-16 flex-1">&quot;{t('faculty_member_1_bio')}&quot;</p>
                 <Link href="/faculty-profile?id=1" className="mt-auto inline-flex items-center text-teal-600 font-bold text-[10px] md:text-base hover:text-teal-700 transition-colors">
                    {t('faculty_spotlight_view_profile')} <ChevronRight className="ml-0.5 md:ml-1 w-3 h-3 md:w-4 md:h-4" />
                 </Link>
              </div>
           </motion.div>

           <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.5 }}
              className="flex flex-col bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-400 hover:shadow-[0_15px_30px_-10px_rgba(168,85,247,0.3)] rounded-2xl group overflow-hidden"
           >
              <div className="w-full aspect-square md:aspect-video overflow-hidden relative bg-slate-100 border-b border-gray-100">
                 <OptimizedImage 
                  src="/ali-hamza.jpeg" 
                  fill
                  section="faculty"
                  className="object-cover object-top" 
                  alt={t('faculty_member_2_name')} 
                  sizes="(max-width: 1280px) 100vw, 50vw"
                 />
              </div>
              <div className="p-3 md:p-8 flex flex-col flex-1">
                 <h3 className="text-sm md:text-2xl font-black text-slate-900 mb-0.5 md:mb-1 line-clamp-1">{t('faculty_member_2_name')}</h3>
                 <p className="text-purple-600 font-bold text-[9px] md:text-sm mb-2 md:mb-12">{t('faculty_member_2_role')}</p>
                 <p className="hidden md:block text-slate-700 text-base mb-16 flex-1">&quot;{t('faculty_member_2_bio')}&quot;</p>
                 <Link href="/faculty-profile?id=2" className="mt-auto inline-flex items-center text-purple-600 font-bold text-[10px] md:text-base hover:text-purple-700 transition-colors">
                    {t('faculty_spotlight_view_profile')} <ChevronRight className="ml-0.5 md:ml-1 w-3 h-3 md:w-4 md:h-4" />
                 </Link>
              </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
}
