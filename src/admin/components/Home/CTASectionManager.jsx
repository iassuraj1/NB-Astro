// admin/components/CTASectionManager.jsx
import React, { useState, useEffect } from 'react';
import { ctaAPI } from '../../services/api';
import { Save } from 'lucide-react';

const CTASectionManager = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        button1Text: '',
        button1Link: '',
        button2Text: '',
        button2Link: '',
        guaranteeText: ''
    });

    useEffect(() => {
        fetchCTASection();
    }, []);

    const fetchCTASection = async () => {
        setLoading(true);
        try {
            const { data } = await ctaAPI.getCTA();
            if (data.data) {
                setFormData({
                    title: data.data.title || '',
                    description: data.data.description || '',
                    button1Text: data.data.button1Text || '',
                    button1Link: data.data.button1Link || '',
                    button2Text: data.data.button2Text || '',
                    button2Link: data.data.button2Link || '',
                    guaranteeText: data.data.guaranteeText || ''
                });
            }
        } catch (error) {
            console.error('Error fetching CTA section:', error);
            alert('Failed to fetch CTA section');
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
            await ctaAPI.updateCTA(formData);
            alert('CTA section updated successfully');
        } catch (error) {
            console.error('Error saving CTA section:', error);
            alert('Failed to save CTA section');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Call to Action Section Management</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                <div>
                    <label className="block text-gray-300 mb-2">Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-gray-300 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-300 mb-2">Button 1 Text</label>
                        <input
                            type="text"
                            name="button1Text"
                            value={formData.button1Text}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">Button 1 Link</label>
                        <input
                            type="text"
                            name="button1Link"
                            value={formData.button1Link}
                            onChange={handleInputChange}
                            required
                            placeholder="/astrology-consultation"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-300 mb-2">Button 2 Text</label>
                        <input
                            type="text"
                            name="button2Text"
                            value={formData.button2Text}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">Button 2 Link</label>
                        <input
                            type="text"
                            name="button2Link"
                            value={formData.button2Link}
                            onChange={handleInputChange}
                            required
                            placeholder="/astrology-courses"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-300 mb-2">Guarantee Text</label>
                    <input
                        type="text"
                        name="guaranteeText"
                        value={formData.guaranteeText}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#00B7B3] text-black px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#33C5C2] transition disabled:opacity-50"
                    >
                        <Save size={20} />
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CTASectionManager;