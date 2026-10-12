'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import OnlinePaymentModal from '@/components/OnlinePaymentModal';
import AdmissionReceiptModal from '@/components/AdmissionReceiptModal';
import { 
  Search, 
  CheckCircle2, 
  Clock, 
  XCircle, 
  AlertCircle, 
  FileText, 
  DollarSign, 
  Share2, 
  Printer, 
  ArrowRight, 
  Phone, 
  GraduationCap, 
  User, 
  Calendar,
  CreditCard
} from 'lucide-react';
import { motion } from 'framer-motion';

function StatusContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';

  const [query, setQuery] = useState(initialQuery);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const fetchStatus = async (searchVal: string) => {
    if (!searchVal.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch('/api/public/track-application', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchVal.trim() })
      });
      const data = await res.json();
      if (res.ok) {
        setResult(data);
      } else {
        setError(data.error || 'No record found with this information.');
      }
    } catch (err) {
      setError('Network error while checking status. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (initialQuery) {
      fetchStatus(initialQuery);
    }
  }, [initialQuery]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchStatus(query);
  };

  const handleWhatsAppShare = () => {
    if (!result) return;
    const text = `السلام علیکم!
*جامعہ شیرِ ربانی (Jamia Sher-e-Rabbani)*
*آن لائن درخواست اسٹیٹس (Live Application Status)*

🧑‍🎓 *طالب علم:* ${result.studentName}
📋 *درخواست نمبر:* ${result.applicationNo}
🧾 *چالان نمبر:* ${result.challanNo}
📚 *کلاس:* ${result.classProgram || result.program}
📊 *موجودہ اسٹیٹس:* ${result.status}
💰 *فیس کی تفصیل:* ${result.fees?.status || 'N/A'} (Rs ${result.fees?.totalAmount || 'N/A'})
${result.rollNo ? `🎓 *رول نمبر:* ${result.rollNo}` : ''}

آن لائن تصدیق کے لیے وزٹ کریں:
https://jamiashererabbani.com/admissions/status?q=${result.applicationNo}`;

    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <main className="flex-1 min-h-screen bg-slate-50 font-sans pb-20">
      
      {/* Hero Search Section */}
      <section className="bg-gradient-to-b from-emerald-900 to-teal-950 text-white pt-24 pb-16 px-4">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <span className="inline-block px-4 py-1.5 bg-emerald-500/20 border border-emerald-400/30 rounded-full text-xs font-bold uppercase tracking-wider text-emerald-200">
            Student Verification & Tracking Portal
          </span>
          <h1 className="text-3xl md:text-5xl font-black tracking-tight">
            Track Application Status
          </h1>
          <p className="text-emerald-100/80 text-sm md:text-base max-w-xl mx-auto">
            درخواست نمبر، چالان نمبر، یا شناختی کارڈ نمبر درج کر کے اپنے داخلے یا فیس کا لائیو اسٹیٹس چیک کریں۔
          </p>

          {/* Search Box */}
          <form onSubmit={handleSubmit} className="max-w-2xl mx-auto flex flex-col sm:flex-row gap-2 p-2 bg-white rounded-2xl md:rounded-full shadow-2xl text-slate-800 border border-white/20">
            <div className="relative flex-1 flex items-center px-4">
              <Search size={20} className="text-slate-400 shrink-0" />
              <input 
                type="text" 
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter App No, Challan No, or CNIC (e.g. APP-72983)..."
                className="w-full py-3.5 px-3 bg-transparent text-sm font-bold text-slate-800 placeholder-slate-400 outline-none"
                required
              />
            </div>
            <button 
              type="submit"
              disabled={loading}
              className="py-3.5 px-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl sm:rounded-full font-bold text-sm tracking-wide transition-all shadow-md shadow-emerald-700/20 flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Checking...
                </>
              ) : (
                <>
                  Track Status <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>

        </div>
      </section>

      {/* Results Section */}
      <section className="max-w-4xl mx-auto px-4 -mt-8">
        
        {/* Error Alert */}
        {error && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-rose-50 border border-rose-200 p-6 rounded-3xl text-rose-800 shadow-md flex items-start gap-4">
            <XCircle size={24} className="text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-base mb-1">کوئی ریکارڈ نہیں ملا (No Record Found)</h4>
              <p className="text-sm text-rose-700">{error}</p>
              <p className="text-xs text-rose-500 mt-2">براہ کرم اپنا ایپلیکیشن نمبر، چالان نمبر، یا فون نمبر درست طور پر دیکھ کر دوبارہ کوشش کریں۔</p>
            </div>
          </motion.div>
        )}

        {/* Found Application Details */}
        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            
            {/* Top Overview Card */}
            <div className="bg-white rounded-3xl shadow-lg border border-slate-200/80 p-6 md:p-8 overflow-hidden relative">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pb-6 border-b border-slate-100">
                <div>
                  <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 block mb-1">
                    {result.type === 'internship' ? 'Internship Program' : 'Jamia Admission Application'}
                  </span>
                  <h2 className="text-2xl md:text-3xl font-black text-slate-900">{result.studentName}</h2>
                  <p className="text-xs text-slate-500 font-semibold mt-1">S/O {result.fatherName} • CNIC: {result.cnic || 'N/A'}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className={`px-4 py-2 rounded-full text-xs font-black uppercase tracking-wider shadow-sm border ${
                    result.status === 'Approved' ? 'bg-emerald-50 text-emerald-700 border-emerald-200' :
                    result.status === 'Rejected' ? 'bg-rose-50 text-rose-700 border-rose-200' :
                    'bg-amber-50 text-amber-700 border-amber-200'
                  }`}>
                    Status: {result.status}
                  </span>
                </div>
              </div>

              {/* Badges / Key Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-b border-slate-100 text-center">
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">App ID</span>
                  <span className="text-sm font-mono font-black text-slate-800">{result.applicationNo}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Class / Program</span>
                  <span className="text-sm font-black text-slate-800 truncate block">{result.classProgram || result.program}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Session</span>
                  <span className="text-sm font-mono font-black text-slate-800">{result.session || '2026-27'}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-2xl border border-slate-100">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">Roll No</span>
                  <span className="text-sm font-mono font-black text-emerald-700">{result.rollNo || 'Pending'}</span>
                </div>
              </div>

              {/* Rejection Alert if applicable */}
              {result.status === 'Rejected' && result.rejectionReason && (
                <div className="mt-6 bg-rose-50 border border-rose-200 p-4 rounded-2xl text-rose-900 text-sm">
                  <b className="block mb-1">Rejection Reason:</b>
                  {result.rejectionReason}
                </div>
              )}

              {/* Live Timeline Stepper */}
              <div className="pt-8">
                <h3 className="text-base font-black text-slate-900 mb-6 flex items-center gap-2">
                  <Clock size={18} className="text-emerald-600" /> Application Progress Timeline
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  {result.timeline?.map((item: any, idx: number) => {
                    const isDone = item.completed;
                    const isRejected = item.status === 'Rejected';
                    return (
                      <div 
                        key={idx} 
                        className={`p-4 rounded-2xl border transition-all ${
                          isDone ? 'bg-emerald-50/70 border-emerald-200 text-emerald-950' :
                          isRejected ? 'bg-rose-50/70 border-rose-200 text-rose-950' :
                          'bg-slate-50/60 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Step 0{item.step}</span>
                          {isDone ? (
                            <CheckCircle2 size={18} className="text-emerald-600" />
                          ) : isRejected ? (
                            <XCircle size={18} className="text-rose-600" />
                          ) : (
                            <Clock size={18} className="text-amber-500" />
                          )}
                        </div>
                        <h4 className="font-black text-sm text-slate-900">{item.title}</h4>
                        <p className="text-xs text-slate-500 mt-1">{item.desc}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Fee Payment Status Card */}
              {result.fees && (
                <div className="mt-8 bg-gradient-to-r from-blue-900 to-indigo-950 rounded-2xl p-6 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-blue-300 block mb-1">Fee Payment Information</span>
                    <h4 className="text-xl font-black">
                      Total Fee: Rs {result.fees.totalAmount?.toLocaleString()}
                    </h4>
                    <p className="text-xs text-blue-200 mt-1">
                      Status: <span className={`font-bold uppercase ${result.fees.status === 'Paid' ? 'text-emerald-400' : 'text-amber-300'}`}>{result.fees.status}</span>
                      {result.fees.transactionId && ` • TID: ${result.fees.transactionId}`}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-2 w-full md:w-auto">
                    {result.fees.status !== 'Paid' && (
                      <button 
                        onClick={() => setShowPaymentModal(true)}
                        className="flex-1 md:flex-none px-6 py-2.5 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold text-xs shadow-md transition-colors flex items-center justify-center gap-2"
                      >
                        <CreditCard size={16} /> Pay Online Now
                      </button>
                    )}
                    <button 
                      onClick={() => setShowReceiptModal(true)}
                      className="flex-1 md:flex-none px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-xl font-bold text-xs transition-colors flex items-center justify-center gap-2"
                    >
                      <FileText size={16} /> View Receipt
                    </button>
                  </div>
                </div>
              )}

              {/* Bottom Quick Actions */}
              <div className="mt-8 pt-6 border-t border-slate-100 flex flex-wrap gap-3 justify-between items-center">
                <button 
                  onClick={handleWhatsAppShare}
                  className="px-5 py-2.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 border border-emerald-200 rounded-xl font-bold text-xs flex items-center gap-2 transition-colors"
                >
                  <Share2 size={14} /> Share Status on WhatsApp
                </button>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold">
                  <Phone size={14} className="text-slate-400" /> Jamia Helpline: <a href="tel:03144081516" className="text-blue-600 hover:underline">0314-4081516</a>
                </div>
              </div>

            </div>

          </motion.div>
        )}

      </section>

      {/* Online Payment Modal */}
      {showPaymentModal && result && (
        <OnlinePaymentModal 
          isOpen={showPaymentModal}
          challanNo={result.challanNo}
          studentName={result.studentName}
          amount={result.fees?.totalAmount || 3500}
          initialStatus={result.fees?.status || 'Unpaid'}
          onClose={() => setShowPaymentModal(false)}
          onPaymentSuccess={() => {
            setShowPaymentModal(false);
            fetchStatus(result.applicationNo);
          }}
        />
      )}

      {/* Admission Receipt Modal */}
      {showReceiptModal && result && (
        <AdmissionReceiptModal 
          data={{
            studentName: result.studentName,
            fatherName: result.fatherName,
            applicationNo: result.applicationNo,
            challanNo: result.challanNo,
            classProgram: result.classProgram || result.program,
            sectionType: result.sectionType || 'Regular',
            mobile: result.mobile,
            fees: {
              session: result.session,
              totalFee: result.fees?.totalAmount
            },
            date: result.date
          }}
          onClose={() => setShowReceiptModal(false)}
        />
      )}

    </main>
  );
}

export default function ApplicationStatusPage() {
  return (
    <>
      <Header />
      <Suspense fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-50">
          <div className="w-8 h-8 border-4 border-emerald-600 border-t-transparent rounded-full animate-spin" />
        </div>
      }>
        <StatusContent />
      </Suspense>
      <Footer />
    </>
  );
}
