import React, { useState } from "react";
import { toast } from "react-toastify";
import FeatherIcon from "feather-icons-react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { changePasswordEndpoint } from "../../../services/api_services";
import AuthLayout from "../../../components/common/authLayout";
import axios from "axios";

export default function ChangePassword() {
  // State to manage password visibility
  const [password, setPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  const navigate = useNavigate();
  const location = useLocation();
  // Submit handler
  // Here you can add your API call to change the password
  const handleSubmit = async (event) => {
    event.preventDefault();

    const phone = location.state || "Unknown Data";

    // You can send the new password to the backend here
    try {
      const response = await axios.post(changePasswordEndpoint, {
        phone: phone,
        new_password: password, // Payload sent to the backend
      });

      if (response.data.status === "success") {
        toast.success(response.data.message);
        navigate("/signin");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong.";
      toast.error(msg);
    }
  };
  return (
    <AuthLayout subtitle="Change your password">
      <>
        <form onSubmit={handleSubmit} className="auth_form">
          <div className="form-group mt-3">
            <label className="mb-1" htmlFor="password">
              New Password
            </label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="********"
              />
              <span className="password_toggle_icon" onClick={togglePassword}>
                <FeatherIcon icon={showPassword ? "eye-off" : "eye"} />
              </span>
            </div>
          </div>
          <div className="form-group mt-3">
            <label className="mb-1" htmlFor="password2">
              Confirm Password
            </label>
            <div className="position-relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control"
                id="password2"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <span
                className="password_toggle_icon"
                onClick={toggleConfirmPassword}
              >
                <FeatherIcon icon={showConfirmPassword ? "eye-off" : "eye"} />
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-success btn-block mt-2 auth_btn"
          >
            Change password
          </button>
          <div className="auth_footer text-center">
            <p>
              Need an Account ?
              <Link className="signup_link" to="/sent-otp">
                Sign Up
              </Link>
            </p>
          </div>
        </form>
      </>
    </AuthLayout>
  );
}
