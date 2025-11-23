import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

export default function Menus({ closeSidebar }) {
  const location = useLocation();

  const [bannerOpen, setBannerOpen] = useState(false);
  const [foodOpen, setFoodOpen] = useState(false);

  // Get user role
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const role = user?.role;

  // Auto-open menus based on current route
  useEffect(() => {
    if (
      location.pathname.startsWith("/banners") ||
      location.pathname === "/create-banner"
    ) {
      setBannerOpen(true);
    }
    if (
      location.pathname.startsWith("/categories") ||
      location.pathname.startsWith("/foods") ||
      location.pathname === "/create-food"
    ) {
      setFoodOpen(true);
    } else {
      setFoodOpen(false);
    }
  }, [location.pathname]);

  // Helper: close sidebar on mobile after clicking a link
  const handleLinkClick = () => {
    if (window.innerWidth <= 767 && typeof closeSidebar === "function") {
      closeSidebar();
    }
  };

  // If role === 2 → No access
  if (role === 4 || role == 5) {
    return (
      <ul className="nav flex-column sidebar-nav">
        <li className="nav-item text-center text-muted mt-3">
          <small>Sorry! No menu access</small>
        </li>
      </ul>
    );
  }

  return (
    <ul className="nav flex-column sidebar-nav">
      {(role === 1 || role === 2) && (
        <li className="nav-item">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              "nav-link" + (isActive ? " active" : "")
            }
            onClick={handleLinkClick}
          >
            <FeatherIcon icon="home" size={15} />
            <span>Dashboard</span>
          </NavLink>
        </li>
      )}

      {/* Banners */}
      {(role === 1 || role === 2) && (
        <>
          <li className="nav-item">
            <div
              className="nav-link d-flex justify-content-between align-items-center"
              onClick={() => setBannerOpen((prev) => !prev)}
              role="button"
              aria-expanded={bannerOpen}
            >
              <div>
                <FeatherIcon icon="image" size={15} />
                <span className="ms-2">Banner</span>
              </div>
              <FeatherIcon
                icon={bannerOpen ? "chevron-up" : "chevron-down"}
                size={14}
              />
            </div>
            {bannerOpen && (
              <ul className="submenu ps-3">
                <li>
                  <NavLink
                    to="/banners"
                    className={({ isActive }) =>
                      "nav-link sub" + (isActive ? " active" : "")
                    }
                    onClick={handleLinkClick}
                  >
                    All Banner
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/create-banner"
                    className={({ isActive }) =>
                      "nav-link sub" + (isActive ? " active" : "")
                    }
                    onClick={handleLinkClick}
                  >
                    Create Banner
                  </NavLink>
                </li>
              </ul>
            )}
          </li>
          {(role === 1 || role === 2) && (
            <li className="nav-item">
              <div
                className="nav-link d-flex justify-content-between align-items-center"
                onClick={() => setFoodOpen((prev) => !prev)}
                role="button"
                aria-expanded={foodOpen}
              >
                <div>
                  <FeatherIcon icon="coffee" size={15} />
                  <span className="ms-2">Food Items</span>
                </div>
                <FeatherIcon
                  icon={foodOpen ? "chevron-up" : "chevron-down"}
                  size={14}
                />
              </div>
              {foodOpen && (
                <ul className="submenu ps-3">
                  <li>
                    <NavLink
                      to="/categories"
                      className={({ isActive }) =>
                        "nav-link sub" + (isActive ? " active" : "")
                      }
                      onClick={handleLinkClick}
                    >
                      Category
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="/foods"
                      className={({ isActive }) =>
                        "nav-link sub" + (isActive ? " active" : "")
                      }
                      onClick={handleLinkClick}
                    >
                      All Food Items
                    </NavLink>
                  </li>

                  <li>
                    <NavLink
                      to="/create-food"
                      className={({ isActive }) =>
                        "nav-link sub" + (isActive ? " active" : "")
                      }
                      onClick={handleLinkClick}
                    >
                      Create Food Item
                    </NavLink>
                  </li>
                </ul>
              )}
            </li>
          )}
        </>
      )}
    </ul>
  );
}
