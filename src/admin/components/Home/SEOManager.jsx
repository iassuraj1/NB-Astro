// admin/components/SEOManager.jsx
import React, { useState, useEffect } from 'react';
import { seoAPI } from '../../services/api';
import { Save, Globe, Twitter, Facebook, Link2, Search } from 'lucide-react';

const SEOManager = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        metaTitle: '',
        metaDescription: '',
        metaKeywords: '',
        ogTitle: '',
        ogDescription: '',
        ogImage: '',
        twitterTitle: '',
        twitterDescription: '',
        twitterImage: '',
        canonicalUrl: '',
        robots: 'index, follow'
    });

    useEffect(() => {
        fetchSEOConfig();
    }, []);

    const fetchSEOConfig = async () => {
        setLoading(true);
        try {
            const { data } = await seoAPI.getSEO();
            if (data.data) {
                setFormData({
                    metaTitle: data.data.metaTitle || '',
                    metaDescription: data.data.metaDescription || '',
                    metaKeywords: data.data.metaKeywords || '',
                    ogTitle: data.data.ogTitle || '',
                    ogDescription: data.data.ogDescription || '',
                    ogImage: data.data.ogImage || '',
                    twitterTitle: data.data.twitterTitle || '',
                    twitterDescription: data.data.twitterDescription || '',
                    twitterImage: data.data.twitterImage || '',
                    canonicalUrl: data.data.canonicalUrl || '',
                    robots: data.data.robots || 'index, follow'
                });
            }
        } catch (error) {
            console.error('Error fetching SEO config:', error);
            alert('Failed to fetch SEO configuration');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await seoAPI.updateSEO(formData);
            alert('SEO configuration updated successfully');
        } catch (error) {
            console.error('Error saving SEO config:', error);
            alert('Failed to save SEO configuration');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">SEO Configuration</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Search size={20} className="text-[#00B7B3]" />
                        Meta Tags
                    </h3>
                    
                    <div>
                        <label className="block text-gray-300 mb-2">Meta Title</label>
                        <input
                            type="text"
                            name="metaTitle"
                            value={formData.metaTitle}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        />
                        <p className="text-gray-500 text-xs mt-1">
                            Recommended length: 50-60 characters. Current: {formData.metaTitle.length}
                        </p>
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">Meta Description</label>
                        <textarea
                            name="metaDescription"
                            value={formData.metaDescription}
                            onChange={handleInputChange}
                            required
                            rows="3"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        />
                        <p className="text-gray-500 text-xs mt-1">
                            Recommended length: 150-160 characters. Current: {formData.metaDescription.length}
                        </p>
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">Meta Keywords</label>
                        <input
                            type="text"
                            name="metaKeywords"
                            value={formData.metaKeywords}
                            onChange={handleInputChange}
                            placeholder="astrologer, vedic astrology, vastu consultant"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        />
                        <p className="text-gray-500 text-xs mt-1">Separate keywords with commas</p>
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Facebook size={20} className="text-[#00B7B3]" />
                        Open Graph (Facebook, LinkedIn)
                    </h3>
                    
                    <div>
                        <label className="block text-gray-300 mb-2">OG Title</label>
                        <input
                            type="text"
                            name="ogTitle"
                            value={formData.ogTitle}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">OG Description</label>
                        <textarea
                            name="ogDescription"
                            value={formData.ogDescription}
                            onChange={handleInputChange}
                            rows="2"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">OG Image URL</label>
                        <input
                            type="url"
                            name="ogImage"
                            value={formData.ogImage}
                            onChange={handleInputChange}
                            placeholder="https://nbastro.com/og-image.jpg"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        />
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Twitter size={20} className="text-[#00B7B3]" />
                        Twitter Card
                    </h3>
                    
                    <div>
                        <label className="block text-gray-300 mb-2">Twitter Title</label>
                        <input
                            type="text"
                            name="twitterTitle"
                            value={formData.twitterTitle}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">Twitter Description</label>
                        <textarea
                            name="twitterDescription"
                            value={formData.twitterDescription}
                            onChange={handleInputChange}
                            rows="2"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">Twitter Image URL</label>
                        <input
                            type="url"
                            name="twitterImage"
                            value={formData.twitterImage}
                            onChange={handleInputChange}
                            placeholder="https://nbastro.com/twitter-image.jpg"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        />
                    </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Link2 size={20} className="text-[#00B7B3]" />
                        Advanced Settings
                    </h3>
                    
                    <div>
                        <label className="block text-gray-300 mb-2">Canonical URL</label>
                        <input
                            type="url"
                            name="canonicalUrl"
                            value={formData.canonicalUrl}
                            onChange={handleInputChange}
                            placeholder="https://nbastro.com"
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">Robots Meta Tag</label>
                        <select
                            name="robots"
                            value={formData.robots}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        >
                            <option value="index, follow">Index, Follow (Default)</option>
                            <option value="noindex, follow">No Index, Follow</option>
                            <option value="index, nofollow">Index, No Follow</option>
                            <option value="noindex, nofollow">No Index, No Follow</option>
                        </select>
                    </div>
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#00B7B3] text-black px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#33C5C2] transition disabled:opacity-50"
                    >
                        <Save size={20} />
                        {loading ? 'Saving...' : 'Save SEO Settings'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SEOManager;