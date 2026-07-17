import jwt from 'jsonwebtoken';
import Admin from '../models/admin';
import connectDB from './db';

export const protect = async (req, res) => {
    await connectDB();
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const admin = await Admin.findById(decoded.id).select('-password');

            if (!admin) {
                res.status(401).json({ success: false, message: 'Admin not found' });
                return null;
            }

            return admin;
        } catch (error) {
            console.error('Auth Error:', error);
            res.status(401).json({ success: false, message: 'Not authorized, token failed' });
            return null;
        }
    }

    if (!token) {
        res.status(401).json({ success: false, message: 'Not authorized, no token' });
        return null;
    }
};
