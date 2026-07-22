

// import React, { useState, useEffect } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';

// const Header = () => {
//     const [isOpen, setIsOpen] = useState(false);
//     const [searchQuery, setSearchQuery] = useState('');
//     const [scrolled, setScrolled] = useState(false);
//     const router = useRouter();

//     // ============================================
//     // NAVIGATION DATA
//     // ============================================
//     const menuItems = [
//         { name: 'HOME', href: '/' },
//         { name: 'ASTROLOGY CONSULTATION', href: '/astrology-consultation' },
//         { name: 'VASTU CONSULTATION', href: '/vastu-consultation' },
//         { name: 'ASTROLOGY  COURSES', href: '/astrologer-courses' },
//          { name: 'VASTU COURSES', href: '/vastu-courses' },
//         { name: 'ABOUT NAVEEN BHAGAT', href: '/about' },
//         { name: 'GET IN TOUCH', href: '/contact' }
//     ];

//     // ============================================
//     // SCROLL EFFECT
//     // ============================================
//     useEffect(() => {
//         const handleScroll = () => {
//             setScrolled(window.scrollY > 20);
//         };
//         window.addEventListener('scroll', handleScroll);
//         return () => window.removeEventListener('scroll', handleScroll);
//     }, []);

//     // ============================================
//     // HANDLE SEARCH
//     // ============================================
//     const handleSearch = (e) => {
//         e.preventDefault();
//         if (searchQuery.trim()) {
//             window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
//             setIsOpen(false);
//         }
//     };

//     // ============================================
//     // CHECK ACTIVE LINK
//     // ============================================
//     const isActive = (href) => {
//         const pathname = router.asPath?.split('?')[0] || '/';
//         if (href === '/') return pathname === '/';
//         return pathname.startsWith(href);
//     };

//     return (
//         <header className="fixed top-0 left-0 w-full z-50">
//             {/* MAIN HEADER - PREMIUM GLASS EFFECT */}
//             <div 
//                 className={`w-full transition-all duration-500 ${
//                     scrolled 
//                         ? 'bg-black/95 backdrop-blur-xl shadow-2xl' 
//                         : 'bg-gradient-to-b from-black via-black to-black/95'
//                 }`}
//             >
//                 {/* ============================================ */}
//                 {/* TOP BAR - ALWAYS VISIBLE WITH NUMBERS */}
//                 {/* ============================================ */}
//                 <div className="border-b border-[#00B7B3]/20">
//                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        
//                         {/* DESKTOP TOP BAR */}
//                         <div className="hidden md:flex items-center justify-between py-3">
//                             {/* LOGO */}
//                             <Link href="/" onClick={() => setIsOpen(false)} className="flex-shrink-0 group">
//                                 <span className="text-2xl font-bold tracking-tight">
//                                     <span className="text-[#00B7B3] group-hover:text-[#33C5C2] transition-colors">NB</span>
//                                     <span className="text-white"> Astro</span>
//                                 </span>
//                             </Link>

//                             {/* SEARCH BAR */}
//                             <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-8">
//                                 <div className="relative">
//                                     <input
//                                         type="text"
//                                         value={searchQuery}
//                                         onChange={(e) => setSearchQuery(e.target.value)}
//                                         placeholder="🔍 Search consultations, courses..."
//                                         className="w-full px-5 py-2.5 bg-black/60 border border-[#00B7B3]/30 focus:border-[#00B7B3] outline-none text-sm rounded-lg transition-all text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00B7B3]/20"
//                                     />
//                                     <button 
//                                         type="submit" 
//                                         className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#00B7B3] text-black rounded-md hover:bg-[#33C5C2] transition-all text-xs font-medium"
//                                     >
//                                         Search
//                                     </button>
//                                 </div>
//                             </form>

