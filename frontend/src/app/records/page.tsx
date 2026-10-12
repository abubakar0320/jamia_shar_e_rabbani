'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Users, Search, Plus, Lock, Unlock, KeyRound, CheckCircle2, 
  Clock, Phone, MessageSquare, Printer, Download, Eye, Edit3, 
  Trash2, ShieldCheck, RefreshCw, X, ArrowUpDown, ChevronRight,
  GraduationCap, Sparkles, AlertCircle
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
  classProgram: string;
  sectionType: string;
  studentStatus?: string;
  status?: string;
  challanNo?: string;
  fees?: {
    totalFee: number;
    status: string;
    session?: string;
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
  const [feeFilter, setFeeFilter] = useState<'All' | 'Paid' | 'Unpaid'>('All');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Approved' | 'Pending'>('All');

  // Modals
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState<StudentRecord | null>(null);
  const [showPinModal, setShowPinModal] = useState(false);

  // Form states
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    classProgram: 'Mutawassitah',
    sectionType: 'Tulba Section',
    mobile: '',
    cnic: '',
    feeAmount: '3000',
    feeStatus: 'Unpaid',
    studentStatus: 'Active',
    status: 'Approved'
  });
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
        (s.studentId && s.studentId.toLowerCase().includes(q));

      const matchesClass = selectedClass === 'All' || s.classProgram === selectedClass;
      
      const matchesSection = selectedSection === 'All' || 
        (selectedSection === 'Tulba' && s.sectionType?.toLowerCase().includes('tulba')) ||
        (selectedSection === 'Talibat' && s.sectionType?.toLowerCase().includes('talibat'));

      const currentFeeStatus = s.fees?.status || 'Unpaid';
      const matchesFee = feeFilter === 'All' || currentFeeStatus === feeFilter;

      const currentApproval = s.status || 'Approved';
      const matchesStatus = statusFilter === 'All' || currentApproval === statusFilter;

      return matchesSearch && matchesClass && matchesSection && matchesFee && matchesStatus;
    });
  }, [students, searchTerm, selectedClass, selectedSection, feeFilter, statusFilter]);

  // Stats
  const stats = useMemo(() => {
    const total = students.length;
    const tulba = students.filter(s => s.sectionType?.toLowerCase().includes('tulba')).length;
    const talibat = students.filter(s => s.sectionType?.toLowerCase().includes('talibat')).length;
    const paid = students.filter(s => s.fees?.status === 'Paid').length;
    const verified = students.filter(s => s.status === 'Approved').length;
    return { total, tulba, talibat, paid, verified };
  }, [students]);

  // Quick Add Student
  const handleAddStudent = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.studentName || !formData.fatherName) {
      alert('Student Name aur Father Name lazmi hain.');
      return;
    }

    setSubmitting(true);
    const activePin = pin || sessionStorage.getItem('jamia_staff_pin') || '';
    try {
      const res = await fetch('/api/records/students', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-staff-pin': activePin
        },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setStudents(prev => [data.student, ...prev]);
        setShowAddModal(false);
        // Reset form
        setFormData({
          studentName: '',
          fatherName: '',
          classProgram: formData.classProgram,
          sectionType: formData.sectionType,
          mobile: '',
          cnic: '',
          feeAmount: '3000',
          feeStatus: 'Unpaid',
          studentStatus: 'Active',
          status: 'Approved'
        });
        alert(`Mubarak! ${data.student.studentName} ka dakhla kamyabi se save ho gaya. Roll No: ${data.student.rollNo}`);
      } else {
        alert(data.error || 'Failed to add student');
      }
    } catch (err: any) {
      alert('Network error: ' + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  // Toggle Fee Status (Paid / Unpaid)
  const toggleFeeStatus = async (student: StudentRecord) => {
    const newStatus = student.fees?.status === 'Paid' ? 'Unpaid' : 'Paid';
    const activePin = pin || sessionStorage.getItem('jamia_staff_pin') || '';
    try {
      const res = await fetch(`/api/records/students/${student.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-staff-pin': activePin
        },
        body: JSON.stringify({
          fees: {
            ...(student.fees || {}),
            status: newStatus
          }
        })
      });
      if (res.ok) {
        setStudents(prev => prev.map(s => s.id === student.id ? { ...s, fees: { ...(s.fees || { totalFee: 3000 }), status: newStatus } } : s));
      }
    } catch (err) {
      alert('Status update failed');
    }
  };

  // Toggle Approval / Verification Status
  const toggleVerification = async (student: StudentRecord) => {
    const newStatus = student.status === 'Approved' ? 'Pending' : 'Approved';
    const activePin = pin || sessionStorage.getItem('jamia_staff_pin') || '';
    try {
      const res = await fetch(`/api/records/students/${student.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'x-staff-pin': activePin
        },
        body: JSON.stringify({ status: newStatus })
      });
      if (res.ok) {
        setStudents(prev => prev.map(s => s.id === student.id ? { ...s, status: newStatus } : s));
      }
    } catch (err) {
      alert('Verification update failed');
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
    const headers = ['Sr', 'Roll No', 'Student ID', 'Student Name', 'Father Name', 'Class', 'Section', 'Mobile', 'CNIC', 'Fee Status', 'Verification'];
    const rows = filteredStudents.map((s, idx) => [
      idx + 1,
      s.rollNo,
      s.studentId,
      s.studentName,
      s.fatherName,
      s.classProgram,
      s.sectionType,
      s.mobile || 'N/A',
      s.cnic || 'N/A',
      s.fees?.status || 'Unpaid',
      s.status || 'Approved'
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
      setPinChangeMsg({ type: 'error', text: 'Server error: ' + err.message });
    }
  };

  // ----------------------------------------------------
  // LOCK SCREEN VIEW (If PIN not entered)
  // ----------------------------------------------------
  if (!isUnlocked) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 flex items-center justify-center p-4">
        <div className="w-full max-w-md bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl p-8 border border-white/20 text-center animate-in fade-in zoom-in-95 duration-300">
          <div className="w-20 h-20 relative mx-auto mb-4 bg-emerald-50 rounded-2xl p-3 border border-emerald-100 shadow-inner flex items-center justify-center">
            <Lock size={36} className="text-emerald-700 animate-pulse" />
          </div>

          <span className="text-[11px] font-black tracking-widest text-emerald-800 uppercase bg-emerald-100 px-3 py-1 rounded-full">
            محفوظ اسٹاف پورٹل • Staff Access Only
          </span>

          <h1 className="text-2xl font-black text-slate-900 mt-4 tracking-tight">
            مرکزِ ریکارڈز طلباء
          </h1>
          <p className="text-xs font-semibold text-slate-500 mt-1 mb-6">
            Jamia Sher-e-Rabbani • Live Class Records Portal
          </p>

          <form onSubmit={handlePinSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-black uppercase tracking-widest text-slate-600 mb-2 text-right">
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
              💡 <span className="font-bold">Default Staff PIN:</span> <code className="bg-slate-100 px-2 py-0.5 rounded font-mono font-bold text-slate-800">7860</code>
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
              <p className="text-[11px] font-medium text-emerald-300">All Classes Live Student Records & Direct Management</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowAddModal(true)}
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
        
        {/* Live Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 print:hidden">
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
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-700 block mb-1">تصدیق شدہ (Approved)</span>
            <div className="text-2xl md:text-3xl font-black text-emerald-900">{stats.verified}</div>
          </div>
          <div className="bg-amber-50/70 p-4 rounded-2xl border border-amber-100">
            <span className="text-[10px] font-black uppercase tracking-widest text-amber-700 block mb-1">فیس ادا شدہ (Fees Paid)</span>
            <div className="text-2xl md:text-3xl font-black text-amber-900">{stats.paid}</div>
          </div>
        </div>

        {/* Filter and Search Bar */}
        <div className="bg-white p-4 md:p-5 rounded-2xl shadow-sm border border-slate-200 space-y-4 print:hidden">
          <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
            {/* Search Input */}
            <div className="relative flex-1">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="text"
                placeholder="طالب علم کا نام، والد کا نام، رول نمبر، یا موبائل نمبر تلاش کریں..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all"
              />
              {searchTerm && (
                <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  <X size={16} />
                </button>
              )}
            </div>

            {/* Section Pills */}
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

          {/* Quick Filters: Fee & Approval Status */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-bold pt-2 text-slate-600">
            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">فیس اسٹیٹس:</span>
              <select
                value={feeFilter}
                onChange={e => setFeeFilter(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none"
              >
                <option value="All">سب (All)</option>
                <option value="Paid">ادا شدہ (Paid)</option>
                <option value="Unpaid">غیر ادا شدہ (Unpaid)</option>
              </select>
            </div>

            <div className="flex items-center gap-1.5">
              <span className="text-slate-400">تصدیق (Approval):</span>
              <select
                value={statusFilter}
                onChange={e => setStatusFilter(e.target.value as any)}
                className="bg-slate-50 border border-slate-200 rounded-lg px-2 py-1 text-xs font-semibold focus:outline-none"
              >
                <option value="All">سب (All)</option>
                <option value="Approved">تصدیق شدہ (Approved)</option>
                <option value="Pending">زیرِ جائزہ (Pending)</option>
              </select>
            </div>

            <span className="ml-auto text-[11px] font-black text-slate-400">
              نمایاں ریکارڈز: <span className="text-slate-800">{filteredStudents.length}</span> / {students.length}
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
                  <th className="py-3 px-4 text-center">فیس اسٹیٹس</th>
                  <th className="py-3 px-4 text-center">تصدیق</th>
                  <th className="py-3 px-4 text-center print:hidden">ایکشن</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {loading ? (
                  <tr>
                    <td colSpan={9} className="py-16 text-center text-slate-400 font-bold">
                      <RefreshCw className="animate-spin inline-block mr-2" size={20} />
                      ریکارڈز لوڈ ہو رہے ہیں...
                    </td>
                  </tr>
                ) : filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="py-16 text-center text-slate-400 font-bold">
                      کوئی ریکارڈ نہیں ملا۔ نیا داخلہ کرنے کے لیے اوپر &quot;+ نیا طالب علم داخل کریں&quot; بٹن دبائیں۔
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((std, idx) => {
                    const isPaid = std.fees?.status === 'Paid';
                    const isApproved = std.status === 'Approved';

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
                          <span className="font-black text-slate-900 text-sm block cursor-pointer hover:text-emerald-700" onClick={() => setShowDetailModal(std)}>
                            {std.studentName}
                          </span>
                          {std.cnic && <span className="text-[10px] text-slate-400 font-mono">{std.cnic}</span>}
                        </td>

                        <td className="py-3 px-4 font-semibold text-slate-700">
                          {std.fatherName}
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

                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => toggleFeeStatus(std)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wide inline-flex items-center gap-1 cursor-pointer transition-all ${
                              isPaid
                                ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                                : 'bg-rose-100 text-rose-800 hover:bg-rose-200'
                            }`}
                            title="Click to toggle Paid/Unpaid"
                          >
                            {isPaid ? '✓ ادا شدہ (Paid)' : '✕ غیر ادا شدہ'}
                          </button>
                        </td>

                        <td className="py-3 px-4 text-center">
                          <button
                            onClick={() => toggleVerification(std)}
                            className={`px-2.5 py-1 rounded-full text-[10px] font-black tracking-wide inline-flex items-center gap-1 cursor-pointer transition-all ${
                              isApproved
                                ? 'bg-blue-100 text-blue-800 hover:bg-blue-200'
                                : 'bg-amber-100 text-amber-800 hover:bg-amber-200'
                            }`}
                            title="Click to toggle Verified/Pending"
                          >
                            {isApproved ? '★ تصدیق شدہ' : '⏳ زیرِ جائزہ'}
                          </button>
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
      {/* QUICK ADD STUDENT MODAL */}
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
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleAddStudent} className="space-y-4 mt-5 text-right">
              <div>
                <label className="block text-xs font-black uppercase text-slate-600 mb-1">
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

              <div>
                <label className="block text-xs font-black uppercase text-slate-600 mb-1">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-600 mb-1">
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
                  <label className="block text-xs font-black uppercase text-slate-600 mb-1">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-600 mb-1">
                    رابطہ نمبر (Phone Number)
                  </label>
                  <input
                    type="tel"
                    placeholder="03001234567"
                    value={formData.mobile}
                    onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 text-left font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-slate-600 mb-1">
                    شناختی کارڈ / ب فارم (CNIC/B-Form)
                  </label>
                  <input
                    type="text"
                    placeholder="35404-XXXXXXX-X"
                    value={formData.cnic}
                    onChange={e => setFormData({ ...formData, cnic: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 text-left font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div>
                  <label className="block text-xs font-black uppercase text-slate-600 mb-1">
                    داخلہ فیس (Admission Fee)
                  </label>
                  <input
                    type="number"
                    value={formData.feeAmount}
                    onChange={e => setFormData({ ...formData, feeAmount: e.target.value })}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500 text-left font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-black uppercase text-slate-600 mb-1">
                    فیس ادائیگی کی حالت (Fee Status)
                  </label>
                  <select
                    value={formData.feeStatus}
                    onChange={e => setFormData({ ...formData, feeStatus: e.target.value })}
                    className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="Unpaid">غیر ادا شدہ (Unpaid)</option>
                    <option value="Paid">ادا شدہ (Paid)</option>
                  </select>
                </div>
              </div>

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
                  onClick={() => setShowAddModal(false)}
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
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full p-6 md:p-8 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center font-black text-lg">
                  {showDetailModal.studentName.charAt(0)}
                </div>
                <div>
                  <h3 className="text-xl font-black text-slate-900">{showDetailModal.studentName}</h3>
                  <p className="text-xs text-slate-500">ولد {showDetailModal.fatherName}</p>
                </div>
              </div>
              <button onClick={() => setShowDetailModal(null)} className="text-slate-400 hover:text-slate-600 p-1 rounded-lg">
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

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-black uppercase text-slate-400 block mb-0.5">موبائل نمبر</span>
                  <span className="font-mono font-bold text-slate-800">{showDetailModal.mobile || 'درج نہیں'}</span>
                </div>
                <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <span className="text-[10px] font-black uppercase text-slate-400 block mb-0.5">شناختی کارڈ / ب فارم</span>
                  <span className="font-mono font-bold text-slate-800">{showDetailModal.cnic || 'درج نہیں'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between p-3.5 bg-emerald-50 rounded-xl border border-emerald-100">
                <div>
                  <span className="text-[10px] font-black uppercase text-emerald-700 block mb-0.5">فیس تفصیلات</span>
                  <span className="text-sm font-black text-emerald-950 font-mono">
                    Rs. {showDetailModal.fees?.totalFee || 3000} ({showDetailModal.fees?.status === 'Paid' ? 'ادا شدہ' : 'غیر ادا شدہ'})
                  </span>
                </div>
                <button
                  onClick={() => toggleFeeStatus(showDetailModal)}
                  className="px-3 py-1.5 bg-white border border-emerald-300 text-emerald-800 rounded-lg text-xs font-black shadow-sm hover:bg-emerald-100"
                >
                  اسٹیٹس تبدیل کریں
                </button>
              </div>
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
