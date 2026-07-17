// import React, { useState, useEffect } from 'react';
// import { courseAPI } from '../../services/api';
// import { 
//     ArrowLeft, 
//     Upload, 
//     X, 
//     Plus, 
//     Trash2,
//     Loader2,
//     Image as ImageIcon
// } from 'lucide-react';

// const CourseForm = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [saving, setSaving] = useState(false);
//     const [imagePreview, setImagePreview] = useState(null);
//     const [uploadingImage, setUploadingImage] = useState(false);
    
//     const [formData, setFormData] = useState({
//         title: '',
//         category: 'ASTROLOGY COURSES',
//         price: '',
//         courseFee: '',
//         date: '',
//         timing: '',
//         courseDuration: '',
//         type: 'Online',
//         location: 'Zoom',
//         image: '',
//         whatIs: '',
//         aboutCourse: '',
//         courseContent: [''],
//         durationDetails: '',
//         note: 'Video Recording of Every Session Will Be Provided To Every Student After Session.',
//         highlights: [''],
//         level: '',
//         modules: 0,
//         includes: [''],
//         vastuType: '',
//         certificateAvailable: true,
//         language: 'Hindi & English',
//         isActive: true,
//         isFeatured: false
//     });

//     useEffect(() => {
//         if (id) {
//             fetchCourse();
//         }
//     }, [id]);

//     const fetchCourse = async () => {
//         setLoading(true);
//         try {
//             const { data } = await courseAPI.getById(id);
//             const course = data.course;
//             setFormData({
//                 title: course.title || '',
//                 category: course.category || 'ASTROLOGY COURSES',
//                 price: course.price || '',
//                 courseFee: course.courseFee || '',
//                 date: course.date || '',
//                 timing: course.timing || '',
//                 courseDuration: course.courseDuration || '',
//                 type: course.type || 'Online',
//                 location: course.location || 'Zoom',
//                 image: course.image || '',
//                 whatIs: course.whatIs || '',
//                 aboutCourse: course.aboutCourse || '',
//                 courseContent: course.courseContent?.length ? course.courseContent : [''],
//                 durationDetails: course.durationDetails || '',
//                 note: course.note || '',
//                 highlights: course.highlights?.length ? course.highlights : [''],
//                 level: course.level || '',
//                 modules: course.modules || 0,
//                 includes: course.includes?.length ? course.includes : [''],
//                 vastuType: course.vastuType || '',
//                 certificateAvailable: course.certificateAvailable !== undefined ? course.certificateAvailable : true,
//                 language: course.language || 'Hindi & English',
//                 isActive: course.isActive !== undefined ? course.isActive : true,
//                 isFeatured: course.isFeatured || false
//             });
//             if (course.image) {
//                 setImagePreview(`${course.image}`);
//             }
//         } catch (error) {
//             console.error('Error fetching course:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleImageUpload = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         // Validation
//         const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
//         const maxSize = 2 * 1024 * 1024; // 2MB

//         if (!allowedTypes.includes(file.type)) {
//             alert('Only JPG, PNG, WEBP, GIF images are allowed');
//             return;
//         }

//         if (file.size > maxSize) {
//             alert('Image size should be less than 2MB');
//             return;
//         }

//         setUploadingImage(true);
//         const formDataImage = new FormData();
//         formDataImage.append('courseImage', file);

//         try {
//             const token = localStorage.getItem('adminToken');
//             const response = await fetch('/api/upload/course-image', {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: formDataImage
//             });
//             const data = await response.json();
//             if (data.success) {
//                 setFormData({ ...formData, image: data.imagePath });
//                 setImagePreview(`${data.imagePath}`);
//             }
//         } catch (error) {
//             console.error('Error uploading image:', error);
//             alert('Failed to upload image');
//         } finally {
//             setUploadingImage(false);
//         }
//     };

//     const handleArrayField = (field, index, value) => {
//         const newArray = [...formData[field]];
//         newArray[index] = value;
//         setFormData({ ...formData, [field]: newArray });
//     };

//     const addArrayField = (field) => {
//         setFormData({ ...formData, [field]: [...formData[field], ''] });
//     };

//     const removeArrayField = (field, index) => {
//         const newArray = formData[field].filter((_, i) => i !== index);
//         setFormData({ ...formData, [field]: newArray });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSaving(true);
//         try {
//             const submitData = {
//                 ...formData,
//                 courseContent: formData.courseContent.filter(item => item.trim()),
//                 highlights: formData.highlights.filter(item => item.trim()),
//                 includes: formData.includes.filter(item => item.trim())
//             };
            
//             if (id) {
//                 await courseAPI.update(id, submitData);
//                 alert('Course updated successfully');
//             } else {
//                 await courseAPI.create(submitData);
//                 alert('Course created successfully');
//             }
//             navigate('/admin/courses');
//         } catch (error) {
//             console.error('Error saving course:', error);
//             alert(error.response?.data?.message || 'Failed to save course');
//         } finally {
//             setSaving(false);
//         }
//     };

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center py-12">
//                 <Loader2 className="w-8 h-8 text-[#00B7B3] animate-spin" />
//             </div>
//         );
//     }

//     return (
//         <div>
//             {/* Header */}
//             <div className="flex items-center gap-4 mb-6">
//                 <button
//                     onClick={() => navigate('/admin/courses')}
//                     className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition"
//                 >
//                     <ArrowLeft className="w-5 h-5 text-white" />
//                 </button>
//                 <div>
//                     <h1 className="text-2xl font-bold text-white">{id ? 'Edit Course' : 'Add New Course'}</h1>
//                     <p className="text-gray-400 text-sm mt-1">Fill in the details to {id ? 'update' : 'create'} your course</p>
//                 </div>
//             </div>

//             <form onSubmit={handleSubmit} className="space-y-6">
//                 {/* Image Upload */}
//                 <div className="bg-black/40 border border-[#00B7B3]/20 rounded-xl p-6">
//                     <h2 className="text-lg font-semibold text-white mb-4">Course Image</h2>
//                     <div className="flex items-start gap-6">
//                         <div className="w-32 h-32 rounded-xl overflow-hidden bg-black/60 border border-gray-700 flex items-center justify-center">
//                             {imagePreview ? (
//                                 <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
//                             ) : (
//                                 <ImageIcon className="w-8 h-8 text-gray-600" />
//                             )}
//                         </div>
//                         <div className="flex-1">
//                             <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg cursor-pointer hover:bg-[#00B7B3]/30 transition">
//                                 <Upload className="w-4 h-4" />
//                                 {uploadingImage ? 'Uploading...' : 'Upload Image'}
//                                 <input type="file" accept="image/jpeg,image/jpg,image/png,image/webp,image/gif" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
//                             </label>
//                             <p className="text-gray-500 text-xs mt-2">JPG, PNG, WEBP, GIF (Max 2MB)</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Basic Info */}
//                 <div className="bg-black/40 border border-[#00B7B3]/20 rounded-xl p-6">
//                     <h2 className="text-lg font-semibold text-white mb-4">Basic Information</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="md:col-span-2">
//                             <label className="block text-sm text-gray-400 mb-1">Course Title *</label>
//                             <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" required />
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-1">Category *</label>
//                             <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none">
//                                 <option value="ASTROLOGY COURSES">Astrology Courses</option>
//                                 <option value="VASTU COURSES">Vastu Courses</option>
//                             </select>
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-1">Price</label>
//                             <input type="text" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="₹51,000.00" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" />
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-1">Course Fee</label>
//                             <input type="text" value={formData.courseFee} onChange={(e) => setFormData({ ...formData, courseFee: e.target.value })} placeholder="51,000 INR" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" />
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-1">Date</label>
//                             <input type="text" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} placeholder="7th Jan 2025 or Flexible" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" />
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-1">Timing</label>
//                             <input type="text" value={formData.timing} onChange={(e) => setFormData({ ...formData, timing: e.target.value })} placeholder="Every Saturday 20:00 to 22:00 Hrs IST" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" />
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-1">Duration</label>
//                             <input type="text" value={formData.courseDuration} onChange={(e) => setFormData({ ...formData, courseDuration: e.target.value })} placeholder="12 Sessions + 1 Q&A" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" />
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-1">Level</label>
//                             <select value={formData.level} onChange={(e) => setFormData({ ...formData, level: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none">
//                                 <option value="">Select Level</option>
//                                 <option value="Beginner">Beginner</option>
//                                 <option value="Intermediate">Intermediate</option>
//                                 <option value="Advanced">Advanced</option>
//                                 <option value="All Levels">All Levels</option>
//                             </select>
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-1">Modules</label>
//                             <input type="number" value={formData.modules} onChange={(e) => setFormData({ ...formData, modules: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Content Sections */}
//                 <div className="bg-black/40 border border-[#00B7B3]/20 rounded-xl p-6">
//                     <h2 className="text-lg font-semibold text-white mb-4">Content</h2>
//                     <div className="space-y-4">
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-1">What is this course?</label>
//                             <textarea rows="4" value={formData.whatIs} onChange={(e) => setFormData({ ...formData, whatIs: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" />
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-1">About Course</label>
//                             <textarea rows="4" value={formData.aboutCourse} onChange={(e) => setFormData({ ...formData, aboutCourse: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" />
//                         </div>
//                     </div>
//                 </div>

//                 {/* Course Content Array */}
//                 <div className="bg-black/40 border border-[#00B7B3]/20 rounded-xl p-6">
//                     <div className="flex justify-between items-center mb-4">
//                         <h2 className="text-lg font-semibold text-white">Course Content</h2>
//                         <button type="button" onClick={() => addArrayField('courseContent')} className="flex items-center gap-1 px-3 py-1 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg hover:bg-[#00B7B3]/30 transition">
//                             <Plus className="w-3 h-3" /> Add Topic
//                         </button>
//                     </div>
//                     {formData.courseContent.map((item, index) => (
//                         <div key={index} className="flex gap-2 mb-2">
//                             <input type="text" value={item} onChange={(e) => handleArrayField('courseContent', index, e.target.value)} placeholder="Topic name" className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" />
//                             {formData.courseContent.length > 1 && (
//                                 <button type="button" onClick={() => removeArrayField('courseContent', index)} className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition">
//                                     <Trash2 className="w-4 h-4" />
//                                 </button>
//                             )}
//                         </div>
//                     ))}
//                 </div>

//                 {/* Highlights & Includes */}
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                     <div className="bg-black/40 border border-[#00B7B3]/20 rounded-xl p-6">
//                         <div className="flex justify-between items-center mb-4">
//                             <h2 className="text-lg font-semibold text-white">Highlights</h2>
//                             <button type="button" onClick={() => addArrayField('highlights')} className="flex items-center gap-1 px-3 py-1 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg hover:bg-[#00B7B3]/30 transition">
//                                 <Plus className="w-3 h-3" /> Add
//                             </button>
//                         </div>
//                         {formData.highlights.map((item, index) => (
//                             <div key={index} className="flex gap-2 mb-2">
//                                 <input type="text" value={item} onChange={(e) => handleArrayField('highlights', index, e.target.value)} placeholder="Highlight" className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" />
//                                 {formData.highlights.length > 1 && (
//                                     <button type="button" onClick={() => removeArrayField('highlights', index)} className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition">
//                                         <Trash2 className="w-4 h-4" />
//                                     </button>
//                                 )}
//                             </div>
//                         ))}
//                     </div>

//                     <div className="bg-black/40 border border-[#00B7B3]/20 rounded-xl p-6">
//                         <div className="flex justify-between items-center mb-4">
//                             <h2 className="text-lg font-semibold text-white">Includes</h2>
//                             <button type="button" onClick={() => addArrayField('includes')} className="flex items-center gap-1 px-3 py-1 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg hover:bg-[#00B7B3]/30 transition">
//                                 <Plus className="w-3 h-3" /> Add
//                             </button>
//                         </div>
//                         {formData.includes.map((item, index) => (
//                             <div key={index} className="flex gap-2 mb-2">
//                                 <input type="text" value={item} onChange={(e) => handleArrayField('includes', index, e.target.value)} placeholder="e.g., Birth Chart Analysis" className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none" />
//                                 {formData.includes.length > 1 && (
//                                     <button type="button" onClick={() => removeArrayField('includes', index)} className="px-3 py-2 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition">
//                                         <Trash2 className="w-4 h-4" />
//                                     </button>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Vastu Specific */}
//                 {formData.category === 'VASTU COURSES' && (
//                     <div className="bg-black/40 border border-[#00B7B3]/20 rounded-xl p-6">
//                         <h2 className="text-lg font-semibold text-white mb-4">Vastu Specific</h2>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-1">Vastu Type</label>
//                             <select value={formData.vastuType} onChange={(e) => setFormData({ ...formData, vastuType: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none">
//                                 <option value="">Select Type</option>
//                                 <option value="Residential">Residential</option>
//                                 <option value="Commercial">Commercial</option>
//                                 <option value="Land">Land</option>
//                                 <option value="Factory">Factory</option>
//                                 <option value="Office">Office</option>
//                                 <option value="Temple">Temple</option>
//                             </select>
//                         </div>
//                     </div>
//                 )}

//                 {/* Status */}
//                 <div className="bg-black/40 border border-[#00B7B3]/20 rounded-xl p-6">
//                     <h2 className="text-lg font-semibold text-white mb-4">Status</h2>
//                     <div className="flex gap-6">
//                         <label className="flex items-center gap-2 cursor-pointer">
//                             <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="w-4 h-4 accent-[#00B7B3]" />
//                             <span className="text-gray-300">Active</span>
//                         </label>
//                         <label className="flex items-center gap-2 cursor-pointer">
//                             <input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })} className="w-4 h-4 accent-[#00B7B3]" />
//                             <span className="text-gray-300">Featured</span>
//                         </label>
//                         <label className="flex items-center gap-2 cursor-pointer">
//                             <input type="checkbox" checked={formData.certificateAvailable} onChange={(e) => setFormData({ ...formData, certificateAvailable: e.target.checked })} className="w-4 h-4 accent-[#00B7B3]" />
//                             <span className="text-gray-300">Certificate Available</span>
//                         </label>
//                     </div>
//                 </div>

//                 {/* Submit Buttons */}
//                 <div className="flex gap-4">
//                     <button type="button" onClick={() => navigate('/admin/courses')} className="px-6 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-white/5 transition">
//                         Cancel
//                     </button>
//                     <button type="submit" disabled={saving} className="px-6 py-2 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-lg font-semibold hover:shadow-lg transition disabled:opacity-50">
//                         {saving ? 'Saving...' : (id ? 'Update Course' : 'Create Course')}
//                     </button>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default CourseForm;




// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { courseAPI } from '../../services/api';
// import { 
//     ArrowLeft, 
//     Upload, 
//     X, 
//     Plus, 
//     Trash2,
//     Loader2,
//     Image as ImageIcon,
//     ChevronDown,
//     ChevronRight
// } from 'lucide-react';

// const CourseForm = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [saving, setSaving] = useState(false);
//     const [imagePreview, setImagePreview] = useState(null);
//     const [uploadingImage, setUploadingImage] = useState(false);
//     const [activeSection, setActiveSection] = useState('basic'); // For accordion sections
    
//     const [formData, setFormData] = useState({
//         title: '',
//         category: 'ASTROLOGY COURSES',
//         price: '',
//         courseFee: '',
//         date: '',
//         timing: '',
//         courseDuration: '',
//         type: 'Online',
//         location: 'Zoom',
//         image: '',
//         whatIs: '',
//         aboutCourse: '',
//         courseContent: [''],
//         durationDetails: '',
//         note: 'Video Recording of Every Session Will Be Provided To Every Student After Session.',
//         highlights: [''],
//         level: '',
//         modules: 0,
//         includes: [''],
//         vastuType: '',
//         certificateAvailable: true,
//         language: 'Hindi & English',
//         isActive: true,
//         isFeatured: false
//     });

//     // SVG Icons (same as CourseDetailsPage)
//     const CalendarIcon = () => (
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <rect x="3" y="4" width="18" height="18" rx="2" ry="2" stroke="#00B7B3" strokeWidth="1.5"/>
//             <line x1="8" y1="2" x2="8" y2="6" stroke="#00B7B3" strokeWidth="1.5"/>
//             <line x1="16" y1="2" x2="16" y2="6" stroke="#00B7B3" strokeWidth="1.5"/>
//             <line x1="3" y1="8" x2="21" y2="8" stroke="#00B7B3" strokeWidth="1.5"/>
//         </svg>
//     );

//     const TimeIcon = () => (
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <circle cx="12" cy="12" r="9" stroke="#00B7B3" strokeWidth="1.5"/>
//             <polyline points="12 7 12 12 15 15" stroke="#00B7B3" strokeWidth="1.5"/>
//         </svg>
//     );

//     const DurationIcon = () => (
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <path d="M12 6V12L16 14" stroke="#00B7B3" strokeWidth="1.5"/>
//             <circle cx="12" cy="12" r="9" stroke="#00B7B3" strokeWidth="1.5"/>
//         </svg>
//     );

//     const PriceIcon = () => (
//         <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
//             <circle cx="12" cy="12" r="4" stroke="#00B7B3" strokeWidth="1.5"/>
//             <path d="M12 2V4M12 20V22M4 12H2M20 12H22" stroke="#00B7B3" strokeWidth="1.5"/>
//         </svg>
//     );

//     useEffect(() => {
//         if (id) {
//             fetchCourse();
//         }
//     }, [id]);

//     const fetchCourse = async () => {
//         setLoading(true);
//         try {
//             const { data } = await courseAPI.getById(id);
//             const course = data.course;
//             setFormData({
//                 title: course.title || '',
//                 category: course.category || 'ASTROLOGY COURSES',
//                 price: course.price || '',
//                 courseFee: course.courseFee || '',
//                 date: course.date || '',
//                 timing: course.timing || '',
//                 courseDuration: course.courseDuration || '',
//                 type: course.type || 'Online',
//                 location: course.location || 'Zoom',
//                 image: course.image || '',
//                 whatIs: course.whatIs || '',
//                 aboutCourse: course.aboutCourse || '',
//                 courseContent: course.courseContent?.length ? course.courseContent : [''],
//                 durationDetails: course.durationDetails || '',
//                 note: course.note || '',
//                 highlights: course.highlights?.length ? course.highlights : [''],
//                 level: course.level || '',
//                 modules: course.modules || 0,
//                 includes: course.includes?.length ? course.includes : [''],
//                 vastuType: course.vastuType || '',
//                 certificateAvailable: course.certificateAvailable !== undefined ? course.certificateAvailable : true,
//                 language: course.language || 'Hindi & English',
//                 isActive: course.isActive !== undefined ? course.isActive : true,
//                 isFeatured: course.isFeatured || false
//             });
//             if (course.image) {
//                 setImagePreview(`${course.image}`);
//             }
//         } catch (error) {
//             console.error('Error fetching course:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleImageUpload = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
//         const maxSize = 2 * 1024 * 1024;

//         if (!allowedTypes.includes(file.type)) {
//             alert('Only JPG, PNG, WEBP, GIF images are allowed');
//             return;
//         }

//         if (file.size > maxSize) {
//             alert('Image size should be less than 2MB');
//             return;
//         }

//         setUploadingImage(true);
//         const formDataImage = new FormData();
//         formDataImage.append('courseImage', file);

//         try {
//             const token = localStorage.getItem('adminToken');
//             const response = await fetch('/api/upload/course-image', {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: formDataImage
//             });
//             const data = await response.json();
//             if (data.success) {
//                 setFormData({ ...formData, image: data.imagePath });
//                 setImagePreview(`${data.imagePath}`);
//             }
//         } catch (error) {
//             console.error('Error uploading image:', error);
//             alert('Failed to upload image');
//         } finally {
//             setUploadingImage(false);
//         }
//     };

//     const handleArrayField = (field, index, value) => {
//         const newArray = [...formData[field]];
//         newArray[index] = value;
//         setFormData({ ...formData, [field]: newArray });
//     };

//     const addArrayField = (field) => {
//         setFormData({ ...formData, [field]: [...formData[field], ''] });
//     };

//     const removeArrayField = (field, index) => {
//         const newArray = formData[field].filter((_, i) => i !== index);
//         setFormData({ ...formData, [field]: newArray });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSaving(true);
//         try {
//             const submitData = {
//                 ...formData,
//                 courseContent: formData.courseContent.filter(item => item.trim()),
//                 highlights: formData.highlights.filter(item => item.trim()),
//                 includes: formData.includes.filter(item => item.trim())
//             };
            
