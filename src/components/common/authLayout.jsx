import React from "react";
import "../../styles/auth.scss";
import AuthBanner from "../../assets/banner/banner-auth.jpg";

export default function AuthLayout({ children, ...props }) {
  return (
    <div className="auth_container">
      <div className="auth_left">
        <img src={AuthBanner} alt="banner" className="auth_banner_img" />
      </div>

      <div className="auth_right">
        <div className="auth_form_wrapper">
          <div className="auth_header">
            <h2 className="title">pos Admin</h2>
            <p className="subtitle">{props.subtitle}</p>
          </div>
          <div className="auth_form_content">{children}</div>
        </div>
      </div>
    </div>
  );
}
