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

// Apply iamabubakar.site exact neon/contrast colors 
// Cyan: #00d4ff, Pink: #e10098, Green: #00d15e, Amber: #f59e0b, Purple: #5c2d91

// 1. Hero.tsx - Neon gradient text & buttons
updateFile('Hero.tsx', (c) => {
    c = c.replace(/className="text-4xl md:text-5xl font-black text-slate-900"/g, 'className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#00d4ff] via-[#e10098] to-[#f59e0b] drop-shadow-[0_0_15px_rgba(225,0,152,0.3)]"');
    c = c.replace(/bg-blue-600 text-white hover:bg-blue-700 shadow-sm/g, 'bg-gradient-to-r from-[#e10098] to-[#5c2d91] text-white hover:opacity-90 shadow-[0_0_15px_#e1009880]');
    c = c.replace(/bg-blue-50 text-blue-600 border border-blue-100/g, 'bg-slate-900 text-[#00d15e] border border-[#00d15e] shadow-[0_0_10px_#00d15e33]');
    // Make background dark slate to match the contrast vibe
    c = c.replace(/bg-white p-8 md:p-12/g, 'bg-slate-950/90 backdrop-blur-md p-8 md:p-12 border-t-2 border-[#00d4ff]');
    c = c.replace(/text-gray-700/g, 'text-gray-300');
    return c;
});

// 2. Stats.tsx - Glowing icons
updateFile('Stats.tsx', (c) => {
    c = c.replace(/bg-white py-16 border-y border-slate-100/g, 'bg-slate-950 py-16 border-y border-[#e1009833]');
    c = c.replace(/text-slate-900 mb-4 p-4 bg-slate-50 rounded-full border border-slate-100/g, ''); // cleanup previous
    c = c.replace(/text-blue-600 mb-4 p-4 bg-blue-50\/50/g, 'mb-4 p-4 bg-slate-900 rounded-full border border-slate-800 ${i===0?"text-[#00d4ff] shadow-[0_0_15px_#00d4ff4d]":i===1?"text-[#e10098] shadow-[0_0_15px_#e100984d]":i===2?"text-[#00d15e] shadow-[0_0_15px_#00d15e4d]":"text-[#f59e0b] shadow-[0_0_15px_#f59e0b4d]"}');
    c = c.replace(/text-slate-900/g, 'text-white');
    c = c.replace(/text-slate-500/g, 'text-gray-400');
    return c;
});

// 3. AcademicPrograms.tsx - Dark cards with neon hover
updateFile('AcademicPrograms.tsx', (c) => {
    c = c.replace(/bg-slate-50 py-20/g, 'bg-[#0a0a0a] py-20');
    c = c.replace(/text-slate-900/g, 'text-white');
    c = c.replace(/text-slate-700/g, 'text-gray-400');
    // Change card background
    c = c.replace(/className=\{\`flex flex-col bg-white/g, 'className={`flex flex-col bg-slate-900 text-white');
    c = c.replace(/className="flex flex-col bg-white/g, 'className="flex flex-col bg-slate-900 text-white');
    
    // Replace hover borders with neon glowing borders
    c = c.replace(/border border-gray-100 bg-white transition-all duration-300 hover:shadow-lg hover:border-blue-600\/30 group/g, 'border border-slate-800 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-[0_0_20px_#00d4ff66] hover:border-[#00d4ff] group');
    
    // Replace tags
    c = c.replace(/text-blue-600 bg-blue-50/g, 'text-[#00d4ff] bg-[#00d4ff1a] border border-[#00d4ff4d]');
    c = c.replace(/text-blue-600/g, 'text-[#00d4ff]'); // links
    return c;
});

// 4. WhyChooseUs.tsx - Dark with Green/Pink glow
updateFile('WhyChooseUs.tsx', (c) => {
    c = c.replace(/bg-slate-800\/50 p-3 rounded-xl border border-slate-700 text-blue-400/g, 'bg-slate-900 p-3 rounded-xl border border-slate-800 text-[#00d15e] shadow-[0_0_15px_#00d15e33]');
    // Add glowing background orb
    c = c.replace(/<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">/, '<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#e100981a] blur-[100px] rounded-full pointer-events-none"></div><div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">');
    return c;
});

// 5. FacultySpotlight.tsx - Cyan/Purple
updateFile('FacultySpotlight.tsx', (c) => {
    c = c.replace(/bg-white border border-slate-100 hover:shadow-sm/g, 'bg-slate-900 border border-slate-800 hover:border-[#e10098] hover:shadow-[0_0_20px_#e100984d]');
    c = c.replace(/bg-white/g, 'bg-[#0a0a0a]');
    c = c.replace(/text-slate-900/g, 'text-white');
    c = c.replace(/text-slate-600/g, 'text-gray-400');
    c = c.replace(/text-slate-500/g, 'text-gray-500');
    c = c.replace(/text-blue-600/g, 'text-[#00d4ff]');
    return c;
});

// 6. Testimonials.tsx - Dark
updateFile('Testimonials.tsx', (c) => {
    c = c.replace(/bg-slate-50/g, 'bg-slate-950 border-t border-slate-800');
    c = c.replace(/bg-white border border-slate-100 shadow-sm/g, 'bg-slate-900 border border-[#5c2d9166] shadow-[0_0_15px_#5c2d9133]');
    c = c.replace(/text-slate-900/g, 'text-white');
    c = c.replace(/text-slate-500/g, 'text-[#00d4ff]');
    return c;
});

// 7. CTA.tsx - Huge neon CTA
updateFile('CTA.tsx', (c) => {
    c = c.replace(/bg-slate-950 relative overflow-hidden/g, 'bg-slate-950 relative overflow-hidden border-t border-slate-800 py-24');
    c = c.replace(/bg-white text-slate-950 hover:bg-slate-100 font-semibold border border-transparent/g, 'bg-gradient-to-r from-[#00d4ff] to-[#00d15e] text-slate-950 hover:opacity-90 font-bold shadow-[0_0_25px_#00d4ff66]');
    c = c.replace(/<div className="max-w-4xl mx-auto text-center relative z-10">/, '<div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#00d4ff1a] via-transparent to-transparent pointer-events-none"></div><div className="max-w-4xl mx-auto text-center relative z-10">');
    return c;
});

console.log("Applied HIGH CONTRAST NEON colors (iamabubakar.site exact CSS values) successfully!");
