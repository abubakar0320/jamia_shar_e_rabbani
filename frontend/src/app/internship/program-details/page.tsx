'use client';
import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import Head from 'next/head';
import { ChevronLeft, Target, Clock, Users, ArrowLeft, UserCheck, Phone, Mail, MessageCircle } from 'lucide-react';
import Link from 'next/link';

export default function ProgramDetailsPage() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const domains = [
    {
      id: "it",
      title: "انفارمیشن ٹیکنالوجی و کمپیوٹر سائنس",
      brandColor: "bg-emerald-700",
      textColor: "text-emerald-700",
      icon: (
        <svg viewBox="0 0 64 64" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
          <rect x="8" y="12" width="48" height="32" rx="0" fill="#f3f2f1" stroke="#047857" strokeWidth="2"/>
          <path d="M24 44v8m16-8v8m-20 0h24" stroke="#047857" strokeWidth="2" strokeLinecap="square" />
          <path d="M16 28l6-6-6-6M28 28h8" stroke="#047857" strokeWidth="2" strokeLinecap="square" strokeLinejoin="miter"/>
        </svg>
      ),
      description: "جدید ٹیکنالوجی کے میدان میں عملی مہارت حاصل کریں۔ یہ شعبہ ان طلبہ کے لیے ہے جو سافٹ ویئر، ویب ایپس بنانے، دلکش ڈیزائن تیار کرنے اور کمپیوٹر نیٹ ورک کے حل تلاش کرنے کا شوق رکھتے ہیں۔",
      roles: [
        { name: "ویب ڈویلپمنٹ", desc: "Next.js، React اور Node.js کے ذریعے جدید، ریسپانسیو اور تیز رفتار ویب سائٹس تیار کریں۔" },
        { name: "موبائل ایپ ڈویلپمنٹ", desc: "اینڈرائیڈ اور آئی او ایس کے لیے کارآمد موبائل ایپس کی تیاری۔" },
        { name: "یو آئی / یو ایکس ڈیزائننگ", desc: "صارف دوست اور جدید انٹرفیسز، پروٹو ٹائپس اور ڈیزائن تیار کریں۔" },
        { name: "گرافک ڈیزائننگ", desc: "جامعہ کے لیے سوشل میڈیا پوسٹس، بینرز، اور تشہیری مواد ڈیزائن کریں۔" }
      ]
    },
    {
      id: "academic",
      title: "علمی و تحقیقی شعبہ (ریسرچ و تصنیف)",
      brandColor: "bg-blue-700",
      textColor: "text-blue-700",
      icon: (
        <svg viewBox="0 0 64 64" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
          <path d="M32 8L8 20l24 12 24-12L32 8z" fill="#f3f2f1" stroke="#1d4ed8" strokeWidth="2" strokeLinejoin="miter"/>
          <path d="M16 26v16l16 8 16-8V26" fill="none" stroke="#1d4ed8" strokeWidth="2" strokeLinejoin="miter"/>
          <path d="M56 20v18" stroke="#1d4ed8" strokeWidth="2" strokeLinecap="square"/>
        </svg>
      ),
      description: "اسلامی علوم کے تحفظ اور نشر و اشاعت میں عملی کردار ادا کریں۔ یہ شعبہ ان طلبہ کے لیے موزوں ہے جو تحریر و تحقیق کی عمدہ صلاحیت اور دینی علوم کا گہرا فہم رکھتے ہیں۔",
      roles: [
        { name: "اسلامک ریسرچ و تحقیق", desc: "فقہی، تاریخی اور عصری موضوعات پر مستند اور معیاری تحقیقی کام۔" },
        { name: "ترجمہ نگاری کی خدمات", desc: "عربی، اردو اور انگریزی زبانوں کے درمیان کتب اور مقالات کا مستند ترجمہ۔" },
        { name: "کانٹینٹ و مضمون نگاری", desc: "ویب سائٹ اور رسائل و جرائد کے لیے علمی مضامین اور اسکرپٹس کی تیاری۔" }
      ]
    },
    {
      id: "admin",
      title: "انتظامیہ و ادارہ جاتی مینجمنٹ",
      brandColor: "bg-amber-700",
      textColor: "text-amber-700",
      icon: (
        <svg viewBox="0 0 64 64" width="48" height="48" xmlns="http://www.w3.org/2000/svg">
          <rect x="24" y="16" width="16" height="16" fill="#f3f2f1" stroke="#b45309" strokeWidth="2"/>
          <path d="M16 52v-8h32v8" fill="none" stroke="#b45309" strokeWidth="2" strokeLinejoin="miter"/>
          <path d="M44 20h8v16H12V20h8" fill="none" stroke="#b45309" strokeWidth="2" strokeLinejoin="miter"/>
        </svg>
      ),
      description: "تعلیمی و فلاحی اداروں کے نظم و نسق کی باریکیاں سیکھیں۔ یہ شعبہ ان نوجوانوں کے لیے بہترین ہے جو تنظیمی صلاحیتوں، ایونٹ مینجمنٹ اور دفتری امور میں مہارت حاصل کرنا چاہتے ہیں۔",
      roles: [
        { name: "ایونٹ و سیمینار مینجمنٹ", desc: "جامعہ کے سالانہ، ماہانہ اور خصوصی سیمینارز اور تقاریب کا منظم انتظام۔" },
        { name: "امورِ طلبہ (اسٹوڈنٹ افیئرز)", desc: "طلبہ کے داخلہ، امتحانات اور یومیہ رابطہ کاری کے معاملات کی نگرانی۔" },
        { name: "ڈیٹا اینٹری و ریکارڈ مینجمنٹ", desc: "طلبہ کا ریکارڈ، رپورٹس اور دفتری ڈیٹا کا باقاعدہ اندراج اور تجزیہ۔" }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#faf9f8] flex flex-col font-urdu" dir="rtl">
      <Head>
        <title>پروگرام کی تفصیلات | انٹرن شپ - جامعہ شیرِ ربانی</title>
      </Head>
      
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <div className="bg-white border-b border-[#edebe9] pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#f3f2f1] text-[#605e5c] text-sm font-bold mb-6 rounded-full leading-[2.0]">
              <Target size={16} className="text-emerald-700" />
              جامعہ شیرِ ربانی - خصوصی انٹرن شپ پروگرام
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#323130] mb-6 tracking-tight leading-[2.1]">
              انٹرن شپ پروگرام کی مکمل تفصیلات و شعبہ جات
            </h1>
            <p className="text-lg md:text-xl text-[#605e5c] max-w-3xl mx-auto leading-[2.3]">
              ہمارے انٹرن شپ پروگرام کے مختلف شعبہ جات کا جائزہ لیں۔ اپنی دلچسپی اور مستقبل کے اہداف کے مطابق مناسب ترین شعبہ منتخب کریں۔
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 border border-[#edebe9] shadow-sm flex items-center gap-4 rounded-xl">
              <div className="w-12 h-12 bg-emerald-50 flex items-center justify-center shrink-0 text-emerald-700 rounded-lg">
                <Clock />
              </div>
              <div>
                <h3 className="font-bold text-[#323130] text-base leading-[2.0]">دورانیہ</h3>
                <p className="text-sm text-[#605e5c] leading-[2.0]">۳ سے ۶ ماہ</p>
              </div>
            </div>
            <div className="bg-white p-6 border border-[#edebe9] shadow-sm flex items-center gap-4 rounded-xl">
              <div className="w-12 h-12 bg-blue-50 flex items-center justify-center shrink-0 text-blue-700 rounded-lg">
                <Users />
              </div>
              <div>
                <h3 className="font-bold text-[#323130] text-base leading-[2.0]">اہلیت</h3>
                <p className="text-sm text-[#605e5c] leading-[2.0]">یونیورسٹی اور دینی مدارس کے طلبہ و طالبات</p>
              </div>
            </div>
            <div className="bg-white p-6 border border-[#edebe9] shadow-sm flex items-center gap-4 rounded-xl">
              <div className="w-12 h-12 bg-amber-50 flex items-center justify-center shrink-0 text-amber-700 rounded-lg">
                <Target />
              </div>
              <div>
                <h3 className="font-bold text-[#323130] text-base leading-[2.0]">طریقہ کار</h3>
                <p className="text-sm text-[#605e5c] leading-[2.0]">جامعہ کیمپس اور آن لائن (ریموٹ)</p>
              </div>
            </div>
          </div>
        </div>

        {/* Domains Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
          <div className="space-y-8">
            {domains.map((domain) => (
              <div 
                key={domain.id}
                className="bg-white border border-[#edebe9] shadow-md flex flex-col md:flex-row rounded-2xl overflow-hidden"
              >
                {/* Visual Side */}
                <div className="w-full md:w-1/3 p-10 flex flex-col items-center justify-center text-center bg-[#faf9f8] border-b md:border-b-0 md:border-l border-[#edebe9]">
                  <div className="mb-6">
                    {domain.icon}
                  </div>
                  <h2 className="text-2xl font-bold text-[#323130] mb-3 leading-[2.0]">{domain.title}</h2>
                  <p className="text-[#605e5c] text-sm leading-[2.2]">
                    {domain.description}
                  </p>
                </div>
                
                {/* Content Side */}
                <div className="w-full md:w-2/3 p-8 md:p-10">
                  <h3 className="text-lg font-bold text-[#323130] mb-6 flex items-center gap-2 leading-[2.0]">
                    <span className={`w-2 h-5 rounded-sm ${domain.brandColor}`}></span>
                    دستیاب کردار اور مہارتیں
                  </h3>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {domain.roles.map((role, rIndex) => (
                      <div key={rIndex} className="group p-4 border border-[#edebe9] hover:border-emerald-300 bg-white transition-colors rounded-xl">
                        <h4 className={`font-bold text-[#323130] mb-1.5 flex items-center gap-2 leading-[2.0]`}>
                          <ChevronLeft size={16} className="text-emerald-700 shrink-0" />
                          <span>{role.name}</span>
                        </h4>
                        <p className="text-sm text-[#605e5c] leading-[2.2] pe-6">
                          {role.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-[#edebe9]">
                    <Link href="/internship#apply" className={`inline-flex items-center gap-2 px-6 py-2.5 text-white font-bold rounded-md shadow-sm ${domain.brandColor} hover:opacity-90 transition-opacity leading-[2.0]`}>
                      اس شعبہ کے لیے اپلائی کریں <ArrowLeft size={16} />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Supervisor Information Card */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 text-white p-6 sm:p-10 rounded-3xl shadow-xl border border-emerald-500/20">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-500 flex items-center justify-center text-white text-3xl font-bold shadow-lg shrink-0 border border-white/20">
                <UserCheck size={44} className="text-white" />
              </div>
              <div className="flex-1 text-center md:text-right">
                <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold mb-3 border border-emerald-400/30 leading-[2.0]">
                  <span>★ نگران و ہیڈ آف انٹرن شپ پروگرام</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-[2.1]">
                  محترم ابوبکر صدیق (Abubakar Siddique)
                </h3>
                <p className="text-emerald-100/90 text-sm sm:text-base leading-[2.3] mb-5 max-w-3xl">
                  یہ انٹرن شپ پروگرام محترم <strong>ابوبکر صدیق</strong> (انٹرن شپ سپروائزر) کے زیرِ نگرانی چلایا جا رہا ہے۔ پروگرام کے نصاب، پراجیکٹ اسائنمنٹس، اور ٹریننگ کے متعلق کسی بھی سوال یا رہنمائی کے لیے سپروائزر سے براہِ راست رابطہ کیا جا سکتا ہے۔
                </p>
                
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-3">
                  <a 
                    href="https://wa.me/923097354874" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-sm font-bold shadow-sm transition-all leading-[2.0]"
                    dir="ltr"
                  >
                    <MessageCircle size={18} /> 0309-7354874 (WhatsApp)
                  </a>
                  <a 
                    href="mailto:abubakr.bgnu@gmail.com" 
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl text-sm font-bold transition-all leading-[2.0]"
                    dir="ltr"
                  >
                    <Mail size={18} /> abubakr.bgnu@gmail.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white py-16 text-center">
           <div className="max-w-3xl mx-auto px-4">
             <h2 className="text-3xl font-bold mb-4 leading-[2.1]">کیا آپ اپنے کیریئر کا شاندار آغاز کرنے کے لیے تیار ہیں؟</h2>
             <p className="text-lg text-emerald-100 mb-8 leading-[2.2]">جامعہ شیرِ ربانی کے انٹرن شپ پروگرام کا حصہ بنیں اور اپنی کتابی معلومات کو عملی تجربے میں تبدیل کریں۔</p>
             <Link href="/internship#apply" className="inline-flex items-center gap-2 px-8 py-3 bg-white text-emerald-800 font-bold text-base rounded-md hover:bg-[#f3f2f1] transition-colors shadow-md leading-[2.0]">
                آن لائن درخواست فارم پر کریں <ArrowLeft size={18} />
             </Link>
           </div>
        </div>

      </main>
      
      <Footer />
    </div>
  );
}