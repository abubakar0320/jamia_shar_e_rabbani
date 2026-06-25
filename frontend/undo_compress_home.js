const fs = require('fs');
const path = require('path');

const dir = 'src/components/home';

// Reverse mapping of the previous compression script
const replaceMap = {
    'py-10': 'py-24', // Wait, mb-10 was also changed to mb-4, so mb-4 goes to mb-12 or mb-10?
    // Let's be very specific:
    'py-10': 'py-24',
    'py-8': 'py-20',
    'py-6': 'py-16',
    'py-4': 'py-12',
    'pt-16': 'pt-32',
    'pb-8': 'pb-20',
    'mb-8': 'mb-20',
    'mb-6': 'mb-16',
    'mb-4': 'mb-12', // Let's just use mb-12 for mb-4
    'mt-10': 'mt-24',
    'mt-8': 'mt-20',
    'mt-6': 'mt-16',
    'gap-8': 'gap-20',
    'gap-6': 'gap-16',
    'gap-4': 'gap-12',
    'min-h-\\[70vh\\]': 'min-h-screen'
};

const files = [
    'AcademicPrograms.tsx',
    'CTA.tsx',
    'FacultySpotlight.tsx',
    'Islam360Resources.tsx',
    'MahfilSlider.tsx',
    'NewsEvents.tsx',
    'Stats.tsx',
    'Testimonials.tsx',
    'WhyChooseUs.tsx'
];

files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let original = content;
        
        for (const [oldClass, newClass] of Object.entries(replaceMap)) {
            const regex = new RegExp(`\\b${oldClass}\\b`, 'g');
            content = content.replace(regex, newClass);
        }
        
        if (original !== content) {
            fs.writeFileSync(filePath, content);
            console.log(`Reverted spacing in: ${file}`);
        }
    }
});
