



// // services/api.js - Complete file with all APIs including image upload helpers

// import axios from 'axios';

// const API_URL = '/api';

// const api = axios.create({
//     baseURL: API_URL,
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

// // Add token to requests
// api.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('adminToken');
//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => Promise.reject(error)
// );

// // Admin APIs
// export const adminAPI = {
//     login: (data) => api.post('/admin/login', data),
//     getProfile: () => api.get('/admin/profile'),
//     updateProfile: (data) => api.put('/admin/profile', data),
//     changePassword: (data) => api.put('/admin/change-password', data),
//     getAllAdmins: () => api.get('/admin/all'),
//     createAdmin: (data) => api.post('/admin/create', data),
//     toggleAdminStatus: (id) => api.patch(`/admin/${id}/toggle-status`),
//     deleteAdmin: (id) => api.delete(`/admin/${id}`)
// };

// // Course APIs
// export const courseAPI = {
//     getAll: (params) => api.get('/courses', { params }),
//     getById: (id) => api.get(`/courses/id/${id}`),
//     getBySlug: (slug) => api.get(`/courses/slug/${slug}`),
//     create: (data) => api.post('/courses', data),
//     update: (id, data) => api.put(`/courses/${id}`, data),
//     delete: (id) => api.delete(`/courses/${id}`),
//     toggleStatus: (id) => api.patch(`/courses/${id}/toggle-status`),
//     getStats: () => api.get('/courses/stats')
// };

// // PAGE CONTENT APIs
// export const pageContentAPI = {
//     getByType: (pageType) => {
//         const type = pageType.toUpperCase();
//         return api.get(`/page-content/${type}`);
//     },
//     save: (pageType, data) => {
//         const type = pageType.toUpperCase();
//         return api.post(`/page-content/${type}`, data);
//     },
//     create: (pageType, data) => {
//         const type = pageType.toUpperCase();
//         return api.post(`/page-content/${type}`, data);
//     },
//     updateByType: (pageType, data) => {
//         const type = pageType.toUpperCase();
//         return api.put(`/page-content/${type}`, data);
//     },
//     delete: (pageType) => {
//         const type = pageType.toUpperCase();
//         return api.delete(`/page-content/${type}`);
//     }
// };

// // About Page APIs
// export const aboutPageAPI = {
//     getContent: () => api.get('/about-page'),
//     saveContent: (data) => api.post('/about-page', data),
//     updateContent: (data) => api.put('/about-page', data)
// };

// // ==================== HOME PAGE APIs ====================
// export const homeAPI = {
//     // Hero Slides
//     getHeroSlides: () => api.get('/home/hero-slides'),
//     createHeroSlide: (data) => {
//         const formData = new FormData();
//         Object.keys(data).forEach(key => {
//             if (key === 'image' || key === 'mobileImage') {
//                 if (data[key] instanceof File) {
//                     formData.append(key, data[key]);
//                 }
//             } else if (key === 'icon' || key === 'title' || key === 'highlight' || key === 'description' || key === 'link' || key === 'order') {
//                 formData.append(key, data[key]);
//             }
//         });
//         return api.post('/home/hero-slides', formData, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//         });
//     },
//     updateHeroSlide: (id, data) => {
//         const formData = new FormData();
//         Object.keys(data).forEach(key => {
//             if (key === 'image' || key === 'mobileImage') {
//                 if (data[key] instanceof File) {
//                     formData.append(key, data[key]);
//                 }
//             } else if (key === 'icon' || key === 'title' || key === 'highlight' || key === 'description' || key === 'link' || key === 'order' || key === 'isActive') {
//                 formData.append(key, data[key]);
//             }
//         });
//         return api.put(`/home/hero-slides/${id}`, formData, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//         });
//     },
//     deleteHeroSlide: (id) => api.delete(`/home/hero-slides/${id}`),
//     toggleHeroSlideStatus: (id) => api.patch(`/home/hero-slides/${id}/toggle-status`),

//     // Features
//     getFeatures: () => api.get('/home/features'),
//     createFeature: (data) => api.post('/home/features', data),
//     updateFeature: (id, data) => api.put(`/home/features/${id}`, data),
//     deleteFeature: (id) => api.delete(`/home/features/${id}`),
//     toggleFeatureStatus: (id) => api.patch(`/home/features/${id}/toggle-status`),

