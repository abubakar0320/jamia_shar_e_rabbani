const fs = require('fs');
const path = require('path');

const file = 'src/app/courses/page.tsx';

if (fs.existsSync(file)) {
    let c = fs.readFileSync(file, 'utf8');

    // Make backgrounds white and remove gray borders
    c = c.replace(/bg-gray-50/g, 'bg-white');
    c = c.replace(/border-gray-200/g, 'border-slate-100');
    c = c.replace(/text-gray-900/g, 'text-slate-900');
    c = c.replace(/text-gray-600/g, 'text-slate-600');
    c = c.replace(/text-gray-700/g, 'text-slate-700');
    c = c.replace(/text-gray-500/g, 'text-slate-500');

    // 1. Hero Title
    c = c.replace(/<h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6">/g, 
        '<h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 drop-shadow-sm mb-6">');

    // 2. Filter Bar
    c = c.replace(/hover:border-blue-700 hover:text-blue-700/g, 'hover:border-rose-500 hover:text-rose-500 hover:shadow-sm');
    c = c.replace(/bg-gray-50 border border-slate-100/g, 'bg-white border border-slate-200');

    // 3. Courses Grid
    // First, modify map to include index 'i'
    c = c.replace(/\{courses\.map\(\(course\) => \(/g, '{courses.map((course, i) => (');
    
    // Card styles
    c = c.replace(/className="flex flex-col bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow group"/g, 
        'className={`flex flex-col bg-white border shadow-sm transition-all duration-300 transform hover:-translate-y-2 group rounded-2xl overflow-hidden ${i%4===0?"border-rose-100 hover:border-rose-400 hover:shadow-[0_10px_30px_rgba(244,63,94,0.2)]":i%4===1?"border-amber-100 hover:border-amber-400 hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]":i%4===2?"border-emerald-100 hover:border-emerald-400 hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]":"border-blue-100 hover:border-blue-400 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)]"}`}');
        
    // Badge
    c = c.replace(/<span className="bg-white text-slate-900 text-xs font-semibold px-3 py-1 border border-slate-100">/g, 
        '<span className={`text-xs px-3 py-1 rounded-full font-bold border ${i%4===0?"bg-rose-50 text-rose-600 border-rose-200":i%4===1?"bg-amber-50 text-amber-600 border-amber-200":i%4===2?"bg-emerald-50 text-emerald-600 border-emerald-200":"bg-blue-50 text-blue-600 border-blue-200"}`}>');
        
    // Icons
    c = c.replace(/className="text-blue-700"/g, 'className={`shrink-0 ${i%4===0?"text-rose-500":i%4===1?"text-amber-500":i%4===2?"text-emerald-500":"text-blue-500"}`}');
    
    // Links / Buttons in cards
    c = c.replace(/hover:border-blue-700 hover:text-blue-700 transition-colors/g, 
        'hover:shadow-sm transition-all rounded-lg ${i%4===0?"hover:border-rose-500 hover:text-rose-600":i%4===1?"hover:border-amber-500 hover:text-amber-600":i%4===2?"hover:border-emerald-500 hover:text-emerald-600":"hover:border-blue-500 hover:text-blue-600"}`');
    // Note: the above string replacement needs careful handling. The original is:
    // className="flex-1 text-center py-2 border-2 border-slate-100 text-slate-700 font-semibold hover:border-blue-700 hover:text-blue-700 transition-colors"
    c = c.replace(/className="flex-1 text-center py-2 border-2 border-slate-100 text-slate-700 font-semibold hover:shadow-sm transition-all rounded-lg \$\{i%4===0\?"hover:border-rose-500 hover:text-rose-600":i%4===1\?"hover:border-amber-500 hover:text-amber-600":i%4===2\?"hover:border-emerald-500 hover:text-emerald-600":"hover:border-blue-500 hover:text-blue-600"\}`"/g, 'fix'); // Reverting any mess-up if ran twice
    
    c = c.replace(/className="flex-1 text-center py-2 border-2 border-slate-100 text-slate-700 font-semibold hover:border-blue-700 hover:text-blue-700 transition-colors"/g, 
        'className={`flex-1 text-center py-2 border-2 border-slate-100 text-slate-700 font-bold transition-all rounded-xl ${i%4===0?"hover:border-rose-500 hover:text-rose-600":i%4===1?"hover:border-amber-500 hover:text-amber-600":i%4===2?"hover:border-emerald-500 hover:text-emerald-600":"hover:border-blue-500 hover:text-blue-600"}`}');
        
    c = c.replace(/className="flex-1 text-center py-2 bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors"/g, 
        'className={`flex-1 text-center py-2 text-white font-bold transition-all transform hover:-translate-y-1 shadow-md rounded-xl ${i%4===0?"bg-gradient-to-r from-rose-500 to-pink-500 hover:shadow-rose-500/40":i%4===1?"bg-gradient-to-r from-amber-500 to-orange-500 hover:shadow-amber-500/40":i%4===2?"bg-gradient-to-r from-emerald-500 to-teal-500 hover:shadow-emerald-500/40":"bg-gradient-to-r from-blue-500 to-indigo-500 hover:shadow-blue-500/40"}`}');

    // 4. Academic Pathways
    c = c.replace(/<div key=\{idx\} className="flex flex-col p-8 border border-slate-100 bg-white relative">/g, 
        '<div key={idx} className={`flex flex-col p-8 border shadow-sm rounded-2xl relative transition-all duration-300 transform hover:-translate-y-2 ${idx===0?"border-rose-100 hover:border-rose-400 hover:shadow-[0_10px_30px_rgba(244,63,94,0.2)]":idx===1?"border-amber-100 hover:border-amber-400 hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]":"border-emerald-100 hover:border-emerald-400 hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]"}`}>');
    
    // Need to handle the path.icon color in Academic Pathways
    // Since there's `className="text-blue-700 mb-4"`
    c = c.replace(/<div className="text-blue-700 mb-4">/g, 
        '<div className={`mb-4 w-12 h-12 flex items-center justify-center rounded-xl ${idx===0?"bg-rose-50 text-rose-600":idx===1?"bg-amber-50 text-amber-600":"bg-emerald-50 text-emerald-600"}`}>');

    // 5. Learning Methodology
    // List item icons
    c = c.replace(/className="text-blue-700 shrink-0 mt-0\.5"/g, 
        'className="text-purple-600 shrink-0 mt-0.5"');
    
    // Top wafaq ranking box
    c = c.replace(/<div className="bg-blue-700 p-8 border border-blue-800 text-center text-white">/g, 
        '<div className="bg-gradient-to-br from-violet-600 to-fuchsia-600 p-8 border-none rounded-2xl text-center text-white shadow-lg shadow-purple-500/30 transform hover:-translate-y-1 transition-transform">');
    c = c.replace(/text-blue-200/g, 'text-purple-200');
    
    // Other boxes
    c = c.replace(/<div className="bg-white p-8 border border-slate-100 text-center">/g, 
        '<div className="bg-white p-8 border border-slate-100 rounded-2xl shadow-sm text-center">');

    // 6. Secondary CTA
    c = c.replace(/className="bg-blue-700 text-white px-8 py-3 font-semibold hover:bg-blue-800 transition-colors"/g, 
        'className="bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/40 hover:from-rose-600 hover:to-orange-600 font-bold px-8 py-3 rounded-full transform hover:-translate-y-1 transition-all"');
    c = c.replace(/className="bg-transparent border-2 border-slate-900 text-slate-900 px-8 py-3 font-semibold hover:bg-white transition-colors"/g, 
        'className="bg-white border-2 border-slate-200 text-slate-900 px-8 py-3 font-bold hover:border-rose-500 hover:text-rose-600 rounded-full transition-all shadow-sm"');

    // Fix a possible mistake with loading spinner
    c = c.replace(/border-t-blue-700/g, 'border-t-rose-500');

    fs.writeFileSync(file, c);
    console.log("Applied Multi-Colored Vibrant Theme to Courses Page!");
} else {
    console.log("File not found!");
}
