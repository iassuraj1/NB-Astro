// import React, { useState } from 'react';
// import {
//     LayoutDashboard,
//     BookOpen,
//     PlusCircle,
//     LogOut,
//     Star,
//     ChevronDown,
//     ChevronRight,
//     List
// } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// const Sidebar = () => {
//     const { admin, logout } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [isCoursesOpen, setIsCoursesOpen] = useState(true); // Default open

//     const handleLogout = () => {
//         logout();
//         navigate('/admin/login');
//     };

//     // Check if any courses subpage is active
//     const isCoursesActive = location.pathname.includes('/admin/courses') || 
//                            location.pathname.includes('/admin/add-course') ||
//                            location.pathname.includes('/admin/edit-course');

//     return (
//         <aside className="fixed left-0 top-0 h-full w-64 bg-black/90 backdrop-blur-xl border-r border-[#00B7B3]/20 z-50">
//             {/* Logo Section */}
//             <div className="p-6 border-b border-[#00B7B3]/20">
//                 <div className="flex items-center gap-2">
//                     <Star className="w-6 h-6 text-[#00B7B3]" />
//                     <h1 className="text-xl font-bold bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] bg-clip-text text-transparent">
//                         NB Astro Admin
//                     </h1>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">Admin Panel</p>
//             </div>

//             {/* Navigation Menu */}
//             <nav className="p-4 space-y-2 overflow-y-auto" style={{ height: 'calc(100% - 140px)' }}>
//                 {/* Dashboard Link */}
//                 <NavLink
//                     href="/admin/dashboard"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`
//                     }
//                 >
//                     <LayoutDashboard className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-all" />
//                     <span className="font-medium">Dashboard</span>
//                 </NavLink>

//                 {/* Courses Dropdown */}
//                 <div className="space-y-1">
//                     <button
//                         onClick={() => setIsCoursesOpen(!isCoursesOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isCoursesActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <BookOpen className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-all" />
//                             <span className="font-medium">Courses</span>
//                         </div>
//                         {isCoursesOpen ? (
//                             <ChevronDown className="w-4 h-4" />
//                         ) : (
//                             <ChevronRight className="w-4 h-4" />
//                         )}
//                     </button>

//                     {/* Sub-menu Items */}
//                     {isCoursesOpen && (
//                         <div className="ml-4 space-y-1 border-l border-[#00B7B3]/20">
//                             <NavLink
//                                 href="/admin/courses"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <List className="w-4 h-4 text-blue-400" />
//                                 <span className="text-sm">Course List</span>
//                             </NavLink>

//                             <NavLink
//                                 href="/admin/add-course"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <PlusCircle className="w-4 h-4 text-purple-400" />
//                                 <span className="text-sm">Add Course</span>
//                             </NavLink>

//                             <NavLink
//                                 href="/admin/page-content"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <Edit className="w-4 h-4 text-yellow-400" />
//                                 <span className="text-sm">Page Content</span>
//                             </NavLink>
//                         </div>
//                     )}
//                 </div>
//             </nav>

//             {/* User Info & Logout Section */}
//             <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#00B7B3]/20 bg-black/50">
//                 <div className="flex items-center gap-3 mb-4 px-2">
//                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00B7B3] to-[#33C5C2] flex items-center justify-center text-black font-bold shadow-lg">
//                         {admin?.name?.charAt(0) || 'A'}
//                     </div>
//                     <div className="flex-1">
//                         <p className="text-white text-sm font-medium truncate">{admin?.name || 'Admin'}</p>
//                         <p className="text-gray-500 text-xs capitalize">{admin?.role || 'Admin'}</p>
//                     </div>
//                 </div>
                
//                 <button
//                     onClick={handleLogout}
//                     className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-300 w-full group"
//                 >
//                     <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                     <span className="font-medium">Logout</span>
//                 </button>
//             </div>
//         </aside>
//     );
// };

// export default Sidebar;



// import React, { useState } from 'react';
// import {
//     LayoutDashboard,
//     BookOpen,
//     PlusCircle,
//     LogOut,
//     Star,
//     ChevronDown,
//     ChevronRight,
//     List,
//     Edit,
//     Globe,
//     Compass
// } from 'lucide-react'; // Added Edit, Globe, Compass
// import { useAuth } from '../context/AuthContext';

// const Sidebar = () => {
//     const { admin, logout } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [isCoursesOpen, setIsCoursesOpen] = useState(true);
//     const [isPageContentOpen, setIsPageContentOpen] = useState(false); // New state for page content dropdown

//     const handleLogout = () => {
//         logout();
//         navigate('/admin/login');
//     };

//     // Check if any courses subpage is active
//     const isCoursesActive = location.pathname.includes('/admin/courses') || 
//                            location.pathname.includes('/admin/add-course') ||
//                            location.pathname.includes('/admin/edit-course');

//     // Check if any page content subpage is active
//     const isPageContentActive = location.pathname.includes('/admin/page-content');

//     return (
//         <aside className="fixed left-0 top-0 h-full w-64 bg-black/90 backdrop-blur-xl border-r border-[#00B7B3]/20 z-50">
//             {/* Logo Section */}
//             <div className="p-6 border-b border-[#00B7B3]/20">
//                 <div className="flex items-center gap-2">
//                     <Star className="w-6 h-6 text-[#00B7B3]" />
//                     <h1 className="text-xl font-bold bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] bg-clip-text text-transparent">
//                         NB Astro Admin
//                     </h1>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">Admin Panel</p>
//             </div>

//             {/* Navigation Menu */}
//             <nav className="p-4 space-y-2 overflow-y-auto" style={{ height: 'calc(100% - 140px)' }}>
//                 {/* Dashboard Link */}
//                 <NavLink
//                     href="/admin/dashboard"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`
//                     }
//                 >
//                     <LayoutDashboard className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-all" />
//                     <span className="font-medium">Dashboard</span>
//                 </NavLink>

//                 {/* Courses Dropdown */}
//                 <div className="space-y-1">
//                     <button
//                         onClick={() => setIsCoursesOpen(!isCoursesOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isCoursesActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <BookOpen className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-all" />
//                             <span className="font-medium">Courses</span>
//                         </div>
//                         {isCoursesOpen ? (
//                             <ChevronDown className="w-4 h-4" />
//                         ) : (
//                             <ChevronRight className="w-4 h-4" />
//                         )}
//                     </button>

//                     {/* Sub-menu Items */}
//                     {isCoursesOpen && (
//                         <div className="ml-4 space-y-1 border-l border-[#00B7B3]/20">
//                             <NavLink
//                                 href="/admin/courses"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <List className="w-4 h-4 text-blue-400" />
//                                 <span className="text-sm">Course List</span>
//                             </NavLink>

//                             <NavLink
//                                 href="/admin/add-course"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <PlusCircle className="w-4 h-4 text-purple-400" />
//                                 <span className="text-sm">Add Course</span>
//                             </NavLink>
//                         </div>
//                     )}
//                 </div>

//                 {/* Page Content Dropdown */}
//                 <div className="space-y-1">
//                     <button
//                         onClick={() => setIsPageContentOpen(!isPageContentOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isPageContentActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <Globe className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-all" />
//                             <span className="font-medium">Page Content</span>
//                         </div>
//                         {isPageContentOpen ? (
//                             <ChevronDown className="w-4 h-4" />
//                         ) : (
//                             <ChevronRight className="w-4 h-4" />
//                         )}
//                     </button>

//                     {/* Sub-menu Items for Page Content */}
//                     {isPageContentOpen && (
//                         <div className="ml-4 space-y-1 border-l border-[#00B7B3]/20">
//                             <NavLink
//                                 href="/admin/page-content/astrology"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <Star className="w-4 h-4 text-purple-400" />
//                                 <span className="text-sm">Astrology Page</span>
//                             </NavLink>

//                             <NavLink
//                                 href="/admin/page-content/vastu"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <Compass className="w-4 h-4 text-green-400" />
//                                 <span className="text-sm">Vastu Page</span>
//                             </NavLink>

//                             <NavLink
//                                     href="/admin/about-page"
//                                     className={({ isActive }) =>
//                                         `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                             isActive
//                                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                         }`
//                                     }
//                                 >
//                                     <FileText className="w-4 h-4 text-orange-400" />
//                                     <span className="text-sm">About Page</span>
//                                 </NavLink>
//                         </div>
//                     )}
//                 </div>
//             </nav>

//             {/* User Info & Logout Section */}
//             <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#00B7B3]/20 bg-black/50">
//                 <div className="flex items-center gap-3 mb-4 px-2">
//                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00B7B3] to-[#33C5C2] flex items-center justify-center text-black font-bold shadow-lg">
//                         {admin?.name?.charAt(0) || 'A'}
//                     </div>
//                     <div className="flex-1">
//                         <p className="text-white text-sm font-medium truncate">{admin?.name || 'Admin'}</p>
//                         <p className="text-gray-500 text-xs capitalize">{admin?.role || 'Admin'}</p>
//                     </div>
//                 </div>
                
