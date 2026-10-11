'use client';

import React from 'react';
import { Award, FileText } from 'lucide-react';
import { InternshipApplication, CertProfile } from './types';

interface InternshipsModuleProps {
  internships: InternshipApplication[];
}

export function InternshipsModule({ internships }: InternshipsModuleProps) {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Internship Applications</h2>
          <p className="text-slate-500 text-sm">View all students who applied for the internship program.</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-blue-50 text-blue-700 rounded-lg font-medium text-sm flex items-center gap-2">
            <Award size={16} /> Total: {internships.length}
          </div>
        </div>
      </div>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 border-b border-slate-100 text-xs uppercase tracking-wider text-slate-500 font-semibold">
                <th className="p-4">App ID</th>
                <th className="p-4">Applicant Info</th>
                <th className="p-4">Institution & Edu</th>
                <th className="p-4">Domain</th>
                <th className="p-4">Date</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {internships.map((int, i) => (
                <tr key={i} className="hover:bg-slate-50/50 transition-colors">
                  <td className="p-4">
                    <span className="font-mono text-sm font-semibold text-slate-700">{int.applicationNo}</span>
                  </td>
                  <td className="p-4">
                    <div className="font-semibold text-slate-800">{int.fullName}</div>
                    <div className="text-xs text-slate-500">{int.email}</div>
                    <div className="text-xs text-slate-500">{int.phone}</div>
                  </td>
                  <td className="p-4">
                    <div className="text-sm text-slate-700 font-medium">{int.institution}</div>
                    <div className="text-xs text-slate-500">{int.education}</div>
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-amber-50 text-amber-700 text-xs font-semibold rounded-md border border-amber-100 whitespace-nowrap">
                      {int.fieldOfInterest}
                    </span>
                  </td>
                  <td className="p-4 text-sm text-slate-600">
                    {new Date(int.date).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <span className="px-2.5 py-1 bg-slate-100 text-slate-600 text-xs font-semibold rounded-full border border-slate-200">
                      {int.status || 'Pending'}
                    </span>
                  </td>
                </tr>
              ))}
              {internships.length === 0 && (
                <tr>
                  <td colSpan={6} className="p-12 text-center text-slate-500">
                    <div className="flex flex-col items-center justify-center gap-3">
                      <FileText size={32} className="text-slate-300" />
                      <p>No internship applications yet.</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface CertProfilesModuleProps {
  certProfiles: CertProfile[];
  setCertProfiles: React.Dispatch<React.SetStateAction<CertProfile[]>>;
}

export function CertProfilesModule({ certProfiles, setCertProfiles }: CertProfilesModuleProps) {
  return (
    <div className="space-y-6 animate-in fade-in zoom-in-95 duration-300">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-slate-800">Certificate Profiles</h2>
          <p className="text-slate-500 text-sm">Create and manage public verification profiles for interns.</p>
        </div>
      </div>

      <form onSubmit={async (e) => {
        e.preventDefault();
        const target = e.target as any;
        const submitBtn = target.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'Creating Profile... Please wait';
        submitBtn.disabled = true;

        try {
          const formData = {
            name: target.name.value,
            slug: target.slug.value,
            cnic: target.cnic.value,
            phone: target.phone.value,
            university: target.university.value,
            domain: target.domain.value,
            issueDate: target.issueDate.value,
            documents: {} as any
          };

          const toBase64 = (file: File) => new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = error => reject(error);
          });

          const internshipLetter = target.internshipLetter.files[0];
          const certificate = target.certificate.files[0];
          const recommendation = target.recommendation.files[0];

          if (internshipLetter) formData.documents.internshipLetter = await toBase64(internshipLetter);
          if (certificate) formData.documents.certificate = await toBase64(certificate);
          if (recommendation) formData.documents.recommendation = await toBase64(recommendation);

          const res = await fetch('/api/admin/internship-certificates', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
          });
          
          if (res.ok) {
            alert('Profile Created!');
            target.reset();
            const newData = await fetch('/api/admin/internship-certificates').then(r => r.json());
            setCertProfiles(newData.reverse());
          } else {
            const errorText = await res.text();
            alert('Error creating profile: ' + errorText);
          }
        } catch (err: any) {
          alert('Network Error: ' + err.message);
        } finally {
          submitBtn.innerText = originalText;
          submitBtn.disabled = false;
        }
      }} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
        <h3 className="font-bold text-slate-800 mb-4">Create New Profile</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input name="name" required placeholder="Student Name (e.g. Abu Bakar)" className="p-3 border rounded-lg" />
          <input name="slug" required placeholder="URL Slug (e.g. abubakar)" className="p-3 border rounded-lg" />
          <input name="cnic" required placeholder="CNIC Number" className="p-3 border rounded-lg" />
          <input name="phone" required placeholder="Phone Number" className="p-3 border rounded-lg" />
          <input name="university" required placeholder="University / Institution" className="p-3 border rounded-lg" />
          <input name="domain" required placeholder="Internship Domain (e.g. Web Dev)" className="p-3 border rounded-lg" />
          <input name="issueDate" type="date" required className="p-3 border rounded-lg" />
        </div>
        <div className="space-y-3 pt-2">
          <label className="block text-sm font-semibold">Internship Letter Image</label>
          <input name="internshipLetter" type="file" accept="image/*" className="w-full" required />
          
          <label className="block text-sm font-semibold">Certificate Image</label>
          <input name="certificate" type="file" accept="image/*" className="w-full" required />
          
          <label className="block text-sm font-semibold">Recommendation Letter Image</label>
          <input name="recommendation" type="file" accept="image/*" className="w-full" required />
        </div>
        <button type="submit" className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700">
          Create Profile
        </button>
      </form>
      
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden mt-8">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50 border-b">
              <th className="p-4">Name</th>
              <th className="p-4">URL Slug</th>
              <th className="p-4">Domain</th>
              <th className="p-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {certProfiles.map((p, i) => (
              <tr key={i}>
                <td className="p-4">{p.name}</td>
                <td className="p-4"><a href={`/internship/${p.slug}`} target="_blank" className="text-blue-600 hover:underline">/internship/{p.slug}</a></td>
                <td className="p-4">{p.domain}</td>
                <td className="p-4">
                  <button onClick={async () => {
                    if (confirm('Delete this profile?')) {
                      await fetch(`/api/admin/internship-certificates/${p.id}`, { method: 'DELETE' });
                      setCertProfiles(certProfiles.filter(x => x.id !== p.id));
                    }
                  }} className="text-red-500 hover:text-red-700">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
