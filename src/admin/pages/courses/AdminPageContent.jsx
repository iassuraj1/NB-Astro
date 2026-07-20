


// // admin/pages/courses/AdminPageContent.jsx
// import React, { useState, useEffect, useCallback } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { Loader2, Save, ArrowLeft, Plus, Trash2 } from 'lucide-react';
// import { pageContentAPI } from '../../services/api';
// import TinyMCEEditor from '../../components/Common/TinyMCEEditor';

// // ✅ Custom colors for Quill editor
// // ✅ Quill Editor Styles
// const quillStyles = `
//   .dark-quill {
//     background: #000000;
//     border-radius: 12px;
//   }
  
//   .dark-quill .ql-toolbar {
//     background: #0a0a0f;
//     border-color: #00B7B3;
//     border-radius: 12px 12px 0 0;
//     border-bottom: 1px solid #00B7B3;
//     padding: 8px;
//   }
  
//   .dark-quill .ql-toolbar button {
//     color: #e0e0e0;
//   }
  
//   .dark-quill .ql-toolbar button:hover {
//     color: #00B7B3;
//   }
  
//   .dark-quill .ql-toolbar .ql-active {
//     color: #00B7B3;
//   }
  
//   .dark-quill .ql-container {
//     background: #000000;
//     border-color: #00B7B3;
//     border-radius: 0 0 12px 12px;
//     min-height: 300px;
//     font-size: 15px;
//   }
  
//   .dark-quill .ql-editor {
//     color: #ffffff !important;
//     font-size: 15px;
//     line-height: 1.6;
//     background: #000000 !important;
//   }
  
//   .dark-quill .ql-editor strong {
//     font-weight: bold !important;
//   }
  
//   .dark-quill .ql-editor em {
//     font-style: italic !important;
//   }
  
//   .dark-quill .ql-editor u {
//     text-decoration: underline !important;
//   }
  
//   .dark-quill .ql-editor h1 {
//     font-size: 32px !important;
//     font-weight: bold !important;
//     margin: 24px 0 16px 0 !important;
//   }
  
//   .dark-quill .ql-editor h2 {
//     font-size: 28px !important;
//     font-weight: 600 !important;
//     margin: 20px 0 12px 0 !important;
//   }
  
//   .dark-quill .ql-editor h3 {
//     font-size: 24px !important;
//     font-weight: 500 !important;
//     margin: 18px 0 10px 0 !important;
//   }
  
//   .dark-quill .ql-editor h4 {
//     font-size: 20px !important;
//     font-weight: 500 !important;
//   }
  
//   .dark-quill .ql-editor a {
//     text-decoration: underline !important;
//   }
  
//   .dark-quill .ql-editor ul, .dark-quill .ql-editor ol {
//     margin: 12px 0 !important;
//     padding-left: 30px !important;
//   }
  
//   .dark-quill .ql-editor li {
//     margin: 8px 0 !important;
//   }
  
//   .dark-quill .ql-editor blockquote {
//     border-left: 4px solid #00B7B3 !important;
//     background: rgba(0, 183, 179, 0.1) !important;
//     padding: 12px 20px !important;
//     margin: 16px 0 !important;
//     font-style: italic !important;
//   }
  
//   .dark-quill .ql-picker-label {
//     color: #e0e0e0 !important;
//   }
  
//   .dark-quill .ql-picker-options {
//     background: #1a1a2a !important;
//     color: #e0e0e0 !important;
//     border-color: #00B7B3 !important;
//   }
  
//   .dark-quill .ql-picker-item:hover {
//     color: #00B7B3 !important;
//   }
  
//   .dark-quill .ql-color-picker .ql-picker-label svg {
//     filter: brightness(2);
//   }
  
//   .dark-quill .ql-background .ql-picker-label svg {
//     filter: brightness(2);
//   }
  
//   .dark-quill .ql-color-picker .ql-picker-options {
//     width: 180px;
//     display: grid;
//     grid-template-columns: repeat(6, 1fr);
//     gap: 2px;
//     padding: 4px;
//   }
  
//   .dark-quill .ql-color-picker .ql-picker-item {
//     width: 24px !important;
//     height: 24px !important;
//     margin: 0 !important;
//     border-radius: 4px;
//   }
// `;

// // ✅ Custom modules with color palette
// const AdminPageContent = () => {
//     const router = useRouter();
//     const { pageType: paramPageType } = router.query;
//     const pathname = router.asPath?.split('?')[0] || '';
    
//     let pageType = paramPageType;
//     if (!pageType || pageType === 'undefined') {
//         const pathParts = pathname.split('/');
//         pageType = pathParts[pathParts.length - 1];
//     }
    
