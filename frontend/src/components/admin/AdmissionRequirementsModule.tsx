'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Edit2, Trash2, X, Check, FileText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Requirement {
  id?: number;
  title: string;
  text: string;
}

export default function AdmissionRequirementsModule() {
  const { t } = useTranslation();
  const [requirements, setRequirements] = useState<Requirement[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [formData, setFormData] = useState<Requirement>({ title: '', text: '' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchRequirements();
  }, []);

  const fetchRequirements = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/admission-requirements?t=' + Date.now());
      const data = await res.json();
      setRequirements(data || []);
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
    const url = isNew ? 'http://localhost:5000/api/admin/admission-requirements' : `http://localhost:5000/api/admin/admission-requirements/${formData.id}`;
    
    try {
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        await fetchRequirements();
        setIsEditorOpen(false);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save requirement');
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this requirement?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/admission-requirements/${id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchRequirements();
      }
    } catch (err) {
      console.error(err);
      alert('Failed to delete requirement');
    }
  };

  const openEditor = (req?: Requirement) => {
    if (req) setFormData(req);
    else setFormData({ title: '', text: '' });
    setIsEditorOpen(true);
  };

  return (
    <div className="flex-1 p-8 bg-gray-50 max-h-screen overflow-y-auto">
      <div className="max-w-6xl mx-auto relative">
        <div className="flex justify-between items-end mb-8 border-b border-gray-200 pb-4">
          <div>
            <h1 className="text-3xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              <FileText className="text-blue-700" size={32} />
              Admission Requirements
            </h1>
            <p className="text-gray-500 font-medium mt-1 uppercase tracking-widest text-xs">Manage public admission requirements list</p>
          </div>
          <button 
            onClick={() => openEditor()}
            className="flex items-center gap-2 bg-blue-700 text-white px-6 py-3 font-bold text-sm hover:bg-blue-800 transition-colors shadow-md uppercase tracking-wider"
          >
            <Plus size={18} />
            Add Requirement
          </button>
        </div>

        <div className="bg-white border border-gray-300 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-400 font-semibold uppercase tracking-widest">Loading Requirements...</div>
          ) : requirements.length === 0 ? (
            <div className="p-12 text-center text-gray-500 font-medium">No requirements configured.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100 border-b border-gray-300">
                  <th className="p-4 w-48 font-bold text-gray-600 text-xs uppercase tracking-widest">Title</th>
                  <th className="p-4 font-bold text-gray-600 text-xs uppercase tracking-widest">Description</th>
                  <th className="p-4 w-32 font-bold text-gray-600 text-xs uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {requirements.map((req, index) => (
                  <tr key={req.id || index} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-sm font-bold text-gray-800">{req.title}</td>
                    <td className="p-4 text-xs text-gray-600 leading-relaxed">{req.text}</td>
                    <td className="p-4 text-right space-x-2">
                      <button 
                        onClick={() => openEditor(req)}
                        className="inline-flex items-center justify-center w-8 h-8 bg-blue-50 text-blue-700 hover:bg-blue-700 hover:text-white transition-colors border border-blue-200"
                        title="Edit"
                      ><Edit2 size={14} /></button>
                      <button 
                        onClick={() => req.id && handleDelete(req.id)}
                        className="inline-flex items-center justify-center w-8 h-8 bg-red-50 text-red-600 hover:bg-red-600 hover:text-white transition-colors border border-red-200"
                        title="Delete"
                      ><Trash2 size={14} /></button>
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
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                className="fixed inset-0 bg-gray-900/40 backdrop-blur-sm z-40"
                onClick={() => setIsEditorOpen(false)}
              />
              <motion.div 
                initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="fixed top-0 right-0 h-full w-[500px] bg-white shadow-2xl border-l border-gray-300 z-50 flex flex-col"
              >
                <div className="bg-gray-100 p-6 flex justify-between items-center border-b border-gray-300">
                  <h2 className="text-xl font-black text-gray-800 tracking-tight uppercase">
                    {formData.id ? 'Edit Requirement' : 'New Requirement'}
                  </h2>
                  <button onClick={() => setIsEditorOpen(false)} className="text-gray-500 hover:text-red-500 transition-colors">
                    <X size={24} />
                  </button>
                </div>

                <div className="flex-1 overflow-y-auto p-6">
                  <form id="reqForm" onSubmit={handleSave} className="space-y-6">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Requirement Title</label>
                      <input 
                        type="text"
                        required
                        value={formData.title}
                        onChange={e => setFormData({...formData, title: e.target.value})}
                        className="w-full border border-gray-300 p-3 text-sm focus:border-blue-700 focus:outline-none font-bold"
                        placeholder="e.g. Age Verification"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Requirement Description</label>
                      <textarea 
                        required
                        rows={6}
                        value={formData.text}
                        onChange={e => setFormData({...formData, text: e.target.value})}
                        className="w-full border border-gray-300 p-3 text-sm focus:border-blue-700 focus:outline-none resize-none leading-relaxed"
                        placeholder="e.g. Completed admission form with 4 photos..."
                      />
                    </div>
                  </form>
                </div>

                <div className="p-6 bg-gray-50 border-t border-gray-300 flex justify-end gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsEditorOpen(false)}
                    className="px-6 py-3 font-bold text-gray-600 text-sm hover:text-gray-900 transition-colors uppercase tracking-widest"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    form="reqForm"
                    disabled={isSaving}
                    className="px-8 py-3 bg-blue-700 text-white font-black text-sm hover:bg-blue-800 transition-colors shadow-md uppercase tracking-widest disabled:opacity-50 flex items-center gap-2"
                  >
                    {isSaving ? 'Saving...' : <><Check size={18} /> Save Requirement</>}
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
