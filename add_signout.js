const fs = require('fs');

const pagePath = 'frontend/src/app/admin/[[...slug]]/page.tsx';
let pageContent = fs.readFileSync(pagePath, 'utf8');

if (!pageContent.includes('LogOut')) {
  pageContent = pageContent.replace(
    "Wallet,",
    "Wallet,\n  LogOut,"
  );
}

if (!pageContent.includes('localStorage.removeItem(\'admin_token\')')) {
  pageContent = pageContent.replace(
    "          </div>\n        </div>\n      </motion.aside>",
    `          </div>\n          <div className="p-6 border-t border-slate-800 shrink-0 mt-auto">\n            <button \n              onClick={() => {\n                localStorage.removeItem('admin_token');\n                localStorage.removeItem('admin_user');\n                window.location.reload();\n              }}\n              className="w-full flex items-center justify-center gap-3 px-4 py-3 text-rose-400 border border-rose-900 hover:text-white hover:bg-rose-600 font-bold text-xs rounded-sm transition-colors uppercase tracking-widest"\n            >\n              <LogOut size={16} /> Sign Out\n            </button>\n          </div>\n        </div>\n      </motion.aside>`
  );
}

fs.writeFileSync(pagePath, pageContent, 'utf8');
console.log('Added SignOut button successfully.');
