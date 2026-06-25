'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { Heart, Landmark, CreditCard, Gift, ChevronRight, ShieldCheck, Award, Users, BookOpen, GraduationCap, Building2 } from 'lucide-react';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';

export default function Donations() {
  const { t } = useTranslation();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-1" />
        <Footer />
      </div>
    );
  }

  const donationCategories = [
    {
      title: t("Student Sponsorship"),
      desc: t("Provide full educational and boarding support for a student of knowledge."),
      img: "/images/whatsapp_2.jpeg",
      link: "/donations/student-sponsorship"
    },
    {
      title: t("Zakat Fund"),
      desc: t("Your Zakat contributions are used strictly for eligible students and families."),
      img: "/images/WhatsApp 3.jpeg",
      link: "/donations/zakat-fund"
    },
    {
      title: t("Campus Development"),
      desc: t("Help us expand our facilities, library, and modern classroom infrastructure."),
      img: "https://images.unsplash.com/photo-1519817650390-64a93db51149?q=80&w=800&auto=format&fit=crop",
      link: "/donations/campus-development"
    },
    {
      title: t("Sadaqah Jariyah"),
      desc: t("Invest in projects that provide ongoing spiritual and community benefits."),
      img: "https://images.unsplash.com/photo-1574672280600-4accfa5b6f98?q=80&w=800&auto=format&fit=crop",
      link: "/donations/sadaqah-jariyah"
    }
  ];

  return (
    <>
      <Header />
      <main className="flex-1 bg-white font-sans text-slate-900">
        
        {/* --- HERO --- */}
        <section className="relative pt-24 pb-20 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
             <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
             >
                <div className="inline-block bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full text-xs font-bold px-4 py-1.5 mb-6 uppercase tracking-wide shadow-sm">
                  Invest in Akhirah
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 drop-shadow-sm mb-6 leading-tight">
                   {t('Support the Mission of Knowledge')}
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-10">
                   {t('Your contributions empower us to provide authentic Islamic education and nurture future leaders of the community.')}
                </p>
                <Link href="#bank-details" className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-full shadow-lg shadow-emerald-500/30 transition-all transform hover:-translate-y-1">
                   <Heart size={18} /> {t('Quick donate')}
                </Link>
             </motion.div>
          </div>
        </section>

        {/* --- DONATION GRID --- */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-12 text-center">{t('Ways to Give')}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
              {donationCategories.map((item, i) => (
                <motion.div 
                   key={i}
                   initial={{ opacity: 0, y: 20 }}
                   whileInView={{ opacity: 1, y: 0 }}
                   viewport={{ once: true }}
                   transition={{ delay: i * 0.1, duration: 0.5 }}
                >
                   <Link href={item.link} className={`flex flex-col group cursor-pointer bg-white border shadow-sm transition-all duration-300 transform hover:-translate-y-2 h-full rounded-2xl overflow-hidden ${i%4===0?"border-emerald-100 hover:border-emerald-400 hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]":i%4===1?"border-amber-100 hover:border-amber-400 hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]":i%4===2?"border-blue-100 hover:border-blue-400 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)]":"border-purple-100 hover:border-purple-400 hover:shadow-[0_10px_30px_rgba(168,85,247,0.2)]"}`}>
                     <div className="aspect-[4/3] relative bg-slate-50 overflow-hidden">
                       <OptimizedImage 
                         src={item.img} 
                         alt={item.title} 
                         fill
                         section="news"
                         className="object-cover group-hover:scale-105 transition-transform duration-500"
                         sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                       />
                     </div>
                     <div className="p-6 flex flex-col flex-1">
                       <h3 className={`text-xl font-bold mb-3 transition-colors ${i%4===0?"group-hover:text-emerald-600":i%4===1?"group-hover:text-amber-600":i%4===2?"group-hover:text-blue-600":"group-hover:text-purple-600"}`}>
                         {item.title}
                       </h3>
                       <p className="text-sm text-slate-600 mb-6 flex-1">
                         {item.desc}
                       </p>
                       <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                          <span className={`font-bold text-sm flex items-center hover:underline ${i%4===0?"text-emerald-600":i%4===1?"text-amber-600":i%4===2?"text-blue-600":"text-purple-600"}`}>
                            {t('Donate now')} <ChevronRight size={16} className="ml-1" />
                          </span>
                          <div className={`transition-colors ${i%4===0?"text-slate-400 group-hover:text-emerald-500":i%4===1?"text-slate-400 group-hover:text-amber-500":i%4===2?"text-slate-400 group-hover:text-blue-500":"text-slate-400 group-hover:text-purple-500"}`}>
                             <Heart size={18} />
                          </div>
                       </div>
                     </div>
                   </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* --- BANK DETAILS SECTION --- */}
        <section id="bank-details" className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="bg-white flex flex-col lg:flex-row items-stretch border border-slate-100 shadow-xl rounded-3xl overflow-hidden">
               <div className="flex-1 p-8 lg:p-12 border-b lg:border-b-0 lg:border-r border-slate-100">
                  <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-full shadow-sm text-xs font-bold px-4 py-1.5 mb-6 uppercase tracking-wide">
                     <Landmark size={14} /> Direct Bank Transfer
                  </div>
                  <p className="text-slate-600 mb-10 text-lg">
                    {t('You can securely transfer your donations directly to our official bank accounts. Please include your contact number in the reference for a digital receipt.')}
                  </p>
                  
                  <div className="space-y-6">
                    <div className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl">
                      <div className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-4 flex items-center gap-2">
                        <Landmark size={14} /> {t('Meezan Bank')}
                      </div>
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6">
                        <div>
                          <div className="text-sm font-semibold text-slate-500 mb-1 uppercase tracking-wide">{t('Account Title')}: <span className="text-slate-900 ml-1">Muhammad Ahmad</span></div>
                          <div className="text-2xl font-semibold text-slate-900">9869 0112 1013 13</div>
                        </div>
                        <button 
                          onClick={() => navigator.clipboard.writeText('98690112101313')}
                          className="text-emerald-700 text-xs font-bold hover:bg-emerald-50 px-4 py-2 border border-emerald-200 rounded-full shadow-sm transition-colors uppercase tracking-wide whitespace-nowrap"
                        >
                          {t('Copy Number')}
                        </button>
                      </div>
                    </div>

                    <div className="p-6 bg-white border border-slate-100">
                      <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-6 flex items-center gap-2">
                        <CreditCard size={14} /> Digital Wallets (Pakistan)
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-white p-5 border border-slate-100 text-center hover:border-blue-700 transition-colors">
                          <div className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">JazzCash</div>
                          <div className="text-lg font-semibold text-slate-900">0328 4381 312</div>
                        </div>
                        <div className="bg-white p-5 border border-slate-100 text-center hover:border-blue-700 transition-colors">
                          <div className="text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide">NayaPay</div>
                          <div className="text-lg font-semibold text-slate-900">0316 4415 465</div>
                        </div>
                      </div>
                    </div>
                  </div>
               </div>

               <div className="flex-1 p-8 lg:p-12 bg-gradient-to-br from-teal-700 via-emerald-800 to-slate-900 text-white flex flex-col justify-center relative overflow-hidden">
                  <h2 className="text-3xl font-semibold mb-10">{t('Transparency & Trust')}</h2>
                  <div className="space-y-8">
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-emerald-700/50 rounded-xl flex items-center justify-center shrink-0 border border-emerald-600/30">
                         <ShieldCheck size={24} className="text-emerald-200" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-xl mb-1 text-white">{t('Secure Management')}</h4>
                        <p className="text-emerald-100 text-sm">{t('Every penny is tracked and managed with the highest level of integrity and oversight.')}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-emerald-700/50 rounded-xl flex items-center justify-center shrink-0 border border-emerald-600/30">
                         <Award size={24} className="text-emerald-200" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-xl mb-1 text-white">{t('Cause Allocation')}</h4>
                        <p className="text-emerald-100 text-sm">{t('Your Zakat is handled in strict accordance with Shariah principles for eligible students.')}</p>
                      </div>
                    </div>
                    <div className="flex gap-4">
                      <div className="w-12 h-12 bg-emerald-700/50 rounded-xl flex items-center justify-center shrink-0 border border-emerald-600/30">
                         <Users size={24} className="text-emerald-200" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-xl mb-1 text-white">{t('Direct Impact')}</h4>
                        <p className="text-emerald-100 text-sm">{t('Join a community of 2,000+ donors who are building the future of the Ummah.')}</p>
                      </div>
                    </div>
                  </div>
               </div>
             </div>
          </div>
        </section>

        {/* --- WHY SUPPORT US / IMPACT --- */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-3xl mx-auto mb-16">
              <div className="inline-block bg-teal-50 border border-teal-100 text-teal-700 rounded-full shadow-sm text-xs font-bold px-4 py-1.5 mb-4 uppercase tracking-wide">
                 Make an Impact
              </div>
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-6">Why Your Donation Matters</h2>
              <p className="text-slate-600 text-lg">
                Jamia Sher-e-Rabbani relies on the generous contributions of the community to provide free education, accommodation, and meals to hundreds of deserving students. Your support acts as a continuous charity (Sadaqah Jariyah).
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="bg-white p-8 border border-slate-100 flex flex-col transition-all duration-300 transform hover:-translate-y-2 rounded-2xl shadow-sm border-t-4 border-t-emerald-400 hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)]"
              >
                <div className="text-emerald-500 mb-6 bg-emerald-50 w-16 h-16 rounded-xl flex items-center justify-center">
                  <BookOpen size={32} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Sponsor a Hafiz</h3>
                <p className="text-sm text-slate-600 flex-1 mb-8">
                  Cover the educational and living expenses of a student memorizing the Holy Quran. You earn a share of the reward for every letter they recite.
                </p>
                <div className="pt-6 border-t border-slate-100 flex items-end gap-2">
                   <div className="text-slate-900 font-semibold text-2xl">Rs. 8,000</div>
                   <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide pb-1">/ month</div>
                </div>
              </motion.div>
              
              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="bg-white p-8 border border-slate-100 flex flex-col transition-all duration-300 transform hover:-translate-y-2 rounded-2xl shadow-sm border-t-4 border-t-amber-400 hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)]"
              >
                <div className="text-amber-500 mb-6 bg-amber-50 w-16 h-16 rounded-xl flex items-center justify-center">
                  <GraduationCap size={32} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Dars-e-Nizami Student</h3>
                <p className="text-sm text-slate-600 flex-1 mb-8">
                  Support a scholar-in-training undergoing the rigorous 8-year Alim course. Invest in the future leaders and teachers of our communities.
                </p>
                <div className="pt-6 border-t border-slate-100 flex items-end gap-2">
                   <div className="text-slate-900 font-semibold text-2xl">Rs. 12,000</div>
                   <div className="text-xs font-semibold text-slate-500 uppercase tracking-wide pb-1">/ month</div>
                </div>
              </motion.div>

              <motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="bg-white p-8 border border-slate-100 flex flex-col transition-all duration-300 transform hover:-translate-y-2 rounded-2xl shadow-sm border-t-4 border-t-blue-400 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)]"
              >
                <div className="text-blue-500 mb-6 bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center">
                  <Building2 size={32} />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 mb-3">Campus Expansion</h3>
                <p className="text-sm text-slate-600 flex-1 mb-8">
                  Contribute to the construction of new classrooms, library expansion, and boarding facilities to accommodate our growing student body.
                </p>
                <div className="pt-6 border-t border-slate-100 flex items-end gap-2">
                   <div className="text-slate-900 font-semibold text-2xl">Any Amount</div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* --- FAQ/SUPPORT SECTION --- */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
             <div className="max-w-4xl mx-auto bg-white border border-slate-100 p-10 md:p-16 text-center rounded-3xl shadow-xl shadow-teal-500/5">
               <h2 className="text-3xl font-semibold mb-6 text-slate-900">{t('Questions about your donation?')}</h2>
               <p className="text-slate-600 mb-10 text-lg max-w-2xl mx-auto">
                 {t('Our accounts team is available to assist you with any queries regarding payment methods or tax-deductible receipts.')}
               </p>
               <div className="flex flex-col sm:flex-row justify-center gap-4">
                 <Link href="/contact" className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold rounded-full shadow-md transition-all transform hover:-translate-y-1">
                   {t('Contact accounts')}
                 </Link>
                 <Link href="/about" className="px-8 py-3 bg-white text-slate-700 font-semibold border border-slate-200 hover:bg-white transition-colors">
                   {t('Read our mission')}
                 </Link>
               </div>
             </div>
          </div>
        </section>

      </main>
      <Footer />
    </>
  );
}
