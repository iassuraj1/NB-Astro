import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { courseAPI } from '../../services/api';
import TinyMCEEditor from '../../components/Common/TinyMCEEditor';
import ImageSizeHint from '../../components/Common/ImageSizeHint';
import {
    ArrowLeft, 
    Upload, 
    Plus, 
    Trash2,
    Loader2,
    Image as ImageIcon,
    Type,
    List,
    BookOpen,
    Link as LinkIcon,
    Edit,
    AlignLeft,
    AlignCenter,
    AlignRight,
    Bold,
    Italic,
    Underline,
    Highlighter,
    Minus,
    Table,
    Video,
    Code
} from 'lucide-react';

// Custom dark theme styles for Quill with enhanced features
const quillStyles = `
  .dark-quill .ql-toolbar {
    background: #0a0a0f !important;
    border-color: #00B7B3 !important;
    border-radius: 12px 12px 0 0;
    border-bottom: 1px solid #00B7B3 !important;
    padding: 8px !important;
  }
  .dark-quill .ql-toolbar button {
    color: #e0e0e0 !important;
  }
  .dark-quill .ql-toolbar button:hover {
    color: #00B7B3 !important;
  }
  .dark-quill .ql-toolbar .ql-active {
    color: #00B7B3 !important;
  }
  .dark-quill .ql-container {
    background: #000000 !important;
    border-color: #00B7B3 !important;
    border-radius: 0 0 12px 12px;
    min-height: 300px;
    font-size: 15px;
  }
  .dark-quill .ql-editor {
    color: #ffffff !important;
    font-size: 15px;
    line-height: 1.6;
    background: #000000 !important;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
  }
  
  /* Font Size Styles */
  .dark-quill .ql-editor .ql-size-small {
    font-size: 12px !important;
  }
  .dark-quill .ql-editor .ql-size-large {
    font-size: 18px !important;
  }
  .dark-quill .ql-editor .ql-size-huge {
    font-size: 24px !important;
  }
  
  /* Heading Styles */
  .dark-quill .ql-editor h1 {
    color: #00B7B3 !important;
    font-size: 32px !important;
    font-weight: bold !important;
    margin: 24px 0 16px 0 !important;
  }
  .dark-quill .ql-editor h2 {
    color: #33C5C2 !important;
    font-size: 28px !important;
    font-weight: 600 !important;
    margin: 20px 0 12px 0 !important;
  }
  .dark-quill .ql-editor h3 {
    color: #66D9D6 !important;
    font-size: 24px !important;
    font-weight: 500 !important;
    margin: 18px 0 10px 0 !important;
  }
  .dark-quill .ql-editor h4 {
    color: #99E5E2 !important;
    font-size: 20px !important;
    font-weight: 500 !important;
    margin: 16px 0 8px 0 !important;
  }
  
  /* Text Alignment */
  .dark-quill .ql-editor .ql-align-center {
    text-align: center !important;
  }
  .dark-quill .ql-editor .ql-align-right {
    text-align: right !important;
  }
  .dark-quill .ql-editor .ql-align-justify {
    text-align: justify !important;
  }
  
  /* Text Formatting */
  .dark-quill .ql-editor strong {
    color: #00B7B3 !important;
    font-weight: bold !important;
  }
  .dark-quill .ql-editor em {
    font-style: italic !important;
  }
  .dark-quill .ql-editor u {
    text-decoration: underline !important;
  }
  .dark-quill .ql-editor s {
    text-decoration: line-through !important;
  }
  
  /* Links */
  .dark-quill .ql-editor a {
    color: #00B7B3 !important;
    text-decoration: underline !important;
  }
  .dark-quill .ql-editor a:hover {
    color: #33C5C2 !important;
  }
  
  /* Lists */
  .dark-quill .ql-editor ul, .dark-quill .ql-editor ol {
    color: #ffffff !important;
    margin: 12px 0 !important;
    padding-left: 30px !important;
  }
  .dark-quill .ql-editor li {
    margin: 8px 0 !important;
    color: #ffffff !important;
    line-height: 1.5 !important;
  }
  
  /* Blockquotes */
  .dark-quill .ql-editor blockquote {
    border-left: 4px solid #00B7B3 !important;
    background: rgba(0, 183, 179, 0.1) !important;
    padding: 12px 20px !important;
    margin: 16px 0 !important;
    color: #cccccc !important;
    font-style: italic !important;
  }
  
  /* Code Blocks */
  .dark-quill .ql-editor pre {
    background: #1a1a2a !important;
    border: 1px solid #00B7B3 !important;
    border-radius: 8px !important;
    padding: 12px !important;
    margin: 12px 0 !important;
    overflow-x: auto !important;
  }
  .dark-quill .ql-editor code {
    background: #1a1a2a !important;
    color: #00B7B3 !important;
    padding: 2px 6px !important;
    border-radius: 4px !important;
    font-family: 'Courier New', monospace !important;
    font-size: 13px !important;
  }
  
  /* Tables */
  .dark-quill .ql-editor table {
    border-collapse: collapse !important;
    width: 100% !important;
    margin: 16px 0 !important;
    background: #0a0a0f !important;
  }
  .dark-quill .ql-editor td, .dark-quill .ql-editor th {
    border: 1px solid #00B7B3 !important;
    padding: 8px 12px !important;
    color: #ffffff !important;
  }
  .dark-quill .ql-editor th {
    background: rgba(0, 183, 179, 0.2) !important;
    font-weight: bold !important;
  }
  
  /* Images */
  .dark-quill .ql-editor img {
    max-width: 100% !important;
    border-radius: 8px !important;
    margin: 12px 0 !important;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3) !important;
  }
  
  /* Horizontal Rule */
  .dark-quill .ql-editor hr {
    border: none !important;
    border-top: 2px solid #00B7B3 !important;
    margin: 20px 0 !important;
  }
  
  /* Dropdown Menus */
  .dark-quill .ql-picker-label {
    color: #e0e0e0 !important;
  }
  .dark-quill .ql-picker-options {
    background: #1a1a2a !important;
    color: #e0e0e0 !important;
    border-color: #00B7B3 !important;
  }
  .dark-quill .ql-picker-item:hover {
    color: #00B7B3 !important;
  }
  
  /* Color Picker */
  .dark-quill .ql-color-picker .ql-picker-label svg {
    filter: brightness(2);
  }
  
  /* Background Color */
  .dark-quill .ql-background .ql-picker-label svg {
    filter: brightness(2);
  }
`;