//             if (id) {
//                 await courseAPI.update(id, submitData);
//                 alert('Course updated successfully');
//             } else {
//                 await courseAPI.create(submitData);
//                 alert('Course created successfully');
//             }
//             navigate('/admin/courses');
//         } catch (error) {
//             console.error('Error saving course:', error);
//             alert(error.response?.data?.message || 'Failed to save course');
//         } finally {
//             setSaving(false);
//         }
//     };

//     // Section Component
//     const FormSection = ({ title, icon: Icon, section, children }) => (
//         <div className="bg-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl overflow-hidden">
//             <button
//                 type="button"
//                 onClick={() => setActiveSection(activeSection === section ? null : section)}
//                 className="w-full flex items-center justify-between p-6 hover:bg-white/5 transition-all"
//             >
//                 <div className="flex items-center gap-3">
//                     {Icon && <Icon />}
//                     <h2 className="text-lg font-semibold text-white">{title}</h2>
//                 </div>
//                 {activeSection === section ? (
//                     <ChevronDown className="w-5 h-5 text-[#00B7B3]" />
//                 ) : (
//                     <ChevronRight className="w-5 h-5 text-gray-500" />
//                 )}
//             </button>
//             <AnimatePresence>
//                 {activeSection === section && (
//                     <motion.div
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         className="border-t border-[#00B7B3]/20"
//                     >
//                         <div className="p-6">
//                             {children}
//                         </div>
//                     </motion.div>
//                 )}
//             </AnimatePresence>
//         </div>
//     );

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center py-12">
//                 <Loader2 className="w-8 h-8 text-[#00B7B3] animate-spin" />
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-black to-[#0a0c12]">
//             {/* Header */}
//             <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-xl border-b border-[#00B7B3]/20 py-4">
//                 <div className="max-w-6xl mx-auto px-6">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                             <button
//                                 onClick={() => navigate('/admin/courses')}
//                                 className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
//                             >
//                                 <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-[#00B7B3]" />
//                             </button>
//                             <div>
//                                 <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                                     {id ? 'Edit Course' : 'Create New Course'}
//                                 </h1>
//                                 <p className="text-gray-500 text-sm mt-1">
//                                     {id ? 'Update course details' : 'Add a new course to your catalog'}
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="flex gap-3">
//                             <button
//                                 type="button"
//                                 onClick={() => navigate('/admin/courses')}
//                                 className="px-5 py-2 rounded-xl border border-gray-700 text-gray-300 hover:bg-white/5 transition-all"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleSubmit}
//                                 disabled={saving}
//                                 className="px-6 py-2 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
//                             >
//                                 {saving ? (
//                                     <Loader2 className="w-5 h-5 animate-spin mx-auto" />
//                                 ) : (
//                                     id ? 'Update Course' : 'Publish Course'
//                                 )}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <form onSubmit={handleSubmit} className="max-w-6xl mx-auto px-6 py-8 space-y-6">
//                 {/* Image Upload Section */}
//                 <div className="bg-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl p-6">
//                     <h2 className="text-lg font-semibold text-white mb-4">Course Cover Image</h2>
//                     <div className="flex flex-col sm:flex-row items-start gap-6">
//                         <div className="w-40 h-40 rounded-2xl overflow-hidden bg-black/60 border-2 border-dashed border-[#00B7B3]/30 flex items-center justify-center">
//                             {imagePreview ? (
//                                 <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
//                             ) : (
//                                 <ImageIcon className="w-12 h-12 text-gray-600" />
//                             )}
//                         </div>
//                         <div className="flex-1">
//                             <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00B7B3]/10 border border-[#00B7B3]/30 text-[#00B7B3] rounded-xl cursor-pointer hover:bg-[#00B7B3]/20 transition-all">
//                                 <Upload className="w-4 h-4" />
//                                 {uploadingImage ? 'Uploading...' : 'Choose Image'}
//                                 <input type="file" accept="image/jpeg,image/jpg,image/png,image/webp,image/gif" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
//                             </label>
//                             <p className="text-gray-500 text-xs mt-3">JPG, PNG, WEBP, GIF (Max 2MB)</p>
//                             <p className="text-gray-600 text-xs">Recommended size: 1200x800 pixels</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Basic Information Section */}
//                 <FormSection title="Basic Information" icon={CalendarIcon} section="basic">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                         <div className="md:col-span-2">
//                             <label className="block text-sm text-gray-400 mb-2">Course Title *</label>
//                             <input 
//                                 type="text" 
//                                 value={formData.title} 
//                                 onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
//                                 placeholder="e.g., Financial Astrology - Level 2"
//                                 className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] focus:ring-1 focus:ring-[#00B7B3] outline-none transition-all"
//                                 required 
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">Category *</label>
//                             <select 
//                                 value={formData.category} 
//                                 onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
//                                 className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none"
//                             >
//                                 <option value="ASTROLOGY COURSES">✨ Astrology Courses</option>
//                                 <option value="VASTU COURSES">🏠 Vastu Courses</option>
//                             </select>
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">Level</label>
//                             <select 
//                                 value={formData.level} 
//                                 onChange={(e) => setFormData({ ...formData, level: e.target.value })} 
//                                 className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none"
//                             >
//                                 <option value="">Select Level</option>
//                                 <option value="Beginner">Beginner</option>
//                                 <option value="Intermediate">Intermediate</option>
//                                 <option value="Advanced">Advanced</option>
//                                 <option value="All Levels">All Levels</option>
//                             </select>
//                         </div>
//                     </div>
//                 </FormSection>

//                 {/* Pricing & Schedule Section */}
//                 <FormSection title="Pricing & Schedule" icon={PriceIcon} section="schedule">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">Display Price</label>
//                             <input 
//                                 type="text" 
//                                 value={formData.price} 
//                                 onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
//                                 placeholder="₹51,000.00"
//                                 className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">Course Fee</label>
//                             <input 
//                                 type="text" 
//                                 value={formData.courseFee} 
//                                 onChange={(e) => setFormData({ ...formData, courseFee: e.target.value })} 
//                                 placeholder="51,000 INR"
//                                 className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">Start Date</label>
//                             <input 
//                                 type="text" 
//                                 value={formData.date} 
//                                 onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
//                                 placeholder="7th Jan 2025 or Flexible"
//                                 className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">Timing</label>
//                             <input 
//                                 type="text" 
//                                 value={formData.timing} 
//                                 onChange={(e) => setFormData({ ...formData, timing: e.target.value })} 
//                                 placeholder="Every Saturday 20:00 to 22:00 Hrs IST"
//                                 className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">Duration</label>
//                             <input 
//                                 type="text" 
//                                 value={formData.courseDuration} 
//                                 onChange={(e) => setFormData({ ...formData, courseDuration: e.target.value })} 
//                                 placeholder="4 months (12 Sessions)"
//                                 className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">Modules</label>
//                             <input 
//                                 type="number" 
//                                 value={formData.modules} 
//                                 onChange={(e) => setFormData({ ...formData, modules: parseInt(e.target.value) || 0 })} 
//                                 className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                             />
//                         </div>
//                     </div>
//                 </FormSection>

//                 {/* Course Content Section */}
//                 <FormSection title="Course Content" icon={DurationIcon} section="content">
//                     <div className="space-y-4">
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">What is this course?</label>
//                             <textarea 
//                                 rows="3" 
//                                 value={formData.whatIs} 
//                                 onChange={(e) => setFormData({ ...formData, whatIs: e.target.value })} 
//                                 placeholder="Describe what this course is about..."
//                                 className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none resize-none" 
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">About Course</label>
//                             <textarea 
//                                 rows="4" 
//                                 value={formData.aboutCourse} 
//                                 onChange={(e) => setFormData({ ...formData, aboutCourse: e.target.value })} 
//                                 placeholder="Detailed description of the course..."
//                                 className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none resize-none" 
//                             />
//                         </div>
//                         <div>
//                             <div className="flex justify-between items-center mb-3">
//                                 <label className="text-sm text-gray-400">Course Topics</label>
//                                 <button 
//                                     type="button" 
//                                     onClick={() => addArrayField('courseContent')} 
//                                     className="flex items-center gap-1 px-3 py-1 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg hover:bg-[#00B7B3]/30 transition"
//                                 >
//                                     <Plus className="w-3 h-3" /> Add Topic
//                                 </button>
//                             </div>
//                             {formData.courseContent.map((item, index) => (
//                                 <div key={index} className="flex gap-2 mb-2">
//                                     <input 
//                                         type="text" 
//                                         value={item} 
//                                         onChange={(e) => handleArrayField('courseContent', index, e.target.value)} 
//                                         placeholder="e.g., Indian Stock Exchange – Past, Present and Future"
//                                         className="flex-1 px-4 py-2.5 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                     />
//                                     {formData.courseContent.length > 1 && (
//                                         <button 
//                                             type="button" 
//                                             onClick={() => removeArrayField('courseContent', index)} 
//                                             className="px-3 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition"
//                                         >
//                                             <Trash2 className="w-4 h-4" />
//                                         </button>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 </FormSection>

//                 {/* Highlights & Includes */}
//                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                     <div className="bg-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl p-6">
//                         <div className="flex justify-between items-center mb-4">
//                             <h2 className="text-lg font-semibold text-white">Course Highlights</h2>
//                             <button type="button" onClick={() => addArrayField('highlights')} className="flex items-center gap-1 px-3 py-1 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg hover:bg-[#00B7B3]/30 transition">
//                                 <Plus className="w-3 h-3" /> Add
//                             </button>
//                         </div>
//                         {formData.highlights.map((item, index) => (
//                             <div key={index} className="flex gap-2 mb-2">
//                                 <input 
//                                     type="text" 
//                                     value={item} 
//                                     onChange={(e) => handleArrayField('highlights', index, e.target.value)} 
//                                     placeholder="e.g., 12 Live Sessions"
//                                     className="flex-1 px-4 py-2.5 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                 />
//                                 {formData.highlights.length > 1 && (
//                                     <button type="button" onClick={() => removeArrayField('highlights', index)} className="px-3 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition">
//                                         <Trash2 className="w-4 h-4" />
//                                     </button>
//                                 )}
//                             </div>
//                         ))}
//                     </div>

//                     <div className="bg-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl p-6">
//                         <div className="flex justify-between items-center mb-4">
//                             <h2 className="text-lg font-semibold text-white">What's Included</h2>
//                             <button type="button" onClick={() => addArrayField('includes')} className="flex items-center gap-1 px-3 py-1 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg hover:bg-[#00B7B3]/30 transition">
//                                 <Plus className="w-3 h-3" /> Add
//                             </button>
//                         </div>
//                         {formData.includes.map((item, index) => (
//                             <div key={index} className="flex gap-2 mb-2">
//                                 <input 
//                                     type="text" 
//                                     value={item} 
//                                     onChange={(e) => handleArrayField('includes', index, e.target.value)} 
//                                     placeholder="e.g., Certificate of Completion"
//                                     className="flex-1 px-4 py-2.5 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                 />
//                                 {formData.includes.length > 1 && (
//                                     <button type="button" onClick={() => removeArrayField('includes', index)} className="px-3 py-2 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition">
//                                         <Trash2 className="w-4 h-4" />
//                                     </button>
//                                 )}
//                             </div>
//                         ))}
//                     </div>
//                 </div>

//                 {/* Additional Info */}
//                 <div className="bg-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl p-6">
//                     <h2 className="text-lg font-semibold text-white mb-4">Additional Information</h2>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">Note / Special Message</label>
//                             <textarea 
//                                 rows="2" 
//                                 value={formData.note} 
//                                 onChange={(e) => setFormData({ ...formData, note: e.target.value })} 
//                                 className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none resize-none" 
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">Duration Details</label>
//                             <textarea 
//                                 rows="2" 
//                                 value={formData.durationDetails} 
//                                 onChange={(e) => setFormData({ ...formData, durationDetails: e.target.value })} 
//                                 placeholder="4 months course with 12 live sessions + practical assignments."
//                                 className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none resize-none" 
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">Language</label>
//                             <input 
//                                 type="text" 
//                                 value={formData.language} 
//                                 onChange={(e) => setFormData({ ...formData, language: e.target.value })} 
//                                 placeholder="Hindi & English"
//                                 className="w-full px-4 py-2.5 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                             />
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">Type & Location</label>
//                             <div className="grid grid-cols-2 gap-2">
//                                 <select 
//                                     value={formData.type} 
//                                     onChange={(e) => setFormData({ ...formData, type: e.target.value })} 
//                                     className="px-4 py-2.5 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none"
//                                 >
//                                     <option value="Online">Online</option>
//                                     <option value="Offline">Offline</option>
//                                     <option value="Hybrid">Hybrid</option>
//                                 </select>
//                                 <input 
//                                     type="text" 
//                                     value={formData.location} 
//                                     onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
//                                     placeholder="Zoom / Location"
//                                     className="px-4 py-2.5 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                 />
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Status Section */}
//                 <div className="bg-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl p-6">
//                     <h2 className="text-lg font-semibold text-white mb-4">Course Status</h2>
//                     <div className="flex flex-wrap gap-6">
//                         <label className="flex items-center gap-2 cursor-pointer">
//                             <input 
//                                 type="checkbox" 
//                                 checked={formData.isActive} 
//                                 onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} 
//                                 className="w-4 h-4 accent-[#00B7B3]" 
//                             />
//                             <span className="text-gray-300">Active (Visible to students)</span>
//                         </label>
//                         <label className="flex items-center gap-2 cursor-pointer">
//                             <input 
//                                 type="checkbox" 
//                                 checked={formData.isFeatured} 
//                                 onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })} 
//                                 className="w-4 h-4 accent-[#00B7B3]" 
//                             />
//                             <span className="text-gray-300">Featured (Show on homepage)</span>
//                         </label>
//                         <label className="flex items-center gap-2 cursor-pointer">
//                             <input 
//                                 type="checkbox" 
//                                 checked={formData.certificateAvailable} 
//                                 onChange={(e) => setFormData({ ...formData, certificateAvailable: e.target.checked })} 
//                                 className="w-4 h-4 accent-[#00B7B3]" 
//                             />
//                             <span className="text-gray-300">Certificate Available</span>
//                         </label>
//                     </div>
//                 </div>
//             </form>
//         </div>
//     );
// };

// export default CourseForm;





// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { courseAPI } from '../../services/api';
// import { 
//     ArrowLeft, 
//     Upload, 
//     Plus, 
//     Trash2,
//     Loader2,
//     Image as ImageIcon,
//     ChevronDown,
//     ChevronRight,
//     Info,
//     Globe,
//     DollarSign,
//     Calendar,
//     BookOpen,
//     Settings,
//     Award,
//     Languages
// } from 'lucide-react';

// const CourseForm = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [saving, setSaving] = useState(false);
//     const [imagePreview, setImagePreview] = useState(null);
//     const [uploadingImage, setUploadingImage] = useState(false);
//     const [activeTab, setActiveTab] = useState('basic');
    
//     const [formData, setFormData] = useState({
//         title: '',
//         category: 'ASTROLOGY COURSES',
//         price: '',
//         courseFee: '',
//         date: '',
//         timing: '',
//         courseDuration: '',
//         type: 'Online',
//         location: 'Zoom',
//         image: '',
//         whatIs: '',
//         aboutCourse: '',
//         courseContent: [''],
//         durationDetails: '',
//         note: 'Video Recording of Every Session Will Be Provided To Every Student After Session.',
//         highlights: [''],
//         level: '',
//         modules: 0,
//         includes: [''],
//         vastuType: '',
//         certificateAvailable: true,
//         language: 'Hindi & English',
//         isActive: true,
//         isFeatured: false,
//         // SEO Fields
//         seoTitle: '',
//         seoDescription: '',
//         seoKeywords: ''
//     });

//     useEffect(() => {
//         if (id) {
//             fetchCourse();
//         }
//     }, [id]);

//     const fetchCourse = async () => {
//         setLoading(true);
//         try {
//             const { data } = await courseAPI.getById(id);
//             const course = data.course;
//             setFormData({
//                 title: course.title || '',
//                 category: course.category || 'ASTROLOGY COURSES',
//                 price: course.price || '',
//                 courseFee: course.courseFee || '',
//                 date: course.date || '',
//                 timing: course.timing || '',
//                 courseDuration: course.courseDuration || '',
//                 type: course.type || 'Online',
//                 location: course.location || 'Zoom',
//                 image: course.image || '',
//                 whatIs: course.whatIs || '',
//                 aboutCourse: course.aboutCourse || '',
//                 courseContent: course.courseContent?.length ? course.courseContent : [''],
//                 durationDetails: course.durationDetails || '',
//                 note: course.note || '',
//                 highlights: course.highlights?.length ? course.highlights : [''],
//                 level: course.level || '',
//                 modules: course.modules || 0,
//                 includes: course.includes?.length ? course.includes : [''],
//                 vastuType: course.vastuType || '',
//                 certificateAvailable: course.certificateAvailable !== undefined ? course.certificateAvailable : true,
//                 language: course.language || 'Hindi & English',
//                 isActive: course.isActive !== undefined ? course.isActive : true,
//                 isFeatured: course.isFeatured || false,
//                 seoTitle: course.seoTitle || '',
//                 seoDescription: course.seoDescription || '',
//                 seoKeywords: course.seoKeywords || ''
//             });
//             if (course.image) {
//                 setImagePreview(`${course.image}`);
//             }
//         } catch (error) {
//             console.error('Error fetching course:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleImageUpload = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
//         const maxSize = 2 * 1024 * 1024;

//         if (!allowedTypes.includes(file.type)) {
//             alert('Only JPG, PNG, WEBP, GIF images are allowed');
//             return;
//         }

//         if (file.size > maxSize) {
//             alert('Image size should be less than 2MB');
//             return;
//         }

//         setUploadingImage(true);
//         const formDataImage = new FormData();
//         formDataImage.append('courseImage', file);

//         try {
//             const token = localStorage.getItem('adminToken');
//             const response = await fetch('/api/upload/course-image', {
//                 method: 'POST',
//                 headers: {
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: formDataImage
//             });
//             const data = await response.json();
//             if (data.success) {
//                 setFormData({ ...formData, image: data.imagePath });
//                 setImagePreview(`${data.imagePath}`);
//             }
//         } catch (error) {
//             console.error('Error uploading image:', error);
//             alert('Failed to upload image');
//         } finally {
//             setUploadingImage(false);
//         }
//     };

//     const handleArrayField = (field, index, value) => {
//         const newArray = [...formData[field]];
//         newArray[index] = value;
//         setFormData({ ...formData, [field]: newArray });
//     };

//     const addArrayField = (field) => {
//         setFormData({ ...formData, [field]: [...formData[field], ''] });
//     };

//     const removeArrayField = (field, index) => {
//         const newArray = formData[field].filter((_, i) => i !== index);
//         setFormData({ ...formData, [field]: newArray });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSaving(true);
//         try {
//             const submitData = {
//                 ...formData,
//                 courseContent: formData.courseContent.filter(item => item.trim()),
//                 highlights: formData.highlights.filter(item => item.trim()),
//                 includes: formData.includes.filter(item => item.trim()),
//                 seoTitle: formData.seoTitle || formData.title,
//                 seoDescription: formData.seoDescription || (formData.aboutCourse ? formData.aboutCourse.substring(0, 157) + '...' : `Learn ${formData.title} with NB Astro`),
//                 seoKeywords: formData.seoKeywords || `${formData.title}, ${formData.category.toLowerCase()}, nb astro`
//             };
            
//             if (id) {
//                 await courseAPI.update(id, submitData);
//                 alert('Course updated successfully');
//             } else {
//                 await courseAPI.create(submitData);
//                 alert('Course created successfully');
//             }
//             navigate('/admin/courses');
//         } catch (error) {
//             console.error('Error saving course:', error);
//             alert(error.response?.data?.message || 'Failed to save course');
//         } finally {
//             setSaving(false);
//         }
//     };

