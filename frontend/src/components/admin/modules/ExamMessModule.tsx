'use client';

import React from 'react';
import { Landmark } from 'lucide-react';

interface ExamMessModuleProps {
  messApps: any[];
}

export function ExamMessModule({ messApps }: ExamMessModuleProps) {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 pb-20">
      <div className="bg-white rounded-sm shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex items-center gap-3">
          <Landmark className="text-amber-600" size={24} />
          <h2 className="text-xl font-black text-slate-800 tracking-tight">Imtihaani Mess Applications</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200">
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500">Student Info</th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500">Challan No</th>
                <th className="py-4 px-6 text-xs font-black uppercase tracking-widest text-slate-500">Date Applied</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {messApps.length > 0 ? messApps.map((app, i) => (
                <tr key={i} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6">
                    <div className="font-black text-sm text-slate-800">{app.studentName}</div>
                    <div className="text-xs text-slate-500 font-bold">S/O {app.fatherName} • {app.phone}</div>
                  </td>
                  <td className="py-4 px-6">
                    <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-xs font-bold">{app.challanNo}</span>
                  </td>
                  <td className="py-4 px-6 text-sm text-slate-600 font-medium">
                    {new Date(app.date).toLocaleDateString()}
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={3} className="py-12 text-center text-slate-400 font-bold uppercase tracking-widest text-sm">No applications yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
