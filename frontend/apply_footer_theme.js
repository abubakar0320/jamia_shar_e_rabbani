const fs = require('fs');
const path = require('path');

const file = 'src/components/Footer.tsx';

if (fs.existsSync(file)) {
    let c = fs.readFileSync(file, 'utf8');

    // Make the main wrapper have a colorful top border
    c = c.replace(/<footer className="bg-slate-900 text-slate-300 font-sans mt-auto selection:bg-emerald-500\/30">/g, 
        '<footer className="bg-slate-900 text-slate-300 font-sans mt-auto selection:bg-purple-500/30 border-t-4 border-transparent" style={{ borderImage: "linear-gradient(to right, #f43f5e, #a855f7, #3b82f6) 1" }}>');

    // Make the JAMIA text gradient
    c = c.replace(/<span className="text-xl md:text-2xl font-black text-white tracking-tighter leading-none group-hover:text-emerald-400 transition-colors">/g, 
        '<span className="text-xl md:text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-rose-500 via-purple-500 to-blue-500 tracking-tighter leading-none transition-all group-hover:brightness-125">');

    // The SHER-E-RABBANI text color
    c = c.replace(/<span className="text-\[9px\] md:text-\[10px\] font-bold text-emerald-500 tracking-\[0\.4em\] leading-tight mt-1 uppercase">/g, 
        '<span className="text-[9px] md:text-[10px] font-bold text-slate-400 tracking-[0.4em] leading-tight mt-1 uppercase">');

    // Social Icons multi-colored hovers
    // We can replace the `.map` over the icons to include `idx` and change the hover classes
    c = c.replace(/\{\[MessageCircle, Send, Video, Users\]\.map\(\(Icon, i\) => \(/g, 
        '{[MessageCircle, Send, Video, Users].map((Icon, i) => (');
    c = c.replace(/className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white hover:bg-emerald-600 hover:-translate-y-1 transition-all"/g, 
        'className={`w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-white transition-all transform hover:-translate-y-2 hover:shadow-lg ${i===0?"hover:bg-rose-500 hover:shadow-rose-500/50":i===1?"hover:bg-amber-500 hover:shadow-amber-500/50":i===2?"hover:bg-emerald-500 hover:shadow-emerald-500/50":"hover:bg-blue-500 hover:shadow-blue-500/50"}`}')

    // Links Grid
    // Map already has `(section, i)`
    c = c.replace(/<h4 className="text-xs font-black text-white uppercase tracking-widest">\{section\.title\}<\/h4>/g, 
        '<h4 className={`text-xs font-black uppercase tracking-widest ${i===0?"text-rose-400":i===1?"text-amber-400":i===2?"text-emerald-400":"text-blue-400"}`}>{section.title}</h4>');

    c = c.replace(/className="text-\[13px\] hover:text-emerald-400 hover:translate-x-1 transition-all inline-block"/g, 
        'className={`text-[13px] transition-all inline-block hover:translate-x-1 ${i===0?"hover:text-rose-400":i===1?"hover:text-amber-400":i===2?"hover:text-emerald-400":"hover:text-blue-400"}`}');

    // Language Button at bottom
    c = c.replace(/className="flex items-center gap-3 text-\[11px\] font-bold hover:text-white cursor-pointer group px-4 py-2 bg-slate-800 rounded-full transition-all"/g, 
        'className="flex items-center gap-3 text-[11px] font-bold hover:text-white cursor-pointer group px-4 py-2 bg-slate-800 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-600 rounded-full transition-all shadow-md"');
    c = c.replace(/<Globe size=\{14\} className="text-emerald-500" \/>/g, '<Globe size={14} className="text-purple-400 group-hover:text-white" />');

    fs.writeFileSync(file, c);
    console.log("Applied Multi-Colored Vibrant Theme to Footer Component!");
} else {
    console.log("File not found!");
}