//     const [loading, setLoading] = useState(true);
//     const [saving, setSaving] = useState(false);
//     const [activeTab, setActiveTab] = useState('hero');
//     const [contentExists, setContentExists] = useState(false);
//     const [content, setContent] = useState({
//         heroTitle: '',
//         heroSubtitle: '',
//         heroDescription: '',
//         heroImage: '',
//         heroBadgeText: '',
//         introTitle: '',
//         introContent: '',
//         whyChooseUsTitle: '',
//         whyChooseUsFeatures: [
//             { icon: '', title: '', description: '' },
//             { icon: '', title: '', description: '' },
//             { icon: '', title: '', description: '' }
//         ],
//         ctaTitle: '',
//         ctaDescription: '',
//         ctaButtonText: '',
//         ctaButtonLink: '/contact',
//         // ✅ SEO Fields
//         seoTitle: '',
//         seoDescription: '',
//         seoKeywords: ''
//     });

//     const fetchContent = useCallback(async () => {
//         setLoading(true);
//         try {
//             const response = await pageContentAPI.getByType(pageType);
            
//             if (response.data && response.data.success && response.data.data) {
//                 const pageData = response.data.data;
//                 setContentExists(true);
//                 setContent({
//                     heroTitle: pageData.heroTitle || '',
//                     heroSubtitle: pageData.heroSubtitle || '',
//                     heroDescription: pageData.heroDescription || '',
//                     heroImage: pageData.heroImage || '',
//                     heroBadgeText: pageData.heroBadgeText || '',
//                     introTitle: pageData.introTitle || '',
//                     introContent: pageData.introContent || '',
//                     whyChooseUsTitle: pageData.whyChooseUsTitle || '',
//                     whyChooseUsFeatures: pageData.whyChooseUsFeatures && pageData.whyChooseUsFeatures.length > 0 
//                         ? pageData.whyChooseUsFeatures 
//                         : [
//                             { icon: '', title: '', description: '' },
//                             { icon: '', title: '', description: '' },
//                             { icon: '', title: '', description: '' }
//                         ],
//                     ctaTitle: pageData.ctaTitle || '',
//                     ctaDescription: pageData.ctaDescription || '',
//                     ctaButtonText: pageData.ctaButtonText || '',
//                     ctaButtonLink: pageData.ctaButtonLink || '/contact',
//                     // ✅ SEO Fields
//                     seoTitle: pageData.seoTitle || '',
//                     seoDescription: pageData.seoDescription || '',
//                     seoKeywords: pageData.seoKeywords || ''
//                 });
//             } else {
//                 setContentExists(false);
//             }
//         } catch (error) {
//             console.error('Error fetching:', error);
//             setContentExists(false);
//         } finally {
//             setLoading(false);
//         }
//     }, [pageType]);

//     useEffect(() => {
//         if (pageType && (pageType === 'astrology' || pageType === 'vastu')) {
//             fetchContent();
//         } else {
//             setLoading(false);
//         }
//     }, [fetchContent, pageType]);

//     const handleSave = async () => {
//         if (!pageType) {
//             alert('Error: Page type is undefined');
//             return;
//         }
        
//         setSaving(true);
//         try {
//             await pageContentAPI.save(pageType, content);
//             alert('Page content saved successfully!');
//             setContentExists(true);
//         } catch (error) {
//             console.error('Save error:', error);
//             alert('Failed to save: ' + (error.response?.data?.message || error.message));
//         } finally {
//             setSaving(false);
//         }
//     };

//     const TabButton = ({ id, label, active, onClick }) => (
//         <button
//             onClick={() => onClick(id)}
//             className={`px-5 py-2.5 rounded-xl transition-all whitespace-nowrap ${
//                 active === id
//                     ? 'bg-[#00B7B3]/20 text-[#00B7B3] border border-[#00B7B3]/50'
//                     : 'text-gray-400 hover:text-white hover:bg-white/5'
//             }`}
//         >
//             {label}
//         </button>
//     );

//     const addFeature = () => {
//         setContent({
//             ...content,
//             whyChooseUsFeatures: [
//                 ...content.whyChooseUsFeatures,
//                 { icon: '', title: '', description: '' }
//             ]
//         });
//     };

//     const removeFeature = (index) => {
//         const newFeatures = content.whyChooseUsFeatures.filter((_, i) => i !== index);
//         setContent({ ...content, whyChooseUsFeatures: newFeatures });
//     };

//     if (loading) {
//         return (
//             <div className="min-h-screen bg-black flex items-center justify-center">
//                 <Loader2 className="w-8 h-8 text-[#00B7B3] animate-spin" />
//             </div>
//         );
//     }

//     const displayType = pageType === 'astrology' ? 'Astrology' : pageType === 'vastu' ? 'Vastu' : 'Page';

