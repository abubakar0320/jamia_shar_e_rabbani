'use client';

import React, { useState, useEffect } from 'react';
import { 
  Database, 
  ShieldCheck, 
  Clock, 
  Download, 
  RotateCcw, 
  Upload, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  FileText, 
  RefreshCw, 
  Check, 
  HardDrive,
  FileCode,
  ArrowRight
} from 'lucide-react';

interface Snapshot {
  filename: string;
  sizeBytes: number;
  sizeFormatted: string;
  createdAt: string;
  isSafetyBackup?: boolean;
}

interface DataBackupModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DataBackupModal({ isOpen, onClose }: DataBackupModalProps) {
  const [snapshots, setSnapshots] = useState<Snapshot[]>([]);
  const [lastBackupTime, setLastBackupTime] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error'; text: string; details?: any } | null>(null);

  // Restore State
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [selectedSnapshot, setSelectedSnapshot] = useState<string | null>(null);
  const [uploadedFileContent, setUploadedFileContent] = useState<any>(null);
  const [uploadedFileName, setUploadedFileName] = useState<string>('');
  const [restoreMode, setRestoreMode] = useState<'replace' | 'merge'>('replace');
  const [confirmSafety, setConfirmSafety] = useState(false);

  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

  const authHeaders = {
    'Authorization': `Bearer ${token || ''}`,
    'Content-Type': 'application/json'
  };

