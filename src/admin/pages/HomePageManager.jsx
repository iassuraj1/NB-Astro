


// // admin/pages/HomePageManager.jsx
// import React, { useState } from 'react';
// import {
//     ChevronDown,
//     ChevronUp,
//     Layout,
//     Image,
//     Star,
//     List,
//     HelpCircle,
//     Info,
//     Phone,
//     Megaphone,
//     Search,
//     Settings,
//     Eye,
//     EyeOff,
//     Save,
//     RefreshCw
// } from 'lucide-react';
// import HeroSlidesManager from '../components/Home/HeroSlidesManager';
// import FeaturesManager from '../components/Home/FeaturesManager';
// import ServicesManager from '../components/Home/ServicesManager';
// import FAQManager from '../components/Home/FAQManager';
// import AboutSectionManager from '../components/Home/AboutSectionManager';
// import ContactInfoManager from '../components/Home/ContactInfoManager';
// import CTASectionManager from '../components/Home/CTASectionManager';
// import SEOManager from '../components/Home/SEOManager';

// const HomePageManager = () => {
//     const [expandedSections, setExpandedSections] = useState({
//         hero: true,
//         features: false,
//         services: false,
//         faq: false,
//         about: false,
//         contact: false,
//         cta: false,
//         seo: false
//     });

//     const [activeTab, setActiveTab] = useState('content'); // 'content' or 'preview'

//     const toggleSection = (section) => {
//         setExpandedSections({
//             ...expandedSections,
//             [section]: !expandedSections[section]
//         });
//     };

//     const expandAll = () => {
//         const allExpanded = {};
//         Object.keys(expandedSections).forEach(key => {
//             allExpanded[key] = true;
//         });
//         setExpandedSections(allExpanded);
//     };

//     const collapseAll = () => {
//         const allCollapsed = {};
//         Object.keys(expandedSections).forEach(key => {
//             allCollapsed[key] = false;
//         });
//         setExpandedSections(allCollapsed);
//     };

//     const sections = [
//         { 
//             id: 'hero', 
//             label: 'Hero Slides', 
//             icon: Image, 
//             component: HeroSlidesManager, 
//             description: 'Manage homepage carousel/slider images and content',
//             badge: 'Carousel',
//             badgeColor: 'bg-purple-500/20 text-purple-400'
//         },
//         { 
//             id: 'features', 
//             label: 'Features', 
//             icon: Star, 
//             component: FeaturesManager, 
//             description: 'Manage key features section with icons and gradients',
//             badge: 'Grid',
//             badgeColor: 'bg-blue-500/20 text-blue-400'
//         },
//         { 
//             id: 'services', 
//             label: 'Services', 
//             icon: List, 
//             component: ServicesManager, 
//             description: 'Manage services listing with images and descriptions',
//             badge: 'Cards',
//             badgeColor: 'bg-green-500/20 text-green-400'
//         },
//         { 
//             id: 'faq', 
//             label: 'FAQs', 
//             icon: HelpCircle, 
//             component: FAQManager, 
//             description: 'Manage frequently asked questions',
//             badge: 'Accordion',
//             badgeColor: 'bg-yellow-500/20 text-yellow-400'
//         },
//         { 
//             id: 'about', 
//             label: 'About Section', 
//             icon: Info, 
//             component: AboutSectionManager, 
//             description: 'Manage about section content and profile',
//             badge: 'Profile',
//             badgeColor: 'bg-pink-500/20 text-pink-400'
//         },
//         { 
//             id: 'contact', 
//             label: 'Contact Info', 
//             icon: Phone, 
//             component: ContactInfoManager, 
//             description: 'Manage contact details and social links',
//             badge: 'Details',
//             badgeColor: 'bg-indigo-500/20 text-indigo-400'
//         },
//         { 
//             id: 'cta', 
//             label: 'CTA Section', 
//             icon: Megaphone, 
//             component: CTASectionManager, 
//             description: 'Manage call-to-action section',
//             badge: 'Promotion',
//             badgeColor: 'bg-red-500/20 text-red-400'
//         },
//         { 
//             id: 'seo', 
//             label: 'SEO Settings', 
//             icon: Search, 
//             component: SEOManager, 
//             description: 'Manage meta tags, OG tags, and SEO settings',
//             badge: 'Advanced',
//             badgeColor: 'bg-gray-500/20 text-gray-400'
//         }
//     ];

