import express from 'express';
import cors from 'cors';
import connectDB from '../../lib/db';

const adminRoutes = require('../../api_logic/routes/adminRoutes');
const courseRoutes = require('../../api_logic/routes/courseroutes');
const uploadRoutes = require('../../api_logic/routes/uploadRoutes');
const pageContentRoutes = require('../../api_logic/routes/pageContentRoutes');
const aboutPageRoutes = require('../../api_logic/routes/aboutPageRoutes');
const homeRoutes = require('../../api_logic/routes/homeRoutes');
const consultationRoutes = require('../../api_logic/routes/consultationRoutes');
const paymentRoutes = require('../../api_logic/routes/payment');
const adminAppointmentRoutes = require('../../api_logic/routes/adminAppointmentRoutes');
const contactRoutes = require('../../api_logic/routes/contactRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/admin', adminRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/page-content', pageContentRoutes);
app.use('/api/about-page', aboutPageRoutes);
app.use('/api/home', homeRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/admin/appointments', adminAppointmentRoutes);
app.use('/api/contact', contactRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error('❌ Error:', err.stack);
    
    // Multer error handling
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({ success: false, message: 'File too large. Maximum size is 5MB' });
    }
    
    if (err.code === 'LIMIT_UNEXPECTED_FILE') {
        return res.status(400).json({ success: false, message: 'Unexpected file field' });
    }
    
    if (err.message === 'Only image files are allowed') {
        return res.status(400).json({ success: false, message: 'Only image files (JPG, PNG, GIF, WEBP) are allowed' });
    }
    
    res.status(err.status || 500).json({ success: false, message: err.message || 'Internal server error' });
});

export const config = {
  api: {
    bodyParser: false, 
    externalResolver: true,
  },
};

export default async function handler(req, res) {
  console.log(`[API REQUEST] ${req.method} ${req.url}`);
  await connectDB();
  
  return new Promise((resolve, reject) => {
    app(req, res, (result) => {
      if (result instanceof Error) {
        console.error(`[API ERROR]`, result);
        return reject(result);
      }
      return resolve(result);
    });
  });
}
