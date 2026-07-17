const nodemailer = require('nodemailer');

const hasSmtpConfig = () => (
    (process.env.SMTP_SERVICE || process.env.SMTP_HOST) &&
    process.env.SMTP_USER &&
    process.env.SMTP_PASS
);

const createTransporter = () => {
    if (!hasSmtpConfig()) {
        throw new Error('Email service is not configured. Please set SMTP_SERVICE or SMTP_HOST, SMTP_USER, and SMTP_PASS in backend/.env.');
    }

    if (process.env.SMTP_SERVICE) {
        return nodemailer.createTransport({
            service: process.env.SMTP_SERVICE,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASS
            }
        });
    }

    return nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT || 587),
        secure: String(process.env.SMTP_SECURE || 'false') === 'true',
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS
        }
    });
};

const sendMail = async ({ to, subject, html, text, replyTo }) => {
    const transporter = createTransporter();
    const from = process.env.MAIL_FROM || process.env.SMTP_USER;

    return transporter.sendMail({
        from,
        to: to || process.env.MAIL_TO || from,
        replyTo,
        subject,
        html,
        text
    });
};

module.exports = {
    sendMail
};
