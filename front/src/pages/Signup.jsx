import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });
      if (!res.ok) throw new Error("Signup failed");
      const data = await res.json();
      localStorage.setItem("token", data.token);
      navigate("/");
    } catch (err) {
      setError(err.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f7ed] flex flex-col items-center justify-center py-0 px-2 md:px-0 font-mono" style={{fontFamily: 'VT323, monospace'}}>
      <div className="w-full max-w-md bg-white border-2 border-black rounded-xl shadow-lg p-0 flex flex-col items-center mt-16 mb-8 relative" style={{boxShadow: '4px 8px 24px 0 rgba(60,60,60,0.10)'}}>
        {/* Window header bar */}
        <div className="w-full flex items-center justify-between px-4 py-2 border-b-2 border-black rounded-t-xl bg-[#f8f7ed]">
          <span className="text-lg">Sign Up</span>
          <div className="flex gap-2">
            <span className="w-3 h-3 bg-black rounded-full inline-block"></span>
            <span className="w-3 h-3 bg-black rounded-full inline-block"></span>
            <span className="w-3 h-3 bg-black rounded-full inline-block"></span>
          </div>
        </div>
        <form className="flex flex-col items-center gap-4 w-full px-8 py-10" onSubmit={handleSubmit}>
          <input type="text" required placeholder="Name" value={name} onChange={e => setName(e.target.value)} className="w-full p-3 border-2 border-black rounded bg-[#f8f7ed] text-black font-mono" />
          <input type="email" required placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="w-full p-3 border-2 border-black rounded bg-[#f8f7ed] text-black font-mono" />
          <input type="password" required placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 border-2 border-black rounded bg-[#f8f7ed] text-black font-mono" />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="bg-[#3ec6b0] text-black border-2 border-black rounded-full px-8 py-3 text-lg font-bold shadow hover:bg-[#b8f2e6] transition">Sign Up</button>
          <div className="text-xs text-gray-500 mt-2">Already have an account? <span className="underline cursor-pointer" onClick={() => navigate('/login')}>Login</span></div>
        </form>
      </div>
    </div>
  );
} 