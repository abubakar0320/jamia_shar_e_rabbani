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
  CheckCircle2,
  Phone,
  Mail,
  Award
} from 'lucide-react';
import React, { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import AdmissionChallan from '@/components/AdmissionChallan';
import AdmissionForm, { Admission } from '@/components/AdmissionForm';

export default function Admissions() {
  const { t } = useTranslation();
  const [submittedData, setSubmittedData] = useState<Admission | null>(null);
  const [requirements, setRequirements] = useState<{id: number, title: string, text: string}[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch('http://localhost:5000/api/admission-requirements?t=' + Date.now()).then(res => res.json()).then(data => setRequirements(data)).catch(err => console.error(err));
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Header />
        <main className="flex-1" />
        <Footer />
      </div>
    );
  }

  if (submittedData) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <AdmissionChallan data={submittedData} onBack={() => setSubmittedData(null)} />
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 font-sans text-slate-900 bg-white">
        
        {/* --- HERO SECTION --- */}
        <section className="relative pt-24 pb-20 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block bg-rose-50 border border-rose-200 text-rose-600 rounded-full text-xs font-bold px-4 py-1.5 mb-6 uppercase tracking-wide shadow-sm">
                  {t("Admissions Open for Session 2026-27")}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 leading-tight">
                  {t("Start Your Journey")} <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 drop-shadow-sm">{t("in Sacred Knowledge")}</span>
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
                  {t("Join a legacy of excellence. Secure your future in Islamic scholarship through our modernized, efficient, and student-focused admission process.")}
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                   <div className="flex items-center gap-2 text-indigo-700 text-sm font-bold bg-indigo-50 border border-indigo-100 rounded-full shadow-sm px-6 py-3">
                      <Clock size={18} className="text-indigo-500" /> {t("Fast-Track Processing")}
                   </div>
                   <div className="flex items-center gap-2 text-indigo-700 text-sm font-bold bg-indigo-50 border border-indigo-100 rounded-full shadow-sm px-6 py-3">
                      <FileText size={18} className="text-indigo-500" /> {t("Digital Document Review")}
                   </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- ADMISSION PROCESS GUIDE --- */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-semibold text-slate-900 mb-4">{t("Simple 4-Step Application Process")}</h2>
              <p className="text-slate-600 text-lg">{t("We have streamlined our application procedure to ensure that prospective students can apply from anywhere with ease.")}</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-8">
              {[
                { step: "01", title: t("Form Submission"), desc: t("Fill out the online application form with your personal and academic details."), icon: <FileText className="w-4 h-4 md:w-6 md:h-6" /> },
                { step: "02", title: t("Document Upload"), desc: t("Upload clear scans of your ID cards, photographs, and previous result cards."), icon: <FileText className="w-4 h-4 md:w-6 md:h-6" /> },
                { step: "03", title: t("Review & Interview"), desc: t("Our academic committee will review your files and schedule an entrance interview."), icon: <Building2 className="w-4 h-4 md:w-6 md:h-6" /> },
                { step: "04", title: t("Confirmation"), desc: t("Once selected, pay your admission fee to secure your seat and receive your student ID."), icon: <Award className="w-4 h-4 md:w-6 md:h-6" /> }
              ].map((item, idx) => (
                <div key={idx} className={`bg-white p-4 md:p-8 border shadow-sm transition-all duration-300 transform hover:-translate-y-1 md:hover:-translate-y-2 relative group rounded-xl md:rounded-2xl ${idx===0?"border-rose-100 hover:border-rose-400 hover:shadow-[0_10px_30px_rgba(244,63,94,0.15)]":idx===1?"border-amber-100 hover:border-amber-400 hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)]":idx===2?"border-emerald-100 hover:border-emerald-400 hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)]":"border-blue-100 hover:border-blue-400 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)]"}`}>
                  <div className={`mb-3 md:mb-6 w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl flex items-center justify-center shadow-sm border ${idx===0?"bg-rose-50 text-rose-600 border-rose-100":idx===1?"bg-amber-50 text-amber-600 border-amber-100":idx===2?"bg-emerald-50 text-emerald-600 border-emerald-100":"bg-blue-50 text-blue-600 border-blue-100"}`}>
                    {item.icon}
                  </div>
                  <div className="absolute top-3 end-3 md:top-6 md:end-6 text-xl md:text-3xl font-bold text-slate-100 opacity-50 transition-colors">{item.step}</div>
                  <h3 className="text-xs md:text-lg font-semibold text-slate-900 mb-1 md:mb-2 leading-tight">{item.title}</h3>
                  <p className="hidden md:block text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FORM SECTION --- */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column: Requirements Info */}
              <div className="lg:col-span-4 space-y-8">
                <div className="sticky top-24">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-6">{t("Admission Requirements")}</h2>
                  
                  <div className="space-y-6">
                    {requirements.length > 0 ? requirements.map((req, i) => (
                      <div key={req.id || i} className="flex gap-4">
                        <div className="text-rose-500 shrink-0 mt-1">
                          <CheckCircle2 size={20} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-1">{t(req.title)}</h4>
                          <p className="text-sm text-slate-600">{t(req.text)}</p>
                        </div>
                      </div>
                    )) : (
                      <div className="text-sm text-slate-500">{t("Loading requirements...")}</div>
                    )}
                  </div>

                  {/* Help Box */}
                  <div className="mt-12 bg-gradient-to-br from-indigo-700 via-purple-700 to-fuchsia-800 p-8 text-white rounded-3xl shadow-xl relative overflow-hidden">
                    <h4 className="text-xl font-semibold mb-3">{t("Need Assistance?")}</h4>
                    <p className="text-fuchsia-100 text-sm mb-6">{t("If you face any issues while filling the form, contact our Academic Support office.")}</p>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 font-semibold text-sm">
                        <Phone size={16} className="text-fuchsia-300" /> 0314-4081516
                      </div>
                      <div className="flex items-center gap-3 font-semibold text-sm">
                        <Mail size={16} className="text-fuchsia-300" /> shererabbani@gmail.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: The Form */}
              <div className="lg:col-span-8">
                <Suspense fallback={
                  <div className="p-20 flex flex-col items-center justify-center gap-4 bg-white border border-slate-100">
                    <div className="w-8 h-8 border-4 border-slate-100 border-t-purple-600 rounded-full animate-spin" />
                    <span className="text-slate-500 font-semibold text-sm uppercase">{t("Loading Application Form...")}</span>
                  </div>
                }>
                  <div className="bg-white border border-slate-100 shadow-xl shadow-purple-500/5 rounded-3xl overflow-hidden">
                    <AdmissionForm onSuccess={(data) => setSubmittedData(data)} />
                  </div>
                </Suspense>
              </div>
            </div>
          </div>
        </section>

        {/* --- FAQ / FOOTER INFO SECTION --- */}
        <section className="py-16 bg-white border-b border-slate-100">
           <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-8">
            {[{
              title: t("Entrance Test"),
              desc: t("A baseline test for Arabic and Quran proficiency to determine the appropriate starting class level.")
            }, {
              title: t("Boarding Facilities"),
              desc: t("Dedicated and secure boarding facilities are available for out-of-city students with strict discipline.")
            }, {
              title: t("Financial Aid"),
              desc: t("Scholarships and Zakat-funded support are available for deserving students who cannot afford the fees.")
            }].map((box, i) => (
              <div key={i} className={`bg-white p-4 md:p-8 border shadow-sm rounded-xl md:rounded-2xl transition-all transform hover:-translate-y-1 ${i===0?"border-rose-100 hover:border-rose-300":i===1?"border-amber-100 hover:border-amber-300":"border-emerald-100 hover:border-emerald-300"} col-span-1 ${i===2 ? 'col-span-2 md:col-span-1' : ''}`}>
                <h4 className="font-semibold text-slate-900 text-xs md:text-lg mb-2 md:mb-3 flex items-center gap-1.5 md:gap-2 leading-tight">
                  <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full shrink-0 shadow-sm ${i===0?"bg-rose-500":i===1?"bg-amber-500":"bg-emerald-500"}`} />
                  {box.title}
                </h4>
                <p className="text-[10px] md:text-sm text-slate-600 leading-relaxed">{box.desc}</p>
              </div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
