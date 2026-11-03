'use client';

import { motion } from 'framer-motion';
import { Users, Landmark, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import React, { useState, useEffect } from 'react';

interface FeatureItem {
  title: string;
  desc: string;
  icon: React.ReactNode;
}

export default function WhyChooseUs() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="py-24 bg-white min-h-[400px]" />;

  const features: FeatureItem[] = [
    {
      title: 'مستند و جید اساتذہ کرام',
      desc: 'اپنے اپنے فن کے ماہر، متبحر اور باعمل اساتذہ طلبہ کی علمی، فکری اور روحانی آبیاری کے لیے ہمہ وقت کوشاں ہیں۔',
      icon: <Users className="text-emerald-700" size={24} />
    },
    {
      title: 'پرسکون اسلامی و تعلیمی ماحول',
      desc: 'دینی روایات کا امین، اخلاقی تربیت سے آراستہ اور طلبہ کے لیے انتہائی پرامن اور محفوظ ماحول۔',
      icon: <Landmark className="text-emerald-700" size={24} />
    },
    {
      title: 'وفاق المدارس سے باقاعدہ الحاق',
      desc: 'وفاق المدارس الاسلامیہ الرضویہ پاکستان سے الحاق شدہ اور ہائر ایجوکیشن کمیشن (HEC) سے باقاعدہ معتبر اسناد۔',
      icon: <Award className="text-emerald-700" size={24} />
    },
    {
      title: '100% مفت رہائش و طعام',
      desc: 'طلبہ کے لیے بہترین ہاسٹل، صحت بخش تین وقت کا کھانا اور بنیادی ضروریات کی بلا معاوضہ فراہمی۔',
      icon: <ShieldCheck className="text-emerald-700" size={24} />
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-slate-50 border-y border-slate-200/80" dir="rtl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left/Image Side */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-5 relative w-full aspect-[4/3] rounded-2xl overflow-hidden bg-slate-200 shadow-md border border-slate-200"
          >
            <OptimizedImage 
              src="/images/WhatsApp 1.jpeg" 
              alt="جامعہ شیرِ ربانی کیمپس و تدریس"
              fill
              section="campus"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 40vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
            <div className="absolute bottom-4 right-4 left-4 text-right">
              <span className="text-xs font-bold text-amber-300 font-urdu block mb-1">
                مرکزی تعلیمی کیمپس
              </span>
              <p className="text-sm font-bold text-white font-urdu leading-tight">
                جامعہ شیرِ ربانی مانانوالہ، شیخوپورہ
              </p>
            </div>
          </motion.div>

          {/* Right/Content Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 text-right"
          >
            <span className="text-emerald-800 text-xs md:text-sm font-semibold tracking-wide inline-block mb-3 px-3 py-1 rounded-md bg-emerald-100/60 border border-emerald-200 font-urdu">
              جامعہ کی امتیازی خصوصیات
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-[1.9] md:leading-[2.1] font-urdu">
              جامعہ شیرِ ربانی کا انتخاب کیوں کریں؟
            </h2>
            <p className="text-slate-600 text-sm md:text-base leading-[2.2] md:leading-[2.3] mb-8 font-urdu max-w-2xl">
              جامعہ شیرِ ربانی نصف صدی سے دینی اور روحانی علوم کی ترویج، قرآن فہمی اور کردار سازی کا معتبر و بااعتماد ادارہ ہے۔
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 md:gap-6 mb-8">
              {features.map((feature, i) => (
                <div key={i} className="flex items-start gap-4 p-4 sm:p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs">
                  <div className="w-10 h-10 bg-emerald-50 flex items-center justify-center border border-emerald-100 rounded-lg shrink-0 mt-0.5">
                    {feature.icon}
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-slate-900 mb-2 leading-[2.1] font-urdu">
                      {feature.title}
                    </h4>
                    <p className="text-slate-600 text-xs md:text-sm leading-[2.2] font-urdu">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-6 pt-5 border-t border-slate-200">
              <div className="flex items-center gap-2 text-xs md:text-sm text-slate-900 font-semibold font-urdu">
                <CheckCircle2 className="text-emerald-700 shrink-0" size={18} />
                <span>وفاق المدارس الاسلامیہ الرضویہ پاکستان سے باقاعدہ الحاق شدہ</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-sm text-slate-900 font-semibold font-urdu">
                <CheckCircle2 className="text-emerald-700 shrink-0" size={18} />
                <span>درسِ نظامی اور حفظِ قرآن کے شاندار سالانہ امتحانی نتائج</span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}