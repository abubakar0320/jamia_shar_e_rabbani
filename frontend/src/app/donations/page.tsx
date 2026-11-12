'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Heart, Landmark, CreditCard, ChevronLeft, ShieldCheck, Award, Users, BookOpen, GraduationCap, Building2, Copy, Check } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';

export default function Donations() {
  const [mounted, setMounted] = useState(false);
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedJazz, setCopiedJazz] = useState(false);
  const [copiedNaya, setCopiedNaya] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-white" dir="rtl">
        <Header />
        <main className="flex-1" />
        <Footer />
      </div>
    );
  }

  const donationCategories = [
    {
      title: "طالب علم کی مکمل کفالت",
      desc: "ایک طالب علم کے سالانہ و ماہانہ تعلیمی، رہائشی اور خوراک کے مکمل اخراجات کی باوقار کفالت فرمائیں۔",
      img: "/images/WhatsApp 1.jpeg",
      link: "/donations/student-sponsorship",
      btnText: "آن لائن کفالت کریں"
    },
    {
      title: "مستحقین کے لیے زکوٰۃ فنڈ",
      desc: "آپ کی زکوٰۃ شرعی اصولوں کے عین مطابق صرف اور صرف نادار و مستحق طلبہ اور ان کے اہلِ خانہ پر خرچ ہوتی ہے۔",
      img: "/images/WhatsApp2.jpeg",
      link: "/donations/zakat-fund",
      btnText: "زکوٰۃ ادا کریں"
    },
    {
      title: "کیمپس کی تعمیر و توسیع",
      desc: "جامعہ کے نئے کشادہ ہاسٹل بلاک، کتب خانہ، ڈیجیٹل لائبریری اور کلاس رومز کی تعمیر میں حصہ ڈالیں۔",
      img: "/images/news.jpeg",
      link: "/donations/campus-development",
      btnText: "تعمیراتی فنڈ میں دیں"
    },
    {
      title: "دائمی صدقہ جاریہ فنڈ",
      desc: "قرآنی نسخہ جات، دینی کتب، واٹر پلانٹ اور مستقل تعلیمی سہولیات میں دائمی ثواب کی نیت سے شرکت فرمائیں۔",
      img: "/images/tajweed.jpeg",
      link: "/donations/sadaqah-jariyah",
      btnText: "صدقہ جاریہ دیں"
    }
  ];

  const handleCopy = (text: string, type: 'bank' | 'jazz' | 'naya') => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(text);
      if (type === 'bank') {
        setCopiedBank(true);
        setTimeout(() => setCopiedBank(false), 2500);
      } else if (type === 'jazz') {
        setCopiedJazz(true);
        setTimeout(() => setCopiedJazz(false), 2500);
      } else {
        setCopiedNaya(true);
        setTimeout(() => setCopiedNaya(false), 2500);
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-white" dir="rtl">
      <Header />
      <main className="flex-1 bg-white font-urdu text-slate-900">
        
        {/* --- HERO SECTION --- */}
        <section 
          style={{ 
            backgroundImage: "linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.92)), url('/ahmad.webp')", 
            backgroundSize: "cover", 
            backgroundPosition: "center" 
          }} 
          className="relative pt-24 pb-20 bg-white border-b border-slate-100 text-right"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="max-w-4xl mx-auto"
            >
              <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200/80 px-4 py-2 rounded-full text-emerald-800 text-xs sm:text-sm font-bold mb-6 shadow-sm">
                <Heart className="w-4 h-4 text-emerald-600 fill-emerald-600" />
                <span>صدقہ و خیرات • آخرت کے لیے بہترین سرمایہ کاری</span>
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight mb-6 leading-[1.9] md:leading-[2.1]">
                دینی علوم کی ترویج اور <span className="text-emerald-700">طلبہ کی کفالت</span> میں حصہ لیں
              </h1>
              
              <p className="text-base sm:text-lg md:text-xl text-slate-600 max-w-3xl mx-auto mb-10 leading-[2.2] md:leading-[2.4]">
                آپ کے عطیات اور زکوٰۃ سے جامعہ شیرِ ربانی میں زیرِ تعلیم سینکڑوں مستحق طلبہ و طالبات کو ۱۰۰٪ مفت تعلیم، ہاسٹل، طعام اور کتب کی سہولیات باوقار انداز میں فراہم کی جاتی ہیں۔
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="#bank-details" 
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white font-bold rounded-xl shadow-lg shadow-emerald-700/25 transition-all transform hover:-translate-y-0.5 text-base"
                >
                  <Landmark size={18} />
                  <span>بینک اکاؤنٹ کی تفصیلات دیکھیں</span>
                </Link>

                <Link 
                  href="/contact" 
                  className="inline-flex items-center gap-2 px-8 py-3.5 bg-white border border-slate-300 text-slate-700 hover:border-emerald-700 hover:text-emerald-700 font-bold rounded-xl shadow-sm transition-all text-base"
                >
                  <Heart size={18} className="text-emerald-600" />
                  <span>شعبہ عطیات سے رابطہ</span>
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* --- DONATION GRID --- */}
        <section className="py-20 bg-slate-50/50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs md:text-sm font-semibold tracking-wide inline-block mb-3 px-3.5 py-1 rounded-md text-emerald-800 bg-emerald-50 border border-emerald-200">
                عطیات کے مختلف شعبہ جات
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-[1.9] md:leading-[2.1]">
                عطیات اور خیرات کے نمایاں شعبہ جات
              </h2>
              <p className="text-slate-600 text-base md:text-lg leading-[2.2]">
                جس شعبہ میں چاہیں اپنا حصہ ڈالیں اور اس پاکیزہ دینی مقصد میں شامل ہو کر صدقہ جاریہ کے عظیم اجر کے مستحق بنیں۔
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {donationCategories.map((item, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                  <Link 
                    href={item.link} 
                    className="flex flex-col group cursor-pointer bg-white border border-slate-200/90 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 h-full rounded-2xl overflow-hidden text-right"
                  >
                    <div className="aspect-[4/3] relative bg-slate-100 overflow-hidden">
                      <OptimizedImage 
                        src={item.img} 
                        alt={item.title} 
                        fill
                        section="news"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent opacity-80" />
                    </div>

                    <div className="p-6 flex flex-col flex-1">
                      <h3 className="text-lg md:text-xl font-black text-slate-900 mb-3 leading-[2.2] group-hover:text-emerald-700 transition-colors">
                        {item.title}
                      </h3>

                      <p className="text-sm text-slate-600 mb-6 flex-1 leading-[2.3]">
                        {item.desc}
                      </p>

                      <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                        <span className="font-bold text-xs md:text-sm text-emerald-700 flex items-center gap-1 group-hover:underline">
                          <span>{item.btnText}</span>
                          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        </span>

                        <div className="text-slate-400 group-hover:text-emerald-600 transition-colors">
                          <Heart className="w-4 h-4" />
                        </div>
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- BANK DETAILS SECTION --- */}
        <section id="bank-details" className="py-20 bg-white border-b border-slate-100 text-right">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white flex flex-col lg:flex-row items-stretch border border-slate-200 shadow-xl rounded-3xl overflow-hidden">
              
              {/* Bank Transfer Details Column */}
              <div className="flex-1 p-8 lg:p-12 border-b lg:border-b-0 lg:border-l border-slate-200">
                <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-full shadow-sm text-xs font-bold px-4 py-1.5 mb-6">
                  <Landmark size={15} />
                  <span>براہِ راست آفیشل بینک کھاتہ و ڈیجیٹل والٹس</span>
                </div>

                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 mb-4 leading-tight">
                  بینک اکاؤنٹ تفصیلات
                </h3>

                <p className="text-slate-600 mb-8 text-base md:text-lg leading-[2.3]">
                  آپ اپنے عطیات، زکوٰۃ اور صدقات نیچے دیے گئے آفیشل بینک اکاؤنٹ یا موبائل والٹ میں با آسانی منتقل فرما سکتے ہیں:
                </p>
                
                {/* Structured Horizontal Key-Value Account Details Card */}
                <div className="bg-white border-2 border-emerald-100 rounded-2xl shadow-sm overflow-hidden divide-y divide-slate-100">
                  
                  {/* Bank Name Row */}
                  <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-slate-50/80">
                    <div className="flex items-center gap-2 text-slate-700 font-bold text-sm sm:text-base">
                      <Landmark className="w-5 h-5 text-emerald-700 shrink-0" />
                      <span>بینک کا نام:</span>
                    </div>
                    <div className="text-base sm:text-lg font-black text-emerald-800">
                      میزان بینک (Meezan Bank Limited)
                    </div>
                  </div>

                  {/* Account Title Row */}
                  <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div className="text-slate-600 font-bold text-sm sm:text-base">
                      اکاؤنٹ ٹائٹل (Account Title):
                    </div>
                    <div className="text-base sm:text-lg font-black text-slate-900">
                      Muhammad Ahmad (آسان اکاؤنٹ)
                    </div>
                  </div>

                  {/* Account Number Row (Account ka Samny Account No) */}
                  <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-emerald-50/70">
                    <div className="text-emerald-900 font-black text-sm sm:text-base flex items-center gap-2">
                      <CreditCard className="w-5 h-5 text-emerald-700 shrink-0" />
                      <span>اکاؤنٹ نمبر (Account No):</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xl sm:text-2xl font-black text-slate-900 tracking-wider">
                        9869 0112 1013 13
                      </span>
                      <button 
                        onClick={() => handleCopy('98690112101313', 'bank')}
                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold bg-emerald-700 hover:bg-emerald-800 text-white transition-colors shadow-xs shrink-0"
                      >
                        {copiedBank ? <Check size={14} /> : <Copy size={14} />}
                        <span>{copiedBank ? 'کاپی ہو گیا!' : 'کاپی کریں'}</span>
                      </button>
                    </div>
                  </div>

                  {/* JazzCash Row */}
                  <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-slate-700 font-bold text-sm sm:text-base flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-amber-500 shrink-0" />
                      <span>جاز کیش (JazzCash):</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-lg sm:text-xl font-black text-slate-900 tracking-wide">
                        0328 4381 312
                      </span>
                      <button 
                        onClick={() => handleCopy('03284381312', 'jazz')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
                      >
                        {copiedJazz ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                        <span>{copiedJazz ? 'کاپی ہو گیا!' : 'کاپی کریں'}</span>
                      </button>
                    </div>
                  </div>

                  {/* NayaPay Row */}
                  <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="text-slate-700 font-bold text-sm sm:text-base flex items-center gap-2">
                      <span className="w-3 h-3 rounded-full bg-blue-500 shrink-0" />
                      <span>نیا پے (NayaPay):</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-lg sm:text-xl font-black text-slate-900 tracking-wide">
                        0316 4415 465
                      </span>
                      <button 
                        onClick={() => handleCopy('03164415465', 'naya')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0"
                      >
                        {copiedNaya ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                        <span>{copiedNaya ? 'کاپی ہو گیا!' : 'کاپی کریں'}</span>
                      </button>
                    </div>
                  </div>

                </div>

                <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                  * رقم منتقل کرنے کے بعد واٹس ایپ پر رسید کا اسکرین شاٹ ضرور ارسال فرمائیں تاکہ فوری تصدیقی رسید جاری کی جا سکے۔
                </p>
              </div>

              {/* Trust & Transparency Column */}
              <div className="flex-1 p-8 lg:p-12 bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 text-white flex flex-col justify-center relative overflow-hidden">
                <span className="text-xs font-bold text-amber-400 bg-white/10 px-3.5 py-1.5 rounded-md inline-block w-fit mb-4">
                  اعتماد و دیانت داری
                </span>
                <h2 className="text-3xl font-black mb-8 leading-[1.9]">
                  امانت داری، شفافیت اور مکمل اعتماد
                </h2>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-800/60 rounded-xl flex items-center justify-center shrink-0 border border-emerald-600/30">
                      <ShieldCheck size={24} className="text-emerald-300" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-white leading-snug">
                        شفاف حسابات و مکمل نگرانی
                      </h3>
                      <p className="text-emerald-100/90 text-sm leading-[2.2]">
                        جامعہ کا ہر ایک روپیہ باقاعدہ فنانشل آڈٹ اور جید علماء کرام کی سرپرستی میں پوری امانت کے ساتھ صرف کیا جاتا ہے۔
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-800/60 rounded-xl flex items-center justify-center shrink-0 border border-emerald-600/30">
                      <Award size={24} className="text-emerald-300" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-white leading-snug">
                        شرعی اصولوں کے عین مطابق صرف
                      </h3>
                      <p className="text-emerald-100/90 text-sm leading-[2.2]">
                        زکوٰۃ کے فنڈز کو مفتیانِ کرام کی براہِ راست نگرانی میں صرف اور صرف مستحقینِ زکوٰۃ پر خرچ کیا جاتا ہے۔
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-emerald-800/60 rounded-xl flex items-center justify-center shrink-0 border border-emerald-600/30">
                      <Users size={24} className="text-emerald-300" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1 text-white leading-snug">
                        براہِ راست دینی و ملی فائدہ
                      </h3>
                      <p className="text-emerald-100/90 text-sm leading-[2.2]">
                        ۲,۰۰۰ سے زائد مخلص مخیرین و معاونین کے قافلے میں شامل ہو کر طلبہ کے روشن مستقبل کی تعمیر میں کردار ادا کریں۔
                      </p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </section>

        {/* --- WHY SUPPORT US / IMPACT --- */}
        <section className="py-20 bg-slate-50 border-b border-slate-100 text-right">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-xs md:text-sm font-semibold tracking-wide inline-block mb-3 px-3.5 py-1 rounded-md text-emerald-800 bg-emerald-50 border border-emerald-200">
                آپ کے تعاون کا اثر
              </span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-[1.9] md:leading-[2.1]">
                آپ کے عطیات کس طرح اثر انداز ہوتے ہیں؟
              </h2>
              <p className="text-slate-600 text-base md:text-lg leading-[2.2]">
                جامعہ شیرِ ربانی صد فیصد مفت تعلیم، رہائش اور معیاری طعام فراہم کرتا ہے۔ آپ کا دیا گیا ہر روپیہ کسی بچے کو حافظ، قاری اور عالم بنانے میں خرچ ہوتا ہے۔
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
              {/* Hafiz Sponsorship */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="bg-white p-6 md:p-8 border border-slate-200/90 flex flex-col transition-all duration-300 transform hover:-translate-y-1.5 rounded-2xl shadow-sm border-t-4 border-t-emerald-600 hover:shadow-xl"
              >
                <div className="text-emerald-700 mb-5 bg-emerald-50 w-14 h-14 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3 leading-[2.1]">
                  حافظِ قرآن کی مکمل کفالت
                </h3>
                <p className="text-slate-600 text-sm leading-[2.3] flex-1 mb-8">
                  قرآن کریم حفظ کرنے والے ایک طالب علم کے تعلیمی، رہائشی اور خوراک کے مکمل اخراجات۔ جب تک وہ قرآن پڑھے گا، ثواب آپ کے نامہ اعمال میں درج ہوگا۔
                </p>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-slate-900 font-black text-xl md:text-2xl font-mono">
                    ۸,۰۰۰ روپے
                  </div>
                  <div className="text-xs font-bold text-slate-500">
                    / ماہانہ کفالت
                  </div>
                </div>
              </motion.div>

              {/* Dars-e-Nizami Alim */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="bg-white p-6 md:p-8 border border-slate-200/90 flex flex-col transition-all duration-300 transform hover:-translate-y-1.5 rounded-2xl shadow-sm border-t-4 border-t-amber-500 hover:shadow-xl"
              >
                <div className="text-amber-600 mb-5 bg-amber-50 w-14 h-14 rounded-xl flex items-center justify-center">
                  <GraduationCap className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3 leading-[2.1]">
                  عالمِ دین (درسِ نظامی طالب علم)
                </h3>
                <p className="text-slate-600 text-sm leading-[2.3] flex-1 mb-8">
                  ۸ سالہ درسِ نظامی کورس کرنے والے مستقبل کے عالم، محقق اور مفتی کے تمام تدریسی اخراجات، نصابی کتب اور رہائش کی کفالت فرمائیں۔
                </p>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-slate-900 font-black text-xl md:text-2xl font-mono">
                    ۱۲,۰۰۰ روپے
                  </div>
                  <div className="text-xs font-bold text-slate-500">
                    / ماہانہ کفالت
                  </div>
                </div>
              </motion.div>

              {/* Campus Expansion */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white p-6 md:p-8 border border-slate-200/90 flex flex-col transition-all duration-300 transform hover:-translate-y-1.5 rounded-2xl shadow-sm border-t-4 border-t-blue-600 hover:shadow-xl"
              >
                <div className="text-blue-600 mb-5 bg-blue-50 w-14 h-14 rounded-xl flex items-center justify-center">
                  <Building2 className="w-7 h-7" />
                </div>
                <h3 className="text-xl font-black text-slate-900 mb-3 leading-[2.1]">
                  کیمپس توسیع و تعمیراتی فنڈ
                </h3>
                <p className="text-slate-600 text-sm leading-[2.3] flex-1 mb-8">
                  بڑھتی ہوئی تعداد کے پیشِ نظر نئے کلاس رومز، اسلامک ریسرچ لائبریری اور ہاسٹل کمروں کے تعمیری مٹیریل کی فراہمی میں شرکت کریں۔
                </p>
                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div className="text-slate-900 font-black text-xl md:text-2xl">
                    حسبِ توفیق
                  </div>
                  <div className="text-xs font-bold text-slate-500">
                    کوئی بھی رقم
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- FAQ/SUPPORT SECTION --- */}
        <section className="py-20 bg-white border-b border-slate-100 text-right">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto bg-slate-50 border border-slate-200 p-8 sm:p-12 md:p-16 text-center rounded-3xl shadow-sm">
              <span className="text-xs font-bold text-emerald-800 bg-emerald-100/70 px-3.5 py-1.5 rounded-md inline-block mb-4">
                اکاؤنٹس و فنانس رہنمائی
              </span>
              
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-black mb-4 text-slate-900 leading-[1.9] md:leading-[2.1]">
                عطیات یا زکوٰۃ کے حوالے سے کوئی سوال ہے؟
              </h2>
              
              <p className="text-slate-600 mb-8 text-base md:text-lg max-w-2xl mx-auto leading-[2.3]">
                ہمارا شعبہ اکاؤنٹس ادائیگی کے طریقوں، زکوٰۃ کے حساب اور آفیشل رسید کے اجرا کے لیے آپ کی مکمل رہنمائی کے لیے حاضر ہے۔
              </p>
              
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link 
                  href="/contact" 
                  className="px-8 py-3.5 bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white font-bold rounded-xl shadow-md transition-all text-base"
                >
                  شعبہ اکاؤنٹس سے رابطہ کریں
                </Link>
                <Link 
                  href="/about" 
                  className="px-8 py-3.5 bg-white text-slate-700 font-bold border border-slate-300 hover:border-emerald-700 hover:text-emerald-700 rounded-xl transition-colors text-base"
                >
                  جامعہ کا تعارف و مقاصد پڑھیں
                </Link>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </div>
  );
}
