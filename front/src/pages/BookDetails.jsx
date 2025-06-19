import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

export default function BookDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Helper to get reviews from localStorage
  function getStoredReviews(bookId) {
    const all = JSON.parse(localStorage.getItem("bookReviews") || "{}")
    return all[bookId] || [];
  }

  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    setLoading(true);
    // Fetch book details from Google Books API
    fetch(`https://www.googleapis.com/books/v1/volumes/${id}`)
      .then(r => {
        if (!r.ok) throw new Error("Not found");
        return r.json();
      })
      .then(data => {
        setBook({
          id: data.id,
          title: data.volumeInfo.title,
          author: (data.volumeInfo.authors && data.volumeInfo.authors.join(", ")) || "Unknown",
          coverImage: data.volumeInfo.imageLinks?.thumbnail,
          averageRating: data.volumeInfo.averageRating,
          genre: data.volumeInfo.categories?.[0] || "Fiction",
          publishedDate: data.volumeInfo.publishedDate,
          pageCount: data.volumeInfo.pageCount,
          format: data.volumeInfo.printType,
          description: data.volumeInfo.description,
        });
        setReviews(getStoredReviews(data.id));
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load book details");
        setLoading(false);
      });
  }, [id]);

  // Review form state
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });

  function saveStoredReviews(bookId, reviews) {
    const all = JSON.parse(localStorage.getItem("bookReviews") || "{}")
    all[bookId] = reviews;
    localStorage.setItem("bookReviews", JSON.stringify(all));
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const updated = [
      ...reviews,
      { id: Date.now(), user: "You", rating: newReview.rating, comment: newReview.comment },
    ];
    setReviews(updated);
    saveStoredReviews(book.id, updated);
    setNewReview({ rating: 5, comment: "" });
  };

  if (loading) return <div className="text-center mt-20 text-xl">Loading...</div>;
  if (error) return <div className="text-center mt-20 text-red-500">{error}</div>;
  if (!book) return <div className="text-center mt-20 text-gray-500">Book not found.</div>;

  return (
    <div className="min-h-screen bg-[#f8f7ed] flex flex-col items-center justify-center py-8 px-2 md:px-0 font-mono" style={{fontFamily: 'VT323, monospace'}}>
      <div className="w-full max-w-xl bg-white border-2 border-black rounded-xl shadow-lg p-0 flex flex-col items-center mt-8 mb-8 relative" style={{boxShadow: '4px 8px 24px 0 rgba(60,60,60,0.10)'}}>
        {/* Window header bar */}
        <div className="w-full flex items-center justify-between px-4 py-2 border-b-2 border-black rounded-t-xl bg-[#f8f7ed]">
          <span className="text-lg">Book Details</span>
          <button className="text-xs underline" onClick={() => navigate('/books')}>Back to Books</button>
        </div>
        <div className="flex flex-col items-center gap-4 w-full px-8 py-8">
          {book.coverImage && (
            <img src={book.coverImage} alt={book.title} className="h-40 w-32 object-cover border-2 border-[#3ec6b0] mb-2 rounded shadow" />
          )}
          <h2 className="text-2xl font-bold text-black text-center mb-1">{book.title}</h2>
          <div className="text-base text-gray-700 text-center mb-2">by {book.author}</div>
          <div className="text-sm text-gray-500 mb-2">Genre: {book.genre || 'fiction'} | Released: {book.publishedDate || '----'} | Pages: {book.pageCount || '---'} | Format: {book.format || 'paperback'}</div>
          <div className="text-lg text-black mb-4">Average Rating: <span className="text-yellow-500">★</span> {book.averageRating || ''}</div>
          <div className="w-full mb-4">
            <h3 className="text-xl font-bold mb-2 text-black">Description</h3>
            <div className="text-gray-700 text-sm" dangerouslySetInnerHTML={{__html: book.description || 'No description.'}} />
          </div>
          <div className="w-full">
            <h3 className="text-xl font-bold mb-2 text-black">Reviews</h3>
            {reviews.length === 0 ? (
              <div className="text-gray-400">No reviews yet.</div>
            ) : (
              <div className="flex flex-col gap-3 mb-4">
                {reviews.map(r => (
                  <div key={r.id} className="bg-[#b8f2e6] border-2 border-[#3ec6b0] px-4 py-2 flex flex-col items-start shadow rounded-xl font-mono">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-[#3ec6b0] font-mono">{r.user || 'Anonymous'}</span>
                      <span className="text-yellow-500 font-mono">{'★'.repeat(r.rating)}</span>
                    </div>
                    <div className="text-[#3ec6b0] font-mono">{r.comment}</div>
                  </div>
                ))}
              </div>
            )}
            <form onSubmit={handleReviewSubmit} className="mt-4 font-mono">
              <div className="flex items-center gap-2 mb-2">
                <label className="font-semibold text-black font-mono">Your Rating:</label>
                <select
                  className="border-2 rounded p-1 border-[#3ec6b0] bg-white text-black font-mono"
                  value={newReview.rating}
                  onChange={e => setNewReview({ ...newReview, rating: Number(e.target.value) })}
                >
                  {[5,4,3,2,1].map(n => (
                    <option key={n} value={n}>{n}</option>
                  ))}
                </select>
              </div>
              <textarea
                className="w-full border-2 rounded p-2 mb-2 border-[#3ec6b0] bg-white text-black font-mono"
                placeholder="Write your review..."
                value={newReview.comment}
                onChange={e => setNewReview({ ...newReview, comment: e.target.value })}
                required
              />
              <button className="bg-[#3ec6b0] text-black border-2 border-black px-4 py-2 rounded font-bold shadow hover:bg-[#b8f2e6] hover:text-black transition mt-2 font-mono" type="submit">
                Submit Review
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
} 