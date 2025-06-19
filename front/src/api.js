import axios from "axios";

// Fetch books from Google Books API for demo purposes
export const getBooks = async (query = "bestsellers") => {
  const res = await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}`
  );
  // Map Google Books data to your card format
  return res.data.items.map(item => ({
    _id: item.id,
    title: item.volumeInfo.title,
    author: (item.volumeInfo.authors && item.volumeInfo.authors.join(", ")) || "Unknown",
    coverImage: item.volumeInfo.imageLinks?.thumbnail,
    averageRating: item.volumeInfo.averageRating,
  }));
}; 