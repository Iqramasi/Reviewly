import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: String,
    author: String,
    description: String,
    coverImage: String,
    averageRating: { type: Number, default: 0 },
}, { timestamps: true });

export default mongoose.model('Book', bookSchema);
