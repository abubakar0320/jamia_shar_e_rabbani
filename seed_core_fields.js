const fs = require('fs');

const dbPath = './backend/db.json';
const db = require(dbPath);

const CORE_FIELDS = [
  { id: 'studentName', title: 'Student Full Name', type: 'text', required: true, isCore: true },
  { id: 'fatherName', title: 'Father Name', type: 'text', required: true, isCore: true },
  { id: 'dob', title: 'Date of Birth', type: 'date', required: true, isCore: true },
  { id: 'cnic', title: 'CNIC / B-Form Number', type: 'text', required: true, isCore: true },
  { id: 'mobile', title: 'Mobile Number', type: 'tel', required: true, isCore: true },
  { id: 'whatsapp', title: 'WhatsApp Number', type: 'tel', required: false, isCore: true }
];

if (!db.customFormFields) db.customFormFields = [];

// Add core fields if they don't exist
CORE_FIELDS.forEach(coreField => {
  if (!db.customFormFields.find(f => f.id === coreField.id)) {
    db.customFormFields.unshift(coreField);
  }
});

fs.writeFileSync(dbPath, JSON.stringify(db, null, 2), 'utf8');

// Now update AdmissionFormBuilderModule to handle isCore fields
let builderPath = 'frontend/src/components/admin/AdmissionFormBuilderModule.tsx';
let builderCode = fs.readFileSync(builderPath, 'utf8');

// Make sure delete doesn't work on core fields
builderCode = builderCode.replace(
  "const handleDelete = async (id: string) => {",
  "const handleDelete = async (field: any) => {\n    if (field.isCore) { alert('Core fields cannot be deleted.'); return; }\n    const id = field.id;"
);
builderCode = builderCode.replace(
  "handleDelete(f.id)",
  "handleDelete(f)"
);

// Add a badge for core fields
builderCode = builderCode.replace(
  "<td className=\"p-4 text-sm font-bold text-gray-800\">{f.title}</td>",
  "<td className=\"p-4 text-sm font-bold text-gray-800\">\n                      {f.title}\n                      {f.isCore && <span className=\"ml-2 text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded uppercase tracking-wider\">Default</span>}\n                    </td>"
);

// Prevent editing type of core field
builderCode = builderCode.replace(
  "<select value={formData.type}",
  "<select disabled={formData.isCore} value={formData.type}"
);

fs.writeFileSync(builderPath, builderCode, 'utf8');

console.log('Seed core fields and updated builder');