//                             {/* CONTACT CARDS */}
//                             <div className="flex items-center space-x-3">
//                                 <a href="tel:+919953442381" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-[#00B7B3]/30 hover:border-[#00B7B3] transition-all group">
//                                     <span className="text-[#00B7B3] group-hover:scale-110 transition-transform">📞</span>
//                                     <span className="text-xs font-medium text-white/90">+91 995 344 2381</span>
//                                 </a>
//                                 <a href="mailto:nbastro108@gmail.com" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-[#00B7B3]/30 hover:border-[#00B7B3] transition-all group">
//                                     <span className="text-[#00B7B3] group-hover:scale-110 transition-transform">✉️</span>
//                                     <span className="text-xs font-medium text-white/90">nbastro108@gmail.com</span>
//                                 </a>
//                             </div>
//                         </div>

//                         {/* ============================================ */}
//                         {/* MOBILE TOP BAR - NUMBERS ALWAYS VISIBLE */}
//                         {/* ============================================ */}
//                         <div className="md:hidden py-2">
//                             {/* Row 1: Logo and Search */}
//                             <div className="flex items-center justify-between gap-2">
//                                 <Link href="/" onClick={() => setIsOpen(false)} className="flex-shrink-0">
//                                     <span className="text-xl font-bold">
//                                         <span className="text-[#00B7B3]">NB</span>
//                                         <span className="text-white"> Astro</span>
//                                     </span>
//                                 </Link>

//                                 <form onSubmit={handleSearch} className="flex-1 max-w-[180px]">
//                                     <div className="relative">
//                                         <input
//                                             type="text"
//                                             value={searchQuery}
//                                             onChange={(e) => setSearchQuery(e.target.value)}
//                                             placeholder="Search..."
//                                             className="w-full px-3 py-1.5 bg-black/60 border border-[#00B7B3]/30 rounded-lg text-white placeholder-gray-500 text-xs focus:border-[#00B7B3] outline-none"
//                                         />
//                                     </div>
//                                 </form>
//                             </div>

//                             {/* Row 2: Contact Numbers - ALWAYS VISIBLE */}
//                             <div className="flex items-center justify-between gap-2 mt-2">
//                                 <a href="tel:+919953442381" className="flex-1 flex items-center justify-center gap-2 px-2 py-2 bg-black/40 border border-[#00B7B3]/30 rounded-lg hover:border-[#00B7B3] transition-all">
//                                     <span className="text-[#00B7B3] text-sm">📞</span>
//                                     <span className="text-white/90 text-xs font-medium">+91 995 344 2381</span>
//                                 </a>
//                                 <a href="mailto:nbastro108@gmail.com" className="flex-1 flex items-center justify-center gap-2 px-2 py-2 bg-black/40 border border-[#00B7B3]/30 rounded-lg hover:border-[#00B7B3] transition-all">
//                                     <span className="text-[#00B7B3] text-sm">✉️</span>
//                                     <span className="text-white/90 text-xs font-medium truncate">nbastro108@gmail.com</span>
//                                 </a>
//                             </div>
//                         </div>
//                     </div>
//                 </div>

//                 {/* ============================================ */}
//                 {/* NAVIGATION BAR - ALWAYS VISIBLE */}
//                 {/* ============================================ */}
//                 <div className="bg-[#00B7B3] text-black">
//                     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//                         <div className="flex justify-between items-center h-12 md:h-14">
                            
//                             {/* DESKTOP MENU */}
//                             <div className="hidden md:flex items-center justify-center w-full space-x-1">
//                                 {menuItems.map((item, index) => (
//                                     <Link
//                                         key={index}
//                                         href={item.href}
//                                         className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group overflow-hidden ${
//                                             isActive(item.href) 
//                                                 ? 'text-black font-semibold' 
//                                                 : 'text-black/80 hover:text-black'
//                                         }`}
//                                     >
//                                         <span className="absolute inset-0 bg-black/5 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
//                                         <span className="relative z-10">{item.name}</span>
                                        
