'use client';

import React, { useState } from 'react';
import { Search, Award, CheckCircle2, XCircle, ArrowLeft, Printer } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';

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
  status: string;
  outcome: string;
}

export default function ResultsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchYear, setSearchYear] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<Result | null>(null);

  // Available sessions/years
  const sessions = ['2023-24', '2024-25', '2025-26', '2026-27'];

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim() || !searchYear) return;
    
    setLoading(true);
    setError('');
    setResult(null);

    try {
      // Fetch public results
      const res = await fetch('http://localhost:5000/api/results');
      if (!res.ok) throw new Error('Failed to fetch results');
      const data: Result[] = await res.json();

      // Only published results can be searched by the public
      const publishedResults = data.filter(r => r.status === 'Published');
      
      const foundResult = publishedResults.find(r => 
        (r.rollNo.toLowerCase() === searchTerm.toLowerCase() || 
         r.studentId.toLowerCase() === searchTerm.toLowerCase()) &&
        r.session === searchYear
      );

      if (foundResult) {
        setResult(foundResult);
      } else {
        setError('No published result found for the given Roll/Registration Number and Year.');
      }
    } catch (err) {
      setError('An error occurred while fetching the result. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900 flex flex-col">
      <Header />
      
      {/* --- HERO SECTION --- */}
      {!result && (
        <section className="relative pt-24 pb-20 bg-white border-b border-gray-200 print:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-block bg-purple-50 border border-purple-200 text-purple-600 rounded-full text-xs font-bold px-4 py-1.5 mb-6 uppercase tracking-wide shadow-sm">
                Annual Examination Results
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 mb-6 leading-tight">
                Academic Excellence <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 drop-shadow-sm">Portal</span>
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-10">
                Access your official examination results, verify your academic standing, and download your provisional result cards directly from the Jamia Sher-e-Rabbani database.
              </p>
              
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 text-rose-700 text-sm font-bold bg-rose-50 px-4 py-2 border border-rose-200 rounded-full shadow-sm"><CheckCircle2 size={16} className="text-rose-500" /> Fast Verification</div>
                <div className="flex items-center gap-2 text-amber-700 text-sm font-bold bg-amber-50 px-4 py-2 border border-amber-200 rounded-full shadow-sm"><Printer size={16} className="text-amber-500" /> Print-Ready Cards</div>
                <div className="flex items-center gap-2 text-emerald-700 text-sm font-bold bg-emerald-50 px-4 py-2 border border-emerald-200 rounded-full shadow-sm"><Award size={16} className="text-emerald-500" /> Secure Records</div>
              </div>
            </div>
          </div>
        </section>
      )}

      <main className={`flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 print:p-0 print:m-0 ${!result ? 'py-16' : 'py-12'}`}>
        
        {/* Search Section */}
        {!result && (
          <div className="max-w-xl mx-auto bg-white border border-slate-100 p-8 rounded-3xl shadow-lg shadow-purple-500/5">
            <div className="flex items-center justify-center text-purple-600 mb-6 bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <Search size={32} className="text-purple-600" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 text-center mb-2">Find Your Result</h2>
            <p className="text-gray-600 text-center text-sm mb-8">Please enter your assigned Roll Number (e.g. ALI-102)</p>
            
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <input 
                    type="text" 
                    placeholder="Roll No or Reg No..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-colors text-gray-900 uppercase"
                    required
                  />
                </div>
                <div>
                  <select
                    value={searchYear}
                    onChange={(e) => setSearchYear(e.target.value)}
                    className="w-full px-4 py-3 bg-white border border-slate-200 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-colors text-gray-900 uppercase appearance-none"
                    required
                  >
                    <option value="" disabled>Select Year</option>
                    {sessions.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-md transition-all disabled:opacity-70 flex justify-center items-center gap-2 uppercase tracking-wide text-sm transform hover:-translate-y-1"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>Search Result <ArrowLeft className="rotate-180" size={16} /></>
                )}
              </button>
            </form>

            {error && (
              <div className="mt-4 p-4 bg-red-50 border border-red-200 text-red-700 text-sm font-semibold flex items-start gap-2">
                <XCircle size={18} className="shrink-0 mt-0.5" />
                <p>{error}</p>
              </div>
            )}
          </div>
        )}

        {/* General Instructions & Grading System (Visible on Landing Page) */}
        {!result && (
          <div className="max-w-5xl mx-auto mt-16 grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 overflow-x-hidden">
            {/* Grading Scale */}
            <div className="bg-white p-4 md:p-8 border border-slate-100 shadow-sm rounded-xl md:rounded-2xl transform hover:-translate-y-1 transition-all overflow-x-auto">
              <h3 className="font-semibold text-gray-900 uppercase tracking-wide text-[10px] md:text-sm mb-3 md:mb-6 flex items-center gap-1 md:gap-2">
                <Award className="w-4 h-4 md:w-[18px] md:h-[18px] text-amber-500" /> <span className="hidden md:inline">Grading System</span><span className="md:hidden">Grading</span>
              </h3>
              <div className="border border-gray-200">
                <table className="w-full text-[8px] md:text-xs text-gray-600">
                  <thead className="bg-white border-b border-gray-200 text-gray-500 font-semibold uppercase tracking-wide">
                    <tr>
                      <th className="py-2 md:py-3 px-2 md:px-4 text-left font-semibold">Percentage</th>
                      <th className="py-2 md:py-3 px-2 md:px-4 text-center border-x border-gray-200 font-semibold">Grade</th>
                      <th className="py-2 md:py-3 px-2 md:px-4 text-left font-semibold hidden md:table-cell">Remarks</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 font-medium">
                    <tr className="hover:bg-white">
                      <td className="py-2 md:py-3 px-2 md:px-4">90% - 100%</td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-center text-emerald-600 border-x border-slate-100 font-bold">A+</td>
                      <td className="py-2 md:py-3 px-2 md:px-4 hidden md:table-cell">Mumtaz (Outstanding)</td>
                    </tr>
                    <tr className="hover:bg-white">
                      <td className="py-2 md:py-3 px-2 md:px-4">80% - 89%</td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-center text-emerald-500 border-x border-slate-100 font-bold">A</td>
                      <td className="py-2 md:py-3 px-2 md:px-4 hidden md:table-cell">Jayyid Jiddan (Excellent)</td>
                    </tr>
                    <tr className="hover:bg-white">
                      <td className="py-2 md:py-3 px-2 md:px-4">70% - 79%</td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-center text-gray-900 border-x border-gray-100 font-semibold">B</td>
                      <td className="py-2 md:py-3 px-2 md:px-4 hidden md:table-cell">Jayyid (Very Good)</td>
                    </tr>
                    <tr className="hover:bg-white">
                      <td className="py-2 md:py-3 px-2 md:px-4">60% - 69%</td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-center text-gray-900 border-x border-gray-100 font-semibold">C</td>
                      <td className="py-2 md:py-3 px-2 md:px-4 hidden md:table-cell">Maqbool (Good)</td>
                    </tr>
                    <tr className="hover:bg-white">
                      <td className="py-2 md:py-3 px-2 md:px-4">50% - 59%</td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-center text-gray-900 border-x border-gray-100 font-semibold">D</td>
                      <td className="py-2 md:py-3 px-2 md:px-4 hidden md:table-cell">Naajih (Pass)</td>
                    </tr>
                    <tr className="hover:bg-red-50 bg-red-50/50">
                      <td className="py-2 md:py-3 px-2 md:px-4 text-red-700">Below 50%</td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-center text-red-700 border-x border-red-100 font-semibold">F</td>
                      <td className="py-2 md:py-3 px-2 md:px-4 text-red-700 hidden md:table-cell">Rasib (Fail)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Important Instructions */}
            <div className="bg-white p-4 md:p-8 border border-slate-100 shadow-sm rounded-xl md:rounded-2xl transform hover:-translate-y-1 transition-all">
              <h3 className="font-semibold text-gray-900 uppercase tracking-wide text-[10px] md:text-sm mb-3 md:mb-6 flex items-center gap-1 md:gap-2">
                <CheckCircle2 className="w-4 h-4 md:w-[18px] md:h-[18px] text-emerald-500" /> <span className="hidden md:inline">General Instructions</span><span className="md:hidden">Instructions</span>
              </h3>
              <ul className="text-[9px] md:text-sm text-gray-600 space-y-2 md:space-y-4 pl-1 md:pl-0">
                <li className="flex gap-1 md:gap-3 items-start">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mt-1 md:mt-1.5 shrink-0 shadow-sm"></span>
                  <span>Results are officially announced by the Controller of Examinations.</span>
                </li>
                <li className="flex gap-1 md:gap-3 items-start">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mt-1 md:mt-1.5 shrink-0 shadow-sm"></span>
                  <span>Enter your exact Roll Number and session.</span>
                </li>
                <li className="flex gap-1 md:gap-3 items-start">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mt-1 md:mt-1.5 shrink-0 shadow-sm"></span>
                  <span>This portal provides provisional results.</span>
                </li>
                <li className="flex gap-1 md:gap-3 items-start hidden md:flex">
                  <span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mt-1.5 shrink-0 shadow-sm"></span>
                  <span>For any discrepancies, contact Examination Office within 15 days.</span>
                </li>
                <li className="flex gap-1 md:gap-3 items-start">
                  <span className="w-1 h-1 md:w-1.5 md:h-1.5 bg-gray-400 mt-1 md:mt-1.5 shrink-0"></span>
                  <span>Official certificates must be physically collected.</span>
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* Result Card Section */}
        {result && (
          <div>
            <div className="flex justify-between items-center mb-6 max-w-4xl mx-auto print:hidden">
              <button onClick={() => {setResult(null); setSearchTerm('');}} className="px-4 py-2 bg-white text-gray-600 font-semibold text-sm border border-slate-200 hover:text-gray-900 hover:bg-white transition-colors flex items-center gap-2"><ArrowLeft size={16}/> Back to Search</button>
              <button onClick={() => window.print()} className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold text-sm hover:from-rose-600 hover:to-orange-600 rounded-full transition-all flex items-center gap-2 tracking-wide uppercase shadow-lg shadow-rose-500/30 transform hover:-translate-y-1"><Printer size={16}/> Print PDF</button>
            </div>

            {/* Printable Area */}
            <div className="p-10 max-w-4xl mx-auto bg-white border border-slate-200 print:border-none print:p-0 print:m-0">
                {/* Header */}
                <div className="text-center pb-6 border-b-2 border-gray-900 mb-8 relative">
                   <div className="absolute left-0 top-0 opacity-10 print:opacity-20 pointer-events-none">
                     <Image src="/logo.jpeg" alt="Watermark" width={100} height={100} className="grayscale" />
                   </div>
                   <h1 className="text-3xl font-semibold text-gray-900 mb-1">JAMIA SHER-E-RABBANI</h1>
                   <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Mananwala, District Sheikhupura</p>
                   <h2 className="text-xl font-semibold text-gray-900 mt-6 tracking-wide border border-gray-900 inline-block px-6 py-1">OFFICIAL RESULT CARD</h2>
                </div>
                
                {/* Student Info */}
                <div className="grid grid-cols-2 gap-x-12 gap-y-4 mb-8">
                   <div className="flex border-b border-gray-200 pb-2">
                      <span className="w-40 font-semibold text-gray-500 uppercase text-xs tracking-wide">Student Name</span>
                      <span className="font-semibold text-gray-900">{result.studentName}</span>
                   </div>
                   <div className="flex border-b border-gray-200 pb-2">
                      <span className="w-40 font-semibold text-gray-500 uppercase text-xs tracking-wide">Father's Name</span>
                      <span className="font-semibold text-gray-900">{result.fatherName}</span>
                   </div>
                   <div className="flex border-b border-gray-200 pb-2">
                      <span className="w-40 font-semibold text-gray-500 uppercase text-xs tracking-wide">Roll Number</span>
                      <span className="font-semibold text-gray-900">{result.rollNo}</span>
                   </div>
                   <div className="flex border-b border-gray-200 pb-2">
                      <span className="w-40 font-semibold text-gray-500 uppercase text-xs tracking-wide">Student ID</span>
                      <span className="font-semibold text-gray-900">{result.studentId}</span>
                   </div>
                   <div className="flex border-b border-gray-200 pb-2">
                      <span className="w-40 font-semibold text-gray-500 uppercase text-xs tracking-wide">Class / Program</span>
                      <span className="font-semibold text-gray-900">{result.classProgram}</span>
                   </div>
                   <div className="flex border-b border-gray-200 pb-2">
                      <span className="w-40 font-semibold text-gray-500 uppercase text-xs tracking-wide">Session</span>
                      <span className="font-semibold text-gray-900">{result.session}</span>
                   </div>
                </div>

                {/* Marks Table */}
                <table className="w-full text-left border-collapse border border-gray-900 mb-8">
                   <thead>
                      <tr className="bg-gray-100 text-gray-900">
                         <th className="border border-gray-900 px-4 py-2 font-semibold text-xs uppercase tracking-wide">Subject</th>
                         <th className="border border-gray-900 px-4 py-2 font-semibold text-xs uppercase tracking-wide text-center w-32">Total Marks</th>
                         <th className="border border-gray-900 px-4 py-2 font-semibold text-xs uppercase tracking-wide text-center w-32">Obtained</th>
                         <th className="border border-gray-900 px-4 py-2 font-semibold text-xs uppercase tracking-wide text-center w-32">Grade</th>
                      </tr>
                   </thead>
                   <tbody>
                      {result.subjects?.map((sub, idx) => {
                         const subPercent = (sub.obtained / sub.total) * 100;
                         let subGrade = 'F';
                         if (subPercent >= 80) subGrade = 'A+';
                         else if (subPercent >= 70) subGrade = 'A';
                         else if (subPercent >= 60) subGrade = 'B';
                         else if (subPercent >= 50) subGrade = 'C';
                         else if (subPercent >= 40) subGrade = 'D';
                         return (
                            <tr key={idx}>
                               <td className="border border-gray-900 px-4 py-2 text-gray-800">{sub.subject}</td>
                               <td className="border border-gray-900 px-4 py-2 text-gray-800 text-center">{sub.total}</td>
                               <td className="border border-gray-900 px-4 py-2 font-semibold text-gray-900 text-center">{sub.obtained}</td>
                               <td className="border border-gray-900 px-4 py-2 font-semibold text-gray-900 text-center">{subGrade}</td>
                            </tr>
                         );
                      })}
                   </tbody>
                   <tfoot>
                      <tr className="bg-white">
                         <td className="border border-gray-900 px-4 py-2 font-semibold text-gray-900 text-right uppercase tracking-wide text-sm">Grand Total</td>
                         <td className="border border-gray-900 px-4 py-2 font-semibold text-gray-900 text-center text-base">{result.totalMarks}</td>
                         <td className="border border-gray-900 px-4 py-2 font-semibold text-gray-900 text-center text-base">{result.obtainedMarks}</td>
                         <td className="border border-gray-900 px-4 py-2 bg-gray-100 text-center"></td>
                      </tr>
                   </tfoot>
                </table>

                {/* Summary & Signatures */}
                <div className="flex justify-between items-end mt-12 border-t-2 border-gray-900 pt-6">
                   <div className="space-y-3">
                      <div className="flex items-center gap-4">
                         <span className="w-32 font-semibold text-gray-500 uppercase text-xs tracking-wide">Percentage</span>
                         <span className="font-semibold text-lg text-gray-900">{result.percentage}%</span>
                      </div>
                      <div className="flex items-center gap-4">
                         <span className="w-32 font-semibold text-gray-500 uppercase text-xs tracking-wide">Overall Grade</span>
                         <span className="font-semibold text-xl text-gray-900">{result.grade}</span>
                      </div>
                      <div className="flex items-center gap-4">
                         <span className="w-32 font-semibold text-gray-500 uppercase text-xs tracking-wide">Result Status</span>
                         <span className={`font-semibold text-xl uppercase tracking-wide ${result.outcome === 'Pass' ? 'text-gray-900' : 'text-red-700'}`}>
                           {result.outcome}
                         </span>
                      </div>
                   </div>
                   <div className="text-center">
                      <div className="w-48 border-b border-gray-900 mb-2"></div>
                      <span className="font-semibold text-gray-600 uppercase text-[10px] tracking-wide">Signature Controller of Exams</span>
                   </div>
                </div>

                {/* Grading System & Instructions */}
                <div className="mt-6 md:mt-12 grid grid-cols-2 md:grid-cols-2 gap-4 md:gap-8 border-t border-slate-200 pt-6">
                  {/* Grading Scale */}
                  <div>
                    <h3 className="font-semibold text-gray-900 uppercase tracking-wide text-[9px] md:text-xs mb-2 md:mb-3 flex items-center gap-2">
                      Grading System
                    </h3>
                    <table className="w-full text-[8px] md:text-[10px] uppercase tracking-wide text-gray-600 border border-slate-200">
                      <thead className="bg-white text-gray-500 font-semibold">
                        <tr>
                          <th className="py-1 border border-slate-200 text-left px-1 md:px-2">Percent</th>
                          <th className="py-1 border border-slate-200 text-center px-1 md:px-2">Grade</th>
                          <th className="py-1 border border-slate-200 text-left px-1 md:px-2 hidden md:table-cell">Remarks</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="py-1 border border-slate-200 px-1 md:px-2">90-100%</td>
                          <td className="py-1 border border-slate-200 text-center text-gray-900 font-semibold">A+</td>
                          <td className="py-1 border border-slate-200 px-1 md:px-2 hidden md:table-cell">Mumtaz</td>
                        </tr>
                        <tr>
                          <td className="py-1 border border-slate-200 px-1 md:px-2">80-89%</td>
                          <td className="py-1 border border-slate-200 text-center text-gray-900 font-semibold">A</td>
                          <td className="py-1 border border-slate-200 px-1 md:px-2 hidden md:table-cell">Jayyid Jiddan</td>
                        </tr>
                        <tr>
                          <td className="py-1 border border-slate-200 px-1 md:px-2">70-79%</td>
                          <td className="py-1 border border-slate-200 text-center text-gray-900 font-semibold">B</td>
                          <td className="py-1 border border-slate-200 px-1 md:px-2 hidden md:table-cell">Jayyid</td>
                        </tr>
                        <tr>
                          <td className="py-1 border border-slate-200 px-1 md:px-2">60-69%</td>
                          <td className="py-1 border border-slate-200 text-center text-gray-900 font-semibold">C</td>
                          <td className="py-1 border border-slate-200 px-1 md:px-2 hidden md:table-cell">Maqbool</td>
                        </tr>
                        <tr>
                          <td className="py-1 border border-slate-200 px-1 md:px-2">50-59%</td>
                          <td className="py-1 border border-slate-200 text-center text-gray-900 font-semibold">D</td>
                          <td className="py-1 border border-slate-200 px-1 md:px-2 hidden md:table-cell">Naajih</td>
                        </tr>
                        <tr>
                          <td className="py-1 border border-slate-200 px-1 md:px-2 text-red-700">&lt;50%</td>
                          <td className="py-1 border border-slate-200 text-center text-red-700 font-semibold">F</td>
                          <td className="py-1 border border-slate-200 px-1 md:px-2 text-red-700 hidden md:table-cell">Rasib</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Important Instructions */}
                  <div>
                    <h3 className="font-semibold text-gray-900 uppercase tracking-wide text-[9px] md:text-xs mb-2 md:mb-3">Instructions</h3>
                    <ul className="text-[8px] md:text-[10px] text-gray-600 space-y-1.5 list-disc pl-3 md:pl-3 leading-relaxed pr-1">
                      <li>This is a provisional computer-generated result.</li>
                      <li>For official use, a stamped physical copy must be obtained.</li>
                      <li className="hidden md:list-item">In case of any discrepancy, report within 15 days.</li>
                      <li>Any unauthorized tampering will result in action.</li>
                    </ul>
                  </div>
                </div>
                
                {/* Print Footer Watermark */}
                <div className="mt-12 text-center text-gray-400 hidden print:block">
                  <p className="text-[9px] font-semibold uppercase tracking-widest">System Generated Document • Jamia Sher-e-Rabbani • {new Date().getFullYear()}</p>
                </div>
            </div>
          </div>
        )}

      </main>
      <Footer />
    </div>
  );
}