//     // Tab Component
//     const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
//         <button
//             type="button"
//             onClick={() => onClick(id)}
//             className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
//                 active === id
//                     ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border border-[#00B7B3]/50'
//                     : 'text-gray-400 hover:text-white hover:bg-white/5'
//             }`}
//         >
//             <Icon className="w-4 h-4" />
//             <span className="text-sm font-medium">{label}</span>
//         </button>
//     );

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center py-12">
//                 <Loader2 className="w-8 h-8 text-[#00B7B3] animate-spin" />
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-black to-[#0a0c12]">
//             {/* Header */}
//             <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-xl border-b border-[#00B7B3]/20 py-4">
//                 <div className="max-w-6xl mx-auto px-6">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                             <button
//                                 onClick={() => navigate('/admin/courses')}
//                                 className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
//                             >
//                                 <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-[#00B7B3]" />
//                             </button>
//                             <div>
//                                 <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                                     {id ? 'Edit Course' : 'Create New Course'}
//                                 </h1>
//                                 <p className="text-gray-500 text-sm mt-1">
//                                     {id ? 'Update course details and SEO' : 'Add a new course to your catalog'}
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="flex gap-3">
//                             <button
//                                 type="button"
//                                 onClick={() => navigate('/admin/courses')}
//                                 className="px-5 py-2 rounded-xl border border-gray-700 text-gray-300 hover:bg-white/5 transition-all"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleSubmit}
//                                 disabled={saving}
//                                 className="px-6 py-2 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50"
//                             >
//                                 {saving ? (
//                                     <Loader2 className="w-5 h-5 animate-spin mx-auto" />
//                                 ) : (
//                                     id ? 'Update Course' : 'Publish Course'
//                                 )}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <form onSubmit={handleSubmit} className="max-w-6xl mx-auto px-6 py-8">
//                 {/* Image Upload Section */}
//                 <div className="bg-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl p-6 mb-6">
//                     <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//                         <ImageIcon className="w-5 h-5 text-[#00B7B3]" />
//                         Course Cover Image
//                     </h2>
//                     <div className="flex flex-col sm:flex-row items-start gap-6">
//                         <div className="w-40 h-40 rounded-2xl overflow-hidden bg-black/60 border-2 border-dashed border-[#00B7B3]/30 flex items-center justify-center">
//                             {imagePreview ? (
//                                 <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
//                             ) : (
//                                 <ImageIcon className="w-12 h-12 text-gray-600" />
//                             )}
//                         </div>
//                         <div className="flex-1">
//                             <label className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#00B7B3]/10 border border-[#00B7B3]/30 text-[#00B7B3] rounded-xl cursor-pointer hover:bg-[#00B7B3]/20 transition-all">
//                                 <Upload className="w-4 h-4" />
//                                 {uploadingImage ? 'Uploading...' : 'Choose Image'}
//                                 <input type="file" accept="image/jpeg,image/jpg,image/png,image/webp,image/gif" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
//                             </label>
//                             <p className="text-gray-500 text-xs mt-3">JPG, PNG, WEBP, GIF (Max 2MB) • Recommended: 1200x800px</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Tabs Navigation */}
//                 <div className="flex flex-wrap gap-2 mb-6 border-b border-[#00B7B3]/20 pb-3">
//                     <TabButton id="basic" label="Basic Info" icon={Info} active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="pricing" label="Pricing & Schedule" icon={DollarSign} active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="content" label="Course Content" icon={BookOpen} active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="features" label="Features" icon={Award} active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="seo" label="SEO Settings" icon={Globe} active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="status" label="Status" icon={Settings} active={activeTab} onClick={setActiveTab} />
//                 </div>

//                 {/* Basic Info Tab */}
//                 {activeTab === 'basic' && (
//                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
//                         <div className="bg-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="space-y-5">
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Course Title *</label>
//                                     <input 
//                                         type="text" 
//                                         value={formData.title} 
//                                         onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
//                                         placeholder="e.g., Financial Astrology - Level 2"
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] focus:ring-1 focus:ring-[#00B7B3] outline-none transition-all"
//                                         required 
//                                     />
//                                 </div>
                                
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                                     <div>
//                                         <label className="block text-sm text-gray-400 mb-2">Category *</label>
//                                         <select 
//                                             value={formData.category} 
//                                             onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
//                                             className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none"
//                                         >
//                                             <option value="ASTROLOGY COURSES">✨ Astrology Courses</option>
//                                             <option value="VASTU COURSES">🏠 Vastu Courses</option>
//                                         </select>
//                                     </div>
                                    
//                                     <div>
//                                         <label className="block text-sm text-gray-400 mb-2">Level</label>
//                                         <select 
//                                             value={formData.level} 
//                                             onChange={(e) => setFormData({ ...formData, level: e.target.value })} 
//                                             className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none"
//                                         >
//                                             <option value="">Select Level</option>
//                                             <option value="Beginner">Beginner</option>
//                                             <option value="Intermediate">Intermediate</option>
//                                             <option value="Advanced">Advanced</option>
//                                             <option value="All Levels">All Levels</option>
//                                         </select>
//                                     </div>
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Language</label>
//                                     <input 
//                                         type="text" 
//                                         value={formData.language} 
//                                         onChange={(e) => setFormData({ ...formData, language: e.target.value })} 
//                                         placeholder="Hindi & English"
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                     />
//                                 </div>
                                
//                                 {formData.category === 'VASTU COURSES' && (
//                                     <div>
//                                         <label className="block text-sm text-gray-400 mb-2">Vastu Type</label>
//                                         <select 
//                                             value={formData.vastuType} 
//                                             onChange={(e) => setFormData({ ...formData, vastuType: e.target.value })} 
//                                             className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none"
//                                         >
//                                             <option value="">Select Type</option>
//                                             <option value="Residential">Residential</option>
//                                             <option value="Commercial">Commercial</option>
//                                             <option value="Land">Land</option>
//                                             <option value="Factory">Factory</option>
//                                             <option value="Office">Office</option>
//                                             <option value="Temple">Temple</option>
//                                         </select>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}

//                 {/* Pricing & Schedule Tab */}
//                 {activeTab === 'pricing' && (
//                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
//                         <div className="bg-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Display Price</label>
//                                     <input 
//                                         type="text" 
//                                         value={formData.price} 
//                                         onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
//                                         placeholder="₹51,000.00"
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                     />
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Course Fee</label>
//                                     <input 
//                                         type="text" 
//                                         value={formData.courseFee} 
//                                         onChange={(e) => setFormData({ ...formData, courseFee: e.target.value })} 
//                                         placeholder="51,000 INR"
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                     />
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Start Date</label>
//                                     <input 
//                                         type="text" 
//                                         value={formData.date} 
//                                         onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
//                                         placeholder="7th Jan 2025 or Flexible"
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                     />
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Timing</label>
//                                     <input 
//                                         type="text" 
//                                         value={formData.timing} 
//                                         onChange={(e) => setFormData({ ...formData, timing: e.target.value })} 
//                                         placeholder="Every Saturday 20:00 to 22:00 Hrs IST"
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                     />
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Duration</label>
//                                     <input 
//                                         type="text" 
//                                         value={formData.courseDuration} 
//                                         onChange={(e) => setFormData({ ...formData, courseDuration: e.target.value })} 
//                                         placeholder="4 months (12 Sessions)"
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                     />
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Modules Count</label>
//                                     <input 
//                                         type="number" 
//                                         value={formData.modules} 
//                                         onChange={(e) => setFormData({ ...formData, modules: parseInt(e.target.value) || 0 })} 
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                     />
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Class Type</label>
//                                     <select 
//                                         value={formData.type} 
//                                         onChange={(e) => setFormData({ ...formData, type: e.target.value })} 
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none"
//                                     >
//                                         <option value="Online">Online</option>
//                                         <option value="Offline">Offline</option>
//                                         <option value="Hybrid">Hybrid</option>
//                                     </select>
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Location / Platform</label>
//                                     <input 
//                                         type="text" 
//                                         value={formData.location} 
//                                         onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
//                                         placeholder="Zoom / Google Meet / Physical Location"
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}

//                 {/* Course Content Tab */}
//                 {activeTab === 'content' && (
//                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
//                         <div className="bg-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="space-y-5">
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">What is this course?</label>
//                                     <textarea 
//                                         rows="3" 
//                                         value={formData.whatIs} 
//                                         onChange={(e) => setFormData({ ...formData, whatIs: e.target.value })} 
//                                         placeholder="Brief introduction about the course..."
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none resize-none" 
//                                     />
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">About Course (Detailed Description)</label>
//                                     <textarea 
//                                         rows="5" 
//                                         value={formData.aboutCourse} 
//                                         onChange={(e) => setFormData({ ...formData, aboutCourse: e.target.value })} 
//                                         placeholder="Detailed description of what students will learn..."
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none resize-none" 
//                                     />
//                                 </div>
                                
//                                 <div>
//                                     <div className="flex justify-between items-center mb-3">
//                                         <label className="text-sm text-gray-400">Course Topics / Modules</label>
//                                         <button 
//                                             type="button" 
//                                             onClick={() => addArrayField('courseContent')} 
//                                             className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg hover:bg-[#00B7B3]/30 transition"
//                                         >
//                                             <Plus className="w-3 h-3" /> Add Topic
//                                         </button>
//                                     </div>
//                                     {formData.courseContent.map((item, index) => (
//                                         <div key={index} className="flex gap-2 mb-2">
//                                             <input 
//                                                 type="text" 
//                                                 value={item} 
//                                                 onChange={(e) => handleArrayField('courseContent', index, e.target.value)} 
//                                                 placeholder="e.g., Introduction to Financial Astrology"
//                                                 className="flex-1 px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                             />
//                                             {formData.courseContent.length > 1 && (
//                                                 <button 
//                                                     type="button" 
//                                                     onClick={() => removeArrayField('courseContent', index)} 
//                                                     className="px-4 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition"
//                                                 >
//                                                     <Trash2 className="w-4 h-4" />
//                                                 </button>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Duration Details</label>
//                                     <textarea 
//                                         rows="2" 
//                                         value={formData.durationDetails} 
//                                         onChange={(e) => setFormData({ ...formData, durationDetails: e.target.value })} 
//                                         placeholder="4 months course with 12 live sessions + practical assignments."
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none resize-none" 
//                                     />
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Special Note</label>
//                                     <textarea 
//                                         rows="2" 
//                                         value={formData.note} 
//                                         onChange={(e) => setFormData({ ...formData, note: e.target.value })} 
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none resize-none" 
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}

//                 {/* Features Tab */}
//                 {activeTab === 'features' && (
//                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                         <div className="bg-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="flex justify-between items-center mb-4">
//                                 <h2 className="text-lg font-semibold text-white flex items-center gap-2">
//                                     <Award className="w-5 h-5 text-[#00B7B3]" />
//                                     Course Highlights
//                                 </h2>
//                                 <button type="button" onClick={() => addArrayField('highlights')} className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg hover:bg-[#00B7B3]/30 transition">
//                                     <Plus className="w-3 h-3" /> Add
//                                 </button>
//                             </div>
//                             {formData.highlights.map((item, index) => (
//                                 <div key={index} className="flex gap-2 mb-2">
//                                     <input 
//                                         type="text" 
//                                         value={item} 
//                                         onChange={(e) => handleArrayField('highlights', index, e.target.value)} 
//                                         placeholder="e.g., 12 Live Interactive Sessions"
//                                         className="flex-1 px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                     />
//                                     {formData.highlights.length > 1 && (
//                                         <button type="button" onClick={() => removeArrayField('highlights', index)} className="px-4 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition">
//                                             <Trash2 className="w-4 h-4" />
//                                         </button>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="bg-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="flex justify-between items-center mb-4">
//                                 <h2 className="text-lg font-semibold text-white flex items-center gap-2">
//                                     <Languages className="w-5 h-5 text-[#00B7B3]" />
//                                     What's Included
//                                 </h2>
//                                 <button type="button" onClick={() => addArrayField('includes')} className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg hover:bg-[#00B7B3]/30 transition">
//                                     <Plus className="w-3 h-3" /> Add
//                                 </button>
//                             </div>
//                             {formData.includes.map((item, index) => (
//                                 <div key={index} className="flex gap-2 mb-2">
//                                     <input 
//                                         type="text" 
//                                         value={item} 
//                                         onChange={(e) => handleArrayField('includes', index, e.target.value)} 
//                                         placeholder="e.g., Certificate of Completion"
//                                         className="flex-1 px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                     />
//                                     {formData.includes.length > 1 && (
//                                         <button type="button" onClick={() => removeArrayField('includes', index)} className="px-4 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition">
//                                             <Trash2 className="w-4 h-4" />
//                                         </button>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
//                     </motion.div>
//                 )}

//                 {/* SEO Tab */}
//                 {activeTab === 'seo' && (
//                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
//                         <div className="bg-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="space-y-5">
//                                 <div className="bg-[#00B7B3]/5 border border-[#00B7B3]/20 rounded-xl p-4">
//                                     <h3 className="text-sm font-medium text-[#00B7B3] mb-2">Google Search Preview</h3>
//                                     <div className="bg-white/5 rounded-lg p-3">
//                                         <div className="text-[#00B7B3] text-base font-medium truncate">
//                                             {formData.seoTitle || formData.title || 'Course Title'}
//                                         </div>
//                                         <div className="text-gray-400 text-sm truncate">
//                                             https://nbastro.com/courses/{formData.title?.toLowerCase().replace(/\s+/g, '-') || 'course-slug'}/details
//                                         </div>
//                                         <div className="text-gray-300 text-sm mt-1">
//                                             {formData.seoDescription || (formData.aboutCourse ? formData.aboutCourse.substring(0, 157) + '...' : 'Course description will appear here...')}
//                                         </div>
//                                     </div>
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">SEO Title (60 characters max)</label>
//                                     <input 
//                                         type="text" 
//                                         value={formData.seoTitle} 
//                                         onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })} 
//                                         placeholder={formData.title || "Course title for search engines"}
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none"
//                                         maxLength="60"
//                                     />
//                                     <p className="text-gray-500 text-xs mt-1">{formData.seoTitle?.length || 0}/60 characters</p>
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">SEO Description (160 characters max)</label>
//                                     <textarea 
//                                         rows="2" 
//                                         value={formData.seoDescription} 
//                                         onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })} 
//                                         placeholder="Write a compelling description for search results..."
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none resize-none"
//                                         maxLength="160"
//                                     />
//                                     <p className="text-gray-500 text-xs mt-1">{formData.seoDescription?.length || 0}/160 characters</p>
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">SEO Keywords (comma separated)</label>
//                                     <input 
//                                         type="text" 
//                                         value={formData.seoKeywords} 
//                                         onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })} 
//                                         placeholder="astrology course, learn astrology, vedic astrology, nb astro"
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none"
//                                     />
//                                     <p className="text-gray-500 text-xs mt-1">Separate keywords with commas</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}

//                 {/* Status Tab */}
//                 {activeTab === 'status' && (
//                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
//                         <div className="bg-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="space-y-4">
//                                 <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
//                                     <input 
//                                         type="checkbox" 
//                                         checked={formData.isActive} 
//                                         onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} 
//                                         className="w-5 h-5 accent-[#00B7B3]" 
//                                     />
//                                     <div>
//                                         <p className="text-white font-medium">Active Course</p>
//                                         <p className="text-gray-500 text-sm">Course will be visible to students on the website</p>
//                                     </div>
//                                 </div>
                                
//                                 <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
//                                     <input 
//                                         type="checkbox" 
//                                         checked={formData.isFeatured} 
//                                         onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })} 
//                                         className="w-5 h-5 accent-[#00B7B3]" 
//                                     />
//                                     <div>
//                                         <p className="text-white font-medium">Featured Course</p>
//                                         <p className="text-gray-500 text-sm">Show this course on homepage and featured sections</p>
//                                     </div>
//                                 </div>
                                
//                                 <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
//                                     <input 
//                                         type="checkbox" 
//                                         checked={formData.certificateAvailable} 
//                                         onChange={(e) => setFormData({ ...formData, certificateAvailable: e.target.checked })} 
//                                         className="w-5 h-5 accent-[#00B7B3]" 
//                                     />
//                                     <div>
//                                         <p className="text-white font-medium">Certificate Available</p>
//                                         <p className="text-gray-500 text-sm">Students will receive a certificate upon completion</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//             </form>
//         </div>
//     );
// };

// export default CourseForm;



// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { courseAPI } from '../../services/api';
// import { 
//     ArrowLeft, 
//     Upload, 
//     Plus, 
//     Trash2,
//     Loader2,
//     Image as ImageIcon,
//     Info,
//     Globe,
//     DollarSign,
//     BookOpen,
//     Settings,
//     Award,
//     Languages,
//     CheckCircle,
//     AlertCircle
// } from 'lucide-react';

// const CourseForm = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [saving, setSaving] = useState(false);
//     const [imagePreview, setImagePreview] = useState(null);
//     const [uploadingImage, setUploadingImage] = useState(false);
//     const [uploadStatus, setUploadStatus] = useState({ type: '', message: '' });
//     const [activeTab, setActiveTab] = useState('basic');
    
//     const [formData, setFormData] = useState({
//         title: '',
//         category: 'ASTROLOGY COURSES',
//         price: '',
//         courseFee: '',
//         date: '',
//         timing: '',
//         courseDuration: '',
//         type: 'Online',
//         location: 'Zoom',
//         image: '',
//         whatIs: '',
//         aboutCourse: '',
//         courseContent: [''],
//         durationDetails: '',
//         note: 'Video Recording of Every Session Will Be Provided To Every Student After Session.',
//         highlights: [''],
//         level: '',
//         modules: 0,
//         includes: [''],
//         vastuType: '',
//         certificateAvailable: true,
//         language: 'Hindi & English',
//         isActive: true,
//         isFeatured: false,
//         seoTitle: '',
//         seoDescription: '',
//         seoKeywords: ''
//     });

//     useEffect(() => {
//         if (id) {
//             fetchCourse();
//         }
//     }, [id]);

//     const fetchCourse = async () => {
//         setLoading(true);
//         try {
//             const { data } = await courseAPI.getById(id);
//             const course = data.course;
//             setFormData({
//                 title: course.title || '',
//                 category: course.category || 'ASTROLOGY COURSES',
//                 price: course.price || '',
//                 courseFee: course.courseFee || '',
//                 date: course.date || '',
//                 timing: course.timing || '',
//                 courseDuration: course.courseDuration || '',
//                 type: course.type || 'Online',
//                 location: course.location || 'Zoom',
//                 image: course.image || '',
//                 whatIs: course.whatIs || '',
//                 aboutCourse: course.aboutCourse || '',
//                 courseContent: course.courseContent?.length ? course.courseContent : [''],
//                 durationDetails: course.durationDetails || '',
//                 note: course.note || '',
//                 highlights: course.highlights?.length ? course.highlights : [''],
//                 level: course.level || '',
//                 modules: course.modules || 0,
//                 includes: course.includes?.length ? course.includes : [''],
//                 vastuType: course.vastuType || '',
//                 certificateAvailable: course.certificateAvailable !== undefined ? course.certificateAvailable : true,
//                 language: course.language || 'Hindi & English',
//                 isActive: course.isActive !== undefined ? course.isActive : true,
//                 isFeatured: course.isFeatured || false,
//                 seoTitle: course.seoTitle || '',
//                 seoDescription: course.seoDescription || '',
//                 seoKeywords: course.seoKeywords || ''
//             });
            
//             if (course.image) {
//                 const imageUrl = course.image.startsWith('http') 
//                     ? course.image 
//                     : `${course.image}`;
//                 setImagePreview(imageUrl);
//             }
//         } catch (error) {
//             console.error('Error fetching course:', error);
//             setUploadStatus({ type: 'error', message: 'Failed to load course data' });
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleImageUpload = async (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     // Validate file type
//     const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif'];
//     if (!allowedTypes.includes(file.type)) {
//         alert('Only JPG, PNG, WEBP, GIF images are allowed');
//         return;
//     }

//     // Validate file size (2MB)
//     const maxSize = 2 * 1024 * 1024;
//     if (file.size > maxSize) {
//         alert('Image size should be less than 2MB');
//         return;
//     }

//     // Create local preview IMMEDIATELY
//     const reader = new FileReader();
//     reader.onload = (event) => {
//         setImagePreview(event.target.result);
//         console.log('Local preview set');
//     };
//     reader.readAsDataURL(file);
    
//     setUploadingImage(true);
//     setUploadStatus({ type: 'info', message: 'Uploading...' });

//     const formDataImage = new FormData();
//     formDataImage.append('courseImage', file);

//     try {
//         const token = localStorage.getItem('adminToken');
        
//         console.log('Sending upload request...');
        
//         const response = await fetch('/api/upload/course-image', {
//             method: 'POST',
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             },
//             body: formDataImage
//         });

