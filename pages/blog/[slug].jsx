// import React, { useState } from 'react';
// import Link from 'next/link';
// import Head from 'next/head';
// import { useRouter } from 'next/router';
// import PublicLayout from '../../src/public/layout/PublicLayout';
// import { ArrowLeft, Share2, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// // ✅ FAQ Accordion Component
// const FAQItem = ({ faq, index }) => {
//     const [isOpen, setIsOpen] = useState(false);

//     return (
//         <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900/30">
//             <button
//                 onClick={() => setIsOpen(!isOpen)}
//                 className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-800/50 transition"
//             >
//                 <span className="text-white font-medium text-sm sm:text-base pr-4">
//                     {index + 1}. {faq.question}
//                 </span>
//                 {isOpen ? (
//                     <ChevronUp className="w-5 h-5 text-[#00B7B3] flex-shrink-0" />
//                 ) : (
//                     <ChevronDown className="w-5 h-5 text-[#00B7B3] flex-shrink-0" />
//                 )}
//             </button>
//             {isOpen && (
//                 <div className="px-4 pb-4 text-gray-300 text-sm sm:text-base leading-relaxed">
//                     {faq.answer}
//                 </div>
//             )}
//         </div>
//     );
// };

// export default function BlogDetail({ blog, related, recentBlogs }) {
//     const router = useRouter();
//     const [copied, setCopied] = useState(false);

//     if (router.isFallback) {
//         return (
//             <PublicLayout>
//                 <div className="flex items-center justify-center min-h-[60vh]">
//                     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B7B3]"></div>
//                 </div>
//             </PublicLayout>
//         );
//     }

//     if (!blog) {
//         return (
//             <PublicLayout>
//                 <div className="max-w-6xl mx-auto px-4 py-12 text-center">
//                     <h1 className="text-3xl font-bold text-white mb-4">Blog Not Found</h1>
//                     <p className="text-gray-400 mb-8">The blog you're looking for doesn't exist.</p>
//                     <Link href="/blog" className="text-[#00B7B3] hover:underline">
//                         ← Back to Blog
//                     </Link>
//                 </div>
//             </PublicLayout>
//         );
//     }

//     const copyUrl = () => {
//         const url = typeof window !== 'undefined' ? window.location.href : `https://nbastro.com/blog/${blog.slug}`;
//         navigator.clipboard.writeText(url);
//         setCopied(true);
//         setTimeout(() => setCopied(false), 2000);
//     };

//     const seoTitle = blog.seoTitle || `${blog.title} | NB Astro`;
//     const seoDescription = blog.seoDescription || blog.excerpt || blog.content?.replace(/<[^>]*>/g, '').slice(0, 160);
//     const seoKeywords = blog.seoKeywords || `${blog.title}, vedic astrology, vastu shastra, Naveen Bhagat`;
//     const imageUrl = blog.image ? `${API_BASE_URL}${blog.image}` : 'https://nbastro.com/default-og-image.jpg';

//     return (
//         <>
//             <Head>
//                 <title>{seoTitle}</title>
//                 <meta name="description" content={seoDescription} />
//                 <meta name="keywords" content={seoKeywords} />
//                 <link rel="canonical" href={`https://nbastro.com/blog/${blog.slug}`} />
                
//                 <meta property="og:title" content={seoTitle} />
//                 <meta property="og:description" content={seoDescription} />
//                 <meta property="og:image" content={imageUrl} />
//                 <meta property="og:url" content={`https://nbastro.com/blog/${blog.slug}`} />
//                 <meta property="og:type" content="article" />
//                 <meta property="article:published_time" content={blog.publishedAt || blog.createdAt} />
//                 <meta property="article:modified_time" content={blog.updatedAt || blog.createdAt} />
                
//                 <meta name="twitter:card" content="summary_large_image" />
//                 <meta name="twitter:title" content={seoTitle} />
//                 <meta name="twitter:description" content={seoDescription} />
//                 <meta name="twitter:image" content={imageUrl} />
                
