'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Book, 
  BookOpen, 
  History, 
  Users, 
  FileText, 
  Clock, 
  Compass,
  ChevronRight,
  Filter,
  ArrowRight
} from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import Image from 'next/image';

// Placeholder Research Data
const RECENT_RESEARCH = [
  { id: 1, title: "The Concept of Ijtihad in Modern Times", author: "Dr. Farooq Ali Rabbani", category: "Fiqh", date: "June 2026" },
  { id: 2, title: "Hadith Methodology: A Comparative Study", author: "Mufti Ali Hamza", category: "Hadith", date: "May 2026" },
  { id: 3, title: "Ethical Dimensions of Islamic Finance", author: "Sheikh Ahmad", category: "Economics", date: "April 2026" },
  { id: 4, title: "Principles of Tafsir in the 21st Century", author: "Dr. Farooq Ali Rabbani", category: "Tafsir", date: "March 2026" },
  { id: 5, title: "Historical Development of Usul al-Fiqh", author: "Mufti Ali Hamza", category: "History", date: "February 2026" }
];

const POPULAR_TOPICS = ["Tafsir al-Jalalayn", "Sahih Bukhari", "Usul al-Fiqh", "Arabic Grammar", "Islamic History", "Seerah", "Fatwa Methodology"];

const FEATURED_COLLECTIONS = [
  { id: 1, title: "Classical Tafsir Library", count: "1,200+ Books", desc: "A comprehensive digital collection of classical exegesis from the 2nd to 10th century AH.", icon: <BookOpen size={24} /> },
  { id: 2, title: "Fatwa Archives", count: "15,000+ Rulings", desc: "Digitized fatwas sorted by category, date, and scholar for easy academic referencing.", icon: <FileText size={24} /> },
  { id: 3, title: "Rare Manuscripts", count: "500+ Scans", desc: "High-resolution scans of rare Islamic manuscripts preserved from global libraries.", icon: <History size={24} /> }
];

const UPCOMING_WEBINARS = [
  { id: 1, title: "Modern Challenges in Islamic Jurisprudence", date: "July 15, 2026", speaker: "Dr. Farooq Ali Rabbani", time: "10:00 AM AST" },
  { id: 2, title: "Authentication of Hadith Networks", date: "July 22, 2026", speaker: "Mufti Ali Hamza", time: "02:00 PM AST" }
];

