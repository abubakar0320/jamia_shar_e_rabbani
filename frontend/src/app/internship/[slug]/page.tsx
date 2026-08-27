'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { FileText, Award, CheckCircle2, User, Phone, BookOpen, Calendar, ShieldCheck } from 'lucide-react';
import Image from 'next/image';
import Head from 'next/head';

export default function InternshipCertificatePage() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`/api/internship-certificates/${slug}`);
        if (res.ok) {
          const data = await res.json();
          setProfile(data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProfile();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-24 h-24 bg-red-100 text-red-500 rounded-full flex items-center justify-center mb-6">
            <ShieldCheck size={48} />
          </div>
          <h1 className="text-3xl font-black text-slate-800 mb-4">{t('Record Not Found')}</h1>
          <p className="text-slate-500 max-w-md">
            {t("We couldn't find an official internship record matching this URL. Please verify the URL or contact administration.")}
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  // Define our custom premium SVGs (Original Icons)
  const OriginalIcons = {
    Badge: (
      <svg viewBox="0 0 64 64" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M32 4l12 12h12v12l12 12-12 12v12H44L32 60 20 48H8V36L-4 24 8 12V0h12L32 4z" fill="#FBBF24" />
        <circle cx="32" cy="32" r="16" fill="#FDE68A" />
        <path d="M26 32l4 4 8-8" fill="none" stroke="#D97706" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    Certificate: (
      <svg viewBox="0 0 64 64" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="12" width="48" height="40" rx="2" fill="#FEF3C7" />
        <path d="M16 22h32M16 28h24M16 34h28M16 40h16" stroke="#D97706" strokeWidth="2" strokeLinecap="round" />
        <circle cx="44" cy="38" r="8" fill="#F59E0B" />
        <path d="M40 44l-4 10h16l-4-10" fill="#B45309" />
      </svg>
    ),
    Letter: (
      <svg viewBox="0 0 64 64" width="24" height="24" xmlns="http://www.w3.org/2000/svg">
        <path d="M10 16h44v32H10z" fill="#E2E8F0" />
        <path d="M14 10h36v20H14z" fill="#FFFFFF" />
        <path d="M20 16h24M20 22h24M20 28h16" stroke="#94A3B8" strokeWidth="2" strokeLinecap="round" />
        <circle cx="32" cy="40" r="6" fill="#EF4444" />
      </svg>
    )
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <Head>
        <title>{profile.name} - {t('Internship Verification')} | Jamia Shar-e-Rabbani</title>
      </Head>
      <Header />
      
      <main className="flex-1 py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Banner */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-t-3xl p-8 md:p-12 text-white relative overflow-hidden shadow-2xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/20 rounded-full blur-3xl mix-blend-screen pointer-events-none"></div>
            
            <div className="relative z-10 flex flex-col md:flex-row items-center md:items-start gap-8">
              {/* Verification Badge */}
              <div className="w-24 h-24 bg-white/10 backdrop-blur-md border border-white/20 rounded-full flex items-center justify-center shrink-0 shadow-lg">
                 <ShieldCheck size={48} className="text-amber-400" />
              </div>
              
              <div className="text-center md:text-left flex-1">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/20 border border-emerald-500/30 text-emerald-300 rounded-full text-xs font-bold uppercase tracking-widest mb-4">
                  <CheckCircle2 size={14} /> {t('Verified Record')}
                </div>
                <h1 className="text-3xl md:text-5xl font-black mb-2">{profile.name}</h1>
                <p className="text-slate-300 text-lg font-medium">{profile.domain} {t('Internship')}</p>
                <div className="mt-6 flex flex-wrap items-center justify-center md:justify-start gap-4">
                   <div className="flex items-center gap-2 text-sm text-slate-300 bg-black/20 px-4 py-2 rounded-lg">
                      <User size={16} className="text-amber-400" /> {profile.cnic}
                   </div>
                   <div className="flex items-center gap-2 text-sm text-slate-300 bg-black/20 px-4 py-2 rounded-lg">
                      <BookOpen size={16} className="text-amber-400" /> {profile.university}
                   </div>
                   <div className="flex items-center gap-2 text-sm text-slate-300 bg-black/20 px-4 py-2 rounded-lg">
                      <Calendar size={16} className="text-amber-400" /> {new Date(profile.issueDate).toLocaleDateString()}
                   </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Certificates Section */}
          <div className="bg-white rounded-b-3xl shadow-xl border-x border-b border-slate-200 p-8 md:p-12">
            <div className="mb-10 text-center">
              <h2 className="text-2xl font-black text-slate-800 mb-3">{t('Official Documents')}</h2>
              <p className="text-slate-500">{t('The following documents are officially issued and verified by Jamia Shar-e-Rabbani.')}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Document 1: Internship Letter */}
              {profile.documents?.internshipLetter && (
                <div className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all">
                  <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                     <h3 className="font-bold text-slate-700 text-sm">{t('Internship Letter')}</h3>
                     {OriginalIcons.Letter}
                  </div>
                  <div className="relative aspect-[3/4] bg-white cursor-pointer" onClick={() => window.open(profile.documents.internshipLetter, '_blank')}>
                    <Image src={profile.documents.internshipLetter} alt="Internship Letter" layout="fill" objectFit="contain" className="group-hover:scale-105 transition-transform duration-500 p-4" />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                       <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-slate-800 px-4 py-2 rounded-full font-bold text-sm shadow-lg transition-opacity">
                         {t('View Document')}
                       </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Document 2: Certificate */}
              {profile.documents?.certificate && (
                <div className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all">
                  <div className="p-4 bg-amber-50 border-b border-amber-100 flex items-center justify-between">
                     <h3 className="font-bold text-amber-800 text-sm">{t('Experience Certificate')}</h3>
                     {OriginalIcons.Certificate}
                  </div>
                  <div className="relative aspect-[3/4] bg-white cursor-pointer" onClick={() => window.open(profile.documents.certificate, '_blank')}>
                    <Image src={profile.documents.certificate} alt="Certificate" layout="fill" objectFit="contain" className="group-hover:scale-105 transition-transform duration-500 p-4" />
                    <div className="absolute inset-0 bg-amber-900/0 group-hover:bg-amber-900/10 transition-colors flex items-center justify-center">
                       <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-slate-800 px-4 py-2 rounded-full font-bold text-sm shadow-lg transition-opacity">
                         {t('View Document')}
                       </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Document 3: Recommendation */}
              {profile.documents?.recommendation && (
                <div className="group bg-slate-50 rounded-2xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all">
                  <div className="p-4 bg-slate-100 border-b border-slate-200 flex items-center justify-between">
                     <h3 className="font-bold text-slate-700 text-sm">{t('Recommendation Letter')}</h3>
                     {OriginalIcons.Badge}
                  </div>
                  <div className="relative aspect-[3/4] bg-white cursor-pointer" onClick={() => window.open(profile.documents.recommendation, '_blank')}>
                    <Image src={profile.documents.recommendation} alt="Recommendation Letter" layout="fill" objectFit="contain" className="group-hover:scale-105 transition-transform duration-500 p-4" />
                    <div className="absolute inset-0 bg-slate-900/0 group-hover:bg-slate-900/10 transition-colors flex items-center justify-center">
                       <span className="opacity-0 group-hover:opacity-100 bg-white/90 text-slate-800 px-4 py-2 rounded-full font-bold text-sm shadow-lg transition-opacity">
                         {t('View Document')}
                       </span>
                    </div>
                  </div>
                </div>
              )}
              
            </div>
          </div>
          
        </div>
      </main>
      <Footer />
    </div>
  );
}
