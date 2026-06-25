const fs = require('fs');
const lines = fs.readFileSync('src/app/admin/[[...slug]]/page.tsx', 'utf8').split('\n');

for(let i=0; i<lines.length; i++) {
  if(lines[i].includes('isEditingApp')) {
    console.log(`--- Line ${i+1} ---`);
    for(let j=Math.max(0, i-5); j<=Math.min(lines.length-1, i+15); j++) {
      console.log(lines[j]);
    }
  }
}
