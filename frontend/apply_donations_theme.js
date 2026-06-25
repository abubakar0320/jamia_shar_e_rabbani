const fs = require('fs');
const path = require('path');

const file = 'src/app/donations/page.tsx';

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

    // 1. Hero Title & Badge
    c = c.replace(/<h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-slate-900 mb-6 leading-tight">/g, 
        '<h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-500 to-blue-500 drop-shadow-sm mb-6 leading-tight">');
        
    c = c.replace(/<div className="inline-block bg-white border border-slate-100 text-slate-700 text-xs font-semibold px-4 py-1\.5 mb-6 uppercase tracking-wide">/g, 
        '<div className="inline-block bg-emerald-50 border border-emerald-200 text-emerald-600 rounded-full text-xs font-bold px-4 py-1.5 mb-6 uppercase tracking-wide shadow-sm">');
        
    // Quick Donate Button
    c = c.replace(/className="inline-flex items-center gap-2 px-8 py-3 bg-blue-700 text-white font-semibold transition-colors hover:bg-blue-800 border border-blue-700"/g, 
        'className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-bold rounded-full shadow-lg shadow-emerald-500/30 transition-all transform hover:-translate-y-1"');

    // 2. Donation Grid
    c = c.replace(/className="flex flex-col group cursor-pointer bg-white border border-slate-100 shadow-sm hover:shadow-md transition-shadow h-full"/g, 
        'className={`flex flex-col group cursor-pointer bg-white border shadow-sm transition-all duration-300 transform hover:-translate-y-2 h-full rounded-2xl overflow-hidden ${i%4===0?"border-emerald-100 hover:border-emerald-400 hover:shadow-[0_10px_30px_rgba(16,185,129,0.2)]":i%4===1?"border-amber-100 hover:border-amber-400 hover:shadow-[0_10px_30px_rgba(245,158,11,0.2)]":i%4===2?"border-blue-100 hover:border-blue-400 hover:shadow-[0_10px_30px_rgba(59,130,246,0.2)]":"border-purple-100 hover:border-purple-400 hover:shadow-[0_10px_30px_rgba(168,85,247,0.2)]"}`}')

    c = c.replace(/<h3 className="text-xl font-semibold mb-3 text-slate-900 group-hover:text-blue-700 transition-colors">/g, 
        '<h3 className={`text-xl font-bold mb-3 transition-colors ${i%4===0?"group-hover:text-emerald-600":i%4===1?"group-hover:text-amber-600":i%4===2?"group-hover:text-blue-600":"group-hover:text-purple-600"}`}>');
        
    c = c.replace(/<span className="text-blue-700 font-semibold text-sm flex items-center hover:underline">/g, 
        '<span className={`font-bold text-sm flex items-center hover:underline ${i%4===0?"text-emerald-600":i%4===1?"text-amber-600":i%4===2?"text-blue-600":"text-purple-600"}`}>');
        
    c = c.replace(/<div className="text-slate-400 group-hover:text-blue-700 transition-colors">/g, 
        '<div className={`transition-colors ${i%4===0?"text-slate-400 group-hover:text-emerald-500":i%4===1?"text-slate-400 group-hover:text-amber-500":i%4===2?"text-slate-400 group-hover:text-blue-500":"text-slate-400 group-hover:text-purple-500"}`}>');

    // 3. Bank Details Section
    c = c.replace(/<div className="bg-white flex flex-col lg:flex-row items-stretch border border-slate-100 shadow-sm">/g, 
        '<div className="bg-white flex flex-col lg:flex-row items-stretch border border-slate-100 shadow-xl rounded-3xl overflow-hidden">');
        
    // Direct Bank Transfer badge
    c = c.replace(/<div className="inline-flex items-center gap-2 bg-slate-50 border border-slate-100 text-slate-700 text-xs font-semibold px-4 py-1\.5 mb-6 uppercase tracking-wide">/g, 
        '<div className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-full shadow-sm text-xs font-bold px-4 py-1.5 mb-6 uppercase tracking-wide">');
        
    // Bank Names
    c = c.replace(/<div className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-4 flex items-center gap-2">/g, 
        '<div className="text-xs font-bold text-emerald-600 uppercase tracking-wide mb-4 flex items-center gap-2">');
        
    // Inner boxes
    c = c.replace(/className="p-6 bg-white border border-slate-100 shadow-sm"/g, 'className="p-6 bg-white border border-slate-100 shadow-sm rounded-2xl"');
    c = c.replace(/className="p-6 bg-white border border-slate-100 text-center hover:border-blue-700 transition-colors"/g, 'className="p-6 bg-white border border-slate-100 text-center hover:border-emerald-400 transition-colors rounded-xl shadow-sm hover:shadow-md"');
    c = c.replace(/className="p-6 bg-slate-50 border border-slate-100"/g, 'className="p-6 bg-slate-50 border border-slate-100 rounded-2xl"');
    
    // Copy button
    c = c.replace(/className="text-slate-700 text-xs font-semibold hover:bg-slate-50 px-4 py-2 border border-slate-200 transition-colors uppercase tracking-wide whitespace-nowrap"/g, 
        'className="text-emerald-700 text-xs font-bold hover:bg-emerald-50 px-4 py-2 border border-emerald-200 rounded-full shadow-sm transition-colors uppercase tracking-wide whitespace-nowrap"');
    
    // Transparency panel
    c = c.replace(/<div className="flex-1 p-8 lg:p-12 bg-blue-700 text-white flex flex-col justify-center">/g, 
        '<div className="flex-1 p-8 lg:p-12 bg-gradient-to-br from-teal-700 via-emerald-800 to-slate-900 text-white flex flex-col justify-center relative overflow-hidden">');
    c = c.replace(/<div className="w-12 h-12 bg-blue-800 flex items-center justify-center shrink-0">/g, 
        '<div className="w-12 h-12 bg-emerald-700/50 rounded-xl flex items-center justify-center shrink-0 border border-emerald-600/30">');
    c = c.replace(/text-blue-200/g, 'text-emerald-200');
    c = c.replace(/text-blue-100/g, 'text-emerald-100');
    
    // 4. Why Support Us / Impact
    c = c.replace(/<div className="inline-block bg-slate-50 border border-slate-100 text-slate-700 text-xs font-semibold px-4 py-1\.5 mb-4 uppercase tracking-wide">/g, 
        '<div className="inline-block bg-teal-50 border border-teal-100 text-teal-700 rounded-full shadow-sm text-xs font-bold px-4 py-1.5 mb-4 uppercase tracking-wide">');

    // Instead of mapping here, I'll replace the individual static cards manually
    c = c.replace(/<motion\.div \n\s*initial=\{\{ opacity: 0, y: 20 \}\}\n\s*whileInView=\{\{ opacity: 1, y: 0 \}\}\n\s*viewport=\{\{ once: true \}\}\n\s*className="bg-white p-8 border border-slate-100 flex flex-col hover:border-blue-700 transition-colors"\n\s*>/g, 
        `<motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="bg-white p-8 border border-slate-100 flex flex-col transition-all duration-300 transform hover:-translate-y-2 rounded-2xl shadow-sm border-t-4 border-t-emerald-400 hover:shadow-[0_10px_30px_rgba(16,185,129,0.15)]"
              >`);
              
    c = c.replace(/<motion\.div \n\s*initial=\{\{ opacity: 0, y: 20 \}\}\n\s*whileInView=\{\{ opacity: 1, y: 0 \}\}\n\s*viewport=\{\{ once: true \}\}\n\s*transition=\{\{ delay: 0\.1 \}\}\n\s*className="bg-white p-8 border border-slate-100 flex flex-col hover:border-blue-700 transition-colors"\n\s*>/g, 
        `<motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.1 }}
                 className="bg-white p-8 border border-slate-100 flex flex-col transition-all duration-300 transform hover:-translate-y-2 rounded-2xl shadow-sm border-t-4 border-t-amber-400 hover:shadow-[0_10px_30px_rgba(245,158,11,0.15)]"
              >`);
              
    c = c.replace(/<motion\.div \n\s*initial=\{\{ opacity: 0, y: 20 \}\}\n\s*whileInView=\{\{ opacity: 1, y: 0 \}\}\n\s*viewport=\{\{ once: true \}\}\n\s*transition=\{\{ delay: 0\.2 \}\}\n\s*className="bg-white p-8 border border-slate-100 flex flex-col hover:border-blue-700 transition-colors"\n\s*>/g, 
        `<motion.div 
                 initial={{ opacity: 0, y: 20 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 transition={{ delay: 0.2 }}
                 className="bg-white p-8 border border-slate-100 flex flex-col transition-all duration-300 transform hover:-translate-y-2 rounded-2xl shadow-sm border-t-4 border-t-blue-400 hover:shadow-[0_10px_30px_rgba(59,130,246,0.15)]"
              >`);

    // Icons inside the 3 cards (currently all text-blue-700)
    // We can just find the first 3 text-blue-700 mb-6 and replace them individually:
    let occurrences = 0;
    c = c.replace(/<div className="text-blue-700 mb-6">/g, (match) => {
        occurrences++;
        if (occurrences === 1) return '<div className="text-emerald-500 mb-6 bg-emerald-50 w-16 h-16 rounded-xl flex items-center justify-center">';
        if (occurrences === 2) return '<div className="text-amber-500 mb-6 bg-amber-50 w-16 h-16 rounded-xl flex items-center justify-center">';
        if (occurrences === 3) return '<div className="text-blue-500 mb-6 bg-blue-50 w-16 h-16 rounded-xl flex items-center justify-center">';
        return match;
    });

    // 5. FAQ/SUPPORT SECTION
    c = c.replace(/<div className="max-w-4xl mx-auto bg-white border border-slate-100 p-10 md:p-16 text-center">/g, 
        '<div className="max-w-4xl mx-auto bg-white border border-slate-100 p-10 md:p-16 text-center rounded-3xl shadow-xl shadow-teal-500/5">');
        
    c = c.replace(/<Link href="\/contact" className="px-8 py-3 bg-blue-700 text-white font-semibold hover:bg-blue-800 transition-colors border border-blue-700">/g, 
        '<Link href="/contact" className="px-8 py-3 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-bold rounded-full shadow-md transition-all transform hover:-translate-y-1">');
        
    c = c.replace(/<Link href="\/about" className="px-8 py-3 bg-white text-slate-700 font-semibold border border-slate-200 hover:bg-slate-50 transition-colors">/g, 
        '<Link href="/about" className="px-8 py-3 bg-white text-slate-700 font-bold border-2 border-slate-200 hover:border-teal-400 hover:text-teal-600 rounded-full transition-all shadow-sm hover:shadow-md">');

    fs.writeFileSync(file, c);
    console.log("Applied Multi-Colored Vibrant Theme to Donations Page!");
} else {
    console.log("File not found!");
}