//                 <script
//                     type="application/ld+json"
//                     dangerouslySetInnerHTML={{
//                         __html: JSON.stringify({
//                             "@context": "https://schema.org",
//                             "@type": "BlogPosting",
//                             "headline": blog.title,
//                             "description": seoDescription,
//                             "image": imageUrl,
//                             "datePublished": blog.publishedAt || blog.createdAt,
//                             "dateModified": blog.updatedAt || blog.createdAt,
//                             "author": {
//                                 "@type": "Person",
//                                 "name": blog.author?.name || 'Naveen Bhagat',
//                                 "url": blog.author?.url || 'https://nbastro.com/about'
//                             },
//                             "publisher": {
//                                 "@type": "Organization",
//                                 "name": "NB Astro",
//                                 "logo": {
//                                     "@type": "ImageObject",
//                                     "url": "https://nbastro.com/logo.png"
//                                 }
//                             },
//                             "mainEntityOfPage": {
//                                 "@type": "WebPage",
//                                 "@id": `https://nbastro.com/blog/${blog.slug}`
//                             }
//                         })
//                     }}
//                 />
//             </Head>

//             <PublicLayout>
//                 <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
//                     {/* Back Button */}
//                     <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00B7B3] transition mb-6">
//                         <ArrowLeft className="w-4 h-4" />
//                         Back to Blog
//                     </Link>

//                     <div className="grid lg:grid-cols-3 gap-8">
//                         {/* Main Content - 2/3 width */}
//                         <div className="lg:col-span-2">
//                             {/* Featured Image */}
//                             {blog.image && (
//                                 <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] rounded-xl overflow-hidden mb-6 bg-gray-800">
//                                     <img
//                                         src={`${API_BASE_URL}${blog.image}`}
//                                         alt={blog.title}
//                                         className="w-full h-full object-cover"
//                                         priority
//                                         onError={(e) => {
//                                             e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="450" fill="%23333"%3E%3Crect width="1200" height="450"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23666" font-size="24"%3ENo Image%3C/text%3E%3C/svg%3E';
//                                         }}
//                                     />
//                                 </div>
//                             )}

//                             {/* Article Header */}
//                             <div className="mb-6">
//                                 <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-400 mb-3">
//                                     <span className="text-[#00B7B3] font-medium">{blog.categories?.[0] || 'General'}</span>
//                                     <span className="text-gray-600">•</span>
//                                     <span>{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-IN', {
//                                         day: '2-digit',
//                                         month: 'long',
//                                         year: 'numeric'
//                                     })}</span>
//                                     <span className="text-gray-600">•</span>
//                                     <span>{blog.readTime || 5} min read</span>
//                                     {blog.isFeatured && (
//                                         <span className="bg-yellow-500/20 text-yellow-400 px-2.5 py-0.5 rounded-full text-xs">⭐ Featured</span>
//                                     )}
//                                 </div>

//                                 <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
//                                     {blog.title}
//                                 </h1>

//                                 {blog.aiOverview && (
//                                     <div className="bg-[#00B7B3]/5 border border-[#00B7B3]/30 rounded-lg p-4 sm:p-6 mb-4">
//                                         <h3 className="text-[#00B7B3] font-semibold text-sm mb-2">🤖 Quick Summary</h3>
//                                         <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{blog.aiOverview}</p>
//                                     </div>
//                                 )}

//                                 {/* Author & Share */}
//                                 <div className="flex flex-wrap items-center justify-between gap-3">
//                                     <div className="flex items-center gap-3">
//                                         <div className="w-10 h-10 rounded-full bg-[#00B7B3]/20 flex items-center justify-center">
//                                             <span className="text-[#00B7B3] font-bold text-sm">
//                                                 {blog.author?.name?.charAt(0) || 'N'}
//                                             </span>
//                                         </div>
//                                         <div>
//                                             <p className="text-white font-medium">{blog.author?.name || 'Naveen Bhagat'}</p>
//                                             <p className="text-gray-500 text-sm">Author</p>
//                                         </div>
//                                     </div>
//                                     <button
//                                         onClick={copyUrl}
//                                         className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition"
//                                     >
//                                         {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
//                                         {copied ? 'Copied!' : 'Share'}
//                                     </button>
//                                 </div>
//                             </div>

