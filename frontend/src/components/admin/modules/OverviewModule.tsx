'use client';

import React from 'react';
import Image from 'next/image';
import { 
  Calendar, Shield, Plus, User, Users, BookOpen, Download, FileText, 
  DollarSign, Globe, Eye, GraduationCap, Award, Heart, ArrowUpRight, 
  ArrowRightCircle, BarChart2, PieChart as PieChartIcon, TrendingUp 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line 
} from 'recharts';
import { Admission, Challan } from './types';

interface OverviewModuleProps {
  stats: {
    visitorsToday?: number;
    admissions?: number;
    students?: number;
    tulba?: number;
    talibat?: number;
    faculty?: number;
    courses?: number;
    donations?: number;
  };
  admissions: Admission[];
  challans: Challan[];
  currentTime?: Date | null;
  formatDate?: (d: Date) => string;
  formatTime?: (d: Date) => string;
  handleNavigate: (tabId: string, subTab?: string) => void;
}

export default function OverviewModule({
  stats,
  admissions,
  challans,
  currentTime = new Date(),
  formatDate = (d: Date) => d.toLocaleDateString(),
  formatTime = (d: Date) => d.toLocaleTimeString(),
  handleNavigate
}: OverviewModuleProps) {
  const visitorsToday = stats.visitorsToday || 0;
  const totalAdmissions = stats.admissions || 0;
  const tulbaCount = stats.tulba || 0;
  const talibatCount = stats.talibat || 0;
  const totalStudents = stats.students || (tulbaCount + talibatCount);
  const facultyCount = stats.faculty || 0;
  const coursesCount = stats.courses || 0;
  const donationsAmount = stats.donations || 0;

  const STATS = [
    { id: 'reports', label: "Today's Visitors", value: visitorsToday.toString(), growth: 'Live', trend: 'up', icon: <Eye size={24} />, bg: 'bg-emerald-50', text: 'text-emerald-600' },
    { id: 'admissions', label: 'Total Admissions', value: totalAdmissions.toString(), growth: '+15%', trend: 'up', icon: <FileText size={24} />, bg: 'bg-blue-50', text: 'text-blue-600' },
    { id: 'students', label: 'Total Students', value: totalStudents.toString(), growth: '+5%', trend: 'up', icon: <GraduationCap size={24} />, bg: 'bg-blue-50', text: 'text-blue-600' },
    { id: 'students', label: 'Total Tulba', value: tulbaCount.toString(), growth: '+2%', trend: 'up', icon: <User size={24} />, bg: 'bg-indigo-50', text: 'text-indigo-600' },
    { id: 'students', label: 'Total Talibat', value: talibatCount.toString(), growth: '+8%', trend: 'up', icon: <Users size={24} />, bg: 'bg-violet-50', text: 'text-violet-600' },
    { id: 'faculty', label: 'Faculty Members', value: facultyCount.toString(), growth: 'Stable', trend: 'neutral', icon: <Award size={24} />, bg: 'bg-amber-50', text: 'text-amber-600' },
    { id: 'courses', label: 'Total Courses', value: coursesCount.toString(), growth: '+2', trend: 'up', icon: <BookOpen size={24} />, bg: 'bg-cyan-50', text: 'text-cyan-600' },
    { id: 'donations', label: 'Donations', value: `Rs ${(donationsAmount/1000000).toFixed(1)}M`, growth: '+25%', trend: 'up', icon: <Heart size={24} />, bg: 'bg-pink-50', text: 'text-pink-600' },
  ];

  const QUICK_ACTIONS = [
    { label: 'New Admission', icon: <Plus size={20} />, onClick: () => handleNavigate('admissions') },
    { label: 'Add Student', icon: <User size={20} />, onClick: () => handleNavigate('students', 'add') },
    { label: 'Add Faculty', icon: <Users size={20} />, onClick: () => handleNavigate('faculty', 'add') },
    { label: 'Add Course', icon: <BookOpen size={20} />, onClick: () => handleNavigate('courses', 'add') },
    { label: 'Backup JSON', icon: <Download size={20} />, onClick: () => { const a = document.createElement('a'); a.href = '/api/admin/backup'; a.download = 'backup.json'; a.click(); } },
    { label: 'Backup Excel', icon: <FileText size={20} />, onClick: () => { const a = document.createElement('a'); a.href = '/api/admin/backup/excel'; a.download = 'backup.xlsx'; a.click(); } },
    { label: 'Gen. Challan', icon: <DollarSign size={20} />, onClick: () => handleNavigate('fees', 'generate') },
    { label: 'Open Website', icon: <Globe size={20} />, onClick: () => window.open('/', '_blank') },
  ];

  const classCount: Record<string, number> = {};
  admissions.forEach(a => {
    const cls = a.classProgram || 'Unknown';
    classCount[cls] = (classCount[cls] || 0) + 1;
  });
  const classChartData = Object.entries(classCount).map(([name, count]) => ({ name: name.split(' ').slice(0,2).join(' '), count })).sort((a,b)=> b.count - a.count).slice(0, 6);

  let paid = 0; let unpaid = 0;
  challans.forEach(c => c.status === 'Paid' ? paid++ : unpaid++);
  const feeChartData = [{ name: 'Paid', value: paid }, { name: 'Unpaid', value: unpaid }];
  const COLORS = ['#10b981', '#ef4444'];
  const GENDER_COLORS = ['#3b82f6', '#8b5cf6'];

  const trendCount: Record<string, number> = {};
  admissions.forEach(a => {
    if (!a.date) return;
    const dateStr = new Date(a.date).toLocaleDateString('en-GB', { day: '2-digit', month: 'short' });
    trendCount[dateStr] = (trendCount[dateStr] || 0) + 1;
  });
  const trendChartData = Object.entries(trendCount).map(([date, count]) => ({ date, count })).slice(-10);

  const genderChartData = [
    { name: 'Tulba', value: tulbaCount },
    { name: 'Talibat', value: talibatCount }
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
          <div className="w-32 h-32 relative rounded-sm overflow-hidden shadow-sm border-4 border-white rotate-3">
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

      {/* Analytical Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-sm border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2"><BarChart2 size={20} className="text-blue-600"/> Admissions per Program</h3>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={classChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="name" tick={{fontSize: 10, fill: '#64748b', fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 10, fill: '#64748b', fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                <Tooltip cursor={{fill: '#f1f5f9'}} contentStyle={{borderRadius: '4px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Bar dataKey="count" fill="#3b82f6" radius={[4, 4, 0, 0]} maxBarSize={50} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2"><PieChartIcon size={20} className="text-amber-500"/> Fee Collection Status</h3>
          </div>
          <div className="flex-1 min-h-[300px] flex items-center justify-center relative">
            {challans.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={feeChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                    {feeChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)}
                  </Pie>
                  <Tooltip contentStyle={{borderRadius: '4px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                  <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: '12px', fontWeight: 'bold', color: '#64748b'}}/>
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-slate-400 text-sm font-bold uppercase tracking-wider text-center">No Fee Data Available</p>
            )}
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-36px]">
              <span className="text-2xl font-black text-slate-800">{challans.length}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Challans</span>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-sm border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2"><TrendingUp size={20} className="text-indigo-600"/> Admissions Trend</h3>
          </div>
          <div className="flex-1 min-h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={trendChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{fontSize: 10, fill: '#64748b', fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                <YAxis tick={{fontSize: 10, fill: '#64748b', fontWeight: 'bold'}} axisLine={false} tickLine={false} />
                <Tooltip cursor={{stroke: '#cbd5e1', strokeWidth: 2}} contentStyle={{borderRadius: '4px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Line type="monotone" dataKey="count" stroke="#6366f1" strokeWidth={4} dot={{r: 6, fill: '#6366f1', stroke: '#fff', strokeWidth: 2}} activeDot={{r: 8}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-sm border border-slate-200 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-black text-slate-800 tracking-tight flex items-center gap-2"><Users size={20} className="text-rose-500"/> Gender Distribution</h3>
          </div>
          <div className="flex-1 min-h-[300px] flex items-center justify-center relative">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={genderChartData} cx="50%" cy="50%" innerRadius={60} outerRadius={80} paddingAngle={5} dataKey="value" stroke="none">
                  {genderChartData.map((entry, index) => <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />)}
                </Pie>
                <Tooltip contentStyle={{borderRadius: '4px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{fontSize: '12px', fontWeight: 'bold', color: '#64748b'}}/>
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-[-36px]">
              <span className="text-2xl font-black text-slate-800">{tulbaCount + talibatCount}</span>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Students</span>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