  const fetchSnapshots = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/admin/backups/list', {
        headers: { 'Authorization': `Bearer ${token || ''}` }
      });
      if (res.ok) {
        const data = await res.json();
        setSnapshots(data.snapshots || []);
        setLastBackupTime(data.lastBackupTime || null);
      }
    } catch (err) {
      console.error('Failed to load backup snapshots:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchSnapshots();
      setMessage(null);
    }
  }, [isOpen]);

  const handleCreateSnapshot = async () => {
    setActionLoading(true);
    setMessage(null);
    try {
      const res = await fetch('/api/admin/backups/create', {
        method: 'POST',
        headers: authHeaders
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({
          type: 'success',
          text: `Snapshot created successfully: ${data.filename} (${data.sizeFormatted})`
        });
        fetchSnapshots();
      } else {
        setMessage({ type: 'error', text: data.error || 'Failed to create snapshot' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Network error creating snapshot: ' + err.message });
    } finally {
      setActionLoading(false);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedFileName(file.name);
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        setUploadedFileContent(parsed);
        setSelectedSnapshot(null);
        setMessage(null);
      } catch (err) {
        setMessage({ type: 'error', text: 'Invalid JSON file. Please provide a valid Jamia backup JSON.' });
        setUploadedFileContent(null);
      }
    };
    reader.readAsText(file);
  };

  const executeRestore = async () => {
    if (!confirmSafety) return;

    setActionLoading(true);
    setMessage(null);

    try {
      const bodyPayload: any = { mode: restoreMode };
      if (selectedSnapshot) {
        bodyPayload.snapshotFilename = selectedSnapshot;
      } else if (uploadedFileContent) {
        bodyPayload.data = uploadedFileContent;
      } else {
        setMessage({ type: 'error', text: 'No backup file or snapshot selected for restore.' });
        setActionLoading(false);
        return;
      }

      const res = await fetch('/api/admin/restore', {
        method: 'POST',
        headers: authHeaders,
        body: JSON.stringify(bodyPayload)
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setMessage({
          type: 'success',
          text: `Database successfully restored! Mode: ${data.mode}. Safety snapshot created: ${data.safetySnapshot}`,
          details: data.restoredCounts
        });
        setShowRestoreModal(false);
        setConfirmSafety(false);
        fetchSnapshots();
      } else {
        setMessage({ type: 'error', text: data.error || 'Database restoration failed.' });
      }
    } catch (err: any) {
      setMessage({ type: 'error', text: 'Network error during restore: ' + err.message });
    } finally {
      setActionLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center border border-emerald-100 shadow-sm">
              <Database size={22} />
            </div>
            <div>
              <h2 className="text-xl font-black text-slate-800 tracking-tight flex items-center gap-2">
                Database Backup & Disaster Recovery
                <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                  Automated v2.0
                </span>
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                بیک اپ، خودکار روزانہ محفوظ اسنیپ شاٹس، اور ڈیٹا بحالی سسٹم
              </p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        {/* Content Area */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">

          {/* Alert Message */}
          {message && (
            <div className={`p-4 rounded-xl border flex items-start gap-3 ${
              message.type === 'success' 
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900' 
                : 'bg-rose-50 border-rose-200 text-rose-900'
            }`}>
              {message.type === 'success' ? <CheckCircle2 className="shrink-0 text-emerald-600 mt-0.5" size={18} /> : <AlertTriangle className="shrink-0 text-rose-600 mt-0.5" size={18} />}
              <div className="text-sm flex-1">
                <p className="font-bold">{message.text}</p>
                {message.details && (
                  <div className="mt-2 text-xs bg-white/70 p-2 rounded border border-emerald-200 font-mono grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {Object.entries(message.details).map(([k, v]) => (
                      <span key={k}><b>{k}:</b> {String(v)}</span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {/* System Status Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            <div className="p-4 rounded-xl border border-emerald-100 bg-gradient-to-br from-emerald-50/50 to-teal-50/30">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Scheduled Auto-Backup</span>
                <span className="flex h-2.5 w-2.5 relative">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
                </span>
              </div>
              <div className="text-lg font-black text-slate-800 flex items-center gap-2">
                <ShieldCheck size={20} className="text-emerald-600" /> Active (24h Interval)
              </div>
              <p className="text-[11px] text-slate-500 mt-1 font-medium">Automatic daily snapshot rotated with 7-day retention.</p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Last Server Snapshot</div>
              <div className="text-lg font-black text-slate-800 flex items-center gap-2">
                <Clock size={18} className="text-blue-600" />
                {lastBackupTime ? new Date(lastBackupTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Today'}
              </div>
              <p className="text-[11px] text-slate-500 mt-1">
                {lastBackupTime ? new Date(lastBackupTime).toLocaleDateString() : 'Active in background'}
              </p>
            </div>

            <div className="p-4 rounded-xl border border-slate-200 bg-white">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Total Collections</div>
              <div className="text-lg font-black text-slate-800 flex items-center gap-2">
                <HardDrive size={18} className="text-purple-600" /> 15 Collections
              </div>
              <p className="text-[11px] text-slate-500 mt-1">Admissions, Students, Challans, Payments, Users.</p>
            </div>

          </div>

          {/* Quick Actions Bar */}
          <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <h4 className="text-sm font-bold text-slate-800">Manual Operations & Direct Export</h4>
              <p className="text-xs text-slate-500">Create an instant server snapshot or download files locally.</p>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleCreateSnapshot}
                disabled={actionLoading}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm disabled:opacity-50"
              >
                <RefreshCw size={14} className={actionLoading ? 'animate-spin' : ''} />
                Create Snapshot Now
              </button>

              <a
                href="/api/admin/backup"
                download
                className="flex items-center gap-2 px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
              >
                <FileCode size={14} /> Download JSON
              </a>

              <a
                href="/api/admin/backup/excel"
                download
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
              >
                <FileText size={14} /> Download Excel
              </a>

              <button
                type="button"
                onClick={() => { setShowRestoreModal(true); setMessage(null); }}
                className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-all shadow-sm"
              >
                <RotateCcw size={14} /> Restore Database
              </button>
            </div>
          </div>

          {/* Stored Server Snapshots List */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                <Database size={16} className="text-slate-600" />
                Server Stored Snapshots ({snapshots.length} available)
              </h3>
              <button
                onClick={fetchSnapshots}
                className="text-xs text-blue-600 hover:text-blue-800 font-bold flex items-center gap-1"
              >
                <RefreshCw size={12} className={loading ? 'animate-spin' : ''} /> Refresh List
              </button>
            </div>

            {loading ? (
              <div className="p-8 text-center text-xs text-slate-400 font-semibold animate-pulse">
                Loading stored snapshots from server...
              </div>
            ) : snapshots.length === 0 ? (
              <div className="p-6 bg-slate-50 border border-slate-200 rounded-xl text-center text-xs text-slate-500 font-medium">
                No snapshots stored on server yet. Click "Create Snapshot Now" above to generate one.
              </div>
            ) : (
              <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-100">
                {snapshots.map((snap) => (
                  <div key={snap.filename} className="p-3.5 flex items-center justify-between hover:bg-slate-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                        snap.isSafetyBackup 
                          ? 'bg-amber-100 text-amber-700' 
                          : 'bg-emerald-100 text-emerald-700'
                      }`}>
                        {snap.isSafetyBackup ? <ShieldCheck size={16} /> : <Database size={16} />}
                      </div>
                      <div>
                        <div className="text-xs font-mono font-bold text-slate-800 flex items-center gap-2">
                          {snap.filename}
                          {snap.isSafetyBackup && (
                            <span className="text-[10px] font-sans font-bold bg-amber-100 text-amber-800 px-2 py-0.5 rounded-full border border-amber-200">
                              Safety Backup
                            </span>
                          )}
                        </div>
                        <div className="text-[11px] text-slate-400 flex items-center gap-3 mt-0.5">
                          <span>{new Date(snap.createdAt).toLocaleString()}</span>
                          <span>•</span>
                          <span>{snap.sizeFormatted}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <a
                        href={`/api/admin/backups/download/${snap.filename}`}
                        download
                        className="p-2 text-slate-500 hover:text-blue-700 hover:bg-blue-50 rounded-lg transition-colors text-xs font-bold flex items-center gap-1"
                        title="Download to PC"
                      >
                        <Download size={14} /> Download
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedSnapshot(snap.filename);
                          setUploadedFileContent(null);
                          setShowRestoreModal(true);
                        }}
                        className="p-2 text-slate-500 hover:text-rose-700 hover:bg-rose-50 rounded-lg transition-colors text-xs font-bold flex items-center gap-1"
                        title="Restore this snapshot"
                      >
                        <RotateCcw size={14} /> Restore
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-slate-100 bg-slate-50/50 flex items-center justify-between">
          <span className="text-xs text-slate-400 font-medium">
            Jamia Sher-e-Rabbani Automated Disaster Recovery System
          </span>
          <button
            onClick={onClose}
            className="px-5 py-2 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-bold transition-colors"
          >
            Close
          </button>
        </div>

      </div>

      {/* DISASTER RECOVERY RESTORE CONFIRMATION MODAL */}
      {showRestoreModal && (
        <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg p-6 space-y-5">
            
            <div className="flex items-center gap-3 text-rose-600">
              <div className="w-10 h-10 rounded-full bg-rose-100 flex items-center justify-center shrink-0">
                <AlertTriangle size={22} />
              </div>
              <div>
                <h3 className="text-base font-black text-slate-900">Confirm Database Restoration</h3>
                <p className="text-xs text-slate-500 font-medium">ڈیٹا بیس بحالی کی تصدیق کریں</p>
              </div>
            </div>

            {/* Source Info */}
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-xs space-y-1">
              <span className="font-bold text-slate-700">Restore Source:</span>
              {selectedSnapshot ? (
                <p className="font-mono text-slate-800 break-all">Server Snapshot: <b>{selectedSnapshot}</b></p>
              ) : uploadedFileContent ? (
                <p className="font-mono text-slate-800 break-all">Uploaded File: <b>{uploadedFileName}</b></p>
              ) : (
                <div className="pt-2">
                  <label className="block font-bold text-slate-700 mb-1">Select Local Backup JSON File:</label>
                  <input
                    type="file"
                    accept=".json"
                    onChange={handleFileUpload}
                    className="block w-full text-xs text-slate-500 file:mr-2 file:py-1 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                  />
                </div>
              )}
            </div>

            {/* Mode selection */}
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-2">Restoration Mode:</label>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <label className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  restoreMode === 'replace' 
                    ? 'border-rose-500 bg-rose-50/40 text-rose-900 font-bold' 
                    : 'border-slate-200 bg-white text-slate-600'
                }`}>
                  <input
                    type="radio"
                    name="mode"
                    value="replace"
                    checked={restoreMode === 'replace'}
                    onChange={() => setRestoreMode('replace')}
                    className="mr-2"
                  />
                  Full Replace (Clean Slate)
                </label>

                <label className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  restoreMode === 'merge' 
                    ? 'border-emerald-500 bg-emerald-50/40 text-emerald-900 font-bold' 
                    : 'border-slate-200 bg-white text-slate-600'
                }`}>
                  <input
                    type="radio"
                    name="mode"
                    value="merge"
                    checked={restoreMode === 'merge'}
                    onChange={() => setRestoreMode('merge')}
                    className="mr-2"
                  />
                  Merge / Upsert (Keep extras)
                </label>
              </div>
            </div>

            {/* Safety Guarantee */}
            <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-xs text-emerald-800 flex items-start gap-2">
              <ShieldCheck size={18} className="text-emerald-600 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold">Automated Safety Snapshot Guaranteed</p>
                <p className="text-[11px] text-emerald-700 mt-0.5">
                  Before restoring, the server will automatically create a pre-restore safety snapshot so your current records can always be recovered.
                </p>
              </div>
            </div>

            {/* Checkbox confirmation */}
            <label className="flex items-start gap-2 cursor-pointer text-xs text-slate-700 select-none">
              <input
                type="checkbox"
                checked={confirmSafety}
                onChange={(e) => setConfirmSafety(e.target.checked)}
                className="mt-0.5 rounded text-rose-600 focus:ring-rose-500"
              />
              <span className="font-semibold">
                I understand that this action will update MongoDB database records, and I want to proceed.
              </span>
            </label>

            {/* Action buttons */}
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => { setShowRestoreModal(false); setConfirmSafety(false); }}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition-colors"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={executeRestore}
                disabled={!confirmSafety || actionLoading || (!selectedSnapshot && !uploadedFileContent)}
                className="flex items-center gap-2 px-5 py-2 bg-rose-600 hover:bg-rose-700 text-white rounded-lg text-xs font-bold transition-all shadow-md disabled:opacity-50"
              >
                <RotateCcw size={14} className={actionLoading ? 'animate-spin' : ''} />
                {actionLoading ? 'Restoring Database...' : 'Proceed with Restore'}
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
