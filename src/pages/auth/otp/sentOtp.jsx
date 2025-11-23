import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

import axios from "axios";

import "../../../styles/auth.scss";
import AuthLayout from "../../../components/common/authLayout";
import { sentOTPEndpoint } from "../../../services/api_services";

export default function SentOtpPage() {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [loading, setLoading] = useState(false);

  // OnChange handler
  const handleEmailChange = (e) => {
    setPhone(e.target.value);
  };

  // Submit handler
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    // You can send the OTP to the entered email address here
    try {
      const response = await axios.post(sentOTPEndpoint, {
        phone: phone, // Payload sent to the backend
      });

      if (response.data.status === "success") {
        navigate("/verify-otp", { state: phone });
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
    <AuthLayout subtitle="Welcome back! To verify your identity, we've sent an OTP to your phone as a company sign up process.">
        <form onSubmit={handleSubmit} className="auth_form">
          <div className="form-group">
            <label className="mb-1" htmlFor="phone">
              Enter your phone number
            </label>
            <input
              type="text"
              className="form-control"
              id="text"
              value={phone}
              onChange={handleEmailChange}
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
    </AuthLayout>
  );
}
