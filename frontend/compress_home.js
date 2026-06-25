const fs = require('fs');
const path = require('path');

const dir = 'src/components/home';

const replaceMap = {
    'py-24': 'py-10',
    'py-20': 'py-8',
    'py-16': 'py-6',
    'py-12': 'py-4',
    'pt-32': 'pt-16',
    'pb-20': 'pb-8',
    'mb-20': 'mb-8',
    'mb-16': 'mb-6',
    'mb-12': 'mb-4',
    'mb-10': 'mb-4',
    'mt-24': 'mt-10',
    'mt-20': 'mt-8',
    'mt-16': 'mt-6',
    'gap-20': 'gap-8',
    'gap-16': 'gap-6',
    'gap-12': 'gap-4',
    'gap-10': 'gap-4',
    'h-screen': 'min-h-[70vh]', // For hero if any
    'min-h-screen': 'min-h-[70vh]'
};

fs.readdirSync(dir).forEach(file => {
    if (file.endsWith('.tsx')) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        let original = content;
        for (const [oldClass, newClass] of Object.entries(replaceMap)) {
            // Using regex to match exact class names
            const regex = new RegExp(`\\b${oldClass}\\b`, 'g');
            content = content.replace(regex, newClass);
        }
        
        if (original !== content) {
            fs.writeFileSync(filePath, content);
            console.log(`Compressed spacing in: ${file}`);
        }
    }
});
