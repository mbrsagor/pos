import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import "../../../styles/auth.scss";
import AuthLayout from "../../../components/common/authLayout";
import { verifyOTPEndpoint, reSentOTPEndpoint } from "../../../services/api_services";

export default function ResetPasswordVerifyOTP() {
  const location = useLocation();
  // eslint-disable-next-line no-unused-vars
  const [phone, setPhone] = useState(location.state || "Unknown Phone");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const [timeLeft, setTimeLeft] = useState(30); // 90 seconds countdown
  const [canResend, setCanResend] = useState(false);
  // Inside the component:
  const otpRefs = useRef([]);
  const navigate = useNavigate();

  // Countdown logic
  useEffect(() => {
    if (timeLeft <= 0) {
      setCanResend(true);
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format seconds into mm:ss
  const formatTime = (seconds) => {
    const m = String(Math.floor(seconds / 60)).padStart(2, "0");
    const s = String(seconds % 60).padStart(2, "0");
    return `${m}:${s}`;
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    // Concatenate OTP into a single string
    const otpString = otp.join("");
    // Verify OTP API integration start from here...
    try {
      const response = await axios.post(verifyOTPEndpoint, {
        phone, // Payload sent to the backend
        otp: otpString, // Send concatenated OTP string
      });
      if (response.data.status === "success") {
        navigate("/change-password", { state: phone });
      } else {
        toast(response.data.message);
      }
    } catch (err) {
      toast(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  }

  // OnChange handler for OTP inputs
  // This function updates the OTP state and handles auto-focus for the next input
  // It ensures that only one digit is allowed in each input field
  // It also handles backspace to move focus to the previous input if the current one is empty
  const handleChange = (index, value) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value.slice(-1); // Only 1 digit allowed
    setOtp(updatedOtp);

      // Auto-move to next input
      if (value && index < otp.length - 1) {
        otpRefs.current[index + 1].focus();
      }
  };
    
    // Focus on the first input when the component mounts
    const handleKeyDown = (index, e) => {
      if (e.key === "Backspace" && !otp[index] && index > 0) {
        otpRefs.current[index - 1].focus();
      }
    };

  const handleResendOtp = () => {
    setTimeLeft(30);
    setCanResend(false);
    // Resent OTP API integration here
    try {
      axios.post(reSentOTPEndpoint, {
        phone: phone, // Payload sent to the backend
      });
    } catch (error) {
      toast(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <AuthLayout subtitle={`Enter OTP code sent to ${phone}`}>
      <>
        <form onSubmit={handleSubmit} className="auth_form">
          <div className="otp_section d-flex justify-content-between">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => (otpRefs.current[index] = el)}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                type="number"
                className="form-control text-center mx-1"
                style={{ width: "50px" }}
                maxLength={1}
              />
            ))}
          </div>

          <div className="mt-4 text-center">
            <p className="mb-1">Expires in {formatTime(timeLeft)}</p>
            {canResend ? (
              <h6
                className="mb-0 mt-1 resent_otp_text cursor-pointer"
                onClick={handleResendOtp}
              >
                Resend OTP
              </h6>
            ) : (
              <h6 className="mb-0 mt-1">Resend OTP (disabled)</h6>
            )}
          </div>

          <button
            type="submit"
            className="btn btn-success btn-block mt-3 auth_btn"
          >
            {loading ? "Verify & processing..." : "Verify OTP"}
          </button>

          <div className="auth_footer">
            <ToastContainer />
            <p>
              Already have an account?
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
