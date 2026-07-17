// admin/pages/AboutPageContent.jsx
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Loader2, Save, ArrowLeft, Plus, Trash2, Upload } from 'lucide-react';
import { aboutPageAPI } from '../services/api';
import TinyMCEEditor from '../components/Common/TinyMCEEditor';
import ImageSizeHint from '../components/Common/ImageSizeHint';

const AboutPageContent = () => {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [, setUploading] = useState(false);
    const [activeTab, setActiveTab] = useState('hero');
    const [content, setContent] = useState({
        hero: {
            title: '',
            subtitle: '',
            description: '',
            image: '',
            breadcrumbText: 'Home / About Guru Ji'
        },
        introduction: {
            title: '',
            subtitle: '',
            badgeText: '',
            image: '',
            imageAlt: '',
            content: ''
        },
        teaching: {
            title: '',
            badgeText: '',
            image: '',
            imageAlt: '',
            content: ''
        },
        consultation: {
            title: '',
            badgeText: '',
            image: '',
            imageAlt: '',
            quote: '',
            content: ''
        },
        expertise: {
            title: '',
            description: '',
            items: [{ text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }, { text: '' }],
            footerText: ''
        },
        beyond: {
            title: '',
            content: '',
            image: '',
            imageAlt: ''
        },
        location: {
            title: '',
            description: '',
            placeName: '',
            image: '',
            imageAlt: ''
        },
        cta: {
            title: '',
            buttonOneText: '',
            buttonOneLink: '/astrology-consultation',
            buttonTwoText: '',
            buttonTwoLink: '/astrology-courses'
        },
        seoTitle: '',
        seoDescription: '',
        seoKeywords: ''
    });

    useEffect(() => {
        fetchContent();
    }, []);

    const fetchContent = async () => {
        setLoading(true);
        try {
            const { data } = await aboutPageAPI.getContent();
            if (data.success && data.data) {
                setContent(data.data);
            }
        } catch (error) {
            console.error('Error fetching:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async () => {
        setSaving(true);
        try {
            await aboutPageAPI.saveContent(content);
            alert('About page content saved successfully!');
        } catch (error) {
            console.error('Save error:', error);
            alert('Failed to save: ' + (error.response?.data?.message || error.message));
        } finally {
            setSaving(false);
        }
    };

    const handleImageUpload = async (field, file) => {
        if (!file) return;
        
        const formData = new FormData();
        formData.append('aboutImage', file);
        
        setUploading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('/api/upload/about-image', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });
            const data = await response.json();
            
            if (response.ok && data.success) {
                // Update the specific field
                const fieldPath = field.split('.');
                const newContent = { ...content };
                let current = newContent;
                for (let i = 0; i < fieldPath.length - 1; i++) {
                    current = current[fieldPath[i]];
                }
                current[fieldPath[fieldPath.length - 1]] = `${data.imagePath}`;
                setContent(newContent);
                alert('Image uploaded successfully!');
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const addExpertiseItem = () => {
        setContent({
            ...content,
            expertise: {
                ...content.expertise,
                items: [...content.expertise.items, { text: '' }]
            }
        });
    };

    const removeExpertiseItem = (index) => {
        const newItems = content.expertise.items.filter((_, i) => i !== index);
        setContent({
            ...content,
            expertise: { ...content.expertise, items: newItems }
        });
    };

    const TabButton = ({ id, label, active, onClick }) => (
        <button
            onClick={() => onClick(id)}
            className={`px-4 py-2 rounded-lg transition-all whitespace-nowrap ${
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
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#00B7B3] animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-black/90 border-b border-[#00B7B3]/20">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <Link href="/admin/dashboard" className="p-2 rounded-lg bg-white/5 hover:bg-white/10">
                                <ArrowLeft className="w-5 h-5 text-gray-400" />
                            </Link>
                            <div>
                                <h1 className="text-2xl font-bold text-white">
                                    About Page Content
                                </h1>
                                <p className="text-gray-500 text-sm">
                                    Manage all content on the About page
                                </p>
                            </div>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={saving}
                            className="px-6 py-2 bg-[#00B7B3] text-black rounded-lg font-semibold hover:bg-[#00B7B3]/80 disabled:opacity-50 flex items-center gap-2"
                        >
                            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Save Changes
                        </button>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="max-w-7xl mx-auto px-6 py-6">
                <div className="flex gap-2 border-b border-[#00B7B3]/20 pb-3 overflow-x-auto flex-wrap">
                    <TabButton id="hero" label="🎯 Hero Section" active={activeTab} onClick={setActiveTab} />
                    <TabButton id="intro" label="👤 Introduction" active={activeTab} onClick={setActiveTab} />
                    <TabButton id="teaching" label="📚 Teaching" active={activeTab} onClick={setActiveTab} />
                    <TabButton id="consultation" label="💬 Consultation" active={activeTab} onClick={setActiveTab} />
                    <TabButton id="expertise" label="⭐ Expertise" active={activeTab} onClick={setActiveTab} />
                    <TabButton id="beyond" label="🌀 Beyond Astrology" active={activeTab} onClick={setActiveTab} />
                    <TabButton id="location" label="📍 Location" active={activeTab} onClick={setActiveTab} />
                    <TabButton id="cta" label="🎬 CTA Section" active={activeTab} onClick={setActiveTab} />
                    <TabButton id="seo" label="🔍 SEO" active={activeTab} onClick={setActiveTab} />
                </div>

                {/* Hero Tab */}
                {activeTab === 'hero' && (
                    <div className="mt-6 space-y-6">
                        <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Hero Section</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Hero Title</label>
                                    <input
                                        type="text"
                                        value={content.hero.title}
                                        onChange={(e) => setContent({ ...content, hero: { ...content.hero, title: e.target.value } })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="About Guru Ji"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Hero Subtitle</label>
                                    <input
                                        type="text"
                                        value={content.hero.subtitle}
                                        onChange={(e) => setContent({ ...content, hero: { ...content.hero, subtitle: e.target.value } })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="Naveen Bhagat — Vedic Astrologer, Educator & Mentor"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Hero Description</label>
                                    <textarea
                                        rows="3"
                                        value={content.hero.description}
                                        onChange={(e) => setContent({ ...content, hero: { ...content.hero, description: e.target.value } })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="Hero description..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Hero Background Image</label>
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            value={content.hero.image}
                                            onChange={(e) => setContent({ ...content, hero: { ...content.hero, image: e.target.value } })}
                                            className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                            placeholder="https://example.com/hero-image.jpg"
                                        />
                                        <label className="px-4 py-2 bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg cursor-pointer hover:bg-[#00B7B3]/30 flex items-center gap-2">
                                            <Upload className="w-4 h-4" />
                                            Upload
                                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload('hero.image', e.target.files[0])} />
                                        </label>
                                    </div>
                                    {content.hero.image && (
                                        <div className="mt-2">
                                            <img src={content.hero.image} alt="Hero preview" className="w-32 h-32 object-cover rounded-lg border border-[#00B7B3]/30" />
                                        </div>
                                    )}
                                    <ImageSizeHint type="hero" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Introduction Tab */}
                {activeTab === 'intro' && (
                    <div className="mt-6 space-y-6">
                        <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Introduction Section</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Section Title</label>
                                    <input
                                        type="text"
                                        value={content.introduction.title}
                                        onChange={(e) => setContent({ ...content, introduction: { ...content.introduction, title: e.target.value } })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="I am Naveen Bhagat"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Badge Text (optional)</label>
                                    <input
                                        type="text"
                                        value={content.introduction.badgeText}
                                        onChange={(e) => setContent({ ...content, introduction: { ...content.introduction, badgeText: e.target.value } })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="🕉️"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Introduction Content (Rich Text)</label>
                                    <div className="dark-quill">
                                        <TinyMCEEditor
                                            value={content.introduction.content}
                                            onChange={(value) => setContent({ ...content, introduction: { ...content.introduction, content: value } })}
                                            placeholder="Write about Naveen Bhagat Ji..."
                                            minHeight={320}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Image URL</label>
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            value={content.introduction.image}
                                            onChange={(e) => setContent({ ...content, introduction: { ...content.introduction, image: e.target.value } })}
                                            className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        <label className="px-4 py-2 bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg cursor-pointer hover:bg-[#00B7B3]/30 flex items-center gap-2">
                                            <Upload className="w-4 h-4" />
                                            Upload
                                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload('introduction.image', e.target.files[0])} />
                                        </label>
                                    </div>
                                    {content.introduction.image && (
                                        <div className="mt-2">
                                            <img src={content.introduction.image} alt="Preview" className="w-32 h-32 object-cover rounded-lg border border-[#00B7B3]/30" />
                                        </div>
                                    )}
                                    <ImageSizeHint type="about" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Teaching Tab */}
                {activeTab === 'teaching' && (
                    <div className="mt-6 space-y-6">
                        <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Teaching Philosophy Section</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Section Title</label>
                                    <input
                                        type="text"
                                        value={content.teaching.title}
                                        onChange={(e) => setContent({ ...content, teaching: { ...content.teaching, title: e.target.value } })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="Teaching Philosophy"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Badge Text</label>
                                    <input
                                        type="text"
                                        value={content.teaching.badgeText}
                                        onChange={(e) => setContent({ ...content, teaching: { ...content.teaching, badgeText: e.target.value } })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="Teaching"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Content (Rich Text)</label>
                                    <div className="dark-quill">
                                        <TinyMCEEditor
                                            value={content.teaching.content}
                                            onChange={(value) => setContent({ ...content, teaching: { ...content.teaching, content: value } })}
                                            placeholder="Write about teaching philosophy..."
                                            minHeight={320}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Image URL</label>
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            value={content.teaching.image}
                                            onChange={(e) => setContent({ ...content, teaching: { ...content.teaching, image: e.target.value } })}
                                            className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        <label className="px-4 py-2 bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg cursor-pointer hover:bg-[#00B7B3]/30 flex items-center gap-2">
                                            <Upload className="w-4 h-4" />
                                            Upload
                                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload('teaching.image', e.target.files[0])} />
                                        </label>
                                    </div>
                                    <ImageSizeHint type="about" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Consultation Tab */}
                {activeTab === 'consultation' && (
                    <div className="mt-6 space-y-6">
                        <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Consultation Section</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Section Title</label>
                                    <input
                                        type="text"
                                        value={content.consultation.title}
                                        onChange={(e) => setContent({ ...content, consultation: { ...content.consultation, title: e.target.value } })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="Consultation Approach"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Badge Text</label>
                                    <input
                                        type="text"
                                        value={content.consultation.badgeText}
                                        onChange={(e) => setContent({ ...content, consultation: { ...content.consultation, badgeText: e.target.value } })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="Consultation"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Quote Text</label>
                                    <textarea
                                        rows="3"
                                        value={content.consultation.quote}
                                        onChange={(e) => setContent({ ...content, consultation: { ...content.consultation, quote: e.target.value } })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="I do not view astrology as a tool for fortune telling..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Content (Rich Text)</label>
                                    <div className="dark-quill">
                                        <TinyMCEEditor
                                            value={content.consultation.content}
                                            onChange={(value) => setContent({ ...content, consultation: { ...content.consultation, content: value } })}
                                            placeholder="Write about consultation approach..."
                                            minHeight={320}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Image URL</label>
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            value={content.consultation.image}
                                            onChange={(e) => setContent({ ...content, consultation: { ...content.consultation, image: e.target.value } })}
                                            className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        <label className="px-4 py-2 bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg cursor-pointer hover:bg-[#00B7B3]/30 flex items-center gap-2">
                                            <Upload className="w-4 h-4" />
                                            Upload
                                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload('consultation.image', e.target.files[0])} />
                                        </label>
                                    </div>
                                    <ImageSizeHint type="about" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Expertise Tab */}
                {activeTab === 'expertise' && (
                    <div className="mt-6 space-y-6">
                        <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Expertise Section</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Section Title</label>
                                    <input
                                        type="text"
                                        value={content.expertise.title}
                                        onChange={(e) => setContent({ ...content, expertise: { ...content.expertise, title: e.target.value } })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="Areas of Expertise"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Description</label>
                                    <textarea
                                        rows="2"
                                        value={content.expertise.description}
                                        onChange={(e) => setContent({ ...content, expertise: { ...content.expertise, description: e.target.value } })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="Description..."
                                    />
                                </div>
                                
                                <div className="flex justify-between items-center">
                                    <h3 className="text-white font-semibold">Expertise Items</h3>
                                    <button
                                        onClick={addExpertiseItem}
                                        className="flex items-center gap-1 px-3 py-1 bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg text-sm hover:bg-[#00B7B3]/30"
                                    >
                                        <Plus className="w-4 h-4" /> Add Item
                                    </button>
                                </div>
                                
                                {content.expertise.items.map((item, idx) => (
                                    <div key={idx} className="border border-[#00B7B3]/20 rounded-xl p-4 relative">
                                        {content.expertise.items.length > 1 && (
                                            <button
                                                onClick={() => removeExpertiseItem(idx)}
                                                className="absolute top-3 right-3 text-red-400 hover:text-red-300"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        )}
                                        <div className="space-y-2">
                                            <input
                                                type="text"
                                                placeholder="Expertise item text"
                                                value={item.text}
                                                onChange={(e) => {
                                                    const newItems = [...content.expertise.items];
                                                    newItems[idx].text = e.target.value;
                                                    setContent({ ...content, expertise: { ...content.expertise, items: newItems } });
                                                }}
                                                className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                            />
                                        </div>
                                    </div>
                                ))}
                                
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Footer Text</label>
                                    <textarea
                                        rows="2"
                                        value={content.expertise.footerText}
                                        onChange={(e) => setContent({ ...content, expertise: { ...content.expertise, footerText: e.target.value } })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="My work emphasizes accuracy, practicality, and real-world outcomes..."
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Beyond Astrology Tab */}
                {activeTab === 'beyond' && (
                    <div className="mt-6 space-y-6">
                        <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Beyond Astrology Section</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Section Title</label>
                                    <input
                                        type="text"
                                        value={content.beyond.title}
                                        onChange={(e) => setContent({ ...content, beyond: { ...content.beyond, title: e.target.value } })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="Beyond Astrology"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Content (Rich Text)</label>
                                    <div className="dark-quill">
                                        <TinyMCEEditor
                                            value={content.beyond.content}
                                            onChange={(value) => setContent({ ...content, beyond: { ...content.beyond, content: value } })}
                                            placeholder="Write about beyond astrology..."
                                            minHeight={320}
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Image URL</label>
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            value={content.beyond.image}
                                            onChange={(e) => setContent({ ...content, beyond: { ...content.beyond, image: e.target.value } })}
                                            className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        <label className="px-4 py-2 bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg cursor-pointer hover:bg-[#00B7B3]/30 flex items-center gap-2">
                                            <Upload className="w-4 h-4" />
                                            Upload
                                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload('beyond.image', e.target.files[0])} />
                                        </label>
                                    </div>
                                    <ImageSizeHint type="about" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Location Tab */}
                {activeTab === 'location' && (
                    <div className="mt-6 space-y-6">
                        <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Location Section</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Section Title</label>
                                    <input
                                        type="text"
                                        value={content.location.title}
                                        onChange={(e) => setContent({ ...content, location: { ...content.location, title: e.target.value } })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="Current Location"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Description</label>
                                    <textarea
                                        rows="3"
                                        value={content.location.description}
                                        onChange={(e) => setContent({ ...content, location: { ...content.location, description: e.target.value } })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="Currently based in Greater Noida..."
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Place Name</label>
                                    <input
                                        type="text"
                                        value={content.location.placeName}
                                        onChange={(e) => setContent({ ...content, location: { ...content.location, placeName: e.target.value } })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="Greater Noida"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Image URL</label>
                                    <div className="flex gap-4">
                                        <input
                                            type="text"
                                            value={content.location.image}
                                            onChange={(e) => setContent({ ...content, location: { ...content.location, image: e.target.value } })}
                                            className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                            placeholder="https://example.com/image.jpg"
                                        />
                                        <label className="px-4 py-2 bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg cursor-pointer hover:bg-[#00B7B3]/30 flex items-center gap-2">
                                            <Upload className="w-4 h-4" />
                                            Upload
                                            <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload('location.image', e.target.files[0])} />
                                        </label>
                                    </div>
                                    <ImageSizeHint type="about" />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* CTA Tab */}
                {activeTab === 'cta' && (
                    <div className="mt-6 space-y-6">
                        <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">Call to Action Section</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">CTA Title</label>
                                    <input
                                        type="text"
                                        value={content.cta.title}
                                        onChange={(e) => setContent({ ...content, cta: { ...content.cta, title: e.target.value } })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="Begin Your Journey with Guru Ji"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Button 1 Text</label>
                                    <input
                                        type="text"
                                        value={content.cta.buttonOneText}
                                        onChange={(e) => setContent({ ...content, cta: { ...content.cta, buttonOneText: e.target.value } })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="Book Consultation"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Button 1 Link</label>
                                    <input
                                        type="text"
                                        value={content.cta.buttonOneLink}
                                        onChange={(e) => setContent({ ...content, cta: { ...content.cta, buttonOneLink: e.target.value } })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="/astrology-consultation"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Button 2 Text</label>
                                    <input
                                        type="text"
                                        value={content.cta.buttonTwoText}
                                        onChange={(e) => setContent({ ...content, cta: { ...content.cta, buttonTwoText: e.target.value } })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="Explore Courses"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">Button 2 Link</label>
                                    <input
                                        type="text"
                                        value={content.cta.buttonTwoLink}
                                        onChange={(e) => setContent({ ...content, cta: { ...content.cta, buttonTwoLink: e.target.value } })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="/astrology-courses"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* SEO Tab */}
                {activeTab === 'seo' && (
                    <div className="mt-6 space-y-6">
                        <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
                            <h2 className="text-xl font-bold text-white mb-4">SEO Settings</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">SEO Title (60-70 characters)</label>
                                    <input
                                        type="text"
                                        value={content.seoTitle}
                                        onChange={(e) => setContent({ ...content, seoTitle: e.target.value })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="About Naveen Bhagat - Vedic Astrologer | NB Astro"
                                        maxLength="70"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">SEO Description (150-160 characters)</label>
                                    <textarea
                                        rows="3"
                                        value={content.seoDescription}
                                        onChange={(e) => setContent({ ...content, seoDescription: e.target.value })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="Meet Naveen Bhagat, a renowned Vedic astrologer with expertise in Prashna system and Nakshatra-based analysis..."
                                        maxLength="160"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-gray-400 mb-2">SEO Keywords (comma separated)</label>
                                    <input
                                        type="text"
                                        value={content.seoKeywords}
                                        onChange={(e) => setContent({ ...content, seoKeywords: e.target.value })}
                                        className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="naveen bhagat, vedic astrologer, astrology expert, prashna astrology, nakshatra astrology"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AboutPageContent;
