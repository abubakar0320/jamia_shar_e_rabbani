const fs = require('fs');
const filePath = 'src/components/admin/FeeManagementModule.tsx';
let c = fs.readFileSync(filePath, 'utf8');

// 1. Remove window.scrollTo
c = c.replace("window.scrollTo({ top: 0, behavior: 'smooth' });", "");

// 2. Replace the inline isEditing block with a modal
const startIndex = c.indexOf('{isEditing && (');
const endIndex = c.indexOf(')}', c.indexOf('</form>')) + 2;

if (startIndex !== -1 && endIndex !== -1) {
  const oldEditingBlock = c.substring(startIndex, endIndex);

  const newEditingBlock = `{isEditing && (
          <div className="fixed inset-0 z-[80] flex justify-end bg-slate-900/50 backdrop-blur-sm">
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="bg-white w-full max-w-md h-full shadow-2xl flex flex-col border-l border-gray-300"
            >
              <div className="p-6 border-b border-gray-200 bg-gray-50 flex justify-between items-center shrink-0">
                <h2 className="text-lg font-bold uppercase text-gray-800 flex items-center gap-2">
                  <BookOpen size={20} className="text-blue-700" />
                  {formData.id ? 'Edit Class Fee' : 'New Class Fee'}
                </h2>
                <button onClick={() => setIsEditing(false)} className="text-gray-400 hover:text-red-500 transition-colors p-1">
                  <X size={24} />
                </button>
              </div>

              <div className="p-6 overflow-y-auto flex-1">
                <form id="fee-form" onSubmit={handleSave} className="flex flex-col gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Section Type</label>
                    <select 
                      value={formData.sectionType}
                      onChange={e => setFormData({...formData, sectionType: e.target.value})}
                      className="w-full border border-gray-300 p-3 text-sm focus:border-blue-700 focus:outline-none"
                    >
                      {SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Class / Program</label>
                    <select 
                      value={formData.classProgram}
                      onChange={e => setFormData({...formData, classProgram: e.target.value})}
                      className="w-full border border-gray-300 p-3 text-sm focus:border-blue-700 focus:outline-none"
                    >
                      {CLASSES.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Admission Fee (Rs)</label>
                    <input 
                      type="number" 
                      required
                      value={formData.admissionFee === 0 ? '' : formData.admissionFee}
                      onChange={e => setFormData({...formData, admissionFee: e.target.value === '' ? 0 : parseInt(e.target.value)})}
                      className="w-full border border-gray-300 p-3 text-sm focus:border-blue-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Registration Fee (Rs)</label>
                    <input 
                      type="number" 
                      required
                      value={formData.registrationFee === 0 ? '' : formData.registrationFee}
                      onChange={e => setFormData({...formData, registrationFee: e.target.value === '' ? 0 : parseInt(e.target.value)})}
                      className="w-full border border-gray-300 p-3 text-sm focus:border-blue-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Monthly Fee (Rs)</label>
                    <input 
                      type="number" 
                      required
                      value={formData.monthlyFee === 0 ? '' : formData.monthlyFee}
                      onChange={e => setFormData({...formData, monthlyFee: e.target.value === '' ? 0 : parseInt(e.target.value)})}
                      className="w-full border border-gray-300 p-3 text-sm focus:border-blue-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Annual Charges (Rs)</label>
                    <input 
                      type="number" 
                      required
                      value={formData.annualCharges === 0 ? '' : formData.annualCharges}
                      onChange={e => setFormData({...formData, annualCharges: e.target.value === '' ? 0 : parseInt(e.target.value)})}
                      className="w-full border border-gray-300 p-3 text-sm focus:border-blue-700 focus:outline-none"
                    />
                  </div>
                </form>
              </div>

              <div className="p-6 border-t border-gray-200 bg-gray-50 flex gap-3 shrink-0">
                <button 
                  type="button" 
                  onClick={() => setIsEditing(false)}
                  className="flex-1 py-3 border border-gray-300 text-gray-700 font-semibold text-sm uppercase hover:bg-gray-100 transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  form="fee-form"
                  className="flex-[2] py-3 bg-blue-700 text-white font-semibold text-sm uppercase hover:bg-blue-800 flex items-center justify-center gap-2 transition-colors"
                >
                  <Save size={18} /> Save
                </button>
              </div>
            </motion.div>
          </div>
        }`;

  c = c.replace(oldEditingBlock, newEditingBlock);
  fs.writeFileSync(filePath, c, 'utf8');
  console.log('Fixed slider layout');
} else {
  console.log('Could not find isEditing block');
}
