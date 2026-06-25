const fs = require('fs');
const path = require('path');

const file = 'src/app/results/page.tsx';

if (fs.existsSync(file)) {
    let c = fs.readFileSync(file, 'utf8');

    // General replacements for UI wrapper (avoiding breaking the print section too much, but it's okay)
    c = c.replace(/bg-gray-50/g, 'bg-white');
    // c.replace(/border-gray-200/g, 'border-slate-100'); // We will do this specifically to avoid breaking the print tables
    // c.replace(/text-gray-900/g, 'text-slate-900');
    // Instead of global, let's target specific sections.

    // 1. Hero Title & Badge
    c = c.replace(/<span className="text-blue-700">Portal<\/span>/g, 
        '<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 drop-shadow-sm">Portal</span>');
        
    c = c.replace(/<div className="inline-block bg-white border border-gray-200 text-gray-700 text-xs font-semibold px-4 py-1\.5 mb-6 uppercase tracking-wide">/g, 
        '<div className="inline-block bg-purple-50 border border-purple-200 text-purple-600 rounded-full text-xs font-bold px-4 py-1.5 mb-6 uppercase tracking-wide shadow-sm">');

    // 2. Info Badges
    c = c.replace(/<div className="flex items-center gap-2 text-gray-700 text-sm font-semibold bg-white px-4 py-2 border border-gray-200">\s*<CheckCircle2 size=\{16\} className="text-blue-700" \/> Fast Verification\s*<\/div>/g, 
        '<div className="flex items-center gap-2 text-rose-700 text-sm font-bold bg-rose-50 px-4 py-2 border border-rose-200 rounded-full shadow-sm"><CheckCircle2 size={16} className="text-rose-500" /> Fast Verification</div>');
        
    c = c.replace(/<div className="flex items-center gap-2 text-gray-700 text-sm font-semibold bg-white px-4 py-2 border border-gray-200">\s*<Printer size=\{16\} className="text-blue-700" \/> Print-Ready Cards\s*<\/div>/g, 
        '<div className="flex items-center gap-2 text-amber-700 text-sm font-bold bg-amber-50 px-4 py-2 border border-amber-200 rounded-full shadow-sm"><Printer size={16} className="text-amber-500" /> Print-Ready Cards</div>');
        
    c = c.replace(/<div className="flex items-center gap-2 text-gray-700 text-sm font-semibold bg-white px-4 py-2 border border-gray-200">\s*<Award size=\{16\} className="text-blue-700" \/> Secure Records\s*<\/div>/g, 
        '<div className="flex items-center gap-2 text-emerald-700 text-sm font-bold bg-emerald-50 px-4 py-2 border border-emerald-200 rounded-full shadow-sm"><Award size={16} className="text-emerald-500" /> Secure Records</div>');

    // 3. Search Section
    c = c.replace(/<div className="max-w-xl mx-auto bg-white border border-gray-200 p-8">/g, 
        '<div className="max-w-xl mx-auto bg-white border border-slate-100 p-8 rounded-3xl shadow-lg shadow-purple-500/5">');
        
    c = c.replace(/<Search size=\{32\} \/>/g, '<Search size={32} className="text-purple-600" />');
    c = c.replace(/text-blue-700 mb-6/g, 'text-purple-600 mb-6 bg-purple-50 w-16 h-16 rounded-full flex items-center justify-center');
    
    // Search Inputs Focus
    c = c.replace(/focus:border-blue-700 focus:ring-blue-700/g, 'focus:border-purple-500 focus:ring-purple-500 rounded-xl');
    c = c.replace(/border-gray-300/g, 'border-slate-200');
    
    // Search Button
    c = c.replace(/<button \n\s*type="submit" \n\s*disabled=\{loading\}\n\s*className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold transition-colors disabled:opacity-70 flex justify-center items-center gap-2 uppercase tracking-wide text-sm"\n\s*>/g, 
        `<button 
                type="submit" 
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold rounded-xl shadow-md transition-all disabled:opacity-70 flex justify-center items-center gap-2 uppercase tracking-wide text-sm transform hover:-translate-y-1"
              >`);

    // 4. Grading System & General Instructions (Landing Page UI)
    c = c.replace(/<div className="bg-white p-8 border border-gray-200">/g, 
        '<div className="bg-white p-8 border border-slate-100 shadow-sm rounded-2xl transform hover:-translate-y-1 transition-all">');
        
    // Icons in headings
    c = c.replace(/<Award size=\{18\} className="text-blue-700" \/>/g, '<Award size={18} className="text-amber-500" />');
    c = c.replace(/<CheckCircle2 size=\{18\} className="text-blue-700" \/>/g, '<CheckCircle2 size={18} className="text-emerald-500" />');
    
    // List bullets
    c = c.replace(/<span className="w-1\.5 h-1\.5 bg-blue-700 mt-1\.5 shrink-0"><\/span>/g, 
        '<span className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 mt-1.5 shrink-0 shadow-sm"></span>');

    // Grades inside the UI table
    c = c.replace(/<td className="py-3 px-4 text-center text-blue-700 border-x border-gray-100 font-semibold">A\+<\/td>/g, 
        '<td className="py-3 px-4 text-center text-emerald-600 border-x border-slate-100 font-bold">A+</td>');
    c = c.replace(/<td className="py-3 px-4 text-center text-blue-700 border-x border-gray-100 font-semibold">A<\/td>/g, 
        '<td className="py-3 px-4 text-center text-emerald-500 border-x border-slate-100 font-bold">A</td>');

    // 5. Result Header Buttons
    c = c.replace(/<button onClick=\{.*\} className="px-4 py-2 bg-white text-gray-600 font-semibold text-sm border border-gray-300 hover:text-gray-900 hover:bg-gray-50 transition-colors flex items-center gap-2">/g, 
        '<button onClick={() => {setResult(null); setSearchTerm(\'\');}} className="px-6 py-2.5 bg-white text-slate-700 font-bold text-sm border-2 border-slate-200 hover:border-purple-500 hover:text-purple-600 rounded-full transition-all flex items-center gap-2 shadow-sm hover:shadow-md">');
        
    c = c.replace(/<button onClick=\{.*\} className="px-4 py-2 bg-blue-700 text-white font-semibold text-sm hover:bg-blue-800 transition-colors flex items-center gap-2 tracking-wide uppercase">/g, 
        '<button onClick={() => window.print()} className="px-6 py-2.5 bg-gradient-to-r from-rose-500 to-orange-500 text-white font-bold text-sm hover:from-rose-600 hover:to-orange-600 rounded-full transition-all flex items-center gap-2 tracking-wide uppercase shadow-lg shadow-rose-500/30 transform hover:-translate-y-1">');

    // I will leave the print card (Result Card Section) as is because it needs to be printable (gray-900, black/white, etc.)

    fs.writeFileSync(file, c);
    console.log("Applied Multi-Colored Vibrant Theme to Results Page!");
} else {
    console.log("File not found!");
}
