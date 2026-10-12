'use client';

import React from 'react';
import Image from 'next/image';
import { 
  CheckCircle2, 
  Printer, 
  Share2, 
  X, 
  Download, 
  ArrowRight, 
  FileText, 
  DollarSign, 
  Calendar, 
  User, 
  GraduationCap 
} from 'lucide-react';

interface AdmissionReceiptModalProps {
  data: {
    studentName: string;
    fatherName: string;
    applicationNo: string;
    challanNo: string;
    classProgram: string;
    sectionType: string;
    mobile: string;
    fees?: {
      admissionFee?: number;
      registrationFee?: number;
      totalFee?: number;
      session?: string;
    };
    date?: string;
  };
  onClose: () => void;
  onProceedToChallan?: () => void;
}

export default function AdmissionReceiptModal({ data, onClose, onProceedToChallan }: AdmissionReceiptModalProps) {
  const session = data.fees?.session || '2026-27';
  const totalAmount = data.fees?.totalFee || ((data.fees?.admissionFee || 2000) + (data.fees?.registrationFee || 1000));
  const dateFormatted = data.date ? new Date(data.date).toLocaleDateString('en-PK', { day: '2-digit', month: 'short', year: 'numeric' }) : new Date().toLocaleDateString();

  const handlePrint = () => {
    window.print();
  };

  const handleWhatsAppShare = () => {
    const text = `السلام علیکم!
*جامعہ شیرِ ربانی (Jamia Sher-e-Rabbani)*
*داخلہ تصدیقی رسید (Admission Confirmation Slip)*

🧑‍🎓 *طالب علم:* ${data.studentName}
👤 *ولدیت:* ${data.fatherName}
📋 *درخواست نمبر (App No):* ${data.applicationNo}
🧾 *چالان نمبر (Challan No):* ${data.challanNo}
📚 *شعبہ / کلاس:* ${data.classProgram} (${data.sectionType})
📅 *تعلیمی سال:* ${session}
💰 *کل فیس:* Rs ${totalAmount.toLocaleString()}

آپ کی درخواست کامیابی سے موصول ہو چکی ہے۔ براہ کرم چالان فیس ادا کر کے سلپ پورٹل پر اپلوڈ کریں۔
آن لائن اسٹیٹس چیک کریں: https://jamiashererabbani.com/admissions/status?q=${data.applicationNo}`;

    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="fixed inset-0 z-[100] bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-3xl max-w-xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8 animate-in zoom-in-95 duration-200">
        
        {/* Header / Brand */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 p-6 text-white relative text-center">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
          >
            <X size={18} />
          </button>
          
          <div className="w-16 h-16 bg-white rounded-full mx-auto p-1 shadow-md mb-3 flex items-center justify-center">
            <Image src="/logo.jpeg" alt="Jamia Logo" width={56} height={56} className="rounded-full object-cover" />
          </div>

          <span className="inline-block px-3 py-1 bg-emerald-500/30 border border-emerald-400/40 rounded-full text-[11px] font-bold tracking-wider uppercase mb-1">
            Official Submission Receipt
          </span>
          <h2 className="text-xl md:text-2xl font-black tracking-tight">جامعہ شیرِ ربانی</h2>
          <p className="text-xs text-emerald-200 font-medium">Jamia Sher-e-Rabbani Educational Complex</p>
        </div>

        {/* Success Alert Banner */}
        <div className="bg-emerald-50 border-y border-emerald-100 px-6 py-4 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
            <CheckCircle2 size={24} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-emerald-900">درخواست کامیابی سے موصول ہو گئی!</h4>
            <p className="text-xs text-emerald-700">Application successfully registered. Please save your Application ID.</p>
          </div>
        </div>

        {/* Body Details */}
        <div className="p-6 md:p-8 space-y-6">
          
          {/* Key Identifiers Highlight */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Application No</span>
              <span className="text-lg font-mono font-black text-emerald-700">{data.applicationNo}</span>
            </div>
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-center">
              <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">Challan No</span>
              <span className="text-lg font-mono font-black text-blue-700">{data.challanNo}</span>
            </div>
          </div>

          {/* Student Info Table */}
          <div className="border border-slate-100 rounded-2xl overflow-hidden text-sm">
            <div className="flex justify-between items-center px-4 py-3 bg-slate-50/50 border-b border-slate-100">
              <span className="text-slate-500 font-medium flex items-center gap-1.5"><User size={14}/> Student Name</span>
              <span className="font-bold text-slate-900">{data.studentName}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-3 bg-white border-b border-slate-100">
              <span className="text-slate-500 font-medium">Father's Name</span>
              <span className="font-bold text-slate-900">{data.fatherName}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-3 bg-slate-50/50 border-b border-slate-100">
              <span className="text-slate-500 font-medium flex items-center gap-1.5"><GraduationCap size={14}/> Class / Darja</span>
              <span className="font-bold text-slate-900">{data.classProgram}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-3 bg-white border-b border-slate-100">
              <span className="text-slate-500 font-medium">Academic Session</span>
              <span className="font-bold text-slate-900 font-mono">{session}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-3 bg-slate-50/50 border-b border-slate-100">
              <span className="text-slate-500 font-medium flex items-center gap-1.5"><Calendar size={14}/> Submission Date</span>
              <span className="font-bold text-slate-700">{dateFormatted}</span>
            </div>
            <div className="flex justify-between items-center px-4 py-3 bg-emerald-50/60 text-emerald-950 font-bold">
              <span className="flex items-center gap-1.5"><DollarSign size={14} className="text-emerald-700"/> Total Payable Fee</span>
              <span className="text-base text-emerald-800">Rs {totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2">
            <button 
              onClick={handleWhatsAppShare}
              className="w-full py-3.5 px-4 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-sm shadow-md shadow-emerald-600/20 flex items-center justify-center gap-2 transition-colors"
            >
              <Share2 size={16} /> Save / Share Slip to WhatsApp
            </button>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={handlePrint}
                className="py-3 px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
              >
                <Printer size={16} /> Print Receipt
              </button>
              
              {onProceedToChallan ? (
                <button 
                  onClick={onProceedToChallan}
                  className="py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  <FileText size={16} /> View Bank Challan <ArrowRight size={14} />
                </button>
              ) : (
                <button 
                  onClick={() => window.location.href = `/admissions/status?q=${data.applicationNo}`}
                  className="py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
                >
                  Track Status <ArrowRight size={14} />
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Footer Note */}
        <div className="bg-slate-50 p-4 text-center border-t border-slate-100 text-xs text-slate-500">
          Helpline: <b className="text-slate-700">0314-4081516</b> • Jamia Sher-e-Rabbani, Gujranwala Road
        </div>

      </div>
    </div>
  );
}
