import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const LogoutConfirmation = ({ onClose }) => {
  const navigate = useNavigate();
  const { setCurrentUser } = useContext(UserContext);

  const handleLogout = () => {
    // Clear localStorage
    localStorage.removeItem("currentUser");

    // Clear UserContext
    setCurrentUser(null);

    // Redirect to login
    navigate("/login", { replace: true });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white p-8 rounded-lg shadow-xl w-80 pointer-events-auto border border-gray-200">
        <h2 className="text-xl font-semibold text-gray-900 text-center">
          Confirm Logout
        </h2>

        <p className="text-gray-600 mt-4 text-center">
          Are you sure you want to logout?
        </p>

        <div className="flex justify-between gap-3 mt-6">
          <button
            className="flex-1 px-4 py-2 bg-gray-300 text-gray-900 font-semibold rounded-lg hover:bg-gray-400 transition"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="flex-1 px-4 py-2 bg-[#820000] text-white font-semibold rounded-lg hover:bg-[#650000] transition shadow-md hover:shadow-lg"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutConfirmation;
