const fs = require('fs');
const path = require('path');

const file = 'src/app/news/page.tsx';

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
    c = c.replace(/bg-gray-100/g, 'bg-slate-50');

    // 1. Hero Title
    c = c.replace(/<h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6">/g, 
        '<h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 drop-shadow-sm mb-6">');

    // Search Box Focus
    c = c.replace(/focus:border-blue-700 focus:ring-blue-700/g, 'focus:border-rose-500 focus:ring-rose-500');
    
    // Spinner
    c = c.replace(/border-t-blue-700/g, 'border-t-rose-500');

    // 2. News Grid
    // Note: news.map is already defined with `i` -> `news.map((item, i) => (`
    c = c.replace(/className="flex flex-col bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow group"/g, 
        'className={`flex flex-col bg-white border shadow-sm transition-all duration-300 transform hover:-translate-y-2 group rounded-2xl overflow-hidden ${i%4===0?"border-rose-100 hover:border-rose-400 hover:shadow-[0_10px_30px_rgba(244,63,94,0.2)]":i%4===1?"border-amber-100 hover:border-amber-400 hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]":i%4===2?"border-emerald-100 hover:border-emerald-400 hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]":"border-blue-100 hover:border-blue-400 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)]"}`}');
        
    c = c.replace(/<h3 className="text-xl font-semibold mb-3 text-slate-900 group-hover:text-blue-700 transition-colors">/g, 
        '<h3 className={`text-xl font-bold mb-3 transition-colors ${i%4===0?"group-hover:text-rose-600":i%4===1?"group-hover:text-amber-600":i%4===2?"group-hover:text-emerald-600":"group-hover:text-blue-600"}`}>');
        
    c = c.replace(/className="text-blue-700 font-semibold text-sm hover:underline flex items-center"/g, 
        'className={`font-bold text-sm hover:underline flex items-center ${i%4===0?"text-rose-600":i%4===1?"text-amber-600":i%4===2?"text-emerald-600":"text-blue-600"}`}');
        
    c = c.replace(/className="text-slate-400 hover:text-blue-700 transition-colors"/g, 
        'className={`transition-colors ${i%4===0?"text-slate-400 hover:text-rose-500":i%4===1?"text-slate-400 hover:text-amber-500":i%4===2?"text-slate-400 hover:text-emerald-500":"text-slate-400 hover:text-blue-500"}`}');

    // 3. Featured Highlight
    c = c.replace(/<section className="py-16 bg-gray-900 text-white border-b border-gray-800">/g, 
        '<section className="py-16 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 text-white border-b border-slate-800">');
    c = c.replace(/bg-gray-800 border border-gray-700/g, 'bg-slate-800 border border-slate-700 rounded-3xl overflow-hidden shadow-2xl');
    
    // Tag on image
    c = c.replace(/<div className="inline-block bg-blue-700 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white mb-3">/g, 
        '<div className="inline-block bg-gradient-to-r from-rose-500 to-orange-500 px-3 py-1 text-xs font-bold uppercase tracking-wide text-white mb-3 rounded-full shadow-lg">');
        
    // Left border quote
    c = c.replace(/border-l-4 border-blue-700/g, 'border-l-4 border-rose-500');
    
    // Button
    c = c.replace(/<button className="px-6 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold transition-colors flex items-center">/g, 
        '<button className="px-6 py-3 bg-gradient-to-r from-rose-500 to-orange-500 hover:from-rose-600 hover:to-orange-600 text-white font-bold rounded-full shadow-lg shadow-rose-500/30 transition-all transform hover:-translate-y-1 flex items-center">');

    // 4. Upcoming Events
    // Add idx to map
    c = c.replace(/\]\.map\(\(event, idx\) => \(/g, '].map((event, idx) => (');
    
    // Top right View Calendar Button
    c = c.replace(/className="inline-flex items-center px-6 py-2 border border-slate-300 text-slate-700 hover:border-blue-700 hover:text-blue-700 font-semibold transition-colors bg-white"/g, 
        'className="inline-flex items-center px-6 py-2 border-2 border-slate-200 text-slate-700 hover:border-purple-500 hover:text-purple-600 font-bold transition-all bg-white rounded-full hover:shadow-sm"');
        
    // Event Card
    c = c.replace(/className="bg-white border border-slate-100 p-8 flex flex-col hover:border-blue-700 transition-colors"/g, 
        'className={`bg-white border shadow-sm p-8 flex flex-col transition-all duration-300 transform hover:-translate-y-2 rounded-2xl ${idx===0?"border-rose-100 hover:border-rose-400 hover:shadow-[0_10px_30px_rgba(244,63,94,0.2)]":idx===1?"border-amber-100 hover:border-amber-400 hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]":"border-emerald-100 hover:border-emerald-400 hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]"}`}');
        
    // Event Date Box
    c = c.replace(/className="bg-slate-50 border border-slate-100 w-20 h-20 flex flex-col items-center justify-center shrink-0"/g, 
        'className={`border w-20 h-20 flex flex-col items-center justify-center shrink-0 rounded-xl ${idx===0?"bg-rose-50 border-rose-100":idx===1?"bg-amber-50 border-amber-100":"bg-emerald-50 border-emerald-100"}`}');
        
    // Event Date Number
    c = c.replace(/className="text-2xl font-semibold text-blue-700 leading-none mb-1"/g, 
        'className={`text-2xl font-bold leading-none mb-1 ${idx===0?"text-rose-600":idx===1?"text-amber-600":"text-emerald-600"}`}');

    // Add to Calendar Button
    c = c.replace(/<button className="w-full py-3 bg-slate-100 text-slate-700 font-semibold hover:bg-slate-200 transition-colors">/g, 
        '<button className={`w-full py-3 font-bold rounded-xl transition-all ${idx===0?"bg-rose-50 text-rose-600 hover:bg-rose-100":idx===1?"bg-amber-50 text-amber-600 hover:bg-amber-100":"bg-emerald-50 text-emerald-600 hover:bg-emerald-100"}`}>');

    // 5. Newsletter Section
    c = c.replace(/<div className="bg-blue-700 text-white flex flex-col lg:flex-row items-center">/g, 
        '<div className="bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 text-white flex flex-col lg:flex-row items-center rounded-3xl shadow-xl overflow-hidden">');
        
    c = c.replace(/text-blue-100/g, 'text-fuchsia-100');
    c = c.replace(/focus:ring-blue-400/g, 'focus:ring-fuchsia-400 rounded-l-xl');
    c = c.replace(/<button className="bg-gray-900 text-white px-8 py-3 font-semibold hover:bg-gray-800 transition-colors whitespace-nowrap">/g, 
        '<button className="bg-white text-fuchsia-600 px-8 py-3 font-bold hover:bg-fuchsia-50 transition-colors whitespace-nowrap rounded-r-xl shadow-md">');

    fs.writeFileSync(file, c);
    console.log("Applied Multi-Colored Vibrant Theme to News Page!");
} else {
    console.log("File not found!");
}
