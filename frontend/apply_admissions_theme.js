const fs = require('fs');
const path = require('path');

const file = 'src/app/admissions/page.tsx';

if (fs.existsSync(file)) {
    let c = fs.readFileSync(file, 'utf8');

    // General replacements
    c = c.replace(/bg-gray-50/g, 'bg-white');
    c = c.replace(/border-gray-200/g, 'border-slate-100');
    c = c.replace(/border-gray-300/g, 'border-slate-200');
    c = c.replace(/text-gray-900/g, 'text-slate-900');
    c = c.replace(/text-gray-600/g, 'text-slate-600');
    c = c.replace(/text-gray-700/g, 'text-slate-700');
    c = c.replace(/text-gray-500/g, 'text-slate-500');
    c = c.replace(/text-gray-400/g, 'text-slate-400');
    c = c.replace(/text-gray-100/g, 'text-slate-100'); // Step numbers

    // 1. Hero Title & Badge
    c = c.replace(/<span className="text-blue-700">\{t\("in Sacred Knowledge"\)\}<\/span>/g, 
        '<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 drop-shadow-sm">{t("in Sacred Knowledge")}</span>');
        
    c = c.replace(/<div className="inline-block bg-white border border-slate-100 text-slate-700 text-xs font-semibold px-4 py-1\.5 mb-6 uppercase tracking-wide">/g, 
        '<div className="inline-block bg-rose-50 border border-rose-200 text-rose-600 rounded-full text-xs font-bold px-4 py-1.5 mb-6 uppercase tracking-wide shadow-sm">');
        
    // Info Badges
    c = c.replace(/<div className="flex items-center gap-2 text-slate-700 text-sm font-semibold bg-white border border-slate-100 px-6 py-3">/g, 
        '<div className="flex items-center gap-2 text-indigo-700 text-sm font-bold bg-indigo-50 border border-indigo-100 rounded-full shadow-sm px-6 py-3">');
    c = c.replace(/<Clock size=\{18\} className="text-blue-700" \/>/g, '<Clock size={18} className="text-indigo-500" />');
    c = c.replace(/<FileText size=\{18\} className="text-blue-700" \/>/g, '<FileText size={18} className="text-indigo-500" />');

    // 2. Admission Process Guide (4 Steps)
    c = c.replace(/className="bg-white p-8 border border-slate-100 hover:border-blue-700 transition-colors relative group"/g, 
        'className={`bg-white p-8 border shadow-sm transition-all duration-300 transform hover:-translate-y-2 relative group rounded-2xl ${idx===0?"border-rose-100 hover:border-rose-400 hover:shadow-[0_10px_30px_rgba(244,63,94,0.15)]":idx===1?"border-amber-100 hover:border-amber-400 hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)]":idx===2?"border-emerald-100 hover:border-emerald-400 hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)]":"border-blue-100 hover:border-blue-400 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)]"}`}');
        
    c = c.replace(/<div className="text-blue-700 mb-6">/g, 
        '<div className={`mb-6 w-14 h-14 rounded-xl flex items-center justify-center shadow-sm border ${idx===0?"bg-rose-50 text-rose-600 border-rose-100":idx===1?"bg-amber-50 text-amber-600 border-amber-100":idx===2?"bg-emerald-50 text-emerald-600 border-emerald-100":"bg-blue-50 text-blue-600 border-blue-100"}`}>');
        
    c = c.replace(/group-hover:text-blue-50/g, 'opacity-50'); // Keep the number subtle

    // 3. Form Section Left Col
    c = c.replace(/<div className="text-blue-700 shrink-0 mt-1">/g, '<div className="text-rose-500 shrink-0 mt-1">');
    
    // Help Box
    c = c.replace(/<div className="mt-12 bg-blue-700 p-8 text-white">/g, 
        '<div className="mt-12 bg-gradient-to-br from-indigo-700 via-purple-700 to-fuchsia-800 p-8 text-white rounded-3xl shadow-xl relative overflow-hidden">');
    c = c.replace(/text-blue-100/g, 'text-fuchsia-100');
    c = c.replace(/text-blue-300/g, 'text-fuchsia-300');

    // 4. Form Wrapper Right Col
    c = c.replace(/<div className="bg-white border border-slate-100 shadow-sm">/g, 
        '<div className="bg-white border border-slate-100 shadow-xl shadow-purple-500/5 rounded-3xl overflow-hidden">');
        
    c = c.replace(/border-t-blue-700/g, 'border-t-purple-600'); // Loading spinner

    // 5. FAQ Bottom Boxes
    c = c.replace(/className="bg-white p-8 border border-slate-100"/g, 
        'className={`bg-white p-8 border shadow-sm rounded-2xl transition-all transform hover:-translate-y-1 ${i===0?"border-rose-100 hover:border-rose-300":i===1?"border-amber-100 hover:border-amber-300":"border-emerald-100 hover:border-emerald-300"}`}');
        
    c = c.replace(/<div className="w-1\.5 h-1\.5 bg-blue-700" \/>/g, 
        '<div className={`w-2 h-2 rounded-full shadow-sm ${i===0?"bg-rose-500":i===1?"bg-amber-500":"bg-emerald-500"}`} />');

    fs.writeFileSync(file, c);
    console.log("Applied Multi-Colored Vibrant Theme to Admissions Page!");
} else {
    console.log("File not found!");
}
