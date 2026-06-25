'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Search, Calendar, FileText, Image as ImageIcon } from 'lucide-react';

interface Donation {
  id: string;
  refNo: string;
  fullName: string;
  fatherName: string;
  mobileNumber: string;
  email: string;
  city: string;
  amount: string;
  purpose: string;
  remarks: string;
  category: string;
  receiptImage: string;
  submissionDate: string;
}

export default function DonationsAdmin() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReceipt, setSelectedReceipt] = useState<string | null>(null);

  useEffect(() => {
    fetch('/api/donations')
      .then(res => res.json())
      .then(data => {
        setDonations(data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filteredDonations = donations.filter(d => 
    d.refNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    d.mobileNumber.includes(searchTerm) ||
    d.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-8 font-sans text-slate-800">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 hover:bg-slate-200 rounded-full transition-colors">
            <ArrowLeft size={24} />
          </Link>
          <h1 className="text-3xl font-bold text-slate-900">Donations Management</h1>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200 mb-8">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="relative flex-1 min-w-[300px] max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
              <input 
                type="text" 
                placeholder="Search by name, ref no, mobile or category..." 
                className="w-full pl-10 pr-4 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-emerald-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="text-sm font-semibold text-slate-500">
              Total Donations: {donations.length}
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-12"><div className="animate-spin w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full mx-auto"></div></div>
        ) : (
          <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm whitespace-nowrap">
                <thead className="bg-slate-50 text-slate-600 font-semibold border-b">
                  <tr>
                    <th className="px-6 py-4">Reference No</th>
                    <th className="px-6 py-4">Donor Info</th>
                    <th className="px-6 py-4">Category & Purpose</th>
                    <th className="px-6 py-4">Amount</th>
                    <th className="px-6 py-4">Date</th>
                    <th className="px-6 py-4 text-center">Receipt</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredDonations.length === 0 ? (
                    <tr><td colSpan={6} className="text-center py-12 text-slate-500">No donations found</td></tr>
                  ) : (
                    filteredDonations.map(d => (
                      <tr key={d.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 font-mono font-semibold text-emerald-700">{d.refNo}</td>
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-900">{d.fullName}</div>
                          <div className="text-xs text-slate-500">S/O {d.fatherName}</div>
                          <div className="text-xs text-slate-500">{d.mobileNumber} • {d.city}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="inline-block px-2 py-1 bg-emerald-100 text-emerald-800 text-xs rounded-full font-bold mb-1">{d.category}</div>
                          <div className="text-slate-600 truncate max-w-[200px]" title={d.purpose}>{d.purpose}</div>
                        </td>
                        <td className="px-6 py-4 font-bold text-slate-900">Rs. {parseInt(d.amount).toLocaleString()}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-slate-600"><Calendar size={14}/> {new Date(d.submissionDate).toLocaleDateString()}</div>
                          <div className="text-xs text-slate-400 mt-1">{new Date(d.submissionDate).toLocaleTimeString()}</div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {d.receiptImage ? (
                            <button 
                              onClick={() => setSelectedReceipt(d.receiptImage)}
                              className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors inline-block"
                              title="View Receipt"
                            >
                              <ImageIcon size={20} />
                            </button>
                          ) : (
                            <span className="text-slate-300">-</span>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Receipt Modal */}
      {selectedReceipt && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm" onClick={() => setSelectedReceipt(null)}>
          <div className="bg-white p-4 rounded-xl max-w-2xl max-h-[90vh] overflow-auto relative" onClick={e => e.stopPropagation()}>
            <button 
              className="absolute top-4 right-4 w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200"
              onClick={() => setSelectedReceipt(null)}
            >
              ✕
            </button>
            <h3 className="text-lg font-bold mb-4 pr-10">Payment Receipt</h3>
            <img src={selectedReceipt} alt="Receipt" className="max-w-full h-auto rounded" />
          </div>
        </div>
      )}
    </div>
  );
}