//                             {/* Article Content */}
//                             <div className="prose prose-invert max-w-none prose-sm sm:prose-base lg:prose-lg">
//                                 <div dangerouslySetInnerHTML={{ __html: blog.content }} />
//                             </div>

//                             {/* Quick Summary Points */}
//                             {blog.quickSummary && blog.quickSummary.length > 0 && (
//                                 <div className="mt-8 pt-8 border-t border-gray-800">
//                                     <h3 className="text-lg font-bold text-white mb-3">📌 Key Takeaways</h3>
//                                     <ul className="space-y-2">
//                                         {blog.quickSummary.map((point, index) => (
//                                             <li key={index} className="text-gray-300 flex items-start gap-2">
//                                                 <span className="text-[#00B7B3] mt-1">•</span>
//                                                 {point}
//                                             </li>
//                                         ))}
//                                     </ul>
//                                 </div>
//                             )}

//                             {/* Tags */}
//                             {blog.tags && blog.tags.length > 0 && (
//                                 <div className="mt-8 pt-8 border-t border-gray-800">
//                                     <h3 className="text-white font-semibold mb-3">Tags</h3>
//                                     <div className="flex flex-wrap gap-2">
//                                         {blog.tags.map((tag, index) => (
//                                             <span key={index} className="px-3 py-1 bg-gray-800 rounded-full text-gray-400 text-sm">
//                                                 #{tag}
//                                             </span>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* FAQs - Accordion */}
//                             {blog.faqs && blog.faqs.length > 0 && (
//                                 <div className="mt-8 pt-8 border-t border-gray-800">
//                                     <h3 className="text-xl font-bold text-white mb-4">❓ Frequently Asked Questions</h3>
//                                     <div className="space-y-3">
//                                         {blog.faqs.map((faq, index) => (
//                                             <FAQItem key={index} faq={faq} index={index} />
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>

//                         {/* Sidebar - 1/3 width */}
//                         <div className="lg:col-span-1 space-y-6">
//                             {/* Recent Blogs */}
//                             {recentBlogs && recentBlogs.length > 0 && (
//                                 <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
//                                     <h3 className="text-lg font-bold text-white mb-4">📝 Recent Posts</h3>
//                                     <div className="space-y-4">
//                                         {recentBlogs.map((post) => (
//                                             <Link href={`/blog/${post.slug}`} key={post._id} prefetch={false}>
//                                                 <div className="group flex gap-3 hover:bg-gray-800/50 p-2 rounded-lg transition">
//                                                     {post.image && (
//                                                         <img
//                                                             src={`${API_BASE_URL}${post.image}`}
//                                                             alt={post.title}
//                                                             className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
//                                                             loading="lazy"
//                                                             onError={(e) => {
//                                                                 e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="%23333"%3E%3Crect width="64" height="64"/%3E%3C/svg%3E';
//                                                             }}
//                                                         />
//                                                     )}
//                                                     <div className="flex-1 min-w-0">
//                                                         <h4 className="text-white text-sm font-medium group-hover:text-[#00B7B3] transition line-clamp-2">
//                                                             {post.title}
//                                                         </h4>
//                                                         <p className="text-gray-500 text-xs mt-1">
//                                                             {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-IN')}
//                                                         </p>
//                                                     </div>
//                                                 </div>
//                                             </Link>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}

//                             {/* Categories */}
//                             {blog.categories && blog.categories.length > 0 && (
//                                 <div className="bg-gray-900/50 rounded-xl border border-gray-800 p-6">
//                                     <h3 className="text-lg font-bold text-white mb-4">📂 Categories</h3>
//                                     <div className="flex flex-wrap gap-2">
//                                         {blog.categories.map((cat, index) => (
//                                             <Link
//                                                 key={index}
//                                                 href={`/blog?category=${cat}`}
//                                                 className="px-3 py-1 bg-gray-800 rounded-full text-gray-300 text-sm hover:bg-[#00B7B3]/20 hover:text-[#00B7B3] transition"
//                                             >
//                                                 {cat}
//                                             </Link>
//                                         ))}
//                                     </div>
//                                 </div>
//                             )}
//                         </div>
//                     </div>

