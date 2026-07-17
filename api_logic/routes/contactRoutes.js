const express = require('express');
const { sendMail } = require('../Utils/mailer');

const router = express.Router();

const escapeHtml = (value = '') => String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

router.post('/course-call-request', async (req, res) => {
    try {
        const {
            name,
            email,
            phone,
            message,
            courseId,
            courseTitle,
            courseSlug,
            coursePrice,
            courseCategory,
            pageUrl
        } = req.body;

        if (!name || !email || !phone) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and phone number are required.'
            });
        }

        const subject = `Course Call Request: ${courseTitle || 'Course Enquiry'}`;
        const text = [
            'New course call request',
            `Name: ${name}`,
            `Email: ${email}`,
            `Phone: ${phone}`,
            `Message: ${message || 'N/A'}`,
            `Course ID: ${courseId || 'N/A'}`,
            `Course Title: ${courseTitle || 'N/A'}`,
            `Course Slug: ${courseSlug || 'N/A'}`,
            `Course Price: ${coursePrice || 'N/A'}`,
            `Course Category: ${courseCategory || 'N/A'}`,
            `Page URL: ${pageUrl || 'N/A'}`
        ].join('\n');

        const html = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
                <h2 style="color: #00B7B3;">New Course Call Request</h2>
                <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 680px;">
                    <tr><td><strong>Name</strong></td><td>${escapeHtml(name)}</td></tr>
                    <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
                    <tr><td><strong>Phone</strong></td><td>${escapeHtml(phone)}</td></tr>
                    <tr><td><strong>Message</strong></td><td>${escapeHtml(message || 'N/A')}</td></tr>
                    <tr><td><strong>Course ID</strong></td><td>${escapeHtml(courseId || 'N/A')}</td></tr>
                    <tr><td><strong>Course Title</strong></td><td>${escapeHtml(courseTitle || 'N/A')}</td></tr>
                    <tr><td><strong>Course Slug</strong></td><td>${escapeHtml(courseSlug || 'N/A')}</td></tr>
                    <tr><td><strong>Course Price</strong></td><td>${escapeHtml(coursePrice || 'N/A')}</td></tr>
                    <tr><td><strong>Course Category</strong></td><td>${escapeHtml(courseCategory || 'N/A')}</td></tr>
                    <tr><td><strong>Page URL</strong></td><td>${escapeHtml(pageUrl || 'N/A')}</td></tr>
                </table>
            </div>
        `;

        const ownerEmail = 'iassurajbhagat1@gmail.com';
        
        // 1. Send notification to the owner
        await sendMail({
            to: ownerEmail,
            subject: `[New Request] ${subject}`,
            text,
            html,
            replyTo: email
        });

        // 2. Send confirmation to the user
        const userSubject = `We received your call request for ${courseTitle || 'our course'} - NB Astro`;
        const userText = `Hi ${name},\n\nThank you for reaching out. We have received your request for a call back regarding "${courseTitle || 'our course'}". Our team will contact you shortly on ${phone}.\n\nBest regards,\nNB Astro`;
        const userHtml = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                <h2 style="color: #00B7B3; margin-top: 0;">Thank you, ${escapeHtml(name)}!</h2>
                <p>We have successfully received your callback request for the course: <strong>${escapeHtml(courseTitle || 'Course Enquiry')}</strong>.</p>
                <p>Our team will contact you shortly at your registered phone number: <strong>${escapeHtml(phone)}</strong>.</p>
                <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
                <p style="font-size: 14px; color: #6b7280;">Best regards,<br/><strong>NB Astro Team</strong></p>
            </div>
        `;
        await sendMail({
            to: email,
            subject: userSubject,
            text: userText,
            html: userHtml
        });

        return res.json({
            success: true,
            message: 'Request sent successfully. We will contact you shortly.'
        });
    } catch (error) {
        console.error('Course call request email failed:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Unable to send request email.'
        });
    }
});

router.post('/send-message', async (req, res) => {
    try {
        const {
            fullName,
            email,
            phoneNumber,
            cityState,
            country,
            message
        } = req.body;

        if (!fullName || !email || !phoneNumber) {
            return res.status(400).json({
                success: false,
                message: 'Name, email, and phone number are required.'
            });
        }

        const subject = `New Contact Form Message from ${fullName}`;
        const text = [
            'New message from Contact Us form',
            `Name: ${fullName}`,
            `Email: ${email}`,
            `Phone: ${phoneNumber}`,
            `City/State: ${cityState || 'N/A'}`,
            `Country: ${country || 'N/A'}`,
            `Message: ${message || 'N/A'}`
        ].join('\n');

        const html = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827;">
                <h2 style="color: #00B7B3;">New Message from Contact Form</h2>
                <table cellpadding="8" cellspacing="0" style="border-collapse: collapse; width: 100%; max-width: 680px;">
                    <tr><td><strong>Name</strong></td><td>${escapeHtml(fullName)}</td></tr>
                    <tr><td><strong>Email</strong></td><td>${escapeHtml(email)}</td></tr>
                    <tr><td><strong>Phone</strong></td><td>${escapeHtml(phoneNumber)}</td></tr>
                    <tr><td><strong>City/State</strong></td><td>${escapeHtml(cityState || 'N/A')}</td></tr>
                    <tr><td><strong>Country</strong></td><td>${escapeHtml(country || 'N/A')}</td></tr>
                    <tr><td><strong>Message</strong></td><td>${escapeHtml(message || 'N/A')}</td></tr>
                </table>
            </div>
        `;

        const ownerEmail = 'iassurajbhagat1@gmail.com';

        // 1. Send notification to the owner
        await sendMail({
            to: ownerEmail,
            subject: `[New Contact Message] ${subject}`,
            text,
            html,
            replyTo: email
        });

        // 2. Send confirmation to the user
        const userSubject = `We received your message - NB Astro`;
        const userText = `Hi ${fullName},\n\nThank you for reaching out. We have received your message and will get back to you shortly.\n\nYour message:\n"${message || 'N/A'}"\n\nBest regards,\nNB Astro`;
        const userHtml = `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #111827; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
                <h2 style="color: #00B7B3; margin-top: 0;">Thank you, ${escapeHtml(fullName)}!</h2>
                <p>We have successfully received your message from the Contact Us form.</p>
                <div style="background-color: #f9fafb; padding: 15px; border-radius: 6px; margin: 15px 0; border: 1px solid #e5e7eb;">
                    <p style="margin: 0;"><strong>Your Message:</strong></p>
                    <p style="margin: 8px 0 0 0; color: #4b5563; font-style: italic;">"${escapeHtml(message || 'N/A')}"</p>
                </div>
                <p>Our team will review your inquiry and get back to you within 24 hours.</p>
                <hr style="border: 0; border-top: 1px solid #e5e7eb; margin: 20px 0;" />
                <p style="font-size: 14px; color: #6b7280;">Best regards,<br/><strong>NB Astro Team</strong></p>
            </div>
        `;
        await sendMail({
            to: email,
            subject: userSubject,
            text: userText,
            html: userHtml
        });

        return res.json({
            success: true,
            message: 'Message sent successfully. We will get back to you shortly.'
        });
    } catch (error) {
        console.error('Contact form submission email failed:', error);
        return res.status(500).json({
            success: false,
            message: error.message || 'Unable to send message email.'
        });
    }
});

module.exports = router;