//     return (
//         <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black">
//             {/* Header Section */}
//             <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
//                 <div className="max-w-7xl mx-auto px-6 py-4">
//                     <div className="flex items-center justify-between">
//                         <div className="flex items-center gap-3">
//                             <div className="p-2 bg-[#00B7B3]/10 rounded-xl">
//                                 <Layout size={28} className="text-[#00B7B3]" />
//                             </div>
//                             <div>
//                                 <h1 className="text-2xl font-bold text-white">Home Page Manager</h1>
//                                 <p className="text-gray-400 text-sm mt-1">
//                                     Manage all sections of your homepage in one place
//                                 </p>
//                             </div>
//                         </div>
                        
//                         {/* Quick Actions */}
//                         <div className="flex items-center gap-3">
//                             <button
//                                 onClick={expandAll}
//                                 className="px-3 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition flex items-center gap-2"
//                             >
//                                 <ChevronDown size={16} />
//                                 Expand All
//                             </button>
//                             <button
//                                 onClick={collapseAll}
//                                 className="px-3 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition flex items-center gap-2"
//                             >
//                                 <ChevronUp size={16} />
//                                 Collapse All
//                             </button>
//                         </div>
//                     </div>
                    
//                     {/* Stats Bar */}
//                     <div className="grid grid-cols-4 gap-4 mt-6">
//                         <div className="bg-gray-800/50 rounded-lg p-3">
//                             <p className="text-gray-400 text-xs">Total Sections</p>
//                             <p className="text-white text-xl font-bold">{sections.length}</p>
//                         </div>
//                         <div className="bg-gray-800/50 rounded-lg p-3">
//                             <p className="text-gray-400 text-xs">Active Sections</p>
//                             <p className="text-white text-xl font-bold">
//                                 {Object.values(expandedSections).filter(v => v === true).length}
//                             </p>
//                         </div>
//                         <div className="bg-gray-800/50 rounded-lg p-3">
//                             <p className="text-gray-400 text-xs">Last Updated</p>
//                             <p className="text-white text-sm font-medium">Today, {new Date().toLocaleTimeString()}</p>
//                         </div>
//                         <div className="bg-gray-800/50 rounded-lg p-3">
//                             <p className="text-gray-400 text-xs">Status</p>
//                             <p className="text-green-400 text-sm font-medium flex items-center gap-1">
//                                 <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
//                                 Live
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>

//             {/* Main Content */}
//             <div className="max-w-7xl mx-auto px-6 py-8">
//                 <div className="space-y-3">
//                     {sections.map((section) => {
//                         const SectionComponent = section.component;
//                         const isExpanded = expandedSections[section.id];
                        
//                         return (
//                             <div 
//                                 key={section.id} 
//                                 className="group bg-gray-900/50 rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-200 overflow-hidden"
//                             >
//                                 {/* Section Header */}
//                                 <button
//                                     onClick={() => toggleSection(section.id)}
//                                     className="w-full flex items-center justify-between p-5 hover:bg-gray-800/50 transition-all duration-200"
//                                 >
//                                     <div className="flex items-center gap-4">
//                                         <div className={`p-2.5 rounded-xl transition-all duration-200 ${
//                                             isExpanded ? 'bg-[#00B7B3]/20' : 'bg-gray-800'
//                                         }`}>
//                                             <section.icon size={22} className={`${
//                                                 isExpanded ? 'text-[#00B7B3]' : 'text-gray-400'
//                                             }`} />
//                                         </div>
//                                         <div className="text-left">
//                                             <div className="flex items-center gap-3">
//                                                 <h2 className="text-lg font-semibold text-white">
//                                                     {section.label}
//                                                 </h2>
//                                                 <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${section.badgeColor}`}>
//                                                     {section.badge}
//                                                 </span>
//                                             </div>
//                                             <p className="text-gray-500 text-sm mt-1">
//                                                 {section.description}
//                                             </p>
//                                         </div>
//                                     </div>
                                    
//                                     <div className="flex items-center gap-3">
//                                         {isExpanded && (
//                                             <span className="text-xs text-[#00B7B3] bg-[#00B7B3]/10 px-2 py-1 rounded-md">
//                                                 Editing
//                                             </span>
//                                         )}
//                                         {isExpanded ? (
//                                             <ChevronUp size={18} className="text-gray-400 group-hover:text-white transition" />
//                                         ) : (
//                                             <ChevronDown size={18} className="text-gray-400 group-hover:text-white transition" />
//                                         )}
//                                     </div>
//                                 </button>
                                
