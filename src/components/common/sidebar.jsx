import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

import "../../styles/sidebar.scss";
import Menus from "../common/subComponent/menus";

export default function Sidebar({ isOpen, closeSidebar }) {
  // keep body class sync so overlay works even if Layout did not set (defensive)
  useEffect(() => {
    if (isOpen && window.innerWidth <= 767) {
      document.body.classList.add("sidebar-open");
    } else {
      document.body.classList.remove("sidebar-open");
    }
    return () => document.body.classList.remove("sidebar-open");
  }, [isOpen]);

  return (
    <aside className={`sidebar pt-4 shadow-sm ${isOpen ? "" : "collapsed"}`}>
      <div className="brand-name mb-4 text-center">
        <h5 className="fs-5 brand-text">
          <NavLink
            to="/"
            className="text-decoration-none d-flex align-items-center justify-content-center gap-2"
            onClick={() => {
              // if on mobile and we click brand, close sidebar so user sees content
              if (
                window.innerWidth <= 767 &&
                typeof closeSidebar === "function"
              ) {
                closeSidebar();
              }
            }}
          >
            <span className="logo-icon">
              <FeatherIcon icon="coffee" size={20} />
            </span>
            <span className="logo-text">pos</span>
          </NavLink>
        </h5>
      </div>

      {/* Pass closeSidebar down so Menus can auto-close on mobile link clicks */}
      <Menus closeSidebar={closeSidebar} />
    </aside>
  );
}
