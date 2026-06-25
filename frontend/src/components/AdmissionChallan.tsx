'use client';

import React from 'react';
import { Printer, Download, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import Image from 'next/image';

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
  const [bankConfig, setBankConfig] = React.useState({ bankName: '', accountTitle: '', accountNumber: '' });

  React.useEffect(() => {
    fetch('/api/bank-config')
      .then(res => res.json())
      .then(data => setBankConfig(data))
      .catch(console.error);
  }, []);

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
    return (
      <div className="flex-1 p-6 border-r border-dashed border-gray-300 last:border-r-0 print:border-r print:border-gray-300 flex flex-col h-full bg-white">
        {/* Header */}
        <div className="text-center mb-6 pb-4 border-b-2 border-gray-800">
           <h2 className="text-xs font-semibold uppercase tracking-widest text-gray-500 mb-1">{title}</h2>
           <h1 className="font-bold text-lg leading-none tracking-tight uppercase text-gray-900">{t('JAMIA SHER-E-RABBANI')}</h1>
           <p className="text-[9px] font-semibold text-gray-500 uppercase tracking-widest mt-1">{t('Mananwala, District Sheikhupura')}</p>
        </div>

        <div className="flex justify-between mb-6 p-3 border border-gray-300 bg-gray-50">
          <div>
            <p className="text-[9px] text-gray-500 uppercase font-semibold tracking-wide">{t('Challan No')}</p>
            <p className="font-bold text-gray-900">{data.challanNo}</p>
          </div>
          <div className="text-right">
            <p className="text-[9px] text-gray-500 uppercase font-semibold tracking-wide">{t('Application No')}</p>
            <p className="font-bold text-gray-900">{data.applicationNo}</p>
          </div>
        </div>

        <div className="space-y-2 mb-6">
          <ChallanRow label={t('Student Name')} value={data.studentName} />
          <ChallanRow label={t('Father Name')} value={data.fatherName} />
          <ChallanRow label={t('CNIC / B-Form')} value={data.cnic || '---'} />
          <ChallanRow label={t('Applied Class')} value={t(data.classProgram)} highlight />
          <ChallanRow label={t('Mobile Number')} value={data.mobile} />
          <ChallanRow label={t('Date')} value={new Date(data.date).toLocaleDateString()} />
        </div>

        <div className="border border-gray-300 mb-6">
          <table className="w-full text-xs">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="text-left py-2 px-3 uppercase text-[9px] text-gray-700 font-semibold">{t('Fee Description')}</th>
                <th className="text-right py-2 px-3 uppercase text-[9px] text-gray-700 font-semibold">{t('Amount')}</th>
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
                <th className="text-left py-3 px-3 font-semibold text-[10px] text-gray-900">{t('GRAND TOTAL')}</th>
                <th className="text-right py-3 px-3 font-bold text-base text-gray-900">RS. {grandTotal}</th>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Bank Account Details */}
        <div className="mb-6 p-4 border border-gray-300 bg-gray-50">
          <div className="text-[10px] font-semibold uppercase tracking-wide text-gray-900 border-b border-gray-300 pb-2 mb-3">
            BANK ACCOUNT DETAILS
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-[9px] font-semibold text-gray-500 uppercase">Bank Name:</span>
              <span className="font-semibold text-[10px] uppercase text-gray-900">{bankConfig.bankName}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[9px] font-semibold text-gray-500 uppercase">Account Title:</span>
              <span className="font-semibold text-[10px] uppercase text-gray-900">{bankConfig.accountTitle}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[9px] font-semibold text-gray-500 uppercase">Account Number:</span>
              <span className="font-semibold text-[10px] uppercase text-gray-900">{bankConfig.accountNumber}</span>
            </div>
          </div>
        </div>

        <div className="mt-auto pt-8 flex justify-between gap-4">
          <div className="flex-1 border-t border-gray-400 pt-1 text-center">
            <p className="text-[8px] font-semibold text-gray-600 uppercase tracking-widest">{t('Authorized Signature')}</p>
          </div>
          <div className="flex-1 border-t border-gray-400 pt-1 text-center">
            <p className="text-[8px] font-semibold text-gray-600 uppercase tracking-widest">{t('Official Stamp')}</p>
          </div>
          <div className="flex-1 border-t border-gray-400 pt-1 text-center">
            <p className="text-[8px] font-semibold text-gray-600 uppercase tracking-widest">{t('Depositor Signature')}</p>
          </div>
        </div>
      </div>
    );
  };

  const ChallanRow = ({ label, value, highlight = false }: { label: string, value: string, highlight?: boolean }) => (
    <div className={`flex justify-between items-center border-b border-gray-200 pb-1 ${highlight ? 'bg-gray-100 px-2 py-1 border border-gray-300' : ''}`}>
      <span className="text-[9px] font-semibold text-gray-500 uppercase tracking-wide">{label}</span>
      <span className={`font-semibold text-[10px] uppercase text-end ${highlight ? 'text-gray-900' : 'text-gray-800'}`}>{value}</span>
    </div>
  );

  const FeeRow = ({ label, amount }: { label: string, amount: number }) => (
    <tr className="bg-white">
      <td className="py-2 px-3 font-semibold text-gray-600 uppercase text-[9px]">{label}</td>
      <td className="text-right py-2 px-3 font-semibold text-gray-900 text-[11px]">{amount}</td>
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
            onClick={() => { setPrintMode('all'); setTimeout(() => window.print(), 100); }}
            className="flex items-center gap-2 px-6 py-3 bg-blue-700 text-white font-semibold text-sm transition-colors hover:bg-blue-800"
          >
            <Printer size={16} /> {t('Print All')}
          </button>
          <button 
            onClick={() => { setPrintMode('challan'); setTimeout(() => window.print(), 100); }}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            <Download size={16} /> {t('Download Challan')}
          </button>
          <button 
            onClick={() => { setPrintMode('form'); setTimeout(() => window.print(), 100); }}
            className="flex items-center gap-2 px-6 py-3 bg-white text-gray-700 border border-gray-300 font-semibold text-sm hover:bg-gray-50 transition-colors"
          >
            <Download size={16} /> {t('Download Form')}
          </button>
        </div>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-10"
      >
        <div className={`bg-white border-2 border-gray-900 print:border-2 print:border-gray-900 flex flex-col lg:flex-row print:flex-row h-full min-h-[297mm] ${printMode === 'form' ? 'print:hidden' : ''}`}>
          <ChallanCopy title="JAMIA RECORD COPY" type="jamia" />
          <ChallanCopy title="BANK COPY" type="bank" />
          <ChallanCopy title="STUDENT COPY" type="student" />
        </div>
        
        {/* Page Break for Print */}
        <div className={`print:break-before-page ${printMode !== 'all' ? 'print:hidden' : ''}`}></div>
        
        <div className={`bg-white border-2 border-gray-900 print:border-none print:m-0 ${printMode === 'challan' ? 'print:hidden' : ''}`}>
           <OfficialForm />
        </div>
      </motion.div>
      
      <style jsx global>{`
        @media print {
          @page {
            size: A4 portrait;
            margin: 0mm;
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
