'use client';

import React, { useState } from 'react';
import { 
  Users, Search, Download, ArrowLeft, TrendingUp, Award, AlertCircle, 
  Printer, Trash2, BookOpen, CheckCircle2, DollarSign, Folder, FileCheck, 
  CheckSquare as CheckSquareIcon, Square, Eye 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Student, Admission, OFFICIAL_CLASSES } from './types';

interface StudentsModuleProps {
  students: Student[];
  admissions?: Admission[];
  fetchAllData: () => void;
  handleNavigate?: (tabId: string, subTab?: string) => void;
  handlePrint?: () => void;
  handleDownloadPDF?: (title: string) => void;
}

export default function StudentsModule({ 
  students, 
  admissions = [], 
  fetchAllData,
  handleNavigate,
  handlePrint = () => window.print(),
  handleDownloadPDF = (t: string) => alert(`Downloading ${t}...`)
}: StudentsModuleProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');
  const [sectionFilter, setSectionTypeFilter] = useState<'All' | 'Tulba' | 'Talibat'>('All');
  const [sessionFilter, setSessionFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);

  const total = students.length;
  const tulba = students.filter(s => s.sectionType?.toLowerCase().includes('tulba')).length;
  const talibat = students.filter(s => s.sectionType?.toLowerCase().includes('talibat')).length;
  const active = students.filter(s => !s.studentStatus || s.studentStatus === 'Active').length;
  const graduated = students.filter(s => s.studentStatus === 'Graduated').length;
  const defaulters = 0;

  const filteredStudents = students.filter(std => {
    const matchesSearch = std.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          std.rollNo?.includes(searchTerm) || 
                          std.studentId?.includes(searchTerm) || 
                          std.mobile?.includes(searchTerm);
    const matchesSection = sectionFilter === 'All' || std.sectionType?.includes(sectionFilter);
    const matchesClass = classFilter === 'All' || std.classProgram === classFilter;
    const matchesSession = sessionFilter === 'All' || std.fees?.session === sessionFilter;
    const matchesStatus = statusFilter === 'All' || (statusFilter === 'Active' && (!std.studentStatus || std.studentStatus === 'Active')) || std.studentStatus === statusFilter;
    return matchesSearch && matchesSection && matchesClass && matchesSession && matchesStatus;
  });

  const toggleSelection = (id: number) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const toggleAllSelection = () => {
    if (selectedIds.length === filteredStudents.length) setSelectedIds([]);
    else setSelectedIds(filteredStudents.map(s => s.id));
  };

  const handleStudentStatusUpdate = async (id: number, status: string) => {
    try {
      const res = await fetch(`/api/admin/students/${id}`, {
        method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ studentStatus: status })
      });
      if (res.ok) {
        alert(`Student marked as ${status} successfully!`);
        fetchAllData(); 
        if (selectedStudent && selectedStudent.id === id) {
          setSelectedStudent({ ...selectedStudent, studentStatus: status });
        }
      }
    } catch (err) { alert('Error updating student status'); }
  };

  const handleStudentDelete = async (id: number) => {
    if(!confirm('Are you sure you want to completely delete this student record?')) return;
    try {
      await fetch(`/api/admin/students/${id}`, { method: 'DELETE' });
      alert('Student deleted successfully.');
      fetchAllData();
      if (selectedStudent?.id === id) setSelectedStudent(null);
    } catch (err) { console.error(err); }
  };

  const handlePromote = async (student: Student) => {
    const promotionRules: Record<string, string> = {
      'Amma Part One': 'Amma Part Two',
      'Amma Part Two': 'Khasa Part One',
      'Khasa Part One': 'Khasa Part Two',
      'Khasa Part Two': 'Aliya Part One',
      'Aliya Part One': 'Aliya Part Two',
      'Aliya Part Two': 'Almiya Part One',
      'Almiya Part One': 'Almiya Part Two',
      'Almiya Part Two': 'Graduated'
    };
    const currentClass = student.classProgram;
    let nextClass = promotionRules[currentClass];
    if (!nextClass && currentClass.includes('Part One')) nextClass = currentClass.replace('Part One', 'Part Two');
    if (!nextClass) {
      const custom = prompt(`Cannot auto-determine next class for ${currentClass}. Enter next class manually:`);
      if (custom) nextClass = custom; else return;
    }
    if (nextClass === 'Graduated') {
      handleStudentStatusUpdate(student.id, 'Graduated');
      return;
    }
    
    if(confirm(`Promote ${student.studentName} from ${currentClass} to ${nextClass}?`)) {
      try {
        const res = await fetch(`/api/admin/students/${student.id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ classProgram: nextClass, fees: { ...student.fees, session: '2027-28' } })
        });
        if (res.ok) {
          alert(`Student successfully promoted to ${nextClass}!`);
          fetchAllData();
          if (selectedStudent?.id === student.id) setSelectedStudent({ ...selectedStudent, classProgram: nextClass });
        }
      } catch(e) { alert('Error promoting'); }
    }
  };

  const handleBulkStudentAction = async (action: string) => {
    if (selectedIds.length === 0) return alert('No students selected.');
    if (action === 'delete') {
      if(!confirm(`Are you sure you want to delete ${selectedIds.length} students?`)) return;
      try {
        await Promise.all(selectedIds.map(id => fetch(`/api/admin/students/${id}`, { method: 'DELETE' })));
        alert('Selected students deleted.');
        setSelectedIds([]); fetchAllData();
      } catch(e) { alert('Error in bulk delete'); }
    } else if (action === 'export') {
      exportStudentsToCSV();
    } else if (action === 'promote') {
      alert('Bulk promotion requires individual class rules mapping.');
    } else {
      try {
        await Promise.all(selectedIds.map(id => fetch(`/api/admin/students/${id}`, {
          method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ studentStatus: action })
        })));
        alert(`Selected students marked as ${action}.`);
        setSelectedIds([]); fetchAllData();
      } catch(e) { alert('Error in bulk status update'); }
    }
  };

  const exportStudentsToCSV = () => {
    if (filteredStudents.length === 0) return alert('No data to export');
    const headers = ['Student ID', 'Roll No', 'Name', 'Father Name', 'Class', 'Gender', 'Mobile', 'Status'];
    const rows = filteredStudents.map(std => [std.studentId, std.rollNo, std.studentName, std.fatherName, std.classProgram, std.sectionType, std.mobile, std.studentStatus || 'Active']);
    const csvContent = [headers.join(','), ...rows.map(row => row.map(cell => `"${(cell || '').replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a'); link.href = URL.createObjectURL(blob); link.download = `Students_Export.csv`; link.click();
  };

  if (selectedStudent) {
    return (
      <div className="bg-white rounded-sm border border-slate-200 overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
        <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-slate-50 sticky top-0 z-10 shadow-sm print:hidden">
          <button onClick={() => setSelectedStudent(null)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-black uppercase text-xs tracking-widest bg-white px-4 py-2.5 rounded-sm border border-slate-200 shadow-sm"><ArrowLeft size={16}/> Back to List</button>
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <button onClick={() => handlePromote(selectedStudent)} className="flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-indigo-700 transition-all"><TrendingUp size={16} className="inline"/> Promote</button>
            <button onClick={() => handleStudentStatusUpdate(selectedStudent.id, 'Graduated')} className="flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-blue-700 transition-all"><Award size={16} className="inline"/> Graduate</button>
            <button onClick={() => handleStudentStatusUpdate(selectedStudent.id, 'Suspended')} className="flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2.5 bg-amber-500 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-amber-600 transition-all"><AlertCircle size={16} className="inline"/> Suspend</button>
            <button onClick={() => window.print()} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all hidden md:flex"><Printer size={16}/> Print Profile</button>
            <button onClick={() => handleStudentDelete(selectedStudent.id)} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-rose-200 text-rose-600 rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-rose-50 transition-all hidden md:flex"><Trash2 size={16}/> Delete</button>
          </div>
        </div>

        <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10 print:p-0">
          <div className="lg:col-span-2 space-y-10">
            <div>
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-indigo-100 text-indigo-700 rounded-sm flex items-center justify-center font-black text-4xl shrink-0 print:border print:border-black print:bg-white">{selectedStudent.studentName.charAt(0)}</div>
                <div>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">{selectedStudent.studentName}</h3>
                  <p className="text-sm font-bold text-slate-500 tracking-widest uppercase mt-2">Student ID: <span className="font-mono text-slate-700">{selectedStudent.studentId}</span> | Roll No: <span className="font-mono text-slate-700">{selectedStudent.rollNo}</span></p>
                  <span className={`inline-block mt-4 px-4 py-1.5 rounded-sm text-xs font-black uppercase tracking-widest shadow-sm border print:hidden
                    ${(!selectedStudent.studentStatus || selectedStudent.studentStatus === 'Active') ? 'bg-blue-50 text-blue-600 border-blue-200' : ''}
                    ${selectedStudent.studentStatus === 'Inactive' ? 'bg-slate-50 text-slate-600 border-slate-200' : ''}
                    ${selectedStudent.studentStatus === 'Graduated' ? 'bg-indigo-50 text-indigo-600 border-indigo-200' : ''}
                    ${selectedStudent.studentStatus === 'Suspended' ? 'bg-rose-50 text-rose-600 border-rose-200' : ''}
                  `}>STATUS: {selectedStudent.studentStatus || 'Active'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 bg-slate-50 p-4 md:p-8 rounded-sm border border-slate-100 relative overflow-hidden print:bg-white print:border-black print:rounded-none">
                <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Father's Name</p><p className="text-sm font-bold text-slate-800">{selectedStudent.fatherName}</p></div>
                <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Date of Birth</p><p className="text-sm font-bold text-slate-800">{selectedStudent.dob || 'Not Provided'}</p></div>
                <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">CNIC / B-Form</p><p className="text-sm font-mono font-bold text-slate-800">{selectedStudent.cnic || 'Not Provided'}</p></div>
                <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Mobile Number</p><p className="text-sm font-mono font-bold text-slate-800">{selectedStudent.mobile}</p></div>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2"><BookOpen className="text-indigo-600 print:text-black"/> Academic Enrollment</h4>
              <div className="bg-slate-50 p-4 md:p-8 rounded-sm border border-slate-100 grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 print:bg-white print:border-black print:rounded-none">
                <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Current Class</p><p className="text-sm font-bold text-slate-800">{selectedStudent.classProgram}</p></div>
                <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Section</p><p className="text-sm font-bold text-slate-800">{selectedStudent.sectionType}</p></div>
                <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Academic Session</p><p className="text-sm font-bold text-slate-800 font-mono">{selectedStudent.fees?.session}</p></div>
                <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Admission Date</p><p className="text-sm font-bold text-slate-800">{new Date(selectedStudent.date).toLocaleDateString()}</p></div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 print:hidden">
              <div className="bg-blue-50 border border-blue-100 p-6 rounded-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-black text-blue-800 text-sm flex items-center gap-2"><CheckCircle2 size={16}/> Attendance Overview</h4>
                  <p className="text-xs text-blue-600/70 font-medium mt-1">Present: 142 days | Absent: 12 days</p>
                  <p className="text-3xl font-black text-blue-700 mt-4">92.2%</p>
                </div>
                <button onClick={() => alert('Viewing detailed attendance...')} className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-sm text-xs font-black uppercase hover:bg-blue-700">View Report</button>
              </div>
              <div className="bg-blue-50 border border-blue-100 p-6 rounded-sm flex flex-col justify-between">
                <div>
                  <h4 className="font-black text-blue-800 text-sm flex items-center gap-2"><Award size={16}/> Latest Results</h4>
                  <p className="text-xs text-blue-600/70 font-medium mt-1">Annual Examination 2025</p>
                  <div className="flex items-end gap-2 mt-4"><p className="text-3xl font-black text-blue-700">845</p><p className="text-sm font-bold text-blue-500 mb-1">/ 1000</p></div>
                </div>
                <button onClick={() => alert('Downloading Result Card...')} className="w-full mt-6 px-4 py-2 bg-blue-600 text-white rounded-sm text-xs font-black uppercase hover:bg-blue-700">Download Result</button>
              </div>
            </div>
          </div>

          <div className="space-y-8 print:hidden">
            <div className="bg-amber-50 p-6 rounded-sm border border-amber-100 shadow-sm">
              <h4 className="text-lg font-black text-amber-900 mb-6 flex items-center gap-2"><DollarSign className="text-amber-600"/> Fee Management</h4>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-amber-200 pb-2">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">Total Class Fee</span>
                  <span className="text-sm font-black text-amber-900 font-mono">Rs. {selectedStudent.fees?.totalFee || ((selectedStudent.fees?.admissionFee || 0) + (selectedStudent.fees?.registrationFee || 0))}</span>
                </div>
                <div className="flex justify-between items-center border-b border-amber-200 pb-2">
                  <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">Status</span>
                  <span className="text-xs font-black px-2 py-1 bg-blue-100 text-blue-700 rounded-md uppercase tracking-widest">Paid (Current)</span>
                </div>
                <button onClick={() => alert('Generating new fee challan...')} className="w-full py-2.5 bg-amber-500 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-amber-600 transition-all mt-2">Generate Challan</button>
              </div>
            </div>

            <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm">
              <h4 className="text-lg font-black text-slate-800 mb-6 flex items-center gap-2"><Folder className="text-indigo-600"/> Documents</h4>
              <div className="space-y-3">
                {selectedStudent.documents && Object.keys(selectedStudent.documents).length > 0 ? (
                  Object.entries(selectedStudent.documents).map(([key, doc], i) => {
                    const docLabel = key === 'photo' ? 'Student Photo' : key === 'student_cnic' ? 'Student CNIC' : key === 'father_cnic' ? 'Father CNIC' : key === 'result_card' ? 'Result Card' : doc.name;
                    return (
                      <div key={i} className="p-3 bg-slate-50 rounded-sm border border-slate-100 flex items-center justify-between">
                        <div className="flex items-center gap-2 overflow-hidden">
                          <FileCheck size={16} className="text-blue-500 shrink-0" />
                          <span className="text-xs font-bold text-slate-700 block truncate">{docLabel}</span>
                        </div>
                        <a href={doc.data || '#'} download={doc.name} className="text-[9px] px-2 py-1 bg-white border border-slate-200 rounded text-slate-600 font-black uppercase hover:text-indigo-600 block text-center leading-loose">DL</a>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-xs font-black text-slate-400 text-center py-4 uppercase tracking-widest">No Docs Available</p>
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
          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${statusFilter === 'All' ? 'text-indigo-300' : 'text-slate-400'}`}>Total Enrolled</p>
          <p className="text-3xl font-black">{total}</p>
        </div>
        <div onClick={() => setStatusFilter('Active')} className={`p-4 rounded-sm border shadow-sm text-center cursor-pointer hover:shadow-md transition-all ${statusFilter === 'Active' ? 'bg-blue-600 border-blue-700 text-white' : 'bg-blue-50 border-blue-100 text-blue-700'}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${statusFilter === 'Active' ? 'text-blue-200' : 'text-blue-600/70'}`}>Active</p>
          <p className="text-3xl font-black">{active}</p>
        </div>
        <div onClick={() => setStatusFilter('Graduated')} className={`p-4 rounded-sm border shadow-sm text-center cursor-pointer hover:shadow-md transition-all ${statusFilter === 'Graduated' ? 'bg-blue-600 border-blue-700 text-white' : 'bg-blue-50 border-blue-100 text-blue-700'}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${statusFilter === 'Graduated' ? 'text-blue-200' : 'text-blue-600/70'}`}>Graduated</p>
          <p className="text-3xl font-black">{graduated}</p>
        </div>
        <div onClick={() => {setStatusFilter('All'); setSectionTypeFilter('Tulba')}} className={`p-4 rounded-sm border shadow-sm text-center cursor-pointer hover:shadow-md transition-all ${sectionFilter === 'Tulba' ? 'bg-indigo-600 border-indigo-700 text-white' : 'bg-indigo-50 border-indigo-100 text-indigo-700'}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${sectionFilter === 'Tulba' ? 'text-indigo-200' : 'text-indigo-600/70'}`}>Tulba</p>
          <p className="text-3xl font-black">{tulba}</p>
        </div>
        <div onClick={() => {setStatusFilter('All'); setSectionTypeFilter('Talibat')}} className={`p-4 rounded-sm border shadow-sm text-center cursor-pointer hover:shadow-md transition-all ${sectionFilter === 'Talibat' ? 'bg-violet-600 border-violet-700 text-white' : 'bg-violet-50 border-violet-100 text-violet-700'}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${sectionFilter === 'Talibat' ? 'text-violet-200' : 'text-violet-600/70'}`}>Talibat</p>
          <p className="text-3xl font-black">{talibat}</p>
        </div>
        <div onClick={() => handleNavigate && handleNavigate('fees')} className={`p-4 rounded-sm border shadow-sm text-center cursor-pointer hover:shadow-md transition-all bg-rose-50 border-rose-100 text-rose-700`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 text-rose-600/70`}>Defaulters</p>
          <p className="text-3xl font-black">{defaulters}</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-sm shadow-sm border border-slate-200 space-y-4">
        <div className="flex flex-col lg:flex-row justify-between gap-6">
          <div className="flex flex-1 gap-4">
            <div className="relative flex-1 max-w-lg">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input type="text" placeholder="Search by name, Roll No, Student ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 rounded-sm text-sm transition-all font-bold text-slate-700" />
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2 bg-slate-100 p-1.5 rounded-sm">
            {(['All', 'Tulba', 'Talibat'] as const).map((s) => (
              <button key={s} onClick={() => setSectionTypeFilter(s)} className={`px-6 py-3 rounded-sm text-xs font-black uppercase tracking-widest transition-all ${sectionFilter === s ? 'bg-white text-indigo-700 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}>{s}</button>
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
          <div className="md:col-span-2 flex justify-end items-end gap-2">
            <button onClick={() => handleNavigate && handleNavigate('admissions')} className="px-4 py-3 bg-blue-50 text-blue-700 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-blue-100 transition-all">+ New Admission</button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedIds.length > 0 && (
          <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:20 }} className="bg-slate-800 p-4 rounded-sm flex flex-wrap items-center justify-between shadow-sm border border-gray-200 shadow-slate-900/20 z-20 sticky top-4 border border-slate-700">
            <span className="text-indigo-400 font-black text-sm px-4">{selectedIds.length} Student(s) Selected</span>
            <div className="flex flex-wrap gap-2">
              <button onClick={() => handleBulkStudentAction('promote')} className="px-4 py-2 bg-indigo-600 text-white rounded-sm text-xs font-black uppercase tracking-widest hover:bg-indigo-500">Auto Promote</button>
              <button onClick={() => handleBulkStudentAction('Suspended')} className="px-4 py-2 bg-amber-600 text-white rounded-sm text-xs font-black uppercase tracking-widest hover:bg-amber-500">Suspend</button>
              <button onClick={() => handleBulkStudentAction('export')} className="px-4 py-2 bg-white text-slate-800 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-slate-200">Export</button>
              <button onClick={() => handleBulkStudentAction('delete')} className="px-4 py-2 border border-slate-600 text-slate-300 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-slate-700 hover:text-white">Delete</button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="bg-white rounded-sm shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
          <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2"><Users size={20} className="text-indigo-600"/> Enrolled Students Directory</h3>
          <div className="flex gap-2">
            <button onClick={exportStudentsToCSV} className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-blue-700 rounded-sm text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-blue-50"><Download size={14}/> Export (CSV)</button>
          </div>
        </div>
        <div className="overflow-x-auto min-h-[500px]">
          <table className="w-full text-left border-collapse whitespace-nowrap">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-100">
                <th className="px-6 py-4 w-10">
                  <button onClick={toggleAllSelection} className="text-slate-400 hover:text-indigo-600">
                    {selectedIds.length === filteredStudents.length && filteredStudents.length > 0 ? <CheckSquareIcon size={18} className="text-indigo-600"/> : <Square size={18}/>}
                  </button>
                </th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">ID / Roll No</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Student Name</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Class & Section</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Contact</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Status</th>
                <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredStudents.map((std) => {
                const isSelected = selectedIds.includes(std.id);
                const sStatus = std.studentStatus || 'Active';
                return (
                  <tr key={std.id} className={`transition-colors group ${isSelected ? 'bg-indigo-50/50' : 'hover:bg-slate-50/80'}`}>
                    <td className="px-6 py-5">
                      <button onClick={() => toggleSelection(std.id)} className={`${isSelected ? 'text-indigo-600' : 'text-slate-300 group-hover:text-slate-400'}`}>
                        {isSelected ? <CheckSquareIcon size={18}/> : <Square size={18}/>}
                      </button>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-mono text-xs font-black text-slate-700">{std.studentId}</div>
                      <div className="text-[10px] font-bold text-slate-400 mt-1 uppercase tracking-widest">{std.rollNo}</div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-sm bg-slate-100 group-hover:bg-indigo-100 flex items-center justify-center text-slate-600 group-hover:text-indigo-700 font-black transition-colors shrink-0">{std.studentName?.charAt(0)}</div>
                        <div>
                          <div className="font-black text-sm text-slate-800 tracking-tight">{std.studentName}</div>
                          <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">S/O {std.fatherName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-black text-xs text-slate-700">{std.classProgram}</div>
                      <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1">{std.sectionType}</div>
                    </td>
                    <td className="px-6 py-5 font-mono text-xs font-bold text-slate-600">{std.mobile}</td>
                    <td className="px-6 py-5 text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest
                        ${sStatus === 'Active' ? 'bg-blue-100 text-blue-700' : ''}
                        ${sStatus === 'Inactive' ? 'bg-slate-100 text-slate-700' : ''}
                        ${sStatus === 'Suspended' ? 'bg-rose-100 text-rose-700' : ''}
                        ${sStatus === 'Graduated' ? 'bg-blue-100 text-blue-700' : ''}
                      `}>{sStatus}</span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setSelectedStudent(std)} className="p-2 bg-white border border-slate-200 rounded-sm hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm" title="View Profile"><Eye size={16} /></button>
                        <button onClick={() => handlePromote(std)} className="p-2 bg-white border border-slate-200 rounded-sm hover:bg-blue-50 hover:border-blue-200 hover:text-blue-600 transition-all shadow-sm" title="Promote Student"><TrendingUp size={16} /></button>
                        <button onClick={() => handleStudentDelete(std.id)} className="p-2 bg-white border border-rose-200 rounded-sm hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-all shadow-sm" title="Delete Student"><Trash2 size={16} /></button>
                      </div>
                    </td>
                  </tr>
                );
              })}
              {filteredStudents.length === 0 && (
                <tr>
                  <td colSpan={7} className="py-20 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <Search size={40} className="text-slate-200 mb-4" />
                      <p className="text-sm font-bold text-slate-500">No students found matching your criteria.</p>
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
