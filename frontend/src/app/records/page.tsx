'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, Search, Plus, Lock, Unlock, KeyRound, CheckCircle2, 
  Phone, MessageSquare, Printer, Download, Eye, 
  Trash2, RefreshCw, X, ArrowUpDown, ChevronRight,
  GraduationCap, AlertCircle, FileText, Image as ImageIcon,
  ExternalLink, Paperclip
} from 'lucide-react';
import Image from 'next/image';

const OFFICIAL_CLASSES = [
  "Mutawassitah",
  "Sanawiya Aamma Awal",
  "Sanawiya Aamma Dom",
  "Sanawiya Khasa Awal",
  "Sanawiya Khasa Dom",
  "Aliya Awal",
  "Aliya Dom",
  "Alamiya Awal",
  "Alamiya Dom",
  "Takhassus",
  "Hifz-ul-Quran",
  "Tajweed-o-Qira'at",
  "Amma Khasusi",
  "Khasa Khasusi",
  "Almiya Khasusi Part One",
  "Almiya Khasusi Part Two"
];

interface StudentRecord {
  id: number;
  studentId: string;
  rollNo: string;
  studentName: string;
  fatherName: string;
  mobile: string;
  cnic?: string;
  fatherCnic?: string;
  classProgram: string;
  sectionType: string;
  studentStatus?: string;
  status?: string;
  challanNo?: string;
  documents?: {
    fileUrl?: string;
    fileName?: string;
    fileType?: string;
    photo?: string;
    data?: string;
    [key: string]: any;
  };
  createdAt?: string;
}

