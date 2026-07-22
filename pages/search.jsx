import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Head from 'next/head';
import PublicLayout from '../src/public/layout/PublicLayout';
import { Search, Sparkles, BookOpen, User, HelpCircle, Loader2 } from 'lucide-react';

export default function SearchResultsPage() {
    const router = useRouter();
    const { q } = router.query;
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (q) {
            setQuery(q);
            performSearch(q);
        }
    }, [q]);

    const performSearch = async (searchTerm) => {
        setLoading(true);
        try {
            const response = await fetch(`/api/search?q=${encodeURIComponent(searchTerm)}`);
            const result = await response.json();
            if (result.success) {
                setResults(result.data || []);
            }
        } catch (error) {
            console.error('Search failed:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/search?q=${encodeURIComponent(query)}`);
        }
    };

    const highlightText = (text, search) => {
        if (!search || !text) return text;
        const escapedSearch = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const parts = String(text).split(new RegExp(`(${escapedSearch})`, 'gi'));
        return (
            <span>
                {parts.map((part, idx) => 
                    part.toLowerCase() === search.toLowerCase() ? (
                        <mark key={idx} className="bg-[#00B7B3]/30 text-white font-semibold px-0.5 rounded">
                            {part}
                        </mark>
                    ) : (
                        part
                    )
                )}
            </span>
        );
    };

    const getIcon = (type) => {
        switch (type) {
            case 'Blog':
                return <BookOpen className="w-5 h-5 text-[#00B7B3]" />;
            case 'Course':
                return <Sparkles className="w-5 h-5 text-[#33C5C2]" />;
            default:
                return <User className="w-5 h-5 text-purple-400" />;
        }
    };

    return (
        <>
            <Head>
                <title>Search Results | NB Astro</title>
                <meta name="robots" content="noindex, nofollow" />
            </Head>

            <PublicLayout>
                <div className="max-w-4xl mx-auto px-4 py-12 min-h-[60vh]">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-bold text-white mb-4">
                            Search <span className="text-[#00B7B3]">Results</span>
                        </h1>
                        <p className="text-gray-400">
                            Search results across all consultations, courses, and articles
                        </p>
                    </div>

                    {/* Search Bar */}
                    <form onSubmit={handleSearchSubmit} className="mb-10 max-w-2xl mx-auto">
                        <div className="relative">
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                placeholder="Search consultations, courses, blogs..."
                                className="w-full px-5 py-3.5 bg-black/60 border border-[#00B7B3]/30 focus:border-[#00B7B3] outline-none text-base rounded-xl transition-all text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00B7B3]/20"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 px-5 py-2 bg-[#00B7B3] text-black rounded-lg hover:bg-[#33C5C2] transition-all font-semibold flex items-center gap-2"
                            >
                                <Search size={18} />
                                Search
                            </button>
                        </div>
                    </form>

                    {/* Results */}
                    {loading ? (
                        <div className="text-center py-16">
                            <Loader2 className="w-12 h-12 text-[#00B7B3] animate-spin mx-auto mb-4" />
                            <p className="text-gray-400">Searching the heavens...</p>
                        </div>
                    ) : (
                        <div className="space-y-6">
                            {results.length > 0 ? (
                                <>
                                    <p className="text-gray-400 text-sm">
                                        Found {results.length} results for &quot;<span className="text-white">{q}</span>&quot;
                                    </p>
                                    <div className="space-y-4">
                                        {results.map((result, idx) => (
                                            <Link href={result.link} key={result.id || idx} className="block group">
                                                <div className="bg-[#111a22]/60 hover:bg-[#162530]/80 border border-white/5 hover:border-[#00B7B3]/30 rounded-xl p-5 transition-all duration-300">
                                                    <div className="flex gap-4">
                                                        <div className="w-10 h-10 rounded-lg bg-[#00B7B3]/10 border border-[#00B7B3]/20 flex items-center justify-center flex-shrink-0">
                                                            {getIcon(result.type)}
                                                        </div>
                                                        <div className="flex-1">
                                                            <div className="flex items-center gap-3 mb-1 flex-wrap">
                                                                <h2 className="text-xl font-bold text-white group-hover:text-[#00B7B3] transition-colors">
                                                                    {highlightText(result.title, q)}
                                                                </h2>
                                                                <span className="text-xs px-2.5 py-0.5 bg-white/5 text-gray-400 rounded-full font-medium">
                                                                    {result.type}
                                                                </span>
                                                                {result.category && (
                                                                    <span className="text-xs px-2.5 py-0.5 bg-[#00B7B3]/10 text-[#00B7B3] rounded-full font-medium">
                                                                        {result.category}
                                                                    </span>
                                                                )}
                                                            </div>
                                                            <p className="text-gray-400 text-sm leading-relaxed mt-2 line-clamp-3">
                                                                {highlightText(result.snippet, q)}
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </>
                            ) : q ? (
                                <div className="text-center py-16 bg-[#111a22]/20 border border-white/5 rounded-2xl">
                                    <HelpCircle className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                                    <h3 className="text-lg font-bold text-white mb-2">No Results Found</h3>
                                    <p className="text-gray-400 max-w-md mx-auto">
                                        We couldn't find anything matching &quot;{q}&quot;. Try using other keywords or browse our menus.
                                    </p>
                                </div>
                            ) : (
                                <div className="text-center py-16">
                                    <p className="text-gray-500">Enter a query above to start searching.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </PublicLayout>
        </>
    );
}
