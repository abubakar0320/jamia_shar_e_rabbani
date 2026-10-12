const fs = require('fs');
const path = require('path');

const isVercel = Boolean(process.env.VERCEL);
const BACKUPS_DIR = isVercel ? path.join('/tmp', 'backups') : path.join(__dirname, '..', 'backups');
const MAX_SNAPSHOTS = 7;

// Ensure backups folder exists safely without throwing on read-only environments
try {
  if (!fs.existsSync(BACKUPS_DIR)) {
    fs.mkdirSync(BACKUPS_DIR, { recursive: true });
  }
} catch (err) {
  console.warn('[Backup] Unable to create backups directory:', err.message);
}

let lastBackupTime = null;

function getModels() {
  return {
    courses: require('../models/Course'),
    admissions: require('../models/Admission'),
    students: require('../models/Student'),
    challans: require('../models/Challan'),
    faculty: require('../models/Faculty'),
    news: require('../models/News'),
    feeStructures: require('../models/FeeStructure'),
    expenses: require('../models/Expense'),
    internshipCertificates: require('../models/InternshipCertificate'),
    internships: require('../models/Internship'),
    donations: require('../models/Donation'),
    customFormFields: require('../models/FormField'),
    admissionRequirements: require('../models/AdmissionRequirement'),
    systemSettings: require('../models/SystemSetting'),
    users: require('../models/User'),
  };
}

/**
 * Generates full backup payload across all collections
 */
async function generateBackupData() {
  const models = getModels();
  const keys = Object.keys(models);
  const data = {};
  const counts = {};

  for (const key of keys) {
    try {
      const records = await models[key].find().lean();
      data[key] = records;
      counts[key] = records.length;
    } catch (err) {
      console.error(`[Backup] Error reading collection ${key}:`, err.message);
      data[key] = [];
      counts[key] = 0;
    }
  }

  return {
    meta: {
      version: '2.0',
      timestamp: new Date().toISOString(),
      counts,
      totalRecords: Object.values(counts).reduce((a, b) => a + b, 0)
    },
    data
  };
}

/**
 * Clean old snapshots, keeping only the most recent MAX_SNAPSHOTS
 */
function cleanOldSnapshots() {
  try {
    const files = fs.readdirSync(BACKUPS_DIR)
      .filter(f => f.endsWith('.json') && !f.startsWith('pre_restore_safety_'))
      .map(f => {
        const fullPath = path.join(BACKUPS_DIR, f);
        return {
          filename: f,
          fullPath,
          ctime: fs.statSync(fullPath).ctime.getTime()
        };
      })
      .sort((a, b) => b.ctime - a.ctime);

    if (files.length > MAX_SNAPSHOTS) {
      const toDelete = files.slice(MAX_SNAPSHOTS);
      toDelete.forEach(file => {
        try {
          fs.unlinkSync(file.fullPath);
          console.log(`[Backup] Rotated old snapshot: ${file.filename}`);
        } catch (e) {
          console.error(`[Backup] Failed to remove ${file.filename}:`, e.message);
        }
      });
    }
  } catch (err) {
    console.error('[Backup] Snapshot cleanup error:', err.message);
  }
}

/**
 * Creates a physical JSON snapshot file on disk
 */
async function createSnapshotFile(prefix = 'jamia_backup') {
  try {
    const backupObj = await generateBackupData();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `${prefix}_${timestamp}.json`;
    const filePath = path.join(BACKUPS_DIR, filename);

    fs.writeFileSync(filePath, JSON.stringify(backupObj, null, 2), 'utf8');
    lastBackupTime = new Date().toISOString();

    if (!prefix.startsWith('pre_restore_safety')) {
      cleanOldSnapshots();
    }

    const stat = fs.statSync(filePath);
    return {
      success: true,
      filename,
      sizeBytes: stat.size,
      sizeFormatted: (stat.size / 1024).toFixed(1) + ' KB',
      createdAt: lastBackupTime,
      totalRecords: backupObj.meta.totalRecords,
      counts: backupObj.meta.counts
    };
  } catch (err) {
    console.error('[Backup] Create snapshot failed:', err);
    throw err;
  }
}

