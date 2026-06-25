const fs = require('fs');

function updatePage() {
  const pagePath = './src/app/admissions/page.tsx';
  let content = fs.readFileSync(pagePath, 'utf8');

  // Replace text in admissions/page.tsx
  const replacements = {
    'Admissions Open for Session 2026-27': '{t("Admissions Open for Session 2026-27")}',
    'Start Your Journey': '{t("Start Your Journey")}',
    'in Sacred Knowledge': '{t("in Sacred Knowledge")}',
    'Join a legacy of excellence. Secure your future in Islamic scholarship through our modernized, efficient, and student-focused admission process.': '{t("Join a legacy of excellence. Secure your future in Islamic scholarship through our modernized, efficient, and student-focused admission process.")}',
    'Fast-Track Processing': '{t("Fast-Track Processing")}',
    'Digital Document Review': '{t("Digital Document Review")}',
    'Simple 4-Step Application Process': '{t("Simple 4-Step Application Process")}',
    'We have streamlined our application procedure to ensure that prospective students can apply from anywhere with ease.': '{t("We have streamlined our application procedure to ensure that prospective students can apply from anywhere with ease.")}',
    '"Form Submission"': 't("Form Submission")',
    '"Fill out the online application form with your personal and academic details."': 't("Fill out the online application form with your personal and academic details.")',
    '"Document Upload"': 't("Document Upload")',
    '"Upload clear scans of your ID cards, photographs, and previous result cards."': 't("Upload clear scans of your ID cards, photographs, and previous result cards.")',
    '"Review & Interview"': 't("Review & Interview")',
    '"Our academic committee will review your files and schedule an entrance interview."': 't("Our academic committee will review your files and schedule an entrance interview.")',
    '"Confirmation"': 't("Confirmation")',
    '"Once selected, pay your admission fee to secure your seat and receive your student ID."': 't("Once selected, pay your admission fee to secure your seat and receive your student ID.")',
    'Admission Requirements': '{t("Admission Requirements")}',
    'Loading requirements...': '{t("Loading requirements...")}',
    'Need Assistance?': '{t("Need Assistance?")}',
    'If you face any issues while filling the form, contact our Academic Support office.': '{t("If you face any issues while filling the form, contact our Academic Support office.")}',
    'Loading Application Form...': '{t("Loading Application Form...")}',
    '"Entrance Test"': 't("Entrance Test")',
    '"A baseline test for Arabic and Quran proficiency to determine the appropriate starting class level."': 't("A baseline test for Arabic and Quran proficiency to determine the appropriate starting class level.")',
    '"Boarding Facilities"': 't("Boarding Facilities")',
    '"Dedicated and secure boarding facilities are available for out-of-city students with strict discipline."': 't("Dedicated and secure boarding facilities are available for out-of-city students with strict discipline.")',
    '"Financial Aid"': 't("Financial Aid")',
    '"Scholarships and Zakat-funded support are available for deserving students who cannot afford the fees."': 't("Scholarships and Zakat-funded support are available for deserving students who cannot afford the fees.")'
  };

  for (const [search, replace] of Object.entries(replacements)) {
    // Only replace literal text inside tags or string literals, not variables
    // Using string split-join to replace exactly
    content = content.split(search).join(replace);
  }

  // Also replace some nested JSX content
  content = content.replace(/{t\("{t\(/g, '{t(').replace(/}\)"}/g, ')}');
  
  // Fix nested t calls if any happened
  fs.writeFileSync(pagePath, content);
}

function updateForm() {
  const formPath = './src/components/AdmissionForm.tsx';
  let content = fs.readFileSync(formPath, 'utf8');

  // Add t to alert messages
  content = content.replace(/alert\('Please fill out ' \+ f\.title\)/g, "alert(t('Please fill out ') + t(f.title))");
  content = content.replace(/alert\(`Please upload: \${/g, "alert(t('Please upload: ') + `\${");
  content = content.replace(/alert\('Submission failed: ' \+ /g, "alert(t('Submission failed: ') + ");

  // Labels and Texts
  const replacements = {
    'Admission Application': '{t("Admission Application")}',
    'Jamia Sher-e-Rabbani, Mananwala': '{t("Jamia Sher-e-Rabbani, Mananwala")}',
    'Basic Information': '{t("Basic Information")}',
    'Contact Details': '{t("Contact Details")}',
    'Academic Choice': '{t("Academic Choice")}',
    'Select Admission Section *': '{t("Select Admission Section *")}',
    '-- Choose Section --': '{t("-- Choose Section --")}',
    'Tulba (Boys)': '{t("Tulba (Boys)")}',
    'Talibat (Girls)': '{t("Talibat (Girls)")}',
    'Select Class / Program *': '{t("Select Class / Program *")}',
    '-- Choose Class --': '{t("-- Choose Class --")}',
    'Additional Details': '{t("Additional Details")}',
    'Required Documents': '{t("Required Documents")}',
    'Max 5MB per file': '{t("Max 5MB per file")}',
    'Processing Application...': '{t("Processing Application...")}',
    'Submit Admission Application': '{t("Submit Admission Application")}'
  };

  for (const [search, replace] of Object.entries(replacements)) {
    content = content.split('>' + search + '<').join('>' + replace + '<');
    content = content.split(search + '<').join(replace + '<'); // for things ending in tag
  }
  
  // Clean up any double replacements
  content = content.replace(/{t\("{t\(/g, '{t(').replace(/}\)"}/g, ')}');

  // Fix dynamic titles
  content = content.replace(/{getCoreField\('([a-zA-Z]+)'\)\.title}/g, "{t(getCoreField('$1').title)}");
  content = content.replace(/{field\.title}/g, "{t(field.title)}");
  content = content.replace(/placeholder=\{'Enter ' \+ field\.title\}/g, "placeholder={t('Enter ') + t(field.title)}");
  content = content.replace(/'-- Select ' \+ field\.title \+ ' --'/g, "t('-- Choose Class --')"); // Wait, original was: <option value="">-- Select {field.title} --</option>
  content = content.replace(/-- Select {field\.title} --/g, "-- {t('Select')} {t(field.title)} --"); 
  
  content = content.replace(/\{doc\.label\}\*/g, "{t(doc.label)}*");
  
  fs.writeFileSync(formPath, content);
}

try {
  updatePage();
  updateForm();
  console.log('Pages updated successfully.');
} catch (e) {
  console.error(e);
}
