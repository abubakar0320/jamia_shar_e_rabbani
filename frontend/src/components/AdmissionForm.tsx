'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { User, Phone, CheckCircle2, Upload, Calendar, X, GraduationCap, Building2, Eye, CreditCard } from 'lucide-react';

export interface Admission {
  id: number;
  applicationNo: string;
  studentName: string;
  fatherName: string;
  dob: string;
  cnic: string;
  mobile: string;
  whatsapp: string;
  sectionType: string;
  classProgram: string;
  documents: any;
  status: string;
  fees: any;
  date: string;
  challanNo: string;
  takhassusType?: string;
}

const KHASUSI_DOCS: Record<string, { id: string, label: string }[]> = {
  "Amma Khasusi": [
    { id: 'student_cnic', label: 'Student CNIC / B-Form Copy' },
    { id: 'father_cnic', label: 'Father\'s CNIC Copy' },
    { id: 'photo', label: 'Student Photograph' },
    { id: 'matric_result', label: 'Matriculation Result Card' }
  ],
  "Khasa Khasusi": [
    { id: 'student_cnic', label: 'Student CNIC / B-Form Copy' },
    { id: 'father_cnic', label: 'Father\'s CNIC Copy' },
    { id: 'photo', label: 'Student Photograph' },
    { id: 'matric_result', label: 'Matriculation Result Card' },
    { id: 'inter_result', label: 'Intermediate Result Card' }
  ],
  "Almiya Khasusi Part One": [
    { id: 'student_cnic', label: 'Student CNIC / B-Form Copy' },
    { id: 'father_cnic', label: 'Father\'s CNIC Copy' },
    { id: 'photo', label: 'Student Photograph' },
    { id: 'matric_result', label: 'Matriculation Result Card' },
    { id: 'inter_result', label: 'Intermediate Result Card' },
    { id: 'grad_result', label: 'Graduation Degree / Result Card' }
  ],
  "Almiya Khasusi Part Two": [
    { id: 'student_cnic', label: 'Student CNIC / B-Form Copy' },
    { id: 'father_cnic', label: 'Father\'s CNIC Copy' },
    { id: 'photo', label: 'Student Photograph' },
    { id: 'almiya_p1_result', label: 'Almiya Part 1 Result Card' }
  ]
};

const DEFAULT_REQUIRED_DOCS = [
  { id: 'photo', label: 'Student Photograph' },
  { id: 'student_cnic', label: 'Student CNIC / B-Form Copy' },
  { id: 'father_cnic', label: 'Father\'s CNIC Copy' },
  { id: 'result_card', label: 'Previous Class Result Card / Marksheet' }
];

const PROGRAMS = [
  "Mutawassitah",
  "Sanawiya Aamma Awal", "Sanawiya Aamma Dom",
  "Sanawiya Khasa Awal", "Sanawiya Khasa Dom",
  "Aliya Awal", "Aliya Dom",
  "Alamiya Awal", "Alamiya Dom",
  "Takhassus Awal", "Takhassus Dom",
  "Amma Khasusi", "Khasa Khasusi",
  "Almiya Khasusi Part One", "Almiya Khasusi Part Two",
  "Hifz-ul-Quran", "Tajweed-o-Qira'at"
];

