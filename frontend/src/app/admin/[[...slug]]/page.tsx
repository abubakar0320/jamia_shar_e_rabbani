'use client';

import React, { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, BookOpen, Users, LogOut, FileText, Award, Heart, 
  Menu, X, RefreshCcw, Bell, ArrowUpRight, DollarSign, Wallet, Landmark,
  BarChart2, GraduationCap, FileCheck, Download, Settings, Lock, Megaphone,
  Library, Globe, Image as ImageIcon, Folder, Shield, Languages, Database
} from 'lucide-react';

import AdminGuard from '@/components/admin/AdminGuard';
import AdmissionFormBuilderModule from '@/components/admin/AdmissionFormBuilderModule';
import ExpenseManagementModule from '@/components/admin/ExpenseManagementModule';
import FeeManagementModule from '@/components/admin/FeeManagementModule';
import DataBackupModal from '@/components/admin/DataBackupModal';

import {
  Admission,
  Student,
  Faculty,
  Course,
  FeeStructure,
  FeeCategory,
  Challan,
  InternshipApplication,
  CertProfile,
  OverviewModule,
  AdmissionsModule,
  StudentsModule,
  FacultyModule,
  CoursesModule,
  FeesChallansModule,
  InternshipsModule,
  CertProfilesModule,
  ReportsModule,
  ExamMessModule
} from '@/components/admin/modules';

