const fs = require('fs');

let pageContent = fs.readFileSync('frontend/src/app/admin/[[...slug]]/page.tsx', 'utf8');

// The bug is: router.push('/admin/' + tab)
pageContent = pageContent.replace(
  "onClick={() => router.push('/admin/' + tab)}",
  "onClick={() => setActiveTab(tab)}"
);

fs.writeFileSync('frontend/src/app/admin/[[...slug]]/page.tsx', pageContent, 'utf8');

console.log('Fixed router bug in FeeSettingsModal');