//     // Services
//     getServices: () => api.get('/home/services'),
//     getMainServices: () => api.get('/home/services/main'),
//     getSubServices: () => api.get('/home/services/sub'),
//     createService: (data) => {
//         const formData = new FormData();
//         Object.keys(data).forEach(key => {
//             if (key === 'serviceImage') {
//                 if (data[key] instanceof File) {
//                     formData.append(key, data[key]);
//                 }
//             } else if (key === 'label' || key === 'path' || key === 'icon' || key === 'description' || key === 'type' || key === 'order') {
//                 formData.append(key, data[key]);
//             }
//         });
//         return api.post('/home/services', formData, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//         });
//     },
//     updateService: (id, data) => {
//         const formData = new FormData();
//         Object.keys(data).forEach(key => {
//             if (key === 'serviceImage') {
//                 if (data[key] instanceof File) {
//                     formData.append(key, data[key]);
//                 }
//             } else if (key === 'label' || key === 'path' || key === 'icon' || key === 'description' || key === 'type' || key === 'order' || key === 'isActive') {
//                 formData.append(key, data[key]);
//             }
//         });
//         return api.put(`/home/services/${id}`, formData, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//         });
//     },
//     deleteService: (id) => api.delete(`/home/services/${id}`),
//     toggleServiceStatus: (id) => api.patch(`/home/services/${id}/toggle-status`),

//     // FAQs
//     getFAQs: () => api.get('/home/faqs'),
//     createFAQ: (data) => api.post('/home/faqs', data),
//     updateFAQ: (id, data) => api.put(`/home/faqs/${id}`, data),
//     deleteFAQ: (id) => api.delete(`/home/faqs/${id}`),
//     toggleFAQStatus: (id) => api.patch(`/home/faqs/${id}/toggle-status`),
//     reorderFAQs: (ids) => api.post('/home/faqs/reorder', { ids }),

//     // About Section
//     getAboutSection: () => api.get('/home/about-section'),
//     updateAboutSection: (data) => {
//         const formData = new FormData();
//         Object.keys(data).forEach(key => {
//             if (key === 'aboutImage') {
//                 if (data[key] instanceof File) {
//                     formData.append(key, data[key]);
//                 }
//             } else if (key === 'name' || key === 'title' || key === 'description' || key === 'experience' || key === 'clients' || key === 'satisfaction' || key === 'quote') {
//                 formData.append(key, data[key]);
//             } else if (key === 'principles') {
//                 formData.append(key, JSON.stringify(data[key]));
//             }
//         });
//         return api.put('/home/about-section', formData, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//         });
//     },

//     // Contact Info
//     getContactInfo: () => api.get('/home/contact-info'),
//     updateContactInfo: (data) => api.put('/home/contact-info', data),

//     // CTA Section
//     getCTASection: () => api.get('/home/cta-section'),
//     updateCTASection: (data) => api.put('/home/cta-section', data),

//     // Get Complete Home Page Data (all sections)
//     getCompleteHomeData: () => api.get('/home/complete'),
    
//     // Bulk Update (for admin panel)
//     updateMultipleSections: (data) => api.post('/home/bulk-update', data)
// };

// // ==================== IMAGE UPLOAD APIs ====================
// export const imageUploadAPI = {
//     // Course image upload
//     uploadCourseImage: async (file) => {
//         const formData = new FormData();
//         formData.append('courseImage', file);
//         const response = await api.post('/upload/course-image', formData, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//         });
//         return response.data;
//     },
    
//     // Instructor image upload
//     uploadInstructorImage: async (file) => {
//         const formData = new FormData();
//         formData.append('instructorImage', file);
//         const response = await api.post('/upload/instructor-image', formData, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//         });
//         return response.data;
//     },
    
//     // About page image upload
//     uploadAboutImage: async (file) => {
//         const formData = new FormData();
//         formData.append('aboutImage', file);
//         const response = await api.post('/upload/about-image', formData, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//         });
//         return response.data;
//     },
    
//     // Hero section image upload
//     uploadHeroImage: async (file) => {
//         const formData = new FormData();
//         formData.append('image', file);
//         const response = await api.post('/upload/hero-image', formData, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//         });
//         return response.data;
//     },
    
