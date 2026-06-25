const fs = require('fs');

const enPath = './public/locales/en/common.json';
const urPath = './public/locales/ur/common.json';

const enTranslations = {
  "Admissions Open for Session 2026-27": "Admissions Open for Session 2026-27",
  "Start Your Journey": "Start Your Journey",
  "in Sacred Knowledge": "in Sacred Knowledge",
  "Join a legacy of excellence. Secure your future in Islamic scholarship through our modernized, efficient, and student-focused admission process.": "Join a legacy of excellence. Secure your future in Islamic scholarship through our modernized, efficient, and student-focused admission process.",
  "Fast-Track Processing": "Fast-Track Processing",
  "Digital Document Review": "Digital Document Review",
  "Simple 4-Step Application Process": "Simple 4-Step Application Process",
  "We have streamlined our application procedure to ensure that prospective students can apply from anywhere with ease.": "We have streamlined our application procedure to ensure that prospective students can apply from anywhere with ease.",
  "Form Submission": "Form Submission",
  "Fill out the online application form with your personal and academic details.": "Fill out the online application form with your personal and academic details.",
  "Document Upload": "Document Upload",
  "Upload clear scans of your ID cards, photographs, and previous result cards.": "Upload clear scans of your ID cards, photographs, and previous result cards.",
  "Review & Interview": "Review & Interview",
  "Our academic committee will review your files and schedule an entrance interview.": "Our academic committee will review your files and schedule an entrance interview.",
  "Confirmation": "Confirmation",
  "Once selected, pay your admission fee to secure your seat and receive your student ID.": "Once selected, pay your admission fee to secure your seat and receive your student ID.",
  "Admission Requirements": "Admission Requirements",
  "Loading requirements...": "Loading requirements...",
  "Need Assistance?": "Need Assistance?",
  "If you face any issues while filling the form, contact our Academic Support office.": "If you face any issues while filling the form, contact our Academic Support office.",
  "Loading Application Form...": "Loading Application Form...",
  "Entrance Test": "Entrance Test",
  "A baseline test for Arabic and Quran proficiency to determine the appropriate starting class level.": "A baseline test for Arabic and Quran proficiency to determine the appropriate starting class level.",
  "Boarding Facilities": "Boarding Facilities",
  "Dedicated and secure boarding facilities are available for out-of-city students with strict discipline.": "Dedicated and secure boarding facilities are available for out-of-city students with strict discipline.",
  "Financial Aid": "Financial Aid",
  "Scholarships and Zakat-funded support are available for deserving students who cannot afford the fees.": "Scholarships and Zakat-funded support are available for deserving students who cannot afford the fees.",
  "Select Admission Section *": "Select Admission Section *",
  "-- Choose Section --": "-- Choose Section --",
  "Tulba (Boys)": "Tulba (Boys)",
  "Talibat (Girls)": "Talibat (Girls)",
  "Select Class / Program *": "Select Class / Program *",
  "-- Choose Class --": "-- Choose Class --",
  "Additional Details": "Additional Details",
  "Required Documents": "Required Documents",
  "Max 5MB per file": "Max 5MB per file",
  "File size should be less than 5MB": "File size should be less than 5MB",
  "Processing Application...": "Processing Application...",
  "Submit Admission Application": "Submit Admission Application",
  "Please fill out ": "Please fill out ",
  "Please upload: ": "Please upload: ",
  "Submission failed: ": "Submission failed: ",
  "Unknown network error": "Unknown network error",
  "Enter ": "Enter ",
  "Network error": "Network error"
};

