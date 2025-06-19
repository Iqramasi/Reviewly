import React, { useState, useEffect } from "react";

export default function Profile() {
  const [name, setName] = useState("");
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("profileName");
    if (stored) setName(stored);
  }, []);

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSave = () => {
    localStorage.setItem("profileName", name);
    setEditing(false);
  };

  const handleEdit = () => {
    setEditing(true);
  };

  return (
    <div className="min-h-screen bg-[#f8f7ed] flex flex-col items-center justify-center py-8 px-2 md:px-0 font-mono" style={{fontFamily: 'VT323, monospace'}}>
      <div className="w-full max-w-md bg-white border-2 border-black rounded-xl shadow-lg p-0 flex flex-col items-center mt-8 mb-8 relative" style={{boxShadow: '4px 8px 24px 0 rgba(60,60,60,0.10)'}}>
        {/* Window header bar */}
        <div className="w-full flex items-center justify-between px-4 py-2 border-b-2 border-black rounded-t-xl bg-[#f8f7ed]">
          <span className="text-lg">Profile</span>
        </div>
        <div className="flex flex-col items-center gap-4 w-full px-8 py-8">
          {(!name || editing) ? (
            <>
              <label className="text-xl font-bold text-black mb-2" htmlFor="name">Your Name</label>
              <input
                id="name"
                className="w-full p-3 border-2 border-black rounded shadow focus:outline-none focus:ring-2 focus:ring-[#b8f2e6] bg-white text-black placeholder-gray-400 font-mono text-lg"
                placeholder="Enter your name..."
                value={name}
                onChange={handleChange}
                autoFocus
              />
              <button
                className="mt-2 bg-[#3ec6b0] text-black border-2 border-black px-4 py-2 rounded font-bold shadow hover:bg-[#b8f2e6] transition text-base font-mono"
                onClick={handleSave}
                disabled={!name.trim()}
              >
                Save
              </button>
            </>
          ) : (
            <div className="w-full flex justify-center mt-6">
              <div className="w-full max-w-xs bg-[#b8f2e6] border-2 border-[#3ec6b0] rounded-xl shadow-lg flex flex-col items-center p-6" style={{boxShadow: '4px 8px 24px 0 rgba(60,60,60,0.10)'}}>
                <img src="https://cdn-icons-png.flaticon.com/512/3135/3135715.png" alt="Profile Icon" className="w-20 h-20 mb-2 border-2 border-black rounded-full bg-white shadow" />
                <div className="text-2xl font-bold text-[#3ec6b0] mb-1 font-mono">{name}</div>
                <div className="text-base text-black font-mono mb-2">Welcome to your profile!</div>
                <button
                  className="bg-white text-[#3ec6b0] border-2 border-[#3ec6b0] px-3 py-1 rounded font-bold shadow hover:bg-[#3ec6b0] hover:text-white transition text-xs font-mono mt-2"
                  onClick={handleEdit}
                >
                  Edit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 