//     // Hero mobile image upload
//     uploadHeroMobileImage: async (file) => {
//         const formData = new FormData();
//         formData.append('mobileImage', file);
//         const response = await api.post('/upload/hero-mobile-image', formData, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//         });
//         return response.data;
//     },
    
//     // Service image upload
//     uploadServiceImage: async (file) => {
//         const formData = new FormData();
//         formData.append('serviceImage', file);
//         const response = await api.post('/upload/service-image', formData, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//         });
//         return response.data;
//     },
    
//     // Generic image upload (misc)
//     uploadMiscImage: async (file) => {
//         const formData = new FormData();
//         formData.append('image', file);
//         const response = await api.post('/upload/misc-image', formData, {
//             headers: { 'Content-Type': 'multipart/form-data' }
//         });
//         return response.data;
//     },
    
//     // Delete single image
//     deleteImage: async (imagePath) => {
//         const response = await api.delete('/upload/image', { data: { imagePath } });
//         return response.data;
//     },
    
//     // Delete multiple images
//     deleteImages: async (imagePaths) => {
//         const response = await api.post('/upload/delete-images', { imagePaths });
//         return response.data;
//     },
    
//     // Check if image exists
//     checkImage: async (imagePath) => {
//         const response = await api.get(`/upload/image-info?path=${encodeURIComponent(imagePath)}`);
//         return response.data;
//     }
// };

// // ==================== INDIVIDUAL EXPORTS FOR HOME COMPONENTS ====================
// // This makes it easier to import in components

// // Hero Slides
// export const heroAPI = {
//     getSlides: () => homeAPI.getHeroSlides(),
//     createSlide: (data) => homeAPI.createHeroSlide(data),
//     updateSlide: (id, data) => homeAPI.updateHeroSlide(id, data),
//     deleteSlide: (id) => homeAPI.deleteHeroSlide(id),
//     toggleStatus: (id) => homeAPI.toggleHeroSlideStatus(id)
// };

// // Features
// export const featuresAPI = {
//     getFeatures: () => homeAPI.getFeatures(),
//     createFeature: (data) => homeAPI.createFeature(data),
//     updateFeature: (id, data) => homeAPI.updateFeature(id, data),
//     deleteFeature: (id) => homeAPI.deleteFeature(id),
//     toggleStatus: (id) => homeAPI.toggleFeatureStatus(id)
// };

// // Services
// export const servicesAPI = {
//     getServices: () => homeAPI.getServices(),
//     getMainServices: () => homeAPI.getMainServices(),
//     getSubServices: () => homeAPI.getSubServices(),
//     createService: (data) => homeAPI.createService(data),
//     updateService: (id, data) => homeAPI.updateService(id, data),
//     deleteService: (id) => homeAPI.deleteService(id),
//     toggleStatus: (id) => homeAPI.toggleServiceStatus(id)
// };

// // FAQs
// export const faqAPI = {
//     getFAQs: () => homeAPI.getFAQs(),
//     createFAQ: (data) => homeAPI.createFAQ(data),
//     updateFAQ: (id, data) => homeAPI.updateFAQ(id, data),
//     deleteFAQ: (id) => homeAPI.deleteFAQ(id),
//     toggleStatus: (id) => homeAPI.toggleFAQStatus(id),
//     reorder: (ids) => homeAPI.reorderFAQs(ids)
// };

// // About Section
// export const aboutSectionAPI = {
//     getAbout: () => homeAPI.getAboutSection(),
//     updateAbout: (data) => homeAPI.updateAboutSection(data)
// };

// // Contact Info
// export const contactInfoAPI = {
//     getContact: () => homeAPI.getContactInfo(),
//     updateContact: (data) => homeAPI.updateContactInfo(data)
// };

// // CTA Section
// export const ctaAPI = {
//     getCTA: () => homeAPI.getCTASection(),
//     updateCTA: (data) => homeAPI.updateCTASection(data)
// };

// // SEO Config
// export const seoAPI = {
//     getSEO: () => api.get('/home/seo'),
//     updateSEO: (data) => api.put('/home/seo', data),
//     getSitemap: () => api.get('/home/sitemap')
// };

