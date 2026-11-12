'use client';

import React, { useState } from 'react';
import '@/i18n';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { User, Phone, CheckCircle2, Upload, Calendar, X, GraduationCap, Building2, Eye, CreditCard, AlertCircle } from 'lucide-react';

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
    { id: 'student_cnic', label: 'طالب علم کا شناختی کارڈ یا نادرا ب فارم' },
    { id: 'father_cnic', label: 'والد کا شناختی کارڈ' },
    { id: 'photo', label: 'طالب علم کی پاسپورٹ سائز تصویر' },
    { id: 'matric_result', label: 'میٹرک کا رزلٹ کارڈ / سند' }
  ],
  "Khasa Khasusi": [
    { id: 'student_cnic', label: 'طالب علم کا شناختی کارڈ یا نادرا ب فارم' },
    { id: 'father_cnic', label: 'والد کا شناختی کارڈ' },
    { id: 'photo', label: 'طالب علم کی پاسپورٹ سائز تصویر' },
    { id: 'matric_result', label: 'میٹرک کا رزلٹ کارڈ' },
    { id: 'inter_result', label: 'انٹرمیڈیٹ (ایف اے/ایف ایس سی) رزلٹ کارڈ' }
  ],
  "Almiya Khasusi Part One": [
    { id: 'student_cnic', label: 'طالب علم کا شناختی کارڈ یا نادرا ب فارم' },
    { id: 'father_cnic', label: 'والد کا شناختی کارڈ' },
    { id: 'photo', label: 'طالب علم کی پاسپورٹ سائز تصویر' },
    { id: 'matric_result', label: 'میٹرک کا رزلٹ کارڈ' },
    { id: 'inter_result', label: 'انٹرمیڈیٹ رزلٹ کارڈ' },
    { id: 'grad_result', label: 'گریجویشن (بی اے/بی ایس) کی ڈگری یا رزلٹ کارڈ' }
  ],
  "Almiya Khasusi Part Two": [
    { id: 'student_cnic', label: 'طالب علم کا شناختی کارڈ یا نادرا ب فارم' },
    { id: 'father_cnic', label: 'والد کا شناختی کارڈ' },
    { id: 'photo', label: 'طالب علم کی پاسپورٹ سائز تصویر' },
    { id: 'almiya_p1_result', label: 'عالمیہ پارٹ ون کا رزلٹ کارڈ' }
  ]
};

const DEFAULT_REQUIRED_DOCS = [
  { id: 'photo', label: 'طالب علم کی پاسپورٹ سائز تصویر' },
  { id: 'student_cnic', label: 'طالب علم کا شناختی کارڈ یا نادرا ب فارم' },
  { id: 'father_cnic', label: 'والد کا شناختی کارڈ' },
  { id: 'result_card', label: 'سابقہ کلاس کا رزلٹ کارڈ / مارک شیٹ' }
];