//                     {/* Related Posts */}
//                     {related && related.length > 0 && (
//                         <div className="mt-12 pt-8 border-t border-gray-800">
//                             <h3 className="text-xl font-bold text-white mb-6">Related Posts</h3>
//                             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                                 {related.map((post) => (
//                                     <Link href={`/blog/${post.slug}`} key={post._id} prefetch={false}>
//                                         <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-[#00B7B3] transition p-4">
//                                             {post.image && (
//                                                 <img
//                                                     src={`${API_BASE_URL}${post.image}`}
//                                                     alt={post.title}
//                                                     className="w-full h-32 object-cover rounded-lg mb-3"
//                                                     loading="lazy"
//                                                     onError={(e) => {
//                                                         e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200" fill="%23333"%3E%3Crect width="400" height="200"/%3E%3C/svg%3E';
//                                                     }}
//                                                 />
//                                             )}
//                                             <h4 className="text-white font-semibold hover:text-[#00B7B3] transition line-clamp-2">
//                                                 {post.title}
//                                             </h4>
//                                             <p className="text-gray-500 text-xs mt-2">
//                                                 {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-IN')}
//                                             </p>
//                                         </div>
//                                     </Link>
//                                 ))}
//                             </div>
//                         </div>
//                     )}
//                 </div>
//             </PublicLayout>
//         </>
//     );
// }

// // ✅ ISR - Incremental Static Regeneration
// export async function getStaticProps({ params }) {
//     try {
//         const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        
//         // ✅ Fetch blog detail
//         const res = await fetch(`${baseUrl}/api/blog/${params.slug}`);
//         const data = await res.json();

//         if (!data.success) {
//             return { notFound: true };
//         }

//         // ✅ Fetch recent blogs (excluding current)
//         const recentRes = await fetch(`${baseUrl}/api/blog?limit=5`);
//         const recentData = await recentRes.json();
//         const recentBlogs = (recentData.data || [])
//             .filter(b => b.slug !== params.slug)
//             .slice(0, 4);

//         return {
//             props: {
//                 blog: data.data || null,
//                 related: data.related || [],
//                 recentBlogs: recentBlogs || []
//             },
//             revalidate: 60
//         };
//     } catch (error) {
//         console.error('Error fetching blog:', error);
//         return { notFound: true };
//     }
// }

// export async function getStaticPaths() {
//     try {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/blog?limit=100`);
//         const data = await res.json();
        
//         const paths = (data.data || [])
//             .filter(blog => blog.isPublished !== false)
//             .map((blog) => ({
//                 params: { slug: blog.slug }
//             }));

//         return {
//             paths,
//             fallback: 'blocking'
//         };
//     } catch (error) {
//         console.error('Error generating paths:', error);
//         return {
//             paths: [],
//             fallback: 'blocking'
//         };
//     }
// }


import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PublicLayout from '../../src/public/layout/PublicLayout';
import { ArrowLeft, Share2, Copy, Check, ChevronDown, ChevronUp } from 'lucide-react';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

// ✅ FAQ Accordion Component
const FAQItem = ({ faq, index }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="border border-gray-700 rounded-lg overflow-hidden bg-gray-900/30">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-800/50 transition"
            >
                <span className="text-white font-medium text-sm sm:text-base pr-4">
                    {index + 1}. {faq.question}
                </span>
                {isOpen ? (
                    <ChevronUp className="w-5 h-5 text-[#00B7B3] flex-shrink-0" />
                ) : (
                    <ChevronDown className="w-5 h-5 text-[#00B7B3] flex-shrink-0" />
                )}
            </button>
            {isOpen && (
                <div className="px-4 pb-4 text-gray-300 text-sm sm:text-base leading-relaxed">
                    {faq.answer}
                </div>
            )}
        </div>
    );
};

