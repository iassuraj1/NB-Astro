



// admin/components/ConsultationManager.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { consultationAPI } from '../services/api';
import TinyMCEEditor from './Common/TinyMCEEditor';
import ImageSizeHint from './Common/ImageSizeHint';

// Custom CSS for white toolbar icons
const quillStyles = `
    .ql-editor { min-height: 300px; background: #1e293b; color: #e2e8f0; font-size: 15px; line-height: 1.6; }
    .ql-toolbar { background: #334155; border-color: #475569 !important; border-radius: 8px 8px 0 0; }
    .ql-container { border-color: #475569 !important; border-radius: 0 0 8px 8px; }
    .ql-picker-label { color: #e2e8f0 !important; }
    .ql-picker-options { background: #334155 !important; }
    .ql-editor a { color: #00B7B3 !important; }
    .ql-toolbar button svg { filter: brightness(0) invert(1); }
    .ql-toolbar .ql-stroke { stroke: #ffffff !important; }
    .ql-toolbar .ql-fill { fill: #ffffff !important; }
    .ql-toolbar .ql-picker-label svg { filter: brightness(0) invert(1); }
    .ql-editor h1 { font-size: 2em; color: #ffffff; }
    .ql-editor h2 { font-size: 1.5em; color: #ffffff; }
    .ql-editor h3 { font-size: 1.17em; color: #ffffff; }
`;

