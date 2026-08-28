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
  Laptop,
  Monitor,
  Library,
  Settings,
  ChevronRight,
  MapPin,
  MessageCircle,
  Clock,
  Users
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
      <div className="flex flex-col min-h-screen bg-[#faf9f8]">
        <Header />
        <main className="flex-1" />
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 font-sans text-[#323130] bg-[#faf9f8]">
        
        {/* --- MICROSOFT THEMED HERO SECTION --- */}
        <section className="relative pt-20 pb-24 bg-white border-b border-[#edebe9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#f3f2f1] text-[#605e5c] text-xs font-semibold mb-6">
                  <span className="w-2 h-2 rounded-full bg-[#0078d4]"></span>
                  {t("Batch 2026 Admissions Open")}
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-[#323130] tracking-tight mb-6 leading-tight">
                  {t("Empower Your Future")} <br/>
                  <span className="text-[#0078d4]">{t("With Practical Experience")}</span>
                </h1>
                
                <p className="text-lg text-[#605e5c] mb-10 leading-relaxed max-w-xl">
                  {t("Join our prestigious internship program designed exclusively for University and Madrasa students. Gain hands-on experience, build real-world projects, and secure your professional future.")}
                </p>

                <div className="flex flex-wrap items-center gap-4">
                  <a href="#apply" className="px-8 py-3.5 bg-[#0078d4] hover:bg-[#106ebe] text-white font-semibold transition-colors">
                    {t("Apply Now")}
                  </a>
                  <a href="/internship/program-details" className="px-8 py-3.5 bg-white hover:bg-[#f3f2f1] border border-[#8a8886] text-[#323130] font-semibold transition-colors">
                    {t("Program Details")}
                  </a>
                </div>
              </motion.div>

              {/* Right Visual/Stats */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
                className="relative"
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#faf9f8] p-6 border border-[#edebe9]">
                    <div className="w-12 h-12 bg-[#0078d4]/10 flex items-center justify-center mb-4 text-[#0078d4]">
                      <Briefcase size={24} />
                    </div>
                    <h3 className="text-3xl font-semibold text-[#323130] mb-1">50+</h3>
                    <p className="text-sm text-[#605e5c] font-medium">{t("Internship Positions")}</p>
                  </div>
                  <div className="bg-[#faf9f8] p-6 border border-[#edebe9] mt-8">
                    <div className="w-12 h-12 bg-[#107c41]/10 flex items-center justify-center mb-4 text-[#107c41]">
                      <GraduationCap size={24} />
                    </div>
                    <h3 className="text-3xl font-semibold text-[#323130] mb-1">100%</h3>
                    <p className="text-sm text-[#605e5c] font-medium">{t("Free of Cost")}</p>
                  </div>
                  <div className="bg-[#faf9f8] p-6 border border-[#edebe9] -mt-4">
                    <div className="w-12 h-12 bg-[#d83b01]/10 flex items-center justify-center mb-4 text-[#d83b01]">
                      <Award size={24} />
                    </div>
                    <h3 className="text-3xl font-semibold text-[#323130] mb-1">Verified</h3>
                    <p className="text-sm text-[#605e5c] font-medium">{t("Official Certificates")}</p>
                  </div>
                  <div className="bg-[#faf9f8] p-6 border border-[#edebe9] mt-4">
                    <div className="w-12 h-12 bg-[#8764b8]/10 flex items-center justify-center mb-4 text-[#8764b8]">
                      <Clock size={24} />
                    </div>
                    <h3 className="text-3xl font-semibold text-[#323130] mb-1">3-6</h3>
                    <p className="text-sm text-[#605e5c] font-medium">{t("Months Duration")}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- MICROSOFT THEMED "WHY INTERN" SECTION --- */}
        <section className="py-20 bg-[#faf9f8] border-b border-[#edebe9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl font-semibold text-[#323130] mb-4">{t("Why Intern With Us?")}</h2>
              <p className="text-[#605e5c] text-lg">{t("Discover the benefits of launching your career through our structured and supportive environment.")}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Hands-on Experience",
                  desc: "Work on live projects and gain practical skills that matter in the real world.",
                  color: "#0078d4",
                  icon: <Laptop size={32} color="#0078d4" strokeWidth={1.5} />
                },
                {
                  title: "Expert Mentorship",
                  desc: "Get guided by industry professionals and experienced academicians.",
                  color: "#107c41",
                  icon: <Users size={32} color="#107c41" strokeWidth={1.5} />
                },
                {
                  title: "Career Growth",
                  desc: "Boost your resume with a verified certificate and professional networking.",
                  color: "#d83b01",
                  icon: <Briefcase size={32} color="#d83b01" strokeWidth={1.5} />
                }
              ].map((item, idx) => (
                <div key={idx} className="bg-white p-8 border border-[#edebe9] hover:shadow-md transition-shadow group">
                  <div className="mb-6">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-[#323130] mb-3 group-hover:text-[#0078d4] transition-colors">{t(item.title)}</h3>
                  <p className="text-[#605e5c] leading-relaxed">{t(item.desc)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- MICROSOFT THEMED DOMAINS SECTION --- */}
        <section className="py-20 bg-white border-b border-[#edebe9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div>
                <h2 className="text-3xl font-semibold text-[#323130] mb-4">{t("Available Internship Domains")}</h2>
                <p className="text-[#605e5c] text-lg">{t("Choose a specialized track that aligns with your educational background.")}</p>
              </div>
              <a href="/internship/program-details" className="text-[#0078d4] hover:underline font-semibold flex items-center gap-1 whitespace-nowrap">
                {t("View Full Details")} <ChevronRight size={16} />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  id: "it",
                  title: "IT & Computer Science",
                  icon: <Monitor size={28} />,
                  bg: "bg-[#0078d4]",
                  roles: ["Web Development", "Graphic Design", "Social Media", "IT Support"]
                },
                {
                  id: "academic",
                  title: "Academic & Research",
                  icon: <Library size={28} />,
                  bg: "bg-[#d83b01]",
                  roles: ["Content Writing", "Islamic Research", "Translation Services"]
                },
                {
                  id: "admin",
                  title: "Management & Admin",
                  icon: <Settings size={28} />,
                  bg: "bg-[#107c41]",
                  roles: ["Event Management", "Student Affairs", "Data Entry"]
                }
              ].map((domain, idx) => (
                <div key={idx} className="bg-[#faf9f8] border border-[#edebe9] hover:border-[#c8c6c4] transition-colors">
                  <div className={`p-6 ${domain.bg} text-white flex items-center gap-4`}>
                    {domain.icon}
                    <h3 className="text-lg font-semibold">{t(domain.title)}</h3>
                  </div>
                  <div className="p-6">
                    <ul className="space-y-3">
                      {domain.roles.map((role, rIdx) => (
                        <li key={rIdx} className="flex items-center gap-2 text-[#605e5c]">
                          <CheckCircle2 size={16} className="text-[#0078d4]" />
                          {t(role)}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- MICROSOFT THEMED FORM SECTION --- */}
        <section className="py-20 bg-[#faf9f8]" id="apply">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column: Contact/Support Info */}
              <div className="lg:col-span-4">
                <div className="sticky top-24">
                  <h2 className="text-3xl font-semibold text-[#323130] mb-6">{t("Need Assistance?")}</h2>
                  <p className="text-[#605e5c] mb-8 leading-relaxed">
                    {t("If you face any issues while submitting your application or have questions regarding the program, reach out to our official channels.")}
                  </p>

                  <div className="space-y-4">
                    <a href="https://wa.me/923144081516" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white border border-[#edebe9] hover:bg-[#f3f2f1] transition-colors group">
                      <div className="text-[#107c41]">
                         <MessageCircle size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#323130] text-sm group-hover:text-[#107c41] transition-colors">WhatsApp Helpdesk</h4>
                        <p className="text-xs text-[#605e5c] mt-0.5">0314-4081516</p>
                      </div>
                    </a>

                    <a href="mailto:shererabbani@gmail.com" className="flex items-center gap-4 p-4 bg-white border border-[#edebe9] hover:bg-[#f3f2f1] transition-colors group">
                      <div className="text-[#d83b01]">
                         <Mail size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#323130] text-sm group-hover:text-[#d83b01] transition-colors">Email Support</h4>
                        <p className="text-xs text-[#605e5c] mt-0.5">shererabbani@gmail.com</p>
                      </div>
                    </a>

                    <a href="https://maps.google.com" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 p-4 bg-white border border-[#edebe9] hover:bg-[#f3f2f1] transition-colors group">
                      <div className="text-[#0078d4]">
                         <MapPin size={24} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-[#323130] text-sm group-hover:text-[#0078d4] transition-colors">Campus Location</h4>
                        <p className="text-xs text-[#605e5c] mt-0.5">Mananwala, Sheikhupura</p>
                      </div>
                    </a>
                  </div>

                  <div className="mt-8 p-6 bg-[#0078d4] text-white">
                    <div className="flex items-start gap-4">
                      <Award className="w-6 h-6 shrink-0 opacity-90" />
                      <div>
                        <h4 className="font-semibold mb-1">{t("100% Free Program")}</h4>
                        <p className="text-sm text-blue-100 leading-relaxed">{t("There are no hidden charges. This initiative is fully funded to empower the youth.")}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column: The Application Form */}
              <div className="lg:col-span-8">
                <div className="bg-white border border-[#edebe9] p-8 md:p-10 shadow-sm">
                  
                  <div className="mb-8 border-b border-[#edebe9] pb-6">
                    <h3 className="text-2xl font-semibold text-[#323130] mb-2">{t("Application Form")}</h3>
                    <p className="text-[#605e5c] text-sm">{t("Please ensure all provided information is accurate and matches your official documents.")}</p>
                  </div>

                  {submitted ? (
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }} 
                      animate={{ opacity: 1, scale: 1 }} 
                      className="bg-[#dff6dd] border border-[#107c41] p-8 text-center"
                    >
                      <div className="w-16 h-16 bg-[#107c41] text-white rounded-full flex items-center justify-center mx-auto mb-6">
                        <CheckCircle2 size={32} />
                      </div>
                      <h4 className="text-2xl font-semibold text-[#323130] mb-3">{t("Application Submitted!")}</h4>
                      <p className="text-[#605e5c] max-w-md mx-auto mb-6">
                        {t("Your application has been received successfully. Our administration team will review your details and contact you shortly.")}
                      </p>
                      <button onClick={() => setSubmitted(false)} className="px-6 py-2.5 bg-white border border-[#8a8886] hover:bg-[#f3f2f1] text-[#323130] font-semibold transition-colors">
                        {t("Submit Another Application")}
                      </button>
                    </motion.div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-8">
                      
                      {/* Personal Details */}
                      <div>
                        <h4 className="text-lg font-semibold text-[#323130] mb-4 flex items-center gap-2">
                           <User size={18} className="text-[#0078d4]" />
                           {t("Personal Details")}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-semibold text-[#323130] mb-1.5">{t("Full Name")} *</label>
                            <input type="text" required value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} className="w-full px-3 py-2 bg-white border border-[#8a8886] hover:border-[#323130] focus:border-[#0078d4] focus:outline-none focus:ring-1 focus:ring-[#0078d4] text-[#323130] transition-colors" placeholder={t("Ali Ahmad")} />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-[#323130] mb-1.5">{t("Father's Name")} *</label>
                            <input type="text" required value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} className="w-full px-3 py-2 bg-white border border-[#8a8886] hover:border-[#323130] focus:border-[#0078d4] focus:outline-none focus:ring-1 focus:ring-[#0078d4] text-[#323130] transition-colors" placeholder={t("Muhammad Ahmad")} />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                          <div>
                            <label className="block text-sm font-semibold text-[#323130] mb-1.5">{t("WhatsApp Number")} *</label>
                            <div className="relative">
                              <input type="tel" required value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-3 py-2 pl-9 bg-white border border-[#8a8886] hover:border-[#323130] focus:border-[#0078d4] focus:outline-none focus:ring-1 focus:ring-[#0078d4] text-[#323130] transition-colors" placeholder={t("03001234567")} />
                              <Phone className="absolute left-3 top-2.5 text-[#605e5c] w-4 h-4" />
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-[#323130] mb-1.5">{t("Email Address")} *</label>
                            <div className="relative">
                              <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-3 py-2 pl-9 bg-white border border-[#8a8886] hover:border-[#323130] focus:border-[#0078d4] focus:outline-none focus:ring-1 focus:ring-[#0078d4] text-[#323130] transition-colors" placeholder={t("ali@example.com")} />
                              <Mail className="absolute left-3 top-2.5 text-[#605e5c] w-4 h-4" />
                            </div>
                          </div>
                        </div>
                      </div>

                      <hr className="border-[#edebe9]"/>

                      {/* Academic Details */}
                      <div>
                        <h4 className="text-lg font-semibold text-[#323130] mb-4 flex items-center gap-2">
                           <GraduationCap size={18} className="text-[#0078d4]" />
                           {t("Academic Details")}
                        </h4>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-semibold text-[#323130] mb-1.5">{t("Current Institution")} *</label>
                            <input type="text" required value={formData.institution} onChange={e => setFormData({...formData, institution: e.target.value})} className="w-full px-3 py-2 bg-white border border-[#8a8886] hover:border-[#323130] focus:border-[#0078d4] focus:outline-none focus:ring-1 focus:ring-[#0078d4] text-[#323130] transition-colors" placeholder={t("University or Madrasa Name")} />
                          </div>
                          <div>
                            <label className="block text-sm font-semibold text-[#323130] mb-1.5">{t("Education Level")} *</label>
                            <select required value={formData.education} onChange={e => setFormData({...formData, education: e.target.value})} className="w-full px-3 py-2 bg-white border border-[#8a8886] hover:border-[#323130] focus:border-[#0078d4] focus:outline-none focus:ring-1 focus:ring-[#0078d4] text-[#323130] transition-colors appearance-none">
                              <option value="" disabled>{t("-- Select Level --")}</option>
                              <option value="Matric/O-Level">{t("Matric / O-Level")}</option>
                              <option value="Intermediate/A-Level">{t("Intermediate / A-Level")}</option>
                              <option value="Bachelors">{t("Bachelors (BS/BA)")}</option>
                              <option value="Masters">{t("Masters (MS/MA)")}</option>
                              <option value="Madrasa - Sania">{t("Madrasa - Sania")}</option>
                              <option value="Madrasa - Rabia">{t("Madrasa - Rabia")}</option>
                              <option value="Madrasa - Aalmiya">{t("Madrasa - Aalmiya")}</option>
                              <option value="Other">{t("Other")}</option>
                            </select>
                          </div>
                        </div>
                      </div>

                      <hr className="border-[#edebe9]"/>

                      {/* Internship Preferences */}
                      <div>
                        <h4 className="text-lg font-semibold text-[#323130] mb-4 flex items-center gap-2">
                           <Briefcase size={18} className="text-[#0078d4]" />
                           {t("Internship Preferences")}
                        </h4>
                        <div>
                          <label className="block text-sm font-semibold text-[#323130] mb-1.5">{t("Field of Interest")} *</label>
                          <select required value={formData.fieldOfInterest} onChange={e => setFormData({...formData, fieldOfInterest: e.target.value})} className="w-full px-3 py-2 bg-white border border-[#8a8886] hover:border-[#323130] focus:border-[#0078d4] focus:outline-none focus:ring-1 focus:ring-[#0078d4] text-[#323130] transition-colors appearance-none">
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

                      <button type="submit" disabled={isSubmitting} className="w-full py-3 mt-4 bg-[#0078d4] text-white font-semibold hover:bg-[#106ebe] transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <>
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            {t('Submitting...')}
                          </>
                        ) : t('Submit Application')}
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
