const fs = require('fs');
let c = fs.readFileSync('src/app/admin/[[...slug]]/page.tsx', 'utf8');

// 1. Inject import
if (!c.includes('import AdmissionRequirementsModule')) {
  c = c.replace(
    "import FeeManagementModule from '@/components/admin/FeeManagementModule';",
    "import FeeManagementModule from '@/components/admin/FeeManagementModule';\nimport AdmissionRequirementsModule from '@/components/admin/AdmissionRequirementsModule';"
  );
}

// 2. Inject SIDEBAR_ITEM
if (!c.includes("id: 'admission-requirements'")) {
  c = c.replace(
    "{ id: 'admissions', label: 'Admissions', icon: <FileText size={20} /> },",
    "{ id: 'admissions', label: 'Admissions', icon: <FileText size={20} /> },\n  { id: 'admission-requirements', label: 'Admission Requirements', icon: <FileText size={20} /> },"
  );
}

// 3. Inject renderContent case
if (!c.includes("case 'admission-requirements':")) {
  c = c.replace(
    "case 'admissions': return renderAdmissionsModule();",
    "case 'admissions': return renderAdmissionsModule();\n    case 'admission-requirements': return <AdmissionRequirementsModule />;"
  );
}

fs.writeFileSync('src/app/admin/[[...slug]]/page.tsx', c, 'utf8');
console.log('Injected admission requirements module into admin sidebar');
