"use client";

import { useState } from "react";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";

export default function DashboardLayout({ children }) {

  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="flex">

      <Sidebar isOpen={isOpen} />
         <div className={`flex-1 ${isOpen ? "ml-64" : "ml-0"}`}>
            <Header toggleSidebar={() => setIsOpen(!isOpen)} />
               <div className="p-6 bg-gray-100 min-h-screen">
                 {children}
               </div>
          </div>
    </div>
  );
}