export default function AdmissionForm({ onSuccess }: { onSuccess: (data: Admission) => void }) {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    dob: '',
    cnic: '',
    mobile: '',
    whatsapp: '',
    sectionType: '',
    classProgram: ''
  });
  const [documents, setDocuments] = useState<Record<string, any>>({});
  const [customFields, setCustomFields] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    fetch('http://localhost:5000/api/admin/form-fields?t=' + Date.now())
      .then(res => res.json())
      .then(data => setCustomFields(data || []))
      .catch(console.error);
  }, []);

  // Normalize class name for document lookup
  const getBaseClassName = (className: string) => className.replace(/\s*\([^)]*\)\s*$/, '').trim();
  
  const baseRequiredDocs = KHASUSI_DOCS[getBaseClassName(formData.classProgram)] || DEFAULT_REQUIRED_DOCS;
  const customFileFields = customFields.filter(f => f.type === 'file').map(f => ({ id: f.title, label: f.title }));
  const currentRequiredDocs = [...baseRequiredDocs, ...customFileFields];
  const customTextFields = customFields.filter(f => f.type !== 'file' && !f.isCore);
  const getCoreField = (id: string) => customFields.find(f => f.id === id);

  const handleFileUpload = (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert(t("File size should be less than 5MB"));
        return;
      }
      setDocuments(prev => ({
        ...prev,
        [docId]: { name: file.name, size: (file.size / 1024).toFixed(1) + ' KB', type: file.type }
      }));
    }
  };

  const handleCnicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 13) val = val.slice(0, 13);
    if (val.length > 12) val = val.slice(0,5) + '-' + val.slice(5,12) + '-' + val.slice(12);
    else if (val.length > 5) val = val.slice(0,5) + '-' + val.slice(5);
    setFormData({...formData, cnic: val});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    
    if (formData.cnic && formData.cnic.length !== 15) {
      alert(t("Please enter a valid 13-digit CNIC number."));
      setIsSubmitting(false);
      return;
    }

    // Validate docs
    for (const f of customTextFields) {
      if (f.required && !(formData as any)[f.title]) {
        alert(t('Please fill out ') + t(f.title));
        setIsSubmitting(false);
        return;
      }
    }

    const missingDocs = currentRequiredDocs.filter(d => !documents[d.id]);
    if (missingDocs.length > 0) {
      alert(t('Please upload: ') + `${missingDocs.map(d => d.label).join(', ')}`);
      setIsSubmitting(false);
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, documents })
      });
      const data = await res.json();
      if (res.ok && data.id) {
        onSuccess(data);
      } else {
        alert(data.error || 'Failed to submit application');
      }
    } catch (err: any) {
      console.error(err);
      alert(t('Submission failed: ') + (err.message || 'Unknown network error'));
    }
    setIsSubmitting(false);
  };

  return (
    <div className="p-8">
      <div className="text-center mb-8">
        <img src="/logo.jpeg" alt="Jamia Sher-e-Rabbani" className="h-24 w-auto mx-auto mb-4 rounded-full border-2 border-blue-100 p-1" />
        <h2 className="text-3xl font-black text-slate-800 uppercase tracking-tight">{t("Admission Application")}</h2>
        <p className="text-slate-500 font-medium mt-2">{t("Jamia Sher-e-Rabbani, Mananwala")}</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Info */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-2">
            <User className="text-blue-600" /> {t("Basic Information")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getCoreField('studentName') && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{t(getCoreField('studentName').title)} {getCoreField('studentName').required && '*'}</label>
              <input type="text" required={getCoreField('studentName').required} value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800" placeholder={t("Ali Ahmad")} />
            </div>
          )}
            {getCoreField('fatherName') && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{t(getCoreField('fatherName').title)} {getCoreField('fatherName').required && '*'}</label>
              <input type="text" required={getCoreField('fatherName').required} value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800" placeholder={t("Muhammad Ahmad")} />
            </div>
          )}
            {getCoreField('dob') && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{t(getCoreField('dob').title)} {getCoreField('dob').required && '*'}</label>
              <div className="relative">
                <input type="date" lang={t("ur") === "Urdu" ? "ur" : "en"} required={getCoreField('dob').required} value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800 ps-10" />
                <Calendar className="absolute start-3 top-3.5 text-slate-400" size={18} />
              </div>
            </div>
          )}
            {getCoreField('cnic') && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{t(getCoreField('cnic').title)} {getCoreField('cnic').required && '*'}</label>
              <div className="relative">
                <input type="text" required={getCoreField('cnic').required} value={formData.cnic} onChange={handleCnicChange} placeholder={t("00000-0000000-0")} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800 font-mono ps-10" />
                <CreditCard className="absolute start-3 top-3.5 text-slate-400" size={18} />
              </div>
            </div>
          )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-2">
            <Phone className="text-blue-600" /> {t("Contact Details")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getCoreField('mobile') && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{t(getCoreField('mobile').title)} {getCoreField('mobile').required && '*'}</label>
              <input type="tel" required={getCoreField('mobile').required} value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800 font-mono" placeholder={t("03001234567")} />
            </div>
          )}
            {getCoreField('whatsapp') && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{t(getCoreField('whatsapp').title)} {getCoreField('whatsapp').required && '*'}</label>
              <input type="tel" required={getCoreField('whatsapp').required} value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800 font-mono" placeholder={t("03001234567")} />
            </div>
          )}
          </div>
        </div>

        {/* Academic Program */}
        <div className="space-y-6">
          <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-2">
            <GraduationCap className="text-blue-600" /> {t("Academic Choice")}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{t("Select Admission Section *")}</label>
              <select required value={formData.sectionType} onChange={e => setFormData({...formData, sectionType: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800">
                <option value="">{t("-- Choose Section --")}</option>
                <option value="Tulba">{t("Tulba (Boys)")}</option>
                <option value="Talibat">{t("Talibat (Girls)")}</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{t("Select Class / Program *")}</label>
              <select required value={formData.classProgram} onChange={e => setFormData({...formData, classProgram: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800">
                <option value="">{t("-- Choose Class --")}</option>
                {PROGRAMS.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        
        {/* Custom Dynamic Fields */}
        {customTextFields.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-2">
              <User className="text-blue-600" /> {t("Additional Details")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customTextFields.map(field => (
                <div key={field.id} className={field.type === 'select' ? 'md:col-span-2' : ''}>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    {t(field.title)} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === 'select' ? (
                    <select required={field.required} value={(formData as any)[field.title] || ''} onChange={e => setFormData({...formData, [field.title]: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800">
                      <option value="">-- Select {t(field.title)} --</option>
                      {(field.options || '').split(',').map((opt: string) => opt.trim()).filter((o:string)=>o).map((opt: string) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input type={field.type === 'date' ? 'date' : 'text'} required={field.required} value={(formData as any)[field.title] || ''} onChange={e => setFormData({...formData, [field.title]: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800" placeholder={t('Enter ') + t(field.title)} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
  
        {/* Document Uploads */}
        <div className="space-y-6">
          <div className="flex justify-between items-end border-b border-slate-200 pb-2">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Upload className="text-blue-600" /> {t("Required Documents")}
            </h3>
            <span className="text-xs font-bold text-slate-400 uppercase">{t("Max 5MB per file")}</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentRequiredDocs.map(doc => (
              <div key={doc.id} className="relative">
                <input type="file" id={doc.id} accept=".jpg,.jpeg,.png,.pdf" className="hidden" onChange={(e) => handleFileUpload(doc.id, e)} />
                <label htmlFor={doc.id} className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-sm cursor-pointer transition-all min-h-[160px] text-center ${documents[doc.id] ? 'bg-blue-50 border-blue-400' : 'bg-slate-50 border-slate-300 hover:border-blue-500 hover:bg-slate-100'}`}>
                  {documents[doc.id] ? (
                    <div className="w-full">
                      <CheckCircle2 size={32} className="text-blue-600 mx-auto mb-3" />
                      <p className="text-xs font-bold text-slate-800 truncate mb-1">{documents[doc.id].name}</p>
                      <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{documents[doc.id].size}</p>
                      <button type="button" onClick={(e) => { e.preventDefault(); const d = {...documents}; delete d[doc.id]; setDocuments(d); }} className="absolute top-2 end-2 text-slate-400 hover:text-red-500 bg-white rounded-full p-1 shadow-sm"><X size={14}/></button>
                    </div>
                  ) : (
                    <>
                      <Upload size={32} className="text-slate-400 mb-3 group-hover:text-blue-600 transition-colors" />
                      <p className="text-xs font-bold text-slate-700 uppercase tracking-wide leading-relaxed">{t(doc.label)}*</p>
                    </>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full py-5 bg-blue-700 text-white font-black text-sm uppercase tracking-widest shadow-lg shadow-blue-700/20 hover:bg-blue-800 hover:shadow-xl transition-all rounded-sm disabled:opacity-50">
          {isSubmitting ? 'Processing Application...' : 'Submit Admission Application'}
        </button>
      </form>
    </div>
  );
}
