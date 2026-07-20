// import React from 'react';
// import Link from 'next/link';
// import Head from 'next/head';
// import PublicLayout from '../../src/public/layout/PublicLayout';

// const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
// const ITEMS_PER_PAGE = 12;

// export default function BlogList({ blogs, pagination }) {
//     return (
//         <>
//             <Head>
//                 <title>Blog | NB Astro - Vedic Astrology & Vastu Articles</title>
//                 <meta name="description" content="Read insightful articles on Vedic astrology, Vastu Shastra, spirituality, and personal growth." />
//                 <meta name="keywords" content="astrology blog, vastu articles, vedic astrology, Naveen Bhagat" />
//                 <link rel="canonical" href="https://nbastro.com/blog" />
//                 <meta property="og:title" content="Blog | NB Astro" />
//                 <meta property="og:description" content="Read insightful articles on Vedic astrology, Vastu Shastra, spirituality." />
//                 <meta property="og:type" content="website" />
//                 <meta name="twitter:card" content="summary_large_image" />
//             </Head>

//             <PublicLayout>
//                 <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
//                     {/* Header */}
//                     <div className="text-center mb-8 sm:mb-12">
//                         <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
//                             Blog
//                         </h1>
//                         <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
//                             Explore articles on astrology, vastu, spirituality, and personal growth.
//                         </p>
//                     </div>

//                     {/* Blog Grid */}
//                     {blogs.length === 0 ? (
//                         <div className="text-center py-12 bg-gray-900/50 rounded-xl border border-gray-800">
//                             <p className="text-gray-400">No blogs found. Check back soon!</p>
//                         </div>
//                     ) : (
//                         <>
//                             <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
//                                 {blogs.map((blog) => (
//                                     <Link 
//                                         href={`/blog/${blog.slug}`} 
//                                         key={blog._id}
//                                         prefetch={false}
//                                     >
//                                         <div className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-[#00B7B3] transition-all duration-300 hover:transform hover:scale-[1.02] cursor-pointer h-full">
//                                             {blog.image && (
//                                                 <div className="relative h-48 overflow-hidden bg-gray-800">
//                                                     <img
//                                                         src={`${API_BASE_URL}${blog.image}`}
//                                                         alt={blog.title}
//                                                         className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
//                                                         loading="lazy"
//                                                         width="400"
//                                                         height="250"
//                                                         onError={(e) => {
//                                                             e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="250" fill="%23333"%3E%3Crect width="400" height="250"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23666" font-size="16"%3ENo Image%3C/text%3E%3C/svg%3E';
//                                                         }}
//                                                     />
//                                                     {blog.isFeatured && (
//                                                         <span className="absolute top-3 right-3 bg-yellow-500 text-black text-xs px-2.5 py-1 rounded-full font-semibold">
//                                                             ⭐ Featured
//                                                         </span>
//                                                     )}
//                                                 </div>
//                                             )}
//                                             <div className="p-4 sm:p-6">
//                                                 <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
//                                                     <span className="text-[#00B7B3] text-xs sm:text-sm font-medium">
//                                                         {blog.categories?.[0] || 'General'}
//                                                     </span>
//                                                     <span className="text-gray-600 text-xs">•</span>
//                                                     <span className="text-gray-500 text-xs sm:text-sm">
//                                                         {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-IN', {
//                                                             day: '2-digit',
//                                                             month: 'short',
//                                                             year: 'numeric'
//                                                         })}
//                                                     </span>
//                                                     <span className="text-gray-600 text-xs">•</span>
//                                                     <span className="text-gray-500 text-xs sm:text-sm">
//                                                         {blog.readTime || 5} min read
//                                                     </span>
//                                                 </div>
//                                                 <h2 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#00B7B3] transition line-clamp-2">
//                                                     {blog.title}
//                                                 </h2>
//                                                 <p className="text-gray-400 text-sm line-clamp-2">
//                                                     {blog.excerpt}
//                                                 </p>
//                                                 <div className="mt-3 sm:mt-4 flex items-center gap-2">
//                                                     <span className="text-[#00B7B3] text-sm font-medium">Read More →</span>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </Link>
//                                 ))}
//                             </div>

//                             {/* Pagination */}
//                             {pagination && pagination.pages > 1 && (
//                                 <div className="flex justify-center items-center gap-3 mt-8 sm:mt-12">
//                                     {pagination.page > 1 && (
//                                         <Link
//                                             href={`/blog/page/${pagination.page - 1}`}
//                                             className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition text-sm sm:text-base"
//                                             prefetch={false}
//                                         >
//                                             ← Previous
//                                         </Link>
//                                     )}
//                                     <span className="text-gray-400 text-sm sm:text-base">
//                                         Page {pagination.page} of {pagination.pages}
//                                     </span>
//                                     {pagination.page < pagination.pages && (
//                                         <Link
//                                             href={`/blog/page/${pagination.page + 1}`}
//                                             className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition text-sm sm:text-base"
//                                             prefetch={false}
//                                         >
//                                             Next →
//                                         </Link>
//                                     )}
//                                 </div>
//                             )}
//                         </>
//                     )}
//                 </div>
//             </PublicLayout>
//         </>
//     );
// }

