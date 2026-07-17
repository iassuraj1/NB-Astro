// admin/components/MediaLibrary.jsx
import React, { useState, useEffect } from 'react';
import { uploadAPI } from '../../services/api';
import { Trash2, Upload, X, Image, Copy, Check } from 'lucide-react';

const MediaLibrary = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetchImages();
    }, []);

    const fetchImages = async () => {
        setLoading(true);
        try {
            // This is a simplified version - you'd need to create an endpoint to list images
            setImages([]);
        } catch (error) {
            console.error('Error fetching images:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpload = async (e, type) => {
        const file = e.target.files[0];
        if (!file) return;

        setUploading(true);
        try {
            let response;
            switch (type) {
                case 'course':
                    response = await uploadAPI.uploadCourseImage(file);
                    break;
                case 'instructor':
                    response = await uploadAPI.uploadInstructorImage(file);
                    break;
                case 'about':
                    response = await uploadAPI.uploadAboutImage(file);
                    break;
                case 'hero':
                    response = await uploadAPI.uploadHeroImage(file);
                    break;
                case 'service':
                    response = await uploadAPI.uploadServiceImage(file);
                    break;
                default:
                    response = await uploadAPI.uploadMiscImage(file);
            }
            
            if (response.data.success) {
                alert('Image uploaded successfully!');
                fetchImages();
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (imagePath) => {
        if (window.confirm('Are you sure you want to delete this image?')) {
            try {
                await uploadAPI.deleteImage(imagePath);
                alert('Image deleted successfully');
                fetchImages();
            } catch (error) {
                console.error('Delete error:', error);
                alert('Failed to delete image');
            }
        }
    };

    const copyToClipboard = (url) => {
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const uploadSections = [
        { label: 'Course Images', type: 'course', accept: 'image/*' },
        { label: 'Instructor Images', type: 'instructor', accept: 'image/*' },
        { label: 'About Images', type: 'about', accept: 'image/*' },
        { label: 'Hero Images', type: 'hero', accept: 'image/*' },
        { label: 'Service Images', type: 'service', accept: 'image/*' },
        { label: 'Miscellaneous', type: 'misc', accept: 'image/*' }
    ];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Media Library</h2>
            </div>

            {/* Upload Sections */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {uploadSections.map((section) => (
                    <div key={section.type} className="bg-gray-800 rounded-lg p-4 text-center">
                        <label className="cursor-pointer">
                            <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-2">
                                <Upload size={24} className="text-[#00B7B3]" />
                            </div>
                            <p className="text-white text-sm">{section.label}</p>
                            <input
                                type="file"
                                accept={section.accept}
                                onChange={(e) => handleUpload(e, section.type)}
                                className="hidden"
                                disabled={uploading}
                            />
                        </label>
                    </div>
                ))}
            </div>

            {/* Image Grid */}
            {loading ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B7B3] mx-auto"></div>
                </div>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                    {images.map((image, index) => (
                        <div key={index} className="group relative bg-gray-800 rounded-lg overflow-hidden">
                            <img
                                src={image.url}
                                alt={image.filename}
                                className="w-full h-32 object-cover cursor-pointer"
                                onClick={() => setSelectedImage(image)}
                            />
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <button
                                    onClick={() => copyToClipboard(image.url)}
                                    className="bg-[#00B7B3] text-black p-2 rounded-lg mx-1 hover:bg-[#33C5C2] transition"
                                >
                                    <Copy size={16} />
                                </button>
                                <button
                                    onClick={() => handleDelete(image.url)}
                                    className="bg-red-500 text-white p-2 rounded-lg mx-1 hover:bg-red-600 transition"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                            <div className="p-2">
                                <p className="text-gray-400 text-xs truncate">{image.filename}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Image Preview Modal */}
            {selectedImage && (
                <div className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4">
                    <div className="max-w-4xl w-full bg-gray-900 rounded-xl overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b border-gray-700">
                            <h3 className="text-white font-semibold">Image Preview</h3>
                            <button
                                onClick={() => setSelectedImage(null)}
                                className="text-gray-400 hover:text-white"
                            >
                                <X size={24} />
                            </button>
                        </div>
                        <div className="p-4">
                            <img
                                src={selectedImage.url}
                                alt={selectedImage.filename}
                                className="w-full max-h-[70vh] object-contain"
                            />
                            <div className="mt-4 p-4 bg-gray-800 rounded-lg">
                                <p className="text-gray-300 text-sm mb-2">Image URL:</p>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={selectedImage.url}
                                        readOnly
                                        className="flex-1 px-3 py-2 bg-gray-700 rounded-lg text-white text-sm"
                                    />
                                    <button
                                        onClick={() => copyToClipboard(selectedImage.url)}
                                        className="bg-[#00B7B3] text-black px-4 py-2 rounded-lg hover:bg-[#33C5C2] transition flex items-center gap-2"
                                    >
                                        {copied ? <Check size={16} /> : <Copy size={16} />}
                                        {copied ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default MediaLibrary;