const ConsultationManager = ({ category = 'astrology' }) => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState(false);
    const [activeTab, setActiveTab] = useState('list');
    const [editingId, setEditingId] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [generatedSlug, setGeneratedSlug] = useState('');
    const [, setManualSlug] = useState('');
    const [useManualSlug, setUseManualSlug] = useState(false);
    const [formTab, setFormTab] = useState('basic');
    const [useManualSeoTitle, setUseManualSeoTitle] = useState(false);
    
    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        category: category,
        price: '',
        priceNumeric: 0,
        quickDescription: '',
        shortDescription: '',
        longDescription: '',
        fullDescription: '',
        icon: '🔮',
        type: category === 'astrology' ? 'Astrology Consultation' : 'Vastu Consultation',
        duration: '',
        expert: 'Naveen Bhagat Ji',
        features: [],
        includes: [],
        whatYouGet: [],
        benefits: [],
        faqs: [],
        seoTitle: '',
        seoDescription: '',
        seoKeywords: '',
        order: 0,
        isActive: true,
        isFeatured: false
    });

    const [newItem, setNewItem] = useState('');
    const [newFaq, setNewFaq] = useState({ question: '', answer: '' });

    const fetchServices = useCallback(async () => {
        setLoading(true);
        try {
            const { data } = await consultationAPI.getAll({ category });
            setServices(data.data || []);
        } catch (error) {
            console.error('Error fetching services:', error);
        } finally {
            setLoading(false);
        }
    }, [category]);

    useEffect(() => {
        fetchServices();
    }, [fetchServices]);

    // Auto generate SEO title from main title
    useEffect(() => {
        if (formData.title && !useManualSeoTitle) {
            const autoTitle = `${formData.title} | ${category === 'astrology' ? 'Best Astrology Consultation' : 'Best Vastu Consultation'} | NB Astro`;
            setFormData(prev => ({ ...prev, seoTitle: autoTitle }));
        }
    }, [formData.title, useManualSeoTitle, category]);

    // Generate slug from title
    useEffect(() => {
        if (!useManualSlug && formData.title) {
            const slug = formData.title
                .toLowerCase()
                .replace(/[^a-zA-Z0-9]/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
            setGeneratedSlug(slug);
            setFormData(prev => ({ ...prev, slug }));
        }
    }, [formData.title, useManualSlug]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                return;
            }
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const submitData = new FormData();
            Object.keys(formData).forEach(key => {
                if (Array.isArray(formData[key])) {
                    submitData.append(key, JSON.stringify(formData[key]));
                } else if (key !== 'image') {
                    submitData.append(key, formData[key] || '');
                }
            });
            if (imageFile) submitData.append('image', imageFile);

            if (editingId) {
                await consultationAPI.update(editingId, submitData);
                alert('Service updated successfully');
            } else {
                await consultationAPI.create(submitData);
                alert('Service created successfully');
            }

            resetForm();
            fetchServices();
            setActiveTab('list');
        } catch (error) {
            alert('Failed to save service: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this service?')) {
            try {
                await consultationAPI.delete(id);
                alert('Deleted successfully');
                fetchServices();
            } catch {
                alert('Failed to delete');
            }
        }
    };

   const handleEdit = (service) => {
    setEditingId(service._id);
    setFormData({
        title: service.title || '',
        slug: service.slug || '',
        category: service.category || category,
        price: service.price || '',
        priceNumeric: service.priceNumeric || 0,
        quickDescription: service.quickDescription || '',
        shortDescription: service.shortDescription || '',
        longDescription: service.longDescription || '',
        fullDescription: service.fullDescription || '',
        icon: service.icon || '🔮',
        type: service.type || (category === 'astrology' ? 'Astrology Consultation' : 'Vastu Consultation'),
        duration: service.duration || '',
        expert: service.expert || 'Naveen Bhagat Ji',
        features: service.features || [],
        includes: service.includes || [],
        whatYouGet: service.whatYouGet || [],
        benefits: service.benefits || [],
        faqs: service.faqs || [],
        seoTitle: service.seoTitle || '',
        seoDescription: service.seoDescription || '',
        seoKeywords: service.seoKeywords || '',
        order: service.order || 0,
        isActive: service.isActive !== undefined ? service.isActive : true,
        isFeatured: service.isFeatured || false
    });
    
    // ✅ FIX: Image preview set karo properly
    if (service.image && service.image !== '') {
        // Agar image already saved hai database mein
        const imageUrl = service.image.startsWith('http') ? service.image : `${service.image}`;
        setImagePreview(imageUrl);
    } else {
        setImagePreview('');
    }
    
    setManualSlug(service.slug || '');
    setUseManualSlug(!!service.slug);
    setUseManualSeoTitle(!!service.seoTitle);
    setFormTab('basic');
    setActiveTab('edit');
};
    const resetForm = () => {
        setEditingId(null);
        setFormData({
            title: '',
            slug: '',
            category: category,
            price: '',
            priceNumeric: 0,
            quickDescription: '',
            shortDescription: '',
            longDescription: '',
            fullDescription: '',
            icon: '🔮',
            type: category === 'astrology' ? 'Astrology Consultation' : 'Vastu Consultation',
            duration: '',
            expert: 'Naveen Bhagat Ji',
            features: [],
            includes: [],
            whatYouGet: [],
            benefits: [],
            faqs: [],
            seoTitle: '',
            seoDescription: '',
            seoKeywords: '',
            order: 0,
            isActive: true,
            isFeatured: false
        });
        setImageFile(null);
        setImagePreview('');
        setGeneratedSlug('');
        setManualSlug('');
        setUseManualSlug(false);
        setUseManualSeoTitle(false);
        setFormTab('basic');
    };

    const toggleStatus = async (id) => {
        try {
            await consultationAPI.toggleStatus(id);
            fetchServices();
        } catch {
            alert('Failed to toggle status');
        }
    };

    const moveUp = async (index) => {
        if (index === 0) return;
        const newOrder = [...services];
        [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
        const reorderData = newOrder.map((item, idx) => ({ id: item._id, order: idx }));
        try {
            await consultationAPI.reorder(reorderData);
            fetchServices();
        } catch {
            alert('Failed to reorder');
        }
    };

    const moveDown = async (index) => {
        if (index === services.length - 1) return;
        const newOrder = [...services];
        [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
        const reorderData = newOrder.map((item, idx) => ({ id: item._id, order: idx }));
        try {
            await consultationAPI.reorder(reorderData);
            fetchServices();
        } catch {
            alert('Failed to reorder');
        }
    };

    const addItem = (field) => {
        if (newItem.trim()) {
            setFormData({
                ...formData,
                [field]: [...(formData[field] || []), newItem.trim()]
            });
            setNewItem('');
        }
    };

    const removeItem = (field, index) => {
        setFormData({
            ...formData,
            [field]: (formData[field] || []).filter((_, i) => i !== index)
        });
    };

    const addFaq = () => {
        if (newFaq.question.trim() && newFaq.answer.trim()) {
            setFormData({
                ...formData,
                faqs: [...(formData.faqs || []), { ...newFaq }]
            });
            setNewFaq({ question: '', answer: '' });
        }
    };

    const removeFaq = (index) => {
        setFormData({
            ...formData,
            faqs: (formData.faqs || []).filter((_, i) => i !== index)
        });
    };

    if (loading && !services.length) {
        return <div className="p-8 text-center text-white">Loading...</div>;
    }

    return (
        <div className="p-6">
            <style>{quillStyles}</style>

            {/* Header */}
            <div className="flex justify-between items-center mb-6">
                <div>
                    <h2 className="text-2xl font-bold text-white capitalize">{category} Services</h2>
                    <p className="text-gray-400 text-sm">Manage your {category} consultation services</p>
                </div>
                {activeTab === 'list' && (
                    <button onClick={() => { resetForm(); setActiveTab('add'); }} className="bg-[#00B7B3] text-black px-4 py-2 rounded-lg font-semibold hover:bg-[#33C5C2]">+ Add New</button>
                )}
                {activeTab !== 'list' && (
                    <button onClick={() => { resetForm(); setActiveTab('list'); }} className="border border-gray-600 text-gray-300 px-4 py-2 rounded-lg font-semibold hover:bg-gray-800">← Back to List</button>
                )}
            </div>

            {/* LIST TAB */}
            {activeTab === 'list' && (
                <>
                    <div className="grid grid-cols-3 gap-4 mb-6">
                        <div className="bg-gray-800 rounded-lg p-4 text-center">
                            <p className="text-3xl font-bold text-[#00B7B3]">{services.length}</p>
                            <p className="text-gray-400 text-sm">Total Services</p>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-4 text-center">
                            <p className="text-3xl font-bold text-green-400">{services.filter(s => s.isActive).length}</p>
                            <p className="text-gray-400 text-sm">Active</p>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-4 text-center">
                            <p className="text-3xl font-bold text-yellow-400">{services.filter(s => s.isFeatured).length}</p>
                            <p className="text-gray-400 text-sm">Featured</p>
                        </div>
                    </div>

                    <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800">
                        <table className="w-full text-left">
                            <thead className="bg-gray-800 border-b border-gray-700">
                                <tr>
                                    <th className="px-4 py-3 text-gray-300 w-20">Order</th>
                                    <th className="px-4 py-3 text-gray-300 w-16">Image</th>
                                    <th className="px-4 py-3 text-gray-300">Title</th>
                                    <th className="px-4 py-3 text-gray-300 w-32">Price</th>
                                    <th className="px-4 py-3 text-gray-300 w-24">Status</th>
                                    <th className="px-4 py-3 text-gray-300 w-32">Actions</th>
                                </tr>
                            </thead>
                           <tbody>
    {services.map((service, index) => (
        <tr key={service._id} className="border-b border-gray-800 hover:bg-gray-800/50">
            <td className="px-4 py-3">
                <div className="flex gap-1">
                    <button onClick={() => moveUp(index)} className="w-7 h-7 bg-gray-700 rounded text-white text-sm hover:bg-gray-600">↑</button>
                    <button onClick={() => moveDown(index)} className="w-7 h-7 bg-gray-700 rounded text-white text-sm hover:bg-gray-600">↓</button>
                </div>
            </td>
            <td className="px-4 py-3">
                {service.image && service.image !== '' ? (
                    <img 
                        src={service.image.startsWith('http') ? service.image : `${service.image}`} 
                        alt={service.title} 
                        className="w-10 h-10 object-cover rounded" 
                        onError={(e) => {
                            e.target.onerror = null;
                            e.target.style.display = 'none';
                        }}
                    />
                ) : (
                    <div className="w-10 h-10 bg-gray-700 rounded flex items-center justify-center text-gray-500 text-xs">No img</div>
                )}
            </td>
            <td className="px-4 py-3">
                <div className="text-white font-medium">{service.title}</div>
                <div className="text-gray-500 text-xs">{service.type}</div>
            </td>
            <td className="px-4 py-3 text-[#00B7B3] font-semibold">{service.price}</td>
            <td className="px-4 py-3">
                <button onClick={() => toggleStatus(service._id)} className={`px-2 py-1 rounded text-xs ${service.isActive ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {service.isActive ? 'Active' : 'Inactive'}
                </button>
            </td>
            <td className="px-4 py-3">
                <div className="flex gap-2">
                    <button onClick={() => handleEdit(service)} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded text-xs hover:bg-blue-500/30">Edit</button>
                    <button onClick={() => handleDelete(service._id)} className="px-3 py-1 bg-red-500/20 text-red-400 rounded text-xs hover:bg-red-500/30">Delete</button>
                </div>
            </td>
        </tr>
    ))}
</tbody>
                        </table>
                    </div>
                </>
            )}

            {/* ADD/EDIT FORM WITH TABS */}
            {(activeTab === 'add' || activeTab === 'edit') && (
                <div className="bg-gray-900 rounded-lg border border-gray-800">
                    {/* Form Navigation Tabs */}
                    <div className="flex border-b border-gray-800 overflow-x-auto">
                        {['basic', 'content', 'lists', 'faq', 'seo'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setFormTab(tab)}
                                className={`px-6 py-3 text-sm font-medium transition-all ${formTab === tab ? 'text-[#00B7B3] border-b-2 border-[#00B7B3]' : 'text-gray-400 hover:text-white'}`}
                            >
                                {tab === 'basic' && '📋 Basic Info'}
                                {tab === 'content' && '✏️ Content'}
                                {tab === 'lists' && '📝 Lists & Benefits'}
                                {tab === 'faq' && '❓ FAQs'}
                                {tab === 'seo' && '🔍 SEO Settings'}
                            </button>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                        {/* BASIC INFO TAB */}
                        {formTab === 'basic' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 mb-1 text-sm font-medium">Title *</label>
                                    <input type="text" value={formData.title} onChange={(e) => setFormData({...formData, title: e.target.value})} required className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none" />
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-1 text-sm font-medium">Slug / URL (for SEO)</label>
                                    <div className="flex gap-2 mb-2">
                                        <button type="button" onClick={() => setUseManualSlug(false)} className={`px-3 py-1 rounded text-sm ${!useManualSlug ? 'bg-[#00B7B3] text-black' : 'bg-gray-700 text-gray-300'}`}>Auto Generate</button>
                                        <button type="button" onClick={() => setUseManualSlug(true)} className={`px-3 py-1 rounded text-sm ${useManualSlug ? 'bg-[#00B7B3] text-black' : 'bg-gray-700 text-gray-300'}`}>Manual</button>
                                    </div>
                                    {useManualSlug ? (
                                        <input type="text" value={formData.slug} onChange={(e) => setFormData({...formData, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-')})} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none" placeholder="enter-custom-slug" />
                                    ) : (
                                        <input type="text" value={generatedSlug} readOnly className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400" />
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-300 mb-1 text-sm font-medium">Price (Display) *</label>
                                        <input type="text" value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} required className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3]" placeholder="₹25,000" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 mb-1 text-sm font-medium">Price (Numeric) *</label>
                                        <input type="number" value={formData.priceNumeric} onChange={(e) => setFormData({...formData, priceNumeric: parseInt(e.target.value) || 0})} required className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3]" />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-gray-300 mb-1 text-sm font-medium">Icon (Emoji)</label>
                                        <input type="text" value={formData.icon} onChange={(e) => setFormData({...formData, icon: e.target.value})} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3]" placeholder="🔮" />
                                    </div>
                                    <div>
                                        <label className="block text-gray-300 mb-1 text-sm font-medium">Duration</label>
                                        <input type="text" value={formData.duration} onChange={(e) => setFormData({...formData, duration: e.target.value})} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3]" placeholder="60 mins" />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-1 text-sm font-medium">Expert</label>
                                    <input type="text" value={formData.expert} onChange={(e) => setFormData({...formData, expert: e.target.value})} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3]" />
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-1 text-sm font-medium">Quick Description (SEO Meta) *</label>
                                    <textarea value={formData.quickDescription} onChange={(e) => setFormData({...formData, quickDescription: e.target.value})} required maxLength="160" rows="2" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3]" />
                                    <div className="text-right text-xs text-gray-500 mt-1">{formData.quickDescription.length}/160</div>
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-1 text-sm font-medium">Service Image (Max 5MB)</label>
                                    <div className="flex gap-4 items-center">
                                        {imagePreview && <img src={imagePreview} alt="Preview" className="w-16 h-16 object-cover rounded-lg border border-gray-700" />}
                                        <input type="file" accept="image/*" onChange={handleImageChange} className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-[#00B7B3]" />
                                    </div>
                                    <ImageSizeHint type="service" />
                                </div>

                                <div className="flex gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({...formData, isActive: e.target.checked})} className="w-4 h-4 accent-[#00B7B3]" />
                                        <span className="text-gray-300">Active</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({...formData, isFeatured: e.target.checked})} className="w-4 h-4 accent-[#00B7B3]" />
                                        <span className="text-gray-300">Featured</span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* CONTENT TAB */}
                        {formTab === 'content' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 mb-1 text-sm font-medium">Short Description *</label>
                                    <textarea value={formData.shortDescription} onChange={(e) => setFormData({...formData, shortDescription: e.target.value})} required rows="3" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3]" />
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-1 text-sm font-medium">Long Description *</label>
                                    <textarea value={formData.longDescription} onChange={(e) => setFormData({...formData, longDescription: e.target.value})} required rows="5" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3]" />
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-2 text-sm font-medium">Full Description (Rich Text) *</label>
                                    <TinyMCEEditor
                                        value={formData.fullDescription} 
                                        onChange={(value) => setFormData({...formData, fullDescription: value})} 
                                        placeholder="Write detailed description... Use #00B7B3 color for highlights, adjust font sizes, add lists, images, and more..."
                                        minHeight={340}
                                    />
                                </div>
                            </div>
                        )}

                        {/* LISTS TAB */}
                        {formTab === 'lists' && (
                            <div className="space-y-6">
                                <div className="border border-gray-700 rounded-lg p-4">
                                    <label className="block text-gray-300 mb-2 text-sm font-medium">✨ Features</label>
                                    <div className="flex gap-2 mb-3">
                                        <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Add feature..." className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-[#00B7B3]" />
                                        <button type="button" onClick={() => addItem('features')} className="px-4 py-2 bg-[#00B7B3] text-black rounded-lg text-sm font-medium hover:bg-[#33C5C2]">Add</button>
                                    </div>
                                    <div className="space-y-1">
                                        {(formData.features || []).map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center bg-gray-800/50 px-3 py-2 rounded">
                                                <span className="text-gray-300 text-sm">• {item}</span>
                                                <button type="button" onClick={() => removeItem('features', idx)} className="text-red-400 text-sm hover:text-red-300">Remove</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border border-gray-700 rounded-lg p-4">
                                    <label className="block text-gray-300 mb-2 text-sm font-medium">✅ What's Included</label>
                                    <div className="flex gap-2 mb-3">
                                        <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Add include..." className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-[#00B7B3]" />
                                        <button type="button" onClick={() => addItem('includes')} className="px-4 py-2 bg-[#00B7B3] text-black rounded-lg text-sm font-medium hover:bg-[#33C5C2]">Add</button>
                                    </div>
                                    <div className="space-y-1">
                                        {(formData.includes || []).map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center bg-gray-800/50 px-3 py-2 rounded">
                                                <span className="text-gray-300 text-sm">✓ {item}</span>
                                                <button type="button" onClick={() => removeItem('includes', idx)} className="text-red-400 text-sm hover:text-red-300">Remove</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="border border-gray-700 rounded-lg p-4">
                                    <label className="block text-gray-300 mb-2 text-sm font-medium">📌 What You Get</label>
                                    <div className="flex gap-2 mb-3">
                                        <input type="text" value={newItem} onChange={(e) => setNewItem(e.target.value)} placeholder="Add item..." className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-[#00B7B3]" />
                                        <button type="button" onClick={() => addItem('whatYouGet')} className="px-4 py-2 bg-[#00B7B3] text-black rounded-lg text-sm font-medium hover:bg-[#33C5C2]">Add</button>
                                    </div>
                                    <div className="space-y-1">
                                        {(formData.whatYouGet || []).map((item, idx) => (
                                            <div key={idx} className="flex justify-between items-center bg-gray-800/50 px-3 py-2 rounded">
                                                <span className="text-gray-300 text-sm">📌 {item}</span>
                                                <button type="button" onClick={() => removeItem('whatYouGet', idx)} className="text-red-400 text-sm hover:text-red-300">Remove</button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* FAQ TAB */}
                        {formTab === 'faq' && (
                            <div className="border border-gray-700 rounded-lg p-4">
                                <label className="block text-gray-300 mb-2 text-sm font-medium">❓ Frequently Asked Questions</label>
                                <div className="space-y-3 mb-4">
                                    <input type="text" value={newFaq.question} onChange={(e) => setNewFaq({...newFaq, question: e.target.value})} placeholder="Question" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-[#00B7B3]" />
                                    <textarea value={newFaq.answer} onChange={(e) => setNewFaq({...newFaq, answer: e.target.value})} placeholder="Answer" rows="2" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white text-sm focus:border-[#00B7B3]" />
                                    <button type="button" onClick={addFaq} className="px-4 py-2 bg-[#00B7B3] text-black rounded-lg text-sm font-medium hover:bg-[#33C5C2] w-full">+ Add FAQ</button>
                                </div>
                                <div className="space-y-2">
                                    {(formData.faqs || []).map((faq, idx) => (
                                        <div key={idx} className="bg-gray-800 px-3 py-2 rounded">
                                            <div className="flex justify-between">
                                                <p className="text-white text-sm font-medium">❓ {faq.question}</p>
                                                <button type="button" onClick={() => removeFaq(idx)} className="text-red-400 text-sm hover:text-red-300">Remove</button>
                                            </div>
                                            <p className="text-gray-400 text-sm mt-1">{faq.answer}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* SEO TAB */}
                        {formTab === 'seo' && (
                            <div className="border border-gray-700 rounded-lg p-4 space-y-4">
                                <h4 className="text-white font-semibold mb-3">🔍 SEO Settings</h4>
                                
                                <div>
                                    <div className="flex justify-between items-center mb-1">
                                        <label className="text-gray-300 text-sm font-medium">SEO Title</label>
                                        <button 
                                            type="button" 
                                            onClick={() => setUseManualSeoTitle(!useManualSeoTitle)} 
                                            className="text-xs text-[#00B7B3] hover:underline"
                                        >
                                            {useManualSeoTitle ? '🔄 Auto Generate' : '✏️ Edit Manually'}
                                        </button>
                                    </div>
                                    {useManualSeoTitle ? (
                                        <input 
                                            type="text" 
                                            value={formData.seoTitle} 
                                            onChange={(e) => setFormData({...formData, seoTitle: e.target.value})} 
                                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3]" 
                                            placeholder="Enter custom SEO title"
                                        />
                                    ) : (
                                        <input 
                                            type="text" 
                                            value={formData.seoTitle} 
                                            readOnly 
                                            className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-300 cursor-not-allowed" 
                                        />
                                    )}
                                    <p className="text-gray-500 text-xs mt-1">
                                        {useManualSeoTitle ? 'Manually edit your SEO title.' : 'Auto-generated from your service title. Click "Edit Manually" to customize.'}
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-1 text-sm font-medium">SEO Description</label>
                                    <textarea value={formData.seoDescription} onChange={(e) => setFormData({...formData, seoDescription: e.target.value})} rows="2" className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3]" />
                                    <p className="text-gray-500 text-xs mt-1">Recommended: 150-160 characters. Appears in search results.</p>
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-1 text-sm font-medium">SEO Keywords</label>
                                    <input type="text" value={formData.seoKeywords} onChange={(e) => setFormData({...formData, seoKeywords: e.target.value})} className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3]" placeholder="keyword1, keyword2, keyword3" />
                                    <p className="text-gray-500 text-xs mt-1">Comma separated keywords for search engines.</p>
                                </div>
                            </div>
                        )}

                        {/* Form Buttons */}
                        <div className="flex gap-3 pt-6 mt-6 border-t border-gray-800">
                            <button type="submit" disabled={loading} className="flex-1 bg-[#00B7B3] text-black py-2 rounded-lg font-semibold hover:bg-[#33C5C2] disabled:opacity-50">
                                {loading ? '💾 Saving...' : (editingId ? '✏️ Update Service' : '➕ Create Service')}
                            </button>
                            <button type="button" onClick={() => { resetForm(); setActiveTab('list'); }} className="px-6 py-2 bg-gray-700 text-white rounded-lg font-semibold hover:bg-gray-600">
                                ❌ Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default ConsultationManager;