const CourseForm = () => {
    const router = useRouter();
    const { id } = router.query;
    const navigate = (target) => router.push(target);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);
    const [uploadingImage, setUploadingImage] = useState(false);
    const [activeTab, setActiveTab] = useState('basic');
    const [manualSlug, setManualSlug] = useState('');
    const [useManualSlug, setUseManualSlug] = useState(false);
    
    const [formData, setFormData] = useState({
        title: '',
        category: 'ASTROLOGY COURSES',
        price: '',
        courseFee: '',
        date: '',
        timing: '',
        courseDuration: '',
        type: 'Online',
        location: 'Zoom',
        image: '',
        whatIs: '',
        aboutCourse: '',
        courseContent: [''],
        durationDetails: '',
        note: 'Video Recording of Every Session Will Be Provided To Every Student After Session.',
        highlights: [''],
        level: '',
        modules: 0,
        includes: [''],
        vastuType: '',
        certificateAvailable: true,
        language: 'Hindi & English',
        isActive: true,
        isFeatured: false,
        seoTitle: '',
        seoDescription: '',
        seoKeywords: ''
    });

    // Auto-generate slug from title
    const generateSlug = (title) => {
        return title
            .toLowerCase()
            .replace(/\s+/g, '-')
            .replace(/[^\w-]+/g, '')
            .replace(/--+/g, '-')
            .trim();
    };

    // Get current slug
    const getCurrentSlug = () => {
        if (useManualSlug && manualSlug) {
            return manualSlug;
        }
        return formData.title ? generateSlug(formData.title) : '';
    };

    useEffect(() => {
        if (formData.title && !useManualSlug) {
            setManualSlug(generateSlug(formData.title));
        }
    }, [formData.title, useManualSlug]);

    // ✅ Update fetchCourse - add image field
