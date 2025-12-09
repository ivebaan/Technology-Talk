import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/nice.png";
import {
  MagnifyingGlassIcon,
  BellIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { SquarePlusIcon } from "lucide-react";
import axios from "axios";
import LogoutConfirmation from "../../pages/LogoutConfirmation";
import ProfileMenu from "./ProfileMenu";
import { UserContext } from "../../context/UserContext";
import { getAllCommunities } from "../../api/api";

export default function Header() {
  const [profileOpen, setProfileOpen] = useState(false);
  const [createOpen, setCreateOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const profileRef = useRef(null);
  const createRef = useRef(null);
  const [data, setData] = useState([]);
  const [showLogout, setShowLogout] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    axios;
    getAllCommunities()
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const categories = data.map((u) => u.name);

  // Filtered categories based on search query
  const filteredCategories = categories.filter((c) =>
    c.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close profile dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setProfileOpen(false);
      }
      if (createRef.current && !createRef.current.contains(event.target)) {
        setCreateOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <header className="h-20 flex shadow-sm justify-between bg-white px-4 flex-shrink-0">
        {/* Logo */}
        <div className="flex items-center p-1">
          <img
            src={logo}
            className="object-fill cursor-pointer h-16"
            alt="TechTalk Logo"
          />
          <h1 className="font-bold text-xl text-[#820000] ml-2">TechTalk</h1>
        </div>

        {/* Search */}
        <div className="flex items-center relative w-1/3">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 p-2 bg-gray-200 rounded-full focus:outline-[#820000]"
          />
          {searchQuery && (
            <ul className="absolute top-12 left-0 w-full bg-white border rounded-md shadow-lg max-h-48 overflow-auto z-20">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((c, index) => (
                  <li
                    key={index}
                    className="p-2 cursor-pointer hover:bg-gray-100"
                    onClick={() => setSearchQuery(c)}
                  >
                    {c}
                  </li>
                ))
              ) : (
                <li className="p-2 text-gray-500">No categories found</li>
              )}
            </ul>
          )}
        </div>

        {/* Right buttons */}
        <div className="flex items-center space-x-2 p-2">
          {/* Create dropdown */}
          <div ref={createRef} className="relative">
            <button
              onClick={() => setCreateOpen((s) => !s)}
              className="text-md cursor-pointer hover:bg-gray-200 p-3 rounded-full transition-all duration-300 font-semibold text-[#820000] flex items-center gap-2"
            >
              <SquarePlusIcon className="h-4 w-4 text-[#820000]" />
              Create
            </button>

            {createOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg z-40">
                <Link to="/app/create-post">
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => setCreateOpen(false)}
                  >
                    Create Post
                  </div>
                </Link>
                <Link to="/app/create-community">
                  <div
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => setCreateOpen(false)}
                  >
                    Create Community
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Notifications
          <Link to="/app/notifications">
            <div className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300 cursor-pointer">
              <BellIcon className="w-7 h-7 text-[#820000]" />
            </div>
          </Link> */}

          {/* Profile Menu */}
          <div
            ref={profileRef}
            className="relative p-2 rounded-full hover:bg-gray-200 transition-all duration-300 cursor-pointer"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <UserCircleIcon className="w-10 h-10 text-[#820000]" />

            {profileOpen && (
              <ProfileMenu
                open={profileOpen}
                setOpen={setProfileOpen}
                profileRef={profileRef}
                user={currentUser}
                onSignOut={() => setShowLogout(true)}
              />
            )}
          </div>
        </div>
      </header>

      {/* Render the logout confirmation popup */}
      {showLogout && (
        <LogoutConfirmation onClose={() => setShowLogout(false)} />
      )}
    </>
  );
}
