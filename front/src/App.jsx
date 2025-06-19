import React from "react";
import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Books from "./pages/Books";
import Profile from "./pages/Profile";
import BookDetails from './pages/BookDetails';

// Add Google Fonts link for VT323 (retro monospace)
const fontLink = document.createElement('link');
fontLink.href = 'https://fonts.googleapis.com/css2?family=VT323&display=swap';
fontLink.rel = 'stylesheet';
document.head.appendChild(fontLink);

export default function App() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-[#f8f7ed] font-mono relative overflow-x-hidden" style={{fontFamily: 'VT323, monospace'}}>
      {/* Pastel doodle background shapes */}
      <div className="pointer-events-none select-none">
        <svg width="100vw" height="100vh" className="fixed top-0 left-0 z-0" style={{width: '100vw', height: '100vh'}}>
          <ellipse cx="20%" cy="10%" rx="180" ry="60" fill="#b8f2e6" opacity="0.25" />
          <ellipse cx="80%" cy="90%" rx="220" ry="80" fill="#b8f2e6" opacity="0.18" />
          <ellipse cx="60%" cy="30%" rx="120" ry="40" fill="#b8f2e6" opacity="0.15" />
        </svg>
      </div>
      <nav className="bg-white border-2 border-black rounded-t-xl shadow-lg flex items-center justify-between px-6 py-2 mt-6 mb-8 mx-auto max-w-3xl z-10 relative" style={{fontFamily: 'VT323, monospace'}}>
        <div className="flex items-center gap-2">
          <span className="font-extrabold text-2xl text-black tracking-wide">ReviewLy</span>
        </div>
        <div className="flex items-center gap-6">
          <Link to="/" className={`text-black text-lg px-2 pb-1 rounded transition-all border-b-2 ${location.pathname === '/' ? 'border-black' : 'border-transparent hover:border-black'}`}>Home</Link>
          <Link to="/books" className={`text-black text-lg px-2 pb-1 rounded transition-all border-b-2 ${location.pathname === '/books' ? 'border-black' : 'border-transparent hover:border-black'}`}>Books</Link>
          <Link to="/profile" className={`text-black text-lg px-2 pb-1 rounded transition-all border-b-2 ${location.pathname === '/profile' ? 'border-black' : 'border-transparent hover:border-black'}`}>Profile</Link>
        </div>
      </nav>
      <main className="container mx-auto p-4 z-10 relative">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/books/:id" element={<BookDetails />} />
        </Routes>
      </main>
    </div>
  );
} 