//                 <button
//                     onClick={handleLogout}
//                     className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-300 w-full group"
//                 >
//                     <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                     <span className="font-medium">Logout</span>
//                 </button>
//             </div>
//         </aside>
//     );
// };

// export default Sidebar;




// // Sidebar.jsx
// import React, { useState } from 'react';
// import {
//     LayoutDashboard,
//     BookOpen,
//     PlusCircle,
//     LogOut,
//     Star,
//     ChevronDown,
//     ChevronRight,
//     List,
//     Edit,
//     Globe,
//     Compass,
//     FileText  // ✅ Add this import
// } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// const Sidebar = () => {
//     const { admin, logout } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [isCoursesOpen, setIsCoursesOpen] = useState(true);
//     const [isPageContentOpen, setIsPageContentOpen] = useState(false);

//     const handleLogout = () => {
//         logout();
//         navigate('/admin/login');
//     };

//     const isCoursesActive = location.pathname.includes('/admin/courses') || 
//                            location.pathname.includes('/admin/add-course') ||
//                            location.pathname.includes('/admin/edit-course');

//     const isPageContentActive = location.pathname.includes('/admin/page-content');

//     return (
//         <aside className="fixed left-0 top-0 h-full w-64 bg-black/90 backdrop-blur-xl border-r border-[#00B7B3]/20 z-50">
//             {/* Logo Section */}
//             <div className="p-6 border-b border-[#00B7B3]/20">
//                 <div className="flex items-center gap-2">
//                     <Star className="w-6 h-6 text-[#00B7B3]" />
//                     <h1 className="text-xl font-bold bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] bg-clip-text text-transparent">
//                         NB Astro Admin
//                     </h1>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">Admin Panel</p>
//             </div>

//             {/* Navigation Menu */}
//             <nav className="p-4 space-y-2 overflow-y-auto" style={{ height: 'calc(100% - 140px)' }}>
//                 {/* Dashboard Link */}
//                 <NavLink
//                     href="/admin/dashboard"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`
//                     }
//                 >
//                     <LayoutDashboard className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-all" />
//                     <span className="font-medium">Dashboard</span>
//                 </NavLink>

//                 {/* Courses Dropdown */}
//                 <div className="space-y-1">
//                     <button
//                         onClick={() => setIsCoursesOpen(!isCoursesOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isCoursesActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <BookOpen className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-all" />
//                             <span className="font-medium">Courses</span>
//                         </div>
//                         {isCoursesOpen ? (
//                             <ChevronDown className="w-4 h-4" />
//                         ) : (
//                             <ChevronRight className="w-4 h-4" />
//                         )}
//                     </button>

//                     {/* Sub-menu Items */}
//                     {isCoursesOpen && (
//                         <div className="ml-4 space-y-1 border-l border-[#00B7B3]/20">
//                             <NavLink
//                                 href="/admin/courses"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <List className="w-4 h-4 text-blue-400" />
//                                 <span className="text-sm">Course List</span>
//                             </NavLink>

//                             <NavLink
//                                 href="/admin/add-course"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <PlusCircle className="w-4 h-4 text-purple-400" />
//                                 <span className="text-sm">Add Course</span>
//                             </NavLink>
//                         </div>
//                     )}
//                 </div>

//                 <div className="space-y-1">  <NavLink
//                                 href="/admin/about-page"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <FileText className="w-4 h-4 text-orange-400" />
//                                 <span className="text-sm">About Page</span>
//                             </NavLink></div>

//                 {/* Page Content Dropdown */}
//                 <div className="space-y-1">
//                     <button
//                         onClick={() => setIsPageContentOpen(!isPageContentOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isPageContentActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <Globe className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-all" />
//                             <span className="font-medium">Page Content</span>
//                         </div>
//                         {isPageContentOpen ? (
//                             <ChevronDown className="w-4 h-4" />
//                         ) : (
//                             <ChevronRight className="w-4 h-4" />
//                         )}
//                     </button>

//                     {/* Sub-menu Items for Page Content */}
//                     {isPageContentOpen && (
//                         <div className="ml-4 space-y-1 border-l border-[#00B7B3]/20">
//                             <NavLink
//                                 href="/admin/page-content/astrology"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <Star className="w-4 h-4 text-purple-400" />
//                                 <span className="text-sm">Astrology Page</span>
//                             </NavLink>

//                             <NavLink
//                                 href="/admin/page-content/vastu"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <Compass className="w-4 h-4 text-green-400" />
//                                 <span className="text-sm">Vastu Page</span>
//                             </NavLink>

                          
//                         </div>
//                     )}
//                 </div>
//             </nav>

//             {/* User Info & Logout Section */}
//             <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#00B7B3]/20 bg-black/50">
//                 <div className="flex items-center gap-3 mb-4 px-2">
//                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00B7B3] to-[#33C5C2] flex items-center justify-center text-black font-bold shadow-lg">
//                         {admin?.name?.charAt(0) || 'A'}
//                     </div>
//                     <div className="flex-1">
//                         <p className="text-white text-sm font-medium truncate">{admin?.name || 'Admin'}</p>
//                         <p className="text-gray-500 text-xs capitalize">{admin?.role || 'Admin'}</p>
//                     </div>
//                 </div>
                
//                 <button
//                     onClick={handleLogout}
//                     className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-300 w-full group"
//                 >
//                     <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                     <span className="font-medium">Logout</span>
//                 </button>
//             </div>
//         </aside>
//     );
// };

// export default Sidebar;



// // Sidebar.jsx
// import React, { useState } from 'react';
// import {
//     LayoutDashboard,
//     BookOpen,
//     PlusCircle,
//     LogOut,
//     Star,
//     ChevronDown,
//     ChevronRight,
//     List,
//     Edit,
//     Globe,
//     Compass,
//     FileText
// } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// const Sidebar = () => {
//     const { admin, logout } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [isCoursesOpen, setIsCoursesOpen] = useState(true);
//     const [isPageContentOpen, setIsPageContentOpen] = useState(false);
//     const [isAboutOpen, setIsAboutOpen] = useState(false); // ✅ New state for About dropdown

//     const handleLogout = () => {
//         logout();
//         navigate('/admin/login');
//     };

//     const isCoursesActive = location.pathname.includes('/admin/courses') || 
//                            location.pathname.includes('/admin/add-course') ||
//                            location.pathname.includes('/admin/edit-course');

//     const isPageContentActive = location.pathname.includes('/admin/page-content');
//     const isAboutActive = location.pathname.includes('/admin/about-page');

//     return (
//         <aside className="fixed left-0 top-0 h-full w-64 bg-black/90 backdrop-blur-xl border-r border-[#00B7B3]/20 z-50">
//             {/* Logo Section */}
//             <div className="p-6 border-b border-[#00B7B3]/20">
//                 <div className="flex items-center gap-2">
//                     <Star className="w-6 h-6 text-[#00B7B3]" />
//                     <h1 className="text-xl font-bold bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] bg-clip-text text-transparent">
//                         NB Astro Admin
//                     </h1>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">Admin Panel</p>
//             </div>

//             {/* Navigation Menu */}
//             <nav className="p-4 space-y-2 overflow-y-auto" style={{ height: 'calc(100% - 140px)' }}>
//                 {/* Dashboard Link */}
//                 <NavLink
//                     href="/admin/dashboard"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`
//                     }
//                 >
//                     <LayoutDashboard className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-all" />
//                     <span className="font-medium">Dashboard</span>
//                 </NavLink>

//                 {/* Courses Dropdown */}
//                 <div className="space-y-1">
//                     <button
//                         onClick={() => setIsCoursesOpen(!isCoursesOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isCoursesActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <BookOpen className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-all" />
//                             <span className="font-medium">Courses</span>
//                         </div>
//                         {isCoursesOpen ? (
//                             <ChevronDown className="w-4 h-4" />
//                         ) : (
//                             <ChevronRight className="w-4 h-4" />
//                         )}
//                     </button>

//                     {/* Sub-menu Items */}
//                     {isCoursesOpen && (
//                         <div className="ml-4 space-y-1 border-l border-[#00B7B3]/20">
//                             <NavLink
//                                 href="/admin/courses"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <List className="w-4 h-4 text-blue-400" />
//                                 <span className="text-sm">Course List</span>
//                             </NavLink>

//                             <NavLink
//                                 href="/admin/add-course"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <PlusCircle className="w-4 h-4 text-purple-400" />
//                                 <span className="text-sm">Add Course</span>
//                             </NavLink>
//                         </div>
//                     )}
//                 </div>

//                 {/* Page Content Dropdown */}
//                 <div className="space-y-1">
//                     <button
//                         onClick={() => setIsPageContentOpen(!isPageContentOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isPageContentActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <Globe className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-all" />
//                             <span className="font-medium">Page Content</span>
//                         </div>
//                         {isPageContentOpen ? (
//                             <ChevronDown className="w-4 h-4" />
//                         ) : (
//                             <ChevronRight className="w-4 h-4" />
//                         )}
//                     </button>