//                                 {/* Section Content */}
//                                 {isExpanded && (
//                                     <div className="border-t border-gray-800 bg-gray-900/30">
//                                         <div className="p-6">
//                                             <SectionComponent />
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         );
//                     })}
//                 </div>
                
//                 {/* Footer Note */}
//                 <div className="mt-8 p-4 bg-gray-800/30 rounded-lg border border-gray-800">
//                     <div className="flex items-center gap-3">
//                         <div className="p-2 bg-[#00B7B3]/10 rounded-lg">
//                             <Settings size={18} className="text-[#00B7B3]" />
//                         </div>
//                         <div>
//                             <p className="text-gray-400 text-sm">
//                                 <span className="text-[#00B7B3] font-medium">💡 Tip:</span> Click on any section to expand and edit its content. 
//                                 Changes are saved automatically when you click the "Save Changes" button within each section.
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default HomePageManager;



// admin/pages/HomePageManager.jsx
import React, { useState } from 'react';
import {
    ChevronDown,
    ChevronUp,
    Layout,
    Image,
    HelpCircle,
    Info,
    Phone,
    Megaphone,
    Search,
    Settings
} from 'lucide-react';
import HeroSlidesManager from '../components/Home/HeroSlidesManager';
import FAQManager from '../components/Home/FAQManager';
import AboutSectionManager from '../components/Home/AboutSectionManager';
import ContactInfoManager from '../components/Home/ContactInfoManager';
import CTASectionManager from '../components/Home/CTASectionManager';
import SEOManager from '../components/Home/SEOManager';

