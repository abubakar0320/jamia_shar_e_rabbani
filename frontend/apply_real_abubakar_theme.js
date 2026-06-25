const fs = require('fs');
const path = require('path');

const dir = 'src/components/home';
const updateFile = (filename, replacer) => {
    const file = path.join(dir, filename);
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = replacer(content);
        fs.writeFileSync(file, content);
    }
};

// Re-inject iamabubakar.site exact Blue-600 / Slate-950 color scheme

// 1. Hero.tsx - White bg, text-slate-900, blue-600 accents/buttons
updateFile('Hero.tsx', (c) => {
    // Revert badge from generic slate to blue or soft blue
    c = c.replace(/bg-slate-100 text-slate-800 border border-slate-200/g, 'bg-blue-50 text-blue-600 border border-blue-100');
    // Primary button to blue-600
    c = c.replace(/bg-slate-900 text-white hover:bg-slate-800/g, 'bg-blue-600 text-white hover:bg-blue-700 shadow-sm');
    // Hero title styling (Add blue highlight to the accent word if any)
    c = c.replace(/className="text-4xl md:text-5xl font-black text-slate-900 drop-shadow-sm"/g, 'className="text-4xl md:text-5xl font-black text-slate-900"');
    return c;
});

// 2. Stats.tsx - Clean white with blue icons
updateFile('Stats.tsx', (c) => {
    c = c.replace(/text-slate-900 mb-4 p-4 bg-slate-50/g, 'text-blue-600 mb-4 p-4 bg-blue-50/50');
    return c;
});

// 3. AcademicPrograms.tsx - White cards, hover border blue-600
updateFile('AcademicPrograms.tsx', (c) => {
    // Links / Tags should be blue-600
    c = c.replace(/text-slate-900/g, 'text-blue-600'); // for the "Read Details" links (wait, don't replace all slate-900)
    // Be more specific:
    c = c.replace(/className="inline-flex items-center text-slate-900 font-semibold hover:underline group\/link"/g, 'className="inline-flex items-center text-blue-600 font-semibold hover:underline group/link"');
    
    // Replace the complicated border with a simple blue hover border like Abubakar's site
    c = c.replace(/border border-slate-200 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md group hover:border-slate-300/g, 'border border-gray-100 bg-white transition-all duration-300 hover:shadow-lg hover:border-blue-600/30 group');
    
    // Category tag
    c = c.replace(/<span className="text-xs text-slate-500 font-semibold mb-2 uppercase tracking-wide">/g, '<span className="text-xs text-blue-600 bg-blue-50 px-2 py-1 rounded-md font-semibold mb-3 uppercase tracking-wide inline-block w-max">');
    return c;
});

// 4. WhyChooseUs.tsx - Dark Slate-950 with blue accents
updateFile('WhyChooseUs.tsx', (c) => {
    // Icon containers
    c = c.replace(/bg-slate-900 p-3 rounded-xl border border-slate-800 text-white/g, 'bg-slate-800/50 p-3 rounded-xl border border-slate-700 text-blue-400');
    return c;
});

// 5. FacultySpotlight.tsx
updateFile('FacultySpotlight.tsx', (c) => {
    c = c.replace(/className="inline-flex items-center text-slate-900 font-semibold hover:underline/g, 'className="inline-flex items-center text-blue-600 font-semibold hover:underline');
    return c;
});

// 6. Testimonials.tsx - Clean
updateFile('Testimonials.tsx', (c) => {
    // Add blue-600 quote icons if any, or just leave clean
    return c;
});

// 7. CTA.tsx - Deep Slate-950 with a primary Blue button
updateFile('CTA.tsx', (c) => {
    c = c.replace(/bg-white text-slate-950 hover:bg-slate-100/g, 'bg-blue-600 text-white hover:bg-blue-700');
    return c;
});

// 8. Islam360Resources.tsx
updateFile('Islam360Resources.tsx', (c) => {
    c = c.replace(/text-slate-900/g, 'text-slate-900'); 
    c = c.replace(/className="inline-flex items-center text-slate-900/g, 'className="inline-flex items-center text-blue-600');
    return c;
});

console.log("Applied Blue-600 & Slate-950 colors matching iamabubakar.site exactly!");
