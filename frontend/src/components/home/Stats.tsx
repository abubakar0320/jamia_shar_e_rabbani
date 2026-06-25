'use client';

import { motion } from 'framer-motion';
import { Users, ShieldCheck, BookOpen, Award } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import React, { useState, useEffect } from 'react';

export default function Stats() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="py-12 bg-white" />;

  const stats = [
    { label: t('Active Students'), value: '1,200+', icon: <Users size={24} /> },
    { label: t('Expert Teachers'), value: '45+', icon: <ShieldCheck size={24} /> },
    { label: t('Academic Programs'), value: '12', icon: <BookOpen size={24} /> },
    { label: t('Proud Alumni'), value: '5,000+', icon: <Award size={24} /> },
  ];

  return (
    <section className="bg-emerald-900 py-16 border-y border-emerald-800">
      
        <div className="max-w-7xl relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-20 text-center">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="flex flex-col items-center p-4"
            >
              <div className={`mb-12 p-4 bg-slate-900 rounded-full border border-slate-800 ${i===0?"text-emerald-300 shadow-[0_0_15px_#00d4ff4d]":i===1?"text-amber-400 shadow-[0_0_15px_#e100984d]":i===2?"text-emerald-400 shadow-[0_0_15px_#00d15e4d]":"text-amber-300 shadow-[0_0_15px_#f59e0b4d]"}`}>
                 {stat.icon}
              </div>
              <div className="text-4xl font-semibold text-white mb-2">{stat.value}</div>
              <div className="text-sm font-semibold text-gray-400 uppercase tracking-wide">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
