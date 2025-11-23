import React, { useState } from "react";
import axios from "../../../../services/axiosConfig";
import { ToastContainer, toast } from "react-toastify";
import { signUpAPIEndpoint } from "../../../../services/api_services";
import FeatherIcon from "feather-icons-react";

export default function UserCreateForm() {
  const [formData, setFormData] = useState({
    fullname: "",
    phone: "",
    email: "",
    role: "",
    referral_code: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(signUpAPIEndpoint, formData);
      if (res.data.status === "success") {
        toast.success("User created successfully!");
        setFormData({
          fullname: "",
          phone: "",
          email: "",
          role: "",
          referral_code: "",
          password: "",
        });
      } else {
        toast.error(res.data.message || "Failed to create user");
      }
    } catch (err) {
      toast.error("Something went wrong!");
      console.error(err);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleSubmit}>
        <div className="row">
          {/* Left Column */}
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="fullname">Full Name</label>
              <input
                className="form-control"
                type="text"
                name="fullname"
                id="fullname"
                placeholder="Enter full name"
                value={formData.fullname}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="phone">Phone</label>
              <input
                className="form-control"
                type="text"
                name="phone"
                id="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group mb-3">
              <label htmlFor="email">Email</label>
              <input
                className="form-control"
                type="email"
                name="email"
                id="email"
                placeholder="Enter email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Right Column */}
          <div className="col-md-6">
            <div className="form-group mb-3">
              <label htmlFor="role">Role</label>
              <select
                className="form-control"
                name="role"
                id="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option disabled>Select Role</option>
                <option value={1}>Admin</option>
                <option value={2}>Home Owner</option>
                <option value={3}>Company</option>
              </select>
            </div>

            <div className="form-group mb-3">
              <label htmlFor="referral_code">Referral Code</label>
              <input
                className="form-control"
                type="text"
                name="referral_code"
                id="referral_code"
                placeholder="Enter referral code (optional)"
                value={formData.referral_code}
                onChange={handleChange}
              />
            </div>

            {/* Password Field with Eye Toggle */}
            <div className="form-group mb-4 position-relative">
              <label htmlFor="password">Password</label>
              <input
                className="form-control"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Enter password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                className="position-absolute create_user_show_pass"
              >
                <FeatherIcon
                  icon={showPassword ? "eye-off" : "eye"}
                  size="18"
                />
              </span>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-success btn-sm">
          Create User
        </button>
      </form>
      <ToastContainer />
    </div>
  );
}
