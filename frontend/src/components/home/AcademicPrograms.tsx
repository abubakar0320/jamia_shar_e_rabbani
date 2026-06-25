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
      image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?auto=format&fit=crop&q=80&w=800',
      link: '/courses/1'
    },
    {
      id: 'dars-e-nizami',
      title: t('academic_programs_2_title'),
      category: t('academic_programs_2_category'),
      desc: t('academic_programs_2_desc'),
      image: '/hadith.jpg',
      link: '/courses/2'
    },
    {
      id: 'tajweed',
      title: t('academic_programs_3_title'),
      category: t('academic_programs_3_category'),
      desc: t('academic_programs_3_desc'),
      image: '/tajweed-o-qirat.jpg',
      link: '/courses/3'
    },
    {
      id: 'arabic',
      title: t('academic_programs_4_title'),
      category: t('academic_programs_4_category'),
      desc: t('academic_programs_4_desc'),
      image: '/arabic-language.jpg',
      link: '/courses/4'
    },
    {
      id: 'takhasusat',
      title: t('academic_programs_5_title'),
      category: t('academic_programs_5_category'),
      desc: t('academic_programs_5_desc'),
      image: '/takhasus.jpeg',
      link: '/courses/5'
    },
    {
      id: 'khasusi-dars-e-nizami',
      title: t('academic_programs_6_title'),
      category: t('academic_programs_6_category'),
      desc: t('academic_programs_6_desc'),
      image: '/hadith.jpg',
      link: '/courses/6'
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-semibold text-indigo-600 mb-12">
          {t('academic_programs_heading')}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-16">
          {academicPrograms.map((program, i) => (
            <motion.div 
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col bg-white text-slate-900 shadow-sm border border-slate-100 hover:shadow-md transition-shadow group"
            >
              <div className="aspect-[16/10] overflow-hidden relative">
                <OptimizedImage 
                  src={program.image} 
                  alt={program.title}
                  fill
                  section="course"
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
              </div>
              <div className="p-6 flex flex-col flex-1">
                <span className="text-xs px-3 py-1 rounded-full font-bold mb-3 uppercase tracking-wide inline-block w-max border border-white/30 bg-white/20 text-slate-900 backdrop-blur-sm">
                  {program.category}
                </span>
                <h3 className="text-xl font-semibold text-indigo-600 mb-3">
                  {program.title}
                </h3>
                <p className="text-base text-slate-600 mb-16 line-clamp-3 flex-1">
                  {t(program.desc)}
                </p>
                <div className="mt-auto">
                  <Link 
                    href={program.link}
                    className="inline-flex items-center text-indigo-600 font-semibold hover:underline group/link"
                  >
                    {t('academic_programs_details')} <ChevronRight className="ml-1 w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
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
