const rateLimit = require('express-rate-limit');

// 1. General API Rate Limiter (For all API routes)
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 600, // limit each IP to 600 requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many requests from this IP, please try again after 15 minutes.'
  }
});

// 2. Strict Auth Limiter (Prevents Brute Force Password Guessing on Admin Login)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'Too many login attempts from this IP. For security reasons, please try again in 15 minutes.'
  }
});

// 3. Form Submission Limiter (Prevents Spam Admissions, Internships, Payment Slips)
const submissionLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 60, // Limit each IP to 60 form submissions per 15 minutes
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    success: false,
    error: 'You have submitted several applications recently. Please wait a few moments before trying again.'
  }
});

// 4. NoSQL / MongoDB Query Injection Sanitizer
// Strips out keys starting with $ or containing dots in user input
function sanitizeInput(req, res, next) {
  function cleanObject(obj) {
    if (!obj || typeof obj !== 'object') return obj;
    for (const key of Object.keys(obj)) {
      if (key.startsWith('$') || key.includes('.')) {
        delete obj[key];
      } else if (typeof obj[key] === 'object') {
        cleanObject(obj[key]);
      }
    }
    return obj;
  }

  if (req.body) cleanObject(req.body);
  if (req.query) cleanObject(req.query);
  if (req.params) cleanObject(req.params);

  next();
}

module.exports = {
  apiLimiter,
  authLimiter,
  submissionLimiter,
  sanitizeInput
};
