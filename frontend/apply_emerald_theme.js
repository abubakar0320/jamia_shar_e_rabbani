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

// Apply Elegant Emerald & Gold Theme (Perfect for Islamic Institutions)

// 1. Hero.tsx - White/Stone bg, Emerald Text, Gold accents
updateFile('Hero.tsx', (c) => {
    c = c.replace(/text-transparent bg-clip-text bg-gradient-to-r from-\[#00d4ff\] via-\[#e10098\] to-\[#f59e0b\] drop-shadow-\[0_0_15px_rgba\(225,0,152,0\.3\)\]/g, 'text-emerald-900 drop-shadow-sm');
    c = c.replace(/bg-gradient-to-r from-\[#e10098\] to-\[#5c2d91\] text-white hover:opacity-90 shadow-\[0_0_15px_#e1009880\]/g, 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-md');
    c = c.replace(/bg-slate-900 text-\[#00d15e\] border border-\[#00d15e\] shadow-\[0_0_10px_#00d15e33\]/g, 'bg-emerald-50 text-emerald-700 border border-emerald-200');
    c = c.replace(/bg-slate-950\/90 backdrop-blur-md p-8 md:p-12 border-t-2 border-\[#00d4ff\]/g, 'bg-white/95 backdrop-blur-md p-8 md:p-12 border-t-4 border-emerald-600');
    c = c.replace(/text-gray-200/g, 'text-slate-700');
    return c;
});

// 2. Stats.tsx - Was removed from page.tsx but let's fix it just in case
updateFile('Stats.tsx', (c) => {
    c = c.replace(/bg-slate-950/g, 'bg-emerald-900');
    c = c.replace(/border-\[#e1009833\]/g, 'border-emerald-800');
    c = c.replace(/text-\[#00d4ff\]/g, 'text-emerald-300');
    c = c.replace(/text-\[#e10098\]/g, 'text-amber-400');
    c = c.replace(/text-\[#00d15e\]/g, 'text-emerald-400');
    c = c.replace(/text-\[#f59e0b\]/g, 'text-amber-300');
    return c;
});

// 3. AcademicPrograms.tsx - Clean stone-50 background, emerald accents
updateFile('AcademicPrograms.tsx', (c) => {
    c = c.replace(/bg-\[#0a0a0a\]/g, 'bg-stone-50');
    c = c.replace(/text-white/g, 'text-slate-900');
    c = c.replace(/text-gray-200/g, 'text-slate-800');
    c = c.replace(/text-gray-300/g, 'text-slate-600');
    c = c.replace(/text-gray-400/g, 'text-slate-600');
    c = c.replace(/bg-slate-900 text-slate-900/g, 'bg-white text-slate-900'); // if previous ran
    c = c.replace(/bg-slate-900/g, 'bg-white');
    
    // Hover borders
    c = c.replace(/border-slate-800 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-\[0_0_20px_#00d4ff66\] hover:border-\[#00d4ff\]/g, 'border-gray-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:border-emerald-600');
    
    // Replace tags
    c = c.replace(/text-\[#00d4ff\] bg-\[#00d4ff1a\] border border-\[#00d4ff4d\]/g, 'text-emerald-700 bg-emerald-50 border border-emerald-100');
    c = c.replace(/text-\[#00d4ff\]/g, 'text-emerald-700'); // links
    return c;
});

// 4. WhyChooseUs.tsx - Elegant dark green section
updateFile('WhyChooseUs.tsx', (c) => {
    c = c.replace(/bg-slate-950/g, 'bg-slate-900');
    c = c.replace(/text-white/g, 'text-white');
    c = c.replace(/text-gray-300/g, 'text-slate-300');
    c = c.replace(/bg-slate-900 p-3 rounded-xl border border-slate-800 text-\[#00d15e\] shadow-\[0_0_15px_#00d15e33\]/g, 'bg-emerald-900/50 p-3 rounded-xl border border-emerald-800 text-emerald-400');
    c = c.replace(/bg-\[#e100981a\]/g, 'bg-emerald-500/10');
    return c;
});

// 5. FacultySpotlight.tsx - White section with gold accents
updateFile('FacultySpotlight.tsx', (c) => {
    // Background already slate-50 and white
    c = c.replace(/text-\[#e10098\] bg-\[#e100981a\] border border-\[#e100984d\]/g, 'text-amber-700 bg-amber-50 border border-amber-200');
    c = c.replace(/hover:border-\[#00d4ff\] hover:shadow-\[0_0_20px_rgba\(0,212,255,0\.15\)\]/g, 'hover:border-emerald-500 hover:shadow-lg');
    c = c.replace(/hover:border-\[#e10098\] hover:shadow-\[0_0_20px_rgba\(225,0,152,0\.15\)\]/g, 'hover:border-amber-500 hover:shadow-lg');
    c = c.replace(/text-\[#00d15e\]/g, 'text-emerald-600');
    c = c.replace(/text-\[#00d4ff\]/g, 'text-emerald-600');
    c = c.replace(/text-\[#f59e0b\]/g, 'text-amber-600');
    c = c.replace(/text-\[#e10098\]/g, 'text-amber-600');
    c = c.replace(/hover:text-\[#00b8cc\]/g, 'hover:text-emerald-700');
    return c;
});

// 6. Testimonials.tsx - Emerald dark
updateFile('Testimonials.tsx', (c) => {
    c = c.replace(/bg-slate-950 border-t border-slate-800/g, 'bg-emerald-950 border-t border-emerald-900');
    c = c.replace(/bg-slate-900 border border-\[#5c2d9166\] shadow-\[0_0_15px_#5c2d9133\]/g, 'bg-emerald-900 border border-emerald-800 shadow-md');
    c = c.replace(/text-white/g, 'text-emerald-50');
    c = c.replace(/text-\[#00d4ff\]/g, 'text-amber-400');
    c = c.replace(/text-gray-300/g, 'text-emerald-100');
    return c;
});

// 7. CTA.tsx - Emerald and Gold CTA
updateFile('CTA.tsx', (c) => {
    c = c.replace(/bg-slate-950 relative overflow-hidden border-t border-slate-800/g, 'bg-emerald-900 relative overflow-hidden border-t border-emerald-800');
    c = c.replace(/bg-gradient-to-r from-\[#00d4ff\] to-\[#00d15e\] text-slate-950 hover:opacity-90 font-bold shadow-\[0_0_25px_#00d4ff66\]/g, 'bg-amber-500 text-slate-900 hover:bg-amber-400 font-bold shadow-lg');
    c = c.replace(/from-\[#00d4ff1a\]/g, 'from-emerald-800/50');
    c = c.replace(/text-white/g, 'text-white');
    c = c.replace(/text-gray-200/g, 'text-emerald-100');
    return c;
});

// 8. Islam360Resources.tsx - White with emerald accents
updateFile('Islam360Resources.tsx', (c) => {
    c = c.replace(/text-\[#00d15e\] bg-\[#00d15e1a\] border border-\[#00d15e4d\]/g, 'text-emerald-700 bg-emerald-50 border border-emerald-200');
    c = c.replace(/text-\[#00d4ff\]/g, 'text-emerald-600');
    c = c.replace(/text-\[#e10098\]/g, 'text-amber-600');
    c = c.replace(/text-\[#00d15e\]/g, 'text-emerald-600');
    c = c.replace(/text-\[#f59e0b\]/g, 'text-amber-600');
    c = c.replace(/text-\[#5c2d91\]/g, 'text-emerald-700');
    c = c.replace(/bg-gradient-to-r from-\[#00d4ff\] to-\[#00d15e\] text-slate-950 font-bold hover:opacity-90 shadow-\[0_0_15px_#00d4ff4d\]/g, 'bg-emerald-700 text-white hover:bg-emerald-800 shadow-md');
    c = c.replace(/border border-\[#e10098\] text-\[#e10098\] hover:bg-\[#e100981a\]/g, 'border border-slate-300 text-slate-700 hover:bg-slate-50');
    
    // Feature icon backgrounds
    c = c.replace(/shadow-\[0_0_10px_#00d4ff1a\]/g, 'shadow-sm');
    c = c.replace(/shadow-\[0_0_10px_#e100981a\]/g, 'shadow-sm');
    c = c.replace(/shadow-\[0_0_10px_#00d15e1a\]/g, 'shadow-sm');
    
    // Right panel
    c = c.replace(/border-t-4 border-\[#e10098\]/g, 'border-t-4 border-emerald-600');
    c = c.replace(/shadow-\[0_0_40px_rgba\(225,0,152,0\.1\)\]/g, 'shadow-xl');
    c = c.replace(/bg-slate-900 shadow-\[0_0_20px_#e100984d\] border border-slate-800/g, 'bg-emerald-50 border border-emerald-100 shadow-inner');
    c = c.replace(/text-transparent bg-clip-text bg-gradient-to-r from-\[#00d4ff\] to-\[#e10098\]/g, 'text-emerald-700');
    
    return c;
});

console.log("Applied Elegant Emerald & Gold Theme!");