//         console.log('Response status:', response.status);
        
//         const data = await response.json();
//         console.log('Response data:', data);
        
//         if (response.ok && data.success && data.imagePath) {
//             // Update formData with the saved image path
//             setFormData(prev => ({ ...prev, image: data.imagePath }));
            
//             // Update preview with server URL
//             const serverUrl = `${data.imagePath}`;
//             setImagePreview(serverUrl);
            
//             setUploadStatus({ type: 'success', message: '✓ Image uploaded successfully!' });
//             setTimeout(() => setUploadStatus({ type: '', message: '' }), 3000);
//         } else {
//             throw new Error(data.message || 'Upload failed');
//         }
//     } catch (error) {
//         console.error('Upload error:', error);
//         setUploadStatus({ type: 'error', message: '❌ Upload failed: ' + error.message });
//         // Keep the local preview
//     } finally {
//         setUploadingImage(false);
//     }
// };

//     const handleArrayField = (field, index, value) => {
//         const newArray = [...formData[field]];
//         newArray[index] = value;
//         setFormData({ ...formData, [field]: newArray });
//     };

//     const addArrayField = (field) => {
//         setFormData({ ...formData, [field]: [...formData[field], ''] });
//     };

//     const removeArrayField = (field, index) => {
//         const newArray = formData[field].filter((_, i) => i !== index);
//         setFormData({ ...formData, [field]: newArray });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSaving(true);
//         try {
//             const submitData = {
//                 ...formData,
//                 courseContent: formData.courseContent.filter(item => item.trim()),
//                 highlights: formData.highlights.filter(item => item.trim()),
//                 includes: formData.includes.filter(item => item.trim()),
//                 seoTitle: formData.seoTitle || formData.title,
//                 seoDescription: formData.seoDescription || (formData.aboutCourse ? formData.aboutCourse.substring(0, 157) + '...' : `Learn ${formData.title} with NB Astro`),
//                 seoKeywords: formData.seoKeywords || `${formData.title}, ${formData.category.toLowerCase()}, nb astro`
//             };
            
//             if (id) {
//                 await courseAPI.update(id, submitData);
//                 alert('✅ Course updated successfully!');
//             } else {
//                 await courseAPI.create(submitData);
//                 alert('✅ Course created successfully!');
//             }
//             navigate('/admin/courses');
//         } catch (error) {
//             console.error('Error saving course:', error);
//             alert('❌ Failed to save course: ' + (error.response?.data?.message || 'Please try again'));
//         } finally {
//             setSaving(false);
//         }
//     };

//     const TabButton = ({ id, label, icon: Icon, active, onClick }) => (
//         <button
//             type="button"
//             onClick={() => onClick(id)}
//             className={`flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all ${
//                 active === id
//                     ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border border-[#00B7B3]/50'
//                     : 'text-gray-400 hover:text-white hover:bg-white/5'
//             }`}
//         >
//             <Icon className="w-4 h-4" />
//             <span className="text-sm font-medium">{label}</span>
//         </button>
//     );

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <Loader2 className="w-8 h-8 text-[#00B7B3] animate-spin" />
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-gradient-to-b from-black to-[#0a0c12]">
//             {/* Header */}
//             <div className="sticky top-0 z-10 bg-black/90 backdrop-blur-xl border-b border-[#00B7B3]/20">
//                 <div className="max-w-7xl mx-auto px-6 py-4">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                             <button
//                                 onClick={() => navigate('/admin/courses')}
//                                 className="p-2 rounded-xl bg-white/5 hover:bg-white/10 transition-all group"
//                             >
//                                 <ArrowLeft className="w-5 h-5 text-gray-400 group-hover:text-[#00B7B3]" />
//                             </button>
//                             <div>
//                                 <h1 className="text-2xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
//                                     {id ? '✏️ Edit Course' : '✨ Create New Course'}
//                                 </h1>
//                                 <p className="text-gray-500 text-sm mt-1">
//                                     {id ? 'Update course details and SEO information' : 'Add a new course to your catalog'}
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="flex gap-3">
//                             <button
//                                 type="button"
//                                 onClick={() => navigate('/admin/courses')}
//                                 className="px-5 py-2 rounded-xl border border-gray-700 text-gray-300 hover:bg-white/5 transition-all"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleSubmit}
//                                 disabled={saving}
//                                 className="px-6 py-2 bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] text-black rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
//                             >
//                                 {saving ? (
//                                     <Loader2 className="w-5 h-5 animate-spin mx-auto" />
//                                 ) : (
//                                     id ? '💾 Update Course' : '🚀 Publish Course'
//                                 )}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-6 py-8">
//                 {/* Image Upload Section */}
//                 <div className="bg-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl p-6 mb-6">
//                     <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
//                         <ImageIcon className="w-5 h-5 text-[#00B7B3]" />
//                         Course Cover Image
//                     </h2>
//                     <div className="flex flex-col sm:flex-row items-start gap-6">
//                         <div className="w-40 h-40 rounded-2xl overflow-hidden bg-black/60 border-2 border-dashed border-[#00B7B3]/30 flex items-center justify-center relative group">
//                             {imagePreview ? (
//                                 <img 
//                                     src={imagePreview} 
//                                     alt="Preview" 
//                                     className="w-full h-full object-cover"
//                                     onError={() => {
//                                         console.error('Image failed to load');
//                                         setImagePreview(null);
//                                     }}
//                                 />
//                             ) : (
//                                 <div className="text-center">
//                                     <ImageIcon className="w-12 h-12 text-gray-600 mx-auto mb-2" />
//                                     <p className="text-gray-500 text-xs">No image</p>
//                                 </div>
//                             )}
//                         </div>
//                         <div className="flex-1">
//                             <label className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl transition-all cursor-pointer ${
//                                 uploadingImage 
//                                     ? 'bg-gray-600/50 text-gray-400 cursor-not-allowed'
//                                     : 'bg-[#00B7B3]/10 border border-[#00B7B3]/30 text-[#00B7B3] hover:bg-[#00B7B3]/20'
//                             }`}>
//                                 <Upload className="w-4 h-4" />
//                                 {uploadingImage ? 'Uploading...' : 'Choose Image'}
//                                 <input 
//                                     type="file" 
//                                     accept="image/jpeg,image/jpg,image/png,image/webp,image/gif" 
//                                     className="hidden" 
//                                     onChange={handleImageUpload} 
//                                     disabled={uploadingImage} 
//                                 />
//                             </label>
                            
//                             {uploadStatus.message && (
//                                 <div className={`mt-3 flex items-center gap-2 text-sm ${
//                                     uploadStatus.type === 'success' ? 'text-green-500' : 
//                                     uploadStatus.type === 'error' ? 'text-red-500' : 
//                                     'text-yellow-500'
//                                 }`}>
//                                     {uploadStatus.type === 'success' && <CheckCircle className="w-4 h-4" />}
//                                     {uploadStatus.type === 'error' && <AlertCircle className="w-4 h-4" />}
//                                     {uploadStatus.type === 'info' && <Loader2 className="w-4 h-4 animate-spin" />}
//                                     <span>{uploadStatus.message}</span>
//                                 </div>
//                             )}
                            
//                             <p className="text-gray-500 text-xs mt-3">
//                                 📸 Supported formats: JPG, PNG, WEBP, GIF (Max 2MB)
//                             </p>
//                             <p className="text-gray-600 text-xs">
//                                 💡 Recommended size: 1200x800 pixels for best display
//                             </p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Tabs Navigation */}
//                 <div className="flex flex-wrap gap-2 mb-6 border-b border-[#00B7B3]/20 pb-3">
//                     <TabButton id="basic" label="Basic Info" icon={Info} active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="pricing" label="Pricing & Schedule" icon={DollarSign} active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="content" label="Course Content" icon={BookOpen} active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="features" label="Features" icon={Award} active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="seo" label="SEO Settings" icon={Globe} active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="status" label="Status" icon={Settings} active={activeTab} onClick={setActiveTab} />
//                 </div>

//                 {/* Basic Info Tab */}
//                 {activeTab === 'basic' && (
//                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
//                         <div className="bg-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="space-y-5">
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Course Title *</label>
//                                     <input 
//                                         type="text" 
//                                         value={formData.title} 
//                                         onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
//                                         placeholder="e.g., Financial Astrology - Level 2"
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] focus:ring-1 focus:ring-[#00B7B3] outline-none transition-all"
//                                         required 
//                                     />
//                                     <p className="text-gray-500 text-xs mt-1">Clear and descriptive course name</p>
//                                 </div>
                                
//                                 <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                                     <div>
//                                         <label className="block text-sm text-gray-400 mb-2">Category *</label>
//                                         <select 
//                                             value={formData.category} 
//                                             onChange={(e) => setFormData({ ...formData, category: e.target.value })} 
//                                             className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none"
//                                         >
//                                             <option value="ASTROLOGY COURSES">✨ Astrology Courses</option>
//                                             <option value="VASTU COURSES">🏠 Vastu Courses</option>
//                                         </select>
//                                     </div>
                                    
//                                     <div>
//                                         <label className="block text-sm text-gray-400 mb-2">Level</label>
//                                         <select 
//                                             value={formData.level} 
//                                             onChange={(e) => setFormData({ ...formData, level: e.target.value })} 
//                                             className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none"
//                                         >
//                                             <option value="">Select Level</option>
//                                             <option value="Beginner">Beginner</option>
//                                             <option value="Intermediate">Intermediate </option>
//                                             <option value="Advanced">Advanced </option>
//                                             <option value="All Levels">All Levels </option>
//                                         </select>
//                                     </div>
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Language (भाषा)</label>
//                                     <input 
//                                         type="text" 
//                                         value={formData.language} 
//                                         onChange={(e) => setFormData({ ...formData, language: e.target.value })} 
//                                         placeholder="Hindi & English"
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                     />
//                                 </div>
                                
//                                 {formData.category === 'VASTU COURSES' && (
//                                     <div>
//                                         <label className="block text-sm text-gray-400 mb-2">Vastu Type</label>
//                                         <select 
//                                             value={formData.vastuType} 
//                                             onChange={(e) => setFormData({ ...formData, vastuType: e.target.value })} 
//                                             className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none"
//                                         >
//                                             <option value="">Select Type</option>
//                                             <option value="Residential">Residential (आवासीय)</option>
//                                             <option value="Commercial">Commercial (व्यावसायिक)</option>
//                                             <option value="Land">Land (भूमि)</option>
//                                             <option value="Factory">Factory (कारखाना)</option>
//                                             <option value="Office">Office (कार्यालय)</option>
//                                             <option value="Temple">Temple (मंदिर)</option>
//                                         </select>
//                                     </div>
//                                 )}
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}

//                 {/* Pricing & Schedule Tab */}
//                 {activeTab === 'pricing' && (
//                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
//                         <div className="bg-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Display Price</label>
//                                     <input 
//                                         type="text" 
//                                         value={formData.price} 
//                                         onChange={(e) => setFormData({ ...formData, price: e.target.value })} 
//                                         placeholder="₹51,000.00"
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                     />
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Course Fee (Text)</label>
//                                     <input 
//                                         type="text" 
//                                         value={formData.courseFee} 
//                                         onChange={(e) => setFormData({ ...formData, courseFee: e.target.value })} 
//                                         placeholder="51,000 INR"
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                     />
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Start Date</label>
//                                     <input 
//                                         type="text" 
//                                         value={formData.date} 
//                                         onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
//                                         placeholder="7th Jan 2025 or Flexible"
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                     />
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Timing</label>
//                                     <input 
//                                         type="text" 
//                                         value={formData.timing} 
//                                         onChange={(e) => setFormData({ ...formData, timing: e.target.value })} 
//                                         placeholder="Every Saturday 20:00 to 22:00 Hrs IST"
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                     />
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Duration</label>
//                                     <input 
//                                         type="text" 
//                                         value={formData.courseDuration} 
//                                         onChange={(e) => setFormData({ ...formData, courseDuration: e.target.value })} 
//                                         placeholder="4 months (12 Sessions)"
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                     />
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Modules Count</label>
//                                     <input 
//                                         type="number" 
//                                         value={formData.modules} 
//                                         onChange={(e) => setFormData({ ...formData, modules: parseInt(e.target.value) || 0 })} 
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                     />
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Class Type</label>
//                                     <select 
//                                         value={formData.type} 
//                                         onChange={(e) => setFormData({ ...formData, type: e.target.value })} 
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none"
//                                     >
//                                         <option value="Online">Online</option>
//                                         <option value="Offline">Offline</option>
//                                         <option value="Hybrid">Hybrid</option>
//                                     </select>
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Location / Platform</label>
//                                     <input 
//                                         type="text" 
//                                         value={formData.location} 
//                                         onChange={(e) => setFormData({ ...formData, location: e.target.value })} 
//                                         placeholder="Zoom / Google Meet / Physical Location"
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}

//                 {/* Course Content Tab */}
//                 {activeTab === 'content' && (
//                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
//                         <div className="bg-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="space-y-5">
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">What is this course? </label>
//                                     <textarea 
//                                         rows="3" 
//                                         value={formData.whatIs} 
//                                         onChange={(e) => setFormData({ ...formData, whatIs: e.target.value })} 
//                                         placeholder="Brief introduction about the course..."
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none resize-none" 
//                                     />
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">About Course </label>
//                                     <textarea 
//                                         rows="5" 
//                                         value={formData.aboutCourse} 
//                                         onChange={(e) => setFormData({ ...formData, aboutCourse: e.target.value })} 
//                                         placeholder="Detailed description of what students will learn..."
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none resize-none" 
//                                     />
//                                 </div>
                                
//                                 <div>
//                                     <div className="flex justify-between items-center mb-3">
//                                         <label className="text-sm text-gray-400">Course Topics / Modules </label>
//                                         <button 
//                                             type="button" 
//                                             onClick={() => addArrayField('courseContent')} 
//                                             className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg hover:bg-[#00B7B3]/30 transition"
//                                         >
//                                             <Plus className="w-3 h-3" /> Add Topic
//                                         </button>
//                                     </div>
//                                     {formData.courseContent.map((item, index) => (
//                                         <div key={index} className="flex gap-2 mb-2">
//                                             <input 
//                                                 type="text" 
//                                                 value={item} 
//                                                 onChange={(e) => handleArrayField('courseContent', index, e.target.value)} 
//                                                 placeholder="e.g., Introduction to Financial Astrology"
//                                                 className="flex-1 px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                             />
//                                             {formData.courseContent.length > 1 && (
//                                                 <button 
//                                                     type="button" 
//                                                     onClick={() => removeArrayField('courseContent', index)} 
//                                                     className="px-4 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition"
//                                                 >
//                                                     <Trash2 className="w-4 h-4" />
//                                                 </button>
//                                             )}
//                                         </div>
//                                     ))}
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Duration Details</label>
//                                     <textarea 
//                                         rows="2" 
//                                         value={formData.durationDetails} 
//                                         onChange={(e) => setFormData({ ...formData, durationDetails: e.target.value })} 
//                                         placeholder="4 months course with 12 live sessions + practical assignments."
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none resize-none" 
//                                     />
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">Special Note</label>
//                                     <textarea 
//                                         rows="2" 
//                                         value={formData.note} 
//                                         onChange={(e) => setFormData({ ...formData, note: e.target.value })} 
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none resize-none" 
//                                     />
//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}

//                 {/* Features Tab */}
//                 {activeTab === 'features' && (
//                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
//                         <div className="bg-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="flex justify-between items-center mb-4">
//                                 <h2 className="text-lg font-semibold text-white flex items-center gap-2">
//                                     <Award className="w-5 h-5 text-[#00B7B3]" />
//                                     Course Highlights
//                                 </h2>
//                                 <button type="button" onClick={() => addArrayField('highlights')} className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg hover:bg-[#00B7B3]/30 transition">
//                                     <Plus className="w-3 h-3" /> Add
//                                 </button>
//                             </div>
//                             {formData.highlights.map((item, index) => (
//                                 <div key={index} className="flex gap-2 mb-2">
//                                     <input 
//                                         type="text" 
//                                         value={item} 
//                                         onChange={(e) => handleArrayField('highlights', index, e.target.value)} 
//                                         placeholder="e.g., 12 Live Interactive Sessions"
//                                         className="flex-1 px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                     />
//                                     {formData.highlights.length > 1 && (
//                                         <button type="button" onClick={() => removeArrayField('highlights', index)} className="px-4 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition">
//                                             <Trash2 className="w-4 h-4" />
//                                         </button>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="bg-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="flex justify-between items-center mb-4">
//                                 <h2 className="text-lg font-semibold text-white flex items-center gap-2">
//                                     <Languages className="w-5 h-5 text-[#00B7B3]" />
//                                     What's Included
//                                 </h2>
//                                 <button type="button" onClick={() => addArrayField('includes')} className="flex items-center gap-1 px-3 py-1.5 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg hover:bg-[#00B7B3]/30 transition">
//                                     <Plus className="w-3 h-3" /> Add
//                                 </button>
//                             </div>
//                             {formData.includes.map((item, index) => (
//                                 <div key={index} className="flex gap-2 mb-2">
//                                     <input 
//                                         type="text" 
//                                         value={item} 
//                                         onChange={(e) => handleArrayField('includes', index, e.target.value)} 
//                                         placeholder="e.g., Certificate of Completion"
//                                         className="flex-1 px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none" 
//                                     />
//                                     {formData.includes.length > 1 && (
//                                         <button type="button" onClick={() => removeArrayField('includes', index)} className="px-4 py-3 bg-red-500/20 text-red-400 rounded-xl hover:bg-red-500/30 transition">
//                                             <Trash2 className="w-4 h-4" />
//                                         </button>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>
//                     </motion.div>
//                 )}

//                 {/* SEO Tab */}
//                 {activeTab === 'seo' && (
//                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
//                         <div className="bg-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="space-y-5">
//                                 <div className="bg-[#00B7B3]/5 border border-[#00B7B3]/20 rounded-xl p-4">
//                                     <h3 className="text-sm font-medium text-[#00B7B3] mb-2">🔍 Google Search Preview</h3>
//                                     <div className="bg-white/5 rounded-lg p-3">
//                                         <div className="text-[#00B7B3] text-base font-medium truncate">
//                                             {formData.seoTitle || formData.title || 'Course Title'}
//                                         </div>
//                                         <div className="text-gray-400 text-sm truncate">
//                                             https://nbastro.com/courses/{formData.title?.toLowerCase().replace(/\s+/g, '-') || 'course-slug'}/details
//                                         </div>
//                                         <div className="text-gray-300 text-sm mt-1 line-clamp-2">
//                                             {formData.seoDescription || (formData.aboutCourse ? formData.aboutCourse.substring(0, 157) + '...' : 'Course description will appear here...')}
//                                         </div>
//                                     </div>
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">📝 SEO Title (60 characters max)</label>
//                                     <input 
//                                         type="text" 
//                                         value={formData.seoTitle} 
//                                         onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })} 
//                                         placeholder={formData.title || "Course title for search engines"}
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none"
//                                         maxLength="60"
//                                     />
//                                     <p className="text-gray-500 text-xs mt-1">{formData.seoTitle?.length || 0}/60 characters</p>
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">📄 SEO Description (160 characters max)</label>
//                                     <textarea 
//                                         rows="2" 
//                                         value={formData.seoDescription} 
//                                         onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })} 
//                                         placeholder="Write a compelling description for search results..."
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none resize-none"
//                                         maxLength="160"
//                                     />
//                                     <p className="text-gray-500 text-xs mt-1">{formData.seoDescription?.length || 0}/160 characters</p>
//                                 </div>
                                
//                                 <div>
//                                     <label className="block text-sm text-gray-400 mb-2">🏷️ SEO Keywords (comma separated)</label>
//                                     <input 
//                                         type="text" 
//                                         value={formData.seoKeywords} 
//                                         onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })} 
//                                         placeholder="astrology course, learn astrology, vedic astrology, nb astro"
//                                         className="w-full px-4 py-3 bg-black/60 border border-gray-700 rounded-xl text-white focus:border-[#00B7B3] outline-none"
//                                     />
//                                     <p className="text-gray-500 text-xs mt-1">Separate keywords with commas for better SEO</p>
//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}

