import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import FeatherIcon from "feather-icons-react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";

import axios from "../../../../services/axiosConfig";
import { userListEndpoint, userUpdateDeleteEndpoint, sentLinkToChangePassword } from "../../../../services/api_services";

const itemsPerPage = 10;

export default function UserTable() {
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  const [showSendLinkModal, setShowSendLinkModal] = useState(false);
  const [userToSendLink, setUserToSendLink] = useState(null);

  // Fetch users from API with pagination
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(userListEndpoint, {
          params: { page: currentPage, limit: itemsPerPage }, // adjust if your API uses different keys
        });

        // Assuming response looks like: { data: { results: [], total: 100 } }
        const results = response.data?.results || response.data?.data || [];
        const total = response.data?.total || results.length;

        setUsers(results);
        setTotalPages(Math.ceil(total / itemsPerPage));
      } catch (error) {
        toast.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Handle delete button click
  const handleDeleteClick = (user) => {
    setUserToDelete(user);
    setShowDeleteModal(true);
  };

  // Handle delete confirmation
  const handleDeleteConfirm = async () => {
    try {
      await axios.delete(userUpdateDeleteEndpoint(userToDelete.id));
      toast.success("User deleted successfully");
      // Remove deleted user from local state
      setUsers((prevUsers) =>
        prevUsers.filter((user) => user.id !== userToDelete.id)
      );
    } catch (error) {
      toast.error("Delete failed:", error);
    } finally {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
  };

  // Handle send link button click
  const handleSendLinkClick = (user) => {
    setUserToSendLink(user);
    setShowSendLinkModal(true);
  };

  // Handle send link modal close
  const handleSendLinkConfirm = async () => {
    try {
      await axios.post(sentLinkToChangePassword, {
        email: userToSendLink.email,
      });
      toast.success("Password reset link sent successfully");
    } catch (error) {
      toast.error("Failed to send password reset link", error);
    } finally {
      setShowSendLinkModal(false);
      setUserToSendLink(null);
    }
  };

  return (
    <div className="mt-4">
      <div className="table-responsive">
        <table className="table table-bordered table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Role</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="6" className="text-center">
                  Loading...
                </td>
              </tr>
            ) : users.length > 0 ? (
              users.map((row) => (
                <tr key={row.id}>
                  <td>{row.fullname}</td>
                  <td>{row.email}</td>
                  <td>{row.phone}</td>
                  <td>{row.role_name}</td>
                  <td className="text-center">
                    <Link
                      to={`/user/${row.id}`}
                      className="btn btn-sm btn-primary"
                    >
                      <FeatherIcon icon="edit-2" size={13} />
                    </Link>
                    <button
                      onClick={() => handleSendLinkClick(row)}
                      className="btn btn-sm btn-primary ms-2"
                    >
                      <FeatherIcon icon="send" size={13} />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(row)}
                      className="btn btn-sm btn-danger ms-2"
                    >
                      <FeatherIcon icon="trash-2" size={13} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="text-center">
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ToastContainer />

      {/* Pagination */}
      <nav>
        <ul className="pagination justify-content-center">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage - 1)}
            >
              Prev
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <li
              key={page}
              className={`page-item ${page === currentPage ? "active" : ""}`}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => handlePageChange(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete user{" "}
          <strong>{userToDelete?.name}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDeleteConfirm}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Model open for when user clicks on send link button */}
      <Modal
        show={showSendLinkModal}
        onHide={() => setShowSendLinkModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Send Password Reset Link</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to send a password reset link to{" "}
          <strong>{userToSendLink?.email}</strong>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowSendLinkModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSendLinkConfirm}>
            Send Link
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
