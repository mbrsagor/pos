import React, { useState, useRef, useEffect, useContext } from "react";
import FeatherIcon from "feather-icons-react";
import { ThemeContext } from "../../context/ThemeContext";
import Avatar from "../../assets/avatar/avatar.png";
import ProfileNav from "./subComponent/profileNav";
import NotificationModal from "./subComponent/notificationModal";
import "../../styles/header.scss";
import axios from "../../services/axiosConfig";
import { profileURL } from "../../services/api_services";

export default function Header({ toggleSidebar }) {
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [notificationOpen, setNotificationOpen] = useState(false);
  const dropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const toggleDropdown = () => setDropdownOpen((prev) => !prev);
  const toggleNotification = () => setNotificationOpen((prev) => !prev);

  // close dropdown/notification when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setNotificationOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // fetch profile info
  useEffect(() => {
    axios
      .get(profileURL)
      .then((res) => {
        const profile_data = res.data.data;
        setUser({ ...profile_data });
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <header className="header d-flex justify-content-between align-items-center p-3 shadow-sm">
      <div className="d-flex align-items-center">
        {/* Menu button for toggling sidebar */}
        <button
          className="btn btn-link text-dark p-0 me-3"
          type="button"
          id="sidebarToggle"
          aria-label="Toggle sidebar"
          onClick={toggleSidebar}
        >
          <FeatherIcon icon="menu" />
        </button>
      </div>

      <div className="d-flex align-items-center header_right_content">
        {/* 🌙 Theme toggle button */}
        <button
          className="btn btn-link text-dark p-0 me-3"
          type="button"
          onClick={toggleTheme}
          title={
            theme === "dark" ? "Switch to Light mode" : "Switch to Dark mode"
          }
        >
          <FeatherIcon icon={theme === "dark" ? "sun" : "moon"} />
        </button>

        {/*  Notification Bell (currently hidden with d-none) */}
        <div className="d-none" ref={notificationRef}>
          <button
            className="btn btn-link text-dark p-0 me-3"
            type="button"
            onClick={toggleNotification}
          >
            <FeatherIcon icon="bell" />
          </button>
          <div
            className={`notification_dropdown_section ${
              notificationOpen ? "show" : ""
            }`}
          >
            <NotificationModal />
          </div>
        </div>

        {/* User Avatar */}
        <div className="header-icon d-flex align-items-center me-3">
          <img
            src={user?.avatar ? `${user.avatar}` : Avatar}
            alt="Avatar"
            className="avatar rounded-circle"
            width="40"
            height="40"
            loading="lazy"
          />
        </div>

        {/* Profile Dropdown */}
        <div ref={dropdownRef} className="user-profile-wrapper">
          <div className="user-profile fw-semibold" onClick={toggleDropdown}>
            {user?.fullname || "User"}
          </div>
          <div className={`dropdown_section ${dropdownOpen ? "show" : ""}`}>
            <ProfileNav />
          </div>
        </div>
      </div>
    </header>
  );
}
