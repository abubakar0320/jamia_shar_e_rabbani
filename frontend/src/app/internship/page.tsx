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
        
        {/* --- PREMIUM LIGHT HERO SECTION --- */}
        <section className="relative pt-24 pb-32 overflow-hidden bg-amber-50/50">
          {/* Animated Background Gradients (Light) */}
          <div className="absolute inset-0 bg-[url('/ahmad.png')] bg-cover bg-center opacity-[0.03] mix-blend-multiply"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-amber-50/80 via-rose-50/80 to-white/90"></div>
          <div className="absolute -top-[30%] -right-[10%] w-[70%] h-[70%] rounded-full bg-amber-300/20 blur-[120px] pointer-events-none"></div>
          <div className="absolute -bottom-[30%] -left-[10%] w-[60%] h-[60%] rounded-full bg-rose-300/20 blur-[120px] pointer-events-none"></div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              
              {/* Left Content */}
              <motion.div 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-rose-100 shadow-sm mb-8">
                  <span className="flex h-2 w-2 rounded-full bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.5)] animate-pulse"></span>
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-widest">{t("Applications Now Open")}</span>
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-6 leading-[1.1] tracking-tight">
                  {t("Accelerate Your")} <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 drop-shadow-sm">
                    {t("Career Growth")}
                  </span>
                </h1>
                
                <p className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl font-medium">
                  {t("Join our prestigious internship program designed exclusively for University and Madrasa students. Gain hands-on experience, build real-world projects, and secure your professional future.")}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a href="#apply" className="px-8 py-4 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-black rounded-xl transition-all shadow-[0_10px_40px_-10px_rgba(244,63,94,0.5)] hover:shadow-[0_15px_50px_-10px_rgba(244,63,94,0.6)] transform hover:-translate-y-1">
                    {t("Apply Now")}
                  </a>
                  <a href="#details" className="px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-xl transition-all shadow-sm">
                    {t("Program Details")}
                  </a>
                </div>
              </motion.div>

              {/* Right Visual/Stats */}
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
                className="relative"
              >
                {/* Floating Elements Layout */}
                <div className="relative w-full aspect-square max-w-md mx-auto">
                  {/* Central Main Card */}
                  <div className="absolute inset-0 bg-white/60 border border-white/80 backdrop-blur-xl rounded-3xl p-8 flex flex-col justify-center shadow-[0_20px_50px_-12px_rgba(0,0,0,0.05)] transform rotate-3">
                    <div className="w-16 h-16 bg-gradient-to-br from-rose-100 to-orange-100 rounded-2xl flex items-center justify-center mb-6 border border-rose-200/50">
                      <GraduationCap className="text-rose-600 w-8 h-8" />
                    </div>
                    <h3 className="text-2xl font-bold text-slate-800 mb-2">{t("For Students")}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {t("Tailored specifically to bridge the gap between academic learning and professional industry demands.")}
                    </p>
                  </div>

                  {/* Floating Stat Card 1 */}
                  <div className="absolute -top-6 -right-6 bg-white border border-slate-100 rounded-2xl p-5 shadow-xl transform -rotate-3 hover:rotate-0 transition-transform cursor-default z-20">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center">
                        <Code className="text-blue-600 w-6 h-6" />
                      </div>
                      <div>
                        <div className="text-2xl font-black text-slate-900">IT & Tech</div>
                        <div className="text-xs font-bold text-slate-500 uppercase">{t("Practical Skills")}</div>
                      </div>
                    </div>
                  </div>

                  {/* Floating Stat Card 2 */}
                  <div className="absolute -bottom-8 -left-8 bg-white border border-slate-100 rounded-2xl p-6 shadow-xl transform rotate-6 hover:rotate-0 transition-transform cursor-default z-20">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-4">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className={`w-10 h-10 rounded-full border-2 border-white flex items-center justify-center text-xs font-bold text-white shadow-sm ${i===1?'bg-rose-500':i===2?'bg-amber-500':'bg-emerald-500'}`}>
                            {i===1?'W':i===2?'G':'S'}
                          </div>
                        ))}
                      </div>
                      <div>
                        <div className="text-xl font-black text-slate-800">{t("Multiple")}</div>
                        <div className="text-xs font-bold text-rose-500 uppercase">{t("Domains Available")}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
          
          {/* Bottom Wave Divider */}
          <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
            <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
              <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118,130.85,130.6,201.33,119.53,243.6,112.83,283.64,84.14,321.39,56.44Z" className="fill-slate-50"></path>
            </svg>
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
