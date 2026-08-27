'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
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
  Laptop
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 1500);
  };

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Header />
        <main className="flex-1" />
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 font-sans text-slate-900 bg-white">
        
        {/* --- HERO SECTION --- */}
        <section className="relative pt-24 pb-20 bg-white border-b border-slate-100 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.9), rgba(255,255,255,0.9)), url('/ahmad.png')" }}>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block bg-blue-50 border border-blue-200 text-blue-600 rounded-full text-xs font-bold px-4 py-1.5 mb-6 uppercase tracking-wide shadow-sm">
                  {t("Exclusive for University & Madrasa Students")}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 leading-tight">
                  {t("Professional Internship")} <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 drop-shadow-sm">{t("Program")}</span>
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
                  {t("Gain hands-on practical experience in IT and other related fields. Build your career with real-world projects and professional mentorship.")}
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- BENEFITS SECTION --- */}
        <section className="py-16 bg-slate-50 border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-12">
              <h2 className="text-3xl font-semibold text-slate-900 mb-4">{t("Why Intern With Us?")}</h2>
              <p className="text-slate-600 text-lg">{t("We provide a comprehensive learning environment that rewards your dedication and hard work.")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { title: t("Internship Letter"), desc: t("Receive an official internship joining letter at the start of your program."), icon: <FileText className="w-8 h-8" /> },
                { title: t("Completion Certificate"), desc: t("Get a verified internship certificate upon successful completion."), icon: <Award className="w-8 h-8" /> },
                { title: t("Letter of Recommendation"), desc: t("Earn a letter of recommendation based on your exceptional performance."), icon: <CheckCircle2 className="w-8 h-8" /> }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 border border-slate-200 shadow-sm rounded-2xl text-center hover:border-blue-300 transition-colors">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-50 text-blue-600 mb-6">
                    {item.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FORM & INFO SECTION --- */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column: Info */}
              <div className="lg:col-span-4 space-y-8">
                <div className="sticky top-24">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-6">{t("Program Details")}</h2>
                  
                  <div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="text-blue-500 shrink-0 mt-1">
                        <GraduationCap size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">{t("Eligibility")}</h4>
                        <p className="text-sm text-slate-600">{t("This program is strictly designed for students currently enrolled in Universities or Madaris.")}</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="text-blue-500 shrink-0 mt-1">
                        <Laptop size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">{t("IT Domains")}</h4>
                        <p className="text-sm text-slate-600">{t("Web Development, Graphic Design, Social Media Management, and Basic IT Support.")}</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="text-blue-500 shrink-0 mt-1">
                        <Briefcase size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-slate-900 mb-1">{t("Other Domains")}</h4>
                        <p className="text-sm text-slate-600">{t("Administration, Content Writing, Research Assistance, and more.")}</p>
                      </div>
                    </div>
                  </div>

                  <div className="mt-12 bg-gradient-to-br from-blue-700 via-indigo-700 to-purple-800 p-8 text-white rounded-3xl shadow-xl relative overflow-hidden">
                    <h4 className="text-xl font-semibold mb-3">{t("Contact Us")}</h4>
                    <p className="text-blue-100 text-sm mb-6">{t("If you have any queries regarding the internship program, feel free to reach out.")}</p>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center gap-3 font-semibold text-sm">
                        <Phone size={16} className="text-blue-300" /> 0314-4081516
                      </div>
                      <div className="flex items-center gap-3 font-semibold text-sm">
                        <Mail size={16} className="text-blue-300" /> shererabbani@gmail.com
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: The Form */}
              <div className="lg:col-span-8">
                <div className="bg-white border border-slate-200 shadow-xl shadow-blue-500/5 rounded-3xl overflow-hidden p-8 md:p-12">
                  <div className="text-center mb-10">
                    <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">{t("Apply for Internship")}</h2>
                    <p className="text-slate-500 font-medium mt-2">{t("Fill out the form below to start your application")}</p>
                  </div>

                  {submitted ? (
                    <div className="text-center py-12">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 text-green-500 mb-6">
                        <CheckCircle2 size={40} />
                      </div>
                      <h3 className="text-2xl font-bold text-slate-800 mb-3">{t("Application Submitted!")}</h3>
                      <p className="text-slate-600 mb-8">{t("Thank you for applying. Our team will review your application and get back to you shortly.")}</p>
                      <button onClick={() => setSubmitted(false)} className="px-8 py-3 bg-slate-100 text-slate-700 font-bold rounded-lg hover:bg-slate-200 transition-colors">
                        {t("Submit Another Application")}
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{t("Full Name")} *</label>
                          <input type="text" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800 rounded-lg" placeholder={t("Ali Ahmad")} />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{t("Father's Name")} *</label>
                          <input type="text" required value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800 rounded-lg" placeholder={t("Muhammad Ahmad")} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{t("Phone / WhatsApp")} *</label>
                          <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800 rounded-lg" placeholder={t("03001234567")} />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{t("Email Address")} *</label>
                          <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800 rounded-lg" placeholder={t("student@example.com")} />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{t("Current Institution")} *</label>
                          <input type="text" required value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800 rounded-lg" placeholder={t("University or Madrasa Name")} />
                        </div>
                        <div>
                          <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{t("Current Education Level")} *</label>
                          <input type="text" required value={formData.education} onChange={e => setFormData({...formData, education: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800 rounded-lg" placeholder={t("e.g. BS Computer Science, Almiya")} />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{t("Field of Interest")} *</label>
                        <select required value={formData.fieldOfInterest} onChange={e => setFormData({...formData, fieldOfInterest: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800 rounded-lg">
                          <option value="">{t("-- Select Field --")}</option>
                          <option value="IT - Web Development">{t("IT - Web Development")}</option>
                          <option value="IT - Graphic Design">{t("IT - Graphic Design")}</option>
                          <option value="IT - Social Media Management">{t("IT - Social Media Management")}</option>
                          <option value="IT - Other">{t("IT - Other")}</option>
                          <option value="Administration">{t("Administration")}</option>
                          <option value="Research & Writing">{t("Research & Writing")}</option>
                          <option value="Teaching Assistance">{t("Teaching Assistance")}</option>
                          <option value="Other">{t("Other")}</option>
                        </select>
                      </div>

                      <button type="submit" disabled={isSubmitting} className="w-full py-5 mt-4 bg-blue-600 text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-600/20 hover:bg-blue-700 hover:shadow-xl transition-all rounded-lg disabled:opacity-50">
                        {isSubmitting ? t('Submitting...') : t('Submit Application')}
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
