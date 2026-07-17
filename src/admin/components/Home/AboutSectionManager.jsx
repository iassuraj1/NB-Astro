// // admin/components/AboutSectionManager.jsx
// import React, { useState, useEffect } from 'react';
// import { aboutSectionAPI } from '../../services/api';
// import { Save, Upload, X, Plus, Trash2 } from 'lucide-react';

// const AboutSectionManager = () => {
//     const [loading, setLoading] = useState(false);
//     const [formData, setFormData] = useState({
//         name: '',
//         title: '',
//         description: '',
//         experience: 0,
//         clients: 0,
//         satisfaction: 0,
//         principles: [],
//         quote: ''
//     });
//     const [imageFile, setImageFile] = useState(null);
//     const [imagePreview, setImagePreview] = useState('');
//     const [newPrinciple, setNewPrinciple] = useState('');

//     const API_BASE_URL = ''; // Your backend URL

//     useEffect(() => {
//         fetchAboutSection();
//     }, []);

//     const fetchAboutSection = async () => {
//         setLoading(true);
//         try {
//             const response = await aboutSectionAPI.getAbout();
//             console.log('API Response:', response);
            
//             if (response.data && response.data.data) {
//                 const aboutData = response.data.data;
//                 console.log('About Data:', aboutData);
                
//                 setFormData({
//                     name: aboutData.name || '',
//                     title: aboutData.title || '',
//                     description: aboutData.description || '',
//                     experience: aboutData.experience || 0,
//                     clients: aboutData.clients || 0,
//                     satisfaction: aboutData.satisfaction || 0,
//                     principles: aboutData.principles || [],
//                     quote: aboutData.quote || ''
//                 });
                
//                 // Set image preview with full URL
//                 if (aboutData.image) {
//                     setImagePreview(`${API_BASE_URL}${aboutData.image}`);
//                 } else {
//                     setImagePreview('');
//                 }
//             } else {
//                 console.log('No data found, using default values');
//                 setFormData({
//                     name: '',
//                     title: '',
//                     description: '',
//                     experience: 0,
//                     clients: 0,
//                     satisfaction: 0,
//                     principles: [],
//                     quote: ''
//                 });
//                 setImagePreview('');
//             }
//         } catch (error) {
//             console.error('Error fetching about section:', error);
//             console.error('Error details:', error.response?.data);
//             alert(`Failed to fetch about section: ${error.response?.data?.message || error.message}`);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: value
//         });
//     };

//     const handleNumberChange = (e) => {
//         const { name, value } = e.target;
//         setFormData({
//             ...formData,
//             [name]: parseInt(value) || 0
//         });
//     };

//     const handleImageChange = (e) => {
//         const file = e.target.files[0];
//         if (file) {
//             // Validate file type
//             const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
//             if (!validTypes.includes(file.type)) {
//                 alert('Please upload a valid image file (JPEG, PNG, or WebP)');
//                 return;
//             }
            
//             // Validate file size (max 2MB)
//             if (file.size > 2 * 1024 * 1024) {
//                 alert('File size must be less than 2MB');
//                 return;
//             }
            
//             setImageFile(file);
//             setImagePreview(URL.createObjectURL(file));
//         }
//     };

//     const addPrinciple = () => {
//         if (newPrinciple.trim()) {
//             setFormData({
//                 ...formData,
//                 principles: [...formData.principles, newPrinciple.trim()]
//             });
//             setNewPrinciple('');
//         }
//     };

//     const removePrinciple = (index) => {
//         const newPrinciples = formData.principles.filter((_, i) => i !== index);
//         setFormData({
//             ...formData,
//             principles: newPrinciples
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setLoading(true);

//         try {
//             const submitData = new FormData();
//             submitData.append('name', formData.name);
//             submitData.append('title', formData.title);
//             submitData.append('description', formData.description);
//             submitData.append('experience', formData.experience.toString());
//             submitData.append('clients', formData.clients.toString());
//             submitData.append('satisfaction', formData.satisfaction.toString());
//             submitData.append('quote', formData.quote);
            
//             // Send principles as JSON string
//             submitData.append('principles', JSON.stringify(formData.principles));
            
//             if (imageFile) {
//                 submitData.append('aboutImage', imageFile);
//             }

//             console.log('Submitting about section data...');
//             for (let pair of submitData.entries()) {
//                 console.log(pair[0], '=', pair[1]);
//             }

//             const response = await aboutSectionAPI.updateAbout(submitData);
//             console.log('Update response:', response);
            
