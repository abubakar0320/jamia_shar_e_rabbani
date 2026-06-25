const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, 'src/app/admin');
const oldPagePath = path.join(adminDir, 'page.tsx');
const slugDir = path.join(adminDir, '[[...slug]]');
const newPagePath = path.join(slugDir, 'page.tsx');

// Create directory
if (!fs.existsSync(slugDir)) {
  fs.mkdirSync(slugDir, { recursive: true });
}

// Move file
if (fs.existsSync(oldPagePath)) {
  fs.renameSync(oldPagePath, newPagePath);
}

// Read content
let content = fs.readFileSync(newPagePath, 'utf8');

// 1. Inject hooks
if (!content.includes('usePathname')) {
  content = content.replace(
    "import { useSearchParams } from 'next/navigation';", 
    "import { useSearchParams, usePathname, useRouter } from 'next/navigation';"
  );
  if (!content.includes('usePathname')) {
    // Try catching next/navigation if it's somewhere else
    if (content.includes("from 'next/navigation'")) {
       content = content.replace("from 'next/navigation'", ", usePathname, useRouter } from 'next/navigation'");
       content = content.replace("}, usePathname", "} usePathname"); // cleanup if needed
    } else {
       // Just insert it at the top after 'use client';
       content = content.replace("'use client';", "'use client';\nimport { usePathname, useRouter } from 'next/navigation';");
    }
  }
}

// 2. Replace activeTab state with usePathname
content = content.replace(
  "const [activeTab, setActiveTab] = useState<string>('overview');",
  "const pathname = usePathname();\n  const router = useRouter();\n  const activeTab = pathname.split('/')[2] || 'overview';"
);

// 3. Replace setActiveTab(tab) with router.push
content = content.replace(/setActiveTab\(/g, "router.push('/admin/' + ");
// Fix the closing brackets: router.push('/admin/' + item.id) instead of router.push('/admin/' + item.id) ) -> this is tricky.

// Let's do it safer.
// First, revert the global replace
content = content.replace(/router\.push\('\/admin\/' \+ /g, "setActiveTab(");

// Safer replace:
content = content.replace(/onClick=\{\(\) => setActiveTab\((.*?)\)\}/g, "onClick={() => router.push('/admin/' + $1)}");

fs.writeFileSync(newPagePath, content, 'utf8');
console.log('Successfully refactored admin to use individual links.');
