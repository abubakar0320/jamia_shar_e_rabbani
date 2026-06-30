'use client';

import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function WafaqResultsPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-24 pb-12 bg-white border-b border-gray-200">
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

      {/* Iframe Section */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white rounded-2xl shadow-xl shadow-gray-200/50 overflow-hidden border border-gray-200 relative" style={{ height: '700px' }}>
            {/* Loading Indicator (will be hidden behind the loaded iframe) */}
            <div className="absolute inset-0 flex items-center justify-center bg-gray-50 z-0">
                <div className="flex flex-col items-center text-gray-500">
                    <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                    <p className="font-semibold text-sm uppercase tracking-widest">Loading Wafaq Portal...</p>
                </div>
            </div>
            
            {/* The actual iframe */}
            <iframe 
                src="https://wafaq.edu.pk/get-your-result" 
                className="w-full h-full relative z-10 border-0"
                title="Wafaq-ul-Madaris Results"
                sandbox="allow-scripts allow-same-origin allow-forms"
            ></iframe>
        </div>
      </main>

      <Footer />
    </div>
  );
}
