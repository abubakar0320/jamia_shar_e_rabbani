const fs = require('fs');
const c = fs.readFileSync('frontend/src/app/admin/[[...slug]]/page.tsx', 'utf8');

const imports = c.split('\n').filter(line => line.startsWith('import'));
console.log(imports.join('\n'));
