'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { 
  FileText, 
  Building2, 
  Clock, 
  ArrowLeft,
  ArrowRight,
  CheckCircle2, 
  Phone, 
  Mail, 
  Award, 
  Search,
} from 'lucide-react';
import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import AdmissionChallan from '@/components/AdmissionChallan';
import AdmissionForm, { Admission } from '@/components/AdmissionForm';

const REQUIREMENT_TRANSLATIONS: Record<string, { title: string, text: string }> = {
  "Age Verification": {
    title: "عمر کی حد اور تعلیمی اہلیت",
    text: "مختلف شعبہ جات اور درجات کے لیے عمر ۵ سے ۸۰ سال کے درمیان ہونی چاہیے۔"
  },
  "Authentic Documents": {
    title: "مصدقہ تعلیمی و شناختی اسناد",
    text: "نادرا شناختی کارڈ / ب فارم، والد کا شناختی کارڈ اور سابقہ رزلٹ کارڈز یا اسناد کی واضح کاپیاں لازمی ہیں۔"
  },
  "Interview Process": {
    title: "تحریری ٹیسٹ و انٹرویو",
    text: "تمام طلبہ کے لیے بنیادی ناظرہ و تجوید القرآن اور اخلاقی و علمی انٹرویو پاس کرنا لازمی ہے۔"
  }
};

const getRequirementDisplay = (raw: { title: string, text: string }) => {
  if (REQUIREMENT_TRANSLATIONS[raw.title]) {
    return REQUIREMENT_TRANSLATIONS[raw.title];
  }
  let title = raw.title;
  let text = raw.text;
  if (title === 'Age Verification' || (text && text.includes('between 5 and 80'))) {
    title = 'عمر کی حد اور تعلیمی اہلیت';
    text = 'مختلف شعبہ جات اور درجات کے لیے عمر ۵ سے ۸۰ سال کے درمیان ہونی چاہیے۔';
  } else if (title === 'Authentic Documents' || (text && text.toLowerCase().includes('clear copies of nadra'))) {
    title = 'مصدقہ تعلیمی و شناختی اسناد';
    text = 'نادرا شناختی کارڈ / ب فارم، والد کا شناختی کارڈ اور سابقہ رزلٹ کارڈز یا اسناد کی واضح کاپیاں لازمی ہیں۔';
  } else if (title === 'Interview Process' || (text && text.toLowerCase().includes('quran recitation'))) {
    title = 'تحریری ٹیسٹ و انٹرویو';
    text = 'تمام طلبہ کے لیے بنیادی ناظرہ و تجوید القرآن اور اخلاقی و علمی انٹرویو پاس کرنا لازمی ہے۔';
  }
  return { title, text };
};

