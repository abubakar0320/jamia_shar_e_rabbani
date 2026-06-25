const fs = require('fs');
let c = fs.readFileSync('src/app/admissions/page.tsx', 'utf8');

// 1. Add state for requirements
if (!c.includes('const [requirements, setRequirements]')) {
  c = c.replace(
    "const [submittedData, setSubmittedData] = useState<Admission | null>(null);",
    "const [submittedData, setSubmittedData] = useState<Admission | null>(null);\n  const [requirements, setRequirements] = useState<{id: number, text: string}[]>([]);\n\n  useEffect(() => {\n    fetch('http://localhost:5000/api/admission-requirements?t=' + Date.now()).then(res => res.json()).then(data => setRequirements(data)).catch(err => console.error(err));\n  }, []);"
  );
  
  // also need useEffect from React if not already imported
  if (!c.includes('useEffect')) {
    c = c.replace(
      "import React, { useState, Suspense } from 'react';",
      "import React, { useState, useEffect, Suspense } from 'react';"
    );
  }
}

// 2. Replace hardcoded requirements with dynamic mapping
const startReq = c.indexOf('<div className="space-y-6">');
const endReq = c.indexOf('</div>', c.indexOf('</div>', c.indexOf('</div>', c.indexOf('</div>', c.indexOf('</div>', c.indexOf('</div>', c.indexOf('</div>', c.indexOf('</div>', c.indexOf('</div>', c.indexOf('</div>', startReq) + 1) + 1) + 1) + 1) + 1) + 1) + 1) + 1) + 1) + 6;

// Wait, calculating indexOf manually for nested divs is risky. I will use string replace block.

const hardcodedReqs = `<div className="space-y-6">
                    <div className="flex gap-4">
                      <div className="text-blue-700 shrink-0 mt-1">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Age Verification</h4>
                        <p className="text-sm text-gray-600">Applicants must be between 5 and 80 years old for various departments.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="text-blue-700 shrink-0 mt-1">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Authentic Documents</h4>
                        <p className="text-sm text-gray-600">Clear copies of NADRA ID/B-Form and previous marksheets are mandatory.</p>
                      </div>
                    </div>
                    
                    <div className="flex gap-4">
                      <div className="text-blue-700 shrink-0 mt-1">
                        <CheckCircle2 size={20} />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Interview Process</h4>
                        <p className="text-sm text-gray-600">All students must pass a basic Quran recitation and character assessment interview.</p>
                      </div>
                    </div>
                  </div>`;

const dynamicReqs = `<div className="space-y-6">
                    {requirements.length > 0 ? requirements.map((req, i) => (
                      <div key={req.id || i} className="flex gap-4">
                        <div className="text-blue-700 shrink-0 mt-1">
                          <CheckCircle2 size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-800 leading-relaxed">{req.text}</p>
                        </div>
                      </div>
                    )) : (
                      <div className="text-sm text-gray-500">Loading requirements...</div>
                    )}
                  </div>`;

if (c.includes('Age Verification')) {
  c = c.replace(hardcodedReqs, dynamicReqs);
}

fs.writeFileSync('src/app/admissions/page.tsx', c, 'utf8');
console.log('Patched admissions page with dynamic requirements');