// // Upload API (for media library)
// export const uploadAPI = {
//     uploadCourseImage: (file) => imageUploadAPI.uploadCourseImage(file),
//     uploadInstructorImage: (file) => imageUploadAPI.uploadInstructorImage(file),
//     uploadAboutImage: (file) => imageUploadAPI.uploadAboutImage(file),
//     uploadHeroImage: (file) => imageUploadAPI.uploadHeroImage(file),
//     uploadHeroMobileImage: (file) => imageUploadAPI.uploadHeroMobileImage(file),
//     uploadServiceImage: (file) => imageUploadAPI.uploadServiceImage(file),
//     uploadMiscImage: (file) => imageUploadAPI.uploadMiscImage(file),
//     deleteImage: (imagePath) => imageUploadAPI.deleteImage(imagePath),
//     deleteImages: (imagePaths) => imageUploadAPI.deleteImages(imagePaths),
//     getImageInfo: (imagePath) => imageUploadAPI.checkImage(imagePath)
// };

// // ==================== DEPRECATED HELPER (Keep for backward compatibility) ====================
// // Image Upload Helper (reusable) - Use imageUploadAPI instead
// export const uploadImage = async (file, type = 'hero') => {
//     const formData = new FormData();
//     formData.append('image', file);
    
//     const endpoints = {
//         hero: '/upload/hero-image',
//         service: '/upload/service-image',
//         about: '/upload/about-image',
//         course: '/upload/course-image',
//         instructor: '/upload/instructor-image'
//     };
    
//     const endpoint = endpoints[type] || '/upload/misc-image';
    
//     const response = await api.post(endpoint, formData, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//     });
    
//     return response.data;
// };

// // ==================== CONSULTATION SERVICES API ====================
// export const consultationAPI = {
//     getAll: (params) => api.get('/consultations', { params }),
//     getById: (id) => api.get(`/consultations/${id}`),
//     getBySlug: (slug) => api.get(`/consultations/slug/${slug}`),
//     getWithSEO: (slug) => api.get(`/consultations/seo/slug/${slug}`),
//     create: (data) => api.post('/consultations', data, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//     }),
//     update: (id, data) => api.put(`/consultations/${id}`, data, {
//         headers: { 'Content-Type': 'multipart/form-data' }
//     }),
//     delete: (id) => api.delete(`/consultations/${id}`),
//     toggleStatus: (id) => api.patch(`/consultations/${id}/toggle-status`),
//     toggleFeatured: (id) => api.patch(`/consultations/${id}/toggle-featured`),
//     reorder: (services) => api.post('/consultations/reorder', { services })
// };

// // Delete Image Helper (keep for backward compatibility)
// export const deleteImage = async (imagePath) => {
//     return imageUploadAPI.deleteImage(imagePath);
// };

// export default api;



// services/api.js - Complete file with all APIs including image upload helpers

import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Add token to requests
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('adminToken');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Admin APIs
export const adminAPI = {
    login: (data) => api.post('/admin/login', data),
    getProfile: () => api.get('/admin/profile'),
    updateProfile: (data) => api.put('/admin/profile', data),
    changePassword: (data) => api.put('/admin/change-password', data),
    getAllAdmins: () => api.get('/admin/all'),
    createAdmin: (data) => api.post('/admin/create', data),
    updateAdmin: (id, data) => api.put(`/admin/${id}`, data),
    toggleAdminStatus: (id) => api.patch(`/admin/${id}/toggle-status`),
    deleteAdmin: (id) => api.delete(`/admin/${id}`)
};

// Course APIs
export const courseAPI = {
    getAll: (params) => api.get('/courses', { params }),
    getById: (id) => api.get(`/courses/id/${id}`),
    getBySlug: (slug) => api.get(`/courses/slug/${slug}`),
    create: (data) => api.post('/courses', data),
    update: (id, data) => api.put(`/courses/${id}`, data),
    delete: (id) => api.delete(`/courses/${id}`),
    toggleStatus: (id) => api.patch(`/courses/${id}/toggle-status`),
    getStats: () => api.get('/courses/stats')
};

