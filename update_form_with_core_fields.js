const fs = require('fs');

let formPath = 'frontend/src/components/AdmissionForm.tsx';
let formContent = fs.readFileSync(formPath, 'utf8');

// Helper to extract a core field configuration.
formContent = formContent.replace(
  "const customTextFields = customFields.filter(f => f.type !== 'file');",
  "const customTextFields = customFields.filter(f => f.type !== 'file' && !f.isCore);\n  const getCoreField = (id: string, defaultTitle: string, defaultRequired: boolean) => {\n    const f = customFields.find(f => f.id === id);\n    return f ? { title: f.title, required: f.required } : { title: defaultTitle, required: defaultRequired };\n  };"
);

// Now replace hardcoded labels with dynamic ones.
formContent = formContent.replace(
  "<label className=\"block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2\">Student Full Name *</label>",
  "<label className=\"block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2\">{getCoreField('studentName', 'Student Full Name', true).title} {getCoreField('studentName', '', true).required && '*'}</label>"
);
formContent = formContent.replace(
  "required value={formData.studentName}",
  "required={getCoreField('studentName', '', true).required} value={formData.studentName}"
);

formContent = formContent.replace(
  "<label className=\"block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2\">Father Name *</label>",
  "<label className=\"block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2\">{getCoreField('fatherName', 'Father Name', true).title} {getCoreField('fatherName', '', true).required && '*'}</label>"
);
formContent = formContent.replace(
  "required value={formData.fatherName}",
  "required={getCoreField('fatherName', '', true).required} value={formData.fatherName}"
);

formContent = formContent.replace(
  "<label className=\"block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2\">Date of Birth *</label>",
  "<label className=\"block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2\">{getCoreField('dob', 'Date of Birth', true).title} {getCoreField('dob', '', true).required && '*'}</label>"
);
formContent = formContent.replace(
  "required value={formData.dob}",
  "required={getCoreField('dob', '', true).required} value={formData.dob}"
);

formContent = formContent.replace(
  "<label className=\"block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2\">CNIC / B-Form Number *</label>",
  "<label className=\"block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2\">{getCoreField('cnic', 'CNIC / B-Form Number', true).title} {getCoreField('cnic', '', true).required && '*'}</label>"
);
formContent = formContent.replace(
  "required value={formData.cnic}",
  "required={getCoreField('cnic', '', true).required} value={formData.cnic}"
);

formContent = formContent.replace(
  "<label className=\"block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2\">Mobile Number *</label>",
  "<label className=\"block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2\">{getCoreField('mobile', 'Mobile Number', true).title} {getCoreField('mobile', '', true).required && '*'}</label>"
);
formContent = formContent.replace(
  "required value={formData.mobile}",
  "required={getCoreField('mobile', '', true).required} value={formData.mobile}"
);

formContent = formContent.replace(
  "<label className=\"block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2\">WhatsApp Number</label>",
  "<label className=\"block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2\">{getCoreField('whatsapp', 'WhatsApp Number', false).title} {getCoreField('whatsapp', '', false).required && '*'}</label>"
);

// We need to also fix whatsapp required since it might not have 'required' keyword previously
formContent = formContent.replace(
  "value={formData.whatsapp}",
  "required={getCoreField('whatsapp', '', false).required} value={formData.whatsapp}"
);

fs.writeFileSync(formPath, formContent, 'utf8');
console.log('AdmissionForm.tsx updated to use dynamic core fields');