//     return (
//         <>
//             <style>{quillStyles}</style>
//             <div className="min-h-screen bg-black">
//                 {/* Header */}
//                 <div className="sticky top-0 z-10 bg-black/90 border-b border-[#00B7B3]/20">
//                     <div className="max-w-7xl mx-auto px-6 py-4">
//                         <div className="flex items-center justify-between">
//                             <div className="flex items-center gap-4">
//                                 <Link href="/admin/dashboard" className="p-2 rounded-lg bg-white/5 hover:bg-white/10">
//                                     <ArrowLeft className="w-5 h-5 text-gray-400" />
//                                 </Link>
//                                 <div>
//                                     <h1 className="text-2xl font-bold text-white">
//                                         {displayType} Page Content
//                                     </h1>
//                                     <p className="text-gray-500 text-sm">
//                                         {contentExists ? 'Edit content' : 'Create new content'}
//                                     </p>
//                                 </div>
//                             </div>
//                             <button
//                                 onClick={handleSave}
//                                 disabled={saving}
//                                 className="px-6 py-2 bg-[#00B7B3] text-black rounded-lg font-semibold hover:bg-[#00B7B3]/80 disabled:opacity-50 flex items-center gap-2"
//                             >
//                                 {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
//                                 {contentExists ? 'Save Changes' : 'Create Content'}
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Tabs */}
//                 <div className="max-w-7xl mx-auto px-6 py-6">
//                     <div className="flex gap-2 border-b border-[#00B7B3]/20 pb-3 overflow-x-auto">
//                         <TabButton id="hero" label="🎯 Hero Section" active={activeTab} onClick={setActiveTab} />
//                         <TabButton id="intro" label="📖 Intro Section" active={activeTab} onClick={setActiveTab} />
//                         <TabButton id="why" label="⭐ Why Choose Us" active={activeTab} onClick={setActiveTab} />
//                         <TabButton id="cta" label="🎬 CTA Section" active={activeTab} onClick={setActiveTab} />
//                         <TabButton id="seo" label="🔍 SEO Section" active={activeTab} onClick={setActiveTab} />
//                     </div>

//                     {/* Hero Tab */}
//                     {activeTab === 'hero' && (
//                         <div className="mt-6 space-y-6">
//                             <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
//                                 <h2 className="text-xl font-bold text-white mb-4">Hero Section</h2>
//                                 <div className="space-y-4">
//                                     <div>
//                                         <label className="block text-sm text-gray-400 mb-2">Hero Title</label>
//                                         <input
//                                             type="text"
//                                             value={content.heroTitle}
//                                             onChange={(e) => setContent({ ...content, heroTitle: e.target.value })}
//                                             className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                             placeholder="e.g., Master the Art of"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm text-gray-400 mb-2">Hero Subtitle</label>
//                                         <input
//                                             type="text"
//                                             value={content.heroSubtitle}
//                                             onChange={(e) => setContent({ ...content, heroSubtitle: e.target.value })}
//                                             className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                             placeholder="e.g., Astrology / Vastu Shastra"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm text-gray-400 mb-2">Hero Badge Text</label>
//                                         <input
//                                             type="text"
//                                             value={content.heroBadgeText}
//                                             onChange={(e) => setContent({ ...content, heroBadgeText: e.target.value })}
//                                             className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                             placeholder="e.g., Ancient Wisdom Meets Modern Science"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm text-gray-400 mb-2">Hero Description</label>
//                                         <textarea
//                                             rows="4"
//                                             value={content.heroDescription}
//                                             onChange={(e) => setContent({ ...content, heroDescription: e.target.value })}
//                                             className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                             placeholder="Enter hero description..."
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm text-gray-400 mb-2">Hero Image URL</label>
//                                         <input
//                                             type="text"
//                                             value={content.heroImage}
//                                             onChange={(e) => setContent({ ...content, heroImage: e.target.value })}
//                                             className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                             placeholder="https://example.com/hero-image.jpg"
//                                         />
//                                         {content.heroImage && (
//                                             <div className="mt-2">
//                                                 <img src={content.heroImage} alt="Hero preview" className="w-32 h-32 object-cover rounded-lg border border-[#00B7B3]/30" />
//                                             </div>
//                                         )}
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Intro Tab */}
//                     {activeTab === 'intro' && (
//                         <div className="mt-6 space-y-6">
//                             <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
//                                 <h2 className="text-xl font-bold text-white mb-4">Intro Section</h2>
//                                 <div className="space-y-4">
//                                     <div>
//                                         <label className="block text-sm text-gray-400 mb-2">Intro Title</label>
//                                         <input
//                                             type="text"
//                                             value={content.introTitle}
//                                             onChange={(e) => setContent({ ...content, introTitle: e.target.value })}
//                                             className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                             placeholder="e.g., The Cosmic Science"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm text-gray-400 mb-2">Intro Content</label>
//                                         <div className="dark-quill">
//                                             <TinyMCEEditor
//                                                 value={content.introContent}
//                                                 onChange={(value) => setContent({ ...content, introContent: value })}
//                                                 placeholder="Write your introduction content here..."
//                                                 minHeight={340}
//                                             />
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* Why Choose Us Tab */}
//                     {activeTab === 'why' && (
//                         <div className="mt-6 space-y-6">
//                             <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
//                                 <h2 className="text-xl font-bold text-white mb-4">Why Choose Us Section</h2>
//                                 <div className="space-y-4">
//                                     <div>
//                                         <label className="block text-sm text-gray-400 mb-2">Section Title</label>
//                                         <input
//                                             type="text"
//                                             value={content.whyChooseUsTitle}
//                                             onChange={(e) => setContent({ ...content, whyChooseUsTitle: e.target.value })}
//                                             className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                             placeholder="Why Choose Our Courses?"
//                                         />
//                                     </div>
                                    
