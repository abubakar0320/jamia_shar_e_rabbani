const fs = require('fs');
const path = require('path');

const file = 'src/app/islamic-research-center/page.tsx';

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
    c = c.replace(/<span className="text-blue-700">& Reference Center<\/span>/g, 
        '<span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 drop-shadow-sm">& Reference Center</span>');

    // Digital Knowledge Hub badge
    c = c.replace(/<div className="inline-block bg-white border border-slate-100 text-slate-700 text-xs font-semibold px-4 py-1\.5 mb-6 uppercase tracking-wide">/g, 
        '<div className="inline-block bg-purple-50 border border-purple-200 text-purple-600 rounded-full text-xs font-bold px-4 py-1.5 mb-6 uppercase tracking-wide">');

    // Featured Daily Resource
    c = c.replace(/<div className="bg-white border border-slate-100 p-6 flex items-start gap-4 max-w-xl">/g, 
        '<div className="bg-white border shadow-sm border-rose-100 p-6 flex items-start gap-4 max-w-xl rounded-2xl transform hover:-translate-y-1 transition-all hover:shadow-[0_10px_30px_rgba(244,63,94,0.15)]">');
    c = c.replace(/<div className="text-blue-700">/g, '<div className="text-rose-500">');
    c = c.replace(/text-blue-700 hover:underline/g, 'text-rose-600 hover:underline');

    // 2. Search Box
    c = c.replace(/<div className="bg-white border border-slate-100 p-8 shadow-sm">/g, 
        '<div className="bg-white border border-slate-100 p-8 shadow-sm rounded-3xl">');
        
    // Search Button
    c = c.replace(/<button className="w-full py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold transition-colors">/g, 
        '<button className="w-full py-3 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-md transition-all">');

    // 3. Tabs Navigation
    // We cannot easily map tabs dynamically for activeTab with different colors inside className="flex..."
    // but we can make the active tab purple
    c = c.replace(/activeTab === tab\.id \n\s*\? 'border-blue-700 text-blue-700 bg-white'/g, 
        "activeTab === tab.id \n                      ? 'border-purple-600 text-purple-600 bg-purple-50 rounded-t-xl'");

    // 4. Quick Tools (Sidebar)
    c = c.replace(/bg-gray-900/g, 'bg-slate-900');
    c = c.replace(/bg-gray-800/g, 'bg-slate-800');
    c = c.replace(/bg-gray-700/g, 'bg-slate-700');
    c = c.replace(/border-gray-700/g, 'border-slate-700');
    c = c.replace(/<div className="bg-slate-900 p-6">/g, '<div className="bg-slate-900 p-6 rounded-2xl shadow-md">');

    // 5. Featured Collections
    // we need to add idx to the map
    c = c.replace(/\{FEATURED_COLLECTIONS\.map\(\(collection\) => \(/g, '{FEATURED_COLLECTIONS.map((collection, idx) => (');
    
    // Collection card
    c = c.replace(/<div key=\{collection\.id\} className="bg-white p-8 border border-slate-100 flex flex-col">/g, 
        '<div key={collection.id} className={`bg-white p-8 border shadow-sm flex flex-col transition-all duration-300 transform hover:-translate-y-2 rounded-2xl ${idx===0?"border-rose-100 hover:border-rose-400 hover:shadow-[0_10px_30px_rgba(244,63,94,0.2)]":idx===1?"border-amber-100 hover:border-amber-400 hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]":"border-emerald-100 hover:border-emerald-400 hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]"}`}>');
        
    // Collection icon
    c = c.replace(/<div className="text-rose-500 mb-6">/g, // Replaced text-blue-700 with text-rose-500 globally, so fix it
        '<div className={`mb-6 w-14 h-14 rounded-xl flex items-center justify-center shadow-sm border ${idx===0?"bg-rose-50 text-rose-600 border-rose-100":idx===1?"bg-amber-50 text-amber-600 border-amber-100":"bg-emerald-50 text-emerald-600 border-emerald-100"}`}>');
    // Actually wait, text-blue-700 might still be there for collections if the previous replacement wasn't global or didn't hit it.
    // Let's replace both just in case:
    c = c.replace(/<div className="text-blue-700 mb-6">/g, 
        '<div className={`mb-6 w-14 h-14 rounded-xl flex items-center justify-center shadow-sm border ${idx===0?"bg-rose-50 text-rose-600 border-rose-100":idx===1?"bg-amber-50 text-amber-600 border-amber-100":"bg-emerald-50 text-emerald-600 border-emerald-100"}`}>');

    // Collection link text color
    c = c.replace(/<button className="text-sm font-semibold text-rose-600 hover:underline flex items-center mt-auto">/g, 
        '<button className={`text-sm font-bold hover:underline flex items-center mt-auto ${idx===0?"text-rose-600":idx===1?"text-amber-600":"text-emerald-600"}`}>');
    c = c.replace(/<button className="text-sm font-semibold text-blue-700 hover:underline flex items-center mt-auto">/g, 
        '<button className={`text-sm font-bold hover:underline flex items-center mt-auto ${idx===0?"text-rose-600":idx===1?"text-amber-600":"text-emerald-600"}`}>');

    // 6. Upcoming Webinars
    c = c.replace(/\{UPCOMING_WEBINARS\.map\(\(webinar\) => \(/g, '{UPCOMING_WEBINARS.map((webinar, idx) => (');
    
    // Webinar card
    c = c.replace(/className="bg-white border border-slate-100 p-6 flex flex-col md:flex-row items-center gap-8 hover:border-blue-700 transition-colors"/g, 
        'className={`bg-white border shadow-sm p-6 flex flex-col md:flex-row items-center gap-8 rounded-2xl transition-all duration-300 hover:shadow-md transform hover:-translate-y-1 ${idx%2===0?"hover:border-blue-400":"hover:border-purple-400"}`}')

    // Date badge
    c = c.replace(/<div className="flex-shrink-0 w-24 h-24 bg-white flex flex-col items-center justify-center border border-slate-100">/g, 
        '<div className={`flex-shrink-0 w-24 h-24 flex flex-col items-center justify-center border rounded-xl ${idx%2===0?"bg-blue-50 border-blue-100":"bg-purple-50 border-purple-100"}`}>');
        
    c = c.replace(/<span className="text-blue-700 font-semibold text-sm uppercase">/g, 
        '<span className={`font-bold text-sm uppercase ${idx%2===0?"text-blue-600":"text-purple-600"}`}>');
        
    // Register button
    c = c.replace(/<button className="w-full md:w-auto px-8 py-3 bg-blue-700 hover:bg-blue-800 text-white font-semibold transition-colors">/g, 
        '<button className={`w-full md:w-auto px-8 py-3 text-white font-bold rounded-xl shadow-md transition-all hover:scale-105 ${idx%2===0?"bg-gradient-to-r from-blue-500 to-indigo-500":"bg-gradient-to-r from-purple-500 to-fuchsia-500"}`}>');

    // 7. Resource Stats Footer
    c = c.replace(/className="py-16 bg-blue-700 text-white"/g, 
        'className="py-16 bg-gradient-to-r from-violet-600 via-fuchsia-600 to-pink-500 text-white"');
    c = c.replace(/text-blue-200/g, 'text-fuchsia-100');

    // Additional minor fixes
    // Top right browse all collections button
    c = c.replace(/<button className="px-6 py-2 bg-white border border-slate-200 text-slate-700 hover:border-blue-700 hover:text-blue-700 font-semibold transition-colors flex items-center">/g, 
        '<button className="px-6 py-2 bg-white border-2 border-slate-200 text-slate-700 hover:border-purple-500 hover:text-purple-600 font-bold rounded-full transition-all flex items-center">');

    fs.writeFileSync(file, c);
    console.log("Applied Multi-Colored Vibrant Theme to Research Page!");
} else {
    console.log("File not found!");
}
