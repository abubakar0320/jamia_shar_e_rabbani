'use client';

import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';

export default function AcademicPrograms() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="py-24 min-h-[400px]" />;

  const academicPrograms = [
    {
      id: 'hifz',
      title: t('academic_programs_1_title'),
      category: t('academic_programs_1_category'),
      desc: t('academic_programs_1_desc'),
      image: '/images/hifaz.jpeg',
      link: '/program?id=1'
    },
    {
      id: 'dars-e-nizami',
      title: t('academic_programs_2_title'),
      category: t('academic_programs_2_category'),
      desc: t('academic_programs_2_desc'),
      image: '/hadith.jpg',
      link: '/program?id=2'
    },
    {
      id: 'tajweed',
      title: t('academic_programs_3_title'),
      category: t('academic_programs_3_category'),
      desc: t('academic_programs_3_desc'),
      image: '/images/tajweed.jpeg',
      link: '/program?id=3'
    },
    {
      id: 'arabic',
      title: t('academic_programs_4_title'),
      category: t('academic_programs_4_category'),
      desc: t('academic_programs_4_desc'),
      image: '/arabic-language.jpg',
      link: '/program?id=4'
    },
    {
      id: 'takhasusat',
      title: t('academic_programs_5_title'),
      category: t('academic_programs_5_category'),
      desc: t('academic_programs_5_desc'),
      image: '/takhasus.jpeg',
      link: '/program?id=5'
    },
    {
      id: 'khasusi-dars-e-nizami',
      title: t('academic_programs_6_title'),
      category: t('academic_programs_6_category'),
      desc: t('academic_programs_6_desc'),
      image: '/hadith.jpg',
      link: '/program?id=6'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-8 md:mb-16">
          {t('academic_programs_heading')}
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-8">
          {academicPrograms.map((program, i) => (
            <motion.div 
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col bg-white text-slate-900 shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 rounded-2xl overflow-hidden transition-all group"
            >
              <div className="aspect-[4/3] md:aspect-[16/10] overflow-hidden relative">
                <OptimizedImage 
                  src={program.image} 
                  alt={program.title}
                  fill
                  section="course"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-3 md:p-6 flex flex-col flex-1">
                <span className="text-[9px] md:text-xs px-2 md:px-3 py-0.5 md:py-1 rounded-md font-bold mb-2 md:mb-3 uppercase tracking-wider inline-block w-max bg-emerald-50 text-emerald-700 border border-emerald-100">
                  {program.category}
                </span>
                <h3 className="text-sm md:text-xl font-bold text-slate-900 mb-1 md:mb-3 line-clamp-2 leading-snug">
                  {program.title}
                </h3>
                <p className="hidden md:block text-sm text-slate-600 mb-6 line-clamp-3 flex-1">
                  {t(program.desc)}
                </p>
                <div className="mt-auto pt-2 md:pt-4 border-t border-slate-50">
                  <Link 
                    href={program.link}
                    className="inline-flex items-center text-[11px] md:text-sm text-emerald-600 font-bold hover:text-emerald-700 group/link"
                  >
                    {t('academic_programs_details')} <ChevronRight className="ml-1 w-3 h-3 md:w-4 md:h-4 group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