//             alert('About section updated successfully');
//             await fetchAboutSection(); // Refresh data
//         } catch (error) {
//             console.error('Error saving about section:', error);
//             console.error('Error response:', error.response?.data);
//             alert(`Failed to save about section: ${error.response?.data?.message || error.message}`);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <div className="p-6">
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-white">About Section Management</h2>
//                 {loading && (
//                     <div className="flex items-center gap-2 text-[#00B7B3]">
//                         <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#00B7B3]"></div>
//                         <span className="text-sm">Loading...</span>
//                     </div>
//                 )}
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div>
//                         <label className="block text-gray-300 mb-2">Name</label>
//                         <input
//                             type="text"
//                             name="name"
//                             value={formData.name}
//                             onChange={handleInputChange}
//                             required
//                             className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
//                             placeholder="e.g., Naveen Bhagat"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-gray-300 mb-2">Title</label>
//                         <input
//                             type="text"
//                             name="title"
//                             value={formData.title}
//                             onChange={handleInputChange}
//                             required
//                             className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
//                             placeholder="e.g., Vedic Astrologer & Vastu Consultant"
//                         />
//                     </div>
//                 </div>

//                 <div>
//                     <label className="block text-gray-300 mb-2">Description</label>
//                     <textarea
//                         name="description"
//                         value={formData.description}
//                         onChange={handleInputChange}
//                         required
//                         rows="6"
//                         className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
//                         placeholder="Write a detailed description about yourself..."
//                     />
//                 </div>

//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                     <div>
//                         <label className="block text-gray-300 mb-2">Years of Experience</label>
//                         <input
//                             type="number"
//                             name="experience"
//                             value={formData.experience}
//                             onChange={handleNumberChange}
//                             required
//                             min="0"
//                             className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-gray-300 mb-2">Happy Clients</label>
//                         <input
//                             type="number"
//                             name="clients"
//                             value={formData.clients}
//                             onChange={handleNumberChange}
//                             required
//                             min="0"
//                             className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
//                         />
//                     </div>

//                     <div>
//                         <label className="block text-gray-300 mb-2">Satisfaction Rate (%)</label>
//                         <input
//                             type="number"
//                             name="satisfaction"
//                             value={formData.satisfaction}
//                             onChange={handleNumberChange}
//                             required
//                             min="0"
//                             max="100"
//                             className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
//                         />
//                     </div>
//                 </div>

//                 <div>
//                     <label className="block text-gray-300 mb-2">Principles / Values</label>
//                     <div className="flex gap-2 mb-3">
//                         <input
//                             type="text"
//                             value={newPrinciple}
//                             onChange={(e) => setNewPrinciple(e.target.value)}
//                             placeholder="Add a principle (e.g., Trust, Integrity, Excellence)..."
//                             className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
//                             onKeyPress={(e) => {
//                                 if (e.key === 'Enter') {
//                                     e.preventDefault();
//                                     addPrinciple();
//                                 }
//                             }}
//                         />
//                         <button
//                             type="button"
//                             onClick={addPrinciple}
//                             className="bg-[#00B7B3] text-black px-4 py-2 rounded-lg hover:bg-[#33C5C2] transition flex items-center gap-2"
//                         >
//                             <Plus size={20} />
//                             Add
//                         </button>
//                     </div>
//                     <div className="space-y-2">
//                         {formData.principles.length === 0 ? (
//                             <p className="text-gray-500 text-sm italic">No principles added yet. Add your core values above.</p>
//                         ) : (
//                             formData.principles.map((principle, index) => (
//                                 <div key={index} className="flex items-center gap-2 bg-gray-800 rounded-lg p-3">
//                                     <span className="text-[#00B7B3] text-lg">•</span>
//                                     <span className="flex-1 text-gray-300">{principle}</span>
//                                     <button
//                                         type="button"
//                                         onClick={() => removePrinciple(index)}
//                                         className="text-red-500 hover:text-red-400 transition p-1"
//                                     >
//                                         <Trash2 size={16} />
//                                     </button>
//                                 </div>
//                             ))
//                         )}
//                     </div>
//                 </div>

//                 <div>
//                     <label className="block text-gray-300 mb-2">Quote / Motto</label>
//                     <textarea
//                         name="quote"
//                         value={formData.quote}
//                         onChange={handleInputChange}
//                         required
//                         rows="3"
//                         className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
//                         placeholder="e.g., 'Your journey to cosmic wisdom begins here...'"
//                     />
//                 </div>

