const fs = require('fs');

let adminPage = fs.readFileSync('frontend/src/app/admin/[[...slug]]/page.tsx', 'utf8');

const dynamicAppViewer = "{Object.entries(selectedApplication)\n  .filter(([key]) => !['id', 'status', 'fees', 'documents', 'challanNo', 'applicationNo', 'date', 'studentName'].includes(key))\n  .map(([key, value]) => (\n    <div key={key}>\n      <p className=\"text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1\">{key.replace(/([A-Z])/g, ' $1').trim()}</p>\n      <p className=\"text-sm font-bold text-slate-800\">{typeof value === 'string' ? value : JSON.stringify(value)}</p>\n    </div>\n))}";

const oldAppViewer = `<div>
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
 </div>`;

adminPage = adminPage.replace(dynamicAppViewer, oldAppViewer);

const oldAcademicInfo = `<div>
 <h4 className="text-xl font-black text-slate-800 mb-6 flex items-center gap-2"><GraduationCap className="text-blue-600 print:text-black"/> Academic Information</h4>
 <div className="bg-slate-50 p-8 rounded-sm border border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-8 print:bg-white print:border-black print:rounded-none">
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
 <p className="text-sm font-bold text-slate-800 font-mono">{selectedApplication.fees?.session}</p>
 </div>
 </div>
 </div>`;

if(!adminPage.includes('Academic Information')) {
  adminPage = adminPage.replace(
    '{/* Admin Form Viewer Button */}',
    oldAcademicInfo + '\n\n {/* Admin Form Viewer Button */}'
  );
}

fs.writeFileSync('frontend/src/app/admin/[[...slug]]/page.tsx', adminPage, 'utf8');

console.log('Restored page.tsx');
