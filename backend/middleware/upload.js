const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Ensure upload directories exist
const uploadDirs = ['admissions', 'internships', 'receipts', 'general'];
uploadDirs.forEach(dir => {
  const dirPath = path.join(__dirname, '../uploads', dir);
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
});

// Configure Multer Disk Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const subfolder = req.query.folder || req.body.folder || 'general';
    const targetDir = path.join(__dirname, '../uploads', subfolder);
    if (!fs.existsSync(targetDir)) {
      fs.mkdirSync(targetDir, { recursive: true });
    }
    cb(null, targetDir);
  },
  filename: function (req, file, cb) {
    const cleanExt = path.extname(file.originalname).toLowerCase() || '.jpg';
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1E9)}`;
    cb(null, `file-${uniqueSuffix}${cleanExt}`);
  }
});

// Allowed file types: Images & PDF documents only
const fileFilter = (req, file, cb) => {
  const allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif', 'application/pdf'];
  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error('Invalid file type. Only JPEG, PNG, WEBP, and PDF documents are allowed.'), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: 10 * 1024 * 1024 // 10MB limit
  },
  fileFilter
});

/**
 * Utility: Convert Base64 string to a physical file on disk.
 * Returns the URL path (e.g. /uploads/admissions/photo_123.jpg)
 */
function saveBase64ToFile(base64String, subfolder = 'general', prefix = 'file') {
  if (!base64String || typeof base64String !== 'string') {
    return base64String;
  }

  // If already a URL or path, keep it
  if (base64String.startsWith('http://') || base64String.startsWith('https://') || base64String.startsWith('/uploads/')) {
    return base64String;
  }

  // Check if string is a data URI
  const matches = base64String.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return base64String;
  }

  const mimeType = matches[1];
  const base64Data = matches[2];

  let ext = '.jpg';
  if (mimeType === 'image/png') ext = '.png';
  else if (mimeType === 'image/webp') ext = '.webp';
  else if (mimeType === 'image/gif') ext = '.gif';
  else if (mimeType === 'application/pdf') ext = '.pdf';

  const filename = `${prefix}_${Date.now()}_${Math.round(Math.random() * 1E6)}${ext}`;
  const targetDir = path.join(__dirname, '../uploads', subfolder);
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }

  const filePath = path.join(targetDir, filename);
  try {
    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
    return `/uploads/${subfolder}/${filename}`;
  } catch (err) {
    console.error('Error saving base64 to file:', err);
    return base64String;
  }
}

module.exports = {
  upload,
  saveBase64ToFile
};
