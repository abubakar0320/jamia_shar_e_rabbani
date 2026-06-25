const fs = require('fs');

let lines = fs.readFileSync('backend/server.js', 'utf8').split('\n');

// 705 to 904 is index 704 to 903
lines.splice(704, 200);

fs.writeFileSync('backend/server.js', lines.join('\n'), 'utf8');
console.log('Fixed server.js corruption');
