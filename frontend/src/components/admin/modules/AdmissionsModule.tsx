'use client';

import React, { useState } from 'react';
import { 
  ArrowLeft, CheckCircle2, XCircle, Clock, Edit, Download, Printer, Trash2, 
  User, Calendar, Shield, Phone, GraduationCap, BookOpen, Users, Folder, 
  FileCheck, DollarSign, Eye, RefreshCcw, Search, FileText, CheckSquare, Square
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Admission, OFFICIAL_CLASSES } from './types';

interface AdmissionsModuleProps {
  admissions: Admission[];
  fetchAllData: () => void;
  handlePrint?: () => void;
  handleDownloadPDF?: (title: string) => void;
  notifyAction?: (title: string) => void;
}

export function AdmissionsModule({
  admissions,
  fetchAllData,
  handlePrint = () => window.print(),
  handleDownloadPDF = (title: string) => alert(`Downloading ${title} as PDF...`),
  notifyAction = (msg: string) => alert(`Notification Sent: ${msg}`)
}: AdmissionsModuleProps) {
  const [selectedApplication, setSelectedApplication] = useState<Admission | null>(null);
  const [isEditingApp, setIsEditingApp] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [verifiedDocs, setVerifiedDocs] = useState<Record<string, boolean>>({});

  const [searchTerm, setSearchTerm] = useState('');
  const [sectionFilter, setSectionTypeFilter] = useState<'All' | 'Tulba' | 'Talibat'>('All');
  const [statusFilter, setStatusFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');
  const [sessionFilter, setSessionFilter] = useState('All');
  const [dateRange, setDateRange] = useState({ start: '', end: '' });

  const total = admissions.length;
  const pending = admissions.filter(a => a.status === 'Pending' || !a.status).length;
  const approved = admissions.filter(a => a.status === 'Approved').length;
  const rejected = admissions.filter(a => a.status === 'Rejected').length;
  const tulba = admissions.filter(a => a.sectionType?.toLowerCase().includes('tulba')).length;
  const talibat = admissions.filter(a => a.sectionType?.toLowerCase().includes('talibat')).length;

  const handleStatusUpdate = async (id: number, status: string, reason?: string) => {
    try {
      const res = await fetch(`/api/admin/admissions/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status, rejectionReason: reason })
      });
      if (res.ok) {
        alert(`Application marked as ${status} successfully!\n${status === 'Approved' ? 'Student ID, Roll No, and Record have been automatically generated.' : ''}`);
        fetchAllData(); 
        if (selectedApplication && selectedApplication.id === id) {
          setSelectedApplication({ ...selectedApplication, status, rejectionReason: reason });
        }
        if (status === 'Approved') notifyAction('Application Approved');
        if (status === 'Rejected') notifyAction('Application Rejected');
      }
    } catch (err) {
      console.error(err);
      alert('Error updating status');
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to completely delete this application?')) return;
    try {
      await fetch(`/api/admin/admissions/${id}`, { method: 'DELETE' });
      alert('Application deleted successfully.');
      fetchAllData();
      if (selectedApplication?.id === id) setSelectedApplication(null);
    } catch (err) {
      console.error(err);
    }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedIds.length === 0) return alert('No applications selected.');
    
    if (action === 'delete') {
      if (!confirm(`Are you sure you want to delete ${selectedIds.length} applications?`)) return;
      try {
        await Promise.all(selectedIds.map(id => fetch(`/api/admin/admissions/${id}`, { method: 'DELETE' })));
        alert('Selected applications deleted.');
        setSelectedIds([]);
        fetchAllData();
      } catch (e) {
        alert('Error in bulk delete');
      }
    } else if (action === 'export') {
      handleDownloadPDF(`Bulk Export (${selectedIds.length} records)`);
    } else {
      try {
        await Promise.all(selectedIds.map(id => fetch(`/api/admin/admissions/${id}/status`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ status: action })
        })));
        alert(`Selected applications marked as ${action}.`);
        setSelectedIds([]);
        fetchAllData();
      } catch (e) {
        alert('Error in bulk status update');
      }
    }
  };

  const toggleSelection = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleAllSelection = () => {
    if (selectedIds.length === filteredAdmissions.length) setSelectedIds([]);
    else setSelectedIds(filteredAdmissions.map(a => a.id));
  };

  const handleVerifyDoc = (docId: string) => {
    setVerifiedDocs(prev => ({ ...prev, [docId]: true }));
  };

  const filteredAdmissions = admissions.filter(adm => {
    const matchesSearch = adm.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          adm.applicationNo?.includes(searchTerm) || 
                          adm.mobile?.includes(searchTerm) || 
                          adm.fatherName?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSection = sectionFilter === 'All' || adm.sectionType?.includes(sectionFilter);
    const matchesStatus = statusFilter === 'All' || (statusFilter === 'Pending' && (!adm.status || adm.status === 'Pending')) || adm.status === statusFilter;
    const matchesClass = classFilter === 'All' || adm.classProgram === classFilter;
    const matchesSession = sessionFilter === 'All' || adm.fees?.session === sessionFilter;
    
    let matchesDate = true;
    if (dateRange.start && dateRange.end) {
      const adDate = new Date(adm.date).getTime();
      matchesDate = adDate >= new Date(dateRange.start).getTime() && adDate <= new Date(dateRange.end).getTime();
    }

    return matchesSearch && matchesSection && matchesStatus && matchesClass && matchesSession && matchesDate;
  });

  const exportToCSV = () => {
    if (filteredAdmissions.length === 0) return alert('No data to export');
    const headers = ['App No', 'Date', 'Student Name', 'Father Name', 'Mobile', 'Class', 'Gender', 'Status'];
    const rows = filteredAdmissions.map(adm => [
      adm.applicationNo,
      new Date(adm.date).toLocaleDateString(),
      adm.studentName,
      adm.fatherName,
      adm.mobile,
      adm.classProgram,
      adm.sectionType,
      adm.status || 'Pending'
    ]);
    const csvContent = [headers.join(','), ...rows.map(row => row.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `Admissions_Export_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const exportToPDF = () => {
    if (filteredAdmissions.length === 0) return alert('No data to export');
    const printWindow = window.open('', '_blank');
    if (!printWindow) return alert('Pop-up blocked. Please allow pop-ups for this site.');
    const html = `<html><head><title>Admissions Report</title><style>body { font-family: sans-serif; padding: 20px; color: #333; } h1 { text-align: center; color: #065f46; font-size: 24px; margin-bottom: 5px; text-transform: uppercase; } p { text-align: center; color: #666; font-size: 12px; margin-bottom: 20px; } table { border-collapse: collapse; margin-top: 20px; font-size: 10px; width: 100%; } th { background-color: #f1f5f9; padding: 10px; text-align: left; border: 1px solid #e2e8f0; font-weight: bold; text-transform: uppercase; } td { padding: 8px 10px; border: 1px solid #e2e8f0; } tr:nth-child(even) { background-color: #f8fafc; }</style></head><body><h1>Jamia Sher-e-Rabbani</h1><p>Filtered Admissions Report - ${new Date().toLocaleDateString()}</p><table><thead><tr><th>App No</th><th>Date</th><th>Student Name</th><th>Father Name</th><th>Mobile</th><th>Class / Program</th><th>Gender</th><th>Status</th></tr></thead><tbody>${filteredAdmissions.map(adm => `<tr><td>${adm.applicationNo}</td><td>${new Date(adm.date).toLocaleDateString()}</td><td><b>${adm.studentName}</b></td><td>${adm.fatherName}</td><td>${adm.mobile}</td><td>${adm.classProgram}</td><td>${adm.sectionType}</td><td>${adm.status || 'Pending'}</td></tr>`).join('')}</tbody></table><script>window.onload = function() { setTimeout(function(){ window.print(); window.close(); }, 500); }</script></body></html>`;
    printWindow.document.write(html);
    printWindow.document.close();
  };

  if (isEditingApp && selectedApplication) {
    return (
      <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-200 max-w-3xl">
        <h3 className="text-xl font-black text-slate-800 mb-6">Edit Admission Application</h3>
        <form className="space-y-6" onSubmit={async (e) => {
          e.preventDefault();
          const formData = new FormData(e.currentTarget);
          const updatedData = {
            studentName: formData.get('studentName') as string,
            fatherName: formData.get('fatherName') as string,
            mobile: formData.get('mobile') as string,
            cnic: formData.get('cnic') as string,
            classProgram: formData.get('classProgram') as string,
          };
          try {
            await fetch('/api/admin/admissions/' + selectedApplication.id, {
              method: 'PUT',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(updatedData)
            });
            alert('Application updated successfully!');
            fetchAllData();
            setIsEditingApp(false);
            setSelectedApplication({ ...selectedApplication, ...updatedData });
          } catch (err) {
            console.error(err);
            alert('Failed to update application');
          }
        }}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Student Name</label>
              <input name="studentName" defaultValue={selectedApplication.studentName} required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:border-blue-500 font-bold" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Father Name</label>
              <input name="fatherName" defaultValue={selectedApplication.fatherName} required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:border-blue-500 font-bold" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Mobile Number</label>
              <input name="mobile" defaultValue={selectedApplication.mobile} required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:border-blue-500 font-bold" />
            </div>
            <div>
              <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">CNIC / B-Form</label>
              <input name="cnic" defaultValue={selectedApplication.cnic} type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:border-blue-500 font-bold" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Selected Class</label>
              <input name="classProgram" defaultValue={selectedApplication.classProgram} required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:border-blue-500 font-bold" />
            </div>
          </div>
          <div className="flex gap-4 pt-6">
            <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-sm font-black uppercase tracking-widest text-xs shadow-sm hover:bg-blue-700">Save Changes</button>
            <button type="button" onClick={() => setIsEditingApp(false)} className="px-8 py-3 bg-slate-100 text-slate-600 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-slate-200">Cancel</button>
          </div>
        </form>
      </div>
    );
  }

  if (selectedApplication) {
    return (
      <div className="bg-white rounded-sm border border-slate-200 overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
        
        {/* Reject Modal */}
        {showRejectModal && (
          <div className="fixed inset-0 z-[60] bg-slate-900/40 flex items-center justify-center p-4">
            <div className="bg-white rounded-sm p-6 w-full max-w-md shadow-sm border border-gray-200 animate-in zoom-in-95">
              <h3 className="text-xl font-black text-slate-800 mb-4">Reject Application</h3>
              <textarea placeholder="Reason for rejection..." value={rejectionReason} onChange={e => setRejectionReason(e.target.value)} className="w-full p-4 border border-slate-200 rounded-sm mb-4 text-sm font-medium focus:border-rose-500" rows={4}></textarea>
              <div className="flex gap-2 justify-end">
                <button onClick={() => setShowRejectModal(false)} className="px-4 py-2 bg-slate-100 text-slate-600 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-slate-200">Cancel</button>
                <button onClick={() => { handleStatusUpdate(selectedApplication.id, 'Rejected', rejectionReason); setShowRejectModal(false); }} className="px-4 py-2 bg-rose-600 text-white rounded-sm text-xs font-black uppercase tracking-widest hover:bg-rose-700">Confirm Reject</button>
              </div>
            </div>
          </div>
        )}

        {/* Action Header */}
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-slate-50 sticky top-0 z-10 shadow-sm print:hidden">
          <button onClick={() => setSelectedApplication(null)} className="flex items-center gap-2 text-slate-500 hover:text-blue-600 font-black uppercase text-xs tracking-widest bg-white px-4 py-2.5 rounded-sm border border-slate-200 shadow-sm"><ArrowLeft size={16}/> Back to List</button>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button onClick={() => handleStatusUpdate(selectedApplication.id, 'Approved')} className="flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-sm shadow-blue-600/20 hover:bg-blue-700 transition-all"><CheckCircle2 size={16} className="inline"/> Approve</button>
            <button onClick={() => setShowRejectModal(true)} className="flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2.5 bg-rose-600 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-sm shadow-rose-600/20 hover:bg-rose-700 transition-all"><XCircle size={16} className="inline"/> Reject</button>
            <button onClick={() => handleStatusUpdate(selectedApplication.id, 'Hold')} className="flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2.5 bg-amber-500 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-sm shadow-amber-500/20 hover:bg-amber-600 transition-all"><Clock size={16} className="inline"/> Hold</button>
            <button onClick={() => setIsEditingApp(true)} className="flex items-center gap-2 px-4 py-2.5 bg-slate-800 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-slate-900 transition-all hidden md:flex"><Edit size={16}/> Edit</button>
            <button onClick={() => handleDownloadPDF('Admission Application')} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all hidden md:flex"><Download size={16}/> PDF</button>
            <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all hidden md:flex"><Printer size={16}/> Print</button>
            <button onClick={() => handleDelete(selectedApplication.id)} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-rose-200 text-rose-600 rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-rose-50 transition-all hidden md:flex"><Trash2 size={16}/> Delete</button>
          </div>
        </div>

        <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10 print:p-0">
          {/* Information Column */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-blue-100 text-blue-700 rounded-sm flex items-center justify-center font-black text-4xl shrink-0 print:border print:border-black print:bg-white">{selectedApplication.studentName.charAt(0)}</div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">{selectedApplication.studentName}</h3>
                  <p className="text-sm font-bold text-slate-500 tracking-widest uppercase mt-2">App No: <span className="font-mono text-slate-700">{selectedApplication.applicationNo}</span></p>
                  <span className={`inline-block mt-4 px-4 py-1.5 rounded-sm text-xs font-black uppercase tracking-widest shadow-sm border print:hidden
                    ${(selectedApplication.status === 'Pending' || !selectedApplication.status) ? 'bg-slate-50 text-slate-600 border-slate-200' : ''}
                    ${selectedApplication.status === 'Approved' ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}
                    ${selectedApplication.status === 'Rejected' ? 'bg-rose-50 text-rose-600 border-rose-200' : ''}
                    ${selectedApplication.status === 'Hold' ? 'bg-amber-50 text-amber-600 border-amber-200' : ''}
                  `}>STATUS: {selectedApplication.status || 'Pending'}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 md:p-6 rounded-lg border border-slate-100 relative overflow-hidden print:bg-white print:border-black print:rounded-none">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-bl-full opacity-50 blur-2xl pointer-events-none print:hidden"></div>
                <div className="bg-white p-4 rounded-md shadow-sm border border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1"><User size={12}/> Father's Name</p>
                  <p className="text-sm font-bold text-slate-800">{selectedApplication.fatherName}</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm border border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1"><Calendar size={12}/> Date of Birth</p>
                  <p className="text-sm font-bold text-slate-800">{selectedApplication.dob || 'Not Provided'}</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm border border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1"><Shield size={12}/> CNIC / B-Form Number</p>
                  <p className="text-sm font-mono font-bold text-slate-800">{selectedApplication.cnic || 'Not Provided'}</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm border border-slate-100">
                  <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1 flex items-center gap-1"><Phone size={12}/> Mobile Number</p>
                  <p className="text-sm font-mono font-bold text-slate-800">{selectedApplication.mobile}</p>
                </div>
              </div>
            </div>
            
            <div>
              <h4 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2"><GraduationCap className="text-blue-600 print:text-black"/> Academic Information</h4>
              <div className="bg-blue-50/50 p-4 md:p-6 rounded-lg border border-blue-100 grid grid-cols-1 sm:grid-cols-2 gap-4 print:bg-white print:border-black print:rounded-none">
                <div className="bg-white p-4 rounded-md shadow-sm border border-blue-50">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-1 flex items-center gap-1"><BookOpen size={12}/> Selected Class / Program</p>
                  <p className="text-sm font-bold text-slate-800">{selectedApplication.classProgram}</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm border border-blue-50">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-1 flex items-center gap-1"><Users size={12}/> Section (Gender)</p>
                  <p className="text-sm font-bold text-slate-800">{selectedApplication.sectionType}</p>
                </div>
                <div className="bg-white p-4 rounded-md shadow-sm border border-blue-50 sm:col-span-2 md:col-span-1 lg:col-span-2">
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-1 flex items-center gap-1"><Clock size={12}/> Academic Session</p>
                  <p className="text-sm font-bold text-slate-800 font-mono">{selectedApplication.fees.session}</p>
                </div>
              </div>
            </div>

            {/* Admin Form Viewer Button */}
            <div className="bg-blue-50 border border-blue-200 p-6 rounded-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4 print:hidden">
              <div>
                <h4 className="font-black text-blue-800 text-sm">Official Admission Form</h4>
                <p className="text-xs text-blue-600/70 font-medium">Auto-generated printable form.</p>
              </div>
              <div className="flex gap-2 w-full md:w-auto">
                <button onClick={() => alert('Viewing Generated Admission Form')} className="flex-1 md:flex-none px-4 py-2 bg-blue-600 text-white rounded-sm text-xs font-black uppercase hover:bg-blue-700 text-center">View</button>
                <button onClick={handlePrint} className="flex-1 md:flex-none px-4 py-2 bg-white text-blue-700 border border-blue-200 rounded-sm text-xs font-black uppercase hover:bg-blue-100 text-center">Print</button>
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-8 print:hidden">
            <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm">
              <h4 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2"><Folder className="text-blue-600"/> Documents</h4>
              <div className="space-y-3">
                {selectedApplication.documents && Object.keys(selectedApplication.documents).length > 0 ? (
                  Object.entries(selectedApplication.documents).map(([key, doc], i) => {
                    const docLabel = key === 'photo' ? 'Student Photo' : key === 'student_cnic' ? 'Student CNIC' : key === 'father_cnic' ? 'Father CNIC' : key === 'result_card' ? 'Result Card' : doc.name;
                    const isVerified = verifiedDocs[key];
                    return (
                      <div key={i} className="p-3 bg-slate-50 rounded-sm border border-slate-100 group transition-colors">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {isVerified ? <CheckCircle2 size={16} className="text-blue-500 shrink-0" /> : <FileCheck size={16} className="text-slate-400 group-hover:text-blue-500 shrink-0" />}
                            <div className="overflow-hidden">
                              <span className={`text-xs font-bold block truncate ${isVerified ? 'text-blue-700' : 'text-slate-700'}`}>{docLabel}</span>
                              <span className="text-[9px] font-black uppercase text-slate-400 tracking-wider truncate block" title={doc.name}>{doc.name} ({doc.size})</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <a href={doc.url || doc.data || '#'} target="_blank" rel="noopener noreferrer" download={doc.name} className="flex-1 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded text-[9px] font-black uppercase hover:bg-blue-600 hover:text-white text-center block leading-loose transition-colors"><Download size={12} className="inline mr-1 mb-0.5" /> View / Download</a>
                          {!isVerified && <button onClick={() => handleVerifyDoc(key)} className="flex-1 py-1.5 bg-emerald-50 border border-emerald-200 text-emerald-700 rounded text-[9px] font-black uppercase hover:bg-emerald-600 hover:text-white transition-colors"><CheckCircle2 size={12} className="inline mr-1 mb-0.5"/> Verify</button>}
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-sm">
                    <p className="text-xs font-black text-slate-400 uppercase tracking-widest">No Documents Uploaded</p>
                  </div>
                )}
              </div>
            </div>

            <div className="bg-blue-900 p-8 rounded-sm shadow-sm border border-gray-200 relative overflow-hidden text-blue-50">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-800 rounded-full blur-2xl pointer-events-none"></div>
              <h4 className="text-lg font-black text-white mb-6 flex items-center gap-2 relative z-10"><DollarSign className="text-blue-400"/> Generated Challan</h4>
              <div className="space-y-5 relative z-10">
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Challan Number</p>
                  <p className="text-lg font-mono font-black text-white">{selectedApplication.challanNo}</p>
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase tracking-widest text-blue-400 mb-1">Total Fee Payable</p>
                  <p className="text-3xl font-black text-white tracking-tighter">Rs. {((selectedApplication.fees.totalFee || (selectedApplication.fees.admissionFee + selectedApplication.fees.registrationFee)) + (selectedApplication.fees.totalLateFee || 0)).toLocaleString()}</p>
                </div>
                <div className="pt-4 flex flex-col gap-2">
                  <button onClick={() => alert('Viewing detailed challan modal...')} className="w-full py-2 bg-blue-50 text-blue-900 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-white flex justify-center gap-2"><Eye size={14}/> View Challan</button>
                  <button onClick={() => handleDownloadPDF('Fee Challan')} className="w-full py-2 bg-blue-800 text-white border border-blue-700 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 flex justify-center gap-2"><Download size={14}/> Download PDF</button>
                  <button onClick={handlePrint} className="w-full py-2 bg-blue-800 text-white border border-blue-700 rounded-sm text-[10px] font-black uppercase tracking-widest hover:bg-blue-700 flex justify-center gap-2"><Printer size={14}/> Print</button>
                  <button onClick={() => alert('New Challan generated with updated fee parameters.')} className="w-full mt-2 py-2 text-blue-400 hover:text-white rounded-sm text-[10px] font-black uppercase tracking-widest flex justify-center gap-2"><RefreshCcw size={14}/> Regenerate</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      
      {/* Statistics Banner */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div onClick={() => setStatusFilter('All')} className={`p-4 rounded-sm border shadow-sm text-center cursor-pointer hover:shadow-md transition-all ${statusFilter === 'All' ? 'bg-slate-800 border-slate-900 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
          <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-slate-400">Total Apps</p>
          <p className="text-3xl font-black">{total}</p>
        </div>
        <div onClick={() => setStatusFilter('Pending')} className={`p-4 rounded-sm border shadow-sm text-center cursor-pointer hover:shadow-md transition-all ${statusFilter === 'Pending' ? 'bg-amber-500 border-amber-600 text-white' : 'bg-amber-50 border-amber-100 text-amber-700'}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${statusFilter === 'Pending' ? 'text-amber-200' : 'text-amber-600/70'}`}>Pending</p>
          <p className="text-3xl font-black">{pending}</p>
        </div>
        <div onClick={() => setStatusFilter('Approved')} className={`p-4 rounded-sm border shadow-sm text-center cursor-pointer hover:shadow-md transition-all ${statusFilter === 'Approved' ? 'bg-blue-600 border-blue-700 text-white' : 'bg-blue-50 border-blue-100 text-blue-700'}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${statusFilter === 'Approved' ? 'text-blue-200' : 'text-blue-600/70'}`}>Approved</p>
          <p className="text-3xl font-black">{approved}</p>
        </div>
        <div onClick={() => setStatusFilter('Rejected')} className={`p-4 rounded-sm border shadow-sm text-center cursor-pointer hover:shadow-md transition-all ${statusFilter === 'Rejected' ? 'bg-rose-600 border-rose-700 text-white' : 'bg-rose-50 border-rose-100 text-rose-700'}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${statusFilter === 'Rejected' ? 'text-rose-200' : 'text-rose-600/70'}`}>Rejected</p>
          <p className="text-3xl font-black">{rejected}</p>
        </div>
        <div onClick={() => { setStatusFilter('All'); setSectionTypeFilter('Tulba'); }} className={`p-4 rounded-sm border shadow-sm text-center cursor-pointer hover:shadow-md transition-all ${sectionFilter === 'Tulba' ? 'bg-blue-600 border-blue-700 text-white' : 'bg-blue-50 border-blue-100 text-blue-700'}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${sectionFilter === 'Tulba' ? 'text-blue-200' : 'text-blue-600/70'}`}>Tulba</p>
          <p className="text-3xl font-black">{tulba}</p>
        </div>
        <div onClick={() => { setStatusFilter('All'); setSectionTypeFilter('Talibat'); }} className={`p-4 rounded-sm border shadow-sm text-center cursor-pointer hover:shadow-md transition-all ${sectionFilter === 'Talibat' ? 'bg-violet-600 border-violet-700 text-white' : 'bg-violet-50 border-violet-100 text-violet-700'}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${sectionFilter === 'Talibat' ? 'text-violet-200' : 'text-violet-600/70'}`}>Talibat</p>
          <p className="text-3xl font-black">{talibat}</p>
        </div>
      </div>

      {/* Toolbar & Advanced Filters */}
      <div className="bg-white p-6 rounded-sm shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input type="text" placeholder="Search by name, father name, phone, App #..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none focus:ring-2 focus:ring-blue-500 rounded-sm text-sm transition-all font-bold text-slate-700" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-sm">
            {(['All', 'Tulba', 'Talibat'] as const).map((s) => (
              <button key={s} onClick={() => setSectionTypeFilter(s)} className={`px-6 py-3 rounded-sm text-xs font-black uppercase tracking-widest transition-all ${sectionFilter === s ? 'bg-white text-blue-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>{s}</button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-4 border-t border-slate-100">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Class Filter</label>
            <select value={classFilter} onChange={e => setClassFilter(e.target.value)} className="w-full p-3 bg-slate-50 rounded-sm text-sm font-bold border-none">
              <option value="All">All Classes</option>
              {OFFICIAL_CLASSES.map(cls => (
                <option key={cls} value={cls}>{cls}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Session Filter</label>
            <select value={sessionFilter} onChange={e => setSessionFilter(e.target.value)} className="w-full p-3 bg-slate-50 rounded-sm text-sm font-bold border-none">
              <option value="All">All Sessions</option>
              <option value="2026-27">2026-27</option>
              <option value="2025-26">2025-26</option>
            </select>
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Start Date</label>
            <input type="date" value={dateRange.start} onChange={e => setDateRange({ ...dateRange, start: e.target.value })} className="w-full p-3 bg-slate-50 rounded-sm text-sm font-bold border-none text-slate-600"/>
          </div>
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">End Date</label>
            <input type="date" value={dateRange.end} onChange={e => setDateRange({ ...dateRange, end: e.target.value })} className="w-full p-3 bg-slate-50 rounded-sm text-sm font-bold border-none text-slate-600"/>
          </div>
        </div>
      </div>

      {/* Bulk Actions Panel */}
      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }} className="bg-slate-800 p-4 rounded-sm flex flex-wrap items-center justify-between shadow-sm border border-slate-700 shadow-slate-900/20 z-20 sticky top-4">
            <span className="text-blue-400 font-black text-sm px-4">{selectedIds.length} Application(s) Selected</span>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => handleBulkAction('Approved')} className="px-4 py-2 bg-blue-600 text-white rounded-sm text-xs font-black uppercase tracking-widest hover:bg-blue-500">Approve</button>
              <button onClick={() => handleBulkAction('Rejected')} className="px-4 py-2 bg-rose-600 text-white rounded-sm text-xs font-black uppercase tracking-widest hover:bg-rose-500">Reject</button>
              <button onClick={() => handleBulkAction('export')} className="px-4 py-2 bg-white text-slate-800 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-slate-200">Export</button>
              <button onClick={() => handleBulkAction('delete')} className="px-4 py-2 border border-slate-600 text-slate-300 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-slate-700 hover:text-white">Delete</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Applications Directory (Card Grid) */}
      <div className="bg-white rounded-sm shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-slate-100 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-slate-50/50">
          <div className="flex items-center gap-4 flex-wrap">
            <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2"><FileText size={20} className="text-blue-600"/> Admissions</h3>
            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
            <button onClick={toggleAllSelection} className="flex items-center gap-2 text-[10px] md:text-xs font-black uppercase tracking-widest text-slate-600 hover:text-blue-600 transition-colors bg-white px-3 py-1.5 rounded-md border border-slate-200 shadow-sm">
              {selectedIds.length === filteredAdmissions.length && filteredAdmissions.length > 0 ? <CheckSquare size={14} className="text-blue-600"/> : <Square size={14}/>}
              Select All
            </button>
          </div>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button onClick={exportToCSV} className="flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-blue-700 rounded-sm text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-blue-50"><Download size={14}/> CSV</button>
            <button onClick={exportToPDF} className="flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-900 text-white rounded-sm text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-slate-700"><Printer size={14}/> PDF Report</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 p-3 md:p-6 min-h-[500px] bg-slate-50/50">
          {filteredAdmissions.map((adm) => {
            const isSelected = selectedIds.includes(adm.id);
            return (
              <div key={adm.id} className={`relative p-3 md:p-5 rounded-xl md:rounded-2xl border transition-all flex flex-col ${isSelected ? 'bg-blue-50 border-blue-200 shadow-md' : 'bg-white border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md'}`}>
                <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10">
                  <button onClick={() => toggleSelection(adm.id)} className={`p-1 rounded-md bg-white/80 backdrop-blur-sm shadow-sm border ${isSelected ? 'text-blue-600 border-blue-200' : 'text-slate-300 hover:text-slate-400 border-slate-100'}`}>
                    {isSelected ? <CheckSquare size={16} className="md:w-5 md:h-5 text-blue-600"/> : <Square size={16} className="md:w-5 md:h-5"/>}
                  </button>
                </div>
                
                <div className="flex flex-col md:flex-row items-center md:items-start gap-2 md:gap-3 mb-3 md:mb-4 text-center md:text-left pt-4 md:pt-0">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full md:rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 font-black text-xl shrink-0 mx-auto md:mx-0 shadow-inner">
                    {adm.studentName?.charAt(0)}
                  </div>
                  <div className="flex-1 min-w-0 px-1 md:px-0">
                    <h4 className="font-black text-xs md:text-sm text-slate-800 line-clamp-1" title={adm.studentName}>{adm.studentName}</h4>
                    <p className="text-[9px] md:text-[10px] text-slate-500 font-bold uppercase tracking-wider line-clamp-1">S/O {adm.fatherName}</p>
                  </div>
                </div>

                <div className="space-y-1.5 md:space-y-2 mb-3 md:mb-5 flex-1 bg-slate-50 p-2 md:p-3 rounded-lg border border-slate-100">
                  <div className="flex justify-between items-center text-[10px] md:text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[8px] md:text-[9px]">App No</span>
                    <span className="font-mono font-black text-slate-700">{adm.applicationNo}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] md:text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[8px] md:text-[9px]">Class</span>
                    <span className="font-black text-slate-700 line-clamp-1 max-w-[60%] text-right">{adm.classProgram}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] md:text-xs">
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[8px] md:text-[9px]">Mobile</span>
                    <span className="font-mono font-bold text-slate-600">{adm.mobile}</span>
                  </div>
                  <div className="flex justify-between items-center text-[10px] md:text-xs pt-1.5 border-t border-slate-200 mt-1.5">
                    <span className="text-slate-400 font-bold uppercase tracking-widest text-[8px] md:text-[9px]">Status</span>
                    <span className={`inline-block px-1.5 py-0.5 rounded-md text-[8px] md:text-[9px] font-black uppercase tracking-widest
                      ${(adm.status === 'Pending' || !adm.status) ? 'bg-amber-100 text-amber-700' : ''}
                      ${adm.status === 'Approved' ? 'bg-blue-100 text-blue-700' : ''}
                      ${adm.status === 'Rejected' ? 'bg-rose-100 text-rose-700' : ''}
                      ${adm.status === 'Hold' ? 'bg-indigo-100 text-indigo-700' : ''}
                    `}>{adm.status || 'Pending'}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-1.5 md:gap-2 mt-auto">
                  <button onClick={() => setSelectedApplication(adm)} className="flex-1 py-1.5 md:py-2 bg-slate-50 border border-slate-200 rounded-md md:rounded-lg hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all shadow-sm flex items-center justify-center text-slate-600" title="View"><Eye size={14} className="md:w-4 md:h-4" /></button>
                  <button onClick={() => { setSelectedApplication(adm); setIsEditingApp(true); }} className="flex-1 py-1.5 md:py-2 bg-slate-50 border border-slate-200 rounded-md md:rounded-lg hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all shadow-sm flex items-center justify-center text-slate-600" title="Edit"><Edit size={14} className="md:w-4 md:h-4" /></button>
                  <button onClick={() => handlePrint()} className="flex-1 py-1.5 md:py-2 bg-slate-50 border border-slate-200 rounded-md md:rounded-lg hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all shadow-sm flex items-center justify-center text-slate-600" title="Print"><Printer size={14} className="md:w-4 md:h-4" /></button>
                  <button onClick={() => handleDelete(adm.id)} className="flex-1 py-1.5 md:py-2 bg-rose-50 border border-rose-100 rounded-md md:rounded-lg hover:bg-rose-100 hover:border-rose-200 hover:text-rose-700 transition-all shadow-sm flex items-center justify-center text-rose-500" title="Delete"><Trash2 size={14} className="md:w-4 md:h-4" /></button>
                </div>
              </div>
            );
          })}
          {filteredAdmissions.length === 0 && (
            <div className="col-span-full py-20 text-center flex flex-col items-center justify-center">
              <Search size={40} className="text-slate-200 mb-4" />
              <p className="text-sm font-bold text-slate-500">No applications match your search criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
