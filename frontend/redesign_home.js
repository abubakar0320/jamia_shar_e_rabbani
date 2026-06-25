const fs = require('fs');
const path = require('path');

const dir = 'src/components/home';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.tsx'));

const colorMap = {
    // Replace blues with rich emeralds/teals
    'bg-blue-700': 'bg-emerald-700',
    'bg-blue-800': 'bg-emerald-800',
    'text-blue-700': 'text-emerald-700',
    'text-blue-600': 'text-emerald-600',
    'border-blue-700': 'border-emerald-700',
    'border-blue-200': 'border-emerald-200',
    'hover:bg-blue-800': 'hover:bg-emerald-800',
    'hover:text-blue-700': 'hover:text-emerald-700',
    'hover:border-blue-700': 'hover:border-emerald-700',
    
    // Replace standard grays with slate for a premium feel
    'bg-gray-50': 'bg-slate-50',
    'bg-gray-100': 'bg-slate-100',
    'bg-gray-200': 'bg-slate-200',
    'bg-gray-800': 'bg-slate-800',
    'bg-gray-900': 'bg-slate-900',
    'text-gray-50': 'text-slate-50',
    'text-gray-100': 'text-slate-100',
    'text-gray-200': 'text-slate-200',
    'text-gray-500': 'text-slate-500',
    'text-gray-600': 'text-slate-600',
    'text-gray-700': 'text-slate-700',
    'text-gray-800': 'text-slate-800',
    'text-gray-900': 'text-slate-900',
    'border-gray-100': 'border-slate-100',
    'border-gray-200': 'border-slate-200',
    'border-gray-300': 'border-slate-300',
    'border-gray-800': 'border-slate-800',
    
    // Convert basic solid backgrounds to more engaging colors
    'bg-white p-8 md:p-12 max-w-lg shadow-sm': 'bg-white/95 backdrop-blur-md p-8 md:p-12 max-w-lg shadow-xl border-t-4 border-emerald-600', // Hero Glassmorphism
    'bg-yellow-400 text-black': 'bg-amber-500 text-white', // Hero badge
};

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Apply standard color replacements
    for (const [search, replace] of Object.entries(colorMap)) {
        // Use split/join for global replace without regex issues
        content = content.split(search).join(replace);
    }

    // Specific component redesigns for "WOW" factor
    if (file === 'Stats.tsx') {
        // Dark rich green for stats
        content = content.replace('bg-slate-100 py-12 border-b border-slate-200', 'bg-emerald-900 py-16 text-white relative overflow-hidden');
        content = content.replace(/text-slate-900/g, 'text-white');
        content = content.replace(/text-slate-600/g, 'text-emerald-100');
        content = content.replace(/text-emerald-700/g, 'text-amber-400'); // Gold icons on dark green
        
        // Add a decorative background element to Stats
        if (!content.includes('bg-emerald-800/50 rounded-full blur-3xl')) {
            content = content.replace(
                '<div className="max-w-7xl', 
                '<div className="absolute top-0 left-0 w-64 h-64 bg-emerald-800/50 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>\n        <div className="absolute bottom-0 right-0 w-64 h-64 bg-teal-800/50 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>\n        <div className="max-w-7xl relative z-10'
            );
        }
    }

    if (file === 'WhyChooseUs.tsx') {
        // Warm subtle gradient for why choose us
        content = content.replace('bg-white py-16', 'bg-gradient-to-br from-amber-50 to-orange-50/30 py-20');
        // If it had a dark version
        content = content.replace('bg-slate-900 text-white py-16', 'bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 text-white py-20');
    }

    if (file === 'AcademicPrograms.tsx') {
        content = content.replace('bg-slate-50 py-16', 'bg-slate-50 py-20 relative');
        content = content.replace('border border-slate-200', 'border border-slate-200 hover:border-emerald-500 hover:shadow-2xl hover:shadow-emerald-900/10 transition-all duration-300 transform hover:-translate-y-1');
    }

    if (file === 'Testimonials.tsx') {
        content = content.replace('bg-slate-50 py-16', 'bg-teal-900 text-white py-20');
        content = content.replace(/text-slate-900/g, 'text-white');
        content = content.replace(/text-slate-600/g, 'text-teal-100');
        content = content.replace(/text-slate-500/g, 'text-teal-200');
        content = content.replace(/bg-white/g, 'bg-teal-800/50 backdrop-blur-sm border-teal-700');
    }

    fs.writeFileSync(filePath, content);
});

console.log('Homepage colors and aesthetics successfully updated.');
