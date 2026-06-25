'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';
import { Mail, Phone, MapPin, ChevronRight, Globe2, Clock, Landmark, ShieldCheck, Award } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Contact() {
  const { t } = useTranslation();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    
    setStatus('loading');
    setErrorMessage('');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' });
        setTimeout(() => setStatus('idle'), 5000);
      } else {
        setStatus('error');
        setErrorMessage(t('contact_error_failed'));
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setStatus('error');
      setErrorMessage(t('contact_error_server'));
    }
  };

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-1" />
        <Footer />
      </div>
    );
  }

  return (
    <>
      <Header />
      <main className="flex-1 bg-white font-sans text-slate-900">
        
        {/* --- HERO SECTION --- */}
        <section className="relative pt-24 pb-20 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="inline-block bg-purple-50 border border-purple-200 text-purple-600 rounded-full shadow-sm text-xs font-bold px-4 py-1.5 mb-6 uppercase tracking-wide">
                  Connect With Us
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 leading-tight">
                  Always Here to <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-rose-500 drop-shadow-sm">Assist You</span>
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
                  Whether you have questions about admissions, scholarly research, or community support, our dedicated teams are ready to help. Reach out through any of the channels below.
                </p>
                
                <div className="flex flex-wrap justify-center gap-4">
                   <div className="flex items-center gap-2 text-amber-700 text-sm font-bold bg-amber-50 border border-amber-100 rounded-full shadow-sm px-6 py-3"><Clock size={18} className="text-amber-500" /> Response within 24 Hours</div>
                   <div className="flex items-center gap-2 text-blue-700 text-sm font-bold bg-blue-50 border border-blue-100 rounded-full shadow-sm px-6 py-3"><Globe2 size={18} className="text-blue-500" /> Global Support</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- DETAILED CONTACT METHODS --- */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-2 gap-3 md:gap-8 max-w-4xl mx-auto">
              {[
                { title: "General Inquiries", icon: <Globe2 className="w-4 h-4 md:w-6 md:h-6" />, info: "shererabbani@gmail.com", sub: "0314-4081516" },
                { title: "Admissions Office", icon: <Landmark className="w-4 h-4 md:w-6 md:h-6" />, info: "shererabbani@gmail.com", sub: "0332-8364368" }
              ].map((method, idx) => (
                <div key={idx} className={`bg-white p-4 md:p-8 border shadow-sm transition-all duration-300 transform hover:-translate-y-1 md:hover:-translate-y-2 rounded-xl md:rounded-2xl text-center group ${idx===0?"border-blue-100 hover:border-blue-400 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)]":"border-rose-100 hover:border-rose-400 hover:shadow-[0_10px_30px_rgba(244,63,94,0.15)]"}`}>
                  <div className={`mb-3 md:mb-4 w-10 h-10 md:w-16 md:h-16 mx-auto rounded-full flex items-center justify-center shadow-sm border ${idx===0?"bg-blue-50 text-blue-600 border-blue-100":"bg-rose-50 text-rose-600 border-rose-100"}`}>
                    {method.icon}
                  </div>
                  <h3 className="text-[11px] md:text-lg font-semibold text-slate-900 mb-1 md:mb-2">{method.title}</h3>
                  <p className="text-[9px] md:text-sm font-semibold text-slate-700 mb-1 truncate">{method.info}</p>
                  <p className="text-[9px] md:text-xs text-slate-500 font-semibold tracking-wide">{method.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- FORM & INSTITUTIONAL INFO --- */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
              
              {/* Left Column: Form */}
              <div className="lg:col-span-7 bg-white p-8 border border-slate-100 rounded-3xl shadow-xl shadow-purple-500/5">
                <div className="mb-8">
                  <h2 className="text-2xl font-semibold text-slate-900 mb-2">Send a Message</h2>
                  <p className="text-slate-600 text-sm">
                    Fill out the form below and our administrative team will direct your inquiry to the relevant department immediately.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Full Name</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-200 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-colors text-slate-900"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Email Address</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-200 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-colors text-slate-900"
                    />
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-xs font-semibold text-slate-600 uppercase tracking-wide">Your Message</label>
                    <textarea
                      rows={5}
                      required
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 bg-white border border-slate-200 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-colors text-slate-900 resize-none"
                    ></textarea>
                  </div>
                  <div className="md:col-span-2">
                    <button
                      type="submit"
                      disabled={status === 'loading'}
                      className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-md transition-all transform hover:-translate-y-1 disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      {status === 'loading' ? 'Sending...' : 'Send Message'}
                      <ChevronRight size={18} />
                    </button>
                    {status === 'success' && (
                      <div className="mt-4 p-4 bg-emerald-50 text-emerald-700 text-sm font-bold border border-emerald-200 rounded-xl shadow-sm">
                        Message sent successfully! We will get back to you soon.
                      </div>
                    )}
                  </div>
                </form>
              </div>

              {/* Right Column: Institutional Info */}
              <div className="lg:col-span-5 space-y-8">
                <div className="bg-gradient-to-br from-indigo-700 via-purple-800 to-slate-900 p-8 text-white rounded-3xl shadow-xl overflow-hidden relative">
                  <h3 className="text-xl font-semibold mb-6">Campus Visit</h3>
                  
                  <div className="space-y-6">
                    {/* Interactive Map */}
                    <div className="w-full h-40 border border-white/20 rounded-xl mb-6 grayscale hover:grayscale-0 transition-all duration-300">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3403.48623403912!2d73.6855994!3d31.5879301!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzHCsDM1JzE2LjUiTiA3M8KwNDEnMDguMiJF!5e0!3m2!1sen!2s!4v1718100000000!5m2!1sen!2s" 
                        width="100%" 
                        height="100%" 
                        style={{ border: 0 }} 
                        allowFullScreen={true} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                      ></iframe>
                    </div>

                    <div className="flex gap-4">
                      <div className="text-fuchsia-300 shrink-0 mt-0.5">
                        <MapPin size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Physical Address</h4>
                        <p className="text-sm text-fuchsia-100">Jamia Sher-e-Rabbani, Mananwala, District Sheikhupura, Punjab, Pakistan</p>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <div className="text-fuchsia-300 shrink-0 mt-0.5">
                        <Clock size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-white mb-1">Office Hours</h4>
                        <div className="text-sm text-fuchsia-100 space-y-1">
                          <p>Mon - Thu: 9:00 AM - 5:00 PM</p>
                          <p>Saturday: 9:00 AM - 5:00 PM</p>
                          <p className="text-gray-300">Friday & Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-white/20 rounded-xl">
                    <Link 
                      href="https://www.google.com/maps/dir/?api=1&destination=31.58793009753148,73.68559944178602" 
                      target="_blank"
                      className="inline-flex items-center text-white font-semibold text-sm hover:underline"
                    >
                      Get Directions via Map <ChevronRight size={16} className="ml-1" />
                    </Link>
                  </div>
                </div>

                {/* Additional Help */}
                <div className="p-8 bg-white border border-slate-100 text-center rounded-2xl shadow-sm">
                  <div className="text-emerald-500 mb-3 bg-emerald-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center">
                    <ShieldCheck size={28} />
                  </div>
                  <h4 className="text-lg font-semibold text-slate-900 mb-2">Secure Communication</h4>
                  <p className="text-sm text-slate-600">
                    All your messages are encrypted and handled with strict confidentiality by our administrative office.
                  </p>
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
