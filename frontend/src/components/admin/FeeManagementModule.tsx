'use client';

import React, { useState, useEffect } from 'react';
import { Plus, Edit, Trash2, Save, X, DollarSign, BookOpen } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface FeeStructure {
  id?: number;
  sectionType: string;
  classProgram: string;
  admissionFee: number;
  registrationFee: number;
  phase1Fee?: number;
  phase2Fee?: number;
  phase3Fee?: number;
  monthlyFee?: number;
  annualCharges?: number;
}

const SECTIONS = ["Tulba Section", "Talibat Section"];
const CLASSES = [
  "Mutawassitah", "Sanawiya Aamma Awal", "Sanawiya Aamma Dom", "Sanawiya Khasa Awal", "Sanawiya Khasa Dom",
  "Aliya Awal", "Aliya Dom", "Alamiya Awal", "Alamiya Dom",
  "Amma Khasusi", "Khasa Khasusi", "Almiya Khasusi Part One", "Almiya Khasusi Part Two",
  "Hifz-ul-Quran", "Tajweed-o-Qira'at", "Takhassus Awal", "Takhassus Dom"
];

export default function FeeManagementModule() {
  const [feeStructures, setFeeStructures] = useState<FeeStructure[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<FeeStructure>({
    sectionType: SECTIONS[0],
    classProgram: CLASSES[0],
    admissionFee: 0,
    registrationFee: 0,
    phase1Fee: 0,
    phase2Fee: 0,
    phase3Fee: 0,
    monthlyFee: 0,
    annualCharges: 0
  });

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {
    try {
      const res = await fetch('/api/admin/fee-structures?t=' + Date.now());
      const data = await res.json();
      setFeeStructures(data || []);
      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    const isNew = !formData.id;
    const url = isNew 
      ? '/api/admin/fee-structures' 
      : `/api/admin/fee-structures/${formData.id}`;
    const method = isNew ? 'POST' : 'PUT';

    try {
      await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      setIsEditing(false);
      fetchFees();
    } catch (err) {
      console.error('Error saving fee structure:', err);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Are you sure you want to delete this fee structure?')) return;
    try {
      await fetch(`/api/admin/fee-structures/${id}`, { method: 'DELETE' });
      fetchFees();
    } catch (err) {
      console.error('Error deleting fee structure:', err);
    }
  };

  const openEditor = (fee?: FeeStructure) => {
    if (fee) setFormData(fee);
    else setFormData({
      sectionType: SECTIONS[0],
      classProgram: CLASSES[0],
      admissionFee: 0,
      registrationFee: 0,
      phase1Fee: 0,
      phase2Fee: 0,
      phase3Fee: 0,
      monthlyFee: 0,
      annualCharges: 0
    });
    setIsEditing(true);
    
  };

  return (
    <div className="p-8 h-full overflow-y-auto bg-gray-50 text-gray-900">
      <div className="max-w-6xl mx-auto">
        
        <div className="flex justify-between items-end mb-8 border-b border-gray-300 pb-4">
          <div>
            <h1 className="text-3xl font-bold uppercase tracking-tight">Fee Management</h1>
            <p className="text-sm font-semibold text-gray-500 uppercase tracking-widest mt-1">Configure admission & monthly fees per class</p>
          </div>
          <button 
            onClick={() => openEditor()}
            className="flex items-center gap-2 bg-blue-700 hover:bg-blue-800 text-white px-6 py-3 font-semibold text-sm uppercase transition-colors"
          >
            <Plus size={18} /> Add New Class Fee
          </button>
        </div>

        {isEditing && (
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
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Phase 1 Fee (Rs)</label>
                    <input 
                      type="number" 
                      value={formData.phase1Fee === 0 ? '' : formData.phase1Fee}
                      onChange={e => setFormData({...formData, phase1Fee: e.target.value === '' ? 0 : parseInt(e.target.value)})}
                      className="w-full border border-gray-300 p-3 text-sm focus:border-blue-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Phase 2 Fee (Rs)</label>
                    <input 
                      type="number" 
                      value={formData.phase2Fee === 0 ? '' : formData.phase2Fee}
                      onChange={e => setFormData({...formData, phase2Fee: e.target.value === '' ? 0 : parseInt(e.target.value)})}
                      className="w-full border border-gray-300 p-3 text-sm focus:border-blue-700 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-600 uppercase mb-2">Phase 3 Fee (Rs)</label>
                    <input 
                      type="number" 
                      value={formData.phase3Fee === 0 ? '' : formData.phase3Fee}
                      onChange={e => setFormData({...formData, phase3Fee: e.target.value === '' ? 0 : parseInt(e.target.value)})}
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
        )}

        <div className="bg-white border border-gray-300 shadow-sm overflow-hidden">
          {loading ? (
            <div className="p-12 text-center text-gray-400 font-semibold uppercase tracking-widest">Loading Fee Structures...</div>
          ) : feeStructures.length === 0 ? (
            <div className="p-12 text-center text-gray-400 font-semibold uppercase tracking-widest flex flex-col items-center">
              <DollarSign size={48} className="mb-4 text-gray-300" />
              No fee structures configured. <br/>Add a new fee structure to get started.
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-800 text-white text-[10px] uppercase tracking-widest">
                  <th className="p-4">Section</th>
                  <th className="p-4">Class Program</th>
                  <th className="p-4 text-right">Admission</th>
                  <th className="p-4 text-right">Reg.</th>
                  <th className="p-4 text-right">Ph1</th>
                  <th className="p-4 text-right">Ph2</th>
                  <th className="p-4 text-right">Ph3</th>
                  <th className="p-4 text-right">Monthly</th>
                  <th className="p-4 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {feeStructures.map((fee, index) => (
                  <tr key={fee.id || `fee-${index}`} className="hover:bg-gray-50 transition-colors">
                    <td className="p-4 text-xs font-bold text-gray-700 uppercase">{fee.sectionType}</td>
                    <td className="p-4 text-xs font-bold text-blue-700 uppercase">{fee.classProgram}</td>
                    <td className="p-4 text-sm font-semibold text-gray-900 text-right">Rs. {fee.admissionFee || 0}</td>
                    <td className="p-4 text-sm font-semibold text-gray-900 text-right">Rs. {fee.registrationFee || 0}</td>
                    <td className="p-4 text-sm font-semibold text-gray-900 text-right">Rs. {fee.phase1Fee || 0}</td>
                    <td className="p-4 text-sm font-semibold text-gray-900 text-right">Rs. {fee.phase2Fee || 0}</td>
                    <td className="p-4 text-sm font-semibold text-gray-900 text-right">Rs. {fee.phase3Fee || 0}</td>
                    <td className="p-4 text-sm font-semibold text-gray-900 text-right">Rs. {fee.monthlyFee || 0}</td>
                    <td className="p-4 flex items-center justify-center gap-2">
                      <button onClick={() => openEditor(fee)} className="p-2 text-gray-500 hover:text-blue-700 bg-gray-100 hover:bg-blue-50 transition-colors" title="Edit">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => fee.id && handleDelete(fee.id)} className="p-2 text-gray-500 hover:text-red-600 bg-gray-100 hover:bg-red-50 transition-colors" title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}
