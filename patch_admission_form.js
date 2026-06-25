const fs = require('fs');
let c = fs.readFileSync('frontend/src/components/AdmissionForm.tsx', 'utf8');

if(!c.includes('const [dynamicDocs, setDynamicDocs]')) {
  c = c.replace(
    "const [errorMessage, setErrorMessage] = useState('');",
    "const [errorMessage, setErrorMessage] = useState('');\n  const [dynamicDocs, setDynamicDocs] = useState<{id: string, label: string, required: boolean}[]>([]);\n\n  useEffect(() => {\n    fetch('http://localhost:5000/api/admission-requirements?t=' + Date.now()).then(res => res.json()).then(data => {\n      if (data && data.length > 0) {\n        setDynamicDocs(data.map(req => ({ id: req.id.toString(), label: req.title, required: true })));\n      }\n    }).catch(err => console.error(err));\n  }, []);"
  );
  
  c = c.replace(
    "const currentRequiredDocs = KHASUSI_DOCS[getBaseClassName(formData.classProgram)] || DEFAULT_REQUIRED_DOCS;",
    "const currentRequiredDocs = dynamicDocs.length > 0 ? dynamicDocs : (KHASUSI_DOCS[getBaseClassName(formData.classProgram)] || DEFAULT_REQUIRED_DOCS);"
  );
  
  fs.writeFileSync('frontend/src/components/AdmissionForm.tsx', c, 'utf8');
  console.log('Patched AdmissionForm.tsx for dynamic documents');
} else {
  console.log('Already patched');
}
