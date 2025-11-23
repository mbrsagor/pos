import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { useNavigate } from "react-router-dom";

export default function ProfileNav() {
  const [user, setUser] = useState(null);
  // Navigate to to sign in page
  const navigate = useNavigate();

  // Get restaurant ID from local storage
  const restaurantId = localStorage.getItem("restaurantId");

  // Get data from local-store
    useEffect(() => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }, []);

// Sign out without API call remove token from localStorage
  const handlerSignOut = async () => {
    localStorage.removeItem("token");
    localStorage.clear();

    // Navigate after state update
    setTimeout(() => {
      navigate("/signin");
    }, 100);
  };

  return (
    <div>
      <p className="mb-0 ml-2 title d-none">{user?.role_name} </p>
      <ul className="nav flex-column">
        <li>
          <Link className="nav-link active" to="/profile">
            <FeatherIcon icon="user" size={14} /> My Account
          </Link>
        </li>
        <li>
          <Link className="nav-link active" to={`/update-restaurant/${restaurantId}`}>
            <FeatherIcon icon="settings" size={14} /> Manage Restaurant
          </Link>
        </li>
        <li>
          <Link className="nav-link active" to="#" onClick={handlerSignOut}>
            <FeatherIcon icon="log-out" size={14} /> Sign Out
          </Link>
        </li>
      </ul>
    </div>
  );
}
