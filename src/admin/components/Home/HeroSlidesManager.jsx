



// // admin/components/HeroSlidesManager.jsx
// import React, { useState, useEffect } from 'react';
// import { heroAPI } from '../../services/api';
// import { Trash2, Edit2, Plus, X, Upload, MoveUp, MoveDown } from 'lucide-react';
// import ImageSizeHint from '../Common/ImageSizeHint';

// const HeroSlidesManager = () => {
//     const [slides, setSlides] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [showModal, setShowModal] = useState(false);
//     const [editingSlide, setEditingSlide] = useState(null);
//     const [formData, setFormData] = useState({
//         title: '',
//         highlight: '',
//         description: '',
//         link: '',
//         icon: 'StarIcon',
//         order: 0,
//         isActive: true
//     });
//     const [imageFile, setImageFile] = useState(null);
//     const [mobileImageFile, setMobileImageFile] = useState(null);
//     const [imagePreview, setImagePreview] = useState('');
//     const [mobileImagePreview, setMobileImagePreview] = useState('');

//     const API_BASE_URL = ''; // Your backend URL

//     useEffect(() => {
//         fetchSlides();
//     }, []);

//     const fetchSlides = async () => {
//         setLoading(true);
//         try {
//             const { data } = await heroAPI.getSlides();
//             setSlides(data.data);
//         } catch (error) {
//             console.error('Error fetching slides:', error);
//             alert('Failed to fetch slides');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleInputChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData({
//             ...formData,
//             [name]: type === 'checkbox' ? checked : value
//         });
//     };

//     const handleImageChange = (e, type) => {
//         const file = e.target.files[0];
//         if (file) {
//             if (type === 'image') {
//                 setImageFile(file);
//                 setImagePreview(URL.createObjectURL(file));
//             } else {
//                 setMobileImageFile(file);
//                 setMobileImagePreview(URL.createObjectURL(file));
//             }
//         }
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
        
//         // Validate all required fields
//         if (!formData.title) {
//             alert('Title is required');
//             return;
//         }
//         if (!formData.description) {
//             alert('Description is required');
//             return;
//         }
//         if (!formData.link) {
//             alert('Link is required');
//             return;
//         }
        
//         // Validate images for new slide
//         if (!editingSlide && (!imageFile || !mobileImageFile)) {
//             alert('Please select both desktop and mobile images');
//             return;
//         }
        
//         setLoading(true);

//         try {
//             const submitData = new FormData();
            
//             // Append ALL fields
//             submitData.append('title', formData.title);
//             submitData.append('highlight', formData.highlight || '');
//             submitData.append('description', formData.description);
//             submitData.append('link', formData.link);
//             submitData.append('icon', formData.icon);
//             submitData.append('order', String(formData.order));
//             submitData.append('isActive', String(formData.isActive));

//             // Append images only if new files are selected
//             if (imageFile) {
//                 submitData.append('image', imageFile);
//             }
//             if (mobileImageFile) {
//                 submitData.append('mobileImage', mobileImageFile);
//             }

//             let response;
//             if (editingSlide) {
//                 response = await fetch(`${API_BASE_URL}/api/home/hero-slides/${editingSlide._id}`, {
//                     method: 'PUT',
//                     headers: {
//                         'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
//                     },
//                     body: submitData
//                 });
//             } else {
//                 response = await fetch(`${API_BASE_URL}/api/home/hero-slides`, {
//                     method: 'POST',
//                     headers: {
//                         'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
//                     },
//                     body: submitData
//                 });
//             }
            
//             const result = await response.json();
            
//             if (!response.ok) {
//                 throw new Error(result.message || 'Failed to save');
//             }
            
