// import React, { useState, useEffect, useCallback } from 'react';
// import TinyMCEEditor from '../components/Common/TinyMCEEditor';
// import ImageSizeHint from '../components/Common/ImageSizeHint';
// import { 
//     Plus, Edit, Trash2, Eye, EyeOff, Search, Loader2, 
//     X, Save, ArrowLeft, Upload, RefreshCw, Calendar,
//     Tag, FolderOpen, FileText, Star, Check
// } from 'lucide-react';
// import Link from 'next/link';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// const BlogManager = () => {
//     const [blogs, setBlogs] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [saving, setSaving] = useState(false);
//     const [activeTab, setActiveTab] = useState('list');
//     const [editingId, setEditingId] = useState(null);
//     const [search, setSearch] = useState('');
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [selectedBlog, setSelectedBlog] = useState(null);
//     const [imageFile, setImageFile] = useState(null);
//     const [imagePreview, setImagePreview] = useState('');
//     const [formTab, setFormTab] = useState('basic');
//     const [useManualSlug, setUseManualSlug] = useState(false);
//     const [generatedSlug, setGeneratedSlug] = useState('');
//     const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
//     const [newQuickSummary, setNewQuickSummary] = useState('');

//     const [formData, setFormData] = useState({
//         title: '',
//         slug: '',
//         useManualSlug: false,
//         excerpt: '',
//         content: '',
//         aiOverview: '',
//         quickSummary: [],
//         faqs: [],
//         image: '',
//         categories: [],
//         tags: [],
//         isPublished: true,
//         isFeatured: false,
//         seoTitle: '',
//         seoDescription: '',
//         seoKeywords: ''
//     });

//     const fetchBlogs = useCallback(async () => {
//         setLoading(true);
//         try {
//             const token = localStorage.getItem('adminToken');
//             const response = await fetch(`${API_BASE_URL}/api/blog/admin/all`, {
//                 headers: token ? { Authorization: `Bearer ${token}` } : {}
//             });
//             const data = await response.json();
//             if (data.success) {
//                 setBlogs(data.data);
//             }
//         } catch (error) {
//             console.error('Error fetching blogs:', error);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         fetchBlogs();
//     }, [fetchBlogs]);

//     // ✅ Auto-generate slug from title
//     useEffect(() => {
//         if (formData.title && !useManualSlug) {
//             const slug = formData.title
//                 .toLowerCase()
//                 .replace(/[^a-z0-9]+/g, '-')
//                 .replace(/-+/g, '-')
//                 .replace(/^-|-$/g, '');
//             setGeneratedSlug(slug);
//             setFormData(prev => ({ ...prev, slug }));
//         }
//     }, [formData.title, useManualSlug]);

//     const handleInputChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     };

//     const handleArrayInput = (field, value) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: value.split(',').map(item => item.trim()).filter(Boolean)
//         }));
//     };

//     const handleImageChange = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         if (file.size > 2 * 1024 * 1024) {
//             alert('Image size should be less than 2MB');
//             e.target.value = '';
//             return;
//         }

//         setImageFile(file);
//         setImagePreview(URL.createObjectURL(file));

//         // ✅ Upload with delete
//         const formDataImage = new FormData();
//         formDataImage.append('file', file);
        
//         const oldImagePath = formData.image || '';
//         if (oldImagePath) {
//             formDataImage.append('oldImagePath', oldImagePath);
//         }
        
//         formDataImage.append('field', 'blog');
//         formDataImage.append('folder', 'blogs');

//         try {
//             const token = localStorage.getItem('adminToken');
//             const response = await fetch('/api/upload/with-delete', {
//                 method: 'POST',
//                 headers: { 'Authorization': `Bearer ${token}` },
//                 body: formDataImage
//             });
//             const data = await response.json();
//             if (response.ok && data.success) {
//                 setFormData(prev => ({ ...prev, image: data.imagePath }));
//                 setImagePreview(data.imagePath);
//                 if (data.oldImageDeleted) {
//                     alert('✅ Image uploaded! Old image deleted.');
//                 }
//             }
//         } catch (error) {
//             console.error('Upload error:', error);
//         }
//     };

//     const addFaq = () => {
//         if (newFaq.question.trim() && newFaq.answer.trim()) {
//             setFormData(prev => ({
//                 ...prev,
//                 faqs: [...prev.faqs, { ...newFaq }]
//             }));
//             setNewFaq({ question: '', answer: '' });
//         }
//     };

//     const removeFaq = (index) => {
//         setFormData(prev => ({
//             ...prev,
//             faqs: prev.faqs.filter((_, i) => i !== index)
//         }));
//     };

//     const addQuickSummary = () => {
//         if (newQuickSummary.trim()) {
//             setFormData(prev => ({
//                 ...prev,
//                 quickSummary: [...prev.quickSummary, newQuickSummary.trim()]
//             }));
//             setNewQuickSummary('');
//         }
//     };

//     const removeQuickSummary = (index) => {
//         setFormData(prev => ({
//             ...prev,
//             quickSummary: prev.quickSummary.filter((_, i) => i !== index)
//         }));
//     };

//    const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);

//     try {
//         const submitData = { ...formData };
        
//         // ✅ Process categories
//         if (typeof submitData.categories === 'string') {
//             submitData.categories = submitData.categories.split(',').map(item => item.trim()).filter(Boolean);
//         } else if (!Array.isArray(submitData.categories)) {
//             submitData.categories = [];
//         }
        
//         // ✅ Process tags
//         if (typeof submitData.tags === 'string') {
//             submitData.tags = submitData.tags.split(',').map(item => item.trim()).filter(Boolean);
//         } else if (!Array.isArray(submitData.tags)) {
//             submitData.tags = [];
//         }

//         // ✅ Ensure quickSummary is array
//         if (!Array.isArray(submitData.quickSummary)) {
//             submitData.quickSummary = [];
//         }

//         // ✅ Ensure faqs is array
//         if (!Array.isArray(submitData.faqs)) {
//             submitData.faqs = [];
//         }

//         const token = localStorage.getItem('adminToken');
//         if (!token) {
//             alert('❌ Please login first');
//             setSaving(false);
//             return;
//         }

//         const url = editingId 
//             ? `${API_BASE_URL}/api/blog/${editingId}`
//             : `${API_BASE_URL}/api/blog`;
        
//         console.log('📤 [BLOG] Submitting to:', url);
//         console.log('📤 [BLOG] Data:', JSON.stringify(submitData, null, 2));

//         const response = await fetch(url, {
//             method: editingId ? 'PUT' : 'POST',
//             headers: {
//                 'Content-Type': 'application/json',
//                 'Authorization': `Bearer ${token}`
//             },
//             body: JSON.stringify(submitData)
//         });

//         console.log('📥 [BLOG] Response status:', response.status);

//         // ✅ Check if response is ok
//         if (!response.ok) {
//             const errorText = await response.text();
//             console.error('❌ [BLOG] Error response:', errorText);
//             try {
//                 const errorData = JSON.parse(errorText);
//                 throw new Error(errorData.message || 'Failed to save');
//             } catch (e) {
//                 throw new Error(`Server error: ${response.status}`);
//             }
//         }

//         const data = await response.json();
//         console.log('📥 [BLOG] Response data:', data);

//         if (data.success) {
//             alert(editingId ? '✅ Blog updated!' : '✅ Blog created!');
//             resetForm();
//             await fetchBlogs();
//             setActiveTab('list');
//         } else {
//             alert('❌ ' + (data.message || 'Failed to save'));
//         }
//     } catch (error) {
//         console.error('❌ [BLOG] Submit error:', error);
//         alert('❌ Failed to save blog: ' + error.message);
//     } finally {
//         setSaving(false);
//     }
// };

//     const handleDelete = async () => {
//         if (!selectedBlog) return;
//         try {
//             const token = localStorage.getItem('adminToken');
//             const response = await fetch(`${API_BASE_URL}/api/blog/${selectedBlog._id}`, {
//                 method: 'DELETE',
//                 headers: { 'Authorization': `Bearer ${token}` }
//             });
//             const data = await response.json();
//             if (data.success) {
//                 alert('✅ Blog deleted!');
//                 setShowDeleteModal(false);
//                 setSelectedBlog(null);
//                 fetchBlogs();
//             }
//         } catch (error) {
//             console.error('Delete error:', error);
//             alert('❌ Failed to delete blog');
//         }
//     };

//     const handleEdit = (blog) => {
//         setEditingId(blog._id);
//         setFormData({
//             title: blog.title || '',
//             slug: blog.slug || '',
//             useManualSlug: blog.useManualSlug || false,
//             excerpt: blog.excerpt || '',
//             content: blog.content || '',
//             aiOverview: blog.aiOverview || '',
//             quickSummary: blog.quickSummary || [],
//             faqs: blog.faqs || [],
//             image: blog.image || '',
//             categories: blog.categories || [],
//             tags: blog.tags || [],
//             isPublished: blog.isPublished !== undefined ? blog.isPublished : true,
//             isFeatured: blog.isFeatured || false,
//             seoTitle: blog.seoTitle || '',
//             seoDescription: blog.seoDescription || '',
//             seoKeywords: blog.seoKeywords || ''
//         });
//         setUseManualSlug(blog.useManualSlug || false);
//         setImagePreview(blog.image ? `${API_BASE_URL}${blog.image}` : '');
//         setImageFile(null);
//         setFormTab('basic');
//         setActiveTab('edit');
//     };

//     const resetForm = () => {
//         setEditingId(null);
//         setFormData({
//             title: '',
//             slug: '',
//             useManualSlug: false,
//             excerpt: '',
//             content: '',
//             aiOverview: '',
//             quickSummary: [],
//             faqs: [],
//             image: '',
//             categories: [],
//             tags: [],
//             isPublished: true,
//             isFeatured: false,
//             seoTitle: '',
//             seoDescription: '',
//             seoKeywords: ''
//         });
//         setImageFile(null);
//         setImagePreview('');
//         setUseManualSlug(false);
//         setGeneratedSlug('');
//         setNewFaq({ question: '', answer: '' });
//         setNewQuickSummary('');
//         setFormTab('basic');
//         setActiveTab('list');
//     };

//     const togglePublish = async (id, currentStatus) => {
//         try {
//             const token = localStorage.getItem('adminToken');
//             const response = await fetch(`${API_BASE_URL}/api/blog/${id}/toggle-publish`, {
//                 method: 'PATCH',
//                 headers: { 'Authorization': `Bearer ${token}` }
//             });
//             const data = await response.json();
//             if (data.success) {
//                 fetchBlogs();
//             }
//         } catch (error) {
//             console.error('Toggle publish error:', error);
//         }
//     };

