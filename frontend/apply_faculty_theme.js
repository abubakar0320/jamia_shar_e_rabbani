const fs = require('fs');
const path = require('path');

const file = 'src/app/faculty/page.tsx';

if (fs.existsSync(file)) {
    let c = fs.readFileSync(file, 'utf8');

    // General replacements
    c = c.replace(/bg-gray-50/g, 'bg-white');
    c = c.replace(/border-gray-200/g, 'border-slate-100');
    c = c.replace(/text-gray-900/g, 'text-slate-900');
    c = c.replace(/text-gray-600/g, 'text-slate-600');
    c = c.replace(/text-gray-700/g, 'text-slate-700');
    c = c.replace(/text-gray-500/g, 'text-slate-500');
    c = c.replace(/text-gray-200/g, 'text-slate-200');

    // 1. Hero Title
    c = c.replace(/<h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6">/g, 
        '<h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 drop-shadow-sm mb-6">');

    // 2. Faculty Grid
    c = c.replace(/\{faculty\.map\(\(member\) => \(/g, '{faculty.map((member, i) => (');
    
    // Faculty Card
    c = c.replace(/className="flex flex-col bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow group"/g, 
        'className={`flex flex-col bg-white border shadow-sm transition-all duration-300 transform hover:-translate-y-2 group rounded-2xl overflow-hidden ${i%4===0?"border-rose-100 hover:border-rose-400 hover:shadow-[0_10px_30px_rgba(244,63,94,0.2)]":i%4===1?"border-amber-100 hover:border-amber-400 hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]":i%4===2?"border-emerald-100 hover:border-emerald-400 hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]":"border-blue-100 hover:border-blue-400 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)]"}`}');
        
    // Role/Designation color
    c = c.replace(/<p className="text-xs font-semibold text-blue-700 mb-4 uppercase tracking-wide">/g, 
        '<p className={`text-xs font-bold mb-4 uppercase tracking-wide ${i%4===0?"text-rose-600":i%4===1?"text-amber-600":i%4===2?"text-emerald-600":"text-blue-600"}`}>');
        
    // Profile Link color
    c = c.replace(/className="ml-auto text-blue-700 font-semibold text-sm hover:underline flex items-center"/g, 
        'className={`ml-auto font-bold text-sm hover:underline flex items-center ${i%4===0?"text-rose-600":i%4===1?"text-amber-600":i%4===2?"text-emerald-600":"text-blue-600"}`}');
        
    // Icon hover colors in card
    c = c.replace(/hover:text-blue-700/g, 'hover:text-rose-500');

    // Loading spinner color
    c = c.replace(/border-t-blue-700/g, 'border-t-rose-500');

    // 3. Scholarly Lineage
    c = c.replace(/text-blue-700 font-semibold uppercase tracking-wide text-xs mb-3 block/g, 
        'text-xs px-3 py-1 rounded-full font-bold mb-4 uppercase tracking-wide inline-block border bg-purple-50 text-purple-600 border-purple-200');
        
    // Lineage 4 boxes
    // Box 1 (Tafseer)
    c = c.replace(/<div className="bg-white p-8 border border-slate-100 text-center">\s*<BookOpen size=\{32\} className="text-blue-700 mx-auto mb-4" \/>\s*<h4 className="font-semibold text-slate-900 text-lg mb-1">Tafseer<\/h4>\s*<p className="text-xs text-slate-500 uppercase tracking-wide">Exegesis<\/p>\s*<\/div>/g, 
        `<div className="bg-white p-8 border border-rose-100 shadow-sm rounded-2xl text-center transform hover:-translate-y-2 transition-all hover:shadow-[0_10px_30px_rgba(244,63,94,0.2)]">
                  <div className="w-16 h-16 mx-auto bg-rose-50 rounded-2xl flex items-center justify-center mb-4"><BookOpen size={32} className="text-rose-500" /></div>
                  <h4 className="font-semibold text-slate-900 text-lg mb-1">Tafseer</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Exegesis</p>
                </div>`);
                
    // Box 2 (Hadith)
    c = c.replace(/<div className="bg-white p-8 border border-slate-100 text-center">\s*<BookOpen size=\{32\} className="text-blue-700 mx-auto mb-4" \/>\s*<h4 className="font-semibold text-slate-900 text-lg mb-1">Hadith<\/h4>\s*<p className="text-xs text-slate-500 uppercase tracking-wide">Prophetic Traditions<\/p>\s*<\/div>/g, 
        `<div className="bg-white p-8 border border-amber-100 shadow-sm rounded-2xl text-center transform hover:-translate-y-2 transition-all hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]">
                  <div className="w-16 h-16 mx-auto bg-amber-50 rounded-2xl flex items-center justify-center mb-4"><BookOpen size={32} className="text-amber-500" /></div>
                  <h4 className="font-semibold text-slate-900 text-lg mb-1">Hadith</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Prophetic Traditions</p>
                </div>`);
                
    // Box 3 (Fiqh)
    c = c.replace(/<div className="bg-white p-8 border border-slate-100 text-center">\s*<BookOpen size=\{32\} className="text-blue-700 mx-auto mb-4" \/>\s*<h4 className="font-semibold text-slate-900 text-lg mb-1">Fiqh & Ifta<\/h4>\s*<p className="text-xs text-slate-500 uppercase tracking-wide">Jurisprudence<\/p>\s*<\/div>/g, 
        `<div className="bg-white p-8 border border-emerald-100 shadow-sm rounded-2xl text-center transform hover:-translate-y-2 transition-all hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]">
                  <div className="w-16 h-16 mx-auto bg-emerald-50 rounded-2xl flex items-center justify-center mb-4"><BookOpen size={32} className="text-emerald-500" /></div>
                  <h4 className="font-semibold text-slate-900 text-lg mb-1">Fiqh & Ifta</h4>
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Jurisprudence</p>
                </div>`);
                
    // Box 4 (Aqaid)
    c = c.replace(/<div className="bg-blue-700 p-8 border border-blue-800 text-center text-white">\s*<BookOpen size=\{32\} className="mx-auto mb-4" \/>\s*<h4 className="font-semibold text-white text-lg mb-1">Aqaid<\/h4>\s*<p className="text-xs text-blue-200 uppercase tracking-wide">Islamic Theology<\/p>\s*<\/div>/g, 
        `<div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-8 border-none rounded-2xl text-center text-white shadow-lg shadow-indigo-500/30 transform hover:-translate-y-2 transition-all">
                  <div className="w-16 h-16 mx-auto bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm"><BookOpen size={32} className="text-white" /></div>
                  <h4 className="font-semibold text-white text-lg mb-1">Aqaid</h4>
                  <p className="text-xs text-blue-200 uppercase tracking-wide">Islamic Theology</p>
                </div>`);

    // 4. Academic Departments
    c = c.replace(/\{sections\.map/g, 'dummy'); // Prevent clash, not needed but just in case
    
    // Departments Grid map
    c = c.replace(/\{title: 'Department of Quranic/g, '{ title: "Department of Quranic');
    c = c.replace(/\]\.map\(\(dept, idx\) => \(/g, '].map((dept, idx) => (');
    
    // Department card container
    c = c.replace(/className="bg-white border border-slate-100 p-8 flex flex-col hover:border-blue-700 transition-colors"/g, 
        'className={`bg-white border shadow-sm p-8 flex flex-col rounded-2xl transition-all duration-300 transform hover:-translate-y-2 ${idx===0?"border-rose-100 hover:border-rose-400 hover:shadow-[0_10px_30px_rgba(244,63,94,0.2)]":idx===1?"border-amber-100 hover:border-amber-400 hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]":"border-emerald-100 hover:border-emerald-400 hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]"}`}');
        
    // Department icon
    c = c.replace(/<div className="text-blue-700 mb-6">/g, 
        '<div className={`mb-6 w-14 h-14 rounded-xl flex items-center justify-center shadow-sm border ${idx===0?"bg-rose-50 text-rose-600 border-rose-100":idx===1?"bg-amber-50 text-amber-600 border-amber-100":"bg-emerald-50 text-emerald-600 border-emerald-100"}`}>');
        
    // Department link
    c = c.replace(/className="text-blue-700 font-semibold inline-flex items-center hover:underline mt-auto"/g, 
        'className={`font-bold inline-flex items-center hover:underline mt-auto ${idx===0?"text-rose-600":idx===1?"text-amber-600":"text-emerald-600"}`}');

    // 5. Opportunities / Secondary CTA
    c = c.replace(/<div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 bg-white p-10 border border-slate-100">/g, 
        '<div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-12 bg-white p-10 border border-slate-100 shadow-sm rounded-3xl">');
        
    c = c.replace(/className="inline-flex items-center justify-center px-6 py-2\.5 bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors"/g, 
        'className="inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/40 hover:from-rose-600 hover:to-orange-600 font-bold rounded-full transform hover:-translate-y-1 transition-all"');
        
    c = c.replace(/className="flex-1 w-full relative aspect-video lg:aspect-\[4\/3\] bg-white border border-slate-100"/g, 
        'className="flex-1 w-full relative aspect-video lg:aspect-[4/3] bg-slate-50 border border-slate-100 rounded-2xl overflow-hidden"');

    fs.writeFileSync(file, c);
    console.log("Applied Multi-Colored Vibrant Theme to Faculty Page!");
} else {
    console.log("File not found!");
}
