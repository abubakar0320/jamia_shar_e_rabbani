const fs = require('fs');

const newFormCode = `'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { 
  User, 
  Phone, 
  MapPin, 
  IdCard, 
  Building2, 
  Clock, 
  X, 
  Upload, 
  CheckCircle2, 
  AlertCircle,
  Search,
  ChevronRight,
  GraduationCap
} from 'lucide-react';

const CLASSES_RAW = [
  "Mutawassitah", "Sanawiya Aamma Awal", "Sanawiya Aamma Dom", "Sanawiya Khasa Awal", "Sanawiya Khasa Dom",
  "Aliya Awal", "Aliya Dom", "Alamiya Awal", "Alamiya Dom",
  "Amma Khasusi", "Khasa Khasusi", "Almiya Khasusi Part One", "Almiya Khasusi Part Two",
  "Hifz-ul-Quran", "Tajweed-o-Qira'at", "Takhassus"
];

const TAKHASSUS_OPTIONS = [
  "Takhassus fil Fiqh", "Takhassus fil Hadith", "Takhassus fil Tafsir", "Takhassus fil Ifta", "Other"
];

const SECTIONS = ["Tulba Section", "Talibat Section"];

const KHASUSI_DOCS: Record<string, { id: string, label: string, required: boolean }[]> = {
  "Amma Khasusi": [
    { id: 'student_cnic', label: 'Student ID Card / B-Form', required: true },
    { id: 'father_cnic', label: 'Father ID Card', required: true },
    { id: 'photo', label: 'Student Photograph', required: true },
    { id: 'matric_result', label: 'Matric Result Card', required: true },
  ],
  "Khasa Khasusi": [
    { id: 'student_cnic', label: 'Student ID Card / B-Form', required: true },
    { id: 'father_cnic', label: 'Father ID Card', required: true },
    { id: 'photo', label: 'Student Photograph', required: true },
    { id: 'matric_result', label: 'Matric Result Card', required: true },
    { id: 'inter_result', label: 'Intermediate Result Card', required: true },
  ],
  "Almiya Khasusi Part One": [
    { id: 'student_cnic', label: 'Student ID Card / B-Form', required: true },
    { id: 'father_cnic', label: 'Father ID Card', required: true },
    { id: 'photo', label: 'Student Photograph', required: true },
    { id: 'matric_result', label: 'Matric Result Card', required: true },
    { id: 'inter_result', label: 'Intermediate Result Card', required: true },
    { id: 'grad_result', label: 'BA / BSc / Graduation Result Card', required: true },
  ],
  "Almiya Khasusi Part Two": [
    { id: 'student_cnic', label: 'Student ID Card / B-Form', required: true },
    { id: 'father_cnic', label: 'Father ID Card', required: true },
    { id: 'photo', label: 'Student Photograph', required: true },
    { id: 'almiya_p1_result', label: 'Almiya Khasusi Part One Result Card', required: true },
  ]
};

const DEFAULT_REQUIRED_DOCS = [
  { id: 'photo', label: 'Student Photograph', required: true },
  { id: 'student_cnic', label: 'Student CNIC / B-Form Copy', required: true },
  { id: 'father_cnic', label: 'Father\\'s CNIC Copy', required: true },
  { id: 'result_card', label: 'Previous Class Result Card / Marksheet', required: true },
];

interface FormData {
  studentName: string;
  fatherName: string;
  dob: string;
  cnic: string;
  mobile: string;
  whatsapp: string;
  sectionType: string;
  classProgram: string;
  takhassusType: string;
  processingType: string;
  documents: Record<string, { name: string, size: string, type: string }>;
}

export interface Admission {
  studentName: string;
  fatherName: string;
  mobile: string;
  sectionType: string;
  classProgram: string;
  challanNo: string;
  applicationNo: string;
  date: string;
  cnic?: string;
  fees: {
    admissionFee: number;
    registrationFee: number;
    monthlyFee: number;
    examinationFee: number;
    otherCharges: number;
    session: string;
  };
}

function SearchableSelect({ label, options, value, onChange, placeholder }: { label: string, options: string[], value: string, onChange: (val: string) => void, placeholder: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const { t } = useTranslation();

  const filteredOptions = options.filter(opt => 
    opt.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [wrapperRef]);

  return (
    <div className="relative z-50" ref={wrapperRef}>
      <label className="block text-xs font-semibold tracking-wide text-gray-700 uppercase mb-2">{label}</label>
      <div 
        onClick={() => setIsOpen(!isOpen)}
        className={\`w-full px-4 py-3 bg-white border border-gray-300 cursor-pointer flex justify-between items-center transition-colors hover:border-blue-700 \${isOpen ? 'border-blue-700 ring-1 ring-blue-700' : ''}\`}
      >
        <span className={\`text-sm \${value ? 'text-gray-900 font-semibold' : 'text-gray-500'}\`}>
          {value || placeholder}
        </span>
        <ChevronRight size={18} className={\`text-gray-500 transition-transform \${isOpen ? 'rotate-90' : ''}\`} />
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.1 }}
            className="absolute z-50 w-full mt-1 bg-white border border-gray-300 shadow-lg overflow-hidden"
          >
            <div className="p-2 border-b border-gray-200 bg-gray-50">
              <div className="relative">
                <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input 
                  type="text" 
                  autoFocus
                  placeholder={t('Search...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-white border border-gray-300 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 text-sm text-gray-900"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
            <div className="max-h-60 overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((opt, i) => (
                  <div 
                    key={i}
                    onClick={() => {
                      onChange(opt);
                      setIsOpen(false);
                      setSearchTerm('');
                    }}
                    className={\`px-4 py-3 text-sm cursor-pointer border-b border-gray-100 last:border-none \${value === opt ? 'bg-blue-50 text-blue-700 font-semibold' : 'text-gray-700 hover:bg-gray-50 hover:text-blue-700'}\`}
                  >
                    {opt}
                  </div>
                ))
              ) : (
                <div className="px-4 py-6 text-center text-gray-500 text-sm">{t('No matching options found')}</div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function AdmissionForm({ onSuccess }: { onSuccess: (data: Admission) => void }) {
  const { t } = useTranslation();
  const searchParams = useSearchParams();
  const courseParam = searchParams.get('course');
  const [mounted, setMounted] = useState(false);

  const [formData, setFormData] = useState<FormData>({ 
    studentName: '', 
    fatherName: '',
    dob: '',
    cnic: '',
    mobile: '', 
    whatsapp: '',
    sectionType: '',
    classProgram: '', 
    takhassusType: '',
    processingType: 'Normal',
    documents: {}
  });

  const [dynamicDocs, setDynamicDocs] = useState<{id: string, label: string, required: boolean}[]>([]);

  useEffect(() => {
    setMounted(true);
    if (courseParam) {
      const matchedClass = CLASSES_RAW.find(cls => 
        cls.toLowerCase() === courseParam.toLowerCase() || 
        courseParam.toLowerCase().includes(cls.toLowerCase()) ||
        cls.toLowerCase().includes(courseParam.toLowerCase())
      );
      if (matchedClass) {
        setFormData(prev => ({ ...prev, classProgram: matchedClass }));
      }
    }
  }, [courseParam]);

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/admission-requirements?t=' + Date.now()).then(res => res.json()).then(data => {
      if (data && data.length > 0) {
        // We only use the fields that are marked as type 'file' from the admin panel!
        const fileReqs = data.filter((r:any) => r.type === 'file' || !r.type);
        if (fileReqs.length > 0) {
          setDynamicDocs(fileReqs.map((req: any) => ({ id: req.id.toString(), label: req.title, required: req.required !== false })));
        }
      }
    }).catch(err => console.error(err));
  }, []);

  const filteredClasses = formData.sectionType 
    ? CLASSES_RAW.map(cls => \`\${t(cls)} (\${t(formData.sectionType.split(' ')[0])})\`)
    : [];

  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const getBaseClassName = (classProgram: string) => {
    if (!classProgram) return "";
    return classProgram.replace(/\\s*\\([^)]*\\)\\s*$/, '').trim();
  };

  const currentRequiredDocs = dynamicDocs.length > 0 ? dynamicDocs : (KHASUSI_DOCS[getBaseClassName(formData.classProgram)] || DEFAULT_REQUIRED_DOCS);

  const formatCNIC = (val: string) => {
    const digits = val.replace(/\\D/g, '').slice(0, 13);
    if (digits.length <= 5) return digits;
    if (digits.length <= 12) return \`\${digits.slice(0, 5)}-\${digits.slice(5)}\`;
    return \`\${digits.slice(0, 5)}-\${digits.slice(5, 12)}-\${digits.slice(12, 13)}\`;
  };

  const validateCNIC = (val: string) => {
    const regex = /^\\d{5}-\\d{7}-\\d{1}$/;
    return regex.test(val);
  };

  const validateDOB = (dob: string) => {
    if (!dob) return false;
    const date = new Date(dob);
    const today = new Date();
    if (date > today) return false;
    const age = today.getFullYear() - date.getFullYear();
    return age >= 5 && age <= 80;
  };

  const handleFileUpload = (id: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert(t("File size should be less than 5MB"));
        return;
      }
      const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg', 'application/pdf'];
      if (!allowedTypes.includes(file.type)) {
        alert(t("Invalid file type. Please upload JPG, PNG or PDF."));
        return;
      }

      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [id]: {
            name: file.name,
            size: (file.size / 1024).toFixed(1) + ' KB',
            type: file.type
          }
        }
      }));
    }
  };

  const removeFile = (id: string) => {
    setFormData(prev => {
      const newDocs = { ...prev.documents };
      delete newDocs[id];
      return { ...prev, documents: newDocs };
    });
  };

  const handleAdmissionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCNIC(formData.cnic)) {
      alert(t("Please enter a valid 13-digit CNIC / B-Form in 00000-0000000-0 format."));
      return;
    }

    if (!validateDOB(formData.dob)) {
      alert(t("Applicant age must be between 5 and 80 years."));
      return;
    }

    for (const doc of currentRequiredDocs) {
      if (doc.required && !formData.documents[doc.id]) {
        alert(t("Please upload " + doc.label));
        return;
      }
    }

    setStatus('loading');
    try {
      const res = await fetch('http://localhost:5000/api/admissions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (data.success) {
        setStatus('success');
        onSuccess(data.admission);
      } else {
        setStatus('error');
        setErrorMessage(data.error || t("An error occurred during submission."));
      }
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMessage(t("Failed to connect to server."));
    }
  };

  if (!mounted) return null;

  return (
    <div className="bg-white p-8 rounded-sm shadow-sm border border-gray-200">
      <form onSubmit={handleAdmissionSubmit} className="space-y-10">
        
        {/* Basic Information */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
            <User size={20} className="text-blue-700" />
            <h3 className="text-xl font-semibold text-gray-900">{t('Basic Information')}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 border border-gray-200">
            <div>
              <label className="block text-xs font-semibold tracking-wide text-gray-700 uppercase mb-2">{t('Student Full Name')} <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                value={formData.studentName}
                onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-300 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-colors text-sm text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-wide text-gray-700 uppercase mb-2">{t('Father Name')} <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                value={formData.fatherName}
                onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-300 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-colors text-sm text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-wide text-gray-700 uppercase mb-2">{t('Date of Birth')} <span className="text-red-500">*</span></label>
              <input
                type="date"
                required
                value={formData.dob}
                onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-300 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-colors text-sm text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-wide text-gray-700 uppercase mb-2">{t('CNIC / B-Form Number')} <span className="text-red-500">*</span></label>
              <input
                type="text"
                required
                value={formData.cnic}
                onChange={(e) => setFormData({ ...formData, cnic: formatCNIC(e.target.value) })}
                placeholder="00000-0000000-0"
                maxLength={15}
                className={\`w-full px-4 py-3 bg-white border \${formData.cnic && !validateCNIC(formData.cnic) ? 'border-red-500' : 'border-gray-300'} focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-colors text-sm text-gray-900 placeholder:text-gray-400\`}
              />
              {formData.cnic && !validateCNIC(formData.cnic) && (
                <p className="text-xs text-red-500 font-semibold mt-1">{t('Format: 00000-0000000-0')}</p>
              )}
            </div>
          </div>
        </div>

        {/* Contact Details */}
        <div className="space-y-6">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
            <Phone size={20} className="text-blue-700" />
            <h3 className="text-xl font-semibold text-gray-900">{t('Contact Details')}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 border border-gray-200">
            <div>
              <label className="block text-xs font-semibold tracking-wide text-gray-700 uppercase mb-2">{t('Mobile Number')} <span className="text-red-500">*</span></label>
              <input
                type="tel"
                required
                value={formData.mobile}
                onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-300 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-colors text-sm text-gray-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold tracking-wide text-gray-700 uppercase mb-2">{t('WhatsApp Number')}</label>
              <input
                type="tel"
                value={formData.whatsapp}
                onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                className="w-full px-4 py-3 bg-white border border-gray-300 focus:outline-none focus:border-blue-700 focus:ring-1 focus:ring-blue-700 transition-colors text-sm text-gray-900"
              />
            </div>
          </div>
        </div>

        {/* Academic Program */}
        <div className="space-y-6 relative z-50">
          <div className="flex items-center gap-3 border-b border-gray-200 pb-2">
            <GraduationCap size={20} className="text-blue-700" />
            <h3 className="text-xl font-semibold text-gray-900">{t('Academic Choice')}</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gray-50 p-6 border border-gray-200">
            <SearchableSelect 
              label={t("Select Admission Section *")}
              options={SECTIONS.map(s => t(s))}
              value={formData.sectionType}
              onChange={(val) => setFormData({ ...formData, sectionType: val, classProgram: '', takhassusType: '' })}
              placeholder={t("Choose Section")}
            />
            {formData.sectionType && (
              <SearchableSelect 
                label={t("Select Class / Program *")}
                options={filteredClasses}
                value={formData.classProgram}
                onChange={(val) => setFormData({ ...formData, classProgram: val, takhassusType: '' })}
                placeholder={t("Choose Program")}
              />
            )}
            {formData.classProgram.startsWith(t("Takhassus")) && (
              <SearchableSelect 
                label={t("Select Takhassus *")}
                options={TAKHASSUS_OPTIONS.map(o => t(o))}
                value={formData.takhassusType}
                onChange={(val) => setFormData({ ...formData, takhassusType: val })}
                placeholder={t("Choose Specialization")}
              />
            )}
            {(formData.classProgram === 'Hifz-ul-Quran' || formData.classProgram === "Tajweed-o-Qira'at") && (
              <SearchableSelect 
                label={t("Select Processing Type *")}
                options={["Normal", "Urgent"]}
                value={formData.processingType}
                onChange={(val) => setFormData({ ...formData, processingType: val })}
                placeholder={t("Choose Processing Type")}
              />
            )}
          </div>
        </div>

        {/* Document Upload Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-gray-200 pb-2">
            <div className="flex items-center gap-3">
              <IdCard size={20} className="text-blue-700" />
              <h3 className="text-xl font-semibold text-gray-900">{t('Required Documents')}</h3>
            </div>
            <span className="text-[10px] font-semibold text-blue-700 uppercase tracking-widest bg-blue-50 px-3 py-1 border border-blue-200">
              {t('Max 5MB per file')}
            </span>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-gray-50 p-6 border border-gray-200">
            {currentRequiredDocs.map((doc) => (
              <div key={doc.id} className="relative group">
                <input 
                  type="file" 
                  id={doc.id}
                  className="hidden"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={(e) => handleFileUpload(doc.id, e)}
                />
                <label 
                  htmlFor={doc.id}
                  className={\`flex flex-col items-center justify-center p-4 border border-dashed min-h-[140px] cursor-pointer transition-colors text-center \${
                    formData.documents[doc.id] 
                      ? 'bg-blue-50 border-blue-400' 
                      : 'bg-white border-gray-300 hover:border-blue-700 hover:bg-gray-50'
                  }\`}
                >
                  {formData.documents[doc.id] ? (
                    <div className="w-full">
                      <div className="text-blue-700 mb-2 flex justify-center">
                        <CheckCircle2 size={24} />
                      </div>
                      <p className="text-xs font-semibold text-gray-900 truncate mb-1 px-2">
                        {formData.documents[doc.id].name}
                      </p>
                      <p className="text-[10px] text-gray-500 uppercase">
                        {formData.documents[doc.id].size}
                      </p>
                      <button 
                        type="button"
                        onClick={(e) => { e.preventDefault(); removeFile(doc.id); }}
                        className="absolute top-2 right-2 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <X size={16} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="text-gray-400 mb-2 group-hover:text-blue-700 transition-colors">
                        <Upload size={24} />
                      </div>
                      <p className="text-xs font-semibold text-gray-700 uppercase leading-snug">
                        {t(doc.label)}
                        {doc.required && <span className="text-red-500 ml-1">*</span>}
                      </p>
                    </>
                  )}
                </label>
              </div>
            ))}
          </div>
        </div>

        {status === 'error' && (
          <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-sm text-sm font-semibold flex items-center gap-2">
            <AlertCircle size={18} />
            {errorMessage}
          </div>
        )}

        <div className="pt-6 border-t border-gray-200">
          <button 
            type="submit" 
            disabled={status === 'loading'}
            className="w-full py-4 bg-blue-700 text-white font-black text-sm tracking-widest uppercase hover:bg-blue-800 transition-colors shadow-lg shadow-blue-700/30 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === 'loading' ? t('Submitting...') : t('Submit Application')}
          </button>
        </div>
      </form>
    </div>
  );
}`;