//                     {/* Sub-menu Items for Page Content */}
//                     {isPageContentOpen && (
//                         <div className="ml-4 space-y-1 border-l border-[#00B7B3]/20">
//                             <NavLink
//                                 href="/admin/page-content/astrology"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <Star className="w-4 h-4 text-purple-400" />
//                                 <span className="text-sm">Astrology Page</span>
//                             </NavLink>

//                             <NavLink
//                                 href="/admin/page-content/vastu"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <Compass className="w-4 h-4 text-green-400" />
//                                 <span className="text-sm">Vastu Page</span>
//                             </NavLink>
//                         </div>
//                     )}
//                 </div>

//                 {/* ✅ About Page - Separate Section */}
//                 <div className="space-y-1">
//                     <NavLink
//                         href="/admin/about-page"
//                         className={({ isActive }) =>
//                             `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
//                                 isActive
//                                     ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                     : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                             }`
//                         }
//                     >
//                         <FileText className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-all" />
//                         <span className="font-medium">About Page</span>
//                     </NavLink>
//                 </div>
//             </nav>

//             {/* User Info & Logout Section */}
//             <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#00B7B3]/20 bg-black/50">
//                 <div className="flex items-center gap-3 mb-4 px-2">
//                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00B7B3] to-[#33C5C2] flex items-center justify-center text-black font-bold shadow-lg">
//                         {admin?.name?.charAt(0) || 'A'}
//                     </div>
//                     <div className="flex-1">
//                         <p className="text-white text-sm font-medium truncate">{admin?.name || 'Admin'}</p>
//                         <p className="text-gray-500 text-xs capitalize">{admin?.role || 'Admin'}</p>
//                     </div>
//                 </div>
                
//                 <button
//                     onClick={handleLogout}
//                     className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-300 w-full group"
//                 >
//                     <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                     <span className="font-medium">Logout</span>
//                 </button>
//             </div>
//         </aside>
//     );
// };

// export default Sidebar;



// // admin/components/Sidebar.jsx
// import React, { useState } from 'react';
// import {
//     LayoutDashboard,
//     BookOpen,
//     PlusCircle,
//     LogOut,
//     Star,
//     ChevronDown,
//     ChevronRight,
//     List,
//     Edit,
//     Globe,
//     Compass,
//     FileText,
//     Home,           // 👈 ADD THIS
//     Settings        // 👈 ADD THIS (for SEO)
// } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// const Sidebar = () => {
//     const { admin, logout } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [isCoursesOpen, setIsCoursesOpen] = useState(true);
//     const [isPageContentOpen, setIsPageContentOpen] = useState(false);
//     const [isHomeOpen, setIsHomeOpen] = useState(false); // 👈 NEW STATE for Home dropdown

//     const handleLogout = () => {
//         logout();
//         navigate('/admin/login');
//     };

//     const isCoursesActive = location.pathname.includes('/admin/courses') || 
//                            location.pathname.includes('/admin/add-course') ||
//                            location.pathname.includes('/admin/edit-course');

//     const isPageContentActive = location.pathname.includes('/admin/page-content');
//     const isHomeActive = location.pathname.includes('/admin/home-page'); // 👈 NEW

//     return (
//         <aside className="fixed left-0 top-0 h-full w-64 bg-black/90 backdrop-blur-xl border-r border-[#00B7B3]/20 z-50">
//             {/* Logo Section */}
//             <div className="p-6 border-b border-[#00B7B3]/20">
//                 <div className="flex items-center gap-2">
//                     <Star className="w-6 h-6 text-[#00B7B3]" />
//                     <h1 className="text-xl font-bold bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] bg-clip-text text-transparent">
//                         NB Astro Admin
//                     </h1>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">Admin Panel</p>
//             </div>

//             {/* Navigation Menu */}
//             <nav className="p-4 space-y-2 overflow-y-auto" style={{ height: 'calc(100% - 140px)' }}>
//                 {/* Dashboard Link */}
//                 <NavLink
//                     href="/admin/dashboard"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`
//                     }
//                 >
//                     <LayoutDashboard className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-all" />
//                     <span className="font-medium">Dashboard</span>
//                 </NavLink>

//                 {/* 👇 NEW: Home Page Manager Section */}
//                 <div className="space-y-1">
//                     <button
//                         onClick={() => setIsHomeOpen(!isHomeOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isHomeActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <Home className="w-5 h-5 text-[#00B7B3] group-hover:scale-110 transition-all" />
//                             <span className="font-medium">Home Page</span>
//                         </div>
//                         {isHomeOpen ? (
//                             <ChevronDown className="w-4 h-4" />
//                         ) : (
//                             <ChevronRight className="w-4 h-4" />
//                         )}
//                     </button>

//                     {/* Sub-menu Items for Home Page */}
//                     {isHomeOpen && (
//                         <div className="ml-4 space-y-1 border-l border-[#00B7B3]/20">
//                             <NavLink
//                                 href="/admin/home-page"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <Star className="w-4 h-4 text-[#00B7B3]" />
//                                 <span className="text-sm">All Sections</span>
//                             </NavLink>
//                         </div>
//                     )}
//                 </div>

//                 {/* Courses Dropdown */}
//                 <div className="space-y-1">
//                     <button
//                         onClick={() => setIsCoursesOpen(!isCoursesOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isCoursesActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <BookOpen className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-all" />
//                             <span className="font-medium">Courses</span>
//                         </div>
//                         {isCoursesOpen ? (
//                             <ChevronDown className="w-4 h-4" />
//                         ) : (
//                             <ChevronRight className="w-4 h-4" />
//                         )}
//                     </button>

//                     {/* Sub-menu Items */}
//                     {isCoursesOpen && (
//                         <div className="ml-4 space-y-1 border-l border-[#00B7B3]/20">
//                             <NavLink
//                                 href="/admin/courses"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <List className="w-4 h-4 text-blue-400" />
//                                 <span className="text-sm">Course List</span>
//                             </NavLink>

//                             <NavLink
//                                 href="/admin/add-course"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <PlusCircle className="w-4 h-4 text-purple-400" />
//                                 <span className="text-sm">Add Course</span>
//                             </NavLink>
//                         </div>
//                     )}
//                 </div>

//                 {/* Page Content Dropdown */}
//                 <div className="space-y-1">
//                     <button
//                         onClick={() => setIsPageContentOpen(!isPageContentOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isPageContentActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <Globe className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-all" />
//                             <span className="font-medium">Page Content</span>
//                         </div>
//                         {isPageContentOpen ? (
//                             <ChevronDown className="w-4 h-4" />
//                         ) : (
//                             <ChevronRight className="w-4 h-4" />
//                         )}
//                     </button>

//                     {/* Sub-menu Items for Page Content */}
//                     {isPageContentOpen && (
//                         <div className="ml-4 space-y-1 border-l border-[#00B7B3]/20">
//                             <NavLink
//                                 href="/admin/page-content/astrology"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <Star className="w-4 h-4 text-purple-400" />
//                                 <span className="text-sm">Astrology Page</span>
//                             </NavLink>

//                             <NavLink
//                                 href="/admin/page-content/vastu"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <Compass className="w-4 h-4 text-green-400" />
//                                 <span className="text-sm">Vastu Page</span>
//                             </NavLink>
//                         </div>
//                     )}
//                 </div>

//                 {/* About Page */}
//                 <div className="space-y-1">
//                     <NavLink
//                         href="/admin/about-page"
//                         className={({ isActive }) =>
//                             `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
//                                 isActive
//                                     ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                     : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                             }`
//                         }
//                     >
//                         <FileText className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-all" />
//                         <span className="font-medium">About Page</span>
//                     </NavLink>
//                 </div>
//             </nav>

//             {/* User Info & Logout Section */}
//             <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#00B7B3]/20 bg-black/50">
//                 <div className="flex items-center gap-3 mb-4 px-2">
//                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00B7B3] to-[#33C5C2] flex items-center justify-center text-black font-bold shadow-lg">
//                         {admin?.name?.charAt(0) || 'A'}
//                     </div>
//                     <div className="flex-1">
//                         <p className="text-white text-sm font-medium truncate">{admin?.name || 'Admin'}</p>
//                         <p className="text-gray-500 text-xs capitalize">{admin?.role || 'Admin'}</p>
//                     </div>
//                 </div>
                
//                 <button
//                     onClick={handleLogout}
//                     className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-300 w-full group"
//                 >
//                     <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                     <span className="font-medium">Logout</span>
//                 </button>
//             </div>
//         </aside>
//     );
// };

// export default Sidebar;



// // admin/components/Sidebar.jsx
// import React, { useState } from 'react';
// import {
//     LayoutDashboard,
//     BookOpen,
//     PlusCircle,
//     LogOut,
//     Star,
//     ChevronDown,
//     ChevronRight,
//     List,
//     Edit,
//     Globe,
//     Compass,
//     FileText,
//     Home  // 👈 YEH IMPORT KARO
// } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// const Sidebar = () => {
//     const { admin, logout } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [isCoursesOpen, setIsCoursesOpen] = useState(true);
//     const [isPageContentOpen, setIsPageContentOpen] = useState(false);

//     const handleLogout = () => {
//         logout();
//         navigate('/admin/login');
//     };

