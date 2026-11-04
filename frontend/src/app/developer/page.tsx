import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import {
  Database,
  Globe,
  Layout,
  Server,
  Shield,
  Smartphone,
  MapPin,
  GraduationCap,
  Award,
  Briefcase,
  Mail,
  ExternalLink,
  CheckCircle2,
  FileText,
  Sparkles,
  Building2,
  ShieldCheck,
  Code2,
  Phone,
  Layers,
  Terminal,
  Cpu
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ڈویلپر و سسٹم ایڈمنسٹریٹر | ابوبکر صدیق - جامعہ شیرِ ربانی",
  description: "ابوبکر صدیق - آئی ٹی اینڈ سسٹم ایڈمنسٹریٹر، جامعہ شیرِ ربانی مانانوالہ۔ فل اسٹیک ویب ڈویلپر (MERN Stack & Next.js)، بی ایس انفارمیشن ٹیکنالوجی (بابا گرو نانک یونیورسٹی)۔",
  keywords: [
    "ابوبکر صدیق",
    "Abu Bakar Siddique",
    "آئی ٹی اینڈ سسٹم ایڈمنسٹریٹر",
    "جامعہ شیر ربانی ڈویلپر",
    "فل اسٹیک ویب ڈویلپر",
    "Next.js Developer Pakistan",
    "MERN Stack Developer"
  ],
  openGraph: {
    title: "ابوبکر صدیق | آئی ٹی اینڈ سسٹم ایڈمنسٹریٹر - جامعہ شیرِ ربانی",
    description: "فل اسٹیک ویب ڈویلپر (MERN Stack & Next.js) اور جامعہ شیرِ ربانی کا مکمل ڈیجیٹل سسٹم ڈویلپر۔",
    url: "https://jamiashererabbani.com/developer",
    type: "profile"
  }
};

// Social Icons
const GithubIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
  </svg>
);

const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const getTagColor = (tag: string) => {
  const t = tag.toLowerCase();
  if (t.includes('react')) return 'text-sky-800 bg-sky-50 border-sky-300';
  if (t.includes('next.js')) return 'text-slate-900 bg-slate-100 border-slate-400';
  if (t.includes('node')) return 'text-emerald-800 bg-emerald-50 border-emerald-300';
  if (t.includes('mongo')) return 'text-green-800 bg-green-50 border-green-300';
  if (t.includes('tailwind')) return 'text-teal-800 bg-teal-50 border-teal-300';
  if (t.includes('express')) return 'text-slate-800 bg-slate-100 border-slate-300';
  if (t.includes('frontend')) return 'text-violet-800 bg-violet-50 border-violet-300';
  if (t.includes('seo')) return 'text-amber-800 bg-amber-50 border-amber-300';
  if (t.includes('responsive')) return 'text-indigo-800 bg-indigo-50 border-indigo-300';
  if (t.includes('typescript')) return 'text-blue-800 bg-blue-50 border-blue-300';
  return 'text-emerald-800 bg-emerald-50 border-emerald-200';
};

