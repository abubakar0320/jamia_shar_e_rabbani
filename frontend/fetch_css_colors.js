const https = require('https');

https.get('https://iamabubakar.site', res => {
  let d = '';
  res.on('data', c => d += c);
  res.on('end', () => {
    const cssLinks = d.match(/<link[^>]+href="([^"]+\.css)"/g) || [];
    cssLinks.forEach(link => {
      const urlMatch = link.match(/href="([^"]+)"/);
      if(!urlMatch) return;
      const url = urlMatch[1];
      const fullUrl = url.startsWith('http') ? url : 'https://iamabubakar.site' + (url.startsWith('/') ? '' : '/') + url;
      https.get(fullUrl, cssRes => {
        let cssData = '';
        cssRes.on('data', c => cssData += c);
        cssRes.on('end', () => {
          const vars = cssData.match(/--[a-zA-Z0-9-]+:\s*[^;{}]+;/g);
          if (vars) {
            console.log('Custom Variables from ' + fullUrl + ':\n', vars.join('\n'));
          } else {
            console.log('No vars found in ' + fullUrl);
          }
        });
      });
    });
  });
}).on("error", (err) => console.log(err.message));
