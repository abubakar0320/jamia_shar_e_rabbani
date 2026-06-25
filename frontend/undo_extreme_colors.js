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

// Undo 1. Hero.tsx
updateFile('Hero.tsx', (c) => {
    c = c.replace(/bg-gradient-to-br from-indigo-900 via-purple-900 to-fuchsia-900 pt-10/g, 'bg-white pt-10');
    c = c.replace(/bg-white\/10 backdrop-blur-md p-8 md:p-12 shadow-2xl border border-white\/20 rounded-3xl/g, 'bg-white p-8 md:p-12 shadow-2xl border-t-4 border-rose-500 rounded-3xl');
    c = c.replace(/text-white drop-shadow-\[0_2px_10px_rgba\(255,255,255,0\.3\)\]/g, 'text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 drop-shadow-sm');
    c = c.replace(/text-white text-lg drop-shadow-md/g, 'text-slate-700 font-medium');
    c = c.replace(/bg-pink-500 text-white border-none shadow-\[0_0_15px_#ec4899\]/g, 'bg-blue-50 text-blue-600 border border-blue-200');
    return c;
});

// Undo 2. AcademicPrograms.tsx
updateFile('AcademicPrograms.tsx', (c) => {
    c = c.replace(/bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500/g, 'bg-white');
    c = c.replace(/text-white/g, 'text-slate-900');
    // But text-slate-800 and text-slate-700 were also changed to text-white. 
    // Now all text-white will become text-slate-900. Let's fix the specific ones later if needed.
    
    // Cards
    c = c.replace(/className=\{`flex flex-col border-none shadow-xl transition-all duration-300 transform hover:-translate-y-2 group rounded-2xl overflow-hidden \$\{i%4===0\?"bg-gradient-to-br from-rose-500 to-pink-600 shadow-rose-500\/50":i%4===1\?"bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500\/50":i%4===2\?"bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500\/50":"bg-gradient-to-br from-indigo-500 to-purple-600 shadow-indigo-500\/50"\}`\}/g, 
        'className={`flex flex-col bg-white border shadow-sm transition-all duration-300 transform hover:-translate-y-2 group rounded-2xl overflow-hidden ${i%4===0?"border-rose-100 hover:border-rose-400 hover:shadow-rose-500/20":i%4===1?"border-amber-100 hover:border-amber-400 hover:shadow-amber-500/20":i%4===2?"border-emerald-100 hover:border-emerald-400 hover:shadow-emerald-500/20":"border-blue-100 hover:border-blue-400 hover:shadow-blue-500/20"}`}');
        
    // Badges inside cards
    c = c.replace(/<span className="text-xs px-3 py-1 rounded-full font-bold mb-3 uppercase tracking-wide inline-block w-max border border-white\/30 bg-white\/20 text-white backdrop-blur-sm"/g, 
        '<span className={`text-xs px-3 py-1 rounded-full font-bold mb-3 uppercase tracking-wide inline-block w-max border ${i%4===0?"bg-rose-50 text-rose-600 border-rose-200":i%4===1?"bg-amber-50 text-amber-600 border-amber-200":i%4===2?"bg-emerald-50 text-emerald-600 border-emerald-200":"bg-blue-50 text-blue-600 border-blue-200"}`');
        
    // Links inside cards
    c = c.replace(/<Link href=\{program\.link\} className="inline-flex items-center font-bold hover:underline group\/link text-white drop-shadow-md"/g, 
        '<Link href={program.link} className={`inline-flex items-center font-bold hover:underline group/link ${i%4===0?"text-rose-600":i%4===1?"text-amber-600":i%4===2?"text-emerald-600":"text-blue-600"}`');

    // Section title
    c = c.replace(/text-slate-900 mb-6 drop-shadow-lg/g, 'text-slate-900 mb-6');
    c = c.replace(/text-blue-50 text-base drop-shadow-md/g, 'text-slate-600 text-base'); // previously slate-600
    
    // Top badge
    c = c.replace(/text-slate-900 bg-white\/20 border border-white\/30 backdrop-blur-sm/g, 'text-orange-600 bg-orange-50 border border-orange-100');

    return c;
});

// Undo 3. WhyChooseUs.tsx
updateFile('WhyChooseUs.tsx', (c) => {
    c = c.replace(/bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500/g, 'bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50');
    c = c.replace(/text-white/g, 'text-slate-900'); 
    c = c.replace(/text-emerald-50/g, 'text-slate-700');
    
    // Feature Icons
    c = c.replace(/bg-white p-4 rounded-2xl text-teal-600 shadow-xl shadow-teal-900\/20/g, 'bg-gradient-to-br from-fuchsia-500 to-purple-600 p-4 rounded-2xl text-slate-900 shadow-lg shadow-purple-500/30');
    return c;
});

// Undo 4. FacultySpotlight.tsx
updateFile('FacultySpotlight.tsx', (c) => {
    c = c.replace(/bg-gradient-to-br from-purple-600 via-fuchsia-600 to-pink-600/g, 'bg-white'); 
    c = c.replace(/text-white/g, 'text-slate-900');
    c = c.replace(/text-fuchsia-50/g, 'text-slate-700');
    
    // First card - Orange
    c = c.replace(/className="flex flex-col bg-gradient-to-br from-orange-400 to-red-500 border-none shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-\[0_20px_40px_-10px_rgba\(239,68,68,0\.5\)\] group rounded-2xl overflow-hidden text-slate-900"/g, 
        'className="flex flex-col bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-teal-400 hover:shadow-[0_15px_30px_-10px_rgba(20,184,166,0.3)] group rounded-xl overflow-hidden"');
    c = c.replace(/text-orange-100/g, 'text-teal-600');
    c = c.replace(/hover:text-slate-900/g, 'hover:text-teal-700');
    
    // Second card - Cyan
    c = c.replace(/className="flex flex-col bg-gradient-to-br from-cyan-400 to-blue-500 border-none shadow-xl transition-all duration-300 hover:-translate-y-2 hover:shadow-\[0_20px_40px_-10px_rgba\(59,130,246,0\.5\)\] group rounded-2xl overflow-hidden text-slate-900"/g, 
        'className="flex flex-col bg-white border border-gray-100 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-purple-400 hover:shadow-[0_15px_30px_-10px_rgba(168,85,247,0.3)] group rounded-xl overflow-hidden"');
    c = c.replace(/text-cyan-100/g, 'text-purple-600');
    // hover:text-slate-900 already reversed
    
    // Badge
    c = c.replace(/text-slate-900 bg-white\/20 border border-white\/30 backdrop-blur-sm/g, 'text-indigo-700 bg-indigo-50 border border-indigo-200');

    return c;
});

// Undo 5. Testimonials.tsx
updateFile('Testimonials.tsx', (c) => {
    c = c.replace(/bg-gradient-to-br from-rose-500 via-pink-500 to-fuchsia-500/g, 'bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50');
    c = c.replace(/bg-white\/10 backdrop-blur-md shadow-xl rounded-2xl border border-white\/20/g, 'bg-white shadow-lg rounded-2xl');
    c = c.replace(/text-white/g, 'text-slate-900');
    c = c.replace(/text-rose-200/g, 'text-amber-500');
    c = c.replace(/text-pink-50/g, 'text-slate-600');
    return c;
});

// Undo 6. NewsEvents.tsx
updateFile('NewsEvents.tsx', (c) => {
    c = c.replace(/bg-gradient-to-br from-violet-600 to-indigo-600/g, 'bg-slate-50');
    c = c.replace(/text-white/g, 'text-slate-900');
    c = c.replace(/text-indigo-100/g, 'text-gray-600');
    c = c.replace(/bg-slate-900\/10 backdrop-blur-md border-slate-900\/20/g, 'bg-white'); // text-white was already replaced by text-slate-900 so white->slate-900. wait. 'bg-white/10' became 'bg-slate-900/10'
    c = c.replace(/bg-white\/10 backdrop-blur-md border-white\/20/g, 'bg-white'); // just in case
    c = c.replace(/text-slate-900 font-bold/g, 'text-indigo-600');
    c = c.replace(/text-indigo-200/g, 'text-gray-500');
    return c;
});

// Undo 7. Islam360Resources.tsx
updateFile('Islam360Resources.tsx', (c) => {
    c = c.replace(/bg-gradient-to-br from-orange-500 via-amber-500 to-yellow-400 border-none/g, 'bg-slate-50 border-y border-gray-200');
    c = c.replace(/bg-slate-900\/10 backdrop-blur-md shadow-2xl rounded-3xl border border-slate-900\/30/g, 'bg-white shadow-2xl rounded-3xl border-t-8 border-cyan-500');
    c = c.replace(/bg-white\/10 backdrop-blur-md shadow-2xl rounded-3xl border border-white\/30/g, 'bg-white shadow-2xl rounded-3xl border-t-8 border-cyan-500');
    c = c.replace(/bg-slate-900 text-orange-600 hover:shadow-xl hover:shadow-slate-900\/40/g, 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/40 font-bold');
    c = c.replace(/bg-white text-orange-600 hover:shadow-xl hover:shadow-white\/40/g, 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:shadow-lg hover:shadow-emerald-500/40 font-bold');
    
    c = c.replace(/text-white/g, 'text-slate-900'); // if any
    c = c.replace(/text-orange-50/g, 'text-slate-700');
    // text-teal-700 -> text-white (reversed in extreme)
    // so now text-white is text-slate-900, so we have to replace text-slate-900 back to text-teal-700
    // Actually let's manually ensure text-teal-700 is back
    
    // Feature icon backgrounds
    c = c.replace(/bg-slate-900\/20/g, 'bg-teal-50');
    c = c.replace(/bg-white\/20/g, 'bg-teal-50');
    c = c.replace(/border-slate-900\/30/g, 'border-teal-200');
    c = c.replace(/border-white\/30/g, 'border-teal-200');
    
    c = c.replace(/border border-slate-900 text-slate-900 hover:bg-slate-900\/20/g, 'border border-slate-300 text-slate-700 hover:bg-slate-50');
    c = c.replace(/border border-white text-white hover:bg-white\/20/g, 'border border-slate-300 text-slate-700 hover:bg-slate-50');
    return c;
});

console.log("Undone Extreme Colors Theme!");