//                                     <div className="flex justify-between items-center">
//                                         <h3 className="text-white font-semibold">Features</h3>
//                                         <button
//                                             onClick={addFeature}
//                                             className="flex items-center gap-1 px-3 py-1 bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg text-sm hover:bg-[#00B7B3]/30"
//                                         >
//                                             <Plus className="w-4 h-4" /> Add Feature
//                                         </button>
//                                     </div>
                                    
//                                     {content.whyChooseUsFeatures.map((feature, idx) => (
//                                         <div key={idx} className="border border-[#00B7B3]/20 rounded-xl p-4 relative">
//                                             {content.whyChooseUsFeatures.length > 1 && (
//                                                 <button
//                                                     onClick={() => removeFeature(idx)}
//                                                     className="absolute top-3 right-3 text-red-400 hover:text-red-300"
//                                                 >
//                                                     <Trash2 className="w-4 h-4" />
//                                                 </button>
//                                             )}
//                                             <h3 className="text-white font-semibold mb-3">Feature {idx + 1}</h3>
//                                             <div className="space-y-3">
//                                                 <input
//                                                     type="text"
//                                                     placeholder="Icon Name (StarIcon, CompassIcon, etc.)"
//                                                     value={feature.icon}
//                                                     onChange={(e) => {
//                                                         const newFeatures = [...content.whyChooseUsFeatures];
//                                                         newFeatures[idx].icon = e.target.value;
//                                                         setContent({ ...content, whyChooseUsFeatures: newFeatures });
//                                                     }}
//                                                     className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                                 />
//                                                 <input
//                                                     type="text"
//                                                     placeholder="Feature Title"
//                                                     value={feature.title}
//                                                     onChange={(e) => {
//                                                         const newFeatures = [...content.whyChooseUsFeatures];
//                                                         newFeatures[idx].title = e.target.value;
//                                                         setContent({ ...content, whyChooseUsFeatures: newFeatures });
//                                                     }}
//                                                     className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                                 />
//                                                 <textarea
//                                                     rows="2"
//                                                     placeholder="Feature Description"
//                                                     value={feature.description}
//                                                     onChange={(e) => {
//                                                         const newFeatures = [...content.whyChooseUsFeatures];
//                                                         newFeatures[idx].description = e.target.value;
//                                                         setContent({ ...content, whyChooseUsFeatures: newFeatures });
//                                                     }}
//                                                     className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                                 />
//                                             </div>
//                                         </div>
//                                     ))}
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* CTA Tab */}
//                     {activeTab === 'cta' && (
//                         <div className="mt-6 space-y-6">
//                             <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
//                                 <h2 className="text-xl font-bold text-white mb-4">Call to Action Section</h2>
//                                 <div className="space-y-4">
//                                     <div>
//                                         <label className="block text-sm text-gray-400 mb-2">CTA Title</label>
//                                         <input
//                                             type="text"
//                                             value={content.ctaTitle}
//                                             onChange={(e) => setContent({ ...content, ctaTitle: e.target.value })}
//                                             className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                             placeholder="Ready to Begin Your Journey?"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm text-gray-400 mb-2">CTA Description</label>
//                                         <textarea
//                                             rows="2"
//                                             value={content.ctaDescription}
//                                             onChange={(e) => setContent({ ...content, ctaDescription: e.target.value })}
//                                             className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                             placeholder="Join thousands of successful students..."
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm text-gray-400 mb-2">Button Text</label>
//                                         <input
//                                             type="text"
//                                             value={content.ctaButtonText}
//                                             onChange={(e) => setContent({ ...content, ctaButtonText: e.target.value })}
//                                             className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                             placeholder="Get Free Consultation"
//                                         />
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm text-gray-400 mb-2">Button Link</label>
//                                         <input
//                                             type="text"
//                                             value={content.ctaButtonLink}
//                                             onChange={(e) => setContent({ ...content, ctaButtonLink: e.target.value })}
//                                             className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                             placeholder="/contact"
//                                         />
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}

