'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { 
  BookOpen, Search, ArrowLeft, CheckCircle2, AlertCircle, Archive, Trash2, 
  Star, FileText, Book, Users, Download, PlaySquare, Play, Globe, Clock, 
  CheckSquare as CheckSquareIcon, Square, Eye, Copy 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { Course } from './types';

interface CoursesModuleProps {
  courses: Course[];
  fetchAllData: () => void;
  handlePrint?: () => void;
  handleDownloadPDF?: (title: string) => void;
}

export default function CoursesModule({ 
  courses, 
  fetchAllData,
  handlePrint = () => window.print(),
  handleDownloadPDF = (t: string) => alert(`Downloading ${t}...`)
}: CoursesModuleProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [classFilter, setClassFilter] = useState('All');
  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

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
          setSelectedCourse({ ...selectedCourse, [field]: value });
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

          <div className="space-y-8">
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
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <div onClick={() => setStatusFilter('All')} className={`p-4 rounded-sm border shadow-sm text-center cursor-pointer hover:shadow-md transition-all ${statusFilter === 'All' ? 'bg-indigo-800 border-indigo-900 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${statusFilter === 'All' ? 'text-indigo-300' : 'text-slate-400'}`}>Total Courses</p>
          <p className="text-3xl font-black">{total}</p>
        </div>
        <div onClick={() => setStatusFilter('Active')} className={`p-4 rounded-sm border shadow-sm text-center cursor-pointer hover:shadow-md transition-all ${statusFilter === 'Active' ? 'bg-blue-600 border-blue-700 text-white' : 'bg-blue-50 border-blue-100 text-blue-700'}`}>
          <p className={`text-[10px] font-black uppercase tracking-widest mb-1 ${statusFilter === 'Active' ? 'text-blue-200' : 'text-blue-600/70'}`}>Active Courses</p>
          <p className="text-3xl font-black">{active}</p>
        </div>
        <div className="p-4 rounded-sm border shadow-sm text-center bg-amber-50 border-amber-100 text-amber-700">
          <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-amber-600/70">Featured</p>
          <p className="text-3xl font-black">{featured}</p>
        </div>
        <div className="p-4 rounded-sm border shadow-sm text-center bg-blue-50 border-blue-100 text-blue-700">
          <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-blue-600/70">Enrollments</p>
          <p className="text-3xl font-black">{totalEnrollments}</p>
        </div>
        <div className="p-4 rounded-sm border shadow-sm text-center bg-rose-50 border-rose-100 text-rose-700">
          <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-rose-600/70">Total PDFs</p>
          <p className="text-3xl font-black">{totalPdfs}</p>
        </div>
        <div className="p-4 rounded-sm border shadow-sm text-center bg-red-50 border-red-100 text-red-700">
          <p className="text-[10px] font-black uppercase tracking-widest mb-1 text-red-600/70">Playlists</p>
          <p className="text-3xl font-black">{totalPlaylists}</p>
        </div>
      </div>

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
}
