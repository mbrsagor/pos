import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import "../../../styles/auth.scss";
import AuthLayout from "../../../components/common/authLayout";
import { signUpAPIEndpoint } from "../../../services/api_services";

export default function SignUpPage() {
  const location = useLocation();
  const navigate = useNavigate();

  // Form State
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [loading, setLoading] = useState(false);

  const phone = location.state || "unknown phone";

  const togglePassword = () => setShowPassword(!showPassword);
  const toggleConfirmPassword = () =>
    setShowConfirmPassword(!showConfirmPassword);

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    if (!agreedToTerms) {
      toast.warning("Please agree to the terms and conditions.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(signUpAPIEndpoint, {
        fullname,
        email,
        phone,
        role: 2,
        password,
      });

      if (response.status === 201 || response.data.status === "success") {
        toast.success("Account created successfully!");
        setTimeout(() => navigate("/signin"), 1200);
      } else {
        toast.error("Invalid Sign Up. Please try again later.");
      }
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout subtitle="Finish Setting Up Your Profile!">
      <form onSubmit={handleSubmit} className="auth_form">
        {/* Full Name */}
        <div className="form-group">
          <label>Fullname</label>
          <input
            type="text"
            placeholder="Enter your fullname"
            className="form-control"
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            required
          />
        </div>

        {/* Phone */}
        <div className="form-group mt-3">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email address"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        {/* Password */}
        <div className="form-group mt-3">
          <label>Password</label>
          <div className="position-relative">
            <input
              type={showPassword ? "text" : "password"}
              className="form-control"
              placeholder="*************"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span onClick={togglePassword} className="password_toggle_icon">
              <FeatherIcon icon={showPassword ? "eye-off" : "eye"} />
            </span>
          </div>
        </div>

        {/* Confirm Password */}
        <div className="form-group mt-3">
          <label>Confirm Password</label>
          <div className="position-relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              className="form-control"
              placeholder="*************"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <span
              onClick={toggleConfirmPassword}
              className="password_toggle_icon"
            >
              <FeatherIcon icon={showConfirmPassword ? "eye-off" : "eye"} />
            </span>
          </div>
          {password && confirmPassword && password !== confirmPassword && (
            <p className="text-danger mt-2">Passwords do not match</p>
          )}
        </div>

        {/* Terms Checkbox */}
        <div className="form-check mt-3">
          <input
            type="checkbox"
            className="form-check-input"
            id="agreeTerms"
            checked={agreedToTerms}
            onChange={(e) => setAgreedToTerms(e.target.checked)}
          />
          <label className="form-check-label" htmlFor="agreeTerms">
            I agree to the{" "}
            <Link className="forgot_password_link" to="#">
              Terms and Conditions
            </Link>
          </label>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="btn btn-success btn-block mt-3 auth_btn"
          disabled={!agreedToTerms || loading || password !== confirmPassword}
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>

        {/* Footer */}
        <div className="auth_footer text-center mt-3">
          <ToastContainer />
          <p>
            Already have an account?{" "}
            <Link className="signup_link" to="/signin">
              Sign In
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
}