const urTranslations = {
  "Admissions Open for Session 2026-27": "تعلیمی سال 27-2026 کے لئے داخلے جاری ہیں",
  "Start Your Journey": "اپنے سفر کا آغاز کریں",
  "in Sacred Knowledge": "مقدس علم کے راستے میں",
  "Join a legacy of excellence. Secure your future in Islamic scholarship through our modernized, efficient, and student-focused admission process.": "عظیم روایت کا حصہ بنیں۔ ہمارے جدید اور آسان طریقہ داخلہ کے ذریعے اسلامی تعلیم میں اپنا مستقبل محفوظ کریں۔",
  "Fast-Track Processing": "تیز ترین پروسیسنگ",
  "Digital Document Review": "ڈیجیٹل دستاویز کی جانچ",
  "Simple 4-Step Application Process": "آسان 4-مرحلہ داخلہ کا عمل",
  "We have streamlined our application procedure to ensure that prospective students can apply from anywhere with ease.": "ہم نے اپنا طریقہ داخلہ آسان بنا دیا ہے تاکہ طلباء کہیں سے بھی باآسانی اپلائی کر سکیں۔",
  "Form Submission": "فارم جمع کروانا",
  "Fill out the online application form with your personal and academic details.": "اپنی ذاتی اور تعلیمی معلومات کے ساتھ آن لائن درخواست فارم پُر کریں۔",
  "Document Upload": "دستاویزات اپلوڈ",
  "Upload clear scans of your ID cards, photographs, and previous result cards.": "اپنے شناختی کارڈ، تصاویر اور پچھلے رزلٹ کارڈز کی صاف سکین کاپیاں اپلوڈ کریں۔",
  "Review & Interview": "جائزہ اور انٹرویو",
  "Our academic committee will review your files and schedule an entrance interview.": "ہماری تعلیمی کمیٹی آپ کی فائل کا جائزہ لے کر داخلہ انٹرویو کا وقت طے کرے گی۔",
  "Confirmation": "داخلے کی تصدیق",
  "Once selected, pay your admission fee to secure your seat and receive your student ID.": "منتخب ہونے کے بعد، اپنی نشست پکی کرنے اور سٹوڈنٹ آئی ڈی حاصل کرنے کے لئے داخلہ فیس ادا کریں۔",
  "Admission Requirements": "داخلہ کی شرائط",
  "Loading requirements...": "شرائط لوڈ ہو رہی ہیں...",
  "Need Assistance?": "کیا آپ کو مدد کی ضرورت ہے؟",
  "If you face any issues while filling the form, contact our Academic Support office.": "اگر آپ کو فارم بھرنے میں کوئی مسئلہ درپیش ہو تو ہمارے اکیڈمک سپورٹ آفس سے رابطہ کریں۔",
  "Loading Application Form...": "درخواست فارم لوڈ ہو رہا ہے...",
  "Entrance Test": "داخلہ ٹیسٹ",
  "A baseline test for Arabic and Quran proficiency to determine the appropriate starting class level.": "عربی اور قرآن کی مہارت کا بنیادی ٹیسٹ تاکہ مناسب کلاس کا تعین کیا جا سکے۔",
  "Boarding Facilities": "رہائشی سہولیات",
  "Dedicated and secure boarding facilities are available for out-of-city students with strict discipline.": "شہر سے باہر کے طلباء کے لئے نظم و ضبط کے ساتھ محفوظ رہائشی سہولیات دستیاب ہیں۔",
  "Financial Aid": "مالی معاونت",
  "Scholarships and Zakat-funded support are available for deserving students who cannot afford the fees.": "مستحق طلباء جو فیس ادا نہیں کر سکتے ان کے لئے وظائف اور زکوٰۃ کی سہولت موجود ہے۔",
  "Select Admission Section *": "شعبہ داخلہ منتخب کریں *",
  "-- Choose Section --": "-- شعبہ منتخب کریں --",
  "Tulba (Boys)": "طلباء (لڑکے)",
  "Talibat (Girls)": "طالبات (لڑکیاں)",
  "Select Class / Program *": "کلاس / پروگرام منتخب کریں *",
  "-- Choose Class --": "-- کلاس منتخب کریں --",
  "Additional Details": "اضافی تفصیلات",
  "Required Documents": "مطلوبہ دستاویزات",
  "Max 5MB per file": "زیادہ سے زیادہ 5MB فی فائل",
  "File size should be less than 5MB": "فائل کا سائز 5 ایم بی سے کم ہونا چاہیے",
  "Processing Application...": "درخواست پروسیس ہو رہی ہے...",
  "Submit Admission Application": "داخلہ فارم جمع کروائیں",
  "Please fill out ": "براہ کرم پُر کریں ",
  "Please upload: ": "براہ کرم اپلوڈ کریں: ",
  "Submission failed: ": "درخواست جمع کروانے میں ناکامی: ",
  "Unknown network error": "نامعلوم نیٹ ورک کی خرابی",
  "Enter ": "درج کریں ",
  "Network error": "نیٹ ورک کی خرابی"
};

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const ur = JSON.parse(fs.readFileSync(urPath, 'utf8'));

Object.assign(en, enTranslations);
Object.assign(ur, urTranslations);

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(urPath, JSON.stringify(ur, null, 2));
console.log('Translations added successfully.');
