const fs = require('fs');
const c = fs.readFileSync('frontend/src/app/admin/[[...slug]]/page.tsx', 'utf8');

const switchIndex = c.indexOf('switch (activeTab) {');
if(switchIndex !== -1) {
  console.log(c.substring(switchIndex, switchIndex + 500));
} else {
  console.log('No switch statement found for activeTab');
}
