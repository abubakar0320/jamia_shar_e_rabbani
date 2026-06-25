const fs = require('fs');
let c = fs.readFileSync('frontend/src/components/admin/AdmissionRequirementsModule.tsx', 'utf8');

// Replace the Requirement interface
c = c.replace(
  `interface Requirement {
  id?: number;
  title: string;
  text: string;
}`,
  `interface Requirement {
  id?: number;
  title: string;
  type?: string;
  required?: boolean;
  options?: string;
}`
);

// Replace initial state
c = c.replace(
  `const [formData, setFormData] = useState<Requirement>({ title: '', text: '' });`,
  `const [formData, setFormData] = useState<Requirement>({ title: '', type: 'text', required: true, options: '' });`
);

// Replace the openEditor
c = c.replace(
  `else setFormData({ title: '', text: '' });`,
  `else setFormData({ title: '', type: 'text', required: true, options: '' });`
);

// Replace the table headers
c = c.replace(
  `<th className="p-4 w-48">Title</th>
                  <th className="p-4">Description</th>`,
  `<th className="p-4 w-48">Field Label</th>
                  <th className="p-4">Type</th>
                  <th className="p-4">Required</th>`
);

// Replace the table rows
c = c.replace(
  `<td className="p-4 text-sm font-bold text-gray-800">{req.title}</td>
                    <td className="p-4 text-xs text-gray-600">{req.text}</td>`,
  `<td className="p-4 text-sm font-bold text-gray-800">{req.title}</td>
                    <td className="p-4 text-xs text-gray-600 uppercase font-black">{req.type || 'text'}</td>
                    <td className="p-4 text-xs">
                      {req.required !== false ? <span className="bg-rose-100 text-rose-700 px-2 py-1 font-bold">YES</span> : <span className="bg-gray-100 text-gray-500 px-2 py-1 font-bold">NO</span>}
                    </td>`
);

// Replace the form fields
const newFormFields = `<div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Field Label / Title</label>
                    <input 
                      type="text"
                      required
                      value={formData.title}
                      onChange={e => setFormData({...formData, title: e.target.value})}
                      className="w-full border border-gray-300 p-3 text-sm focus:border-blue-700 focus:outline-none font-bold"
                      placeholder="e.g. Student Full Name"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Field Type</label>
                      <select 
                        value={formData.type || 'text'}
                        onChange={e => setFormData({...formData, type: e.target.value})}
                        className="w-full border border-gray-300 p-3 text-sm focus:border-blue-700 focus:outline-none font-bold"
                      >
                        <option value="text">Text Input</option>
                        <option value="date">Date Picker</option>
                        <option value="tel">Phone / Number</option>
                        <option value="file">File Upload (Document)</option>
                        <option value="select">Dropdown Options</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Is Required?</label>
                      <select 
                        value={formData.required === false ? 'no' : 'yes'}
                        onChange={e => setFormData({...formData, required: e.target.value === 'yes'})}
                        className="w-full border border-gray-300 p-3 text-sm focus:border-blue-700 focus:outline-none font-bold"
                      >
                        <option value="yes">Yes, Mandatory</option>
                        <option value="no">No, Optional</option>
                      </select>
                    </div>
                  </div>
                  {formData.type === 'select' && (
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Dropdown Options (Comma Separated)</label>
                      <input 
                        type="text"
                        value={formData.options || ''}
                        onChange={e => setFormData({...formData, options: e.target.value})}
                        className="w-full border border-gray-300 p-3 text-sm focus:border-blue-700 focus:outline-none font-bold"
                        placeholder="Option 1, Option 2, Option 3"
                      />
                    </div>
                  )}`;

const oldFormFields = `<div>
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

c = c.replace(oldFormFields, newFormFields);

fs.writeFileSync('frontend/src/components/admin/AdmissionRequirementsModule.tsx', c, 'utf8');
console.log('Patched Admin Requirements Module');
