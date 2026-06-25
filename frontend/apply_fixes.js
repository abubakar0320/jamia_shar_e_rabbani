const fs = require('fs');

// File paths
const pagePath = 'src/app/admissions/page.tsx';
const formPath = 'src/components/AdmissionForm.tsx';
const challanPath = 'src/components/AdmissionChallan.tsx';
const enPath = 'public/locales/en/common.json';
const urPath = 'public/locales/ur/common.json';

// Utility to replace all logic
function updateFile(filePath, replacements) {
    if (!fs.existsSync(filePath)) return;
    let content = fs.readFileSync(filePath, 'utf8');
    for (const [search, replace] of Object.entries(replacements)) {
        content = content.split(search).join(replace);
    }
    fs.writeFileSync(filePath, content);
}

// 1. Convert pl/pr/ml/mr/left/right to logical Tailwind classes
const logicalClasses = {
    ' pl-': ' ps-',
    ' pr-': ' pe-',
    ' ml-': ' ms-',
    ' mr-': ' me-',
    ' left-': ' start-',
    ' right-': ' end-',
    ' text-left': ' text-start',
    ' text-right': ' text-end',
    ' border-l-': ' border-s-',
    ' border-r-': ' border-e-'
};
updateFile(pagePath, logicalClasses);
updateFile(formPath, logicalClasses);
updateFile(challanPath, logicalClasses);

// 2. Add CNIC validation and update texts in AdmissionForm.tsx
let formContent = fs.readFileSync(formPath, 'utf8');

// Fix headers that had spaces before them
formContent = formContent.replace(/> Basic Information/g, '> {t("Basic Information")}');
formContent = formContent.replace(/> Contact Details/g, '> {t("Contact Details")}');
formContent = formContent.replace(/> Academic Choice/g, '> {t("Academic Choice")}');
formContent = formContent.replace(/> Additional Details/g, '> {t("Additional Details")}');
formContent = formContent.replace(/> Required Documents/g, '> {t("Required Documents")}');

// Clean up any double replacements (like {t("{t(...)})
formContent = formContent.replace(/{t\("{t\(/g, '{t(').replace(/}\)"}/g, ')}');

// Translate placeholders
formContent = formContent.replace(/placeholder="Ali Ahmad"/g, 'placeholder={t("Ali Ahmad")}');
formContent = formContent.replace(/placeholder="Muhammad Ahmad"/g, 'placeholder={t("Muhammad Ahmad")}');
formContent = formContent.replace(/placeholder="00000-0000000-0"/g, 'placeholder={t("00000-0000000-0")}');
formContent = formContent.replace(/placeholder="03001234567"/g, 'placeholder={t("03001234567")}');

// Date localization
formContent = formContent.replace(/<input type="date"/g, '<input type="date" lang={t("ur") === "Urdu" ? "ur" : "en"}');

// Add CNIC validation
const cnicValidation = `
    if (formData.cnic && formData.cnic.length !== 15) {
      alert(t("Please enter a valid 13-digit CNIC number."));
      setIsSubmitting(false);
      return;
    }
`;
if (!formContent.includes('cnic.length !== 15')) {
    formContent = formContent.replace('// Validate docs', cnicValidation + '\n    // Validate docs');
}

fs.writeFileSync(formPath, formContent);

// 3. Add to translation files
const enT = {
    "Ali Ahmad": "Ali Ahmad",
    "Muhammad Ahmad": "Muhammad Ahmad",
    "00000-0000000-0": "00000-0000000-0",
    "03001234567": "03001234567",
    "Please enter a valid 13-digit CNIC number.": "Please enter a valid 13-digit CNIC number.",
    "Basic Information": "Basic Information",
    "Contact Details": "Contact Details",
    "Academic Choice": "Academic Choice",
    "Additional Details": "Additional Details",
    "Required Documents": "Required Documents",
    "ur": "English"
};
const urT = {
    "Ali Ahmad": "علی احمد",
    "Muhammad Ahmad": "محمد احمد",
    "00000-0000000-0": "00000-0000000-0",
    "03001234567": "03001234567",
    "Please enter a valid 13-digit CNIC number.": "براہ کرم 13 ہندسوں پر مشتمل درست شناختی کارڈ نمبر درج کریں۔",
    "Basic Information": "بنیادی معلومات",
    "Contact Details": "رابطہ معلومات",
    "Academic Choice": "تعلیمی انتخاب",
    "Additional Details": "اضافی تفصیلات",
    "Required Documents": "مطلوبہ دستاویزات",
    "ur": "Urdu"
};

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const ur = JSON.parse(fs.readFileSync(urPath, 'utf8'));
Object.assign(en, enT);
Object.assign(ur, urT);
fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(urPath, JSON.stringify(ur, null, 2));

console.log("Fixes applied successfully!");
