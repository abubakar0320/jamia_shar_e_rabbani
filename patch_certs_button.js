const fs = require('fs');
let file = 'frontend/src/app/admin/[[...slug]]/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// Replace the onSubmit function to add loading text and error handling
let oldSubmit = `        <form onSubmit={async (e) => {
          e.preventDefault();
          const target = e.target as any;
          const formData = {`;

let newSubmit = `        <form onSubmit={async (e) => {
          e.preventDefault();
          const target = e.target as any;
          const submitBtn = target.querySelector('button[type="submit"]');
          const originalText = submitBtn.innerText;
          submitBtn.innerText = 'Creating Profile... Please wait';
          submitBtn.disabled = true;

          try {
            const formData = {`;

content = content.replace(oldSubmit, newSubmit);

let oldFetch = `          if(res.ok) {
            alert('Profile Created!');
            target.reset();
            const newData = await fetch('/api/admin/internship-certificates').then(r=>r.json());
            setCertProfiles(newData.reverse());
          }
        }} className="bg-white`;

let newFetch = `          if(res.ok) {
            alert('Profile Created!');
            target.reset();
            const newData = await fetch('/api/admin/internship-certificates').then(r=>r.json());
            setCertProfiles(newData.reverse());
          } else {
            const errorText = await res.text();
            alert('Error creating profile: ' + errorText);
          }
          } catch (err: any) {
             alert('Network Error: ' + err.message);
          } finally {
             submitBtn.innerText = originalText;
             submitBtn.disabled = false;
          }
        }} className="bg-white`;

content = content.replace(oldFetch, newFetch);
fs.writeFileSync(file, content, 'utf8');
console.log('Button loading state and error handling added');