//                     {/* SEO Tab */}
//                     {activeTab === 'seo' && (
//                         <div className="mt-6 space-y-6">
//                             <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
//                                 <h2 className="text-xl font-bold text-white mb-4">SEO Settings</h2>
//                                 <p className="text-gray-400 text-sm mb-4">These settings help search engines understand your page content and improve ranking</p>
//                                 <div className="space-y-4">
//                                     <div>
//                                         <label className="block text-sm text-gray-400 mb-2">SEO Title (60-70 characters)</label>
//                                         <input
//                                             type="text"
//                                             value={content.seoTitle || ''}
//                                             onChange={(e) => setContent({ ...content, seoTitle: e.target.value })}
//                                             className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                             placeholder="e.g., Vastu Courses in Noida | Learn Vastu Shastra Online"
//                                             maxLength="70"
//                                         />
//                                         <p className="text-gray-500 text-xs mt-1">This appears in Google search results as the clickable headline</p>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm text-gray-400 mb-2">SEO Description (150-160 characters)</label>
//                                         <textarea
//                                             rows="3"
//                                             value={content.seoDescription || ''}
//                                             onChange={(e) => setContent({ ...content, seoDescription: e.target.value })}
//                                             className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                             placeholder="e.g., Join best Vastu courses in Noida. Learn Vastu Shastra from expert Naveen Bhagat with practical training and certification. Enroll now!"
//                                             maxLength="160"
//                                         />
//                                         <p className="text-gray-500 text-xs mt-1">This appears in Google search results below the title</p>
//                                     </div>
//                                     <div>
//                                         <label className="block text-sm text-gray-400 mb-2">SEO Keywords (comma separated)</label>
//                                         <input
//                                             type="text"
//                                             value={content.seoKeywords || ''}
//                                             onChange={(e) => setContent({ ...content, seoKeywords: e.target.value })}
//                                             className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
//                                             placeholder="e.g., vastu course, vastu shastra course, vastu classes online, vastu training noida"
//                                         />
//                                         <p className="text-gray-500 text-xs mt-1">Comma separated keywords that describe your page</p>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </div>
//         </>
//     );
// };

// export default AdminPageContent;



import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Loader2, Save, ArrowLeft, Plus, Trash2, Upload } from 'lucide-react';
import { pageContentAPI } from '../../services/api';
import TinyMCEEditor from '../../components/Common/TinyMCEEditor';

// ✅ Quill Editor Styles
const quillStyles = `
  .dark-quill {
    background: #000000;
    border-radius: 12px;
  }
  
  .dark-quill .ql-toolbar {
    background: #0a0a0f;
    border-color: #00B7B3;
    border-radius: 12px 12px 0 0;
    border-bottom: 1px solid #00B7B3;
    padding: 8px;
  }
  
  .dark-quill .ql-toolbar button {
    color: #e0e0e0;
  }
  
  .dark-quill .ql-toolbar button:hover {
    color: #00B7B3;
  }
  
  .dark-quill .ql-toolbar .ql-active {
    color: #00B7B3;
  }
  
  .dark-quill .ql-container {
    background: #000000;
    border-color: #00B7B3;
    border-radius: 0 0 12px 12px;
    min-height: 300px;
    font-size: 15px;
  }
  
  .dark-quill .ql-editor {
    color: #ffffff !important;
    font-size: 15px;
    line-height: 1.6;
    background: #000000 !important;
  }
  
  .dark-quill .ql-editor strong {
    font-weight: bold !important;
  }
  
  .dark-quill .ql-editor em {
    font-style: italic !important;
  }
  
  .dark-quill .ql-editor u {
    text-decoration: underline !important;
  }
  
  .dark-quill .ql-editor h1 {
    font-size: 32px !important;
    font-weight: bold !important;
    margin: 24px 0 16px 0 !important;
  }
  
  .dark-quill .ql-editor h2 {
    font-size: 28px !important;
    font-weight: 600 !important;
    margin: 20px 0 12px 0 !important;
  }
  
  .dark-quill .ql-editor h3 {
    font-size: 24px !important;
    font-weight: 500 !important;
    margin: 18px 0 10px 0 !important;
  }
  
  .dark-quill .ql-editor h4 {
    font-size: 20px !important;
    font-weight: 500 !important;
  }
  
  .dark-quill .ql-editor a {
    text-decoration: underline !important;
  }
  
  .dark-quill .ql-editor ul, .dark-quill .ql-editor ol {
    margin: 12px 0 !important;
    padding-left: 30px !important;
  }
  
  .dark-quill .ql-editor li {
    margin: 8px 0 !important;
  }
  
  .dark-quill .ql-editor blockquote {
    border-left: 4px solid #00B7B3 !important;
    background: rgba(0, 183, 179, 0.1) !important;
    padding: 12px 20px !important;
    margin: 16px 0 !important;
    font-style: italic !important;
  }
  
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
  
  .dark-quill .ql-color-picker .ql-picker-label svg {
    filter: brightness(2);
  }
  
  .dark-quill .ql-background .ql-picker-label svg {
    filter: brightness(2);
  }
  
  .dark-quill .ql-color-picker .ql-picker-options {
    width: 180px;
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    gap: 2px;
    padding: 4px;
  }
  
  .dark-quill .ql-color-picker .ql-picker-item {
    width: 24px !important;
    height: 24px !important;
    margin: 0 !important;
    border-radius: 4px;
  }
`;

