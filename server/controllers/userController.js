import User from '../models/User.js';

export const getUser = async (req, res) => {
    const user = await User.findById(req.params.id).select('-password');
    res.json(user);
};

export const updateUser = async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(user);
};
