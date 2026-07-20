const Blog = require('../models/Blog');
const { deleteUploadFile } = require('../utils/imageStorage');

console.log('🔥🔥🔥 blogController.js LOADED! 🔥🔥🔥');

// ✅ CREATE BLOG - WITH PROPER RESPONSE
const createBlog = async (req, res) => {
    console.log('🔥🔥🔥 createBlog CALLED! 🔥🔥🔥');
    console.log('🔥 Body:', JSON.stringify(req.body, null, 2));
    
    try {
        // ✅ Generate slug
        let slug = req.body.slug;
        if (!slug && req.body.title) {
            slug = req.body.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
        }
        if (!slug) {
            slug = `blog-${Date.now()}`;
        }

        // ✅ Check duplicate slug
        const existing = await Blog.findOne({ slug });
        if (existing) {
            slug = `${slug}-${Date.now()}`;
        }

        // ✅ Create blog data
        const blogData = {
            title: req.body.title || 'Untitled',
            slug: slug,
            excerpt: req.body.excerpt || '',
            content: req.body.content || '',
            aiOverview: req.body.aiOverview || '',
            quickSummaryDescription: req.body.quickSummaryDescription || '',
            quickSummary: Array.isArray(req.body.quickSummary) ? req.body.quickSummary : [],
            faqs: Array.isArray(req.body.faqs) ? req.body.faqs : [],
            image: req.body.image || '',
            categories: Array.isArray(req.body.categories) ? req.body.categories : [],
            tags: Array.isArray(req.body.tags) ? req.body.tags : [],
            isPublished: req.body.isPublished !== undefined ? req.body.isPublished : true,
            isFeatured: req.body.isFeatured || false,
            seoTitle: req.body.seoTitle || '',
            seoDescription: req.body.seoDescription || '',
            seoKeywords: req.body.seoKeywords || ''
        };

        console.log('🔥 Saving blog:', JSON.stringify(blogData, null, 2));

        const blog = await Blog.create(blogData);
        console.log('✅ Blog saved:', blog._id);

        // ✅ MUST RETURN RESPONSE
        res.status(201).json({ 
            success: true, 
            data: blog, 
            message: 'Blog created successfully' 
        });

    } catch (error) {
        console.error('❌ ERROR:', error);
        // ✅ MUST RETURN ERROR RESPONSE
        res.status(500).json({ 
            success: false, 
            message: error.message 
        });
    }
};

// ✅ GET ALL BLOGS ADMIN
const getAllBlogsAdmin = async (req, res) => {
    console.log('🔥 getAllBlogsAdmin CALLED');
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        console.log('✅ Found blogs:', blogs.length);
        res.json({ success: true, data: blogs });
    } catch (error) {
        console.error('❌ Error:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

// ✅ GET ALL BLOGS PUBLIC
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true }).sort({ isFeatured: -1, publishedAt: -1 });
        res.json({ success: true, data: blogs });
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getBlogBySlug = async (req, res) => {
    try {
        const blog = await Blog.findOne({ slug: req.params.slug, isPublished: true });
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        blog.views += 1;
        await blog.save();
        res.json({ success: true, data: blog });
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getFeaturedBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true, isFeatured: true }).sort({ publishedAt: -1 }).limit(3);
        res.json({ success: true, data: blogs });
    } catch (error) {
        console.error('Error fetching featured blogs:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getPopularBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ isPublished: true }).sort({ views: -1 }).limit(5);
        res.json({ success: true, data: blogs });
    } catch (error) {
        console.error('Error fetching popular blogs:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getBlogCategories = async (req, res) => {
    try {
        const categories = await Blog.aggregate([
            { $match: { isPublished: true } },
            { $unwind: '$categories' },
            { $group: { _id: '$categories', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        res.json({ success: true, data: categories });
    } catch (error) {
        console.error('Error fetching categories:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getBlogTags = async (req, res) => {
    try {
        const tags = await Blog.aggregate([
            { $match: { isPublished: true } },
            { $unwind: '$tags' },
            { $group: { _id: '$tags', count: { $sum: 1 } } },
            { $sort: { count: -1 } }
        ]);
        res.json({ success: true, data: tags });
    } catch (error) {
        console.error('Error fetching tags:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        res.json({ success: true, data: blog });
    } catch (error) {
        console.error('Error fetching blog:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const updateBlog = async (req, res) => {
    try {
        const oldBlog = await Blog.findById(req.params.id);
        if (!oldBlog) return res.status(404).json({ success: false, message: 'Blog not found' });
        
        if (req.body.image && oldBlog.image && oldBlog.image !== req.body.image) {
            try { deleteUploadFile(oldBlog.image); } catch (e) { console.error('Error deleting old image:', e); }
        }

        const blog = await Blog.findByIdAndUpdate(
            req.params.id, 
            { ...req.body, updatedAt: Date.now() }, 
            { new: true, runValidators: false }
        );
        
        res.json({ success: true, data: blog, message: 'Blog updated successfully' });
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        if (blog.image) {
            try { deleteUploadFile(blog.image); } catch (e) { console.error('Error deleting image:', e); }
        }
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const togglePublish = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        blog.isPublished = !blog.isPublished;
        blog.publishedAt = blog.isPublished ? Date.now() : blog.publishedAt;
        await blog.save();
        res.json({ success: true, data: blog, message: `Blog ${blog.isPublished ? 'published' : 'unpublished'}` });
    } catch (error) {
        console.error('Error toggling publish:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

const toggleFeatured = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ success: false, message: 'Blog not found' });
        blog.isFeatured = !blog.isFeatured;
        await blog.save();
        res.json({ success: true, data: blog, message: `Blog ${blog.isFeatured ? 'featured' : 'unfeatured'}` });
    } catch (error) {
        console.error('Error toggling featured:', error);
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = {
    getBlogs,
    getBlogBySlug,
    getFeaturedBlogs,
    getPopularBlogs,
    getBlogCategories,
    getBlogTags,
    createBlog,
    getAllBlogsAdmin,
    getBlogById,
    updateBlog,
    deleteBlog,
    togglePublish,
    toggleFeatured
};