const fs = require('fs');

// 1. Add public student search endpoint to server.js
let serverCode = fs.readFileSync('backend/server.js', 'utf8');
if (!serverCode.includes('/api/public/student-search')) {
  const searchApi = `
// --- Public Student Search (For Roll Number Slips) ---
app.post('/api/public/student-search', (req, res) => {
  const { query } = req.body;
  if (!query) return res.status(400).json({ error: 'Query is required' });
  
  const students = db.get('students').value() || [];
  const student = students.find(s => 
    (s.rollNo && s.rollNo.toLowerCase() === query.toLowerCase()) || 
    (s.cnic && s.cnic.replace(/-/g, '') === query.replace(/-/g, ''))
  );
  
  if (student) {
    // Only return safe public info for slip
    res.json({
      rollNo: student.rollNo,
      studentName: student.studentName,
      fatherName: student.fatherName,
      classProgram: student.classProgram,
      sectionType: student.sectionType,
      session: student.fees?.session || '2026-27'
    });
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

app.listen(PORT`;
  serverCode = serverCode.replace('app.listen(PORT', searchApi);
  fs.writeFileSync('backend/server.js', serverCode, 'utf8');
}

// 2. Create the frontend Roll Number Slip Page
const fs2 = require('fs');
if (!fs2.existsSync('frontend/src/app/roll-number-slip')) {
    fs2.mkdirSync('frontend/src/app/roll-number-slip', { recursive: true });
}