//                 {/* Status Tab */}
//                 {activeTab === 'status' && (
//                     <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
//                         <div className="bg-black/40 backdrop-blur-sm border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="space-y-4">
//                                 <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
//                                     <input 
//                                         type="checkbox" 
//                                         checked={formData.isActive} 
//                                         onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} 
//                                         className="w-5 h-5 accent-[#00B7B3]" 
//                                     />
//                                     <div>
//                                         <p className="text-white font-medium">✅ Active Course</p>
//                                         <p className="text-gray-500 text-sm">Course will be visible to students on the website</p>
//                                     </div>
//                                 </div>
                                
//                                 <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
//                                     <input 
//                                         type="checkbox" 
//                                         checked={formData.isFeatured} 
//                                         onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })} 
//                                         className="w-5 h-5 accent-[#00B7B3]" 
//                                     />
//                                     <div>
//                                         <p className="text-white font-medium">⭐ Featured Course</p>
//                                         <p className="text-gray-500 text-sm">Show this course on homepage and featured sections</p>
//                                     </div>
//                                 </div>
                                
//                                 <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all">
//                                     <input 
//                                         type="checkbox" 
//                                         checked={formData.certificateAvailable} 
//                                         onChange={(e) => setFormData({ ...formData, certificateAvailable: e.target.checked })} 
//                                         className="w-5 h-5 accent-[#00B7B3]" 
//                                     />
//                                     <div>
//                                         <p className="text-white font-medium">📜 Certificate Available</p>
//                                         <p className="text-gray-500 text-sm">Students will receive a certificate upon completion</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </motion.div>
//                 )}
//             </form>
//         </div>
//     );
// };

// export default CourseForm;




// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import ReactQuill from 'react-quill-new';
// import 'react-quill-new/dist/quill.snow.css';
// import { courseAPI } from '../../services/api';
// import { 
//     ArrowLeft, 
//     Upload, 
//     Plus, 
//     Trash2,
//     Loader2,
//     Image as ImageIcon
// } from 'lucide-react';

// // Quill toolbar - simple but powerful
// const quillModules = {
//     toolbar: [
//         [{ 'header': [1, 2, 3, false] }],
//         ['bold', 'italic', 'underline'],
//         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//         ['link', 'image'],
//         ['clean']
//     ],
// };

// const quillFormats = [
//     'header', 'bold', 'italic', 'underline',
//     'list', 'bullet', 'link', 'image'
// ];

// const CourseForm = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [saving, setSaving] = useState(false);
//     const [imagePreview, setImagePreview] = useState(null);
//     const [uploadingImage, setUploadingImage] = useState(false);
//     const [activeTab, setActiveTab] = useState('basic');
    
//     const [formData, setFormData] = useState({
//         title: '',
//         category: 'ASTROLOGY COURSES',
//         price: '',
//         courseFee: '',
//         date: '',
//         timing: '',
//         courseDuration: '',
//         type: 'Online',
//         location: 'Zoom',
//         image: '',
//         whatIs: '',
//         aboutCourse: '',
//         courseContent: [''],
//         durationDetails: '',
//         note: 'Video Recording of Every Session Will Be Provided To Every Student After Session.',
//         highlights: [''],
//         level: '',
//         modules: 0,
//         includes: [''],
//         vastuType: '',
//         certificateAvailable: true,
//         language: 'Hindi & English',
//         isActive: true,
//         isFeatured: false,
//         seoTitle: '',
//         seoDescription: '',
//         seoKeywords: ''
//     });

//     useEffect(() => {
//         if (id) fetchCourse();
//     }, [id]);

//     const fetchCourse = async () => {
//         setLoading(true);
//         try {
//             const { data } = await courseAPI.getById(id);
//             const course = data.course;
//             setFormData({
//                 title: course.title || '',
//                 category: course.category || 'ASTROLOGY COURSES',
//                 price: course.price || '',
//                 courseFee: course.courseFee || '',
//                 date: course.date || '',
//                 timing: course.timing || '',
//                 courseDuration: course.courseDuration || '',
//                 type: course.type || 'Online',
//                 location: course.location || 'Zoom',
//                 image: course.image || '',
//                 whatIs: course.whatIs || '',
//                 aboutCourse: course.aboutCourse || '',
//                 courseContent: course.courseContent?.length ? course.courseContent : [''],
//                 durationDetails: course.durationDetails || '',
//                 note: course.note || '',
//                 highlights: course.highlights?.length ? course.highlights : [''],
//                 level: course.level || '',
//                 modules: course.modules || 0,
//                 includes: course.includes?.length ? course.includes : [''],
//                 vastuType: course.vastuType || '',
//                 certificateAvailable: course.certificateAvailable !== undefined ? course.certificateAvailable : true,
//                 language: course.language || 'Hindi & English',
//                 isActive: course.isActive !== undefined ? course.isActive : true,
//                 isFeatured: course.isFeatured || false,
//                 seoTitle: course.seoTitle || '',
//                 seoDescription: course.seoDescription || '',
//                 seoKeywords: course.seoKeywords || ''
//             });
            
//             if (course.image) {
//                 setImagePreview(`${course.image}`);
//             }
//         } catch (error) {
//             console.error('Error fetching course:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleImageUpload = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
//             alert('Only JPG, PNG, WEBP images allowed');
//             return;
//         }

//         if (file.size > 2 * 1024 * 1024) {
//             alert('Image size should be less than 2MB');
//             return;
//         }

//         const reader = new FileReader();
//         reader.onload = (event) => setImagePreview(event.target.result);
//         reader.readAsDataURL(file);
        
//         setUploadingImage(true);
//         const formDataImage = new FormData();
//         formDataImage.append('courseImage', file);

//         try {
//             const token = localStorage.getItem('adminToken');
//             const response = await fetch('/api/upload/course-image', {
//                 method: 'POST',
//                 headers: { 'Authorization': `Bearer ${token}` },
//                 body: formDataImage
//             });
//             const data = await response.json();
            
//             if (response.ok && data.success) {
//                 setFormData(prev => ({ ...prev, image: data.imagePath }));
//                 setImagePreview(`${data.imagePath}`);
//             }
//         } catch (error) {
//             console.error('Upload error:', error);
//         } finally {
//             setUploadingImage(false);
//         }
//     };

//     const handleArrayField = (field, index, value) => {
//         const newArray = [...formData[field]];
//         newArray[index] = value;
//         setFormData({ ...formData, [field]: newArray });
//     };

//     const addArrayField = (field) => {
//         setFormData({ ...formData, [field]: [...formData[field], ''] });
//     };

//     const removeArrayField = (field, index) => {
//         const newArray = formData[field].filter((_, i) => i !== index);
//         setFormData({ ...formData, [field]: newArray });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSaving(true);
//         try {
//             const submitData = {
//                 ...formData,
//                 courseContent: formData.courseContent.filter(item => item.trim()),
//                 highlights: formData.highlights.filter(item => item.trim()),
//                 includes: formData.includes.filter(item => item.trim()),
//                 seoTitle: formData.seoTitle || formData.title,
//                 seoDescription: formData.seoDescription || formData.aboutCourse?.replace(/<[^>]*>/g, '').substring(0, 157),
//                 seoKeywords: formData.seoKeywords || `${formData.title}, ${formData.category.toLowerCase()}`
//             };
            
//             if (id) {
//                 await courseAPI.update(id, submitData);
//             } else {
//                 await courseAPI.create(submitData);
//             }
//             alert('Course saved successfully!');
//             navigate('/admin/courses');
//         } catch (error) {
//             alert('Failed to save course');
//         } finally {
//             setSaving(false);
//         }
//     };

//     const TabButton = ({ id, label, active, onClick }) => (
//         <button
//             type="button"
//             onClick={() => onClick(id)}
//             className={`px-5 py-2.5 rounded-xl transition-all ${
//                 active === id
//                     ? 'bg-[#00B7B3]/20 text-[#00B7B3] border border-[#00B7B3]/50'
//                     : 'text-gray-400 hover:text-white hover:bg-white/5'
//             }`}
//         >
//             {label}
//         </button>
//     );

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <Loader2 className="w-8 h-8 text-[#00B7B3] animate-spin" />
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-black">
//             {/* Header */}
//             <div className="sticky top-0 z-10 bg-black/90 border-b border-[#00B7B3]/20">
//                 <div className="max-w-7xl mx-auto px-6 py-4">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                             <button
//                                 onClick={() => navigate('/admin/courses')}
//                                 className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
//                             >
//                                 <ArrowLeft className="w-5 h-5 text-gray-400" />
//                             </button>
//                             <div>
//                                 <h1 className="text-2xl font-bold text-white">
//                                     {id ? 'Edit Course' : 'New Course'}
//                                 </h1>
//                                 <p className="text-gray-500 text-sm">
//                                     {id ? 'Update course details' : 'Add a new course'}
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="flex gap-3">
//                             <button
//                                 type="button"
//                                 onClick={() => navigate('/admin/courses')}
//                                 className="px-5 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-white/5"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleSubmit}
//                                 disabled={saving}
//                                 className="px-6 py-2 bg-[#00B7B3] text-black rounded-lg font-semibold hover:bg-[#00B7B3]/80 disabled:opacity-50"
//                             >
//                                 {saving ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (id ? 'Update' : 'Publish')}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-6 py-8">
//                 {/* Image Upload */}
//                 <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6 mb-6">
//                     <h2 className="text-lg font-semibold text-white mb-4">Course Image</h2>
//                     <div className="flex gap-6">
//                         <div className="w-32 h-32 rounded-lg bg-black/60 border border-dashed border-[#00B7B3]/30 flex items-center justify-center">
//                             {imagePreview ? (
//                                 <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
//                             ) : (
//                                 <ImageIcon className="w-8 h-8 text-gray-600" />
//                             )}
//                         </div>
//                         <div>
//                             <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#00B7B3]/10 border border-[#00B7B3]/30 text-[#00B7B3] rounded-lg cursor-pointer hover:bg-[#00B7B3]/20">
//                                 <Upload className="w-4 h-4" />
//                                 {uploadingImage ? 'Uploading...' : 'Upload Image'}
//                                 <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
//                             </label>
//                             <p className="text-gray-500 text-xs mt-2">JPG, PNG, WEBP (Max 2MB)</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Tabs */}
//                 <div className="flex gap-2 mb-6 border-b border-[#00B7B3]/20 pb-3">
//                     <TabButton id="basic" label="Basic" active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="pricing" label="Pricing" active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="content" label="Content" active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="features" label="Features" active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="seo" label="SEO" active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="status" label="Status" active={activeTab} onClick={setActiveTab} />
//                 </div>

//                 {/* Basic Tab */}
//                 {activeTab === 'basic' && (
//                     <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6 space-y-4">
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">Course Title</label>
//                             <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" required />
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm text-gray-400 mb-2">Category</label>
//                                 <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white">
//                                     <option value="ASTROLOGY COURSES">Astrology</option>
//                                     <option value="VASTU COURSES">Vastu</option>
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="block text-sm text-gray-400 mb-2">Level</label>
//                                 <select value={formData.level} onChange={(e) => setFormData({ ...formData, level: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white">
//                                     <option value="">Select</option>
//                                     <option value="Beginner">Beginner</option>
//                                     <option value="Intermediate">Intermediate</option>
//                                     <option value="Advanced">Advanced</option>
//                                 </select>
//                             </div>
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">Language</label>
//                             <input type="text" value={formData.language} onChange={(e) => setFormData({ ...formData, language: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                         </div>
//                     </div>
//                 )}

//                 {/* Pricing Tab */}
//                 {activeTab === 'pricing' && (
//                     <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                         <div className="grid grid-cols-2 gap-4">
//                             <div><label className="block text-sm text-gray-400 mb-2">Price</label><input type="text" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="₹51,000" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Course Fee</label><input type="text" value={formData.courseFee} onChange={(e) => setFormData({ ...formData, courseFee: e.target.value })} placeholder="51,000 INR" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Start Date</label><input type="text" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} placeholder="7th Jan 2025" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Timing</label><input type="text" value={formData.timing} onChange={(e) => setFormData({ ...formData, timing: e.target.value })} placeholder="Saturday 8-10 PM" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Duration</label><input type="text" value={formData.courseDuration} onChange={(e) => setFormData({ ...formData, courseDuration: e.target.value })} placeholder="4 months (12 sessions)" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Modules</label><input type="number" value={formData.modules} onChange={(e) => setFormData({ ...formData, modules: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Class Type</label><select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white"><option>Online</option><option>Offline</option></select></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Location</label><input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Zoom" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Content Tab - With Rich Text Editor */}
//                 {activeTab === 'content' && (
//                     <div className="space-y-6">
//                         <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <label className="block text-sm text-gray-400 mb-3">What is this course?</label>
//                             <ReactQuill
//                                 theme="snow"
//                                 value={formData.whatIs}
//                                 onChange={(value) => setFormData({ ...formData, whatIs: value })}
//                                 modules={quillModules}
//                                 formats={quillFormats}
//                                 placeholder="Write about the course..."
//                                 className="bg-white rounded-lg [&_.ql-toolbar]:border-gray-300 [&_.ql-container]:border-gray-300"
//                             />
//                         </div>

//                         <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <label className="block text-sm text-gray-400 mb-3">About Course</label>
//                             <ReactQuill
//                                 theme="snow"
//                                 value={formData.aboutCourse}
//                                 onChange={(value) => setFormData({ ...formData, aboutCourse: value })}
//                                 modules={quillModules}
//                                 formats={quillFormats}
//                                 placeholder="Detailed description..."
//                                 className="bg-white rounded-lg [&_.ql-toolbar]:border-gray-300 [&_.ql-container]:border-gray-300"
//                             />
//                         </div>

//                         <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="flex justify-between items-center mb-3">
//                                 <label className="text-sm text-gray-400">Course Topics</label>
//                                 <button type="button" onClick={() => addArrayField('courseContent')} className="px-3 py-1 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg">+ Add</button>
//                             </div>
//                             {formData.courseContent.map((item, index) => (
//                                 <div key={index} className="flex gap-2 mb-2">
//                                     <input type="text" value={item} onChange={(e) => handleArrayField('courseContent', index, e.target.value)} placeholder="Topic name" className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                                     {formData.courseContent.length > 1 && <button type="button" onClick={() => removeArrayField('courseContent', index)} className="px-3 bg-red-500/20 text-red-400 rounded-lg">X</button>}
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <label className="block text-sm text-gray-400 mb-2">Duration Details</label>
//                             <textarea rows="2" value={formData.durationDetails} onChange={(e) => setFormData({ ...formData, durationDetails: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                         </div>
//                     </div>
//                 )}

//                 {/* Features Tab */}
//                 {activeTab === 'features' && (
//                     <div className="grid grid-cols-2 gap-6">
//                         <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="flex justify-between items-center mb-3">
//                                 <h2 className="text-white font-semibold">Highlights</h2>
//                                 <button type="button" onClick={() => addArrayField('highlights')} className="px-3 py-1 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg">+</button>
//                             </div>
//                             {formData.highlights.map((item, index) => (
//                                 <div key={index} className="flex gap-2 mb-2">
//                                     <input type="text" value={item} onChange={(e) => handleArrayField('highlights', index, e.target.value)} placeholder="Highlight" className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                                     {formData.highlights.length > 1 && <button type="button" onClick={() => removeArrayField('highlights', index)} className="px-3 bg-red-500/20 text-red-400 rounded-lg">X</button>}
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="flex justify-between items-center mb-3">
//                                 <h2 className="text-white font-semibold">What's Included</h2>
//                                 <button type="button" onClick={() => addArrayField('includes')} className="px-3 py-1 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg">+</button>
//                             </div>
//                             {formData.includes.map((item, index) => (
//                                 <div key={index} className="flex gap-2 mb-2">
//                                     <input type="text" value={item} onChange={(e) => handleArrayField('includes', index, e.target.value)} placeholder="Included item" className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                                     {formData.includes.length > 1 && <button type="button" onClick={() => removeArrayField('includes', index)} className="px-3 bg-red-500/20 text-red-400 rounded-lg">X</button>}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* SEO Tab */}
//                 {activeTab === 'seo' && (
//                     <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6 space-y-4">
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">SEO Title (60 chars)</label>
//                             <input type="text" value={formData.seoTitle} onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })} maxLength="60" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                             <p className="text-gray-500 text-xs mt-1">{formData.seoTitle?.length || 0}/60</p>
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">SEO Description (160 chars)</label>
//                             <textarea rows="2" value={formData.seoDescription} onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })} maxLength="160" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                             <p className="text-gray-500 text-xs mt-1">{formData.seoDescription?.length || 0}/160</p>
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">SEO Keywords</label>
//                             <input type="text" value={formData.seoKeywords} onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })} placeholder="astrology, vastu, course" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                         </div>
//                     </div>
//                 )}

//                 {/* Status Tab */}
//                 {activeTab === 'status' && (
//                     <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6 space-y-3">
//                         <label className="flex items-center gap-3 cursor-pointer">
//                             <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="w-4 h-4 accent-[#00B7B3]" />
//                             <span className="text-white">Active (visible to students)</span>
//                         </label>
//                         <label className="flex items-center gap-3 cursor-pointer">
//                             <input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })} className="w-4 h-4 accent-[#00B7B3]" />
//                             <span className="text-white">Featured (show on homepage)</span>
//                         </label>
//                         <label className="flex items-center gap-3 cursor-pointer">
//                             <input type="checkbox" checked={formData.certificateAvailable} onChange={(e) => setFormData({ ...formData, certificateAvailable: e.target.checked })} className="w-4 h-4 accent-[#00B7B3]" />
//                             <span className="text-white">Certificate Available</span>
//                         </label>
//                     </div>
//                 )}
//             </form>
//         </div>
//     );
// };

// export default CourseForm;



// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import ReactQuill from 'react-quill-new';
// import 'react-quill-new/dist/quill.snow.css';
// import { courseAPI } from '../../services/api';
// import { 
//     ArrowLeft, 
//     Upload, 
//     Plus, 
//     Trash2,
//     Loader2,
//     Image as ImageIcon,
//     Type,
//     List,
//     AlignLeft,
//     Palette
// } from 'lucide-react';

// // Complete toolbar with all options
// const quillModules = {
//     toolbar: [
//         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//         [{ 'font': [] }],
//         [{ 'size': ['small', false, 'large', 'huge'] }],
//         ['bold', 'italic', 'underline', 'strike'],
//         [{ 'color': [] }, { 'background': [] }],
//         [{ 'script': 'sub'}, { 'script': 'super' }],
//         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//         [{ 'indent': '-1'}, { 'indent': '+1' }],
//         [{ 'align': [] }],
//         ['blockquote', 'code-block'],
//         ['link', 'image', 'video'],
//         ['clean']
//     ],
// };

// const quillFormats = [
//     'header', 'font', 'size',
//     'bold', 'italic', 'underline', 'strike',
//     'color', 'background',
//     'script',
//     'list', 'bullet',
//     'indent',
//     'align',
//     'blockquote', 'code-block',
//     'link', 'image', 'video'
// ];

// const CourseForm = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [saving, setSaving] = useState(false);
//     const [imagePreview, setImagePreview] = useState(null);
//     const [uploadingImage, setUploadingImage] = useState(false);
//     const [activeTab, setActiveTab] = useState('basic');
    
//     const [formData, setFormData] = useState({
//         title: '',
//         category: 'ASTROLOGY COURSES',
//         price: '',
//         courseFee: '',
//         date: '',
//         timing: '',
//         courseDuration: '',
//         type: 'Online',
//         location: 'Zoom',
//         image: '',
//         whatIs: '',
//         aboutCourse: '',
//         courseContent: [''],
//         durationDetails: '',
//         note: 'Video Recording of Every Session Will Be Provided To Every Student After Session.',
//         highlights: [''],
//         level: '',
//         modules: 0,
//         includes: [''],
//         vastuType: '',
//         certificateAvailable: true,
//         language: 'Hindi & English',
//         isActive: true,
//         isFeatured: false,
//         seoTitle: '',
//         seoDescription: '',
//         seoKeywords: ''
//     });

//     useEffect(() => {
//         if (id) fetchCourse();
//     }, [id]);

