import React from "react";
import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
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
  Phone,
  ExternalLink,
  CheckCircle2,
  FileText,
  Code2,
  Terminal,
  Cpu,
  Layers,
  Sparkles,
  Building2,
  ShieldCheck,
  Calendar,
  Check,
  UserCheck
} from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "ڈویلپر و سسٹم ایڈمنسٹریٹر | ابوبکر صدیق - جامعہ شیرِ ربانی",
  description: "ابوبکر صدیق - آئی ٹی اینڈ سسٹم ایڈمنسٹریٹر، جامعہ شیرِ ربانی مانانوالہ۔ فل اسٹیک ویب ڈویلپر (MERN Stack & Next.js)، بی ایس انفارمیشن ٹیکنالوجی (بابا گرو نانک یونیورسٹی)۔",
  keywords: [
    "ابوبکر صدیق",
    "Abu Bakar Siddique",
    "IT Administrator Jamia Sher-e-Rabbani",
    "آئی ٹی اینڈ سسٹم ایڈمنسٹریٹر",
    "جامعہ شیر ربانی ڈویلپر",
    "Full Stack Developer Pakistan",
    "Next.js Developer",
    "MERN Stack Developer Sheikhupura"
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
  if (t.includes('react')) return 'text-sky-700 bg-sky-50 border-sky-300';
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

      <div className="min-h-screen bg-slate-50 font-sans text-slate-800 selection:bg-emerald-800 selection:text-white pb-20 overflow-x-hidden" dir="ltr">

        {/* 1. TOP BREADCRUMB & BANNER */}
        <div className="bg-gradient-to-r from-emerald-950 via-emerald-900 to-slate-900 text-white border-b-4 border-amber-400 py-10 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              {/* Institution Breadcrumb / Tag */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-800/80 border border-emerald-600/70 text-amber-300 text-xs font-bold mb-3 font-urdu" dir="rtl">
                <Building2 size={14} className="text-amber-400" />
                <span>جامعہ شیرِ ربانی مانانوالہ • شعبہ انفارمیشن ٹیکنالوجی و کمپیوٹر سائنس</span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight">
                System Administrator & Lead Developer
              </h1>
              <p className="text-emerald-200 text-sm sm:text-base mt-2 font-medium max-w-2xl font-urdu" dir="rtl">
                جامعہ شیرِ ربانی کا آفیشل ڈیجیٹل انفراسٹرکچر، آن لائن پورٹلز اور سسٹمز کی تکنیکی تیاری اور انتظام۔
              </p>
            </div>

            <div className="flex items-center gap-3 self-start md:self-center">
              <Link
                href="/"
                className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-bold border border-white/20 transition-all font-urdu"
                dir="rtl"
              >
                ہوم پیج پر جائیں
              </Link>
              <Link
                href="/articles"
                className="px-4 py-2 rounded-xl bg-amber-400 hover:bg-amber-300 text-slate-950 text-xs sm:text-sm font-black transition-all shadow-md font-urdu"
                dir="rtl"
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
                  <span>AS</span>
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-transparent" />
                  <div className="absolute bottom-2 left-2 right-2 text-center text-[11px] font-bold text-amber-300 bg-slate-950/70 py-0.5 rounded-md backdrop-blur-xs font-urdu" dir="rtl">
                    ابوبکر صدیق
                  </div>
                </div>

                {/* Available Badge */}
                <div className="mt-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300 text-xs font-bold shadow-2xs">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
                  <span>Available for Engineering</span>
                </div>
              </div>

              {/* Identity & Institutional Titles */}
              <div className="flex-1 text-center lg:text-left space-y-4">
                
                <div className="flex flex-wrap items-center justify-center lg:justify-start gap-2.5">
                  <span className="px-3.5 py-1 rounded-full bg-emerald-800 text-white text-xs font-bold shadow-2xs font-urdu" dir="rtl">
                    آئی ٹی اینڈ سسٹم ایڈمنسٹریٹر
                  </span>
                  <span className="px-3.5 py-1 rounded-full bg-amber-100 text-amber-950 border border-amber-300 text-xs font-bold">
                    Full Stack Web Developer (MERN & Next.js)
                  </span>
                </div>

                <div className="space-y-1">
                  <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                    Abu Bakar Siddique
                  </h2>
                  <p className="text-xl sm:text-2xl font-black text-emerald-800 font-urdu leading-relaxed" dir="rtl">
                    ابوبکر صدیق
                  </p>
                  <p className="text-sm sm:text-base font-bold text-slate-600 font-urdu" dir="rtl">
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
                    <span>0309-7354874</span>
                  </a>

                  {/* Primary Email */}
                  <a 
                    href="mailto:abubakr.bgnu@gmail.com" 
                    className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold border border-slate-300 transition-colors shadow-2xs"
                  >
                    <Mail size={16} className="text-rose-600" />
                    <span>abubakr.bgnu@gmail.com</span>
                  </a>

                  {/* Location */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-50 text-slate-600 font-medium border border-slate-200">
                    <MapPin size={16} className="text-emerald-700" />
                    <span>Sheikhupura, Punjab, Pakistan</span>
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
                    <span>iamabubakar.site</span>
                    <ExternalLink size={13} className="text-emerald-200" />
                  </a>

                  <a
                    href="https://github.com/abubakar0320"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
                  >
                    <GithubIcon className="w-4 h-4" />
                    <span>GitHub / abubakar0320</span>
                  </a>

                  <a
                    href="https://linkedin.com/in/abubakar0320"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-[#0077B5] hover:bg-[#005E93] text-white font-bold text-xs sm:text-sm shadow-sm transition-all"
                  >
                    <LinkedinIcon className="w-4 h-4" />
                    <span>LinkedIn Profile</span>
                  </a>
                </div>

                {/* Bio Description */}
                <div className="pt-4 border-t border-slate-100 text-slate-700 text-sm sm:text-base leading-relaxed space-y-2">
                  <p>
                    I am <strong className="text-slate-900 font-bold">Abu Bakar Siddique</strong>, serving as the <strong className="text-emerald-900 font-bold">IT & System Administrator</strong> at Jamia Sher-e-Rabbani and working as a Full Stack Web Developer specializing in the modern <strong className="text-emerald-800 font-bold">MERN stack (MongoDB, Express, React, Node.js)</strong> and <strong className="text-slate-900 font-bold">Next.js 16</strong>.
                  </p>
                  <p className="font-urdu text-right text-slate-800 leading-loose pt-1" dir="rtl">
                    میں جامعہ شیرِ ربانی کے تمام کمپیوٹر نیٹ ورکس، سرور سسٹمز، اور ویب ایپلیکیشنز کی تعمیر و دیکھ بھال کی ذمہ داری سنبھال رہا ہوں۔ اس ویب پورٹل کے تمام جدید فیچرز (بشمول ۲۰ علمی مقالات، آن لائن داخلہ و چالان جنریٹر، وفاق نتائج اور ڈیٹابیس ریکارڈز) میری زیرِ نگرانی تیار کیے گئے ہیں۔
                  </p>
                </div>

              </div>

            </div>
          </section>

          {/* 4. MAJOR MILESTONE: JAMIA SHER-E-RABBANI WEB ARCHITECTURE */}
          <section className="bg-gradient-to-br from-emerald-950 via-emerald-900 to-slate-900 rounded-3xl p-6 sm:p-10 text-white border-2 border-emerald-700 shadow-xl relative overflow-hidden">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-emerald-800">
              <div className="space-y-1">
                <span className="text-amber-400 text-xs font-bold tracking-wider uppercase flex items-center gap-2">
                  <Sparkles size={16} /> Flagship Institutional Project
                </span>
                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  Jamia Sher-e-Rabbani Official Web Platform
                </h3>
              </div>
              <div className="px-4 py-2 rounded-xl bg-emerald-800/80 border border-emerald-600 text-xs font-bold text-amber-300 font-urdu" dir="rtl">
                مکمل آرکیٹیکچر و ڈیجیٹل سسٹم ڈویلپمنٹ
              </div>
            </div>

            <p className="text-emerald-100 text-sm sm:text-base leading-relaxed mt-6 max-w-4xl">
              Engineered an end-to-end institutional web ecosystem tailored to Islamic academia and student administration. Key components conceptualized, engineered, and maintained include:
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mt-8">
              {[
                {
                  title: "20 Scholarly Islamic Articles Portal",
                  urdu: "۲۰ تحقیقی علمی مقالات پورٹل",
                  desc: "Complete scholarly articles portal featuring 8 distinct categories, Noori Nastaleeq RTL rendering, verified Hadith references, Quranic verses with Arabic font, and author attribution.",
                  icon: FileText
                },
                {
                  title: "Online Admissions & Fee Challan",
                  urdu: "آن لائن داخلہ و چالان جنریٹر",
                  desc: "Digital admission application workflows with automated dynamic 3-copy bank fee challan generation, printable slips, and real-time application tracking.",
                  icon: Layout
                },
                {
                  title: "Wafaq-ul-Madaris Results Portal",
                  urdu: "نتائج وفاق المدارس الرضویہ",
                  desc: "Examination results search engine providing fast, reliable lookup for students across diverse Dars-e-Nizami and Tajweed educational programs.",
                  icon: Award
                },
                {
                  title: "Records & Verification Engine",
                  urdu: "طلبہ و اسناد تصدیقی نظام",
                  desc: "Centralized institutional verification portal with secure admin authorization to inspect student transcripts and academic credentials.",
                  icon: ShieldCheck
                },
                {
                  title: "Internship Management System",
                  urdu: "انٹرن شپ مینجمنٹ سسٹم",
                  desc: "Comprehensive developer internship portal with supervisory coordination, application pipelines, and program tracking under IT leadership.",
                  icon: Briefcase
                },
                {
                  title: "Automated Daily Backups & Security",
                  urdu: "خودکار روزانہ بیک اپ و سیکیورٹی",
                  desc: "Automated cron-based database backup rotation, rate limiting, secure authorization guards, and strict environment validation.",
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
                      <span className="text-[11px] font-bold text-amber-300 font-urdu" dir="rtl">
                        {feat.urdu}
                      </span>
                    </div>
                    <h4 className="text-base font-bold text-white mb-2">
                      {feat.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-emerald-200 leading-relaxed font-normal">
                      {feat.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5. TECHNICAL SKILLS & STACK */}
          <section className="space-y-6">
            <div className="border-b-2 border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Core Competencies</span>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                  Technical Expertise & Technology Stack
                </h3>
              </div>
              <p className="text-xs sm:text-sm text-slate-500 font-bold">Full Stack Architecture • DevOps • Security</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              
              {/* Frontend */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                  <div className="p-2.5 rounded-xl bg-sky-100 text-sky-700">
                    <Layout size={22} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-base">Frontend</h4>
                    <span className="text-xs text-slate-500 font-medium">UI / UX / Web</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Next.js 16", "React 19", "TypeScript", "JavaScript (ES6+)", "Tailwind CSS", "Noori Nastaleeq RTL", "HTML5 & CSS3"].map(item => (
                    <span key={item} className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${getTagColor(item)}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Backend */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                  <div className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700">
                    <Server size={22} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-base">Backend & APIs</h4>
                    <span className="text-xs text-slate-500 font-medium">Microservices & APIs</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Node.js", "Express.js", "RESTful APIs", "JWT Auth", "MVC Architecture", "PHP", "API Security"].map(item => (
                    <span key={item} className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${getTagColor(item)}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Database */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                  <div className="p-2.5 rounded-xl bg-indigo-100 text-indigo-700">
                    <Database size={22} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-base">Databases</h4>
                    <span className="text-xs text-slate-500 font-medium">Storage & Schemas</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["MongoDB", "Mongoose ORM", "MySQL", "PostgreSQL", "Database Design", "Indexing & Backups"].map(item => (
                    <span key={item} className={`px-2.5 py-1 text-xs font-bold rounded-lg border ${getTagColor(item)}`}>
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* DevOps & Tools */}
              <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-100">
                  <div className="p-2.5 rounded-xl bg-rose-100 text-rose-700">
                    <Shield size={22} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-base">DevOps & Admin</h4>
                    <span className="text-xs text-slate-500 font-medium">Infrastructure</span>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {["Git & GitHub", "Vercel", "cPanel Hosting", "System Admin", "Cybersecurity", "Networking", "Postman"].map(item => (
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
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-widest">Track Record</span>
              <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                Featured Production Web Projects
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
              {[
                {
                  name: "Jamia Sher-e-Rabbani Official Web Portal",
                  category: "Institutional & Academic Architecture",
                  desc: "Comprehensive enterprise web portal serving thousands of students, scholars, and patrons with 20 scholarly articles, online admissions, challan generation, examination results, and automated daily backup rotators.",
                  tags: ["Next.js 16", "React 19", "TypeScript", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
                  url: "https://jamiashererabbani.com",
                  badge: "Production Live"
                },
                {
                  name: "EstateHub",
                  category: "Real Estate & Rental Management",
                  desc: "Smart Property and Rental Management System with verified listings, complete tenant-landlord workflows, role-based dashboards, and intuitive search filters.",
                  tags: ["React.js", "Node.js", "Express.js", "MongoDB", "REST APIs"],
                  url: "https://estatehub.site",
                  badge: "Production Live"
                },
                {
                  name: "DiabetFree Pakistan",
                  category: "Healthcare & Patient Education",
                  desc: "A comprehensive health and wellness portal dedicated to diabetes prevention, clinical dietary management resources, doctor directory, and responsive public guidance.",
                  tags: ["Next.js", "React", "Tailwind CSS", "SEO Architecture"],
                  url: "https://diabetfreepakistan.site",
                  badge: "Production Live"
                },
                {
                  name: "MobileHub Pro",
                  category: "E-Commerce & Technology",
                  desc: "Intelligent online smartphone shopping and comparison system with multi-criteria filtering, technical specification grids, and responsive customer workflows.",
                  tags: ["Next.js", "React", "Tailwind CSS", "MongoDB"],
                  url: "https://iamabubakar.site",
                  badge: "Production Live"
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
                        <h4 className="text-xl sm:text-2xl font-black text-slate-900 group-hover:text-emerald-800 transition-colors">
                          {proj.name}
                        </h4>
                      </div>
                      <a
                        href={proj.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2.5 rounded-xl bg-slate-100 hover:bg-emerald-800 text-slate-700 hover:text-white transition-colors shrink-0"
                        title="Live Website"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                    <p className="text-sm sm:text-base text-slate-600 leading-relaxed mb-6 font-normal">
                      {proj.desc}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-slate-100 flex flex-wrap gap-2">
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
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Academic Education
                  </h3>
                  <span className="text-xs text-slate-500 font-bold">University Degree</span>
                </div>
              </div>

              <div className="bg-gradient-to-br from-indigo-50/50 to-slate-50 rounded-2xl p-6 border border-indigo-200/80 space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h4 className="text-lg font-black text-indigo-950">
                    Bachelor of Science in Information Technology (BSIT)
                  </h4>
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-indigo-800 text-white">
                    6th Semester
                  </span>
                </div>

                <p className="text-sm font-bold text-indigo-900">
                  Baba Guru Nanak University (BGNU), Nankana Sahib
                </p>

                <p className="text-xs text-slate-600 leading-relaxed font-medium">
                  Focused on core software engineering principles, object-oriented programming (OOP), relational & NoSQL databases, computer networks, distributed systems, and web technologies.
                </p>
              </div>

              {/* Active Software Development Experience */}
              <div className="space-y-3 pt-2">
                <h4 className="text-sm font-bold uppercase tracking-wider text-slate-500">
                  Participating Software Internships & Industry Exposure
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs font-bold">
                  {[
                    "IT Genesis Software House",
                    "CodeAlpha",
                    "DecodeLabs",
                    "Oasis Infobyte",
                    "Cognifyz Technologies",
                    "Codveda Technologies"
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
                  <h3 className="text-xl sm:text-2xl font-black text-slate-900">
                    Industry Certifications
                  </h3>
                  <span className="text-xs text-slate-500 font-bold">Verified Credentials</span>
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
                      <h4 className="text-base font-black text-amber-950">Google</h4>
                      <p className="text-xs text-amber-800 font-medium">Project Management Professional Track</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-bold">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                      <span>Foundations of Project Management</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                      <span>Project Initiation: Starting a Successful Project</span>
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
                      <h4 className="text-base font-black text-sky-950">Cisco Networking Academy</h4>
                      <p className="text-xs text-sky-800 font-medium">Cybersecurity & Networking Essentials</p>
                    </div>
                  </div>
                  <ul className="space-y-1.5 text-xs text-slate-700 font-bold">
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                      <span>Cybersecurity Essentials & OS Fundamentals</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle2 size={14} className="text-emerald-600 shrink-0" />
                      <span>Network Scanning & Security Protocols</span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

          </div>

          {/* 8. DIRECT CONTACT & INVITATION SECTION */}
          <section className="bg-gradient-to-r from-emerald-900 via-emerald-800 to-slate-900 rounded-3xl p-8 sm:p-12 text-white border-2 border-amber-400 text-center space-y-6 shadow-xl">
            <div className="max-w-2xl mx-auto space-y-3">
              <span className="px-3.5 py-1 rounded-full bg-emerald-950 text-amber-300 text-xs font-bold border border-emerald-600 font-urdu" dir="rtl">
                براہ راست رابطہ و تکنیکی رہنمائی
              </span>
              <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
                Get In Touch With The Developer
              </h3>
              <p className="text-emerald-100 text-sm sm:text-base font-normal leading-relaxed">
                For inquiries regarding Jamia Sher-e-Rabbani digital portals, technical web development projects, or software collaboration, feel free to reach out directly.
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <a
                href="https://wa.me/923097354874"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-bold shadow-lg transition-all"
              >
                <WhatsAppIcon className="w-5 h-5" />
                <span>WhatsApp: 0309-7354874</span>
              </a>

              <a
                href="mailto:abubakr.bgnu@gmail.com"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 text-sm font-black shadow-lg transition-all"
              >
                <Mail size={18} className="text-rose-600" />
                <span>abubakr.bgnu@gmail.com</span>
              </a>

              <a
                href="https://iamabubakar.site"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-950/80 hover:bg-emerald-950 text-amber-300 border border-emerald-600 text-sm font-bold shadow-lg transition-all"
              >
                <Globe size={18} />
                <span>iamabubakar.site</span>
              </a>
            </div>
          </section>

        </main>

      </div>

      <Footer />
    </>
  );
}
