import React from "react";
import { useNavigate } from "react-router-dom";

const LogoutConfirmation = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login", { replace: true });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
      <div className="bg-white p-6 rounded-lg shadow-xl w-80 pointer-events-auto">
        <h2 className="text-xl font-semibold text-gray-800 text-center">
          Confirm Logout
        </h2>

        <p className="text-gray-600 mt-3 text-center">
          Are you sure you want to logout?
        </p>

        <div className="flex justify-between mt-6">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 transition"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
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
