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
        alert(t("Failed to submit application. Please try again."));
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      alert(t("An error occurred. Please check your connection and try again."));
    } finally {
      setIsSubmitting(false);
    }
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
                  <a href="/internship/program-details" className="px-8 py-4 bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 font-bold rounded-xl transition-all shadow-sm">
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
                    <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mb-6 border border-slate-100 shadow-sm overflow-hidden">
                      <img src="/logo.jpeg" alt="Jamia Logo" className="w-12 h-12 object-contain" />
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
        <section className="py-24 bg-white border-b border-slate-100 relative">
          <div className="absolute top-0 right-0 w-64 h-64 bg-amber-50 rounded-full blur-3xl opacity-50 pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <span className="text-rose-500 font-bold tracking-widest uppercase text-sm mb-2 block">{t("Exclusive Perks")}</span>
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{t("Why Intern With Us?")}</h2>
              <p className="text-slate-600 text-lg leading-relaxed">{t("We don't just offer an internship; we offer a launchpad for your career. Experience a comprehensive learning environment that rewards your hard work.")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { 
                  title: t("Internship Letter"), 
                  desc: t("Receive an official joining letter to validate your professional start."), 
                  icon: (
                    <svg viewBox="0 0 64 64" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
                      <path d="M10 16h44v32H10z" fill="#E2E8F0" />
                      <path d="M10 16l22 18 22-18" fill="#CBD5E1" />
                      <path d="M14 10h36v20H14z" fill="#FFFFFF" />
                      <path d="M20 16h24M20 22h24M20 28h16" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="32" cy="40" r="6" fill="#EF4444" />
                      <circle cx="32" cy="40" r="4" fill="#DC2626" />
                      <path d="M30 46l-4 8h12l-4-8" fill="#EF4444" />
                    </svg>
                  ), 
                  color: "rose" 
                },
                { 
                  title: t("Experience Certificate"), 
                  desc: t("Get a verified completion certificate to boost your resume."), 
                  icon: (
                    <svg viewBox="0 0 64 64" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
                      <rect x="8" y="12" width="48" height="40" rx="2" fill="#FEF3C7" />
                      <path d="M12 16h40v32H12z" fill="#FFFBEB" />
                      <path d="M16 22h32M16 28h24M16 34h28M16 40h16" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
                      <circle cx="44" cy="38" r="8" fill="#F59E0B" />
                      <circle cx="44" cy="38" r="6" fill="#FBBF24" />
                      <path d="M40 44l-4 10h16l-4-10" fill="#B45309" />
                    </svg>
                  ), 
                  color: "orange" 
                },
                { 
                  title: t("Recommendation"), 
                  desc: t("Earn a letter of recommendation based on exceptional performance."), 
                  icon: (
                    <svg viewBox="0 0 64 64" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
                      <path d="M14 10h36v44H14z" fill="#F8FAFC" />
                      <path d="M14 10h36v44H14z" fill="none" stroke="#CBD5E1" strokeWidth="2" />
                      <path d="M22 20h20M22 26h20M22 32h12" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
                      <polygon points="32,38 35,44 42,44 37,49 39,56 32,52 25,56 27,49 22,44 29,44" fill="#FBBF24" />
                    </svg>
                  ), 
                  color: "amber" 
                },
                { 
                  title: t("Real Projects"), 
                  desc: t("Work on live projects instead of just simulated tasks."), 
                  icon: (
                    <svg viewBox="0 0 64 64" width="44" height="44" xmlns="http://www.w3.org/2000/svg">
                      <path d="M32 10c0 0 14 6 14 24 0 6-6 10-14 14-8-4-14-8-14-14 0-18 14-24 14-24z" fill="#38BDF8" />
                      <path d="M32 10c0 0-14 6-14 24 0 6 6 10 14 14V10z" fill="#0EA5E9" />
                      <circle cx="32" cy="28" r="6" fill="#F0F9FF" />
                      <path d="M22 34l-8 8v6h6l8-8" fill="#94A3B8" />
                      <path d="M42 34l8 8v6h-6l-8-8" fill="#94A3B8" />
                      <path d="M28 48l4 10 4-10z" fill="#F97316" />
                      <path d="M30 48l2 6 2-6z" fill="#FBBF24" />
                    </svg>
                  ), 
                  color: "emerald" 
                }
              ].map((item, idx) => (
                <div key={idx} className="group bg-white p-8 border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] rounded-2xl hover:shadow-[0_15px_30px_-15px_rgba(244,63,94,0.15)] transition-all duration-300 transform hover:-translate-y-2 relative overflow-hidden">
                  <div className={`absolute top-0 right-0 w-24 h-24 bg-${item.color}-50 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110 z-0`}></div>
                  <div className="relative z-10">
                    <div className="mb-6 group-hover:scale-110 transition-transform duration-300 drop-shadow-md">
                      {item.icon}
                    </div>
                    <h3 className="text-xl font-bold text-slate-800 mb-3">{item.title}</h3>
                    <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- AVAILABLE DOMAINS SECTION --- */}
        <section className="py-24 bg-slate-50/50 border-b border-slate-100 relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-full h-full bg-[url('/tajweed.jpeg')] bg-cover bg-center opacity-[0.02] mix-blend-multiply pointer-events-none"></div>
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
              <div className="max-w-2xl">
                <span className="text-orange-500 font-bold tracking-widest uppercase text-sm mb-2 block">{t("Explore Fields")}</span>
                <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">{t("Available Internship Domains")}</h2>
                <p className="text-slate-600 text-lg leading-relaxed">{t("Choose a department that aligns with your passion. We offer multiple disciplines to help you master the skills that matter most in today's industry.")}</p>
              </div>
              <a href="#apply" className="shrink-0 px-6 py-3 bg-white border border-slate-200 text-slate-800 font-bold rounded-full hover:bg-slate-50 transition-colors shadow-sm hidden md:inline-flex items-center gap-2">
                {t("Apply for a Domain")} <span className="text-orange-500">→</span>
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  category: t("Information Technology"), 
                  icon: (
                    <svg viewBox="0 0 64 64" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
                      <rect x="8" y="16" width="48" height="32" rx="4" fill="#1E293B" />
                      <circle cx="14" cy="22" r="2" fill="#EF4444" />
                      <circle cx="20" cy="22" r="2" fill="#F59E0B" />
                      <circle cx="26" cy="22" r="2" fill="#10B981" />
                      <path d="M20 32l-4 4 4 4M28 32l4 4-4 4M36 40l4-16" stroke="#38BDF8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
                      <path d="M24 48h16v4H24z" fill="#64748B" />
                    </svg>
                  ),
                  color: "blue",
                  bg: "bg-blue-50",
                  text: "text-blue-600",
                  skills: [t("Web Development"), t("Graphic Designing"), t("Social Media Mgt"), t("IT Support")] 
                },
                { 
                  category: t("Academic & Research"), 
                  icon: (
                    <svg viewBox="0 0 64 64" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 40V24L32 12l20 12v16" fill="none" stroke="#F59E0B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M32 12l20 12-20 12-20-12z" fill="#FCD34D" />
                      <path d="M24 48h16v-8l-8 4-8-4v8z" fill="#B45309" />
                      <rect x="12" y="48" width="40" height="4" fill="#D97706" />
                      <path d="M52 24v16M52 40a4 4 0 100 8 4 4 0 000-8z" fill="#F59E0B" />
                    </svg>
                  ),
                  color: "emerald",
                  bg: "bg-emerald-50",
                  text: "text-emerald-600",
                  skills: [t("Content Writing"), t("Islamic Research"), t("Translation Services"), t("Teaching Assistance")] 
                },
                { 
                  category: t("Management & Admin"), 
                  icon: (
                    <svg viewBox="0 0 64 64" width="56" height="56" xmlns="http://www.w3.org/2000/svg">
                      <rect x="12" y="24" width="40" height="28" rx="4" fill="#8B5CF6" />
                      <rect x="12" y="24" width="40" height="10" fill="#7C3AED" />
                      <path d="M26 24V16h12v8" fill="none" stroke="#C4B5FD" strokeWidth="4" strokeLinecap="round" />
                      <circle cx="32" cy="38" r="4" fill="#FDE047" />
                      <path d="M12 30h40" stroke="#6D28D9" strokeWidth="2" />
                      <path d="M28 16h8v4h-8z" fill="#A78BFA" />
                    </svg>
                  ),
                  color: "purple",
                  bg: "bg-purple-50",
                  text: "text-purple-600",
                  skills: [t("Event Management"), t("Student Affairs"), t("Data Entry & Records"), t("Public Relations")] 
                }
              ].map((domain, idx) => (
                <div key={idx} className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden group">
                  <div className={`p-6 md:p-8 border-b border-slate-100 relative overflow-hidden`}>
                     <div className={`absolute -right-6 -top-6 w-32 h-32 rounded-full ${domain.bg} opacity-50 group-hover:scale-150 transition-transform duration-500 ease-out`}></div>
                     <div className="relative z-10">
                        <div className="mb-6 drop-shadow-sm group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300">
                          {domain.icon}
                        </div>
                        <h3 className="text-2xl font-black text-slate-800">{domain.category}</h3>
                     </div>
                  </div>
                  <div className="p-6 md:p-8 bg-slate-50/50">
                    <ul className="space-y-4">
                      {domain.skills.map((skill, sIdx) => (
                        <li key={sIdx} className="flex items-center gap-3">
                          <CheckCircle2 className={`w-5 h-5 ${domain.text} shrink-0`} />
                          <span className="text-slate-600 font-medium">{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-10 text-center md:hidden">
              <a href="#apply" className="inline-flex px-6 py-3 bg-white border border-slate-200 text-slate-800 font-bold rounded-full hover:bg-slate-50 transition-colors shadow-sm items-center gap-2">
                {t("Apply for a Domain")} <span className="text-orange-500">→</span>
              </a>
            </div>
          </div>
        </section>

        {/* --- PREMIUM FORM & CONTACT SECTION --- */}
        <section className="py-24 bg-white border-b border-slate-100 relative overflow-hidden" id="apply">
          {/* Background decorations */}
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-b from-transparent to-amber-50/30 pointer-events-none"></div>
          <div className="absolute -left-32 top-32 w-96 h-96 bg-rose-100/40 rounded-full blur-3xl pointer-events-none"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              
              {/* Left Column: Info & Contact (Premium Design) */}
              <div className="lg:col-span-4 space-y-8">
                <div className="sticky top-24">
                  <div className="mb-10">
                    <span className="text-rose-500 font-bold tracking-widest uppercase text-sm mb-2 block">{t("Get Started")}</span>
                    <h2 className="text-3xl font-black text-slate-900 mb-4">{t("Join the Program")}</h2>
                    <p className="text-slate-600 text-sm leading-relaxed">{t("Fill out the application form with your accurate details. Our team will review it and get back to you within 2-3 working days.")}</p>
                  </div>

                  {/* Premium Contact Cards using Original Icons */}
                  <div className="space-y-4">
                    {/* WhatsApp */}
                    <a href="https://wa.me/923144081516" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 p-5 bg-white border border-slate-100 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] rounded-2xl hover:border-green-200 hover:shadow-[0_10px_25px_-5px_rgba(34,197,94,0.2)] transition-all">
                      <div className="w-12 h-12 shrink-0 bg-[#25D366]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        {/* Original WhatsApp Icon */}
                        <svg viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
                          <path d="M19.001 4.908A9.817 9.817 0 0 0 11.992 2C6.534 2 2.085 6.448 2.08 11.908c0 1.748.458 3.45 1.321 4.956L2 22l5.255-1.375A9.933 9.933 0 0 0 11.992 22c5.461 0 9.91-4.449 9.915-9.915a9.82 9.82 0 0 0-2.906-6.977z" fill="#25D366"/>
                          <path d="M11.992 20.308c-1.477 0-2.924-.397-4.187-1.147l-.3-.178-3.111.815.828-3.033-.195-.31A8.214 8.214 0 0 1 3.774 11.91C3.779 7.378 7.466 3.69 12 3.692a8.232 8.232 0 0 1 5.82 2.417 8.23 8.23 0 0 1 2.408 5.826c-.004 4.532-3.693 8.217-8.226 8.219z" fill="#FFF"/>
                          <path d="M16.51 13.793c-.248-.124-1.468-.724-1.696-.807-.227-.083-.393-.124-.559.124-.165.248-.64 .807-.785.972-.145.165-.29.186-.538.062-.248-.124-1.047-.386-1.994-1.23-.736-.656-1.232-1.467-1.377-1.715-.145-.248-.016-.381.108-.505.111-.11.248-.29.372-.435.124-.145.165-.248.248-.413.083-.165.041-.31-.021-.434-.062-.124-.559-1.348-.765-1.845-.202-.483-.408-.418-.559-.426h-.476c-.165 0-.434.062-.661.31-.227.248-.867.847-.867 2.066s.888 2.396 1.012 2.562c.124.165 1.747 2.666 4.233 3.738.591.255 1.053.407 1.413.521.593.189 1.134.162 1.558.098.472-.072 1.468-.6 1.674-1.178.207-.579.207-1.074.145-1.178-.062-.103-.227-.165-.475-.29z" fill="#25D366"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-black text-slate-800 text-sm group-hover:text-green-600 transition-colors">WhatsApp Helpdesk</h4>
                        <p className="text-xs text-slate-500 mt-0.5">0314-4081516</p>
                      </div>
                    </a>

                    {/* Gmail */}
                    <a href="mailto:shererabbani@gmail.com" className="group flex items-center gap-5 p-5 bg-white border border-slate-100 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] rounded-2xl hover:border-red-200 hover:shadow-[0_10px_25px_-5px_rgba(239,68,68,0.2)] transition-all">
                      <div className="w-12 h-12 shrink-0 bg-[#EA4335]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        {/* Original Gmail Icon */}
                        <svg viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
                          <path d="M22.56 5.316l-9.11 6.83a2.38 2.38 0 0 1-2.9 0L1.44 5.316C1.16 5.105 1 4.793 1 4.453 1 3.65 1.65 3 2.453 3h19.094C22.35 3 23 3.65 23 4.453c0 .34-.16.652-.44.863z" fill="#EA4335"/>
                          <path d="M22.56 5.316l-9.11 6.83a2.38 2.38 0 0 1-2.9 0L1.44 5.316A1.44 1.44 0 0 0 1 6.47v11.98C1 19.855 2.146 21 3.553 21h16.894C21.854 21 23 19.855 23 18.45V6.47a1.44 1.44 0 0 0-.44-1.154z" fill="#FBBC04" opacity="0.3"/>
                          <path d="M1.44 5.316L10.55 12.146a2.38 2.38 0 0 0 2.9 0l9.11-6.83A1.44 1.44 0 0 1 23 6.47v11.98a2.553 2.553 0 0 1-2.553 2.55H3.553A2.553 2.553 0 0 1 1 18.45V6.47c0-.435.195-.826.44-1.154z" fill="#4285F4"/>
                          <path d="M23 6.47v11.98a2.553 2.553 0 0 1-2.553 2.55H14.5v-7.86l8.06-6.045A1.44 1.44 0 0 1 23 6.47z" fill="#34A853"/>
                          <path d="M1 6.47v11.98A2.553 2.553 0 0 0 3.553 21H9.5v-7.86L1.44 7.095A1.44 1.44 0 0 0 1 6.47z" fill="#EA4335"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-black text-slate-800 text-sm group-hover:text-red-600 transition-colors">Email Support</h4>
                        <p className="text-xs text-slate-500 mt-0.5">shererabbani@gmail.com</p>
                      </div>
                    </a>

                    {/* Google Maps */}
                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-5 p-5 bg-white border border-slate-100 shadow-[0_4px_15px_-5px_rgba(0,0,0,0.05)] rounded-2xl hover:border-blue-200 hover:shadow-[0_10px_25px_-5px_rgba(59,130,246,0.2)] transition-all">
                      <div className="w-12 h-12 shrink-0 bg-[#4285F4]/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                        {/* Original Google Maps Icon */}
                        <svg viewBox="0 0 24 24" width="28" height="28" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#EA4335"/>
                          <circle cx="12" cy="9" r="2.5" fill="#FBBC04"/>
                          <path d="M12 2C8.13 2 5 5.13 5 9c0 .77.16 1.5.43 2.18l6.57 6.57V2z" fill="#4285F4"/>
                          <path d="M12 2v15.75l6.57-6.57c.27-.68.43-1.41.43-2.18 0-3.87-3.13-7-7-7z" fill="#34A853"/>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-black text-slate-800 text-sm group-hover:text-blue-600 transition-colors">Campus Location</h4>
                        <p className="text-xs text-slate-500 mt-0.5">Mananwala, Sheikhupura</p>
                      </div>
                    </a>
                  </div>

                  <div className="mt-10 p-6 bg-slate-900 rounded-3xl text-white relative overflow-hidden">
                    <div className="absolute -right-10 -top-10 w-32 h-32 bg-amber-500/20 rounded-full blur-2xl"></div>
                    <div className="relative z-10 flex items-start gap-4">
                      <div className="p-2 bg-white/10 rounded-lg shrink-0">
                        <Award className="w-6 h-6 text-amber-400" />
                      </div>
                      <div>
                        <h4 className="font-bold mb-1">{t("100% Free Program")}</h4>
                        <p className="text-xs text-slate-300 leading-relaxed">{t("There are no hidden charges. This initiative is fully funded to empower the youth.")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: The Premium Form */}
              <div className="lg:col-span-8">
                <div className="bg-white border border-slate-200 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[2rem] overflow-hidden p-8 md:p-12 relative">
                  <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500"></div>
                  
                  <div className="mb-10">
                    <h3 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight mb-2">{t("Application Form")}</h3>
                    <p className="text-slate-500 font-medium text-sm">{t("Please ensure all provided information is accurate and matches your official documents.")}</p>
                  </div>

                  {submitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="text-center py-16"
                    >
                      <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-50 border-8 border-emerald-100 text-emerald-500 mb-6 relative">
                        <div className="absolute inset-0 bg-emerald-400 rounded-full animate-ping opacity-20"></div>
                        <CheckCircle2 size={48} />
                      </div>
                      <h3 className="text-3xl font-black text-slate-800 mb-3">{t("Application Submitted!")}</h3>
                      <p className="text-slate-500 mb-8 max-w-md mx-auto">{t("Thank you for applying. We have received your details and our academic team will review them shortly.")}</p>
                      <button onClick={() => setSubmitted(false)} className="px-8 py-3.5 bg-slate-900 text-white font-bold rounded-xl hover:bg-slate-800 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform">
                        {t("Submit Another Application")}
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-6">
                      
                      <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-6">
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2 flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-rose-500"></span>
                           {t("Personal Details")}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">{t("Full Name")} *</label>
                            <input type="text" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full px-5 py-3.5 bg-white border border-slate-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-50 outline-none font-bold text-slate-800 rounded-xl transition-all shadow-sm" placeholder={t("Ali Ahmad")} />
                          </div>
                          <div>
                            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">{t("Father's Name")} *</label>
                            <input type="text" required value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} className="w-full px-5 py-3.5 bg-white border border-slate-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-50 outline-none font-bold text-slate-800 rounded-xl transition-all shadow-sm" placeholder={t("Muhammad Ahmad")} />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">{t("WhatsApp Number")} *</label>
                            <div className="relative">
                              <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-5 py-3.5 pl-12 bg-white border border-slate-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-50 outline-none font-bold text-slate-800 rounded-xl transition-all shadow-sm" placeholder={t("03001234567")} />
                              <Phone className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">{t("Email Address")} *</label>
                            <div className="relative">
                              <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-5 py-3.5 pl-12 bg-white border border-slate-200 focus:border-rose-400 focus:ring-4 focus:ring-rose-50 outline-none font-bold text-slate-800 rounded-xl transition-all shadow-sm" placeholder={t("student@example.com")} />
                              <Mail className="absolute left-4 top-4 text-slate-400 w-5 h-5" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-6 mt-6">
                        <h4 className="text-sm font-black text-slate-900 uppercase tracking-widest border-b border-slate-200 pb-2 flex items-center gap-2">
                           <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                           {t("Academic & Domain Info")}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">{t("Current Institution")} *</label>
                            <input type="text" required value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} className="w-full px-5 py-3.5 bg-white border border-slate-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-50 outline-none font-bold text-slate-800 rounded-xl transition-all shadow-sm" placeholder={t("University or Madrasa Name")} />
                          </div>
                          <div>
                            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">{t("Education Level")} *</label>
                            <input type="text" required value={formData.education} onChange={e => setFormData({...formData, education: e.target.value})} className="w-full px-5 py-3.5 bg-white border border-slate-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-50 outline-none font-bold text-slate-800 rounded-xl transition-all shadow-sm" placeholder={t("e.g. BS CS, Dars-e-Nizami")} />
                          </div>
                        </div>

                        <div>
                          <label className="block text-[11px] font-black text-slate-500 uppercase tracking-widest mb-2">{t("Select Domain of Interest")} *</label>
                          <select required value={formData.fieldOfInterest} onChange={e => setFormData({...formData, fieldOfInterest: e.target.value})} className="w-full px-5 py-3.5 bg-white border border-slate-200 focus:border-orange-400 focus:ring-4 focus:ring-orange-50 outline-none font-bold text-slate-800 rounded-xl transition-all shadow-sm cursor-pointer appearance-none">
                            <option value="" disabled>{t("-- Select Your Preferred Field --")}</option>
                            <optgroup label="Information Technology">
                              <option value="IT - Web Development">{t("Web Development")}</option>
                              <option value="IT - Graphic Design">{t("Graphic Designing")}</option>
                              <option value="IT - Social Media Management">{t("Social Media Management")}</option>
                              <option value="IT - IT Support">{t("IT Support / Hardware")}</option>
                            </optgroup>
                            <optgroup label="Academic & Research">
                              <option value="Academic - Content Writing">{t("Content Writing")}</option>
                              <option value="Academic - Islamic Research">{t("Islamic Research")}</option>
                              <option value="Academic - Translation Services">{t("Translation Services")}</option>
                            </optgroup>
                            <optgroup label="Management & Admin">
                              <option value="Admin - Event Management">{t("Event Management")}</option>
                              <option value="Admin - Student Affairs">{t("Student Affairs")}</option>
                              <option value="Admin - Data Entry">{t("Data Entry")}</option>
                            </optgroup>
                          </select>
                        </div>
                      </div>

                      <button type="submit" disabled={isSubmitting} className="w-full py-5 mt-6 bg-slate-900 text-white font-black text-sm uppercase tracking-widest shadow-xl shadow-slate-900/20 hover:bg-slate-800 hover:shadow-2xl hover:-translate-y-1 transition-all rounded-xl disabled:opacity-50 disabled:hover:translate-y-0 relative overflow-hidden group">
                        <div className="absolute inset-0 bg-gradient-to-r from-rose-500 via-orange-500 to-amber-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        <span className="relative z-10 flex items-center justify-center gap-2">
                          {isSubmitting ? (
                            <>
                              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                              {t('Submitting...')}
                            </>
                          ) : t('Submit Application')}
                        </span>
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
