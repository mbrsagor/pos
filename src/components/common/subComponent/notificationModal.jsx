import React from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";

import avatar from "../../../assets/avatar/profile.jpg";

export default function NotificationModal() {
  return (
    <div className="notification_modal">
      <div className="notification_header">
        <h4>Notification</h4>
      </div>
      <div className="notification_body">
        <ul>
          <li>
            <Link to="/">
              <div className="notification_content">
                <img width={40} src={avatar} alt="" />{" "}
                <div className="notification_text">
                  <span>Your earning 500 points</span>
                  <span className="time">30 May 2025 7:57PM</span>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/">
              <div className="notification_content">
                <img width={40} src={avatar} alt="" />{" "}
                <div className="notification_text">
                  <span>New order received</span>
                  <span className="time">30 May 2025 7:57PM</span>
                </div>
              </div>
            </Link>
          </li>
          <li>
            <Link to="/">
              <div className="notification_content">
                <FeatherIcon size={35} icon="alert-circle" />
                <div className="notification_text">
                  <span>New order received</span>
                  <span className="time">30 May 2025 7:57PM</span>
                </div>
              </div>
            </Link>
          </li>
        </ul>
      </div>
      <div className="notification_footer mt-2 mb-2 text-center">
        <Link to="/orders" className="btn-sm">
          View All
        </Link>
      </div>
    </div>
  );
}