const AdminPageContent = () => {
    const router = useRouter();
    const { pageType: paramPageType } = router.query;
    const pathname = router.asPath?.split('?')[0] || '';
    
    let pageType = paramPageType;
    if (!pageType || pageType === 'undefined') {
        const pathParts = pathname.split('/');
        pageType = pathParts[pathParts.length - 1];
    }
    
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [activeTab, setActiveTab] = useState('hero');
    const [contentExists, setContentExists] = useState(false);
    const [content, setContent] = useState({
        heroTitle: '',
        heroSubtitle: '',
        heroDescription: '',
        heroImage: '',
        heroBadgeText: '',
        introTitle: '',
        introContent: '',
        whyChooseUsTitle: '',
        whyChooseUsFeatures: [
            { icon: '', title: '', description: '' },
            { icon: '', title: '', description: '' },
            { icon: '', title: '', description: '' }
        ],
        ctaTitle: '',
        ctaDescription: '',
        ctaButtonText: '',
        ctaButtonLink: '/contact',
        seoTitle: '',
        seoDescription: '',
        seoKeywords: ''
    });

    // ✅ IMAGE UPLOAD WITH AUTO-DELETE
    const handleImageUpload = async (field, file) => {
        if (!file) return;
        
        const formData = new FormData();
        formData.append('file', file);
        
        // Get old image path
        const oldImagePath = content[field] || '';
        if (oldImagePath) {
            formData.append('oldImagePath', oldImagePath);
            console.log('🗑️ Sending old image for deletion:', oldImagePath);
        }
        
        formData.append('field', field);
        formData.append('folder', 'courses');
        
        setUploading(true);
        try {
            const token = localStorage.getItem('adminToken');
            const response = await fetch('/api/upload/with-delete', {
                method: 'POST',
                headers: { 'Authorization': `Bearer ${token}` },
                body: formData
            });
            const data = await response.json();
            
            if (response.ok && data.success) {
                setContent(prev => ({ ...prev, [field]: data.imagePath }));
                if (data.oldImageDeleted) {
                    alert('✅ Image uploaded! Old image deleted automatically.');
                } else {
                    alert('✅ Image uploaded successfully!');
                }
            } else {
                alert('❌ ' + (data.message || 'Upload failed'));
            }
        } catch (error) {
            console.error('Upload error:', error);
            alert('❌ Failed to upload image');
        } finally {
            setUploading(false);
        }
    };

    const fetchContent = useCallback(async () => {
        setLoading(true);
        try {
            const response = await pageContentAPI.getByType(pageType);
            
            if (response.data && response.data.success && response.data.data) {
                const pageData = response.data.data;
                setContentExists(true);
                setContent({
                    heroTitle: pageData.heroTitle || '',
                    heroSubtitle: pageData.heroSubtitle || '',
                    heroDescription: pageData.heroDescription || '',
                    heroImage: pageData.heroImage || '',
                    heroBadgeText: pageData.heroBadgeText || '',
                    introTitle: pageData.introTitle || '',
                    introContent: pageData.introContent || '',
                    whyChooseUsTitle: pageData.whyChooseUsTitle || '',
                    whyChooseUsFeatures: pageData.whyChooseUsFeatures && pageData.whyChooseUsFeatures.length > 0 
                        ? pageData.whyChooseUsFeatures 
                        : [
                            { icon: '', title: '', description: '' },
                            { icon: '', title: '', description: '' },
                            { icon: '', title: '', description: '' }
                        ],
                    ctaTitle: pageData.ctaTitle || '',
                    ctaDescription: pageData.ctaDescription || '',
                    ctaButtonText: pageData.ctaButtonText || '',
                    ctaButtonLink: pageData.ctaButtonLink || '/contact',
                    seoTitle: pageData.seoTitle || '',
                    seoDescription: pageData.seoDescription || '',
                    seoKeywords: pageData.seoKeywords || ''
                });
            } else {
                setContentExists(false);
            }
        } catch (error) {
            console.error('Error fetching:', error);
            setContentExists(false);
        } finally {
            setLoading(false);
        }
    }, [pageType]);

    useEffect(() => {
        if (pageType && (pageType === 'astrology' || pageType === 'vastu')) {
            fetchContent();
        } else {
            setLoading(false);
        }
    }, [fetchContent, pageType]);

    const handleSave = async () => {
        if (!pageType) {
            alert('Error: Page type is undefined');
            return;
        }
        
        setSaving(true);
        try {
            await pageContentAPI.save(pageType, content);
            alert('✅ Page content saved successfully!');
            setContentExists(true);
        } catch (error) {
            console.error('Save error:', error);
            alert('❌ Failed to save: ' + (error.response?.data?.message || error.message));
        } finally {
            setSaving(false);
        }
    };

    const TabButton = ({ id, label, active, onClick }) => (
        <button
            onClick={() => onClick(id)}
            className={`px-5 py-2.5 rounded-xl transition-all whitespace-nowrap ${
                active === id
                    ? 'bg-[#00B7B3]/20 text-[#00B7B3] border border-[#00B7B3]/50'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
            }`}
        >
            {label}
        </button>
    );

    const addFeature = () => {
        setContent(prev => ({
            ...prev,
            whyChooseUsFeatures: [
                ...prev.whyChooseUsFeatures,
                { icon: '', title: '', description: '' }
            ]
        }));
    };

    const removeFeature = (index) => {
        const newFeatures = content.whyChooseUsFeatures.filter((_, i) => i !== index);
        setContent(prev => ({ ...prev, whyChooseUsFeatures: newFeatures }));
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <Loader2 className="w-8 h-8 text-[#00B7B3] animate-spin" />
            </div>
        );
    }

    const displayType = pageType === 'astrology' ? 'Astrology' : pageType === 'vastu' ? 'Vastu' : 'Page';

    return (
        <>
            <style>{quillStyles}</style>
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
                                        {displayType} Page Content
                                    </h1>
                                    <p className="text-gray-500 text-sm">
                                        {contentExists ? 'Edit content' : 'Create new content'}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={handleSave}
                                disabled={saving}
                                className="px-6 py-2 bg-[#00B7B3] text-black rounded-lg font-semibold hover:bg-[#00B7B3]/80 disabled:opacity-50 flex items-center gap-2"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                {contentExists ? 'Save Changes' : 'Create Content'}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="max-w-7xl mx-auto px-6 py-6">
                    <div className="flex gap-2 border-b border-[#00B7B3]/20 pb-3 overflow-x-auto">
                        <TabButton id="hero" label="🎯 Hero Section" active={activeTab} onClick={setActiveTab} />
                        <TabButton id="intro" label="📖 Intro Section" active={activeTab} onClick={setActiveTab} />
                        <TabButton id="why" label="⭐ Why Choose Us" active={activeTab} onClick={setActiveTab} />
                        <TabButton id="cta" label="🎬 CTA Section" active={activeTab} onClick={setActiveTab} />
                        <TabButton id="seo" label="🔍 SEO Section" active={activeTab} onClick={setActiveTab} />
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
                                            value={content.heroTitle}
                                            onChange={(e) => setContent(prev => ({ ...prev, heroTitle: e.target.value }))}
                                            className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                            placeholder="e.g., Master the Art of"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Hero Subtitle</label>
                                        <input
                                            type="text"
                                            value={content.heroSubtitle}
                                            onChange={(e) => setContent(prev => ({ ...prev, heroSubtitle: e.target.value }))}
                                            className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                            placeholder="e.g., Astrology / Vastu Shastra"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Hero Badge Text</label>
                                        <input
                                            type="text"
                                            value={content.heroBadgeText}
                                            onChange={(e) => setContent(prev => ({ ...prev, heroBadgeText: e.target.value }))}
                                            className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                            placeholder="e.g., Ancient Wisdom Meets Modern Science"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Hero Description</label>
                                        <textarea
                                            rows="4"
                                            value={content.heroDescription}
                                            onChange={(e) => setContent(prev => ({ ...prev, heroDescription: e.target.value }))}
                                            className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                            placeholder="Enter hero description..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Hero Image</label>
                                        <div className="flex gap-4">
                                            <input
                                                type="text"
                                                value={content.heroImage}
                                                onChange={(e) => setContent(prev => ({ ...prev, heroImage: e.target.value }))}
                                                className="flex-1 px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                                placeholder="https://example.com/hero-image.jpg"
                                            />
                                            <label className="px-4 py-2 bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg cursor-pointer hover:bg-[#00B7B3]/30 flex items-center gap-2">
                                                <Upload className="w-4 h-4" />
                                                {uploading ? 'Uploading...' : 'Upload'}
                                                <input 
                                                    type="file" 
                                                    accept="image/*" 
                                                    className="hidden" 
                                                    onChange={(e) => handleImageUpload('heroImage', e.target.files[0])} 
                                                    disabled={uploading}
                                                />
                                            </label>
                                        </div>
                                        {content.heroImage && (
                                            <div className="mt-2">
                                                <img src={content.heroImage} alt="Hero preview" className="w-32 h-32 object-cover rounded-lg border border-[#00B7B3]/30" />
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Intro Tab */}
                    {activeTab === 'intro' && (
                        <div className="mt-6 space-y-6">
                            <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
                                <h2 className="text-xl font-bold text-white mb-4">Intro Section</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Intro Title</label>
                                        <input
                                            type="text"
                                            value={content.introTitle}
                                            onChange={(e) => setContent(prev => ({ ...prev, introTitle: e.target.value }))}
                                            className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                            placeholder="e.g., The Cosmic Science"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Intro Content</label>
                                        <div className="dark-quill">
                                            <TinyMCEEditor
                                                value={content.introContent}
                                                onChange={(value) => setContent(prev => ({ ...prev, introContent: value }))}
                                                placeholder="Write your introduction content here..."
                                                minHeight={340}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Why Choose Us Tab */}
                    {activeTab === 'why' && (
                        <div className="mt-6 space-y-6">
                            <div className="bg-gradient-to-br from-[#00B7B3]/5 to-transparent border border-[#00B7B3]/30 rounded-2xl p-6">
                                <h2 className="text-xl font-bold text-white mb-4">Why Choose Us Section</h2>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Section Title</label>
                                        <input
                                            type="text"
                                            value={content.whyChooseUsTitle}
                                            onChange={(e) => setContent(prev => ({ ...prev, whyChooseUsTitle: e.target.value }))}
                                            className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                            placeholder="Why Choose Our Courses?"
                                        />
                                    </div>
                                    
                                    <div className="flex justify-between items-center">
                                        <h3 className="text-white font-semibold">Features</h3>
                                        <button
                                            onClick={addFeature}
                                            className="flex items-center gap-1 px-3 py-1 bg-[#00B7B3]/20 text-[#00B7B3] rounded-lg text-sm hover:bg-[#00B7B3]/30"
                                        >
                                            <Plus className="w-4 h-4" /> Add Feature
                                        </button>
                                    </div>
                                    
                                    {content.whyChooseUsFeatures.map((feature, idx) => (
                                        <div key={idx} className="border border-[#00B7B3]/20 rounded-xl p-4 relative">
                                            {content.whyChooseUsFeatures.length > 1 && (
                                                <button
                                                    onClick={() => removeFeature(idx)}
                                                    className="absolute top-3 right-3 text-red-400 hover:text-red-300"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            )}
                                            <h3 className="text-white font-semibold mb-3">Feature {idx + 1}</h3>
                                            <div className="space-y-3">
                                                <input
                                                    type="text"
                                                    placeholder="Icon Name (StarIcon, CompassIcon, etc.)"
                                                    value={feature.icon}
                                                    onChange={(e) => {
                                                        const newFeatures = [...content.whyChooseUsFeatures];
                                                        newFeatures[idx].icon = e.target.value;
                                                        setContent(prev => ({ ...prev, whyChooseUsFeatures: newFeatures }));
                                                    }}
                                                    className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                                />
                                                <input
                                                    type="text"
                                                    placeholder="Feature Title"
                                                    value={feature.title}
                                                    onChange={(e) => {
                                                        const newFeatures = [...content.whyChooseUsFeatures];
                                                        newFeatures[idx].title = e.target.value;
                                                        setContent(prev => ({ ...prev, whyChooseUsFeatures: newFeatures }));
                                                    }}
                                                    className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                                />
                                                <textarea
                                                    rows="2"
                                                    placeholder="Feature Description"
                                                    value={feature.description}
                                                    onChange={(e) => {
                                                        const newFeatures = [...content.whyChooseUsFeatures];
                                                        newFeatures[idx].description = e.target.value;
                                                        setContent(prev => ({ ...prev, whyChooseUsFeatures: newFeatures }));
                                                    }}
                                                    className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                                />
                                            </div>
                                        </div>
                                    ))}
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
                                            value={content.ctaTitle}
                                            onChange={(e) => setContent(prev => ({ ...prev, ctaTitle: e.target.value }))}
                                            className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                            placeholder="Ready to Begin Your Journey?"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">CTA Description</label>
                                        <textarea
                                            rows="2"
                                            value={content.ctaDescription}
                                            onChange={(e) => setContent(prev => ({ ...prev, ctaDescription: e.target.value }))}
                                            className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                            placeholder="Join thousands of successful students..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Button Text</label>
                                        <input
                                            type="text"
                                            value={content.ctaButtonText}
                                            onChange={(e) => setContent(prev => ({ ...prev, ctaButtonText: e.target.value }))}
                                            className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                            placeholder="Get Free Consultation"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">Button Link</label>
                                        <input
                                            type="text"
                                            value={content.ctaButtonLink}
                                            onChange={(e) => setContent(prev => ({ ...prev, ctaButtonLink: e.target.value }))}
                                            className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                            placeholder="/contact"
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
                                <p className="text-gray-400 text-sm mb-4">These settings help search engines understand your page content and improve ranking</p>
                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">SEO Title (60-70 characters)</label>
                                        <input
                                            type="text"
                                            value={content.seoTitle || ''}
                                            onChange={(e) => setContent(prev => ({ ...prev, seoTitle: e.target.value }))}
                                            className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                            placeholder="e.g., Vastu Courses in Noida | Learn Vastu Shastra Online"
                                            maxLength="70"
                                        />
                                        <p className="text-gray-500 text-xs mt-1">This appears in Google search results as the clickable headline</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">SEO Description (150-160 characters)</label>
                                        <textarea
                                            rows="3"
                                            value={content.seoDescription || ''}
                                            onChange={(e) => setContent(prev => ({ ...prev, seoDescription: e.target.value }))}
                                            className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                            placeholder="e.g., Join best Vastu courses in Noida. Learn Vastu Shastra from expert Naveen Bhagat with practical training and certification. Enroll now!"
                                            maxLength="160"
                                        />
                                        <p className="text-gray-500 text-xs mt-1">This appears in Google search results below the title</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm text-gray-400 mb-2">SEO Keywords (comma separated)</label>
                                        <input
                                            type="text"
                                            value={content.seoKeywords || ''}
                                            onChange={(e) => setContent(prev => ({ ...prev, seoKeywords: e.target.value }))}
                                            className="w-full px-4 py-2 bg-black/60 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                                            placeholder="e.g., vastu course, vastu shastra course, vastu classes online, vastu training noida"
                                        />
                                        <p className="text-gray-500 text-xs mt-1">Comma separated keywords that describe your page</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};

export default AdminPageContent;