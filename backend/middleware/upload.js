const multer = require('multer');
const path = require('path');
const fs = require('fs');

const isVercel = Boolean(process.env.VERCEL);
const baseUploadDir = isVercel ? path.join('/tmp', 'uploads') : path.join(__dirname, '../uploads');

function safeEnsureDir(dirPath) {
  try {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  } catch (err) {
    console.warn(`[Upload] Could not create directory ${dirPath}:`, err.message);
  }
}

// Ensure upload directories exist safely without throwing on read-only environments
const uploadDirs = ['admissions', 'internships', 'receipts', 'general'];
uploadDirs.forEach(dir => {
  safeEnsureDir(path.join(baseUploadDir, dir));
});

// Configure Multer Disk Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const subfolder = req.query.folder || req.body.folder || 'general';
    const targetDir = path.join(baseUploadDir, subfolder);
    safeEnsureDir(targetDir);
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

  // On Vercel without Cloudinary configured, keep base64 data URI so images persist safely in DB
  if (isVercel && !process.env.CLOUDINARY_CLOUD_NAME) {
    return base64String;
  }

  // Check if string is a data URI
  const matches = base64String.match(/^data:([^;]+);base64,([\s\S]+)$/);
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
  const targetDir = path.join(baseUploadDir, subfolder);
  safeEnsureDir(targetDir);

  const filePath = path.join(targetDir, filename);
  try {
    fs.writeFileSync(filePath, Buffer.from(base64Data, 'base64'));
    return `/uploads/${subfolder}/${filename}`;
  } catch (err) {
    console.warn('[Upload] Filesystem write failed, falling back to base64 string:', err.message);
    return base64String;
  }
}

module.exports = {
  upload,
  saveBase64ToFile
};
