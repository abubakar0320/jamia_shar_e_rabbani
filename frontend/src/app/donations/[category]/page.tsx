'use client';

import React, { useState } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { motion } from 'framer-motion';
import { Landmark, UploadCloud, FileText, CheckCircle2, Heart, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

export default function DonationPortal() {
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
  const [copiedBank, setCopiedBank] = useState(false);
  const [copiedJazz, setCopiedJazz] = useState(false);
  const [copiedNaya, setCopiedNaya] = useState(false);

  const handleCopy = (text: string, type: 'bank' | 'jazz' | 'naya') => {
    if (typeof window !== 'undefined') {
      navigator.clipboard?.writeText(text);
      if (type === 'bank') {
        setCopiedBank(true);
        setTimeout(() => setCopiedBank(false), 2500);
      } else if (type === 'jazz') {
        setCopiedJazz(true);
        setTimeout(() => setCopiedJazz(false), 2500);
      } else {
        setCopiedNaya(true);
        setTimeout(() => setCopiedNaya(false), 2500);
      }
    }
  };

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col" dir="rtl">
        <Header />
        <main className="flex-1" />
        <Footer />
      </div>
    );
  }

  const getPortalInfo = () => {
    switch (categorySlug) {
      case 'student-sponsorship':
        return {
          title: 'طالب علم کی مکمل کفالت پورٹل',
          badge: 'کفالتِ طلبہ فنڈ',
          features: ['ماہانہ کفالت: ۸,۰۰۰ روپے', 'مکمل رہائش و طعام', 'کتب و تعلیمی اخراجات', 'سالانہ تفصیلی تعلیمی رپورٹ']
        };
      case 'zakat-fund':
        return {
          title: 'مستحقین کے لیے زکوٰۃ فنڈ پورٹل',
          badge: 'شرعی زکوٰۃ فنڈ',
          features: ['۱۰۰٪ مستحق طلبہ پر صرف', 'مفتیانِ کرام کی زیرِ نگرانی', 'شرعی اصولوں کی پاسداری', 'فوری ڈیجیٹل رسید']
        };
      case 'campus-development':
        return {
          title: 'کیمپس توسیع و تعمیراتی فنڈ پورٹل',
          badge: 'تعمیراتی فنڈ',
          features: ['نئے ہاسٹل بلاک کی تعمیر', 'ریسرچ لائبریری ہال', 'کلاس رومز کی توسیع', 'دائمی صدقہ جاریہ']
        };
      case 'sadaqah-jariyah':
        return {
          title: 'دائمی صدقہ جاریہ پورٹل',
          badge: 'صدقہ جاریہ فنڈ',
          features: ['قرآنی نسخہ جات و کتب', 'واٹر فلٹریشن پلانٹ', 'مسجد و درسگاہ کی ضروریات', 'دائمی اجر و ثواب']
        };
      default:
        return { 
          title: 'جامعہ شیرِ ربانی آن لائن عطیات پورٹل', 
          badge: 'عطیات و صدقات',
          features: ['مستحق طلبہ کی امداد', 'مفت تعلیم و ہاسٹل', 'امانت داری و شفافیت'] 
        };
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
        alert(data.error || 'عطیہ جمع کرنے میں خرابی پیش آئی، براہ کرم دوبارہ کوشش فرمائیں۔');
      }
    } catch (error) {
      console.error(error);
      alert('نیٹ ورک یا سرور میں مسئلہ ہے۔ براہ کرم کچھ دیر بعد کوشش کریں۔');
    }
    setLoading(false);
  };

  return (
    <div 
      style={{ 
        backgroundImage: "linear-gradient(rgba(255,255,255,0.92), rgba(255,255,255,0.92)), url('/ahmad.webp')", 
        backgroundSize: "cover", 
        backgroundPosition: "center" 
      }} 
      className="flex flex-col min-h-screen bg-slate-50 text-slate-900 font-urdu"
      dir="rtl"
    >
      <Header />
      <main className="flex-1 py-14 px-4 sm:px-6 lg:px-8 text-right">
        <div className="max-w-5xl mx-auto">
          
          {/* Header Title Section */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 px-4 py-1.5 rounded-full text-emerald-800 text-xs sm:text-sm font-bold mb-4 shadow-sm">
              <Heart className="w-4 h-4 text-emerald-600 fill-emerald-600" />
              <span>{info.badge}</span>
            </div>

            <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-5 leading-[1.9] md:leading-[2.1]">
              {info.title}
            </h1>

            <div className="flex flex-wrap justify-center gap-2.5 text-xs sm:text-sm font-bold">
              {info.features.map((f, i) => (
                <span key={i} className="bg-white border border-emerald-200/90 text-emerald-800 px-3.5 py-1.5 rounded-xl shadow-xs">
                  {f}
                </span>
              ))}
            </div>
          </motion.div>

          {success ? (
            /* Success Confirmation Box */
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} 
              animate={{ scale: 1, opacity: 1 }} 
              className="bg-white p-8 md:p-14 rounded-3xl shadow-xl border border-emerald-200 text-center max-w-2xl mx-auto"
            >
              <CheckCircle2 size={70} className="text-emerald-600 mx-auto mb-6" />
              
              <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4 leading-[1.9]">
                جزاکم اللہ خیراً و احسن الجزاء!
              </h2>
              
              <p className="text-slate-600 mb-8 text-base md:text-lg leading-[2.3]">
                آپ کے عطیہ کی معلومات اور ادائیگی کی رسید کامیابی کے ساتھ موصول ہو گئی ہے۔ ہمارا شعبہ اکاؤنٹس اس کی تصدیق کر کے جلد آپ سے رابطہ کرے گا۔
              </p>

              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl inline-block text-center mb-8 w-full max-w-md">
                <p className="text-xs font-bold text-emerald-800 mb-1">آپ کا تصدیقی حوالہ نمبر (Reference No)</p>
                <p className="text-2xl font-mono font-black text-emerald-900 tracking-wider">{refNo}</p>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <button 
                  onClick={() => window.location.reload()} 
                  className="px-8 py-3.5 bg-emerald-700 text-white rounded-xl font-black hover:bg-emerald-800 transition-colors shadow-md text-base"
                >
                  ایک اور عطیہ جمع کروائیں
                </button>
                <Link 
                  href="/donations" 
                  className="px-8 py-3.5 bg-slate-100 text-slate-700 rounded-xl font-black hover:bg-slate-200 transition-colors text-base"
                >
                  عطیات کے مرکزی صفحہ پر واپس جائیں
                </Link>
              </div>
            </motion.div>
          ) : (
            /* Donation Form & Bank Sidebar Grid */
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
              
              {/* Form Column */}
              <div className="lg:col-span-3">
                <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 md:p-10 rounded-3xl shadow-xl border border-slate-200/90">
                  <div className="border-b border-slate-100 pb-4 mb-6">
                    <span className="text-xs font-bold text-emerald-700">آن لائن تصدیق و اندراج</span>
                    <h3 className="text-2xl font-black text-slate-900 leading-snug">عطیہ فارم و تفصیلات</h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">مکمل نام *</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="اپنا مکمل نام درج کریں..."
                        className="w-full border border-slate-200 p-3.5 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none text-slate-900 text-sm font-medium" 
                        value={formData.fullName} 
                        onChange={e => setFormData({...formData, fullName: e.target.value})} 
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">والد کا نام *</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="والد محترم کا نام..."
                        className="w-full border border-slate-200 p-3.5 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none text-slate-900 text-sm font-medium" 
                        value={formData.fatherName} 
                        onChange={e => setFormData({...formData, fatherName: e.target.value})} 
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">موبائل / واٹس ایپ نمبر *</label>
                      <input 
                        required 
                        type="tel" 
                        placeholder="0300-1234567"
                        className="w-full border border-slate-200 p-3.5 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none text-slate-900 text-sm font-medium text-left font-mono" 
                        value={formData.mobileNumber} 
                        onChange={e => setFormData({...formData, mobileNumber: e.target.value})} 
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">شہر / علاقہ *</label>
                      <input 
                        required
                        type="text" 
                        placeholder="اپنے شہر کا نام..."
                        className="w-full border border-slate-200 p-3.5 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none text-slate-900 text-sm font-medium" 
                        value={formData.city} 
                        onChange={e => setFormData({...formData, city: e.target.value})} 
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">عطیہ کی رقم (پاکستانی روپے) *</label>
                      <input 
                        required 
                        type="number" 
                        placeholder="مثلاً 8000"
                        className="w-full border border-slate-200 p-3.5 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none text-slate-900 text-sm font-bold font-mono text-left" 
                        value={formData.amount} 
                        onChange={e => setFormData({...formData, amount: e.target.value})} 
                      />
                    </div>

                    <div>
                      <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">عطیہ کا مقصد *</label>
                      <input 
                        required 
                        type="text" 
                        placeholder="مثلاً کفالتِ حافظ، زکوٰۃ، تعمیرات..." 
                        className="w-full border border-slate-200 p-3.5 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none text-slate-900 text-sm font-medium" 
                        value={formData.purpose} 
                        onChange={e => setFormData({...formData, purpose: e.target.value})} 
                      />
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-xs sm:text-sm font-bold text-slate-700 mb-2">خصوصی ہدایات یا دعائیہ کلمات (اختیاری)</label>
                    <textarea 
                      rows={2}
                      placeholder="اگر کوئی خاص ہدایت یا ایصالِ ثواب کی نیت ہو تو یہاں تحریر فرمائیں..."
                      className="w-full border border-slate-200 p-3.5 rounded-xl bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 outline-none text-slate-900 text-sm font-medium leading-relaxed"
                      value={formData.remarks}
                      onChange={e => setFormData({...formData, remarks: e.target.value})}
                    />
                  </div>

                  {/* Upload Receipt */}
                  <div className="mb-8 p-6 bg-slate-50 rounded-2xl border-2 border-dashed border-emerald-300 text-center">
                    <FileText className="mx-auto text-emerald-600 mb-3" size={36} />
                    <label className="block text-sm font-bold text-slate-900 mb-1">
                      بینک منتقلی یا ایزی پیسہ / جاز کیش کی رسید اپ لوڈ فرمائیں *
                    </label>
                    <p className="text-xs text-slate-500 mb-4">
                      بینک ڈیپازٹ سلپ، آن لائن ٹرانسفر کا اسکرین شاٹ یا تصدیقی میسج
                    </p>
                    <input 
                      required 
                      type="file" 
                      accept="image/*" 
                      onChange={handleFileChange} 
                      className="text-xs file:ml-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-bold file:bg-emerald-100 file:text-emerald-800 hover:file:bg-emerald-200 cursor-pointer" 
                    />
                    {receiptImage && (
                      <div className="mt-4">
                        <span className="text-xs font-bold text-emerald-700 block mb-2">رسید کا پیش منظر:</span>
                        <img src={receiptImage} alt="رسید کا عکس" className="mx-auto max-h-36 rounded-xl shadow-sm border border-slate-200" />
                      </div>
                    )}
                  </div>

                  <button 
                    disabled={loading} 
                    type="submit" 
                    className="w-full bg-gradient-to-r from-emerald-700 to-teal-700 hover:from-emerald-800 hover:to-teal-800 text-white font-black text-base md:text-lg py-4 rounded-xl shadow-lg shadow-emerald-700/25 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                  >
                    {loading ? 'معلومات ارسال ہو رہی ہیں...' : (
                      <>
                        <UploadCloud size={20} />
                        <span>عطیہ کی معلومات و رسید ارسال کریں</span>
                      </>
                    )}
                  </button>
                </form>
              </div>

              {/* Sidebar Bank Details Column */}
              <div className="lg:col-span-2">
                <div className="bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-900 text-white p-7 sm:p-8 rounded-3xl shadow-xl sticky top-8 border border-emerald-900/50">
                  <div className="flex items-center gap-3 text-amber-400 mb-5">
                    <Landmark size={28} />
                    <h2 className="text-2xl font-black">بینک اکاؤنٹ تفصیلات</h2>
                  </div>

                  <p className="text-emerald-100 mb-6 text-sm leading-[2.2]">
                    فارم پر کرنے سے پہلے براہِ کرم جامعہ کے آفیشل اکاؤنٹ میں رقم منتقل فرما لیں اور اسکرین شاٹ اپنے پاس محفوظ رکھیں۔
                  </p>
                  
                  <div className="bg-white/10 rounded-2xl border border-white/15 divide-y divide-white/10 overflow-hidden backdrop-blur-sm">
                    {/* Bank Name */}
                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 bg-white/5">
                      <span className="text-xs font-bold text-emerald-300">بینک کا نام:</span>
                      <span className="text-sm font-black text-white">میزان بینک (Meezan Bank)</span>
                    </div>

                    {/* Account Title */}
                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <span className="text-xs font-bold text-emerald-300">عنوانِ کھاتہ (Title):</span>
                      <span className="text-sm font-black text-white">Muhammad Ahmad (آسان اکاؤنٹ)</span>
                    </div>

                    {/* Account Number with Copy (Acc ke samny Acc No) */}
                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2 bg-emerald-900/60">
                      <span className="text-xs font-bold text-amber-300">اکاؤنٹ نمبر:</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-base sm:text-lg font-black text-amber-300 tracking-wider">
                          9869 0112 1013 13
                        </span>
                        <button 
                          type="button"
                          onClick={() => handleCopy('98690112101313', 'bank')}
                          className="text-[11px] font-bold bg-amber-400 hover:bg-amber-300 text-slate-950 px-2.5 py-1 rounded-md transition-colors"
                        >
                          {copiedBank ? 'کاپی ہو گیا' : 'کاپی'}
                        </button>
                      </div>
                    </div>

                    {/* JazzCash */}
                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-xs font-bold text-emerald-200">جاز کیش (JazzCash):</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-black text-white">0328 4381 312</span>
                        <button 
                          type="button"
                          onClick={() => handleCopy('03284381312', 'jazz')}
                          className="text-[11px] font-bold bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded transition-colors"
                        >
                          {copiedJazz ? 'کاپی ہو گیا' : 'کاپی'}
                        </button>
                      </div>
                    </div>

                    {/* NayaPay */}
                    <div className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <span className="text-xs font-bold text-emerald-200">نیا پے (NayaPay):</span>
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-sm font-black text-white">0316 4415 465</span>
                        <button 
                          type="button"
                          onClick={() => handleCopy('03164415465', 'naya')}
                          className="text-[11px] font-bold bg-white/20 hover:bg-white/30 text-white px-2 py-0.5 rounded transition-colors"
                        >
                          {copiedNaya ? 'کاپی ہو گیا' : 'کاپی'}
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 pt-5 border-t border-white/10 text-xs text-emerald-200/80 leading-[2.2] flex items-start gap-2">
                    <ShieldCheck size={18} className="shrink-0 text-emerald-400 mt-0.5" />
                    <span>
                      جامعہ شیرِ ربانی آپ کے عطیات کی مکمل امانت داری، شفاف حسابات اور شرعی احکام کی پابندی کی ضامن ہے۔
                    </span>
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
