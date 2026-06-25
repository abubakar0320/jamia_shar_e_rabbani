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

// Apply Abubakar Theme (Monochrome: Slate-950, White, Slate-900, Gray-200)

// 1. Hero.tsx - Clean, dark slate theme or white minimal
updateFile('Hero.tsx', (c) => {
    // Remove gradients from text and buttons
    c = c.replace(/text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-600 to-amber-500 drop-shadow-sm/g, 'text-slate-900');
    c = c.replace(/bg-gradient-to-r from-emerald-600 to-teal-500 shadow-lg shadow-emerald-500\/30 hover:from-emerald-500 hover:to-teal-400/g, 'bg-slate-900 text-white hover:bg-slate-800');
    c = c.replace(/bg-amber-500/g, 'bg-slate-100 text-slate-800 border border-slate-200');
    c = c.replace(/bg-white\/95 backdrop-blur-md p-8 md:p-12 max-w-lg shadow-xl border-t-4 border-emerald-600/g, 'bg-white p-8 md:p-12 max-w-lg shadow-sm border border-slate-100');
    c = c.replace(/text-emerald-700/g, 'text-slate-900');
    return c;
});

// 2. Stats.tsx - Minimal white with slate text
updateFile('Stats.tsx', (c) => {
    // Remove vibrant dark emerald theme
    c = c.replace(/bg-emerald-900 py-16 text-white relative overflow-hidden/g, 'bg-white py-16 border-y border-slate-100');
    c = c.replace(/<div className="absolute[^>]+><\/div>\s*<div className="absolute[^>]+><\/div>/g, ''); // Remove glowing orbs
    c = c.replace(/text-white/g, 'text-slate-900');
    c = c.replace(/text-emerald-100/g, 'text-slate-500');
    c = c.replace(/<div className=\{\`mb-4 p-4 rounded-full bg-white\/10 backdrop-blur-md border border-white\/20 shadow-\[0_0_15px_rgba\(255,255,255,0\.1\)\] \$\{i===0\?"text-rose-400":i===1\?"text-amber-400":i===2\?"text-sky-400":"text-fuchsia-400"\}\`\}>/g, '<div className="text-slate-900 mb-4 p-4 bg-slate-50 rounded-full border border-slate-100">');
    // For safety, generic replace any remaining vibrant icons
    c = c.replace(/text-amber-400/g, 'text-slate-900');
    return c;
});

// 3. AcademicPrograms.tsx - Minimal cards
updateFile('AcademicPrograms.tsx', (c) => {
    c = c.replace(/bg-slate-50 py-20 relative/g, 'bg-slate-50 py-20');
    c = c.replace(/border-t-4 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl group \$\{i%4===0\?"border-t-rose-500 hover:shadow-rose-500\/20":i%4===1\?"border-t-amber-500 hover:shadow-amber-500\/20":i%4===2\?"border-t-emerald-500 hover:shadow-emerald-500\/20":"border-t-blue-500 hover:shadow-blue-500\/20"\}/g, 'border border-slate-200 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-md group hover:border-slate-300');
    // Fix spans
    c = c.replace(/<span className=\{\`text-xs \$\{i%4===0\?"text-rose-600":i%4===1\?"text-amber-600":i%4===2\?"text-emerald-600":"text-blue-600"\} font-semibold mb-2 uppercase tracking-wide\`\}>/g, '<span className="text-xs text-slate-500 font-semibold mb-2 uppercase tracking-wide">');
    c = c.replace(/<span className=\{\`text-xs \$\{i%4===0\?"text-rose-600":i%4===1\?"text-amber-600":i%4===2\?"text-emerald-600":"text-blue-600"\}\` \+ " font-semibold mb-2 uppercase tracking-wide"\}>/g, '<span className="text-xs text-slate-500 font-semibold mb-2 uppercase tracking-wide">');
    c = c.replace(/<span className=\{\`text-xs font-semibold mb-2 uppercase tracking-wide \$\{i%4===0\?"text-rose-600":i%4===1\?"text-amber-600":i%4===2\?"text-emerald-600":"text-blue-600"\}\`\}>/g, '<span className="text-xs text-slate-500 font-semibold mb-2 uppercase tracking-wide">');
    
    // Fallback if the template literal is exactly what is currently there
    c = c.replace(/className=\{\`text-xs \$\{i%4===0\?"text-rose-600":i%4===1\?"text-amber-600":i%4===2\?"text-emerald-600":"text-blue-600"\} font-semibold mb-2 uppercase tracking-wide\`\}/g, 'className="text-xs text-slate-500 font-semibold mb-2 uppercase tracking-wide"');

    c = c.replace(/text-emerald-700/g, 'text-slate-900');
    return c;
});

// 4. WhyChooseUs.tsx - Slate 950 dark section
updateFile('WhyChooseUs.tsx', (c) => {
    c = c.replace(/bg-gradient-to-br from-rose-50 via-amber-50 to-teal-50/g, 'bg-slate-950 text-white');
    c = c.replace(/bg-gradient-to-br from-amber-50 to-orange-50\/30/g, 'bg-slate-950 text-white');
    c = c.replace(/bg-gradient-to-br from-emerald-500 to-teal-400 p-3 rounded-xl shadow-lg shadow-teal-500\/30 text-white/g, 'bg-slate-900 p-3 rounded-xl border border-slate-800 text-white');
    c = c.replace(/text-slate-900/g, 'text-white');
    c = c.replace(/text-slate-600/g, 'text-slate-400');
    return c;
});

// 5. FacultySpotlight.tsx - Minimal white
updateFile('FacultySpotlight.tsx', (c) => {
    c = c.replace(/bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900/g, 'bg-white');
    c = c.replace(/text-white/g, 'text-slate-900');
    c = c.replace(/text-indigo-200/g, 'text-slate-600');
    c = c.replace(/text-indigo-300/g, 'text-slate-500');
    c = c.replace(/bg-indigo-900\/40 backdrop-blur-md border border-indigo-700\/50 hover:bg-indigo-800\/60/g, 'bg-white border border-slate-100 hover:shadow-sm');
    c = c.replace(/text-amber-400/g, 'text-slate-900');
    return c;
});

// 6. Testimonials.tsx - Clean slate-50
updateFile('Testimonials.tsx', (c) => {
    c = c.replace(/bg-gradient-to-br from-teal-900 via-emerald-900 to-teal-950/g, 'bg-slate-50');
    c = c.replace(/bg-white\/10 hover:bg-white\/20 transition-colors duration-300/g, 'bg-white border border-slate-100 shadow-sm');
    c = c.replace(/text-emerald-300/g, 'text-slate-500');
    c = c.replace(/text-white/g, 'text-slate-900');
    return c;
});

// 7. CTA.tsx - Very dark minimal CTA
updateFile('CTA.tsx', (c) => {
    c = c.replace(/bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-900 relative overflow-hidden/g, 'bg-slate-950 relative overflow-hidden');
    c = c.replace(/<div className="absolute top-0 left-10 w-64 h-64 bg-emerald-500\/30 rounded-full blur-3xl"><\/div><div className="absolute bottom-0 right-10 w-64 h-64 bg-teal-400\/20 rounded-full blur-3xl"><\/div>/g, '');
    c = c.replace(/bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500\/30/g, 'bg-white text-slate-950 hover:bg-slate-100 font-semibold border border-transparent');
    return c;
});

// 8. Islam360Resources.tsx - Minimal
updateFile('Islam360Resources.tsx', (c) => {
    c = c.replace(/bg-gradient-to-b from-white to-amber-50\/50/g, 'bg-white border-b border-slate-100');
    c = c.replace(/text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 to-emerald-600/g, 'text-slate-900');
    c = c.replace(/text-emerald-600/g, 'text-slate-900');
    return c;
});

console.log("Applied Abubakar's monochrome slate theme successfully!");