//                 <div>
//                     <label className="block text-gray-300 mb-2">Profile Image</label>
//                     <div className="flex items-center gap-6">
//                         {imagePreview && (
//                             <div className="relative">
//                                 <img 
//                                     src={imagePreview} 
//                                     alt="Profile Preview" 
//                                     className="w-32 h-32 object-cover rounded-lg border-2 border-gray-700"
//                                     onError={(e) => {
//                                         e.target.src = 'https://via.placeholder.com/128x128?text=No+Image';
//                                     }}
//                                 />
//                             </div>
//                         )}
//                         <label className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 transition">
//                             <Upload size={16} />
//                             {imagePreview ? 'Change Image' : 'Upload Image'}
//                             <input
//                                 type="file"
//                                 accept="image/*"
//                                 onChange={handleImageChange}
//                                 className="hidden"
//                             />
//                         </label>
//                     </div>
//                     <p className="text-gray-500 text-xs mt-2">
//                         Recommended: Square image, max 2MB (JPG, PNG, or WebP)
//                     </p>
//                 </div>

//                 <div className="flex justify-end pt-4 border-t border-gray-800">
//                     <button
//                         type="submit"
//                         disabled={loading}
//                         className="bg-[#00B7B3] text-black px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#33C5C2] transition disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                         <Save size={20} />
//                         {loading ? 'Saving...' : 'Save Changes'}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default AboutSectionManager;



import React, { useState, useEffect, useRef } from 'react';
import { aboutSectionAPI } from '../../services/api';
import { Save, Upload, X, Plus, Trash2 } from 'lucide-react';
import ImageSizeHint from '../Common/ImageSizeHint';