export default function Admissions() {
  const { t } = useTranslation();
  const [submittedData, setSubmittedData] = useState<Admission | null>(null);
  const [requirements, setRequirements] = useState<{id: number, title: string, text: string}[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('/api/admission-requirements?t=' + Date.now()).then(res => res.json()).then(data => setRequirements(data)).catch(err => console.error(err));
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50 font-urdu" dir="rtl">
        <Header />
        <main className="flex-1" />
        <Footer />
      </div>
    );
  }

  if (submittedData) {
    return (
      <div className="flex flex-col min-h-screen bg-white font-urdu" dir="rtl">
        <Header />
        <AdmissionChallan data={submittedData} onBack={() => setSubmittedData(null)} />
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 font-urdu text-slate-900 bg-white" dir="rtl">
        
        {/* --- HERO SECTION --- */}
        <section className="relative pt-24 pb-20 bg-white border-b border-slate-100 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.88), rgba(255,255,255,0.88)), url('/ahmad.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block bg-rose-50 border border-rose-200 text-rose-700 rounded-full text-sm font-bold px-5 py-2 mb-6 shadow-sm leading-[2.0]">
                  تعلیمی سال ۲۰۲۶-۲۷ کے لیے داخلے جاری ہیں
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 mb-6 leading-[2.1] sm:leading-[2.2]">
                  علومِ نبویہ کی تحصیل کا مبارک سفر شروع کریں
                </h1>
                <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto mb-10 leading-[2.3]">
                  جامعہ شیرِ ربانی کے علمی اور روحانی کارواں کا حصہ بنیں۔ آن لائن داخلہ فارم مکمل کریں اور دینی و عصری تعلیم کے اس عظیم الشان مرکز میں داخلہ حاصل کریں۔
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                   <div className="flex items-center gap-2 text-emerald-800 text-base font-bold bg-emerald-50 border border-emerald-200 rounded-full shadow-sm px-6 py-2.5 leading-[2.0]">
                      <Clock size={18} className="text-emerald-600" /> فوری اور آسان طریقہ کار
                   </div>
                   <div className="flex items-center gap-2 text-emerald-800 text-base font-bold bg-emerald-50 border border-emerald-200 rounded-full shadow-sm px-6 py-2.5 leading-[2.0]">
                      <FileText size={18} className="text-emerald-600" /> آن لائن دستاویزات کی جانچ
                   </div>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <span className="text-slate-600 text-base font-medium leading-[2.0]">کیا آپ پہلے ہی داخلہ کے لیے درخواست جمع کرا چکے ہیں؟</span>
                  <a
                    href="/admissions/status"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm shadow-md transition-all hover:scale-105 leading-[2.0]"
                  >
                    <Search size={16} className="text-emerald-400" />
                    <span>درخواست کا اسٹیٹس چیک کریں</span>
                    <ArrowLeft size={16} className="text-emerald-400 font-bold me-1" />
                  </a>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- ADMISSION PROCESS GUIDE --- */}
        <section className="py-16 bg-slate-50/50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 leading-[2.1]">داخلہ حاصل کرنے کا ۴ مرحلہ وار آسان طریقہ کار</h2>
              <p className="text-slate-600 text-base md:text-lg leading-[2.3]">جامعہ شیرِ ربانی نے داخلہ کے عمل کو انتہائی آسان اور شفاف بنا دیا ہے تاکہ ملک بھر سے طلبہ و طالبات گھر بیٹھے باآسانی درخواست دے سکیں۔</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {[
                { 
                  step: "۰۱", 
                  title: "آن لائن فارم کا اندراج", 
                  desc: "ویب سائٹ پر دیے گئے فارم میں اپنی ذاتی، خاندانی اور تعلیمی معلومات درست طور پر درج کریں۔", 
                  icon: <FileText className="w-5 h-5 md:w-6 md:h-6" />,
                  color: "border-rose-100 hover:border-rose-400 bg-rose-50 text-rose-600"
                },
                { 
                  step: "۰۲", 
                  title: "دستاویزات اپ لوڈ کریں", 
                  desc: "شناختی کارڈ یا ب فارم، تازہ ترین تصاویر اور سابقہ تعلیمی رزلٹ کارڈز کی صاف کاپیاں اپ لوڈ کریں۔", 
                  icon: <FileText className="w-5 h-5 md:w-6 md:h-6" />,
                  color: "border-amber-100 hover:border-amber-400 bg-amber-50 text-amber-600"
                },
                { 
                  step: "۰۳", 
                  title: "دستاویزات کی جانچ و انٹرویو", 
                  desc: "مجلسِ تعلیم آپ کی درخواست کا جائزہ لے کر داخلہ انٹرویو اور تحریری ٹیسٹ کا شیڈول جاری کرے گی۔", 
                  icon: <Building2 className="w-5 h-5 md:w-6 md:h-6" />,
                  color: "border-emerald-100 hover:border-emerald-400 bg-emerald-50 text-emerald-600"
                },
                { 
                  step: "۰۴", 
                  title: "داخلہ کی تصدیق و رول نمبر", 
                  desc: "کامیابی کی صورت میں داخلہ فیس جمع کروائیں، تصدیقی چالان اور جامعہ کا شناختی کارڈ حاصل کریں۔", 
                  icon: <Award className="w-5 h-5 md:w-6 md:h-6" />,
                  color: "border-blue-100 hover:border-blue-400 bg-blue-50 text-blue-600"
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-6 md:p-8 border shadow-sm transition-all duration-300 transform hover:-translate-y-1 relative group rounded-2xl">
                  <div className={`mb-4 w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center shadow-sm border ${item.color}`}>
                    {item.icon}
                  </div>
                  <div className="absolute top-4 start-4 text-2xl md:text-3xl font-bold text-slate-200 select-none">{item.step}</div>
                  <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-2 leading-[2.0]">{item.title}</h3>
                  <p className="text-sm text-slate-600 leading-[2.2]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FORM SECTION --- */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Requirements & Help Column */}
              <div className="lg:col-span-4 space-y-8">
                <div className="sticky top-24">
                  <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-6 leading-[2.1] pb-3 border-b border-slate-200">شرائط و ضروری ہدایات برائے داخلہ</h2>
                  
                  <div className="space-y-6">
                    {requirements.length > 0 ? requirements.map((rawReq, i) => {
                      const req = getRequirementDisplay(rawReq);
                      return (
                        <div key={rawReq.id || i} className="flex gap-4 items-start">
                          <div className="text-emerald-600 shrink-0 mt-1">
                            <CheckCircle2 size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-base mb-1 leading-[2.0]">{req.title}</h4>
                            <p className="text-sm text-slate-600 leading-[2.2]">{req.text}</p>
                          </div>
                        </div>
                      );
                    }) : (
                      <>
                        <div className="flex gap-4 items-start">
                          <div className="text-emerald-600 shrink-0 mt-1">
                            <CheckCircle2 size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-base mb-1 leading-[2.0]">درست اور تصدیق شدہ کوائف</h4>
                            <p className="text-sm text-slate-600 leading-[2.2]">طالب علم کے شناختی کارڈ / ب فارم اور سابقہ اسناد کا نادرا اور تعلیمی بورڈ سے مصدقہ ہونا لازمی ہے۔</p>
                          </div>
                        </div>

                        <div className="flex gap-4 items-start">
                          <div className="text-emerald-600 shrink-0 mt-1">
                            <CheckCircle2 size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-base mb-1 leading-[2.0]">اصل دستاویزات کا ہمراہ ہونا</h4>
                            <p className="text-sm text-slate-600 leading-[2.2]">انٹرویو اور ٹیسٹ کے وقت تمام اصل تعلیمی اسناد، رزلٹ کارڈز اور قومی شناختی کارڈ ساتھ لانا لازمی ہوگا۔</p>
                          </div>
                        </div>

                        <div className="flex gap-4 items-start">
                          <div className="text-emerald-600 shrink-0 mt-1">
                            <CheckCircle2 size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-slate-900 text-base mb-1 leading-[2.0]">جامعہ کے قواعد و ضوابط کی پابندی</h4>
                            <p className="text-sm text-slate-600 leading-[2.2]">طالب علم اور سرپرست کے لیے جامعہ کی روایات، شرعی وضع قطع، اور اوقاتِ تعلیم کی مکمل پاسداری لازم ہوگی۔</p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Help Box */}
                  <div className="mt-10 bg-gradient-to-br from-emerald-800 to-teal-900 p-8 text-white rounded-3xl shadow-xl relative overflow-hidden">
                    <h4 className="text-xl font-bold mb-3 leading-[2.0]">رہنمائی یا معاونت درکار ہے؟</h4>
                    <p className="text-emerald-100 text-sm mb-6 leading-[2.2]">اگر آپ کو داخلہ فارم مکمل کرنے یا کسی معلومات کے حصول میں کوئی مشکل درپیش ہو تو شعبہ داخلہ سے فوری رابطہ فرمائیں۔</p>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 font-bold text-sm" dir="ltr">
                        <Phone size={16} className="text-emerald-300" />
                        <a href="tel:03144081516" className="hover:text-emerald-200">0314-4081516</a>
                      </div>
                      <div className="flex items-center gap-3 font-bold text-sm" dir="ltr">
                        <Mail size={16} className="text-emerald-300" />
                        <a href="mailto:shererabbani@gmail.com" className="hover:text-emerald-200">shererabbani@gmail.com</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Form Column */}
              <div className="lg:col-span-8">
                <Suspense fallback={
                  <div className="p-20 flex flex-col items-center justify-center gap-4 bg-white border border-slate-100 rounded-3xl">
                    <div className="w-8 h-8 border-4 border-slate-100 border-t-emerald-600 rounded-full animate-spin" />
                    <span className="text-slate-500 font-bold text-base leading-[2.0]">داخلہ فارم لوڈ ہو رہا ہے...</span>
                  </div>
                }>
                  <div className="bg-white border border-slate-200 shadow-xl shadow-emerald-900/5 rounded-3xl overflow-hidden">
                    <AdmissionForm onSuccess={(data) => setSubmittedData(data)} />
                  </div>
                </Suspense>
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ / FOOTER INFO SECTION --- */}
        <section className="py-16 bg-slate-50 border-b border-slate-100">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "داخلہ ٹیسٹ و انٹرویو",
                desc: "مناسب تعلیمی درجے اور کلاس کے تعین کے لیے عربی گرائمر، تجوید القرآن اور بنیادی دینی معلومات کا ٹیسٹ لیا جائے گا۔",
                color: "bg-rose-500 border-rose-100"
              }, 
              {
                title: "رہائش و طعام کی سہولیات",
                desc: "دیگر شہروں اور دور دراز کے طلبہ کے لیے پرامن اور معیاری ہاسٹل، باقاعدہ نظامِ طعام اور سیکیورٹی کا مکمل انتظام موجود ہے۔",
                color: "bg-amber-500 border-amber-100"
              }, 
              {
                title: "مستحق طلبہ کے لیے وظائف",
                desc: "مستحق اور نادار طلبہ کے لیے صدقات و خیرات فنڈ سے مفت تعلیم، کتب، رہائش اور مکمل کفالت کی خصوصی گنجائش رکھی جاتی ہے۔",
                color: "bg-emerald-500 border-emerald-100"
              }
            ].map((box, i) => (
              <div key={i} className="bg-white p-6 md:p-8 border border-slate-200 shadow-sm rounded-2xl transition-all transform hover:-translate-y-1">
                <h4 className="font-bold text-slate-900 text-lg mb-3 flex items-center gap-2 leading-[2.0]">
                  <div className={`w-2.5 h-2.5 rounded-full shrink-0 shadow-sm ${box.color}`} />
                  {box.title}
                </h4>
                <p className="text-sm text-slate-600 leading-[2.3]">{box.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}