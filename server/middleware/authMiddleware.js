import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protect = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) throw new Error('Not authorized');

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = await User.findById(decoded.id).select('-password');
        next();
    } catch (err) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};

export const adminOnly = (req, res, next) => {
    if (req.user && req.user.isAdmin) next();
    else res.status(403).json({ message: 'Admin access only' });
};