//     const toggleFeatured = async (id, currentStatus) => {
//         try {
//             const token = localStorage.getItem('adminToken');
//             const response = await fetch(`${API_BASE_URL}/api/blog/${id}/toggle-featured`, {
//                 method: 'PATCH',
//                 headers: { 'Authorization': `Bearer ${token}` }
//             });
//             const data = await response.json();
//             if (data.success) {
//                 fetchBlogs();
//             }
//         } catch (error) {
//             console.error('Toggle featured error:', error);
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

//     const filteredBlogs = blogs.filter(blog =>
//         blog.title?.toLowerCase().includes(search.toLowerCase()) ||
//         blog.excerpt?.toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <div className="min-h-screen bg-black p-6">
//             {/* Header */}
//             <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
//                 <div>
//                     <h1 className="text-2xl font-bold text-white flex items-center gap-2">
//                         <FileText className="w-6 h-6 text-[#00B7B3]" />
//                         Blog Management
//                     </h1>
//                     <p className="text-gray-500 text-sm">
//                         {blogs.length} blogs • {blogs.filter(b => b.isPublished).length} published
//                     </p>
//                 </div>
//                 {activeTab === 'list' && (
//                     <button
//                         onClick={() => { resetForm(); setActiveTab('add'); }}
//                         className="bg-[#00B7B3] text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#33C5C2] transition"
//                     >
//                         <Plus size={20} />
//                         New Blog
//                     </button>
//                 )}
//                 {activeTab !== 'list' && (
//                     <button
//                         onClick={() => { resetForm(); setActiveTab('list'); }}
//                         className="border border-gray-600 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
//                     >
//                         <ArrowLeft size={20} />
//                         Back to List
//                     </button>
//                 )}
//             </div>

//             {/* LIST TAB */}
//             {activeTab === 'list' && (
//                 <>
//                     {/* Search */}
//                     <div className="flex flex-wrap items-center gap-4 mb-6">
//                         <div className="flex-1 min-w-[200px] relative">
//                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                             <input
//                                 type="text"
//                                 placeholder="Search blogs..."
//                                 value={search}
//                                 onChange={(e) => setSearch(e.target.value)}
//                                 className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#00B7B3] outline-none"
//                             />
//                         </div>
//                         <button
//                             onClick={fetchBlogs}
//                             className="p-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition"
//                         >
//                             <RefreshCw className="w-4 h-4" />
//                         </button>
//                     </div>

//                     {/* Blog List */}
//                     {loading ? (
//                         <div className="flex items-center justify-center py-12">
//                             <Loader2 className="w-8 h-8 text-[#00B7B3] animate-spin" />
//                         </div>
//                     ) : filteredBlogs.length === 0 ? (
//                         <div className="text-center py-12 bg-gray-900/50 rounded-xl border border-gray-800">
//                             <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
//                             <p className="text-gray-400">No blogs found</p>
//                             <button
//                                 onClick={() => { resetForm(); setActiveTab('add'); }}
//                                 className="text-[#00B7B3] hover:underline text-sm mt-2 inline-block"
//                             >
//                                 Create your first blog
//                             </button>
//                         </div>
//                     ) : (
//                         <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
//                             <div className="overflow-x-auto">
//                                 <table className="w-full">
//                                     <thead className="bg-gray-800/50 border-b border-gray-700">
//                                         <tr>
//                                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Blog</th>
//                                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
//                                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Views</th>
//                                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Date</th>
//                                             <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase">Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody className="divide-y divide-gray-800">
//                                         {filteredBlogs.map((blog) => (
//                                             <tr key={blog._id} className="hover:bg-gray-800/50 transition">
//                                                 <td className="px-4 py-4">
//                                                     <div className="flex items-center gap-3">
//                                                         {blog.image && (
//                                                             <img
//                                                                 src={`${API_BASE_URL}${blog.image}`}
//                                                                 alt={blog.title}
//                                                                 className="w-12 h-12 rounded-lg object-cover"
//                                                                 onError={(e) => { e.target.style.display = 'none'; }}
//                                                             />
//                                                         )}
//                                                         <div>
//                                                             <p className="text-white font-medium line-clamp-1">{blog.title}</p>
//                                                             <p className="text-gray-500 text-xs line-clamp-1">{blog.excerpt}</p>
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                                 <td className="px-4 py-4">
//                                                     <div className="flex flex-col gap-1">
//                                                         <button
//                                                             onClick={() => togglePublish(blog._id, blog.isPublished)}
//                                                             className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
//                                                                 blog.isPublished 
//                                                                     ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
//                                                                     : 'bg-red-500/20 text-red-400 border border-red-500/30'
//                                                             }`}
//                                                         >
//                                                             {blog.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
//                                                             {blog.isPublished ? 'Published' : 'Draft'}
//                                                         </button>
//                                                         {blog.isFeatured && (
//                                                             <span className="text-yellow-400 text-xs flex items-center gap-1">
//                                                                 <Star className="w-3 h-3" /> Featured
//                                                             </span>
//                                                         )}
//                                                     </div>
//                                                 </td>
//                                                 <td className="px-4 py-4 text-gray-400 text-sm">{blog.views || 0}</td>
//                                                 <td className="px-4 py-4 text-gray-400 text-sm">
//                                                     {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-IN')}
//                                                 </td>
//                                                 <td className="px-4 py-4 text-right">
//                                                     <div className="flex items-center justify-end gap-2">
//                                                         <button
//                                                             onClick={() => toggleFeatured(blog._id, blog.isFeatured)}
//                                                             className={`p-2 rounded-lg transition ${
//                                                                 blog.isFeatured 
//                                                                     ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' 
//                                                                     : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
//                                                             }`}
//                                                             title="Toggle Featured"
//                                                         >
//                                                             <Star className="w-4 h-4" />
//                                                         </button>
//                                                         <Link
//                                                             href={`/blog/${blog.slug}`}
//                                                             target="_blank"
//                                                             className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"
//                                                             title="View"
//                                                         >
//                                                             <Eye className="w-4 h-4" />
//                                                         </Link>
//                                                         <button
//                                                             onClick={() => handleEdit(blog)}
//                                                             className="p-2 rounded-lg bg-[#00B7B3]/10 text-[#00B7B3] hover:bg-[#00B7B3]/20 transition"
//                                                             title="Edit"
//                                                         >
//                                                             <Edit className="w-4 h-4" />
//                                                         </button>
//                                                         <button
//                                                             onClick={() => {
//                                                                 setSelectedBlog(blog);
//                                                                 setShowDeleteModal(true);
//                                                             }}
//                                                             className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
//                                                             title="Delete"
//                                                         >
//                                                             <Trash2 className="w-4 h-4" />
//                                                         </button>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     )}
//                 </>
//             )}

//             {/* ADD/EDIT FORM */}
//             {(activeTab === 'add' || activeTab === 'edit') && (
//                 <div className="bg-gray-900 rounded-xl border border-gray-800">
//                     {/* Form Tabs */}
//                     <div className="flex border-b border-gray-800 overflow-x-auto">
//                         {['basic', 'content', 'ai', 'faq', 'seo'].map((tab) => (
//                             <TabButton
//                                 key={tab}
//                                 id={tab}
//                                 label={
//                                     tab === 'basic' ? '📋 Basic' :
//                                     tab === 'content' ? '✏️ Content' :
//                                     tab === 'ai' ? '🤖 AI Overview' :
//                                     tab === 'faq' ? '❓ FAQs' :
//                                     '🔍 SEO'
//                                 }
//                                 active={formTab}
//                                 onClick={setFormTab}
//                             />
//                         ))}
//                     </div>

//                     <form onSubmit={handleSubmit} className="p-6">
//                         {/* BASIC TAB */}
//                         {formTab === 'basic' && (
//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-gray-300 mb-1 text-sm font-medium">Title *</label>
//                                     <input
//                                         type="text"
//                                         name="title"
//                                         value={formData.title}
//                                         onChange={handleInputChange}
//                                         required
//                                         className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-300 mb-1 text-sm font-medium">Slug</label>
//                                     <div className="flex gap-2 mb-2">
//                                         <button
//                                             type="button"
//                                             onClick={() => {
//                                                 setUseManualSlug(false);
//                                                 setFormData(prev => ({ ...prev, useManualSlug: false }));
//                                             }}
//                                             className={`px-3 py-1 rounded text-sm ${!useManualSlug ? 'bg-[#00B7B3] text-black' : 'bg-gray-700 text-gray-300'}`}
//                                         >
//                                             Auto
//                                         </button>
//                                         <button
//                                             type="button"
//                                             onClick={() => {
//                                                 setUseManualSlug(true);
//                                                 setFormData(prev => ({ ...prev, useManualSlug: true }));
//                                             }}
//                                             className={`px-3 py-1 rounded text-sm ${useManualSlug ? 'bg-[#00B7B3] text-black' : 'bg-gray-700 text-gray-300'}`}
//                                         >
//                                             Manual
//                                         </button>
//                                     </div>
//                                     {useManualSlug ? (
//                                         <input
//                                             type="text"
//                                             value={formData.slug}
//                                             onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') }))}
//                                             className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                             placeholder="enter-custom-slug"
//                                         />
//                                     ) : (
//                                         <input
//                                             type="text"
//                                             value={generatedSlug}
//                                             readOnly
//                                             className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
//                                         />
//                                     )}
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-300 mb-1 text-sm font-medium">Excerpt (160 chars) *</label>
//                                     <textarea
//                                         name="excerpt"
//                                         value={formData.excerpt}
//                                         onChange={handleInputChange}
//                                         required
//                                         maxLength="160"
//                                         rows="2"
//                                         className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                     />
//                                     <p className="text-right text-xs text-gray-500 mt-1">{formData.excerpt.length}/160</p>
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-300 mb-1 text-sm font-medium">Categories (comma separated)</label>
//                                     <input
//                                         type="text"
//                                         value={formData.categories.join(', ')}
//                                         onChange={(e) => handleArrayInput('categories', e.target.value)}
//                                         placeholder="Astrology, Vastu, Career"
//                                         className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-300 mb-1 text-sm font-medium">Tags (comma separated)</label>
//                                     <input
//                                         type="text"
//                                         value={formData.tags.join(', ')}
//                                         onChange={(e) => handleArrayInput('tags', e.target.value)}
//                                         placeholder="vedic astrology, vastu shastra, career guidance"
//                                         className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-300 mb-1 text-sm font-medium">Blog Image</label>
//                                     <div className="flex items-center gap-4">
//                                         {imagePreview && (
//                                             <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-gray-700" />
//                                         )}
//                                         <label className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 transition flex items-center gap-2">
//                                             <Upload className="w-4 h-4" />
//                                             {imagePreview ? 'Change' : 'Upload'}
//                                             <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
//                                         </label>
//                                     </div>
//                                     <ImageSizeHint type="blog" />
//                                 </div>

