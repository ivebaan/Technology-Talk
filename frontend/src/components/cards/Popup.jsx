import React from "react";

const Popup = ({ message, type = "info", onClose, actionLabel = "OK" }) => {
  // Determine icon based on type
  const getIcon = () => {
    switch (type) {
      case "error":
        return "✕";
      case "warning":
        return "!";
      default:
        return "ℹ";
    }
  };

  const getStyles = () => {
    switch (type) {
      case "error":
        return "text-red-600";
      case "warning":
        return "text-yellow-600";
      default:
        return "text-[#820000]";
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none bg-black/20">
      <div className="bg-white p-5 rounded-lg shadow-lg w-72 pointer-events-auto border border-gray-200">
        <div className="flex flex-col items-center gap-3">
          {type !== "success" && (
            <span className={`text-2xl font-bold ${getStyles()}`}>
              {getIcon()}
            </span>
          )}
          <p className="text-sm text-gray-700 text-center">
            {message}
          </p>
        </div>

        <div className="flex justify-center mt-4">
          <button
            className="px-4 py-1.5 text-xs font-semibold bg-[#820000] text-white rounded hover:bg-red-700 transition"
            onClick={onClose}
          >
            {actionLabel}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Popup;