export default function RecordsPortalPage() {
  const [pin, setPin] = useState('');
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [pinError, setPinError] = useState('');
  const [pinLoading, setPinLoading] = useState(false);

  // Data states
  const [students, setStudents] = useState<StudentRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('All');
  const [selectedSection, setSelectedSection] = useState<'All' | 'Tulba' | 'Talibat'>('All');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState<StudentRecord | null>(null);
  const [showPinModal, setShowPinModal] = useState(false);
  const [previewDoc, setPreviewDoc] = useState<{ url: string; name: string; type?: string } | null>(null);

  // Form states (No Fee Fields)
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    classProgram: 'Mutawassitah',
    sectionType: 'Tulba Section',
    mobile: '',
    cnic: '',
    fatherCnic: '',
    studentStatus: 'Active'
  });
  const [docFile, setDocFile] = useState<{ name: string; data: string; type: string; size: string } | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // PIN Change Form
  const [pinForm, setPinForm] = useState({ currentPin: '', newPin: '' });
  const [pinChangeMsg, setPinChangeMsg] = useState({ type: '', text: '' });

  // Check saved session PIN on mount
  useEffect(() => {
    const savedPin = sessionStorage.getItem('jamia_staff_pin');
    if (savedPin) {
      setPin(savedPin);
      verifyPinDirect(savedPin);
    }
  }, []);

  const verifyPinDirect = async (inputPin: string) => {
    setPinLoading(true);
    setPinError('');
    try {
      const res = await fetch('/api/records/verify-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pin: inputPin })
      });
      const data = await res.json();
      if (res.ok && data.authorized) {
        setIsUnlocked(true);
        sessionStorage.setItem('jamia_staff_pin', inputPin);
        fetchStudents(inputPin);
      } else {
        setPinError(data.error || 'Ghalat PIN code! Baraye meharbani sahi PIN enter karein.');
        sessionStorage.removeItem('jamia_staff_pin');
      }
    } catch (err: any) {
      setPinError('Server se rabta nahi ho saka.');
    } finally {
      setPinLoading(false);
    }
  };

  const handlePinSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pin.trim()) return;
    verifyPinDirect(pin.trim());
  };

  const fetchStudents = async (authPin?: string) => {
    const activePin = authPin || pin || sessionStorage.getItem('jamia_staff_pin') || '';
    setLoading(true);
    try {
      const res = await fetch('/api/records/students', {
        headers: { 'x-staff-pin': activePin }
      });
      if (res.ok) {
        const data = await res.json();
        setStudents(Array.isArray(data) ? data : []);
      }
    } catch (err) {
      console.error('Failed to fetch records:', err);
    } finally {
      setLoading(false);
    }
  };

  // Filter students
  const filteredStudents = useMemo(() => {
    return students.filter(s => {
      const q = searchTerm.toLowerCase().trim();
      const matchesSearch = !q || 
        (s.studentName && s.studentName.toLowerCase().includes(q)) ||
        (s.fatherName && s.fatherName.toLowerCase().includes(q)) ||
        (s.rollNo && s.rollNo.toLowerCase().includes(q)) ||
        (s.mobile && s.mobile.includes(q)) ||
        (s.cnic && s.cnic.includes(q)) ||
        (s.fatherCnic && s.fatherCnic.includes(q)) ||
        (s.studentId && s.studentId.toLowerCase().includes(q));

      const matchesClass = selectedClass === 'All' || s.classProgram === selectedClass;
      
      const matchesSection = selectedSection === 'All' || 
        (selectedSection === 'Tulba' && s.sectionType?.toLowerCase().includes('tulba')) ||
        (selectedSection === 'Talibat' && s.sectionType?.toLowerCase().includes('talibat'));

      return matchesSearch && matchesClass && matchesSection;
    });
  }, [students, searchTerm, selectedClass, selectedSection]);

  // Stats
  const stats = useMemo(() => {
    const total = students.length;
    const tulba = students.filter(s => s.sectionType?.toLowerCase().includes('tulba')).length;
    const talibat = students.filter(s => s.sectionType?.toLowerCase().includes('talibat')).length;
    const withDocs = students.filter(s => s.documents && (s.documents.fileUrl || s.documents.photo || s.documents.data)).length;
    const classesCount = new Set(students.map(s => s.classProgram)).size;
    return { total, tulba, talibat, withDocs, classesCount };
  }, [students]);

  // Handle Document / File Selection (Compresses Image to base64)
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 8 * 1024 * 1024) {
      alert('File size 8MB se kam honi chahiye.');
      e.target.value = '';
      return;
    }

    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = document.createElement('img');
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const maxDim = 1200;
          if (width > maxDim || height > maxDim) {
            if (width > height) {
              height = Math.round((height * maxDim) / width);
              width = maxDim;
            } else {
              width = Math.round((width * maxDim) / height);
              height = height > maxDim ? maxDim : height;
            }
          }
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.drawImage(img, 0, 0, width, height);
            const compressed = canvas.toDataURL('image/jpeg', 0.78);
            setDocFile({
              name: file.name,
              data: compressed,
              type: 'image/jpeg',
              size: `${Math.round((compressed.length * 0.75) / 1024)} KB`
            });
          }
        };
        img.src = reader.result as string;
      };
      reader.readAsDataURL(file);
    } else {
      // PDF or other documents
      const reader = new FileReader();
      reader.onload = () => {
        setDocFile({
          name: file.name,
          data: reader.result as string,
          type: file.type || 'application/octet-stream',
          size: `${(file.size / 1024).toFixed(1)} KB`
        });
      };
      reader.readAsDataURL(file);
    }
  };

  // Quick Add Student
  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName.trim() || !formData.fatherName.trim()) {
      alert('Student Name aur Father Name lazmi hain.');
      return;
    }
    if (!formData.mobile.trim()) {
      alert('Mobile / Phone number lazmi hai.');
      return;
    }

    setSubmitting(true);
    const activePin = pin || sessionStorage.getItem('jamia_staff_pin') || '';
    try {
      const payload: any = {
        studentName: formData.studentName.trim(),
        fatherName: formData.fatherName.trim(),
        classProgram: formData.classProgram,
        sectionType: formData.sectionType,
        mobile: formData.mobile.trim(),
        cnic: formData.cnic.trim(),
        fatherCnic: formData.fatherCnic.trim(),
        studentStatus: 'Active',
        status: 'Approved'
      };

      if (docFile) {
        payload.documents = {
          fileUrl: docFile.data,
          fileName: docFile.name,
          fileType: docFile.type,
          photo: docFile.type.startsWith('image') ? docFile.data : undefined,
          uploadedAt: new Date().toISOString()
        };
      }

      const res = await fetch('/api/records/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-staff-pin': activePin
        },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStudents(prev => [data.student, ...prev]);
        setShowAddModal(false);
        setDocFile(null);
        // Reset form
        setFormData({
          studentName: '',
          fatherName: '',
          classProgram: formData.classProgram,
          sectionType: formData.sectionType,
          mobile: '',
          cnic: '',
          fatherCnic: '',
          studentStatus: 'Active'
        });
        alert(`Mubarak! ${data.student.studentName} ka dakhla kamyabi se save ho gaya.\nRoll No: ${data.student.rollNo}`);
      } else {
        alert(data.error || 'Failed to add student');
      }
    } catch (err: any) {
      alert('Network error: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Delete Student
  const handleDeleteStudent = async (student: StudentRecord) => {
    if (!confirm(`Kia aap waqai ${student.studentName} (Roll No: ${student.rollNo}) ka record delete karna chahte hain?`)) return;
    const activePin = pin || sessionStorage.getItem('jamia_staff_pin') || '';
    try {
      const res = await fetch(`/api/records/students/${student.id}`, {
        method: 'DELETE',
        headers: { 'x-staff-pin': activePin }
      });
      if (res.ok) {
        setStudents(prev => prev.filter(s => s.id !== student.id));
        if (showDetailModal?.id === student.id) setShowDetailModal(null);
      }
    } catch (err) {
      alert('Delete failed');
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredStudents.length === 0) {
      alert('Koi data mojood nahi hai export karne ke liye.');
      return;
    }
    const headers = ['Sr', 'Roll No', 'Student ID', 'Student Name', 'Student CNIC', 'Father Name', 'Father CNIC', 'Class', 'Section', 'Mobile', 'Document Attached'];
    const rows = filteredStudents.map((s, idx) => [
      idx + 1,
      s.rollNo,
      s.studentId,
      s.studentName,
      s.cnic || 'N/A',
      s.fatherName,
      s.fatherCnic || 'N/A',
      s.classProgram,
      s.sectionType,
      s.mobile || 'N/A',
      (s.documents?.fileUrl || s.documents?.photo || s.documents?.data) ? 'Yes' : 'No'
    ]);
    const csvContent = [headers.join(','), ...rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(','))].join('\n');
    const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Jamia_Records_${selectedClass.replace(/\s+/g, '_')}_${Date.now()}.csv`;
    a.click();
  };

  // Change PIN handler
  const handleChangePin = async (e: React.FormEvent) => {
    e.preventDefault();
    setPinChangeMsg({ type: '', text: '' });
    try {
      const res = await fetch('/api/records/change-pin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(pinForm)
      });
      const data = await res.json();
      if (res.ok) {
        setPinChangeMsg({ type: 'success', text: 'PIN Code kamyabi se update ho gaya!' });
        sessionStorage.setItem('jamia_staff_pin', pinForm.newPin);
        setPin(pinForm.newPin);
        setTimeout(() => {
          setShowPinModal(false);
          setPinForm({ currentPin: '', newPin: '' });
          setPinChangeMsg({ type: '', text: '' });
        }, 1500);
      } else {
        setPinChangeMsg({ type: 'error', text: data.error || 'PIN update fail ho gaya.' });
      }
    } catch (err: any) {
      setPinChangeMsg({ type: 'error', text: 'Server error while updating PIN.' });
    }
  };

  // Helper to extract student document URL
  const getStudentDoc = (s: StudentRecord) => {
    if (!s.documents) return null;
    const url = s.documents.fileUrl || s.documents.photo || s.documents.data || null;
    const name = s.documents.fileName || `${s.studentName}_doc`;
    const type = s.documents.fileType || (url && url.startsWith('data:image') ? 'image/jpeg' : 'file');
    return url ? { url, name, type } : null;
  };

  // ----------------------------------------------------
  // PIN LOCKED SCREEN
  // ----------------------------------------------------
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 flex items-center justify-center p-4 font-sans">
        <div className="bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl max-w-md w-full p-8 border border-white/20 text-center animate-in fade-in zoom-in-95 duration-200">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-inner">
            <Lock size={32} />
          </div>

          <h2 className="text-2xl font-black text-slate-900 tracking-tight">
            مرکزِ ریکارڈز جامعہ شیرِ ربانی
          </h2>
          <p className="text-xs text-slate-500 mt-1 mb-6">
            Jamia Staff Live Records Portal • برائے عملہ و اساتذہ
          </p>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-black uppercase tracking-wider text-slate-700 mb-2">
                4-Digit Staff PIN Code درج کریں
              </label>
              <div className="relative">
                <input
                  type="password"
                  maxLength={8}
                  autoFocus
                  placeholder="••••"
                  value={pin}
                  onChange={e => setPin(e.target.value)}
                  className="w-full text-center text-3xl tracking-[0.5em] font-mono font-black py-4 bg-slate-50 border-2 border-slate-200 rounded-2xl focus:outline-none focus:border-emerald-600 focus:bg-white text-slate-900 transition-all shadow-inner"
                />
                <KeyRound className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              </div>
            </div>

            {pinError && (
              <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-rose-700 text-xs font-bold flex items-center gap-2 text-right justify-center">
                <AlertCircle size={16} className="shrink-0" />
                <span>{pinError}</span>
              </div>
            )}

            <button
              type="submit"
              disabled={pinLoading || !pin}
              className="w-full py-4 bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white rounded-2xl font-black text-sm uppercase tracking-widest transition-all shadow-lg shadow-emerald-700/30 flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {pinLoading ? <RefreshCw size={18} className="animate-spin" /> : <Unlock size={18} />}
              {pinLoading ? 'تصدیق ہو رہی ہے...' : 'ریکارڈز کھولیں (Unlock Portal)'}
            </button>
          </form>

          <div className="mt-6 pt-6 border-t border-slate-200/70 text-slate-500 text-[11px]">
            <p className="font-medium">
              💡 <span className="font-bold">Initial Default PIN:</span> <code className="bg-slate-100 px-2 py-0.5 rounded font-mono font-bold text-slate-800">7860</code> (PIN tabdeel karne ke baad sirf aap ka naya PIN kaam karega).
            </p>
          </div>
        </div>
      </div>
    );
  }

  // ----------------------------------------------------
  // UNLOCKED RECORDS PORTAL VIEW
  // ----------------------------------------------------
  return (
    <div className="min-h-screen bg-slate-100 font-sans text-slate-900 pb-20">
      
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white border-b border-slate-800 sticky top-0 z-30 shadow-md print:hidden">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 relative bg-white/10 rounded-xl p-1 shrink-0">
              <Image src="/logo.jpeg" alt="Jamia Logo" fill className="object-contain rounded-lg" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base md:text-lg font-black tracking-tight text-white">جامعہ شیرِ ربانی • مرکزِ ریکارڈز</h1>
                <span className="bg-emerald-600 text-white text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded-full">Live Portal</span>
              </div>
              <p className="text-[11px] font-medium text-emerald-300">All Classes Student Records & Management</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                setDocFile(null);
                setShowAddModal(true);
              }}
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-3.5 py-2 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-md shadow-emerald-700/20 transition-all cursor-pointer"
            >
              <Plus size={16} /> + نیا طالب علم داخل کریں
            </button>
            <button
              onClick={() => window.print()}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Print Register"
            >
              <Printer size={15} /> پرنٹ
            </button>
            <button
              onClick={handleExportCSV}
              className="bg-slate-800 hover:bg-slate-700 text-slate-200 px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer"
              title="Download Excel CSV"
            >
              <Download size={15} /> ایکسل (CSV)
            </button>
            <button
              onClick={() => setShowPinModal(true)}
              className="p-2 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              title="Change PIN Code"
            >
              <KeyRound size={17} />
            </button>
            <button
              onClick={() => {
                sessionStorage.removeItem('jamia_staff_pin');
                setIsUnlocked(false);
              }}
              className="p-2 text-rose-400 hover:text-rose-300 rounded-lg transition-colors cursor-pointer"
              title="Lock Portal"
            >
              <Lock size={17} />
            </button>
          </div>
        </div>
      </header>

      {/* Printable Sheet Header (Visible Only on Print) */}
      <div className="hidden print:block p-8 border-b-2 border-slate-900 bg-white">
        <div className="text-center">
          <h2 className="text-2xl font-black text-slate-900 uppercase">جامعہ شیرِ ربانی منڈی بہاؤالدین</h2>
          <h3 className="text-base font-bold text-slate-700 mt-1">
            کلاس وار رجسٹر طلباء و طالبات • {selectedClass === 'All' ? 'تمام کلاسز' : selectedClass} ({selectedSection === 'All' ? 'تمام شعبہ جات' : selectedSection})
          </h3>
          <p className="text-xs text-slate-500 mt-1">تاریخ پرنٹ: {new Date().toLocaleDateString('ur-PK')}</p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        
        {/* Live Academic Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 print:hidden">
          <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-1">کل طلباء و طالبات</span>
            <div className="text-2xl md:text-3xl font-black text-slate-900">{stats.total}</div>
          </div>
          <div className="bg-blue-50/70 p-4 rounded-2xl border border-blue-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-blue-700 block mb-1">طلباء (بنین / لڑکے)</span>
            <div className="text-2xl md:text-3xl font-black text-blue-900">{stats.tulba}</div>
          </div>
          <div className="bg-purple-50/70 p-4 rounded-2xl border border-purple-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-purple-700 block mb-1">طالبات (بنات / لڑکیاں)</span>
            <div className="text-2xl md:text-3xl font-black text-purple-900">{stats.talibat}</div>
          </div>
          <div className="bg-emerald-50/70 p-4 rounded-2xl border border-emerald-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 block mb-1">دستاویزات منسلک</span>
            <div className="text-2xl md:text-3xl font-black text-emerald-900">{stats.withDocs}</div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4 print:hidden">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="تلاش کریں: نام، ولدیت، رول نمبر، فون نمبر، یا شناختی کارڈ..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs md:text-sm font-semibold text-right focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X size={15} />
                </button>
              )}
            </div>

            {/* Section Switcher Tabs */}
            <div className="flex bg-slate-100 p-1 rounded-xl shrink-0 self-start md:self-auto">
              {(['All', 'Tulba', 'Talibat'] as const).map(sec => (
                <button
                  key={sec}
                  onClick={() => setSelectedSection(sec)}
                  className={`px-4 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    selectedSection === sec
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {sec === 'All' ? 'تمام' : sec === 'Tulba' ? 'طلباء (Boys)' : 'طالبات (Girls)'}
                </button>
              ))}
            </div>

            {/* Quick Refresh */}
            <button
              onClick={() => fetchStudents()}
              disabled={loading}
              className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl transition-colors cursor-pointer self-end md:self-auto"
              title="Refresh Records"
            >
              <RefreshCw size={17} className={loading ? 'animate-spin' : ''} />
            </button>
          </div>

          {/* Classes Navigation Pills */}
          <div className="pt-3 border-t border-slate-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 block mb-2">
              کلاس منتخب کریں (Select Class):
            </span>
            <div className="flex flex-wrap gap-1.5 overflow-x-auto pb-1">
              <button
                onClick={() => setSelectedClass('All')}
                className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                  selectedClass === 'All'
                    ? 'bg-emerald-700 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                سب کلاسز (All)
              </button>
              {OFFICIAL_CLASSES.map(cls => (
                <button
                  key={cls}
                  onClick={() => setSelectedClass(cls)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-black transition-all cursor-pointer ${
                    selectedClass === cls
                      ? 'bg-emerald-700 text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          <div className="flex justify-end text-xs font-bold text-slate-500 pt-1">
            <span>
              نمایاں ریکارڈز: <span className="text-slate-900 font-black">{filteredStudents.length}</span> / {students.length}
            </span>
          </div>
        </div>

        {/* Students Table / Directory */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs md:text-sm">
              <thead className="bg-slate-900 text-white border-b border-slate-800 text-[11px] font-black uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 text-center w-12">#</th>
                  <th className="py-3 px-4 text-right">رول نمبر / ID</th>
                  <th className="py-3 px-4 text-right">طالب علم کا نام</th>
                  <th className="py-3 px-4 text-right">والد کا نام</th>
                  <th className="py-3 px-4 text-right">کلاس و شعبہ</th>
                  <th className="py-3 px-4 text-center">رابطہ / فون</th>
                  <th className="py-3 px-4 text-center">دستاویز / تصویر</th>
                  <th className="py-3 px-4 text-center print:hidden">ایکشن</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-slate-400 font-bold">
                      <RefreshCw className="animate-spin inline-block mr-2" size={20} />
                      ریکارڈز لوڈ ہو رہے ہیں...
                    </td>
                  </tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="py-16 text-center text-slate-400 font-bold">
                      کوئی ریکارڈ نہیں ملا۔ نیا داخلہ کرنے کے لیے اوپر &quot;+ نیا طالب علم داخل کریں&quot; بٹن دبائیں۔
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((std, idx) => {
                    const doc = getStudentDoc(std);

                    return (
                      <tr key={std.id} className="hover:bg-slate-50/80 transition-colors">
                        <td className="py-3 px-4 text-center font-bold text-slate-400 text-xs">
                          {idx + 1}
                        </td>
                        
                        <td className="py-3 px-4">
                          <span className="font-mono font-black text-slate-900 bg-slate-100 px-2.5 py-1 rounded-md text-xs tracking-wider inline-block">
                            {std.rollNo || 'N/A'}
                          </span>
                          <span className="block text-[10px] text-slate-400 font-mono mt-0.5">{std.studentId}</span>
                        </td>

                        <td className="py-3 px-4">
                          <span 
                            className="font-black text-slate-900 text-sm block cursor-pointer hover:text-emerald-700" 
                            onClick={() => setShowDetailModal(std)}
                          >
                            {std.studentName}
                          </span>
                          {std.cnic && (
                            <span className="text-[10px] text-slate-500 font-mono block">
                              ب فارم: {std.cnic}
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-semibold text-slate-800 block">
                            {std.fatherName}
                          </span>
                          {std.fatherCnic && (
                            <span className="text-[10px] text-slate-400 font-mono block">
                              شناختی کارڈ: {std.fatherCnic}
                            </span>
                          )}
                        </td>

                        <td className="py-3 px-4">
                          <span className="font-black text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded text-xs block w-fit">
                            {std.classProgram}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium">
                            {std.sectionType}
                          </span>
                        </td>

                        <td className="py-3 px-4 text-center font-mono">
                          {std.mobile ? (
                            <div className="flex items-center justify-center gap-1.5">
                              <span className="font-bold text-slate-800 text-xs">{std.mobile}</span>
                              <a
                                href={`https://wa.me/92${std.mobile.replace(/^0/, '').replace(/[^0-9]/g, '')}`}
                                target="_blank"
                                rel="noreferrer"
                                className="text-emerald-600 hover:text-emerald-700 p-1 rounded hover:bg-emerald-50 print:hidden"
                                title="Open WhatsApp Chat"
                              >
                                <MessageSquare size={14} />
                              </a>
                            </div>
                          ) : (
                            <span className="text-slate-400 text-xs">-</span>
                          )}
                        </td>

                        {/* Document / Photo Column */}
                        <td className="py-3 px-4 text-center">
                          {doc ? (
                            doc.url.startsWith('data:image') || doc.url.match(/\.(jpg|jpeg|png|webp)/i) ? (
                              <button
                                onClick={() => setPreviewDoc(doc)}
                                className="group relative inline-block cursor-pointer"
                                title="تصویر بڑی کر کے دیکھیں"
                              >
                                <div className="w-10 h-10 rounded-xl overflow-hidden border-2 border-emerald-500/40 shadow-sm relative mx-auto group-hover:scale-105 transition-transform bg-slate-100">
                                  {/* eslint-disable-next-line @next/next/no-img-element */}
                                  <img 
                                    src={doc.url} 
                                    alt={doc.name} 
                                    className="w-full h-full object-cover" 
                                  />
                                  <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity">
                                    <Eye size={13} />
                                  </div>
                                </div>
                              </button>
                            ) : (
                              <button
                                onClick={() => setPreviewDoc(doc)}
                                className="inline-flex items-center gap-1 px-2.5 py-1 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 rounded-lg text-xs font-bold transition-colors cursor-pointer border border-indigo-200"
                                title="دستاویز دیکھیں"
                              >
                                <FileText size={13} />
                                <span>دستاویز</span>
                              </button>
                            )
                          ) : (
                            <span className="text-slate-300 text-xs">-</span>
                          )}
                        </td>

                        <td className="py-3 px-4 text-center print:hidden">
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() => setShowDetailModal(std)}
                              className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors cursor-pointer"
                              title="مکمل تفصیلات دیکھیں"
                            >
                              <Eye size={15} />
                            </button>
                            <button
                              onClick={() => handleDeleteStudent(std)}
                              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                              title="ریکارڈ ڈیلیٹ کریں"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      {/* ---------------------------------------------------- */}
      {/* QUICK ADD STUDENT MODAL (Fee Fields Completely Removed) */}
      {/* ---------------------------------------------------- */}
      {showAddModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-xl w-full p-6 md:p-8 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div>
                <h3 className="text-xl font-black text-slate-900 flex items-center gap-2">
                  <GraduationCap className="text-emerald-600" /> نیا طالب علم داخل کریں
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">Quick Direct Entry into Class Register</p>
              </div>
              <button 
                onClick={() => {
                  setShowAddModal(false);
                  setDocFile(null);
                }} 
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-4 mt-5 text-right">
              {/* Student Name */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                  طالب علم کا مکمل نام * (Student Name)
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: محمد احمد"
                  value={formData.studentName}
                  onChange={e => setFormData({ ...formData, studentName: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              {/* Father Name */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                  والد کا نام * (Father&apos;s Name)
                </label>
                <input
                  type="text"
                  required
                  placeholder="مثال: محمد علی"
                  value={formData.fatherName}
                  onChange={e => setFormData({ ...formData, fatherName: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white"
                />
              </div>

              {/* Class & Section */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                    کلاس / درجہ * (Class Program)
                  </label>
                  <select
                    value={formData.classProgram}
                    onChange={e => setFormData({ ...formData, classProgram: e.target.value })}
                    className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    {OFFICIAL_CLASSES.map(cls => (
                      <option key={cls} value={cls}>{cls}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                    شعبہ * (Section / Gender)
                  </label>
                  <select
                    value={formData.sectionType}
                    onChange={e => setFormData({ ...formData, sectionType: e.target.value })}
                    className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Tulba Section">طلباء سیکشن (Tulba Section / Boys)</option>
                    <option value="Talibat Section">طالبات سیکشن (Talibat Section / Girls)</option>
                  </select>
                </div>
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                  رابطہ نمبر * (Phone Number)
                </label>
                <input
                  type="tel"
                  required
                  placeholder="03001234567"
                  value={formData.mobile}
                  onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 text-left font-mono"
                />
              </div>

              {/* Student CNIC & Father CNIC (Both strictly Optional) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                    شناختی کارڈ / ب فارم <span className="text-emerald-600 font-bold">(اختیاری / Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="35404-XXXXXXX-X (Optional)"
                    value={formData.cnic}
                    onChange={e => setFormData({ ...formData, cnic: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 text-left font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-slate-700 mb-1">
                    والد کا شناختی کارڈ <span className="text-emerald-600 font-bold">(اختیاری / Optional)</span>
                  </label>
                  <input
                    type="text"
                    placeholder="35404-XXXXXXX-X (Optional)"
                    value={formData.fatherCnic}
                    onChange={e => setFormData({ ...formData, fatherCnic: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 text-left font-mono"
                  />
                </div>
              </div>

              {/* Optional Documents / Photo Upload */}
              <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-bold text-slate-400">سائز 8MB تک</span>
                  <label className="text-xs font-black uppercase text-slate-800 flex items-center gap-1.5">
                    <Paperclip size={14} className="text-emerald-600" />
                    دستاویز / تصویر <span className="text-emerald-600 font-bold">(اختیاری / Optional)</span>
                  </label>
                </div>
                
                {docFile ? (
                  <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-emerald-200 shadow-sm">
                    <div className="flex items-center gap-3">
                      {docFile.type.startsWith('image') ? (
                        <div className="w-12 h-12 rounded-lg overflow-hidden border border-slate-200 relative shrink-0">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={docFile.data} alt="Doc preview" className="w-full h-full object-cover" />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                          <FileText size={20} />
                        </div>
                      )}
                      <div className="text-right">
                        <span className="text-xs font-black text-slate-900 block truncate max-w-[200px]">{docFile.name}</span>
                        <span className="text-[10px] text-slate-400 font-mono">{docFile.size}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => setDocFile(null)}
                      className="p-1.5 text-rose-500 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer"
                      title="فائل ہٹائیں"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ) : (
                  <div>
                    <label className="flex flex-col items-center justify-center p-4 border-2 border-dashed border-slate-300 hover:border-emerald-500 rounded-xl bg-white cursor-pointer transition-colors group">
                      <ImageIcon size={24} className="text-slate-400 group-hover:text-emerald-600 mb-1 transition-colors" />
                      <span className="text-xs font-bold text-slate-600 group-hover:text-emerald-700">
                        تصویر، ب فارم یا کوئی بھی دستاویز منتخب کریں
                      </span>
                      <span className="text-[10px] text-slate-400 mt-0.5">JPG, PNG, PDF قبول ہیں (اختیاری ہے)</span>
                      <input
                        type="file"
                        accept="image/*,.pdf"
                        onChange={handleFileSelect}
                        className="hidden"
                      />
                    </label>
                  </div>
                )}
              </div>

              {/* Buttons */}
              <div className="pt-4 flex gap-3">
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-sm uppercase tracking-wider shadow-lg shadow-emerald-700/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? <RefreshCw size={17} className="animate-spin" /> : <CheckCircle2 size={17} />}
                  {submitting ? 'محفوظ ہو رہا ہے...' : 'محفوظ کریں (Save Student)'}
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowAddModal(false);
                    setDocFile(null);
                  }}
                  className="px-6 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-sm transition-colors cursor-pointer"
                >
                  منسوخ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* STUDENT DETAIL MODAL */}
      {/* ---------------------------------------------------- */}
      {showDetailModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 md:p-8 animate-in fade-in zoom-in-95 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                {(() => {
                  const doc = getStudentDoc(showDetailModal);
                  if (doc && (doc.url.startsWith('data:image') || doc.url.match(/\.(jpg|jpeg|png|webp)/i))) {
                    return (
                      <div 
                        className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-emerald-500 shadow-md relative cursor-pointer"
                        onClick={() => setPreviewDoc(doc)}
                        title="تصویر دیکھنے کے لیے کلک کریں"
                      >
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={doc.url} alt={showDetailModal.studentName} className="w-full h-full object-cover" />
                      </div>
                    );
                  }
                  return (
                    <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center font-black text-lg">
                      {showDetailModal.studentName.charAt(0)}
                    </div>
                  );
                })()}
                <div>
                  <h3 className="text-xl font-black text-slate-900">{showDetailModal.studentName}</h3>
                  <p className="text-xs text-slate-500">ولد {showDetailModal.fatherName}</p>
                </div>
              </div>
              <button onClick={() => setShowDetailModal(null)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer">
                <X size={20} />
              </button>
            </div>

            <div className="space-y-4 my-6 text-xs md:text-sm">
              <div className="grid grid-cols-2 gap-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400 block mb-0.5">رول نمبر (Roll No)</span>
                  <span className="font-mono font-black text-slate-900 text-base">{showDetailModal.rollNo}</span>
                </div>
                <div>
                  <span className="text-[10px] font-black uppercase text-slate-400 block mb-0.5">اسٹوڈنٹ ID</span>
                  <span className="font-mono font-bold text-slate-700 text-base">{showDetailModal.studentId}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-black uppercase text-slate-400 block mb-0.5">کلاس (Class)</span>
                  <span className="font-black text-emerald-800">{showDetailModal.classProgram}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-black uppercase text-slate-400 block mb-0.5">شعبہ (Section)</span>
                  <span className="font-bold text-slate-700">{showDetailModal.sectionType}</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-black uppercase text-slate-400 block mb-0.5">رابطہ نمبر (Phone)</span>
                  <span className="font-mono font-bold text-slate-800">{showDetailModal.mobile || 'درج نہیں'}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-black uppercase text-slate-400 block mb-0.5">طالب علم کا شناختی کارڈ / ب فارم</span>
                  <span className="font-mono font-bold text-slate-800">{showDetailModal.cnic || 'درج نہیں'}</span>
                </div>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-[10px] font-black uppercase text-slate-400 block mb-0.5">والد کا شناختی کارڈ (Father CNIC)</span>
                <span className="font-mono font-bold text-slate-800">{showDetailModal.fatherCnic || 'درج نہیں'}</span>
              </div>

              {/* Document in Detail Modal */}
              {(() => {
                const doc = getStudentDoc(showDetailModal);
                if (!doc) return null;
                const isImg = doc.url.startsWith('data:image') || doc.url.match(/\.(jpg|jpeg|png|webp)/i);
                return (
                  <div className="p-4 bg-slate-50 border border-slate-200 rounded-2xl">
                    <span className="text-[10px] font-black uppercase text-slate-400 block mb-2">منسلک دستاویز / تصویر</span>
                    {isImg ? (
                      <div className="space-y-2">
                        <div 
                          className="w-full h-48 rounded-xl overflow-hidden border border-slate-200 relative cursor-pointer group bg-slate-100"
                          onClick={() => setPreviewDoc(doc)}
                        >
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={doc.url} alt={doc.name} className="w-full h-full object-contain" />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity font-bold text-xs gap-1">
                            <Eye size={16} /> بڑی تصویر دیکھیں
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between bg-white p-3 rounded-xl border border-slate-200">
                        <div className="flex items-center gap-2">
                          <FileText className="text-indigo-600" size={20} />
                          <span className="font-bold text-slate-800 text-xs">{doc.name}</span>
                        </div>
                        <button
                          onClick={() => setPreviewDoc(doc)}
                          className="px-3 py-1 bg-indigo-50 text-indigo-700 hover:bg-indigo-100 rounded-lg text-xs font-bold cursor-pointer"
                        >
                          اوپن کریں
                        </button>
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => window.print()}
                className="flex-1 py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <Printer size={15} /> پرنٹ کارڈ
              </button>
              <button
                onClick={() => setShowDetailModal(null)}
                className="px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs cursor-pointer"
              >
                بند کریں
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* DOCUMENT PREVIEW LIGHTBOX / MODAL */}
      {/* ---------------------------------------------------- */}
      {previewDoc && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full p-6 animate-in fade-in zoom-in-95 max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Paperclip className="text-emerald-600" size={18} />
                <span className="font-black text-slate-900 text-sm truncate max-w-xs">{previewDoc.name}</span>
              </div>
              <button 
                onClick={() => setPreviewDoc(null)} 
                className="text-slate-400 hover:text-slate-600 p-1 rounded-lg cursor-pointer"
              >
                <X size={20} />
              </button>
            </div>

            <div className="my-4 flex-1 flex items-center justify-center overflow-auto bg-slate-50 rounded-2xl p-2 min-h-[300px]">
              {previewDoc.url.startsWith('data:image') || previewDoc.url.match(/\.(jpg|jpeg|png|webp)/i) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img 
                  src={previewDoc.url} 
                  alt={previewDoc.name} 
                  className="max-h-[65vh] w-auto object-contain rounded-xl shadow"
                />
              ) : (
                <div className="text-center p-8">
                  <FileText size={48} className="text-indigo-600 mx-auto mb-3" />
                  <p className="font-bold text-slate-700 text-sm mb-4">{previewDoc.name}</p>
                  <a
                    href={previewDoc.url}
                    download={previewDoc.name}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-black shadow"
                  >
                    <Download size={14} /> فائل ڈاؤن لوڈ کریں
                  </a>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
              <a
                href={previewDoc.url}
                download={previewDoc.name}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold inline-flex items-center gap-1.5 cursor-pointer"
              >
                <Download size={14} /> ڈاؤن لوڈ
              </a>
              <button
                onClick={() => setPreviewDoc(null)}
                className="px-6 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold cursor-pointer"
              >
                بند کریں
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- */}
      {/* CHANGE PIN MODAL */}
      {/* ---------------------------------------------------- */}
      {showPinModal && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl shadow-2xl max-w-sm w-full p-6 animate-in fade-in zoom-in-95 text-center">
            <div className="w-12 h-12 bg-indigo-50 text-indigo-700 rounded-2xl flex items-center justify-center mx-auto mb-3">
              <KeyRound size={24} />
            </div>
            <h3 className="text-lg font-black text-slate-900">اسٹاف PIN تبدیل کریں</h3>
            <p className="text-xs text-slate-500 mt-0.5 mb-4">Change 4-Digit Security PIN</p>

            <form onSubmit={handleChangePin} className="space-y-3 text-right">
              <div>
                <label className="block text-[11px] font-black uppercase text-slate-600 mb-1">پرانا PIN درج کریں</label>
                <input
                  type="password"
                  required
                  maxLength={8}
                  placeholder="••••"
                  value={pinForm.currentPin}
                  onChange={e => setPinForm({ ...pinForm, currentPin: e.target.value })}
                  className="w-full text-center py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-lg font-mono font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-slate-600 mb-1">نیا 4-Digit PIN درج کریں</label>
                <input
                  type="password"
                  required
                  maxLength={8}
                  placeholder="••••"
                  value={pinForm.newPin}
                  onChange={e => setPinForm({ ...pinForm, newPin: e.target.value })}
                  className="w-full text-center py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-lg font-mono font-bold focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              {pinChangeMsg.text && (
                <div className={`p-2.5 rounded-xl text-xs font-bold text-center ${
                  pinChangeMsg.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'
                }`}>
                  {pinChangeMsg.text}
                </div>
              )}

              <div className="pt-2 flex gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold text-xs cursor-pointer shadow-md shadow-indigo-600/20"
                >
                  PIN تبدیل کریں
                </button>
                <button
                  type="button"
                  onClick={() => setShowPinModal(false)}
                  className="px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl font-bold text-xs cursor-pointer"
                >
                  منسوخ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
