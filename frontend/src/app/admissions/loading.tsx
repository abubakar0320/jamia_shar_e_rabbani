'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

export default function Loading() {
  const { t } = useTranslation();
  
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      <main className="flex-1 flex flex-col items-center justify-center p-6">
        <div className="relative w-32 h-32 mb-12">
           <div className="absolute inset-0 border-8 border-emerald-100 rounded-full" />
           <div className="absolute inset-0 border-8 border-emerald-700 rounded-full border-t-transparent animate-spin" />
        </div>
        <div className="text-center space-y-4">
           <h2 className="text-2xl font-black text-emerald-900 uppercase tracking-tighter">{t('Initializing Secure Portal')}</h2>
           <p className="text-slate-500 font-bold uppercase tracking-widest text-[10px] animate-pulse">{t('initializing_hint')}</p>
        </div>
      </main>
      <Footer />
    </div>
  );
}
