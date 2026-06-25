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

// 1. Hero.tsx - Vibrant Gradient Text & Buttons
updateFile('Hero.tsx', (c) => {
    c = c.replace(/text-3xl md:text-4xl font-semibold text-slate-900/g, 'text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-600 to-amber-500 drop-shadow-sm');
    c = c.replace(/text-3xl md:text-4xl font-semibold text-gray-900/g, 'text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-700 via-teal-600 to-amber-500 drop-shadow-sm');
    c = c.replace(/bg-emerald-700/g, 'bg-gradient-to-r from-emerald-600 to-teal-500 shadow-lg shadow-emerald-500/30 hover:from-emerald-500 hover:to-teal-400');
    return c;
});

// 2. Stats.tsx - Multi-colored glowing icons
updateFile('Stats.tsx', (c) => {
    // Revert the previous color replacement logic for stats if needed, or directly inject the multi-colors
    c = c.replace(
        /<div className="text-amber-400 mb-3">/g, 
        '<div className={`mb-4 p-4 rounded-full bg-white/10 backdrop-blur-md border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)] ${i===0?"text-rose-400":i===1?"text-amber-400":i===2?"text-sky-400":"text-fuchsia-400"}`}>'
    );
    return c;
});

// 3. AcademicPrograms.tsx - Multi-colored card borders
updateFile('AcademicPrograms.tsx', (c) => {
    // Find the exact className="flex flex-col bg-white shadow-sm border border-slate-200..."
    // and replace it with a template literal.
    c = c.replace(
        /className="flex flex-col bg-white shadow-sm border border-slate-200 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-900\/10 transition-all duration-300 transform hover:-translate-y-1 group"/g, 
        'className={`flex flex-col bg-white shadow-sm border-t-4 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl group ${i%4===0?"border-t-rose-500 hover:shadow-rose-500/20":i%4===1?"border-t-amber-500 hover:shadow-amber-500/20":i%4===2?"border-t-emerald-500 hover:shadow-emerald-500/20":"border-t-blue-500 hover:shadow-blue-500/20"}`}'
    );
    
    // Also change the category text to match the border color
    c = c.replace(
        /<span className="text-emerald-700 text-xs/g, 
        '<span className={`text-xs ${i%4===0?"text-rose-600":i%4===1?"text-amber-600":i%4===2?"text-emerald-600":"text-blue-600"}'
    );
    // Fix any improperly closed template literals from previous step
    c = c.replace(/\$\{i%4===0\?"text-rose-600":i%4===1\?"text-amber-600":i%4===2\?"text-emerald-600":"text-blue-600"\}\` font-semibold mb-2 uppercase tracking-wide">/g, '${i%4===0?"text-rose-600":i%4===1?"text-amber-600":i%4===2?"text-emerald-600":"text-blue-600"}` + " font-semibold mb-2 uppercase tracking-wide"}>');
    // More robust replacement for the category span:
    c = c.replace(/<span className="text-emerald-700 text-xs font-semibold mb-2 uppercase tracking-wide">/g, '<span className={`text-xs font-semibold mb-2 uppercase tracking-wide ${i%4===0?"text-rose-600":i%4===1?"text-amber-600":i%4===2?"text-emerald-600":"text-blue-600"}`}>');
    
    return c;
});

// 4. WhyChooseUs.tsx - Vibrant Gradient Background and icons
updateFile('WhyChooseUs.tsx', (c) => {
    c = c.replace(/bg-gradient-to-br from-amber-50 to-orange-50\/30/g, 'bg-gradient-to-br from-rose-50 via-amber-50 to-teal-50');
    c = c.replace(/bg-white p-3 rounded-xl shadow-sm text-emerald-700/g, 'bg-gradient-to-br from-emerald-500 to-teal-400 p-3 rounded-xl shadow-lg shadow-teal-500/30 text-white');
    return c;
});

// 5. FacultySpotlight.tsx - Deep Indigo Gradient
updateFile('FacultySpotlight.tsx', (c) => {
    c = c.replace(/bg-slate-50/g, 'bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900');
    c = c.replace(/text-slate-900/g, 'text-white');
    c = c.replace(/text-slate-600/g, 'text-indigo-200');
    c = c.replace(/text-slate-500/g, 'text-indigo-300');
    c = c.replace(/bg-white/g, 'bg-indigo-900/40 backdrop-blur-md border border-indigo-700/50 hover:bg-indigo-800/60');
    c = c.replace(/text-emerald-700/g, 'text-amber-400');
    return c;
});

// 6. Testimonials.tsx - Deep vibrant Teal to Emerald
updateFile('Testimonials.tsx', (c) => {
    c = c.replace(/bg-teal-900/g, 'bg-gradient-to-br from-teal-900 via-emerald-900 to-teal-950');
    c = c.replace(/bg-teal-800\/50/g, 'bg-white/10 hover:bg-white/20 transition-colors duration-300');
    c = c.replace(/text-teal-200/g, 'text-emerald-300');
    return c;
});

// 7. CTA.tsx - Vibrant gradient background
updateFile('CTA.tsx', (c) => {
    c = c.replace(/bg-emerald-800/g, 'bg-gradient-to-r from-emerald-800 via-teal-700 to-emerald-900 relative overflow-hidden');
    c = c.replace(/bg-white text-emerald-800/g, 'bg-gradient-to-r from-amber-400 to-amber-500 text-slate-900 hover:from-amber-300 hover:to-amber-400 shadow-lg shadow-amber-500/30');
    if (!c.includes('blur-3xl')) {
        c = c.replace(
            '<div className="max-w-4xl mx-auto text-center">',
            '<div className="absolute top-0 left-10 w-64 h-64 bg-emerald-500/30 rounded-full blur-3xl"></div><div className="absolute bottom-0 right-10 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl"></div><div className="max-w-4xl mx-auto text-center relative z-10">'
        );
    }
    return c;
});

// 8. Islam360Resources.tsx - Golden/Amber warm vibe
updateFile('Islam360Resources.tsx', (c) => {
    c = c.replace(/bg-white/g, 'bg-gradient-to-b from-white to-amber-50/50');
    c = c.replace(/text-emerald-700/g, 'text-emerald-600');
    c = c.replace(/text-slate-900/g, 'text-transparent bg-clip-text bg-gradient-to-r from-emerald-800 to-emerald-600');
    return c;
});

console.log("Fixed more colors successfully!");
