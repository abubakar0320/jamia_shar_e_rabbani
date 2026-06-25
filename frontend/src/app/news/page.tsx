'use client';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { Calendar, ChevronRight, Share2, Search } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import OptimizedImage from '@/components/OptimizedImage';

interface NewsItem {
  id: number;
  date: string;
  title: string;
  desc: string;
  image?: string;
}
export default function News() {
  const { t } = useTranslation();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!mounted) return;
    fetch('http://localhost:5000/api/news')
      .then(res => res.json())
      .then(data => {
        setNews(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching news:', err);
        setLoading(false);
      });
  }, [mounted]);

  if (!mounted) {
    return (
      <div className="flex flex-col min-h-screen bg-white">
        <Header />
        <main className="flex-1" />
        <Footer />
      </div>
    );
  }

  const getNewsImage = (id: number) => {
    return '/images/mahfil.png';
  };

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
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 drop-shadow-sm mb-6">
                   {t('News & Announcements')}
                </h1>
                <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                   {t('Stay up to date with the latest events, academic achievements, and community initiatives at Jamia Sher-e-Rabbani.')}
                </p>
             </motion.div>
          </div>
        </section>

        {/* --- NEWS GRID --- */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center mb-12 gap-6">
              <h2 className="text-3xl font-semibold text-slate-900">{t('Latest Stories')}</h2>
              <div className="relative w-full md:w-96">
                <input 
                  type="text" 
                  placeholder={t('Search news...')} 
                  className="w-full pl-10 pr-4 py-2 border border-slate-200 focus:border-blue-700 focus:ring-1 focus:ring-blue-700 outline-none transition-colors"
                />
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              </div>
            </div>
            
            {loading ? (
              <div className="text-center py-32">
                <div className="inline-block w-8 h-8 border-4 border-slate-100 border-t-rose-500 rounded-full animate-spin"></div>
                <div className="mt-4 text-sm font-semibold text-slate-600 uppercase">{t('Loading Articles')}</div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {news.map((item, i) => (
                  <motion.div 
                     key={item.id} 
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ delay: i * 0.1, duration: 0.5 }}
                     className={`flex flex-col bg-white border shadow-sm transition-all duration-300 transform hover:-translate-y-2 group rounded-2xl overflow-hidden ${i%4===0?"border-rose-100 hover:border-rose-400 hover:shadow-[0_10px_30px_rgba(244,63,94,0.2)]":i%4===1?"border-amber-100 hover:border-amber-400 hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]":i%4===2?"border-emerald-100 hover:border-emerald-400 hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]":"border-blue-100 hover:border-blue-400 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)]"}`}
                  >
                    <div className="aspect-[4/3] relative bg-slate-50 overflow-hidden">
                      <OptimizedImage 
                        src="/images/mahfil.png" 
                        alt={item.title} 
                        fill
                        section="news"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
                      />
                    </div>
                    
                    <div className="p-6 flex flex-col flex-1">
                      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 mb-3 uppercase tracking-wide">
                        <Calendar size={14} />
                        {t(item.date)}
                      </div>
                      <h3 className={`text-xl font-bold mb-3 transition-colors ${i%4===0?"group-hover:text-rose-600":i%4===1?"group-hover:text-amber-600":i%4===2?"group-hover:text-emerald-600":"group-hover:text-blue-600"}`}>
                        {t(item.title)}
                      </h3>
                      <p className="text-sm text-slate-600 mb-6 flex-1 line-clamp-3">
                        {t(item.desc)}
                      </p>
                      <div className="flex justify-between items-center mt-auto pt-4 border-t border-slate-100">
                        <Link 
                          href="#" 
                          className={`font-bold text-sm hover:underline flex items-center ${i%4===0?"text-rose-600":i%4===1?"text-amber-600":i%4===2?"text-emerald-600":"text-blue-600"}`}
                        >
                          {t('Read article')} <ChevronRight size={16} className="ml-1" />
                        </Link>
                        <button className={`transition-colors ${i%4===0?"text-slate-400 hover:text-rose-500":i%4===1?"text-slate-400 hover:text-amber-500":i%4===2?"text-slate-400 hover:text-emerald-500":"text-slate-400 hover:text-blue-500"}`}>
                          <Share2 size={18} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* --- FEATURED HIGHLIGHT --- */}
        <section className="py-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white border-b border-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-16 items-center">
              <div className="relative aspect-video md:aspect-[4/3] bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl">
                <OptimizedImage 
                  src="/images/WhatsApp 1.jpeg" 
                  alt="Featured Highlight" 
                  fill
                  section="hero"
                  className="object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-80" />
                <div className="absolute bottom-8 left-8 right-8">
                  <div className="inline-block bg-gradient-to-r from-rose-500 to-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white mb-3 rounded-full shadow-lg">
                    Exclusive Coverage
                  </div>
                  <h3 className="text-3xl md:text-4xl font-semibold text-white">
                    Annual Graduation Ceremony 2026
                  </h3>
                </div>
              </div>
              
              <div>
                <h2 className="text-3xl md:text-4xl font-semibold text-white mb-6">Celebrating Academic Brilliance</h2>
                <p className="text-gray-300 text-lg mb-8">
                  Join us as we look back at the highlights of this year's convocation. Over 500 students completed their foundational and advanced studies, marking a new milestone in our institution's history.
                </p>
                <div className="border-l-4 border-rose-500 pl-6 my-8">
                   <p className="italic text-gray-300 text-xl mb-4">
                     "The pursuit of knowledge is a lifelong journey. Today, you do not just graduate; you become ambassadors of light."
                   </p>
                   <p className="text-sm font-semibold text-slate-400 uppercase tracking-wide">— Principal's Address</p>
                </div>
                <button className="px-6 py-3 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-bold rounded-full shadow-lg shadow-rose-500/30 transition-all transform hover:-translate-y-1 flex items-center">
                  Read Full Story <ChevronRight size={18} className="ml-2" />
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* --- UPCOMING EVENTS --- */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-semibold text-slate-900 mb-4">Upcoming Events</h2>
                <p className="text-slate-600 text-lg">Mark your calendars for these important institutional gatherings and seminars.</p>
              </div>
              <Link href="#" className="inline-flex items-center px-6 py-2 border border-slate-200 text-slate-700 hover:border-blue-700 hover:text-blue-700 font-semibold transition-colors bg-white">
                View Full Calendar <ChevronRight size={16} className="ml-2" />
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {[
                { date: "15", month: "AUG", title: "New Academic Year Orientation", desc: "Welcoming the batch of 2026-27 with comprehensive guidelines and campus tours." },
                { date: "02", month: "SEP", title: "Seerah Conference 2026", desc: "A day-long seminar exploring the life of the Prophet ﷺ and its modern applications." },
                { date: "20", month: "OCT", title: "Inter-Madrasa Qira'at Competition", desc: "Annual recitation competition featuring top students from across the region." }
              ].map((event, idx) => (
                <div key={idx} className={`bg-white border shadow-sm p-8 flex flex-col transition-all duration-300 transform hover:-translate-y-2 rounded-2xl ${idx===0?"border-rose-100 hover:border-rose-400 hover:shadow-[0_10px_30px_rgba(244,63,94,0.2)]":idx===1?"border-amber-100 hover:border-amber-400 hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]":"border-emerald-100 hover:border-emerald-400 hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]"}`}>
                  <div className="flex items-start gap-6 mb-6">
                    <div className="bg-white border border-slate-100 w-20 h-20 flex flex-col items-center justify-center shrink-0">
                      <span className={`text-2xl font-bold leading-none mb-1 ${idx===0?"text-rose-600":idx===1?"text-amber-600":"text-emerald-600"}`}>{event.date}</span>
                      <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide">{event.month}</span>
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900 text-lg leading-tight">{event.title}</h4>
                    </div>
                  </div>
                  <p className="text-slate-600 flex-1 mb-8">{event.desc}</p>
                  <button className="w-full py-3 bg-slate-50 text-slate-700 font-semibold hover:bg-gray-200 transition-colors">
                    Add to Calendar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- NEWSLETTER SECTION --- */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 text-white flex flex-col lg:flex-row items-center rounded-3xl shadow-xl overflow-hidden">
                <div className="flex-1 p-10 md:p-16">
                    <h2 className="text-3xl md:text-4xl font-semibold mb-4">{t('Stay Connected')}</h2>
                    <p className="text-fuchsia-100 mb-8 text-lg">
                    {t('Subscribe to our monthly newsletter to receive the latest updates, event invitations, and educational resources directly in your inbox.')}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-lg">
                    <input 
                        type="email" 
                        placeholder={t('Enter your email')} 
                        className="flex-1 px-4 py-3 bg-white text-slate-900 placeholder-gray-500 outline-none focus:ring-2 focus:ring-fuchsia-400 rounded-l-xl"
                    />
                    <button className="bg-white text-fuchsia-600 px-8 py-3 font-bold hover:bg-fuchsia-50 transition-colors whitespace-nowrap rounded-r-xl shadow-md">
                        {t('Subscribe')}
                    </button>
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
