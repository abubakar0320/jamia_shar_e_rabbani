'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  DollarSign, AlertCircle, CheckCircle2, Activity, Search, Calendar, Landmark, 
  Folder, Settings, Plus, FileText, CheckSquare as CheckSquareIcon, Square, 
  Printer, Trash2, ArrowLeft, X, Edit, Copy, XCircle, ShieldCheck, Eye, Clock, 
  Smartphone, User
} from 'lucide-react';
import AdmissionScheduleModal from '@/components/AdmissionScheduleModal';
import { Challan, FeeCategory, FeeStructure, Student } from './types';

interface FeesChallansModuleProps {
  challans: Challan[];
  feeCategories: FeeCategory[];
  feeStructures: FeeStructure[];
  students: Student[];
  admissionSchedule: any;
  fetchAllData: () => void;
  handlePrint?: () => void;
  handleDownloadPDF?: (title: string) => void;
}

export default function FeesChallansModule({
  challans,
  feeCategories,
  feeStructures,
  students,
  admissionSchedule,
  fetchAllData,
  handlePrint = () => window.print(),
  handleDownloadPDF = (t: string) => alert(`Downloading ${t}...`)
}: FeesChallansModuleProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedChallan, setSelectedChallan] = useState<Challan | null>(null);

  // Modals
  const [showChallanBuilderModal, setShowChallanBuilderModal] = useState(false);
  const [showFeeStructuresModal, setShowFeeStructuresModal] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showBankModal, setShowBankModal] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showCategoriesModal, setShowCategoriesModal] = useState(false);

  const totalCollected = challans.filter(c => c.status === 'Paid').reduce((sum, c) => sum + (c.paidAmount || 0), 0);
  const pendingAmount = challans.filter(c => c.status !== 'Paid').reduce((sum, c) => sum + (c.totalAmount - (c.paidAmount || 0)), 0);
  const paidStudents = challans.filter(c => c.status === 'Paid').length;
  const unpaidStudents = challans.filter(c => c.status === 'Unpaid').length;
  const partiallyPaid = challans.filter(c => c.status === 'Partially Paid').length;

  const filteredChallans = challans.filter(c => {
    const matchesSearch = c.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.rollNo?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          c.challanNo?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesClass = classFilter === 'All' || c.classProgram === classFilter;
    return matchesSearch && matchesStatus && matchesClass;
  });

  const toggleSelection = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleAllSelection = () => {
    if (selectedIds.length === filteredChallans.length) setSelectedIds([]);
    else setSelectedIds(filteredChallans.map(s => s.id));
  };

  const handleCategoryToggle = async (cat: FeeCategory) => {
    const newStatus = cat.status === 'Active' ? 'Inactive' : 'Active';
    await fetch(`/api/admin/fee-categories/${cat.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus })
    });
    fetchAllData();
  };

  const handleDeleteCategory = async (id: number) => {
    if (!confirm("Are you sure you want to delete this fee category? It will be removed from future challans but historical challans will be preserved.")) return;
    await fetch(`/api/admin/fee-categories/${id}`, { method: 'DELETE' });
    fetchAllData();
  };

  const handleMarkAsPaid = async (id: number) => {
    const challan = challans.find(c => c.id === id);
    if (!challan) return;
    const amount = prompt(`Enter amount paid by ${challan.studentName} (Total Due: ${challan.totalAmount - (challan.paidAmount || 0)}):`, (challan.totalAmount - (challan.paidAmount || 0)).toString());
    if (!amount || isNaN(parseInt(amount))) return;
    
    const paid = (challan.paidAmount || 0) + parseInt(amount);
    let status = 'Partially Paid';
    if (paid >= challan.totalAmount) status = 'Paid';
    
    await fetch(`/api/admin/challans/${id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' }, 
      body: JSON.stringify({ paidAmount: paid, status, paymentDate: new Date().toISOString().split('T')[0], paymentMethod: 'Cash' })
    });
    alert("Payment Recorded.");
    fetchAllData();
  };

  const handleVerifyPayment = async (id: number) => {
    if (!confirm("Kya aap is payment ko verify kar ke challan ko PAID mark karna chahte hain?")) return;
    try {
      const res = await fetch(`/api/admin/verify-challan-payment/${id}`, { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        alert("Payment kamyabi se verify ho gayi aur challan PAID ho gaya!");
        fetchAllData();
      } else {
        alert(data.error || "Payment verify karne mein masla aya.");
      }
    } catch (err) {
      alert("Network error occurred during verification.");
    }
  };

  const handleDeleteChallan = async (id: number) => {
    if (!confirm("Delete this challan?")) return;
    await fetch(`/api/admin/challans/${id}`, { method: 'DELETE' });
    fetchAllData();
  };

  if (selectedChallan) {
    return (
      <div className="bg-slate-100 min-h-screen pb-20 font-sans">
        <div className="p-4 bg-white border-b border-slate-200 flex justify-between items-center sticky top-0 z-10 shadow-sm print:hidden">
          <button onClick={() => setSelectedChallan(null)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-black uppercase text-xs tracking-widest"><ArrowLeft size={16}/> Back</button>
          <div className="flex gap-2">
            <button onClick={() => window.print()} className="px-4 py-2 bg-slate-800 text-white rounded-sm text-xs font-black uppercase tracking-widest"><Printer size={16} className="inline mr-2"/> Print</button>
            {selectedChallan.status !== 'Paid' && <button onClick={() => handleMarkAsPaid(selectedChallan.id)} className="px-4 py-2 bg-blue-600 text-white rounded-sm text-xs font-black uppercase tracking-widest"><CheckCircle2 size={16} className="inline mr-2"/> Mark Paid</button>}
          </div>
        </div>
        
        {/* Printable 3-Part Challan */}
        <div className="p-8 max-w-5xl mx-auto space-y-8 print:p-0 print:space-y-4 print:m-0">
          {[
            { title: "Bank Copy", color: "text-blue-800", border: "border-blue-800", bg: "bg-blue-50" },
            { title: "Jamia Copy", color: "text-blue-800", border: "border-blue-800", bg: "bg-blue-50" },
            { title: "Student Copy", color: "text-orange-800", border: "border-orange-800", bg: "bg-orange-50" }
          ].map((copy, i) => (
            <div key={i} className={`bg-white border-2 ${copy.border} rounded-sm p-6 relative overflow-hidden shadow-sm print:shadow-none print:border-b-2 print:border-dashed print:border-slate-400 print:rounded-none print:pb-8`}>
              <div className={`absolute top-0 right-0 ${copy.bg} ${copy.color} px-4 py-1 rounded-bl-xl font-black text-[10px] uppercase tracking-widest`}>{copy.title}</div>
              
              <div className="flex justify-between items-center mb-4 border-b-2 border-slate-200 pb-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 relative grayscale"><Image src="/logo.jpeg" alt="Logo" fill className="object-contain"/></div>
                  <div>
                    <h2 className="text-xl font-black text-slate-800 font-serif">JAMIA SHER-E-RABBANI</h2>
                    <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">Mananwala, Sheikhupura</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-black text-slate-800">Challan: {selectedChallan.challanNo}</div>
                  <div className="text-[10px] font-bold text-slate-500 mt-1">Issue: {selectedChallan.issueDate} | Due: <span className="text-rose-600 font-black">{selectedChallan.dueDate}</span></div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Student Details</div>
                  <div className="font-black text-slate-800 text-sm">{selectedChallan.studentName}</div>
                  <div className="text-xs font-bold text-slate-600">S/O {selectedChallan.fatherName}</div>
                  <div className="text-[10px] font-mono font-bold text-slate-500 mt-1">Roll: {selectedChallan.rollNo}</div>
                </div>
                <div className="text-right">
                  <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Academic Details</div>
                  <div className="font-black text-slate-800 text-sm">{selectedChallan.classProgram}</div>
                  <div className="text-xs font-bold text-slate-600">Session: {selectedChallan.session}</div>
                </div>
              </div>
              
              <table className="w-full text-left border-collapse border-2 border-slate-800 mb-4">
                <thead>
                  <tr className="bg-slate-100">
                    <th className="p-2 border border-slate-800 text-[10px] font-black uppercase">Fee Description</th>
                    <th className="p-2 border border-slate-800 text-[10px] font-black uppercase text-right">Amount (PKR)</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedChallan.feeDetails?.map((fee, idx) => (
                    <tr key={idx}>
                      <td className="p-2 border border-slate-800 text-xs font-bold">{fee.type}</td>
                      <td className="p-2 border border-slate-800 text-xs font-mono font-black text-right">Rs. {fee.amount}</td>
                    </tr>
                  ))}
                  <tr className="bg-slate-100 border-t-2 border-slate-800">
                    <td className="p-2 border border-slate-800 font-black text-xs uppercase">Total Payable</td>
                    <td className="p-2 border border-slate-800 font-black text-sm font-mono text-right">Rs. {selectedChallan.totalAmount}</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-between items-end mt-8 pt-4 border-t border-slate-200">
                <div className="text-[9px] font-bold text-slate-400">
                  <p>1. Please pay the fee before due date.</p>
                  <p>2. Late fee fine will be charged after due date.</p>
                </div>
                <div className="flex gap-12">
                  <div className="text-center"><div className="w-24 border-b border-slate-800 mb-1"></div><span className="text-[9px] font-bold uppercase text-slate-500">Cashier Sign</span></div>
                  <div className="text-center"><div className="w-24 border-b border-slate-800 mb-1"></div><span className="text-[9px] font-bold uppercase text-slate-500">Bank Stamp</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-6 rounded-sm border shadow-sm bg-indigo-900 border-indigo-800 text-white">
          <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-2 flex items-center gap-2"><DollarSign size={14}/> Total Collected</p>
          <h3 className="text-4xl font-black">Rs. {totalCollected.toLocaleString()}</h3>
        </div>
        <div className="p-6 rounded-sm border shadow-sm bg-rose-50 border-rose-100 text-rose-800">
          <p className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-2 flex items-center gap-2"><AlertCircle size={14}/> Pending Fees</p>
          <h3 className="text-4xl font-black">Rs. {pendingAmount.toLocaleString()}</h3>
        </div>
        <div className="p-6 rounded-sm border shadow-sm bg-blue-50 border-blue-100 text-blue-800">
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2 flex items-center gap-2"><CheckCircle2 size={14}/> Paid Students</p>
          <h3 className="text-4xl font-black">{paidStudents}</h3>
        </div>
        <div className="p-6 rounded-sm border shadow-sm bg-amber-50 border-amber-100 text-amber-800">
          <p className="text-[10px] font-black uppercase tracking-widest text-amber-500 mb-2 flex items-center gap-2"><Activity size={14}/> Unpaid / Partial</p>
          <h3 className="text-4xl font-black">{unpaidStudents + partiallyPaid}</h3>
        </div>
      </div>

      <div className="bg-white p-6 rounded-sm shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input type="text" placeholder="Search by student, roll no, or challan no..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 rounded-sm text-sm transition-all font-bold text-slate-700" />
            </div>
          </div>
          <div className="flex flex-wrap justify-start lg:justify-end items-center gap-2 md:gap-3 w-full lg:w-auto">
            <button onClick={() => setShowScheduleModal(true)} className="flex-1 md:flex-none justify-center px-3 md:px-6 py-2.5 md:py-3 bg-white border border-slate-200 text-slate-700 rounded-sm text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"><Calendar size={14} className="inline mr-1.5 md:mr-2 md:w-4 md:h-4"/> Schedule</button>
            <button onClick={() => setShowRegistrationModal(true)} className="flex-1 md:flex-none justify-center px-3 md:px-6 py-2.5 md:py-3 bg-white border border-slate-200 text-slate-700 rounded-sm text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"><DollarSign size={14} className="inline mr-1.5 md:mr-2 md:w-4 md:h-4"/> Reg Fee</button>
            <button onClick={() => setShowBankModal(true)} className="flex-1 md:flex-none justify-center px-3 md:px-6 py-2.5 md:py-3 bg-white border border-slate-200 text-slate-700 rounded-sm text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"><Landmark size={14} className="inline mr-1.5 md:mr-2 md:w-4 md:h-4"/> Bank</button>
            <button onClick={() => setShowCategoriesModal(true)} className="flex-1 md:flex-none justify-center px-3 md:px-6 py-2.5 md:py-3 bg-white border border-slate-200 text-slate-700 rounded-sm text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"><Folder size={14} className="inline mr-1.5 md:mr-2 md:w-4 md:h-4"/> Categories</button>
            <button onClick={() => setShowFeeStructuresModal(true)} className="flex-1 md:flex-none justify-center px-3 md:px-6 py-2.5 md:py-3 bg-white border border-slate-200 text-slate-700 rounded-sm text-[10px] md:text-xs font-black uppercase tracking-widest hover:bg-slate-50 transition-all shadow-sm"><Settings size={14} className="inline mr-1.5 md:mr-2 md:w-4 md:h-4"/> Templates</button>
            <button onClick={() => setShowChallanBuilderModal(true)} className="w-full lg:w-auto px-4 md:px-6 py-3 bg-blue-600 text-white rounded-sm text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-sm flex items-center justify-center"><Plus size={16} className="inline mr-2"/> Generate Challan</button>
          </div>
        </div>
      </div>

      {/* Main Challans Directory (Card Grid) */}
      <div className="bg-white rounded-sm shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/50">
          <div className="flex items-center gap-4 flex-wrap">
            <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2"><FileText size={20} className="text-blue-600"/> Challans & Payments</h3>
            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
            <button onClick={toggleAllSelection} className="flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-600 hover:text-indigo-600 transition-colors bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm">
              {selectedIds.length === filteredChallans.length && filteredChallans.length > 0 ? <CheckSquareIcon size={14} className="text-indigo-600"/> : <Square size={14}/>}
              Select All
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 p-3 md:p-6 min-h-[500px] bg-slate-50/50">
          {filteredChallans.map((ch) => {
            const isSelected = selectedIds.includes(ch.id);
            return (
              <div key={ch.id} className={`relative p-3 md:p-5 rounded-xl md:rounded-2xl border transition-all flex flex-col ${isSelected ? 'bg-indigo-50 border-indigo-200 shadow-md' : 'bg-white border-slate-200 hover:border-indigo-300 shadow-sm hover:shadow-md'}`}>
                <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10">
                  <button onClick={() => toggleSelection(ch.id)} className={`p-1 rounded-md bg-white/80 backdrop-blur-sm shadow-sm border ${isSelected ? 'text-indigo-600 border-indigo-200' : 'text-slate-300 hover:text-slate-400 border-slate-100'}`}>
                    {isSelected ? <CheckSquareIcon size={16} className="md:w-5 md:h-5"/> : <Square size={16} className="md:w-5 md:h-5"/>}
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-3 mb-3 md:mb-4 text-center md:text-left pt-4 md:pt-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full md:rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-black text-xl shrink-0 mx-auto md:mx-0 shadow-inner">
                    {ch.studentName?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0 px-1 md:px-0">
                    <h4 className="font-black text-xs md:text-sm text-slate-800 line-clamp-1" title={ch.studentName}>{ch.studentName}</h4>
                    <p className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-wider line-clamp-1">{ch.classProgram} • {ch.rollNo}</p>
                  </div>
                </div>

                <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-5 flex-1 bg-slate-50 p-2 md:p-3 rounded-lg border border-slate-100">
                  <div className="flex justify-between items-center text-[10px] md:text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[8px] md:text-[9px]">Challan No</span>
                    <span className="font-mono font-black text-slate-700">{ch.challanNo}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] md:text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[8px] md:text-[9px]">Amount</span>
                    <span className="font-black text-slate-800">Rs. {ch.totalAmount}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] md:text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[8px] md:text-[9px]">Due Date</span>
                    <span className="font-bold text-slate-600">{ch.dueDate}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] md:text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[8px] md:text-[9px]">Items</span>
                    <span className="font-bold text-slate-600">{ch.feeDetails?.length} Items</span>
                  </div>

                  <div className="flex justify-between items-center text-[10px] md:text-xs pt-1.5 border-t border-slate-200 mt-1.5">
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[8px] md:text-[9px]">Status</span>
                    <span className={`inline-block px-1.5 py-0.5 rounded-md text-[8px] md:text-[9px] font-black uppercase tracking-widest
                     ${ch.status === 'Paid' ? 'bg-emerald-100 text-emerald-700 border border-emerald-300' : 
                       ch.status === 'Pending Verification' ? 'bg-amber-100 text-amber-800 border border-amber-300 animate-pulse' :
                       ch.status === 'Partially Paid' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'}
                     `}>{ch.status}</span>
                  </div>

                  {ch.paymentMethod && (
                    <div className="flex justify-between items-center text-[10px] md:text-xs pt-1 border-t border-slate-100">
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-[8px] md:text-[9px]">Method</span>
                      <span className="font-bold text-slate-700 text-[9px]">{ch.paymentMethod}</span>
                    </div>
                  )}

                  {ch.transactionId && (
                    <div className="flex justify-between items-center text-[10px] md:text-xs bg-amber-50/70 p-1 rounded border border-amber-200">
                      <span className="text-amber-800 font-bold uppercase tracking-widest text-[8px] md:text-[9px]">TID</span>
                      <span className="font-mono font-black text-amber-900 text-[10px] truncate max-w-[120px]">{ch.transactionId}</span>
                    </div>
                  )}

                  {ch.senderPhone && (
                    <div className="flex justify-between items-center text-[10px] md:text-xs">
                      <span className="text-slate-400 font-bold uppercase tracking-widest text-[8px] md:text-[9px]">Sender</span>
                      <span className="font-mono text-slate-600 text-[9px]">{ch.senderPhone}</span>
                    </div>
                  )}

                  {ch.paymentProofUrl && (
                    <div className="pt-0.5">
                      <a href={ch.paymentProofUrl} target="_blank" rel="noopener noreferrer" className="text-[9px] text-blue-600 hover:text-blue-800 hover:underline font-bold flex items-center gap-1">
                        <Eye size={11} /> View Receipt Proof
                      </a>
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between gap-1.5 md:gap-2 mt-auto">
                  {ch.status === 'Pending Verification' ? (
                    <button 
                      onClick={() => handleVerifyPayment(ch.id)} 
                      className="flex-1 py-1.5 md:py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-md md:rounded-lg transition-all shadow-sm flex items-center justify-center gap-1 text-[10px] font-black uppercase tracking-wider" 
                      title="Verify & Mark Paid"
                    >
                      <ShieldCheck size={14} /> Verify
                    </button>
                  ) : ch.status !== 'Paid' ? (
                    <button onClick={() => handleMarkAsPaid(ch.id)} className="flex-1 py-1.5 md:py-2 bg-blue-50 border border-blue-200 rounded-md md:rounded-lg hover:bg-blue-100 hover:border-blue-300 hover:text-blue-700 transition-all shadow-sm flex items-center justify-center text-blue-600" title="Mark Paid">
                      <CheckCircle2 size={14} className="md:w-4 md:h-4" />
                    </button>
                  ) : null}
                  <button onClick={() => setSelectedChallan(ch)} className="flex-1 py-1.5 md:py-2 bg-slate-50 border border-slate-200 rounded-md md:rounded-lg hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm flex items-center justify-center text-slate-600" title="View Challan"><Printer size={14} className="md:w-4 md:h-4" /></button>
                  <button onClick={() => handleDeleteChallan(ch.id)} className="flex-1 py-1.5 md:py-2 bg-rose-50 border border-rose-100 rounded-md md:rounded-lg hover:bg-rose-100 hover:border-rose-200 hover:text-rose-700 transition-all shadow-sm flex items-center justify-center text-rose-500" title="Delete"><Trash2 size={14} className="md:w-4 md:h-4" /></button>
                </div>
              </div>
            );
          })}
          {filteredChallans.length === 0 && (
            <div className="col-span-full py-20 text-center flex flex-col items-center justify-center">
              <Search size={40} className="text-slate-200 mb-4" />
              <p className="text-sm font-bold text-slate-500">No challans match your search criteria.</p>
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      {showFeeStructuresModal && (
        <FeeSettingsModal 
          onClose={() => setShowFeeStructuresModal(false)}
          feeStructures={feeStructures}
          onUpdate={fetchAllData}
        />
      )}

      {showRegistrationModal && (
        <RegistrationFeeModal 
          onClose={() => setShowRegistrationModal(false)}
          onUpdate={fetchAllData}
        />
      )}

      {showBankModal && (
        <BankSettingsModal 
          onClose={() => setShowBankModal(false)}
        />
      )}

      {showScheduleModal && admissionSchedule && (
        <AdmissionScheduleModal 
          onClose={() => setShowScheduleModal(false)}
          schedule={admissionSchedule}
          onUpdate={fetchAllData}
        />
      )}

      {showCategoriesModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 p-4">
          <div className="bg-white w-full max-w-4xl rounded-sm shadow-sm border border-gray-200 flex flex-col max-h-[90vh] overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
              <h2 className="text-xl font-black text-slate-800 flex items-center gap-2"><Folder className="text-indigo-600"/> Manage Fee Categories</h2>
              <button onClick={() => setShowCategoriesModal(false)} className="text-slate-400 hover:text-slate-800"><X size={24}/></button>
            </div>
            <div className="p-4 md:p-6 flex-1 overflow-y-auto bg-slate-50">
              <button onClick={() => {
                const name = prompt("Enter Category Name (e.g. Building Fund):");
                if (!name) return;
                const amount = parseInt(prompt(`Amount for ${name}:`, "500") || "0");
                const description = prompt("Description:");
                fetch('/api/admin/fee-categories', {
                  method: 'POST', headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ name, amount, description: description || name, status: 'Active', dateCreated: new Date().toISOString().split('T')[0] })
                }).then(() => fetchAllData());
              }} className="mb-4 md:mb-6 w-full md:w-auto px-4 py-3 md:py-2 bg-indigo-600 text-white rounded-sm text-xs font-black uppercase tracking-widest hover:bg-indigo-700 flex justify-center items-center"><Plus size={16} className="inline mr-2"/> Add New Category</button>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4">
                {feeCategories.map(cat => (
                  <div key={cat.id} className={`bg-white p-5 rounded-sm border ${cat.status === 'Active' ? 'border-indigo-200' : 'border-slate-200 opacity-60'} shadow-sm relative group`}>
                    <div className="absolute top-3 right-3 md:top-4 md:right-4 flex gap-2">
                      <button onClick={() => handleCategoryToggle(cat)} title={cat.status === 'Active' ? 'Deactivate' : 'Activate'} className="text-slate-400 hover:text-amber-600 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-1 bg-slate-50 md:bg-transparent rounded">
                        {cat.status === 'Active' ? <XCircle size={16}/> : <CheckCircle2 size={16}/>}
                      </button>
                      <button onClick={() => {
                        const amt = prompt(`New amount for ${cat.name}:`, cat.amount.toString());
                        if(amt) fetch(`/api/admin/fee-categories/${cat.id}`, { method: 'PUT', headers:{'Content-Type':'application/json'}, body:JSON.stringify({amount:parseInt(amt)})}).then(()=>fetchAllData());
                      }} title="Edit Amount" className="text-slate-400 hover:text-indigo-600 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-1 bg-slate-50 md:bg-transparent rounded"><Edit size={16}/></button>
                      <button onClick={() => handleDeleteCategory(cat.id)} className="text-slate-400 hover:text-rose-600 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity p-1 bg-slate-50 md:bg-transparent rounded"><Trash2 size={16}/></button>
                    </div>
                    <h3 className="font-black text-slate-800 mb-1">{cat.name}</h3>
                    <p className="text-xs text-slate-500 mb-4">{cat.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="font-black text-lg text-indigo-700">Rs. {cat.amount}</span>
                      <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-1 rounded-md ${cat.status === 'Active' ? 'bg-blue-100 text-blue-700' : 'bg-slate-200 text-slate-500'}`}>{cat.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {showChallanBuilderModal && (
        <ChallanBuilderModal 
          onClose={() => setShowChallanBuilderModal(false)}
          students={students}
          feeCategories={feeCategories}
          onGenerate={() => { setShowChallanBuilderModal(false); fetchAllData(); }}
        />
      )}
    </div>
  );
}

// ----------------------------------------------------
// Sub-modals used by Fees module
// ----------------------------------------------------

function ChallanBuilderModal({ onClose, students, feeCategories, onGenerate }: any) {
  const [rollNo, setRollNo] = useState('');
  const [student, setStudent] = useState<any>(null);
  const [selectedCats, setSelectedCats] = useState<any[]>([]);
  const [customEntries, setCustomEntries] = useState<any[]>([]);
  const [dueDate, setDueDate] = useState(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]);

  const activeCategories = feeCategories.filter((c: any) => c.status === 'Active');

  const handleSearch = () => {
    const s = students.find((st: any) => st.rollNo === rollNo);
    if(s) setStudent(s);
    else alert('Student not found');
  };

  const toggleCat = (cat: any) => {
    if (selectedCats.some(c => c.id === cat.id)) {
      setSelectedCats(selectedCats.filter(c => c.id !== cat.id));
    } else {
      setSelectedCats([...selectedCats, cat]);
    }
  };

  const totalAmount = selectedCats.reduce((sum, c) => sum + c.amount, 0) + customEntries.reduce((sum, c) => sum + c.amount, 0);

  const generate = async () => {
    if(!student) return alert('Select student first');
    if(selectedCats.length === 0 && customEntries.length === 0) return alert('Select at least one fee item');

    const feeDetails = [
      ...selectedCats.map(c => ({ type: c.name, amount: c.amount })),
      ...customEntries.map(c => ({ type: c.name, amount: c.amount }))
    ];

    const newChallan = {
      studentId: student.studentId,
      rollNo: student.rollNo,
      studentName: student.studentName,
      fatherName: student.fatherName,
      classProgram: student.classProgram,
      session: student.fees?.session || "2026-27",
      feeDetails,
      totalAmount,
      issueDate: new Date().toISOString().split('T')[0],
      dueDate,
      status: 'Unpaid',
      paidAmount: 0
    };

    await fetch('/api/admin/challans', {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newChallan)
    });
    alert('Challan generated successfully!');
    onGenerate();
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
      <div className="bg-slate-50 w-full max-w-5xl rounded-sm shadow-sm border border-gray-200 flex flex-col max-h-[95vh] overflow-hidden">
        <div className="p-6 border-b border-slate-200 flex justify-between items-center bg-white">
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2"><FileText className="text-blue-600"/> Challan Builder</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-800"><X size={24}/></button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col lg:flex-row gap-4 md:gap-6">
          <div className="flex-1 space-y-4 md:space-y-6">
            <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm">
              <h3 className="font-black text-slate-800 mb-4 text-sm uppercase tracking-widest">1. Select Student</h3>
              <div className="flex flex-col md:flex-row gap-2">
                <input type="text" placeholder="Enter Roll No..." value={rollNo} onChange={(e)=>setRollNo(e.target.value)} className="flex-1 bg-slate-50 border border-slate-200 rounded-sm px-4 py-3 md:py-2 font-bold focus:ring-2 focus:ring-blue-500 outline-none" />
                <button onClick={handleSearch} className="w-full md:w-auto px-6 py-3 md:py-2 bg-slate-800 text-white rounded-sm font-black text-xs uppercase tracking-widest hover:bg-slate-700 transition-all">Search</button>
              </div>
              {student && (
                <div className="mt-4 p-4 bg-blue-50 border border-blue-100 rounded-sm flex items-center gap-4 animate-in fade-in zoom-in-95">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-blue-600 font-black shadow-sm"><User size={20}/></div>
                  <div>
                    <div className="font-black text-blue-800">{student.studentName}</div>
                    <div className="text-xs font-bold text-blue-600 mt-1">{student.classProgram} • S/O {student.fatherName}</div>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm">
              <h3 className="font-black text-slate-800 mb-4 text-sm uppercase tracking-widest flex justify-between">2. Select Categories</h3>
              <div className="space-y-2">
                {activeCategories.length === 0 ? <p className="text-sm text-slate-500 font-bold">No active categories found. Add them in Categories Manager.</p> : activeCategories.map((cat: any) => (
                  <label key={cat.id} className="flex items-center gap-3 p-3 rounded-sm border border-slate-100 hover:bg-slate-50 cursor-pointer transition-colors">
                    <input type="checkbox" checked={selectedCats.some(c=>c.id === cat.id)} onChange={() => toggleCat(cat)} className="w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
                    <div className="flex-1">
                      <div className="font-black text-slate-700">{cat.name}</div>
                      <div className="text-[10px] text-slate-400 font-bold mt-0.5">{cat.description}</div>
                    </div>
                    <div className="font-black text-slate-800">Rs. {cat.amount}</div>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm">
              <h3 className="font-black text-slate-800 mb-4 text-sm uppercase tracking-widest">3. Custom Entries (Optional)</h3>
              <button onClick={() => {
                const name = prompt("Enter Custom Item Name:");
                if(!name) return;
                const amount = parseInt(prompt("Enter Amount:") || "0");
                if(name && amount > 0) setCustomEntries([...customEntries, { name, amount }]);
              }} className="w-full md:w-auto px-4 py-3 md:py-2 bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-800 rounded-sm font-black text-xs uppercase tracking-widest border border-slate-200 transition-colors flex justify-center items-center"><Plus size={14} className="inline mr-2"/> Add Custom Item</button>
              {customEntries.length > 0 && (
                <div className="mt-4 space-y-2">
                  {customEntries.map((c, i) => (
                    <div key={i} className="flex items-center justify-between p-3 rounded-sm bg-slate-50 border border-slate-100">
                      <div className="font-bold text-slate-700 text-sm">{c.name}</div>
                      <div className="flex items-center gap-4">
                        <span className="font-black text-slate-800">Rs. {c.amount}</span>
                        <button onClick={() => setCustomEntries(customEntries.filter((_, idx)=>idx!==i))} className="text-rose-400 hover:text-rose-600"><Trash2 size={16}/></button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="w-full lg:w-80 bg-white p-4 md:p-6 rounded-sm border border-slate-200 shadow-sm flex flex-col">
            <h3 className="font-black text-slate-800 mb-4 md:mb-6 text-sm uppercase tracking-widest border-b border-slate-100 pb-4">Summary</h3>
            
            <div className="flex-1 space-y-4">
              {selectedCats.map((c, i) => (
                <div key={`cat-${i}`} className="flex justify-between text-sm">
                  <span className="text-slate-500 font-bold truncate max-w-[140px]">{c.name}</span>
                  <span className="text-slate-800 font-black">Rs. {c.amount}</span>
                </div>
              ))}
              {customEntries.map((c, i) => (
                <div key={`cust-${i}`} className="flex justify-between text-sm">
                  <span className="text-indigo-500 font-bold truncate max-w-[140px]">{c.name}</span>
                  <span className="text-slate-800 font-black">Rs. {c.amount}</span>
                </div>
              ))}
            </div>

            <div className="mt-8 border-t-2 border-slate-800 pt-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xs font-black uppercase tracking-widest text-slate-400">Total Payable</span>
                <span className="text-2xl font-black text-blue-600">Rs. {totalAmount}</span>
              </div>
              <div className="space-y-2 mb-6">
                <label className="text-xs font-black uppercase tracking-widest text-slate-400">Due Date</label>
                <input type="date" value={dueDate} onChange={(e)=>setDueDate(e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-sm px-4 py-2 font-bold focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <button onClick={generate} disabled={!student || totalAmount === 0} className="w-full py-4 bg-blue-600 text-white rounded-sm font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-sm shadow-blue-600/30 disabled:opacity-50 disabled:shadow-none flex items-center justify-center gap-2"><CheckCircle2 size={18}/> Generate Challan</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function RegistrationFeeModal({ onClose, onUpdate }: any) {
  const [regFee, setRegFee] = useState(1000);
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    fetch('/api/fee-config')
      .then(res => res.json())
      .then(data => setRegFee(data.registrationFee || 1000))
      .catch(console.error);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const feeConfigRes = await fetch('/api/fee-config');
    const config = await feeConfigRes.json();
    await fetch('/api/admin/fee-config', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...config, registrationFee: regFee })
    });
    setSaving(false);
    onUpdate();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 p-4">
      <div className="bg-white w-full max-w-sm rounded-sm shadow-sm border border-gray-200 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2"><DollarSign className="text-indigo-600"/> Registration Fee</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-800"><X size={24}/></button>
        </div>
        <form onSubmit={handleSave} className="p-6 space-y-6">
          <div>
            <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Registration Fee Amount</label>
            <input type="number" required value={regFee} onChange={e => setRegFee(parseInt(e.target.value) || 0)} className="w-full px-4 py-2 border border-slate-200 rounded-sm font-bold focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none text-2xl" />
          </div>
          <div className="flex gap-4 pt-4 border-t border-slate-100">
            <button type="submit" disabled={saving} className="flex-1 py-3 bg-indigo-600 text-white rounded-sm font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-colors disabled:opacity-50">{saving ? 'Saving...' : 'Save'}</button>
            <button type="button" onClick={onClose} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-colors">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

function BankSettingsModal({ onClose }: any) {
  const [activeTab, setActiveTab] = useState<'meezan' | 'jazzcash' | 'nayapay'>('meezan');
  const [config, setConfig] = useState<any>({
    meezan: {
      bankName: 'Meezan Bank',
      accountTitle: 'Muhammad Ahmad (Asaan Account)',
      accountNumber: '98690112101313',
      branch: 'Mananwala',
      iban: 'PK12MEZN0098690112101313'
    },
    jazzcash: {
      accountTitle: 'Muhammad Ahmad',
      accountNumber: '03284381312',
      instructions: 'Send via JazzCash App -> Money Transfer / Mobile Account'
    },
    nayapay: {
      accountTitle: 'Muhammad Ahmad',
      accountNumber: '03164415465',
      instructions: 'Send via NayaPay / Raast (Instant & 0% fee)'
    },
    bankName: 'Meezan Bank',
    accountTitle: 'Muhammad Ahmad (Asaan Account)',
    accountNumber: '98690112101313'
  });
  const [saving, setSaving] = useState(false);

  React.useEffect(() => {
    fetch('/api/payment-accounts')
      .then(res => res.json())
      .then(data => {
        if (data) setConfig((prev: any) => ({ ...prev, ...data }));
      })
      .catch(console.error);
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...config,
      bankName: config.meezan?.bankName || 'Meezan Bank',
      accountTitle: config.meezan?.accountTitle || 'Muhammad Ahmad',
      accountNumber: config.meezan?.accountNumber || '98690112101313'
    };
    await fetch('/api/admin/payment-accounts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });
    setSaving(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 p-4">
      <div className="bg-white w-full max-w-lg rounded-2xl shadow-xl border border-gray-200 flex flex-col overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <div>
            <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
              <Landmark className="text-indigo-600" /> Payment Accounts Settings
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">Configure official Meezan, JazzCash, and NayaPay accounts</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-800"><X size={24} /></button>
        </div>

        <div className="flex border-b border-slate-200 bg-slate-100/70 p-1.5 gap-1.5">
          <button
            type="button"
            onClick={() => setActiveTab('meezan')}
            className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'meezan' ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Meezan Bank
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('jazzcash')}
            className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'jazzcash' ? 'bg-white text-rose-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            JazzCash
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('nayapay')}
            className={`flex-1 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
              activeTab === 'nayapay' ? 'bg-white text-emerald-700 shadow-sm' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            NayaPay / Raast
          </button>
        </div>

        <form onSubmit={handleSave} className="p-6 space-y-4">
          {activeTab === 'meezan' && (
            <>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Bank Name</label>
                <input
                  type="text"
                  required
                  value={config.meezan?.bankName || ''}
                  onChange={e => setConfig({ ...config, meezan: { ...config.meezan, bankName: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl font-bold focus:border-indigo-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Account Title</label>
                <input
                  type="text"
                  required
                  value={config.meezan?.accountTitle || ''}
                  onChange={e => setConfig({ ...config, meezan: { ...config.meezan, accountTitle: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl font-bold focus:border-indigo-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Account Number</label>
                <input
                  type="text"
                  required
                  value={config.meezan?.accountNumber || ''}
                  onChange={e => setConfig({ ...config, meezan: { ...config.meezan, accountNumber: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl font-mono font-bold focus:border-indigo-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Branch</label>
                <input
                  type="text"
                  value={config.meezan?.branch || ''}
                  onChange={e => setConfig({ ...config, meezan: { ...config.meezan, branch: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl font-bold focus:border-indigo-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">IBAN Number</label>
                <input
                  type="text"
                  value={config.meezan?.iban || ''}
                  onChange={e => setConfig({ ...config, meezan: { ...config.meezan, iban: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl font-mono font-bold focus:border-indigo-500 outline-none text-sm"
                />
              </div>
            </>
          )}

          {activeTab === 'jazzcash' && (
            <>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Account Title</label>
                <input
                  type="text"
                  required
                  value={config.jazzcash?.accountTitle || ''}
                  onChange={e => setConfig({ ...config, jazzcash: { ...config.jazzcash, accountTitle: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl font-bold focus:border-rose-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">JazzCash Mobile Number</label>
                <input
                  type="text"
                  required
                  value={config.jazzcash?.accountNumber || ''}
                  onChange={e => setConfig({ ...config, jazzcash: { ...config.jazzcash, accountNumber: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl font-mono font-bold focus:border-rose-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Instructions</label>
                <input
                  type="text"
                  value={config.jazzcash?.instructions || ''}
                  onChange={e => setConfig({ ...config, jazzcash: { ...config.jazzcash, instructions: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl font-medium focus:border-rose-500 outline-none text-xs"
                />
              </div>
            </>
          )}

          {activeTab === 'nayapay' && (
            <>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Account Title</label>
                <input
                  type="text"
                  required
                  value={config.nayapay?.accountTitle || ''}
                  onChange={e => setConfig({ ...config, nayapay: { ...config.nayapay, accountTitle: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl font-bold focus:border-emerald-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Raast ID / NayaPay Number</label>
                <input
                  type="text"
                  required
                  value={config.nayapay?.accountNumber || ''}
                  onChange={e => setConfig({ ...config, nayapay: { ...config.nayapay, accountNumber: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl font-mono font-bold focus:border-emerald-500 outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Instructions</label>
                <input
                  type="text"
                  value={config.nayapay?.instructions || ''}
                  onChange={e => setConfig({ ...config, nayapay: { ...config.nayapay, instructions: e.target.value } })}
                  className="w-full px-4 py-2 border border-slate-200 rounded-xl font-medium focus:border-emerald-500 outline-none text-xs"
                />
              </div>
            </>
          )}

          <div className="flex gap-4 pt-4 border-t border-slate-100">
            <button
              type="submit"
              disabled={saving}
              className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-colors disabled:opacity-50"
            >
              {saving ? 'Saving...' : 'Save All Accounts'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function FeeSettingsModal({ onClose, feeStructures, onUpdate }: any) {
  const [activeTab, setActiveTab] = useState<'Tulba Section' | 'Talibat Section'>('Tulba Section');
  const [editingTemplate, setEditingTemplate] = useState<any>(null);

  const filteredStructures = feeStructures.filter((fs: any) => fs.sectionType === activeTab);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/admin/fee-structures/${editingTemplate.id}`, {
      method: 'PUT', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(editingTemplate)
    });
    setEditingTemplate(null);
    onUpdate();
  };

  const handleCopy = async (fs: any) => {
    const targetClass = prompt(`Copy ${fs.classProgram} fee structure to which class?`);
    if (!targetClass) return;
    const targetFs = feeStructures.find((f:any) => f.classProgram.toLowerCase() === targetClass.toLowerCase() && f.sectionType === fs.sectionType);
    if (!targetFs) return alert('Target class fee structure not found. Please enter exact class name.');
    
    const confirmed = confirm(`Overwrite ${targetFs.classProgram} fees with ${fs.classProgram} fees?`);
    if (confirmed) {
      await fetch(`/api/admin/fee-structures/${targetFs.id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fs, id: targetFs.id, classProgram: targetFs.classProgram })
      });
      alert('Fee Structure Copied Successfully.');
      onUpdate();
    }
  };

  if (editingTemplate) {
    const fields = [
      { key: 'phase1Fee', label: 'Phase 1 Fee' }, 
      { key: 'phase2Fee', label: 'Phase 2 Fee' },
      { key: 'phase3Fee', label: 'Phase 3 Fee' },
      { key: 'registrationFee', label: 'Registration Fee' }
    ];
    return (
      <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 p-4">
        <div className="bg-white w-full max-w-2xl rounded-sm shadow-sm border border-gray-200 flex flex-col max-h-[90vh] overflow-hidden">
          <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
            <h2 className="text-xl font-black text-slate-800">Edit {editingTemplate.classProgram} ({editingTemplate.sectionType})</h2>
            <button onClick={() => setEditingTemplate(null)} className="text-slate-400 hover:text-slate-800"><X size={24}/></button>
          </div>
          <form onSubmit={handleSave} className="p-6 overflow-y-auto space-y-6">
            <div className="grid grid-cols-2 gap-4">
              {fields.map(f => (
                <div key={f.key}>
                  <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{f.label}</label>
                  <input type="number" value={editingTemplate[f.key] || 0} onChange={e => setEditingTemplate({...editingTemplate, [f.key]: parseInt(e.target.value) || 0})} className="w-full px-4 py-2 border border-slate-200 rounded-sm font-bold focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
                </div>
              ))}
            </div>
            <div className="flex gap-4 pt-4 border-t border-slate-100">
              <button type="submit" className="flex-1 py-3 bg-indigo-600 text-white rounded-sm font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-colors">Save Changes</button>
              <button type="button" onClick={() => setEditingTemplate(null)} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-colors">Cancel</button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-slate-900/50 p-4">
      <div className="bg-white w-full max-w-6xl rounded-sm shadow-sm border border-gray-200 flex flex-col max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h2 className="text-xl font-black text-slate-800 flex items-center gap-2"><Settings className="text-indigo-600"/> Advanced Fee Settings</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-800"><X size={24}/></button>
        </div>
        
        <div className="flex border-b border-slate-200 bg-white px-6">
          {['Tulba Section', 'Talibat Section'].map((tab: any) => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`py-4 px-6 font-black uppercase tracking-widest text-xs border-b-2 transition-all ${activeTab === tab ? 'border-indigo-600 text-indigo-700' : 'border-transparent text-slate-400 hover:text-slate-600'}`}>{tab}</button>
          ))}
        </div>

        <div className="p-4 md:p-6 flex-1 overflow-y-auto bg-slate-50">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6">
            {filteredStructures.map((fs: any) => (
              <div key={fs.id} className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm relative group hover:shadow-md transition-shadow">
                <div className="absolute top-3 right-3 md:top-4 md:right-4 flex gap-2">
                  <button onClick={() => setEditingTemplate(fs)} className="text-slate-400 hover:text-indigo-600 bg-slate-100 md:bg-slate-50 p-2 rounded-sm shadow-sm md:shadow-none" title="Edit Template"><Edit size={16}/></button>
                  <button onClick={() => handleCopy(fs)} className="text-slate-400 hover:text-blue-600 bg-slate-100 md:bg-slate-50 p-2 rounded-sm shadow-sm md:shadow-none" title="Copy Structure"><Copy size={16}/></button>
                </div>
                <h3 className="font-black text-slate-800 text-lg pr-20">{fs.classProgram}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Phase 1 Preset: Rs. {(fs.phase1Fee || 0) + (fs.registrationFee || 0)}</p>
                
                <div className="space-y-3">
                  <div className="flex justify-between text-xs font-bold"><span className="text-slate-500">Phase 1 Fee</span> <span className="text-slate-800">Rs. {fs.phase1Fee}</span></div>
                  <div className="flex justify-between text-xs font-bold"><span className="text-slate-500">Phase 2 Fee</span> <span className="text-slate-800">Rs. {fs.phase2Fee}</span></div>
                  <div className="flex justify-between text-xs font-bold"><span className="text-slate-500">Phase 3 Fee</span> <span className="text-slate-800">Rs. {fs.phase3Fee}</span></div>
                  <div className="flex justify-between text-xs font-bold"><span className="text-slate-500">Registration</span> <span className="text-slate-800">Rs. {fs.registrationFee}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
