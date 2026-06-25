'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Landmark, UploadCloud, FileText, CheckCircle } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function DonationPortal() {
  const { t } = useTranslation();
  const params = useParams();
  const categorySlug = params.category as string;
  const [mounted, setMounted] = React.useState(false);

  const [formData, setFormData] = useState({
    fullName: '',
    fatherName: '',
    mobileNumber: '',
    email: '',
    city: '',
    amount: '',
    purpose: '',
    remarks: ''
  });
  const [receiptImage, setReceiptImage] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [refNo, setRefNo] = useState('');

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="min-h-screen bg-slate-50 flex flex-col"><Header /><main className="flex-1" /><Footer /></div>;

  const getPortalInfo = () => {
    switch (categorySlug) {
      case 'student-sponsorship':
        return {
          title: t('Student Sponsorship Portal'),
          features: [t('Student Sponsorship Details'), t('Sponsorship Packages'), t('Monthly Sponsorship'), t('Yearly Sponsorship')]
        };
      case 'zakat-fund':
        return {
          title: t('Zakat Fund Portal'),
          features: [t('Zakat Information'), t('Eligible Categories'), t('Zakat Donation Form')]
        };
      case 'campus-development':
        return {
          title: t('Campus Development Portal'),
          features: [t('Development Projects'), t('Construction Needs'), t('Donation Form')]
        };
      case 'sadaqah-jariyah':
        return {
          title: t('Sadaqah Jariyah Portal'),
          features: [t('Ongoing Charity Projects'), t('Reward Information'), t('Donation Form')]
        };
      default:
        return { title: t('Donation Portal'), features: [] };
    }
  };

  const info = getPortalInfo();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setReceiptImage(event.target?.result as string);
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const payload = { ...formData, receiptImage, category: info.title };
      const res = await fetch('/api/donations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setRefNo(data.refNo);
        setSuccess(true);
      } else {
        alert(data.error || 'Failed to submit donation');
      }
    } catch (error) {
      console.error(error);
      alert('Error submitting donation');
    }
    setLoading(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50 text-[#242424]">
      <Header />
      <main className="flex-1 py-12 px-6">
        <div className="max-w-5xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-10 text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-emerald-800 mb-4">{info.title}</h1>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-emerald-700 font-semibold">
              {info.features.map((f, i) => (
                <span key={i} className="bg-emerald-100 px-3 py-1 rounded-full">{f}</span>
              ))}
            </div>
          </motion.div>

          {success ? (
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white p-10 rounded-2xl shadow-lg text-center">
              <CheckCircle size={64} className="text-emerald-500 mx-auto mb-6" />
              <h2 className="text-3xl font-bold mb-4">{t('Jazakallah Khair!')}</h2>
              <p className="text-gray-600 mb-6">{t('Your donation has been received successfully.')}</p>
              <div className="bg-emerald-50 p-6 rounded-lg inline-block text-left mb-6">
                <p className="text-sm text-emerald-800 mb-1">{t('Reference Number')}</p>
                <p className="text-2xl font-mono font-bold text-emerald-900">{refNo}</p>
              </div>
              <div>
                <button onClick={() => window.location.reload()} className="px-6 py-2 bg-emerald-700 text-white rounded font-semibold hover:bg-emerald-800 transition-colors">
                  {t('Submit Another Donation')}
                </button>
              </div>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="lg:col-span-3">
                <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg">
                  <h3 className="text-2xl font-semibold mb-6 pb-4 border-b">{t('Donation Form')}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-semibold mb-2">{t('Full Name')} *</label>
                      <input required type="text" className="w-full border p-3 rounded bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none" value={formData.fullName} onChange={e => setFormData({...formData, fullName: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">{t('Father Name')} *</label>
                      <input required type="text" className="w-full border p-3 rounded bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none" value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">{t('City (Optional)')}</label>
                      <input type="text" className="w-full border p-3 rounded bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none" value={formData.city} onChange={e => setFormData({...formData, city: e.target.value})} />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">{t('Donation Purpose')} *</label>
                      <input required type="text" placeholder={t('e.g. Zakat, General Donation, etc.')} className="w-full border p-3 rounded bg-slate-50 focus:ring-2 focus:ring-emerald-500 outline-none" value={formData.purpose} onChange={e => setFormData({...formData, purpose: e.target.value})} />
                    </div>
                  </div>

                  <div className="mb-8 p-6 bg-slate-50 rounded-xl border border-dashed border-emerald-300 text-center">
                    <FileText className="mx-auto text-emerald-500 mb-3" size={32} />
                    <label className="block text-sm font-semibold mb-2">{t('Upload Payment Proof')} *</label>
                    <p className="text-xs text-gray-500 mb-4">{t('Bank Receipt, Screenshot, or Payment Slip')}</p>
                    <input required type="file" accept="image/*" onChange={handleFileChange} className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100" />
                    {receiptImage && <img src={receiptImage} alt="Receipt Preview" className="mt-4 mx-auto max-h-32 rounded shadow-sm border" />}
                  </div>

                  <button disabled={loading} type="submit" className="w-full bg-emerald-700 text-white font-bold text-lg py-4 rounded hover:bg-emerald-800 transition-colors disabled:opacity-50 flex items-center justify-center gap-2">
                    {loading ? t('Submitting...') : <><UploadCloud size={20} /> {t('Submit Donation')}</>}
                  </button>
                </form>
              </div>

              <div className="lg:col-span-2">
                <div className="bg-emerald-900 text-white p-8 rounded-2xl shadow-lg sticky top-8">
                  <div className="flex items-center gap-3 text-emerald-300 mb-6">
                    <Landmark size={32} strokeWidth={1.5} />
                    <h2 className="text-2xl font-semibold">{t('Payment Information')}</h2>
                  </div>
                  <p className="text-emerald-100 mb-8 text-sm leading-relaxed">
                    {t('Please transfer your donation to the official bank account below before submitting this form.')}
                  </p>
                  
                  <div className="space-y-6">
                    <div className="p-5 bg-white/10 rounded border border-white/20 backdrop-blur-sm">
                      <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">{t('Bank')}</div>
                      <div className="text-lg font-semibold mb-4">Meezan Bank</div>
                      
                      <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">{t('Account Title')}</div>
                      <div className="text-sm font-semibold mb-4">Muhammad Ahmad (Asaan Account)</div>
                      
                      <div className="text-xs font-bold text-emerald-400 uppercase tracking-widest mb-1">{t('Account Number')}</div>
                      <div className="text-xl font-mono font-bold tracking-wider text-emerald-300">98690112101313</div>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-xs text-emerald-200/60 leading-relaxed text-center">
                    {t('Your donations are processed securely and handled with strict adherence to Islamic principles.')}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
