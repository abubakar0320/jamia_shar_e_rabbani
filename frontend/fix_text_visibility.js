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

// Fix dark text on dark background visibility issues!

// 1. Hero.tsx
updateFile('Hero.tsx', (c) => {
    // Fix Hero heading which missed the replace because of extra classes
    c = c.replace(/text-slate-900/g, 'text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] via-[#e10098] to-[#f59e0b] drop-shadow-[0_0_15px_rgba(225,0,152,0.3)]');
    // Fix paragraph text
    c = c.replace(/text-slate-700/g, 'text-gray-200');
    // Fix Badge text which has double text colors `text-[#00d15e] ... text-white`
    c = c.replace(/text-white text-xs font-semibold/g, 'text-xs font-semibold');
    return c;
});

// 2. Stats.tsx
updateFile('Stats.tsx', (c) => {
    c = c.replace(/text-slate-900/g, 'text-white');
    c = c.replace(/text-slate-700/g, 'text-gray-300');
    return c;
});

// 3. AcademicPrograms.tsx
updateFile('AcademicPrograms.tsx', (c) => {
    c = c.replace(/text-slate-900/g, 'text-white');
    c = c.replace(/text-slate-800/g, 'text-gray-200');
    c = c.replace(/text-slate-700/g, 'text-gray-300');
    // For headings we want white, not blue. The links are blue.
    return c;
});

// 4. WhyChooseUs.tsx
updateFile('WhyChooseUs.tsx', (c) => {
    c = c.replace(/text-slate-900/g, 'text-white');
    c = c.replace(/text-slate-700/g, 'text-gray-300');
    return c;
});

// 5. FacultySpotlight.tsx
updateFile('FacultySpotlight.tsx', (c) => {
    c = c.replace(/text-slate-900/g, 'text-white');
    c = c.replace(/text-slate-700/g, 'text-gray-300');
    return c;
});

// 6. Testimonials.tsx
updateFile('Testimonials.tsx', (c) => {
    c = c.replace(/text-slate-900/g, 'text-white');
    c = c.replace(/text-slate-700/g, 'text-gray-300');
    return c;
});

// 7. CTA.tsx
updateFile('CTA.tsx', (c) => {
    // In CTA we might have text-slate-900 on white buttons, but wait, the button is now a neon gradient!
    // So the button text should be white or really dark for contrast.
    c = c.replace(/text-slate-900/g, 'text-white'); 
    c = c.replace(/text-slate-950/g, 'text-white'); // Fix neon button text to be white!
    c = c.replace(/text-slate-700/g, 'text-gray-200');
    return c;
});

// 8. Islam360Resources.tsx
updateFile('Islam360Resources.tsx', (c) => {
    c = c.replace(/bg-white/g, 'bg-[#0a0a0a]');
    c = c.replace(/border-slate-100/g, 'border-slate-800');
    c = c.replace(/text-slate-900/g, 'text-white');
    c = c.replace(/text-slate-700/g, 'text-gray-300');
    c = c.replace(/text-slate-600/g, 'text-gray-400');
    return c;
});

console.log("Fixed text visibility on all components!");