//     const fetchCourse = async () => {
//         setLoading(true);
//         try {
//             const { data } = await courseAPI.getById(id);
//             const course = data.course;
//             setFormData({
//                 title: course.title || '',
//                 category: course.category || 'ASTROLOGY COURSES',
//                 price: course.price || '',
//                 courseFee: course.courseFee || '',
//                 date: course.date || '',
//                 timing: course.timing || '',
//                 courseDuration: course.courseDuration || '',
//                 type: course.type || 'Online',
//                 location: course.location || 'Zoom',
//                 image: course.image || '',
//                 whatIs: course.whatIs || '',
//                 aboutCourse: course.aboutCourse || '',
//                 courseContent: course.courseContent?.length ? course.courseContent : [''],
//                 durationDetails: course.durationDetails || '',
//                 note: course.note || '',
//                 highlights: course.highlights?.length ? course.highlights : [''],
//                 level: course.level || '',
//                 modules: course.modules || 0,
//                 includes: course.includes?.length ? course.includes : [''],
//                 vastuType: course.vastuType || '',
//                 certificateAvailable: course.certificateAvailable !== undefined ? course.certificateAvailable : true,
//                 language: course.language || 'Hindi & English',
//                 isActive: course.isActive !== undefined ? course.isActive : true,
//                 isFeatured: course.isFeatured || false,
//                 seoTitle: course.seoTitle || '',
//                 seoDescription: course.seoDescription || '',
//                 seoKeywords: course.seoKeywords || ''
//             });
            
//             if (course.image) {
//                 setImagePreview(`${course.image}`);
//             }
//         } catch (error) {
//             console.error('Error fetching course:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleImageUpload = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
//             alert('Only JPG, PNG, WEBP images allowed');
//             return;
//         }

//         if (file.size > 2 * 1024 * 1024) {
//             alert('Image size should be less than 2MB');
//             return;
//         }

//         const reader = new FileReader();
//         reader.onload = (event) => setImagePreview(event.target.result);
//         reader.readAsDataURL(file);
        
//         setUploadingImage(true);
//         const formDataImage = new FormData();
//         formDataImage.append('courseImage', file);

//         try {
//             const token = localStorage.getItem('adminToken');
//             const response = await fetch('/api/upload/course-image', {
//                 method: 'POST',
//                 headers: { 'Authorization': `Bearer ${token}` },
//                 body: formDataImage
//             });
//             const data = await response.json();
            
//             if (response.ok && data.success) {
//                 setFormData(prev => ({ ...prev, image: data.imagePath }));
//                 setImagePreview(`${data.imagePath}`);
//             }
//         } catch (error) {
//             console.error('Upload error:', error);
//         } finally {
//             setUploadingImage(false);
//         }
//     };

//     const handleArrayField = (field, index, value) => {
//         const newArray = [...formData[field]];
//         newArray[index] = value;
//         setFormData({ ...formData, [field]: newArray });
//     };

//     const addArrayField = (field) => {
//         setFormData({ ...formData, [field]: [...formData[field], ''] });
//     };

//     const removeArrayField = (field, index) => {
//         const newArray = formData[field].filter((_, i) => i !== index);
//         setFormData({ ...formData, [field]: newArray });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSaving(true);
//         try {
//             const submitData = {
//                 ...formData,
//                 courseContent: formData.courseContent.filter(item => item.trim()),
//                 highlights: formData.highlights.filter(item => item.trim()),
//                 includes: formData.includes.filter(item => item.trim()),
//                 seoTitle: formData.seoTitle || formData.title,
//                 seoDescription: formData.seoDescription || formData.aboutCourse?.replace(/<[^>]*>/g, '').substring(0, 157),
//                 seoKeywords: formData.seoKeywords || `${formData.title}, ${formData.category.toLowerCase()}`
//             };
            
//             if (id) {
//                 await courseAPI.update(id, submitData);
//             } else {
//                 await courseAPI.create(submitData);
//             }
//             alert('Course saved successfully!');
//             navigate('/admin/courses');
//         } catch (error) {
//             alert('Failed to save course');
//         } finally {
//             setSaving(false);
//         }
//     };

//     const TabButton = ({ id, label, active, onClick }) => (
//         <button
//             type="button"
//             onClick={() => onClick(id)}
//             className={`px-5 py-2.5 rounded-xl transition-all ${
//                 active === id
//                     ? 'bg-[#00B7B3]/20 text-[#00B7B3] border border-[#00B7B3]/50'
//                     : 'text-gray-400 hover:text-white hover:bg-white/5'
//             }`}
//         >
//             {label}
//         </button>
//     );

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <Loader2 className="w-8 h-8 text-[#00B7B3] animate-spin" />
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-black">
//             {/* Header */}
//             <div className="sticky top-0 z-10 bg-black/90 border-b border-[#00B7B3]/20">
//                 <div className="max-w-7xl mx-auto px-6 py-4">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                             <button
//                                 onClick={() => navigate('/admin/courses')}
//                                 className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
//                             >
//                                 <ArrowLeft className="w-5 h-5 text-gray-400" />
//                             </button>
//                             <div>
//                                 <h1 className="text-2xl font-bold text-white">
//                                     {id ? 'Edit Course' : 'New Course'}
//                                 </h1>
//                                 <p className="text-gray-500 text-sm">
//                                     {id ? 'Update course details' : 'Add a new course'}
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="flex gap-3">
//                             <button
//                                 type="button"
//                                 onClick={() => navigate('/admin/courses')}
//                                 className="px-5 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-white/5"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleSubmit}
//                                 disabled={saving}
//                                 className="px-6 py-2 bg-[#00B7B3] text-black rounded-lg font-semibold hover:bg-[#00B7B3]/80 disabled:opacity-50"
//                             >
//                                 {saving ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (id ? 'Update' : 'Publish')}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-6 py-8">
//                 {/* Image Upload */}
//                 <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6 mb-6">
//                     <h2 className="text-lg font-semibold text-white mb-4">Course Image</h2>
//                     <div className="flex gap-6">
//                         <div className="w-32 h-32 rounded-lg bg-black/60 border border-dashed border-[#00B7B3]/30 flex items-center justify-center">
//                             {imagePreview ? (
//                                 <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
//                             ) : (
//                                 <ImageIcon className="w-8 h-8 text-gray-600" />
//                             )}
//                         </div>
//                         <div>
//                             <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#00B7B3]/10 border border-[#00B7B3]/30 text-[#00B7B3] rounded-lg cursor-pointer hover:bg-[#00B7B3]/20">
//                                 <Upload className="w-4 h-4" />
//                                 {uploadingImage ? 'Uploading...' : 'Upload Image'}
//                                 <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
//                             </label>
//                             <p className="text-gray-500 text-xs mt-2">JPG, PNG, WEBP (Max 2MB)</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Tabs */}
//                 <div className="flex gap-2 mb-6 border-b border-[#00B7B3]/20 pb-3">
//                     <TabButton id="basic" label="Basic" active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="pricing" label="Pricing" active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="content" label="Content" active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="features" label="Features" active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="seo" label="SEO" active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="status" label="Status" active={activeTab} onClick={setActiveTab} />
//                 </div>

//                 {/* Basic Tab */}
//                 {activeTab === 'basic' && (
//                     <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6 space-y-4">
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">Course Title</label>
//                             <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" required />
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm text-gray-400 mb-2">Category</label>
//                                 <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white">
//                                     <option value="ASTROLOGY COURSES">✨ Astrology</option>
//                                     <option value="VASTU COURSES">🏠 Vastu</option>
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="block text-sm text-gray-400 mb-2">Level</label>
//                                 <select value={formData.level} onChange={(e) => setFormData({ ...formData, level: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white">
//                                     <option value="">Select Level</option>
//                                     <option value="Beginner">Beginner</option>
//                                     <option value="Intermediate">Intermediate</option>
//                                     <option value="Advanced">Advanced</option>
//                                 </select>
//                             </div>
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">Language</label>
//                             <input type="text" value={formData.language} onChange={(e) => setFormData({ ...formData, language: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                         </div>
//                     </div>
//                 )}

//                 {/* Pricing Tab */}
//                 {activeTab === 'pricing' && (
//                     <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                         <div className="grid grid-cols-2 gap-4">
//                             <div><label className="block text-sm text-gray-400 mb-2">Display Price</label><input type="text" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="₹51,000" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Course Fee</label><input type="text" value={formData.courseFee} onChange={(e) => setFormData({ ...formData, courseFee: e.target.value })} placeholder="51,000 INR" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Start Date</label><input type="text" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} placeholder="7th Jan 2025" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Timing</label><input type="text" value={formData.timing} onChange={(e) => setFormData({ ...formData, timing: e.target.value })} placeholder="Saturday 8-10 PM" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Duration</label><input type="text" value={formData.courseDuration} onChange={(e) => setFormData({ ...formData, courseDuration: e.target.value })} placeholder="4 months (12 sessions)" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Modules</label><input type="number" value={formData.modules} onChange={(e) => setFormData({ ...formData, modules: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Class Type</label><select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white"><option>Online</option><option>Offline</option><option>Hybrid</option></select></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Location</label><input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Zoom / Google Meet" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Content Tab - Full Rich Text Editor */}
//                 {activeTab === 'content' && (
//                     <div className="space-y-6">
//                         {/* What is this course? */}
//                         <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
//                             <div className="flex items-center gap-2 mb-4">
//                                 <Type className="w-4 h-4 text-[#00B7B3]" />
//                                 <label className="text-white font-medium">📝 What is this course?</label>
//                             </div>
//                             <ReactQuill
//                                 theme="snow"
//                                 value={formData.whatIs}
//                                 onChange={(value) => setFormData({ ...formData, whatIs: value })}
//                                 modules={quillModules}
//                                 formats={quillFormats}
//                                 placeholder="Write about the course with rich formatting..."
//                                 className="bg-white rounded-xl [&_.ql-toolbar]:rounded-t-xl [&_.ql-container]:rounded-b-xl [&_.ql-toolbar]:border-gray-200 [&_.ql-container]:border-gray-200 [&_.ql-editor]:min-h-[250px]"
//                             />
//                             <p className="text-gray-500 text-xs mt-3">💡 Tip: Use headings, colors, lists, and images to make content engaging</p>
//                         </div>

//                         {/* About Course */}
//                         <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
//                             <div className="flex items-center gap-2 mb-4">
//                                 <BookOpen className="w-4 h-4 text-[#00B7B3]" />
//                                 <label className="text-white font-medium">📖 About Course</label>
//                             </div>
//                             <ReactQuill
//                                 theme="snow"
//                                 value={formData.aboutCourse}
//                                 onChange={(value) => setFormData({ ...formData, aboutCourse: value })}
//                                 modules={quillModules}
//                                 formats={quillFormats}
//                                 placeholder="Detailed description with headings, bullet points, images..."
//                                 className="bg-white rounded-xl [&_.ql-toolbar]:rounded-t-xl [&_.ql-container]:rounded-b-xl [&_.ql-toolbar]:border-gray-200 [&_.ql-container]:border-gray-200 [&_.ql-editor]:min-h-[350px]"
//                             />
//                         </div>

//                         {/* Course Topics */}
//                         <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="flex justify-between items-center mb-3">
//                                 <div className="flex items-center gap-2">
//                                     <List className="w-4 h-4 text-[#00B7B3]" />
//                                     <label className="text-white font-medium">📚 Course Topics / Modules</label>
//                                 </div>
//                                 <button type="button" onClick={() => addArrayField('courseContent')} className="px-3 py-1 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg hover:bg-[#00B7B3]/30">+ Add Topic</button>
//                             </div>
//                             {formData.courseContent.map((item, index) => (
//                                 <div key={index} className="flex gap-2 mb-2">
//                                     <input type="text" value={item} onChange={(e) => handleArrayField('courseContent', index, e.target.value)} placeholder="Topic name" className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                                     {formData.courseContent.length > 1 && (
//                                         <button type="button" onClick={() => removeArrayField('courseContent', index)} className="px-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30">✕</button>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Duration Details */}
//                         <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <label className="block text-white font-medium mb-2">⏱️ Duration Details</label>
//                             <textarea rows="2" value={formData.durationDetails} onChange={(e) => setFormData({ ...formData, durationDetails: e.target.value })} placeholder="4 months course with 12 live sessions + practical assignments." className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                         </div>

//                         {/* Special Note */}
//                         <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <label className="block text-white font-medium mb-2">📌 Special Note</label>
//                             <textarea rows="2" value={formData.note} onChange={(e) => setFormData({ ...formData, note: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                         </div>
//                     </div>
//                 )}

//                 {/* Features Tab */}
//                 {activeTab === 'features' && (
//                     <div className="grid grid-cols-2 gap-6">
//                         <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="flex justify-between items-center mb-3">
//                                 <h2 className="text-white font-semibold">⭐ Highlights</h2>
//                                 <button type="button" onClick={() => addArrayField('highlights')} className="px-3 py-1 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg">+</button>
//                             </div>
//                             {formData.highlights.map((item, index) => (
//                                 <div key={index} className="flex gap-2 mb-2">
//                                     <input type="text" value={item} onChange={(e) => handleArrayField('highlights', index, e.target.value)} placeholder="e.g., 12 Live Sessions" className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                                     {formData.highlights.length > 1 && <button type="button" onClick={() => removeArrayField('highlights', index)} className="px-3 bg-red-500/20 text-red-400 rounded-lg">✕</button>}
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="flex justify-between items-center mb-3">
//                                 <h2 className="text-white font-semibold">🎁 What's Included</h2>
//                                 <button type="button" onClick={() => addArrayField('includes')} className="px-3 py-1 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg">+</button>
//                             </div>
//                             {formData.includes.map((item, index) => (
//                                 <div key={index} className="flex gap-2 mb-2">
//                                     <input type="text" value={item} onChange={(e) => handleArrayField('includes', index, e.target.value)} placeholder="e.g., Certificate" className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                                     {formData.includes.length > 1 && <button type="button" onClick={() => removeArrayField('includes', index)} className="px-3 bg-red-500/20 text-red-400 rounded-lg">✕</button>}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* SEO Tab */}
//                 {activeTab === 'seo' && (
//                     <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6 space-y-4">
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">SEO Title (60 chars)</label>
//                             <input type="text" value={formData.seoTitle} onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })} maxLength="60" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                             <p className="text-gray-500 text-xs mt-1">{formData.seoTitle?.length || 0}/60 characters</p>
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">SEO Description (160 chars)</label>
//                             <textarea rows="2" value={formData.seoDescription} onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })} maxLength="160" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                             <p className="text-gray-500 text-xs mt-1">{formData.seoDescription?.length || 0}/160 characters</p>
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">SEO Keywords (comma separated)</label>
//                             <input type="text" value={formData.seoKeywords} onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })} placeholder="astrology, vastu, course, online" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                         </div>
//                     </div>
//                 )}

//                 {/* Status Tab */}
//                 {activeTab === 'status' && (
//                     <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6 space-y-3">
//                         <label className="flex items-center gap-3 cursor-pointer">
//                             <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="w-4 h-4 accent-[#00B7B3]" />
//                             <span className="text-white">✅ Active (visible to students)</span>
//                         </label>
//                         <label className="flex items-center gap-3 cursor-pointer">
//                             <input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })} className="w-4 h-4 accent-[#00B7B3]" />
//                             <span className="text-white">⭐ Featured (show on homepage)</span>
//                         </label>
//                         <label className="flex items-center gap-3 cursor-pointer">
//                             <input type="checkbox" checked={formData.certificateAvailable} onChange={(e) => setFormData({ ...formData, certificateAvailable: e.target.checked })} className="w-4 h-4 accent-[#00B7B3]" />
//                             <span className="text-white">📜 Certificate Available</span>
//                         </label>
//                     </div>
//                 )}
//             </form>
//         </div>
//     );
// };

// export default CourseForm;




// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import ReactQuill from 'react-quill-new';
// import 'react-quill-new/dist/quill.snow.css';
// import { courseAPI } from '../../services/api';
// import { 
//     ArrowLeft, 
//     Upload, 
//     Plus, 
//     Trash2,
//     Loader2,
//     Image as ImageIcon,
//     Type,
//     List,
//     BookOpen
// } from 'lucide-react';

// // Complete toolbar with all options
// const quillModules = {
//     toolbar: [
//         [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
//         [{ 'font': [] }],
//         [{ 'size': ['small', false, 'large', 'huge'] }],
//         ['bold', 'italic', 'underline', 'strike'],
//         [{ 'color': [] }, { 'background': [] }],
//         [{ 'script': 'sub'}, { 'script': 'super' }],
//         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//         [{ 'indent': '-1'}, { 'indent': '+1' }],
//         [{ 'align': [] }],
//         ['blockquote', 'code-block'],
//         ['link', 'image', 'video'],
//         ['clean']
//     ],
// };

// const quillFormats = [
//     'header', 'font', 'size',
//     'bold', 'italic', 'underline', 'strike',
//     'color', 'background',
//     'script',
//     'list', 'bullet',
//     'indent',
//     'align',
//     'blockquote', 'code-block',
//     'link', 'image', 'video'
// ];

// const CourseForm = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [saving, setSaving] = useState(false);
//     const [imagePreview, setImagePreview] = useState(null);
//     const [uploadingImage, setUploadingImage] = useState(false);
//     const [activeTab, setActiveTab] = useState('basic');
    
//     const [formData, setFormData] = useState({
//         title: '',
//         category: 'ASTROLOGY COURSES',
//         price: '',
//         courseFee: '',
//         date: '',
//         timing: '',
//         courseDuration: '',
//         type: 'Online',
//         location: 'Zoom',
//         image: '',
//         whatIs: '',
//         aboutCourse: '',
//         courseContent: [''],
//         durationDetails: '',
//         note: 'Video Recording of Every Session Will Be Provided To Every Student After Session.',
//         highlights: [''],
//         level: '',
//         modules: 0,
//         includes: [''],
//         vastuType: '',
//         certificateAvailable: true,
//         language: 'Hindi & English',
//         isActive: true,
//         isFeatured: false,
//         seoTitle: '',
//         seoDescription: '',
//         seoKeywords: ''
//     });

//     useEffect(() => {
//         if (id) fetchCourse();
//     }, [id]);

//     const fetchCourse = async () => {
//         setLoading(true);
//         try {
//             const { data } = await courseAPI.getById(id);
//             const course = data.course;
//             setFormData({
//                 title: course.title || '',
//                 category: course.category || 'ASTROLOGY COURSES',
//                 price: course.price || '',
//                 courseFee: course.courseFee || '',
//                 date: course.date || '',
//                 timing: course.timing || '',
//                 courseDuration: course.courseDuration || '',
//                 type: course.type || 'Online',
//                 location: course.location || 'Zoom',
//                 image: course.image || '',
//                 whatIs: course.whatIs || '',
//                 aboutCourse: course.aboutCourse || '',
//                 courseContent: course.courseContent?.length ? course.courseContent : [''],
//                 durationDetails: course.durationDetails || '',
//                 note: course.note || '',
//                 highlights: course.highlights?.length ? course.highlights : [''],
//                 level: course.level || '',
//                 modules: course.modules || 0,
//                 includes: course.includes?.length ? course.includes : [''],
//                 vastuType: course.vastuType || '',
//                 certificateAvailable: course.certificateAvailable !== undefined ? course.certificateAvailable : true,
//                 language: course.language || 'Hindi & English',
//                 isActive: course.isActive !== undefined ? course.isActive : true,
//                 isFeatured: course.isFeatured || false,
//                 seoTitle: course.seoTitle || '',
//                 seoDescription: course.seoDescription || '',
//                 seoKeywords: course.seoKeywords || ''
//             });
            
//             if (course.image) {
//                 setImagePreview(`${course.image}`);
//             }
//         } catch (error) {
//             console.error('Error fetching course:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleImageUpload = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
//             alert('Only JPG, PNG, WEBP images allowed');
//             return;
//         }

//         if (file.size > 2 * 1024 * 1024) {
//             alert('Image size should be less than 2MB');
//             return;
//         }

//         const reader = new FileReader();
//         reader.onload = (event) => setImagePreview(event.target.result);
//         reader.readAsDataURL(file);
        
//         setUploadingImage(true);
//         const formDataImage = new FormData();
//         formDataImage.append('courseImage', file);

//         try {
//             const token = localStorage.getItem('adminToken');
//             const response = await fetch('/api/upload/course-image', {
//                 method: 'POST',
//                 headers: { 'Authorization': `Bearer ${token}` },
//                 body: formDataImage
//             });
//             const data = await response.json();
            
//             if (response.ok && data.success) {
//                 setFormData(prev => ({ ...prev, image: data.imagePath }));
//                 setImagePreview(`${data.imagePath}`);
//             }
//         } catch (error) {
//             console.error('Upload error:', error);
//         } finally {
//             setUploadingImage(false);
//         }
//     };

