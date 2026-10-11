const jwt = require('jsonwebtoken');

function requireAdminAuth(req, res, next) {
  try {
    let token = null;
    const authHeader = req.headers.authorization;

    if (authHeader && authHeader.startsWith('Bearer ')) {
      token = authHeader.split(' ')[1];
    } else if (req.query && req.query.token) {
      // Support download links like Excel / JSON backup with query token
      token = req.query.token;
    }

    if (!token) {
      return res.status(401).json({ 
        success: false, 
        error: 'Unauthorized: Authentication token is required.' 
      });
    }

    const secret = process.env.JWT_SECRET || 'jamia_sher_e_rabbani_secure_jwt_token_secret_key_2026_987654';
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ 
      success: false, 
      error: 'Unauthorized: Invalid or expired token. Please log in again.' 
    });
  }
}

module.exports = { requireAdminAuth };
