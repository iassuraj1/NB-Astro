// const fs = require('fs');
// const path = require('path');

// const uploadsRoot = path.join(process.cwd(), 'public');

// const normalizeUploadPath = (imagePath) => {
//     if (!imagePath) return null;
//     const urlPath = String(imagePath).replace(/^https?:\/\/[^/]+/i, '');
//     const normalized = path.normalize(urlPath).replace(/^(\.\.[/\\])+/, '');
//     if (!normalized.startsWith('/uploads') && !normalized.startsWith('uploads')) return null;
//     return normalized.startsWith(path.sep) ? normalized.slice(1) : normalized;
// };

// const resolveUploadPath = (imagePath) => {
//     const normalized = normalizeUploadPath(imagePath);
//     if (!normalized) return null;
//     const fullPath = path.resolve(uploadsRoot, normalized);
//     if (!fullPath.startsWith(path.resolve(uploadsRoot, 'uploads'))) return null;
//     return fullPath;
// };

// const deleteUploadFile = (imagePath) => {
//     const fullPath = resolveUploadPath(imagePath);
//     if (!fullPath) return { deleted: false, skipped: true, reason: 'Invalid or external path' };
//     if (!fs.existsSync(fullPath)) return { deleted: false, skipped: true, reason: 'File not found' };
//     fs.unlinkSync(fullPath);
//     return { deleted: true, path: imagePath };
// };

// const deleteUploadFiles = (imagePaths = []) => {
//     const results = [];
//     for (const imagePath of imagePaths.filter(Boolean)) {
//         results.push({ imagePath, ...deleteUploadFile(imagePath) });
//     }
//     return results;
// };

// module.exports = {
//     deleteUploadFile,
//     deleteUploadFiles,
//     resolveUploadPath,
// };



// const fs = require('fs');
// const path = require('path');

// const uploadsRoot = path.join(process.cwd(), 'public');

// const normalizeUploadPath = (imagePath) => {
//     if (!imagePath) return null;
    
//     console.log(`🔍 [NORMALIZE] Input: "${imagePath}"`);
    
//     // Remove domain if present
//     let urlPath = String(imagePath).replace(/^https?:\/\/[^/]+/i, '');
//     console.log(`🔍 [NORMALIZE] After domain: "${urlPath}"`);
    
//     // Normalize path
//     urlPath = path.normalize(urlPath).replace(/\\/g, '/');
//     console.log(`🔍 [NORMALIZE] After normalize: "${urlPath}"`);
    
//     // Remove leading slash if present
//     if (urlPath.startsWith('/')) {
//         urlPath = urlPath.slice(1);
//     }
//     console.log(`🔍 [NORMALIZE] After removing leading slash: "${urlPath}"`);
    
//     // Security: Prevent directory traversal
//     if (urlPath.includes('..')) {
//         console.log(`❌ [NORMALIZE] Directory traversal detected`);
//         return null;
//     }
    
//     // Check for 'uploads/'
//     if (!urlPath.startsWith('uploads/')) {
//         console.log(`❌ [NORMALIZE] Not in uploads folder: "${urlPath}"`);
//         return null;
//     }
    
//     console.log(`✅ [NORMALIZE] Final: "${urlPath}"`);
//     return urlPath;
// };

// const resolveUploadPath = (imagePath) => {
//     const normalized = normalizeUploadPath(imagePath);
//     if (!normalized) return null;
    
//     const fullPath = path.resolve(uploadsRoot, normalized);
//     console.log(`🔍 [RESOLVE] Full path: "${fullPath}"`);
    
//     // Security: Ensure path is within uploads folder
//     const uploadsFullPath = path.resolve(uploadsRoot, 'uploads');
//     if (!fullPath.startsWith(uploadsFullPath)) {
//         console.log(`❌ [RESOLVE] Path outside uploads folder`);
//         return null;
//     }
    
//     return fullPath;
// };

// const deleteUploadFile = (imagePath) => {
//     try {
//         console.log(`🗑️ [DELETE] Raw: "${imagePath}"`);
        
//         const fullPath = resolveUploadPath(imagePath);
//         console.log(`🗑️ [DELETE] Resolved: "${fullPath}"`);
        
//         if (!fullPath) {
//             return { 
//                 deleted: false, 
//                 skipped: true, 
//                 reason: 'Invalid or external path' 
//             };
//         }
        
