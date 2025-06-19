import Book from '../models/Book.js';

export const getBooks = async (req, res) => {
    const books = await Book.find().limit(20); // Add pagination if needed
    res.json(books);
};

export const getBookById = async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) return res.status(404).json({ message: 'Book not found' });
    res.json(book);
};

export const addBook = async (req, res) => {
    const book = await Book.create(req.body);
    res.status(201).json(book);
};
