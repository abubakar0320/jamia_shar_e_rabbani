const fs = require('fs');
const enPath = './public/locales/en/common.json';
const urPath = './public/locales/ur/common.json';

const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
const ur = JSON.parse(fs.readFileSync(urPath, 'utf8'));

const enT = {
  'Age Verification': 'Age Verification',
  'Applicants must be between 5 and 80 years old for various departments.': 'Applicants must be between 5 and 80 years old for various departments.',
  'Authentic Documents': 'Authentic Documents',
  "Clear copies of NADRA ID/B-Form, Father's CNIC, and previous marksheets/result cards are mandatory.": "Clear copies of NADRA ID/B-Form, Father's CNIC, and previous marksheets/result cards are mandatory.",
  'Interview Process': 'Interview Process',
  'All students must pass a basic Quran recitation and character assessment interview.': 'All students must pass a basic Quran recitation and character assessment interview.'
};

const urT = {
  'Age Verification': 'عمر کی تصدیق',
  'Applicants must be between 5 and 80 years old for various departments.': 'مختلف شعبہ جات کے لئے امیدوار کی عمر 5 سے 80 سال کے درمیان ہونی چاہئے۔',
  'Authentic Documents': 'مصدقہ دستاویزات',
  "Clear copies of NADRA ID/B-Form, Father's CNIC, and previous marksheets/result cards are mandatory.": 'نادرا شناختی کارڈ/ب-فارم، والد کے شناختی کارڈ، اور پچھلی مارکس شیٹ/رزلٹ کارڈ کی صاف کاپیاں لازمی ہیں۔',
  'Interview Process': 'انٹرویو کا عمل',
  'All students must pass a basic Quran recitation and character assessment interview.': 'تمام طلباء کا بنیادی تلاوت قرآن اور اخلاقی جائزے کا انٹرویو پاس کرنا لازمی ہے۔'
};

Object.assign(en, enT);
Object.assign(ur, urT);

fs.writeFileSync(enPath, JSON.stringify(en, null, 2));
fs.writeFileSync(urPath, JSON.stringify(ur, null, 2));
console.log('Added requirements translations.');
