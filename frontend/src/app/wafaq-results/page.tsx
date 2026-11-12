'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import Link from 'next/link';
import { ExternalLink, Award, CheckCircle2, ShieldCheck, HelpCircle, PhoneCall, FileText } from 'lucide-react';
import { motion } from 'framer-motion';

export default function WafaqResultsPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-urdu text-slate-900" dir="rtl">
      <Header />
      
      {/* --- HERO SECTION --- */}
      <section 
        className="relative pt-24 pb-16 bg-white border-b border-slate-200 bg-cover bg-center text-right"
        style={{ 
          backgroundImage: "linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.92)), url('/ahmad.webp')", 
          backgroundSize: "cover", 
          backgroundPosition: "center" 
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-4 py-2 rounded-full text-emerald-800 text-xs sm:text-sm font-bold mb-6 shadow-sm">
              <Award className="w-4 h-4 text-emerald-600" />
              <span>وفاق المدارس الاسلامیہ الرضویہ پاکستان • سالانہ امتحانی نتائج</span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-[1.9] md:leading-[2.1] mb-6">
              وفاق المدارس الاسلامیہ الرضویہ <span className="text-emerald-700">سالانہ امتحانی نتائج</span> و رزلٹ کارڈ
            </h1>

            <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto leading-[2.2] md:leading-[2.4]">
              جامعہ شیرِ ربانی کے طلبہ و طالبات کے لیے وفاق المدارس الاسلامیہ الرضویہ کے باقاعدہ و تصدیق شدہ سالانہ نتائج کی تصدیق اور ڈاؤن لوڈ کا آفیشل پورٹل۔
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- MAIN RESULT PORTAL CARD --- */}
      <main className="flex-1 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-right">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-3xl shadow-xl shadow-emerald-700/5 overflow-hidden border border-emerald-100 text-center p-8 sm:p-12 md:p-16 relative"
        >
          {/* Top Decorative Gradient Line */}
          <div className="absolute top-0 left-0 w-full h-2.5 bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-500"></div>
          
          {/* Wafaq Logo Emblem */}
          <div className="w-24 h-24 bg-emerald-50 border-2 border-emerald-200 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm overflow-hidden p-2">
            <Image 
              src="/images/wafaq-logo.png" 
              alt="وفاق المدارس الاسلامیہ الرضویہ لوگو" 
              width={80} 
              height={80} 
              className="object-contain"
            />
          </div>
          
          <span className="text-xs font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3.5 py-1.5 rounded-md inline-block mb-4">
            باقاعدہ الحاق شدہ امتحانی مرکز
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-black text-slate-900 mb-5 leading-[1.9] md:leading-[2.1]">
            وفاق المدارس الاسلامیہ الرضویہ آفیشل رزلٹ پورٹل
          </h2>

          <div className="max-w-2xl mx-auto text-slate-600 mb-10 text-base md:text-lg leading-[2.3]">
            <p className="mb-4">
              امتحانی رازداری اور سیکیورٹی قواعد کے پیشِ نظر وفاق المدارس الاسلامیہ الرضویہ کا رزلٹ پورٹل براہِ راست کسی بیرونی ویب سائٹ پر ایمبیڈ نہیں کیا جاتا۔
            </p>
            <p>
              جامعہ شیرِ ربانی کے تمام طلبہ، طالبات اور معزز والدین نیچے دیے گئے بٹن پر کلک کر کے وفاق کے آفیشل پورٹل پر اپنا رول نمبر درج کر کے اپنا مکمل رزلٹ کارڈ اور تفصیلی مارکس با آسانی چیک اور پرنٹ کر سکتے ہیں۔
            </p>
          </div>
          
          {/* Main Action Button to Wafaq Portal */}
          <div className="mb-12">
            <a 
              href="https://wafaq.edu.pk/get-your-result" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white text-base sm:text-lg font-black rounded-2xl shadow-xl shadow-emerald-700/25 hover:shadow-emerald-700/40 hover:-translate-y-1 transition-all"
            >
              <span>وفاق کے آفیشل پورٹل پر رزلٹ چیک کریں</span>
              <ExternalLink size={20} className="shrink-0" />
            </a>
          </div>

          {/* Guidelines Box */}
          <div className="bg-slate-50 border border-slate-200/90 rounded-2xl p-6 sm:p-8 text-right max-w-2xl mx-auto">
            <h3 className="text-base sm:text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-700" />
              <span>رزلٹ چیک کرنے کا آسان طریقہ کار:</span>
            </h3>

            <ul className="space-y-3 text-slate-700 text-xs sm:text-sm font-semibold">
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <span className="leading-[2.2]">اوپر دیے گئے بٹن پر کلک کر کے وفاق کا آفیشل پورٹل کھولیں۔</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <span className="leading-[2.2]">مطلوبہ خانے میں اپنی رول نمبر سلپ کا درست سالانہ رول نمبر درج کریں۔</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <span className="leading-[2.2]">اپنا متعلقہ درجہ (درسِ نظامی عالم / فاضل، حفظ یا تجوید) منتخب فرمائیں۔</span>
              </li>
              <li className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-1" />
                <span className="leading-[2.2]">رزلٹ کارڈ سامنے آنے کے بعد اس کی پی ڈی ایف یا پرنٹ کاپی اپنے پاس محفوظ فرما لیں۔</span>
              </li>
            </ul>
          </div>

          {/* Contact Support Note */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-bold text-slate-600">
            <div className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>کیا رول نمبر گم ہو گیا ہے یا رزلٹ میں دشواری پیش آ رہی ہے؟</span>
            </div>

            <Link 
              href="/contact" 
              className="inline-flex items-center gap-1.5 text-emerald-700 hover:text-emerald-800 hover:underline"
            >
              <PhoneCall className="w-4 h-4" />
              <span>جامعہ کے امتحانی دفتر سے رابطہ کریں</span>
            </Link>
          </div>

        </motion.div>
      </main>

      <Footer />
    </div>
  );
}