//     const isCoursesActive = location.pathname.includes('/admin/courses') || 
//                            location.pathname.includes('/admin/add-course') ||
//                            location.pathname.includes('/admin/edit-course');

//     const isPageContentActive = location.pathname.includes('/admin/page-content');

//     return (
//         <aside className="fixed left-0 top-0 h-full w-64 bg-black/90 backdrop-blur-xl border-r border-[#00B7B3]/20 z-50">
//             {/* Logo Section */}
//             <div className="p-6 border-b border-[#00B7B3]/20">
//                 <div className="flex items-center gap-2">
//                     <Star className="w-6 h-6 text-[#00B7B3]" />
//                     <h1 className="text-xl font-bold bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] bg-clip-text text-transparent">
//                         NB Astro Admin
//                     </h1>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">Admin Panel</p>
//             </div>

//             {/* Navigation Menu */}
//             <nav className="p-4 space-y-2 overflow-y-auto" style={{ height: 'calc(100% - 140px)' }}>
//                 {/* Dashboard Link */}
//                 <NavLink
//                     href="/admin/dashboard"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`
//                     }
//                 >
//                     <LayoutDashboard className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-all" />
//                     <span className="font-medium">Dashboard</span>
//                 </NavLink>

//                 {/* 👇 HOME PAGE MANAGER - SIRF YEH ADD KARO */}
//                 <NavLink
//                     href="/admin/home-page"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`
//                     }
//                 >
//                     <Home className="w-5 h-5 text-[#00B7B3] group-hover:scale-110 transition-all" />
//                     <span className="font-medium">Home Page</span>
//                 </NavLink>

//                 {/* Courses Dropdown */}
//                 <div className="space-y-1">
//                     <button
//                         onClick={() => setIsCoursesOpen(!isCoursesOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isCoursesActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <BookOpen className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-all" />
//                             <span className="font-medium">Courses</span>
//                         </div>
//                         {isCoursesOpen ? (
//                             <ChevronDown className="w-4 h-4" />
//                         ) : (
//                             <ChevronRight className="w-4 h-4" />
//                         )}
//                     </button>

//                     {isCoursesOpen && (
//                         <div className="ml-4 space-y-1 border-l border-[#00B7B3]/20">
//                             <NavLink
//                                 href="/admin/courses"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <List className="w-4 h-4 text-blue-400" />
//                                 <span className="text-sm">Course List</span>
//                             </NavLink>

//                             <NavLink
//                                 href="/admin/add-course"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <PlusCircle className="w-4 h-4 text-purple-400" />
//                                 <span className="text-sm">Add Course</span>
//                             </NavLink>
//                         </div>
//                     )}
//                 </div>

//                 {/* Page Content Dropdown */}
//                 <div className="space-y-1">
//                     <button
//                         onClick={() => setIsPageContentOpen(!isPageContentOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isPageContentActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <Globe className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-all" />
//                             <span className="font-medium">Page Content</span>
//                         </div>
//                         {isPageContentOpen ? (
//                             <ChevronDown className="w-4 h-4" />
//                         ) : (
//                             <ChevronRight className="w-4 h-4" />
//                         )}
//                     </button>

//                     {isPageContentOpen && (
//                         <div className="ml-4 space-y-1 border-l border-[#00B7B3]/20">
//                             <NavLink
//                                 href="/admin/page-content/astrology"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <Star className="w-4 h-4 text-purple-400" />
//                                 <span className="text-sm">Astrology Page</span>
//                             </NavLink>

//                             <NavLink
//                                 href="/admin/page-content/vastu"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <Compass className="w-4 h-4 text-green-400" />
//                                 <span className="text-sm">Vastu Page</span>
//                             </NavLink>
//                         </div>
//                     )}
//                 </div>

//                 {/* About Page */}
//                 <NavLink
//                     href="/admin/about-page"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`
//                     }
//                 >
//                     <FileText className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-all" />
//                     <span className="font-medium">About Page</span>
//                 </NavLink>
//             </nav>

//             {/* User Info & Logout Section */}
//             <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#00B7B3]/20 bg-black/50">
//                 <div className="flex items-center gap-3 mb-4 px-2">
//                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00B7B3] to-[#33C5C2] flex items-center justify-center text-black font-bold shadow-lg">
//                         {admin?.name?.charAt(0) || 'A'}
//                     </div>
//                     <div className="flex-1">
//                         <p className="text-white text-sm font-medium truncate">{admin?.name || 'Admin'}</p>
//                         <p className="text-gray-500 text-xs capitalize">{admin?.role || 'Admin'}</p>
//                     </div>
//                 </div>
                
//                 <button
//                     onClick={handleLogout}
//                     className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-300 w-full group"
//                 >
//                     <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                     <span className="font-medium">Logout</span>
//                 </button>
//             </div>
//         </aside>
//     );
// };

// export default Sidebar;



// // admin/components/Sidebar.jsx
// import React, { useState } from 'react';
// import {
//     LayoutDashboard,
//     BookOpen,
//     PlusCircle,
//     LogOut,
//     Star,
//     ChevronDown,
//     ChevronRight,
//     List,
//     Edit,
//     Globe,
//     Compass,
//     FileText,
//     Home,
//     Sparkles,  // 👈 NEW: For Consultation Services
//     Building2   // 👈 NEW: For Vastu
// } from 'lucide-react';
// import { useAuth } from '../context/AuthContext';

// const Sidebar = () => {
//     const { admin, logout } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [isCoursesOpen, setIsCoursesOpen] = useState(true);
//     const [isPageContentOpen, setIsPageContentOpen] = useState(false);
//     const [isConsultationOpen, setIsConsultationOpen] = useState(true); // 👈 NEW

//     const handleLogout = () => {
//         logout();
//         navigate('/admin/login');
//     };

//     const isCoursesActive = location.pathname.includes('/admin/courses') || 
//                            location.pathname.includes('/admin/add-course') ||
//                            location.pathname.includes('/admin/edit-course');

//     const isPageContentActive = location.pathname.includes('/admin/page-content');
//     const isConsultationActive = location.pathname.includes('/admin/consultations'); // 👈 NEW

//     return (
//         <aside className="fixed left-0 top-0 h-full w-64 bg-black/90 backdrop-blur-xl border-r border-[#00B7B3]/20 z-50">
//             {/* Logo Section */}
//             <div className="p-6 border-b border-[#00B7B3]/20">
//                 <div className="flex items-center gap-2">
//                     <Star className="w-6 h-6 text-[#00B7B3]" />
//                     <h1 className="text-xl font-bold bg-gradient-to-r from-[#00B7B3] to-[#33C5C2] bg-clip-text text-transparent">
//                         NB Astro Admin
//                     </h1>
//                 </div>
//                 <p className="text-xs text-gray-500 mt-2">Admin Panel</p>
//             </div>

//             {/* Navigation Menu */}
//             <nav className="p-4 space-y-2 overflow-y-auto" style={{ height: 'calc(100% - 140px)' }}>
//                 {/* Dashboard Link */}
//                 <NavLink
//                     href="/admin/dashboard"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`
//                     }
//                 >
//                     <LayoutDashboard className="w-5 h-5 text-emerald-400 group-hover:scale-110 transition-all" />
//                     <span className="font-medium">Dashboard</span>
//                 </NavLink>

//                 {/* Home Page Manager */}
//                 <NavLink
//                     href="/admin/home-page"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`
//                     }
//                 >
//                     <Home className="w-5 h-5 text-[#00B7B3] group-hover:scale-110 transition-all" />
//                     <span className="font-medium">Home Page</span>
//                 </NavLink>

//                 {/* 👇 NEW: Consultation Services Dropdown */}
//                 <div className="space-y-1">
//                     <button
//                         onClick={() => setIsConsultationOpen(!isConsultationOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isConsultationActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <Sparkles className="w-5 h-5 text-purple-400 group-hover:scale-110 transition-all" />
//                             <span className="font-medium">Consultations</span>
//                         </div>
//                         {isConsultationOpen ? (
//                             <ChevronDown className="w-4 h-4" />
//                         ) : (
//                             <ChevronRight className="w-4 h-4" />
//                         )}
//                     </button>

//                     {isConsultationOpen && (
//                         <div className="ml-4 space-y-1 border-l border-[#00B7B3]/20">
//                             <NavLink
//                                 href="/admin/consultations/astrology"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <Sparkles className="w-4 h-4 text-purple-400" />
//                                 <span className="text-sm">Astrology Services</span>
//                             </NavLink>

//                             <NavLink
//                                 href="/admin/consultations/vastu"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <Building2 className="w-4 h-4 text-green-400" />
//                                 <span className="text-sm">Vastu Services</span>
//                             </NavLink>
//                         </div>
//                     )}
//                 </div>

//                 {/* Courses Dropdown */}
//                 <div className="space-y-1">
//                     <button
//                         onClick={() => setIsCoursesOpen(!isCoursesOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isCoursesActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <BookOpen className="w-5 h-5 text-blue-400 group-hover:scale-110 transition-all" />
//                             <span className="font-medium">Courses</span>
//                         </div>
//                         {isCoursesOpen ? (
//                             <ChevronDown className="w-4 h-4" />
//                         ) : (
//                             <ChevronRight className="w-4 h-4" />
//                         )}
//                     </button>

