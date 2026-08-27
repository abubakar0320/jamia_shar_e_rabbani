const fs = require('fs');
let file = 'frontend/src/app/admin/[[...slug]]/page.tsx';
let content = fs.readFileSync(file, 'utf8');

if (!content.includes('setCertProfiles] = useState')) {
  content = content.replace('const [internships, setInternships] = useState<any[]>([]);', 
    'const [internships, setInternships] = useState<any[]>([]);\n  const [certProfiles, setCertProfiles] = useState<any[]>([]);'
  );
}

if (!content.includes('resCerts] = await Promise.all')) {
  content = content.replace('resSched, resInt] = await Promise.all([',
    'resSched, resInt, resCerts] = await Promise.all([');
    
  content = content.replace("fetch('/api/admin/internships').catch(() => null)",
    "fetch('/api/admin/internships').catch(() => null),\n  fetch('/api/admin/internship-certificates').catch(() => null)");
}

if (!content.includes('setCertProfiles(data')) {
  content = content.replace('if (resInt && resInt.ok) {',
    `if (resCerts && resCerts.ok) {
    const data = await resCerts.json().catch(() => null);
    setCertProfiles(data ? (data.reverse ? data.reverse() : data) : []);
  }
  if (resInt && resInt.ok) {`
  );
}

if (!content.includes("id: 'cert-profiles'")) {
  content = content.replace("{ id: 'internships', label: 'Internships', icon: <Award size={20} /> },",
    "{ id: 'internships', label: 'Internships', icon: <Award size={20} /> },\n { id: 'cert-profiles', label: 'Cert Profiles', icon: <FileCheck size={20} /> },");
}

if (!content.includes('FileCheck')) {
    content = content.replace('FileText,', 'FileText, FileCheck,');
}

const moduleCode = `
  const renderCertProfilesModule = () => {
    return (
      <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Certificate Profiles</h2>
            <p className="text-slate-500 text-sm">Create and manage public verification profiles for interns.</p>
          </div>
        </div>

        <form onSubmit={async (e) => {
          e.preventDefault();
          const target = e.target as any;
          const formData = {
            name: target.name.value,
            slug: target.slug.value,
            cnic: target.cnic.value,
            phone: target.phone.value,
            university: target.university.value,
            domain: target.domain.value,
            issueDate: target.issueDate.value,
            documents: {} as any
          };

          const toBase64 = (file: File) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
          });

          const internshipLetter = target.internshipLetter.files[0];
          const certificate = target.certificate.files[0];
          const recommendation = target.recommendation.files[0];

          if (internshipLetter) formData.documents.internshipLetter = await toBase64(internshipLetter);
          if (certificate) formData.documents.certificate = await toBase64(certificate);
          if (recommendation) formData.documents.recommendation = await toBase64(recommendation);

          const res = await fetch('/api/admin/internship-certificates', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
          
          if(res.ok) {
            alert('Profile Created!');
            target.reset();
            const newData = await fetch('/api/admin/internship-certificates').then(r=>r.json());
            setCertProfiles(newData.reverse());
          }
        }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
          <h3 className="font-bold text-slate-800 mb-4">Create New Profile</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input name="name" required placeholder="Student Name (e.g. Abu Bakar)" className="p-3 border rounded-lg" />
            <input name="slug" required placeholder="URL Slug (e.g. abubakar)" className="p-3 border rounded-lg" />
            <input name="cnic" required placeholder="CNIC Number" className="p-3 border rounded-lg" />
            <input name="phone" required placeholder="Phone Number" className="p-3 border rounded-lg" />
            <input name="university" required placeholder="University / Institution" className="p-3 border rounded-lg" />
            <input name="domain" required placeholder="Internship Domain (e.g. Web Dev)" className="p-3 border rounded-lg" />
            <input name="issueDate" type="date" required className="p-3 border rounded-lg" />
          </div>
          <div className="space-y-3 pt-2">
            <label className="block text-sm font-semibold">Internship Letter Image</label>
            <input name="internshipLetter" type="file" accept="image/*" className="w-full" required />
            
            <label className="block text-sm font-semibold">Certificate Image</label>
            <input name="certificate" type="file" accept="image/*" className="w-full" required />
            
            <label className="block text-sm font-semibold">Recommendation Letter Image</label>
            <input name="recommendation" type="file" accept="image/*" className="w-full" required />
          </div>
          <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
            Create Profile
          </button>
        </form>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b">
                <th className="p-4">Name</th>
                <th className="p-4">URL Slug</th>
                <th className="p-4">Domain</th>
                <th className="p-4">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {certProfiles.map((p, i) => (
                <tr key={i}>
                  <td className="p-4">{p.name}</td>
                  <td className="p-4"><a href={\`/internship/\${p.slug}\`} target="_blank" className="text-blue-600 hover:underline">/internship/{p.slug}</a></td>
                  <td className="p-4">{p.domain}</td>
                  <td className="p-4">
                    <button onClick={async () => {
                      if(confirm('Delete this profile?')) {
                        await fetch(\`/api/admin/internship-certificates/\${p.id}\`, { method: 'DELETE' });
                        setCertProfiles(certProfiles.filter(x => x.id !== p.id));
                      }
                    }} className="text-red-500 hover:text-red-700">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  };
`;

if (!content.includes('renderCertProfilesModule')) {
  content = content.replace('const renderAdmissionsModule = () => {', moduleCode + '\n  const renderAdmissionsModule = () => {');
}

if (!content.includes("case 'cert-profiles': return renderCertProfilesModule();")) {
  content = content.replace("case 'admissions': return renderAdmissionsModule();", 
    "case 'cert-profiles': return renderCertProfilesModule();\n  case 'admissions': return renderAdmissionsModule();");
}

fs.writeFileSync(file, content, 'utf8');
console.log('Admin patched successfully with Certificates module');
