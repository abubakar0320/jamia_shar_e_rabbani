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

// Multi-Colored Vibrant Theme with Perfect Text Contrast

// 1. Hero.tsx - Multi-gradient text, white background for readability
updateFile('Hero.tsx', (c) => {
    // Make background clean white
    c = c.replace(/bg-white\/95 backdrop-blur-md p-8 md:p-12 border-t-4 border-indigo-500 shadow-xl shadow-blue-900\/5 rounded-2xl/g, 'bg-white p-8 md:p-12 shadow-2xl border-t-4 border-rose-500 rounded-3xl');
    
    // Heading
    c = c.replace(/text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-rose-500 drop-shadow-sm/g, 'text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 drop-shadow-sm');
    
    // Paragraph
    c = c.replace(/text-slate-700/g, 'text-slate-700 font-medium');
    
    // Primary Button
    c = c.replace(/bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500\/30 transition-all transform hover:-translate-y-1/g, 'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/40 hover:from-rose-600 hover:to-orange-600 font-bold px-8 py-3 rounded-full transform hover:-translate-y-1 transition-all');
    
    // Badge
    c = c.replace(/bg-rose-50 text-rose-600 border border-rose-200 shadow-sm/g, 'bg-blue-50 text-blue-600 border border-blue-200 font-bold px-4 py-1 rounded-full shadow-sm');
    return c;
});

// 2. AcademicPrograms.tsx - Multi-colored cards
updateFile('AcademicPrograms.tsx', (c) => {
    // Keep bg clean
    c = c.replace(/bg-slate-50/g, 'bg-white');
    
    // Make text black/dark for readability
    c = c.replace(/text-white/g, 'text-slate-900');
    c = c.replace(/text-gray-200/g, 'text-slate-800');
    c = c.replace(/text-gray-300/g, 'text-slate-700');
    c = c.replace(/text-slate-700/g, 'text-slate-700');
    
    // Multi-color dynamic styling for cards
    c = c.replace(/border-slate-200\/60 bg-white\/80 backdrop-blur-sm transition-all duration-500 transform hover:-translate-y-2 hover:shadow-\[0_20px_40px_-15px_rgba\(79,70,229,0\.15\)\] hover:border-indigo-400 rounded-2xl/g, 'bg-white border transition-all duration-300 transform hover:-translate-y-2 group rounded-2xl shadow-sm ${i%4===0?"border-rose-100 hover:border-rose-400 hover:shadow-[0_10px_30px_rgba(244,63,94,0.2)]":i%4===1?"border-amber-100 hover:border-amber-400 hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]":i%4===2?"border-emerald-100 hover:border-emerald-400 hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]":"border-blue-100 hover:border-blue-400 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)]"}');
    
    // Fix missing closing quote if template literal causes syntax error - let's be careful and use exact string replace
    c = c.replace(/className="flex flex-col bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-\[#00d4ff\] hover:shadow-\[0_0_20px_rgba\(0,212,255,0\.15\)\] group rounded-xl overflow-hidden"/g, 'className={`flex flex-col bg-white border shadow-sm transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl group rounded-2xl overflow-hidden ${i%4===0?"border-rose-100 hover:border-rose-400 hover:shadow-rose-500/20":i%4===1?"border-amber-100 hover:border-amber-400 hover:shadow-amber-500/20":i%4===2?"border-emerald-100 hover:border-emerald-400 hover:shadow-emerald-500/20":"border-blue-100 hover:border-blue-400 hover:shadow-blue-500/20"}`}');
    
    // If the above missed it because of previous script:
    c = c.replace(/className="flex flex-col bg-slate-900 border border-slate-800 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-\[0_0_20px_#00d4ff66\] hover:border-\[#00d4ff\] group"/g, 'className={`flex flex-col bg-white border shadow-sm transition-all duration-300 transform hover:-translate-y-2 group rounded-2xl overflow-hidden ${i%4===0?"border-rose-100 hover:border-rose-400 hover:shadow-rose-500/20":i%4===1?"border-amber-100 hover:border-amber-400 hover:shadow-amber-500/20":i%4===2?"border-emerald-100 hover:border-emerald-400 hover:shadow-emerald-500/20":"border-blue-100 hover:border-blue-400 hover:shadow-blue-500/20"}`}');

    // Make tags dynamic too
    c = c.replace(/<span className="text-xs text-orange-600 bg-orange-50 border border-orange-100 px-2 py-1 rounded-md font-semibold mb-3 uppercase tracking-wide inline-block w-max">/g, '<span className={`text-xs px-3 py-1 rounded-full font-bold mb-3 uppercase tracking-wide inline-block w-max border ${i%4===0?"bg-rose-50 text-rose-600 border-rose-200":i%4===1?"bg-amber-50 text-amber-600 border-amber-200":i%4===2?"bg-emerald-50 text-emerald-600 border-emerald-200":"bg-blue-50 text-blue-600 border-blue-200"}`}>');

    // Make links dynamic too
    c = c.replace(/<Link \n                    href=\{program.link\}\n                    className="inline-flex items-center text-indigo-600 font-semibold hover:underline group\/link"/g, '<Link href={program.link} className={`inline-flex items-center font-bold hover:underline group/link ${i%4===0?"text-rose-600":i%4===1?"text-amber-600":i%4===2?"text-emerald-600":"text-blue-600"}`}');

    return c;
});