//                     {isCoursesOpen && (
//                         <div className="ml-4 space-y-1 border-l border-[#00B7B3]/20">
//                             <NavLink
//                                 href="/admin/courses"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <List className="w-4 h-4 text-blue-400" />
//                                 <span className="text-sm">Course List</span>
//                             </NavLink>

//                             <NavLink
//                                 href="/admin/add-course"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <PlusCircle className="w-4 h-4 text-purple-400" />
//                                 <span className="text-sm">Add Course</span>
//                             </NavLink>
//                         </div>
//                     )}
//                 </div>

//                 {/* Page Content Dropdown */}
//                 <div className="space-y-1">
//                     <button
//                         onClick={() => setIsPageContentOpen(!isPageContentOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isPageContentActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <Globe className="w-5 h-5 text-yellow-400 group-hover:scale-110 transition-all" />
//                             <span className="font-medium">Page Content</span>
//                         </div>
//                         {isPageContentOpen ? (
//                             <ChevronDown className="w-4 h-4" />
//                         ) : (
//                             <ChevronRight className="w-4 h-4" />
//                         )}
//                     </button>

//                     {isPageContentOpen && (
//                         <div className="ml-4 space-y-1 border-l border-[#00B7B3]/20">
//                             <NavLink
//                                 href="/admin/page-content/astrology"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <Star className="w-4 h-4 text-purple-400" />
//                                 <span className="text-sm">Astrology Page</span>
//                             </NavLink>

//                             <NavLink
//                                 href="/admin/page-content/vastu"
//                                 className={({ isActive }) =>
//                                     `flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all duration-300 group ml-4 ${
//                                         isActive
//                                             ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3]'
//                                             : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                                     }`
//                                 }
//                             >
//                                 <Compass className="w-4 h-4 text-green-400" />
//                                 <span className="text-sm">Vastu Page</span>
//                             </NavLink>
//                         </div>
//                     )}
//                 </div>

//                 {/* About Page */}
//                 <NavLink
//                     href="/admin/about-page"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
//                             isActive
//                                 ? 'bg-gradient-to-r from-[#00B7B3]/20 to-transparent text-[#00B7B3] border-l-2 border-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-white/5 hover:text-white'
//                         }`
//                     }
//                 >
//                     <FileText className="w-5 h-5 text-orange-400 group-hover:scale-110 transition-all" />
//                     <span className="font-medium">About Page</span>
//                 </NavLink>
//             </nav>

//             {/* User Info & Logout Section */}
//             <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-[#00B7B3]/20 bg-black/50">
//                 <div className="flex items-center gap-3 mb-4 px-2">
//                     <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00B7B3] to-[#33C5C2] flex items-center justify-center text-black font-bold shadow-lg">
//                         {admin?.name?.charAt(0) || 'A'}
//                     </div>
//                     <div className="flex-1">
//                         <p className="text-white text-sm font-medium truncate">{admin?.name || 'Admin'}</p>
//                         <p className="text-gray-500 text-xs capitalize">{admin?.role || 'Admin'}</p>
//                     </div>
//                 </div>
                
//                 <button
//                     onClick={handleLogout}
//                     className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-300 w-full group"
//                 >
//                     <LogOut className="w-5 h-5 group-hover:scale-110 transition-transform" />
//                     <span className="font-medium">Logout</span>
//                 </button>
//             </div>
//         </aside>
//     );
// };

// export default Sidebar;



// // admin/components/Sidebar.jsx
// import React, { useState } from 'react';
// import { useAuth } from '../context/AuthContext';

// const Sidebar = () => {
//     const { admin, logout } = useAuth();
//     const navigate = useNavigate();
//     const location = useLocation();
//     const [isCoursesOpen, setIsCoursesOpen] = useState(true);
//     const [isPageContentOpen, setIsPageContentOpen] = useState(false);
//     const [isConsultationOpen, setIsConsultationOpen] = useState(true);

//     const handleLogout = () => {
//         logout();
//         navigate('/admin/login');
//     };

//     const isCoursesActive = location.pathname.includes('/admin/courses') || 
//                            location.pathname.includes('/admin/add-course') ||
//                            location.pathname.includes('/admin/edit-course');

//     const isPageContentActive = location.pathname.includes('/admin/page-content');
//     const isConsultationActive = location.pathname.includes('/admin/consultations');

//     return (
//         <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-800 z-50">
//             {/* Logo Section */}
//             <div className="p-6 border-b border-gray-800">
//                 <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 rounded-lg bg-[#00B7B3] flex items-center justify-center">
//                         <span className="text-black font-bold text-lg">NB</span>
//                     </div>
//                     <div>
//                         <h1 className="text-lg font-bold text-white">NB Astro</h1>
//                         <p className="text-xs text-gray-500">Admin Panel</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Navigation Menu */}
//             <nav className="p-4 space-y-1 overflow-y-auto" style={{ height: 'calc(100% - 140px)' }}>
//                 {/* Dashboard */}
//                 <NavLink
//                     href="/admin/dashboard"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
//                             isActive
//                                 ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                         }`
//                     }
//                 >
//                     <span className="text-lg">📊</span>
//                     <span className="text-sm font-medium">Dashboard</span>
//                 </NavLink>

//                 {/* Home Page */}
//                 <NavLink
//                     href="/admin/home-page"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
//                             isActive
//                                 ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                         }`
//                     }
//                 >
//                     <span className="text-lg">🏠</span>
//                     <span className="text-sm font-medium">Home Page</span>
//                 </NavLink>

//                 {/* Consultations Dropdown */}
//                 <div>
//                     <button
//                         onClick={() => setIsConsultationOpen(!isConsultationOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all ${
//                             isConsultationActive
//                                 ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <span className="text-lg">🔮</span>
//                             <span className="text-sm font-medium">Consultations</span>
//                         </div>
//                         <span className="text-xs">{isConsultationOpen ? '▼' : '▶'}</span>
//                     </button>

//                     {isConsultationOpen && (
//                         <div className="ml-6 mt-1 space-y-1 border-l border-gray-700 pl-3">
//                             <NavLink
//                                 href="/admin/consultations/astrology"
//                                 className={({ isActive }) =>
//                                     `block px-4 py-2 rounded-lg text-sm transition-all ${
//                                         isActive
//                                             ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                             : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
//                                     }`
//                                 }
//                             >
//                                 Astrology Services
//                             </NavLink>
//                             <NavLink
//                                 href="/admin/consultations/vastu"
//                                 className={({ isActive }) =>
//                                     `block px-4 py-2 rounded-lg text-sm transition-all ${
//                                         isActive
//                                             ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                             : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
//                                     }`
//                                 }
//                             >
//                                 Vastu Services
//                             </NavLink>
//                         </div>
//                     )}
//                 </div>

//                 {/* Courses Dropdown */}
//                 <div>
//                     <button
//                         onClick={() => setIsCoursesOpen(!isCoursesOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all ${
//                             isCoursesActive
//                                 ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <span className="text-lg">📚</span>
//                             <span className="text-sm font-medium">Courses</span>
//                         </div>
//                         <span className="text-xs">{isCoursesOpen ? '▼' : '▶'}</span>
//                     </button>

//                     {isCoursesOpen && (
//                         <div className="ml-6 mt-1 space-y-1 border-l border-gray-700 pl-3">
//                             <NavLink
//                                 href="/admin/courses"
//                                 className={({ isActive }) =>
//                                     `block px-4 py-2 rounded-lg text-sm transition-all ${
//                                         isActive
//                                             ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                             : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
//                                     }`
//                                 }
//                             >
//                                 Course List
//                             </NavLink>
//                             <NavLink
//                                 href="/admin/add-course"
//                                 className={({ isActive }) =>
//                                     `block px-4 py-2 rounded-lg text-sm transition-all ${
//                                         isActive
//                                             ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                             : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
//                                     }`
//                                 }
//                             >
//                                 Add Course
//                             </NavLink>
//                         </div>
//                     )}
//                 </div>

//                 {/* Page Content Dropdown */}
//                 <div>
//                     <button
//                         onClick={() => setIsPageContentOpen(!isPageContentOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all ${
//                             isPageContentActive
//                                 ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <span className="text-lg">📄</span>
//                             <span className="text-sm font-medium">Page Content</span>
//                         </div>
//                         <span className="text-xs">{isPageContentOpen ? '▼' : '▶'}</span>
//                     </button>

//                     {isPageContentOpen && (
//                         <div className="ml-6 mt-1 space-y-1 border-l border-gray-700 pl-3">
//                             <NavLink
//                                 href="/admin/page-content/astrology"
//                                 className={({ isActive }) =>
//                                     `block px-4 py-2 rounded-lg text-sm transition-all ${
//                                         isActive
//                                             ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                             : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
//                                     }`
//                                 }
//                             >
//                                 Astrology Page
//                             </NavLink>
//                             <NavLink
//                                 href="/admin/page-content/vastu"
//                                 className={({ isActive }) =>
//                                     `block px-4 py-2 rounded-lg text-sm transition-all ${
//                                         isActive
//                                             ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                             : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
//                                     }`
//                                 }
//                             >
//                                 Vastu Page
//                             </NavLink>
//                         </div>
//                     )}
//                 </div>

