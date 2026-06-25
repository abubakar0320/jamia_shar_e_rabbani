const fs = require('fs');

const pagePath = 'frontend/src/app/admin/[[...slug]]/page.tsx';
let pageContent = fs.readFileSync(pagePath, 'utf8');

// 1. REVERT THE BAD REPLACEMENTS
// Revert line 564 bad AdminGuard
pageContent = pageContent.replace(
  "      </form>\\n    </AdminGuard>\\n  );\\n }",
  "      </form>\\n    </div>\\n  );\\n }"
);
// Hard replace just in case:
pageContent = pageContent.replace(
  "</form>\\n    </AdminGuard>",
  "</form>\\n    </div>"
);

// 2. CLOSE AdminGuard AFTER THE COMPONENT
// The component AdminDashboard ends before ChallanBuilderModal
const dashboardEndStr = `      }\n      \`}</style>\n    </div>`;
if (pageContent.includes(dashboardEndStr) && !pageContent.includes(`    </AdminGuard>\n  );\n}\n\nfunction ChallanBuilderModal`)) {
  pageContent = pageContent.replace(
    /      \}\n      `\}<\/style>\n    <\/div>\n  \);\n\}\n\nfunction ChallanBuilderModal/g,
    `      }\n      \`}</style>\n    </div>\n    </AdminGuard>\n  );\n}\n\nfunction ChallanBuilderModal`
  );
}

fs.writeFileSync(pagePath, pageContent, 'utf8');
console.log('Fixed AdminGuard boundaries');
