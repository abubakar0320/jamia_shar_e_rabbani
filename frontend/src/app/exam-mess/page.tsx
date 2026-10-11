'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, CheckCircle, Download, FileText, ArrowLeft, Loader2, Landmark, Smartphone, Clock } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import OnlinePaymentModal from '@/components/OnlinePaymentModal';

interface Config {
  fee: number;
  examName: string;
}

interface BankConfig {
  bankName: string;
  accountTitle: string;
  accountNumber: string;
  meezan?: any;
  jazzcash?: any;
  nayapay?: any;
}

export default function ExamMessPage() {
  const [config, setConfig] = useState<Config | null>(null);
  const [bankConfig, setBankConfig] = useState<BankConfig | null>(null);
  const [formData, setFormData] = useState({ studentName: '', fatherName: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [generatedChallan, setGeneratedChallan] = useState<any>(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [challanStatus, setChallanStatus] = useState('Unpaid');

  useEffect(() => {
    // Set a timeout to prevent infinite loading if backend is asleep
    const timeout = setTimeout(() => {
      if (!config) setConfig({ fee: 3000, examName: 'Salana Imtihaan 2026' });
    }, 5000);

    Promise.all([
      fetch('/api/exam-mess/config').then(res => res.json()),
      fetch('/api/payment-accounts').then(res => res.json()).catch(() => fetch('/api/bank-config').then(res => res.json()))
    ])
      .then(([configData, bankData]) => {
        clearTimeout(timeout);
        setConfig(configData || { fee: 3000, examName: 'Salana Imtihaan 2026' });
        setBankConfig(bankData || { bankName: 'Meezan Bank', accountTitle: 'Muhammad Ahmad', accountNumber: '98690112101313' });
      })
      .catch(err => {
        console.error(err);
        clearTimeout(timeout);
        setConfig({ fee: 3000, examName: 'Salana Imtihaan 2026' });
        setBankConfig({ bankName: 'Meezan Bank', accountTitle: 'Muhammad Ahmad', accountNumber: '98690112101313' });
      });
      
    return () => clearTimeout(timeout);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.fatherName || !formData.phone) return;
    
    setLoading(true);
    try {
      const res = await fetch('/api/exam-mess/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setGeneratedChallan(data.challan);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (!config) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          <p className="text-slate-500 font-bold tracking-widest uppercase text-sm">Loading System...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4 print:py-0 print:px-0">
      <div className="max-w-2xl mx-auto print:max-w-none">
        
        <div className="print:hidden mb-8 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
            <ArrowLeft size={16} /> Back to Home
          </Link>
          <div className="text-xs font-black uppercase tracking-widest text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
            {config.examName}
          </div>
        </div>

        <AnimatePresence mode="wait">
          {!generatedChallan ? (
            <motion.div 
              key="form"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 overflow-hidden border border-slate-100"
            >
              <div className="bg-slate-900 p-8 text-center relative overflow-hidden">
                <div className="absolute top-0 right-0 p-8 opacity-10">
                  <Landmark size={120} />
                </div>
                <h1 className="text-3xl font-black text-white tracking-tight relative z-10">Imtihaani Qayam-o-Ta'am</h1>
                <p className="text-blue-200 mt-2 text-sm font-medium relative z-10">Zar-e-Ta'awun (Contribution) for Exam Stay & Food</p>
              </div>

              <div className="p-8">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest">Hadiya / Ta'awun</h3>
                    <p className="text-xs text-blue-600 font-medium mt-1">For complete exam duration</p>
                  </div>
                  <div className="text-3xl font-black text-blue-600">
                    Rs {config.fee}
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Student Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User size={18} className="text-slate-400" />
                      </div>
                      <input 
                        type="text" 
                        required
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                        placeholder="Enter your full name"
                        value={formData.studentName}
                        onChange={e => setFormData({ ...formData, studentName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Father's Name</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <User size={18} className="text-slate-400" />
                      </div>
                      <input 
                        type="text" 
                        required
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                        placeholder="Enter father's name"
                        value={formData.fatherName}
                        onChange={e => setFormData({ ...formData, fatherName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                        <Phone size={18} className="text-slate-400" />
                      </div>
                      <input 
                        type="tel" 
                        required
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                        placeholder="e.g. 03001234567"
                        value={formData.phone}
                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                  </div>

                  <button 
                    type="submit" 
                    disabled={loading}
                    className="w-full py-4 bg-slate-900 hover:bg-blue-600 text-white rounded-xl font-black uppercase tracking-widest text-sm transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20 disabled:opacity-50"
                  >
                    {loading ? <Loader2 size={18} className="animate-spin" /> : <FileText size={18} />}
                    {loading ? 'Processing...' : 'Apply & Generate Challan'}
                  </button>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="challan"
              initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-200"
            >
              {/* Professional Single Receipt */}
              <div className="p-8 bg-white relative">
                <div className="text-center border-b-2 border-slate-900 pb-6 mb-6">
                  <div className="w-16 h-16 relative mx-auto mb-3">
                    <Image src="/logo.jpeg" alt="Logo" fill className="object-contain" />
                  </div>
                  <h2 className="text-2xl font-black text-slate-900 uppercase tracking-widest">Jamia Sher-e-Rabbani</h2>
                  <p className="text-sm font-bold text-slate-500 mt-1 uppercase tracking-widest">Imtihaani Qayam-o-Ta'am</p>
                  <div className="mt-4 inline-flex items-center gap-2 bg-slate-900 text-white px-6 py-2 rounded-full">
                    <span className="text-xs font-black uppercase tracking-widest">Challan No: </span>
                    <span className="text-lg font-black tracking-wider">{generatedChallan.challanNo}</span>
                  </div>

                  {challanStatus === 'Paid' && (
                    <div className="mt-3 inline-block bg-emerald-100 text-emerald-800 border border-emerald-300 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                      ★ PAID ★ Fee Confirmed
                    </div>
                  )}

                  {challanStatus === 'Pending Verification' && (
                    <div className="mt-3 inline-flex items-center gap-1.5 bg-amber-100 text-amber-800 border border-amber-300 px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest">
                      <Clock size={14} /> Verification Pending
                    </div>
                  )}
                </div>

                <div className="grid grid-cols-2 gap-8 mb-8">
                  <div>
                    <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Student Details</div>
                    <div className="text-xl font-black text-slate-800">{generatedChallan.studentName}</div>
                    <div className="text-sm font-bold text-slate-600">S/O {generatedChallan.fatherName}</div>
                    <div className="text-sm font-medium text-slate-500 mt-1">{generatedChallan.phone}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xs font-black uppercase tracking-widest text-slate-400 mb-2">Important Dates</div>
                    <div className="text-sm font-bold text-slate-800 mb-1">Issue Date: {new Date(generatedChallan.issueDate).toLocaleDateString()}</div>
                    <div className="text-sm font-black text-rose-600 bg-rose-50 inline-block px-3 py-1 rounded-md">Due Date: {new Date(generatedChallan.dueDate).toLocaleDateString()}</div>
                  </div>
                </div>

                {/* 3 Payment Accounts Grid */}
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-200 mb-8">
                  <div className="text-xs font-black uppercase tracking-widest text-slate-800 mb-3 flex items-center justify-between">
                    <span className="flex items-center gap-2"><Landmark size={16} className="text-blue-600" /> Official Accounts for Payment</span>
                    <span className="text-[10px] text-slate-500 font-bold uppercase">Muhammad Ahmad</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <div className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1">Meezan Bank</div>
                      <div className="font-mono font-black text-slate-900 tracking-wider">98690112101313</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Title: Muhammad Ahmad</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <div className="text-[10px] font-bold text-rose-600 uppercase tracking-widest mb-1">JazzCash</div>
                      <div className="font-mono font-black text-slate-900 tracking-wider">03284381312</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">Title: Muhammad Ahmad</div>
                    </div>
                    <div className="bg-white p-3 rounded-lg border border-slate-200">
                      <div className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest mb-1">NayaPay / Raast</div>
                      <div className="font-mono font-black text-slate-900 tracking-wider">03164415465</div>
                      <div className="text-[10px] text-emerald-600 font-bold mt-0.5">Instant • 0% Charges</div>
                    </div>
                  </div>
                </div>

                <table className="w-full text-left mb-8">
                  <thead className="bg-slate-100 border-b border-slate-200">
                    <tr>
                      <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500">Description</th>
                      <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500 text-right">Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generatedChallan.feeDetails.map((fee: any, idx: number) => (
                      <tr key={idx} className="border-b border-slate-100">
                        <td className="py-6 px-6 text-base font-bold text-slate-800">{fee.type}</td>
                        <td className="py-6 px-6 text-base font-black text-slate-800 text-right">Rs {fee.amount}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot className="bg-slate-900 text-white rounded-b-xl">
                    <tr>
                      <td className="py-6 px-6 text-sm font-black uppercase tracking-widest">Total Payable</td>
                      <td className="py-6 px-6 text-2xl font-black text-right">Rs {config?.fee}</td>
                    </tr>
                  </tfoot>
                </table>

                <div className="flex items-center gap-3 bg-amber-50 text-amber-800 p-4 rounded-xl border border-amber-200 mb-8 print:border-none print:bg-transparent print:p-0">
                  <CheckCircle size={24} className="shrink-0" />
                  <p className="text-sm font-bold">Baraye meharbani ye zar-e-ta'awun due date se pehle JazzCash, NayaPay ya Meezan Bank mein jama karwa kar online submit karein. JazakAllah!</p>
                </div>
              </div>

                <div className="p-8 bg-slate-50 border-t border-slate-200 flex flex-wrap gap-4 print:hidden">
                  <button 
                    type="button"
                    onClick={() => setShowPaymentModal(true)}
                    className="flex-1 min-w-[200px] py-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-xl font-black uppercase tracking-widest text-sm transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20"
                  >
                    <Smartphone size={18} /> {challanStatus === 'Paid' ? 'Fee Paid / ادا شدہ' : 'Pay Online / موبائل سے ادا کریں'}
                  </button>
                  <button 
                    onClick={() => window.print()}
                    className="flex-1 min-w-[180px] py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black uppercase tracking-widest text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Download size={18} /> Print / Save PDF
                  </button>
                  <button 
                    onClick={() => { setGeneratedChallan(null); setChallanStatus('Unpaid'); }}
                    className="py-4 px-6 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-black uppercase tracking-widest text-sm transition-colors"
                  >
                    Apply Another
                  </button>
                </div>
            </motion.div>
          )}
        </AnimatePresence>

        {generatedChallan && (
          <OnlinePaymentModal 
            isOpen={showPaymentModal}
            onClose={() => setShowPaymentModal(false)}
            challanNo={generatedChallan.challanNo}
            studentName={generatedChallan.studentName}
            amount={config?.fee || 3000}
            initialStatus={challanStatus}
            onPaymentSuccess={(updated) => {
              if (updated?.status) setChallanStatus(updated.status);
            }}
          />
        )}
      </div>
    </div>
  );
}