//     const handleArrayField = (field, index, value) => {
//         const newArray = [...formData[field]];
//         newArray[index] = value;
//         setFormData({ ...formData, [field]: newArray });
//     };

//     const addArrayField = (field) => {
//         setFormData({ ...formData, [field]: [...formData[field], ''] });
//     };

//     const removeArrayField = (field, index) => {
//         const newArray = formData[field].filter((_, i) => i !== index);
//         setFormData({ ...formData, [field]: newArray });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSaving(true);
//         try {
//             const submitData = {
//                 ...formData,
//                 courseContent: formData.courseContent.filter(item => item.trim()),
//                 highlights: formData.highlights.filter(item => item.trim()),
//                 includes: formData.includes.filter(item => item.trim()),
//                 seoTitle: formData.seoTitle || formData.title,
//                 seoDescription: formData.seoDescription || formData.aboutCourse?.replace(/<[^>]*>/g, '').substring(0, 157),
//                 seoKeywords: formData.seoKeywords || `${formData.title}, ${formData.category.toLowerCase()}`
//             };
            
//             if (id) {
//                 await courseAPI.update(id, submitData);
//             } else {
//                 await courseAPI.create(submitData);
//             }
//             alert('Course saved successfully!');
//             navigate('/admin/courses');
//         } catch (error) {
//             alert('Failed to save course');
//         } finally {
//             setSaving(false);
//         }
//     };

//     const TabButton = ({ id, label, active, onClick }) => (
//         <button
//             type="button"
//             onClick={() => onClick(id)}
//             className={`px-5 py-2.5 rounded-xl transition-all ${
//                 active === id
//                     ? 'bg-[#00B7B3]/20 text-[#00B7B3] border border-[#00B7B3]/50'
//                     : 'text-gray-400 hover:text-white hover:bg-white/5'
//             }`}
//         >
//             {label}
//         </button>
//     );

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <Loader2 className="w-8 h-8 text-[#00B7B3] animate-spin" />
//             </div>
//         );
//     }

//     return (
//         <div className="min-h-screen bg-black">
//             {/* Header */}
//             <div className="sticky top-0 z-10 bg-black/90 border-b border-[#00B7B3]/20">
//                 <div className="max-w-7xl mx-auto px-6 py-4">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                             <button
//                                 onClick={() => navigate('/admin/courses')}
//                                 className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
//                             >
//                                 <ArrowLeft className="w-5 h-5 text-gray-400" />
//                             </button>
//                             <div>
//                                 <h1 className="text-2xl font-bold text-white">
//                                     {id ? 'Edit Course' : 'New Course'}
//                                 </h1>
//                                 <p className="text-gray-500 text-sm">
//                                     {id ? 'Update course details' : 'Add a new course'}
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="flex gap-3">
//                             <button
//                                 type="button"
//                                 onClick={() => navigate('/admin/courses')}
//                                 className="px-5 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-white/5"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleSubmit}
//                                 disabled={saving}
//                                 className="px-6 py-2 bg-[#00B7B3] text-black rounded-lg font-semibold hover:bg-[#00B7B3]/80 disabled:opacity-50"
//                             >
//                                 {saving ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (id ? 'Update' : 'Publish')}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-6 py-8">
//                 {/* Image Upload */}
//                 <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6 mb-6">
//                     <h2 className="text-lg font-semibold text-white mb-4">Course Image</h2>
//                     <div className="flex gap-6">
//                         <div className="w-32 h-32 rounded-lg bg-black/60 border border-dashed border-[#00B7B3]/30 flex items-center justify-center">
//                             {imagePreview ? (
//                                 <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
//                             ) : (
//                                 <ImageIcon className="w-8 h-8 text-gray-600" />
//                             )}
//                         </div>
//                         <div>
//                             <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#00B7B3]/10 border border-[#00B7B3]/30 text-[#00B7B3] rounded-lg cursor-pointer hover:bg-[#00B7B3]/20">
//                                 <Upload className="w-4 h-4" />
//                                 {uploadingImage ? 'Uploading...' : 'Upload Image'}
//                                 <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
//                             </label>
//                             <p className="text-gray-500 text-xs mt-2">JPG, PNG, WEBP (Max 2MB)</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Tabs */}
//                 <div className="flex gap-2 mb-6 border-b border-[#00B7B3]/20 pb-3">
//                     <TabButton id="basic" label="Basic" active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="pricing" label="Pricing" active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="content" label="Content" active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="features" label="Features" active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="seo" label="SEO" active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="status" label="Status" active={activeTab} onClick={setActiveTab} />
//                 </div>

//                 {/* Basic Tab */}
//                 {activeTab === 'basic' && (
//                     <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6 space-y-4">
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">Course Title</label>
//                             <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" required />
//                         </div>
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm text-gray-400 mb-2">Category</label>
//                                 <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white">
//                                     <option value="ASTROLOGY COURSES">✨ Astrology</option>
//                                     <option value="VASTU COURSES">🏠 Vastu</option>
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="block text-sm text-gray-400 mb-2">Level</label>
//                                 <select value={formData.level} onChange={(e) => setFormData({ ...formData, level: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white">
//                                     <option value="">Select Level</option>
//                                     <option value="Beginner">Beginner</option>
//                                     <option value="Intermediate">Intermediate</option>
//                                     <option value="Advanced">Advanced</option>
//                                 </select>
//                             </div>
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">Language</label>
//                             <input type="text" value={formData.language} onChange={(e) => setFormData({ ...formData, language: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                         </div>
//                     </div>
//                 )}

//                 {/* Pricing Tab */}
//                 {activeTab === 'pricing' && (
//                     <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                         <div className="grid grid-cols-2 gap-4">
//                             <div><label className="block text-sm text-gray-400 mb-2">Display Price</label><input type="text" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="₹51,000" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Course Fee</label><input type="text" value={formData.courseFee} onChange={(e) => setFormData({ ...formData, courseFee: e.target.value })} placeholder="51,000 INR" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Start Date</label><input type="text" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} placeholder="7th Jan 2025" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Timing</label><input type="text" value={formData.timing} onChange={(e) => setFormData({ ...formData, timing: e.target.value })} placeholder="Saturday 8-10 PM" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Duration</label><input type="text" value={formData.courseDuration} onChange={(e) => setFormData({ ...formData, courseDuration: e.target.value })} placeholder="4 months (12 sessions)" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Modules</label><input type="number" value={formData.modules} onChange={(e) => setFormData({ ...formData, modules: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Class Type</label><select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white"><option>Online</option><option>Offline</option><option>Hybrid</option></select></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Location</label><input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Zoom / Google Meet" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Content Tab */}
//                 {activeTab === 'content' && (
//                     <div className="space-y-6">
//                         {/* What is this course? */}
//                         <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
//                             <div className="flex items-center gap-2 mb-4">
//                                 <Type className="w-4 h-4 text-[#00B7B3]" />
//                                 <label className="text-white font-medium">What is this course?</label>
//                             </div>
//                             <ReactQuill
//                                 theme="snow"
//                                 value={formData.whatIs}
//                                 onChange={(value) => setFormData({ ...formData, whatIs: value })}
//                                 modules={quillModules}
//                                 formats={quillFormats}
//                                 placeholder="Write about the course with rich formatting..."
//                                 className="bg-white rounded-xl [&_.ql-toolbar]:rounded-t-xl [&_.ql-container]:rounded-b-xl [&_.ql-toolbar]:border-gray-200 [&_.ql-container]:border-gray-200 [&_.ql-editor]:min-h-[250px]"
//                             />
//                             <p className="text-gray-500 text-xs mt-3">💡 Tip: Use headings, colors, lists, and images to make content engaging</p>
//                         </div>

//                         {/* About Course */}
//                         <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
//                             <div className="flex items-center gap-2 mb-4">
//                                 <BookOpen className="w-4 h-4 text-[#00B7B3]" />
//                                 <label className="text-white font-medium">About Course</label>
//                             </div>
//                             <ReactQuill
//                                 theme="snow"
//                                 value={formData.aboutCourse}
//                                 onChange={(value) => setFormData({ ...formData, aboutCourse: value })}
//                                 modules={quillModules}
//                                 formats={quillFormats}
//                                 placeholder="Detailed description with headings, bullet points, images..."
//                                 className="bg-white rounded-xl [&_.ql-toolbar]:rounded-t-xl [&_.ql-container]:rounded-b-xl [&_.ql-toolbar]:border-gray-200 [&_.ql-container]:border-gray-200 [&_.ql-editor]:min-h-[350px]"
//                             />
//                         </div>

//                         {/* Course Topics */}
//                         <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="flex justify-between items-center mb-3">
//                                 <div className="flex items-center gap-2">
//                                     <List className="w-4 h-4 text-[#00B7B3]" />
//                                     <label className="text-white font-medium">Course Topics / Modules</label>
//                                 </div>
//                                 <button type="button" onClick={() => addArrayField('courseContent')} className="px-3 py-1 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg hover:bg-[#00B7B3]/30">+ Add Topic</button>
//                             </div>
//                             {formData.courseContent.map((item, index) => (
//                                 <div key={index} className="flex gap-2 mb-2">
//                                     <input type="text" value={item} onChange={(e) => handleArrayField('courseContent', index, e.target.value)} placeholder="Topic name" className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                                     {formData.courseContent.length > 1 && (
//                                         <button type="button" onClick={() => removeArrayField('courseContent', index)} className="px-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30">✕</button>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Duration Details */}
//                         <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <label className="block text-white font-medium mb-2">Duration Details</label>
//                             <textarea rows="2" value={formData.durationDetails} onChange={(e) => setFormData({ ...formData, durationDetails: e.target.value })} placeholder="4 months course with 12 live sessions + practical assignments." className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                         </div>

//                         {/* Special Note */}
//                         <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <label className="block text-white font-medium mb-2">Special Note</label>
//                             <textarea rows="2" value={formData.note} onChange={(e) => setFormData({ ...formData, note: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                         </div>
//                     </div>
//                 )}

//                 {/* Features Tab */}
//                 {activeTab === 'features' && (
//                     <div className="grid grid-cols-2 gap-6">
//                         <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="flex justify-between items-center mb-3">
//                                 <h2 className="text-white font-semibold">⭐ Highlights</h2>
//                                 <button type="button" onClick={() => addArrayField('highlights')} className="px-3 py-1 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg">+</button>
//                             </div>
//                             {formData.highlights.map((item, index) => (
//                                 <div key={index} className="flex gap-2 mb-2">
//                                     <input type="text" value={item} onChange={(e) => handleArrayField('highlights', index, e.target.value)} placeholder="e.g., 12 Live Sessions" className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                                     {formData.highlights.length > 1 && <button type="button" onClick={() => removeArrayField('highlights', index)} className="px-3 bg-red-500/20 text-red-400 rounded-lg">✕</button>}
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="flex justify-between items-center mb-3">
//                                 <h2 className="text-white font-semibold">🎁 What's Included</h2>
//                                 <button type="button" onClick={() => addArrayField('includes')} className="px-3 py-1 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg">+</button>
//                             </div>
//                             {formData.includes.map((item, index) => (
//                                 <div key={index} className="flex gap-2 mb-2">
//                                     <input type="text" value={item} onChange={(e) => handleArrayField('includes', index, e.target.value)} placeholder="e.g., Certificate" className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                                     {formData.includes.length > 1 && <button type="button" onClick={() => removeArrayField('includes', index)} className="px-3 bg-red-500/20 text-red-400 rounded-lg">✕</button>}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* SEO Tab */}
//                 {activeTab === 'seo' && (
//                     <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6 space-y-4">
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">SEO Title (60 chars)</label>
//                             <input type="text" value={formData.seoTitle} onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })} maxLength="60" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                             <p className="text-gray-500 text-xs mt-1">{formData.seoTitle?.length || 0}/60 characters</p>
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">SEO Description (160 chars)</label>
//                             <textarea rows="2" value={formData.seoDescription} onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })} maxLength="160" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                             <p className="text-gray-500 text-xs mt-1">{formData.seoDescription?.length || 0}/160 characters</p>
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">SEO Keywords (comma separated)</label>
//                             <input type="text" value={formData.seoKeywords} onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })} placeholder="astrology, vastu, course, online" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                         </div>
//                     </div>
//                 )}

//                 {/* Status Tab */}
//                 {activeTab === 'status' && (
//                     <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6 space-y-3">
//                         <label className="flex items-center gap-3 cursor-pointer">
//                             <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="w-4 h-4 accent-[#00B7B3]" />
//                             <span className="text-white">✅ Active (visible to students)</span>
//                         </label>
//                         <label className="flex items-center gap-3 cursor-pointer">
//                             <input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })} className="w-4 h-4 accent-[#00B7B3]" />
//                             <span className="text-white">⭐ Featured (show on homepage)</span>
//                         </label>
//                         <label className="flex items-center gap-3 cursor-pointer">
//                             <input type="checkbox" checked={formData.certificateAvailable} onChange={(e) => setFormData({ ...formData, certificateAvailable: e.target.checked })} className="w-4 h-4 accent-[#00B7B3]" />
//                             <span className="text-white">📜 Certificate Available</span>
//                         </label>
//                     </div>
//                 )}
//             </form>
//         </div>
//     );
// };

// export default CourseForm;


// import React, { useState, useEffect } from 'react';
// import { motion } from 'framer-motion';
// import ReactQuill from 'react-quill-new';
// import 'react-quill-new/dist/quill.snow.css';
// import { courseAPI } from '../../services/api';
// import { 
//     ArrowLeft, 
//     Upload, 
//     Plus, 
//     Trash2,
//     Loader2,
//     Image as ImageIcon,
//     Type,
//     List,
//     BookOpen,
//     Link as LinkIcon,
//     Edit
// } from 'lucide-react';

// // Custom dark theme styles for Quill
// const quillStyles = `
//   .dark-quill .ql-toolbar {
//     background: #0a0a0f !important;
//     border-color: #00B7B3 !important;
//     border-radius: 12px 12px 0 0;
//     border-bottom: 1px solid #00B7B3 !important;
//   }
//   .dark-quill .ql-toolbar button {
//     color: #e0e0e0 !important;
//   }
//   .dark-quill .ql-toolbar button:hover {
//     color: #00B7B3 !important;
//   }
//   .dark-quill .ql-toolbar .ql-active {
//     color: #00B7B3 !important;
//   }
//   .dark-quill .ql-container {
//     background: #000000 !important;
//     border-color: #00B7B3 !important;
//     border-radius: 0 0 12px 12px;
//     min-height: 250px;
//   }
//   .dark-quill .ql-editor {
//     color: #ffffff !important;
//     font-size: 15px;
//     line-height: 1.6;
//     background: #000000 !important;
//   }
//   .dark-quill .ql-editor h1 {
//     color: #00B7B3 !important;
//     font-size: 28px;
//     font-weight: bold;
//     margin: 20px 0 12px 0;
//   }
//   .dark-quill .ql-editor h2 {
//     color: #33C5C2 !important;
//     font-size: 24px;
//     font-weight: 600;
//     margin: 18px 0 10px 0;
//   }
//   .dark-quill .ql-editor h3 {
//     color: #66D9D6 !important;
//     font-size: 20px;
//     font-weight: 500;
//     margin: 16px 0 8px 0;
//   }
//   .dark-quill .ql-editor p {
//     color: #ffffff !important;
//     margin-bottom: 12px;
//   }
//   .dark-quill .ql-editor strong {
//     color: #00B7B3 !important;
//   }
//   .dark-quill .ql-editor a {
//     color: #00B7B3 !important;
//     text-decoration: underline;
//   }
//   .dark-quill .ql-editor ul, .dark-quill .ql-editor ol {
//     color: #ffffff !important;
//     margin: 10px 0;
//     padding-left: 25px;
//   }
//   .dark-quill .ql-editor li {
//     margin: 5px 0;
//     color: #ffffff !important;
//   }
//   .dark-quill .ql-editor blockquote {
//     border-left: 3px solid #00B7B3;
//     background: rgba(0, 183, 179, 0.1);
//     padding: 10px 15px;
//     margin: 10px 0;
//     color: #cccccc !important;
//   }
//   .dark-quill .ql-editor code {
//     background: #1a1a2a;
//     color: #00B7B3;
//     padding: 2px 5px;
//     border-radius: 4px;
//   }
//   .dark-quill .ql-picker-label {
//     color: #e0e0e0 !important;
//   }
//   .dark-quill .ql-picker-options {
//     background: #1a1a2a !important;
//     color: #e0e0e0 !important;
//   }
//   .dark-quill .ql-picker-item:hover {
//     color: #00B7B3 !important;
//   }
//   .dark-quill .ql-color-picker .ql-picker-label svg {
//     filter: brightness(2);
//   }
// `;

// // Quill toolbar configuration
// const quillModules = {
//     toolbar: [
//         [{ 'header': [1, 2, 3, false] }],
//         ['bold', 'italic', 'underline'],
//         [{ 'color': [] }],
//         [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//         ['link'],
//         ['clean']
//     ],
// };

// const quillFormats = [
//     'header', 'bold', 'italic', 'underline',
//     'color', 'list', 'bullet', 'link'
// ];

// const CourseForm = () => {
//     const { id } = useParams();
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(false);
//     const [saving, setSaving] = useState(false);
//     const [imagePreview, setImagePreview] = useState(null);
//     const [uploadingImage, setUploadingImage] = useState(false);
//     const [activeTab, setActiveTab] = useState('basic');
//     const [manualSlug, setManualSlug] = useState('');
//     const [useManualSlug, setUseManualSlug] = useState(false);
    
//     const [formData, setFormData] = useState({
//         title: '',
//         category: 'ASTROLOGY COURSES',
//         price: '',
//         courseFee: '',
//         date: '',
//         timing: '',
//         courseDuration: '',
//         type: 'Online',
//         location: 'Zoom',
//         image: '',
//         whatIs: '',
//         aboutCourse: '',
//         courseContent: [''],
//         durationDetails: '',
//         note: 'Video Recording of Every Session Will Be Provided To Every Student After Session.',
//         highlights: [''],
//         level: '',
//         modules: 0,
//         includes: [''],
//         vastuType: '',
//         certificateAvailable: true,
//         language: 'Hindi & English',
//         isActive: true,
//         isFeatured: false,
//         seoTitle: '',
//         seoDescription: '',
//         seoKeywords: ''
//     });

//     // Auto-generate slug from title
//     const generateSlug = (title) => {
//         return title
//             .toLowerCase()
//             .replace(/\s+/g, '-')
//             .replace(/[^\w-]+/g, '')
//             .replace(/--+/g, '-')
//             .trim();
//     };

//     // Get current slug
//     const getCurrentSlug = () => {
//         if (useManualSlug && manualSlug) {
//             return manualSlug;
//         }
//         return formData.title ? generateSlug(formData.title) : '';
//     };

//     useEffect(() => {
//         if (formData.title && !useManualSlug) {
//             setManualSlug(generateSlug(formData.title));
//         }
//     }, [formData.title, useManualSlug]);

//     useEffect(() => {
//         if (id) fetchCourse();
//     }, [id]);

//     const fetchCourse = async () => {
//         setLoading(true);
//         try {
//             const { data } = await courseAPI.getById(id);
//             const course = data.course;
//             setFormData({
//                 title: course.title || '',
//                 category: course.category || 'ASTROLOGY COURSES',
//                 price: course.price || '',
//                 courseFee: course.courseFee || '',
//                 date: course.date || '',
//                 timing: course.timing || '',
//                 courseDuration: course.courseDuration || '',
//                 type: course.type || 'Online',
//                 location: course.location || 'Zoom',
//                 image: course.image || '',
//                 whatIs: course.whatIs || '',
//                 aboutCourse: course.aboutCourse || '',
//                 courseContent: course.courseContent?.length ? course.courseContent : [''],
//                 durationDetails: course.durationDetails || '',
//                 note: course.note || '',
//                 highlights: course.highlights?.length ? course.highlights : [''],
//                 level: course.level || '',
//                 modules: course.modules || 0,
//                 includes: course.includes?.length ? course.includes : [''],
//                 vastuType: course.vastuType || '',
//                 certificateAvailable: course.certificateAvailable !== undefined ? course.certificateAvailable : true,
//                 language: course.language || 'Hindi & English',
//                 isActive: course.isActive !== undefined ? course.isActive : true,
//                 isFeatured: course.isFeatured || false,
//                 seoTitle: course.seoTitle || '',
//                 seoDescription: course.seoDescription || '',
//                 seoKeywords: course.seoKeywords || ''
//             });
            
