


const Course = require('../models/Course');
const { deleteUploadFile } = require('../utils/imageStorage');

// ==================== Create Course ====================
// @desc    Create a new course
// @route   POST /api/courses
// @access  Private (Admin only)
const createCourse = async (req, res) => {
    try {
        const {
            title,
            category,
            price,
            courseFee,
            discountPrice,
            date,
            timing,
            courseDuration,
            type,
            location,
            image,
            whatIs,
            aboutCourse,
            courseContent,
            durationDetails,
            note,
            highlights,
            instructor,
            faqs,
            level,
            modules,
            includes,
            vastuType,
            certificateAvailable,
            language,
            isActive,
            isFeatured,
            extraFields,
            customData,
            // SEO Fields
            seoTitle,
            seoDescription,
            seoKeywords
        } = req.body;

        // Check if course already exists
        const existingCourse = await Course.findOne({ title });
        if (existingCourse) {
            return res.status(400).json({ 
                success: false, 
                message: 'Course with this title already exists' 
            });
        }

        // Create course with SEO fields
        const course = await Course.create({
            title,
            category,
            price,
            courseFee,
            discountPrice,
            date,
            timing,
            courseDuration,
            type,
            location,
            image,
            whatIs,
            aboutCourse,
            courseContent: courseContent || [],
            durationDetails,
            note,
            highlights: highlights || [],
            instructor: instructor || {
                name: 'Naveen Bhagat',
                title: 'Senior Astrologer & Vastu Consultant',
                experience: '20+ Years'
            },
            faqs: faqs || [],
            level,
            modules,
            includes: includes || [],
            vastuType,
            certificateAvailable,
            language,
            isActive,
            isFeatured,
            extraFields: extraFields || [],
            customData: customData || {},
            // SEO fields
            seoTitle: seoTitle || title,
            seoDescription: seoDescription || `Learn ${title} with NB Astro. Expert-led course with certification.`,
            seoKeywords: seoKeywords || `${title}, ${category.toLowerCase()}, nb astro, online course`
        });

        res.status(201).json({
            success: true,
            message: 'Course created successfully',
            course
        });
    } catch (error) {
        console.error('Create Course Error:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message || 'Server error while creating course' 
        });
    }
};

// ==================== Get All Courses ====================
// @desc    Get all courses with filters
// @route   GET /api/courses
// @access  Public
const getAllCourses = async (req, res) => {
    try {
        const { 
            category, 
            level, 
            isActive, 
            isFeatured,
            search,
            limit = 100,
            page = 1 
        } = req.query;

        let filter = {};

        // Apply filters
        if (category) filter.category = category;
        if (level) filter.level = level;
        if (isActive !== undefined) filter.isActive = isActive === 'true';
        if (isFeatured !== undefined) filter.isFeatured = isFeatured === 'true';

        // Search functionality (including SEO fields for better search)
        if (search) {
            filter.$or = [
                { title: { $regex: search, $options: 'i' } },
                { whatIs: { $regex: search, $options: 'i' } },
                { aboutCourse: { $regex: search, $options: 'i' } },
                { seoTitle: { $regex: search, $options: 'i' } },
                { seoKeywords: { $regex: search, $options: 'i' } }
            ];
        }

        const skip = (parseInt(page) - 1) * parseInt(limit);
        const limitNum = parseInt(limit);

        const courses = await Course.find(filter)
            .select('-__v') // Exclude version field
            .sort({ isFeatured: -1, createdAt: -1 }) // Featured courses first
            .skip(skip)
            .limit(limitNum);

        const total = await Course.countDocuments(filter);

        res.json({
            success: true,
            courses,
            pagination: {
                total,
                page: parseInt(page),
                pages: Math.ceil(total / limitNum),
                limit: limitNum
            }
        });
    } catch (error) {
        console.error('Get Courses Error:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message || 'Server error while fetching courses' 
        });
    }
};

// ==================== Get Course by ID ====================
// @desc    Get single course by ID
// @route   GET /api/courses/id/:id
// @access  Public
const getCourseById = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id).select('-__v');
        
        if (!course) {
            return res.status(404).json({ 
                success: false, 
                message: 'Course not found' 
            });
        }

        // Increment views if method exists
        if (course.incrementViews) {
            await course.incrementViews();
        }

        res.json({
            success: true,
            course
        });
    } catch (error) {
        console.error('Get Course Error:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message || 'Server error while fetching course' 
        });
    }
};

// ==================== Get Course by Slug ====================
// @desc    Get single course by slug (for frontend)
// @route   GET /api/courses/slug/:slug
// @access  Public
const getCourseBySlug = async (req, res) => {
    try {
        const course = await Course.findOne({ slug: req.params.slug }).select('-__v');
        
        if (!course) {
            return res.status(404).json({ 
                success: false, 
                message: 'Course not found' 
            });
        }

        // Increment views
        if (course.incrementViews) {
            await course.incrementViews();
        }

        res.json({
            success: true,
            course
        });
    } catch (error) {
        console.error('Get Course Error:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message || 'Server error while fetching course' 
        });
    }
};