export default function IslamicResearchCenter() {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState('quran');
  const [searchQuery, setSearchQuery] = useState('');
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const tabs = [
    { id: 'quran', label: t('Quran'), icon: <Book size={18} /> },
    { id: 'hadith', label: t('Hadith'), icon: <History size={18} /> },
    { id: 'tafsir', label: t('Tafsir'), icon: <BookOpen size={18} /> },
    { id: 'library', label: t('Library'), icon: <FileText size={18} /> },
    { id: 'scholars', label: t('Scholar Directory'), icon: <Users size={18} /> },
  ];

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
    <div className="flex flex-col min-h-screen bg-white font-sans text-slate-900">
      <Header />

      <main className="flex-1">
        {/* Hero & Search Section */}
        <section className="bg-white pt-24 pb-20 border-b border-slate-100 relative overflow-hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              
              {/* Left Column: Content */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="lg:col-span-7"
              >
                <div className="inline-block bg-purple-50 border border-purple-200 text-purple-600 rounded-full text-xs font-bold px-4 py-1.5 mb-6 uppercase tracking-wide">
                  Digital Knowledge Hub
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 leading-tight">
                  Islamic Research <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 drop-shadow-sm">& Reference Center</span>
                </h1>
                
                <p className="text-lg text-slate-600 max-w-2xl mb-10">
                  Explore thousands of verified classical texts, fatwas, hadith collections, and contemporary research papers. A dedicated portal for scholars, students, and researchers of Islamic sciences.
                </p>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-8 mb-10">
                  <div className="flex flex-col">
                    <span className="text-3xl font-semibold text-slate-900">50k+</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wide font-semibold mt-1">Digital Manuscripts</span>
                  </div>
                  <div className="w-px h-12 bg-gray-300 hidden sm:block"></div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-semibold text-slate-900">12+</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wide font-semibold mt-1">Specialized Categories</span>
                  </div>
                  <div className="w-px h-12 bg-gray-300 hidden sm:block"></div>
                  <div className="flex flex-col">
                    <span className="text-3xl font-semibold text-slate-900">24/7</span>
                    <span className="text-xs text-slate-500 uppercase tracking-wide font-semibold mt-1">Global Access</span>
                  </div>
                </div>

                {/* Featured Daily Resource */}
                <div className="bg-white border shadow-sm border-rose-100 p-6 flex items-start gap-4 max-w-xl rounded-2xl transform hover:-translate-y-1 transition-all hover:shadow-[0_10px_30px_rgba(244,63,94,0.15)]">
                  <div className="text-rose-500">
                    <BookOpen size={32} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wide block mb-1">Resource of the Day</span>
                    <h4 className="text-slate-900 font-semibold text-lg mb-1">Al-Fiqh al-Islami wa Adillatuh</h4>
                    <p className="text-sm text-slate-600 line-clamp-2">A comprehensive encyclopedia of Islamic jurisprudence by Dr. Wahbah al-Zuhayli, covering comparative fiqh across all major schools of thought.</p>
                    <button className="mt-3 text-sm font-semibold text-rose-600 hover:underline flex items-center">
                      Read Online <ArrowRight className="ml-1" size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Right Column: Search Box */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="lg:col-span-5"
              >
                <div className="bg-white border border-slate-100 p-8 shadow-sm rounded-3xl">
                  <h3 className="text-2xl font-semibold text-slate-900 mb-2">Search Library</h3>
                  <p className="text-slate-600 text-sm mb-6">Find specific books, fatwas, or authors in our database.</p>
                  
                  {/* Advanced Search Bar */}
                  <div className="relative mb-6">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="text-slate-400" size={20} />
                    </div>
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder={t('Search Quran, Hadith, or Books...')}
                      className="w-full pl-11 pr-4 py-3 bg-white border border-slate-200 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-colors text-slate-900"
                    />
                  </div>
                  
                  <button className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-md transition-all">
                    {t('Search')}
                  </button>

                  {/* Popular Topics */}
                  <div className="mt-8 pt-6 border-t border-slate-100">
                    <span className="block text-slate-500 text-xs font-semibold uppercase tracking-wide mb-3">{t('Popular Topics')}</span>
                    <div className="flex flex-wrap gap-2">
                      {POPULAR_TOPICS.map((topic, i) => (
                        <button key={i} className="text-xs font-semibold bg-white hover:bg-slate-50 px-3 py-1.5 border border-slate-100 transition-colors text-slate-700">
                          {topic}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* Content Portal */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-white border border-slate-100 min-h-[600px] flex flex-col">
              
              {/* Portal Navigation */}
              <div className="flex overflow-x-auto border-b border-slate-100 bg-white">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-2 px-6 py-4 text-sm font-semibold whitespace-nowrap border-b-2 transition-colors ${
                      activeTab === tab.id 
                      ? 'border-purple-600 text-purple-600 bg-purple-50 rounded-t-xl' 
                      : 'border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Content Area */}
              <div className="flex-1 p-6 md:p-8">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                      {/* Main Content (Tabs) */}
                      <div className="lg:col-span-2">
                        <div className="flex items-center justify-between mb-6">
                          <h2 className="text-2xl font-semibold text-slate-900">
                            {tabs.find(t => t.id === activeTab)?.label}
                          </h2>
                          <button className="flex items-center gap-2 text-sm font-semibold text-rose-600 hover:underline">
                            <Filter size={16} />
                            Filters
                          </button>
                        </div>

                        {/* Search Placeholders/Empty State */}
                        <div className="p-12 border-2 border-dashed border-slate-200 bg-white flex flex-col items-center justify-center text-center">
                          <div className="text-slate-400 mb-4">
                            {tabs.find(t => t.id === activeTab)?.icon}
                          </div>
                          <h3 className="text-lg font-semibold text-slate-900 mb-2">{t('Ready to Search')}</h3>
                          <p className="text-slate-600 max-w-sm mb-6">
                            {t('Enter keywords above to browse our extensive database of')} {tabs.find(t => t.id === activeTab)?.label} {t('resources.')}
                          </p>
                          <div className="flex flex-wrap justify-center gap-4">
                            <button className="px-6 py-2 bg-white border border-slate-200 text-slate-700 font-semibold hover:bg-white transition-colors">
                              {t('Browse All')}
                            </button>
                            <button className="px-6 py-2 text-blue-700 font-semibold hover:underline">
                              {t('Need Help?')}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Sidebar */}
                      <div className="space-y-10">
                        {/* Quick Tools */}
                        <div className="bg-slate-900 p-6 rounded-2xl shadow-md">
                          <h4 className="font-semibold text-white mb-4">
                            Quick Tools
                          </h4>
                          <div className="space-y-2">
                            <button className="w-full flex items-center justify-between p-3 bg-slate-800 hover:bg-slate-700 transition-colors text-white border border-slate-700">
                              <div className="flex items-center gap-3">
                                <Clock className="text-slate-400" size={18} />
                                <span className="text-sm font-semibold">{t('Prayer Times')}</span>
                              </div>
                              <ChevronRight size={16} className="text-slate-500" />
                            </button>
                            <button className="w-full flex items-center justify-between p-3 bg-slate-800 hover:bg-slate-700 transition-colors text-white border border-slate-700">
                              <div className="flex items-center gap-3">
                                <Compass className="text-slate-400" size={18} />
                                <span className="text-sm font-semibold">{t('Qibla')}</span>
                              </div>
                              <ChevronRight size={16} className="text-slate-500" />
                            </button>
                          </div>
                        </div>

                        {/* Recent Research */}
                        <div>
                          <h4 className="font-semibold text-slate-900 mb-4">
                            {t('Recent Research')}
                          </h4>
                          <div className="space-y-4">
                            {RECENT_RESEARCH.map((item) => (
                              <div key={item.id} className="group cursor-pointer border-b border-slate-100 pb-4 last:border-0">
                                <div className="flex justify-between items-start mb-1">
                                  <div className="text-[10px] font-semibold text-blue-700 uppercase tracking-wide">{item.category}</div>
                                  <div className="text-[10px] text-slate-500">{item.date}</div>
                                </div>
                                <h5 className="font-semibold text-slate-900 group-hover:text-blue-700 transition-colors mb-1">{item.title}</h5>
                                <div className="text-xs text-slate-600">{item.author}</div>
                              </div>
                            ))}
                          </div>
                          <button className="mt-4 flex items-center text-sm font-semibold text-rose-600 hover:underline">
                            View all publications <ArrowRight className="ml-1" size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* --- Featured Collections --- */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <h2 className="text-3xl font-semibold text-slate-900 mb-2">Featured Collections</h2>
                <p className="text-slate-600">Curated digital libraries preserving centuries of Islamic scholarship.</p>
              </div>
              <button className="px-6 py-2 bg-white border-2 border-slate-200 text-slate-700 hover:border-purple-500 hover:text-purple-600 font-bold rounded-full transition-all flex items-center">
                Browse All Collections <ArrowRight className="ml-2" size={16} />
              </button>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
              {FEATURED_COLLECTIONS.map((collection, idx) => (
                <div key={collection.id} className={`bg-white p-4 md:p-8 border shadow-sm flex flex-col transition-all duration-300 transform hover:-translate-y-1 md:hover:-translate-y-2 rounded-xl md:rounded-2xl ${idx===0?"border-rose-100 hover:border-rose-400 hover:shadow-[0_10px_30px_rgba(244,63,94,0.2)]":idx===1?"border-amber-100 hover:border-amber-400 hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]":"border-emerald-100 hover:border-emerald-400 hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]"}`}>
                  <div className={`mb-3 md:mb-6 w-10 h-10 md:w-14 md:h-14 rounded-lg md:rounded-xl flex items-center justify-center shadow-sm border ${idx===0?"bg-rose-50 text-rose-600 border-rose-100":idx===1?"bg-amber-50 text-amber-600 border-amber-100":"bg-emerald-50 text-emerald-600 border-emerald-100"}`}>
                    {React.cloneElement(collection.icon, { className: "w-5 h-5 md:w-6 md:h-6" })}
                  </div>
                  <h3 className="text-sm md:text-xl font-bold text-slate-900 mb-1 md:mb-2">{collection.title}</h3>
                  <div className="text-[9px] md:text-xs font-bold text-slate-500 uppercase tracking-wide mb-2 md:mb-4">
                    {collection.count}
                  </div>
                  <p className="hidden md:block text-sm text-slate-600 flex-1 mb-6">
                    {collection.desc}
                  </p>
                  <button className={`text-[10px] md:text-sm font-bold hover:underline flex items-center mt-auto ${idx===0?"text-rose-600":idx===1?"text-amber-600":"text-emerald-600"}`}>
                    Explore <span className="hidden md:inline ml-1">Archive</span> <ChevronRight className="ml-1 w-3 h-3 md:w-4 md:h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Upcoming Webinars & Lectures --- */}
        <section className="py-16 bg-white border-b border-slate-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold text-slate-900 mb-12 text-center">Academic Events & Webinars</h2>
            
            <div className="max-w-4xl mx-auto space-y-6">
              {UPCOMING_WEBINARS.map((webinar, idx) => (
                <div key={webinar.id} className={`bg-white border shadow-sm p-6 flex flex-col md:flex-row items-center gap-8 rounded-2xl transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 ${idx%2===0?"hover:border-blue-400":"hover:border-purple-400"}`}>
                  {/* Date Badge */}
                  <div className={`flex-shrink-0 w-24 h-24 flex flex-col items-center justify-center border rounded-xl ${idx%2===0?"bg-blue-50 border-blue-100":"bg-purple-50 border-purple-100"}`}>
                    <span className={`font-bold text-sm uppercase ${idx%2===0?"text-blue-600":"text-purple-600"}`}>{webinar.date.split(' ')[0]}</span>
                    <span className="text-3xl font-semibold text-slate-900">{webinar.date.split(' ')[1].replace(',', '')}</span>
                  </div>
                  
                  {/* Details */}
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-xl font-semibold text-slate-900 mb-2">{webinar.title}</h3>
                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 text-sm text-slate-600">
                      <span className="flex items-center gap-1"><Users size={16} /> {webinar.speaker}</span>
                      <span className="hidden md:inline text-gray-300">•</span>
                      <span className="flex items-center gap-1"><Clock size={16} /> {webinar.time}</span>
                    </div>
                  </div>
                  
                  {/* Action */}
                  <div className="flex-shrink-0 w-full md:w-auto mt-6 md:mt-0">
                    <button className={`w-full md:w-auto px-8 py-3 text-white font-bold rounded-xl shadow-md transition-all hover:scale-105 ${idx%2===0?"bg-gradient-to-r from-blue-500 to-indigo-500":"bg-gradient-to-r from-purple-500 to-fuchsia-500"}`}>
                      Register Now
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-10">
              <button className="text-blue-700 font-semibold hover:underline">
                View Past Recordings Archive
              </button>
            </div>
          </div>
        </section>

        {/* Resource Stats */}
        <section className="py-16 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              {[
                { label: "Surahs", count: "114" },
                { label: "Hadith Books", count: "300+" },
                { label: "Islamic Manuscripts", count: "5,000+" },
                { label: "Active Scholars", count: "50+" }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-4xl font-bold mb-1 md:mb-2">{stat.count}</div>
                  <div className="text-[10px] md:text-sm font-bold text-fuchsia-100 uppercase tracking-wide">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
