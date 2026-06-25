const fs = require('fs');

let content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

// 1. Inject import
if (!content.includes('import FeeManagementModule')) {
  content = content.replace(
    "import AdmissionScheduleModal from '@/components/AdmissionScheduleModal';",
    "import AdmissionScheduleModal from '@/components/AdmissionScheduleModal';\nimport FeeManagementModule from '@/components/admin/FeeManagementModule';"
  );
}

// 2. Inject SIDEBAR_ITEM
if (!content.includes("id: 'fee-management'")) {
  content = content.replace(
    "{ id: 'fees', label: 'Fees & Challans', icon: <DollarSign size={20} /> },",
    "{ id: 'fees', label: 'Fees & Challans', icon: <DollarSign size={20} /> },\n  { id: 'fee-management', label: 'Manage Fee Structures', icon: <Landmark size={20} /> },"
  );
}

// 3. Inject renderContent case
if (!content.includes("case 'fee-management':")) {
  content = content.replace(
    "case 'fees': return renderFeesModule();",
    "case 'fees': return renderFeesModule();\n    case 'fee-management': return <FeeManagementModule />;"
  );
}

fs.writeFileSync('src/app/admin/page.tsx', content, 'utf8');
console.log('Injected fee management module!');
