'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import { ArrowRight, Calendar, MapPin } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';

export default function NewsEvents() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="py-24 bg-slate-50 min-h-[400px]" />;

  return (
    <section className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-16">
          <div>
            <h2 className="text-3xl font-semibold text-slate-900">{t('Latest News & Events')}</h2>
          </div>
          <Link href="/news" className="text-emerald-700 font-semibold hover:underline flex items-center group">
            {t('View All News')} <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-20">
           <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2 group cursor-pointer bg-white shadow-sm border border-slate-100 hover:shadow-md transition-shadow flex flex-col rounded-2xl overflow-hidden"
           >
              <div className="aspect-[16/9] w-full overflow-hidden relative">
                <OptimizedImage 
                  src="/images/news.jpeg" 
                  fill
                  section="news"
                  className="absolute inset-0 object-cover group-hover:scale-105 transition-transform duration-500" 
                  alt={t('Featured News')} 
                  sizes="(max-width: 1024px) 100vw, 66vw"
                />
              </div>
              
              <div className="p-4 md:p-8">
                 <span className="inline-flex items-center text-emerald-700 text-[10px] md:text-xs font-semibold mb-2 md:mb-3 uppercase tracking-wide bg-emerald-50 px-2 py-1 rounded-md">
                    <Calendar className="mr-1 md:mr-2" size={12} /> {t('Upcoming Event')}
                 </span>
                 <h3 className="text-sm md:text-2xl font-bold text-slate-900 mb-3 md:mb-12 line-clamp-2 md:line-clamp-none">{t('Annual Graduation & Prize Distribution Ceremony 2024')}</h3>
                 <div className="flex flex-wrap items-center gap-3 md:gap-16 text-slate-600 text-[10px] md:text-sm">
                    <span className="flex items-center gap-1 md:gap-2"><Calendar size={14} /> {t('June 15, 2024')}</span>
                    <span className="flex items-center gap-1 md:gap-2"><MapPin size={14} /> {t('Main Auditorium')}</span>
                 </div>
              </div>
           </motion.div>

           <div className="grid grid-cols-2 lg:grid-cols-1 gap-3 md:gap-16">
              {[
                { cat: t('Announcement'), title: t('New Academic Session Admissions Open'), desc: t('Admissions for Hifz, Dars-e-Nizami, and Arabic language courses are now open for the upcoming year.'), link: '/admissions' },
                { cat: t('Academic'), title: t('Weekend Arabic Language Workshop'), desc: t('A specialized 2-day workshop for professionals interested in basic Quranic Arabic grammar.') },
                { cat: t('Community'), title: t('Public Lecture Series: Ethics in the Digital Age'), desc: t('Join us this Friday for a special lecture on maintaining Islamic values in a connected world.') },
                { cat: t('Updates'), title: t('Campus Expansion Project Started'), desc: t('Alhamdulillah, the construction for the new block has officially commenced.') }
              ].map((item, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="cursor-pointer bg-white border border-slate-100 p-3 md:p-6 shadow-sm hover:shadow-md transition-shadow group flex flex-col rounded-xl"
                    onClick={() => item.link && (window.location.href = item.link)}
                >
                    <div className="text-emerald-700 text-[9px] md:text-xs font-bold uppercase tracking-wide mb-1 md:mb-2">
                        {item.cat}
                    </div>
                    <h4 className="text-[11px] md:text-lg font-bold text-slate-900 group-hover:underline mb-1 md:mb-2 line-clamp-2">{item.title}</h4>
                    <p className="hidden md:block text-slate-700 text-sm line-clamp-3">{item.desc}</p>
                </motion.div>
              ))}
           </div>
        </div>
      </div>
    </section>
  );
}
