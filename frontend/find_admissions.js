const fs = require('fs');
const c = fs.readFileSync('src/app/admin/[[...slug]]/page.tsx', 'utf8');

const start = c.indexOf('const renderAdmissionsModule');
const end = c.indexOf('// --- STUDENTS MODULE ---', start);
console.log(c.substring(start, end));
