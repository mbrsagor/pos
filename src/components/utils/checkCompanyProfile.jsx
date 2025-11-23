import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "../../services/axiosConfig";
import { restaurantProfileStatusCheckEndpoint } from "../../services/api_services";

export default function CompanyProfileCheck() {
  const [showPopup, setShowPopup] = useState(false);
  const [missingFields, setMissingFields] = useState([]);
  const [reason, setReason] = useState("");
  const [loading, setLoading] = useState(true);
  const [modalTitle, setModalTitle] = useState("Complete Your restaurant Profile");
  const [isLocked, setIsLocked] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Skip check on profile pages
    if (
      location.pathname === "/create-restaurant" ||
      location.pathname === "/update-restaurant"
    ) {
      setShowPopup(false);
      setLoading(false);
      return;
    }

    // Check profile api
    const checkRestaurantProfile = async () => {
      try {
        const response = await axios.get(restaurantProfileStatusCheckEndpoint);
        const profile = response.data?.data;

        if (profile) {
          // Step 2: Company is locked (not verified by admin)
          if (profile.status === "locked" && profile.is_approved === false) {
            setIsLocked(true);
            setShowPopup(true);
            setModalTitle("Warning");
            setReason(profile.message);
            setMissingFields([]);
            return;
          }

          // Step 1: Company exists but incomplete
          if (!profile.is_complete) {
            setMissingFields(profile.missing_fields || []);
            setReason("");
            setModalTitle("Complete your restaurant profile");
            setShowPopup(true);
            setIsLocked(false);
          } else {
            // Everything OK — hide popup
            setShowPopup(false);
            setIsLocked(false);
          }
        }
      } catch (error) {
        if (error.response) {
          if (error.response.status === 404) {
            // Company not created
            setReason(
              error.response.data?.reason || "Restaurant profile not found."
            );
            setMissingFields([]);
            setModalTitle("Create Your restaurant Profile");
            setShowPopup(true);
            setIsLocked(false);
          } else if (error.response.status === 403) {
            // Not a company role
            setReason(
              error.response.data?.message || "User is not a restaurant owner"
            );
            setMissingFields([]);
            setModalTitle("Create Your restaurant Profile");
            setShowPopup(true);
            setIsLocked(false);
          } else {
            toast.error(
              error.response.data?.message || "Unexpected error occurred"
            );
          }
        } else {
          toast.error("Network error checking restaurant profile");
        }
      } finally {
        setLoading(false);
      }
    };

    checkRestaurantProfile();
  }, [location]);

  // Logout
  const handleLogout = () => {
    localStorage.clear();
    navigate("/signin");
  };

  if (loading) return null;

  return (
    <>
      {showPopup && (
        <>
          {/* Backdrop (always shown when popup is active) */}
          <div className="modal-backdrop fade show super-blur"></div>

          {/* Modal */}
          <div
            className="modal fade show company_popup_modal"
            tabIndex="-1"
            role="dialog"
          >
            <div
              className="modal-dialog modal-dialog-centered company_popup_modal_dialog"
              role="document"
            >
              <div className="modal-content shadow-lg rounded">
                {/* Header */}
                <div className="modal-header">
                  <h5 className="modal-title">{modalTitle}</h5>
                </div>

                {/* Body */}
                <div className="modal-body text-center">
                  {isLocked ? (
                    <>
                      <p>
                        {reason ||
                          "Your company profile is pending admin approval. Please wait until it is verified."}
                      </p>
                    </>
                  ) : reason ? (
                    <p>{reason}</p>
                  ) : (
                    <>
                      <p>
                        Your restaurant profile is incomplete. Please update the
                        missing fields:
                      </p>
                      <ul className="text-start">
                        {missingFields.map((field) => (
                          <li key={field}>{field}</li>
                        ))}
                      </ul>
                    </>
                  )}
                </div>

                {/* Footer */}
                <div className="modal-footer justify-content-center">
                  {isLocked ? (
                    <>
                      <button
                        type="button"
                        className="btn btn-success btn-sm"
                        onClick={handleLogout}
                      >
                        Logout
                      </button>
                      <a href="/dashboard" className="btn btn-success btn-sm">
                        Refresh
                      </a>
                    </>
                  ) : reason ? (
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={() => navigate("/create-restaurant")}
                    >
                      Create Profile
                    </button>
                  ) : (
                    <button
                      type="button"
                      className="btn btn-success btn-sm"
                      onClick={() => navigate("/update-restaurant")}
                    >
                      Go to Profile
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      <ToastContainer />
    </>
  );
}