const AboutSectionManager = () => {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        title: '',
        description: '',
        experience: 0,
        clients: 0,
        satisfaction: 0,
        principles: [],
        quote: ''
    });
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [newPrinciple, setNewPrinciple] = useState('');
    const isSubmitting = useRef(false); // Prevent double submission

    const API_BASE_URL = '';

    useEffect(() => {
        fetchAboutSection();
    }, []);

    const fetchAboutSection = async () => {
        setLoading(true);
        try {
            const response = await aboutSectionAPI.getAbout();
            console.log('API Response:', response);
            
            if (response.data && response.data.data) {
                const aboutData = response.data.data;
                console.log('About Data:', aboutData);
                
                setFormData({
                    name: aboutData.name || '',
                    title: aboutData.title || '',
                    description: aboutData.description || '',
                    experience: aboutData.experience || 0,
                    clients: aboutData.clients || 0,
                    satisfaction: aboutData.satisfaction || 0,
                    principles: aboutData.principles || [],
                    quote: aboutData.quote || ''
                });
                
                if (aboutData.image) {
                    setImagePreview(`${API_BASE_URL}${aboutData.image}`);
                } else {
                    setImagePreview('');
                }
            }
        } catch (error) {
            console.error('Error fetching about section:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleNumberChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: parseInt(value) || 0
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
            if (!validTypes.includes(file.type)) {
                alert('Please upload a valid image file (JPEG, PNG, or WebP)');
                return;
            }
            
            if (file.size > 2 * 1024 * 1024) {
                alert('File size must be less than 2MB');
                return;
            }
            
            setImageFile(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    const addPrinciple = () => {
        if (newPrinciple.trim()) {
            setFormData(prev => ({
                ...prev,
                principles: [...prev.principles, newPrinciple.trim()]
            }));
            setNewPrinciple('');
        }
    };

    const removePrinciple = (index) => {
        setFormData(prev => ({
            ...prev,
            principles: prev.principles.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Prevent double submission
        if (isSubmitting.current) {
            console.log('Already submitting...');
            return;
        }
        
        console.log('=== SUBMITTING ABOUT SECTION ===');
        console.log('formData:', formData);
        console.log('imageFile:', imageFile);
        
        isSubmitting.current = true;
        setLoading(true);

        try {
            // Create FormData and append all fields
            const submitData = new FormData();
            submitData.append('name', formData.name || '');
            submitData.append('title', formData.title || '');
            submitData.append('description', formData.description || '');
            submitData.append('experience', String(formData.experience || 0));
            submitData.append('clients', String(formData.clients || 0));
            submitData.append('satisfaction', String(formData.satisfaction || 0));
            submitData.append('quote', formData.quote || '');
            submitData.append('principles', JSON.stringify(formData.principles || []));
            
            // Only append image if a new file is selected
            if (imageFile && imageFile instanceof File) {
                submitData.append('aboutImage', imageFile);
                console.log('New image selected:', imageFile.name);
            }

            // Debug log
            console.log('FormData entries:');
            for (let pair of submitData.entries()) {
                console.log(pair[0], '=', pair[1]);
            }

            // Direct API call to avoid any middleware issues
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_BASE_URL}/api/home/about-section`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: submitData
            });
            
            const result = await response.json();
            console.log('Server response:', result);
            
            if (result.success) {
                alert('About section updated successfully');
                setImageFile(null); // Clear image file state
                await fetchAboutSection(); // Refresh data
            } else {
                throw new Error(result.message || 'Failed to update');
            }
        } catch (error) {
            console.error('Error saving about section:', error);
            alert(`Failed to save: ${error.message}`);
        } finally {
            setLoading(false);
            isSubmitting.current = false;
        }
    };

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">About Section Management</h2>
                {loading && (
                    <div className="flex items-center gap-2 text-[#00B7B3]">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#00B7B3]"></div>
                        <span className="text-sm">Loading...</span>
                    </div>
                )}
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-gray-300 mb-2">Name</label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                            placeholder="e.g., Naveen Bhagat"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            required
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                            placeholder="e.g., Vedic Astrologer & Vastu Consultant"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-300 mb-2">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        rows="6"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        placeholder="Write a detailed description about yourself..."
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <label className="block text-gray-300 mb-2">Years of Experience</label>
                        <input
                            type="number"
                            name="experience"
                            value={formData.experience}
                            onChange={handleNumberChange}
                            required
                            min="0"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">Happy Clients</label>
                        <input
                            type="number"
                            name="clients"
                            value={formData.clients}
                            onChange={handleNumberChange}
                            required
                            min="0"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        />
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">Satisfaction Rate (%)</label>
                        <input
                            type="number"
                            name="satisfaction"
                            value={formData.satisfaction}
                            onChange={handleNumberChange}
                            required
                            min="0"
                            max="100"
                            className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        />
                    </div>
                </div>

                <div>
                    <label className="block text-gray-300 mb-2">Principles / Values</label>
                    <div className="flex gap-2 mb-3">
                        <input
                            type="text"
                            value={newPrinciple}
                            onChange={(e) => setNewPrinciple(e.target.value)}
                            placeholder="Add a principle (e.g., Trust, Integrity, Excellence)..."
                            className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                            onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                    e.preventDefault();
                                    addPrinciple();
                                }
                            }}
                        />
                        <button
                            type="button"
                            onClick={addPrinciple}
                            className="bg-[#00B7B3] text-black px-4 py-2 rounded-lg hover:bg-[#33C5C2] transition flex items-center gap-2"
                        >
                            <Plus size={20} />
                            Add
                        </button>
                    </div>
                    <div className="space-y-2">
                        {formData.principles.length === 0 ? (
                            <p className="text-gray-500 text-sm italic">No principles added yet. Add your core values above.</p>
                        ) : (
                            formData.principles.map((principle, index) => (
                                <div key={index} className="flex items-center gap-2 bg-gray-800 rounded-lg p-3">
                                    <span className="text-[#00B7B3] text-lg">•</span>
                                    <span className="flex-1 text-gray-300">{principle}</span>
                                    <button
                                        type="button"
                                        onClick={() => removePrinciple(index)}
                                        className="text-red-500 hover:text-red-400 transition p-1"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div>
                    <label className="block text-gray-300 mb-2">Quote / Motto</label>
                    <textarea
                        name="quote"
                        value={formData.quote}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                        placeholder="e.g., 'Your journey to cosmic wisdom begins here...'"
                    />
                </div>

                <div>
                    <label className="block text-gray-300 mb-2">Profile Image</label>
                    <div className="flex items-center gap-6">
                        {imagePreview && (
                            <div className="relative">
                                <img 
                                    src={imagePreview} 
                                    alt="Profile Preview" 
                                    className="w-32 h-32 object-cover rounded-lg border-2 border-gray-700"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/128x128?text=No+Image';
                                    }}
                                />
                            </div>
                        )}
                        <label className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 transition">
                            <Upload size={16} />
                            {imagePreview ? 'Change Image' : 'Upload Image'}
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleImageChange}
                                className="hidden"
                            />
                        </label>
                    </div>
                    <p className="text-gray-500 text-xs mt-2">
                        Recommended: Square image, max 2MB (JPG, PNG, or WebP)
                    </p>
                    <ImageSizeHint type="about" />
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-800">
                    <button
                        type="submit"
                        disabled={loading}
                        className="bg-[#00B7B3] text-black px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-[#33C5C2] transition disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <Save size={20} />
                        {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AboutSectionManager;
