const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, 'src', 'app', 'admin', 'page.tsx');
let content = fs.readFileSync(filePath, 'utf8');

// 1. Replace all emerald with blue
content = content.replace(/emerald-/g, 'blue-');

// 2. Replace large rounded corners with simple borders
content = content.replace(/rounded-\[.*?\]/g, 'rounded-sm');
content = content.replace(/rounded-3xl/g, 'rounded-sm');
content = content.replace(/rounded-2xl/g, 'rounded-sm');
content = content.replace(/rounded-xl/g, 'rounded-sm');
content = content.replace(/rounded-lg/g, 'rounded-sm');

// 3. Remove blur and heavy shadows
content = content.replace(/backdrop-blur-[a-z0-9]+/g, '');
content = content.replace(/shadow-2xl/g, 'shadow-sm border border-gray-200');
content = content.replace(/shadow-xl/g, 'shadow-sm border border-gray-200');
content = content.replace(/shadow-lg/g, 'shadow-sm');
content = content.replace(/shadow-\[.*?\]/g, 'shadow-sm');

// 4. Remove gradients
content = content.replace(/bg-gradient-to-[a-z]+/g, '');
content = content.replace(/from-blue-[0-9]+/g, 'bg-blue-700');
content = content.replace(/to-blue-[0-9]+/g, '');
content = content.replace(/via-blue-[0-9]+/g, '');
content = content.replace(/from-slate-[0-9]+/g, 'bg-slate-800');
content = content.replace(/to-slate-[0-9]+/g, '');

// 5. General cleanup of multiple spaces
content = content.replace(/  +/g, ' ');

fs.writeFileSync(filePath, content, 'utf8');
console.log('Successfully updated admin/page.tsx styles');
