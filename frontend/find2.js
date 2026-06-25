const fs = require('fs');
const c = fs.readFileSync('src/app/admin/[[...slug]]/page.tsx', 'utf8');

const start = c.indexOf('const renderAdmissionsModule');
const lines = c.substring(start).split('\n');

let res = [];
for(let i=0; i<300; i++) {
  res.push(lines[i]);
}
console.log(res.join('\n'));