//                                 <div className="flex gap-6">
//                                     <label className="flex items-center gap-2 cursor-pointer">
//                                         <input
//                                             type="checkbox"
//                                             name="isPublished"
//                                             checked={formData.isPublished}
//                                             onChange={handleInputChange}
//                                             className="w-4 h-4 accent-[#00B7B3]"
//                                         />
//                                         <span className="text-gray-300">Publish</span>
//                                     </label>
//                                     <label className="flex items-center gap-2 cursor-pointer">
//                                         <input
//                                             type="checkbox"
//                                             name="isFeatured"
//                                             checked={formData.isFeatured}
//                                             onChange={handleInputChange}
//                                             className="w-4 h-4 accent-[#00B7B3]"
//                                         />
//                                         <span className="text-gray-300">⭐ Featured</span>
//                                     </label>
//                                 </div>
//                             </div>
//                         )}

//                         {/* CONTENT TAB */}
//                         {formTab === 'content' && (
//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-gray-300 mb-2 text-sm font-medium">Blog Content *</label>
//                                     <TinyMCEEditor
//                                         value={formData.content}
//                                         onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
//                                         placeholder="Write your blog content here..."
//                                         minHeight={500}
//                                     />
//                                 </div>
//                             </div>
//                         )}

//                         {/* AI OVERVIEW TAB */}
// {formTab === 'ai' && (
//     <div className="space-y-4">
//         <div className="bg-[#00B7B3]/5 border border-[#00B7B3]/30 rounded-lg p-4">
//             <h3 className="text-[#00B7B3] font-semibold mb-2">🤖 AI Overview (Google AI Overviews)</h3>
//             <p className="text-gray-400 text-sm mb-3">
//                 This summary helps Google understand your blog for AI Overviews. Keep it concise (40-80 words).
//             </p>
//         </div>

//         <div>
//             <label className="block text-gray-300 mb-1 text-sm font-medium">AI Overview Summary</label>
//             <textarea
//                 value={formData.aiOverview}
//                 onChange={(e) => setFormData(prev => ({ ...prev, aiOverview: e.target.value }))}
//                 placeholder="Write a concise summary of your blog (40-80 words) for Google AI Overviews..."
//                 rows="3"
//                 maxLength="200"
//                 className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//             />
//             <p className="text-right text-xs text-gray-500 mt-1">{formData.aiOverview.length}/200</p>
//         </div>

//         {/* ✅ QUICK SUMMARY - Description style */}
//         <div>
//             <label className="block text-gray-300 mb-1 text-sm font-medium">Quick Summary</label>
//             <textarea
//                 value={formData.quickSummaryDescription || ''}
//                 onChange={(e) => setFormData(prev => ({ ...prev, quickSummaryDescription: e.target.value }))}
//                 placeholder="Write a quick summary of your blog (2-3 sentences) for readers..."
//                 rows="3"
//                 maxLength="300"
//                 className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//             />
//             <p className="text-right text-xs text-gray-500 mt-1">{formData.quickSummaryDescription?.length || 0}/300</p>
//         </div>
//     </div>
// )}

//                         {/* FAQ TAB */}
//                         {formTab === 'faq' && (
//                             <div className="space-y-4">
//                                 <div className="bg-[#00B7B3]/5 border border-[#00B7B3]/30 rounded-lg p-4">
//                                     <h3 className="text-[#00B7B3] font-semibold mb-2">❓ Frequently Asked Questions</h3>
//                                     <p className="text-gray-400 text-sm">
//                                         Add FAQs to improve search visibility and answer common questions.
//                                     </p>
//                                 </div>

//                                 <div className="border border-gray-700 rounded-lg p-4">
//                                     <div className="space-y-3 mb-4">
//                                         <input
//                                             type="text"
//                                             value={newFaq.question}
//                                             onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
//                                             placeholder="Question"
//                                             className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                         />
//                                         <textarea
//                                             value={newFaq.answer}
//                                             onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
//                                             placeholder="Answer"
//                                             rows="2"
//                                             className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={addFaq}
//                                             className="w-full px-4 py-2 bg-[#00B7B3] text-black rounded-lg hover:bg-[#33C5C2] transition"
//                                         >
//                                             + Add FAQ
//                                         </button>
//                                     </div>
//                                     <div className="space-y-2">
//                                         {formData.faqs.map((faq, idx) => (
//                                             <div key={idx} className="bg-gray-800 px-3 py-2 rounded">
//                                                 <div className="flex justify-between">
//                                                     <p className="text-white text-sm font-medium">❓ {faq.question}</p>
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => removeFaq(idx)}
//                                                         className="text-red-400 text-sm hover:text-red-300"
//                                                     >
//                                                         ✕
//                                                     </button>
//                                                 </div>
//                                                 <p className="text-gray-400 text-sm mt-1">{faq.answer}</p>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* SEO TAB */}
//                         {formTab === 'seo' && (
//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-gray-300 mb-1 text-sm font-medium">SEO Title</label>
//                                     <input
//                                         type="text"
//                                         name="seoTitle"
//                                         value={formData.seoTitle}
//                                         onChange={handleInputChange}
//                                         maxLength="70"
//                                         className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                         placeholder="SEO optimized title"
//                                     />
//                                     <p className="text-right text-xs text-gray-500 mt-1">{formData.seoTitle.length}/70</p>
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-300 mb-1 text-sm font-medium">SEO Description</label>
//                                     <textarea
//                                         name="seoDescription"
//                                         value={formData.seoDescription}
//                                         onChange={handleInputChange}
//                                         maxLength="160"
//                                         rows="2"
//                                         className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                         placeholder="Meta description for search results"
//                                     />
//                                     <p className="text-right text-xs text-gray-500 mt-1">{formData.seoDescription.length}/160</p>
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-300 mb-1 text-sm font-medium">SEO Keywords</label>
//                                     <input
//                                         type="text"
//                                         name="seoKeywords"
//                                         value={formData.seoKeywords}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                         placeholder="keyword1, keyword2, keyword3"
//                                     />
//                                 </div>
//                             </div>
//                         )}

//                         {/* Form Buttons */}
//                         <div className="flex gap-3 pt-6 mt-6 border-t border-gray-800">
//                             <button
//                                 type="submit"
//                                 disabled={saving}
//                                 className="flex-1 bg-[#00B7B3] text-black py-2 rounded-lg font-semibold hover:bg-[#33C5C2] transition disabled:opacity-50 flex items-center justify-center gap-2"
//                             >
//                                 {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                                 {saving ? 'Saving...' : (editingId ? 'Update Blog' : 'Create Blog')}
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={resetForm}
//                                 className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             )}

//             {/* Delete Modal */}
//             {showDeleteModal && selectedBlog && (
//                 <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
//                     <div className="bg-gray-900 rounded-2xl max-w-md w-full p-6 border border-gray-800">
//                         <h3 className="text-xl font-bold text-white mb-2">Delete Blog</h3>
//                         <p className="text-gray-400 mb-6">
//                             Are you sure you want to delete <span className="text-[#00B7B3]">{selectedBlog.title}</span>?
//                             This action cannot be undone.
//                         </p>
//                         <div className="flex gap-3">
//                             <button
//                                 onClick={() => setShowDeleteModal(false)}
//                                 className="flex-1 px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleDelete}
//                                 className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BlogManager;



// import React, { useState, useEffect, useCallback } from 'react';
// import TinyMCEEditor from '../components/Common/TinyMCEEditor';
// import ImageSizeHint from '../components/Common/ImageSizeHint';
// import { 
//     Plus, Edit, Trash2, Eye, EyeOff, Search, Loader2, 
//     X, Save, ArrowLeft, Upload, RefreshCw, Calendar,
//     Tag, FolderOpen, FileText, Star, Check
// } from 'lucide-react';
// import Link from 'next/link';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// const BlogManager = () => {
//     const [blogs, setBlogs] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [saving, setSaving] = useState(false);
//     const [activeTab, setActiveTab] = useState('list');
//     const [editingId, setEditingId] = useState(null);
//     const [search, setSearch] = useState('');
//     const [showDeleteModal, setShowDeleteModal] = useState(false);
//     const [selectedBlog, setSelectedBlog] = useState(null);
//     const [imageFile, setImageFile] = useState(null);
//     const [imagePreview, setImagePreview] = useState('');
//     const [formTab, setFormTab] = useState('basic');
//     const [useManualSlug, setUseManualSlug] = useState(false);
//     const [generatedSlug, setGeneratedSlug] = useState('');
//     const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
//     const [newQuickSummary, setNewQuickSummary] = useState('');

//     const [formData, setFormData] = useState({
//         title: '',
//         slug: '',
//         useManualSlug: false,
//         excerpt: '',
//         content: '',
//         aiOverview: '',
//         quickSummaryDescription: '',
//         quickSummary: [],
//         faqs: [],
//         image: '',
//         categories: [],
//         tags: [],
//         isPublished: true,
//         isFeatured: false,
//         seoTitle: '',
//         seoDescription: '',
//         seoKeywords: ''
//     });

//     const fetchBlogs = useCallback(async () => {
//         setLoading(true);
//         try {
//             const token = localStorage.getItem('adminToken');
//             const response = await fetch(`${API_BASE_URL}/api/blog/admin/all`, {
//                 headers: token ? { Authorization: `Bearer ${token}` } : {}
//             });
//             const data = await response.json();
//             if (data.success) {
//                 setBlogs(data.data);
//             }
//         } catch (error) {
//             console.error('Error fetching blogs:', error);
//         } finally {
//             setLoading(false);
//         }
//     }, []);

//     useEffect(() => {
//         fetchBlogs();
//     }, [fetchBlogs]);

//     // ✅ Auto-generate slug from title
//     useEffect(() => {
//         if (formData.title && !useManualSlug) {
//             const slug = formData.title
//                 .toLowerCase()
//                 .replace(/[^a-z0-9]+/g, '-')
//                 .replace(/-+/g, '-')
//                 .replace(/^-|-$/g, '');
//             setGeneratedSlug(slug);
//             setFormData(prev => ({ ...prev, slug }));
//         }
//     }, [formData.title, useManualSlug]);

//     const handleInputChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' ? checked : value
//         }));
//     };

//     const handleArrayInput = (field, value) => {
//         setFormData(prev => ({
//             ...prev,
//             [field]: value.split(',').map(item => item.trim()).filter(Boolean)
//         }));
//     };

//     const handleImageChange = async (e) => {
//         const file = e.target.files[0];
//         if (!file) return;

//         if (file.size > 2 * 1024 * 1024) {
//             alert('Image size should be less than 2MB');
//             e.target.value = '';
//             return;
//         }

//         setImageFile(file);
//         setImagePreview(URL.createObjectURL(file));

//         // ✅ Upload with delete
//         const formDataImage = new FormData();
//         formDataImage.append('file', file);
        
//         const oldImagePath = formData.image || '';
//         if (oldImagePath) {
//             formDataImage.append('oldImagePath', oldImagePath);
//         }
        
//         formDataImage.append('field', 'blog');
//         formDataImage.append('folder', 'blogs');

