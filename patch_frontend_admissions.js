const fs = require('fs');
let c = fs.readFileSync('frontend/src/app/admin/[[...slug]]/page.tsx', 'utf8');

const oldRenderForm = `if (isEditingApp && selectedApplication) {
 return renderGenericForm('Edit Admission Application', ['Student Name', 'Father Name', 'Mobile Number', 'CNIC', 'Selected Class']);
 }`;

const newEditForm = `if (isEditingApp && selectedApplication) {
  return (
    <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-200 max-w-3xl">
      <h3 className="text-xl font-black text-slate-800 mb-6">Edit Admission Application</h3>
      <form className="space-y-6" onSubmit={async (e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const updatedData = {
          studentName: formData.get('studentName'),
          fatherName: formData.get('fatherName'),
          mobile: formData.get('mobile'),
          cnic: formData.get('cnic'),
          classProgram: formData.get('classProgram'),
        };
        try {
          await fetch('http://localhost:5000/api/admin/admissions/' + selectedApplication.id, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedData)
          });
          alert('Application updated successfully!');
          fetchAllData();
          setIsEditingApp(false);
          setSelectedApplication({...selectedApplication, ...updatedData});
        } catch (err) {
          console.error(err);
          alert('Failed to update application');
        }
      }}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Student Name</label>
            <input name="studentName" defaultValue={selectedApplication.studentName} required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:border-blue-500 font-bold" />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Father Name</label>
            <input name="fatherName" defaultValue={selectedApplication.fatherName} required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:border-blue-500 font-bold" />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Mobile Number</label>
            <input name="mobile" defaultValue={selectedApplication.mobile} required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:border-blue-500 font-bold" />
          </div>
          <div>
            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">CNIC / B-Form</label>
            <input name="cnic" defaultValue={selectedApplication.cnic} type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:border-blue-500 font-bold" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-xs font-black uppercase tracking-widest text-slate-500 mb-2">Selected Class</label>
            <input name="classProgram" defaultValue={selectedApplication.classProgram} required type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-sm focus:border-blue-500 font-bold" />
          </div>
        </div>
        <div className="flex gap-4 pt-6">
          <button type="submit" className="px-8 py-3 bg-blue-600 text-white rounded-sm font-black uppercase tracking-widest text-xs shadow-sm hover:bg-blue-700">Save Changes</button>
          <button type="button" onClick={() => setIsEditingApp(false)} className="px-8 py-3 bg-slate-100 text-slate-600 rounded-sm font-black uppercase tracking-widest text-xs hover:bg-slate-200">Cancel</button>
        </div>
      </form>
    </div>
  );
 }`;

c = c.replace(oldRenderForm, newEditForm);

const deleteButtonHTML = `
      <button onClick={async () => {
        if(confirm('Are you sure you want to permanently delete this application?')) {
          await fetch('http://localhost:5000/api/admin/admissions/' + selectedApplication.id, { method: 'DELETE' });
          fetchAllData();
          setSelectedApplication(null);
        }
      }} className="flex items-center gap-2 px-4 py-2 border-2 border-rose-600 text-rose-600 hover:bg-rose-600 hover:text-white rounded-sm font-black text-xs uppercase transition-colors shrink-0 whitespace-nowrap"><Trash2 size={16}/> Delete Application</button>
`;

if(!c.includes("Delete Application")) {
  c = c.replace(
    `<button onClick={() => setIsEditingApp(true)} className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white rounded-sm font-black text-xs uppercase transition-colors"><Edit size={16}/> Edit</button>`,
    `<button onClick={() => setIsEditingApp(true)} className="flex items-center gap-2 px-4 py-2 bg-slate-100 text-slate-700 hover:bg-blue-600 hover:text-white rounded-sm font-black text-xs uppercase transition-colors"><Edit size={16}/> Edit</button>
     ${deleteButtonHTML}`
  );
}

fs.writeFileSync('frontend/src/app/admin/[[...slug]]/page.tsx', c, 'utf8');
console.log('Patched frontend admin page for admissions edits');