/**
 * Returns list of stored snapshots
 */
function listSnapshots() {
  try {
    const files = fs.readdirSync(BACKUPS_DIR)
      .filter(f => f.endsWith('.json'))
      .map(f => {
        const fullPath = path.join(BACKUPS_DIR, f);
        const stat = fs.statSync(fullPath);
        return {
          filename: f,
          sizeBytes: stat.size,
          sizeFormatted: (stat.size / 1024).toFixed(1) + ' KB',
          createdAt: stat.ctime.toISOString(),
          isSafetyBackup: f.startsWith('pre_restore_safety_')
        };
      })
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    return {
      lastBackupTime,
      snapshots: files,
      totalSnapshots: files.length
    };
  } catch (err) {
    console.error('[Backup] List snapshots error:', err.message);
    return { lastBackupTime, snapshots: [], totalSnapshots: 0 };
  }
}

/**
 * Safe Restore: Restores database collections from payload
 */
async function restoreData(payload, mode = 'replace') {
  const models = getModels();

  // Step 1: Create automatic pre-restore safety snapshot
  console.log('[Backup] Creating pre-restore safety snapshot...');
  const safetySnapshot = await createSnapshotFile('pre_restore_safety');

  // Step 2: Normalize payload (handle both v2.0 { meta, data } and v1.0 raw { courses, admissions, ... })
  const rawCollections = payload.data || payload;
  const restoredCounts = {};

  for (const [key, model] of Object.entries(models)) {
    if (!rawCollections[key] || !Array.isArray(rawCollections[key])) {
      continue;
    }

    const items = rawCollections[key];

    if (mode === 'replace') {
      // Clear existing records and re-insert
      await model.deleteMany({});
      if (items.length > 0) {
        await model.insertMany(items, { ordered: false });
      }
      restoredCounts[key] = items.length;
    } else {
      // Merge: upsert each item by _id
      let upsertedCount = 0;
      for (const item of items) {
        if (item._id) {
          await model.updateOne({ _id: item._id }, { $set: item }, { upsert: true });
          upsertedCount++;
        }
      }
      restoredCounts[key] = upsertedCount;
    }
  }

  return {
    success: true,
    mode,
    safetySnapshot: safetySnapshot.filename,
    restoredCounts,
    totalRestored: Object.values(restoredCounts).reduce((a, b) => a + b, 0)
  };
}

/**
 * Initialize background scheduled snapshot (once every 24 hours)
 */
function initScheduledBackups() {
  if (isVercel) {
    // Scheduled background timers are not supported/needed in ephemeral serverless invocations
    return;
  }

  // Check if a backup was taken within last 24h
  const list = listSnapshots();
  const oneDayAgo = Date.now() - 24 * 60 * 60 * 1000;
  const recentBackup = list.snapshots.find(s => !s.isSafetyBackup && new Date(s.createdAt).getTime() > oneDayAgo);

  if (!recentBackup) {
    console.log('[Backup] No recent backup found. Triggering automated startup snapshot...');
    createSnapshotFile('jamia_backup_daily')
      .then(res => console.log(`[Backup] Startup snapshot created: ${res.filename} (${res.sizeFormatted})`))
      .catch(err => console.error('[Backup] Startup snapshot error:', err.message));
  } else {
    lastBackupTime = recentBackup.createdAt;
    console.log(`[Backup] Found recent automated backup: ${recentBackup.filename} (${recentBackup.createdAt})`);
  }

  // 24-Hour recurring snapshot timer (24 * 60 * 60 * 1000 ms)
  setInterval(() => {
    console.log('[Backup] Running 24-hour scheduled database snapshot...');
    createSnapshotFile('jamia_backup_daily')
      .then(res => console.log(`[Backup] Scheduled snapshot completed: ${res.filename}`))
      .catch(err => console.error('[Backup] Scheduled snapshot error:', err.message));
  }, 24 * 60 * 60 * 1000);
}

module.exports = {
  BACKUPS_DIR,
  generateBackupData,
  createSnapshotFile,
  listSnapshots,
  restoreData,
  initScheduledBackups
};
