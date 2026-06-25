import React, { useState, useEffect } from 'react';
import { Calendar, X, Save, Plus, Trash2 } from 'lucide-react';

interface Phase {
  id: number;
  startDate: string;
  endDate: string;
  name?: string;
}

interface SpecialFees {
  [courseName: string]: { normal: number; urgent: number } | undefined;
}

interface Schedule {
  enabled: boolean;
  dailyLateFee: number;
  lateFeeStartDate?: string;
  phases: Phase[];
  specialFees?: SpecialFees;
}

export default function AdmissionScheduleModal({ onClose, schedule, onUpdate }: { onClose: () => void, schedule: Schedule, onUpdate: () => void }) {
  const [formData, setFormData] = useState<Schedule>(schedule || {
    enabled: true,
    dailyLateFee: 170,
    phases: [
      { id: 1, startDate: '', endDate: '' },
      { id: 2, startDate: '', endDate: '' },
      { id: 3, startDate: '', endDate: '' }
    ],
    specialFees: {
      "Hifz-ul-Quran": { normal: 3500, urgent: 5000 },
      "Tajweed-o-Qira'at": { normal: 3500, urgent: 5000 }
    }
  });

  const [saving, setSaving] = useState(false);

  const handleSave = async () => {
    setSaving(true);
    try {
      await fetch('http://localhost:5000/api/admin/admission-schedule', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      onUpdate();
      onClose();
    } catch (e) {
      console.error(e);
      alert('Error saving schedule');
    } finally {
      setSaving(false);
    }
  };

  const updatePhase = (id: number, field: keyof Phase, value: any) => {
    setFormData(prev => ({
      ...prev,
      phases: prev.phases.map(p => p.id === id ? { ...p, [field]: value } : p)
    }));
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-slate-900/50 backdrop-blur-sm p-4">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50">
           <h2 className="text-xl font-black text-slate-800 flex items-center gap-2"><Calendar className="text-emerald-600"/> Admission Fee Schedule</h2>
           <button onClick={onClose} className="text-slate-400 hover:text-slate-800"><X size={24}/></button>
        </div>
        
        <div className="p-6 flex-1 overflow-y-auto bg-slate-50 space-y-8">
          
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
             <div>
                <h3 className="font-black text-slate-800">Dynamic Schedule Status</h3>
                <p className="text-xs text-slate-500 mt-1">Enable or disable the dynamic phase-based admission fee calculation.</p>
             </div>
             <label className="relative inline-flex items-center cursor-pointer">
               <input type="checkbox" checked={formData.enabled} onChange={(e) => setFormData({...formData, enabled: e.target.checked})} className="sr-only peer" />
               <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-600"></div>
             </label>
          </div>

          <div className="space-y-4">
             <h3 className="font-black text-slate-800 tracking-widest uppercase text-xs">Fee Phases</h3>
             <div className="grid gap-4">
               {formData.phases.map((phase, index) => (
                 <div key={phase.id} className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap lg:flex-nowrap gap-4 items-center">
                    <div className="w-full lg:w-32">
                       <span className="font-black text-slate-800">Phase {index + 1}</span>
                    </div>
                    <div className="flex-1 min-w-[200px]">
                       <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Start Date</label>
                       <input type="date" value={phase.startDate} onChange={e => updatePhase(phase.id, 'startDate', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-emerald-500" />
                    </div>
                    <div className="flex-1 min-w-[200px]">
                       <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">End Date</label>
                       <input type="date" value={phase.endDate} onChange={e => updatePhase(phase.id, 'endDate', e.target.value)} className="w-full bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm font-bold text-slate-700 outline-none focus:border-emerald-500" />
                    </div>
                 </div>
               ))}
             </div>
             <p className="text-xs text-slate-500 font-bold mt-4">* Note: Class-wise phase fees (Single, Double, Triple) are configured in the Advanced Fee Settings module.</p>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-indigo-200 shadow-sm space-y-4">
             <h3 className="font-black text-indigo-800 tracking-widest uppercase text-xs">Special Courses Settings</h3>
             <div className="grid md:grid-cols-2 gap-6">
                {['Hifz-ul-Quran', "Tajweed-o-Qira'at"].map(course => (
                  <div key={course} className="space-y-3 p-4 bg-indigo-50/50 rounded-xl border border-indigo-100">
                     <p className="font-black text-slate-800">{course}</p>
                     <div className="flex gap-4">
                        <div className="flex-1">
                           <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Normal Fee</label>
                           <input type="number" value={formData.specialFees?.[course]?.normal || 0} onChange={e => setFormData({...formData, specialFees: { ...formData.specialFees, [course]: { ...formData.specialFees?.[course]!, normal: parseInt(e.target.value) || 0 } }})} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-black text-indigo-700 outline-none focus:border-indigo-500" />
                        </div>
                        <div className="flex-1">
                           <label className="block text-[10px] font-black uppercase text-slate-400 tracking-widest mb-1">Urgent Fee</label>
                           <input type="number" value={formData.specialFees?.[course]?.urgent || 0} onChange={e => setFormData({...formData, specialFees: { ...formData.specialFees, [course]: { ...formData.specialFees?.[course]!, urgent: parseInt(e.target.value) || 0 } }})} className="w-full bg-white border border-slate-200 rounded-lg px-3 py-2 text-sm font-black text-indigo-700 outline-none focus:border-indigo-500" />
                        </div>
                     </div>
                  </div>
                ))}
             </div>
          </div>

          <div className="bg-white p-6 rounded-2xl border border-rose-200 shadow-sm">
             <h3 className="font-black text-rose-800 mb-4 tracking-widest uppercase text-xs">Late Fee System</h3>
             <div className="flex flex-wrap lg:flex-nowrap gap-4 items-center">
                <div className="flex-1">
                   <p className="text-sm font-bold text-slate-600 mb-1">Daily Late Fee Rate (After Phase 3)</p>
                   <p className="text-xs text-slate-400">Added to the challan for every day passed since the final deadline.</p>
                </div>
                <div className="w-full lg:w-48 relative">
                   <span className="absolute left-4 top-1/2 -translate-y-1/2 font-black text-slate-400">Rs.</span>
                   <input type="number" value={formData.dailyLateFee} onChange={e => setFormData({...formData, dailyLateFee: parseInt(e.target.value) || 0})} className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-lg font-black text-rose-600 outline-none focus:border-rose-500" />
                </div>
             </div>
          </div>

        </div>

        <div className="p-6 border-t border-slate-100 bg-white flex justify-end gap-3">
           <button onClick={onClose} className="px-6 py-3 font-black text-xs uppercase tracking-widest text-slate-500 hover:bg-slate-100 rounded-xl transition-all">Cancel</button>
           <button onClick={handleSave} disabled={saving} className="px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-emerald-600/30 transition-all flex items-center gap-2">
              <Save size={16}/> {saving ? 'Saving...' : 'Save Schedule'}
           </button>
        </div>
      </div>
    </div>
  );
}
