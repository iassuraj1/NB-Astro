"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { 
    Search, 
    FolderOpen, 
    Image as ImageIcon, 
    Trash2, 
    Download, 
    Loader2,
    Grid3x3,
    List,
    Eye,
    X,
    Copy,
    Check,
    RefreshCw,
    FileImage,
    Folder
} from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

const MediaLibrary = () => {
    const [loading, setLoading] = useState(false);
    const [images, setImages] = useState([]);
    const [filteredImages, setFilteredImages] = useState([]);
    const [folders, setFolders] = useState([]);
    const [selectedFolder, setSelectedFolder] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState('grid');
    const [selectedImage, setSelectedImage] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const [copied, setCopied] = useState(false);

    // Folder icons and colors
    const folderConfig = {
        'about': { icon: '👤', color: 'border-purple-500/50 bg-purple-500/10', label: 'About Page' },
        'consultations': { icon: '💬', color: 'border-blue-500/50 bg-blue-500/10', label: 'Consultations' },
        'courses': { icon: '📚', color: 'border-green-500/50 bg-green-500/10', label: 'Courses' },
        'hero': { icon: '🎯', color: 'border-orange-500/50 bg-orange-500/10', label: 'Hero Section' },
        'misc': { icon: '📁', color: 'border-gray-500/50 bg-gray-500/10', label: 'Miscellaneous' },
        'services': { icon: '⭐', color: 'border-pink-500/50 bg-pink-500/10', label: 'Services' }
    };

    // Fetch all images
    const fetchImages = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_BASE_URL}/api/admin/media`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            const data = await response.json();
            
            if (data.success) {
                setImages(data.data);
                setFilteredImages(data.data);
                // Extract unique folders
                const uniqueFolders = [...new Set(data.data.map(img => img.folder))];
                setFolders(uniqueFolders);
            }
        } catch (error) {
            console.error('Error fetching images:', error);
            alert('Failed to load images');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchImages();
    }, [fetchImages]);

    // Filter images
    useEffect(() => {
        let result = images;
        
        if (selectedFolder !== 'all') {
            result = result.filter(img => img.folder === selectedFolder);
        }
        
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            result = result.filter(img => 
                img.filename.toLowerCase().includes(query) ||
                img.folder.toLowerCase().includes(query)
            );
        }
        
        setFilteredImages(result);
    }, [images, selectedFolder, searchQuery]);

    // Delete image
    const handleDelete = async (image) => {
        if (!confirm(`Delete "${image.filename}" permanently? This action cannot be undone.`)) return;
        
        setDeleting(true);
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_BASE_URL}/api/admin/media`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    ...(token ? { Authorization: `Bearer ${token}` } : {})
                },
                body: JSON.stringify({ path: image.path })
            });
            const data = await response.json();
            
            if (data.success) {
                setImages(prev => prev.filter(img => img.path !== image.path));
                if (selectedImage?.path === image.path) {
                    setSelectedImage(null);
                }
                alert('✅ Image deleted successfully!');
            } else {
                alert('❌ Failed to delete image');
            }
        } catch (error) {
            console.error('Error deleting:', error);
            alert('❌ Error deleting image');
        } finally {
            setDeleting(false);
        }
    };

    // Download image
    const handleDownload = (image) => {
        const link = document.createElement('a');
        link.href = image.url;
        link.download = image.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    // Copy URL
    const handleCopyUrl = (url) => {
        const fullUrl = url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
        navigator.clipboard.writeText(fullUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Format file size
    const formatSize = (bytes) => {
        if (!bytes) return '0 B';
        if (bytes < 1024) return bytes + ' B';
        if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
        return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
    };

    // Format date
    const formatDate = (date) => {
        if (!date) return 'N/A';
        return new Date(date).toLocaleDateString('en-IN', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    // Get folder display name
    const getFolderLabel = (folder) => {
        return folderConfig[folder]?.label || folder;
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#00B7B3] animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black p-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <ImageIcon className="w-6 h-6 text-[#00B7B3]" />
                        Media Library
                    </h1>
                    <p className="text-gray-500 text-sm">
                        {filteredImages.length} images • {folders.length} folders
                    </p>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={fetchImages}
                        className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
                {/* Search */}
                <div className="flex-1 min-w-[200px] relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                    <input
                        type="text"
                        placeholder="Search images by name or folder..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#00B7B3] outline-none"
                    />
                </div>

                {/* View Toggle */}
                <div className="flex gap-1 bg-gray-900 rounded-lg p-1">
                    <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2 rounded ${viewMode === 'grid' ? 'bg-[#00B7B3]/20 text-[#00B7B3]' : 'text-gray-500 hover:text-white'}`}
                    >
                        <Grid3x3 className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => setViewMode('list')}
                        className={`p-2 rounded ${viewMode === 'list' ? 'bg-[#00B7B3]/20 text-[#00B7B3]' : 'text-gray-500 hover:text-white'}`}
                    >
                        <List className="w-4 h-4" />
                    </button>
                </div>
            </div>

            {/* Folder Stats */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-6">
                <button
                    onClick={() => setSelectedFolder('all')}
                    className={`p-4 rounded-lg border transition ${
                        selectedFolder === 'all'
                            ? 'border-[#00B7B3] bg-[#00B7B3]/20'
                            : 'border-gray-700 bg-gray-900 hover:border-gray-500'
                    }`}
                >
                    <div className="flex items-center gap-2">
                        <Folder className="w-5 h-5 text-[#00B7B3]" />
                        <div>
                            <p className="text-white font-medium">All</p>
                            <p className="text-gray-400 text-sm">{images.length} images</p>
                        </div>
                    </div>
                </button>
                
                {folders.map(folder => {
                    const count = images.filter(img => img.folder === folder).length;
                    const config = folderConfig[folder] || { icon: '📁', color: 'border-gray-500/50 bg-gray-500/10' };
                    return (
                        <button
                            key={folder}
                            onClick={() => setSelectedFolder(folder)}
                            className={`p-4 rounded-lg border transition ${config.color} ${
                                selectedFolder === folder
                                    ? 'border-[#00B7B3] ring-1 ring-[#00B7B3]'
                                    : 'border-transparent hover:border-gray-500'
                            }`}
                        >
                            <div className="flex items-center gap-2">
                                <span className="text-2xl">{config.icon}</span>
                                <div className="text-left">
                                    <p className="text-white font-medium capitalize">{getFolderLabel(folder)}</p>
                                    <p className="text-gray-400 text-sm">{count} images</p>
                                </div>
                            </div>
                        </button>
                    );
                })}
            </div>

            {/* Images Grid/List */}
            {filteredImages.length === 0 ? (
                <div className="text-center py-12 bg-gray-900/50 rounded-2xl border border-gray-800">
                    <FileImage className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                    <p className="text-gray-400 text-lg">No images found</p>
                    <p className="text-gray-600 text-sm">Try changing your filters</p>
                </div>
            ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
                    {filteredImages.map((image) => (
                        <div
                            key={image.path}
                            className="group relative bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-[#00B7B3]/50 transition"
                        >
                            <img
                                src={image.url}
                                alt={image.filename}
                                className="w-full h-40 object-cover"
                                loading="lazy"
                                onClick={() => setSelectedImage(image)}
                            />
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
                                <button
                                    onClick={() => setSelectedImage(image)}
                                    className="p-2 bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg hover:bg-[#00B7B3]/40 transition"
                                >
                                    <Eye className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDownload(image)}
                                    className="p-2 bg-blue-500/20 text-blue-400 rounded-lg hover:bg-blue-500/40 transition"
                                >
                                    <Download className="w-4 h-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(image)}
                                    className="p-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/40 transition"
                                >
                                    <Trash2 className="w-4 h-4" />
                                </button>
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-2">
                                <p className="text-white text-xs truncate" title={image.filename}>
                                    {image.filename}
                                </p>
                                <div className="flex justify-between text-xs text-gray-400">
                                    <span>{formatSize(image.size)}</span>
                                    <span className="capitalize">{image.folder}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-800">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead className="bg-gray-800 border-b border-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-gray-300 text-sm font-medium w-16">Preview</th>
                                    <th className="px-4 py-3 text-gray-300 text-sm font-medium">Filename</th>
                                    <th className="px-4 py-3 text-gray-300 text-sm font-medium">Folder</th>
                                    <th className="px-4 py-3 text-gray-300 text-sm font-medium">Size</th>
                                    <th className="px-4 py-3 text-gray-300 text-sm font-medium">Modified</th>
                                    <th className="px-4 py-3 text-gray-300 text-sm font-medium text-center">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredImages.map((image) => (
                                    <tr key={image.path} className="border-b border-gray-800 hover:bg-gray-800/50 transition">
                                        <td className="px-4 py-3">
                                            <img 
                                                src={image.url} 
                                                alt={image.filename} 
                                                className="w-12 h-12 object-cover rounded-lg border border-gray-700 cursor-pointer"
                                                onClick={() => setSelectedImage(image)}
                                            />
                                        </td>
                                        <td className="px-4 py-3">
                                            <p className="text-white text-sm truncate max-w-[200px]" title={image.filename}>
                                                {image.filename}
                                            </p>
                                        </td>
                                        <td className="px-4 py-3">
                                            <span className={`px-2 py-1 rounded text-xs capitalize ${folderConfig[image.folder]?.color || 'border-gray-500/50 bg-gray-500/10'}`}>
                                                {getFolderLabel(image.folder)}
                                            </span>
                                        </td>
                                        <td className="px-4 py-3 text-gray-400 text-sm">{formatSize(image.size)}</td>
                                        <td className="px-4 py-3 text-gray-400 text-sm">{formatDate(image.modified)}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex justify-center gap-2">
                                                <button
                                                    onClick={() => setSelectedImage(image)}
                                                    className="p-1.5 bg-[#00B7B3]/20 text-[#00B7B3] rounded hover:bg-[#00B7B3]/40 transition"
                                                    title="Preview"
                                                >
                                                    <Eye className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDownload(image)}
                                                    className="p-1.5 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/40 transition"
                                                    title="Download"
                                                >
                                                    <Download className="w-3.5 h-3.5" />
                                                </button>
                                                <button
                                                    onClick={() => handleCopyUrl(image.url)}
                                                    className="p-1.5 bg-green-500/20 text-green-400 rounded hover:bg-green-500/40 transition"
                                                    title="Copy URL"
                                                >
                                                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(image)}
                                                    className="p-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500/40 transition"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Image Preview Modal */}
            {selectedImage && (
                <div 
                    className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
                    onClick={() => setSelectedImage(null)}
                >
                    <div 
                        className="bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden border border-gray-700"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="flex justify-between items-center p-4 border-b border-gray-800">
                            <div className="flex-1 min-w-0">
                                <h3 className="text-white font-semibold truncate">{selectedImage.filename}</h3>
                                <p className="text-gray-400 text-sm">
                                    {getFolderLabel(selectedImage.folder)} • {formatSize(selectedImage.size)} • {formatDate(selectedImage.modified)}
                                </p>
                            </div>
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="p-2 hover:bg-gray-800 rounded-lg text-gray-400 hover:text-white transition ml-4"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="p-4 flex items-center justify-center min-h-[300px] bg-black/50">
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.filename}
                                className="max-w-full max-h-[60vh] object-contain rounded-lg"
                            />
                        </div>
                        <div className="flex flex-wrap gap-3 p-4 border-t border-gray-800">
                            <button
                                onClick={() => handleDownload(selectedImage)}
                                className="flex-1 min-w-[100px] px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition flex items-center justify-center gap-2"
                            >
                                <Download className="w-4 h-4" /> Download
                            </button>
                            <button
                                onClick={() => handleCopyUrl(selectedImage.url)}
                                className="flex-1 min-w-[100px] px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition flex items-center justify-center gap-2"
                            >
                                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4" />}
                                {copied ? 'Copied!' : 'Copy URL'}
                            </button>
                            <button
                                onClick={() => {
                                    handleDelete(selectedImage);
                                    setSelectedImage(null);
                                }}
                                className="flex-1 min-w-[100px] px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition flex items-center justify-center gap-2"
                            >
                                <Trash2 className="w-4 h-4" /> Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaLibrary;