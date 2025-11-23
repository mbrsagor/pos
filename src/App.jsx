import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/style.scss";

// All pages
import ProtectedRoute from "./services/ProtectedRoute";
// Public pages
import NotFound from "./components/error/notFound";
import SignInPage from "./pages/auth/signIn/signIn";
import SignUpPage from "./pages/auth/signUp/signUp";
import SentOtpPage from "./pages/auth/otp/sentOtp";
import ResetPasswordSentOtpPage from "./pages/auth/otp/resetPasswordSentOtp";
import ResetPasswordVerifyOTPPage from "./pages/auth/otp/resetPasswordVerifyOtp";
import VerifyOtpPage from "./pages/auth/otp/verifyOtp";
import ChangePassword from "./pages/auth/changePassword/changePassword";
// Private pages
import Dashboard from "./pages/dashboard/dashboard";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* public route */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/sent-otp" element={<SentOtpPage />} />
        <Route
          path="/reset-password-otp"
          element={<ResetPasswordSentOtpPage />}
        />
        <Route
          path="/reset-password-verify-otp"
          element={<ResetPasswordVerifyOTPPage />}
        />
        <Route path="/change-password" element={<ChangePassword />} />
        <Route path="/verify-otp" element={<VerifyOtpPage />} />
        {/* Redirect root to dashboard */}
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        {/* Private routes */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        {/* fallback */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