//         try {
//             const token = localStorage.getItem('adminToken');
//             const response = await fetch('/api/upload/with-delete', {
//                 method: 'POST',
//                 headers: { 'Authorization': `Bearer ${token}` },
//                 body: formDataImage
//             });
//             const data = await response.json();
//             if (response.ok && data.success) {
//                 setFormData(prev => ({ ...prev, image: data.imagePath }));
//                 setImagePreview(data.imagePath);
//                 if (data.oldImageDeleted) {
//                     alert('✅ Image uploaded! Old image deleted.');
//                 }
//             }
//         } catch (error) {
//             console.error('Upload error:', error);
//         }
//     };

//     const addFaq = () => {
//         if (newFaq.question.trim() && newFaq.answer.trim()) {
//             setFormData(prev => ({
//                 ...prev,
//                 faqs: [...prev.faqs, { ...newFaq }]
//             }));
//             setNewFaq({ question: '', answer: '' });
//         }
//     };

//     const removeFaq = (index) => {
//         setFormData(prev => ({
//             ...prev,
//             faqs: prev.faqs.filter((_, i) => i !== index)
//         }));
//     };

//     const addQuickSummary = () => {
//         if (newQuickSummary.trim()) {
//             setFormData(prev => ({
//                 ...prev,
//                 quickSummary: [...prev.quickSummary, newQuickSummary.trim()]
//             }));
//             setNewQuickSummary('');
//         }
//     };

//     const removeQuickSummary = (index) => {
//         setFormData(prev => ({
//             ...prev,
//             quickSummary: prev.quickSummary.filter((_, i) => i !== index)
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         setSaving(true);

//         try {
//             const submitData = { ...formData };
            
//             // ✅ Process categories
//             if (typeof submitData.categories === 'string') {
//                 submitData.categories = submitData.categories.split(',').map(item => item.trim()).filter(Boolean);
//             } else if (!Array.isArray(submitData.categories)) {
//                 submitData.categories = [];
//             }
            
//             // ✅ Process tags
//             if (typeof submitData.tags === 'string') {
//                 submitData.tags = submitData.tags.split(',').map(item => item.trim()).filter(Boolean);
//             } else if (!Array.isArray(submitData.tags)) {
//                 submitData.tags = [];
//             }

//             // ✅ Ensure quickSummary is array
//             if (!Array.isArray(submitData.quickSummary)) {
//                 submitData.quickSummary = [];
//             }

//             // ✅ Ensure faqs is array
//             if (!Array.isArray(submitData.faqs)) {
//                 submitData.faqs = [];
//             }

//             const token = localStorage.getItem('adminToken');
//             if (!token) {
//                 alert('❌ Please login first');
//                 setSaving(false);
//                 return;
//             }

//             const url = editingId 
//                 ? `${API_BASE_URL}/api/blog/${editingId}`
//                 : `${API_BASE_URL}/api/blog`;
            
//             console.log('📤 [BLOG] Submitting to:', url);
//             console.log('📤 [BLOG] Data:', JSON.stringify(submitData, null, 2));

//             const response = await fetch(url, {
//                 method: editingId ? 'PUT' : 'POST',
//                 headers: {
//                     'Content-Type': 'application/json',
//                     'Authorization': `Bearer ${token}`
//                 },
//                 body: JSON.stringify(submitData)
//             });

//             console.log('📥 [BLOG] Response status:', response.status);

//             // ✅ Check if response is ok
//             if (!response.ok) {
//                 const errorText = await response.text();
//                 console.error('❌ [BLOG] Error response:', errorText);
//                 try {
//                     const errorData = JSON.parse(errorText);
//                     throw new Error(errorData.message || 'Failed to save');
//                 } catch (e) {
//                     throw new Error(`Server error: ${response.status}`);
//                 }
//             }

//             const data = await response.json();
//             console.log('📥 [BLOG] Response data:', data);

//             if (data.success) {
//                 alert(editingId ? '✅ Blog updated!' : '✅ Blog created!');
//                 resetForm();
//                 await fetchBlogs();
//                 setActiveTab('list');
//             } else {
//                 alert('❌ ' + (data.message || 'Failed to save'));
//             }
//         } catch (error) {
//             console.error('❌ [BLOG] Submit error:', error);
//             alert('❌ Failed to save blog: ' + error.message);
//         } finally {
//             setSaving(false);
//         }
//     };

//     const handleDelete = async () => {
//         if (!selectedBlog) return;
//         try {
//             const token = localStorage.getItem('adminToken');
//             const response = await fetch(`${API_BASE_URL}/api/blog/${selectedBlog._id}`, {
//                 method: 'DELETE',
//                 headers: { 'Authorization': `Bearer ${token}` }
//             });
//             const data = await response.json();
//             if (data.success) {
//                 alert('✅ Blog deleted!');
//                 setShowDeleteModal(false);
//                 setSelectedBlog(null);
//                 fetchBlogs();
//             }
//         } catch (error) {
//             console.error('Delete error:', error);
//             alert('❌ Failed to delete blog');
//         }
//     };

//     const handleEdit = (blog) => {
//         setEditingId(blog._id);
//         setFormData({
//             title: blog.title || '',
//             slug: blog.slug || '',
//             useManualSlug: blog.useManualSlug || false,
//             excerpt: blog.excerpt || '',
//             content: blog.content || '',
//             aiOverview: blog.aiOverview || '',
//             quickSummaryDescription: blog.quickSummaryDescription || '',
//             quickSummary: blog.quickSummary || [],
//             faqs: blog.faqs || [],
//             image: blog.image || '',
//             categories: blog.categories || [],
//             tags: blog.tags || [],
//             isPublished: blog.isPublished !== undefined ? blog.isPublished : true,
//             isFeatured: blog.isFeatured || false,
//             seoTitle: blog.seoTitle || '',
//             seoDescription: blog.seoDescription || '',
//             seoKeywords: blog.seoKeywords || ''
//         });
//         setUseManualSlug(blog.useManualSlug || false);
//         setImagePreview(blog.image ? `${API_BASE_URL}${blog.image}` : '');
//         setImageFile(null);
//         setFormTab('basic');
//         setActiveTab('edit');
//     };

//     const resetForm = () => {
//         setEditingId(null);
//         setFormData({
//             title: '',
//             slug: '',
//             useManualSlug: false,
//             excerpt: '',
//             content: '',
//             aiOverview: '',
//             quickSummaryDescription: '',
//             quickSummary: [],
//             faqs: [],
//             image: '',
//             categories: [],
//             tags: [],
//             isPublished: true,
//             isFeatured: false,
//             seoTitle: '',
//             seoDescription: '',
//             seoKeywords: ''
//         });
//         setImageFile(null);
//         setImagePreview('');
//         setUseManualSlug(false);
//         setGeneratedSlug('');
//         setNewFaq({ question: '', answer: '' });
//         setNewQuickSummary('');
//         setFormTab('basic');
//         setActiveTab('list');
//     };

//     const togglePublish = async (id) => {
//         try {
//             const token = localStorage.getItem('adminToken');
//             const response = await fetch(`${API_BASE_URL}/api/blog/${id}/toggle-publish`, {
//                 method: 'PATCH',
//                 headers: { 'Authorization': `Bearer ${token}` }
//             });
//             const data = await response.json();
//             if (data.success) {
//                 fetchBlogs();
//             }
//         } catch (error) {
//             console.error('Toggle publish error:', error);
//         }
//     };

//     const toggleFeatured = async (id) => {
//         try {
//             const token = localStorage.getItem('adminToken');
//             const response = await fetch(`${API_BASE_URL}/api/blog/${id}/toggle-featured`, {
//                 method: 'PATCH',
//                 headers: { 'Authorization': `Bearer ${token}` }
//             });
//             const data = await response.json();
//             if (data.success) {
//                 fetchBlogs();
//             }
//         } catch (error) {
//             console.error('Toggle featured error:', error);
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

//     const filteredBlogs = blogs.filter(blog =>
//         blog.title?.toLowerCase().includes(search.toLowerCase()) ||
//         blog.excerpt?.toLowerCase().includes(search.toLowerCase())
//     );

//     return (
//         <div className="min-h-screen bg-black p-6">
//             {/* Header */}
//             <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
//                 <div>
//                     <h1 className="text-2xl font-bold text-white flex items-center gap-2">
//                         <FileText className="w-6 h-6 text-[#00B7B3]" />
//                         Blog Management
//                     </h1>
//                     <p className="text-gray-500 text-sm">
//                         {blogs.length} blogs • {blogs.filter(b => b.isPublished).length} published
//                     </p>
//                 </div>
//                 {activeTab === 'list' && (
//                     <button
//                         onClick={() => { resetForm(); setActiveTab('add'); }}
//                         className="bg-[#00B7B3] text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#33C5C2] transition"
//                     >
//                         <Plus size={20} />
//                         New Blog
//                     </button>
//                 )}
//                 {activeTab !== 'list' && (
//                     <button
//                         onClick={() => { resetForm(); setActiveTab('list'); }}
//                         className="border border-gray-600 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
//                     >
//                         <ArrowLeft size={20} />
//                         Back to List
//                     </button>
//                 )}
//             </div>

//             {/* LIST TAB */}
//             {activeTab === 'list' && (
//                 <>
//                     {/* Search */}
//                     <div className="flex flex-wrap items-center gap-4 mb-6">
//                         <div className="flex-1 min-w-[200px] relative">
//                             <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
//                             <input
//                                 type="text"
//                                 placeholder="Search blogs..."
//                                 value={search}
//                                 onChange={(e) => setSearch(e.target.value)}
//                                 className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#00B7B3] outline-none"
//                             />
//                         </div>
//                         <button
//                             onClick={fetchBlogs}
//                             className="p-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition"
//                         >
//                             <RefreshCw className="w-4 h-4" />
//                         </button>
//                     </div>

