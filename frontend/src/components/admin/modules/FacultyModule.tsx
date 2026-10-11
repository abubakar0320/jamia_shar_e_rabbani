'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  Users, Search, Download, ArrowLeft, Upload, CheckCircle2, AlertCircle, 
  Printer, Trash2, User, BookOpen, Library, CheckSquare as CheckSquareIcon, 
  Square, Eye, Edit, Award, Folder, FileCheck, Plus 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Faculty } from './types';

interface FacultyModuleProps {
  faculty: Faculty[];
  fetchAllData: () => void;
  handlePrint?: () => void;
  handleDownloadPDF?: (title: string) => void;
}

export default function FacultyModule({ 
  faculty, 
  fetchAllData,
  handlePrint = () => window.print(),
  handleDownloadPDF = (t: string) => alert(`Downloading ${t}...`)
}: FacultyModuleProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);

  const total = faculty.length;
  const active = faculty.filter(f => !f.status || f.status === 'Active').length;
  const inactive = faculty.filter(f => f.status === 'Inactive' || f.status === 'Retired').length;
  const leadership = faculty.filter(f => f.isLeadership).length;
  const muftis = faculty.filter(f => f.designation?.toLowerCase().includes('mufti')).length;
  const professors = faculty.filter(f => f.designation?.toLowerCase().includes('professor')).length;

  const filteredFaculty = faculty.filter(fac => {
    const matchesSearch = fac.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          fac.facultyId?.includes(searchTerm) || 
                          fac.department?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'All' || (statusFilter === 'Active' && (!fac.status || fac.status === 'Active')) || fac.status === statusFilter;
    const matchesDept = classFilter === 'All' || fac.department === classFilter;
    return matchesSearch && matchesStatus && matchesDept;
  });

  const toggleSelection = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleAllSelection = () => {
    if (selectedIds.length === filteredFaculty.length) setSelectedIds([]);
    else setSelectedIds(filteredFaculty.map(s => s.id));
  };

  const handleFacultyFieldUpdate = async (id: number, field: string, value: any) => {
    try {
      const res = await fetch(`/api/admin/faculty/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ [field]: value })
      });
      if (res.ok) {
        alert(`Faculty ${field} updated successfully!`);
        fetchAllData(); 
        if (selectedFaculty && selectedFaculty.id === id) {
          setSelectedFaculty({ ...selectedFaculty, [field]: value });
        }
      }
    } catch (err) { alert('Error updating faculty'); }
  };

  const handleStatusUpdate = async (id: number, status: string) => {
    await handleFacultyFieldUpdate(id, 'status', status);
  };

  const handleUploadPhoto = async (id: number) => {
    const url = prompt('Enter the URL of the new faculty photo:');
    if (url) await handleFacultyFieldUpdate(id, 'photo', url);
  };

  const handleAssignSubject = async (id: number) => {
    const subject = prompt('Enter the name of the subject to assign:');
    if (subject) {
      const currentSubjects = selectedFaculty?.subjectsTaught || [];
      await handleFacultyFieldUpdate(id, 'subjectsTaught', [...currentSubjects, subject]);
    }
  };

  const handleUpdateAttendance = async (id: number) => {
    const presentStr = prompt('Enter Total Present Days:');
    const absentStr = prompt('Enter Total Absent Days:');
    if (presentStr !== null && absentStr !== null) {
      await handleFacultyFieldUpdate(id, 'attendance', { present: parseInt(presentStr)||0, absent: parseInt(absentStr)||0 });
    }
  };

  const handleDelete = async (id: number) => {
    if(!confirm('Are you sure you want to completely delete this faculty record?')) return;
    try {
      await fetch(`/api/admin/faculty/${id}`, { method: 'DELETE' });
      alert('Faculty deleted successfully.');
      fetchAllData();
      if (selectedFaculty?.id === id) setSelectedFaculty(null);
    } catch (err) { console.error(err); }
  };

  const handleBulkAction = async (action: string) => {
    if (selectedIds.length === 0) return alert('No records selected.');
    if (action === 'delete') {
      if(!confirm(`Are you sure you want to delete ${selectedIds.length} faculty members?`)) return;
      try {
        await Promise.all(selectedIds.map(id => fetch(`/api/admin/faculty/${id}`, { method: 'DELETE' })));
        alert('Selected faculty deleted.');
        setSelectedIds([]); fetchAllData();
      } catch(e) { alert('Error in bulk delete'); }
    } else if (action === 'export') {
      exportToCSV();
    } else {
      try {
        await Promise.all(selectedIds.map(id => fetch(`/api/admin/faculty/${id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: action })
        })));
        alert(`Selected faculty marked as ${action}.`);
        setSelectedIds([]); fetchAllData();
      } catch(e) { alert('Error in bulk status update'); }
    }
  };

  const exportToCSV = () => {
    if (filteredFaculty.length === 0) return alert('No data to export');
    const headers = ['Faculty ID', 'Name', 'Designation', 'Department', 'Contact', 'Status'];
    const rows = filteredFaculty.map(f => [f.facultyId, f.name, f.designation, f.department, f.contactNumber, f.status || 'Active']);
    const csvContent = [headers.join(','), ...rows.map(row => row.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = `Faculty_Export.csv`; link.click();
  };

  if (selectedFaculty) {
    return (
      <div className="bg-white rounded-sm border border-slate-200 overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-slate-50 sticky top-0 z-10 shadow-sm print:hidden">
          <button onClick={() => setSelectedFaculty(null)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-black uppercase text-xs tracking-widest bg-white px-4 py-2.5 rounded-sm border border-slate-200 shadow-sm"><ArrowLeft size={16}/> Back to List</button>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button onClick={() => handleUploadPhoto(selectedFaculty.id)} className="flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2.5 bg-slate-800 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-slate-700 transition-all"><Upload size={16} className="inline"/> Photo</button>
            <button onClick={() => handleStatusUpdate(selectedFaculty.id, 'Active')} className="flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-blue-700 transition-all"><CheckCircle2 size={16} className="inline"/> Activate</button>
            <button onClick={() => handleStatusUpdate(selectedFaculty.id, 'Inactive')} className="flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2.5 bg-amber-500 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-amber-600 transition-all"><AlertCircle size={16} className="inline"/> Deactivate</button>
            <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all hidden md:flex"><Printer size={16}/> Print Profile</button>
            <button onClick={() => handleDelete(selectedFaculty.id)} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-rose-200 text-rose-600 rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-rose-50 transition-all hidden md:flex"><Trash2 size={16}/> Delete</button>
          </div>
        </div>

        <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10 print:p-0">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                <div className="w-28 h-28 bg-slate-100 text-slate-400 rounded-sm overflow-hidden flex items-center justify-center font-black text-4xl shrink-0 print:border print:border-black print:bg-white border shadow-sm">
                  {selectedFaculty.photo ? <Image src={selectedFaculty.photo} alt={selectedFaculty.name} width={112} height={112} className="object-cover" /> : <User size={40} />}
                </div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">{selectedFaculty.name}</h3>
                  <p className="text-sm font-bold text-slate-500 tracking-widest uppercase mt-2">{selectedFaculty.designation} - <span className="text-blue-600">{selectedFaculty.department}</span></p>
                  <span className={`inline-block mt-4 px-4 py-1.5 rounded-sm text-xs font-black uppercase tracking-widest shadow-sm border print:hidden
                    ${(!selectedFaculty.status || selectedFaculty.status === 'Active') ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}
                    ${selectedFaculty.status === 'Inactive' ? 'bg-amber-50 text-amber-600 border-amber-200' : ''}
                    ${selectedFaculty.status === 'Retired' ? 'bg-slate-50 text-slate-600 border-slate-200' : ''}
                    ${selectedFaculty.status === 'Visiting' ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : ''}
                  `}>STATUS: {selectedFaculty.status || 'Active'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 bg-slate-50 p-4 md:p-8 rounded-sm border border-slate-100 relative overflow-hidden print:bg-white print:border-black print:rounded-none">
                <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Faculty ID</p><p className="text-sm font-mono font-bold text-slate-800">{selectedFaculty.facultyId}</p></div>
                <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Contact Number</p><p className="text-sm font-mono font-bold text-slate-800">{selectedFaculty.contactNumber}</p></div>
                <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Email Address</p><p className="text-sm font-bold text-slate-800">{selectedFaculty.email || 'N/A'}</p></div>
                <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">WhatsApp</p><p className="text-sm font-mono font-bold text-slate-800">{selectedFaculty.whatsapp || 'N/A'}</p></div>
                <div className="md:col-span-2"><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Residential Address</p><p className="text-sm font-bold text-slate-800 leading-relaxed max-w-xl">{selectedFaculty.address || 'N/A'}</p></div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2"><BookOpen className="text-indigo-600 print:text-black"/> Academic & Professional Info</h4>
              <div className="bg-slate-50 p-4 md:p-8 rounded-sm border border-slate-100 grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 print:bg-white print:border-black print:rounded-none">
                <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Highest Qualification</p><p className="text-sm font-bold text-slate-800">{selectedFaculty.qualification || 'N/A'}</p></div>
                <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">University / Institute</p><p className="text-sm font-bold text-slate-800">{selectedFaculty.university || 'N/A'}</p></div>
                <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Specialization</p><p className="text-sm font-bold text-slate-800">{selectedFaculty.specialization || 'N/A'}</p></div>
                <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Teaching Experience</p><p className="text-sm font-bold text-slate-800">{selectedFaculty.teachingExperience || 'N/A'}</p></div>
                <div className="md:col-span-2"><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Research Areas</p><p className="text-sm font-bold text-slate-800">{selectedFaculty.researchAreas || 'N/A'}</p></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-end mb-6">
                <h4 className="text-xl font-black text-slate-800 flex items-center gap-2"><Library className="text-blue-600 print:text-black"/> Assigned Subjects</h4>
                <button onClick={() => handleAssignSubject(selectedFaculty.id)} className="text-xs font-black text-blue-600 hover:text-blue-800 uppercase tracking-widest">+ Assign</button>
              </div>
              <div className="bg-blue-50 border border-blue-100 p-6 rounded-sm print:bg-white print:border-black print:rounded-none">
                {selectedFaculty.subjectsTaught && selectedFaculty.subjectsTaught.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {selectedFaculty.subjectsTaught.map((sub, i) => (
                      <span key={i} className="px-4 py-2 bg-white text-blue-800 rounded-sm text-sm font-bold shadow-sm border border-blue-100">{sub}</span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm font-bold text-blue-600/70">No subjects assigned yet.</p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-8 print:hidden">
            <div className="bg-slate-800 p-6 rounded-sm border border-slate-700 shadow-sm text-slate-50">
              <h4 className="text-lg font-black text-white mb-6 flex items-center gap-2"><CheckCircle2 className="text-blue-400"/> Attendance</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Present Days</span>
                  <span className="text-sm font-black text-white">{selectedFaculty.attendance?.present || 0}</span>
                </div>
                <div className="flex justify-between items-center border-b border-slate-700 pb-2">
                  <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Absent Days</span>
                  <span className="text-sm font-black text-white">{selectedFaculty.attendance?.absent || 0}</span>
                </div>
                <button onClick={() => handleUpdateAttendance(selectedFaculty.id)} className="w-full py-2.5 bg-slate-700 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-slate-600 transition-all mt-2">Update Attendance</button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm">
              <div className="flex justify-between items-end mb-6">
                <h4 className="text-lg font-black text-slate-800 flex items-center gap-2"><Folder className="text-indigo-600"/> Documents</h4>
                <button onClick={() => alert('Uploading new document...')} className="text-indigo-600 hover:text-indigo-800"><Plus size={16}/></button>
              </div>
              <div className="space-y-3">
                {selectedFaculty.documents && Object.keys(selectedFaculty.documents).length > 0 ? (
                  Object.entries(selectedFaculty.documents).map(([key, doc], i) => (
                    <div key={i} className="p-3 bg-slate-50 rounded-sm border border-slate-100 flex items-center justify-between">
                      <div className="flex items-center gap-2 overflow-hidden">
                        <FileCheck size={16} className="text-blue-500 shrink-0" />
                        <span className="text-xs font-bold text-slate-700 block truncate">{doc.name}</span>
                      </div>
                      <a href={doc.data || '#'} download={doc.name} className="text-[9px] px-2 py-1 bg-white border border-slate-200 rounded text-slate-600 font-black uppercase hover:text-indigo-600 block text-center leading-loose">DL</a>
                    </div>
                  ))
                ) : (
                  <p className="text-xs font-black text-slate-400 text-center py-4 uppercase tracking-widest border-2 border-dashed border-slate-100 rounded-sm">No Docs Uploaded</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div onClick={() => setStatusFilter('All')} className={`p-4 rounded-sm border shadow-sm text-center cursor-pointer hover:shadow-md transition-all ${statusFilter === 'All' ? 'bg-indigo-800 border-indigo-900 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${statusFilter === 'All' ? 'text-indigo-300' : 'text-slate-400'}`}>Total Faculty</p>
          <p className="text-3xl font-black">{total}</p>
        </div>
        <div onClick={() => setStatusFilter('Active')} className={`p-4 rounded-sm border shadow-sm text-center cursor-pointer hover:shadow-md transition-all ${statusFilter === 'Active' ? 'bg-blue-600 border-blue-700 text-white' : 'bg-blue-50 border-blue-100 text-blue-700'}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${statusFilter === 'Active' ? 'text-blue-200' : 'text-blue-600/70'}`}>Active</p>
          <p className="text-3xl font-black">{active}</p>
        </div>
        <div onClick={() => setStatusFilter('Inactive')} className={`p-4 rounded-sm border shadow-sm text-center cursor-pointer hover:shadow-md transition-all ${statusFilter === 'Inactive' ? 'bg-amber-600 border-amber-700 text-white' : 'bg-amber-50 border-amber-100 text-amber-700'}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${statusFilter === 'Inactive' ? 'text-amber-200' : 'text-amber-600/70'}`}>Inactive</p>
          <p className="text-3xl font-black">{inactive}</p>
        </div>
        <div className="p-4 rounded-sm border shadow-sm text-center bg-blue-50 border-blue-100 text-blue-700">
          <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-blue-600/70">Professors</p>
          <p className="text-3xl font-black">{professors}</p>
        </div>
        <div className="p-4 rounded-sm border shadow-sm text-center bg-violet-50 border-violet-100 text-violet-700">
          <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-violet-600/70">Muftis</p>
          <p className="text-3xl font-black">{muftis}</p>
        </div>
        <div className="p-4 rounded-sm border shadow-sm text-center bg-slate-800 border-slate-900 text-white">
          <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-slate-400">Leadership</p>
          <p className="text-3xl font-black">{leadership}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-sm shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input type="text" placeholder="Search by name, ID, department..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 rounded-sm text-sm transition-all font-bold text-slate-700" />
            </div>
          </div>
          <div className="flex justify-end items-center gap-2">
            <button onClick={() => alert('Opening Add Faculty form...')} className="px-6 py-3 bg-blue-600 text-white rounded-sm text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-sm">+ Add Faculty</button>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-4 border-t border-slate-100">
          <div>
            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Department Filter</label>
            <select value={classFilter} onChange={e => setClassFilter(e.target.value)} className="w-full p-3 bg-slate-50 rounded-sm text-sm font-bold border-none">
              <option value="All">All Departments</option>
              <option value="Dars-e-Nizami">Dars-e-Nizami</option>
              <option value="Hifz-ul-Quran">Hifz-ul-Quran</option>
              <option value="Takhasusat">Takhasusat</option>
            </select>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:20 }} className="bg-slate-800 p-4 rounded-sm flex flex-wrap items-center justify-between shadow-sm border border-gray-200 shadow-slate-900/20 z-20 sticky top-4 border border-slate-700">
            <span className="text-indigo-400 font-black text-sm px-4">{selectedIds.length} Faculty Selected</span>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => handleBulkAction('Active')} className="px-4 py-2 bg-blue-600 text-white rounded-sm text-xs font-black uppercase tracking-widest hover:bg-blue-500">Activate</button>
              <button onClick={() => handleBulkAction('Inactive')} className="px-4 py-2 bg-amber-600 text-white rounded-sm text-xs font-black uppercase tracking-widest hover:bg-amber-500">Deactivate</button>
              <button onClick={() => handleBulkAction('export')} className="px-4 py-2 bg-white text-slate-800 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-slate-200">Export</button>
              <button onClick={() => handleBulkAction('delete')} className="px-4 py-2 border border-slate-600 text-slate-300 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-slate-700 hover:text-white">Delete</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-sm shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2"><Users size={20} className="text-indigo-600"/> Faculty Directory</h3>
          <div className="flex gap-2">
            <button onClick={exportToCSV} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-blue-700 rounded-sm text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-blue-50"><Download size={14}/> Export (CSV)</button>
          </div>
        </div>
        <div className="overflow-x-auto min-h-[500px]">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 w-10">
                  <button onClick={toggleAllSelection} className="text-slate-400 hover:text-indigo-600">
                    {selectedIds.length === filteredFaculty.length && filteredFaculty.length > 0 ? <CheckSquareIcon size={18} className="text-indigo-600"/> : <Square size={18}/>}
                  </button>
                </th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">ID</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Faculty Name</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Designation & Dept</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Contact</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Status</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredFaculty.map((fac) => {
                const isSelected = selectedIds.includes(fac.id);
                const fStatus = fac.status || 'Active';
                return (
                  <tr key={fac.id} className={`transition-colors group ${isSelected ? 'bg-indigo-50/50' : 'hover:bg-slate-50/80'}`}>
                    <td className="px-6 py-5">
                      <button onClick={() => toggleSelection(fac.id)} className={`${isSelected ? 'text-indigo-600' : 'text-slate-300 group-hover:text-slate-400'}`}>
                        {isSelected ? <CheckSquareIcon size={18}/> : <Square size={18}/>}
                      </button>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-mono text-xs font-black text-slate-700">{fac.facultyId}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-sm bg-slate-100 overflow-hidden flex items-center justify-center text-slate-600 font-black shrink-0">
                          {fac.photo ? <Image src={fac.photo} alt={fac.name} width={40} height={40} className="object-cover" /> : fac.name.charAt(0)}
                        </div>
                        <div>
                          <div className="font-black text-sm text-slate-800 tracking-tight flex items-center gap-2">
                            {fac.name}
                            {fac.isLeadership && <Award size={12} className="text-amber-500" />}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-black text-xs text-slate-700">{fac.designation}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{fac.department}</div>
                    </td>
                    <td className="px-6 py-5 font-mono text-xs font-bold text-slate-600">{fac.contactNumber}</td>
                    <td className="px-6 py-5 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest
                        ${fStatus === 'Active' ? 'bg-blue-100 text-blue-700' : ''}
                        ${fStatus === 'Inactive' ? 'bg-amber-100 text-amber-700' : ''}
                        ${fStatus === 'Retired' ? 'bg-slate-100 text-slate-700' : ''}
                        ${fStatus === 'Visiting' ? 'bg-indigo-100 text-indigo-700' : ''}
                      `}>{fStatus}</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setSelectedFaculty(fac)} className="p-2 bg-white border border-slate-200 rounded-sm hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm" title="View Profile"><Eye size={16} /></button>
                        <button onClick={() => alert('Editing faculty...')} className="p-2 bg-white border border-slate-200 rounded-sm hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all shadow-sm" title="Edit"><Edit size={16} /></button>
                        <button onClick={() => handleDelete(fac.id)} className="p-2 bg-white border border-rose-200 rounded-sm hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-all shadow-sm" title="Delete"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredFaculty.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Search size={40} className="text-slate-200 mb-4" />
                      <p className="text-sm font-bold text-slate-500">No faculty members found.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
