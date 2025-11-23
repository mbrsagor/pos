import React, { useState, useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
import Sidebar from "./sidebar";
import CompanyProfileCheck from "../utils/checkCompanyProfile";

export default function Layout({ children }) {
  const [user, setUser] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen((prev) => !prev);
  };

  // Close sidebar (used by Menus on mobile)
  const closeSidebar = () => setSidebarOpen(false);

  // Get user from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Manage overlay + scroll lock on mobile
  useEffect(() => {
    const isMobile = window.innerWidth <= 767;

    if (sidebarOpen && isMobile) {
      document.body.classList.add("sidebar-open");
      document.body.style.overflow = "hidden";
    } else {
      document.body.classList.remove("sidebar-open");
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.classList.remove("sidebar-open");
      document.body.style.overflow = "auto";
    };
  }, [sidebarOpen]);

  // Auto-collapse / set initial state based on screen size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= 767) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="app-container d-flex">
      {user?.role === 2 && <CompanyProfileCheck />}

      {/* pass closeSidebar so Menus can auto-close on mobile */}
      <Sidebar isOpen={sidebarOpen} closeSidebar={closeSidebar} />

      <div
        className={`main-content flex-grow-1 d-flex flex-column ${
          !sidebarOpen ? "expanded" : ""
        }`}
      >
        {/* Header receives toggleSidebar to show/hide the sidebar */}
        <Header toggleSidebar={toggleSidebar} />
        <div className="content-area flex-grow-1">{children}</div>
        <Footer />
      </div>
    </div>
  );
}