const HomePageManager = () => {
    const [expandedSections, setExpandedSections] = useState({
        hero: true,
        faq: false,
        about: false,
        contact: false,
        cta: false,
        seo: false
    });

    const toggleSection = (section) => {
        setExpandedSections({
            ...expandedSections,
            [section]: !expandedSections[section]
        });
    };

    const expandAll = () => {
        const allExpanded = {};
        Object.keys(expandedSections).forEach(key => {
            allExpanded[key] = true;
        });
        setExpandedSections(allExpanded);
    };

    const collapseAll = () => {
        const allCollapsed = {};
        Object.keys(expandedSections).forEach(key => {
            allCollapsed[key] = false;
        });
        setExpandedSections(allCollapsed);
    };

    const sections = [
        { 
            id: 'hero', 
            label: 'Hero Slides', 
            icon: Image, 
            component: HeroSlidesManager, 
            description: 'Manage homepage carousel/slider images and content',
            badge: 'Carousel',
            badgeColor: 'bg-purple-500/20 text-purple-400'
        },
        { 
            id: 'faq', 
            label: 'FAQs', 
            icon: HelpCircle, 
            component: FAQManager, 
            description: 'Manage frequently asked questions',
            badge: 'Accordion',
            badgeColor: 'bg-yellow-500/20 text-yellow-400'
        },
        { 
            id: 'about', 
            label: 'About Section', 
            icon: Info, 
            component: AboutSectionManager, 
            description: 'Manage about section content and profile',
            badge: 'Profile',
            badgeColor: 'bg-pink-500/20 text-pink-400'
        },
        { 
            id: 'contact', 
            label: 'Contact Info', 
            icon: Phone, 
            component: ContactInfoManager, 
            description: 'Manage contact details and social links',
            badge: 'Details',
            badgeColor: 'bg-indigo-500/20 text-indigo-400'
        },
        { 
            id: 'cta', 
            label: 'CTA Section', 
            icon: Megaphone, 
            component: CTASectionManager, 
            description: 'Manage call-to-action section',
            badge: 'Promotion',
            badgeColor: 'bg-red-500/20 text-red-400'
        },
        { 
            id: 'seo', 
            label: 'SEO Settings', 
            icon: Search, 
            component: SEOManager, 
            description: 'Manage meta tags, OG tags, and SEO settings',
            badge: 'Advanced',
            badgeColor: 'bg-gray-500/20 text-gray-400'
        }
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-black">
            {/* Header Section */}
            <div className="sticky top-0 z-10 bg-gray-900/95 backdrop-blur-sm border-b border-gray-800">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-[#00B7B3]/10 rounded-xl">
                                <Layout size={28} className="text-[#00B7B3]" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold text-white">Home Page Manager</h1>
                                <p className="text-gray-400 text-sm mt-1">
                                    Manage all sections of your homepage in one place
                                </p>
                            </div>
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="flex items-center gap-3">
                            <button
                                onClick={expandAll}
                                className="px-3 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition flex items-center gap-2"
                            >
                                <ChevronDown size={16} />
                                Expand All
                            </button>
                            <button
                                onClick={collapseAll}
                                className="px-3 py-2 text-sm bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg transition flex items-center gap-2"
                            >
                                <ChevronUp size={16} />
                                Collapse All
                            </button>
                        </div>
                    </div>
                    
                    {/* Stats Bar */}
                    <div className="grid grid-cols-4 gap-4 mt-6">
                        <div className="bg-gray-800/50 rounded-lg p-3">
                            <p className="text-gray-400 text-xs">Total Sections</p>
                            <p className="text-white text-xl font-bold">{sections.length}</p>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-3">
                            <p className="text-gray-400 text-xs">Active Sections</p>
                            <p className="text-white text-xl font-bold">
                                {Object.values(expandedSections).filter(v => v === true).length}
                            </p>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-3">
                            <p className="text-gray-400 text-xs">Last Updated</p>
                            <p className="text-white text-sm font-medium">Today, {new Date().toLocaleTimeString()}</p>
                        </div>
                        <div className="bg-gray-800/50 rounded-lg p-3">
                            <p className="text-gray-400 text-xs">Status</p>
                            <p className="text-green-400 text-sm font-medium flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                Live
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="space-y-3">
                    {sections.map((section) => {
                        const SectionComponent = section.component;
                        const isExpanded = expandedSections[section.id];
                        
                        return (
                            <div 
                                key={section.id} 
                                className="group bg-gray-900/50 rounded-xl border border-gray-800 hover:border-gray-700 transition-all duration-200 overflow-hidden"
                            >
                                {/* Section Header */}
                                <button
                                    onClick={() => toggleSection(section.id)}
                                    className="w-full flex items-center justify-between p-5 hover:bg-gray-800/50 transition-all duration-200"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`p-2.5 rounded-xl transition-all duration-200 ${
                                            isExpanded ? 'bg-[#00B7B3]/20' : 'bg-gray-800'
                                        }`}>
                                            <section.icon size={22} className={`${
                                                isExpanded ? 'text-[#00B7B3]' : 'text-gray-400'
                                            }`} />
                                        </div>
                                        <div className="text-left">
                                            <div className="flex items-center gap-3">
                                                <h2 className="text-lg font-semibold text-white">
                                                    {section.label}
                                                </h2>
                                                <span className={`px-2 py-0.5 rounded-md text-xs font-medium ${section.badgeColor}`}>
                                                    {section.badge}
                                                </span>
                                            </div>
                                            <p className="text-gray-500 text-sm mt-1">
                                                {section.description}
                                            </p>
                                        </div>
                                    </div>
                                    
                                    <div className="flex items-center gap-3">
                                        {isExpanded && (
                                            <span className="text-xs text-[#00B7B3] bg-[#00B7B3]/10 px-2 py-1 rounded-md">
                                                Editing
                                            </span>
                                        )}
                                        {isExpanded ? (
                                            <ChevronUp size={18} className="text-gray-400 group-hover:text-white transition" />
                                        ) : (
                                            <ChevronDown size={18} className="text-gray-400 group-hover:text-white transition" />
                                        )}
                                    </div>
                                </button>
                                
                                {/* Section Content */}
                                {isExpanded && (
                                    <div className="border-t border-gray-800 bg-gray-900/30">
                                        <div className="p-6">
                                            <SectionComponent />
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
                
                {/* Footer Note */}
                <div className="mt-8 p-4 bg-gray-800/30 rounded-lg border border-gray-800">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-[#00B7B3]/10 rounded-lg">
                            <Settings size={18} className="text-[#00B7B3]" />
                        </div>
                        <div>
                            <p className="text-gray-400 text-sm">
                                <span className="text-[#00B7B3] font-medium">💡 Tip:</span> Click on any section to expand and edit its content. 
                                Changes are saved automatically when you click the "Save Changes" button within each section.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePageManager;