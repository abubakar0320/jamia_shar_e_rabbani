const https = require('https');

https.get('https://iamabubakar.site', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    // Just find all unique tailwind color classes in the raw HTML string
    // regardless of where they are (JSON payload, chunks, etc.)
    const matches = d.match(/(?:bg|text|border|from|via|to|shadow|ring|outline|fill|stroke|hover:bg|hover:text)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|black|white|transparent)(?:-[0-9]{2,3}(?:\/[0-9]{1,2})?)?/g);
    
    if (matches) {
        const colors = new Set(matches);
        console.log(Array.from(colors).sort().join('\n'));
    } else {
        console.log('No matches');
    }
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
