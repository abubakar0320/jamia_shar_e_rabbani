'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Plus, Edit2, Trash2, X, Check, Wallet, ArrowDownRight, ArrowUpRight, Calculator } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ExpenseManagementModule() {
  const { t } = useTranslation();
  const [expenses, setExpenses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [formData, setFormData] = useState<any>({ category: 'Utility Bill', amount: '', description: '', date: new Date().toISOString().split('T')[0], status: 'Paid' });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const res = await fetch('http://localhost:5000/api/admin/expenses');
      const data = await res.json();
      setExpenses(data || []);
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
    const url = isNew ? 'http://localhost:5000/api/admin/expenses' : `http://localhost:5000/api/admin/expenses/${formData.id}`;
    
    try {
      const res = await fetch(url, {
        method: isNew ? 'POST' : 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({...formData, amount: parseInt(formData.amount)})
      });
      if (res.ok) {
        await fetchExpenses();
        setIsEditorOpen(false);
      }
    } catch (err) {
      console.error(err);
      alert('Failed to save expense');
    }
    setIsSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this expense record?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/admin/expenses/${id}`, { method: 'DELETE' });
      if (res.ok) fetchExpenses();
    } catch (err) {
      console.error(err);
    }
  };

  const openEditor = (exp?: any) => {
    if (exp) setFormData(exp);
    else setFormData({ category: 'Utility Bill', amount: '', description: '', date: new Date().toISOString().split('T')[0], status: 'Paid' });
    setIsEditorOpen(true);
  };

  const totalExpense = expenses.reduce((sum, exp) => sum + (exp.amount || 0), 0);

  return (
    <div className="flex-1 p-8 bg-slate-50 max-h-screen overflow-y-auto">
      <div className="max-w-7xl mx-auto relative">
        <div className="flex justify-between items-end mb-8 border-b border-slate-200 pb-4">
          <div>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight flex items-center gap-3">
              <Wallet className="text-rose-600" size={32} />
              Accounts & Expenses
            </h1>
            <p className="text-slate-500 font-medium mt-1 uppercase tracking-widest text-xs">Manage Jamia's utility bills, salaries, and daily maintenance expenses</p>
          </div>
          <button 
            onClick={() => openEditor()}
            className="flex items-center gap-2 bg-rose-600 text-white px-6 py-3 font-bold text-sm hover:bg-rose-700 transition-colors shadow-sm uppercase tracking-wider rounded-sm"
          >
            <Plus size={18} />
            Record Expense
          </button>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-6 mb-8">
            <div className="bg-white p-6 rounded-sm shadow-sm border border-slate-200">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2"><Calculator size={14}/> Total Expenses (All Time)</p>
                <h3 className="text-3xl font-black text-rose-600">Rs. {totalExpense.toLocaleString()}</h3>
            </div>
            <div className="bg-white p-6 rounded-sm shadow-sm border border-slate-200">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2"><ArrowUpRight size={14} className="text-amber-500" /> Pending Payments</p>
                <h3 className="text-3xl font-black text-amber-600">Rs. {expenses.filter(e => e.status === 'Pending').reduce((a,b) => a + b.amount, 0).toLocaleString()}</h3>
            </div>
            <div className="bg-white p-6 rounded-sm shadow-sm border border-slate-200">
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 flex items-center gap-2"><ArrowDownRight size={14} className="text-blue-500" /> Paid Expenses</p>
                <h3 className="text-3xl font-black text-slate-800">Rs. {expenses.filter(e => e.status === 'Paid').reduce((a,b) => a + b.amount, 0).toLocaleString()}</h3>
            </div>
        </div>

        <div className="bg-white border border-slate-200 shadow-sm overflow-hidden rounded-sm">
          {loading ? (
            <div className="p-12 text-center text-slate-400 font-semibold uppercase tracking-widest">Loading...</div>
          ) : expenses.length === 0 ? (
            <div className="p-12 text-center text-slate-500 font-medium">No expenses recorded yet.</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200">
                  <th className="p-4 font-black text-slate-400 text-[10px] uppercase tracking-widest">Date</th>
                  <th className="p-4 font-black text-slate-400 text-[10px] uppercase tracking-widest">Category</th>
                  <th className="p-4 font-black text-slate-400 text-[10px] uppercase tracking-widest">Description</th>
                  <th className="p-4 font-black text-slate-400 text-[10px] uppercase tracking-widest text-right">Amount</th>
                  <th className="p-4 font-black text-slate-400 text-[10px] uppercase tracking-widest text-center">Status</th>
                  <th className="p-4 font-black text-slate-400 text-[10px] uppercase tracking-widest text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {expenses.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((exp, index) => (
                  <tr key={exp.id || index} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 text-xs font-bold text-slate-600">{new Date(exp.date).toLocaleDateString()}</td>
                    <td className="p-4"><span className="text-[10px] font-black text-slate-600 bg-slate-100 inline-block rounded-sm px-2 py-1 uppercase">{exp.category}</span></td>
                    <td className="p-4 text-sm font-semibold text-slate-800">{exp.description}</td>
                    <td className="p-4 text-sm font-black text-rose-600 text-right">Rs. {exp.amount.toLocaleString()}</td>
                    <td className="p-4 text-center">
                        <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 rounded-sm ${exp.status === 'Paid' ? 'bg-blue-100 text-blue-700' : 'bg-amber-100 text-amber-700'}`}>{exp.status}</span>
                    </td>
                    <td className="p-4 text-right space-x-2">
                      <button onClick={() => openEditor(exp)} className="inline-flex items-center justify-center w-8 h-8 bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200 rounded-sm shadow-sm transition-colors" title="Edit"><Edit2 size={14} /></button>
                      <button onClick={() => handleDelete(exp.id)} className="inline-flex items-center justify-center w-8 h-8 bg-white border border-slate-200 text-slate-500 hover:text-rose-600 hover:border-rose-200 rounded-sm shadow-sm transition-colors" title="Delete"><Trash2 size={14} /></button>
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
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40" onClick={() => setIsEditorOpen(false)} />
              <motion.div initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }} transition={{ type: 'spring', damping: 25, stiffness: 200 }} className="fixed top-0 right-0 h-full w-[400px] bg-white shadow-2xl border-l border-slate-200 z-50 flex flex-col">
                <div className="bg-slate-50 p-6 flex justify-between items-center border-b border-slate-200">
                  <h2 className="text-xl font-black text-slate-800 tracking-tight uppercase">{formData.id ? 'Edit Expense' : 'Record Expense'}</h2>
                  <button onClick={() => setIsEditorOpen(false)} className="text-slate-400 hover:text-rose-500 transition-colors"><X size={24} /></button>
                </div>
                <div className="flex-1 overflow-y-auto p-6">
                  <form id="expForm" onSubmit={handleSave} className="space-y-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Expense Category</label>
                      <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} className="w-full border border-slate-300 p-3 text-sm focus:border-blue-600 focus:outline-none font-bold rounded-sm text-slate-800">
                        <option value="Utility Bill">Utility Bill (Electricity, Water, Gas)</option>
                        <option value="Salary">Faculty/Staff Salary</option>
                        <option value="Maintenance">Maintenance & Repairs</option>
                        <option value="Food & Kitchen">Food & Kitchen</option>
                        <option value="Office Supplies">Office Supplies / Printing</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Date</label>
                      <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full border border-slate-300 p-3 text-sm focus:border-blue-600 focus:outline-none font-bold rounded-sm text-slate-800" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Description</label>
                      <input type="text" required value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full border border-slate-300 p-3 text-sm focus:border-blue-600 focus:outline-none font-bold rounded-sm text-slate-800" placeholder="e.g. LESCO Bill For May" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Amount (Rs.)</label>
                      <input type="number" required min="0" value={formData.amount} onChange={e => setFormData({...formData, amount: e.target.value})} className="w-full border border-slate-300 p-3 text-sm focus:border-blue-600 focus:outline-none font-black text-rose-600 rounded-sm" placeholder="e.g. 15000" />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2">Payment Status</label>
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="status" value="Paid" checked={formData.status === 'Paid'} onChange={e => setFormData({...formData, status: e.target.value})} className="text-blue-600" />
                            <span className="text-sm font-bold text-slate-700">Paid</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                            <input type="radio" name="status" value="Pending" checked={formData.status === 'Pending'} onChange={e => setFormData({...formData, status: e.target.value})} className="text-amber-500" />
                            <span className="text-sm font-bold text-slate-700">Pending</span>
                        </label>
                      </div>
                    </div>
                  </form>
                </div>
                <div className="p-6 bg-slate-50 border-t border-slate-200 flex justify-end gap-3">
                  <button type="button" onClick={() => setIsEditorOpen(false)} className="px-6 py-3 font-bold text-slate-500 text-xs hover:text-slate-800 transition-colors uppercase tracking-widest">Cancel</button>
                  <button type="submit" form="expForm" disabled={isSaving} className="px-6 py-3 bg-blue-700 text-white font-black text-xs hover:bg-blue-800 transition-colors shadow-sm uppercase tracking-widest rounded-sm disabled:opacity-50 flex items-center gap-2">
                    {isSaving ? 'Saving...' : <><Check size={16} /> Save Record</>}
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