// PAGE CONTENT APIs
export const pageContentAPI = {
    getByType: (pageType) => {
        const type = pageType.toUpperCase();
        return api.get(`/page-content/${type}`);
    },
    save: (pageType, data) => {
        const type = pageType.toUpperCase();
        return api.post(`/page-content/${type}`, data);
    },
    create: (pageType, data) => {
        const type = pageType.toUpperCase();
        return api.post(`/page-content/${type}`, data);
    },
    updateByType: (pageType, data) => {
        const type = pageType.toUpperCase();
        return api.put(`/page-content/${type}`, data);
    },
    delete: (pageType) => {
        const type = pageType.toUpperCase();
        return api.delete(`/page-content/${type}`);
    }
};

// About Page APIs
export const aboutPageAPI = {
    getContent: () => api.get('/about-page'),
    saveContent: (data) => api.post('/about-page', data),
    updateContent: (data) => api.put('/about-page', data)
};

// ==================== HOME PAGE APIs ====================
export const homeAPI = {
    // Hero Slides
    getHeroSlides: () => api.get('/home/hero-slides'),
    createHeroSlide: (data) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'image' || key === 'mobileImage') {
                if (data[key] instanceof File) {
                    formData.append(key, data[key]);
                }
            } else if (key === 'icon' || key === 'title' || key === 'highlight' || key === 'description' || key === 'link' || key === 'order') {
                formData.append(key, data[key]);
            }
        });
        return api.post('/home/hero-slides', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    updateHeroSlide: (id, data) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'image' || key === 'mobileImage') {
                if (data[key] instanceof File) {
                    formData.append(key, data[key]);
                }
            } else if (key === 'icon' || key === 'title' || key === 'highlight' || key === 'description' || key === 'link' || key === 'order' || key === 'isActive') {
                formData.append(key, data[key]);
            }
        });
        return api.put(`/home/hero-slides/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    deleteHeroSlide: (id) => api.delete(`/home/hero-slides/${id}`),
    toggleHeroSlideStatus: (id) => api.patch(`/home/hero-slides/${id}/toggle-status`),

    // Features
    getFeatures: () => api.get('/home/features'),
    createFeature: (data) => api.post('/home/features', data),
    updateFeature: (id, data) => api.put(`/home/features/${id}`, data),
    deleteFeature: (id) => api.delete(`/home/features/${id}`),
    toggleFeatureStatus: (id) => api.patch(`/home/features/${id}/toggle-status`),

    // Services
    getServices: () => api.get('/home/services'),
    getMainServices: () => api.get('/home/services/main'),
    getSubServices: () => api.get('/home/services/sub'),
    createService: (data) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'serviceImage') {
                if (data[key] instanceof File) {
                    formData.append(key, data[key]);
                }
            } else if (key === 'label' || key === 'path' || key === 'icon' || key === 'description' || key === 'type' || key === 'order') {
                formData.append(key, data[key]);
            }
        });
        return api.post('/home/services', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    updateService: (id, data) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'serviceImage') {
                if (data[key] instanceof File) {
                    formData.append(key, data[key]);
                }
            } else if (key === 'label' || key === 'path' || key === 'icon' || key === 'description' || key === 'type' || key === 'order' || key === 'isActive') {
                formData.append(key, data[key]);
            }
        });
        return api.put(`/home/services/${id}`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },
    deleteService: (id) => api.delete(`/home/services/${id}`),
    toggleServiceStatus: (id) => api.patch(`/home/services/${id}/toggle-status`),

    // FAQs
    getFAQs: () => api.get('/home/faqs'),
    createFAQ: (data) => api.post('/home/faqs', data),
    updateFAQ: (id, data) => api.put(`/home/faqs/${id}`, data),
    deleteFAQ: (id) => api.delete(`/home/faqs/${id}`),
    toggleFAQStatus: (id) => api.patch(`/home/faqs/${id}/toggle-status`),
    reorderFAQs: (ids) => api.post('/home/faqs/reorder', { ids }),

    // About Section
    getAboutSection: () => api.get('/home/about-section'),
    updateAboutSection: (data) => {
        const formData = new FormData();
        Object.keys(data).forEach(key => {
            if (key === 'aboutImage') {
                if (data[key] instanceof File) {
                    formData.append(key, data[key]);
                }
            } else if (key === 'name' || key === 'title' || key === 'description' || key === 'experience' || key === 'clients' || key === 'satisfaction' || key === 'quote') {
                formData.append(key, data[key]);
            } else if (key === 'principles') {
                formData.append(key, JSON.stringify(data[key]));
            }
        });
        return api.put('/home/about-section', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
    },

    // Contact Info
    getContactInfo: () => api.get('/home/contact-info'),
    updateContactInfo: (data) => api.put('/home/contact-info', data),

    // CTA Section
    getCTASection: () => api.get('/home/cta-section'),
    updateCTASection: (data) => api.put('/home/cta-section', data),

    // Get Complete Home Page Data (all sections)
    getCompleteHomeData: () => api.get('/home/complete'),
    
    // Bulk Update (for admin panel)
    updateMultipleSections: (data) => api.post('/home/bulk-update', data),

    // Testimonials
    getTestimonials: () => api.get('/home/testimonials'),
    createTestimonial: (data) => api.post('/home/testimonials', data),
    updateTestimonial: (id, data) => api.put(`/home/testimonials/${id}`, data),
    deleteTestimonial: (id) => api.delete(`/home/testimonials/${id}`)
};

// ==================== IMAGE UPLOAD APIs ====================
export const imageUploadAPI = {
    // Course image upload
    uploadCourseImage: async (file) => {
        const formData = new FormData();
        formData.append('courseImage', file);
        const response = await api.post('/upload/course-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    
    // Instructor image upload
    uploadInstructorImage: async (file) => {
        const formData = new FormData();
        formData.append('instructorImage', file);
        const response = await api.post('/upload/instructor-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    
    // About page image upload
    uploadAboutImage: async (file) => {
        const formData = new FormData();
        formData.append('aboutImage', file);
        const response = await api.post('/upload/about-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    
    // Hero section image upload
    uploadHeroImage: async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        const response = await api.post('/upload/hero-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    
    // Hero mobile image upload
    uploadHeroMobileImage: async (file) => {
        const formData = new FormData();
        formData.append('mobileImage', file);
        const response = await api.post('/upload/hero-mobile-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    
    // Service image upload
    uploadServiceImage: async (file) => {
        const formData = new FormData();
        formData.append('serviceImage', file);
        const response = await api.post('/upload/service-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    
    // Generic image upload (misc)
    uploadMiscImage: async (file) => {
        const formData = new FormData();
        formData.append('image', file);
        const response = await api.post('/upload/misc-image', formData, {
            headers: { 'Content-Type': 'multipart/form-data' }
        });
        return response.data;
    },
    
    // Delete single image
    deleteImage: async (imagePath) => {
        const response = await api.delete('/upload/image', { data: { imagePath } });
        return response.data;
    },
    
    // Delete multiple images
    deleteImages: async (imagePaths) => {
        const response = await api.post('/upload/delete-images', { imagePaths });
        return response.data;
    },
    
    // Check if image exists
    checkImage: async (imagePath) => {
        const response = await api.get(`/upload/image-info?path=${encodeURIComponent(imagePath)}`);
        return response.data;
    }
};

// ==================== INDIVIDUAL EXPORTS FOR HOME COMPONENTS ====================
// This makes it easier to import in components

// Hero Slides
export const heroAPI = {
    getSlides: () => homeAPI.getHeroSlides(),
    createSlide: (data) => homeAPI.createHeroSlide(data),
    updateSlide: (id, data) => homeAPI.updateHeroSlide(id, data),
    deleteSlide: (id) => homeAPI.deleteHeroSlide(id),
    toggleStatus: (id) => homeAPI.toggleHeroSlideStatus(id)
};

// Features
export const featuresAPI = {
    getFeatures: () => homeAPI.getFeatures(),
    createFeature: (data) => homeAPI.createFeature(data),
    updateFeature: (id, data) => homeAPI.updateFeature(id, data),
    deleteFeature: (id) => homeAPI.deleteFeature(id),
    toggleStatus: (id) => homeAPI.toggleFeatureStatus(id)
};

// Services
export const servicesAPI = {
    getServices: () => homeAPI.getServices(),
    getMainServices: () => homeAPI.getMainServices(),
    getSubServices: () => homeAPI.getSubServices(),
    createService: (data) => homeAPI.createService(data),
    updateService: (id, data) => homeAPI.updateService(id, data),
    deleteService: (id) => homeAPI.deleteService(id),
    toggleStatus: (id) => homeAPI.toggleServiceStatus(id)
};

// FAQs
export const faqAPI = {
    getFAQs: () => homeAPI.getFAQs(),
    createFAQ: (data) => homeAPI.createFAQ(data),
    updateFAQ: (id, data) => homeAPI.updateFAQ(id, data),
    deleteFAQ: (id) => homeAPI.deleteFAQ(id),
    toggleStatus: (id) => homeAPI.toggleFAQStatus(id),
    reorder: (ids) => homeAPI.reorderFAQs(ids)
};

// About Section
export const aboutSectionAPI = {
    getAbout: () => homeAPI.getAboutSection(),
    updateAbout: (data) => homeAPI.updateAboutSection(data)
};

// Contact Info
export const contactInfoAPI = {
    getContact: () => homeAPI.getContactInfo(),
    updateContact: (data) => homeAPI.updateContactInfo(data)
};

// CTA Section
export const ctaAPI = {
    getCTA: () => homeAPI.getCTASection(),
    updateCTA: (data) => homeAPI.updateCTASection(data)
};

// SEO Config
export const seoAPI = {
    getSEO: () => api.get('/home/seo'),
    updateSEO: (data) => api.put('/home/seo', data),
    getSitemap: () => api.get('/home/sitemap')
};

// Upload API (for media library)
export const uploadAPI = {
    uploadCourseImage: (file) => imageUploadAPI.uploadCourseImage(file),
    uploadInstructorImage: (file) => imageUploadAPI.uploadInstructorImage(file),
    uploadAboutImage: (file) => imageUploadAPI.uploadAboutImage(file),
    uploadHeroImage: (file) => imageUploadAPI.uploadHeroImage(file),
    uploadHeroMobileImage: (file) => imageUploadAPI.uploadHeroMobileImage(file),
    uploadServiceImage: (file) => imageUploadAPI.uploadServiceImage(file),
    uploadMiscImage: (file) => imageUploadAPI.uploadMiscImage(file),
    deleteImage: (imagePath) => imageUploadAPI.deleteImage(imagePath),
    deleteImages: (imagePaths) => imageUploadAPI.deleteImages(imagePaths),
    getImageInfo: (imagePath) => imageUploadAPI.checkImage(imagePath)
};

// ==================== CONSULTATION SERVICES API ====================
export const consultationAPI = {
    getAll: (params) => api.get('/consultations', { params }),
    getById: (id) => api.get(`/consultations/${id}`),
    getBySlug: (slug) => api.get(`/consultations/slug/${slug}`),
    getWithSEO: (slug) => api.get(`/consultations/seo/slug/${slug}`),
    create: (data) => api.post('/consultations', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    update: (id, data) => api.put(`/consultations/${id}`, data, {
        headers: { 'Content-Type': 'multipart/form-data' }
    }),
    delete: (id) => api.delete(`/consultations/${id}`),
    toggleStatus: (id) => api.patch(`/consultations/${id}/toggle-status`),
    toggleFeatured: (id) => api.patch(`/consultations/${id}/toggle-featured`),
    reorder: (services) => api.post('/consultations/reorder', { services })
};

// ==================== APPOINTMENT APIs ====================
export const appointmentAPI = {
    getAll: (params) => api.get('/admin/appointments', { params }),
    getById: (id) => api.get(`/admin/appointments/${id}`),
    getStats: () => api.get('/admin/appointments/stats'),
    updateStatus: (id, data) => api.put(`/admin/appointments/${id}`, data)
};

export const contactAPI = {
    sendCourseCallRequest: (data) => api.post('/contact/course-call-request', data)
};

// ==================== DEPRECATED HELPER ====================
export const uploadImage = async (file, type = 'hero') => {
    const formData = new FormData();
    formData.append('image', file);
    
    const endpoints = {
        hero: '/upload/hero-image',
        service: '/upload/service-image',
        about: '/upload/about-image',
        course: '/upload/course-image',
        instructor: '/upload/instructor-image'
    };
    
    const endpoint = endpoints[type] || '/upload/misc-image';
    
    const response = await api.post(endpoint, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
    });
    
    return response.data;
};

export const deleteImage = async (imagePath) => {
    return imageUploadAPI.deleteImage(imagePath);
};

export default api;
