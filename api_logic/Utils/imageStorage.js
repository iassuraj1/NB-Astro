const fs = require('fs');
const path = require('path');

const uploadsRoot = path.join(process.cwd(), 'public');

const normalizeUploadPath = (imagePath) => {
    if (!imagePath) return null;
    const urlPath = String(imagePath).replace(/^https?:\/\/[^/]+/i, '');
    const normalized = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
    if (!normalized.startsWith('/uploads') && !normalized.startsWith('uploads')) return null;
    return normalized.startsWith(path.sep) ? normalized.slice(1) : normalized;
};

const resolveUploadPath = (imagePath) => {
    const normalized = normalizeUploadPath(imagePath);
    if (!normalized) return null;
    const fullPath = path.resolve(uploadsRoot, normalized);
    if (!fullPath.startsWith(path.resolve(uploadsRoot, 'uploads'))) return null;
    return fullPath;
};

const deleteUploadFile = (imagePath) => {
    const fullPath = resolveUploadPath(imagePath);
    if (!fullPath) return { deleted: false, skipped: true, reason: 'Invalid or external path' };
    if (!fs.existsSync(fullPath)) return { deleted: false, skipped: true, reason: 'File not found' };
    fs.unlinkSync(fullPath);
    return { deleted: true, path: imagePath };
};

const deleteUploadFiles = (imagePaths = []) => {
    const results = [];
    for (const imagePath of imagePaths.filter(Boolean)) {
        results.push({ imagePath, ...deleteUploadFile(imagePath) });
    }
    return results;
};

module.exports = {
    deleteUploadFile,
    deleteUploadFiles,
    resolveUploadPath,
};
