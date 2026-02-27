"use client";

import { useState } from "react";
import UserProfile from "./UserProfile";

export default function Header({ toggleSidebar }) {

  const [openProfile, setOpenProfile] = useState(false);

  return (
    <div className="relative flex justify-between items-center bg-white shadow px-4 py-3">

      {/* Left Side Menu Icon */}
      <button onClick={toggleSidebar} className="text-2xl">
        ☰
      </button>

      {/* Right Side User Profile */}
      <div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => setOpenProfile(!openProfile)}
      >
        <img
          src="https://cdn-icons-png.flaticon.com/512/219/219983.png"
          alt="user icon"
          className="w-10 h-10 rounded-full"
        />

        <span className="font-medium">User</span>
      </div>

      {/* ✅ pass onClose */}
      {openProfile && (
        <UserProfile onClose={() => setOpenProfile(false)} />
      )}

    </div>
  );
}
