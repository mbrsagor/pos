import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { ToastContainer, toast } from "react-toastify";

import "../../../styles/auth.scss";
import AuthLayout from "../../../components/common/authLayout";

import axios from "axios";
import { signInAPIEndpoint } from "../../../services/api_services";

export default function SignInPage() {
  // State to manage password visibility
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // Sent to forgot password route
  const forgotPasswordHandler = () => {
    navigate("/sent-otp", { purpose: "forgot_password" });
  };

  // Handler submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(signInAPIEndpoint, {
        username: email,
        password: password,
        device_token: "",
      });
      if (response.data.status === "success") {
        // Save token and user details to localStorage
        const { token, ...userData } = response.data;
        localStorage.setItem("token", token); // Save token
        localStorage.setItem("user", JSON.stringify(userData)); // Save user details
        // Check user role and redirect to appropriate home page
        if (
          response.data.role === 1 ||
          response.data.role === 2 ||
          response.data.role === 3
        ) {
          navigate("/dashboard");
        } else {
          toast("Customer & delivery man cannot access the admin panel.");
        }
      } else {
        toast("Invalid credentials. Please try again.");
      }
    } catch (err) {
      toast(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout subtitle="Welcome back! Sign In to your account.">
      <>
        <form onSubmit={handleSubmit} className="auth_form">
          <div className="form-group">
            <label className="mb-1" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>
          <div className="form-group mt-3">
            <label className="mb-1" htmlFor="password">
              Password
            </label>
            <div className="position-relative">
              <input
                type={showPassword ? "text" : "password"}
                className="form-control"
                id="password"
                placeholder="********"
                onChange={(event) => setPassword(event.target.value)}
              />
              <span className="password_toggle_icon" onClick={togglePassword}>
                <FeatherIcon icon={showPassword ? "eye-off" : "eye"} />
              </span>
            </div>
          </div>

          <div className="form-group mt-2 d-flex justify-content-between align-items-center">
            <div className="form-check mt-2">
              <input
                type="checkbox"
                className="form-check-input"
                id="rememberMe"
              />
              <label className="form-check-label" htmlFor="rememberMe">
                Remember me
              </label>
            </div>

            <Link className="forgot_password_link" to="/reset-password-otp">
              Forgot your password
            </Link>
          </div>

          <button
            type="submit"
            className="btn btn-success btn-block mt-2 auth_btn"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
          <div className="auth_footer text-center">
            <ToastContainer />
            <p>
              <Link
                className="signup_link"
                onClick={forgotPasswordHandler}
                to="/sent-otp"
              >
                Sign up to be a company partner
              </Link>
            </p>
          </div>
        </form>
      </>
    </AuthLayout>
  );
}