const fetchCourse = useCallback(async () => {
    setLoading(true);
    try {
        const { data } = await courseAPI.getById(id);
        const course = data.course;
        setFormData({
            title: course.title || '',
            category: course.category || 'ASTROLOGY COURSES',
            price: course.price || '',
            courseFee: course.courseFee || '',
            date: course.date || '',
            timing: course.timing || '',
            courseDuration: course.courseDuration || '',
            type: course.type || 'Online',
            location: course.location || 'Zoom',
            image: course.image || '',  // ✅ Ensure image is stored
            whatIs: course.whatIs || '',
            aboutCourse: course.aboutCourse || '',
            courseContent: course.courseContent?.length ? course.courseContent : [''],
            durationDetails: course.durationDetails || '',
            note: course.note || '',
            highlights: course.highlights?.length ? course.highlights : [''],
            level: course.level || '',
            modules: course.modules || 0,
            includes: course.includes?.length ? course.includes : [''],
            vastuType: course.vastuType || '',
            certificateAvailable: course.certificateAvailable !== undefined ? course.certificateAvailable : true,
            language: course.language || 'Hindi & English',
            isActive: course.isActive !== undefined ? course.isActive : true,
            isFeatured: course.isFeatured || false,
            seoTitle: course.seoTitle || '',
            seoDescription: course.seoDescription || '',
            seoKeywords: course.seoKeywords || ''
        });
        
        if (course.slug) {
            setManualSlug(course.slug);
            setUseManualSlug(true);
        }
        
        if (course.image) {
            setImagePreview(`${course.image}`);
        }
    } catch (error) {
        console.error('Error fetching course:', error);
    } finally {
        setLoading(false);
    }
}, [id]);

    useEffect(() => {
        if (id) fetchCourse();
    }, [fetchCourse, id]);

   