export default function BlogDetail({ blog, related, recentBlogs }) {
    const router = useRouter();
    const [copied, setCopied] = useState(false);

    if (router.isFallback) {
        return (
            <PublicLayout>
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00B7B3]"></div>
                </div>
            </PublicLayout>
        );
    }

    if (!blog) {
        return (
            <PublicLayout>
                <div className="max-w-6xl mx-auto px-4 py-12 text-center">
                    <h1 className="text-3xl font-bold text-white mb-4">Blog Not Found</h1>
                    <p className="text-gray-400 mb-8">The blog you're looking for doesn't exist.</p>
                    <Link href="/blog" className="text-[#00B7B3] hover:underline">
                        ← Back to Blog
                    </Link>
                </div>
            </PublicLayout>
        );
    }

    const copyUrl = () => {
        const url = typeof window !== 'undefined' ? window.location.href : `https://nbastro.com/blog/${blog.slug}`;
        navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const seoTitle = blog.seoTitle || `${blog.title} | NB Astro`;
    const seoDescription = blog.seoDescription || blog.excerpt || blog.content?.replace(/<[^>]*>/g, '').slice(0, 160);
    const seoKeywords = blog.seoKeywords || `${blog.title}, vedic astrology, vastu shastra, Naveen Bhagat`;
    const imageUrl = blog.image ? `${API_BASE_URL}${blog.image}` : 'https://nbastro.com/default-og-image.jpg';

    return (
        <>
            <Head>
                <title>{seoTitle}</title>
                <meta name="description" content={seoDescription} />
                <meta name="keywords" content={seoKeywords} />
                <link rel="canonical" href={`https://nbastro.com/blog/${blog.slug}`} />
                
                <meta property="og:title" content={seoTitle} />
                <meta property="og:description" content={seoDescription} />
                <meta property="og:image" content={imageUrl} />
                <meta property="og:url" content={`https://nbastro.com/blog/${blog.slug}`} />
                <meta property="og:type" content="article" />
                <meta property="article:published_time" content={blog.publishedAt || blog.createdAt} />
                <meta property="article:modified_time" content={blog.updatedAt || blog.createdAt} />
                
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={seoTitle} />
                <meta name="twitter:description" content={seoDescription} />
                <meta name="twitter:image" content={imageUrl} />
                
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            "@context": "https://schema.org",
                            "@type": "BlogPosting",
                            "headline": blog.title,
                            "description": seoDescription,
                            "image": imageUrl,
                            "datePublished": blog.publishedAt || blog.createdAt,
                            "dateModified": blog.updatedAt || blog.createdAt,
                            "author": {
                                "@type": "Person",
                                "name": blog.author?.name || 'Naveen Bhagat',
                                "url": blog.author?.url || 'https://nbastro.com/about'
                            },
                            "publisher": {
                                "@type": "Organization",
                                "name": "NB Astro",
                                "logo": {
                                    "@type": "ImageObject",
                                    "url": "https://nbastro.com/logo.png"
                                }
                            },
                            "mainEntityOfPage": {
                                "@type": "WebPage",
                                "@id": `https://nbastro.com/blog/${blog.slug}`
                            }
                        })
                    }}
                />
            </Head>

            <PublicLayout>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-12">
                    {/* Back Button */}
                    <Link href="/blog" className="inline-flex items-center gap-2 text-gray-400 hover:text-[#00B7B3] transition mb-6">
                        <ArrowLeft className="w-4 h-4" />
                        Back to Blog
                    </Link>

                    {/* Full Width Content */}
                    <div className="w-full">
                        {/* Featured Image */}
                        {blog.image && (
                            <div className="relative w-full h-[250px] sm:h-[350px] md:h-[450px] rounded-xl overflow-hidden mb-6 bg-gray-800">
                                <img
                                    src={`${API_BASE_URL}${blog.image}`}
                                    alt={blog.title}
                                    className="w-full h-full object-cover"
                                    priority
                                    onError={(e) => {
                                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="1200" height="450" fill="%23333"%3E%3Crect width="1200" height="450"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23666" font-size="24"%3ENo Image%3C/text%3E%3C/svg%3E';
                                    }}
                                />
                            </div>
                        )}

                        {/* Article Header */}
                        <div className="mb-6">
                            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-400 mb-3">
                                <span className="text-[#00B7B3] font-medium">{blog.category || blog.categories?.[0] || 'General'}</span>
                                <span className="text-gray-600">•</span>
                                <span>{new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-IN', {
                                    day: '2-digit',
                                    month: 'long',
                                    year: 'numeric'
                                })}</span>
                                <span className="text-gray-600">•</span>
                                <span>{blog.readTime || 5} min read</span>
                                {blog.isFeatured && (
                                    <span className="bg-yellow-500/20 text-yellow-400 px-2.5 py-0.5 rounded-full text-xs">⭐ Featured</span>
                                )}
                            </div>

                            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">
                                {blog.title}
                            </h1>

                            {blog.aiOverview && (
                                <div className="bg-[#00B7B3]/5 border border-[#00B7B3]/30 rounded-lg p-4 sm:p-6 mb-4">
                                    <h3 className="text-[#00B7B3] font-semibold text-sm mb-2">🤖 Quick Summary</h3>
                                    <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{blog.aiOverview}</p>
                                </div>
                            )}

                            {/* Author & Share */}
                            <div className="flex flex-wrap items-center justify-between gap-3">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-[#00B7B3]/20 flex items-center justify-center">
                                        <span className="text-[#00B7B3] font-bold text-sm">
                                            {blog.author?.name?.charAt(0) || 'N'}
                                        </span>
                                    </div>
                                    <div>
                                        <p className="text-white font-medium">{blog.author?.name || 'Naveen Bhagat'}</p>
                                        <p className="text-gray-500 text-sm">Author</p>
                                    </div>
                                </div>
                                <button
                                    onClick={copyUrl}
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition"
                                >
                                    {copied ? <Check className="w-4 h-4 text-green-400" /> : <Share2 className="w-4 h-4" />}
                                    {copied ? 'Copied!' : 'Share'}
                                </button>
                            </div>
                        </div>

                        {/* Article Content */}
                        <div className="prose prose-invert max-w-none prose-sm sm:prose-base lg:prose-lg">
                            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
                        </div>

                        {/* Quick Summary Points */}
                        {blog.quickSummary && blog.quickSummary.length > 0 && (
                            <div className="mt-8 pt-8 border-t border-gray-800">
                                <h3 className="text-lg font-bold text-white mb-3">📌 Key Takeaways</h3>
                                <ul className="space-y-2">
                                    {blog.quickSummary.map((point, index) => (
                                        <li key={index} className="text-gray-300 flex items-start gap-2">
                                            <span className="text-[#00B7B3] mt-1">•</span>
                                            {point}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}

                        {/* Tags */}
                        {blog.tags && blog.tags.length > 0 && (
                            <div className="mt-8 pt-8 border-t border-gray-800">
                                <h3 className="text-white font-semibold mb-3">Tags</h3>
                                <div className="flex flex-wrap gap-2">
                                    {blog.tags.map((tag, index) => (
                                        <span key={index} className="px-3 py-1 bg-gray-800 rounded-full text-gray-400 text-sm">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* FAQs - Accordion */}
                        {blog.faqs && blog.faqs.length > 0 && (
                            <div className="mt-8 pt-8 border-t border-gray-800">
                                <h3 className="text-xl font-bold text-white mb-4">❓ Frequently Asked Questions</h3>
                                <div className="space-y-3">
                                    {blog.faqs.map((faq, index) => (
                                        <FAQItem key={index} faq={faq} index={index} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* ============ RECENT & CATEGORIES - NICHE ============ */}
                    <div className="mt-12 pt-8 border-t border-gray-800">
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Recent Blogs */}
                            {recentBlogs && recentBlogs.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-4">📝 Recent Posts</h3>
                                    <div className="space-y-3">
                                        {recentBlogs.map((post) => (
                                            <Link href={`/blog/${post.slug}`} key={post._id} prefetch={false}>
                                                <div className="group flex gap-3 hover:bg-gray-800/50 p-3 rounded-lg transition">
                                                    {post.image && (
                                                        <img
                                                            src={`${API_BASE_URL}${post.image}`}
                                                            alt={post.title}
                                                            className="w-16 h-16 object-cover rounded-lg flex-shrink-0"
                                                            loading="lazy"
                                                            onError={(e) => {
                                                                e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="64" height="64" fill="%23333"%3E%3Crect width="64" height="64"/%3E%3C/svg%3E';
                                                            }}
                                                        />
                                                    )}
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="text-white text-sm font-medium group-hover:text-[#00B7B3] transition line-clamp-2">
                                                            {post.title}
                                                        </h4>
                                                        <p className="text-gray-500 text-xs mt-1">
                                                            {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-IN')}
                                                        </p>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Categories */}
                            {blog.categories && blog.categories.length > 0 && (
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-4">📂 Categories</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {blog.categories.map((cat, index) => (
                                            <Link
                                                key={index}
                                                href={`/blog?category=${cat}`}
                                                className="px-3 py-1.5 bg-gray-800 rounded-full text-gray-300 text-sm hover:bg-[#00B7B3]/20 hover:text-[#00B7B3] transition"
                                            >
                                                {cat}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Related Posts */}
                    {related && related.length > 0 && (
                        <div className="mt-8 pt-8 border-t border-gray-800">
                            <h3 className="text-xl font-bold text-white mb-6">Related Posts</h3>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {related.map((post) => (
                                    <Link href={`/blog/${post.slug}`} key={post._id} prefetch={false}>
                                        <div className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 hover:border-[#00B7B3] transition p-4">
                                            {post.image && (
                                                <img
                                                    src={`${API_BASE_URL}${post.image}`}
                                                    alt={post.title}
                                                    className="w-full h-32 object-cover rounded-lg mb-3"
                                                    loading="lazy"
                                                    onError={(e) => {
                                                        e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="200" fill="%23333"%3E%3Crect width="400" height="200"/%3E%3C/svg%3E';
                                                    }}
                                                />
                                            )}
                                            <h4 className="text-white font-semibold hover:text-[#00B7B3] transition line-clamp-2">
                                                {post.title}
                                            </h4>
                                            <p className="text-gray-500 text-xs mt-2">
                                                {new Date(post.publishedAt || post.createdAt).toLocaleDateString('en-IN')}
                                            </p>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </PublicLayout>
        </>
    );
}

// ✅ ISR - Incremental Static Regeneration
export async function getStaticProps({ params }) {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        
        const res = await fetch(`${baseUrl}/api/blog/${params.slug}`);
        const data = await res.json();

        if (!data.success) {
            return { notFound: true };
        }

        const recentRes = await fetch(`${baseUrl}/api/blog?limit=5`);
        const recentData = await recentRes.json();
        const recentBlogs = (recentData.data || [])
            .filter(b => b.slug !== params.slug)
            .slice(0, 4);

        return {
            props: {
                blog: data.data || null,
                related: data.related || [],
                recentBlogs: recentBlogs || []
            },
            revalidate: 60
        };
    } catch (error) {
        console.error('Error fetching blog:', error);
        return { notFound: true };
    }
}

export async function getStaticPaths() {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/blog?limit=100`);
        const data = await res.json();
        
        const paths = (data.data || [])
            .filter(blog => blog.isPublished !== false)
            .map((blog) => ({
                params: { slug: blog.slug }
            }));

        return {
            paths,
            fallback: 'blocking'
        };
    } catch (error) {
        console.error('Error generating paths:', error);
        return {
            paths: [],
            fallback: 'blocking'
        };
    }
}