const PROGRAM_LABELS: Record<string, string> = {
  "Mutawassitah": "متوسطہ (مڈل کورس)",
  "Sanawiya Aamma Awal": "ثانویہ عامہ سالِ اول (میٹرک حصہ اول)",
  "Sanawiya Aamma Dom": "ثانویہ عامہ سالِ دوم (میٹرک حصہ دوم)",
  "Sanawiya Khasa Awal": "ثانویہ خاصہ سالِ اول (ایف اے حصہ اول)",
  "Sanawiya Khasa Dom": "ثانویہ خاصہ سالِ دوم (ایف اے حصہ دوم)",
  "Aliya Awal": "عالیہ سالِ اول (بی اے حصہ اول)",
  "Aliya Dom": "عالیہ سالِ دوم (بی اے حصہ دوم)",
  "Alamiya Awal": "عالمیہ سالِ اول (ایم اے حصہ اول)",
  "Alamiya Dom": "عالمیہ سالِ دوم (ایم اے حصہ دوم)",
  "Takhassus Awal": "تخصص فی الفقہ والافتاء سالِ اول",
  "Takhassus Dom": "تخصص فی الفقہ والافتاء سالِ دوم",
  "Amma Khasusi": "عامہ خصوصی (برائے کالج و اسکول طلبہ)",
  "Khasa Khasusi": "خاصہ خصوصی (برائے کالج و یونیورسٹی طلبہ)",
  "Almiya Khasusi Part One": "عالمیہ خصوصی سالِ اول (برائے بی اے پاس طلبہ و طالبات - ۲ سالہ مساوی ایم اے)",
  "Almiya Khasusi Part Two": "عالمیہ خصوصی سالِ دوم / دورۂ حدیث (برائے بی اے پاس طلبہ و طالبات)",
  "Hifz-ul-Quran": "شعبہ تحفیظ القرآن الکریم",
  "Tajweed-o-Qira'at": "شعبہ تجوید و قرات سبعہ و عشرہ"
};

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
  const [tooLargeDocs, setTooLargeDocs] = useState<Record<string, boolean>>({});
  const [customFields, setCustomFields] = useState<any[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    fetch('/api/form-fields?t=' + Date.now())
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setCustomFields(data);
        } else {
          setCustomFields([]);
        }
      })
      .catch(err => {
        console.error('Failed to load form fields:', err);
        setCustomFields([]);
      });
  }, []);

  // Normalize class name for document lookup
  const getBaseClassName = (className: string) => className.replace(/\s*\([^)]*\)\s*$/, '').trim();
  
  const baseRequiredDocs = KHASUSI_DOCS[getBaseClassName(formData.classProgram)] || DEFAULT_REQUIRED_DOCS;
  const customFileFields = Array.isArray(customFields)
    ? customFields.filter(f => f.type === 'file').map(f => ({ id: f.title, label: f.title }))
    : [];
  const currentRequiredDocs = [...baseRequiredDocs, ...customFileFields];
  const customTextFields = Array.isArray(customFields)
    ? customFields.filter(f => f.type !== 'file' && !f.isCore)
    : [];
  const CUSTOM_FIELD_TRANSLATIONS: Record<string, string> = {
    "Student Full Name": "طالب علم کا مکمل نام",
    "Father Name": "والد کا نام",
    "Date of Birth": "تاریخِ پیدائش",
    "CNIC / B-Form Number": "قومی شناختی کارڈ / ب فارم نمبر",
    "Mobile Number": "موبائل نمبر (رابطہ)",
    "WhatsApp Number": "واٹس ایپ نمبر",
    "studentName": "طالب علم کا مکمل نام",
    "fatherName": "والد کا نام",
    "dob": "تاریخِ پیدائش",
    "cnic": "قومی شناختی کارڈ / ب فارم نمبر",
    "mobile": "موبائل نمبر (رابطہ)",
    "whatsapp": "واٹس ایپ نمبر",
    "Address": "مکمل پتہ",
    "Permanent Address": "مستقل پتہ",
    "City": "شہر",
    "Previous School": "سابقہ تعلیمی ادارہ / مدرسہ",
    "Guardian Name": "سرپرست کا نام",
    "Guardian Relation": "سرپرست سے رشتہ",
    "Guardian Mobile": "سرپرست کا موبائل نمبر",
    "Father CNIC": "والد کا شناختی کارڈ نمبر",
    "Father's CNIC": "والد کا شناختی کارڈ نمبر"
  };

  const getCoreField = (id: string) => {
    const defaultLabels: Record<string, string> = {
      studentName: 'طالب علم کا مکمل نام',
      fatherName: 'والد کا نام',
      dob: 'تاریخِ پیدائش',
      cnic: 'قومی شناختی کارڈ / ب فارم نمبر',
      mobile: 'موبائل نمبر (رابطہ)',
      whatsapp: 'واٹس ایپ نمبر'
    };
    if (Array.isArray(customFields)) {
      const found = customFields.find(f => f.id === id);
      if (found) {
        return {
          ...found,
          title: defaultLabels[id] || CUSTOM_FIELD_TRANSLATIONS[found.title] || found.title,
          required: found.required !== undefined ? found.required : id !== 'whatsapp',
          isCore: true
        };
      }
    }
    return { id, title: defaultLabels[id] || id, required: id !== 'whatsapp', isCore: true };
  };

  const compressImage = (file: File): Promise<{ name: string, data: string, size: string, type: string }> => {
    return new Promise((resolve) => {
      if (!file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            name: file.name,
            data: reader.result as string,
            size: (file.size / 1024).toFixed(1) + ' KB',
            type: file.type
          });
        };
        reader.readAsDataURL(file);
        return;
      }

      const img = new window.Image();
      const url = URL.createObjectURL(file);
      img.onload = () => {
        URL.revokeObjectURL(url);
        const maxDim = 1200;
        let width = img.width;
        let height = img.height;
        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const compressedDataUrl = canvas.toDataURL('image/jpeg', 0.72);
          const approxBytes = Math.round((compressedDataUrl.length * 3) / 4);
          resolve({
            name: file.name.replace(/\.[^.]+$/, '.jpg'),
            data: compressedDataUrl,
            size: (approxBytes / 1024).toFixed(1) + ' KB',
            type: 'image/jpeg'
          });
        } else {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve({
              name: file.name,
              data: reader.result as string,
              size: (file.size / 1024).toFixed(1) + ' KB',
              type: file.type
            });
          };
          reader.readAsDataURL(file);
        }
      };
      img.onerror = () => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve({
            name: file.name,
            data: reader.result as string,
            size: (file.size / 1024).toFixed(1) + ' KB',
            type: file.type
          });
        };
        reader.readAsDataURL(file);
      };
      img.src = url;
    });
  };

  const handleFileUpload = async (docId: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 8 * 1024 * 1024) {
        setTooLargeDocs(prev => ({ ...prev, [docId]: true }));
        alert(t("File size must be less than 8MB."));
        e.target.value = '';
        return;
      }
      setTooLargeDocs(prev => ({ ...prev, [docId]: false }));
      try {
        const processed = await compressImage(file);
        setDocuments(prev => ({
          ...prev,
          [docId]: processed
        }));
      } catch (err) {
        console.error('Error compressing image:', err);
      }
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
      let apiUrl = '/api/admissions';
      const customApi = (process.env.NEXT_PUBLIC_API_URL || '').trim().replace(/\/$/, '');
      if (customApi) {
        const isBrowser = typeof window !== 'undefined';
        const isLocalHost = isBrowser && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');

        if (!isLocalHost && customApi.includes('localhost')) {
          apiUrl = '/api/admissions';
        } else {
          apiUrl = customApi.endsWith('/api')
            ? `${customApi}/admissions`
            : (customApi.includes('/api/') ? `${customApi}/admissions` : `${customApi}/api/admissions`);
        }
      }

      const res = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, documents })
      });

      const contentType = res.headers.get('content-type') || '';
      let data: any = null;

      if (contentType.includes('application/json')) {
        data = await res.json();
      } else {
        const textResp = await res.text();
        console.error('Non-JSON server response received:', res.status, textResp);
        if (res.status === 404) {
          throw new Error('API route /api/admissions not found (404). Please ensure the backend server is running.');
        } else if (res.status === 413) {
          throw new Error('The uploaded documents are too large for the server (413). Please upload smaller images.');
        } else if (res.status === 502 || res.status === 504) {
          throw new Error(`Backend server is currently unreachable (${res.status} Bad Gateway).`);
        } else {
          throw new Error(`Server returned status ${res.status}: ${res.statusText}`);
        }
      }

      if (res.ok && data?.id) {
        onSuccess(data);
      } else {
        alert(data?.error || 'Failed to submit application');
      }
    } catch (err: any) {
      console.error(err);
      alert(t('Submission failed: ') + (err.message || 'Unknown network error'));
    }
    setIsSubmitting(false);
  };

  return (
    <div className="p-6 md:p-10 font-urdu" dir="rtl">
      <div className="text-center mb-10">
        <img src="/logo.jpeg" alt="جامعہ شیر ربانی" className="h-24 w-auto mx-auto mb-4 rounded-full border-2 border-emerald-100 p-1 shadow-sm" />
        <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 leading-[2.1]">آن لائن داخلہ فارم</h2>
        <p className="text-slate-600 font-medium mt-2 text-base leading-[2.0]">جامعہ شیرِ ربانی، مانانوالہ، ضلع شیخوپورہ</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-10">
        {/* Basic Info */}
        <div className="space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-3 leading-[2.1]">
            <User className="text-emerald-600" /> بنیادی معلومات
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getCoreField('studentName') && (
            <div>
              <label className="block text-sm font-bold text-slate-700 leading-[2.0] mb-2">{getCoreField('studentName').title} {getCoreField('studentName').required && <span className="text-red-500">*</span>}</label>
              <input type="text" required={getCoreField('studentName').required} value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-emerald-600 outline-none font-bold text-slate-800 rounded-md transition-colors leading-[2.0]" placeholder="طالب علم کا نام درج کریں" />
            </div>
          )}
            {getCoreField('fatherName') && (
            <div>
              <label className="block text-sm font-bold text-slate-700 leading-[2.0] mb-2">{getCoreField('fatherName').title} {getCoreField('fatherName').required && <span className="text-red-500">*</span>}</label>
              <input type="text" required={getCoreField('fatherName').required} value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-emerald-600 outline-none font-bold text-slate-800 rounded-md transition-colors leading-[2.0]" placeholder="والد کا نام درج کریں" />
            </div>
          )}
            {getCoreField('dob') && (
            <div>
              <label className="block text-sm font-bold text-slate-700 leading-[2.0] mb-2">{getCoreField('dob').title} {getCoreField('dob').required && <span className="text-red-500">*</span>}</label>
              <div className="relative">
                <input type="date" required={getCoreField('dob').required} value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-emerald-600 outline-none font-bold text-slate-800 rounded-md transition-colors ps-10" />
                <Calendar className="absolute start-3 top-3.5 text-slate-400" size={18} />
              </div>
            </div>
          )}
            {getCoreField('cnic') && (
            <div>
              <label className="block text-sm font-bold text-slate-700 leading-[2.0] mb-2">{getCoreField('cnic').title} {getCoreField('cnic').required && <span className="text-red-500">*</span>}</label>
              <div className="relative">
                <input type="text" required={getCoreField('cnic').required} value={formData.cnic} onChange={handleCnicChange} placeholder="00000-0000000-0" dir="ltr" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-emerald-600 outline-none font-bold text-slate-800 font-mono rounded-md transition-colors text-right" />
                <CreditCard className="absolute start-3 top-3.5 text-slate-400" size={18} />
              </div>
            </div>
          )}
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-3 leading-[2.1]">
            <Phone className="text-emerald-600" /> رابطہ کی تفصیلات
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {getCoreField('mobile') && (
            <div>
              <label className="block text-sm font-bold text-slate-700 leading-[2.0] mb-2">{getCoreField('mobile').title} {getCoreField('mobile').required && <span className="text-red-500">*</span>}</label>
              <input type="tel" dir="ltr" required={getCoreField('mobile').required} value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-emerald-600 outline-none font-bold text-slate-800 font-mono rounded-md text-right" placeholder="03001234567" />
            </div>
          )}
            {getCoreField('whatsapp') && (
            <div>
              <label className="block text-sm font-bold text-slate-700 leading-[2.0] mb-2">{getCoreField('whatsapp').title} {getCoreField('whatsapp').required && <span className="text-red-500">*</span>}</label>
              <input type="tel" dir="ltr" required={getCoreField('whatsapp').required} value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-emerald-600 outline-none font-bold text-slate-800 font-mono rounded-md text-right" placeholder="03001234567" />
            </div>
          )}
          </div>
        </div>

        {/* Academic Program */}
        <div className="space-y-6">
          <h3 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-3 leading-[2.1]">
            <GraduationCap className="text-emerald-600" /> تعلیمی شعبہ کا انتخاب
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-slate-700 leading-[2.0] mb-2">داخلہ سیکشن منتخب کریں *</label>
              <select required value={formData.sectionType} onChange={e => setFormData({...formData, sectionType: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-emerald-600 outline-none font-bold text-slate-800 rounded-md">
                <option value="">-- سیکشن منتخب کریں --</option>
                <option value="Tulba">طلبہ (بنین)</option>
                <option value="Talibat">طالبات (بنات)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 leading-[2.0] mb-2">مطلوبہ درجہ / کلاس منتخب کریں *</label>
              <select required value={formData.classProgram} onChange={e => setFormData({...formData, classProgram: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-emerald-600 outline-none font-bold text-slate-800 rounded-md">
                <option value="">-- کلاس منتخب کریں --</option>
                {PROGRAMS.map(p => (
                  <option key={p} value={p}>{PROGRAM_LABELS[p] || p}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Custom Dynamic Fields */}
        {customTextFields.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-3 leading-[2.1]">
              <User className="text-emerald-600" /> اضافی تفصیلات
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customTextFields.map(field => {
                const fieldTitle = CUSTOM_FIELD_TRANSLATIONS[field.title] || CUSTOM_FIELD_TRANSLATIONS[field.id] || field.title;
                return (
                  <div key={field.id} className={field.type === 'select' ? 'md:col-span-2' : ''}>
                    <label className="block text-sm font-bold text-slate-700 leading-[2.0] mb-2">
                      {fieldTitle} {field.required && <span className="text-red-500">*</span>}
                    </label>
                    {field.type === 'select' ? (
                      <select required={field.required} value={(formData as any)[field.title] || ''} onChange={e => setFormData({...formData, [field.title]: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-emerald-600 outline-none font-bold text-slate-800 rounded-md">
                        <option value="">-- {fieldTitle} منتخب کریں --</option>
                        {(field.options || '').split(',').map((opt: string) => opt.trim()).filter((o:string)=>o).map((opt: string) => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                    ) : (
                      <input type={field.type === 'date' ? 'date' : 'text'} required={field.required} value={(formData as any)[field.title] || ''} onChange={e => setFormData({...formData, [field.title]: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-emerald-600 outline-none font-bold text-slate-800 rounded-md" placeholder={`${fieldTitle} درج کریں`} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Document Uploads */}
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row justify-between sm:items-end border-b border-slate-200 pb-3 gap-2">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-800 flex items-center gap-2 leading-[2.1]">
                <Upload className="text-emerald-600" /> مطلوبہ دستاویزات (اپ لوڈ کریں)
              </h3>
            </div>
            <span className="text-xs font-bold text-slate-500 leading-[2.0]">زیادہ سے زیادہ سائز: ۱ ایم بی فی فائل</span>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentRequiredDocs.map(doc => (
              <div key={doc.id} className="relative flex flex-col gap-2">
                <input type="file" id={doc.id} accept=".jpg,.jpeg,.png,.pdf" className="hidden" onChange={(e) => handleFileUpload(doc.id, e)} />
                <label htmlFor={doc.id} className={`flex flex-col items-center justify-center p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all min-h-[160px] text-center ${documents[doc.id] ? 'bg-emerald-50 border-emerald-400' : tooLargeDocs[doc.id] ? 'bg-rose-50 border-rose-400 hover:border-rose-500 hover:bg-rose-100' : 'bg-slate-50 border-slate-300 hover:border-emerald-500 hover:bg-slate-100'}`}>
                  {documents[doc.id] ? (
                    <div className="w-full">
                      <CheckCircle2 size={32} className="text-emerald-600 mx-auto mb-3" />
                      <p className="text-xs font-bold text-slate-800 truncate mb-1">{documents[doc.id].name}</p>
                      <p className="text-[10px] font-black text-slate-500 tracking-widest">{documents[doc.id].size}</p>
                      <button type="button" onClick={(e) => { e.preventDefault(); const d = {...documents}; delete d[doc.id]; setDocuments(d); }} className="absolute top-2 start-2 text-slate-400 hover:text-red-500 bg-white rounded-full p-1 shadow-sm"><X size={14}/></button>
                    </div>
                  ) : (
                    <>
                      <Upload size={32} className={`mb-3 transition-colors ${tooLargeDocs[doc.id] ? 'text-rose-400 group-hover:text-rose-600' : 'text-slate-400 group-hover:text-emerald-600'}`} />
                      <p className={`text-xs font-bold leading-[2.0] ${tooLargeDocs[doc.id] ? 'text-rose-700' : 'text-slate-700'}`}>{doc.label} *</p>
                      {tooLargeDocs[doc.id] && <p className="text-xs font-bold text-rose-500 mt-2 leading-[2.0]">فائل کا سائز زیادہ ہے</p>}
                    </>
                  )}
                </label>
                {tooLargeDocs[doc.id] && (
                  <a href="https://pdf.pi7.org/compress-pdf-to-1mb" target="_blank" rel="noopener noreferrer" className="w-full py-2.5 bg-rose-600 text-white rounded-md text-xs font-bold tracking-wide text-center hover:bg-rose-700 shadow-sm animate-in fade-in zoom-in duration-300 flex items-center justify-center gap-2">
                    <AlertCircle size={14}/> پی ڈی ایف سائز کم کریں (1MB)
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="w-full py-4 sm:py-5 bg-emerald-600 text-white font-bold text-lg hover:bg-emerald-700 shadow-lg shadow-emerald-600/20 hover:shadow-xl transition-all rounded-md disabled:opacity-50 font-urdu leading-[2.0]">
          {isSubmitting ? 'درخواست جمع ہو رہی ہے...' : 'آن لائن داخلہ درخواست جمع کروائیں'}
        </button>
      </form>
    </div>
  );
}
