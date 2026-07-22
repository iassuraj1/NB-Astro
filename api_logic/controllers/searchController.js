const Blog = require('../models/Blog');
const Course = require('../models/Course');
const ConsultationService = require('../models/ConsultationService');

exports.globalSearch = async (req, res) => {
    try {
        const { q } = req.query;
        if (!q || q.trim() === '') {
            return res.json({ success: true, data: [] });
        }

        const escapedQ = q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const queryRegex = new RegExp(escapedQ, 'i');
        
        // Search Blogs
        const blogsPromise = Blog.find({
            $or: [
                { title: queryRegex },
                { excerpt: queryRegex },
                { content: queryRegex },
                { category: queryRegex }
            ],
            isActive: { $ne: false } // Only search active ones if attribute exists
        }).limit(10).lean();

        // Search Courses
        const coursesPromise = Course.find({
            $or: [
                { title: queryRegex },
                { description: queryRegex },
                { highlights: queryRegex },
                { category: queryRegex }
            ],
            isActive: { $ne: false }
        }).limit(10).lean();

        // Search Consultation Services
        const consultationsPromise = ConsultationService.find({
            $or: [
                { title: queryRegex },
                { description: queryRegex },
                { shortDescription: queryRegex },
                { quickDescription: queryRegex }
            ],
            isActive: { $ne: false }
        }).limit(10).lean();

        const [blogs, courses, consultations] = await Promise.all([
            blogsPromise,
            coursesPromise,
            consultationsPromise
        ]);

        const results = [];

        // Format Blogs
        blogs.forEach(blog => {
            results.push({
                id: blog._id,
                title: blog.title,
                snippet: blog.excerpt || (blog.content ? blog.content.substring(0, 150) + '...' : ''),
                type: 'Blog',
                link: `/blog/${blog.slug}`,
                category: blog.category || 'Blog',
                image: blog.image
            });
        });

        // Format Courses
        courses.forEach(course => {
            const courseType = course.category?.toLowerCase().includes('vastu') ? 'vastu' : 'astrology';
            results.push({
                id: course._id,
                title: course.title,
                snippet: course.description ? course.description.substring(0, 150) + '...' : '',
                type: 'Course',
                link: `/courses/${course.slug || course.title.toLowerCase().replace(/\s+/g, '-')}/details`,
                category: course.category || 'Course',
                image: course.image || course.courseImage
            });
        });

        // Format Consultations
        consultations.forEach(service => {
            const serviceCat = service.category?.toLowerCase().includes('vastu') ? 'vastu' : 'astrology';
            results.push({
                id: service._id,
                title: service.title,
                snippet: service.shortDescription || service.quickDescription || (service.description ? service.description.substring(0, 150) + '...' : ''),
                type: 'Consultation',
                link: `/consultation/${serviceCat}/${service.slug}`,
                category: service.category || 'Consultation',
                image: service.image
            });
        });

        res.json({ success: true, data: results });
    } catch (error) {
        console.error('Error during global search:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};
