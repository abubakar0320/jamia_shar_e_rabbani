'use client';

import { motion } from 'framer-motion';
import { Users, Landmark, Award, ShieldCheck, CheckCircle2 } from 'lucide-react';
import OptimizedImage from '@/components/OptimizedImage';
import { useTranslation } from 'react-i18next';
import React from 'react';

export default function WhyChooseUs() {
  const { t } = useTranslation();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="py-24 bg-white min-h-[400px]" />;

  const features = [
    {
      title: t('why_choose_us_feature_1_title'),
      desc: t('why_choose_us_feature_1_desc'),
      icon: <Users className="text-emerald-700" size={24} />
    },
    {
      title: t('why_choose_us_feature_2_title'),
      desc: t('why_choose_us_feature_2_desc'),
      icon: <Landmark className="text-emerald-700" size={24} />
    },
    {
      title: t('why_choose_us_feature_3_title'),
      desc: t('why_choose_us_feature_3_desc'),
      icon: <Award className="text-emerald-700" size={24} />
    },
    {
      title: t('why_choose_us_feature_4_title'),
      desc: t('why_choose_us_feature_4_desc'),
      icon: <ShieldCheck className="text-emerald-700" size={24} />
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="relative w-full aspect-[4/3] overflow-hidden bg-slate-100"
          >
            <OptimizedImage 
              src="/images/WhatsApp 1.jpeg" 
              alt={t('why_choose_us_image_alt')}
              fill
              section="campus"
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-emerald-700 text-xs font-semibold uppercase tracking-wide block mb-3">
              {t('why_choose_us_badge')}
            </span>
            <h3 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-20 leading-tight">
              {t('why_choose_us_heading_start')} {t('why_choose_us_heading_end')}
            </h3>
            
            <div className="grid grid-cols-2 gap-4 md:gap-10 mb-12">
              {features.map((feature, i) => (
                <div key={i} className="flex flex-col gap-2 md:gap-3">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-slate-50 flex items-center justify-center border border-slate-100 rounded-xl shadow-sm">
                    {React.cloneElement(feature.icon, { className: "w-5 h-5 md:w-6 md:h-6 text-emerald-700" })}
                  </div>
                  <div>
                    <h4 className="text-sm md:text-lg font-bold text-slate-900 mb-1 md:mb-2">{feature.title}</h4>
                    <p className="text-slate-600 text-xs md:text-sm leading-relaxed line-clamp-3 md:line-clamp-none">{feature.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="flex flex-wrap gap-16 pt-6 border-t border-slate-200">
              <div className="flex items-center gap-2 text-sm text-slate-900 font-semibold">
                <CheckCircle2 className="text-emerald-700" size={20} /> {t('why_choose_us_accreditation_1')}
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-900 font-semibold">
                <CheckCircle2 className="text-emerald-700" size={20} /> {t('why_choose_us_accreditation_2')}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