// 3. WhyChooseUs.tsx - Vibrant Gradients!
updateFile('WhyChooseUs.tsx', (c) => {
    c = c.replace(/bg-slate-950/g, 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50'); // Light bright bg!
    c = c.replace(/text-white/g, 'text-slate-900'); // make text dark for light background
    c = c.replace(/text-slate-300/g, 'text-slate-700');
    c = c.replace(/bg-gradient-to-br from-indigo-500\/20 to-blue-500\/10 p-3 rounded-2xl border border-indigo-500\/30 text-indigo-400 shadow-\[0_0_15px_rgba\(99,102,241,0\.2\)\]/g, 'bg-gradient-to-br from-fuchsia-500 to-purple-600 p-4 rounded-2xl text-white shadow-lg shadow-purple-500/30');
    c = c.replace(/bg-indigo-500\/20/g, 'bg-gradient-to-br from-sky-400 to-blue-500'); // For the back glow element
    return c;
});

// 4. FacultySpotlight.tsx - White bg, multi-colored accents
updateFile('FacultySpotlight.tsx', (c) => {
    c = c.replace(/bg-slate-50/g, 'bg-white'); // Clean background
    c = c.replace(/text-slate-900/g, 'text-slate-900');
    c = c.replace(/text-gray-600/g, 'text-slate-700');
    
    // First card - Teal theme
    c = c.replace(/hover:border-blue-400 hover:shadow-\[0_15px_30px_-10px_rgba\(59,130,246,0\.3\)\] rounded-2xl/g, 'hover:border-teal-400 hover:shadow-[0_15px_30px_-10px_rgba(20,184,166,0.3)] rounded-2xl');
    c = c.replace(/text-blue-600/g, 'text-teal-600');
    c = c.replace(/hover:text-blue-700/g, 'hover:text-teal-700');
    
    // Second card - Purple theme
    c = c.replace(/hover:border-rose-400 hover:shadow-\[0_15px_30px_-10px_rgba\(244,63,94,0\.3\)\] rounded-2xl/g, 'hover:border-purple-400 hover:shadow-[0_15px_30px_-10px_rgba(168,85,247,0.3)] rounded-2xl');
    c = c.replace(/text-rose-500/g, 'text-purple-600');
    c = c.replace(/text-amber-600/g, 'text-purple-600'); // if previous ran
    c = c.replace(/hover:text-rose-600/g, 'hover:text-purple-700');
    return c;
});

// 5. Testimonials.tsx - Colorful Yellow/Amber
updateFile('Testimonials.tsx', (c) => {
    c = c.replace(/bg-indigo-950/g, 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50');
    c = c.replace(/bg-indigo-900\/40 backdrop-blur-md rounded-2xl/g, 'bg-white shadow-lg rounded-2xl');
    c = c.replace(/border-indigo-900/g, 'border-amber-200');
    c = c.replace(/border-indigo-700\/50 hover:bg-indigo-800\/50 transition-colors/g, 'border-amber-100 hover:border-amber-300 hover:shadow-xl transition-all');
    c = c.replace(/text-white/g, 'text-slate-900');
    c = c.replace(/text-orange-400/g, 'text-amber-500');
    c = c.replace(/text-indigo-200/g, 'text-slate-600');
    return c;
});

// 6. CTA.tsx - Multi-colored Gradient!
updateFile('CTA.tsx', (c) => {
    // Beautiful vibrant gradient for CTA
    c = c.replace(/bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-900/g, 'bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500');
    c = c.replace(/border-indigo-800\/50/g, 'border-transparent');
    c = c.replace(/bg-gradient-to-r from-orange-400 to-rose-500 text-white hover:from-orange-500 hover:to-rose-600 rounded-full px-8 py-4/g, 'bg-white text-fuchsia-600 hover:bg-slate-50 font-black shadow-xl shadow-fuchsia-900/30 rounded-full px-8 py-4 text-lg');
    c = c.replace(/from-indigo-500\/20/g, 'from-white/20');
    c = c.replace(/text-white/g, 'text-white');
    c = c.replace(/text-indigo-200/g, 'text-fuchsia-100');
    return c;
});

// 7. Islam360Resources.tsx - Fun colors!
updateFile('Islam360Resources.tsx', (c) => {
    c = c.replace(/bg-white border-y border-gray-100/g, 'bg-slate-50 border-y border-gray-200');
    c = c.replace(/bg-gradient-to-b from-white to-indigo-50\/50/g, 'bg-white shadow-2xl rounded-3xl border-t-8 border-cyan-500');
    c = c.replace(/bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-indigo-500\/30/g, 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/40 font-bold');
    
    // Fix all text colors for readability
    c = c.replace(/text-slate-900/g, 'text-slate-900');
    c = c.replace(/text-gray-600/g, 'text-slate-700');
    c = c.replace(/text-indigo-700/g, 'text-teal-700');
    c = c.replace(/bg-indigo-50/g, 'bg-teal-50');
    c = c.replace(/border-indigo-200/g, 'border-teal-200');
    return c;
});

console.log("Applied Multi-Colored Vibrant Theme successfully!");