// ==================== Update Course ====================
// @desc    Update course by ID
// @route   PUT /api/courses/:id
// @access  Private (Admin only)
const updateCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        
        if (!course) {
            return res.status(404).json({ 
                success: false, 
                message: 'Course not found' 
            });
        }

        // Prepare update data with SEO fields
        const updateData = { ...req.body };
        const oldImage = course.image;
        const newImage = updateData.image;
        
        // Auto-generate seoTitle if title changed and seoTitle not provided
        if (updateData.title && !updateData.seoTitle) {
            updateData.seoTitle = updateData.title.substring(0, 60);
        }
        
        // Auto-generate seoDescription if aboutCourse changed and seoDescription not provided
        if (updateData.aboutCourse && !updateData.seoDescription) {
            updateData.seoDescription = updateData.aboutCourse.substring(0, 157) + 
                (updateData.aboutCourse.length > 157 ? '...' : '');
        }

        const updatedCourse = await Course.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true, runValidators: true }
        ).select('-__v');

        if (newImage && oldImage && newImage !== oldImage) {
            try {
                deleteUploadFile(oldImage);
            } catch (deleteError) {
                await Course.findByIdAndUpdate(req.params.id, { image: oldImage }, { runValidators: true });
                deleteUploadFile(newImage);
                throw new Error(`Course image replacement failed: ${deleteError.message}`);
            }
        }

        res.json({
            success: true,
            message: 'Course updated successfully',
            course: updatedCourse
        });
    } catch (error) {
        console.error('Update Course Error:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message || 'Server error while updating course' 
        });
    }
};

// ==================== Delete Course ====================
// @desc    Delete course by ID
// @route   DELETE /api/courses/:id
// @access  Private (Admin only)
const deleteCourse = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        
        if (!course) {
            return res.status(404).json({ 
                success: false, 
                message: 'Course not found' 
            });
        }

        if (course.image) {
            deleteUploadFile(course.image);
        }

        await course.deleteOne();

        res.json({
            success: true,
            message: 'Course deleted successfully'
        });
    } catch (error) {
        console.error('Delete Course Error:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message || 'Server error while deleting course' 
        });
    }
};

// ==================== Toggle Course Status ====================
// @desc    Toggle active status of course
// @route   PATCH /api/courses/:id/toggle-status
// @access  Private (Admin only)
const toggleCourseStatus = async (req, res) => {
    try {
        const course = await Course.findById(req.params.id);
        
        if (!course) {
            return res.status(404).json({ 
                success: false, 
                message: 'Course not found' 
            });
        }

        course.isActive = !course.isActive;
        await course.save();

        res.json({
            success: true,
            message: `Course ${course.isActive ? 'activated' : 'deactivated'} successfully`,
            isActive: course.isActive
        });
    } catch (error) {
        console.error('Toggle Course Status Error:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message || 'Server error while toggling status' 
        });
    }
};

// ==================== Get Course Stats ====================
// @desc    Get course statistics
// @route   GET /api/courses/stats
// @access  Private (Admin only)
const getCourseStats = async (req, res) => {
    try {
        const totalCourses = await Course.countDocuments();
        const activeCourses = await Course.countDocuments({ isActive: true });
        const astrologyCourses = await Course.countDocuments({ category: 'ASTROLOGY COURSES' });
        const vastuCourses = await Course.countDocuments({ category: 'VASTU COURSES' });
        const featuredCourses = await Course.countDocuments({ isFeatured: true });

        res.json({
            success: true,
            stats: {
                totalCourses,
                activeCourses,
                astrologyCourses,
                vastuCourses,
                featuredCourses
            }
        });
    } catch (error) {
        console.error('Get Stats Error:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message || 'Server error while fetching stats' 
        });
    }
};

// ==================== Get SEO-Optimized Courses for Sitemap ====================
// @desc    Get all courses with SEO data for sitemap
// @route   GET /api/courses/sitemap
// @access  Public
const getCoursesForSitemap = async (req, res) => {
    try {
        const courses = await Course.find({ isActive: true })
            .select('slug seoTitle seoDescription updatedAt createdAt')
            .sort({ createdAt: -1 });

        res.json({
            success: true,
            courses
        });
    } catch (error) {
        console.error('Get Sitemap Error:', error);
        res.status(500).json({ 
            success: false, 
            message: error.message || 'Server error while fetching sitemap data' 
        });
    }
};

module.exports = {
    createCourse,
    getAllCourses,
    getCourseById,
    getCourseBySlug,
    updateCourse,
    deleteCourse,
    toggleCourseStatus,
    getCourseStats,
    getCoursesForSitemap
};
