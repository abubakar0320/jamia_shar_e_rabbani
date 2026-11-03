'use client';

import { motion } from 'framer-motion';
import { ChevronLeft } from 'lucide-react';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import React, { useState, useEffect } from 'react';

interface ProgramItem {
  id: string;
  title: string;
  category: string;
  desc: string;
  image: string;
  link: string;
}

export default function AcademicPrograms() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="py-24 min-h-[400px]" />;

  const academicPrograms: ProgramItem[] = [
    {
      id: 'hifz',
      title: 'شعبہ تحفیظ القرآن الکریم',
      category: 'حفظ و قرات',
      desc: 'تجوید و حسنِ قراءت کے بنیادی و اعلیٰ قواعد کے ساتھ قرآن مجید کا مکمل حفظ اور روزانہ کی بنیاد پر باقاعدہ دور۔',
      image: '/images/hifaz.jpeg',
      link: '/courses'
    },
    {
      id: 'dars-e-nizami',
      title: 'درسِ نظامی (عالم و فاضل کورس)',
      category: 'شریعہ و علومِ اسلامیہ',
      desc: 'قرآن، حدیث، فقہ، اصولِ فقہ، منطق اور عربی ادب کا باقاعدہ جامع نصاب، وفاق المدارس الرضویہ سے تصدیق شدہ۔',
      image: '/hadith.jpg',
      link: '/courses'
    },
    {
      id: 'tajweed',
      title: 'تجوید و قرات سبعہ و عشرہ',
      category: 'تجوید و لہجہ',
      desc: 'مستند قراء کرام کے زیرِ نگرانی مخارج و صفات کی درستی، ترتیل و حدر اور قرات کی عملی مشق۔',
      image: '/images/tajweed.jpeg',
      link: '/courses'
    },
    {
      id: 'arabic',
      title: 'عربی زبان و ادب کورس',
      category: 'زبان دانی',
      desc: 'جدید و کلاسیکی عربی بول چال، نحو و صرف اور فصیح عربی تحریر و تقریر پر خصوصی عملی توجہ۔',
      image: '/arabic-language.jpg',
      link: '/courses'
    },
    {
      id: 'takhasusat',
      title: 'تخصص فی الفقہ والافتاء',
      category: 'اعلیٰ تخصص',
      desc: 'فقہِ اسلامی، معاشی و جدید فقہی مسائل پر فتوٰی نویسی اور اصولِ افتاء کی گہری تحقیقی و عملی تربیت۔',
      image: '/takhasus.jpeg',
      link: '/program?id=5'
    },
    {
      id: 'khasusi-dars-e-nizami',
      title: 'خصوصی درسِ نظامی برائے کالج طلبہ',
      category: 'عصری و دینی امتزاج',
      desc: 'اسکول، کالج اور یونیورسٹی کے طلبہ و ملازمین کے لیے اوقاتِ کار کے مطابق لچکدار اور منظم دینی تعلیم۔',
      image: '/hadith.jpg',
      link: '/courses'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-xs md:text-sm font-semibold tracking-wide inline-block mb-3 px-3 py-1 rounded-md text-emerald-800 bg-emerald-50 border border-emerald-200 font-urdu">
            جامعہ کے باقاعدہ تعلیمی شعبہ جات
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-[1.9] md:leading-[2.1] font-urdu">
            نمایاں تعلیمی و تدریسی شعبہ جات
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-[2.2] md:leading-[2.3] font-urdu">
            وفاق المدارس الاسلامیہ الرضویہ پاکستان کے تصدیق شدہ نصاب کے مطابق دینی و روحانی علوم کی اعلیٰ تعلیم
          </p>
        </div>

        {/* Programs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {academicPrograms.map((program, i) => (
            <motion.div 
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className="flex flex-col bg-white text-slate-900 shadow-sm border border-slate-200/80 hover:shadow-xl hover:-translate-y-1 rounded-2xl overflow-hidden transition-all group"
            >
              <div className="aspect-[16/10] overflow-hidden relative bg-slate-100">
                <OptimizedImage 
                  src={program.image} 
                  alt={program.title}
                  fill
                  section="course"
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <span className="absolute top-3 right-3 text-xs px-2.5 py-1 rounded-md font-bold bg-white/95 text-emerald-800 shadow-sm font-urdu">
                  {program.category}
                </span>
              </div>

              <div className="p-6 md:p-7 flex flex-col flex-1 text-right">
                <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 leading-[2.2] font-urdu group-hover:text-emerald-700 transition-colors">
                  {program.title}
                </h3>
                <p className="text-slate-600 text-sm leading-[2.3] mb-6 font-urdu flex-1">
                  {program.desc}
                </p>
                <div className="mt-auto pt-3 border-t border-slate-100 flex items-center justify-between">
                  <Link 
                    href={program.link}
                    className="inline-flex items-center text-xs md:text-sm text-emerald-700 font-bold hover:text-emerald-800 group/link font-urdu gap-1"
                  >
                    <span>تفصیلات و داخلہ معلومات</span>
                    <ChevronLeft className="w-4 h-4 group-hover/link:-translate-x-1 transition-transform" />
                  </Link>
                  <span className="text-[11px] text-slate-400 font-urdu">مفت تعلیم</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
