import React from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#f8f7ed] flex flex-col items-center justify-center py-0 px-2 md:px-0 font-mono" style={{fontFamily: 'VT323, monospace'}}>
      <div className="w-full max-w-lg bg-white border-2 border-black rounded-xl shadow-lg p-0 flex flex-col items-center mt-16 mb-8 relative" style={{boxShadow: '4px 8px 24px 0 rgba(60,60,60,0.10)'}}>
        {/* Window header bar */}
        <div className="w-full flex items-center justify-between px-4 py-2 border-b-2 border-black rounded-t-xl bg-[#f8f7ed]">
          <span className="text-lg">BooksVerse</span>
          <div className="flex gap-2">
            <span className="w-3 h-3 bg-black rounded-full inline-block"></span>
            <span className="w-3 h-3 bg-black rounded-full inline-block"></span>
            <span className="w-3 h-3 bg-black rounded-full inline-block"></span>
          </div>
        </div>
        <div className="flex flex-col items-center gap-6 w-full px-8 py-10">
          <img src="https://cdn-icons-png.flaticon.com/512/2232/2232688.png" alt="Book Icon" className="w-20 h-20 mb-2 border-2 border-black rounded-full bg-white shadow" />
          <h1 className="text-3xl md:text-4xl font-extrabold text-center text-black mb-2 tracking-tight">Welcome to <span className="text-[#3ec6b0]">Review IT</span></h1>
          <p className="text-base text-black text-center max-w-xl mb-2">Hey!! Heres your guide to see the reviews of any book  <span className="inline-block ml-1"></span></p>
          <button className="bg-[#3ec6b0] text-black border-2 border-black rounded-full px-8 py-3 text-lg font-bold shadow hover:bg-[#b8f2e6] transition" onClick={() => navigate('/books')}>Start Rating</button>
        </div>
      </div>
      <div className="text-xs text-gray-500 mt-2" style={{fontFamily: 'VT323, monospace'}}></div>
    </div>
  );
} 