fs.writeFileSync('frontend/src/components/AdmissionForm.tsx', newFormCode, 'utf8');

// We also need to restore page.tsx application viewer that I deleted
let adminPage = fs.readFileSync('frontend/src/app/admin/[[...slug]]/page.tsx', 'utf8');

const dynamicAppViewer = \`{Object.entries(selectedApplication)
  .filter(([key]) => !['id', 'status', 'fees', 'documents', 'challanNo', 'applicationNo', 'date', 'studentName'].includes(key))
  .map(([key, value]) => (
    <div key={key}>
      <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
      <p className="text-sm font-bold text-slate-800">{typeof value === 'string' ? value : JSON.stringify(value)}</p>
    </div>
))}\`;

const oldAppViewer = \`<div>
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
 </div>\`;

adminPage = adminPage.replace(dynamicAppViewer, oldAppViewer);

// Re-inject the academic info block right before "Admin Form Viewer Button"
const oldAcademicInfo = \`<div>
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
 </div>\`;

if(!adminPage.includes('Academic Information')) {
  adminPage = adminPage.replace(
    '{/* Admin Form Viewer Button */}',
    oldAcademicInfo + '\\n\\n {/* Admin Form Viewer Button */}'
  );
}

fs.writeFileSync('frontend/src/app/admin/[[...slug]]/page.tsx', adminPage, 'utf8');

console.log('Restoration completed successfully');