// // ✅ ISR - First page
// export async function getStaticProps() {
//     try {
//         const res = await fetch(
//             `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/blog?limit=${ITEMS_PER_PAGE}&page=1`
//         );
//         const data = await res.json();
        
//         return {
//             props: {
//                 blogs: data.data || [],
//                 pagination: data.pagination || { page: 1, pages: 1, total: 0 }
//             },
//             revalidate: 60
//         };
//     } catch (error) {
//         console.error('Error fetching blogs:', error);
//         return {
//             props: {
//                 blogs: [],
//                 pagination: { page: 1, pages: 1, total: 0 }
//             },
//             revalidate: 60
//         };
//     }
// }


import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PublicLayout from '../../src/public/layout/PublicLayout';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';
const ITEMS_PER_PAGE = 12;

export default function BlogList({ blogs, pagination, allCategories }) {
    const router = useRouter();
    const [selectedCategory, setSelectedCategory] = useState(router.query.category || '');
    const [searchQuery, setSearchQuery] = useState('');

    // ✅ Filter blogs by category and search
    const filteredBlogs = blogs.filter(blog => {
        let match = true;
        
        // Category filter
        if (selectedCategory) {
            const blogCategory = blog.category || blog.categories?.[0] || '';
            match = match && blogCategory.toLowerCase() === selectedCategory.toLowerCase();
        }
        
        // Search filter
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase();
            match = match && (
                blog.title?.toLowerCase().includes(query) ||
                blog.excerpt?.toLowerCase().includes(query) ||
                blog.content?.toLowerCase().includes(query)
            );
        }
        
        return match;
    });

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        setSelectedCategory(category);
        // Update URL
        if (category) {
            router.push(`/blog?category=${category}`, undefined, { shallow: true });
        } else {
            router.push('/blog', undefined, { shallow: true });
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        // Search is already handled by state
    };

    return (
        <>
            <Head>
                <title>Blog | NB Astro - Vedic Astrology & Vastu Articles</title>
                <meta name="description" content="Read insightful articles on Vedic astrology, Vastu Shastra, spirituality, and personal growth." />
                <meta name="keywords" content="astrology blog, vastu articles, vedic astrology, Naveen Bhagat" />
                <link rel="canonical" href="https://nbastro.com/blog" />
                <meta property="og:title" content="Blog | NB Astro" />
                <meta property="og:description" content="Read insightful articles on Vedic astrology, Vastu Shastra, spirituality." />
                <meta property="og:type" content="website" />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>

            <PublicLayout>
                <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
                    {/* Header */}
                    <div className="text-center mb-8 sm:mb-12">
                        <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3 sm:mb-4">
                            Blog
                        </h1>
                        <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
                            Explore articles on astrology, vastu, spirituality, and personal growth.
                        </p>
                    </div>

                    {/* ✅ Filter & Search Bar */}
                    <div className="flex flex-wrap items-center gap-4 mb-8 p-4 bg-gray-900/50 rounded-xl border border-gray-800">
                        {/* Category Filter */}
                        <div className="flex-1 min-w-[200px]">
                            <select
                                value={selectedCategory}
                                onChange={handleCategoryChange}
                                className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white focus:border-[#00B7B3] outline-none"
                            >
                                <option value="">All Categories</option>
                                {allCategories.map((cat) => (
                                    <option key={cat} value={cat}>
                                        {cat}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Search */}
                        <form onSubmit={handleSearch} className="flex-1 min-w-[200px]">
                            <div className="relative">
                                <input
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    placeholder="Search blogs..."
                                    className="w-full px-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#00B7B3] outline-none"
                                />
                                <button
                                    type="submit"
                                    className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#00B7B3] text-black rounded-md hover:bg-[#33C5C2] transition text-sm font-medium"
                                >
                                    Search
                                </button>
                            </div>
                        </form>

                        {/* Clear Filters */}
                        {(selectedCategory || searchQuery) && (
                            <button
                                onClick={() => {
                                    setSelectedCategory('');
                                    setSearchQuery('');
                                    router.push('/blog', undefined, { shallow: true });
                                }}
                                className="px-4 py-2.5 bg-red-500/20 text-red-400 rounded-lg hover:bg-red-500/30 transition text-sm"
                            >
                                ✕ Clear Filters
                            </button>
                        )}
                    </div>

                    {/* Results Count */}
                    <p className="text-gray-400 text-sm mb-4">
                        Showing {filteredBlogs.length} {filteredBlogs.length === 1 ? 'blog' : 'blogs'}
                    </p>

                    {/* Blog Grid */}
                    {filteredBlogs.length === 0 ? (
                        <div className="text-center py-12 bg-gray-900/50 rounded-xl border border-gray-800">
                            <p className="text-gray-400">No blogs found matching your criteria.</p>
                            <button
                                onClick={() => {
                                    setSelectedCategory('');
                                    setSearchQuery('');
                                    router.push('/blog', undefined, { shallow: true });
                                }}
                                className="text-[#00B7B3] hover:underline text-sm mt-2"
                            >
                                Clear all filters
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                                {filteredBlogs.map((blog) => (
                                    <Link 
                                        href={`/blog/${blog.slug}`} 
                                        key={blog._id}
                                        prefetch={false}
                                    >
                                        <div className="group bg-gray-900 rounded-xl overflow-hidden border border-gray-800 hover:border-[#00B7B3] transition-all duration-300 hover:transform hover:scale-[1.02] cursor-pointer h-full">
                                            {blog.image && (
                                                <div className="relative h-48 overflow-hidden bg-gray-800">
                                                    <img
                                                        src={`${API_BASE_URL}${blog.image}`}
                                                        alt={blog.title}
                                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                                        loading="lazy"
                                                        width="400"
                                                        height="250"
                                                        onError={(e) => {
                                                            e.target.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="250" fill="%23333"%3E%3Crect width="400" height="250"/%3E%3Ctext x="50%25" y="50%25" text-anchor="middle" dy=".3em" fill="%23666" font-size="16"%3ENo Image%3C/text%3E%3C/svg%3E';
                                                        }}
                                                    />
                                                    {blog.isFeatured && (
                                                        <span className="absolute top-3 right-3 bg-yellow-500 text-black text-xs px-2.5 py-1 rounded-full font-semibold">
                                                            ⭐ Featured
                                                        </span>
                                                    )}
                                                    {/* ✅ Category Badge on Image */}
                                                    {blog.category && (
                                                        <span className="absolute bottom-3 left-3 bg-[#00B7B3]/90 text-black text-xs px-2.5 py-1 rounded-full font-semibold">
                                                            {blog.category}
                                                        </span>
                                                    )}
                                                </div>
                                            )}
                                            <div className="p-4 sm:p-6">
                                                <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
                                                    <span className="text-[#00B7B3] text-xs sm:text-sm font-medium">
                                                        {blog.category || blog.categories?.[0] || 'General'}
                                                    </span>
                                                    <span className="text-gray-600 text-xs">•</span>
                                                    <span className="text-gray-500 text-xs sm:text-sm">
                                                        {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString('en-IN', {
                                                            day: '2-digit',
                                                            month: 'short',
                                                            year: 'numeric'
                                                        })}
                                                    </span>
                                                    <span className="text-gray-600 text-xs">•</span>
                                                    <span className="text-gray-500 text-xs sm:text-sm">
                                                        {blog.readTime || 5} min read
                                                    </span>
                                                </div>
                                                <h2 className="text-lg sm:text-xl font-bold text-white mb-2 group-hover:text-[#00B7B3] transition line-clamp-2">
                                                    {blog.title}
                                                </h2>
                                                <p className="text-gray-400 text-sm line-clamp-2">
                                                    {blog.excerpt}
                                                </p>
                                                <div className="mt-3 sm:mt-4 flex items-center gap-2">
                                                    <span className="text-[#00B7B3] text-sm font-medium">Read More →</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>

                            {/* Pagination */}
                            {pagination && pagination.pages > 1 && filteredBlogs.length === blogs.length && (
                                <div className="flex justify-center items-center gap-3 mt-8 sm:mt-12">
                                    {pagination.page > 1 && (
                                        <Link
                                            href={`/blog/page/${pagination.page - 1}`}
                                            className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition text-sm sm:text-base"
                                            prefetch={false}
                                        >
                                            ← Previous
                                        </Link>
                                    )}
                                    <span className="text-gray-400 text-sm sm:text-base">
                                        Page {pagination.page} of {pagination.pages}
                                    </span>
                                    {pagination.page < pagination.pages && (
                                        <Link
                                            href={`/blog/page/${pagination.page + 1}`}
                                            className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition text-sm sm:text-base"
                                            prefetch={false}
                                        >
                                            Next →
                                        </Link>
                                    )}
                                </div>
                            )}
                        </>
                    )}
                </div>
            </PublicLayout>
        </>
    );
}

// ✅ ISR - First page
export async function getStaticProps() {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        
        // Fetch blogs
        const res = await fetch(`${baseUrl}/api/blog?limit=${ITEMS_PER_PAGE}&page=1`);
        const data = await res.json();
        
        // Fetch all categories from blogs
        const allRes = await fetch(`${baseUrl}/api/blog?limit=100`);
        const allData = await allRes.json();
        
        // Extract unique categories
        const categories = new Set();
        (allData.data || []).forEach(blog => {
            if (blog.category) categories.add(blog.category);
            if (blog.categories) {
                blog.categories.forEach(cat => categories.add(cat));
            }
        });
        
        return {
            props: {
                blogs: data.data || [],
                pagination: data.pagination || { page: 1, pages: 1, total: 0 },
                allCategories: Array.from(categories).filter(Boolean).sort()
            },
            revalidate: 60
        };
    } catch (error) {
        console.error('Error fetching blogs:', error);
        return {
            props: {
                blogs: [],
                pagination: { page: 1, pages: 1, total: 0 },
                allCategories: []
            },
            revalidate: 60
        };
    }
}