const fs = require('fs');
const content = fs.readFileSync('src/app/admin/page.tsx', 'utf8');

const startIndex = content.indexOf(`activeTab === 'fees'`);
if (startIndex !== -1) {
  const snippet = content.substring(startIndex, startIndex + 2000);
  console.log(snippet);
} else {
  console.log('Not found');
}
