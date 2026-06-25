const https = require('https');

https.get('https://iamabubakar.site', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    // Find script tags
    const scripts = d.match(/src="(\/_next\/static\/chunks\/[^"]+\.js)"/g) || [];
    
    scripts.forEach(script => {
        const url = 'https://iamabubakar.site' + script.match(/src="([^"]+)"/)[1];
        https.get(url, jsRes => {
            let jsData = '';
            jsRes.on('data', c => jsData += c);
            jsRes.on('end', () => {
                const matches = jsData.match(/(?:bg|text|border|from|via|to|shadow|ring|outline|fill|stroke|hover:bg|hover:text)-(?:slate|gray|zinc|neutral|stone|red|orange|amber|yellow|lime|green|emerald|teal|cyan|sky|blue|indigo|violet|purple|fuchsia|pink|rose|black|white|transparent)(?:-[0-9]{2,3}(?:\/[0-9]{1,2})?)?/g);
                if (matches) {
                    const colors = new Set(matches);
                    console.log('From chunk ' + url + ':\n' + Array.from(colors).sort().join('\n'));
                }
            });
        });
    });
  });
}).on("error", (err) => {
  console.log("Error: " + err.message);
});
