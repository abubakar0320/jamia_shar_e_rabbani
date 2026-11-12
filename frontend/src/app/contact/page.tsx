'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { Mail, Phone, MapPin, ChevronLeft, Globe2, Clock, Landmark, ShieldCheck, Award, ArrowLeft } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Contact() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('loading');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage('پیغام بھیجنے میں خرابی پیش آئی۔ براہ کرم دوبارہ کوشش کریں۔');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage('سرور سے رابطہ نہ ہو سکا۔ براہ کرم انٹرنیٹ چیک کریں۔');
    }
  };

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-white font-urdu" dir="rtl">
        <Header />
        <main className="flex-1" />
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-white font-urdu text-slate-900" dir="rtl">
        
        {/* --- HERO SECTION --- */}
        <section className="relative pt-24 pb-20 bg-white border-b border-slate-100 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.88), rgba(255,255,255,0.88)), url('/ahmad.webp')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block bg-emerald-50 border border-emerald-200 text-emerald-700 rounded-full shadow-sm text-sm font-bold px-5 py-1.5 mb-6 leading-[2.0]">
                  ہم سے رابطہ فرمائیں
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-[2.1] sm:leading-[2.2]">
                  جامعہ شیرِ ربانی آپ کی رہنمائی کے لیے ہمہ وقت حاضر ہے
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-[2.3]">
                  چاہے آپ کے ذہن میں داخلہ، علمی و تحقیقی شعبہ جات یا فلاحی خدمات کے حوالے سے کوئی سوال ہو، ہماری مخلص انتظامیہ آپ کی مکمل رہنمائی کے لیے تیار ہے۔
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                   <div className="flex items-center gap-2 text-amber-800 text-base font-bold bg-amber-50 border border-amber-200 rounded-full shadow-sm px-6 py-2.5 leading-[2.0]">
                     <Clock size={18} className="text-amber-600" /> ۲۴ گھنٹوں میں فوری جواب
                   </div>
                   <div className="flex items-center gap-2 text-emerald-800 text-base font-bold bg-emerald-50 border border-emerald-200 rounded-full shadow-sm px-6 py-2.5 leading-[2.0]">
                     <Globe2 size={18} className="text-emerald-600" /> ملک بھر اور بیرونِ ملک رہنمائی
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- DETAILED CONTACT METHODS --- */}
        <section className="py-16 bg-slate-50/50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
              {[
                { 
                  title: "عمومی معلومات و استفسارات", 
                  icon: <Globe2 className="w-6 h-6 text-emerald-600" />, 
                  info: "jamiashererabbani07@gmail.com", 
                  sub: "0314-4081516",
                  color: "bg-emerald-50 border-emerald-200"
                },
                { 
                  title: "دفترِ شعبہ داخلہ و امتحانات", 
                  icon: <Landmark className="w-6 h-6 text-blue-600" />, 
                  info: "jamiashererabbani07@gmail.com", 
                  sub: "0332-8364368",
                  color: "bg-blue-50 border-blue-200"
                }
              ].map((method, idx) => (
                <div key={idx} className="bg-white p-6 md:p-8 border border-slate-200 shadow-sm transition-all duration-300 transform hover:-translate-y-1 rounded-2xl text-center group">
                  <div className={`mb-4 w-14 h-14 mx-auto rounded-full flex items-center justify-center shadow-sm border ${method.color}`}>
                    {method.icon}
                  </div>
                  <h2 className="text-xl font-bold text-slate-900 mb-2 leading-[2.0]">{method.title}</h2>
                  <p className="text-sm font-bold text-slate-700 mb-1 font-mono" dir="ltr">{method.info}</p>
                  <p className="text-base text-emerald-700 font-bold font-mono" dir="ltr">{method.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FORM & INSTITUTIONAL INFO --- */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Form Column */}
              <div className="lg:col-span-7 bg-white p-8 md:p-10 border border-slate-200 rounded-3xl shadow-xl shadow-emerald-950/5">
                <div className="mb-8 border-b border-slate-100 pb-6">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-2 leading-[2.1]">پیغام یا سوال ارسال کریں</h2>
                  <p className="text-slate-600 text-sm leading-[2.2]">
                    درج ذیل فارم میں اپنا نام، ای میل اور مطلوبہ پیغام تحریر فرمائیں۔ ہماری انتظامیہ آپ کا پیغام متعلقہ شعبہ تک فوری پہنچائے گی۔
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 leading-[2.0]">مکمل نام *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="اپنا مکمل نام درج کریں"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-600 rounded-md transition-colors text-slate-900 leading-[2.0]"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 leading-[2.0]">ای میل ایڈریس *</label>
                    <input
                      type="email"
                      dir="ltr"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="example@email.com"
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-600 rounded-md transition-colors text-slate-900 text-right leading-[2.0]"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-2">
                    <label className="text-sm font-bold text-slate-700 leading-[2.0]">آپ کا پیغام یا استفسار *</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="اپنا تفصیلی پیغام یہاں تحریر فرمائیں..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:outline-none focus:border-emerald-600 rounded-md transition-colors text-slate-900 resize-none leading-[2.0]"
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full md:w-auto px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-base rounded-md shadow-md transition-all disabled:opacity-50 flex items-center justify-center gap-2 leading-[2.0]"
                    >
                      {status === 'loading' ? 'پیغام بھیجا جا رہا ہے...' : 'پیغام ارسال کریں'}
                      <ArrowLeft size={18} />
                    </button>
                    {status === 'success' && (
                      <div className="mt-4 p-4 bg-emerald-50 text-emerald-800 text-sm font-bold border border-emerald-200 rounded-xl shadow-sm leading-[2.0]">
                        آپ کا پیغام کامیابی کے ساتھ موصول ہو گیا ہے! ہم جلد آپ سے رابطہ کریں گے۔
                      </div>
                    )}
                    {status === 'error' && (
                      <div className="mt-4 p-4 bg-rose-50 text-rose-800 text-sm font-bold border border-rose-200 rounded-xl shadow-sm leading-[2.0]">
                        {errorMessage || 'پیغام بھیجنے میں خرابی پیش آئی۔ براہ کرم دوبارہ کوشش کریں۔'}
                      </div>
                    )}
                  </div>
                </form>
              </div>

              {/* Institutional Info & Location Column */}
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-gradient-to-br from-emerald-900 to-teal-950 p-8 text-white rounded-3xl shadow-xl overflow-hidden relative">
                  <h3 className="text-2xl font-bold mb-6 leading-[2.1]">کیمپس کی لوکیشن و پتہ</h3>
                  
                  <div className="space-y-6">
                    {/* Interactive Map */}
                    <div className="w-full h-44 border border-white/20 rounded-xl mb-6 overflow-hidden">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3403.48623403912!2d73.6855994!3d31.5879301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDM1JzE2LjUiTiA3M8KwNDEnMDguMiJF!5e0!3m2!1sen!2s!4v1718100000000!5m2!1sen!2s" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="text-emerald-300 shrink-0 mt-1">
                        <MapPin size={22} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1 leading-[2.0]">جامعہ کا باضابطہ پتہ:</h4>
                        <p className="text-sm text-emerald-100 leading-[2.2]">جامعہ شیرِ ربانی، مانانوالہ، ضلع شیخوپورہ، پنجاب، پاکستان</p>
                      </div>
                    </div>

                    <div className="flex gap-4 items-start">
                      <div className="text-emerald-300 shrink-0 mt-1">
                        <Clock size={22} />
                      </div>
                      <div>
                        <h4 className="font-bold text-white mb-1 leading-[2.0]">اوقاتِ دفتری:</h4>
                        <div className="text-sm text-emerald-100 space-y-1 leading-[2.2]">
                          <p>پیر تا جمعرات: صبح ۹:۰۰ بجے تا شام ۵:۰۰ بجے</p>
                          <p>ہفتہ: صبح ۹:۰۰ بجے تا شام ۵:۰۰ بجے</p>
                          <p className="text-emerald-300">جمعہ اور اتوار: ہفتہ وار تعطیل</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/20">
                    <Link 
                      href="https://www.google.com/maps/dir/?api=1&destination=31.58793009753148,73.68559944178602" 
                      target="_blank"
                      className="inline-flex items-center gap-2 text-white font-bold text-sm hover:underline leading-[2.0]"
                    >
                      <span>گوگل میپ پر راستہ دیکھیں</span>
                      <ChevronLeft size={16} />
                    </Link>
                  </div>
                </div>

                {/* Additional Security Info */}
                <div className="p-8 bg-white border border-slate-200 text-center rounded-2xl shadow-sm">
                  <div className="text-emerald-600 mb-3 bg-emerald-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center">
                    <ShieldCheck size={28} />
                  </div>
                  <h4 className="text-lg font-bold text-slate-900 mb-2 leading-[2.0]">محفوظ اور خفیہ رابطہ</h4>
                  <p className="text-sm text-slate-600 leading-[2.2]">
                    آپ کے تمام پیغامات اور کوائف کو ادارتی رازداری اور مکمل تحفظ کے ساتھ سنبھالا جاتا ہے۔
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}