//                     {/* Blog List */}
//                     {loading ? (
//                         <div className="flex items-center justify-center py-12">
//                             <Loader2 className="w-8 h-8 text-[#00B7B3] animate-spin" />
//                         </div>
//                     ) : filteredBlogs.length === 0 ? (
//                         <div className="text-center py-12 bg-gray-900/50 rounded-xl border border-gray-800">
//                             <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
//                             <p className="text-gray-400">No blogs found</p>
//                             <button
//                                 onClick={() => { resetForm(); setActiveTab('add'); }}
//                                 className="text-[#00B7B3] hover:underline text-sm mt-2 inline-block"
//                             >
//                                 Create your first blog
//                             </button>
//                         </div>
//                     ) : (
//                         <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
//                             <div className="overflow-x-auto">
//                                 <table className="w-full">
//                                     <thead className="bg-gray-800/50 border-b border-gray-700">
//                                         <tr>
//                                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Blog</th>
//                                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
//                                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Views</th>
//                                             <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Date</th>
//                                             <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase">Actions</th>
//                                         </tr>
//                                     </thead>
//                                     <tbody className="divide-y divide-gray-800">
//                                         {filteredBlogs.map((blog) => (
//                                             <tr key={blog._id} className="hover:bg-gray-800/50 transition">
//                                                 <td className="px-4 py-4">
//                                                     <div className="flex items-center gap-3">
//                                                         {blog.image && (
//                                                             <img
//                                                                 src={`${API_BASE_URL}${blog.image}`}
//                                                                 alt={blog.title}
//                                                                 className="w-12 h-12 rounded-lg object-cover"
//                                                                 onError={(e) => { e.target.style.display = 'none'; }}
//                                                             />
//                                                         )}
//                                                         <div>
//                                                             <p className="text-white font-medium line-clamp-1">{blog.title}</p>
//                                                             <p className="text-gray-500 text-xs line-clamp-1">{blog.excerpt}</p>
//                                                         </div>
//                                                     </div>
//                                                 </td>
//                                                 <td className="px-4 py-4">
//                                                     <div className="flex flex-col gap-1">
//                                                         <button
//                                                             onClick={() => togglePublish(blog._id)}
//                                                             className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
//                                                                 blog.isPublished 
//                                                                     ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
//                                                                     : 'bg-red-500/20 text-red-400 border border-red-500/30'
//                                                             }`}
//                                                         >
//                                                             {blog.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
//                                                             {blog.isPublished ? 'Published' : 'Draft'}
//                                                         </button>
//                                                         {blog.isFeatured && (
//                                                             <span className="text-yellow-400 text-xs flex items-center gap-1">
//                                                                 <Star className="w-3 h-3" /> Featured
//                                                             </span>
//                                                         )}
//                                                     </div>
//                                                 </td>
//                                                 <td className="px-4 py-4 text-gray-400 text-sm">{blog.views || 0}</td>
//                                                 <td className="px-4 py-4 text-gray-400 text-sm">
//                                                     {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-IN')}
//                                                 </td>
//                                                 <td className="px-4 py-4 text-right">
//                                                     <div className="flex items-center justify-end gap-2">
//                                                         <button
//                                                             onClick={() => toggleFeatured(blog._id)}
//                                                             className={`p-2 rounded-lg transition ${
//                                                                 blog.isFeatured 
//                                                                     ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' 
//                                                                     : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
//                                                             }`}
//                                                             title="Toggle Featured"
//                                                         >
//                                                             <Star className="w-4 h-4" />
//                                                         </button>
//                                                         <Link
//                                                             href={`/blog/${blog.slug}`}
//                                                             target="_blank"
//                                                             className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"
//                                                             title="View"
//                                                         >
//                                                             <Eye className="w-4 h-4" />
//                                                         </Link>
//                                                         <button
//                                                             onClick={() => handleEdit(blog)}
//                                                             className="p-2 rounded-lg bg-[#00B7B3]/10 text-[#00B7B3] hover:bg-[#00B7B3]/20 transition"
//                                                             title="Edit"
//                                                         >
//                                                             <Edit className="w-4 h-4" />
//                                                         </button>
//                                                         <button
//                                                             onClick={() => {
//                                                                 setSelectedBlog(blog);
//                                                                 setShowDeleteModal(true);
//                                                             }}
//                                                             className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
//                                                             title="Delete"
//                                                         >
//                                                             <Trash2 className="w-4 h-4" />
//                                                         </button>
//                                                     </div>
//                                                 </td>
//                                             </tr>
//                                         ))}
//                                     </tbody>
//                                 </table>
//                             </div>
//                         </div>
//                     )}
//                 </>
//             )}

//             {/* ADD/EDIT FORM */}
//             {(activeTab === 'add' || activeTab === 'edit') && (
//                 <div className="bg-gray-900 rounded-xl border border-gray-800">
//                     {/* Form Tabs */}
//                     <div className="flex border-b border-gray-800 overflow-x-auto">
//                         {['basic', 'content', 'ai', 'faq', 'seo'].map((tab) => (
//                             <TabButton
//                                 key={tab}
//                                 id={tab}
//                                 label={
//                                     tab === 'basic' ? '📋 Basic' :
//                                     tab === 'content' ? '✏️ Content' :
//                                     tab === 'ai' ? '🤖 AI Overview' :
//                                     tab === 'faq' ? '❓ FAQs' :
//                                     '🔍 SEO'
//                                 }
//                                 active={formTab}
//                                 onClick={setFormTab}
//                             />
//                         ))}
//                     </div>

//                     <form onSubmit={handleSubmit} className="p-6">
//                         {/* BASIC TAB */}
//                         {formTab === 'basic' && (
//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-gray-300 mb-1 text-sm font-medium">Title *</label>
//                                     <input
//                                         type="text"
//                                         name="title"
//                                         value={formData.title}
//                                         onChange={handleInputChange}
//                                         required
//                                         className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-300 mb-1 text-sm font-medium">Slug</label>
//                                     <div className="flex gap-2 mb-2">
//                                         <button
//                                             type="button"
//                                             onClick={() => {
//                                                 setUseManualSlug(false);
//                                                 setFormData(prev => ({ ...prev, useManualSlug: false }));
//                                             }}
//                                             className={`px-3 py-1 rounded text-sm ${!useManualSlug ? 'bg-[#00B7B3] text-black' : 'bg-gray-700 text-gray-300'}`}
//                                         >
//                                             Auto
//                                         </button>
//                                         <button
//                                             type="button"
//                                             onClick={() => {
//                                                 setUseManualSlug(true);
//                                                 setFormData(prev => ({ ...prev, useManualSlug: true }));
//                                             }}
//                                             className={`px-3 py-1 rounded text-sm ${useManualSlug ? 'bg-[#00B7B3] text-black' : 'bg-gray-700 text-gray-300'}`}
//                                         >
//                                             Manual
//                                         </button>
//                                     </div>
//                                     {useManualSlug ? (
//                                         <input
//                                             type="text"
//                                             value={formData.slug}
//                                             onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') }))}
//                                             className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                             placeholder="enter-custom-slug"
//                                         />
//                                     ) : (
//                                         <input
//                                             type="text"
//                                             value={generatedSlug}
//                                             readOnly
//                                             className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
//                                         />
//                                     )}
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-300 mb-1 text-sm font-medium">Excerpt (160 chars) *</label>
//                                     <textarea
//                                         name="excerpt"
//                                         value={formData.excerpt}
//                                         onChange={handleInputChange}
//                                         required
//                                         maxLength="160"
//                                         rows="2"
//                                         className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                     />
//                                     <p className="text-right text-xs text-gray-500 mt-1">{formData.excerpt.length}/160</p>
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-300 mb-1 text-sm font-medium">Categories (comma separated)</label>
//                                     <input
//                                         type="text"
//                                         value={formData.categories.join(', ')}
//                                         onChange={(e) => handleArrayInput('categories', e.target.value)}
//                                         placeholder="Astrology, Vastu, Career"
//                                         className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-300 mb-1 text-sm font-medium">Tags (comma separated)</label>
//                                     <input
//                                         type="text"
//                                         value={formData.tags.join(', ')}
//                                         onChange={(e) => handleArrayInput('tags', e.target.value)}
//                                         placeholder="vedic astrology, vastu shastra, career guidance"
//                                         className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                     />
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-300 mb-1 text-sm font-medium">Blog Image</label>
//                                     <div className="flex items-center gap-4">
//                                         {imagePreview && (
//                                             <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-gray-700" />
//                                         )}
//                                         <label className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 transition flex items-center gap-2">
//                                             <Upload className="w-4 h-4" />
//                                             {imagePreview ? 'Change' : 'Upload'}
//                                             <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
//                                         </label>
//                                     </div>
//                                     <ImageSizeHint type="blog" />
//                                 </div>

//                                 <div className="flex gap-6">
//                                     <label className="flex items-center gap-2 cursor-pointer">
//                                         <input
//                                             type="checkbox"
//                                             name="isPublished"
//                                             checked={formData.isPublished}
//                                             onChange={handleInputChange}
//                                             className="w-4 h-4 accent-[#00B7B3]"
//                                         />
//                                         <span className="text-gray-300">Publish</span>
//                                     </label>
//                                     <label className="flex items-center gap-2 cursor-pointer">
//                                         <input
//                                             type="checkbox"
//                                             name="isFeatured"
//                                             checked={formData.isFeatured}
//                                             onChange={handleInputChange}
//                                             className="w-4 h-4 accent-[#00B7B3]"
//                                         />
//                                         <span className="text-gray-300">⭐ Featured</span>
//                                     </label>
//                                 </div>
//                             </div>
//                         )}

//                         {/* CONTENT TAB */}
//                         {formTab === 'content' && (
//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-gray-300 mb-2 text-sm font-medium">Blog Content *</label>
//                                     <TinyMCEEditor
//                                         value={formData.content}
//                                         onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
//                                         placeholder="Write your blog content here..."
//                                         minHeight={500}
//                                     />
//                                 </div>
//                             </div>
//                         )}

//                         {/* AI OVERVIEW TAB */}
//                         {formTab === 'ai' && (
//                             <div className="space-y-4">
//                                 <div className="bg-[#00B7B3]/5 border border-[#00B7B3]/30 rounded-lg p-4">
//                                     <h3 className="text-[#00B7B3] font-semibold mb-2">🤖 AI Overview (Google AI Overviews)</h3>
//                                     <p className="text-gray-400 text-sm mb-3">
//                                         This summary helps Google understand your blog for AI Overviews. Keep it concise (40-80 words).
//                                     </p>
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-300 mb-1 text-sm font-medium">AI Overview Summary</label>
//                                     <textarea
//                                         value={formData.aiOverview}
//                                         onChange={(e) => setFormData(prev => ({ ...prev, aiOverview: e.target.value }))}
//                                         placeholder="Write a concise summary of your blog (40-80 words) for Google AI Overviews..."
//                                         rows="3"
//                                         maxLength="200"
//                                         className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                     />
//                                     <p className="text-right text-xs text-gray-500 mt-1">{formData.aiOverview.length}/200</p>
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-300 mb-1 text-sm font-medium">Quick Summary</label>
//                                     <textarea
//                                         value={formData.quickSummaryDescription || ''}
//                                         onChange={(e) => setFormData(prev => ({ ...prev, quickSummaryDescription: e.target.value }))}
//                                         placeholder="Write a quick summary of your blog (2-3 sentences) for readers..."
//                                         rows="3"
//                                         maxLength="300"
//                                         className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                     />
//                                     <p className="text-right text-xs text-gray-500 mt-1">{formData.quickSummaryDescription?.length || 0}/300</p>
//                                 </div>

