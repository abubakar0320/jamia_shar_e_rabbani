'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';

export default function CTA() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <section className="py-3 bg-emerald-700">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
             <motion.div 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="max-w-2xl text-center lg:text-left rtl:lg:text-right"
             >
                <div className="inline-block bg-amber-500 text-white text-[9px] font-bold px-2 py-0.5 mb-1 rounded-sm uppercase tracking-wider leading-none">
                  {t('Admissions Open')}
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-white mb-1 leading-tight">
                  {t('Begin Your Journey Towards Sacred Knowledge')}
                </h2>
                <p className="text-blue-100 text-xs mb-0 max-w-xl leading-tight">
                  {t('Take the first step towards a meaningful and enlightened future. Admissions for the current session are closing soon.')}
                </p>
             </motion.div>
             
             <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row gap-2 w-full lg:w-auto shrink-0"
             >
                <Link href="/admissions" className="inline-flex items-center justify-center px-4 py-1.5 text-xs bg-white text-emerald-700 font-bold hover:bg-slate-100 transition-colors rounded-sm shadow-sm leading-none">
                   {t('Apply for Admission')}
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center px-4 py-1.5 text-xs bg-transparent border-2 border-white text-white font-bold hover:bg-white/10 transition-colors rounded-sm leading-none">
                   {t('Schedule a Campus Tour')}
                </Link>
             </motion.div>
          </div>
       </div>
    </section>
  );
}