//                 {/* About Page */}
//                 <NavLink
//                     href="/admin/about-page"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
//                             isActive
//                                 ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                         }`
//                     }
//                 >
//                     <span className="text-lg">ℹ️</span>
//                     <span className="text-sm font-medium">About Page</span>
//                 </NavLink>
//             </nav>

//             {/* User Info & Logout */}
//             <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 bg-gray-900">
//                 <div className="flex items-center gap-3 mb-3 px-2">
//                     <div className="w-9 h-9 rounded-lg bg-[#00B7B3]/20 flex items-center justify-center">
//                         <span className="text-[#00B7B3] font-bold text-sm">
//                             {admin?.name?.charAt(0) || 'A'}
//                         </span>
//                     </div>
//                     <div className="flex-1">
//                         <p className="text-white text-sm font-medium truncate">{admin?.name || 'Admin'}</p>
//                         <p className="text-gray-500 text-xs capitalize">{admin?.role || 'Admin'}</p>
//                     </div>
//                 </div>
                
//                 <button
//                     onClick={handleLogout}
//                     className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all w-full"
//                 >
//                     <span className="text-lg">🚪</span>
//                     <span className="text-sm font-medium">Logout</span>
//                 </button>
//             </div>
//         </aside>
//     );
// };

// export default Sidebar;



// // admin/components/Sidebar.jsx
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useAuth } from '../context/AuthContext';

// const normalizePath = (path = '') => path.split('?')[0].replace(/\/$/, '') || '/';

// const NavLink = ({ to, href, className, children }) => {
//     const router = useRouter();
//     const target = normalizePath(to || href);
//     const current = normalizePath(router.asPath || router.pathname);
//     const isActive = current === target || current.startsWith(`${target}/`);
//     const resolvedClassName = typeof className === 'function' ? className({ isActive }) : className;

//     return (
//         <Link href={to || href} className={resolvedClassName}>
//             {children}
//         </Link>
//     );
// };

// const Sidebar = () => {
//     const { admin, logout } = useAuth();
//     const router = useRouter();
//     const pathname = router.asPath?.split('?')[0] || router.pathname || '';
//     const [isCoursesOpen, setIsCoursesOpen] = useState(true);
//     const [isPageContentOpen, setIsPageContentOpen] = useState(false);
//     const [isConsultationOpen, setIsConsultationOpen] = useState(true);

//     const handleLogout = () => {
//         logout();
//         router.push('/admin/login');
//     };

//     const isCoursesActive = pathname.includes('/admin/courses') || 
//                            pathname.includes('/admin/add-course') ||
//                            pathname.includes('/admin/edit-course');

//     const isPageContentActive = pathname.includes('/admin/page-content');
//     const isConsultationActive = pathname.includes('/admin/consultations');

//     return (
//         <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-800 z-50">
//             {/* Logo Section */}
//             <div className="p-6 border-b border-gray-800">
//                 <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 rounded-lg bg-[#00B7B3] flex items-center justify-center">
//                         <span className="text-black font-bold text-lg">NB</span>
//                     </div>
//                     <div>
//                         <h1 className="text-lg font-bold text-white">NB Astro</h1>
//                         <p className="text-xs text-gray-500">Admin Panel</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Navigation Menu */}
//             <nav className="p-4 space-y-1 overflow-y-auto" style={{ height: 'calc(100% - 140px)' }}>
//                 {/* Dashboard */}
//                 <NavLink
//                     href="/admin/dashboard"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
//                             isActive
//                                 ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                         }`
//                     }
//                 >
//                     <span className="text-lg">📊</span>
//                     <span className="text-sm font-medium">Dashboard</span>
//                 </NavLink>

//                 {/* Home Page */}
//                 <NavLink
//                     href="/admin/home-page"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
//                             isActive
//                                 ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                         }`
//                     }
//                 >
//                     <span className="text-lg">🏠</span>
//                     <span className="text-sm font-medium">Home Page</span>
//                 </NavLink>

//                 {/* 👇 NEW: Appointments Menu */}
//                 <NavLink
//                     href="/admin/appointments"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
//                             isActive
//                                 ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                         }`
//                     }
//                 >
//                     <span className="text-lg">📅</span>
//                     <span className="text-sm font-medium">Appointments</span>
//                 </NavLink>

//                 {/* Consultations Dropdown */}
//                 <div>
//                     <button
//                         onClick={() => setIsConsultationOpen(!isConsultationOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all ${
//                             isConsultationActive
//                                 ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <span className="text-lg">🔮</span>
//                             <span className="text-sm font-medium">Consultations</span>
//                         </div>
//                         <span className="text-xs">{isConsultationOpen ? '▼' : '▶'}</span>
//                     </button>

//                     {isConsultationOpen && (
//                         <div className="ml-6 mt-1 space-y-1 border-l border-gray-700 pl-3">
//                             <NavLink
//                                 href="/admin/consultations/astrology"
//                                 className={({ isActive }) =>
//                                     `block px-4 py-2 rounded-lg text-sm transition-all ${
//                                         isActive
//                                             ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                             : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
//                                     }`
//                                 }
//                             >
//                                 Astrology Services
//                             </NavLink>
//                             <NavLink
//                                 href="/admin/consultations/vastu"
//                                 className={({ isActive }) =>
//                                     `block px-4 py-2 rounded-lg text-sm transition-all ${
//                                         isActive
//                                             ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                             : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
//                                     }`
//                                 }
//                             >
//                                 Vastu Services
//                             </NavLink>
//                         </div>
//                     )}
//                 </div>

//                 {/* Courses Dropdown */}
//                 <div>
//                     <button
//                         onClick={() => setIsCoursesOpen(!isCoursesOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all ${
//                             isCoursesActive
//                                 ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <span className="text-lg">📚</span>
//                             <span className="text-sm font-medium">Courses</span>
//                         </div>
//                         <span className="text-xs">{isCoursesOpen ? '▼' : '▶'}</span>
//                     </button>

//                     {isCoursesOpen && (
//                         <div className="ml-6 mt-1 space-y-1 border-l border-gray-700 pl-3">
//                             <NavLink
//                                 href="/admin/courses"
//                                 className={({ isActive }) =>
//                                     `block px-4 py-2 rounded-lg text-sm transition-all ${
//                                         isActive
//                                             ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                             : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
//                                     }`
//                                 }
//                             >
//                                 Course List
//                             </NavLink>
//                             <NavLink
//                                 href="/admin/add-course"
//                                 className={({ isActive }) =>
//                                     `block px-4 py-2 rounded-lg text-sm transition-all ${
//                                         isActive
//                                             ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                             : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
//                                     }`
//                                 }
//                             >
//                                 Add Course
//                             </NavLink>
//                         </div>
//                     )}
//                 </div>

//                 {/* Page Content Dropdown */}
//                 <div>
//                     <button
//                         onClick={() => setIsPageContentOpen(!isPageContentOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all ${
//                             isPageContentActive
//                                 ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <span className="text-lg">📄</span>
//                             <span className="text-sm font-medium">Page Content</span>
//                         </div>
//                         <span className="text-xs">{isPageContentOpen ? '▼' : '▶'}</span>
//                     </button>

//                     {isPageContentOpen && (
//                         <div className="ml-6 mt-1 space-y-1 border-l border-gray-700 pl-3">
//                             <NavLink
//                                 href="/admin/page-content/astrology"
//                                 className={({ isActive }) =>
//                                     `block px-4 py-2 rounded-lg text-sm transition-all ${
//                                         isActive
//                                             ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                             : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
//                                     }`
//                                 }
//                             >
//                                 Astrology Page
//                             </NavLink>
//                             <NavLink
//                                 href="/admin/page-content/vastu"
//                                 className={({ isActive }) =>
//                                     `block px-4 py-2 rounded-lg text-sm transition-all ${
//                                         isActive
//                                             ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                             : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
//                                     }`
//                                 }
//                             >
//                                 Vastu Page
//                             </NavLink>
//                         </div>
//                     )}
//                 </div>

//                 {/* About Page */}
//                 <NavLink
//                     href="/admin/about-page"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
//                             isActive
//                                 ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                         }`
//                     }
//                 >
//                     <span className="text-lg">ℹ️</span>
//                     <span className="text-sm font-medium">About Page</span>
//                 </NavLink>

//                 {/* Settings & Admin Management */}
//                 <NavLink
//                     href="/admin/settings"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
//                             isActive
//                                 ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                         }`
//                     }
//                 >
//                     <span className="text-lg">⚙️</span>
//                     <span className="text-sm font-medium">Settings</span>
//                 </NavLink>
//             </nav>

