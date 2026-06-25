const fs = require('fs');
const filePath = 'src/app/admin/[[...slug]]/page.tsx';
let c = fs.readFileSync(filePath, 'utf8');

c = c.replace(
  "onClick={() => router.back()}", 
  "onClick={() => router.push('/admin/overview')}"
);
c = c.replace(
  "Go Back",
  "Back to Dashboard"
);

fs.writeFileSync(filePath, c, 'utf8');
console.log('Fixed back button');