//                                 <div>
//                                     <label className="block text-gray-300 mb-2 text-sm font-medium">Key Takeaways (Bullet Points)</label>
//                                     <div className="flex gap-2 mb-3">
//                                         <input
//                                             type="text"
//                                             value={newQuickSummary}
//                                             onChange={(e) => setNewQuickSummary(e.target.value)}
//                                             placeholder="Add key takeaway point..."
//                                             className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                             onKeyPress={(e) => {
//                                                 if (e.key === 'Enter') {
//                                                     e.preventDefault();
//                                                     addQuickSummary();
//                                                 }
//                                             }}
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={addQuickSummary}
//                                             className="px-4 py-2 bg-[#00B7B3] text-black rounded-lg hover:bg-[#33C5C2] transition"
//                                         >
//                                             <Plus className="w-4 h-4" />
//                                         </button>
//                                     </div>
//                                     <div className="space-y-1">
//                                         {formData.quickSummary.map((point, idx) => (
//                                             <div key={idx} className="flex items-center justify-between bg-gray-800/50 px-3 py-2 rounded">
//                                                 <span className="text-gray-300 text-sm">• {point}</span>
//                                                 <button
//                                                     type="button"
//                                                     onClick={() => removeQuickSummary(idx)}
//                                                     className="text-red-400 text-sm hover:text-red-300"
//                                                 >
//                                                     ✕
//                                                 </button>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* FAQ TAB */}
//                         {formTab === 'faq' && (
//                             <div className="space-y-4">
//                                 <div className="bg-[#00B7B3]/5 border border-[#00B7B3]/30 rounded-lg p-4">
//                                     <h3 className="text-[#00B7B3] font-semibold mb-2">❓ Frequently Asked Questions</h3>
//                                     <p className="text-gray-400 text-sm">
//                                         Add FAQs to improve search visibility and answer common questions.
//                                     </p>
//                                 </div>

//                                 <div className="border border-gray-700 rounded-lg p-4">
//                                     <div className="space-y-3 mb-4">
//                                         <input
//                                             type="text"
//                                             value={newFaq.question}
//                                             onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
//                                             placeholder="Question"
//                                             className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                         />
//                                         <textarea
//                                             value={newFaq.answer}
//                                             onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
//                                             placeholder="Answer"
//                                             rows="2"
//                                             className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                         />
//                                         <button
//                                             type="button"
//                                             onClick={addFaq}
//                                             className="w-full px-4 py-2 bg-[#00B7B3] text-black rounded-lg hover:bg-[#33C5C2] transition"
//                                         >
//                                             + Add FAQ
//                                         </button>
//                                     </div>
//                                     <div className="space-y-2">
//                                         {formData.faqs.map((faq, idx) => (
//                                             <div key={idx} className="bg-gray-800 px-3 py-2 rounded">
//                                                 <div className="flex justify-between">
//                                                     <p className="text-white text-sm font-medium">❓ {faq.question}</p>
//                                                     <button
//                                                         type="button"
//                                                         onClick={() => removeFaq(idx)}
//                                                         className="text-red-400 text-sm hover:text-red-300"
//                                                     >
//                                                         ✕
//                                                     </button>
//                                                 </div>
//                                                 <p className="text-gray-400 text-sm mt-1">{faq.answer}</p>
//                                             </div>
//                                         ))}
//                                     </div>
//                                 </div>
//                             </div>
//                         )}

//                         {/* SEO TAB */}
//                         {formTab === 'seo' && (
//                             <div className="space-y-4">
//                                 <div>
//                                     <label className="block text-gray-300 mb-1 text-sm font-medium">SEO Title</label>
//                                     <input
//                                         type="text"
//                                         name="seoTitle"
//                                         value={formData.seoTitle}
//                                         onChange={handleInputChange}
//                                         maxLength="70"
//                                         className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                         placeholder="SEO optimized title"
//                                     />
//                                     <p className="text-right text-xs text-gray-500 mt-1">{formData.seoTitle.length}/70</p>
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-300 mb-1 text-sm font-medium">SEO Description</label>
//                                     <textarea
//                                         name="seoDescription"
//                                         value={formData.seoDescription}
//                                         onChange={handleInputChange}
//                                         maxLength="160"
//                                         rows="2"
//                                         className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                         placeholder="Meta description for search results"
//                                     />
//                                     <p className="text-right text-xs text-gray-500 mt-1">{formData.seoDescription.length}/160</p>
//                                 </div>
//                                 <div>
//                                     <label className="block text-gray-300 mb-1 text-sm font-medium">SEO Keywords</label>
//                                     <input
//                                         type="text"
//                                         name="seoKeywords"
//                                         value={formData.seoKeywords}
//                                         onChange={handleInputChange}
//                                         className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                         placeholder="keyword1, keyword2, keyword3"
//                                     />
//                                 </div>
//                             </div>
//                         )}

//                         {/* Form Buttons */}
//                         <div className="flex gap-3 pt-6 mt-6 border-t border-gray-800">
//                             <button
//                                 type="submit"
//                                 disabled={saving}
//                                 className="flex-1 bg-[#00B7B3] text-black py-2 rounded-lg font-semibold hover:bg-[#33C5C2] transition disabled:opacity-50 flex items-center justify-center gap-2"
//                             >
//                                 {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                                 {saving ? 'Saving...' : (editingId ? 'Update Blog' : 'Create Blog')}
//                             </button>
//                             <button
//                                 type="button"
//                                 onClick={resetForm}
//                                 className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
//                             >
//                                 Cancel
//                             </button>
//                         </div>
//                     </form>
//                 </div>
//             )}

//             {/* Delete Modal */}
//             {showDeleteModal && selectedBlog && (
//                 <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
//                     <div className="bg-gray-900 rounded-2xl max-w-md w-full p-6 border border-gray-800">
//                         <h3 className="text-xl font-bold text-white mb-2">Delete Blog</h3>
//                         <p className="text-gray-400 mb-6">
//                             Are you sure you want to delete <span className="text-[#00B7B3]">{selectedBlog.title}</span>?
//                             This action cannot be undone.
//                         </p>
//                         <div className="flex gap-3">
//                             <button
//                                 onClick={() => setShowDeleteModal(false)}
//                                 className="flex-1 px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition"
//                             >
//                                 Cancel
//                             </button>
//                             <button
//                                 onClick={handleDelete}
//                                 className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default BlogManager;



import React, { useState, useEffect, useCallback } from 'react';
import TinyMCEEditor from '../components/Common/TinyMCEEditor';
import ImageSizeHint from '../components/Common/ImageSizeHint';
import { 
    Plus, Edit, Trash2, Eye, EyeOff, Search, Loader2, 
    X, Save, ArrowLeft, Upload, RefreshCw, Calendar,
    Tag, FolderOpen, FileText, Star, Check
} from 'lucide-react';
import Link from 'next/link';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

