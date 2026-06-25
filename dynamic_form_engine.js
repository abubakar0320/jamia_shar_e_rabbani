const fs = require('fs');

// 1. Update AdmissionForm.tsx
let formCode = fs.readFileSync('frontend/src/components/AdmissionForm.tsx', 'utf8');

// We will replace the entire render form logic with a dynamic loop!
// But wait, the file is 600 lines long. We should write a clean script to replace the entire <form> block.
// To be safe, let's just write a completely new dynamic AdmissionForm.tsx!

const newFormCode = `'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Upload, CheckCircle2, X, ChevronRight, Search } from 'lucide-react';

export default function AdmissionForm({ onSuccess }: { onSuccess: (data: any) => void }) {
  const { t } = useTranslation();
  const [fields, setFields] = useState<any[]>([]);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [documents, setDocuments] = useState<Record<string, any>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/admission-requirements?t=' + Date.now())
      .then(res => res.json())
      .then(data => {
        setFields(data || []);
        setLoading(false);
      });
  }, []);

  const handleFileUpload = (fieldTitle: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert(t("File size should be less than 5MB"));
        return;
      }
      setDocuments(prev => ({
        ...prev,
        [fieldTitle]: { name: file.name, size: (file.size / 1024).toFixed(1) + ' KB', type: file.type }
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    for (const f of fields) {
      if (f.required) {
        if (f.type === 'file' && !documents[f.title]) {
          alert(\`Please upload \${f.title}\`);
          return;
        }
        if (f.type !== 'file' && !formData[f.title]) {
          alert(\`Please fill out \${f.title}\`);
          return;
        }
      }
    }

    const submissionData = {
      ...formData,
      documents,
      // For legacy compat in backend fee generator:
      studentName: formData['Student Full Name'] || formData['Student Name'] || 'Student',
      fatherName: formData['Father Name'] || 'Father',
      classProgram: formData['Admission Class'] || formData['Class / Program'] || formData['Select Admission Class'] || formData['Class'] || 'General',
      sectionType: formData['Admission Section'] || formData['Select Admission Section'] || 'General',
    };

    try {
      const res = await fetch('http://localhost:5000/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(submissionData)
      });
      const data = await res.json();
      if (data.success) {
        onSuccess(data.admission);
      } else {
        alert(data.error || 'Failed to submit application');
      }
    } catch (err) {
      console.error(err);
      alert('Network error');
    }
  };

  if (loading) return <div className="p-12 text-center font-bold text-gray-500">Loading Form...</div>;

  const textFields = fields.filter(f => f.type !== 'file');
  const fileFields = fields.filter(f => f.type === 'file');

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-xl shadow-gray-200/50 border border-gray-200 p-8 rounded-sm">
      <h2 className="text-3xl font-black text-gray-900 mb-8 tracking-tight uppercase text-center border-b-4 border-blue-700 pb-4 inline-block mx-auto">
        Admission Application Form
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-10">
        
        {textFields.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">Application Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {textFields.map(field => (
                <div key={field.id} className={field.type === 'select' ? 'md:col-span-2' : ''}>
                  <label className="block text-xs font-semibold tracking-wide text-gray-700 uppercase mb-2">
                    {field.title} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  
                  {field.type === 'select' ? (
                    <select 
                      required={field.required}
                      value={formData[field.title] || ''}
                      onChange={e => setFormData({...formData, [field.title]: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 focus:border-blue-700 font-bold text-gray-900"
                    >
                      <option value="">-- Select {field.title} --</option>
                      {(field.options || '').split(',').map((opt: string) => opt.trim()).filter((o:string)=>o).map((opt: string) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input 
                      type={field.type === 'tel' ? 'tel' : field.type === 'date' ? 'date' : 'text'}
                      required={field.required}
                      value={formData[field.title] || ''}
                      onChange={e => setFormData({...formData, [field.title]: e.target.value})}
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-300 focus:border-blue-700 font-bold text-gray-900"
                      placeholder={'Enter ' + field.title}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {fileFields.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-gray-800 border-b border-gray-200 pb-2">Required Documents</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {fileFields.map((field) => (
                <div key={field.id} className="relative group">
                  <input 
                    type="file" 
                    id={'file-'+field.id}
                    className="hidden"
                    accept=".jpg,.jpeg,.png,.pdf"
                    onChange={(e) => handleFileUpload(field.title, e)}
                  />
                  <label 
                    htmlFor={'file-'+field.id}
                    className={\`flex flex-col items-center justify-center p-4 border border-dashed min-h-[140px] cursor-pointer transition-colors text-center \${
                      documents[field.title] 
                        ? 'bg-blue-50 border-blue-400' 
                        : 'bg-gray-50 border-gray-300 hover:border-blue-700'
                    }\`}
                  >
                    {documents[field.title] ? (
                      <div className="w-full">
                        <div className="text-blue-700 mb-2 flex justify-center"><CheckCircle2 size={24} /></div>
                        <p className="text-xs font-semibold text-gray-900 truncate mb-1">{documents[field.title].name}</p>
                        <p className="text-[10px] text-gray-500 uppercase">{documents[field.title].size}</p>
                        <button 
                          type="button"
                          onClick={(e) => { e.preventDefault(); const d = {...documents}; delete d[field.title]; setDocuments(d); }}
                          className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                        ><X size={16} /></button>
                      </div>
                    ) : (
                      <>
                        <div className="text-gray-400 mb-2 group-hover:text-blue-700"><Upload size={24} /></div>
                        <p className="text-xs font-semibold text-gray-700 uppercase leading-snug">
                          {field.title} {field.required && <span className="text-red-500">*</span>}
                        </p>
                      </>
                    )}
                  </label>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="pt-6 border-t border-gray-200">
          <button type="submit" className="w-full py-4 bg-blue-700 text-white font-black text-sm tracking-widest uppercase hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/30">
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}
`;

fs.writeFileSync('frontend/src/components/AdmissionForm.tsx', newFormCode, 'utf8');

// 2. Update Admin Panel Application Viewer
let adminPage = fs.readFileSync('frontend/src/app/admin/[[...slug]]/page.tsx', 'utf8');

// Find the section that renders selectedApplication details
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

const newAppViewer = `{Object.entries(selectedApplication)
  .filter(([key]) => !['id', 'status', 'fees', 'documents', 'challanNo', 'applicationNo', 'date', 'studentName'].includes(key))
  .map(([key, value]) => (
    <div key={key}>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
      <p className="text-sm font-bold text-slate-800">{typeof value === 'string' ? value : JSON.stringify(value)}</p>
    </div>
))}`;

adminPage = adminPage.replace(oldAppViewer, newAppViewer);

// Fix the "Academic Information" block that was hardcoded
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

adminPage = adminPage.replace(oldAcademicInfo, ''); // Remove it entirely since the dynamic loop above catches everything!

fs.writeFileSync('frontend/src/app/admin/[[...slug]]/page.tsx', adminPage, 'utf8');

console.log('Dynamic Form Engine created successfully');
