const fs = require('fs');
let file = 'frontend/src/app/admin/[[...slug]]/page.tsx';
let content = fs.readFileSync(file, 'utf8');

// 1. Add state
if (!content.includes('setInternships] = useState')) {
  content = content.replace('const [admissions, setAdmissions] = useState<Admission[]>([]);', 
    'const [admissions, setAdmissions] = useState<Admission[]>([]);\n  const [internships, setInternships] = useState<any[]>([]);'
  );
}

// 2 & 3. Update fetch
if (!content.includes('resInt] = await Promise.all')) {
  content = content.replace('const [resAdm, resStu, resFac, resCrs, resFs, resCh, resCat, resSched] = await Promise.all([',
    'const [resAdm, resStu, resFac, resCrs, resFs, resCh, resCat, resSched, resInt] = await Promise.all([');
    
  content = content.replace("fetch('/api/admission-schedule').catch(() => null)",
    "fetch('/api/admission-schedule').catch(() => null),\n  fetch('/api/admin/internships').catch(() => null)");
}

// 4. Update state from fetch
if (!content.includes('setInternships(data')) {
  content = content.replace('if (resAdm && resAdm.ok) {',
    `if (resInt && resInt.ok) {
    const data = await resInt.json().catch(() => null);
    setInternships(data ? (data.reverse ? data.reverse() : data) : []);
  }
  if (resAdm && resAdm.ok) {`
  );
}

// 5. Add TAB
if (!content.includes("id: 'internships'")) {
  content = content.replace("{ id: 'admissions', label: 'Admissions', icon: <FileText size={20} /> },",
    "{ id: 'admissions', label: 'Admissions', icon: <FileText size={20} /> },\n { id: 'internships', label: 'Internships', icon: <Award size={20} /> },");
}

// 6. Add render module
const moduleCode = `
  const renderInternshipsModule = () => {
    return (
      <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Internship Applications</h2>
            <p className="text-slate-500 text-sm">View all students who applied for the internship program.</p>
          </div>
          <div className="flex items-center gap-3">
             <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium text-sm flex items-center gap-2">
               <Award size={16} /> Total: {internships.length}
             </div>
          </div>
        </div>
        
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                  <th className="p-4">App ID</th>
                  <th className="p-4">Applicant Info</th>
                  <th className="p-4">Institution & Edu</th>
                  <th className="p-4">Domain</th>
                  <th className="p-4">Date</th>
                  <th className="p-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {internships.map((int, i) => (
                  <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4">
                      <span className="font-mono text-sm font-semibold text-slate-700">{int.applicationNo}</span>
                    </td>
                    <td className="p-4">
                      <div className="font-semibold text-slate-800">{int.fullName}</div>
                      <div className="text-xs text-slate-500">{int.email}</div>
                      <div className="text-xs text-slate-500">{int.phone}</div>
                    </td>
                    <td className="p-4">
                      <div className="text-sm text-slate-700 font-medium">{int.institution}</div>
                      <div className="text-xs text-slate-500">{int.education}</div>
                    </td>
                    <td className="p-4">
                      <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-md border border-amber-100 whitespace-nowrap">
                        {int.fieldOfInterest}
                      </span>
                    </td>
                    <td className="p-4 text-sm text-slate-600">
                      {new Date(int.date).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                       <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full border border-slate-200">
                          {int.status || 'Pending'}
                       </span>
                    </td>
                  </tr>
                ))}
                {internships.length === 0 && (
                  <tr>
                    <td colSpan={6} className="p-12 text-center text-slate-500">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <FileText size={32} className="text-slate-300" />
                        <p>No internship applications yet.</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
`;

if (!content.includes('renderInternshipsModule')) {
  content = content.replace('const renderAdmissionsModule = () => {', moduleCode + '\n  const renderAdmissionsModule = () => {');
}

// 7. Add switch case
if (!content.includes("case 'internships': return renderInternshipsModule();")) {
  content = content.replace("case 'admissions': return renderAdmissionsModule();", 
    "case 'internships': return renderInternshipsModule();\n  case 'admissions': return renderAdmissionsModule();");
}

fs.writeFileSync(file, content, 'utf8');
console.log('Admin patched successfully');
