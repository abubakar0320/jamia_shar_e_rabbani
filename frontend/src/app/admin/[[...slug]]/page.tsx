'use client';
import { usePathname, useRouter } from 'next/navigation';

import React, { useState, useEffect } from 'react';
import { 
 LayoutDashboard, BookOpen, Users, MessageSquare, Plus, RefreshCcw, User, Phone, 
 GraduationCap, Calendar, ChevronRight, ChevronDown, Search, Filter, Eye, Settings, 
 DollarSign,
  Wallet,
  LogOut, Printer, ArrowLeft, FileText, Award, Heart, Megaphone, Library, 
 Globe, Image as ImageIcon, Folder, Shield, Languages, Bell, BarChart2, Lock, Menu, X,
 CheckCircle2, XCircle, Trash2, Edit, Download, ArrowUpRight, ArrowDownRight, Clock, Activity, FileCheck, CheckSquare, Upload, AlertCircle, TrendingUp, CheckSquare as CheckSquareIcon, Square, Copy, Archive, Star, PlaySquare, Play, Book, ArrowRightCircle, Landmark
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import AdmissionScheduleModal from '@/components/AdmissionScheduleModal';
import FeeManagementModule from '@/components/admin/FeeManagementModule';

import AdmissionFormBuilderModule from '@/components/admin/AdmissionFormBuilderModule';
import ExpenseManagementModule from '@/components/admin/ExpenseManagementModule';
import AdminGuard from '@/components/admin/AdminGuard';

// --- Interfaces ---
interface FeeConfig {
 admissionFee: number;
 registrationFee: number;
 session: string;
 totalFee?: number;
 totalLateFee?: number;
}

interface Admission {
 id: number;
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
 fees: FeeConfig;
 status?: string;
 rejectionReason?: string;
 documents?: Record<string, { name: string, size: string, type: string }>;
}

interface Student extends Admission {
 studentId: string;
 rollNo: string;
 studentStatus?: string; // Active, Inactive, Graduated, Suspended
}

interface Faculty {
 id: number;
 facultyId: string;
 name: string;
 designation: string;
 department: string;
 specialization?: string;
 qualification?: string;
 university?: string;
 researchAreas?: string;
 teachingExperience?: string;
 contactNumber: string;
 whatsapp?: string;
 email?: string;
 address?: string;
 joinDate?: string;
 employmentStatus?: string;
 subjectsTaught?: string[];
 responsibilities?: string;
 status: string; // Active, Inactive, Retired, Visiting
 photo?: string;
 documents?: Record<string, { name: string, size: string, type: string }>;
 attendance?: { present: number, absent: number };
 publications?: { title: string, type: string, year: string, file?: string }[];
 isLeadership?: boolean;
}

interface Course {
 id: number;
 courseId?: string;
 title: string;
 level?: string; // Mapped as Category
 duration: string;
 desc?: string; // Mapped as Short Description
 fullDescription?: string;
 eligibility?: string;
 learningOutcomes?: string[];
 status?: string; // Active, Draft, Archived
 featured?: boolean;
 image?: string;
 syllabus?: { title: string, file: string }[]; // Mapped as PDFs
 playlists?: { id: string, title: string, listId?: string, videoId?: string, url?: string, description?: string }[];
 curriculum?: { semester: string, subjects: string[] }[];
 seo?: { metaTitle: string, metaDesc: string, keywords: string, slug: string };
 enrollmentStats?: { total: number, tulba: number, talibat: number };
}

interface SubjectMark {
 subject: string;
 obtained: number;
 total: number;
}

interface Result {
 id: number;
 resultId: string;
 studentId: string;
 rollNo: string;
 studentName: string;
 fatherName: string;
 classProgram: string;
 session: string;
 sectionType: string;
 subjects: SubjectMark[];
 totalMarks: number;
 obtainedMarks: number;
 percentage: number;
 grade: string;
 position?: string;
 status: string; // Published, Draft
 outcome: string; // Pass, Fail
}

interface FeeStructure {
 id: number;
 sectionType: string;
 classProgram: string;
 admissionFee: number;
 registrationFee: number;
}

interface FeeCategory {
 id: number;
 name: string;
 amount: number;
 description: string;
 status: 'Active' | 'Inactive';
 dateCreated: string;
}

interface Challan {
 id: number;
 challanNo: string;
 studentId: string;
 rollNo: string;
 studentName: string;
 fatherName: string;
 classProgram: string;
 session: string;
 feeDetails: { type: string, amount: number }[];
 totalAmount: number;
 issueDate: string;
 dueDate: string;
 status: string; // Paid, Unpaid, Partially Paid
 paidAmount: number;
 paymentDate?: string;
 paymentMethod?: string;
}

const SIDEBAR_ITEMS = [
 { id: 'overview', label: 'Dashboard Overview', icon: <LayoutDashboard size={20} /> },
 { id: 'admissions', label: 'Admissions', icon: <FileText size={20} /> },

  { id: 'form-builder', label: 'Form Customization', icon: <FileText size={20} /> },
 { id: 'students', label: 'Students', icon: <GraduationCap size={20} /> },
 { id: 'faculty', label: 'Faculty', icon: <Users size={20} /> },
 { id: 'courses', label: 'Courses', icon: <BookOpen size={20} /> },

 { id: 'fees', label: 'Fees & Challans', icon: <DollarSign size={20} /> },
  { id: 'expenses', label: 'Accounts & Expenses', icon: <Wallet size={20} /> },
  { id: 'fee-management', label: 'Manage Fee Structures', icon: <Landmark size={20} /> },
 { id: 'donations', label: 'Donations', icon: <Heart size={20} /> },
 { id: 'news', label: 'News & Events', icon: <Megaphone size={20} /> },
 { id: 'research', label: 'Research', icon: <Library size={20} /> },
 { id: 'content', label: 'Website Content', icon: <Globe size={20} /> },
 { id: 'gallery', label: 'Gallery', icon: <ImageIcon size={20} /> },
 { id: 'media', label: 'Media Library', icon: <Folder size={20} /> },
 { id: 'roles', label: 'Roles & Permissions', icon: <Shield size={20} /> },
 { id: 'language', label: 'Languages', icon: <Languages size={20} /> },
 { id: 'notifications', label: 'Notifications', icon: <Bell size={20} /> },
 { id: 'reports', label: 'Reports & Analytics', icon: <BarChart2 size={20} /> },
 { id: 'settings', label: 'Website Settings', icon: <Settings size={20} /> },
 { id: 'security', label: 'Security', icon: <Lock size={20} /> },
];

const OFFICIAL_CLASSES = [
 "Amma Part One", "Amma Part Two", "Khasa Part One", "Khasa Part Two",
 "Aliya Part One", "Aliya Part Two", "Almiya Part One", "Almiya Part Two",
 "Amma Khasusi", "Khasa Khasusi", "Almiya Khasusi Part One", "Almiya Khasusi Part Two",
 "Hifz-ul-Quran", "Tajweed-o-Qira'at", "Takhassus"
];

export default function AdminDashboard() {
 const pathname = usePathname();
  const router = useRouter();
  const activeTab = pathname.split('/')[2] || 'overview';
 const [subView, setSubView] = useState<string | null>(null);
 const [isSidebarOpen, setSidebarOpen] = useState(true);
 const [currentTime, setCurrentTime] = useState<Date | null>(null);

 // Stats & Data State
 const [stats, setStats] = useState({ courses: 18, faculty: 45, news: 112, contacts: 8, admissions: 450, tulba: 820, talibat: 420, donations: 1200000 });
 const [admissions, setAdmissions] = useState<Admission[]>([]);
 const [students, setStudents] = useState<Student[]>([]);
 const [faculty, setFaculty] = useState<Faculty[]>([]);
 const [courses, setCourses] = useState<Course[]>([]);

 const [feeStructures, setFeeStructures] = useState<FeeStructure[]>([]);
 const [feeCategories, setFeeCategories] = useState<FeeCategory[]>([]);
 const [challans, setChallans] = useState<Challan[]>([]);
 const [admissionSchedule, setAdmissionSchedule] = useState<any>(null);
 const [loading, setLoading] = useState(true);
 
 // Modals & Viewers
 const [selectedApplication, setSelectedApplication] = useState<Admission | null>(null);
 const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
 const [selectedFaculty, setSelectedFaculty] = useState<Faculty | null>(null);
 const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
 const [selectedResult, setSelectedResult] = useState<Result | null>(null);
 const [selectedChallan, setSelectedChallan] = useState<Challan | null>(null);
 const [isEditingApp, setIsEditingApp] = useState(false);
 const [showFeeStructuresModal, setShowFeeStructuresModal] = useState(false);
 const [showBankModal, setShowBankModal] = useState(false);
 const [showRegistrationModal, setShowRegistrationModal] = useState(false);
 const [showCategoriesModal, setShowCategoriesModal] = useState(false);
 const [showChallanBuilderModal, setShowChallanBuilderModal] = useState(false);
 const [showScheduleModal, setShowScheduleModal] = useState(false);
 
 // Admission Filters & Bulk Actions
 const [searchTerm, setSearchTerm] = useState('');
 const [sectionFilter, setSectionTypeFilter] = useState<'All' | 'Tulba' | 'Talibat'>('All');
 const [statusFilter, setStatusFilter] = useState('All');
 const [classFilter, setClassFilter] = useState('All');
 const [sessionFilter, setSessionFilter] = useState('All');
 const [dateRange, setDateRange] = useState({ start: '', end: '' });
 
 const [selectedIds, setSelectedIds] = useState<number[]>([]);
 const [verifiedDocs, setVerifiedDocs] = useState<Record<string, boolean>>({});
 const [showRejectModal, setShowRejectModal] = useState(false);
 const [rejectionReason, setRejectionReason] = useState('');

 useEffect(() => {
 setCurrentTime(new Date());
 const timer = setInterval(() => setCurrentTime(new Date()), 60000);
 return () => clearInterval(timer);
 }, []);

 const fetchAllData = async () => {
 setLoading(true);
 try {
 const [resAdm, resStu, resFac, resCrs, resFs, resCh, resCat, resSched] = await Promise.all([
 fetch('/api/admin/admissions').catch(() => null),
 fetch('/api/admin/students').catch(() => null),
 fetch('/api/admin/faculty').catch(() => null),
 fetch('/api/admin/courses').catch(() => null),

 fetch('/api/admin/fee-structures').catch(() => null),
 fetch('/api/admin/challans').catch(() => null),
 fetch('/api/admin/fee-categories').catch(() => null),
 fetch('/api/admission-schedule').catch(() => null)
 ]);
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
 } catch (err) {
 console.error(err);
 } finally {
 setLoading(false);
 }
 };

 useEffect(() => {
 fetchAllData();
 }, []);

 const handleNavigate = (tab: string, sub?: string) => {
 if (tab === 'donations') {
 window.location.href = '/admin/donations';
 return;
 }
 router.push('/admin/' + tab);
 setSubView(sub || null);
 if (window.innerWidth < 1024) setSidebarOpen(false);
 setSelectedApplication(null); 
 setSelectedStudent(null);
 setSelectedFaculty(null);
 setSelectedCourse(null);
 setSelectedResult(null);
 setSelectedChallan(null);
 setIsEditingApp(false);
 setStatusFilter('All');
 setSectionTypeFilter('All');
 setSelectedIds([]);
 };

 const formatDate = (date: Date) => date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
 const formatTime = (date: Date) => date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

 // Simulate Print & Download functions
 const handlePrint = () => window.print();
 const handleDownloadPDF = (title: string) => alert(`Downloading ${title} as PDF...`);
 const notifyAction = (msg: string) => alert(`Notification Sent: ${msg}`);

 // --- Common Renderers --- //

 const renderModuleHeader = (title: string, desc: string, primaryAction?: { label: string, icon: any, onClick: () => void }) => (
 <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-200 mb-8 flex justify-between items-center">
 <div>
 <h2 className="text-3xl font-black text-slate-800 tracking-tighter">{title}</h2>
 <p className="text-slate-500 font-medium">{desc}</p>
 </div>
 {primaryAction && (
 <button onClick={primaryAction.onClick} className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-sm font-black uppercase tracking-widest text-xs shadow-sm shadow-blue-600/30 hover:bg-blue-700 transition-all">
 {primaryAction.icon} {primaryAction.label}
 </button>
 )}
 </div>
 );

 const renderGenericForm = (title: string, fields: string[]) => (
 <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-200 max-w-3xl">
 <h3 className="text-xl font-black text-slate-800 mb-6">{title}</h3>
 <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert('Saved successfully!'); handleNavigate(activeTab); }}>
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 {fields.map((f, i) => (
 <div key={i} className={f.includes('Description') || f.includes('Address') ? 'md:col-span-2' : ''}>
 <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">{f}</label>
 {f.includes('Description') || f.includes('Address') ? 
 <textarea className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:border-blue-500 font-bold" rows={4} /> : 
 <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:border-blue-500 font-bold" />
 }
 </div>
 ))}
 </div>
 <div className="flex gap-4 pt-6">
 <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-sm font-black uppercase tracking-widest text-xs shadow-sm hover:bg-blue-700">Save</button>
 <button type="button" onClick={() => { setSubView(null); setIsEditingApp(false); }} className="px-8 py-3 bg-slate-100 text-slate-600 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-slate-200">Cancel</button>
 </div>
 </form>
 </div>
 );

 // --- Admissions Module --- //
 const renderAdmissionsModule = () => {

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
 setSelectedApplication({...selectedApplication, status, rejectionReason: reason});
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
 if(!confirm('Are you sure you want to completely delete this application?')) return;
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
 if(!confirm(`Are you sure you want to delete ${selectedIds.length} applications?`)) return;
 try {
 await Promise.all(selectedIds.map(id => fetch(`/api/admin/admissions/${id}`, { method: 'DELETE' })));
 alert('Selected applications deleted.');
 setSelectedIds([]);
 fetchAllData();
 } catch(e) { alert('Error in bulk delete'); }
 } else if (action === 'export') {
 handleDownloadPDF(`Bulk Export (${selectedIds.length} records)`);
 } else {
 try {
 await Promise.all(selectedIds.map(id => fetch(`/api/admin/admissions/${id}/status`, {
 method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: action })
 })));
 alert(`Selected applications marked as ${action}.`);
 setSelectedIds([]);
 fetchAllData();
 } catch(e) { alert('Error in bulk status update'); }
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
 setVerifiedDocs(prev => ({...prev, [docId]: true}));
 };

 const filteredAdmissions = admissions.filter(adm => {
 const matchesSearch = adm.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) || adm.applicationNo?.includes(searchTerm) || adm.mobile?.includes(searchTerm) || adm.fatherName?.toLowerCase().includes(searchTerm.toLowerCase());
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
          setSelectedApplication({...selectedApplication, ...updatedData});
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

 <div className="grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 bg-slate-50 p-4 md:p-8 rounded-sm border border-slate-100 relative overflow-hidden print:bg-white print:border-black print:rounded-none">
 <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-bl-full opacity-50 blur-2xl pointer-events-none print:hidden"></div>
 <div>
 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Father's Name</p>
 <p className="text-sm font-bold text-slate-800">{selectedApplication.fatherName}</p>
 </div>
 <div>
 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Date of Birth</p>
 <p className="text-sm font-bold text-slate-800">{selectedApplication.dob || 'Not Provided'}</p>
 </div>
 <div>
 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">CNIC / B-Form Number</p>
 <p className="text-sm font-mono font-bold text-slate-800">{selectedApplication.cnic || 'Not Provided'}</p>
 </div>
 <div>
 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Mobile Number</p>
 <p className="text-sm font-mono font-bold text-slate-800">{selectedApplication.mobile}</p>
 </div>
 </div>
 </div>

 <div>
 <h4 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2"><GraduationCap className="text-blue-600 print:text-black"/> Academic Information</h4>
 <div className="bg-slate-50 p-4 md:p-8 rounded-sm border border-slate-100 grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 print:bg-white print:border-black print:rounded-none">
 <div>
 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Selected Class / Program</p>
 <p className="text-sm font-bold text-slate-800">{selectedApplication.classProgram}</p>
 </div>
 <div>
 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Section (Gender)</p>
 <p className="text-sm font-bold text-slate-800">{selectedApplication.sectionType}</p>
 </div>
 <div>
 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Academic Session</p>
 <p className="text-sm font-bold text-slate-800 font-mono">{selectedApplication.fees.session}</p>
 </div>
 </div>
 </div>

 {/* Admin Form Viewer Button */}
 <div className="bg-blue-50 border border-blue-200 p-6 rounded-sm flex justify-between items-center print:hidden">
 <div>
 <h4 className="font-black text-blue-800 text-sm">Official Admission Form</h4>
 <p className="text-xs text-blue-600/70 font-medium">Auto-generated printable form.</p>
 </div>
 <div className="flex gap-2">
 <button onClick={() => alert('Viewing Generated Admission Form')} className="px-4 py-2 bg-blue-600 text-white rounded-sm text-xs font-black uppercase hover:bg-blue-700">View</button>
 <button onClick={handlePrint} className="px-4 py-2 bg-white text-blue-700 border border-blue-200 rounded-sm text-xs font-black uppercase hover:bg-blue-100">Print</button>
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
 <div className="flex gap-2">
 <button onClick={() => window.open(doc.url || '#', '_blank')} className="flex-1 py-1.5 bg-white border border-slate-200 text-slate-600 rounded text-[9px] font-black uppercase hover:bg-blue-50 hover:text-blue-700">View</button>
 <a href={doc.url || '#'} download={doc.name} className="flex-1 py-1.5 bg-white border border-slate-200 text-slate-600 rounded text-[9px] font-black uppercase hover:bg-blue-50 hover:text-blue-700 text-center block leading-loose">Download</a>
 {!isVerified && <button onClick={() => handleVerifyDoc(key)} className="flex-1 py-1.5 bg-blue-50 border border-blue-200 text-blue-700 rounded text-[9px] font-black uppercase hover:bg-blue-600 hover:text-white transition-colors">Verify</button>}
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
 <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${statusFilter === 'All' ? 'text-slate-400' : 'text-slate-400'}`}>Total Apps</p>
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
 <div onClick={() => {setStatusFilter('All'); setSectionTypeFilter('Tulba')}} className={`p-4 rounded-sm border shadow-sm text-center cursor-pointer hover:shadow-md transition-all ${sectionFilter === 'Tulba' ? 'bg-blue-600 border-blue-700 text-white' : 'bg-blue-50 border-blue-100 text-blue-700'}`}>
 <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${sectionFilter === 'Tulba' ? 'text-blue-200' : 'text-blue-600/70'}`}>Tulba</p>
 <p className="text-3xl font-black">{tulba}</p>
 </div>
 <div onClick={() => {setStatusFilter('All'); setSectionTypeFilter('Talibat')}} className={`p-4 rounded-sm border shadow-sm text-center cursor-pointer hover:shadow-md transition-all ${sectionFilter === 'Talibat' ? 'bg-violet-600 border-violet-700 text-white' : 'bg-violet-50 border-violet-100 text-violet-700'}`}>
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
 <input type="date" value={dateRange.start} onChange={e => setDateRange({...dateRange, start: e.target.value})} className="w-full p-3 bg-slate-50 rounded-sm text-sm font-bold border-none text-slate-600"/>
 </div>
 <div>
 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">End Date</label>
 <input type="date" value={dateRange.end} onChange={e => setDateRange({...dateRange, end: e.target.value})} className="w-full p-3 bg-slate-50 rounded-sm text-sm font-bold border-none text-slate-600"/>
 </div>
 </div>
 </div>

 {/* Bulk Actions Panel */}
 <AnimatePresence>
 {selectedIds.length > 0 && (
 <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:20 }} className="bg-slate-800 p-4 rounded-sm flex flex-wrap items-center justify-between shadow-sm border border-gray-200 shadow-slate-900/20 z-20 sticky top-4 border border-slate-700">
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
             {selectedIds.length === filteredAdmissions.length && filteredAdmissions.length > 0 ? <CheckSquareIcon size={14} className="text-blue-600"/> : <Square size={14}/>}
             Select All
          </button>
       </div>
       <div className="flex flex-wrap gap-2 w-full md:w-auto">
          <button onClick={exportToCSV} className="flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-blue-700 rounded-sm text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-blue-50"><Download size={14}/> CSV</button>
          <button onClick={exportToPDF} className="flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2 bg-slate-800 border border-slate-900 text-white rounded-sm text-[10px] font-black uppercase tracking-widest shadow-sm hover:bg-slate-700"><Printer size={14}/> PDF Report</button>
       </div>
    </div>
    
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-6 p-3 md:p-6 min-h-[500px] bg-slate-50/50">
      {filteredAdmissions.map((adm) => {
        const isSelected = selectedIds.includes(adm.id);
        return (
           <div key={adm.id} className={`relative p-3 md:p-5 rounded-xl md:rounded-2xl border transition-all flex flex-col ${isSelected ? 'bg-blue-50 border-blue-200 shadow-md' : 'bg-white border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md'}`}>
              <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10">
                 <button onClick={() => toggleSelection(adm.id)} className={`p-1 rounded-md bg-white/80 backdrop-blur-sm shadow-sm border ${isSelected ? 'text-blue-600 border-blue-200' : 'text-slate-300 hover:text-slate-400 border-slate-100'}`}>
                    {isSelected ? <CheckSquareIcon size={16} className="md:w-5 md:h-5"/> : <Square size={16} className="md:w-5 md:h-5"/>}
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
 };


 // --- Students Module --- //
 const renderStudentsModule = () => {
 const total = students.length;
 const tulba = students.filter(s => s.sectionType?.toLowerCase().includes('tulba')).length;
 const talibat = students.filter(s => s.sectionType?.toLowerCase().includes('talibat')).length;
 const active = students.filter(s => !s.studentStatus || s.studentStatus === 'Active').length;
 const graduated = students.filter(s => s.studentStatus === 'Graduated').length;
 const defaulters = 0; // Simulated
 const newAdmissions = admissions.filter(a => a.status === 'Approved').length;

 const filteredStudents = students.filter(std => {
 const matchesSearch = std.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) || std.rollNo?.includes(searchTerm) || std.studentId?.includes(searchTerm) || std.mobile?.includes(searchTerm);
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
 setSelectedStudent({...selectedStudent, studentStatus: status});
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
 method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ classProgram: nextClass, fees: {...student.fees, session: '2027-28'} })
 });
 if (res.ok) {
 alert(`Student successfully promoted to ${nextClass}!`);
 fetchAllData();
 if (selectedStudent?.id === student.id) setSelectedStudent({...selectedStudent, classProgram: nextClass});
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
 handleDownloadPDF(`Bulk Export Students`);
 } else if (action === 'promote') {
 alert('Bulk promotion requires individual class rules mapping. Simulated success.');
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
 {/* Action Header */}
 <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-slate-50 sticky top-0 z-10 shadow-sm print:hidden">
 <button onClick={() => setSelectedStudent(null)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-black uppercase text-xs tracking-widest bg-white px-4 py-2.5 rounded-sm border border-slate-200 shadow-sm"><ArrowLeft size={16}/> Back to List</button>
 <div className="flex flex-wrap gap-2 w-full md:w-auto">
 <button onClick={() => handlePromote(selectedStudent)} className="flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2.5 bg-indigo-600 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-indigo-700 transition-all"><TrendingUp size={16} className="inline"/> Promote</button>
 <button onClick={() => handleStudentStatusUpdate(selectedStudent.id, 'Graduated')} className="flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-blue-700 transition-all"><Award size={16} className="inline"/> Graduate</button>
 <button onClick={() => handleStudentStatusUpdate(selectedStudent.id, 'Suspended')} className="flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2.5 bg-amber-500 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-amber-600 transition-all"><AlertCircle size={16} className="inline"/> Suspend</button>
 <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all hidden md:flex"><Printer size={16}/> Print Profile</button>
 <button onClick={() => handleStudentDelete(selectedStudent.id)} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-rose-200 text-rose-600 rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-rose-50 transition-all hidden md:flex"><Trash2 size={16}/> Delete</button>
 </div>
 </div>

 <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10 print:p-0">
 {/* Profile Information Column */}
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
 <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-bl-full opacity-50 blur-2xl pointer-events-none print:hidden"></div>
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
 <div><p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Academic Session</p><p className="text-sm font-bold text-slate-800 font-mono">{selectedStudent.fees.session}</p></div>
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

 {/* Sidebar Column */}
 <div className="space-y-8 print:hidden">
 <div className="bg-amber-50 p-6 rounded-sm border border-amber-100 shadow-sm">
 <h4 className="text-lg font-black text-amber-900 mb-6 flex items-center gap-2"><DollarSign className="text-amber-600"/> Fee Management</h4>
 <div className="space-y-4">
 <div className="flex justify-between items-center border-b border-amber-200 pb-2">
 <span className="text-xs font-bold text-amber-700 uppercase tracking-widest">Total Class Fee</span>
 <span className="text-sm font-black text-amber-900 font-mono">Rs. {selectedStudent.fees.totalFee || (selectedStudent.fees.admissionFee + selectedStudent.fees.registrationFee)}</span>
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
 <a href={doc.url || '#'} download={doc.name} className="text-[9px] px-2 py-1 bg-white border border-slate-200 rounded text-slate-600 font-black uppercase hover:text-indigo-600 block text-center leading-loose">DL</a>
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
 
 {/* Statistics Banner */}
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
 <div onClick={() => handleNavigate('fees')} className={`p-4 rounded-sm border shadow-sm text-center cursor-pointer hover:shadow-md transition-all bg-rose-50 border-rose-100 text-rose-700`}>
 <p className={`text-[10px] font-black uppercase tracking-widest mb-1 text-rose-600/70`}>Defaulters</p>
 <p className="text-3xl font-black">{defaulters}</p>
 </div>
 </div>

 {/* Toolbar & Advanced Filters */}
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
 <button onClick={() => handleNavigate('admissions')} className="px-4 py-3 bg-blue-50 text-blue-700 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-blue-100 transition-all">+ New Admission</button>
 </div>
 </div>
 </div>

 {/* Bulk Actions Panel */}
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

 {/* Main Students Table */}
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
 };

 // --- Faculty Module --- //
 const renderFacultyModule = () => {
 const total = faculty.length;
 const active = faculty.filter(f => !f.status || f.status === 'Active').length;
 const inactive = faculty.filter(f => f.status === 'Inactive' || f.status === 'Retired').length;
 const leadership = faculty.filter(f => f.isLeadership).length;
 const muftis = faculty.filter(f => f.designation?.toLowerCase().includes('mufti')).length;
 const professors = faculty.filter(f => f.designation?.toLowerCase().includes('professor')).length;

 const filteredFaculty = faculty.filter(fac => {
 const matchesSearch = fac.name?.toLowerCase().includes(searchTerm.toLowerCase()) || fac.facultyId?.includes(searchTerm) || fac.department?.toLowerCase().includes(searchTerm.toLowerCase());
 const matchesStatus = statusFilter === 'All' || (statusFilter === 'Active' && (!fac.status || fac.status === 'Active')) || fac.status === statusFilter;
 // Reusing classFilter as department filter for UI simplicity
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
 setSelectedFaculty({...selectedFaculty, [field]: value});
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
 handleDownloadPDF(`Bulk Export Faculty`);
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
 {/* Action Header */}
 <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-slate-50 sticky top-0 z-10 shadow-sm print:hidden">
 <button onClick={() => setSelectedFaculty(null)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-black uppercase text-xs tracking-widest bg-white px-4 py-2.5 rounded-sm border border-slate-200 shadow-sm"><ArrowLeft size={16}/> Back to List</button>
 <div className="flex flex-wrap gap-2 w-full md:w-auto">
 <button onClick={() => handleUploadPhoto(selectedFaculty.id)} className="flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2.5 bg-slate-800 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-slate-700 transition-all"><Upload size={16} className="inline"/> Photo</button>
 <button onClick={() => handleStatusUpdate(selectedFaculty.id, 'Active')} className="flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-blue-700 transition-all"><CheckCircle2 size={16} className="inline"/> Activate</button>
 <button onClick={() => handleStatusUpdate(selectedFaculty.id, 'Inactive')} className="flex-1 md:flex-none justify-center items-center gap-2 px-4 py-2.5 bg-amber-500 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-amber-600 transition-all"><AlertCircle size={16} className="inline"/> Deactivate</button>
 <button onClick={handlePrint} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 text-slate-600 rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-slate-50 transition-all hidden md:flex"><Printer size={16}/> Print Profile</button>
 <button onClick={() => handleDelete(selectedFaculty.id)} className="flex items-center gap-2 px-4 py-2.5 bg-white border border-rose-200 text-rose-600 rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-rose-50 transition-all hidden md:flex"><Trash2 size={16}/> Delete</button>
 </div>
 </div>

 <div className="p-6 md:p-10 grid grid-cols-1 lg:grid-cols-3 gap-10 print:p-0">
 {/* Profile Information Column */}
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
 <div className="absolute top-0 right-0 w-32 h-32 bg-white rounded-bl-full opacity-50 blur-2xl pointer-events-none print:hidden"></div>
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

 {/* Sidebar Column */}
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
 <button onClick={() => handleDownloadPDF(doc.name)} className="text-[9px] px-2 py-1 bg-white border border-slate-200 rounded text-slate-600 font-black uppercase hover:text-indigo-600">DL</button>
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
 
 {/* Statistics Banner */}
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
 <div className={`p-4 rounded-sm border shadow-sm text-center bg-blue-50 border-blue-100 text-blue-700`}>
 <p className={`text-[10px] font-black uppercase tracking-widest mb-1 text-blue-600/70`}>Professors</p>
 <p className="text-3xl font-black">{professors}</p>
 </div>
 <div className={`p-4 rounded-sm border shadow-sm text-center bg-violet-50 border-violet-100 text-violet-700`}>
 <p className={`text-[10px] font-black uppercase tracking-widest mb-1 text-violet-600/70`}>Muftis</p>
 <p className="text-3xl font-black">{muftis}</p>
 </div>
 <div className={`p-4 rounded-sm border shadow-sm text-center bg-slate-800 border-slate-900 text-white`}>
 <p className={`text-[10px] font-black uppercase tracking-widest mb-1 text-slate-400`}>Leadership</p>
 <p className="text-3xl font-black">{leadership}</p>
 </div>
 </div>

 {/* Toolbar & Advanced Filters */}
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

 {/* Bulk Actions Panel */}
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

 {/* Main Faculty Table */}
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
 };

 // --- Courses Module --- //
 const renderCoursesModule = () => {
 const total = courses.length;
 const active = courses.filter(c => !c.status || c.status === 'Active').length;
 const featured = courses.filter(c => c.featured).length;
 const totalEnrollments = courses.reduce((acc, c) => acc + (c.enrollmentStats?.total || 0), 0);
 const totalPdfs = courses.reduce((acc, c) => acc + (c.syllabus?.length || 0), 0);
 const totalPlaylists = courses.reduce((acc, c) => acc + (c.playlists?.length || 0), 0);

 const filteredCourses = courses.filter(crs => {
 const matchesSearch = crs.title?.toLowerCase().includes(searchTerm.toLowerCase()) || crs.courseId?.includes(searchTerm);
 const matchesStatus = statusFilter === 'All' || (statusFilter === 'Active' && (!crs.status || crs.status === 'Active')) || crs.status === statusFilter;
 const matchesCategory = classFilter === 'All' || crs.level === classFilter || (!crs.level && classFilter === 'All');
 return matchesSearch && matchesStatus && matchesCategory;
 });

 const toggleSelection = (id: number) => {
 setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
 };
 const toggleAllSelection = () => {
 if (selectedIds.length === filteredCourses.length) setSelectedIds([]);
 else setSelectedIds(filteredCourses.map(s => s.id));
 };

 const handleCourseFieldUpdate = async (id: number, field: string, value: any) => {
 try {
 const res = await fetch(`/api/admin/courses/${id}`, {
 method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ [field]: value })
 });
 if (res.ok) {
 alert(`Course ${field} updated successfully!`);
 fetchAllData(); 
 if (selectedCourse && selectedCourse.id === id) {
 setSelectedCourse({...selectedCourse, [field]: value});
 }
 }
 } catch (err) { alert('Error updating course'); }
 };

 const handleStatusUpdate = async (id: number, status: string) => await handleCourseFieldUpdate(id, 'status', status);
 const handleFeaturedUpdate = async (id: number, isFeatured: boolean) => await handleCourseFieldUpdate(id, 'featured', isFeatured);

 const handleDelete = async (id: number) => {
 if(!confirm('Are you sure you want to permanently delete this course?')) return;
 try {
 await fetch(`/api/admin/courses/${id}`, { method: 'DELETE' });
 alert('Course deleted successfully.');
 fetchAllData();
 if (selectedCourse?.id === id) setSelectedCourse(null);
 } catch (err) { console.error(err); }
 };

 const handleUploadImage = async (id: number) => {
 const url = prompt('Enter the URL of the course image:');
 if (url) await handleCourseFieldUpdate(id, 'image', url);
 };

 const handleAddPdf = async (id: number) => {
 const title = prompt('Enter PDF Title:');
 const url = prompt('Enter PDF URL or File Path (e.g. /syllabus/file.pdf):');
 if (title && url) {
 const currentSyllabus = selectedCourse?.syllabus || [];
 await handleCourseFieldUpdate(id, 'syllabus', [...currentSyllabus, { title, file: url }]);
 }
 };

 const handleAddPlaylist = async (id: number) => {
 const title = prompt('Enter Playlist Title:');
 const listId = prompt('Enter YouTube Playlist ID (e.g. PL7pGH6oFXtc...):');
 if (title && listId) {
 const currentPlaylists = selectedCourse?.playlists || [];
 await handleCourseFieldUpdate(id, 'playlists', [...currentPlaylists, { id: Date.now().toString(), title, listId }]);
 }
 };

 const handleBulkAction = async (action: string) => {
 if (selectedIds.length === 0) return alert('No courses selected.');
 if (action === 'delete') {
 if(!confirm(`Delete ${selectedIds.length} courses?`)) return;
 try {
 await Promise.all(selectedIds.map(id => fetch(`/api/admin/courses/${id}`, { method: 'DELETE' })));
 alert('Deleted.');
 setSelectedIds([]); fetchAllData();
 } catch(e) {}
 } else if (action === 'export') {
 alert('Exporting course details...');
 } else {
 try {
 await Promise.all(selectedIds.map(id => fetch(`/api/admin/courses/${id}`, {
 method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: action })
 })));
 alert(`Status updated to ${action}.`);
 setSelectedIds([]); fetchAllData();
 } catch(e) {}
 }
 };

 if (selectedCourse) {
 return (
 <div className="bg-white rounded-sm border border-slate-200 overflow-hidden shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
 <div className="p-6 border-b border-slate-100 flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-slate-50 sticky top-0 z-10 shadow-sm">
 <button onClick={() => setSelectedCourse(null)} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 font-black uppercase text-xs tracking-widest bg-white px-4 py-2.5 rounded-sm border border-slate-200 shadow-sm"><ArrowLeft size={16}/> Back to Courses</button>
 <div className="flex flex-wrap gap-2 w-full md:w-auto">
 <button onClick={() => handleStatusUpdate(selectedCourse.id, 'Active')} className="px-4 py-2.5 bg-blue-600 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-blue-700 transition-all"><CheckCircle2 size={16} className="inline mr-2"/> Publish</button>
 <button onClick={() => handleStatusUpdate(selectedCourse.id, 'Draft')} className="px-4 py-2.5 bg-amber-500 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-amber-600 transition-all"><AlertCircle size={16} className="inline mr-2"/> Draft</button>
 <button onClick={() => handleStatusUpdate(selectedCourse.id, 'Archived')} className="px-4 py-2.5 bg-slate-500 text-white rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-slate-600 transition-all"><Archive size={16} className="inline mr-2"/> Archive</button>
 <button onClick={() => handleDelete(selectedCourse.id)} className="px-4 py-2.5 bg-white border border-rose-200 text-rose-600 rounded-sm text-xs font-black uppercase tracking-widest shadow-sm hover:bg-rose-50 transition-all"><Trash2 size={16} className="inline mr-2"/> Delete</button>
 </div>
 </div>

 <div className="p-6 md:p-10 grid grid-cols-1 xl:grid-cols-3 gap-10">
 <div className="xl:col-span-2 space-y-10">
 <div className="flex flex-col md:flex-row gap-8 items-start">
 <div className="w-full md:w-64 h-48 bg-slate-100 rounded-sm overflow-hidden shrink-0 border relative shadow-sm group">
 {selectedCourse.image ? (
 <Image src={selectedCourse.image} alt={selectedCourse.title} fill className="object-cover" />
 ) : (
 <div className="w-full h-full flex items-center justify-center text-slate-300"><BookOpen size={48} /></div>
 )}
 <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
 <button onClick={() => handleUploadImage(selectedCourse.id)} className="px-4 py-2 bg-white text-slate-800 font-black text-xs uppercase tracking-widest rounded-sm">Change Image</button>
 </div>
 </div>
 <div className="flex-1">
 <div className="flex items-center gap-3 mb-2">
 <span className="px-3 py-1 bg-indigo-50 text-indigo-700 rounded-full text-[10px] font-black uppercase tracking-widest">{selectedCourse.level || 'No Category'}</span>
 <button onClick={() => handleFeaturedUpdate(selectedCourse.id, !selectedCourse.featured)} className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border transition-all ${selectedCourse.featured ? 'bg-amber-100 border-amber-200 text-amber-700' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'}`}>
 <Star size={10} className="inline mr-1"/> {selectedCourse.featured ? 'Featured' : 'Mark Featured'}
 </button>
 </div>
 <h2 className="text-3xl font-black text-slate-800 tracking-tight">{selectedCourse.title}</h2>
 <p className="text-slate-500 mt-2 font-medium">{selectedCourse.desc || 'No description provided.'}</p>
 <div className="flex gap-6 mt-6">
 <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Duration</p><p className="font-bold text-slate-700">{selectedCourse.duration}</p></div>
 <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Status</p><p className="font-bold text-slate-700">{selectedCourse.status || 'Active'}</p></div>
 <div><p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Course ID</p><p className="font-mono font-bold text-slate-700">{selectedCourse.courseId || `CRS-${selectedCourse.id}`}</p></div>
 </div>
 </div>
 </div>

 {/* Full Description & Outcomes */}
 <div className="bg-slate-50 p-8 rounded-sm border border-slate-100">
 <div className="flex justify-between items-center mb-6">
 <h4 className="text-lg font-black text-slate-800 flex items-center gap-2"><FileText size={20} className="text-indigo-600"/> Course Details</h4>
 <button onClick={() => alert('Edit details...')} className="text-xs font-black text-indigo-600 uppercase tracking-widest hover:underline">Edit</button>
 </div>
 <div className="space-y-6">
 <div>
 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Full Description</p>
 <p className="text-sm text-slate-700 leading-relaxed">{selectedCourse.fullDescription || selectedCourse.desc || 'No full description available.'}</p>
 </div>
 <div>
 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Eligibility</p>
 <p className="text-sm font-bold text-slate-800">{selectedCourse.eligibility || 'Open for all'}</p>
 </div>
 {selectedCourse.learningOutcomes && selectedCourse.learningOutcomes.length > 0 && (
 <div>
 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Learning Outcomes</p>
 <ul className="list-disc pl-5 text-sm font-medium text-slate-700 space-y-1">
 {selectedCourse.learningOutcomes.map((loc, i) => <li key={i}>{loc}</li>)}
 </ul>
 </div>
 )}
 </div>
 </div>

 {/* Curriculum / Syllabus */}
 <div>
 <div className="flex justify-between items-center mb-6">
 <h4 className="text-lg font-black text-slate-800 flex items-center gap-2"><Book size={20} className="text-blue-600"/> Curriculum & Syllabus</h4>
 <button onClick={() => alert('Add syllabus section...')} className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">+ Add Section</button>
 </div>
 {selectedCourse.curriculum && selectedCourse.curriculum.length > 0 ? (
 <div className="space-y-4">
 {selectedCourse.curriculum.map((sem, idx) => (
 <div key={idx} className="border border-slate-200 rounded-sm p-6 bg-white shadow-sm">
 <h5 className="font-black text-slate-800 mb-4">{sem.semester}</h5>
 <div className="flex flex-wrap gap-2">
 {sem.subjects.map((sub, sidx) => (
 <span key={sidx} className="px-3 py-1.5 bg-slate-100 text-slate-700 rounded-sm text-xs font-bold border border-slate-200">{sub}</span>
 ))}
 </div>
 </div>
 ))}
 </div>
 ) : (
 <div className="p-8 border-2 border-dashed border-slate-200 rounded-sm text-center">
 <p className="text-sm font-bold text-slate-400">No curriculum added yet.</p>
 </div>
 )}
 </div>
 </div>

 {/* Media & Stats Sidebar */}
 <div className="space-y-8">
 {/* Enrollment Stats */}
 <div className="bg-slate-800 text-white p-6 rounded-sm shadow-sm">
 <h4 className="text-lg font-black mb-6 flex items-center gap-2"><Users size={20} className="text-indigo-400"/> Enrollments</h4>
 <div className="grid grid-cols-2 gap-4">
 <div className="p-4 bg-slate-700/50 rounded-sm border border-slate-600">
 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Total</p>
 <p className="text-2xl font-black">{selectedCourse.enrollmentStats?.total || 0}</p>
 </div>
 <div className="p-4 bg-slate-700/50 rounded-sm border border-slate-600">
 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Tulba</p>
 <p className="text-xl font-bold">{selectedCourse.enrollmentStats?.tulba || 0}</p>
 </div>
 <div className="p-4 bg-slate-700/50 rounded-sm border border-slate-600 col-span-2">
 <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Talibat</p>
 <p className="text-xl font-bold">{selectedCourse.enrollmentStats?.talibat || 0}</p>
 </div>
 </div>
 <button onClick={() => alert('Viewing enrolled students...')} className="w-full mt-4 py-3 bg-indigo-500 hover:bg-indigo-600 rounded-sm text-xs font-black uppercase tracking-widest transition-colors">View Students</button>
 </div>

 {/* Syllabus/PDFs */}
 <div className="bg-white border border-slate-200 p-6 rounded-sm shadow-sm">
 <div className="flex justify-between items-center mb-6">
 <h4 className="font-black text-slate-800 flex items-center gap-2"><FileText size={18} className="text-rose-500"/> Syllabus & PDFs</h4>
 <button onClick={() => handleAddPdf(selectedCourse.id)} className="text-xs font-black text-rose-500 hover:underline uppercase tracking-widest">+ Add</button>
 </div>
 {selectedCourse.syllabus && selectedCourse.syllabus.length > 0 ? (
 <div className="space-y-3">
 {selectedCourse.syllabus.map((pdf, i) => (
 <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-sm flex items-center justify-between group">
 <div className="truncate pr-2">
 <p className="text-xs font-bold text-slate-700 truncate">{pdf.title}</p>
 </div>
 <button onClick={() => window.open(pdf.file, '_blank')} className="text-rose-600 opacity-0 group-hover:opacity-100 transition-opacity"><Download size={14}/></button>
 </div>
 ))}
 </div>
 ) : (
 <p className="text-xs font-bold text-slate-400 text-center py-4">No PDFs attached.</p>
 )}
 </div>

 {/* YouTube Playlists */}
 <div className="bg-white border border-slate-200 p-6 rounded-sm shadow-sm">
 <div className="flex justify-between items-center mb-6">
 <h4 className="font-black text-slate-800 flex items-center gap-2"><PlaySquare size={18} className="text-red-600"/> Video Playlists</h4>
 <button onClick={() => handleAddPlaylist(selectedCourse.id)} className="text-xs font-black text-red-600 hover:underline uppercase tracking-widest">+ Add</button>
 </div>
 {selectedCourse.playlists && selectedCourse.playlists.length > 0 ? (
 <div className="space-y-3">
 {selectedCourse.playlists.map(pl => (
 <div key={pl.id} className="p-3 bg-red-50/30 border border-red-100 rounded-sm">
 <p className="text-xs font-bold text-slate-800 mb-1">{pl.title}</p>
 <a href={pl.listId ? `https://youtube.com/playlist?list=${pl.listId}` : pl.url || '#'} target="_blank" rel="noreferrer" className="text-[10px] font-black text-red-600 hover:underline uppercase flex items-center gap-1"><Play size={10}/> Watch Playlist</a>
 </div>
 ))}
 </div>
 ) : (
 <p className="text-xs font-bold text-slate-400 text-center py-4">No playlists attached.</p>
 )}
 </div>

 {/* SEO Meta Information */}
 <div className="bg-slate-50 border border-slate-100 p-6 rounded-sm">
 <div className="flex justify-between items-center mb-4">
 <h4 className="font-black text-slate-800 flex items-center gap-2"><Globe size={18} className="text-blue-500"/> SEO Data</h4>
 <button onClick={() => alert('Edit SEO data...')} className="text-[10px] font-black text-blue-500 hover:underline uppercase tracking-widest">Edit</button>
 </div>
 <div className="space-y-3">
 <div><p className="text-[9px] font-black uppercase text-slate-400">Meta Title</p><p className="text-xs font-bold text-slate-700 truncate">{selectedCourse.seo?.metaTitle || selectedCourse.title}</p></div>
 <div><p className="text-[9px] font-black uppercase text-slate-400">URL Slug</p><p className="text-xs font-mono text-slate-600 truncate">/{selectedCourse.seo?.slug || selectedCourse.title.toLowerCase().replace(/\s+/g,'-')}</p></div>
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
 <div onClick={() => setStatusFilter('All')} className={`p-4 rounded-sm border shadow-sm text-center cursor-pointer hover:shadow-md transition-all ${statusFilter === 'All' ? 'bg-indigo-800 border-indigo-900 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
 <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${statusFilter === 'All' ? 'text-indigo-300' : 'text-slate-400'}`}>Total Courses</p>
 <p className="text-3xl font-black">{total}</p>
 </div>
 <div onClick={() => setStatusFilter('Active')} className={`p-4 rounded-sm border shadow-sm text-center cursor-pointer hover:shadow-md transition-all ${statusFilter === 'Active' ? 'bg-blue-600 border-blue-700 text-white' : 'bg-blue-50 border-blue-100 text-blue-700'}`}>
 <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${statusFilter === 'Active' ? 'text-blue-200' : 'text-blue-600/70'}`}>Active Courses</p>
 <p className="text-3xl font-black">{active}</p>
 </div>
 <div className={`p-4 rounded-sm border shadow-sm text-center bg-amber-50 border-amber-100 text-amber-700`}>
 <p className={`text-[10px] font-black uppercase tracking-widest mb-1 text-amber-600/70`}>Featured</p>
 <p className="text-3xl font-black">{featured}</p>
 </div>
 <div className={`p-4 rounded-sm border shadow-sm text-center bg-blue-50 border-blue-100 text-blue-700`}>
 <p className={`text-[10px] font-black uppercase tracking-widest mb-1 text-blue-600/70`}>Enrollments</p>
 <p className="text-3xl font-black">{totalEnrollments}</p>
 </div>
 <div className={`p-4 rounded-sm border shadow-sm text-center bg-rose-50 border-rose-100 text-rose-700`}>
 <p className={`text-[10px] font-black uppercase tracking-widest mb-1 text-rose-600/70`}>Total PDFs</p>
 <p className="text-3xl font-black">{totalPdfs}</p>
 </div>
 <div className={`p-4 rounded-sm border shadow-sm text-center bg-red-50 border-red-100 text-red-700`}>
 <p className={`text-[10px] font-black uppercase tracking-widest mb-1 text-red-600/70`}>Playlists</p>
 <p className="text-3xl font-black">{totalPlaylists}</p>
 </div>
 </div>

 {/* Toolbar */}
 <div className="bg-white p-6 rounded-sm shadow-sm border border-slate-200 space-y-4">
 <div className="flex flex-col lg:flex-row justify-between gap-6">
 <div className="flex flex-1 gap-4">
 <div className="relative flex-1 max-w-lg">
 <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
 <input type="text" placeholder="Search course by name, ID..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-12 pr-4 py-4 bg-slate-50 border-none focus:ring-2 focus:ring-indigo-500 rounded-sm text-sm transition-all font-bold text-slate-700" />
 </div>
 </div>
 <div className="flex justify-end items-center gap-2">
 <button onClick={() => alert('Opening Create Course wizard...')} className="px-6 py-3 bg-blue-600 text-white rounded-sm text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-sm">+ Create Course</button>
 </div>
 </div>
 <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 pt-4 border-t border-slate-100">
 <div>
 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Category Filter</label>
 <select value={classFilter} onChange={e => setClassFilter(e.target.value)} className="w-full p-3 bg-slate-50 rounded-sm text-sm font-bold border-none">
 <option value="All">All Categories</option>
 <option value="Dars-e-Nizami">Dars-e-Nizami</option>
 <option value="Khasusi Dars-e-Nizami">Khasusi Dars-e-Nizami</option>
 <option value="Hifz-ul-Quran">Hifz-ul-Quran</option>
 <option value="Tajweed-o-Qira'at">Tajweed-o-Qira'at</option>
 <option value="Arabic Language">Arabic Language</option>
 <option value="Takhasusat">Takhasusat</option>
 </select>
 </div>
 </div>
 </div>

 {/* Bulk Actions */}
 <AnimatePresence>
 {selectedIds.length > 0 && (
 <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0, y:20 }} className="bg-slate-800 p-4 rounded-sm flex flex-wrap items-center justify-between shadow-sm border border-gray-200 shadow-slate-900/20 z-20 sticky top-4 border border-slate-700">
 <span className="text-indigo-400 font-black text-sm px-4">{selectedIds.length} Courses Selected</span>
 <div className="flex flex-wrap gap-2">
 <button onClick={() => handleBulkAction('Active')} className="px-4 py-2 bg-blue-600 text-white rounded-sm text-xs font-black uppercase tracking-widest hover:bg-blue-500">Publish</button>
 <button onClick={() => handleBulkAction('Draft')} className="px-4 py-2 bg-amber-600 text-white rounded-sm text-xs font-black uppercase tracking-widest hover:bg-amber-500">Draft</button>
 <button onClick={() => handleBulkAction('Archived')} className="px-4 py-2 bg-slate-600 text-white rounded-sm text-xs font-black uppercase tracking-widest hover:bg-slate-500">Archive</button>
 <button onClick={() => handleBulkAction('delete')} className="px-4 py-2 border border-slate-600 text-slate-300 rounded-sm text-xs font-black uppercase tracking-widest hover:bg-slate-700 hover:text-white">Delete</button>
 </div>
 </motion.div>
 )}
 </AnimatePresence>

 {/* Main Courses Table */}
 <div className="bg-white rounded-sm shadow-sm border border-slate-200 overflow-hidden">
 <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
 <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2"><BookOpen size={20} className="text-indigo-600"/> Course List</h3>
 </div>
 <div className="overflow-x-auto min-h-[500px]">
 <table className="w-full text-left border-collapse whitespace-nowrap">
 <thead>
 <tr className="bg-slate-50 border-b border-slate-100">
 <th className="px-6 py-4 w-10">
 <button onClick={toggleAllSelection} className="text-slate-400 hover:text-indigo-600">
 {selectedIds.length === filteredCourses.length && filteredCourses.length > 0 ? <CheckSquareIcon size={18} className="text-indigo-600"/> : <Square size={18}/>}
 </button>
 </th>
 <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Course Info</th>
 <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Category & Duration</th>
 <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Enrollments</th>
 <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Status</th>
 <th className="px-6 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">Actions</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {filteredCourses.map((crs) => {
 const isSelected = selectedIds.includes(crs.id);
 const cStatus = crs.status || 'Active';
 return (
 <tr key={crs.id} className={`transition-colors group ${isSelected ? 'bg-indigo-50/50' : 'hover:bg-slate-50/80'}`}>
 <td className="px-6 py-5">
 <button onClick={() => toggleSelection(crs.id)} className={`${isSelected ? 'text-indigo-600' : 'text-slate-300 group-hover:text-slate-400'}`}>
 {isSelected ? <CheckSquareIcon size={18}/> : <Square size={18}/>}
 </button>
 </td>
 <td className="px-6 py-5">
 <div className="flex items-center gap-4">
 <div className="w-12 h-12 rounded-sm bg-slate-100 overflow-hidden flex items-center justify-center shrink-0 border border-slate-200">
 {crs.image ? <Image src={crs.image} alt={crs.title} width={48} height={48} className="object-cover w-full h-full" /> : <Book size={20} className="text-slate-400" />}
 </div>
 <div>
 <div className="font-black text-sm text-slate-800 tracking-tight flex items-center gap-2">
 {crs.title}
 {crs.featured && <Star size={12} className="text-amber-500 fill-amber-500" />}
 </div>
 <div className="text-[10px] font-mono font-bold text-slate-400 mt-1">{crs.courseId || `CRS-${crs.id}`}</div>
 </div>
 </div>
 </td>
 <td className="px-6 py-5">
 <div className="font-black text-xs text-slate-700">{crs.level || 'Uncategorized'}</div>
 <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-1 flex items-center gap-1"><Clock size={10}/> {crs.duration}</div>
 </td>
 <td className="px-6 py-5 font-bold text-slate-600">
 <div className="flex items-center gap-2">
 <Users size={14} className="text-indigo-400"/>
 {crs.enrollmentStats?.total || 0} Students
 </div>
 </td>
 <td className="px-6 py-5 text-center">
 <span className={`inline-block px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest
 ${cStatus === 'Active' ? 'bg-blue-100 text-blue-700' : ''}
 ${cStatus === 'Draft' ? 'bg-amber-100 text-amber-700' : ''}
 ${cStatus === 'Archived' ? 'bg-slate-100 text-slate-700' : ''}
 `}>{cStatus}</span>
 </td>
 <td className="px-6 py-5 text-right">
 <div className="flex items-center justify-end gap-2 opacity-50 group-hover:opacity-100 transition-opacity">
 <button onClick={() => setSelectedCourse(crs)} className="p-2 bg-white border border-slate-200 rounded-sm hover:bg-indigo-50 hover:border-indigo-200 hover:text-indigo-600 transition-all shadow-sm" title="View Profile"><Eye size={16} /></button>
 <button onClick={() => alert('Duplicating course...')} className="p-2 bg-white border border-slate-200 rounded-sm hover:bg-amber-50 hover:border-amber-200 hover:text-amber-600 transition-all shadow-sm" title="Duplicate"><Copy size={16} /></button>
 <button onClick={() => handleDelete(crs.id)} className="p-2 bg-white border border-rose-200 rounded-sm hover:bg-rose-50 hover:border-rose-200 hover:text-rose-600 transition-all shadow-sm" title="Delete"><Trash2 size={16} /></button>
 </div>
 </td>
 </tr>
 );
 })}
 {filteredCourses.length === 0 && (
 <tr>
 <td colSpan={6} className="py-20 text-center">
 <div className="flex flex-col items-center justify-center">
 <BookOpen size={40} className="text-slate-200 mb-4" />
 <p className="text-sm font-bold text-slate-500">No courses found matching the criteria.</p>
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
 };

 // --- Fees & Challan Module --- //
 const renderFeesModule = () => {
 const totalCollected = challans.filter(c => c.status === 'Paid').reduce((sum, c) => sum + c.paidAmount, 0);
 const pendingAmount = challans.filter(c => c.status !== 'Paid').reduce((sum, c) => sum + (c.totalAmount - c.paidAmount), 0);
 const paidStudents = challans.filter(c => c.status === 'Paid').length;
 const unpaidStudents = challans.filter(c => c.status === 'Unpaid').length;
 const partiallyPaid = challans.filter(c => c.status === 'Partially Paid').length;

 const filteredChallans = challans.filter(c => {
 const matchesSearch = c.studentName?.toLowerCase().includes(searchTerm.toLowerCase()) || c.rollNo?.toLowerCase().includes(searchTerm.toLowerCase()) || c.challanNo?.toLowerCase().includes(searchTerm.toLowerCase());
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

 const handleGenerateChallan = () => {
 setShowChallanBuilderModal(true);
 };

 const handleCategoryToggle = async (cat: FeeCategory) => {
 const newStatus = cat.status === 'Active' ? 'Inactive' : 'Active';
 await fetch(`/api/admin/fee-categories/${cat.id}`, {
 method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ status: newStatus })
 });
 fetchAllData();
 };

 const handleDeleteCategory = async (id: number) => {
 if(!confirm("Are you sure you want to delete this fee category? It will be removed from future challans but historical challans will be preserved.")) return;
 await fetch(`/api/admin/fee-categories/${id}`, { method: 'DELETE' });
 fetchAllData();
 };

 const handleMarkAsPaid = async (id: number) => {
 const challan = challans.find(c => c.id === id);
 if (!challan) return;
 const amount = prompt(`Enter amount paid by ${challan.studentName} (Total Due: ${challan.totalAmount - challan.paidAmount}):`, (challan.totalAmount - challan.paidAmount).toString());
 if (!amount || isNaN(parseInt(amount))) return;
 
 const paid = challan.paidAmount + parseInt(amount);
 let status = 'Partially Paid';
 if (paid >= challan.totalAmount) status = 'Paid';
 
 await fetch(`/api/admin/challans/${id}`, {
 method: 'PUT', headers: { 'Content-Type': 'application/json' }, 
 body: JSON.stringify({ paidAmount: paid, status, paymentDate: new Date().toISOString().split('T')[0], paymentMethod: 'Cash' })
 });
 alert("Payment Recorded.");
 fetchAllData();
 };

 const handleDeleteChallan = async (id: number) => {
 if(!confirm("Delete this challan?")) return;
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
 <th className="border-2 border-slate-800 px-3 py-2 font-black text-[10px] uppercase tracking-widest">Fee Description</th>
 <th className="border-2 border-slate-800 px-3 py-2 font-black text-[10px] uppercase tracking-widest text-right w-32">Amount (Rs)</th>
 </tr>
 </thead>
 <tbody>
 {selectedChallan.feeDetails.map((fee, idx) => (
 <tr key={idx}>
 <td className="border-2 border-slate-800 px-3 py-2 font-bold text-xs text-slate-700">{fee.type}</td>
 <td className="border-2 border-slate-800 px-3 py-2 font-black text-xs text-slate-800 text-right">{fee.amount}</td>
 </tr>
 ))}
 </tbody>
 <tfoot>
 <tr className="bg-slate-100">
 <td className="border-2 border-slate-800 px-3 py-2 font-black text-xs text-slate-900 text-right uppercase tracking-widest">Total Payable Amount</td>
 <td className="border-2 border-slate-800 px-3 py-2 font-black text-sm text-slate-900 text-right">Rs. {selectedChallan.totalAmount}</td>
 </tr>
 </tfoot>
 </table>
 
 <div className="flex justify-between items-end mt-8">
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
 <div className={`p-6 rounded-sm border shadow-sm bg-indigo-900 border-indigo-800 text-white`}>
 <p className="text-[10px] font-black uppercase tracking-widest text-indigo-300 mb-2 flex items-center gap-2"><DollarSign size={14}/> Total Collected</p>
 <h3 className="text-4xl font-black">Rs. {totalCollected.toLocaleString()}</h3>
 </div>
 <div className={`p-6 rounded-sm border shadow-sm bg-rose-50 border-rose-100 text-rose-800`}>
 <p className="text-[10px] font-black uppercase tracking-widest text-rose-500 mb-2 flex items-center gap-2"><AlertCircle size={14}/> Pending Fees</p>
 <h3 className="text-4xl font-black">Rs. {pendingAmount.toLocaleString()}</h3>
 </div>
 <div className={`p-6 rounded-sm border shadow-sm bg-blue-50 border-blue-100 text-blue-800`}>
 <p className="text-[10px] font-black uppercase tracking-widest text-blue-500 mb-2 flex items-center gap-2"><CheckCircle2 size={14}/> Paid Students</p>
 <h3 className="text-4xl font-black">{paidStudents}</h3>
 </div>
 <div className={`p-6 rounded-sm border shadow-sm bg-amber-50 border-amber-100 text-amber-800`}>
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
 <button onClick={handleGenerateChallan} className="w-full lg:w-auto px-4 md:px-6 py-3 bg-blue-600 text-white rounded-sm text-xs font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-sm flex items-center justify-center"><Plus size={16} className="inline mr-2"/> Generate Challan</button>
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
                     ${ch.status === 'Paid' ? 'bg-blue-100 text-blue-700' : ch.status === 'Partially Paid' ? 'bg-blue-100 text-blue-700' : 'bg-rose-100 text-rose-700'}
                     `}>{ch.status}</span>
                 </div>
              </div>

              <div className="flex items-center justify-between gap-1.5 md:gap-2 mt-auto">
                 {ch.status !== 'Paid' && <button onClick={() => handleMarkAsPaid(ch.id)} className="flex-1 py-1.5 md:py-2 bg-blue-50 border border-blue-200 rounded-md md:rounded-lg hover:bg-blue-100 hover:border-blue-300 hover:text-blue-700 transition-all shadow-sm flex items-center justify-center text-blue-600" title="Mark Paid"><CheckCircle2 size={14} className="md:w-4 md:h-4" /></button>}
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

 {/* Fee Settings Modal */}
 {showFeeStructuresModal && (
 <FeeSettingsModal 
 onClose={() => setShowFeeStructuresModal(false)}
 feeStructures={feeStructures}
 onUpdate={() => fetchAllData()}
 />
 )}
 {/* Registration Fee Modal */}
 {showRegistrationModal && (
 <RegistrationFeeModal 
 onClose={() => setShowRegistrationModal(false)}
 onUpdate={() => fetchAllData()}
 />
 )}
 {/* Bank Settings Modal */}
 {showBankModal && (
 <BankSettingsModal 
 onClose={() => setShowBankModal(false)}
 />
 )}
 {/* Admission Schedule Modal */}
 {showScheduleModal && admissionSchedule && (
 <AdmissionScheduleModal 
 onClose={() => setShowScheduleModal(false)}
 schedule={admissionSchedule}
 onUpdate={() => fetchAllData()}
 />
 )}
 {/* Fee Categories Modal */}
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

 {/* Challan Builder Modal */}
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
 };

 // --- Overview Module --- //
 const renderOverview = () => {
 const STATS = [
 { id: 'admissions', label: 'Total Admissions', value: stats.admissions.toString(), growth: '+15%', trend: 'up', icon: <FileText size={24} />, bg: 'bg-blue-50', text: 'text-blue-600' },
 { id: 'students', label: 'Total Students', value: (stats.tulba + stats.talibat).toString(), growth: '+5%', trend: 'up', icon: <GraduationCap size={24} />, bg: 'bg-blue-50', text: 'text-blue-600' },
 { id: 'students', label: 'Total Tulba', value: stats.tulba.toString(), growth: '+2%', trend: 'up', icon: <User size={24} />, bg: 'bg-indigo-50', text: 'text-indigo-600' },
 { id: 'students', label: 'Total Talibat', value: stats.talibat.toString(), growth: '+8%', trend: 'up', icon: <Users size={24} />, bg: 'bg-violet-50', text: 'text-violet-600' },
 { id: 'faculty', label: 'Faculty Members', value: stats.faculty.toString(), growth: 'Stable', trend: 'neutral', icon: <Award size={24} />, bg: 'bg-amber-50', text: 'text-amber-600' },
 { id: 'courses', label: 'Total Courses', value: stats.courses.toString(), growth: '+2', trend: 'up', icon: <BookOpen size={24} />, bg: 'bg-cyan-50', text: 'text-cyan-600' },
 { id: 'news', label: 'News & Posts', value: stats.news.toString(), growth: '+12', trend: 'up', icon: <Megaphone size={24} />, bg: 'bg-rose-50', text: 'text-rose-600' },
 { id: 'donations', label: 'Donations', value: `Rs ${(stats.donations/1000000).toFixed(1)}M`, growth: '+25%', trend: 'up', icon: <Heart size={24} />, bg: 'bg-pink-50', text: 'text-pink-600' },
 ];

 const QUICK_ACTIONS = [
 { label: 'New Admission', icon: <Plus size={20} />, onClick: () => handleNavigate('admissions') },
 { label: 'Add Student', icon: <User size={20} />, onClick: () => handleNavigate('students', 'add') },
 { label: 'Add Faculty', icon: <Users size={20} />, onClick: () => handleNavigate('faculty', 'add') },
 { label: 'Add Course', icon: <BookOpen size={20} />, onClick: () => handleNavigate('courses', 'add') },

 { label: 'Create News', icon: <Megaphone size={20} />, onClick: () => handleNavigate('news', 'create') },
 { label: 'Gen. Challan', icon: <DollarSign size={20} />, onClick: () => handleNavigate('fees', 'generate') },
 { label: 'Open Website', icon: <Globe size={20} />, onClick: () => window.open('/', '_blank') },
 ];

 return (
 <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500 pb-20">
 
 {/* Dashboard Header */}
 <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-200 relative overflow-hidden flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
 <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4"></div>
 <div className="relative z-10">
 <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
 <Calendar size={14} className="text-blue-500" />
 {currentTime ? `${formatDate(currentTime)} • ${formatTime(currentTime)}` : 'Loading...'}
 </p>
 <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Welcome Back,</h1>
 <h2 className="text-4xl md:text-5xl font-black text-blue-900 tracking-tighter mt-1">Professor Dr. Farooq Ali Rabbani</h2>
 <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-slate-100 rounded-full mt-4 border border-slate-200">
 <Shield size={14} className="text-blue-700" />
 <span className="text-xs font-black text-slate-700 uppercase tracking-widest">Principal, Jamia Sher-e-Rabbani</span>
 </div>
 </div>
 <div className="relative z-10 hidden lg:block">
 <div className="w-32 h-32 relative rounded-sm overflow-hidden shadow-sm border border-gray-200 border-4 border-white rotate-3">
 <Image src="/logo.jpeg" alt="Admin" fill className="object-cover" />
 </div>
 </div>
 </div>

 {/* Quick Action Buttons */}
 <div>
 <div className="flex items-center justify-between mb-4">
 <h3 className="text-lg font-black text-slate-800 tracking-tight">Quick Actions</h3>
 </div>
 <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
 {QUICK_ACTIONS.map((action, i) => (
 <button key={i} onClick={action.onClick} className="flex flex-col items-center justify-center gap-3 p-4 bg-white border border-slate-200 rounded-sm hover:bg-blue-50 hover:border-blue-200 hover:text-blue-700 text-slate-600 transition-all group shadow-sm">
 <div className="w-12 h-12 rounded-sm bg-slate-50 group-hover:bg-blue-100 flex items-center justify-center transition-colors">
 {action.icon}
 </div>
 <span className="text-[10px] font-black uppercase tracking-wider text-center">{action.label}</span>
 </button>
 ))}
 </div>
 </div>

 {/* Quick Statistics Cards */}
 <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
 {STATS.map((stat, i) => (
 <div key={i} onClick={() => handleNavigate(stat.id)} className="bg-white p-6 rounded-sm shadow-sm border border-slate-200 relative overflow-hidden group cursor-pointer hover:border-blue-200 hover:shadow-md transition-all">
 <div className="flex justify-between items-start mb-4">
 <div className={`w-12 h-12 rounded-sm flex items-center justify-center ${stat.bg} ${stat.text} transition-transform group-hover:scale-110`}>
 {stat.icon}
 </div>
 <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full uppercase tracking-wider ${stat.trend === 'up' ? 'bg-blue-50 text-blue-600' : 'bg-slate-100 text-slate-500'}`}>
 {stat.trend === 'up' && <ArrowUpRight size={12} />}
 {stat.growth}
 </div>
 </div>
 <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-1">{stat.label}</p>
 <h4 className="text-3xl font-black text-slate-900 tracking-tighter">{stat.value}</h4>
 <button className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity text-blue-600 hover:text-blue-800">
 <ArrowRightCircle size={24} />
 </button>
 </div>
 ))}
 </div>

 {/* Middle Section: Recent Admissions & Timeline */}
 <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
 <div className="lg:col-span-2 bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden flex flex-col">
 <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
 <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2"><Clock size={20} className="text-blue-600"/> Recent Admissions</h3>
 <button onClick={() => handleNavigate('admissions')} className="text-xs font-black text-blue-600 uppercase tracking-widest hover:underline">View All</button>
 </div>
 <div className="flex-1 overflow-x-auto">
 <table className="w-full text-left border-collapse">
 <thead>
 <tr className="bg-slate-50">
 <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Student Name</th>
 <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Class</th>
 <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Type</th>
 <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Date</th>
 <th className="px-6 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Status</th>
 </tr>
 </thead>
 <tbody className="divide-y divide-slate-100">
 {admissions.slice(0, 4).map((row, i) => (
 <tr key={i} className="hover:bg-slate-50 transition-colors cursor-pointer" onClick={() => { handleNavigate('admissions'); setSelectedApplication(row); }}>
 <td className="px-6 py-4">
 <div className="font-black text-sm text-slate-800">{row.studentName}</div>
 <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider mt-0.5">S/O {row.fatherName}</div>
 </td>
 <td className="px-6 py-4"><span className="text-xs font-bold text-slate-600 bg-slate-100 px-3 py-1 rounded-full">{row.classProgram}</span></td>
 <td className="px-6 py-4 text-xs font-bold text-slate-600">{row.sectionType}</td>
 <td className="px-6 py-4 text-xs font-bold text-slate-500">{new Date(row.date).toLocaleDateString()}</td>
 <td className="px-6 py-4">
 <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest bg-amber-50 text-amber-600`}>Pending</span>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </div>
 </div>

 <div className="bg-white rounded-sm border border-slate-200 shadow-sm overflow-hidden flex flex-col">
 <div className="p-6 border-b border-slate-100 bg-slate-50/50">
 <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2"><Activity size={20} className="text-indigo-600"/> Recent Activities</h3>
 </div>
 <div className="p-6 flex-1 overflow-y-auto">
 <div className="space-y-6 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before: before:from-transparent before:via-slate-200 before:to-transparent">
 {[
 { text: 'New admission application submitted by Usama', time: '10 mins ago', icon: <FileText size={12} />, color: 'bg-blue-500', act: () => handleNavigate('admissions') },
 { text: 'Prof. Qasim updated Khasa syllabus', time: '1 hour ago', icon: <BookOpen size={12} />, color: 'bg-blue-500', act: () => handleNavigate('courses') },
 { text: 'Challan generated for Aliya Part 1', time: '3 hours ago', icon: <DollarSign size={12} />, color: 'bg-amber-500', act: () => handleNavigate('fees') },
 { text: 'News article "Annual Results" published', time: 'Yesterday', icon: <Megaphone size={12} />, color: 'bg-rose-500', act: () => handleNavigate('news') },
 { text: 'Almiya result uploaded successfully', time: 'Yesterday', icon: <Award size={12} />, color: 'bg-indigo-500', act: () => handleNavigate('results') },
 ].map((act, i) => (
 <div key={i} onClick={act.act} className="cursor-pointer relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active hover:-translate-y-1 transition-transform">
 <div className={`flex items-center justify-center w-6 h-6 rounded-full border-4 border-white ${act.color} text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm relative z-10`}>
 {act.icon}
 </div>
 <div className="w-[calc(100%-3rem)] md:w-[calc(50%-2rem)] p-4 rounded-sm bg-slate-50 border border-slate-100 shadow-sm group-hover:border-slate-300">
 <p className="text-xs font-bold text-slate-700 leading-snug">{act.text}</p>
 <span className="text-[9px] font-black uppercase tracking-wider text-slate-400 mt-2 block">{act.time}</span>
 </div>
 </div>
 ))}
 </div>
 </div>
 </div>
 </div>

 </div>
 );
 };

 const renderContent = () => {
 switch (activeTab) {
 case 'overview': return renderOverview();
 case 'admissions': return renderAdmissionsModule();

    case 'form-builder': return <AdmissionFormBuilderModule />;
 case 'students': return renderStudentsModule();
 case 'faculty': return renderFacultyModule();
 case 'courses': return renderCoursesModule();

 case 'fees': return renderFeesModule();
    case 'expenses': return <ExpenseManagementModule />;
    case 'fee-management': return <FeeManagementModule />;
 default:
 const moduleDetails = SIDEBAR_ITEMS.find(i => i.id === activeTab);
 return (
 <div className="flex flex-col items-center justify-center h-full min-h-[60vh] text-center animate-in fade-in zoom-in-95 duration-500">
 <div className="w-32 h-32 bg-slate-100 rounded-sm flex items-center justify-center text-slate-300 mb-8 shadow-inner border-4 border-white rotate-3">
 {moduleDetails?.icon && <div className="scale-[2.5]">{moduleDetails.icon}</div>}
 </div>
 <h2 className="text-4xl font-black text-slate-800 tracking-tighter mb-4">{moduleDetails?.label} Module</h2>
 <p className="text-slate-500 max-w-lg mb-8 leading-relaxed font-medium">This module is currently under development.</p>
 <button onClick={() => handleNavigate('overview')} className="px-8 py-3 bg-slate-900 text-white rounded-full font-black text-xs uppercase tracking-widest hover:bg-blue-700 transition-colors shadow-sm shadow-slate-900/20">Return to Dashboard Overview</button>
 </div>
 );
 }
 };

 return (
    <div className="flex h-screen bg-slate-50 overflow-hidden font-sans selection:bg-blue-100 selection:text-blue-900">
      
      {/* Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
 <motion.div 
 initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
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
 {SIDEBAR_ITEMS.slice(0, 10).map((item) => (
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
          <button onClick={() => window.location.reload()} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-700 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            Refresh Data
          </button>
        </div>

 
 {/* Topbar */}
 <header className="h-20 bg-white border-b border-slate-200 flex items-center justify-between px-6 lg:px-10 shrink-0 z-10 shadow-sm print:hidden">
 <div className="flex items-center gap-4">
 <button onClick={() => setSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-400 hover:text-slate-800 hover:bg-slate-100 rounded-sm transition-colors">
 <Menu size={24} />
 </button>
 <h1 className="text-xl font-black text-slate-800 capitalize tracking-tight hidden sm:block">
 {SIDEBAR_ITEMS.find(i => i.id === activeTab)?.label} {subView && <span className="text-blue-600 ml-2">/ {subView}</span>}
 </h1>
 </div>
 
 <div className="flex items-center gap-4">
 <button onClick={fetchAllData} className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-sm transition-all">
 <RefreshCcw size={20} className={loading ? 'animate-spin' : ''} />
 </button>
 <button className="p-2.5 text-slate-400 hover:text-amber-600 hover:bg-amber-50 rounded-sm transition-all relative">
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
 </div>
 );
}

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

 useEffect(() => {
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
 const [bankConfig, setBankConfig] = useState({ bankName: '', accountTitle: '', accountNumber: '' });
 const [saving, setSaving] = useState(false);

 useEffect(() => {
 fetch('/api/bank-config')
 .then(res => res.json())
 .then(data => setBankConfig(data))
 .catch(console.error);
 }, []);

 const handleSave = async (e: React.FormEvent) => {
 e.preventDefault();
 setSaving(true);
 await fetch('/api/admin/bank-config', {
 method: 'POST', headers: { 'Content-Type': 'application/json' },
 body: JSON.stringify(bankConfig)
 });
 setSaving(false);
 onClose();
 };

 return (
 <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 p-4">
 <div className="bg-white w-full max-w-lg rounded-sm shadow-sm border border-gray-200 flex flex-col overflow-hidden">
 <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
 <h2 className="text-xl font-black text-slate-800 flex items-center gap-2"><Landmark className="text-indigo-600"/> Bank Account Settings</h2>
 <button onClick={onClose} className="text-slate-400 hover:text-slate-800"><X size={24}/></button>
 </div>
 <form onSubmit={handleSave} className="p-6 space-y-6">
 <div>
 <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Bank Name</label>
 <input type="text" required value={bankConfig.bankName} onChange={e => setBankConfig({...bankConfig, bankName: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-sm font-bold focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
 </div>
 <div>
 <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Account Title</label>
 <input type="text" required value={bankConfig.accountTitle} onChange={e => setBankConfig({...bankConfig, accountTitle: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-sm font-bold focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
 </div>
 <div>
 <label className="block text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">Account Number</label>
 <input type="text" required value={bankConfig.accountNumber} onChange={e => setBankConfig({...bankConfig, accountNumber: e.target.value})} className="w-full px-4 py-2 border border-slate-200 rounded-sm font-bold focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 outline-none" />
 </div>
 <div className="flex gap-4 pt-4 border-t border-slate-100">
 <button type="submit" disabled={saving} className="flex-1 py-3 bg-indigo-600 text-white rounded-sm font-black uppercase tracking-widest text-xs hover:bg-indigo-700 transition-colors disabled:opacity-50">{saving ? 'Saving...' : 'Save Settings'}</button>
 <button type="button" onClick={onClose} className="flex-1 py-3 bg-slate-100 text-slate-600 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-slate-200 transition-colors">Cancel</button>
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
 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-6">Phase 1 Preset: Rs. {fs.phase1Fee + fs.registrationFee}</p>
 
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
