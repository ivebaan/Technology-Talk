import React from "react";
import { NavLink } from "react-router-dom";
import { User, HelpCircle, BookOpen, LogOut } from "lucide-react";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";

function ProfileMenu({ open, setOpen, profileRef, user, onSignOut }) {
  const { currentUser } = useContext(UserContext);

  if (!open) return null;

  const name = (user && user.name) || "Michael Cambal";
  const email = (user && user.email) || "cambal@cit.edu";

  return (
    <div
      className="absolute right-0 mt-2 w-64 bg-white shadow-md rounded-lg z-50 border"
      ref={profileRef}
      role="menu"
      aria-label="Profile menu"
    >
      <div className="px-4 py-3">
        <div className="text-sm font-semibold text-gray-900">
          {currentUser?.displayName}
        </div>
        <div className="text-xs text-gray-500 mt-1">{currentUser?.email}</div>
      </div>

      <div className="border-t" />

      <NavLink
        to="/app/profile"
        className="flex items-center px-4 py-3 hover:bg-gray-50 text-gray-800"
        onClick={() => setOpen(false)}
      >
        <User className="w-5 h-5 text-gray-600 mr-3" />
        <span className="text-sm">Profile Settings</span>
      </NavLink>

      <NavLink
        to="/app/help"
        className="flex items-center px-4 py-3 hover:bg-gray-50 text-gray-800"
        onClick={() => setOpen(false)}
      >
        <HelpCircle className="w-5 h-5 text-gray-600 mr-3" />
        <span className="text-sm">Help & Support</span>
      </NavLink>

      <NavLink
        to="/app/faq"
        className="flex items-center px-4 py-3 hover:bg-gray-50 text-gray-800"
        onClick={() => setOpen(false)}
      >
        <BookOpen className="w-5 h-5 text-gray-600 mr-3" />
        <span className="text-sm">FAQ</span>
      </NavLink>

      <div className="border-t my-1" />

      <button
        className="w-full text-left px-4 py-3 hover:bg-gray-50 flex items-center text-gray-800"
        onClick={() => {
          setOpen(false);
          if (typeof onSignOut === "function") {
            onSignOut();
            return;
          }
          if (typeof window !== "undefined") window.location.href = "/logout";
        }}
      >
        <LogOut className="w-5 h-5 text-gray-600 mr-3" />
        <span className="text-sm">Sign Out</span>
      </button>
    </div>
  );
}

export default ProfileMenu;
