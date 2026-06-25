'use client';

import { motion } from 'framer-motion';
import { 
  Book, 
  Languages, 
  MessageSquareText, 
  History, 
  Clock, 
  Library, 
  Search, 
  Compass, 
  Wrench,
  Download,
  ExternalLink
} from 'lucide-react';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';

export default function Islam360Resources() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const features = [
    { title: t('Holy Quran'), icon: <Book className="text-emerald-600" size={24} /> },
    { title: t('Quran Translations'), icon: <Languages className="text-amber-600" size={24} /> },
    { title: t('Tafsir'), icon: <MessageSquareText className="text-emerald-600" size={24} /> },
    { title: t('Hadith Collections'), icon: <History className="text-amber-600" size={24} /> },
    { title: t('Prayer Times'), icon: <Clock className="text-emerald-700" size={24} /> },
    { title: t('Islamic Books'), icon: <Library className="text-emerald-600" size={24} /> },
    { title: t('Islamic Research Resources'), icon: <Search className="text-amber-600" size={24} /> },
    { title: t('Qibla Direction'), icon: <Compass className="text-emerald-600" size={24} /> },
    { title: t('Islamic Learning Tools'), icon: <Wrench className="text-amber-600" size={24} /> },
  ];

  if (!mounted) return <div className="py-24 bg-white border-b border-gray-100 min-h-[400px]" />;

  return (
    <section className="py-16 bg-slate-50 border-y border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-[10px] md:text-xs font-bold mb-2 md:mb-3 uppercase tracking-wide inline-block text-slate-900 bg-teal-50 border border-teal-200 px-2 md:px-3 py-1 rounded-md">
              {t('Digital Learning')}
            </span>
            <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-6 md:mb-16">
              {t('Islam360 Digital Resources')}
            </h2>
            <p className="text-sm md:text-base text-slate-700 mb-8 md:mb-20">
              {t('Islam360 Description')}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 md:gap-12 mb-8 md:mb-12">
              <a 
                href="https://play.google.com/store/apps/details?id=com.islam360" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 md:px-6 py-2.5 md:py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-900 hover:shadow-lg hover:shadow-emerald-500/40 font-bold transition-all rounded-md shadow-sm"
              >
                <Download size={18} className="mr-2" />
                {t('Download on Google Play')}
              </a>
              <a 
                href="https://islam360.app/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-4 md:px-6 py-2.5 md:py-3 border border-[#e10098] text-amber-600 font-bold hover:bg-[#e100981a] transition-all rounded-md"
              >
                {t('Learn More')}
                <ExternalLink size={18} className="ml-2" />
              </a>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-16">
              {features.map((feature, i) => (
                <div key={i} className="flex flex-col items-start space-y-1.5 md:space-y-2">
                  <div className={`p-2.5 md:p-3 rounded-xl bg-slate-50 border border-slate-100 shadow-sm`}>
                    {React.cloneElement(feature.icon, { className: "w-5 h-5 md:w-6 md:h-6" })}
                  </div>
                  <span className="text-[11px] md:text-sm font-bold text-slate-900 leading-tight">
                    {feature.title}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white border border-slate-200 rounded-3xl shadow-xl border-t-8 border-t-cyan-500 p-6 md:p-10 flex flex-col items-center justify-center text-center mt-6 md:mt-0"
          >
            <div className="w-20 h-20 md:w-24 md:h-24 bg-white border border-indigo-100 shadow-[0_10px_30px_rgba(79,70,229,0.15)] rounded-2xl flex items-center justify-center mb-8 md:mb-16">
              <div className="text-emerald-700 text-3xl md:text-4xl font-black">360</div>
            </div>
            <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-6 md:mb-12">Islam360</h3>
            <p className="text-slate-700 text-sm md:text-base mb-10 md:mb-20 max-w-sm">
              {t('The most authentic and comprehensive Islamic application for students and scholars.')}
            </p>
            <div className="flex items-center justify-center gap-6 md:gap-12">
              <div className="flex -space-x-3">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="w-8 h-8 md:w-10 md:h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                    <img 
                      src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i + 10}`} 
                      alt={t('User')} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
              <div className="text-xs md:text-sm font-bold text-slate-900">
                +10M Users
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
