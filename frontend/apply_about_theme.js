const fs = require('fs');
const path = require('path');

const file = 'src/app/about/page.tsx';

if (fs.existsSync(file)) {
    let c = fs.readFileSync(file, 'utf8');

    // 1. Hero Section
    c = c.replace(/bg-gray-50/g, 'bg-white'); // change all bg-gray-50 to bg-white or slate-50
    c = c.replace(/border-gray-200/g, 'border-slate-100');
    c = c.replace(/text-gray-900/g, 'text-slate-900');
    c = c.replace(/text-gray-600/g, 'text-slate-600');
    c = c.replace(/text-gray-700/g, 'text-slate-700');
    
    // Hero Title
    c = c.replace(/<h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6">/g, 
        '<h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 drop-shadow-sm mb-6">');
        
    // 2. Mission/Vision/History Grid
    c = c.replace(/\{sections\.map\(\(item, i\) => \(\n\s*<div key=\{i\} className="flex flex-col">/g, 
        `{sections.map((item, i) => (\n                <div key={i} className={\`flex flex-col bg-white p-6 rounded-2xl shadow-sm border transition-all duration-300 transform hover:-translate-y-2 \${i===0?"border-rose-100 hover:border-rose-400 hover:shadow-[0_10px_30px_rgba(244,63,94,0.2)]":i===1?"border-amber-100 hover:border-amber-400 hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]":"border-emerald-100 hover:border-emerald-400 hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]"}\`}>`);
        
    c = c.replace(/<div className="w-12 h-12 bg-gray-50 flex items-center justify-center text-blue-700 mb-6 border border-slate-100">/g, 
        '<div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 shadow-sm ${i===0?"bg-rose-50 text-rose-600 border border-rose-100":i===1?"bg-amber-50 text-amber-600 border border-amber-100":"bg-emerald-50 text-emerald-600 border border-emerald-100"}`}>');
        
    c = c.replace(/<Link \n\s*href=\{item\.link\} \n\s*className="text-blue-700 font-semibold flex items-center hover:underline"\n\s*>/g, 
        `<Link \n                    href={item.link} \n                    className={\`font-bold flex items-center hover:underline \${i===0?"text-rose-600":i===1?"text-amber-600":"text-emerald-600"}\`}\n                  >`);

    // 3. Detailed Content Section (Journey)
    c = c.replace(/bg-blue-700 hover:bg-blue-800 text-white font-semibold transition-colors/g, 
        'bg-gradient-to-r from-rose-500 to-orange-500 text-white shadow-lg shadow-rose-500/40 hover:from-rose-600 hover:to-orange-600 font-bold rounded-full transform hover:-translate-y-1 transition-all');

    // 4. Message from Principal
    c = c.replace(/text-blue-700 font-semibold uppercase tracking-wide text-xs mb-3 block/g, 
        'text-xs px-3 py-1 rounded-full font-bold mb-4 uppercase tracking-wide inline-block border bg-purple-50 text-purple-600 border-purple-200');
    c = c.replace(/border-blue-700/g, 'border-purple-500');

    // 5. Core Values Grid
    c = c.replace(/<div key=\{idx\} className="bg-white p-8 border border-slate-100 shadow-sm flex flex-col">/g, 
        '<div key={idx} className={`bg-white p-8 border shadow-sm flex flex-col transition-all duration-300 transform hover:-translate-y-2 rounded-2xl ${idx%4===0?"border-rose-100 hover:border-rose-400 hover:shadow-[0_10px_30px_rgba(244,63,94,0.2)]":idx%4===1?"border-amber-100 hover:border-amber-400 hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]":idx%4===2?"border-emerald-100 hover:border-emerald-400 hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]":"border-blue-100 hover:border-blue-400 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)]"}`}>');
        
    c = c.replace(/<div className="text-blue-700 mb-6">/g, 
        '<div className={`mb-6 w-12 h-12 flex items-center justify-center rounded-xl ${idx%4===0?"bg-rose-50 text-rose-600":idx%4===1?"bg-amber-50 text-amber-600":idx%4===2?"bg-emerald-50 text-emerald-600":"bg-blue-50 text-blue-600"}`}>');

    // 6. Stats Section
    c = c.replace(/className="py-16 px-4 sm:px-6 lg:px-8 bg-blue-700"/g, 
        'className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500"');
    c = c.replace(/text-blue-200/g, 'text-fuchsia-100');

    fs.writeFileSync(file, c);
    console.log("Applied Multi-Colored Vibrant Theme to About Page!");
} else {
    console.log("File not found!");
}
