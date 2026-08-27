const fs = require('fs');

let content = fs.readFileSync('server.js', 'utf8');

const internshipRoutes = `
// Internships
app.post('/api/internships', async (req, res) => {
  const newInternship = {
    id: Date.now(),
    ...req.body,
    applicationNo: \`INT-\${Math.floor(10000 + Math.random() * 90000)}\`,
    date: new Date().toISOString(),
    status: 'Pending'
  };
  
  // Ensure internships array exists
  if(!db.get('internships').value()) {
     db.set('internships', []).write();
  }
  
  db.get('internships').push(newInternship).write();

  const message = \`🌟 *Nayi Internship Application Mosool Hui Hai!* 🌟

*🧑‍🎓 Talib-e-Ilm Ki Tafseelat:*
*Naam:* \${newInternship.fullName}
*Walid ka Naam:* \${newInternship.fatherName}
*Phone:* \${newInternship.phone}
*Email:* \${newInternship.email}

*📚 Education & Domain:*
*Institution:* \${newInternship.institution}
*Education:* \${newInternship.education}
*Field of Interest:* \${newInternship.fieldOfInterest}

*Application No:* \${newInternship.applicationNo}

Jald az jald Admin Panel check karen.\`;

  if (process.env.WHATSAPP_ADMIN_PHONE && process.env.WHATSAPP_API_KEY) {
    const wUrl = \`https://api.callmebot.com/whatsapp.php?phone=\${process.env.WHATSAPP_ADMIN_PHONE}&text=\${encodeURIComponent(message)}&apikey=\${process.env.WHATSAPP_API_KEY}\`;
    fetch(wUrl).catch(err => console.error("WhatsApp notification failed:", err));
  }

  if (process.env.TELEGRAM_BOT_TOKEN && process.env.TELEGRAM_CHAT_ID) {
    const tUrl = \`https://api.telegram.org/bot\${process.env.TELEGRAM_BOT_TOKEN}/sendMessage?chat_id=\${process.env.TELEGRAM_CHAT_ID}&text=\${encodeURIComponent(message)}&parse_mode=Markdown\`;
    fetch(tUrl).catch(err => console.error("Telegram notification failed:", err));
  }

  res.status(201).json(newInternship);
});

app.get('/api/admin/internships', (req, res) => {
  res.json(db.get('internships').value() || []);
});
`;

if(!content.includes('/api/internships')) {
   content = content.replace('// Other Routes', internshipRoutes + '\n\n// Other Routes');
   fs.writeFileSync('server.js', content, 'utf8');
   console.log('Routes added to backend');
} else {
   console.log('Routes already exist');
}
