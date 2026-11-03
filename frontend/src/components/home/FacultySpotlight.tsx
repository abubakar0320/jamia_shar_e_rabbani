'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';
import { ChevronLeft } from 'lucide-react';
import React, { useState, useEffect } from 'react';

export default function FacultySpotlight() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="py-24 bg-white min-h-[400px]" />;

  const faculty = [
    {
      id: '1',
      name: 'پروفیسر ڈاکٹر فاروق علی ربانی',
      role: 'شیخ الحدیث و مہتمم جامعہ شیرِ ربانی',
      bio: 'علومِ حدیث و فقہ میں 25 سال سے زائد تدریسی و تحقیقی خدمات۔ متعدد مقالات اور کتب کے مصنف، طلبہ کی علمی و روحانی رہنمائی کے سرپرستِ اعلیٰ۔',
      image: '/farooq-ali-rabbani.jpeg',
      link: '/faculty'
    },
    {
      id: '2',
      name: 'مولانا علی حمزہ ربانی',
      role: 'استاذ الحدیث و شعبہ درسِ نظامی',
      bio: 'علومِ شریعہ، نحو و صرف، منطق اور فقہ کے معتبر مدرس۔ جدید تعلیمی طریقۂ تدریس اور طلبہ کی اخلاقی تربیت کے نگران۔',
      image: '/ali-hamza.jpeg',
      link: '/faculty'
    }
  ];

  return (
    <section className="py-16 md:py-20 bg-white border-b border-slate-200/80" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <span className="text-xs md:text-sm font-semibold tracking-wide inline-block mb-3 px-3 py-1 rounded-md text-emerald-800 bg-emerald-50 border border-emerald-200 font-urdu">
            معزز اساتذہ و شیوخ
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-slate-900 mb-4 leading-[1.9] md:leading-[2.1] font-urdu">
            جامعہ کے ممتاز و جید اساتذہ کرام
          </h2>
          <p className="text-slate-600 text-sm md:text-base leading-[2.2] md:leading-[2.3] font-urdu">
            علم، تقوٰی اور اخلاص سے مزین وہ جلیل القدر اساتذہ جو نئی نسل کو علمِ دین اور سنتِ نبوی سے منور کر رہے ہیں
          </p>
        </div>

        {/* Faculty Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          {faculty.map((member, i) => (
            <motion.div 
              key={member.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col sm:flex-row bg-white border border-slate-200/80 shadow-sm hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300 group"
            >
              <div className="sm:w-2/5 aspect-[4/5] sm:aspect-auto overflow-hidden relative bg-slate-100 shrink-0">
                <OptimizedImage 
                  src={member.image} 
                  fill
                  section="faculty"
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500" 
                  alt={member.name} 
                  sizes="(max-width: 768px) 100vw, 30vw"
                />
              </div>

              <div className="p-6 md:p-8 flex flex-col justify-between flex-1 text-right">
                <div>
                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-lg border border-emerald-200/60 inline-block mb-3 font-urdu">
                    {member.role}
                  </span>
                  <h3 className="text-xl md:text-2xl font-black text-slate-900 mb-3 leading-[2.2] font-urdu group-hover:text-emerald-700 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-slate-600 text-sm leading-[2.3] mb-6 font-urdu">
                    &ldquo;{member.bio}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100">
                  <Link 
                    href={member.link} 
                    className="inline-flex items-center text-xs md:text-sm text-emerald-700 font-bold hover:text-emerald-800 transition-colors font-urdu gap-1 group/btn"
                  >
                    <span>مکمل اساتذہ ڈائریکٹری دیکھیں</span>
                    <ChevronLeft className="w-4 h-4 group-hover/btn:-translate-x-1 transition-transform" />
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