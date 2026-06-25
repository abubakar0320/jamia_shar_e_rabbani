const fs = require('fs');
const pagePath = 'frontend/src/app/admin/[[...slug]]/page.tsx';
let pageContent = fs.readFileSync(pagePath, 'utf8');

// There's a bad </AdminGuard> around line 567 in renderAdmissionsModule
// It looks like:
//        </div>
//      </form>
//    </AdminGuard>
//  );

pageContent = pageContent.replace(
  "      </form>\n    </AdminGuard>\n  );\n }",
  "      </form>\n    </div>\n  );\n }"
);

// If it has </AdminGuard> but not </form>
pageContent = pageContent.replace(
  "      </form>\r\n    </AdminGuard>\r\n  );\r\n }",
  "      </form>\r\n    </div>\r\n  );\r\n }"
);

fs.writeFileSync(pagePath, pageContent, 'utf8');
console.log('Fixed bad AdminGuard tag');
