'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Phone, CheckCircle, Download, FileText, ArrowLeft, Loader2, Landmark } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface Config {
  fee: number;
  examName: string;
}

interface BankConfig {
  bankName: string;
  accountTitle: string;
  accountNumber: string;
}

export default function ExamMessPage() {
  const [config, setConfig] = useState<Config | null>(null);
  const [bankConfig, setBankConfig] = useState<BankConfig | null>(null);
  const [formData, setFormData] = useState({ studentName: '', fatherName: '', phone: '' });
  const [loading, setLoading] = useState(false);
  const [generatedChallan, setGeneratedChallan] = useState<any>(null);

  useEffect(() => {
    // Set a timeout to prevent infinite loading if backend is asleep
    const timeout = setTimeout(() => {
      if (!config) setConfig({ fee: 3000, examName: 'Salana Imtihaan 2026' });
    }, 5000);

    Promise.all([
      fetch('/api/exam-mess/config').then(res => res.json()),
      fetch('/api/bank-config').then(res => res.json())
    ])
      .then(([configData, bankData]) => {
        clearTimeout(timeout);
        setConfig(configData || { fee: 3000, examName: 'Salana Imtihaan 2026' });
        setBankConfig(bankData || { bankName: 'Meezan Bank', accountTitle: 'Jamia Account', accountNumber: '123456789' });
      })
      .catch(err => {
        console.error(err);
        clearTimeout(timeout);
        setConfig({ fee: 3000, examName: 'Salana Imtihaan 2026' });
        setBankConfig({ bankName: 'Meezan Bank', accountTitle: 'Jamia Account', accountNumber: '123456789' });
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
                <h1 className="text-3xl font-black text-white tracking-tight relative z-10">Imtihaani Ta'am Facility</h1>
                <p className="text-blue-200 mt-2 text-sm font-medium relative z-10">Apply for Exam Mess / Food Facility & Generate Challan</p>
              </div>

              <div className="p-8">
                <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mb-8 flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-black text-blue-900 uppercase tracking-widest">Total Fee</h3>
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
              {/* Professional 3-Part Challan */}
              <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-dashed divide-slate-300">
                {['Bank Copy', 'Jamia Copy', 'Student Copy'].map((copyType, index) => (
                  <div key={index} className="p-6 flex flex-col h-full bg-white relative">
                    <div className="text-center border-b border-slate-200 pb-4 mb-4">
                      <div className="w-12 h-12 relative mx-auto mb-2 grayscale">
                        <Image src="/logo.jpeg" alt="Logo" fill className="object-contain" />
                      </div>
                      <h2 className="text-sm font-black text-slate-800 uppercase tracking-widest">Jamia Sher-e-Rabbani</h2>
                      <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase tracking-widest">{copyType}</p>
                      <p className="text-[9px] font-bold text-slate-400 mt-1">Imtihaani Ta'am Facility</p>
                    </div>

                    <div className="space-y-4 flex-1">
                      <div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Challan No</div>
                        <div className="text-sm font-black text-slate-800">{generatedChallan.challanNo}</div>
                      </div>

                      <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
                        <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-1">Bank Details</div>
                        <div className="text-xs font-bold text-slate-800">{bankConfig?.bankName}</div>
                        <div className="text-[10px] font-bold text-slate-600 truncate">{bankConfig?.accountTitle}</div>
                        <div className="text-xs font-black text-slate-800 tracking-wider mt-1">{bankConfig?.accountNumber}</div>
                      </div>

                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Issue Date</div>
                          <div className="text-xs font-bold text-slate-800">{new Date(generatedChallan.issueDate).toLocaleDateString()}</div>
                        </div>
                        <div>
                          <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Due Date</div>
                          <div className="text-xs font-bold text-rose-600">{new Date(generatedChallan.dueDate).toLocaleDateString()}</div>
                        </div>
                      </div>

                      <div>
                        <div className="text-[9px] font-black uppercase tracking-widest text-slate-400 mb-0.5">Student Details</div>
                        <div className="text-sm font-black text-slate-800 truncate">{generatedChallan.studentName}</div>
                        <div className="text-[10px] font-bold text-slate-600 truncate">S/O {generatedChallan.fatherName}</div>
                        <div className="text-[10px] font-bold text-slate-600 mt-0.5">{generatedChallan.phone}</div>
                      </div>

                      <div className="border-t border-slate-200 pt-4 mt-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-bold text-slate-600">Imtihaani Mess Fee</span>
                          <span className="text-xs font-black text-slate-800">Rs {config?.fee}</span>
                        </div>
                        <div className="flex justify-between items-center border-t border-slate-200 pt-2">
                          <span className="text-xs font-black uppercase tracking-widest text-slate-800">Total</span>
                          <span className="text-sm font-black text-slate-800">Rs {config?.fee}</span>
                        </div>
                      </div>
                    </div>

                    <div className="mt-8 pt-4 border-t border-slate-200 grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="border-b border-slate-300 h-6 mb-1"></div>
                        <div className="text-[8px] font-black uppercase tracking-widest text-slate-400">Cashier Sign</div>
                      </div>
                      <div className="text-center">
                        <div className="border-b border-slate-300 h-6 mb-1"></div>
                        <div className="text-[8px] font-black uppercase tracking-widest text-slate-400">Depositor Sign</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

                <div className="p-8 bg-slate-50 border-t border-slate-200 flex gap-4 print:hidden">
                  <button 
                    onClick={() => window.print()}
                    className="flex-1 py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-black uppercase tracking-widest text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <Download size={18} /> Print / Save PDF
                  </button>
                  <button 
                    onClick={() => setGeneratedChallan(null)}
                    className="py-4 px-8 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-xl font-black uppercase tracking-widest text-sm transition-colors"
                  >
                    Apply Another
                  </button>
                </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
