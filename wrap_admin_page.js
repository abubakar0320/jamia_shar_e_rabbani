const fs = require('fs');

const pagePath = 'frontend/src/app/admin/[[...slug]]/page.tsx';
let pageContent = fs.readFileSync(pagePath, 'utf8');

if (!pageContent.includes('AdminGuard')) {
  pageContent = pageContent.replace(
    "import AdmissionFormBuilderModule from '@/components/admin/AdmissionFormBuilderModule';",
    "import AdmissionFormBuilderModule from '@/components/admin/AdmissionFormBuilderModule';\nimport AdminGuard from '@/components/admin/AdminGuard';"
  );
  
  // Wrap the main return of AdminDashboard
  pageContent = pageContent.replace(
    "return (\n    <div className=\"flex h-screen bg-slate-100 font-sans\">",
    "return (\n    <AdminGuard>\n    <div className=\"flex h-screen bg-slate-100 font-sans\">"
  );
  
  // Replace the closing tag. Wait, AdminDashboard ends at the very end of the file?
  // Let's replace the last </div>\n  );\n}
  pageContent = pageContent.replace(
    "      </div>\n    </div>\n  );\n}",
    "      </div>\n    </div>\n    </AdminGuard>\n  );\n}"
  );
  
  fs.writeFileSync(pagePath, pageContent, 'utf8');
  console.log('Admin page.tsx wrapped with AdminGuard');
} else {
  console.log('Already wrapped');
}
