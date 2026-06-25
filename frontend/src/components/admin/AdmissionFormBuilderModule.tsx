'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Edit2, Trash2, X, Check, Settings, FileBox } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdmissionFormBuilderModule() {
  const { t } = useTranslation();
  const [fields, setFields] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [formData, setFormData] = useState<any>({ title: '', type: 'text', required: true, options: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchFields();
  }, []);

  const fetchFields = async () => {
    try {
      const res = await fetch('/api/admin/form-fields?t=' + Date.now());
      const data = await res.json();
      setFields(data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    const isNew = !formData.id;
    const url = isNew ? '/api/admin/form-fields' : `/api/admin/form-fields/${formData.id}`;
    
    try {
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        await fetchFields();
        setIsEditorOpen(false);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save field');
    }
    setIsSaving(false);
  };

  const handleDelete = async (field: any) => {
    // Removed core deletion restriction as requested
    const id = field.id;
    if (!confirm('Are you sure you want to delete this custom field?')) return;
    try {
      const res = await fetch(`/api/admin/form-fields/${id}`, { method: 'DELETE' });
      if (res.ok) fetchFields();
    } catch (err) {
      console.error(err);
    }
  };

  const openEditor = (field?: any) => {
    if (field) setFormData(field);
    else setFormData({ title: '', type: 'text', required: true, options: '' });
    setIsEditorOpen(true);
  };

  return (
    <div className="flex-1 p-8 bg-gray-50 max-h-screen overflow-y-auto">
      <div className="max-w-6xl mx-auto relative">
        <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              <FileBox className="text-emerald-600" size={32} />
              Form Customization
            </h1>
            <p className="text-gray-500 font-medium mt-1 uppercase tracking-widest text-xs">Add dynamic fields and document requirements to the Admission Form</p>
          </div>
          <button 
            onClick={() => openEditor()}
            className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 font-bold text-sm hover:bg-emerald-700 transition-colors shadow-md uppercase tracking-wider rounded-sm"
          >
            <Plus size={18} />
            Add Field
          </button>
        </div>

        <div className="bg-white border border-gray-300 shadow-sm overflow-hidden rounded-sm">
          {loading ? (
            <div className="p-12 text-center text-gray-400 font-semibold uppercase tracking-widest">Loading Fields...</div>
          ) : fields.length === 0 ? (
            <div className="p-12 text-center text-gray-500 font-medium">No custom fields added yet. Default fields are active.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="p-4 font-bold text-gray-600 text-xs uppercase tracking-widest">Field Title</th>
                  <th className="p-4 font-bold text-gray-600 text-xs uppercase tracking-widest">Type</th>
                  <th className="p-4 font-bold text-gray-600 text-xs uppercase tracking-widest">Required</th>
                  <th className="p-4 w-32 font-bold text-gray-600 text-xs uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {fields.map((f, index) => (
                  <tr key={f.id || index} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-sm font-bold text-gray-800">
                      {f.title}
                      {f.isCore && <span className="ml-2 text-[10px] bg-slate-100 text-slate-500 px-2 py-1 rounded uppercase tracking-wider">Default</span>}
                    </td>
                    <td className="p-4 text-xs font-bold text-emerald-700 bg-emerald-50 inline-block mt-3 ml-4 rounded-sm px-2 py-1 uppercase">{f.type === 'file' ? 'Document Upload' : f.type}</td>
                    <td className="p-4 text-sm font-bold text-gray-600">{f.required ? 'Yes' : 'No'}</td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => openEditor(f)} className="inline-flex items-center justify-center w-8 h-8 bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white transition-colors border border-blue-200 rounded-sm" title="Edit"><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete(f)} className="inline-flex items-center justify-center w-8 h-8 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors border border-red-200 rounded-sm" title="Delete"><Trash2 size={14} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* SIDE PANEL EDITOR */}
        <AnimatePresence>
          {isEditorOpen && (
            <>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40" onClick={() => setIsEditorOpen(false)} />
              <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-[500px] bg-white shadow-2xl border-l border-gray-300 z-50 flex flex-col">
                <div className="bg-gray-100 p-6 flex justify-between items-center border-b border-gray-300">
                  <h2 className="text-xl font-black text-gray-800 tracking-tight uppercase">{formData.id ? 'Edit Field' : 'New Field'}</h2>
                  <button onClick={() => setIsEditorOpen(false)} className="text-gray-500 hover:text-red-500 transition-colors"><X size={24} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  <form id="fieldForm" onSubmit={handleSave} className="space-y-6">
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Field Title</label>
                      <input type="text" required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full border border-gray-300 p-3 text-sm focus:border-emerald-600 focus:outline-none font-bold rounded-sm" placeholder="e.g. Current Address" />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Field Type</label>
                      <select disabled={formData.isCore} value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full border border-gray-300 p-3 text-sm focus:border-emerald-600 focus:outline-none font-bold rounded-sm">
                        <option value="text">Short Text</option>
                        <option value="date">Date</option>
                        <option value="select">Dropdown Options</option>
                        <option value="file">Document Upload</option>
                      </select>
                    </div>
                    {formData.type === 'select' && (
                      <div>
                        <label className="block text-xs font-bold text-gray-600 uppercase mb-2">Dropdown Options (Comma Separated)</label>
                        <input type="text" required value={formData.options} onChange={e => setFormData({...formData, options: e.target.value})} className="w-full border border-gray-300 p-3 text-sm focus:border-emerald-600 focus:outline-none font-bold rounded-sm" placeholder="e.g. Option A, Option B" />
                      </div>
                    )}
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="req" checked={formData.required} onChange={e => setFormData({...formData, required: e.target.checked})} className="w-5 h-5 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500" />
                      <label htmlFor="req" className="text-sm font-bold text-gray-700 uppercase tracking-widest">Required Field</label>
                    </div>
                  </form>
                </div>
                <div className="p-6 bg-gray-50 border-t border-gray-300 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsEditorOpen(false)} className="px-6 py-3 font-bold text-gray-600 text-sm hover:text-gray-900 transition-colors uppercase tracking-widest">Cancel</button>
                  <button type="submit" form="fieldForm" disabled={isSaving} className="px-8 py-3 bg-emerald-600 text-white font-black text-sm hover:bg-emerald-700 transition-colors shadow-md uppercase tracking-widest rounded-sm disabled:opacity-50 flex items-center gap-2">
                    {isSaving ? 'Saving...' : <><Check size={18} /> Save Field</>}
                  </button>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
