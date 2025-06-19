import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getBooks } from "../api";

// Helper to get reviews from localStorage
function getStoredReviews(bookId) {
  const all = JSON.parse(localStorage.getItem("bookReviews") || "{}")
  return all[bookId] || [
    { id: 1, user: "Iqra", rating: 5, comment: "Amazing book!" }
  ];
}
// Helper to save reviews to localStorage
function saveStoredReviews(bookId, reviews) {
  const all = JSON.parse(localStorage.getItem("bookReviews") || "{}")
  all[bookId] = reviews;
  localStorage.setItem("bookReviews", JSON.stringify(all));
}

export default function Books() {
  const [search, setSearch] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    getBooks(search || "bestsellers")
      .then(data => setBooks(data))
      .catch(() => setError("Failed to load books"))
      .finally(() => setLoading(false));
  }, [search]);

  const openReviews = (book) => {
    setSelectedBook(book);
    const stored = getStoredReviews(book._id);
    setReviews(stored);
    setShowModal(true);
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    const updated = [
      ...reviews,
      { id: Date.now(), user: "You", rating: newReview.rating, comment: newReview.comment },
    ];
    setReviews(updated);
    saveStoredReviews(selectedBook._id, updated);
    setNewReview({ rating: 5, comment: "" });
  };

  return (
    <div className="min-h-screen bg-[#f8f7ed] flex flex-col items-center justify-center py-8 px-2 md:px-0 relative overflow-x-hidden font-mono" style={{fontFamily: 'VT323, monospace'}}>
      <div className="w-full max-w-6xl flex flex-col gap-8 z-10 relative">
        <h1 className="text-3xl md:text-4xl font-extrabold text-left mb-4 tracking-tight text-black">Books</h1>
        <input
          className="w-full p-3 border-2 border-black rounded mb-8 shadow focus:outline-none focus:ring-2 focus:ring-[#b8f2e6] bg-white text-black placeholder-gray-400 font-mono"
          placeholder="Search books..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        {loading ? (
          <div className="flex justify-center items-center h-40">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#3ec6b0]"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center">{error}</div>
        ) : books.length === 0 ? (
          <div className="text-gray-400 text-center">No books found.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 px-2 md:px-0">
            {books.map((book, idx) => (
              <div
                key={book._id}
                className="relative flex flex-col items-center p-0 min-h-[340px] rounded-xl shadow-lg border-2 border-black bg-white cursor-pointer"
                style={{boxShadow: '4px 8px 24px 0 rgba(60,60,60,0.10)', fontFamily: 'VT323, monospace'}}
                onClick={() => navigate(`/books/${book._id}`)}
              >
                {/* Window header bar */}
                <div className="w-full flex items-center justify-between px-3 py-1 border-b-2 border-black rounded-t-xl bg-[#f8f7ed]">
                  <span className="text-base">Book</span>
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-black rounded-full inline-block"></span>
                    <span className="w-2 h-2 bg-black rounded-full inline-block"></span>
                    <span className="w-2 h-2 bg-black rounded-full inline-block"></span>
                  </div>
                </div>
                <div className="flex flex-col items-center gap-2 w-full px-4 py-4">
                  {/* Book cover */}
                  {book.coverImage ? (
                    <img src={book.coverImage} alt={book.title} className="h-32 w-24 object-cover border-2 border-[#3ec6b0] mb-2 rounded shadow" />
                  ) : (
                    <div className="h-32 w-24 bg-[#b8f2e6] border-2 border-[#3ec6b0] mb-2 flex items-center justify-center text-3xl text-[#3ec6b0] rounded shadow">📚</div>
                  )}
                  {/* Book title */}
                  <h3 className="text-lg font-bold text-center text-black mb-1 font-mono">{book.title}</h3>
                  <p className="text-xs text-gray-500 mb-1 text-center font-mono">{book.author}</p>
                 
                  
                  <button
                    className="mt-auto bg-[#3ec6b0] text-black border-2 border-black px-4 py-1 rounded font-bold shadow hover:bg-[#b8f2e6] hover:text-black transition text-xs font-mono"
                    onClick={e => { e.stopPropagation(); openReviews(book); }}
                  >
                    Reviews
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      {/* Reviews Modal */}
      {showModal && selectedBook && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white border-2 border-black shadow-2xl p-8 w-full max-w-lg relative rounded-xl font-mono">
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-[#3ec6b0] text-2xl"
              onClick={() => setShowModal(false)}
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-2 text-black font-mono">Reviews for {selectedBook.title}</h2>
            <div className="mb-4 max-h-48 overflow-y-auto flex flex-col gap-3">
              {reviews.length === 0 ? (
                <div className="text-gray-400 font-mono">No reviews yet.</div>
              ) : (
                reviews.map(r => (
                  <div key={r.id} className="bg-[#b8f2e6] border-2 border-[#3ec6b0] px-4 py-2 flex flex-col items-start shadow rounded-xl font-mono">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold text-[#3ec6b0] font-mono">{r.user}</span>
                      <span className="text-yellow-500 font-mono">{'★'.repeat(r.rating)}</span>
                    </div>
                    <div className="text-[#3ec6b0] font-mono">{r.comment}</div>
                  </div>
                ))
              )}
            </div>
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
      )}
    </div>
  );
} 