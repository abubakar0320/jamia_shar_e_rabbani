const fs = require('fs');
let c = fs.readFileSync('src/app/admin/[[...slug]]/page.tsx', 'utf8');
let changed = false;
if (c.includes('setActiveTab')) {
  c = c.replace(/setActiveTab\((.*?)\)/g, "router.push('/admin/' + $1)");
  changed = true;
}

// Since handleNavigate might also just be router.push now, we can also fix that if needed, 
// but handleNavigate was likely defined as: const handleNavigate = (tab) => setActiveTab(tab);
// Let's check handleNavigate.
if (c.includes('handleNavigate = (tab: string) => setActiveTab(tab)')) {
  c = c.replace(
    'const handleNavigate = (tab: string) => setActiveTab(tab)', 
    "const handleNavigate = (tab: string) => router.push('/admin/' + tab)"
  );
  changed = true;
}

if (changed) {
  fs.writeFileSync('src/app/admin/[[...slug]]/page.tsx', c, 'utf8');
  console.log('Fixed remaining setActiveTabs');
} else {
  console.log('No remaining setActiveTabs found');
}