//             alert(editingSlide ? 'Slide updated successfully' : 'Slide created successfully');
//             resetForm();
//             fetchSlides();
//         } catch (error) {
//             console.error('Error saving slide:', error);
//             alert(error.message || 'Failed to save slide');
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleDelete = async (id) => {
//         if (window.confirm('Are you sure you want to delete this slide?')) {
//             try {
//                 await heroAPI.deleteSlide(id);
//                 alert('Slide deleted successfully');
//                 fetchSlides();
//             } catch (error) {
//                 console.error('Error deleting slide:', error);
//                 alert('Failed to delete slide');
//             }
//         }
//     };

//    const handleEdit = (slide) => {
//     setEditingSlide(slide);
//     setFormData({
//         title: slide.title || '',
//         highlight: slide.highlight || '',
//         description: slide.description || '',
//         link: slide.link || '',
//         icon: slide.icon || 'StarIcon',
//         order: slide.order || 0,
//         isActive: slide.isActive !== undefined ? slide.isActive : true
//     });
    
//     // Important: Add base URL for image preview
//     const API_BASE_URL = '';
//     setImagePreview(slide.image ? `${API_BASE_URL}${slide.image}` : '');
//     setMobileImagePreview(slide.mobileImage ? `${API_BASE_URL}${slide.mobileImage}` : '');
    
//     setImageFile(null);
//     setMobileImageFile(null);
//     setShowModal(true);
// };

//     const resetForm = () => {
//         setEditingSlide(null);
//         setFormData({
//             title: '',
//             highlight: '',
//             description: '',
//             link: '',
//             icon: 'StarIcon',
//             order: 0,
//             isActive: true
//         });
//         setImageFile(null);
//         setMobileImageFile(null);
//         setImagePreview('');
//         setMobileImagePreview('');
//         setShowModal(false);
//     };

//     const moveSlide = async (index, direction) => {
//         const newOrder = [...slides];
//         const targetIndex = direction === 'up' ? index - 1 : index + 1;
        
//         if (targetIndex < 0 || targetIndex >= slides.length) return;
        
//         [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];
        
//         try {
//             for (let i = 0; i < newOrder.length; i++) {
//                 await heroAPI.updateSlide(newOrder[i]._id, { order: i });
//             }
//             fetchSlides();
//         } catch (error) {
//             console.error('Error reordering slides:', error);
//         }
//     };

//     const icons = ['StarIcon', 'CrystalBallIcon', 'HomeIcon', 'HeartIcon'];

//     return (
//         <div className="p-6">
//             <div className="flex justify-between items-center mb-6">
//                 <h2 className="text-2xl font-bold text-white">Hero Slides Management</h2>
//                 <button
//                     onClick={() => setShowModal(true)}
//                     className="bg-[#00B7B3] text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#33C5C2] transition"
//                 >
//                     <Plus size={20} />
//                     Add New Slide
//                 </button>
//             </div>

//             {loading && !slides.length ? (
//                 <div className="text-center py-12">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B7B3] mx-auto"></div>
//                 </div>
//             ) : (
//                 <div className="grid gap-4">
//                     {slides.map((slide, index) => (
//                         <div key={slide._id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-[#00B7B3] transition">
//                             <div className="flex gap-4">
//                                 <img
//                                     src={`${API_BASE_URL}${slide.image}`}
//                                     alt={slide.title}
//                                     className="w-32 h-20 object-cover rounded"
//                                     onError={(e) => {
//                                         e.target.src = 'https://via.placeholder.com/128x80?text=No+Image';
//                                     }}
//                                 />
//                                 <div className="flex-1">
//                                     <div className="flex items-center gap-2 mb-2">
//                                         <h3 className="text-white font-semibold">{slide.title}</h3>
//                                         <span className="text-[#00B7B3]">{slide.highlight}</span>
//                                         {!slide.isActive && (
//                                             <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Inactive</span>
//                                         )}
//                                     </div>
//                                     <p className="text-gray-400 text-sm line-clamp-2">{slide.description}</p>
//                                     <div className="flex gap-3 mt-3">
//                                         <button
//                                             onClick={() => handleEdit(slide)}
//                                             className="text-[#00B7B3] text-sm flex items-center gap-1 hover:text-[#33C5C2]"
//                                         >
//                                             <Edit2 size={14} /> Edit
//                                         </button>
//                                         <button
//                                             onClick={() => handleDelete(slide._id)}
//                                             className="text-red-500 text-sm flex items-center gap-1 hover:text-red-400"
//                                         >
//                                             <Trash2 size={14} /> Delete
//                                         </button>
//                                         {index > 0 && (
//                                             <button
//                                                 onClick={() => moveSlide(index, 'up')}
//                                                 className="text-gray-400 text-sm flex items-center gap-1"
//                                             >
//                                                 <MoveUp size={14} /> Up
//                                             </button>
//                                         )}
//                                         {index < slides.length - 1 && (
//                                             <button
//                                                 onClick={() => moveSlide(index, 'down')}
//                                                 className="text-gray-400 text-sm flex items-center gap-1"
//                                             >
//                                                 <MoveDown size={14} /> Down
//                                             </button>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     ))}
//                 </div>
//             )}

//             {/* Modal for Add/Edit */}
//             {showModal && (
//                 <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
//                     <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
//                         <div className="flex justify-between items-center p-4 border-b border-gray-700">
//                             <h3 className="text-xl font-bold text-white">
//                                 {editingSlide ? 'Edit Slide' : 'Add New Slide'}
//                             </h3>
//                             <button onClick={resetForm} className="text-gray-400 hover:text-white">
//                                 <X size={24} />
//                             </button>
//                         </div>

//                         <form onSubmit={handleSubmit} className="p-4 space-y-4">
//                             <div>
//                                 <label className="block text-gray-300 mb-2">Title</label>
//                                 <input
//                                     type="text"
//                                     name="title"
//                                     value={formData.title}
//                                     onChange={handleInputChange}
//                                     required
//                                     className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-gray-300 mb-2">Highlight Text</label>
//                                 <input
//                                     type="text"
//                                     name="highlight"
//                                     value={formData.highlight}
//                                     onChange={handleInputChange}
//                                     required
//                                     className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-gray-300 mb-2">Description</label>
//                                 <textarea
//                                     name="description"
//                                     value={formData.description}
//                                     onChange={handleInputChange}
//                                     required
//                                     rows="3"
//                                     className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-gray-300 mb-2">Link URL</label>
//                                 <input
//                                     type="text"
//                                     name="link"
//                                     value={formData.link}
//                                     onChange={handleInputChange}
//                                     required
//                                     placeholder="/astrology-consultation"
//                                     className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-gray-300 mb-2">Icon</label>
//                                 <select
//                                     name="icon"
//                                     value={formData.icon}
//                                     onChange={handleInputChange}
//                                     className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
//                                 >
//                                     {icons.map(icon => (
//                                         <option key={icon} value={icon}>{icon}</option>
//                                     ))}
//                                 </select>
//                             </div>

//                             <div>
//                                 <label className="block text-gray-300 mb-2">Order</label>
//                                 <input
//                                     type="number"
//                                     name="order"
//                                     value={formData.order}
//                                     onChange={handleInputChange}
//                                     className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
//                                 />
//                             </div>

//                             <div>
//                                 <label className="block text-gray-300 mb-2">Desktop Image</label>
//                                 <div className="flex items-center gap-4">
//                                     {imagePreview && (
//                                         <img src={imagePreview} alt="Preview" className="w-24 h-16 object-cover rounded" />
//                                     )}
//                                     <label className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700">
//                                         <Upload size={16} />
//                                         {imagePreview ? 'Change Image' : 'Upload Image'}
//                                         <input
//                                             type="file"
//                                             accept="image/*"
//                                             onChange={(e) => handleImageChange(e, 'image')}
//                                             className="hidden"
//                                         />
//                                     </label>
//                                 </div>
//                                 {editingSlide && !imageFile && (
//                                     <p className="text-xs text-gray-500 mt-1">Current image will be kept if no new image is uploaded</p>
//                                 )}
//                                 <ImageSizeHint type="hero" />
//                             </div>

//                             <div>
//                                 <label className="block text-gray-300 mb-2">Mobile Image</label>
//                                 <div className="flex items-center gap-4">
//                                     {mobileImagePreview && (
//                                         <img src={mobileImagePreview} alt="Preview" className="w-16 h-24 object-cover rounded" />
//                                     )}
//                                     <label className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700">
//                                         <Upload size={16} />
//                                         {mobileImagePreview ? 'Change Image' : 'Upload Mobile Image'}
//                                         <input
//                                             type="file"
//                                             accept="image/*"
//                                             onChange={(e) => handleImageChange(e, 'mobile')}
//                                             className="hidden"
//                                         />
//                                     </label>
//                                 </div>
//                                 {editingSlide && !mobileImageFile && (
//                                     <p className="text-xs text-gray-500 mt-1">Current image will be kept if no new image is uploaded</p>
//                                 )}
//                                 <ImageSizeHint type="hero" />
//                             </div>

//                             <div className="flex items-center gap-2">
//                                 <input
//                                     type="checkbox"
//                                     name="isActive"
//                                     checked={formData.isActive}
//                                     onChange={handleInputChange}
//                                     className="w-4 h-4 text-[#00B7B3]"
//                                 />
//                                 <label className="text-gray-300">Active</label>
//                             </div>

//                             <div className="flex gap-3 pt-4">
//                                 <button
//                                     type="submit"
//                                     disabled={loading}
//                                     className="flex-1 bg-[#00B7B3] text-black py-2 rounded-lg font-semibold hover:bg-[#33C5C2] transition disabled:opacity-50"
//                                 >
//                                     {loading ? 'Saving...' : (editingSlide ? 'Update' : 'Create')}
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={resetForm}
//                                     className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
//                                 >
//                                     Cancel
//                                 </button>
//                             </div>
//                         </form>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default HeroSlidesManager;



import React, { useState, useEffect } from 'react';
import { heroAPI } from '../../services/api';
import { Trash2, Edit2, Plus, X, Upload, MoveUp, MoveDown } from 'lucide-react';
import ImageSizeHint from '../Common/ImageSizeHint';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

const HeroSlidesManager = () => {
    const [slides, setSlides] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [editingSlide, setEditingSlide] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        highlight: '',
        description: '',
        link: '',
        icon: 'StarIcon',
        order: 0,
        isActive: true
    });
    const [imageFile, setImageFile] = useState(null);
    const [mobileImageFile, setMobileImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [mobileImagePreview, setMobileImagePreview] = useState('');
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        fetchSlides();
    }, []);

    const fetchSlides = async () => {
        setLoading(true);
        try {
            const { data } = await heroAPI.getSlides();
            setSlides(data.data);
        } catch (error) {
            console.error('Error fetching slides:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    // ✅ FIXED: IMAGE UPLOAD WITH AUTO-DELETE
    const handleImageUpload = async (file, type) => {
        if (!file) return;

        setIsUploading(true);

        const uploadFormData = new FormData();
        uploadFormData.append('file', file);

        // ✅ Get old image path from editingSlide
        let oldImagePath = '';
        if (editingSlide) {
            if (type === 'image') {
                oldImagePath = editingSlide.image || '';
            } else {
                oldImagePath = editingSlide.mobileImage || '';
            }
        }

        if (oldImagePath) {
            uploadFormData.append('oldImagePath', oldImagePath);
            console.log('🗑️ Sending old image for deletion:', oldImagePath);
        }

        uploadFormData.append('field', 'hero');
        uploadFormData.append('folder', 'hero');

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('/api/upload/with-delete', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: uploadFormData
            });
            const data = await response.json();

            if (response.ok && data.success) {
                if (type === 'image') {
                    setImagePreview(data.imagePath);
                    setImageFile(file);
                    // ✅ Update editingSlide image path
                    if (editingSlide) {
                        setEditingSlide(prev => ({ ...prev, image: data.imagePath }));
                    }
                } else {
                    setMobileImagePreview(data.imagePath);
                    setMobileImageFile(file);
                    // ✅ Update editingSlide mobileImage path
                    if (editingSlide) {
                        setEditingSlide(prev => ({ ...prev, mobileImage: data.imagePath }));
                    }
                }
                if (data.oldImageDeleted) {
                    console.log('✅ Old image deleted');
                }
                return data.imagePath;
            } else {
                alert('❌ ' + (data.message || 'Upload failed'));
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('❌ Failed to upload image');
        } finally {
            setIsUploading(false);
        }
    };

    const handleImageChange = async (e, type) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 5 * 1024 * 1024) {
                alert('Image size should be less than 5MB');
                e.target.value = '';
                return;
            }
            await handleImageUpload(file, type);
        }
    };

    const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.link) {
        alert('Please fill all required fields');
        return;
    }

    // ✅ For new slide, both images required
    if (!editingSlide && (!imageFile || !mobileImageFile)) {
        alert('Please select both desktop and mobile images');
        return;
    }

    setLoading(true);

    try {
        const submitData = new FormData();

        submitData.append('title', formData.title);
        submitData.append('highlight', formData.highlight || '');
        submitData.append('description', formData.description);
        submitData.append('link', formData.link);
        submitData.append('icon', formData.icon);
        submitData.append('order', String(formData.order));
        submitData.append('isActive', String(formData.isActive));

        // ✅ IMPORTANT: Send the image paths from state
        // These are already updated by handleImageUpload
        let finalImage = '';
        let finalMobileImage = '';

        if (editingSlide) {
            // For edit: use the image paths from editingSlide (updated by handleImageUpload)
            finalImage = editingSlide.image || formData.image || '';
            finalMobileImage = editingSlide.mobileImage || formData.mobileImage || '';
            
            // If new image was uploaded, use the preview path (which is the new path)
            if (imagePreview && imageFile) {
                finalImage = imagePreview;
            }
            if (mobileImagePreview && mobileImageFile) {
                finalMobileImage = mobileImagePreview;
            }
        } else {
            // For new slide
            finalImage = imagePreview || '';
            finalMobileImage = mobileImagePreview || '';
        }

        // ✅ Append image paths to FormData
        submitData.append('image', finalImage);
        submitData.append('mobileImage', finalMobileImage);

        // ✅ DEBUG: Log what's being sent
        console.log('📤 Submitting:');
        console.log('  image:', finalImage);
        console.log('  mobileImage:', finalMobileImage);
        console.log('  editingSlide:', editingSlide?._id);

        let response;
        if (editingSlide) {
            response = await fetch(`${API_BASE_URL}/api/home/hero-slides/${editingSlide._id}`, {
                method: 'PUT',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: submitData
            });
        } else {
            response = await fetch(`${API_BASE_URL}/api/home/hero-slides`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                },
                body: submitData
            });
        }

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || 'Failed to save');
        }

        alert(editingSlide ? '✅ Slide updated successfully' : '✅ Slide created successfully');
        resetForm();
        fetchSlides();
    } catch (error) {
        console.error('Error saving slide:', error);
        alert('❌ ' + (error.message || 'Failed to save slide'));
    } finally {
        setLoading(false);
    }
};

    const handleDelete = async (id) => {
        if (window.confirm('Delete this slide?')) {
            try {
                await heroAPI.deleteSlide(id);
                fetchSlides();
            } catch (error) {
                console.error('Error deleting slide:', error);
            }
        }
    };

    const handleEdit = (slide) => {
        setEditingSlide(slide);
        setFormData({
            title: slide.title || '',
            highlight: slide.highlight || '',
            description: slide.description || '',
            link: slide.link || '',
            icon: slide.icon || 'StarIcon',
            order: slide.order || 0,
            isActive: slide.isActive !== undefined ? slide.isActive : true
        });

        setImagePreview(slide.image ? `${API_BASE_URL}${slide.image}` : '');
        setMobileImagePreview(slide.mobileImage ? `${API_BASE_URL}${slide.mobileImage}` : '');
        setImageFile(null);
        setMobileImageFile(null);
        setShowModal(true);
    };

    const resetForm = () => {
        setEditingSlide(null);
        setFormData({
            title: '',
            highlight: '',
            description: '',
            link: '',
            icon: 'StarIcon',
            order: 0,
            isActive: true
        });
        setImageFile(null);
        setMobileImageFile(null);
        setImagePreview('');
        setMobileImagePreview('');
        setShowModal(false);
    };

    const moveSlide = async (index, direction) => {
        const newOrder = [...slides];
        const targetIndex = direction === 'up' ? index - 1 : index + 1;

        if (targetIndex < 0 || targetIndex >= slides.length) return;

        [newOrder[index], newOrder[targetIndex]] = [newOrder[targetIndex], newOrder[index]];

        try {
            for (let i = 0; i < newOrder.length; i++) {
                await heroAPI.updateSlide(newOrder[i]._id, { order: i });
            }
            fetchSlides();
        } catch (error) {
            console.error('Error reordering slides:', error);
        }
    };

    const icons = ['StarIcon', 'CrystalBallIcon', 'HomeIcon', 'HeartIcon'];

    return (
        <div className="p-6">
            <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-white">Hero Slides Management</h2>
                <button
                    onClick={() => setShowModal(true)}
                    className="bg-[#00B7B3] text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#33C5C2] transition"
                >
                    <Plus size={20} />
                    Add New Slide
                </button>
            </div>

            {loading && !slides.length ? (
                <div className="text-center py-12">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B7B3] mx-auto"></div>
                </div>
            ) : (
                <div className="grid gap-4">
                    {slides.map((slide, index) => (
                        <div key={slide._id} className="bg-gray-800 rounded-lg p-4 border border-gray-700 hover:border-[#00B7B3] transition">
                            <div className="flex gap-4">
                                <img
                                    src={`${API_BASE_URL}${slide.image}`}
                                    alt={slide.title}
                                    className="w-32 h-20 object-cover rounded"
                                    onError={(e) => {
                                        e.target.src = 'https://via.placeholder.com/128x80?text=No+Image';
                                    }}
                                />
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-white font-semibold">{slide.title}</h3>
                                        <span className="text-[#00B7B3]">{slide.highlight}</span>
                                        {!slide.isActive && (
                                            <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">Inactive</span>
                                        )}
                                    </div>
                                    <p className="text-gray-400 text-sm line-clamp-2">{slide.description}</p>
                                    <div className="flex gap-3 mt-3">
                                        <button
                                            onClick={() => handleEdit(slide)}
                                            className="text-[#00B7B3] text-sm flex items-center gap-1 hover:text-[#33C5C2]"
                                        >
                                            <Edit2 size={14} /> Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(slide._id)}
                                            className="text-red-500 text-sm flex items-center gap-1 hover:text-red-400"
                                        >
                                            <Trash2 size={14} /> Delete
                                        </button>
                                        {index > 0 && (
                                            <button
                                                onClick={() => moveSlide(index, 'up')}
                                                className="text-gray-400 text-sm flex items-center gap-1"
                                            >
                                                <MoveUp size={14} /> Up
                                            </button>
                                        )}
                                        {index < slides.length - 1 && (
                                            <button
                                                onClick={() => moveSlide(index, 'down')}
                                                className="text-gray-400 text-sm flex items-center gap-1"
                                            >
                                                <MoveDown size={14} /> Down
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center p-4 border-b border-gray-700">
                            <h3 className="text-xl font-bold text-white">
                                {editingSlide ? 'Edit Slide' : 'Add New Slide'}
                            </h3>
                            <button onClick={resetForm} className="text-gray-400 hover:text-white">
                                <X size={24} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="p-4 space-y-4">
                            <div>
                                <label className="block text-gray-300 mb-2">Title *</label>
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
                                <label className="block text-gray-300 mb-2">Highlight Text</label>
                                <input
                                    type="text"
                                    name="highlight"
                                    value={formData.highlight}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Description *</label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    required
                                    rows="3"
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Link URL *</label>
                                <input
                                    type="text"
                                    name="link"
                                    value={formData.link}
                                    onChange={handleInputChange}
                                    required
                                    placeholder="/astrology-consultation"
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Icon</label>
                                <select
                                    name="icon"
                                    value={formData.icon}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                                >
                                    {icons.map(icon => (
                                        <option key={icon} value={icon}>{icon}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Order</label>
                                <input
                                    type="number"
                                    name="order"
                                    value={formData.order}
                                    onChange={handleInputChange}
                                    className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Desktop Image</label>
                                <div className="flex items-center gap-4">
                                    {imagePreview && (
                                        <img src={imagePreview} alt="Preview" className="w-24 h-16 object-cover rounded" />
                                    )}
                                    <label className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700">
                                        <Upload size={16} />
                                        {isUploading ? 'Uploading...' : (imagePreview ? 'Change Image' : 'Upload Image')}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, 'image')}
                                            className="hidden"
                                            disabled={isUploading}
                                        />
                                    </label>
                                </div>
                                <ImageSizeHint type="hero" />
                            </div>

                            <div>
                                <label className="block text-gray-300 mb-2">Mobile Image</label>
                                <div className="flex items-center gap-4">
                                    {mobileImagePreview && (
                                        <img src={mobileImagePreview} alt="Preview" className="w-16 h-24 object-cover rounded" />
                                    )}
                                    <label className="flex items-center gap-2 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700">
                                        <Upload size={16} />
                                        {isUploading ? 'Uploading...' : (mobileImagePreview ? 'Change Image' : 'Upload Mobile Image')}
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleImageChange(e, 'mobile')}
                                            className="hidden"
                                            disabled={isUploading}
                                        />
                                    </label>
                                </div>
                                <ImageSizeHint type="hero" />
                            </div>

                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    name="isActive"
                                    checked={formData.isActive}
                                    onChange={handleInputChange}
                                    className="w-4 h-4 text-[#00B7B3]"
                                />
                                <label className="text-gray-300">Active</label>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <button
                                    type="submit"
                                    disabled={loading || isUploading}
                                    className="flex-1 bg-[#00B7B3] text-black py-2 rounded-lg font-semibold hover:bg-[#33C5C2] transition disabled:opacity-50"
                                >
                                    {loading ? 'Saving...' : (editingSlide ? 'Update' : 'Create')}
                                </button>
                                <button
                                    type="button"
                                    onClick={resetForm}
                                    className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default HeroSlidesManager;