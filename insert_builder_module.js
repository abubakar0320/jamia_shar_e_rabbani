const fs = require('fs');

let pagePath = 'frontend/src/app/admin/[[...slug]]/page.tsx';
let pageContent = fs.readFileSync(pagePath, 'utf8');

if (!pageContent.includes('AdmissionFormBuilderModule')) {
  // Add import
  pageContent = pageContent.replace(
    "import AdmissionRequirementsModule from '@/components/admin/AdmissionRequirementsModule';",
    "import AdmissionRequirementsModule from '@/components/admin/AdmissionRequirementsModule';\nimport AdmissionFormBuilderModule from '@/components/admin/AdmissionFormBuilderModule';"
  );

  // Add sidebar item
  pageContent = pageContent.replace(
    "{ id: 'admission-requirements', label: 'Admission Requirements', icon: <FileText size={20} /> },",
    "{ id: 'admission-requirements', label: 'Admission Requirements', icon: <FileText size={20} /> },\n  { id: 'form-builder', label: 'Form Customization', icon: <FileText size={20} /> },"
  );

  // Add route case
  pageContent = pageContent.replace(
    "case 'admission-requirements': return <AdmissionRequirementsModule />;",
    "case 'admission-requirements': return <AdmissionRequirementsModule />;\n    case 'form-builder': return <AdmissionFormBuilderModule />;"
  );

  fs.writeFileSync(pagePath, pageContent, 'utf8');
  console.log('Inserted AdmissionFormBuilderModule into Admin page.tsx');
} else {
  console.log('AdmissionFormBuilderModule already exists in page.tsx');
}