//             {/* User Info & Logout */}
//             <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 bg-gray-900">
//                 <div className="flex items-center gap-3 mb-3 px-2">
//                     <div className="w-9 h-9 rounded-lg bg-[#00B7B3]/20 flex items-center justify-center">
//                         <span className="text-[#00B7B3] font-bold text-sm">
//                             {admin?.name?.charAt(0) || 'A'}
//                         </span>
//                     </div>
//                     <div className="flex-1">
//                         <p className="text-white text-sm font-medium truncate">{admin?.name || 'Admin'}</p>
//                         <p className="text-gray-500 text-xs capitalize">{admin?.role || 'Admin'}</p>
//                     </div>
//                 </div>
                
//                 <button
//                     onClick={handleLogout}
//                     className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all w-full"
//                 >
//                     <span className="text-lg">🚪</span>
//                     <span className="text-sm font-medium">Logout</span>
//                 </button>
//             </div>
//         </aside>
//     );
// };

// export default Sidebar;


// // admin/components/Sidebar.jsx
// import React, { useState } from 'react';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import { useAuth } from '../context/AuthContext';

// const normalizePath = (path = '') => path.split('?')[0].replace(/\/$/, '') || '/';

// const NavLink = ({ to, href, className, children }) => {
//     const router = useRouter();
//     const target = normalizePath(to || href);
//     const current = normalizePath(router.asPath || router.pathname);
//     const isActive = current === target || current.startsWith(`${target}/`);
//     const resolvedClassName = typeof className === 'function' ? className({ isActive }) : className;

//     return (
//         <Link href={to || href} className={resolvedClassName}>
//             {children}
//         </Link>
//     );
// };

// const Sidebar = () => {
//     const { admin, logout } = useAuth();
//     const router = useRouter();
//     const pathname = router.asPath?.split('?')[0] || router.pathname || '';
//     const [isCoursesOpen, setIsCoursesOpen] = useState(true);
//     const [isPageContentOpen, setIsPageContentOpen] = useState(false);
//     const [isConsultationOpen, setIsConsultationOpen] = useState(true);

//     const handleLogout = () => {
//         logout();
//         router.push('/admin/login');
//     };

//     const isCoursesActive = pathname.includes('/admin/courses') || 
//                            pathname.includes('/admin/add-course') ||
//                            pathname.includes('/admin/edit-course');

//     const isPageContentActive = pathname.includes('/admin/page-content');
//     const isConsultationActive = pathname.includes('/admin/consultations');

//     return (
//         <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-800 z-50">
//             {/* Logo Section */}
//             <div className="p-6 border-b border-gray-800">
//                 <div className="flex items-center gap-2">
//                     <div className="w-8 h-8 rounded-lg bg-[#00B7B3] flex items-center justify-center">
//                         <span className="text-black font-bold text-lg">NB</span>
//                     </div>
//                     <div>
//                         <h1 className="text-lg font-bold text-white">NB Astro</h1>
//                         <p className="text-xs text-gray-500">Admin Panel</p>
//                     </div>
//                 </div>
//             </div>

//             {/* Navigation Menu */}
//             <nav className="p-4 space-y-1 overflow-y-auto" style={{ height: 'calc(100% - 140px)' }}>
//                 {/* Dashboard */}
//                 <NavLink
//                     href="/admin/dashboard"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
//                             isActive
//                                 ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                         }`
//                     }
//                 >
//                     <span className="text-lg">📊</span>
//                     <span className="text-sm font-medium">Dashboard</span>
//                 </NavLink>

//                 {/* Home Page */}
//                 <NavLink
//                     href="/admin/home-page"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
//                             isActive
//                                 ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                         }`
//                     }
//                 >
//                     <span className="text-lg">🏠</span>
//                     <span className="text-sm font-medium">Home Page</span>
//                 </NavLink>

//                 {/* Appointments Menu */}
//                 <NavLink
//                     href="/admin/appointments"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
//                             isActive
//                                 ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                         }`
//                     }
//                 >
//                     <span className="text-lg">📅</span>
//                     <span className="text-sm font-medium">Appointments</span>
//                 </NavLink>

//                 {/* Consultations Dropdown */}
//                 <div>
//                     <button
//                         onClick={() => setIsConsultationOpen(!isConsultationOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all ${
//                             isConsultationActive
//                                 ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <span className="text-lg">🔮</span>
//                             <span className="text-sm font-medium">Consultations</span>
//                         </div>
//                         <span className="text-xs">{isConsultationOpen ? '▼' : '▶'}</span>
//                     </button>

//                     {isConsultationOpen && (
//                         <div className="ml-6 mt-1 space-y-1 border-l border-gray-700 pl-3">
//                             <NavLink
//                                 href="/admin/consultations/astrology"
//                                 className={({ isActive }) =>
//                                     `block px-4 py-2 rounded-lg text-sm transition-all ${
//                                         isActive
//                                             ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                             : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
//                                     }`
//                                 }
//                             >
//                                 Astrology Services
//                             </NavLink>
//                             <NavLink
//                                 href="/admin/consultations/vastu"
//                                 className={({ isActive }) =>
//                                     `block px-4 py-2 rounded-lg text-sm transition-all ${
//                                         isActive
//                                             ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                             : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
//                                     }`
//                                 }
//                             >
//                                 Vastu Services
//                             </NavLink>
//                         </div>
//                     )}
//                 </div>

//                 {/* Courses Dropdown */}
//                 <div>
//                     <button
//                         onClick={() => setIsCoursesOpen(!isCoursesOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all ${
//                             isCoursesActive
//                                 ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <span className="text-lg">📚</span>
//                             <span className="text-sm font-medium">Courses</span>
//                         </div>
//                         <span className="text-xs">{isCoursesOpen ? '▼' : '▶'}</span>
//                     </button>

//                     {isCoursesOpen && (
//                         <div className="ml-6 mt-1 space-y-1 border-l border-gray-700 pl-3">
//                             <NavLink
//                                 href="/admin/courses"
//                                 className={({ isActive }) =>
//                                     `block px-4 py-2 rounded-lg text-sm transition-all ${
//                                         isActive
//                                             ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                             : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
//                                     }`
//                                 }
//                             >
//                                 Course List
//                             </NavLink>
//                             <NavLink
//                                 href="/admin/add-course"
//                                 className={({ isActive }) =>
//                                     `block px-4 py-2 rounded-lg text-sm transition-all ${
//                                         isActive
//                                             ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                             : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
//                                     }`
//                                 }
//                             >
//                                 Add Course
//                             </NavLink>
//                         </div>
//                     )}
//                 </div>

//                 {/* Page Content Dropdown */}
//                 <div>
//                     <button
//                         onClick={() => setIsPageContentOpen(!isPageContentOpen)}
//                         className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all ${
//                             isPageContentActive
//                                 ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                         }`}
//                     >
//                         <div className="flex items-center gap-3">
//                             <span className="text-lg">📄</span>
//                             <span className="text-sm font-medium">Page Content</span>
//                         </div>
//                         <span className="text-xs">{isPageContentOpen ? '▼' : '▶'}</span>
//                     </button>

//                     {isPageContentOpen && (
//                         <div className="ml-6 mt-1 space-y-1 border-l border-gray-700 pl-3">
//                             <NavLink
//                                 href="/admin/page-content/astrology"
//                                 className={({ isActive }) =>
//                                     `block px-4 py-2 rounded-lg text-sm transition-all ${
//                                         isActive
//                                             ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                             : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
//                                     }`
//                                 }
//                             >
//                                 Astrology Page
//                             </NavLink>
//                             <NavLink
//                                 href="/admin/page-content/vastu"
//                                 className={({ isActive }) =>
//                                     `block px-4 py-2 rounded-lg text-sm transition-all ${
//                                         isActive
//                                             ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                             : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
//                                     }`
//                                 }
//                             >
//                                 Vastu Page
//                             </NavLink>
//                         </div>
//                     )}
//                 </div>

//                 {/* About Page */}
//                 <NavLink
//                     href="/admin/about-page"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
//                             isActive
//                                 ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                         }`
//                     }
//                 >
//                     <span className="text-lg">ℹ️</span>
//                     <span className="text-sm font-medium">About Page</span>
//                 </NavLink>

//                 {/* ✅ NEW: Media Library */}
//                 <NavLink
//                     href="/admin/media"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
//                             isActive
//                                 ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                         }`
//                     }
//                 >
//                     <span className="text-lg">🖼️</span>
//                     <span className="text-sm font-medium">Media Library</span>
//                 </NavLink>

//                 {/* Settings & Admin Management */}
//                 <NavLink
//                     href="/admin/settings"
//                     className={({ isActive }) =>
//                         `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
//                             isActive
//                                 ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
//                                 : 'text-gray-400 hover:bg-gray-800 hover:text-white'
//                         }`
//                     }
//                 >
//                     <span className="text-lg">⚙️</span>
//                     <span className="text-sm font-medium">Settings</span>
//                 </NavLink>
//             </nav>

