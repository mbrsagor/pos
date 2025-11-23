import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";
import { Form, Button, Row, Col, Card } from "react-bootstrap";

import axios from "../../../../services/axiosConfig";
import { userUpdateDeleteEndpoint } from "../../../../services/api_services";

export default function UserProfileForm({ user, onSubmit }) {
  const { id } = useParams();
  const [formData, setFormData] = useState({
    email: "",
    fullname: "",
    phone: "",
    address: "",
    state: "",
    city: "",
    zip_code: "",
    latitude: "",
    longitude: "",
    date_of_birth: "",
    points: 500,
    country: "",
    referral_code: "",
    gender: 1,
    role: 1,
    is_staff: false,
    is_active: true,
    is_online: false,
    is_hoa: false,
  });

  // Fetch user details if not passed as prop
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({ ...prev, ...user }));
    } else if (id) {
      axios
        .get(userUpdateDeleteEndpoint(id))
        .then((res) => {
          const userData = res.data.data;
          setFormData((prev) => ({
            ...prev,
            ...userData,
            zipcode: userData.zip_code || "",
            role: userData.role_name || "",
            gender: userData.gender || "",
          }));
        })
        .catch((err) => {
          console.error(err);
          toast.error("Failed to load user data");
        });
    }
  }, [id, user]);

  // Handle form field changes
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : files ? files[0] : value,
    });
  };

  // handle avatar change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prev) => ({
          ...prev,
          avatar: reader.result, // full base64
        }));
      };
      reader.readAsDataURL(file);
    } else {
      toast("Please select a valid image file.");
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = new FormData();
      for (const key in formData) {
        if (key === "avatar" && !formData.avatar) continue;
        data.append(key, formData[key]);
      }

      await axios.put(userUpdateDeleteEndpoint(id), data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      toast.success("Profile updated successfully!");
      if (onSubmit) onSubmit(formData);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <Card className="shadow-lg p-4">
      <Form onSubmit={handleSubmit}>
        {/* Basic Info */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Address */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                name="zip_code"
                value={formData.zip_code}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="number"
                step="any"
                name="latitude"
                value={formData.latitude}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group>
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="number"
                step="any"
                name="longitude"
                value={formData.longitude}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        {/* Avatar & Role */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Avatar</Form.Label>
              <Form.Control
                type="file"
                name="avatar"
                onChange={handleImageChange}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value={1}>Male</option>
                <option value={2}>Female</option>
                <option value={3}>Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <option value={1}>Home Owner</option>
                <option value={2}>Tenant</option>
                <option value={3}>Admin</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Flags */}
        <Row className="mb-3">
          <Col md={3}>
            <Form.Check
              type="switch"
              id="is_staff"
              label="Staff"
              name="is_staff"
              checked={formData.is_staff}
              onChange={handleChange}
            />
          </Col>
          <Col md={3}>
            <Form.Check
              type="switch"
              id="is_active"
              label="Active"
              name="is_active"
              checked={formData.is_active}
              onChange={handleChange}
            />
          </Col>
          <Col md={3}>
            <Form.Check
              type="switch"
              id="is_online"
              label="Online"
              name="is_online"
              checked={formData.is_online}
              onChange={handleChange}
            />
          </Col>
          <Col md={3}>
            <Form.Check
              type="switch"
              id="is_hoa"
              label="HOA"
              name="is_hoa"
              checked={formData.is_hoa}
              onChange={handleChange}
            />
          </Col>
        </Row>

        {/* Points + Referral */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Points</Form.Label>
              <Form.Control
                type="number"
                name="points"
                value={formData.points}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Referral Code</Form.Label>
              <Form.Control
                type="text"
                name="referral_code"
                value={formData.referral_code}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="d-flex justify-content-end">
          <Button type="submit" variant="primary" className="px-4">
            Save Changes
          </Button>
        </div>
      </Form>
      <ToastContainer />
    </Card>
  );
}