const pageCode = `'use client';

import { useState } from 'react';
import { Search, FileText, CheckCircle2, XCircle, ArrowLeft, Printer } from 'lucide-react';
import Image from 'next/image';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default function RollNumberSlipPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [student, setStudent] = useState<any>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) return;
    
    setLoading(true);
    setError('');
    setStudent(null);

    try {
      const res = await fetch('http://localhost:5000/api/public/student-search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: searchTerm })
      });
      
      const data = await res.json();

      if (res.ok) {
        setStudent(data);
      } else {
        setError(data.error || 'Student not found. Please check your Roll Number or CNIC.');
      }
    } catch (err) {
      setError('An error occurred while connecting to the server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900 flex flex-col">
      <Header />
      
      {!student && (
        <section className="relative pt-24 pb-20 bg-slate-50 border-b border-slate-200 print:hidden">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
            <div className="max-w-3xl mx-auto">
              <div className="inline-block bg-white border border-slate-200 text-slate-700 text-xs font-semibold px-4 py-1.5 mb-6 uppercase tracking-wide">
                Annual Examination
              </div>
              <h1 className="text-4xl md:text-5xl font-semibold text-slate-900 mb-6 leading-tight">
                Roll Number <span className="text-blue-700">Slips</span>
              </h1>
              <p className="text-lg text-slate-600 max-w-2xl mx-auto mb-10">
                Download and print your official Roll Number Slip for the upcoming annual examinations. This slip is mandatory for entry into the examination hall.
              </p>
            </div>
          </div>
        </section>
      )}

      <main className={\`flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-20 print:p-0 print:m-0 \${!student ? 'py-16' : 'py-12'}\`}>
        
        {/* Search Section */}
        {!student && (
          <div className="max-w-xl mx-auto bg-white border border-slate-200 p-8 shadow-sm">
            <div className="flex items-center justify-center text-blue-700 mb-6 mx-auto">
              <Search size={32} />
            </div>
            <h2 className="text-2xl font-semibold text-slate-900 text-center mb-2">Find Your Slip</h2>
            <p className="text-slate-600 text-center text-sm mb-8">Enter your assigned Roll Number or CNIC without dashes.</p>
            
            <form onSubmit={handleSearch} className="space-y-4">
              <div>
                <input 
                  type="text" 
                  placeholder="Roll No (e.g. A-102) or CNIC" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-3 bg-white border border-slate-300 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-colors text-slate-900 uppercase font-bold text-center tracking-widest"
                  required
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-black transition-colors disabled:opacity-70 flex justify-center items-center gap-2 uppercase tracking-widest text-sm rounded-sm"
              >
                {loading ? 'Searching...' : 'Search Record'}
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

        {/* Printable Area */}
        {student && (
          <div>
            <div className="flex justify-between items-center mb-6 max-w-3xl mx-auto print:hidden">
              <button onClick={() => {setStudent(null); setSearchTerm('');}} className="px-4 py-2 bg-white text-slate-600 font-bold text-xs uppercase tracking-widest border border-slate-300 hover:text-slate-900 hover:bg-slate-50 transition-colors flex items-center gap-2 rounded-sm"><ArrowLeft size={16}/> Back</button>
              <button onClick={() => window.print()} className="px-4 py-2 bg-blue-700 text-white font-black text-xs hover:bg-blue-800 transition-colors flex items-center gap-2 tracking-widest uppercase rounded-sm shadow-sm"><Printer size={16}/> Print Slip</button>
            </div>

            <div className="max-w-3xl mx-auto bg-white border-2 border-slate-800 p-8 print:border-2 print:p-8 print:m-0 relative">
                {/* Background Watermark */}
                <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none z-0">
                  <div className="w-96 h-96 relative">
                    <Image src="/logo.jpeg" alt="Watermark" fill className="object-contain grayscale" />
                  </div>
                </div>

                <div className="relative z-10 flex items-start justify-between border-b-2 border-slate-800 pb-6 mb-8">
                  <div className="w-24 h-24 relative border-2 border-slate-200 rounded-sm overflow-hidden bg-white shrink-0">
                     <Image src="/logo.jpeg" alt="Logo" fill className="object-cover" />
                  </div>
                  <div className="text-center flex-1 px-4">
                     <h1 className="text-3xl font-black text-slate-900 tracking-tight uppercase">Jamia Sher-e-Rabbani</h1>
                     <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mt-1">Mananwala, District Sheikhupura</p>
                     <div className="mt-4 inline-block bg-slate-900 text-white px-6 py-1.5 font-black uppercase tracking-[0.2em] text-sm">
                       Official Roll Number Slip
                     </div>
                  </div>
                  <div className="w-24 h-28 border-2 border-dashed border-slate-300 bg-slate-50 flex items-center justify-center shrink-0">
                    <span className="text-[9px] font-bold text-slate-400 uppercase text-center">Paste<br/>Photo<br/>Here</span>
                  </div>
                </div>
                
                <div className="relative z-10 grid grid-cols-2 gap-x-8 gap-y-6 mb-10">
                   <div className="border-b border-slate-300 pb-2">
                      <span className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Student Name</span>
                      <span className="font-black text-lg text-slate-900 uppercase">{student.studentName}</span>
                   </div>
                   <div className="border-b border-slate-300 pb-2">
                      <span className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Father's Name</span>
                      <span className="font-black text-lg text-slate-900 uppercase">{student.fatherName}</span>
                   </div>
                   <div className="border-b border-slate-300 pb-2">
                      <span className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Roll Number</span>
                      <span className="font-black text-2xl text-blue-700 tracking-wider font-mono">{student.rollNo}</span>
                   </div>
                   <div className="border-b border-slate-300 pb-2">
                      <span className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Class / Program</span>
                      <span className="font-black text-lg text-slate-900 uppercase">{student.classProgram}</span>
                   </div>
                   <div className="border-b border-slate-300 pb-2">
                      <span className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Section Type</span>
                      <span className="font-black text-lg text-slate-900 uppercase">{student.sectionType}</span>
                   </div>
                   <div className="border-b border-slate-300 pb-2">
                      <span className="block text-[9px] font-black text-slate-500 uppercase tracking-widest mb-1">Examination Session</span>
                      <span className="font-black text-lg text-slate-900 uppercase">{student.session}</span>
                   </div>
                </div>

                <div className="relative z-10 border-2 border-slate-800 p-4 mb-10 bg-slate-50">
                  <h3 className="font-black text-slate-900 uppercase tracking-widest text-xs mb-3 border-b border-slate-300 pb-2 flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-blue-700" /> Examination Rules & Guidelines
                  </h3>
                  <ul className="text-[10px] text-slate-700 font-bold space-y-2 uppercase list-disc pl-4 leading-relaxed">
                    <li>This Roll Number Slip is mandatory. No student will be allowed entry without it.</li>
                    <li>Students must arrive at the examination hall 30 minutes before the paper starts.</li>
                    <li>Mobile phones, smartwatches, and study materials are strictly prohibited inside the hall.</li>
                    <li>Any form of cheating or indiscipline will result in immediate cancellation of the paper.</li>
                    <li>Bring your own stationery. Borrowing items during the exam is not allowed.</li>
                  </ul>
                </div>

                <div className="relative z-10 flex justify-between items-end mt-16 pt-4 border-t-2 border-slate-800">
                   <div className="text-center">
                      <div className="w-48 border-b border-slate-800 mb-2"></div>
                      <span className="font-black text-slate-600 uppercase text-[9px] tracking-widest">Student Signature</span>
                   </div>
                   <div className="text-center">
                      <div className="w-48 border-b border-slate-800 mb-2"></div>
                      <span className="font-black text-slate-600 uppercase text-[9px] tracking-widest">Controller of Examinations</span>
                   </div>
                </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
`;
fs.writeFileSync('frontend/src/app/roll-number-slip/page.tsx', pageCode, 'utf8');

console.log('Roll Number Slip portal created.');