//             {/* User Info & Logout */}
//             <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 bg-gray-900">
//                 <div className="flex items-center gap-3 mb-3 px-2">
//                     <div className="w-9 h-9 rounded-lg bg-[#00B7B3]/20 flex items-center justify-center">
//                         <span className="text-[#00B7B3] font-bold text-sm">
//                             {admin?.name?.charAt(0) || 'A'}
//                         </span>
//                     </div>
//                     <div className="flex-1">
//                         <p className="text-white text-sm font-medium truncate">{admin?.name || 'Admin'}</p>
//                         <p className="text-gray-500 text-xs capitalize">{admin?.role || 'Admin'}</p>
//                     </div>
//                 </div>
                
//                 <button
//                     onClick={handleLogout}
//                     className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all w-full"
//                 >
//                     <span className="text-lg">🚪</span>
//                     <span className="text-sm font-medium">Logout</span>
//                 </button>
//             </div>
//         </aside>
//     );
// };

// export default Sidebar;


import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../context/AuthContext';

const normalizePath = (path = '') => path.split('?')[0].replace(/\/$/, '') || '/';

const NavLink = ({ to, href, className, children }) => {
    const router = useRouter();
    const target = normalizePath(to || href);
    const current = normalizePath(router.asPath || router.pathname);
    const isActive = current === target || current.startsWith(`${target}/`);
    const resolvedClassName = typeof className === 'function' ? className({ isActive }) : className;

    return (
        <Link href={to || href} className={resolvedClassName}>
            {children}
        </Link>
    );
};

const Sidebar = () => {
    const { admin, logout } = useAuth();
    const router = useRouter();
    const pathname = router.asPath?.split('?')[0] || router.pathname || '';
    const [isCoursesOpen, setIsCoursesOpen] = useState(true);
    const [isPageContentOpen, setIsPageContentOpen] = useState(false);
    const [isConsultationOpen, setIsConsultationOpen] = useState(true);

    const handleLogout = () => {
        logout();
        router.push('/admin/login');
    };

    const isCoursesActive = pathname.includes('/admin/courses') || 
                           pathname.includes('/admin/add-course') ||
                           pathname.includes('/admin/edit-course');

    const isPageContentActive = pathname.includes('/admin/page-content');
    const isConsultationActive = pathname.includes('/admin/consultations');

    return (
        <aside className="fixed left-0 top-0 h-full w-64 bg-gray-900 border-r border-gray-800 z-50">
            {/* Logo Section */}
            <div className="p-6 border-b border-gray-800">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-[#00B7B3] flex items-center justify-center">
                        <span className="text-black font-bold text-lg">NB</span>
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-white">NB Astro</h1>
                        <p className="text-xs text-gray-500">Admin Panel</p>
                    </div>
                </div>
            </div>

            {/* Navigation Menu */}
            <nav className="p-4 space-y-1 overflow-y-auto" style={{ height: 'calc(100% - 140px)' }}>
                {/* Dashboard */}
                <NavLink
                    href="/admin/dashboard"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                            isActive
                                ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`
                    }
                >
                    <span className="text-lg">📊</span>
                    <span className="text-sm font-medium">Dashboard</span>
                </NavLink>

                {/* Home Page */}
                <NavLink
                    href="/admin/home-page"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                            isActive
                                ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`
                    }
                >
                    <span className="text-lg">🏠</span>
                    <span className="text-sm font-medium">Home Page</span>
                </NavLink>

                {/* Appointments Menu */}
                <NavLink
                    href="/admin/appointments"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                            isActive
                                ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`
                    }
                >
                    <span className="text-lg">📅</span>
                    <span className="text-sm font-medium">Appointments</span>
                </NavLink>

                {/* Consultations Dropdown */}
                <div>
                    <button
                        onClick={() => setIsConsultationOpen(!isConsultationOpen)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all ${
                            isConsultationActive
                                ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-lg">🔮</span>
                            <span className="text-sm font-medium">Consultations</span>
                        </div>
                        <span className="text-xs">{isConsultationOpen ? '▼' : '▶'}</span>
                    </button>

                    {isConsultationOpen && (
                        <div className="ml-6 mt-1 space-y-1 border-l border-gray-700 pl-3">
                            <NavLink
                                href="/admin/consultations/astrology"
                                className={({ isActive }) =>
                                    `block px-4 py-2 rounded-lg text-sm transition-all ${
                                        isActive
                                            ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
                                            : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
                                    }`
                                }
                            >
                                Astrology Services
                            </NavLink>
                            <NavLink
                                href="/admin/consultations/vastu"
                                className={({ isActive }) =>
                                    `block px-4 py-2 rounded-lg text-sm transition-all ${
                                        isActive
                                            ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
                                            : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
                                    }`
                                }
                            >
                                Vastu Services
                            </NavLink>
                        </div>
                    )}
                </div>

                {/* Courses Dropdown */}
                <div>
                    <button
                        onClick={() => setIsCoursesOpen(!isCoursesOpen)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all ${
                            isCoursesActive
                                ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-lg">📚</span>
                            <span className="text-sm font-medium">Courses</span>
                        </div>
                        <span className="text-xs">{isCoursesOpen ? '▼' : '▶'}</span>
                    </button>

                    {isCoursesOpen && (
                        <div className="ml-6 mt-1 space-y-1 border-l border-gray-700 pl-3">
                            <NavLink
                                href="/admin/courses"
                                className={({ isActive }) =>
                                    `block px-4 py-2 rounded-lg text-sm transition-all ${
                                        isActive
                                            ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
                                            : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
                                    }`
                                }
                            >
                                Course List
                            </NavLink>
                            <NavLink
                                href="/admin/add-course"
                                className={({ isActive }) =>
                                    `block px-4 py-2 rounded-lg text-sm transition-all ${
                                        isActive
                                            ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
                                            : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
                                    }`
                                }
                            >
                                Add Course
                            </NavLink>
                        </div>
                    )}
                </div>

                {/* Page Content Dropdown */}
                <div>
                    <button
                        onClick={() => setIsPageContentOpen(!isPageContentOpen)}
                        className={`w-full flex items-center justify-between px-4 py-2.5 rounded-lg transition-all ${
                            isPageContentActive
                                ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`}
                    >
                        <div className="flex items-center gap-3">
                            <span className="text-lg">📄</span>
                            <span className="text-sm font-medium">Page Content</span>
                        </div>
                        <span className="text-xs">{isPageContentOpen ? '▼' : '▶'}</span>
                    </button>

                    {isPageContentOpen && (
                        <div className="ml-6 mt-1 space-y-1 border-l border-gray-700 pl-3">
                            <NavLink
                                href="/admin/page-content/astrology"
                                className={({ isActive }) =>
                                    `block px-4 py-2 rounded-lg text-sm transition-all ${
                                        isActive
                                            ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
                                            : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
                                    }`
                                }
                            >
                                Astrology Page
                            </NavLink>
                            <NavLink
                                href="/admin/page-content/vastu"
                                className={({ isActive }) =>
                                    `block px-4 py-2 rounded-lg text-sm transition-all ${
                                        isActive
                                            ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
                                            : 'text-gray-500 hover:bg-gray-800 hover:text-gray-300'
                                    }`
                                }
                            >
                                Vastu Page
                            </NavLink>
                        </div>
                    )}
                </div>

                {/* About Page */}
                <NavLink
                    href="/admin/about-page"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                            isActive
                                ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`
                    }
                >
                    <span className="text-lg">ℹ️</span>
                    <span className="text-sm font-medium">About Page</span>
                </NavLink>

                {/* ✅ NEW: Blog */}
                <NavLink
                    href="/admin/blog"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                            isActive
                                ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`
                    }
                >
                    <span className="text-lg">📝</span>
                    <span className="text-sm font-medium">Blog</span>
                </NavLink>

                {/* Media Library */}
                <NavLink
                    href="/admin/media"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                            isActive
                                ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`
                    }
                >
                    <span className="text-lg">🖼️</span>
                    <span className="text-sm font-medium">Media Library</span>
                </NavLink>

                {/* Settings & Admin Management */}
                <NavLink
                    href="/admin/settings"
                    className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all ${
                            isActive
                                ? 'bg-[#00B7B3]/10 text-[#00B7B3]'
                                : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                        }`
                    }
                >
                    <span className="text-lg">⚙️</span>
                    <span className="text-sm font-medium">Settings</span>
                </NavLink>
            </nav>

            {/* User Info & Logout */}
            <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 bg-gray-900">
                <div className="flex items-center gap-3 mb-3 px-2">
                    <div className="w-9 h-9 rounded-lg bg-[#00B7B3]/20 flex items-center justify-center">
                        <span className="text-[#00B7B3] font-bold text-sm">
                            {admin?.name?.charAt(0) || 'A'}
                        </span>
                    </div>
                    <div className="flex-1">
                        <p className="text-white text-sm font-medium truncate">{admin?.name || 'Admin'}</p>
                        <p className="text-gray-500 text-xs capitalize">{admin?.role || 'Admin'}</p>
                    </div>
                </div>
                
                <button
                    onClick={handleLogout}
                    className="flex items-center gap-3 px-4 py-2 rounded-lg text-red-400 hover:bg-red-500/10 transition-all w-full"
                >
                    <span className="text-lg">🚪</span>
                    <span className="text-sm font-medium">Logout</span>
                </button>
            </div>
        </aside>
    );
};

export default Sidebar;