'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { 
  FileText, 
  CheckCircle2,
  Phone,
  Mail,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  Laptop,
  Monitor,
  Library,
  Settings,
  ChevronLeft,
  MapPin,
  MessageCircle,
  Clock,
  Users,
  User,
  UserCheck,
  ArrowLeft
} from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function Internship() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    phone: '',
    email: '',
    institution: '',
    education: '',
    fieldOfInterest: ''
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const res = await fetch('/api/internships', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if(res.ok) {
        setSubmitted(true);
        setFormData({ fullName: '', fatherName: '', phone: '', email: '', institution: '', education: '', fieldOfInterest: '' });
      } else {
        console.error('Failed to submit application');
        alert("درخواست جمع کرنے میں ناکامی ہوئی۔ براہ کرم دوبارہ کوشش کریں۔");
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert("نیٹ ورک میں خرابی پیش آئی۔ براہ کرم اپنا انٹرنیٹ کنکشن چیک کریں۔");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-[#faf9f8] font-urdu" dir="rtl">
        <Header />
        <main className="flex-1" />
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 font-urdu text-[#323130] bg-[#faf9f8]" dir="rtl">
        
        {/* --- HERO SECTION --- */}
        <section className="relative pt-20 pb-24 bg-white border-b border-[#edebe9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Content */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#f3f2f1] text-[#605e5c] text-sm font-bold mb-6 rounded-full leading-[2.0]">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600"></span>
                  انٹرن شپ بیچ ۲۰۲۶ کے لیے داخلے جاری ہیں
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#323130] tracking-tight mb-6 leading-[2.1] sm:leading-[2.2]">
                  عملی تجربے سے اپنے روشن مستقبل کی بنیاد رکھیں
                </h1>
                
                <p className="text-lg md:text-xl text-[#605e5c] mb-10 leading-[2.3] max-w-xl">
                  جامعہ شیرِ ربانی کے زیرِ اہتمام یونیورسٹی اور مدارس کے طلبہ کے لیے خصوصی انٹرن شپ پروگرام۔ حقیقی منصوبوں پر کام کریں اور عملی و پیشہ ورانہ مہارتیں حاصل کریں۔
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a href="#apply" className="px-8 py-3.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-base transition-colors rounded-md shadow-md leading-[2.0]">
                    ابھی آن لائن اپلائی کریں
                  </a>
                  <a href="/internship/program-details" className="px-8 py-3.5 bg-white hover:bg-[#f3f2f1] border border-slate-300 text-[#323130] font-bold text-base transition-colors rounded-md leading-[2.0]">
                    پروگرام کی مکمل تفصیلات
                  </a>
                </div>
              </motion.div>

              {/* Stats Visual */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#faf9f8] p-6 border border-[#edebe9] rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-emerald-100 flex items-center justify-center mb-4 text-emerald-700 rounded-lg">
                      <Briefcase size={24} />
                    </div>
                    <h3 className="text-3xl font-bold text-[#323130] mb-1">50+</h3>
                    <p className="text-sm font-bold text-[#605e5c] leading-[2.0]">انٹرن شپ نشستیں</p>
                  </div>
                  <div className="bg-[#faf9f8] p-6 border border-[#edebe9] mt-8 rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-blue-100 flex items-center justify-center mb-4 text-blue-700 rounded-lg">
                      <GraduationCap size={24} />
                    </div>
                    <h3 className="text-3xl font-bold text-[#323130] mb-1">100%</h3>
                    <p className="text-sm font-bold text-[#605e5c] leading-[2.0]">مکمل طور پر مفت (بغیر فیس)</p>
                  </div>
                  <div className="bg-[#faf9f8] p-6 border border-[#edebe9] -mt-4 rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-amber-100 flex items-center justify-center mb-4 text-amber-700 rounded-lg">
                      <Award size={24} />
                    </div>
                    <h3 className="text-2xl font-bold text-[#323130] mb-1">تصدیق شدہ</h3>
                    <p className="text-sm font-bold text-[#605e5c] leading-[2.0]">باضابطہ سرٹیفکیٹ</p>
                  </div>
                  <div className="bg-[#faf9f8] p-6 border border-[#edebe9] mt-4 rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-purple-100 flex items-center justify-center mb-4 text-purple-700 rounded-lg">
                      <Clock size={24} />
                    </div>
                    <h3 className="text-3xl font-bold text-[#323130] mb-1">۳ تا ۶</h3>
                    <p className="text-sm font-bold text-[#605e5c] leading-[2.0]">ماہ کا دورانیہ</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- WHY INTERN SECTION --- */}
        <section className="py-20 bg-[#faf9f8] border-b border-[#edebe9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-[#323130] mb-4 leading-[2.1]">ہمارے ساتھ انٹرن شپ کیوں کریں؟</h2>
              <p className="text-[#605e5c] text-base md:text-lg leading-[2.3]">ہمارے منظم، پیشہ ورانہ اور پرامن تعلیمی ماحول میں اپنے شاندار کیریئر کی تیاری کا آغاز کریں۔</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "عملی تجربہ و لائیو پراجیکٹس",
                  desc: "حقیقی منصوبوں پر کام کریں اور مارکیٹ کی جدید ضروریات کے مطابق عملی مہارت حاصل کریں۔",
                  icon: <Laptop size={32} className="text-emerald-600" />
                },
                {
                  title: "ماہرین و اساتذہ کی رہنمائی",
                  desc: "متعلقہ شعبوں کے تجربہ کار ماہرین اور اساتذہ کی زیرِ نگرانی پیشہ ورانہ تربیت پائیں۔",
                  icon: <Users size={32} className="text-blue-600" />
                },
                {
                  title: "کیریئر کی ترقی و نیٹ ورکنگ",
                  desc: "تصدیق شدہ تجربہ کا سرٹیفکیٹ اور مستقبل کی ملازمتوں کے لیے وسیع نیٹ ورک قائم کریں۔",
                  icon: <Briefcase size={32} className="text-amber-600" />
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 border border-[#edebe9] hover:shadow-lg transition-all rounded-2xl group">
                  <div className="mb-6">{item.icon}</div>
                  <h3 className="text-xl font-bold text-[#323130] mb-3 leading-[2.0] group-hover:text-emerald-700 transition-colors">{item.title}</h3>
                  <p className="text-[#605e5c] text-sm leading-[2.3]">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- DOMAINS SECTION --- */}
        <section className="py-20 bg-white border-b border-[#edebe9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-[#323130] mb-4 leading-[2.1]">مطلوبہ شعبہ جات برائے انٹرن شپ</h2>
                <p className="text-[#605e5c] text-base md:text-lg leading-[2.3]">اپنے تعلیمی پس منظر اور مستقبل کی ترجیحات کے مطابق موزوں شعبہ کا انتخاب کریں۔</p>
              </div>
              <a href="/internship/program-details" className="text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 whitespace-nowrap text-base leading-[2.0]">
                تمام تفصیلات دیکھیں <ChevronLeft size={18} />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: "it",
                  title: "انفارمیشن ٹیکنالوجی و کمپیوٹر سائنس",
                  icon: <Monitor size={28} />,
                  bg: "bg-emerald-700",
                  roles: ["ویب ڈویلپمنٹ (Next.js / Node.js)", "گرافک ڈیزائننگ", "سوشل میڈیا مینجمنٹ", "آئی ٹی و نیٹ ورک سپورٹ"]
                },
                {
                  id: "academic",
                  title: "علمی و تحقیقی شعبہ (ریسرچ)",
                  icon: <Library size={28} />,
                  bg: "bg-blue-700",
                  roles: ["اسلامک ریسرچ و تحقیق", "مضامین نگاری و کانٹینٹ رائٹنگ", "عربی و انگلش ترجمہ نگاری"]
                },
                {
                  id: "admin",
                  title: "انتظامیہ و پراجیکٹ مینجمنٹ",
                  icon: <Settings size={28} />,
                  bg: "bg-amber-700",
                  roles: ["ایونٹ و سیمینار مینجمنٹ", "امورِ طلبہ و کوآرڈینیشن", "ڈیٹا اینٹری و ریکارڈ مینجمنٹ"]
                }
              ].map((domain, idx) => (
                <div key={idx} className="bg-[#faf9f8] border border-[#edebe9] hover:border-emerald-300 transition-colors rounded-2xl overflow-hidden shadow-sm">
                  <div className={`p-6 ${domain.bg} text-white flex items-center gap-4`}>
                    {domain.icon}
                    <h3 className="text-lg font-bold leading-[2.0]">{domain.title}</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {domain.roles.map((role, rIdx) => (
                        <li key={rIdx} className="flex items-center gap-2 text-[#605e5c] text-sm leading-[2.0]">
                          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                          <span>{role}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- SUPERVISOR SPOTLIGHT SECTION --- */}
        <section className="py-14 bg-slate-50 border-b border-[#edebe9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-br from-emerald-900 via-teal-950 to-slate-900 text-white p-6 sm:p-10 rounded-3xl shadow-xl border border-emerald-500/20 relative overflow-hidden">
              <div className="flex flex-col md:flex-row items-center md:items-start gap-6 relative z-10">
                <div className="relative w-28 sm:w-36 aspect-[706/1024] rounded-2xl overflow-hidden border-2 border-emerald-400/40 shadow-xl shrink-0 bg-slate-800">
                  <Image 
                    src="/abubakar-latest.jpeg" 
                    alt="محترم ابوبکر صدیق" 
                    fill 
                    unoptimized
                    priority
                    className="object-cover" 
                  />
                </div>
                <div className="flex-1 text-center md:text-right">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-emerald-500/20 text-emerald-300 rounded-full text-xs font-bold mb-3 border border-emerald-400/30 leading-[2.0]">
                    <span>★ نگران و ہیڈ آف انٹرن شپ پروگرام</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-[2.1]">
                    محترم ابوبکر صدیق (Abubakar Siddique)
                  </h3>
                  <p className="text-emerald-100/90 text-sm sm:text-base leading-[2.3] mb-5 max-w-3xl">
                    جامعہ شیرِ ربانی کا یہ انٹرن شپ پروگرام محترم <strong>ابوبکر صدیق</strong> (انٹرن شپ سپروائزر) کے زیرِ نگرانی اور سرپرستی میں منعقد کیا جا رہا ہے۔ تمام منتخب امیدواروں کو براہِ راست ان کی زیرِ نگرانی لائیو پراجیکٹس، مینٹورنگ، ٹیکنیکل سیشنز اور پرفارمنس ایویلیوایشن کی سہولت فراہم کی جائے گی۔
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
        </section>

        {/* --- FORM SECTION --- */}
        <section className="py-20 bg-[#faf9f8]" id="apply">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Contact/Support Info */}
              <div className="lg:col-span-4">
                <div className="sticky top-24 space-y-6">
                  <div>
                    <h2 className="text-2xl md:text-3xl font-bold text-[#323130] mb-4 leading-[2.1]">رہنمائی یا معاونت درکار ہے؟</h2>
                    <p className="text-[#605e5c] text-sm leading-[2.3]">
                      انٹرن شپ فارم کے اندراج، سلیکشن یا پروگرام کی تفصیلات کے حوالے سے سپروائزر سے براہِ راست رابطہ فرمائیں۔
                    </p>
                  </div>

                  <div className="space-y-4">
                    {/* Supervisor Card in Sidebar */}
                    <div className="p-5 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl shadow-xs">
                      <div className="flex items-center gap-2 text-emerald-900 font-bold text-sm mb-2 leading-[2.0]">
                        <UserCheck size={18} className="text-emerald-700" />
                        <span>انٹرن شپ سپروائزر: ابوبکر صدیق</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-[2.0] mb-3">
                        براہِ راست رہنمائی یا استفسار کے لیے سپروائزر سے رابطہ کریں:
                      </p>
                      <div className="space-y-2">
                        <a 
                          href="https://wa.me/923097354874" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="flex items-center gap-3 p-3 bg-white border border-emerald-200 hover:border-emerald-400 text-slate-800 hover:text-emerald-800 transition-colors rounded-xl shadow-2xs group"
                        >
                          <div className="text-emerald-600 shrink-0">
                            <MessageCircle size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-xs leading-[2.0]">واٹس ایپ و رابطہ (WhatsApp)</h4>
                            <p className="text-xs text-emerald-700 font-mono font-bold" dir="ltr">0309-7354874</p>
                          </div>
                        </a>

                        <a 
                          href="mailto:abubakr.bgnu@gmail.com" 
                          className="flex items-center gap-3 p-3 bg-white border border-emerald-200 hover:border-emerald-400 text-slate-800 hover:text-emerald-800 transition-colors rounded-xl shadow-2xs group"
                        >
                          <div className="text-blue-600 shrink-0">
                            <Mail size={20} />
                          </div>
                          <div>
                            <h4 className="font-bold text-xs leading-[2.0]">آفیشل ای میل (Email)</h4>
                            <p className="text-xs text-blue-700 font-mono font-bold truncate" dir="ltr">abubakr.bgnu@gmail.com</p>
                          </div>
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-4 p-4 bg-white border border-[#edebe9] rounded-xl shadow-sm">
                      <div className="text-amber-600 shrink-0">
                         <MapPin size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#323130] text-sm leading-[2.0]">کیمپس کی لوکیشن</h4>
                        <p className="text-xs text-[#605e5c] leading-[2.0]">جامعہ شیرِ ربانی، مانانوالہ، ضلع شیخوپورہ</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 bg-gradient-to-br from-emerald-800 to-teal-900 text-white rounded-2xl shadow-md">
                    <div className="flex items-start gap-4">
                      <Award className="w-6 h-6 shrink-0 text-emerald-300 mt-1" />
                      <div>
                        <h4 className="font-bold mb-1 leading-[2.0]">۱۰۰ فیصد مفت پروگرام</h4>
                        <p className="text-xs text-emerald-100 leading-[2.2]">اس پروگرام کی کوئی فیس نہیں ہے۔ یہ اقدام نوجوانوں کے علمی و عملی فروغ کے لیے مکمل طور پر فری ہے۔</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Application Form */}
              <div className="lg:col-span-8">
                <div className="bg-white border border-[#edebe9] p-8 md:p-10 shadow-xl rounded-2xl">
                  
                  <div className="mb-8 border-b border-[#edebe9] pb-6">
                    <h3 className="text-2xl md:text-3xl font-bold text-[#323130] mb-2 leading-[2.1]">آن لائن انٹرن شپ فارم</h3>
                    <p className="text-[#605e5c] text-sm leading-[2.0]">براہ کرم تمام مطلوبہ معلومات درست اور اپنی اصل اسناد کے مطابق درج فرمائیں۔</p>
                  </div>

                  {submitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      className="bg-emerald-50 border border-emerald-400 p-8 text-center rounded-2xl"
                    >
                      <div className="w-16 h-16 bg-emerald-600 text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-md">
                        <CheckCircle2 size={32} />
                      </div>
                      <h4 className="text-2xl font-bold text-slate-900 mb-3 leading-[2.0]">درخواست کامیابی کے ساتھ جمع ہو گئی ہے!</h4>
                      <p className="text-slate-600 max-w-md mx-auto mb-6 text-sm leading-[2.2]">
                        آپ کی انٹرن شپ درخواست موصول ہو چکی ہے۔ شعبہ انتظامیہ کوائف کا جائزہ لے کر جلد آپ سے رابطہ کرے گا۔
                      </p>
                      <button onClick={() => setSubmitted(false)} className="px-6 py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm transition-colors rounded-md shadow-sm leading-[2.0]">
                        ایک اور درخواست جمع کروائیں
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      
                      {/* Personal Details */}
                      <div>
                        <h4 className="text-lg font-bold text-[#323130] mb-4 flex items-center gap-2 border-b border-slate-100 pb-2 leading-[2.0]">
                           <User size={18} className="text-emerald-700" />
                           بنیادی معلومات
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-bold text-[#323130] mb-2 leading-[2.0]">طالب علم کا مکمل نام *</label>
                            <input type="text" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:border-emerald-700 outline-none text-[#323130] rounded-md transition-colors leading-[2.0]" placeholder="طالب علم کا نام درج کریں" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-[#323130] mb-2 leading-[2.0]">والد کا نام *</label>
                            <input type="text" required value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:border-emerald-700 outline-none text-[#323130] rounded-md transition-colors leading-[2.0]" placeholder="والد کا نام درج کریں" />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                          <div>
                            <label className="block text-sm font-bold text-[#323130] mb-2 leading-[2.0]">واٹس ایپ / رابطہ نمبر *</label>
                            <div className="relative">
                              <input type="tel" dir="ltr" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:border-emerald-700 outline-none text-[#323130] rounded-md transition-colors text-right" placeholder="03001234567" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-[#323130] mb-2 leading-[2.0]">ای میل ایڈریس *</label>
                            <div className="relative">
                              <input type="email" dir="ltr" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:border-emerald-700 outline-none text-[#323130] rounded-md transition-colors text-right" placeholder="example@email.com" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr className="border-[#edebe9]"/>

                      {/* Academic Details */}
                      <div>
                        <h4 className="text-lg font-bold text-[#323130] mb-4 flex items-center gap-2 border-b border-slate-100 pb-2 leading-[2.0]">
                           <GraduationCap size={18} className="text-emerald-700" />
                           تعلیمی تفصیلات
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-bold text-[#323130] mb-2 leading-[2.0]">موجودہ تعلیمی ادارہ (یونیورسٹی یا جامعہ) *</label>
                            <input type="text" required value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:border-emerald-700 outline-none text-[#323130] rounded-md transition-colors leading-[2.0]" placeholder="ادارے کا نام درج کریں" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-[#323130] mb-2 leading-[2.0]">موجودہ تعلیمی درجہ / ڈگری *</label>
                            <select required value={formData.education} onChange={e => setFormData({...formData, education: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:border-emerald-700 outline-none text-[#323130] rounded-md transition-colors leading-[2.0]">
                              <option value="" disabled>-- تعلیمی درجہ منتخب کریں --</option>
                              <option value="Matric/O-Level">میٹرک / او لیول</option>
                              <option value="Intermediate/A-Level">انٹرمیڈیٹ (ایف اے / ایف ایس سی / آئی سی ایس)</option>
                              <option value="Bachelors">گریجویشن (بی ایس / بی اے)</option>
                              <option value="Masters">ماسٹرز (ایم ایس / ایم اے)</option>
                              <option value="Madrasa - Sania">درسِ نظامی (ثانویہ عامہ و خاصہ)</option>
                              <option value="Madrasa - Rabia">درسِ نظامی (عالیہ)</option>
                              <option value="Madrasa - Aalmiya">درسِ نظامی (عالمیہ)</option>
                              <option value="Other">دیگر</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <hr className="border-[#edebe9]"/>

                      {/* Internship Preferences */}
                      <div>
                        <h4 className="text-lg font-bold text-[#323130] mb-4 flex items-center gap-2 border-b border-slate-100 pb-2 leading-[2.0]">
                           <Briefcase size={18} className="text-emerald-700" />
                           انٹرن شپ شعبہ کا انتخاب
                        </h4>
                        <div>
                          <label className="block text-sm font-bold text-[#323130] mb-2 leading-[2.0]">مطلوبہ شعبہ (Field of Interest) *</label>
                          <select required value={formData.fieldOfInterest} onChange={e => setFormData({...formData, fieldOfInterest: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-300 focus:border-emerald-700 outline-none text-[#323130] rounded-md transition-colors leading-[2.0]">
                            <option value="" disabled>-- مطلوبہ شعبہ منتخب کریں --</option>
                            <optgroup label="انفارمیشن ٹیکنالوجی (IT)">
                              <option value="IT - Web Development">ویب ڈویلپمنٹ (Web Development)</option>
                              <option value="IT - Graphic Design">گرافک ڈیزائننگ (Graphic Designing)</option>
                              <option value="IT - Social Media Management">سوشل میڈیا مینجمنٹ</option>
                              <option value="IT - IT Support">آئی ٹی و نیٹ ورک سپورٹ</option>
                            </optgroup>
                            <optgroup label="علمی و تحقیقی شعبہ (Academic & Research)">
                              <option value="Academic - Content Writing">مضامین نگاری و کانٹینٹ رائٹنگ</option>
                              <option value="Academic - Islamic Research">اسلامک ریسرچ و تحقیق</option>
                              <option value="Academic - Translation Services">عربی، اردو، انگلش ترجمہ نگاری</option>
                            </optgroup>
                            <optgroup label="انتظامیہ و ایڈمنسٹریشن (Management)">
                              <option value="Admin - Event Management">ایونٹ و سیمینار مینجمنٹ</option>
                              <option value="Admin - Student Affairs">امورِ طلبہ (Student Affairs)</option>
                              <option value="Admin - Data Entry">ڈیٹا اینٹری و ریکارڈ کیپنگ</option>
                            </optgroup>
                          </select>
                        </div>
                      </div>

                      <button type="submit" disabled={isSubmitting} className="w-full py-4 mt-4 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-lg rounded-md transition-colors disabled:opacity-50 shadow-md leading-[2.0] flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            <span>درخواست جمع ہو رہی ہے...</span>
                          </>
                        ) : 'انٹرن شپ درخواست جمع کروائیں'}
                      </button>

                    </form>
                  )}
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