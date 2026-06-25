const fs = require('fs');

let formPath = 'frontend/src/components/AdmissionForm.tsx';
let formContent = fs.readFileSync(formPath, 'utf8');

if (!formContent.includes('customFields')) {
  // Add state for custom fields
  formContent = formContent.replace(
    "const [documents, setDocuments] = useState<Record<string, any>>({});",
    "const [documents, setDocuments] = useState<Record<string, any>>({});\n  const [customFields, setCustomFields] = useState<any[]>([]);"
  );

  // Add useEffect to fetch custom fields
  formContent = formContent.replace(
    "const [isSubmitting, setIsSubmitting] = useState(false);",
    "const [isSubmitting, setIsSubmitting] = useState(false);\n\n  React.useEffect(() => {\n    fetch('http://localhost:5000/api/admin/form-fields?t=' + Date.now())\n      .then(res => res.json())\n      .then(data => setCustomFields(data || []))\n      .catch(console.error);\n  }, []);"
  );

  // Filter custom docs vs custom text fields
  formContent = formContent.replace(
    "const currentRequiredDocs = KHASUSI_DOCS[getBaseClassName(formData.classProgram)] || DEFAULT_REQUIRED_DOCS;",
    "const baseRequiredDocs = KHASUSI_DOCS[getBaseClassName(formData.classProgram)] || DEFAULT_REQUIRED_DOCS;\n  const customFileFields = customFields.filter(f => f.type === 'file').map(f => ({ id: f.title, label: f.title }));\n  const currentRequiredDocs = [...baseRequiredDocs, ...customFileFields];\n  const customTextFields = customFields.filter(f => f.type !== 'file');"
  );

  // Inject custom text fields rendering block
  const customTextRendering = `
        {/* Custom Dynamic Fields */}
        {customTextFields.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-2 border-b border-slate-200 pb-2">
              <User className="text-blue-600" /> Additional Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {customTextFields.map(field => (
                <div key={field.id} className={field.type === 'select' ? 'md:col-span-2' : ''}>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-widest mb-2">
                    {field.title} {field.required && <span className="text-red-500">*</span>}
                  </label>
                  {field.type === 'select' ? (
                    <select required={field.required} value={formData[field.title] || ''} onChange={e => setFormData({...formData, [field.title]: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800">
                      <option value="">-- Select {field.title} --</option>
                      {(field.options || '').split(',').map((opt: string) => opt.trim()).filter((o:string)=>o).map((opt: string) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input type={field.type === 'date' ? 'date' : 'text'} required={field.required} value={formData[field.title] || ''} onChange={e => setFormData({...formData, [field.title]: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 focus:border-blue-600 outline-none font-bold text-slate-800" placeholder={'Enter ' + field.title} />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
  `;

  formContent = formContent.replace(
    "{/* Document Uploads */}",
    customTextRendering + "\n        {/* Document Uploads */}"
  );

  // Validate custom text fields before submit
  formContent = formContent.replace(
    "const missingDocs = currentRequiredDocs.filter(d => !documents[d.id]);",
    "for (const f of customTextFields) {\n      if (f.required && !formData[f.title]) {\n        alert('Please fill out ' + f.title);\n        setIsSubmitting(false);\n        return;\n      }\n    }\n\n    const missingDocs = currentRequiredDocs.filter(d => !documents[d.id]);"
  );

  fs.writeFileSync(formPath, formContent, 'utf8');
  console.log('Successfully updated AdmissionForm.tsx with customFields logic');
} else {
  console.log('AdmissionForm.tsx already has customFields logic');
}
