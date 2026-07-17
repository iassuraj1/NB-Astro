// admin/components/ContactInfoManager.jsx
import React, { useState, useEffect } from 'react';
import { contactInfoAPI } from '../../services/api';  // Changed from contactAPI to contactInfoAPI
import { Save, Facebook, Twitter, Instagram, Linkedin } from 'lucide-react';

const ContactInfoManager = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        address: '',
        phone: '',
        email: '',
        socialLinks: {
            facebook: '',
            twitter: '',
            instagram: '',
            linkedin: ''
        }
    });

    useEffect(() => {
        fetchContactInfo();
    }, []);

    const fetchContactInfo = async () => {
        setLoading(true);
        try {
            const { data } = await contactInfoAPI.getContact();  // Changed from contactAPI to contactInfoAPI
            if (data.data) {
                setFormData({
                    address: data.data.address || '',
                    phone: data.data.phone || '',
                    email: data.data.email || '',
                    socialLinks: {
                        facebook: data.data.socialLinks?.facebook || '',
                        twitter: data.data.socialLinks?.twitter || '',
                        instagram: data.data.socialLinks?.instagram || '',
                        linkedin: data.data.socialLinks?.linkedin || ''
                    }
                });
            }
        } catch (error) {
            console.error('Error fetching contact info:', error);
            alert('Failed to fetch contact info');
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

    const handleSocialChange = (platform, value) => {
        setFormData({
            ...formData,
            socialLinks: {
                ...formData.socialLinks,
                [platform]: value
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await contactInfoAPI.updateContact(formData);  // Changed from contactAPI to contactInfoAPI
            alert('Contact information updated successfully');
        } catch (error) {
            console.error('Error saving contact info:', error);
            alert('Failed to save contact information');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Contact Information Management</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
                <div>
                    <label className="block text-gray-300 mb-2">Address</label>
                    <textarea
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-gray-300 mb-2">Phone Number</label>
                    <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                    />
                </div>

                <div>
                    <label className="block text-gray-300 mb-2">Email Address</label>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                    />
                </div>

                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white">Social Media Links</h3>
                    
                    <div>
                        <label className="block text-gray-300 mb-2 flex items-center gap-2">
                            <Facebook size={18} /> Facebook
                        </label>
                        <input
                            type="url"
                            value={formData.socialLinks.facebook}
                            onChange={(e) => handleSocialChange('facebook', e.target.value)}
                            placeholder="https://facebook.com/yourpage"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2 flex items-center gap-2">
                            <Twitter size={18} /> Twitter
                        </label>
                        <input
                            type="url"
                            value={formData.socialLinks.twitter}
                            onChange={(e) => handleSocialChange('twitter', e.target.value)}
                            placeholder="https://twitter.com/yourprofile"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2 flex items-center gap-2">
                            <Instagram size={18} /> Instagram
                        </label>
                        <input
                            type="url"
                            value={formData.socialLinks.instagram}
                            onChange={(e) => handleSocialChange('instagram', e.target.value)}
                            placeholder="https://instagram.com/yourprofile"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2 flex items-center gap-2">
                            <Linkedin size={18} /> LinkedIn
                        </label>
                        <input
                            type="url"
                            value={formData.socialLinks.linkedin}
                            onChange={(e) => handleSocialChange('linkedin', e.target.value)}
                            placeholder="https://linkedin.com/in/yourprofile"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        />
                    </div>
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

export default ContactInfoManager;