const fs = require('fs');

let formPath = 'frontend/src/components/AdmissionForm.tsx';
let formContent = fs.readFileSync(formPath, 'utf8');

// Update getCoreField to just return the field if it exists, or undefined.
// Note: We originally seeded them, so they exist in customFields. If deleted, they won't exist.
formContent = formContent.replace(
  "const getCoreField = (id: string, defaultTitle: string, defaultRequired: boolean) => {\n    const f = customFields.find(f => f.id === id);\n    return f ? { title: f.title, required: f.required } : { title: defaultTitle, required: defaultRequired };\n  };",
  "const getCoreField = (id: string) => customFields.find(f => f.id === id);"
);

// We need to wrap each core field block in a conditional.
const wrapField = (fieldName) => {
  const startTag = `<div>\n              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{getCoreField('${fieldName}',`;
  // Since we changed getCoreField signature, we need to match the actual updated lines
};

// Actually, let's just do targeted replaces on the existing lines
formContent = formContent.replace(
  `<div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{getCoreField('studentName', 'Student Full Name', true).title} {getCoreField('studentName', '', true).required && '*'}</label>
              <input type="text" required={getCoreField('studentName', '', true).required} value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800" placeholder="Ali Ahmad" />
            </div>`,
  `{getCoreField('studentName') && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{getCoreField('studentName').title} {getCoreField('studentName').required && '*'}</label>
              <input type="text" required={getCoreField('studentName').required} value={formData.studentName} onChange={e => setFormData({...formData, studentName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800" placeholder="Ali Ahmad" />
            </div>
          )}`
);

formContent = formContent.replace(
  `<div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{getCoreField('fatherName', 'Father Name', true).title} {getCoreField('fatherName', '', true).required && '*'}</label>
              <input type="text" required={getCoreField('fatherName', '', true).required} value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800" placeholder="Muhammad Ahmad" />
            </div>`,
  `{getCoreField('fatherName') && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{getCoreField('fatherName').title} {getCoreField('fatherName').required && '*'}</label>
              <input type="text" required={getCoreField('fatherName').required} value={formData.fatherName} onChange={e => setFormData({...formData, fatherName: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800" placeholder="Muhammad Ahmad" />
            </div>
          )}`
);

formContent = formContent.replace(
  `<div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{getCoreField('dob', 'Date of Birth', true).title} {getCoreField('dob', '', true).required && '*'}</label>
              <div className="relative">
                <input type="date" required={getCoreField('dob', '', true).required} value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800 pl-10" />
                <Calendar className="absolute left-3 top-3.5 text-slate-400" size={18} />
              </div>
            </div>`,
  `{getCoreField('dob') && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{getCoreField('dob').title} {getCoreField('dob').required && '*'}</label>
              <div className="relative">
                <input type="date" required={getCoreField('dob').required} value={formData.dob} onChange={e => setFormData({...formData, dob: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800 pl-10" />
                <Calendar className="absolute left-3 top-3.5 text-slate-400" size={18} />
              </div>
            </div>
          )}`
);

formContent = formContent.replace(
  `<div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{getCoreField('cnic', 'CNIC / B-Form Number', true).title} {getCoreField('cnic', '', true).required && '*'}</label>
              <div className="relative">
                <input type="text" required={getCoreField('cnic', '', true).required} value={formData.cnic} onChange={handleCnicChange} placeholder="00000-0000000-0" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800 font-mono pl-10" />
                <CreditCard className="absolute left-3 top-3.5 text-slate-400" size={18} />
              </div>
            </div>`,
  `{getCoreField('cnic') && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{getCoreField('cnic').title} {getCoreField('cnic').required && '*'}</label>
              <div className="relative">
                <input type="text" required={getCoreField('cnic').required} value={formData.cnic} onChange={handleCnicChange} placeholder="00000-0000000-0" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800 font-mono pl-10" />
                <CreditCard className="absolute left-3 top-3.5 text-slate-400" size={18} />
              </div>
            </div>
          )}`
);

formContent = formContent.replace(
  `<div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{getCoreField('mobile', 'Mobile Number', true).title} {getCoreField('mobile', '', true).required && '*'}</label>
              <input type="tel" required={getCoreField('mobile', '', true).required} value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800 font-mono" placeholder="03001234567" />
            </div>`,
  `{getCoreField('mobile') && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{getCoreField('mobile').title} {getCoreField('mobile').required && '*'}</label>
              <input type="tel" required={getCoreField('mobile').required} value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800 font-mono" placeholder="03001234567" />
            </div>
          )}`
);

formContent = formContent.replace(
  `<div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{getCoreField('whatsapp', 'WhatsApp Number', false).title} {getCoreField('whatsapp', '', false).required && '*'}</label>
              <input type="tel" required={getCoreField('whatsapp', '', false).required} value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800 font-mono" placeholder="03001234567" />
            </div>`,
  `{getCoreField('whatsapp') && (
            <div>
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">{getCoreField('whatsapp').title} {getCoreField('whatsapp').required && '*'}</label>
              <input type="tel" required={getCoreField('whatsapp').required} value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800 font-mono" placeholder="03001234567" />
            </div>
          )}`
);

fs.writeFileSync(formPath, formContent, 'utf8');

// Now remove the restriction from AdmissionFormBuilderModule
let builderPath = 'frontend/src/components/admin/AdmissionFormBuilderModule.tsx';
let builderContent = fs.readFileSync(builderPath, 'utf8');
builderContent = builderContent.replace(
  "if (field.isCore) { alert('Core fields cannot be deleted.'); return; }",
  "// Removed core deletion restriction as requested"
);
fs.writeFileSync(builderPath, builderContent, 'utf8');

console.log('Made form completely dynamic (core fields can be deleted/hidden)');