//             // If course has existing slug, use it
//             if (course.slug) {
//                 setManualSlug(course.slug);
//                 setUseManualSlug(true);
//             }
            
//             if (course.image) {
//                 setImagePreview(`${course.image}`);
//             }
//         } catch (error) {
//             console.error('Error fetching course:', error);
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleImageUpload = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         if (!['image/jpeg', 'image/jpg', 'image/png', 'image/webp'].includes(file.type)) {
//             alert('Only JPG, PNG, WEBP images allowed');
//             return;
//         }

//         if (file.size > 2 * 1024 * 1024) {
//             alert('Image size should be less than 2MB');
//             return;
//         }

//         const reader = new FileReader();
//         reader.onload = (event) => setImagePreview(event.target.result);
//         reader.readAsDataURL(file);
        
//         setUploadingImage(true);
//         const formDataImage = new FormData();
//         formDataImage.append('courseImage', file);

//         try {
//             const token = localStorage.getItem('adminToken');
//             const response = await fetch('/api/upload/course-image', {
//                 method: 'POST',
//                 headers: { 'Authorization': `Bearer ${token}` },
//                 body: formDataImage
//             });
//             const data = await response.json();
            
//             if (response.ok && data.success) {
//                 setFormData(prev => ({ ...prev, image: data.imagePath }));
//                 setImagePreview(`${data.imagePath}`);
//             }
//         } catch (error) {
//             console.error('Upload error:', error);
//         } finally {
//             setUploadingImage(false);
//         }
//     };

//     const handleArrayField = (field, index, value) => {
//         const newArray = [...formData[field]];
//         newArray[index] = value;
//         setFormData({ ...formData, [field]: newArray });
//     };

//     const addArrayField = (field) => {
//         setFormData({ ...formData, [field]: [...formData[field], ''] });
//     };

//     const removeArrayField = (field, index) => {
//         const newArray = formData[field].filter((_, i) => i !== index);
//         setFormData({ ...formData, [field]: newArray });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSaving(true);
//         try {
//             const submitData = {
//                 ...formData,
//                 courseContent: formData.courseContent.filter(item => item.trim()),
//                 highlights: formData.highlights.filter(item => item.trim()),
//                 includes: formData.includes.filter(item => item.trim()),
//                 seoTitle: formData.seoTitle || formData.title,
//                 seoDescription: formData.seoDescription || formData.aboutCourse?.replace(/<[^>]*>/g, '').substring(0, 157),
//                 seoKeywords: formData.seoKeywords || `${formData.title}, ${formData.category.toLowerCase()}`,
//                 slug: getCurrentSlug() // Send custom slug if set
//             };
            
//             if (id) {
//                 await courseAPI.update(id, submitData);
//             } else {
//                 await courseAPI.create(submitData);
//             }
//             alert('Course saved successfully!');
//             navigate('/admin/courses');
//         } catch (error) {
//             console.error('Submit error:', error);
//             alert('Failed to save course: ' + (error.response?.data?.message || 'Please try again'));
//         } finally {
//             setSaving(false);
//         }
//     };

//     const TabButton = ({ id, label, active, onClick }) => (
//         <button
//             type="button"
//             onClick={() => onClick(id)}
//             className={`px-5 py-2.5 rounded-xl transition-all ${
//                 active === id
//                     ? 'bg-[#00B7B3]/20 text-[#00B7B3] border border-[#00B7B3]/50'
//                     : 'text-gray-400 hover:text-white hover:bg-white/5'
//             }`}
//         >
//             {label}
//         </button>
//     );

//     if (loading) {
//         return (
//             <div className="flex items-center justify-center min-h-screen">
//                 <Loader2 className="w-8 h-8 text-[#00B7B3] animate-spin" />
//             </div>
//         );
//     }

//     const currentSlug = getCurrentSlug();

//     return (
//         <div className="min-h-screen bg-black">
//             {/* Inject custom styles */}
//             <style>{quillStyles}</style>
            
//             {/* Header */}
//             <div className="sticky top-0 z-10 bg-black/90 border-b border-[#00B7B3]/20">
//                 <div className="max-w-7xl mx-auto px-6 py-4">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-4">
//                             <button
//                                 onClick={() => navigate('/admin/courses')}
//                                 className="p-2 rounded-lg bg-white/5 hover:bg-white/10"
//                             >
//                                 <ArrowLeft className="w-5 h-5 text-gray-400" />
//                             </button>
//                             <div>
//                                 <h1 className="text-2xl font-bold text-white">
//                                     {id ? 'Edit Course' : 'New Course'}
//                                 </h1>
//                                 <p className="text-gray-500 text-sm">
//                                     {id ? 'Update course details' : 'Add a new course'}
//                                 </p>
//                             </div>
//                         </div>
//                         <div className="flex gap-3">
//                             <button
//                                 type="button"
//                                 onClick={() => navigate('/admin/courses')}
//                                 className="px-5 py-2 rounded-lg border border-gray-700 text-gray-300 hover:bg-white/5"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleSubmit}
//                                 disabled={saving}
//                                 className="px-6 py-2 bg-[#00B7B3] text-black rounded-lg font-semibold hover:bg-[#00B7B3]/80 disabled:opacity-50"
//                             >
//                                 {saving ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : (id ? 'Update' : 'Publish')}
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             <form onSubmit={handleSubmit} className="max-w-7xl mx-auto px-6 py-8">
//                 {/* Image Upload */}
//                 <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6 mb-6">
//                     <h2 className="text-lg font-semibold text-white mb-4">Course Image</h2>
//                     <div className="flex gap-6">
//                         <div className="w-32 h-32 rounded-lg bg-black/60 border border-dashed border-[#00B7B3]/30 flex items-center justify-center">
//                             {imagePreview ? (
//                                 <img src={imagePreview} alt="Preview" className="w-full h-full object-cover rounded-lg" />
//                             ) : (
//                                 <ImageIcon className="w-8 h-8 text-gray-600" />
//                             )}
//                         </div>
//                         <div>
//                             <label className="inline-flex items-center gap-2 px-4 py-2 bg-[#00B7B3]/10 border border-[#00B7B3]/30 text-[#00B7B3] rounded-lg cursor-pointer hover:bg-[#00B7B3]/20">
//                                 <Upload className="w-4 h-4" />
//                                 {uploadingImage ? 'Uploading...' : 'Upload Image'}
//                                 <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} disabled={uploadingImage} />
//                             </label>
//                             <p className="text-gray-500 text-xs mt-2">JPG, PNG, WEBP (Max 2MB)</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Tabs */}
//                 <div className="flex gap-2 mb-6 border-b border-[#00B7B3]/20 pb-3">
//                     <TabButton id="basic" label="Basic" active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="pricing" label="Pricing" active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="content" label="Content" active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="features" label="Features" active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="seo" label="SEO" active={activeTab} onClick={setActiveTab} />
//                     <TabButton id="status" label="Status" active={activeTab} onClick={setActiveTab} />
//                 </div>

//                 {/* Basic Tab */}
//                 {activeTab === 'basic' && (
//                     <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6 space-y-4">
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">Course Title</label>
//                             <input 
//                                 type="text" 
//                                 value={formData.title} 
//                                 onChange={(e) => setFormData({ ...formData, title: e.target.value })} 
//                                 className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" 
//                                 required 
//                             />
//                         </div>
                        
//                         {/* Slug Field - Editable */}
//                         <div>
//                             <div className="flex items-center justify-between mb-2">
//                                 <label className="block text-sm text-gray-400">Course URL Slug</label>
//                                 <button
//                                     type="button"
//                                     onClick={() => {
//                                         setUseManualSlug(!useManualSlug);
//                                         if (!useManualSlug) {
//                                             setManualSlug(generateSlug(formData.title));
//                                         }
//                                     }}
//                                     className="flex items-center gap-1 text-xs text-[#00B7B3] hover:underline"
//                                 >
//                                     <Edit className="w-3 h-3" />
//                                     {useManualSlug ? 'Auto from Title' : 'Customize'}
//                                 </button>
//                             </div>
//                             <div className="flex items-center gap-2 bg-black/60 border border-gray-700 rounded-lg p-2">
//                                 <span className="text-gray-500 text-sm">/courses/</span>
//                                 <input
//                                     type="text"
//                                     value={currentSlug}
//                                     onChange={(e) => {
//                                         const newSlug = e.target.value
//                                             .toLowerCase()
//                                             .replace(/\s+/g, '-')
//                                             .replace(/[^\w-]+/g, '')
//                                             .replace(/--+/g, '-')
//                                             .trim();
//                                         setManualSlug(newSlug);
//                                         setUseManualSlug(true);
//                                     }}
//                                     disabled={!useManualSlug}
//                                     className={`flex-1 bg-transparent text-white outline-none ${
//                                         !useManualSlug ? 'text-gray-400' : 'text-[#00B7B3]'
//                                     }`}
//                                     placeholder="course-slug"
//                                 />
//                                 <span className="text-gray-500 text-sm">/details</span>
//                             </div>
//                             <p className="text-gray-500 text-xs mt-2">
//                                 {useManualSlug 
//                                     ? '✏️ You can edit the URL slug manually' 
//                                     : '🔗 Auto-generated from title. Click "Customize" to edit.'}
//                             </p>
//                         </div>
                        
//                         <div className="grid grid-cols-2 gap-4">
//                             <div>
//                                 <label className="block text-sm text-gray-400 mb-2">Category</label>
//                                 <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white">
//                                     <option value="ASTROLOGY COURSES">✨ Astrology</option>
//                                     <option value="VASTU COURSES">🏠 Vastu</option>
//                                 </select>
//                             </div>
//                             <div>
//                                 <label className="block text-sm text-gray-400 mb-2">Level</label>
//                                 <select value={formData.level} onChange={(e) => setFormData({ ...formData, level: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white">
//                                     <option value="">Select Level</option>
//                                     <option value="Beginner">Beginner</option>
//                                     <option value="Intermediate">Intermediate</option>
//                                     <option value="Advanced">Advanced</option>
//                                 </select>
//                             </div>
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">Language</label>
//                             <input type="text" value={formData.language} onChange={(e) => setFormData({ ...formData, language: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                         </div>
//                     </div>
//                 )}

//                 {/* Pricing Tab - Same as before */}
//                 {activeTab === 'pricing' && (
//                     <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                         <div className="grid grid-cols-2 gap-4">
//                             <div><label className="block text-sm text-gray-400 mb-2">Display Price</label><input type="text" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} placeholder="₹51,000" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Course Fee</label><input type="text" value={formData.courseFee} onChange={(e) => setFormData({ ...formData, courseFee: e.target.value })} placeholder="51,000 INR" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Start Date</label><input type="text" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} placeholder="7th Jan 2025" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Timing</label><input type="text" value={formData.timing} onChange={(e) => setFormData({ ...formData, timing: e.target.value })} placeholder="Saturday 8-10 PM" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Duration</label><input type="text" value={formData.courseDuration} onChange={(e) => setFormData({ ...formData, courseDuration: e.target.value })} placeholder="4 months (12 sessions)" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Modules</label><input type="number" value={formData.modules} onChange={(e) => setFormData({ ...formData, modules: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Class Type</label><select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white"><option>Online</option><option>Offline</option><option>Hybrid</option></select></div>
//                             <div><label className="block text-sm text-gray-400 mb-2">Location</label><input type="text" value={formData.location} onChange={(e) => setFormData({ ...formData, location: e.target.value })} placeholder="Zoom / Google Meet" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" /></div>
//                         </div>
//                     </div>
//                 )}

//                 {/* Content Tab - Dark Theme Editor */}
//                 {activeTab === 'content' && (
//                     <div className="space-y-6">
//                         {/* What is this course? */}
//                         <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
//                             <div className="flex items-center gap-2 mb-4">
//                                 <Type className="w-4 h-4 text-[#00B7B3]" />
//                                 <label className="text-white font-medium">What is this course?</label>
//                             </div>
//                             <div className="dark-quill">
//                                 <ReactQuill
//                                     theme="snow"
//                                     value={formData.whatIs}
//                                     onChange={(value) => setFormData({ ...formData, whatIs: value })}
//                                     modules={quillModules}
//                                     formats={quillFormats}
//                                     placeholder="Write about the course with rich formatting..."
//                                 />
//                             </div>
//                             <p className="text-gray-500 text-xs mt-3">
//                                 💡 Tip: Use H1 (Heading 1) for main title, H2 for sections. Headings will appear in <span className="text-[#00B7B3]">teal color</span> on website.
//                             </p>
//                         </div>

//                         {/* About Course */}
//                         <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
//                             <div className="flex items-center gap-2 mb-4">
//                                 <BookOpen className="w-4 h-4 text-[#00B7B3]" />
//                                 <label className="text-white font-medium">About Course</label>
//                             </div>
//                             <div className="dark-quill">
//                                 <ReactQuill
//                                     theme="snow"
//                                     value={formData.aboutCourse}
//                                     onChange={(value) => setFormData({ ...formData, aboutCourse: value })}
//                                     modules={quillModules}
//                                     formats={quillFormats}
//                                     placeholder="Detailed description with headings, bullet points..."
//                                 />
//                             </div>
//                         </div>

//                         {/* Course Topics */}
//                         <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="flex justify-between items-center mb-3">
//                                 <div className="flex items-center gap-2">
//                                     <List className="w-4 h-4 text-[#00B7B3]" />
//                                     <label className="text-white font-medium">Course Topics / Modules</label>
//                                 </div>
//                                 <button type="button" onClick={() => addArrayField('courseContent')} className="px-3 py-1 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg hover:bg-[#00B7B3]/30">+ Add Topic</button>
//                             </div>
//                             {formData.courseContent.map((item, index) => (
//                                 <div key={index} className="flex gap-2 mb-2">
//                                     <input type="text" value={item} onChange={(e) => handleArrayField('courseContent', index, e.target.value)} placeholder="Topic name" className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                                     {formData.courseContent.length > 1 && (
//                                         <button type="button" onClick={() => removeArrayField('courseContent', index)} className="px-3 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30">✕</button>
//                                     )}
//                                 </div>
//                             ))}
//                         </div>

//                         {/* Duration Details */}
//                         <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <label className="block text-white font-medium mb-2">Duration Details</label>
//                             <textarea rows="2" value={formData.durationDetails} onChange={(e) => setFormData({ ...formData, durationDetails: e.target.value })} placeholder="4 months course with 12 live sessions + practical assignments." className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                         </div>

//                         {/* Special Note */}
//                         <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <label className="block text-white font-medium mb-2">Special Note</label>
//                             <textarea rows="2" value={formData.note} onChange={(e) => setFormData({ ...formData, note: e.target.value })} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                         </div>
//                     </div>
//                 )}

//                 {/* Features Tab */}
//                 {activeTab === 'features' && (
//                     <div className="grid grid-cols-2 gap-6">
//                         <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="flex justify-between items-center mb-3">
//                                 <h2 className="text-white font-semibold">⭐ Highlights</h2>
//                                 <button type="button" onClick={() => addArrayField('highlights')} className="px-3 py-1 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg">+</button>
//                             </div>
//                             {formData.highlights.map((item, index) => (
//                                 <div key={index} className="flex gap-2 mb-2">
//                                     <input type="text" value={item} onChange={(e) => handleArrayField('highlights', index, e.target.value)} placeholder="e.g., 12 Live Sessions" className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                                     {formData.highlights.length > 1 && <button type="button" onClick={() => removeArrayField('highlights', index)} className="px-3 bg-red-500/20 text-red-400 rounded-lg">✕</button>}
//                                 </div>
//                             ))}
//                         </div>

//                         <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6">
//                             <div className="flex justify-between items-center mb-3">
//                                 <h2 className="text-white font-semibold">🎁 What's Included</h2>
//                                 <button type="button" onClick={() => addArrayField('includes')} className="px-3 py-1 text-sm bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg">+</button>
//                             </div>
//                             {formData.includes.map((item, index) => (
//                                 <div key={index} className="flex gap-2 mb-2">
//                                     <input type="text" value={item} onChange={(e) => handleArrayField('includes', index, e.target.value)} placeholder="e.g., Certificate" className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                                     {formData.includes.length > 1 && <button type="button" onClick={() => removeArrayField('includes', index)} className="px-3 bg-red-500/20 text-red-400 rounded-lg">✕</button>}
//                                 </div>
//                             ))}
//                         </div>
//                     </div>
//                 )}

//                 {/* SEO Tab */}
//                 {activeTab === 'seo' && (
//                     <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6 space-y-4">
//                         <div className="bg-black/60 border border-[#00B7B3]/30 rounded-lg p-3 mb-2">
//                             <div className="flex items-center gap-2 text-sm mb-2">
//                                 <LinkIcon className="w-4 h-4 text-[#00B7B3]" />
//                                 <span className="text-gray-400">Final URL:</span>
//                                 <span className="text-[#00B7B3] font-mono text-sm break-all">
//                                     https://nbastro.com/courses/{currentSlug || 'course-slug'}/details
//                                 </span>
//                             </div>
//                             <p className="text-gray-500 text-xs">This URL will be used for sharing and SEO.</p>
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">SEO Title (60 chars)</label>
//                             <input type="text" value={formData.seoTitle} onChange={(e) => setFormData({ ...formData, seoTitle: e.target.value })} maxLength="60" placeholder={formData.title} className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                             <p className="text-gray-500 text-xs mt-1">{formData.seoTitle?.length || 0}/60 characters</p>
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">SEO Description (160 chars)</label>
//                             <textarea rows="2" value={formData.seoDescription} onChange={(e) => setFormData({ ...formData, seoDescription: e.target.value })} maxLength="160" placeholder="Short description for search engines" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                             <p className="text-gray-500 text-xs mt-1">{formData.seoDescription?.length || 0}/160 characters</p>
//                         </div>
//                         <div>
//                             <label className="block text-sm text-gray-400 mb-2">SEO Keywords (comma separated)</label>
//                             <input type="text" value={formData.seoKeywords} onChange={(e) => setFormData({ ...formData, seoKeywords: e.target.value })} placeholder="astrology, vastu, course, online" className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white" />
//                         </div>
//                     </div>
//                 )}

//                 {/* Status Tab */}
//                 {activeTab === 'status' && (
//                     <div className="bg-black/40 border border-[#00B7B3]/20 rounded-2xl p-6 space-y-3">
//                         <label className="flex items-center gap-3 cursor-pointer">
//                             <input type="checkbox" checked={formData.isActive} onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })} className="w-4 h-4 accent-[#00B7B3]" />
//                             <span className="text-white">✅ Active (visible to students)</span>
//                         </label>
//                         <label className="flex items-center gap-3 cursor-pointer">
//                             <input type="checkbox" checked={formData.isFeatured} onChange={(e) => setFormData({ ...formData, isFeatured: e.target.checked })} className="w-4 h-4 accent-[#00B7B3]" />
//                             <span className="text-white">⭐ Featured (show on homepage)</span>
//                         </label>
//                         <label className="flex items-center gap-3 cursor-pointer">
//                             <input type="checkbox" checked={formData.certificateAvailable} onChange={(e) => setFormData({ ...formData, certificateAvailable: e.target.checked })} className="w-4 h-4 accent-[#00B7B3]" />
//                             <span className="text-white">📜 Certificate Available</span>
//                         </label>
//                     </div>
//                 )}
//             </form>
//         </div>
//     );
// };

// export default CourseForm;





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
                image: course.image || '',
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

        const reader = new FileReader();
        reader.onload = (event) => setImagePreview(event.target.result);
        reader.readAsDataURL(file);
        
        setUploadingImage(true);
        const formDataImage = new FormData();
        formDataImage.append('courseImage', file);

        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('/api/upload/course-image', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formDataImage
            });
            const data = await response.json();
            
            if (response.ok && data.success) {
                setFormData(prev => ({ ...prev, image: data.imagePath }));
                setImagePreview(`${data.imagePath}`);
            }
        } catch (error) {
            console.error('Upload error:', error);
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
                slug: getCurrentSlug()
            };
            
            if (id) {
                await courseAPI.update(id, submitData);
            } else {
                await courseAPI.create(submitData);
            }
            alert('Course saved successfully!');
            navigate('/admin/courses');
        } catch (error) {
            console.error('Submit error:', error);
            alert('Failed to save course: ' + (error.response?.data?.message || 'Please try again'));
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
