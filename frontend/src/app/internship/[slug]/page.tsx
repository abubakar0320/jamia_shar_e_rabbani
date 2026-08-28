'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { FileText, Award, CheckCircle2, User, BookOpen, Calendar, ShieldCheck, Download, ExternalLink } from 'lucide-react';
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
      <div className="min-h-screen bg-[#faf9f8] flex flex-col font-sans">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-[#0078d4]/20 border-t-[#0078d4] rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#faf9f8] flex flex-col font-sans">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-20 h-20 bg-red-50 text-[#d13438] rounded-none flex items-center justify-center mb-6">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-2xl font-semibold text-[#323130] mb-2">{t('Record Not Found')}</h1>
          <p className="text-[#605e5c] max-w-md text-sm">
            {t("We couldn't find an official internship record matching this URL. Please verify the URL or contact administration.")}
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f8] flex flex-col font-sans">
      <Head>
        <title>{profile.name} - {t('Internship Verification')} | Jamia Shar-e-Rabbani</title>
      </Head>
      <Header />
      
      <main className="flex-1 pb-16">
        
        {/* Fluent Design Style Header */}
        <div className="bg-white border-b border-[#edebe9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              
              <div className="flex items-start gap-6">
                {/* Profile Square Initials (Microsoft Style) */}
                <div className="w-20 h-20 bg-[#0078d4] text-white text-3xl font-semibold flex items-center justify-center shrink-0 shadow-sm">
                   {profile.name.charAt(0).toUpperCase()}
                </div>
                
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-[#dff6dd] text-[#107c41] text-xs font-semibold uppercase tracking-wider mb-3">
                    <CheckCircle2 size={14} /> {t('Verified Profile')}
                  </div>
                  <h1 className="text-3xl font-semibold text-[#323130] leading-tight mb-1">{profile.name}</h1>
                  <p className="text-[#605e5c] text-lg">{profile.domain} {t('Internship')}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button onClick={() => window.print()} className="px-4 py-2 bg-white border border-[#8a8886] hover:bg-[#f3f2f1] text-[#323130] text-sm font-semibold transition-colors flex items-center gap-2">
                   <Download size={16} /> Save as PDF
                </button>
              </div>

            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Left Sidebar: Profile Details */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 border border-[#edebe9] shadow-sm">
                <h2 className="text-lg font-semibold text-[#323130] mb-5 border-b border-[#edebe9] pb-3">{t('Trainee Information')}</h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-semibold text-[#605e5c] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <User size={14} /> {t('CNIC / ID')}
                    </p>
                    <p className="text-[#323130] font-medium">{profile.cnic}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-semibold text-[#605e5c] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <BookOpen size={14} /> {t('Institution')}
                    </p>
                    <p className="text-[#323130] font-medium">{profile.university}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-semibold text-[#605e5c] uppercase tracking-wider mb-1 flex items-center gap-1.5">
                      <Calendar size={14} /> {t('Issue Date')}
                    </p>
                    <p className="text-[#323130] font-medium">{new Date(profile.issueDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-[#0078d4] text-white p-6 shadow-sm">
                <ShieldCheck size={24} className="mb-3 opacity-90" />
                <h3 className="font-semibold text-lg mb-2">{t('Official Record')}</h3>
                <p className="text-sm text-blue-100 leading-relaxed">
                  {t('This page serves as an official electronic verification. The documents displayed here are authenticated by the administration of Jamia Shar-e-Rabbani.')}
                </p>
              </div>
            </div>

            {/* Right Side: Documents Grid */}
            <div className="lg:col-span-8">
               <h2 className="text-xl font-semibold text-[#323130] mb-6">{t('Verified Documents')}</h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 
                 {/* Internship Letter */}
                 {profile.documents?.internshipLetter && (
                   <div className="bg-white border border-[#edebe9] hover:shadow-md transition-shadow group">
                     <div className="p-4 border-b border-[#edebe9] flex justify-between items-center bg-[#f3f2f1]/50">
                       <div className="flex items-center gap-2">
                         <FileText size={18} className="text-[#0078d4]" />
                         <span className="font-semibold text-[#323130] text-sm">{t('Internship Letter')}</span>
                       </div>
                       <a href={profile.documents.internshipLetter} target="_blank" rel="noreferrer" className="text-[#0078d4] hover:underline text-xs flex items-center gap-1">
                         {t('View')} <ExternalLink size={12} />
                       </a>
                     </div>
                     <div className="relative aspect-[1/1.2] bg-[#faf9f8] cursor-pointer border-8 border-white" onClick={() => window.open(profile.documents.internshipLetter, '_blank')}>
                       <Image src={profile.documents.internshipLetter} alt="Internship Letter" layout="fill" objectFit="contain" className="bg-white border border-[#edebe9] shadow-sm" />
                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                     </div>
                   </div>
                 )}

                 {/* Experience Certificate */}
                 {profile.documents?.certificate && (
                   <div className="bg-white border border-[#edebe9] hover:shadow-md transition-shadow group">
                     <div className="p-4 border-b border-[#edebe9] flex justify-between items-center bg-[#f3f2f1]/50">
                       <div className="flex items-center gap-2">
                         <Award size={18} className="text-[#d83b01]" />
                         <span className="font-semibold text-[#323130] text-sm">{t('Experience Certificate')}</span>
                       </div>
                       <a href={profile.documents.certificate} target="_blank" rel="noreferrer" className="text-[#0078d4] hover:underline text-xs flex items-center gap-1">
                         {t('View')} <ExternalLink size={12} />
                       </a>
                     </div>
                     <div className="relative aspect-[1/1.2] bg-[#faf9f8] cursor-pointer border-8 border-white" onClick={() => window.open(profile.documents.certificate, '_blank')}>
                       <Image src={profile.documents.certificate} alt="Certificate" layout="fill" objectFit="contain" className="bg-white border border-[#edebe9] shadow-sm" />
                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                     </div>
                   </div>
                 )}

                 {/* Recommendation Letter */}
                 {profile.documents?.recommendation && (
                   <div className="bg-white border border-[#edebe9] hover:shadow-md transition-shadow group">
                     <div className="p-4 border-b border-[#edebe9] flex justify-between items-center bg-[#f3f2f1]/50">
                       <div className="flex items-center gap-2">
                         <FileText size={18} className="text-[#107c41]" />
                         <span className="font-semibold text-[#323130] text-sm">{t('Recommendation Letter')}</span>
                       </div>
                       <a href={profile.documents.recommendation} target="_blank" rel="noreferrer" className="text-[#0078d4] hover:underline text-xs flex items-center gap-1">
                         {t('View')} <ExternalLink size={12} />
                       </a>
                     </div>
                     <div className="relative aspect-[1/1.2] bg-[#faf9f8] cursor-pointer border-8 border-white" onClick={() => window.open(profile.documents.recommendation, '_blank')}>
                       <Image src={profile.documents.recommendation} alt="Recommendation Letter" layout="fill" objectFit="contain" className="bg-white border border-[#edebe9] shadow-sm" />
                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                     </div>
                   </div>
                 )}

               </div>
            </div>

          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
