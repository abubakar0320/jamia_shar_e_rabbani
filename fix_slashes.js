const fs = require('fs');
let f = 'frontend/src/app/internship/program-details/page.tsx';
let c = fs.readFileSync(f, 'utf8');
c = c.replace(/\\\`/g, '`').replace(/\\\$\{/g, '${');
fs.writeFileSync(f, c);
console.log('Replaced');
