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
      <div className="min-h-screen bg-[#faf9f8] flex flex-col font-urdu" dir="rtl">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <div className="w-10 h-10 border-4 border-emerald-600/20 border-t-emerald-700 rounded-full animate-spin"></div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-[#faf9f8] flex flex-col font-urdu" dir="rtl">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
          <div className="w-20 h-20 bg-rose-50 text-rose-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm">
            <ShieldCheck size={40} />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold text-[#323130] mb-2 leading-[2.1]">کوئی ریکارڈ نہیں ملا</h1>
          <p className="text-[#605e5c] max-w-md text-base leading-[2.2]">
            اس یو آر ایل کے مطابق باضابطہ انٹرن شپ کا کوئی ریکارڈ نہیں ملا۔ براہ کرم لنک کی تصدیق کریں یا جامعہ انتظامیہ سے رابطہ کریں۔
          </p>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f8] flex flex-col font-urdu" dir="rtl">
      <Head>
        <title>{profile.name} - تصدیقِ انٹرن شپ سرٹیفکیٹ | جامعہ شیرِ ربانی</title>
      </Head>
      <Header />
      
      <main className="flex-1 pb-16">
        
        {/* Header */}
        <div className="bg-white border-b border-[#edebe9]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              
              <div className="flex items-start gap-6">
                {/* Profile Square Initials */}
                <div className="w-20 h-20 bg-emerald-700 text-white text-3xl font-bold flex items-center justify-center shrink-0 shadow-md rounded-2xl">
                   {profile.name.charAt(0)}
                </div>
                
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-700 text-xs font-bold rounded-full border border-emerald-200 mb-3 leading-[2.0]">
                    <CheckCircle2 size={14} /> تصدیق شدہ پروفائل (Verified Profile)
                  </div>
                  <h1 className="text-3xl font-bold text-[#323130] leading-tight mb-1">{profile.name}</h1>
                  <p className="text-[#605e5c] text-lg leading-[2.0]">{profile.domain} انٹرن شپ</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3">
                <button onClick={() => window.print()} className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white text-sm font-bold transition-colors flex items-center gap-2 rounded-md shadow-md leading-[2.0]">
                   <Download size={16} /> پی ڈی ایف محفوظ کریں
                </button>
              </div>

            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            
            {/* Sidebar: Profile Details */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-white p-6 border border-[#edebe9] shadow-md rounded-2xl">
                <h2 className="text-lg font-bold text-[#323130] mb-5 border-b border-[#edebe9] pb-3 leading-[2.0]">امیدوار کی تفصیلات</h2>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-xs font-bold text-[#605e5c] mb-1 flex items-center gap-1.5 leading-[2.0]">
                      <User size={14} className="text-emerald-700" /> قومی شناختی کارڈ / ب فارم
                    </p>
                    <p className="text-[#323130] font-mono font-bold" dir="ltr">{profile.cnic}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-bold text-[#605e5c] mb-1 flex items-center gap-1.5 leading-[2.0]">
                      <BookOpen size={14} className="text-emerald-700" /> تعلیمی ادارہ / یونیورسٹی
                    </p>
                    <p className="text-[#323130] font-bold leading-[2.0]">{profile.university}</p>
                  </div>
                  
                  <div>
                    <p className="text-xs font-bold text-[#605e5c] mb-1 flex items-center gap-1.5 leading-[2.0]">
                      <Calendar size={14} className="text-emerald-700" /> تاریخِ اجراء
                    </p>
                    <p className="text-[#323130] font-bold leading-[2.0]">{new Date(profile.issueDate).toLocaleDateString('ur-PK', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-emerald-800 to-teal-900 text-white p-6 shadow-md rounded-2xl">
                <ShieldCheck size={28} className="mb-3 text-emerald-300" />
                <h3 className="font-bold text-lg mb-2 leading-[2.0]">باضابطہ سرکاری ریکارڈ</h3>
                <p className="text-sm text-emerald-100 leading-[2.2]">
                  یہ صفحہ جامعہ شیرِ ربانی کی جانب سے باضابطہ الیکٹرانک تصدیق ہے۔ یہاں ظاہر کردہ تمام اسناد و کوائف جامعہ انتظامیہ کی جانب سے مصدقہ ہیں۔
                </p>
              </div>
            </div>

            {/* Documents Grid */}
            <div className="lg:col-span-8">
               <h2 className="text-xl font-bold text-[#323130] mb-6 leading-[2.0]">تصدیق شدہ اسناد و دستاویزات</h2>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 
                 {/* Internship Letter */}
                 {profile.documents?.internshipLetter && (
                   <div className="bg-white border border-[#edebe9] hover:shadow-lg transition-shadow rounded-2xl overflow-hidden group">
                     <div className="p-4 border-b border-[#edebe9] flex justify-between items-center bg-[#f3f2f1]/50">
                       <div className="flex items-center gap-2">
                         <FileText size={18} className="text-emerald-700" />
                         <span className="font-bold text-[#323130] text-sm leading-[2.0]">انٹرن شپ لیٹر</span>
                       </div>
                       <a href={profile.documents.internshipLetter} target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline text-xs font-bold flex items-center gap-1 leading-[2.0]">
                         دیکھیں <ExternalLink size={12} />
                       </a>
                     </div>
                     <div className="relative aspect-[1/1.2] bg-[#faf9f8] cursor-pointer border-8 border-white" onClick={() => window.open(profile.documents.internshipLetter, '_blank')}>
                       <Image src={profile.documents.internshipLetter} alt="انٹرن شپ لیٹر" layout="fill" objectFit="contain" className="bg-white border border-[#edebe9] shadow-sm" />
                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                     </div>
                   </div>
                 )}

                 {/* Experience Certificate */}
                 {profile.documents?.certificate && (
                   <div className="bg-white border border-[#edebe9] hover:shadow-lg transition-shadow rounded-2xl overflow-hidden group">
                     <div className="p-4 border-b border-[#edebe9] flex justify-between items-center bg-[#f3f2f1]/50">
                       <div className="flex items-center gap-2">
                         <Award size={18} className="text-amber-600" />
                         <span className="font-bold text-[#323130] text-sm leading-[2.0]">تجربہ سرٹیفکیٹ</span>
                       </div>
                       <a href={profile.documents.certificate} target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline text-xs font-bold flex items-center gap-1 leading-[2.0]">
                         دیکھیں <ExternalLink size={12} />
                       </a>
                     </div>
                     <div className="relative aspect-[1/1.2] bg-[#faf9f8] cursor-pointer border-8 border-white" onClick={() => window.open(profile.documents.certificate, '_blank')}>
                       <Image src={profile.documents.certificate} alt="سرٹیفکیٹ" layout="fill" objectFit="contain" className="bg-white border border-[#edebe9] shadow-sm" />
                       <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors"></div>
                     </div>
                   </div>
                 )}

                 {/* Recommendation Letter */}
                 {profile.documents?.recommendation && (
                   <div className="bg-white border border-[#edebe9] hover:shadow-lg transition-shadow rounded-2xl overflow-hidden group">
                     <div className="p-4 border-b border-[#edebe9] flex justify-between items-center bg-[#f3f2f1]/50">
                       <div className="flex items-center gap-2">
                         <FileText size={18} className="text-blue-700" />
                         <span className="font-bold text-[#323130] text-sm leading-[2.0]">سفارشی خط (ریکمنڈیشن)</span>
                       </div>
                       <a href={profile.documents.recommendation} target="_blank" rel="noreferrer" className="text-emerald-700 hover:underline text-xs font-bold flex items-center gap-1 leading-[2.0]">
                         دیکھیں <ExternalLink size={12} />
                       </a>
                     </div>
                     <div className="relative aspect-[1/1.2] bg-[#faf9f8] cursor-pointer border-8 border-white" onClick={() => window.open(profile.documents.recommendation, '_blank')}>
                       <Image src={profile.documents.recommendation} alt="ریکمنڈیشن لیٹر" layout="fill" objectFit="contain" className="bg-white border border-[#edebe9] shadow-sm" />
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