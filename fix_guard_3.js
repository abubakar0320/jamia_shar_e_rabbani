const fs = require('fs');
const pagePath = 'frontend/src/app/admin/[[...slug]]/page.tsx';
let pageContent = fs.readFileSync(pagePath, 'utf8');

// 1. Remove bad </AdminGuard> from line 565 if it was added
pageContent = pageContent.replace(
  "      </form>\n    </div>\n    </AdminGuard>\n  );\n }",
  "      </form>\n    </div>\n  );\n }"
);

// 2. Add </AdminGuard> at the end of AdminDashboard
pageContent = pageContent.replace(
  /      \}\n      `\}<\/style>\n    <\/div>\n  \);\n\}\n\nfunction ChallanBuilderModal/,
  `      }\n      \`}</style>\n    </div>\n    </AdminGuard>\n  );\n}\n\nfunction ChallanBuilderModal`
);

fs.writeFileSync(pagePath, pageContent, 'utf8');
console.log('Fixed syntax error!');
