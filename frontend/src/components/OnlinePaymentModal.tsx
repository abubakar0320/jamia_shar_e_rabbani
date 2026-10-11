'use client';

import React, { useState, useEffect } from 'react';
import { 
  X, Copy, Check, Smartphone, Landmark, ShieldCheck, 
  Upload, AlertCircle, CheckCircle2, Clock, RefreshCw, Loader2, ArrowRight
} from 'lucide-react';

interface PaymentAccounts {
  meezan?: {
    bankName: string;
    accountTitle: string;
    accountNumber: string;
    branch?: string;
    iban?: string;
  };
  jazzcash?: {
    accountTitle: string;
    accountNumber: string;
    instructions?: string;
  };
  nayapay?: {
    accountTitle: string;
    accountNumber: string;
    instructions?: string;
  };
}

interface OnlinePaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  challanNo: string;
  studentName: string;
  amount: number;
  initialStatus?: string;
  onPaymentSuccess?: (challan: any) => void;
}

export default function OnlinePaymentModal({
  isOpen,
  onClose,
  challanNo,
  studentName,
  amount,
  initialStatus = 'Unpaid',
  onPaymentSuccess
}: OnlinePaymentModalProps) {
  const [selectedMethod, setSelectedMethod] = useState<'jazzcash' | 'nayapay' | 'meezan'>('jazzcash');
  const [accounts, setAccounts] = useState<PaymentAccounts>({
    jazzcash: {
      accountTitle: 'Muhammad Ahmad',
      accountNumber: '03284381312',
      instructions: 'JazzCash App se Send Money > Mobile Account par bhejen'
    },
    nayapay: {
      accountTitle: 'Muhammad Ahmad',
      accountNumber: '03164415465',
      instructions: 'NayaPay / Raast se 0% fee par foran transfer karein'
    },
    meezan: {
      bankName: 'Meezan Bank',
      accountTitle: 'Muhammad Ahmad (Asaan Account)',
      accountNumber: '98690112101313',
      branch: 'Mananwala',
      iban: 'PK12MEZN0098690112101313'
    }
  });

  const [transactionId, setTransactionId] = useState('');
  const [senderPhone, setSenderPhone] = useState('');
  const [receiptBase64, setReceiptBase64] = useState('');
  const [receiptFileName, setReceiptFileName] = useState('');
  const [copiedKey, setCopiedKey] = useState<string | null>(null);
  
  const [loading, setLoading] = useState(false);
  const [checkingStatus, setCheckingStatus] = useState(false);
  const [currentStatus, setCurrentStatus] = useState(initialStatus);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [lastTid, setLastTid] = useState('');

  // Fetch accounts configuration and current challan status
  useEffect(() => {
    if (!isOpen) return;

    fetch('/api/payment-accounts')
      .then(res => res.json())
      .then(data => {
        if (data && (data.meezan || data.jazzcash || data.nayapay)) {
          setAccounts(data);
        }
      })
      .catch(console.error);

    if (challanNo) {
      fetchChallanStatus();
    }
  }, [isOpen, challanNo]);

  const fetchChallanStatus = async () => {
    if (!challanNo) return;
    setCheckingStatus(true);
    try {
      const res = await fetch(`/api/public/challan-status/${challanNo}`);
      if (res.ok) {
        const data = await res.json();
        setCurrentStatus(data.status || 'Unpaid');
        if (data.transactionId) setLastTid(data.transactionId);
      }
    } catch (err) {
      console.error('Failed to fetch challan status:', err);
    } finally {
      setCheckingStatus(false);
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('Image file size must be less than 5MB');
      return;
    }

    setReceiptFileName(file.name);
    const reader = new FileReader();
    reader.onloadend = () => {
      setReceiptBase64(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setSuccessMsg(null);

    if (!transactionId.trim()) {
      setErrorMsg('Transaction ID (TID / Trx ID) enter karna lazmi hai.');
      return;
    }

    const methodNameMap = {
      jazzcash: 'JazzCash',
      nayapay: 'NayaPay / Raast',
      meezan: 'Meezan Bank'
    };

    setLoading(true);
    try {
      const res = await fetch('/api/public/submit-challan-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          challanNo,
          paymentMethod: methodNameMap[selectedMethod],
          transactionId: transactionId.trim(),
          senderPhone: senderPhone.trim(),
          receiptImage: receiptBase64 || undefined
        })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit payment details');
      }

      setSuccessMsg('Payment details submit ho chuki hain! Admin verification ke baad status update ho jayega.');
      setCurrentStatus('Pending Verification');
      setLastTid(transactionId.trim());
      if (onPaymentSuccess) {
        onPaymentSuccess(data.challan);
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Payment submit karne mein masla aya. Baraye meharbani dobara koshish karen.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 backdrop-blur-sm p-4 overflow-y-auto">
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in fade-in zoom-in-95 duration-200">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 relative">
          <button 
            onClick={onClose}
            className="absolute top-5 right-5 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Smartphone size={22} />
            </div>
            <div>
              <h2 className="text-xl font-black tracking-tight">Pay Fee Online / آن لائن فیس ادا کریں</h2>
              <p className="text-xs text-slate-300 font-medium">JazzCash, NayaPay (Raast) ya Meezan Bank ke zariye foran ada karein</p>
            </div>
          </div>

          {/* Challan Summary Banner */}
          <div className="mt-4 grid grid-cols-3 gap-2 bg-white/10 backdrop-blur-md rounded-xl p-3 border border-white/10 text-xs">
            <div>
              <p className="text-[10px] text-slate-300 uppercase font-bold tracking-wider">Challan No</p>
              <p className="font-mono font-black text-amber-300 truncate">{challanNo}</p>
            </div>
            <div>
              <p className="text-[10px] text-slate-300 uppercase font-bold tracking-wider">Student Name</p>
              <p className="font-bold text-white truncate">{studentName}</p>
            </div>
            <div className="text-right">
              <p className="text-[10px] text-slate-300 uppercase font-bold tracking-wider">Total Payable</p>
              <p className="font-black text-emerald-300 text-sm">Rs. {amount?.toLocaleString()}</p>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-6 max-h-[calc(85vh-160px)] overflow-y-auto">
          
          {/* Status Alert if already submitted or paid */}
          {currentStatus === 'Paid' && (
            <div className="bg-emerald-50 border-2 border-emerald-500 rounded-xl p-4 flex items-center gap-4">
              <CheckCircle2 size={36} className="text-emerald-600 shrink-0" />
              <div>
                <h4 className="font-black text-emerald-900 text-sm">Challan Verified & Paid! / فیس ادا ہو چکی ہے</h4>
                <p className="text-xs text-emerald-700 mt-0.5">
                  Ye challan Jamia Sher-e-Rabbani ke record mein baqaida "Paid" mark ho chuka hai. Official receipt print kar sakte hain.
                </p>
              </div>
            </div>
          )}

          {currentStatus === 'Pending Verification' && (
            <div className="bg-amber-50 border-2 border-amber-400 rounded-xl p-4">
              <div className="flex items-start justify-between gap-2">
                <div className="flex items-start gap-3">
                  <Clock size={24} className="text-amber-600 shrink-0 mt-0.5 animate-pulse" />
                  <div>
                    <h4 className="font-black text-amber-900 text-sm">Verification Pending / تصدیق جاری ہے</h4>
                    <p className="text-xs text-amber-800 mt-1">
                      Aapki payment request Jamia admin office ko bhej di gayi hai.
                      {lastTid && <span className="font-mono font-bold block mt-1">TID / Reference: {lastTid}</span>}
                    </p>
                    <p className="text-[11px] text-amber-700 mt-1">
                      Office verification ke baad ye challan automatic "PAID" ho jayega.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={fetchChallanStatus}
                  disabled={checkingStatus}
                  className="px-3 py-1.5 bg-amber-200/80 hover:bg-amber-300 text-amber-900 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all"
                >
                  <RefreshCw size={13} className={checkingStatus ? 'animate-spin' : ''} />
                  Check Status
                </button>
              </div>
            </div>
          )}

          {/* Account Selector Tabs */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
              1. Step 1: Select Payment Account / طریقہ منتخب کریں
            </label>
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => setSelectedMethod('jazzcash')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  selectedMethod === 'jazzcash'
                    ? 'border-rose-600 bg-rose-50/70 text-rose-900 ring-2 ring-rose-500/30 font-bold shadow-sm'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600'
                }`}
              >
                <div className="text-xs font-black uppercase tracking-wide">JazzCash</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Mobile Account</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('nayapay')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  selectedMethod === 'nayapay'
                    ? 'border-emerald-600 bg-emerald-50/70 text-emerald-900 ring-2 ring-emerald-500/30 font-bold shadow-sm'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600'
                }`}
              >
                <div className="text-xs font-black uppercase tracking-wide">NayaPay / Raast</div>
                <div className="text-[10px] text-emerald-600 font-bold mt-0.5">0% Free Transfer</div>
              </button>

              <button
                type="button"
                onClick={() => setSelectedMethod('meezan')}
                className={`p-3 rounded-xl border text-center transition-all ${
                  selectedMethod === 'meezan'
                    ? 'border-indigo-600 bg-indigo-50/70 text-indigo-900 ring-2 ring-indigo-500/30 font-bold shadow-sm'
                    : 'border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-600'
                }`}
              >
                <div className="text-xs font-black uppercase tracking-wide">Meezan Bank</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Asaan Account</div>
              </button>
            </div>
          </div>

          {/* Branded Account Detail Box */}
          <div className="border border-slate-200 rounded-xl p-4 bg-slate-50/70 space-y-3">
            {selectedMethod === 'jazzcash' && (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-black uppercase tracking-wider text-rose-700 flex items-center gap-1.5">
                    <Smartphone size={15} /> JazzCash Account
                  </span>
                  <span className="text-[10px] bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full font-bold">Personal Account</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-semibold">Account Title:</span>
                    <span className="font-black text-slate-800 uppercase">{accounts.jazzcash?.accountTitle || 'Muhammad Ahmad'}</span>
                  </div>
                  <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Mobile Account Number</span>
                      <span className="font-mono font-black text-sm text-slate-900 tracking-wider">
                        {accounts.jazzcash?.accountNumber || '03284381312'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(accounts.jazzcash?.accountNumber || '03284381312', 'jazzcash')}
                      className="px-3 py-1.5 bg-rose-50 hover:bg-rose-100 text-rose-700 border border-rose-200 rounded-md font-bold text-xs flex items-center gap-1 transition-all"
                    >
                      {copiedKey === 'jazzcash' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                      {copiedKey === 'jazzcash' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 italic">
                  💡 JazzCash app open karein &rarr; "Send Money" &rarr; "Mobile Account" &rarr; Number paste karein aur <strong className="text-slate-700">Rs. {amount}</strong> transfer karein.
                </p>
              </>
            )}

            {selectedMethod === 'nayapay' && (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-black uppercase tracking-wider text-emerald-700 flex items-center gap-1.5">
                    <Smartphone size={15} /> NayaPay / Raast ID
                  </span>
                  <span className="text-[10px] bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full font-bold">Instant & Free</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-semibold">Account Title:</span>
                    <span className="font-black text-slate-800 uppercase">{accounts.nayapay?.accountTitle || 'Muhammad Ahmad'}</span>
                  </div>
                  <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Raast ID / Mobile Number</span>
                      <span className="font-mono font-black text-sm text-slate-900 tracking-wider">
                        {accounts.nayapay?.accountNumber || '03164415465'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(accounts.nayapay?.accountNumber || '03164415465', 'nayapay')}
                      className="px-3 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 border border-emerald-200 rounded-md font-bold text-xs flex items-center gap-1 transition-all"
                    >
                      {copiedKey === 'nayapay' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                      {copiedKey === 'nayapay' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                </div>
                <p className="text-[11px] text-slate-500 italic">
                  💡 Kisi bhi Pakistani bank app se "Raast Instant Transfer" ke zariye bina kisi charges ke bhejen.
                </p>
              </>
            )}

            {selectedMethod === 'meezan' && (
              <>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <span className="text-xs font-black uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                    <Landmark size={15} /> Meezan Bank Limited
                  </span>
                  <span className="text-[10px] bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full font-bold">Branch: Mananwala</span>
                </div>
                <div className="space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500 font-semibold">Account Title:</span>
                    <span className="font-black text-slate-800 uppercase">{accounts.meezan?.accountTitle || 'Muhammad Ahmad (Asaan Account)'}</span>
                  </div>
                  <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200">
                    <div>
                      <span className="text-[10px] text-slate-400 uppercase font-bold block">Account Number</span>
                      <span className="font-mono font-black text-sm text-slate-900 tracking-wider">
                        {accounts.meezan?.accountNumber || '98690112101313'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(accounts.meezan?.accountNumber || '98690112101313', 'meezan_num')}
                      className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-md font-bold text-xs flex items-center gap-1 transition-all"
                    >
                      {copiedKey === 'meezan_num' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                      {copiedKey === 'meezan_num' ? 'Copied!' : 'Copy'}
                    </button>
                  </div>
                  {accounts.meezan?.iban && (
                    <div className="flex items-center justify-between bg-white p-2.5 rounded-lg border border-slate-200">
                      <div>
                        <span className="text-[10px] text-slate-400 uppercase font-bold block">IBAN Number</span>
                        <span className="font-mono font-bold text-xs text-slate-800 tracking-wider">
                          {accounts.meezan?.iban}
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => copyToClipboard(accounts.meezan?.iban || '', 'meezan_iban')}
                        className="px-3 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-md font-bold text-xs flex items-center gap-1 transition-all"
                      >
                        {copiedKey === 'meezan_iban' ? <Check size={14} className="text-emerald-600" /> : <Copy size={14} />}
                        {copiedKey === 'meezan_iban' ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                  )}
                </div>
              </>
            )}
          </div>

          {/* Submission Form */}
          <form onSubmit={handleSubmit} className="space-y-4 pt-2 border-t border-slate-100">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                2. Step 2: Enter Transaction ID (TID / Trx ID) <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                placeholder="e.g. 029481729381 (from SMS or banking app)"
                value={transactionId}
                onChange={e => setTransactionId(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-mono font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
              />
              <p className="text-[11px] text-slate-500 mt-1">
                Paison ki muntaqili ke baad jo Transaction ID (TID) SMS ya App receipt mein milti hai, yahan likhein.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                  Sender Mobile No (Optional)
                </label>
                <input
                  type="tel"
                  placeholder="03XX XXXXXXX"
                  value={senderPhone}
                  onChange={e => setSenderPhone(e.target.value)}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-1">
                  Receipt Screenshot (Optional)
                </label>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    id="receipt-file-input"
                    className="hidden"
                  />
                  <label
                    htmlFor="receipt-file-input"
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 border-dashed rounded-xl text-xs font-bold text-slate-600 hover:bg-slate-100 flex items-center justify-center gap-2 cursor-pointer transition-all truncate"
                  >
                    <Upload size={14} />
                    {receiptFileName ? receiptFileName : 'Attach Receipt Image'}
                  </label>
                </div>
              </div>
            </div>

            {errorMsg && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle size={16} className="shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {successMsg && (
              <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
                <CheckCircle2 size={16} className="shrink-0" />
                <span>{successMsg}</span>
              </div>
            )}

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading || currentStatus === 'Paid'}
                className="w-full py-3.5 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-xl font-black text-sm uppercase tracking-wider flex items-center justify-center gap-2 shadow-lg shadow-emerald-700/20 disabled:opacity-50 transition-all cursor-pointer"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <ShieldCheck size={18} />}
                {loading ? 'Submitting Details...' : 'Tasdeeq Bhejein / Submit Verification'}
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
