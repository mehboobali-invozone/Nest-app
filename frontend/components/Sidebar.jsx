"use client";

import Link from "next/link";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

export default function Sidebar({ isOpen }) {

  const role = useSelector((s) => s.auth.user?.role);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div
      className={`bg-gray-800 text-white w-64 h-screen p-5 fixed top-0 left-0 transition-transform duration-300 z-40
      ${isOpen ? "translate-x-0" : "-translate-x-full"}`}
    >

      <h2 className="text-xl font-bold mb-6">
        Dashboard
      </h2>

      <ul className="space-y-4">

        {role === "Admin" && (
          <li>
            <Link href="/dashboard/users">
              User
            </Link>
          </li>
        )}

        {(role === "Admin" || role === "Editor") && (
          <li>
            <Link href="/dashboard/blogs">
              Blogs
            </Link>
          </li>
        )}

      </ul>

    </div>
  );
}