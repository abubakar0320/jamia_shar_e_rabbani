const fs = require('fs');

// 1. Update Roll Number Slip Page
let rollSlipPath = 'frontend/src/app/roll-number-slip/page.tsx';
if (fs.existsSync(rollSlipPath)) {
  let content = fs.readFileSync(rollSlipPath, 'utf8');
  if (!content.includes('useTranslation')) {
    content = content.replace("import { useState } from 'react';", "import { useState } from 'react';\nimport { useTranslation } from 'react-i18next';");
    content = content.replace("export default function RollNumberSlipPage() {", "export default function RollNumberSlipPage() {\n  const { t } = useTranslation();");
    
    // Replace text
    content = content.replace('Roll Number <span className="text-blue-700">Slips</span>', '{t("roll_number", "Roll Number")} <span className="text-blue-700">{t("slips", "Slips")}</span>');
    content = content.replace('Download and print your official Roll Number Slip', '{t("download_slip_desc", "Download and print your official Roll Number Slip for the upcoming annual examinations. This slip is mandatory for entry into the examination hall.")}');
    content = content.replace('Find Your Slip', '{t("find_your_slip", "Find Your Slip")}');
    content = content.replace('Enter your assigned Roll Number or CNIC without dashes.', '{t("enter_roll_no_desc", "Enter your assigned Roll Number or CNIC without dashes.")}');
    content = content.replace('Search Record', '{t("search_record", "Search Record")}');
    content = content.replace('Searching...', '{t("searching", "Searching...")}');
    content = content.replace('Student Name', '{t("student_name", "Student Name")}');
    content = content.replace("Father's Name", "{t('father_name', 'Father\\'s Name')}");
    content = content.replace('Class / Program', '{t("class_program", "Class / Program")}');
    content = content.replace('Section Type', '{t("section_type", "Section Type")}');
    content = content.replace('Print Slip', '{t("print_slip", "Print Slip")}');
    
    fs.writeFileSync(rollSlipPath, content, 'utf8');
  }
}

// 2. Update Urdu JSON
const urJsonPath = 'frontend/public/locales/ur/common.json';
if (fs.existsSync(urJsonPath)) {
  let urJson = JSON.parse(fs.readFileSync(urJsonPath, 'utf8'));
  
  // Add missing translations
  const newTranslations = {
    "roll_number": "رول نمبر",
    "slips": "سلپس",
    "download_slip_desc": "آنے والے سالانہ امتحانات کے لیے اپنی آفیشل رول نمبر سلپ ڈاؤن لوڈ اور پرنٹ کریں۔ امتحانی ہال میں داخلے کے لیے یہ سلپ لازمی ہے۔",
    "find_your_slip": "اپنی سلپ تلاش کریں",
    "enter_roll_no_desc": "اپنا تفویض کردہ رول نمبر یا شناختی کارڈ نمبر ڈیش کے بغیر درج کریں۔",
    "search_record": "تلاش کریں",
    "searching": "تلاش ہو رہا ہے...",
    "student_name": "طالب علم کا نام",
    "father_name": "والد کا نام",
    "class_program": "کلاس / پروگرام",
    "section_type": "سیکشن",
    "print_slip": "پرنٹ کریں",
    "staff_admin_login": "عملہ / ایڈمن لاگ ان",
    "admin_login": "ایڈمن لاگ ان",
    "annual_examination": "سالانہ امتحان",
    "exam_rules": "امتحانی اصول و ضوابط",
    "signature": "دستخط",
    "paste_photo": "یہاں تصویر لگائیں",
    // Results
    "exam_results": "امتحانی نتائج",
    "check_results_desc": "اپنا رول نمبر درج کر کے اپنے سالانہ اور ششماہی امتحانات کے نتائج چیک کریں۔",
    "result_card": "رزلٹ کارڈ",
    "total_marks": "کل نمبر",
    "obtained_marks": "حاصل کردہ نمبر",
    "percentage": "فیصد",
    "grade": "گریڈ",
    "status": "حیثیت",
    "pass": "پاس",
    "fail": "فیل",
    // Admissions
    "apply_online": "آن لائن اپلائی کریں",
    "admission_form": "داخلہ فارم",
    "personal_info": "ذاتی معلومات",
    "academic_info": "تعلیمی معلومات",
    "submit_application": "درخواست جمع کرائیں",
    "processing": "پروسیس ہو رہا ہے...",
    "application_submitted": "آپ کی درخواست کامیابی سے جمع ہو گئی ہے!"
  };

  urJson = { ...urJson, ...newTranslations };
  fs.writeFileSync(urJsonPath, JSON.stringify(urJson, null, 2), 'utf8');
}

// 3. Update Arabic JSON
const arJsonPath = 'frontend/public/locales/ar/common.json';
if (fs.existsSync(arJsonPath)) {
  let arJson = JSON.parse(fs.readFileSync(arJsonPath, 'utf8'));
  
  const newTranslationsAr = {
    "roll_number": "رقم الجلوس",
    "slips": "بطاقات",
    "download_slip_desc": "قم بتنزيل وطباعة بطاقة رقم الجلوس الرسمية للامتحانات السنوية القادمة. هذه البطاقة إلزامية لدخول قاعة الامتحان.",
    "find_your_slip": "ابحث عن بطاقتك",
    "enter_roll_no_desc": "أدخل رقم الجلوس أو رقم الهوية.",
    "search_record": "بحث",
    "searching": "جاري البحث...",
    "student_name": "اسم الطالب",
    "father_name": "اسم الأب",
    "class_program": "الفصل / البرنامج",
    "section_type": "القسم",
    "print_slip": "طباعة",
    "staff_admin_login": "دخول الإدارة",
    "admin_login": "دخول الإدارة",
    "exam_results": "نتائج الامتحانات",
    "result_card": "بطاقة النتيجة",
    "apply_online": "التقديم عبر الإنترنت",
    "submit_application": "إرسال الطلب",
    "application_submitted": "تم تقديم طلبك بنجاح!"
  };

  arJson = { ...arJson, ...newTranslationsAr };
  fs.writeFileSync(arJsonPath, JSON.stringify(arJson, null, 2), 'utf8');
}

console.log('Translations updated successfully.');
