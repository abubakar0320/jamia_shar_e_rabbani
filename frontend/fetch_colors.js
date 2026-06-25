const https = require('https');

https.get('https://iamabubakar.site', (res) => {
  let data = '';
  res.on('data', (chunk) => { data += chunk; });
  res.on('end', () => {
    const classesMatch = data.match(/class(?:Name)?="([^"]+)"/g) || [];
    const colors = new Set();
    classesMatch.forEach(c => {
      const match = c.match(/(?:bg|text|border|from|via|to|shadow|hover:bg|hover:text)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|black|white|transparent)(?:-[0-9]{2,3}(?:\/[0-9]{1,2})?)?/g);
      if (match) match.forEach(x => colors.add(x));
    });
    console.log(Array.from(colors).sort().join('\n'));
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