//                                         {/* Active Indicator - UNDERLINE INSTEAD OF DOT */}
//                                         {isActive(item.href) && (
//                                             <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-100 transition-transform duration-300"></span>
//                                         )}
                                        
//                                         {/* Hover underline effect */}
//                                         <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
//                                     </Link>
//                                 ))}
//                             </div>

//                             {/* MOBILE MENU BUTTON */}
//                             <button 
//                                 onClick={() => setIsOpen(true)}
//                                 className="md:hidden w-full flex items-center justify-between text-sm font-bold text-black py-2 group"
//                             >
//                                 <span className="flex items-center gap-3">
//                                     <div className="space-y-1">
//                                         <div className="w-5 h-0.5 bg-black group-hover:w-6 transition-all"></div>
//                                         <div className="w-5 h-0.5 bg-black group-hover:w-4 transition-all"></div>
//                                         <div className="w-5 h-0.5 bg-black group-hover:w-6 transition-all"></div>
//                                     </div>
//                                     <span className="tracking-wider">MENU</span>
//                                 </span>
                                
//                                 <span className="px-3 py-1 bg-black text-[#00B7B3] rounded-full text-xs font-semibold">
//                                     Book Now
//                                 </span>
//                             </button>
//                         </div>
//                     </div>
//                 </div>

//                 {/* MOBILE DRAWER */}
//                 {isOpen && (
//                     <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100]">
//                         <div className="fixed right-0 top-0 h-full w-[85%] max-w-sm bg-gradient-to-b from-gray-900 to-black border-l-2 border-[#00B7B3] shadow-2xl flex flex-col">
                            
//                             <div className="flex items-center justify-between p-6 border-b border-[#00B7B3]/20">
//                                 <span className="text-xl font-bold">
//                                     <span className="text-[#00B7B3]">NB</span>
//                                     <span className="text-white"> Astro</span>
//                                 </span>
//                                 <button
//                                     onClick={() => setIsOpen(false)}
//                                     className="w-10 h-10 flex items-center justify-center rounded-full bg-[#00B7B3]/10 text-[#00B7B3] hover:bg-[#00B7B3] hover:text-black transition-all"
//                                 >
//                                     ✕
//                                 </button>
//                             </div>

//                             <div className="flex-1 overflow-y-auto py-6 px-4">
//                                 <div className="space-y-2">
//                                     {menuItems.map((item, index) => (
//                                         <Link
//                                             key={index}
//                                             href={item.href}
//                                             onClick={() => setIsOpen(false)}
//                                             className={`block px-4 py-3 rounded-xl transition-all duration-300 ${
//                                                 isActive(item.href)
//                                                     ? 'bg-[#00B7B3] text-black font-semibold'
//                                                     : 'bg-black/40 text-white/90 hover:bg-[#00B7B3]/10 hover:text-[#00B7B3] border border-[#00B7B3]/10'
//                                             }`}
//                                         >
//                                             {item.name}
//                                         </Link>
//                                     ))}
//                                 </div>
//                             </div>

//                             <div className="p-6 border-t border-[#00B7B3]/20 space-y-4">
//                                 <div className="space-y-2">
//                                     <a href="tel:+919953442381" className="flex items-center gap-3 px-4 py-3 bg-black/40 rounded-xl border border-[#00B7B3]/20">
//                                         <span className="text-[#00B7B3]">📞</span>
//                                         <span className="text-white/90 text-sm">+91 995 344 2381</span>
//                                     </a>
//                                     <a href="mailto:nbastro108@gmail.com" className="flex items-center gap-3 px-4 py-3 bg-black/40 rounded-xl border border-[#00B7B3]/20">
//                                         <span className="text-[#00B7B3]">✉️</span>
//                                         <span className="text-white/90 text-sm">nbastro108@gmail.com</span>
//                                     </a>
//                                 </div>

