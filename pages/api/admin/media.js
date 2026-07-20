import fs from 'fs';
import path from 'path';
import { promisify } from 'util';

const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);
const unlink = promisify(fs.unlink);
const exists = promisify(fs.exists);

const UPLOAD_DIR = path.join(process.cwd(), 'public/uploads');

export default async function handler(req, res) {
    // ✅ GET - List all images
    if (req.method === 'GET') {
        try {
            // Check if uploads directory exists
            if (!fs.existsSync(UPLOAD_DIR)) {
                return res.status(200).json({ 
                    success: true, 
                    data: [],
                    message: 'Uploads directory not found'
                });
            }
            
            const images = await getAllImages();
            res.status(200).json({ success: true, data: images });
        } catch (error) {
            console.error('Error fetching images:', error);
            res.status(500).json({ success: false, message: error.message });
        }
    } 
    // ✅ DELETE - Delete an image
    else if (req.method === 'DELETE') {
        try {
            const { path: imagePath } = req.body;
            
            if (!imagePath) {
                return res.status(400).json({ 
                    success: false, 
                    message: 'Image path required' 
                });
            }
            
            // Security: Prevent directory traversal
            const sanitizedPath = imagePath.replace(/\.\./g, '').replace(/^\/+/, '');
            const fullPath = path.join(process.cwd(), 'public', sanitizedPath);
            
            // Check if file exists
            if (!await exists(fullPath)) {
                return res.status(404).json({ 
                    success: false, 
                    message: 'File not found' 
                });
            }
            
            // Delete file
            await unlink(fullPath);
            
            res.status(200).json({ 
                success: true, 
                message: 'File deleted successfully' 
            });
        } catch (error) {
            console.error('Error deleting image:', error);
            res.status(500).json({ 
                success: false, 
                message: error.message 
            });
        }
    } 
    else {
        res.status(405).json({ 
            success: false, 
            message: 'Method not allowed' 
        });
    }
}

async function getAllImages() {
    const images = [];
    
    async function walkDir(dir, folder = '') {
        try {
            if (!fs.existsSync(dir)) return;
            
            const items = await readdir(dir);
            
            for (const item of items) {
                const fullPath = path.join(dir, item);
                const stats = await stat(fullPath);
                
                if (stats.isDirectory()) {
                    // Recursively scan subfolders
                    await walkDir(fullPath, item);
                } else {
                    // Check if it's an image
                    const ext = path.extname(item).toLowerCase();
                    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp', '.ico'];
                    
                    if (imageExtensions.includes(ext)) {
                        const relativePath = path.relative(path.join(process.cwd(), 'public'), fullPath);
                        const urlPath = '/' + relativePath.replace(/\\/g, '/');
                        
                        images.push({
                            filename: item,
                            path: relativePath,
                            url: urlPath,
                            folder: folder || 'misc',
                            size: stats.size,
                            modified: stats.mtime,
                            extension: ext
                        });
                    }
                }
            }
        } catch (error) {
            console.error(`Error reading directory ${dir}:`, error);
        }
    }
    
    // Start scanning from uploads directory
    await walkDir(UPLOAD_DIR);
    
    // Sort by modified date (newest first)
    images.sort((a, b) => new Date(b.modified) - new Date(a.modified));
    
    return images;
}