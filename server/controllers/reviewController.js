import Review from '../models/Review.js';

export const getReviews = async (req, res) => {
    const reviews = await Review.find({ book: req.query.bookId }).populate('user', 'name');
    res.json(reviews);
};

export const addReview = async (req, res) => {
    const { bookId, rating, comment } = req.body;
    const review = await Review.create({
        book: bookId,
        user: req.user._id,
        rating,
        comment,
    });
    res.status(201).json(review);
};