//                                 <Link
//                                     href="/contact"
//                                     onClick={() => setIsOpen(false)}
//                                     className="block text-center py-3 bg-[#00B7B3] text-black rounded-xl font-bold hover:bg-[#33C5C2] transform hover:scale-105 transition-all"
//                                 >
//                                     Book Consultation
//                                 </Link>
//                             </div>
//                         </div>
//                     </div>
//                 )}
//             </div>

//             {/* SPACER - FIXED HEIGHT FOR STICKY HEADER */}
//             <div className="h-28 md:h-36"></div>
//         </header>
//     );
// };

// // Premium Animations
// const styles = `
//     @keyframes slideIn {
//         from { transform: translateX(100%); }
//         to { transform: translateX(0); }
//     }
    
//     .animate-slideIn {
//         animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
//     }
    
//     .custom-scrollbar::-webkit-scrollbar {
//         width: 4px;
//     }
    
//     .custom-scrollbar::-webkit-scrollbar-track {
//         background: rgba(0, 183, 179, 0.05);
//     }
    
//     .custom-scrollbar::-webkit-scrollbar-thumb {
//         background: #00B7B3;
//         border-radius: 4px;
//     }
// `;

// if (typeof document !== 'undefined') {
//     const styleSheet = document.createElement("style");
//     styleSheet.innerText = styles;
//     document.head.appendChild(styleSheet);
// }

// export default Header;