export default function DeveloperProfilePage() {
  return (
    <>
      <Header />

      <div className="min-h-screen bg-slate-50 font-urdu text-slate-800 selection:bg-emerald-800 selection:text-white pb-20 overflow-x-hidden" dir="rtl">

        {/* 1. TOP BREADCRUMB & BANNER */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white border-b-4 border-amber-400 py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-2">
              {/* Institution Breadcrumb */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/70 text-amber-300 text-xs font-bold shadow-xs">
                <Building2 size={14} className="text-amber-400" />
                <span>جامعہ شیرِ ربانی مانانوالہ • شعبہ انفارمیشن ٹیکنالوجی و کمپیوٹر سروسز</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.8] sm:leading-[1.9]">
                سسٹم ایڈمنسٹریٹر و چیف ویب ڈویلپر
              </h1>
              <p className="text-emerald-200 text-sm sm:text-base font-normal leading-[2.1] max-w-2xl">
                جامعہ شیرِ ربانی کا آفیشل ڈیجیٹل انفراسٹرکچر، آن لائن پورٹلز، مقالہ جات اور مرکزی ڈیٹا سسٹمز کی تکنیکی تیاری اور باقاعدہ انتظام۔
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-center">
              <Link
                href="/"
                className="px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all shadow-xs"
              >
                ہوم پیج پر جائیں
              </Link>
              <Link
                href="/articles"
                className="px-4 py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-black transition-all shadow-md"
              >
                علمی مضامین دیکھیں
              </Link>
            </div>
          </div>
        </div>

        {/* 2. MAIN CONTAINER */}
        <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">

          {/* 3. HERO & OFFICIAL PROFILE CARD */}
          <section className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-xl relative overflow-hidden">
            {/* Top decorative accent */}
            <div className="absolute top-0 right-0 left-0 h-2 bg-gradient-to-r from-emerald-600 via-amber-400 to-emerald-800" />

            <div className="flex flex-col lg:flex-row items-center lg:items-start gap-8 lg:gap-12 pt-2">
              
              {/* Profile Avatar & Quick Status */}
              <div className="flex flex-col items-center shrink-0 text-center">
                <div className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-3xl bg-gradient-to-br from-emerald-800 via-emerald-700 to-slate-900 text-white flex items-center justify-center text-4xl sm:text-5xl font-black shadow-2xl border-4 border-white ring-4 ring-emerald-100 overflow-hidden">
                  <span>ابوبکر</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-center text-[12px] font-bold text-amber-300 bg-slate-950/80 py-1 rounded-md backdrop-blur-xs font-urdu">
                    ابوبکر صدیق
                  </div>
                </div>

                {/* Available Badge */}
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold shadow-2xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>تکنیکی رہنمائی کے لیے دستیاب</span>
                </div>
              </div>

              {/* Identity & Institutional Titles */}
              <div className="flex-1 text-center lg:text-right space-y-4">
                
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                  <span className="px-3.5 py-1 rounded-full bg-emerald-800 text-white text-xs font-bold shadow-2xs">
                    آئی ٹی اینڈ سسٹم ایڈمنسٹریٹر
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold">
                    فل اسٹیک ویب ڈویلپر (MERN Stack & Next.js)
                  </span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 leading-[1.8] sm:leading-[1.9]">
                    ابوبکر صدیق (Abu Bakar Siddique)
                  </h2>
                  <p className="text-base sm:text-lg font-bold text-emerald-800 leading-relaxed">
                    آئی ٹی اینڈ سسٹم ایڈمنسٹریٹر، جامعہ شیرِ ربانی مانانوالہ
                  </p>
                </div>

                {/* Direct Contact Action Badges */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2 text-xs sm:text-sm">
                  {/* Phone / WhatsApp */}
                  <a 
                    href="https://wa.me/923097354874" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 font-bold border border-emerald-300 transition-colors shadow-2xs"
                  >
                    <WhatsAppIcon className="w-4 h-4 text-emerald-700" />
                    <span>واٹس ایپ: 0309-7354874</span>
                  </a>

                  {/* Primary Email */}
                  <a 
                    href="mailto:abubakr.bgnu@gmail.com" 
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold border border-slate-300 transition-colors shadow-2xs"
                  >
                    <Mail size={16} className="text-rose-600" />
                    <span dir="ltr">abubakr.bgnu@gmail.com</span>
                  </a>

                  {/* Location */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 text-slate-600 font-medium border border-slate-200">
                    <MapPin size={16} className="text-emerald-700" />
                    <span>شیخوپورہ / ننکانہ صاحب، پنجاب، پاکستان</span>
                  </div>
                </div>

                {/* Social & Professional Links */}
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-3">
                  <a
                    href="https://iamabubakar.site"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
                  >
                    <Globe size={15} />
                    <span dir="ltr">iamabubakar.site</span>
                    <ExternalLink size={13} className="text-emerald-200" />
                  </a>

                  <a
                    href="https://github.com/abubakar0320"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span dir="ltr">GitHub / abubakar0320</span>
                  </a>

                  <a
                    href="https://linkedin.com/in/abubakar0320"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0077B5] hover:bg-[#005E93] text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    <span>لنکڈ اِن پروفائل</span>
                  </a>
                </div>

                {/* Bio Description */}
                <div className="pt-4 border-t border-slate-100 text-slate-700 text-sm sm:text-base leading-[2.3] space-y-2">
                  <p>
                    میرا نام <strong className="text-slate-900 font-bold">ابوبکر صدیق</strong> ہے۔ میں جامعہ شیرِ ربانی میں بطور <strong className="text-emerald-900 font-bold">آئی ٹی اینڈ سسٹم ایڈمنسٹریٹر</strong> خدمات سرانجام دے رہا ہوں اور بیک وقت جدید ویب ٹیکنالوجیز (MERN اسٹیک اور Next.js 16) کا ماہر فل اسٹیک ویب ڈویلپر ہوں۔
                  </p>
                  <p>
                    میرا بنیادی ہدف جدید ڈیجیٹل سسٹمز، محفوظ کلاؤڈ آرکیٹیکچر، خودکار ڈیٹابیس بیک اپس اور اعلیٰ معیار کی فرنٹ اینڈ و بیک اینڈ پروگرامنگ کے ذریعے دینی اور تعلیمی اداروں کو ٹیکنالوجی کے میدان میں خود کفیل بنانا ہے۔
                  </p>
                </div>

              </div>

            </div>
          </section>

          {/* 4. MAJOR MILESTONE: JAMIA SHER-E-RABBANI WEB ARCHITECTURE */}
          <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white border-2 border-emerald-700 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-emerald-800">
              <div className="space-y-1">
                <span className="text-amber-400 text-xs font-bold tracking-wider flex items-center gap-2">
                  <Sparkles size={16} /> مرکزی ادارتی کارنامہ و پراجیکٹ
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white leading-[1.9]">
                  جامعہ شیرِ ربانی کا مکمل آفیشل ویب پلیٹ فارم
                </h3>
              </div>
              <div className="px-4 py-2 rounded-xl bg-emerald-800/80 border border-emerald-600 text-xs font-bold text-amber-300">
                مکمل آرکیٹیکچر، سیکیورٹی اور سافٹ ویئر ڈویلپمنٹ
              </div>
            </div>

            <p className="text-emerald-100 text-sm sm:text-base leading-[2.2] mt-6 max-w-4xl">
              جامعہ شیرِ ربانی کے لیے ایک مکمل کلاؤڈ بیسڈ، جدید اور تیز رفتار ادارتی ویب پلیٹ فارم تیار کیا گیا ہے جو ہزاروں طلبہ، اساتذہ، محققین اور معاونین کو آن لائن تعلیمی سہولیات فراہم کرتا ہے۔ اس پلیٹ فارم کے نمایاں فیچرز درج ذیل ہیں:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
              {[
                {
                  title: "۲۰ تحقیقی علمی و فکری مقالات کا پورٹل",
                  category: "علمی و تحقیقی اشاعت",
                  desc: "۸ مختلف زمرہ جات پر مشتمل ۲۰ مفصل علمی مقالے، نوری نستعلیق رسم الخط، قرآنی آیات مع اعراب و ترجمہ، مستند کتب سے احادیث کی تخریج اور مصنف کی تصدیق۔",
                  icon: FileText
                },
                {
                  title: "آن لائن داخلہ اور خودکار بینک فیس چالان",
                  category: "تعلیمی داخلہ و فیس",
                  desc: "مکمل آن لائن داخلہ درخواست فارم، ۳ کاپیوں پر مشتمل خودکار بینک فیس چالان جنریشن، پرنٹ ایبل سلپ اور داخلہ اسٹیٹس کی براہ راست ٹریکنگ۔",
                  icon: Layout
                },
                {
                  title: "وفاق المدارس الرضویہ کے سالانہ نتائج",
                  category: "امتحانی نتائج سرچ انجن",
                  desc: "درسِ نظامی، حفظ القرآن اور تجوید کے تمام امتحانی درجات کے سالانہ نتائج کی آن لائن اور فوری تلاش کا تیز رفتار سرچ سسٹم۔",
                  icon: Award
                },
                {
                  title: "طلبہ، اسناد اور سسٹم ریکارڈز کی تصدیق",
                  category: "محفوظ تصدیقی نظام",
                  desc: "مرکزی ڈیجیٹل ڈیٹابیس کے ذریعے طلبہ کے کوائف، تعلیمی ریکارڈز اور اسناد کی تصدیق کے لیے جدید ایڈمن سسٹم۔",
                  icon: ShieldCheck
                },
                {
                  title: "انٹرن شپ مینجمنٹ و سپروائزری رابطہ",
                  category: "طلبہ ٹریننگ پروگرام",
                  desc: "کمپیوٹر سائنس کے طلبہ کے لیے باقاعدہ انٹرن شپ پورٹل، سپروائزر رابطہ، رہنمائی اور پروگرام کی تفصیلات۔",
                  icon: Briefcase
                },
                {
                  title: "خودکار روزانہ ڈیٹابیس بیک اپ و سیکیورٹی",
                  category: "کلاؤڈ سیکیورٹی و بیک اپ",
                  desc: "روزانہ کی بنیاد پر ڈیٹا کے خودکار کلاؤڈ بیک اپ روٹیشن، ریٹ لمٹنگ، ڈیٹا تحفظ اور سائبر سیکیورٹی مانیٹرنگ۔",
                  icon: Database
                }
              ].map((feat, idx) => (
                <div 
                  key={idx}
                  className="bg-emerald-900/60 border border-emerald-700/80 rounded-2xl p-5 hover:bg-emerald-900/90 transition-colors flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-9 h-9 rounded-xl bg-amber-400 text-slate-950 flex items-center justify-center font-bold">
                        <feat.icon size={18} />
                      </div>
                      <span className="text-[11px] font-bold text-amber-300">
                        {feat.category}
                      </span>
                    </div>
                    <h4 className="text-base sm:text-lg font-bold text-white mb-2 leading-[1.8]">
                      {feat.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-100 leading-[2.1] font-normal">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. TECHNICAL SKILLS & STACK (EXACT ENGLISH TAGS PRESERVED AS REQUESTED) */}
          <section className="space-y-6">
            <div className="border-b-2 border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">تکنیکی صلاحیتیں</span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-[1.9]">
                  تکنیکی مہارتیں اور ٹیکنالوجی اسٹیک (Technical Skills)
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-bold">فل اسٹیک ویب ڈویلپمنٹ • سرور مینجمنٹ • کلاؤڈ انفراسٹرکچر</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Frontend Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                  <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700">
                    <Layout size={22} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-base" dir="ltr">Frontend</h4>
                    <span className="text-xs text-slate-500 font-medium" dir="ltr">UI / UX / Web</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2" dir="ltr">
                  {[
                    "Next.js 16",
                    "React 19",
                    "TypeScript",
                    "JavaScript (ES6+)",
                    "Tailwind CSS",
                    "Noori Nastaleeq RTL",
                    "HTML5 & CSS3"
                  ].map(item => (
                    <span key={item} className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${getTagColor(item)}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
                    <Server size={22} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-base" dir="ltr">Backend & APIs</h4>
                    <span className="text-xs text-slate-500 font-medium" dir="ltr">Microservices & APIs</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2" dir="ltr">
                  {[
                    "Node.js",
                    "Express.js",
                    "RESTful APIs",
                    "JWT Auth",
                    "MVC Architecture",
                    "PHP",
                    "API Security"
                  ].map(item => (
                    <span key={item} className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${getTagColor(item)}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Database Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                  <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700">
                    <Database size={22} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-base" dir="ltr">Databases</h4>
                    <span className="text-xs text-slate-500 font-medium" dir="ltr">Storage & Schemas</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2" dir="ltr">
                  {[
                    "MongoDB",
                    "Mongoose ORM",
                    "MySQL",
                    "PostgreSQL",
                    "Database Design",
                    "Indexing & Backups"
                  ].map(item => (
                    <span key={item} className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${getTagColor(item)}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* DevOps & Tools Card */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                  <div className="p-2.5 rounded-xl bg-rose-100 text-rose-700">
                    <Shield size={22} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-base" dir="ltr">DevOps & Admin</h4>
                    <span className="text-xs text-slate-500 font-medium" dir="ltr">Infrastructure</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2" dir="ltr">
                  {[
                    "Git & GitHub",
                    "Vercel",
                    "cPanel Hosting",
                    "System Admin",
                    "Cybersecurity",
                    "Networking",
                    "Postman"
                  ].map(item => (
                    <span key={item} className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${getTagColor(item)}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </section>

          {/* 6. PROFESSIONAL PROJECTS PORTFOLIO */}
          <section className="space-y-6">
            <div className="border-b-2 border-slate-200 pb-4">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">پراجیکٹس پورٹ فولیو</span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 leading-[1.9]">
                عملی اور لائیو پروڈکشن پراجیکٹس
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {[
                {
                  name: "جامعہ شیرِ ربانی آفیشل ویب پورٹل",
                  category: "ادارتی و تعلیمی ویب پلیٹ فارم",
                  desc: "جامعہ شیرِ ربانی کا مکمل ادارتی ویب سسٹم جس میں ۲۰ تحقیقی مقالات، آن لائن داخلہ فارم، فیس چالان جنریٹر، سالانہ نتائج سرچ اور خودکار کلاؤڈ بیک اپ روٹیشن شامل ہے۔",
                  tags: ["Next.js 16", "React 19", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
                  url: "https://jamiashererabbani.com",
                  badge: "لائیو پراجیکٹ"
                },
                {
                  name: "اسٹیٹ ہب (EstateHub)",
                  category: "پراپرٹی و رینٹل مینجمنٹ سسٹم",
                  desc: "جائیدادوں اور کرایہ داری کے معاملات کو سنبھالنے والا سمارٹ ویب سسٹم جس میں تفصیلی فلٹرز، کرایہ دار و مالک کے ورک فلوز اور محفوظ یوزر ڈیش بورڈز شامل ہیں۔",
                  tags: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
                  url: "https://estatehub.site",
                  badge: "لائیو پراجیکٹ"
                },
                {
                  name: "ذیابیطس فری پاکستان (DiabetFree Pakistan)",
                  category: "عوامی صحت و طبی آگاہی کا پلیٹ فارم",
                  desc: "ذیابیطس کے تدارک، غذائی پرہیز اور رہنمائی پر مبنی طبی پورٹل جس میں ڈاکٹروں کی ہدایات، احتیاطی تدابیر اور جدید ریسپانسو ڈیزائن شامل ہے۔",
                  tags: ["Next.js", "React", "Tailwind CSS", "SEO Architecture"],
                  url: "https://diabetfreepakistan.site",
                  badge: "لائیو پراجیکٹ"
                },
                {
                  name: "موبائل ہب پرو (MobileHub Pro)",
                  category: "ای کامرس و سمارٹ فون کیٹلاگ",
                  desc: "جدید اسمارٹ فونز کی خصوصیات، قیمتوں کے تقابل اور تکنیکی تجزیوں کے لیے تیار کیا گیا ای کامرس و ڈائنامک کیٹلاگ پورٹل۔",
                  tags: ["Next.js", "React", "Tailwind CSS", "MongoDB"],
                  url: "https://iamabubakar.site",
                  badge: "لائیو پراجیکٹ"
                }
              ].map((proj, idx) => (
                <div 
                  key={idx}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm hover:shadow-lg transition-all flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-start justify-between gap-4 mb-4">
                      <div>
                        <span className="text-xs font-bold text-emerald-800 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 inline-block mb-2">
                          {proj.category}
                        </span>
                        <h4 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-emerald-800 transition-colors leading-[1.8]">
                          {proj.name}
                        </h4>
                      </div>
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-800 text-slate-700 hover:text-white transition-colors shrink-0"
                        title="ویب سائٹ وزٹ کریں"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                    <p className="text-sm sm:text-base text-slate-600 leading-[2.2] mb-6 font-normal">
                      {proj.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2" dir="ltr">
                    {proj.tags.map(tag => (
                      <span key={tag} className={`text-xs font-bold px-2.5 py-1 rounded-lg border ${getTagColor(tag)}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 7. EDUCATION, INTERNSHIPS & CERTIFICATIONS */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Education & Academic Credentials */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-800">
                  <GraduationCap size={24} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.8]">
                    تعلیمی پس منظر اور یونیورسٹی ڈگری
                  </h3>
                  <span className="text-xs text-slate-500 font-bold">بی ایس انفارمیشن ٹیکنالوجی</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50/50 to-slate-50 rounded-2xl p-6 border border-indigo-200/80 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-lg font-black text-indigo-950">
                    بی ایس انفارمیشن ٹیکنالوجی (BSIT)
                  </h4>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-800 text-white">
                    چھٹا سمسٹر (6th Semester)
                  </span>
                </div>

                <p className="text-sm font-bold text-indigo-900">
                  بابا گرو نانک یونیورسٹی (BGNU)، ننکانہ صاحب
                </p>

                <p className="text-xs sm:text-sm text-slate-600 leading-[2.1] font-medium">
                  سافٹ ویئر انجینئرنگ، آبجیکٹ اورینٹڈ پروگرامنگ (OOP)، ڈیٹا بیس ڈیزائن، نیٹ ورک سیکیورٹی، ڈیٹا اسٹرکچرز اور ویب ایپلیکیشن آرکیٹیکچر کے جدید کورسز۔
                </p>
              </div>

              {/* Active Software Development Experience */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs sm:text-sm font-bold text-slate-600">
                  مختلف سافٹ ویئر اداروں میں عملی کام کا تجربہ و انٹرن شپس:
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-bold">
                  {[
                    "آئی ٹی جینسس (IT Genesis)",
                    "کوڈ الفا (CodeAlpha)",
                    "ڈیکوڈ لیبز (DecodeLabs)",
                    "نخلستان انفو بائٹ (Oasis)",
                    "کوگنیفائز (Cognifyz)",
                    "کوڈویدا (Codveda)"
                  ].map((org, i) => (
                    <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-slate-700 text-center hover:bg-emerald-50 hover:text-emerald-900 hover:border-emerald-300 transition-colors">
                      {org}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Verified Certifications */}
            <section className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-slate-100">
                <div className="p-2.5 rounded-xl bg-amber-100 text-amber-800">
                  <Award size={24} />
                </div>
                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-[1.8]">
                    بین الاقوامی تصدیق شدہ اسناد
                  </h3>
                  <span className="text-xs text-slate-500 font-bold">گوگل اور سسکو سرٹیفیکیشنز</span>
                </div>
              </div>

              <div className="space-y-4">
                {/* Google Certification */}
                <div className="bg-amber-50/50 rounded-2xl p-5 border border-amber-200/90">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-amber-500 text-white flex items-center justify-center font-bold text-xs">
                      G
                    </span>
                    <div>
                      <h4 className="text-base font-black text-amber-950">گوگل (Google)</h4>
                      <p className="text-xs text-amber-800 font-medium">پراجیکٹ مینجمنٹ پروفیشنل ٹریک</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-bold">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                      <span>فاؤنڈیشنز آف پراجیکٹ مینجمنٹ (Foundations of Project Management)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                      <span>پراجیکٹ انیشی ایشن اینڈ ایگزیکیوشن (Project Initiation)</span>
                    </li>
                  </ul>
                </div>

                {/* Cisco Networking Academy */}
                <div className="bg-sky-50/50 rounded-2xl p-5 border border-sky-200/90">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-lg bg-sky-600 text-white flex items-center justify-center font-bold text-xs">
                      C
                    </span>
                    <div>
                      <h4 className="text-base font-black text-sky-950">سسکو نیٹ ورکنگ اکیڈمی (Cisco)</h4>
                      <p className="text-xs text-sky-800 font-medium">سائبر سیکیورٹی و نیٹ ورک اسنشلز</p>
                    </div>
                  </div>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 font-bold">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                      <span>سائبر سیکیورٹی اسنشلز و او ایس فاؤنڈیشنز (Cybersecurity & OS Basics)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={15} className="text-emerald-600 shrink-0" />
                      <span>نیٹ ورک اسکیننگ و سیکیورٹی پروٹوکولز (Vulnerability Scanning)</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

          </div>

          {/* 8. DIRECT CONTACT & INVITATION SECTION */}
          <section className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border-2 border-amber-400 text-center space-y-6 shadow-xl">
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-emerald-950 text-amber-300 text-xs font-bold border border-emerald-600">
                براہِ راست تکنیکی رابطہ
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white leading-[1.8] sm:leading-[1.9]">
                ڈویلپر اور سسٹم ایڈمنسٹریٹر سے رابطہ کریں
              </h3>
              <p className="text-emerald-100 text-sm sm:text-base font-normal leading-[2.2]">
                جامعہ شیرِ ربانی کے ویب پلیٹ فارم، کسی تکنیکی استفسار یا سافٹ ویئر ڈویلپمنٹ کے حوالے سے کسی بھی وقت براہِ راست رابطہ کیا جا سکتا ہے۔
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="https://wa.me/923097354874"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold shadow-lg transition-all"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>واٹس ایپ پر رابطہ: 0309-7354874</span>
              </a>

              <a
                href="mailto:abubakr.bgnu@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-sm font-black shadow-lg transition-all"
              >
                <Mail size={18} className="text-rose-600" />
                <span dir="ltr">abubakr.bgnu@gmail.com</span>
              </a>

              <a
                href="https://iamabubakar.site"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-emerald-950/80 hover:bg-emerald-950 text-amber-300 border border-emerald-600 text-sm font-bold shadow-lg transition-all"
              >
                <Globe size={18} />
                <span>پورٹ فولیو وزٹ کریں</span>
              </a>
            </div>
          </section>

        </main>

      </div>

      <Footer />
    </>
  );
}
