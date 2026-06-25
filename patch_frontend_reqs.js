const fs = require('fs');

// 1. Patch AdmissionRequirementsModule.tsx
let adminModule = fs.readFileSync('frontend/src/components/admin/AdmissionRequirementsModule.tsx', 'utf8');

adminModule = adminModule.replace(
  "text: string;",
  "title: string;\n  text: string;"
);

adminModule = adminModule.replace(
  "const [formData, setFormData] = useState<Requirement>({ text: '' });",
  "const [formData, setFormData] = useState<Requirement>({ title: '', text: '' });"
);

adminModule = adminModule.replace(
  "else setFormData({ text: '' });",
  "else setFormData({ title: '', text: '' });"
);

adminModule = adminModule.replace(
  /<th className="p-4">Requirement Detail<\/th>/,
  '<th className="p-4 w-48">Title</th>\n                  <th className="p-4">Description</th>'
);

adminModule = adminModule.replace(
  /<td className="p-4 text-sm font-semibold text-gray-800">{req.text}<\/td>/,
  '<td className="p-4 text-sm font-bold text-gray-800">{req.title}</td>\n                    <td className="p-4 text-xs text-gray-600">{req.text}</td>'
);

const oldTextareaBlock = `<div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Requirement Text</label>
                    <textarea 
                      required
                      rows={4}
                      value={formData.text}
                      onChange={e => setFormData({...formData, text: e.target.value})}
                      className="w-full border border-gray-300 p-3 text-sm focus:border-blue-700 focus:outline-none resize-none"
                      placeholder="e.g. Completed admission form with 4 photos..."
                    />
                  </div>`;

const newTitleAndTextareaBlock = `<div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Requirement Title</label>
                    <input 
                      type="text"
                      required
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full border border-gray-300 p-3 text-sm focus:border-blue-700 focus:outline-none"
                      placeholder="e.g. Age Verification"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Requirement Description</label>
                    <textarea 
                      required
                      rows={4}
                      value={formData.text}
                      onChange={e => setFormData({...formData, text: e.target.value})}
                      className="w-full border border-gray-300 p-3 text-sm focus:border-blue-700 focus:outline-none resize-none"
                      placeholder="e.g. Completed admission form with 4 photos..."
                    />
                  </div>`;

adminModule = adminModule.replace(oldTextareaBlock, newTitleAndTextareaBlock);

fs.writeFileSync('frontend/src/components/admin/AdmissionRequirementsModule.tsx', adminModule, 'utf8');


// 2. Patch admissions/page.tsx
let publicPage = fs.readFileSync('frontend/src/app/admissions/page.tsx', 'utf8');

publicPage = publicPage.replace(
  "useState<{id: number, text: string}[]>([])",
  "useState<{id: number, title: string, text: string}[]>([])"
);

publicPage = publicPage.replace(
  "<div>\n                          <p className=\"text-sm font-semibold text-gray-800 leading-relaxed\">{req.text}</p>\n                        </div>",
  "<div>\n                          <h4 className=\"font-semibold text-gray-900 mb-1\">{req.title}</h4>\n                          <p className=\"text-sm text-gray-600\">{req.text}</p>\n                        </div>"
);

fs.writeFileSync('frontend/src/app/admissions/page.tsx', publicPage, 'utf8');
console.log('Patched frontend to support requirement titles');
