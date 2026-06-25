const fs = require('fs');
const filePath = 'src/app/admin/[[...slug]]/page.tsx';
let c = fs.readFileSync(filePath, 'utf8');

const headerHtml = `
        {/* Top Action Bar */}
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30 shadow-sm print:hidden">
          <div className="flex items-center gap-4">
            <button onClick={() => router.back()} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-700 transition-colors">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Go Back
            </button>
          </div>
          <button onClick={() => window.location.reload()} className="flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-blue-700 transition-colors">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/></svg>
            Refresh Data
          </button>
        </div>
`;

if (!c.includes('Refresh Data')) {
  // Let's find <main className="flex-1 overflow-y-auto"> or similar
  // And put the header inside the main tag, right at the top.
  const mainRegex = /(<main[^>]*>)/;
  c = c.replace(mainRegex, "$1\n" + headerHtml);
  fs.writeFileSync(filePath, c, 'utf8');
  console.log('Added top navigation bar successfully');
} else {
  console.log('Top navigation bar already exists');
}
