const fs = require('fs');
const path = require('path');

const file = 'src/app/contact/page.tsx';

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

    // 1. Hero Title & Badge
    c = c.replace(/<span className="text-blue-700">Assist You<\/span>/g, 
        '<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-rose-500 drop-shadow-sm">Assist You</span>');
        
    c = c.replace(/<div className="inline-block bg-white border border-slate-100 text-slate-700 text-xs font-semibold px-4 py-1\.5 mb-6 uppercase tracking-wide">/g, 
        '<div className="inline-block bg-purple-50 border border-purple-200 text-purple-600 rounded-full shadow-sm text-xs font-bold px-4 py-1.5 mb-6 uppercase tracking-wide">');
        
    // Info Badges
    c = c.replace(/<div className="flex items-center gap-2 text-slate-700 text-sm font-semibold bg-white border border-slate-100 px-6 py-3">\s*<Clock size=\{18\} className="text-blue-700" \/> Response within 24 Hours\s*<\/div>/g, 
        '<div className="flex items-center gap-2 text-amber-700 text-sm font-bold bg-amber-50 border border-amber-100 rounded-full shadow-sm px-6 py-3"><Clock size={18} className="text-amber-500" /> Response within 24 Hours</div>');
        
    c = c.replace(/<div className="flex items-center gap-2 text-slate-700 text-sm font-semibold bg-white border border-slate-100 px-6 py-3">\s*<Globe2 size=\{18\} className="text-blue-700" \/> Global Support\s*<\/div>/g, 
        '<div className="flex items-center gap-2 text-blue-700 text-sm font-bold bg-blue-50 border border-blue-100 rounded-full shadow-sm px-6 py-3"><Globe2 size={18} className="text-blue-500" /> Global Support</div>');

    // 2. Detailed Contact Methods
    c = c.replace(/className="bg-white p-8 border border-slate-100 text-center hover:border-blue-700 transition-colors group"/g, 
        'className={`bg-white p-8 border shadow-sm transition-all duration-300 transform hover:-translate-y-2 rounded-2xl text-center group ${idx===0?"border-blue-100 hover:border-blue-400 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)]":"border-rose-100 hover:border-rose-400 hover:shadow-[0_10px_30px_rgba(244,63,94,0.15)]"}`}');
        
    c = c.replace(/<div className="text-blue-700 mb-4 flex justify-center">/g, 
        '<div className={`mb-4 w-16 h-16 mx-auto rounded-full flex items-center justify-center shadow-sm border ${idx===0?"bg-blue-50 text-blue-600 border-blue-100":"bg-rose-50 text-rose-600 border-rose-100"}`}>');

    // 3. Form & Institutional Info
    c = c.replace(/className="lg:col-span-7 bg-white p-8 border border-slate-100"/g, 
        'className="lg:col-span-7 bg-white p-8 border border-slate-100 rounded-3xl shadow-xl shadow-purple-500/5"');
        
    // Inputs
    c = c.replace(/focus:border-blue-700 focus:ring-blue-700/g, 'focus:border-purple-500 focus:ring-purple-500 rounded-xl');
    c = c.replace(/border-slate-200/g, 'border-slate-200'); // already matched
    
    // Send Button
    c = c.replace(/className="w-full md:w-auto px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold transition-colors disabled:opacity-50 flex items-center justify-center gap-2"/g, 
        'className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-md transition-all transform hover:-translate-y-1 disabled:opacity-50 flex items-center justify-center gap-2"');
        
    // Success message
    c = c.replace(/bg-white text-blue-700 text-sm font-semibold border border-blue-200/g, 'bg-emerald-50 text-emerald-700 text-sm font-bold border border-emerald-200 rounded-xl shadow-sm');

    // Campus Visit
    c = c.replace(/<div className="bg-blue-700 p-8 text-white">/g, 
        '<div className="bg-gradient-to-br from-indigo-700 via-purple-800 to-slate-900 p-8 text-white rounded-3xl shadow-xl overflow-hidden relative">');
        
    c = c.replace(/border-blue-600/g, 'border-white/20 rounded-xl');
    c = c.replace(/text-blue-300/g, 'text-fuchsia-300');
    c = c.replace(/text-blue-100/g, 'text-fuchsia-100');
    
    // Additional Help
    c = c.replace(/<div className="p-8 bg-white border border-slate-100 text-center">/g, 
        '<div className="p-8 bg-white border border-slate-100 text-center rounded-2xl shadow-sm">');
    c = c.replace(/<div className="text-blue-700 mb-3 flex justify-center">/g, 
        '<div className="text-emerald-500 mb-3 bg-emerald-50 w-16 h-16 mx-auto rounded-full flex items-center justify-center">');

    fs.writeFileSync(file, c);
    console.log("Applied Multi-Colored Vibrant Theme to Contact Page!");
} else {
    console.log("File not found!");
}