//         if (!fs.existsSync(fullPath)) {
//             console.log(`⚠️ [DELETE] File not found: "${fullPath}"`);
//             return { 
//                 deleted: false, 
//                 skipped: true, 
//                 reason: 'File not found' 
//             };
//         }
        
//         fs.unlinkSync(fullPath);
//         console.log(`✅ [DELETE] File deleted: "${fullPath}"`);
//         return { 
//             deleted: true, 
//             path: imagePath,
//             fullPath: fullPath
//         };
//     } catch (error) {
//         console.error(`❌ [DELETE] Error:`, error);
//         return { 
//             deleted: false, 
//             skipped: false, 
//             reason: error.message 
//         };
//     }
// };

// module.exports = {
//     deleteUploadFile,
//     resolveUploadPath,
//     normalizeUploadPath
// };


const fs = require('fs');
const path = require('path');

const uploadsRoot = path.join(process.cwd(), 'public');

const normalizeUploadPath = (imagePath) => {
    if (!imagePath) return null;
    
    console.log(`🔍 [NORMALIZE] Input: "${imagePath}"`);
    
    // Remove domain if present
    let urlPath = String(imagePath).replace(/^https?:\/\/[^/]+/i, '');
    console.log(`🔍 [NORMALIZE] After domain: "${urlPath}"`);
    
    // Normalize path
    urlPath = path.normalize(urlPath).replace(/\\/g, '/');
    console.log(`🔍 [NORMALIZE] After normalize: "${urlPath}"`);
    
    // Remove leading slash if present
    if (urlPath.startsWith('/')) {
        urlPath = urlPath.slice(1);
    }
    console.log(`🔍 [NORMALIZE] After removing leading slash: "${urlPath}"`);
    
    // Security: Prevent directory traversal
    if (urlPath.includes('..')) {
        console.log(`❌ [NORMALIZE] Directory traversal detected`);
        return null;
    }
    
    // Check for 'uploads/'
    if (!urlPath.startsWith('uploads/')) {
        console.log(`❌ [NORMALIZE] Not in uploads folder: "${urlPath}"`);
        return null;
    }
    
    console.log(`✅ [NORMALIZE] Final: "${urlPath}"`);
    return urlPath;
};

const resolveUploadPath = (imagePath) => {
    const normalized = normalizeUploadPath(imagePath);
    if (!normalized) return null;
    
    const fullPath = path.resolve(uploadsRoot, normalized);
    console.log(`🔍 [RESOLVE] Full path: "${fullPath}"`);
    
    // Security: Ensure path is within uploads folder
    const uploadsFullPath = path.resolve(uploadsRoot, 'uploads');
    if (!fullPath.startsWith(uploadsFullPath)) {
        console.log(`❌ [RESOLVE] Path outside uploads folder`);
        return null;
    }
    
    return fullPath;
};

const deleteUploadFile = (imagePath) => {
    try {
        console.log(`🗑️ [DELETE] Raw: "${imagePath}"`);
        
        const fullPath = resolveUploadPath(imagePath);
        console.log(`🗑️ [DELETE] Resolved: "${fullPath}"`);
        
        if (!fullPath) {
            return { 
                deleted: false, 
                skipped: true, 
                reason: 'Invalid or external path' 
            };
        }
        
        if (!fs.existsSync(fullPath)) {
            console.log(`⚠️ [DELETE] File not found: "${fullPath}"`);
            return { 
                deleted: false, 
                skipped: true, 
                reason: 'File not found' 
            };
        }
        
        fs.unlinkSync(fullPath);
        console.log(`✅ [DELETE] File deleted: "${fullPath}"`);
        return { 
            deleted: true, 
            path: imagePath,
            fullPath: fullPath
        };
    } catch (error) {
        console.error(`❌ [DELETE] Error:`, error);
        return { 
            deleted: false, 
            skipped: false, 
            reason: error.message 
        };
    }
};

// ✅ ADD THIS - Bulk delete for multiple images (used by homeController)
const deleteUploadFiles = (imagePaths = []) => {
    const results = [];
    console.log(`🗑️ [BULK DELETE] Deleting ${imagePaths.length} images`);
    
    for (const imagePath of imagePaths) {
        if (imagePath) {
            const result = deleteUploadFile(imagePath);
            results.push({ imagePath, ...result });
        }
    }
    
    return results;
};

module.exports = {
    deleteUploadFile,
    deleteUploadFiles,  // ✅ EXPORT THIS - homeController needs it
    resolveUploadPath,
    normalizeUploadPath
};