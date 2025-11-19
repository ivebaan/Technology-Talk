import React from "react";
import { NavLink } from "react-router-dom";
import { UserIcon } from "@heroicons/react/24/solid";
import { SettingsIcon } from "lucide-react";

function ProfileMenu({ open, setOpen, profileRef }) {
  if (!open) return null;

  return (
    <div
      className="absolute right-6 top-20 w-48 bg-white shadow-lg rounded-md z-50"
      ref={profileRef}
    >
      <NavLink
        to="/app/profile"
        className="px-4 py-2 hover:bg-gray-100 flex items-center"
        onClick={() => setOpen(false)}
      >
        <UserIcon className="w-5 h-5 text-[#820000] mr-2" /> View Profile
      </NavLink>

      <NavLink
        to="/app/settings"
        className="px-4 py-2 hover:bg-gray-100 flex items-center"
        onClick={() => setOpen(false)}
      >
        <SettingsIcon className="w-5 h-5 text-[#820000] mr-2" /> Settings
      </NavLink>

      <button
        className="w-full text-left px-4 py-2 hover:bg-gray-100"
        onClick={() => {
          setOpen(false);
          alert("Logging out");
        }}
      >
        Logout
      </button>
    </div>
  );
}

export default ProfileMenu;