const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
        alert('Only JPG, PNG, WEBP images allowed');
        return;
    }

    if (file.size > 2 * 1024 * 1024) {
        alert('Image size should be less than 2MB');
        return;
    }

    const previewUrl = URL.createObjectURL(file);
    setImagePreview(previewUrl);
    setUploadingImage(true);
    
    const oldImagePath = formData.image || '';
    console.log('🔍 Old image path:', oldImagePath);

    const formDataImage = new FormData();
    formDataImage.append('file', file);
    
    if (oldImagePath) {
        formDataImage.append('oldImagePath', oldImagePath);
        console.log('🗑️ Sending old image for deletion:', oldImagePath);
    }
    
    formDataImage.append('field', 'course');
    formDataImage.append('folder', 'courses');

    try {
        const token = localStorage.getItem('adminToken');
        const response = await fetch('/api/upload/with-delete', {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formDataImage
        });
        const data = await response.json();
        
        if (response.ok && data.success) {
            setFormData(prev => ({ ...prev, image: data.imagePath }));
            setImagePreview(data.imagePath);
            console.log('✅ Image uploaded:', data.imagePath);
            if (data.oldImageDeleted) {
                alert('✅ Image uploaded! Old image deleted automatically.');
            }
        } else {
            alert('❌ ' + (data.message || 'Upload failed'));
            const oldPreview = formData.image || '';
            setImagePreview(oldPreview);
        }
    } catch (error) {
        console.error('Upload error:', error);
        alert('❌ Failed to upload image');
        const oldPreview = formData.image || '';
        setImagePreview(oldPreview);
    } finally {
        setUploadingImage(false);
    }
};

    const handleArrayField = (field, index, value) => {
        const newArray = [...formData[field]];
        newArray[index] = value;
        setFormData({ ...formData, [field]: newArray });
    };

    const addArrayField = (field) => {
        setFormData({ ...formData, [field]: [...formData[field], ''] });
    };

    const removeArrayField = (field, index) => {
        const newArray = formData[field].filter((_, i) => i !== index);
        setFormData({ ...formData, [field]: newArray });
    };

 const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
        const submitData = {
            ...formData,
            courseContent: formData.courseContent.filter(item => item.trim()),
            highlights: formData.highlights.filter(item => item.trim()),
            includes: formData.includes.filter(item => item.trim()),
            seoTitle: formData.seoTitle || formData.title,
            seoDescription: formData.seoDescription || formData.aboutCourse?.replace(/<[^>]*>/g, '').substring(0, 157),
            seoKeywords: formData.seoKeywords || `${formData.title}, ${formData.category.toLowerCase()}`,
            slug: getCurrentSlug(),
            image: formData.image || ''
        };
        
        if (id) {
            await courseAPI.update(id, submitData);
        } else {
            await courseAPI.create(submitData);
        }
        alert('✅ Course saved successfully!');
        navigate('/admin/courses');
    } catch (error) {
        console.error('Submit error:', error);
        alert('❌ Failed to save course: ' + (error.response?.data?.message || 'Please try again'));
    } finally {
        setSaving(false);
    }
};

    const TabButton = ({ id, label, active, onClick }) => (
        <button
            type="button"
            onClick={() => onClick(id)}
            className={`px-5 py-2.5 rounded-xl transition-all ${
                active === id
                    ? 'bg-[#00B7B3]/20 text-[#00B7B3] border border-[#00B7B3]/50'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
        >
            {label}
        </button>
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="w-8 h-8 text-[#00B7B3] animate-spin" />
            </div>
        );
    }

    const currentSlug = getCurrentSlug();

    return (
        <div className="min-h-screen bg-black">
            {/* Inject custom styles */}
            <style>{quillStyles}</style>
            
            {/* Header */}
            <div className="sticky top-0 z-10 bg-black/90 border-b border-[#00B7B3]/20">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate('/admin/courses')}
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
                            >
                                <ArrowLeft className="w-5 h-5 text-gray-400" />
                            </button>
                            <div>
                                <h1 className="text-2xl font-bold text-white">
                                    {id ? 'Edit Course' : 'New Course'}
                                </h1>
                                <p className="text-gray-500 text-sm">
                                    {id ? 'Update course details' : 'Add a new course'}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            <button
                                type="button"
                                onClick={() => navigate('/admin/courses')}
                                className="px-5 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-white/5"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSubmit}
                                disabled={saving}
                                className="px-6 py-2 bg-[#00B7B3] text-black rounded-lg font-semibold hover:bg-[#00B7B3]/80 disabled:opacity-50"
                            >
                                {saving ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (id ? 'Update' : 'Publish')}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-6 py-8">
                {/* Image Upload */}
                <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6 mb-6">
                    <h2 className="text-lg font-semibold text-white mb-4">Course Image</h2>
                    <div className="flex gap-6">
                        <div className="w-32 h-32 rounded-lg bg-black/60 border border-dashed border-[#00B7B3]/30 flex items-center justify-center">
                            {imagePreview ? (
                                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
                            ) : (
                                <ImageIcon className="w-8 h-8 text-gray-600" />
                            )}
                        </div>
                        <div>
                            <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#00B7B3]/10 border border-[#00B7B3]/30 text-[#00B7B3] rounded-lg cursor-pointer hover:bg-[#00B7B3]/20">
                                <Upload className="w-4 h-4" />
                                {uploadingImage ? 'Uploading...' : 'Upload Image'}
                                <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
                            </label>
                            <p className="text-gray-500 text-xs mt-2">JPG, PNG, WEBP (Max 2MB)</p>
                            <ImageSizeHint type="course" />
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="flex gap-2 mb-6 border-b border-[#00B7B3]/20 pb-3 flex-wrap">
                    <TabButton id="basic" label="Basic" active={activeTab} onClick={setActiveTab} />
                    <TabButton id="pricing" label="Pricing" active={activeTab} onClick={setActiveTab} />
                    <TabButton id="content" label="Content" active={activeTab} onClick={setActiveTab} />
                    <TabButton id="features" label="Features" active={activeTab} onClick={setActiveTab} />
                    <TabButton id="seo" label="SEO" active={activeTab} onClick={setActiveTab} />
                    <TabButton id="status" label="Status" active={activeTab} onClick={setActiveTab} />
                </div>

                {/* Basic Tab */}
                {activeTab === 'basic' && (
                    <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6 space-y-4">
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Course Title</label>
                            <input 
                                type="text" 
                                value={formData.title} 
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
                                className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" 
                                required 
                            />
                        </div>
                        
                        {/* Slug Field - Editable */}
                        <div>
                            <div className="flex items-center justify-between mb-2">
                                <label className="block text-sm text-gray-400">Course URL Slug</label>
                                <button
                                    type="button"
                                    onClick={() => {
                                        setUseManualSlug(!useManualSlug);
                                        if (!useManualSlug) {
                                            setManualSlug(generateSlug(formData.title));
                                        }
                                    }}
                                    className="flex items-center gap-1 text-xs text-[#00B7B3] hover:underline"
                                >
                                    <Edit className="w-3 h-3" />
                                    {useManualSlug ? 'Auto from Title' : 'Customize'}
                                </button>
                            </div>
                            <div className="flex items-center gap-2 bg-black/60 border border-gray-700 rounded-lg p-2">
                                <span className="text-gray-500 text-sm">/courses/</span>
                                <input
                                    type="text"
                                    value={currentSlug}
                                    onChange={(e) => {
                                        const newSlug = e.target.value
                                            .toLowerCase()
                                            .replace(/\s+/g, '-')
                                            .replace(/[^\w-]+/g, '')
                                            .replace(/--+/g, '-')
                                            .trim();
                                        setManualSlug(newSlug);
                                        setUseManualSlug(true);
                                    }}
                                    disabled={!useManualSlug}
                                    className={`flex-1 bg-transparent text-white outline-none ${
                                        !useManualSlug ? 'text-gray-400' : 'text-[#00B7B3]'
                                    }`}
                                    placeholder="course-slug"
                                />
                                <span className="text-gray-500 text-sm">/details</span>
                            </div>
                            <p className="text-gray-500 text-xs mt-2">
                                {useManualSlug 
                                    ? '✏️ You can edit the URL slug manually' 
                                    : '🔗 Auto-generated from title. Click "Customize" to edit.'}
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Category</label>
                                <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white">
                                    <option value="ASTROLOGY COURSES">✨ Astrology</option>
                                    <option value="VASTU COURSES">🏠 Vastu</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm text-gray-400 mb-2">Level</label>
                                <select value={formData.level} onChange={(e) => setFormData({ ...formData, level: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white">
                                    <option value="">Select Level</option>
                                    <option value="Beginner">Beginner</option>
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">Language</label>
                            <input type="text" value={formData.language} onChange={(e) => setFormData({ ...formData, language: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
                        </div>
                    </div>
                )}

                {/* Pricing Tab */}
                {activeTab === 'pricing' && (
                    <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
                        <div className="grid grid-cols-2 gap-4">
                            <div><label className="block text-sm text-gray-400 mb-2">Display Price</label><input type="text" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="₹51,000" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
                            <div><label className="block text-sm text-gray-400 mb-2">Course Fee</label><input type="text" value={formData.courseFee} onChange={(e) => setFormData({ ...formData, courseFee: e.target.value })} placeholder="51,000 INR" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
                            <div><label className="block text-sm text-gray-400 mb-2">Start Date</label><input type="text" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} placeholder="7th Jan 2025" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
                            <div><label className="block text-sm text-gray-400 mb-2">Timing</label><input type="text" value={formData.timing} onChange={(e) => setFormData({ ...formData, timing: e.target.value })} placeholder="Saturday 8-10 PM" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
                            <div><label className="block text-sm text-gray-400 mb-2">Duration</label><input type="text" value={formData.courseDuration} onChange={(e) => setFormData({ ...formData, courseDuration: e.target.value })} placeholder="4 months (12 sessions)" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
                            <div><label className="block text-sm text-gray-400 mb-2">Modules</label><input type="number" value={formData.modules} onChange={(e) => setFormData({ ...formData, modules: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
                            <div><label className="block text-sm text-gray-400 mb-2">Class Type</label><select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white"><option>Online</option><option>Offline</option><option>Hybrid</option></select></div>
                            <div><label className="block text-sm text-gray-400 mb-2">Location</label><input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Zoom / Google Meet" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
                        </div>
                    </div>
                )}

                {/* Content Tab - Enhanced Dark Theme Editor */}
                {activeTab === 'content' && (
                    <div className="space-y-6">
                        {/* Editor Instructions */}
                        <div className="bg-[#00B7B3]/10 border border-[#00B7B3]/30 rounded-lg p-4">
                            <h3 className="text-[#00B7B3] font-semibold mb-2">📝 Rich Text Editor Features</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm text-gray-300">
                                <div>✓ Multiple Heading Sizes (H1-H4)</div>
                                <div>✓ Font Sizes (Small, Normal, Large, Huge)</div>
                                <div>✓ Text Formatting (Bold, Italic, Underline, Strike)</div>
                                <div>✓ Text & Background Colors</div>
                                <div>✓ Text Alignment (Left, Center, Right)</div>
                                <div>✓ Lists (Ordered, Bulleted, Checked)</div>
                                <div>✓ Indentation</div>
                                <div>✓ Blockquotes & Code Blocks</div>
                                <div>✓ Links, Images & Videos</div>
                                <div>✓ Tables Support</div>
                            </div>
                        </div>

                        {/* What is this course? */}
                        <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <Type className="w-4 h-4 text-[#00B7B3]" />
                                <label className="text-white font-medium">What is this course?</label>
                            </div>
                            <div className="dark-quill">
                                <TinyMCEEditor
                                    value={formData.whatIs}
                                    onChange={(value) => setFormData({ ...formData, whatIs: value })}
                                    placeholder="Write about the course with rich formatting... Use headings, colors, lists, and images!"
                                    minHeight={320}
                                />
                            </div>
                            <p className="text-gray-500 text-xs mt-3">
                                💡 Tip: Use H1 for main title, H2 for sections, add images, tables, and format text with colors.
                            </p>
                        </div>

                        {/* About Course */}
                        <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
                            <div className="flex items-center gap-2 mb-4">
                                <BookOpen className="w-4 h-4 text-[#00B7B3]" />
                                <label className="text-white font-medium">About Course</label>
                            </div>
                            <div className="dark-quill">
                                <TinyMCEEditor
                                    value={formData.aboutCourse}
                                    onChange={(value) => setFormData({ ...formData, aboutCourse: value })}
                                    placeholder="Detailed description with headings, bullet points, images, videos..."
                                    minHeight={420}
                                />
                            </div>
                        </div>

                        {/* Course Topics */}
                        <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-3">
                                <div className="flex items-center gap-2">
                                    <List className="w-4 h-4 text-[#00B7B3]" />
                                    <label className="text-white font-medium">Course Topics / Modules</label>
                                </div>
                                <button type="button" onClick={() => addArrayField('courseContent')} className="px-3 py-1 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg hover:bg-[#00B7B3]/30">+ Add Topic</button>
                            </div>
                            {formData.courseContent.map((item, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input type="text" value={item} onChange={(e) => handleArrayField('courseContent', index, e.target.value)} placeholder="Topic name" className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
                                    {formData.courseContent.length > 1 && (
                                        <button type="button" onClick={() => removeArrayField('courseContent', index)} className="px-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30">✕</button>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Duration Details */}
                        <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
                            <label className="block text-white font-medium mb-2">Duration Details</label>
                            <textarea rows="2" value={formData.durationDetails} onChange={(e) => setFormData({ ...formData, durationDetails: e.target.value })} placeholder="4 months course with 12 live sessions + practical assignments." className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
                        </div>

                        {/* Special Note */}
                        <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
                            <label className="block text-white font-medium mb-2">Special Note</label>
                            <textarea rows="2" value={formData.note} onChange={(e) => setFormData({ ...formData, note: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
                        </div>
                    </div>
                )}

                {/* Features Tab */}
                {activeTab === 'features' && (
                    <div className="grid grid-cols-2 gap-6">
                        <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-white font-semibold">⭐ Highlights</h2>
                                <button type="button" onClick={() => addArrayField('highlights')} className="px-3 py-1 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg">+</button>
                            </div>
                            {formData.highlights.map((item, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input type="text" value={item} onChange={(e) => handleArrayField('highlights', index, e.target.value)} placeholder="e.g., 12 Live Sessions" className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
                                    {formData.highlights.length > 1 && <button type="button" onClick={() => removeArrayField('highlights', index)} className="px-3 bg-red-500/20 text-red-400 rounded-lg">✕</button>}
                                </div>
                            ))}
                        </div>

                        <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
                            <div className="flex justify-between items-center mb-3">
                                <h2 className="text-white font-semibold">🎁 What's Included</h2>
                                <button type="button" onClick={() => addArrayField('includes')} className="px-3 py-1 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg">+</button>
                            </div>
                            {formData.includes.map((item, index) => (
                                <div key={index} className="flex gap-2 mb-2">
                                    <input type="text" value={item} onChange={(e) => handleArrayField('includes', index, e.target.value)} placeholder="e.g., Certificate" className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
                                    {formData.includes.length > 1 && <button type="button" onClick={() => removeArrayField('includes', index)} className="px-3 bg-red-500/20 text-red-400 rounded-lg">✕</button>}
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* SEO Tab */}
                {activeTab === 'seo' && (
                    <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6 space-y-4">
                        <div className="bg-black/60 border border-[#00B7B3]/30 rounded-lg p-3 mb-2">
                            <div className="flex items-center gap-2 text-sm mb-2">
                                <LinkIcon className="w-4 h-4 text-[#00B7B3]" />
                                <span className="text-gray-400">Final URL:</span>
                                <span className="text-[#00B7B3] font-mono text-sm break-all">
                                    https://nbastro.com/courses/{currentSlug || 'course-slug'}/details
                                </span>
                            </div>
                            <p className="text-gray-500 text-xs">This URL will be used for sharing and SEO.</p>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">SEO Title (60 chars)</label>
                            <input type="text" value={formData.seoTitle} onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })} maxLength="60" placeholder={formData.title} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
                            <p className="text-gray-500 text-xs mt-1">{formData.seoTitle?.length || 0}/60 characters</p>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">SEO Description (160 chars)</label>
                            <textarea rows="2" value={formData.seoDescription} onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })} maxLength="160" placeholder="Short description for search engines" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
                            <p className="text-gray-500 text-xs mt-1">{formData.seoDescription?.length || 0}/160 characters</p>
                        </div>
                        <div>
                            <label className="block text-sm text-gray-400 mb-2">SEO Keywords (comma separated)</label>
                            <input type="text" value={formData.seoKeywords} onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })} placeholder="astrology, vastu, course, online" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
                        </div>
                    </div>
                )}

                {/* Status Tab */}
                {activeTab === 'status' && (
                    <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6 space-y-3">
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="w-4 h-4 accent-[#00B7B3]" />
                            <span className="text-white">✅ Active (visible to students)</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })} className="w-4 h-4 accent-[#00B7B3]" />
                            <span className="text-white">⭐ Featured (show on homepage)</span>
                        </label>
                        <label className="flex items-center gap-3 cursor-pointer">
                            <input type="checkbox" checked={formData.certificateAvailable} onChange={(e) => setFormData({ ...formData, certificateAvailable: e.target.checked })} className="w-4 h-4 accent-[#00B7B3]" />
                            <span className="text-white">📜 Certificate Available</span>
                        </label>
                    </div>
                )}
            </form>
        </div>
    );
};

export default CourseForm;