const BlogManager = () => {
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [saving, setSaving] = useState(false);
    const [activeTab, setActiveTab] = useState('list');
    const [editingId, setEditingId] = useState(null);
    const [search, setSearch] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [formTab, setFormTab] = useState('basic');
    const [useManualSlug, setUseManualSlug] = useState(false);
    const [generatedSlug, setGeneratedSlug] = useState('');
    const [newFaq, setNewFaq] = useState({ question: '', answer: '' });
    const [newQuickSummary, setNewQuickSummary] = useState('');

    const [formData, setFormData] = useState({
        title: '',
        slug: '',
        useManualSlug: false,
        excerpt: '',
        content: '',
        aiOverview: '',
        quickSummaryDescription: '',
        quickSummary: [],
        faqs: [],
        image: '',
        category: '', // ✅ NEW: Single category dropdown
        categories: [], // ✅ Backward compatibility
        tags: [],
        isPublished: true,
        isFeatured: false,
        seoTitle: '',
        seoDescription: '',
        seoKeywords: ''
    });

    const fetchBlogs = useCallback(async () => {
        setLoading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_BASE_URL}/api/blog/admin/all`, {
                headers: token ? { Authorization: `Bearer ${token}` } : {}
            });
            const data = await response.json();
            if (data.success) {
                setBlogs(data.data);
            }
        } catch (error) {
            console.error('Error fetching blogs:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchBlogs();
    }, [fetchBlogs]);

    // Auto-generate slug from title
    useEffect(() => {
        if (formData.title && !useManualSlug) {
            const slug = formData.title
                .toLowerCase()
                .replace(/[^a-z0-9]+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
            setGeneratedSlug(slug);
            setFormData(prev => ({ ...prev, slug }));
        }
    }, [formData.title, useManualSlug]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleArrayInput = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value.split(',').map(item => item.trim()).filter(Boolean)
        }));
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (file.size > 2 * 1024 * 1024) {
            alert('Image size should be less than 2MB');
            e.target.value = '';
            return;
        }

        setImageFile(file);
        setImagePreview(URL.createObjectURL(file));

        const formDataImage = new FormData();
        formDataImage.append('file', file);
        
        const oldImagePath = formData.image || '';
        if (oldImagePath) {
            formDataImage.append('oldImagePath', oldImagePath);
        }
        
        formDataImage.append('field', 'blog');
        formDataImage.append('folder', 'blogs');

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
                if (data.oldImageDeleted) {
                    alert('✅ Image uploaded! Old image deleted.');
                }
            }
        } catch (error) {
            console.error('Upload error:', error);
        }
    };

    const addFaq = () => {
        if (newFaq.question.trim() && newFaq.answer.trim()) {
            setFormData(prev => ({
                ...prev,
                faqs: [...prev.faqs, { ...newFaq }]
            }));
            setNewFaq({ question: '', answer: '' });
        }
    };

    const removeFaq = (index) => {
        setFormData(prev => ({
            ...prev,
            faqs: prev.faqs.filter((_, i) => i !== index)
        }));
    };

    const addQuickSummary = () => {
        if (newQuickSummary.trim()) {
            setFormData(prev => ({
                ...prev,
                quickSummary: [...prev.quickSummary, newQuickSummary.trim()]
            }));
            setNewQuickSummary('');
        }
    };

    const removeQuickSummary = (index) => {
        setFormData(prev => ({
            ...prev,
            quickSummary: prev.quickSummary.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);

        try {
            const submitData = { ...formData };
            
            // Process categories
            if (typeof submitData.categories === 'string') {
                submitData.categories = submitData.categories.split(',').map(item => item.trim()).filter(Boolean);
            } else if (!Array.isArray(submitData.categories)) {
                submitData.categories = [];
            }
            
            // Process tags
            if (typeof submitData.tags === 'string') {
                submitData.tags = submitData.tags.split(',').map(item => item.trim()).filter(Boolean);
            } else if (!Array.isArray(submitData.tags)) {
                submitData.tags = [];
            }

            // Ensure quickSummary is array
            if (!Array.isArray(submitData.quickSummary)) {
                submitData.quickSummary = [];
            }

            // Ensure faqs is array
            if (!Array.isArray(submitData.faqs)) {
                submitData.faqs = [];
            }

            // ✅ Add category to categories array if selected
            if (submitData.category) {
                if (!submitData.categories.includes(submitData.category)) {
                    submitData.categories = [submitData.category, ...submitData.categories];
                }
            }

            const token = localStorage.getItem('adminToken');
            if (!token) {
                alert('❌ Please login first');
                setSaving(false);
                return;
            }

            const url = editingId 
                ? `${API_BASE_URL}/api/blog/${editingId}`
                : `${API_BASE_URL}/api/blog`;
            
            console.log('📤 [BLOG] Submitting to:', url);
            console.log('📤 [BLOG] Data:', JSON.stringify(submitData, null, 2));

            const response = await fetch(url, {
                method: editingId ? 'PUT' : 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(submitData)
            });

            console.log('📥 [BLOG] Response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                console.error('❌ [BLOG] Error response:', errorText);
                try {
                    const errorData = JSON.parse(errorText);
                    throw new Error(errorData.message || 'Failed to save');
                } catch (e) {
                    throw new Error(`Server error: ${response.status}`);
                }
            }

            const data = await response.json();
            console.log('📥 [BLOG] Response data:', data);

            if (data.success) {
                alert(editingId ? '✅ Blog updated!' : '✅ Blog created!');
                resetForm();
                await fetchBlogs();
                setActiveTab('list');
            } else {
                alert('❌ ' + (data.message || 'Failed to save'));
            }
        } catch (error) {
            console.error('❌ [BLOG] Submit error:', error);
            alert('❌ Failed to save blog: ' + error.message);
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!selectedBlog) return;
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_BASE_URL}/api/blog/${selectedBlog._id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                alert('✅ Blog deleted!');
                setShowDeleteModal(false);
                setSelectedBlog(null);
                fetchBlogs();
            }
        } catch (error) {
            console.error('Delete error:', error);
            alert('❌ Failed to delete blog');
        }
    };

    const handleEdit = (blog) => {
        setEditingId(blog._id);
        setFormData({
            title: blog.title || '',
            slug: blog.slug || '',
            useManualSlug: blog.useManualSlug || false,
            excerpt: blog.excerpt || '',
            content: blog.content || '',
            aiOverview: blog.aiOverview || '',
            quickSummaryDescription: blog.quickSummaryDescription || '',
            quickSummary: blog.quickSummary || [],
            faqs: blog.faqs || [],
            image: blog.image || '',
            category: blog.category || blog.categories?.[0] || '', // ✅ Get category
            categories: blog.categories || [],
            tags: blog.tags || [],
            isPublished: blog.isPublished !== undefined ? blog.isPublished : true,
            isFeatured: blog.isFeatured || false,
            seoTitle: blog.seoTitle || '',
            seoDescription: blog.seoDescription || '',
            seoKeywords: blog.seoKeywords || ''
        });
        setUseManualSlug(blog.useManualSlug || false);
        setImagePreview(blog.image ? `${API_BASE_URL}${blog.image}` : '');
        setImageFile(null);
        setFormTab('basic');
        setActiveTab('edit');
    };

    const resetForm = () => {
        setEditingId(null);
        setFormData({
            title: '',
            slug: '',
            useManualSlug: false,
            excerpt: '',
            content: '',
            aiOverview: '',
            quickSummaryDescription: '',
            quickSummary: [],
            faqs: [],
            image: '',
            category: '',
            categories: [],
            tags: [],
            isPublished: true,
            isFeatured: false,
            seoTitle: '',
            seoDescription: '',
            seoKeywords: ''
        });
        setImageFile(null);
        setImagePreview('');
        setUseManualSlug(false);
        setGeneratedSlug('');
        setNewFaq({ question: '', answer: '' });
        setNewQuickSummary('');
        setFormTab('basic');
        setActiveTab('list');
    };

    const togglePublish = async (id) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_BASE_URL}/api/blog/${id}/toggle-publish`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                fetchBlogs();
            }
        } catch (error) {
            console.error('Toggle publish error:', error);
        }
    };

    const toggleFeatured = async (id) => {
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch(`${API_BASE_URL}/api/blog/${id}/toggle-featured`, {
                method: 'PATCH',
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const data = await response.json();
            if (data.success) {
                fetchBlogs();
            }
        } catch (error) {
            console.error('Toggle featured error:', error);
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

    const filteredBlogs = blogs.filter(blog =>
        blog.title?.toLowerCase().includes(search.toLowerCase()) ||
        blog.excerpt?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="min-h-screen bg-black p-6">
            {/* Header */}
            <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <FileText className="w-6 h-6 text-[#00B7B3]" />
                        Blog Management
                    </h1>
                    <p className="text-gray-500 text-sm">
                        {blogs.length} blogs • {blogs.filter(b => b.isPublished).length} published
                    </p>
                </div>
                {activeTab === 'list' && (
                    <button
                        onClick={() => { resetForm(); setActiveTab('add'); }}
                        className="bg-[#00B7B3] text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-[#33C5C2] transition"
                    >
                        <Plus size={20} />
                        New Blog
                    </button>
                )}
                {activeTab !== 'list' && (
                    <button
                        onClick={() => { resetForm(); setActiveTab('list'); }}
                        className="border border-gray-600 text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-800 transition flex items-center gap-2"
                    >
                        <ArrowLeft size={20} />
                        Back to List
                    </button>
                )}
            </div>

            {/* LIST TAB */}
            {activeTab === 'list' && (
                <>
                    {/* Search */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <div className="flex-1 min-w-[200px] relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="text"
                                placeholder="Search blogs..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#00B7B3] outline-none"
                            />
                        </div>
                        <button
                            onClick={fetchBlogs}
                            className="p-2 bg-gray-800 text-gray-400 rounded-lg hover:bg-gray-700 transition"
                        >
                            <RefreshCw className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Blog List */}
                    {loading ? (
                        <div className="flex items-center justify-center py-12">
                            <Loader2 className="w-8 h-8 text-[#00B7B3] animate-spin" />
                        </div>
                    ) : filteredBlogs.length === 0 ? (
                        <div className="text-center py-12 bg-gray-900/50 rounded-xl border border-gray-800">
                            <FileText className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                            <p className="text-gray-400">No blogs found</p>
                            <button
                                onClick={() => { resetForm(); setActiveTab('add'); }}
                                className="text-[#00B7B3] hover:underline text-sm mt-2 inline-block"
                            >
                                Create your first blog
                            </button>
                        </div>
                    ) : (
                        <div className="bg-gray-900 rounded-xl border border-gray-800 overflow-hidden">
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-800/50 border-b border-gray-700">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Blog</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Views</th>
                                            <th className="px-4 py-3 text-left text-xs font-medium text-gray-400 uppercase">Date</th>
                                            <th className="px-4 py-3 text-right text-xs font-medium text-gray-400 uppercase">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-800">
                                        {filteredBlogs.map((blog) => (
                                            <tr key={blog._id} className="hover:bg-gray-800/50 transition">
                                                <td className="px-4 py-4">
                                                    <div className="flex items-center gap-3">
                                                        {blog.image && (
                                                            <img
                                                                src={`${API_BASE_URL}${blog.image}`}
                                                                alt={blog.title}
                                                                className="w-12 h-12 rounded-lg object-cover"
                                                                onError={(e) => { e.target.style.display = 'none'; }}
                                                            />
                                                        )}
                                                        <div>
                                                            <p className="text-white font-medium line-clamp-1">{blog.title}</p>
                                                            <p className="text-gray-500 text-xs line-clamp-1">{blog.excerpt}</p>
                                                            {blog.category && (
                                                                <span className="text-[#00B7B3] text-xs">{blog.category}</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4">
                                                    <div className="flex flex-col gap-1">
                                                        <button
                                                            onClick={() => togglePublish(blog._id)}
                                                            className={`px-2 py-1 rounded text-xs flex items-center gap-1 ${
                                                                blog.isPublished 
                                                                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                                                                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                                                            }`}
                                                        >
                                                            {blog.isPublished ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                                            {blog.isPublished ? 'Published' : 'Draft'}
                                                        </button>
                                                        {blog.isFeatured && (
                                                            <span className="text-yellow-400 text-xs flex items-center gap-1">
                                                                <Star className="w-3 h-3" /> Featured
                                                            </span>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="px-4 py-4 text-gray-400 text-sm">{blog.views || 0}</td>
                                                <td className="px-4 py-4 text-gray-400 text-sm">
                                                    {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-IN')}
                                                </td>
                                                <td className="px-4 py-4 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button
                                                            onClick={() => toggleFeatured(blog._id)}
                                                            className={`p-2 rounded-lg transition ${
                                                                blog.isFeatured 
                                                                    ? 'bg-yellow-500/20 text-yellow-400 hover:bg-yellow-500/30' 
                                                                    : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                                                            }`}
                                                            title="Toggle Featured"
                                                        >
                                                            <Star className="w-4 h-4" />
                                                        </button>
                                                        <Link
                                                            href={`/blog/${blog.slug}`}
                                                            target="_blank"
                                                            className="p-2 rounded-lg bg-blue-500/10 text-blue-400 hover:bg-blue-500/20 transition"
                                                            title="View"
                                                        >
                                                            <Eye className="w-4 h-4" />
                                                        </Link>
                                                        <button
                                                            onClick={() => handleEdit(blog)}
                                                            className="p-2 rounded-lg bg-[#00B7B3]/10 text-[#00B7B3] hover:bg-[#00B7B3]/20 transition"
                                                            title="Edit"
                                                        >
                                                            <Edit className="w-4 h-4" />
                                                        </button>
                                                        <button
                                                            onClick={() => {
                                                                setSelectedBlog(blog);
                                                                setShowDeleteModal(true);
                                                            }}
                                                            className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition"
                                                            title="Delete"
                                                        >
                                                            <Trash2 className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* ADD/EDIT FORM */}
            {(activeTab === 'add' || activeTab === 'edit') && (
                <div className="bg-gray-900 rounded-xl border border-gray-800">
                    {/* Form Tabs */}
                    <div className="flex border-b border-gray-800 overflow-x-auto">
                        {['basic', 'content', 'ai', 'faq', 'seo'].map((tab) => (
                            <TabButton
                                key={tab}
                                id={tab}
                                label={
                                    tab === 'basic' ? '📋 Basic' :
                                    tab === 'content' ? '✏️ Content' :
                                    tab === 'ai' ? '🤖 AI Overview' :
                                    tab === 'faq' ? '❓ FAQs' :
                                    '🔍 SEO'
                                }
                                active={formTab}
                                onClick={setFormTab}
                            />
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="p-6">
                        {/* BASIC TAB */}
                        {formTab === 'basic' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 mb-1 text-sm font-medium">Title *</label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        required
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-1 text-sm font-medium">Slug</label>
                                    <div className="flex gap-2 mb-2">
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setUseManualSlug(false);
                                                setFormData(prev => ({ ...prev, useManualSlug: false }));
                                            }}
                                            className={`px-3 py-1 rounded text-sm ${!useManualSlug ? 'bg-[#00B7B3] text-black' : 'bg-gray-700 text-gray-300'}`}
                                        >
                                            Auto
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => {
                                                setUseManualSlug(true);
                                                setFormData(prev => ({ ...prev, useManualSlug: true }));
                                            }}
                                            className={`px-3 py-1 rounded text-sm ${useManualSlug ? 'bg-[#00B7B3] text-black' : 'bg-gray-700 text-gray-300'}`}
                                        >
                                            Manual
                                        </button>
                                    </div>
                                    {useManualSlug ? (
                                        <input
                                            type="text"
                                            value={formData.slug}
                                            onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '-') }))}
                                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                            placeholder="enter-custom-slug"
                                        />
                                    ) : (
                                        <input
                                            type="text"
                                            value={generatedSlug}
                                            readOnly
                                            className="w-full px-4 py-2 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
                                        />
                                    )}
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-1 text-sm font-medium">Excerpt (160 chars) *</label>
                                    <textarea
                                        name="excerpt"
                                        value={formData.excerpt}
                                        onChange={handleInputChange}
                                        required
                                        maxLength="160"
                                        rows="2"
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                    />
                                    <p className="text-right text-xs text-gray-500 mt-1">{formData.excerpt.length}/160</p>
                                </div>

                                {/* ✅ CATEGORY DROPDOWN */}
                                <div>
                                    <label className="block text-gray-300 mb-1 text-sm font-medium">Category *</label>
                                    <select
                                        value={formData.category || ''}
                                        onChange={(e) => setFormData(prev => ({ ...prev, category: e.target.value }))}
                                        required
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Astrology Consultation">🔮 Astrology Consultation</option>
                                        <option value="Vastu Consultation">🏠 Vastu Consultation</option>
                                        <option value="Astrology Course">📚 Astrology Course</option>
                                        <option value="Vastu Course">📚 Vastu Course</option>
                                       
                                    </select>
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-1 text-sm font-medium">Categories (comma separated)</label>
                                    <input
                                        type="text"
                                        value={formData.categories.join(', ')}
                                        onChange={(e) => handleArrayInput('categories', e.target.value)}
                                        placeholder="Astrology, Vastu, Career"
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-1 text-sm font-medium">Tags (comma separated)</label>
                                    <input
                                        type="text"
                                        value={formData.tags.join(', ')}
                                        onChange={(e) => handleArrayInput('tags', e.target.value)}
                                        placeholder="vedic astrology, vastu shastra, career guidance"
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                    />
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-1 text-sm font-medium">Blog Image</label>
                                    <div className="flex items-center gap-4">
                                        {imagePreview && (
                                            <img src={imagePreview} alt="Preview" className="w-20 h-20 object-cover rounded-lg border border-gray-700" />
                                        )}
                                        <label className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg cursor-pointer hover:bg-gray-700 transition flex items-center gap-2">
                                            <Upload className="w-4 h-4" />
                                            {imagePreview ? 'Change' : 'Upload'}
                                            <input type="file" accept="image/*" onChange={handleImageChange} className="hidden" />
                                        </label>
                                    </div>
                                    <ImageSizeHint type="blog" />
                                </div>

                                <div className="flex gap-6">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="isPublished"
                                            checked={formData.isPublished}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 accent-[#00B7B3]"
                                        />
                                        <span className="text-gray-300">Publish</span>
                                    </label>
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            name="isFeatured"
                                            checked={formData.isFeatured}
                                            onChange={handleInputChange}
                                            className="w-4 h-4 accent-[#00B7B3]"
                                        />
                                        <span className="text-gray-300">⭐ Featured</span>
                                    </label>
                                </div>
                            </div>
                        )}

                        {/* CONTENT TAB */}
                        {formTab === 'content' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 mb-2 text-sm font-medium">Blog Content *</label>
                                    <TinyMCEEditor
                                        value={formData.content}
                                        onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
                                        placeholder="Write your blog content here..."
                                        minHeight={500}
                                    />
                                </div>
                            </div>
                        )}

                        {/* AI OVERVIEW TAB */}
                        {formTab === 'ai' && (
                            <div className="space-y-4">
                                <div className="bg-[#00B7B3]/5 border border-[#00B7B3]/30 rounded-lg p-4">
                                    <h3 className="text-[#00B7B3] font-semibold mb-2">🤖 AI Overview (Google AI Overviews)</h3>
                                    <p className="text-gray-400 text-sm mb-3">
                                        This summary helps Google understand your blog for AI Overviews. Keep it concise (40-80 words).
                                    </p>
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-1 text-sm font-medium">AI Overview Summary</label>
                                    <textarea
                                        value={formData.aiOverview}
                                        onChange={(e) => setFormData(prev => ({ ...prev, aiOverview: e.target.value }))}
                                        placeholder="Write a concise summary of your blog (40-80 words) for Google AI Overviews..."
                                        rows="3"
                                        maxLength="200"
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                    />
                                    <p className="text-right text-xs text-gray-500 mt-1">{formData.aiOverview.length}/200</p>
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-1 text-sm font-medium">Quick Summary</label>
                                    <textarea
                                        value={formData.quickSummaryDescription || ''}
                                        onChange={(e) => setFormData(prev => ({ ...prev, quickSummaryDescription: e.target.value }))}
                                        placeholder="Write a quick summary of your blog (2-3 sentences) for readers..."
                                        rows="3"
                                        maxLength="300"
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                    />
                                    <p className="text-right text-xs text-gray-500 mt-1">{formData.quickSummaryDescription?.length || 0}/300</p>
                                </div>

                                <div>
                                    <label className="block text-gray-300 mb-2 text-sm font-medium">Key Takeaways (Bullet Points)</label>
                                    <div className="flex gap-2 mb-3">
                                        <input
                                            type="text"
                                            value={newQuickSummary}
                                            onChange={(e) => setNewQuickSummary(e.target.value)}
                                            placeholder="Add key takeaway point..."
                                            className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                            onKeyPress={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault();
                                                    addQuickSummary();
                                                }
                                            }}
                                        />
                                        <button
                                            type="button"
                                            onClick={addQuickSummary}
                                            className="px-4 py-2 bg-[#00B7B3] text-black rounded-lg hover:bg-[#33C5C2] transition"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="space-y-1">
                                        {formData.quickSummary.map((point, idx) => (
                                            <div key={idx} className="flex items-center justify-between bg-gray-800/50 px-3 py-2 rounded">
                                                <span className="text-gray-300 text-sm">• {point}</span>
                                                <button
                                                    type="button"
                                                    onClick={() => removeQuickSummary(idx)}
                                                    className="text-red-400 text-sm hover:text-red-300"
                                                >
                                                    ✕
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* FAQ TAB */}
                        {formTab === 'faq' && (
                            <div className="space-y-4">
                                <div className="bg-[#00B7B3]/5 border border-[#00B7B3]/30 rounded-lg p-4">
                                    <h3 className="text-[#00B7B3] font-semibold mb-2">❓ Frequently Asked Questions</h3>
                                    <p className="text-gray-400 text-sm">
                                        Add FAQs to improve search visibility and answer common questions.
                                    </p>
                                </div>

                                <div className="border border-gray-700 rounded-lg p-4">
                                    <div className="space-y-3 mb-4">
                                        <input
                                            type="text"
                                            value={newFaq.question}
                                            onChange={(e) => setNewFaq({ ...newFaq, question: e.target.value })}
                                            placeholder="Question"
                                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        />
                                        <textarea
                                            value={newFaq.answer}
                                            onChange={(e) => setNewFaq({ ...newFaq, answer: e.target.value })}
                                            placeholder="Answer"
                                            rows="2"
                                            className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        />
                                        <button
                                            type="button"
                                            onClick={addFaq}
                                            className="w-full px-4 py-2 bg-[#00B7B3] text-black rounded-lg hover:bg-[#33C5C2] transition"
                                        >
                                            + Add FAQ
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        {formData.faqs.map((faq, idx) => (
                                            <div key={idx} className="bg-gray-800 px-3 py-2 rounded">
                                                <div className="flex justify-between">
                                                    <p className="text-white text-sm font-medium">❓ {faq.question}</p>
                                                    <button
                                                        type="button"
                                                        onClick={() => removeFaq(idx)}
                                                        className="text-red-400 text-sm hover:text-red-300"
                                                    >
                                                        ✕
                                                    </button>
                                                </div>
                                                <p className="text-gray-400 text-sm mt-1">{faq.answer}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* SEO TAB */}
                        {formTab === 'seo' && (
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-gray-300 mb-1 text-sm font-medium">SEO Title</label>
                                    <input
                                        type="text"
                                        name="seoTitle"
                                        value={formData.seoTitle}
                                        onChange={handleInputChange}
                                        maxLength="70"
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="SEO optimized title"
                                    />
                                    <p className="text-right text-xs text-gray-500 mt-1">{formData.seoTitle.length}/70</p>
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-1 text-sm font-medium">SEO Description</label>
                                    <textarea
                                        name="seoDescription"
                                        value={formData.seoDescription}
                                        onChange={handleInputChange}
                                        maxLength="160"
                                        rows="2"
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="Meta description for search results"
                                    />
                                    <p className="text-right text-xs text-gray-500 mt-1">{formData.seoDescription.length}/160</p>
                                </div>
                                <div>
                                    <label className="block text-gray-300 mb-1 text-sm font-medium">SEO Keywords</label>
                                    <input
                                        type="text"
                                        name="seoKeywords"
                                        value={formData.seoKeywords}
                                        onChange={handleInputChange}
                                        className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                        placeholder="keyword1, keyword2, keyword3"
                                    />
                                </div>
                            </div>
                        )}

                        {/* Form Buttons */}
                        <div className="flex gap-3 pt-6 mt-6 border-t border-gray-800">
                            <button
                                type="submit"
                                disabled={saving}
                                className="flex-1 bg-[#00B7B3] text-black py-2 rounded-lg font-semibold hover:bg-[#33C5C2] transition disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {saving ? 'Saving...' : (editingId ? 'Update Blog' : 'Create Blog')}
                            </button>
                            <button
                                type="button"
                                onClick={resetForm}
                                className="px-6 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                            >
                                Cancel
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Delete Modal */}
            {showDeleteModal && selectedBlog && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-900 rounded-2xl max-w-md w-full p-6 border border-gray-800">
                        <h3 className="text-xl font-bold text-white mb-2">Delete Blog</h3>
                        <p className="text-gray-400 mb-6">
                            Are you sure you want to delete <span className="text-[#00B7B3]">{selectedBlog.title}</span>?
                            This action cannot be undone.
                        </p>
                        <div className="flex gap-3">
                            <button
                                onClick={() => setShowDeleteModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-800 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default BlogManager;