import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [scrolled, setScrolled] = useState(false);
    const router = useRouter();

    // ============================================
    // NAVIGATION DATA - ✅ BLOG ADDED
    // ============================================
    const menuItems = [
        { name: 'HOME', href: '/' },
        { name: 'ASTROLOGY CONSULTATION', href: '/astrology-consultation' },
        { name: 'VASTU CONSULTATION', href: '/vastu-consultation' },
        { name: 'ASTROLOGY COURSES', href: '/astrologer-courses' },
        { name: 'VASTU COURSES', href: '/vastu-courses' },
        { name: 'BLOG', href: '/blog' },  // ✅ NEW
        { name: 'ABOUT NAVEEN BHAGAT', href: '/about' },
        { name: 'GET IN TOUCH', href: '/contact' }
    ];

    // ============================================
    // SCROLL EFFECT
    // ============================================
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // ============================================
    // IN-PAGE SEARCH HIGHLIGHTING (CTRL+F EFFECT)
    // ============================================
    useEffect(() => {
        const mainElement = document.querySelector('main');
        if (!mainElement) return;

        const removeDOMHighlights = (root) => {
            const highlights = root.querySelectorAll('mark.custom-highlight');
            highlights.forEach(mark => {
                const parent = mark.parentNode;
                if (parent) {
                    const textNode = document.createTextNode(mark.textContent);
                    parent.replaceChild(textNode, mark);
                    parent.normalize();
                }
            });
        };

        removeDOMHighlights(mainElement);

        if (!searchQuery || searchQuery.trim() === '') return;

        try {
            const escapedTerm = searchQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const regex = new RegExp(`(${escapedTerm})`, 'gi');

            const walk = document.createTreeWalker(
                mainElement,
                NodeFilter.SHOW_TEXT,
                {
                    acceptNode: (node) => {
                        const parent = node.parentElement;
                        if (!parent) return NodeFilter.FILTER_REJECT;
                        const tagName = parent.tagName.toLowerCase();
                        if (['script', 'style', 'textarea', 'input', 'mark', 'button'].includes(tagName)) {
                            return NodeFilter.FILTER_REJECT;
                        }
                        return node.textContent.match(regex) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP;
                    }
                },
                false
            );

            const nodes = [];
            while (walk.nextNode()) {
                nodes.push(walk.currentNode);
            }

            nodes.forEach(node => {
                const parent = node.parentNode;
                if (!parent) return;

                const text = node.textContent;
                const parts = text.split(regex);

                const fragment = document.createDocumentFragment();
                parts.forEach(part => {
                    if (part.match(regex)) {
                        const mark = document.createElement('mark');
                        mark.className = 'bg-[#00B7B3] text-black font-semibold rounded px-0.5 custom-highlight';
                        mark.textContent = part;
                        fragment.appendChild(mark);
                    } else {
                        fragment.appendChild(document.createTextNode(part));
                    }
                });

                parent.replaceChild(fragment, node);
            });
        } catch (err) {
            console.error('In-page highlight failed:', err);
        }
    }, [searchQuery, router.asPath]);

    // ============================================
    // HANDLE SEARCH
    // ============================================
    const handleSearch = (e) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            const query = searchQuery.trim().toLowerCase();
            
            // Map common keywords to menu items or paths
            const matchedMenuItem = menuItems.find(item => {
                const nameLower = item.name.toLowerCase();
                const hrefLower = item.href.toLowerCase().replace('/', '');
                
                return nameLower === query ||
                       nameLower.replace(/\s+/g, '') === query.replace(/\s+/g, '') ||
                       hrefLower === query ||
                       // Partial name match helpers
                       (query.length >= 4 && nameLower.includes(query)) ||
                       (query.length >= 4 && query.includes(nameLower));
            });

            if (matchedMenuItem) {
                router.push(matchedMenuItem.href);
                setSearchQuery('');
                setIsOpen(false);
            } else {
                window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
                setIsOpen(false);
            }
        }
    };

    // ============================================
    // CHECK ACTIVE LINK
    // ============================================
    const isActive = (href) => {
        const pathname = router.asPath?.split('?')[0] || '/';
        if (href === '/') return pathname === '/';
        return pathname.startsWith(href);
    };

    return (
        <header className="fixed top-0 left-0 w-full z-50">
            {/* MAIN HEADER - PREMIUM GLASS EFFECT */}
            <div 
                className={`w-full transition-all duration-500 ${
                    scrolled 
                        ? 'bg-black/95 backdrop-blur-xl shadow-2xl' 
                        : 'bg-gradient-to-b from-black via-black to-black/95'
                }`}
            >
                {/* ============================================ */}
                {/* TOP BAR - ALWAYS VISIBLE WITH NUMBERS */}
                {/* ============================================ */}
                <div className="border-b border-[#00B7B3]/20">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        
                        {/* DESKTOP TOP BAR */}
                        <div className="hidden md:flex items-center justify-between py-3">
                            {/* LOGO */}
                            <Link href="/" onClick={() => setIsOpen(false)} className="flex-shrink-0 group">
                                <span className="text-2xl font-bold tracking-tight">
                                    <span className="text-[#00B7B3] group-hover:text-[#33C5C2] transition-colors">NB</span>
                                    <span className="text-white"> Astro</span>
                                </span>
                            </Link>

                            {/* SEARCH BAR */}
                            <form onSubmit={handleSearch} className="flex-1 max-w-xl mx-8">
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="🔍 Search consultations, courses..."
                                        className="w-full px-5 py-2.5 bg-black/60 border border-[#00B7B3]/30 focus:border-[#00B7B3] outline-none text-sm rounded-lg transition-all text-white placeholder-gray-500 focus:ring-2 focus:ring-[#00B7B3]/20"
                                    />
                                    <button 
                                        type="submit" 
                                        className="absolute right-1 top-1/2 -translate-y-1/2 px-4 py-1.5 bg-[#00B7B3] text-black rounded-md hover:bg-[#33C5C2] transition-all text-xs font-medium"
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>

                            {/* CONTACT CARDS */}
                            <div className="flex items-center space-x-3">
                                <a href="tel:+919953442381" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-[#00B7B3]/30 hover:border-[#00B7B3] transition-all group">
                                    <span className="text-[#00B7B3] group-hover:scale-110 transition-transform">📞</span>
                                    <span className="text-xs font-medium text-white/90">+91 995 344 2381</span>
                                </a>
                                <a href="mailto:nbastro108@gmail.com" className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-black/40 border border-[#00B7B3]/30 hover:border-[#00B7B3] transition-all group">
                                    <span className="text-[#00B7B3] group-hover:scale-110 transition-transform">✉️</span>
                                    <span className="text-xs font-medium text-white/90">nbastro108@gmail.com</span>
                                </a>
                            </div>
                        </div>

                        {/* ============================================ */}
                        {/* MOBILE TOP BAR - NUMBERS ALWAYS VISIBLE */}
                        {/* ============================================ */}
                        <div className="md:hidden py-2">
                            {/* Row 1: Logo and Search */}
                            <div className="flex items-center justify-between gap-2">
                                <Link href="/" onClick={() => setIsOpen(false)} className="flex-shrink-0">
                                    <span className="text-xl font-bold">
                                        <span className="text-[#00B7B3]">NB</span>
                                        <span className="text-white"> Astro</span>
                                    </span>
                                </Link>

                                <form onSubmit={handleSearch} className="flex-1 max-w-[180px]">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                            placeholder="Search..."
                                            className="w-full px-3 py-1.5 bg-black/60 border border-[#00B7B3]/30 rounded-lg text-white placeholder-gray-500 text-xs focus:border-[#00B7B3] outline-none"
                                        />
                                    </div>
                                </form>
                            </div>

                            {/* Row 2: Contact Numbers - ALWAYS VISIBLE */}
                            <div className="flex items-center justify-between gap-2 mt-2">
                                <a href="tel:+919953442381" className="flex-1 flex items-center justify-center gap-2 px-2 py-2 bg-black/40 border border-[#00B7B3]/30 rounded-lg hover:border-[#00B7B3] transition-all">
                                    <span className="text-[#00B7B3] text-sm">📞</span>
                                    <span className="text-white/90 text-xs font-medium">+91 995 344 2381</span>
                                </a>
                                <a href="mailto:nbastro108@gmail.com" className="flex-1 flex items-center justify-center gap-2 px-2 py-2 bg-black/40 border border-[#00B7B3]/30 rounded-lg hover:border-[#00B7B3] transition-all">
                                    <span className="text-[#00B7B3] text-sm">✉️</span>
                                    <span className="text-white/90 text-xs font-medium truncate">nbastro108@gmail.com</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ============================================ */}
                {/* NAVIGATION BAR - ALWAYS VISIBLE */}
                {/* ============================================ */}
                <div className="bg-[#00B7B3] text-black">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between items-center h-12 md:h-14">
                            
                            {/* DESKTOP MENU */}
                            <div className="hidden md:flex items-center justify-center w-full space-x-1">
                                {menuItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 group overflow-hidden ${
                                            isActive(item.href) 
                                                ? 'text-black font-semibold' 
                                                : 'text-black/80 hover:text-black'
                                        }`}
                                    >
                                        <span className="absolute inset-0 bg-black/5 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                                        <span className="relative z-10">{item.name}</span>
                                        
                                        {/* Active Indicator - UNDERLINE INSTEAD OF DOT */}
                                        {isActive(item.href) && (
                                            <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black transform scale-x-100 transition-transform duration-300"></span>
                                        )}
                                        
                                        {/* Hover underline effect */}
                                        <span className="absolute bottom-0 left-0 w-full h-0.5 bg-black/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
                                    </Link>
                                ))}
                            </div>

                            {/* MOBILE MENU BUTTON */}
                            <button 
                                onClick={() => setIsOpen(true)}
                                className="md:hidden w-full flex items-center justify-between text-sm font-bold text-black py-2 group"
                            >
                                <span className="flex items-center gap-3">
                                    <div className="space-y-1">
                                        <div className="w-5 h-0.5 bg-black group-hover:w-6 transition-all"></div>
                                        <div className="w-5 h-0.5 bg-black group-hover:w-4 transition-all"></div>
                                        <div className="w-5 h-0.5 bg-black group-hover:w-6 transition-all"></div>
                                    </div>
                                    <span className="tracking-wider">MENU</span>
                                </span>
                                
                                <span className="px-3 py-1 bg-black text-[#00B7B3] rounded-full text-xs font-semibold">
                                    Book Now
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* MOBILE DRAWER */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/95 backdrop-blur-xl z-[100]">
                    <div className="fixed left-0 top-0 h-full w-[85%] max-w-sm bg-gradient-to-b from-gray-900 to-black border-r-2 border-[#00B7B3] shadow-2xl flex flex-col animate-slideIn">
                        
                        <div className="flex items-center justify-between p-6 border-b border-[#00B7B3]/20">
                            <span className="text-xl font-bold">
                                <span className="text-[#00B7B3]">NB</span>
                                <span className="text-white"> Astro</span>
                            </span>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="w-10 h-10 flex items-center justify-center rounded-full bg-[#00B7B3]/10 text-[#00B7B3] hover:bg-[#00B7B3] hover:text-black transition-all"
                            >
                                ✕
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto py-6 px-6">
                            <div className="space-y-3">
                                {menuItems.map((item, index) => (
                                    <Link
                                        key={index}
                                        href={item.href}
                                        onClick={() => setIsOpen(false)}
                                        className={`block w-full px-5 py-3 rounded-xl text-left text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                                            isActive(item.href)
                                                ? 'bg-[#00B7B3] text-black font-bold shadow-lg shadow-[#00B7B3]/20'
                                                : 'bg-black/40 text-white/90 hover:bg-[#00B7B3]/10 hover:text-[#00B7B3] border border-[#00B7B3]/10'
                                        }`}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>

                        <div className="p-6 border-t border-[#00B7B3]/20 space-y-4 bg-black/25">
                            <div className="space-y-3">
                                <a href="tel:+919953442381" className="flex items-center gap-3 px-5 py-3.5 bg-black/40 rounded-xl border border-[#00B7B3]/20 hover:border-[#00B7B3]/50 transition-all text-left">
                                    <span className="text-[#00B7B3]">📞</span>
                                    <span className="text-white/90 text-sm font-medium">+91 995 344 2381</span>
                                </a>
                                <a href="mailto:nbastro108@gmail.com" className="flex items-center gap-3 px-5 py-3.5 bg-black/40 rounded-xl border border-[#00B7B3]/20 hover:border-[#00B7B3]/50 transition-all text-left">
                                    <span className="text-[#00B7B3]">✉️</span>
                                    <span className="text-white/90 text-sm font-medium truncate">nbastro108@gmail.com</span>
                                </a>
                            </div>

                            <Link
                                href="/contact"
                                onClick={() => setIsOpen(false)}
                                className="block text-center py-3.5 bg-[#00B7B3] text-black rounded-xl font-bold hover:bg-[#33C5C2] shadow-lg shadow-[#00B7B3]/20 transform active:scale-95 transition-all"
                            >
                                Book Consultation
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {/* SPACER - FIXED HEIGHT FOR STICKY HEADER */}
            <div className="h-28 md:h-36"></div>
        </header>
    );
};

// Premium Animations
const styles = `
    @keyframes slideIn {
        from { transform: translateX(-100%); }
        to { transform: translateX(0); }
    }
    
    .animate-slideIn {
        animation: slideIn 0.4s cubic-bezier(0.16, 1, 0.3, 1);
    }
    
    .custom-scrollbar::-webkit-scrollbar {
        width: 4px;
    }
    
    .custom-scrollbar::-webkit-scrollbar-track {
        background: rgba(0, 183, 179, 0.05);
    }
    
    .custom-scrollbar::-webkit-scrollbar-thumb {
        background: #00B7B3;
        border-radius: 4px;
    }
`;

if (typeof document !== 'undefined') {
    const styleSheet = document.createElement("style");
    styleSheet.innerText = styles;
    document.head.appendChild(styleSheet);
}

export default Header;