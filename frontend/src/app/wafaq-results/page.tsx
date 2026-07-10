'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function WafaqResultsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 bg-white border-b border-gray-200 bg-cover bg-center" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.85), rgba(255,255,255,0.85)), url('/ahmad.png')", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4 leading-tight">
              Wafaq-ul-Madaris <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-teal-500">Official Results</span>
            </h1>
            <p className="text-base text-gray-600 max-w-2xl mx-auto">
              Please use the official portal below to check and download your Wafaq-ul-Madaris result card.
            </p>
          </div>
        </div>
      </section>

      {/* External Link Section */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-2xl shadow-xl shadow-emerald-500/10 overflow-hidden border border-emerald-100 text-center p-10 md:p-16 relative">
            <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
            
            <div className="w-20 h-20 bg-emerald-50 border border-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
                <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
            </div>
            
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Official Result Portal</h2>
            <p className="text-gray-600 mb-10 max-w-lg mx-auto text-lg leading-relaxed">
                For security reasons, Wafaq-ul-Madaris does not allow its result portal to be embedded directly into other websites. <br/><br/>
                Please click the button below to securely check your result on their official website.
            </p>
            
            <a 
                href="https://www.wifaqulmadaris.org/result" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-lg font-bold rounded-xl shadow-lg shadow-emerald-600/30 hover:shadow-emerald-600/50 hover:-translate-y-1 transition-all"
            >
                Check Result Now
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="m12 5 7 7-7 7"></path></svg>
            </a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
