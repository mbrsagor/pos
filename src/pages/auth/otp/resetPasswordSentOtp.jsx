import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";

import "../../../styles/auth.scss";
import AuthLayout from "../../../components/common/authLayout";
import { passwordResetOTPEndpoint } from "../../../services/api_services";

export default function ResetPasswordSentOtpPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // OnChange handler
  const handlePhoneChange = (e) => {
    setPhone(e.target.value);
  };

  // Submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // You can send the OTP to the entered phone address here
    try {
      const response = await axios.post(passwordResetOTPEndpoint, {
        phone: phone, // Payload sent to the backend
      });

      if (response.data.status === "success") {
        navigate("/reset-password-verify-otp", { state: phone });
      } else {
        toast(response.data.message);
      }
    } catch (error) {
      const msg = error.response?.data?.message || "Something went wrong.";
      toast(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout subtitle=" Welcome back! To verify your identity, we've sent a one-time password (OTP) to confirm your password reset request.">
      <>
        <form onSubmit={handleSubmit} className="auth_form">
          <div className="form-group">
            <label className="mb-1" htmlFor="phone">
              Enter your phone number
            </label>
            <input
              type="text"
              className="form-control"
              id="phone"
              value={phone}
              onChange={handlePhoneChange}
              placeholder="Enter valid phone number"
              title="Please enter a valid phone number"
              required
            />
          </div>

          <button
            type="submit"
            className="btn btn-success btn-block mt-2 auth_btn"
            disabled={loading}
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
          <div className="auth_footer text-center">
            <ToastContainer />
            <p>
              Already have account ?
              <Link className="signup_link" to="/signin">
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </>
    </AuthLayout>
  );
}
