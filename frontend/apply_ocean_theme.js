const fs = require('fs');
const path = require('path');

const dir = 'src/components/home';
const updateFile = (filename, replacer) => {
    const file = path.join(dir, filename);
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        content = replacer(content);
        fs.writeFileSync(file, content);
    }
};

// Deep Ocean & Sunrise Theme (Blue, Indigo, Rose, Orange)

// 1. Hero.tsx
updateFile('Hero.tsx', (c) => {
    // Heading
    c = c.replace(/text-emerald-900 drop-shadow-sm/g, 'text-transparent bg-clip-text bg-gradient-to-r from-blue-700 via-indigo-600 to-rose-500 drop-shadow-sm');
    // Primary Button
    c = c.replace(/bg-emerald-700 text-white hover:bg-emerald-800 shadow-md/g, 'bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-lg shadow-indigo-500/30 transition-all transform hover:-translate-y-1');
    // Badge
    c = c.replace(/bg-emerald-50 text-emerald-700 border border-emerald-200/g, 'bg-rose-50 text-rose-600 border border-rose-200 shadow-sm');
    // Box
    c = c.replace(/border-t-4 border-emerald-600/g, 'border-t-4 border-indigo-500 shadow-xl shadow-blue-900/5 rounded-2xl');
    return c;
});

// 2. AcademicPrograms.tsx
updateFile('AcademicPrograms.tsx', (c) => {
    // Background and cards
    c = c.replace(/bg-stone-50/g, 'bg-slate-50');
    // Card Hover
    c = c.replace(/border-gray-200 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-xl hover:border-emerald-600/g, 'border-slate-200/60 bg-white/80 backdrop-blur-sm transition-all duration-500 transform hover:-translate-y-2 hover:shadow-[0_20px_40px_-15px_rgba(79,70,229,0.15)] hover:border-indigo-400 rounded-2xl');
    // Tags
    c = c.replace(/text-emerald-700 bg-emerald-50 border border-emerald-100/g, 'text-orange-600 bg-orange-50 border border-orange-100');
    // Links
    c = c.replace(/text-emerald-700/g, 'text-indigo-600');
    return c;
});

// 3. WhyChooseUs.tsx
updateFile('WhyChooseUs.tsx', (c) => {
    c = c.replace(/bg-slate-900/g, 'bg-slate-950'); // Keep deep dark for contrast
    // Feature Icons
    c = c.replace(/bg-emerald-900\/50 p-3 rounded-xl border border-emerald-800 text-emerald-400/g, 'bg-gradient-to-br from-indigo-500/20 to-blue-500/10 p-3 rounded-2xl border border-indigo-500/30 text-indigo-400 shadow-[0_0_15px_rgba(99,102,241,0.2)]');
    // Back glow
    c = c.replace(/bg-emerald-500\/10/g, 'bg-indigo-500/20');
    return c;
});

// 4. FacultySpotlight.tsx
updateFile('FacultySpotlight.tsx', (c) => {
    // Badge
    c = c.replace(/text-amber-700 bg-amber-50 border border-amber-200/g, 'text-indigo-700 bg-indigo-50 border border-indigo-200');
    // Card Hover 1
    c = c.replace(/hover:border-emerald-500 hover:shadow-lg/g, 'hover:border-blue-400 hover:shadow-[0_15px_30px_-10px_rgba(59,130,246,0.3)] rounded-2xl');
    // Card Hover 2
    c = c.replace(/hover:border-amber-500 hover:shadow-lg/g, 'hover:border-rose-400 hover:shadow-[0_15px_30px_-10px_rgba(244,63,94,0.3)] rounded-2xl');
    // Roles
    c = c.replace(/text-emerald-600/g, 'text-blue-600');
    c = c.replace(/text-amber-600/g, 'text-rose-500');
    // Links
    c = c.replace(/hover:text-emerald-700/g, 'hover:text-blue-700');
    return c;
});

// 5. Testimonials.tsx
updateFile('Testimonials.tsx', (c) => {
    c = c.replace(/bg-emerald-950/g, 'bg-indigo-950 relative overflow-hidden');
    c = c.replace(/border-emerald-900/g, 'border-indigo-900');
    c = c.replace(/bg-emerald-900/g, 'bg-indigo-900/40 backdrop-blur-md rounded-2xl');
    c = c.replace(/border-emerald-800/g, 'border-indigo-700/50 hover:bg-indigo-800/50 transition-colors');
    c = c.replace(/text-emerald-50/g, 'text-white');
    c = c.replace(/text-amber-400/g, 'text-orange-400');
    c = c.replace(/text-emerald-100/g, 'text-indigo-200');
    // Add decorative orbs
    c = c.replace(/<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">/g, '<div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full blur-[100px] pointer-events-none"></div><div className="absolute bottom-0 right-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-[100px] pointer-events-none"></div><div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">');
    return c;
});

// 6. CTA.tsx
updateFile('CTA.tsx', (c) => {
    // Huge beautiful gradient background
    c = c.replace(/bg-emerald-900/g, 'bg-gradient-to-br from-indigo-900 via-slate-900 to-blue-900');
    c = c.replace(/border-emerald-800/g, 'border-indigo-800/50');
    c = c.replace(/bg-amber-500 text-slate-900 hover:bg-amber-400/g, 'bg-gradient-to-r from-orange-400 to-rose-500 text-white hover:from-orange-500 hover:to-rose-600 rounded-full px-8 py-4');
    c = c.replace(/from-emerald-800\/50/g, 'from-indigo-500/20');
    c = c.replace(/text-emerald-100/g, 'text-indigo-200');
    return c;
});

// 7. Islam360Resources.tsx
updateFile('Islam360Resources.tsx', (c) => {
    c = c.replace(/text-emerald-700 bg-emerald-50 border border-emerald-200/g, 'text-indigo-700 bg-indigo-50 border border-indigo-200');
    c = c.replace(/bg-emerald-700 text-white hover:bg-emerald-800 shadow-md/g, 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-lg hover:shadow-indigo-500/30 transition-all rounded-full');
    c = c.replace(/border-t-4 border-emerald-600/g, 'border-t-0 border border-slate-200 rounded-3xl bg-gradient-to-b from-white to-indigo-50/50');
    c = c.replace(/bg-emerald-50 border border-emerald-100 shadow-inner/g, 'bg-white border border-indigo-100 shadow-[0_10px_30px_rgba(79,70,229,0.15)] rounded-2xl');
    // Icons
    c = c.replace(/shadow-sm/g, 'shadow-sm rounded-xl');
    return c;
});

console.log("Applied Deep Ocean & Sunrise Theme!");
