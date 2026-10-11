'use client';

import React from 'react';
import { Eye } from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid
} from 'recharts';

interface ReportsModuleProps {
  analyticsData: Record<string, number>;
}

export function ReportsModule({ analyticsData }: ReportsModuleProps) {
  const data = Object.entries(analyticsData || {}).map(([date, count]) => ({ date, count }));

  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-500 pb-20">
      <div className="bg-white p-8 rounded-sm shadow-sm border border-slate-200">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center">
            <Eye size={20} />
          </div>
          <div>
            <h2 className="text-xl font-black text-slate-800 tracking-tight">Website Visitors History</h2>
            <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Daily unique visitors to your website</p>
          </div>
        </div>
        <div className="h-[400px]">
          {data.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={data} margin={{ top: 20, right: 30, left: -20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                <XAxis dataKey="date" tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fontSize: 10, fill: '#64748b', fontWeight: 'bold' }} axisLine={false} tickLine={false} />
                <Tooltip cursor={{ fill: '#f1f5f9' }} contentStyle={{ borderRadius: '4px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
                <Bar dataKey="count" fill="#10b981" radius={[4, 4, 0, 0]} maxBarSize={60} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-slate-400 font-bold uppercase tracking-widest text-sm">
              No visitor data available yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