const SIDEBAR_ITEMS = [
  { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard size={20} /> },
  { id: 'admissions', label: 'Admissions', icon: <FileText size={20} /> },
  { id: 'internships', label: 'Internships', icon: <Award size={20} /> },
  { id: 'cert-profiles', label: 'Cert Profiles', icon: <FileCheck size={20} /> },
  { id: 'form-builder', label: 'Form Customization', icon: <FileText size={20} /> },
  { id: 'students', label: 'Students', icon: <GraduationCap size={20} /> },
  { id: 'faculty', label: 'Faculty', icon: <Users size={20} /> },
  { id: 'courses', label: 'Courses', icon: <BookOpen size={20} /> },
  { id: 'fees', label: 'Fees & Challans', icon: <DollarSign size={20} /> },
  { id: 'expenses', label: 'Accounts & Expenses', icon: <Wallet size={20} /> },
  { id: 'fee-management', label: 'Manage Fee Structures', icon: <Landmark size={20} /> },
  { id: 'exam-mess', label: 'Exam Mess / Food', icon: <Landmark size={20} /> },
  { id: 'donations', label: 'Donations', icon: <Heart size={20} /> },
  { id: 'reports', label: 'Reports & Analytics', icon: <BarChart2 size={20} /> },
  { id: 'news', label: 'News & Events', icon: <Megaphone size={20} /> },
  { id: 'research', label: 'Research', icon: <Library size={20} /> },
  { id: 'content', label: 'Website Content', icon: <Globe size={20} /> },
  { id: 'gallery', label: 'Gallery', icon: <ImageIcon size={20} /> },
  { id: 'media', label: 'Media Library', icon: <Folder size={20} /> },
  { id: 'roles', label: 'Roles & Permissions', icon: <Shield size={20} /> },
  { id: 'language', label: 'Languages', icon: <Languages size={20} /> },
  { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
  { id: 'settings', label: 'Website Settings', icon: <Settings size={20} /> },
  { id: 'security', label: 'Security', icon: <Lock size={20} /> },
];

export default function AdminDashboard() {
  const pathname = usePathname();
  const router = useRouter();
  const activeTab = pathname.split('/')[2] || 'overview';

  const [subView, setSubView] = useState<string | null>(null);
  const [isSidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(true);

  // Core Data States
  const [stats, setStats] = useState({
    courses: 18,
    faculty: 45,
    news: 112,
    contacts: 8,
    admissions: 450,
    students: 1240,
    tulba: 820,
    talibat: 420,
    donations: 1200000,
    visitorsToday: 0
  });
  const [analyticsData, setAnalyticsData] = useState<Record<string, number>>({});
  const [showBackupModal, setShowBackupModal] = useState(false);
  const [messApps, setMessApps] = useState<any[]>([]);
  const [admissions, setAdmissions] = useState<Admission[]>([]);
  const [internships, setInternships] = useState<InternshipApplication[]>([]);
  const [certProfiles, setCertProfiles] = useState<CertProfile[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [faculty, setFaculty] = useState<Faculty[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>([]);
  const [feeCategories, setFeeCategories] = useState<FeeCategory[]>([]);
  const [challans, setChallans] = useState<Challan[]>([]);
  const [admissionSchedule, setAdmissionSchedule] = useState<any>(null);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      const [
        resAdm,
        resStu,
        resFac,
        resCrs,
        resFs,
        resCh,
        resCat,
        resSched,
        resInt,
        resCerts
      ] = await Promise.all([
        fetch('/api/admin/admissions').catch(() => null),
        fetch('/api/admin/students').catch(() => null),
        fetch('/api/admin/faculty').catch(() => null),
        fetch('/api/admin/courses').catch(() => null),
        fetch('/api/admin/fee-structures').catch(() => null),
        fetch('/api/admin/challans').catch(() => null),
        fetch('/api/admin/fee-categories').catch(() => null),
        fetch('/api/admission-schedule').catch(() => null),
        fetch('/api/admin/internships').catch(() => null),
        fetch('/api/admin/internship-certificates').catch(() => null)
      ]);

      if (resCerts && resCerts.ok) {
        const data = await resCerts.json().catch(() => null);
        setCertProfiles(data ? (data.reverse ? data.reverse() : data) : []);
      }
      if (resInt && resInt.ok) {
        const data = await resInt.json().catch(() => null);
        setInternships(data ? (data.reverse ? data.reverse() : data) : []);
      }
      if (resAdm && resAdm.ok) {
        const data = await resAdm.json().catch(() => null);
        setAdmissions(data ? (data.reverse ? data.reverse() : data) : []);
      }
      if (resStu && resStu.ok) {
        const data = await resStu.json().catch(() => null);
        setStudents(data ? (data.reverse ? data.reverse() : data) : []);
      }
      if (resFac && resFac.ok) {
        const data = await resFac.json().catch(() => null);
        setFaculty(data ? (data.reverse ? data.reverse() : data) : []);
      }
      if (resCrs && resCrs.ok) {
        const data = await resCrs.json().catch(() => null);
        setCourses(data ? (data.reverse ? data.reverse() : data) : []);
      }
      if (resFs && resFs.ok) {
        const data = await resFs.json().catch(() => null);
        setFeeStructures(data ? (data.reverse ? data.reverse() : data) : []);
      }
      if (resCh && resCh.ok) {
        const data = await resCh.json().catch(() => null);
        setChallans(data ? (data.reverse ? data.reverse() : data) : []);
      }
      if (resCat && resCat.ok) {
        const data = await resCat.json().catch(() => null);
        setFeeCategories(data ? (data.reverse ? data.reverse() : data) : []);
      }
      if (resSched && resSched.ok) {
        const data = await resSched.json().catch(() => null);
        setAdmissionSchedule(data);
      }

      const resMess = await fetch('/api/admin/mess-applications').catch(() => null);
      if (resMess && resMess.ok) {
        const data = await resMess.json().catch(() => null);
        setMessApps(data || []);
      }

      const resAnalytics = await fetch('/api/admin/analytics').catch(() => null);
      if (resAnalytics && resAnalytics.ok) {
        const data = await resAnalytics.json().catch(() => null);
        if (data && data.visits) {
          setAnalyticsData(data.visits);
          const today = new Date().toLocaleDateString('en-CA');
          setStats(prev => ({ ...prev, visitorsToday: data.visits[today] || 0 }));
        }
      }
    } catch (err) {
      console.error('Error fetching admin data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllData();
  }, []);

  useEffect(() => {
    let tulba = 0;
    let talibat = 0;
    students.forEach(s => {
      if (s.sectionType?.toLowerCase().includes('talibat')) talibat++;
      else if (s.sectionType?.toLowerCase().includes('tulba')) tulba++;
    });

    let totalDonations = 0;
    challans.forEach(c => {
      if (c.status === 'Paid') {
        totalDonations += (c.totalAmount || 0);
      }
    });

    setStats(prev => ({
      ...prev,
      admissions: admissions.length,
      students: students.length,
      tulba,
      talibat,
      courses: courses.length,
      faculty: faculty.length,
      donations: totalDonations
    }));
  }, [admissions, students, courses, faculty, challans]);

  const handleNavigate = (tab: string, sub?: string) => {
    if (tab === 'donations') {
      window.location.href = '/admin/donations';
      return;
    }
    router.push('/admin/' + tab);
    setSubView(sub || null);
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      setSidebarOpen(false);
    }
  };

  const handlePrint = () => window.print();
  const handleDownloadPDF = (title: string) => alert(`Downloading ${title} as PDF...`);
  const notifyAction = (msg: string) => alert(`Notification Sent: ${msg}`);

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <OverviewModule
            stats={stats}
            admissions={admissions}
            challans={challans}
            handleNavigate={handleNavigate}
          />
        );
      case 'admissions':
        return (
          <AdmissionsModule
            admissions={admissions}
            fetchAllData={fetchAllData}
            handlePrint={handlePrint}
            handleDownloadPDF={handleDownloadPDF}
            notifyAction={notifyAction}
          />
        );
      case 'students':
        return (
          <StudentsModule
            students={students}
            fetchAllData={fetchAllData}
            handlePrint={handlePrint}
            handleDownloadPDF={handleDownloadPDF}
          />
        );
      case 'faculty':
        return (
          <FacultyModule
            faculty={faculty}
            fetchAllData={fetchAllData}
            handlePrint={handlePrint}
            handleDownloadPDF={handleDownloadPDF}
          />
        );
      case 'courses':
        return (
          <CoursesModule
            courses={courses}
            fetchAllData={fetchAllData}
            handlePrint={handlePrint}
            handleDownloadPDF={handleDownloadPDF}
          />
        );
      case 'fees':
        return (
          <FeesChallansModule
            challans={challans}
            students={students}
            feeCategories={feeCategories}
            feeStructures={feeStructures}
            admissionSchedule={admissionSchedule}
            fetchAllData={fetchAllData}
            handlePrint={handlePrint}
            handleDownloadPDF={handleDownloadPDF}
          />
        );
      case 'internships':
        return <InternshipsModule internships={internships} />;
      case 'cert-profiles':
        return <CertProfilesModule certProfiles={certProfiles} setCertProfiles={setCertProfiles} />;
      case 'form-builder':
        return <AdmissionFormBuilderModule />;
      case 'expenses':
        return <ExpenseManagementModule />;
      case 'fee-management':
        return <FeeManagementModule />;
      case 'reports':
        return <ReportsModule analyticsData={analyticsData} />;
      case 'exam-mess':
        return <ExamMessModule messApps={messApps} />;
      default: {
        const moduleDetails = SIDEBAR_ITEMS.find(i => i.id === activeTab);
        return (
          <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center animate-in fade-in zoom-in-95 duration-500">
            <div className="w-32 h-32 bg-slate-100 rounded-sm flex items-center justify-center text-slate-300 mb-8 shadow-inner border-4 border-white rotate-3">
              {moduleDetails?.icon && <div className="scale-[2.5]">{moduleDetails.icon}</div>}
            </div>
            <h2 className="text-4xl font-black text-slate-800 tracking-tighter mb-4">{moduleDetails?.label || activeTab} Module</h2>
            <p className="text-slate-500 max-w-lg mb-8 leading-relaxed font-medium">This module is currently under development.</p>
            <button onClick={() => handleNavigate('overview')} className="px-8 py-3 bg-slate-900 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-sm shadow-slate-900/20">Return to Dashboard Overview</button>
          </div>
        );
      }
    }
  };

  return (
    <AdminGuard>
      <div className="flex h-screen bg-slate-50 overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-900">
        
        {/* Sidebar Overlay */}
        <AnimatePresence>
          {isSidebarOpen && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/20 z-40 lg:hidden print:hidden"
              onClick={() => setSidebarOpen(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <motion.aside 
          initial={false}
          animate={{ width: isSidebarOpen ? 280 : 0, x: isSidebarOpen ? 0 : -280 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="fixed lg:static inset-y-0 left-0 z-50 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col shrink-0 overflow-hidden shadow-sm border border-gray-200 lg:shadow-none print:hidden"
        >
          <div className="p-6 flex items-center gap-4 shrink-0 border-b border-slate-800/50 bg-slate-900/50 ">
            <div className="relative w-10 h-10 rounded-sm overflow-hidden border-2 border-blue-500/50 shrink-0">
              <Image src="/logo.jpeg" alt="Logo" fill className="object-cover" />
            </div>
            <div className="flex-1 whitespace-nowrap overflow-hidden">
              <h1 className="font-black text-white text-sm tracking-tight truncate">Jamia Sher-e-Rabbani</h1>
              <p className="text-[9px] font-bold text-blue-400 uppercase tracking-widest truncate">Admin Portal</p>
            </div>
            <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-slate-400 hover:text-white shrink-0"><X size={20} /></button>
          </div>

          <div className="flex-1 overflow-y-auto py-6 px-4 custom-scrollbar">
            <div className="space-y-1 mb-8">
              <p className="px-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 mb-4">Dashboard & Core</p>
              {SIDEBAR_ITEMS.slice(0, 14).map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`w-full flex items-center gap-4 px-4 py-3 rounded-sm transition-all text-sm font-bold whitespace-nowrap ${activeTab === item.id ? 'bg-blue-600 text-white shadow-sm shadow-blue-900/50' : 'hover:bg-slate-800 hover:text-white'}`}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
            <div className="p-6 border-t border-slate-800 mt-auto shrink-0">
              <button 
                onClick={(e) => {
                  e.preventDefault();
                  localStorage.clear();
                  sessionStorage.clear();
                  window.location.replace('/');
                }}
                className="w-full flex items-center justify-center gap-3 px-4 py-3 text-rose-400 border border-rose-900 hover:text-white hover:bg-rose-600 font-bold text-xs rounded-sm transition-colors uppercase tracking-widest"
              >
                <LogOut size={16} /> Sign Out
              </button>
            </div>
          </div>
        </motion.aside>

        {/* Main Content Area */}
        <main className="flex-1 flex flex-col min-w-0 bg-slate-50">

          {/* Top Action Bar */}
          <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm print:hidden">
            <div className="flex items-center gap-4">
              <button onClick={() => router.push('/admin/overview')} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-700 transition-colors">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                Back to Dashboard
              </button>
            </div>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setShowBackupModal(true)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 text-xs font-bold transition-all shadow-sm"
              >
                <Database size={15} />
                <span>Backup & Recovery</span>
              </button>
              <a href="/api/admin/backup" download className="flex items-center gap-2 text-sm font-semibold text-emerald-600 hover:text-emerald-700 transition-colors">
                <Download size={16} />
                JSON
              </a>
              <a href="/api/admin/backup/excel" download className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                <FileText size={16} />
                Excel
              </a>
              <div className="h-4 w-px bg-slate-300"></div>
              <button onClick={() => window.location.reload()} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-700 transition-colors">
                <RefreshCcw size={16} />
                Refresh Data
              </button>
            </div>
          </div>

          {/* Topbar */}
          <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 shrink-0 z-10 shadow-sm print:hidden">
            <div className="flex items-center gap-4">
              <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-sm transition-colors">
                <Menu size={24} />
              </button>
              <h1 className="text-xl font-black text-slate-800 capitalize tracking-tight hidden sm:block">
                {SIDEBAR_ITEMS.find(i => i.id === activeTab)?.label || activeTab} {subView && <span className="text-blue-600 ml-2">/ {subView}</span>}
              </h1>
            </div>
            
            <div className="flex items-center gap-4">
              <button onClick={fetchAllData} className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-sm transition-all" title="Refresh data">
                <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
              </button>
              <button className="p-2.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-sm transition-all relative" title="Notifications">
                <Bell size={20} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
              </button>
              <div className="h-8 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>
              <a href="/" target="_blank" className="hidden sm:flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-blue-100 transition-colors">
                View Website <ArrowUpRight size={14} />
              </a>
            </div>
          </header>

          {/* Dynamic Content */}
          <div className="flex-1 overflow-auto p-6 lg:p-10 custom-scrollbar print:p-0">
            <div className="max-w-[1600px] mx-auto h-full">
              {renderContent()}
            </div>
          </div>
          
        </main>

        <style jsx global>{`
          .custom-scrollbar::-webkit-scrollbar { width: 6px; height: 6px; }
          .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
          .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #cbd5e1; border-radius: 20px; }
          .custom-scrollbar:hover::-webkit-scrollbar-thumb { background-color: #94a3b8; }
          @media print {
            body { background: white !important; }
            .custom-scrollbar { overflow: visible !important; }
          }
        `}</style>
        <DataBackupModal
          isOpen={showBackupModal}
          onClose={() => setShowBackupModal(false)}
        />
      </div>
    </AdminGuard>
  );
}
