'use client';

import React from 'react';
import { Printer, Download, ArrowLeft, CheckCircle2, Smartphone, ShieldCheck, Clock, Share2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Image from 'next/image';
import OnlinePaymentModal from '@/components/OnlinePaymentModal';
import AdmissionReceiptModal from '@/components/AdmissionReceiptModal';

interface ChallanProps {
  data: {
    studentName: string;
    fatherName: string;
    dob?: string;
    cnic?: string;
    mobile: string;
    whatsapp?: string;
    sectionType: string;
    classProgram: string;
    takhassusType?: string;
    challanNo: string;
    applicationNo: string;
    date: string;
    fees: {
      admissionFee: number;
      registrationFee: number;
      totalFee?: number;
      session: string;
      lateFeeDays?: number;
      dailyLateFeeRate?: number;
      totalLateFee?: number;
    };
  };
  onBack: () => void;
}

export default function AdmissionChallan({ data, onBack }: ChallanProps) {
  const { t } = useTranslation();
  const [printMode, setPrintMode] = React.useState<'all' | 'challan' | 'form'>('all');
  const [bankConfig, setBankConfig] = React.useState<any>({ bankName: '', accountTitle: '', accountNumber: '' });
  const [showPaymentModal, setShowPaymentModal] = React.useState(false);
  const [showReceiptModal, setShowReceiptModal] = React.useState(false);
  const [challanStatus, setChallanStatus] = React.useState<string>('Unpaid');

  React.useEffect(() => {
    fetch('/api/payment-accounts')
      .then(res => res.json())
      .then(d => setBankConfig(d))
      .catch(() => {
        fetch('/api/bank-config')
          .then(res => res.json())
          .then(d => setBankConfig(d))
          .catch(console.error);
      });

    if (data.challanNo) {
      fetch(`/api/public/challan-status/${data.challanNo}`)
        .then(res => res.json())
        .then(resData => {
          if (resData?.status) setChallanStatus(resData.status);
        })
        .catch(console.error);
    }
  }, [data.challanNo]);

  const totalClassFee = data.fees.totalFee || (data.fees.admissionFee + data.fees.registrationFee);
  const grandTotal = totalClassFee + (data.fees.totalLateFee || 0);
  
  const getPdfTemplatePath = () => {
    const isTulba = data.sectionType.toLowerCase().includes('tulba');
    const cls = data.classProgram;

    if (cls.includes('Sanawiya Aamma Awal')) return isTulba ? '/forms/Amma one Tulba.pdf' : '/forms/Amma one Talbat.pdf';
    if (cls.includes('Sanawiya Aamma Dom')) return isTulba ? '/forms/Amma two Tulba.pdf' : '/forms/Amma two Talbat.pdf';
    if (cls.includes('Sanawiya Khasa Awal')) return isTulba ? '/forms/Khasa one Tulba.pdf' : '/forms/Khasa one Talbat.pdf';
    if (cls.includes('Sanawiya Khasa Dom')) return isTulba ? '/forms/Khasa two Tulba.pdf' : '/forms/Khasa two Talbat.pdf';
    if (cls.includes('Aliya Awal')) return isTulba ? '/forms/Aliya one tulba.pdf' : '/forms/Aliya one Talbat.pdf';
    if (cls.includes('Aliya Dom')) return isTulba ? '/forms/Aliya two Tulba.pdf' : '/forms/Aliya two talbat.pdf';
    if (cls.includes('Alamiya Awal')) return isTulba ? '/forms/Almiya one Tulba.pdf' : '/forms/Almiya one Talbat.pdf';
    if (cls.includes('Alamiya Dom')) return isTulba ? '/forms/Almiya two Tulba.pdf' : '/forms/Almiya two Talbat.pdf';
    if (cls.includes('Amma Khasusi')) return isTulba ? '/forms/Amma Khasusi Tulba.pdf' : '/forms/Amma Khasusi Talbat.pdf';
    if (cls.includes('Khasa Khasusi')) return isTulba ? '/forms/Khasa Khasusi tulba.pdf' : '/forms/Khasa Khasusi Talbat.pdf';
    if (cls.includes('Almiya Khasusi Part One')) return isTulba ? '/forms/Almiya Khasusi one Tulba.pdf' : '/forms/Almiya Khasusi one Talbat.pdf';
    if (cls.includes('Almiya Khasusi Part Two')) return isTulba ? '/forms/Almiya khasusi two Tulba.pdf' : '/forms/Almiya Khasusi two Talbat.pdf';
    if (cls.includes('Hifz')) return '/forms/Tehfeez ul Quran.pdf';
    if (cls.includes('Tajweed')) return '/forms/Tajveed o Qirat.pdf';
    if (cls.includes('Takhassus')) return isTulba ? '/forms/Takhasus tulba.pdf' : '/forms/Takhasus Talbat.pdf';
    
    // Default fallback
    return isTulba ? '/forms/Amma one Tulba.pdf' : '/forms/Amma one Talbat.pdf';
  };

  const OfficialForm = () => {
    const path = getPdfTemplatePath();
    return (
       <div className="w-full h-[1200px] bg-white border border-gray-300 relative">
          <iframe src={path} className="w-full h-full border-0" title="Admission Form PDF" />
       </div>
    );
  };

  const ChallanCopy = ({ title, type }: { title: string, type: 'jamia' | 'bank' | 'student' }) => {
    const theme = 
      type === 'jamia' ? { border: 'border-rose-800', text: 'text-rose-800', bg: 'bg-rose-50' } :
      type === 'bank' ? { border: 'border-blue-800', text: 'text-blue-800', bg: 'bg-blue-50' } :
      { border: 'border-emerald-800', text: 'text-emerald-800', bg: 'bg-emerald-50' };

    return (
      <div className={`flex-1 p-6 relative overflow-hidden flex flex-col h-full bg-white border-2 ${theme.border} rounded-sm m-2 shadow-sm print:p-2 print:m-0 print:border-y-0 print:border-l-0 print:border-r-2 print:border-dashed print:border-slate-400 print:rounded-none print:shadow-none last:print:border-r-0`}>
        <div className={`absolute top-0 right-0 ${theme.bg} ${theme.text} px-4 py-1 rounded-bl-xl font-black text-[10px] uppercase tracking-widest print:py-0 print:text-[8px] print:border print:border-gray-300`}>{title}</div>
        
        {/* Paid Stamp or Pending Verification Badge */}
        {challanStatus === 'Paid' && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-12 pointer-events-none select-none z-20 border-4 border-emerald-600 rounded-2xl px-6 py-2 text-center bg-white/70 backdrop-blur-[1px] shadow-sm">
            <span className="block text-2xl font-black text-emerald-700 tracking-widest uppercase">★ PAID ★</span>
            <span className="block text-[8px] font-bold text-emerald-800 tracking-wider uppercase">JAMIA SHER-E-RABBANI</span>
          </div>
        )}

        {challanStatus === 'Pending Verification' && (
          <div className="absolute top-10 right-2 bg-amber-100 border border-amber-300 text-amber-800 px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-wider z-10 print:hidden flex items-center gap-1">
            <Clock size={10} /> Pending Verification
          </div>
        )}

        {/* Header */}
        <div className="text-center mb-6 pb-4 border-b-2 border-gray-800 mt-4 print:mb-2 print:pb-2 print:mt-1">
           <h1 className="font-bold text-lg leading-none tracking-tight uppercase text-gray-900 print:text-base">{t('JAMIA SHER-E-RABBANI')}</h1>
           <p className="text-[9px] font-semibold text-gray-500 uppercase tracking-widest mt-1 print:text-[7px]">{t('Mananwala, District Sheikhupura')}</p>
        </div>

        <div className="flex justify-between mb-6 p-3 border border-gray-300 bg-gray-50 print:mb-2 print:p-1.5">
          <div>
            <p className="text-[9px] text-gray-500 uppercase font-semibold tracking-wide print:text-[7px]">{t('Challan No')}</p>
            <p className="font-bold text-gray-900 print:text-[10px]">{data.challanNo}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-gray-500 uppercase font-semibold tracking-wide print:text-[7px]">{t('Application No')}</p>
            <p className="font-bold text-gray-900 print:text-[10px]">{data.applicationNo}</p>
          </div>
        </div>

        <div className="space-y-2 mb-6 print:space-y-0.5 print:mb-2">
          <ChallanRow label={t('Student Name')} value={data.studentName} />
          <ChallanRow label={t('Father Name')} value={data.fatherName} />
          <ChallanRow label={t('CNIC / B-Form')} value={data.cnic || '---'} />
          <ChallanRow label={t('Applied Class')} value={t(data.classProgram)} highlight />
          <ChallanRow label={t('Mobile Number')} value={data.mobile} />
          <ChallanRow label={t('Date')} value={new Date(data.date).toLocaleDateString()} />
        </div>

        <div className="border border-gray-300 mb-6 print:mb-2">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="text-left py-2 px-3 uppercase text-[9px] text-gray-700 font-semibold print:py-0.5 print:px-2 print:text-[8px]">{t('Fee Description')}</th>
                <th className="text-right py-2 px-3 uppercase text-[9px] text-gray-700 font-semibold print:py-0.5 print:px-2 print:text-[8px]">{t('Amount')}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <FeeRow label={t('Admission Fee')} amount={data.fees.admissionFee} />
              <FeeRow label={t('Registration Fee')} amount={data.fees.registrationFee} />
              <FeeRow label={t('Total Fee')} amount={totalClassFee} />
              {data.fees.totalLateFee ? <FeeRow label={`${t('Late Fee')} (${data.fees.lateFeeDays} ${t('Days')} @ Rs.${data.fees.dailyLateFeeRate})`} amount={data.fees.totalLateFee} /> : null}
            </tbody>
            <tfoot>
              <tr className="bg-gray-50 border-t border-gray-300">
                <th className="text-left py-3 px-3 font-semibold text-[10px] text-gray-900 print:py-1 print:px-2">{t('GRAND TOTAL')}</th>
                <th className="text-right py-3 px-3 font-bold text-base text-gray-900 print:py-1 print:px-2 print:text-sm">RS. {grandTotal}</th>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Bank & Online Account Details */}
        <div className="mb-6 p-3 border border-gray-300 bg-gray-50 print:mb-2 print:p-2">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-900 border-b border-gray-300 pb-1.5 mb-2 print:pb-1 print:mb-1 print:text-[8px] flex justify-between items-center">
            <span>OFFICIAL PAYMENT ACCOUNTS</span>
            <span className="text-[8px] text-slate-500 font-normal">Meezan • JazzCash • NayaPay</span>
          </div>
          <div className="space-y-1 print:space-y-0.5 text-[9px] print:text-[7.5px]">
            <div className="flex justify-between border-b border-gray-200/60 pb-0.5">
              <span className="font-semibold text-gray-500 uppercase">Meezan Bank:</span>
              <span className="font-mono font-bold text-gray-900">{bankConfig.meezan?.accountNumber || bankConfig.accountNumber || '9869 0112 1013 13'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200/60 pb-0.5">
              <span className="font-semibold text-gray-500 uppercase">JazzCash:</span>
              <span className="font-mono font-bold text-gray-900">{bankConfig.jazzcash?.accountNumber || '0328 4381 312'}</span>
            </div>
            <div className="flex justify-between border-b border-gray-200/60 pb-0.5">
              <span className="font-semibold text-gray-500 uppercase">NayaPay / Raast:</span>
              <span className="font-mono font-bold text-gray-900">{bankConfig.nayapay?.accountNumber || '0316 4415 465'}</span>
            </div>
            <div className="flex justify-between pt-0.5">
              <span className="font-semibold text-gray-500 uppercase">Title:</span>
              <span className="font-semibold text-gray-900 uppercase">{bankConfig.accountTitle || 'Muhammad Ahmad'}</span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-8 flex justify-between gap-4 print:pt-2">
          <div className="flex-1 border-t border-gray-400 pt-1 text-center">
            <p className="text-[8px] font-semibold text-gray-600 uppercase tracking-widest print:text-[6px]">{t('Authorized Signature')}</p>
          </div>
          <div className="flex-1 border-t border-gray-400 pt-1 text-center">
            <p className="text-[8px] font-semibold text-gray-600 uppercase tracking-widest print:text-[6px]">{t('Official Stamp')}</p>
          </div>
          <div className="flex-1 border-t border-gray-400 pt-1 text-center">
            <p className="text-[8px] font-semibold text-gray-600 uppercase tracking-widest print:text-[6px]">{t('Depositor Signature')}</p>
          </div>
        </div>
      </div>
    );
  };

  const ChallanRow = ({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) => (
    <div className={`flex justify-between items-center border-b border-gray-200 pb-1 print:pb-0.5 ${highlight ? 'bg-gray-100 px-2 py-1 print:px-1 print:py-0 border border-gray-300' : ''}`}>
      <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide print:text-[7px]">{label}</span>
      <span className={`font-semibold text-[10px] uppercase text-end print:text-[8px] ${highlight ? 'text-gray-900' : 'text-gray-800'}`}>{value}</span>
    </div>
  );

  const FeeRow = ({ label, amount }: { label: string, amount: number }) => (
    <tr className="bg-white">
      <td className="py-2 px-3 font-semibold text-gray-600 uppercase text-[9px] print:py-0.5 print:px-2 print:text-[7px]">{label}</td>
      <td className="text-right py-2 px-3 font-semibold text-gray-900 text-[11px] print:py-0.5 print:px-2 print:text-[9px]">{amount}</td>
    </tr>
  );

  return (
    <div className="max-w-[1400px] mx-auto py-12 px-4 sm:px-6">
      <div className="flex flex-col md:flex-row justify-between items-center mb-10 gap-6 print:hidden">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-gray-600 hover:text-blue-700 font-semibold text-sm transition-colors"
        >
          <ArrowLeft size={16} /> {t('Back to Admission Portal')}
        </button>
        
        <div className="flex flex-wrap gap-4">
          <button 
            type="button"
            onClick={() => setShowPaymentModal(true)}
            className={`flex items-center gap-2 px-6 py-3 font-black text-sm transition-all shadow-md rounded-sm ${
              challanStatus === 'Paid'
                ? 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-emerald-700/20'
                : 'bg-gradient-to-r from-emerald-600 to-teal-700 text-white hover:from-emerald-700 hover:to-teal-800 shadow-emerald-600/30 ring-2 ring-emerald-400/30'
            }`}
          >
            {challanStatus === 'Paid' ? (
              <CheckCircle2 size={18} className="text-emerald-200" />
            ) : (
              <Smartphone size={18} />
            )}
            {challanStatus === 'Paid' 
              ? 'Fee Paid / فیس ادا ہو چکی ہے' 
              : 'Pay Online / موبائل سے فیس ادا کریں'}
          </button>

          <button 
            type="button"
            onClick={() => setShowReceiptModal(true)}
            className="flex items-center gap-2 px-5 py-3 bg-purple-700 hover:bg-purple-800 text-white font-bold text-sm transition-colors shadow-md rounded-sm"
          >
            <Share2 size={16} /> Receipt & WhatsApp / رسید
          </button>

          <button 
            onClick={() => { window.print(); }}
            className="flex items-center gap-2 px-6 py-3 bg-blue-700 text-white font-semibold text-sm transition-colors hover:bg-blue-800"
          >
            <Printer size={16} /> {t('Print Documents')}
          </button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-10"
      >
        <div className="flex flex-col lg:flex-row print:flex-row print:h-full print:min-h-[190mm] print:overflow-hidden print:bg-white print:border-none print:shadow-none print:p-2">
          <ChallanCopy title="JAMIA RECORD COPY" type="jamia" />
          <ChallanCopy title="BANK COPY" type="bank" />
          <ChallanCopy title="STUDENT COPY" type="student" />
        </div>
        
        <div className="bg-white border-2 border-gray-900 print:hidden mt-10">
           <OfficialForm />
        </div>
      </motion.div>

      {/* Online Payment Modal */}
      <OnlinePaymentModal 
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        challanNo={data.challanNo}
        studentName={data.studentName}
        amount={grandTotal}
        initialStatus={challanStatus}
        onPaymentSuccess={(updated) => {
          if (updated?.status) setChallanStatus(updated.status);
        }}
      />

      {showReceiptModal && (
        <AdmissionReceiptModal
          data={{
            studentName: data.studentName,
            fatherName: data.fatherName,
            applicationNo: data.applicationNo,
            challanNo: data.challanNo,
            classProgram: data.classProgram,
            sectionType: data.sectionType,
            mobile: data.mobile,
            fees: data.fees,
            date: data.date
          }}
          onClose={() => setShowReceiptModal(false)}
        />
      )}
      
      <style jsx global>{`
        @media print {
          @page {
            size: A4 landscape;
            margin: 0;
          }
          body {
            margin: 0;
            padding: 0;
            background: white !important;
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          header, footer, nav, button, .print\\:hidden {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
