import React, { useState, useRef, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
      <header className="h-16 flex shadow-sm justify-between bg-white px-4 flex-shrink-0 border-b border-gray-200">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity" onClick={() => navigate("/app/home")}>
          <img
            src={logo}
            className="object-fill h-14 hover:scale-105 transition-transform"
            alt="TechTalk Logo"
          />
          <h1 className="font-bold text-xl text-[#820000]">TechTalk</h1>
        </div>

        {/* Search */}
        <div className="flex items-center relative w-1/3">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#820000]" />
          <input
            type="text"
            placeholder="Search communities..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 text-sm bg-gray-100 rounded-full focus:outline-none focus:ring-1 focus:ring-[#820000] focus:bg-white transition-all"
          />
          {searchQuery && (
            <ul className="absolute top-11 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-40 overflow-auto z-20">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((c, index) => (
                  <li
                    key={index}
                    className="px-3 py-1.5 text-xs cursor-pointer hover:bg-gray-100 hover:text-[#820000] transition border-b border-gray-100 last:border-0"
                    onClick={() => {
                      navigate(`/app/community/${c}`);
                      setSearchQuery("");
                    }}
                  >
                    r/{c}
                  </li>
                ))
              ) : (
                <li className="px-3 py-1.5 text-xs text-gray-500 text-center">No results</li>
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
              className="text-sm cursor-pointer hover:bg-gray-100 px-3 py-1.5 rounded transition font-semibold text-[#820000] flex items-center gap-1"
            >
              <SquarePlusIcon className="h-4 w-4" />
              Create
            </button>

            {createOpen && (
              <div className="absolute right-0 mt-1 w-40 bg-white border border-gray-200 rounded-lg shadow-md z-40">
                <Link to="/app/create-post">
                  <div
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm transition border-b border-gray-100"
                    onClick={() => setCreateOpen(false)}
                  >
                    ✍️ Post
                  </div>
                </Link>
                <Link to="/app/create-community">
                  <div
                    className="px-3 py-2 hover:bg-gray-100 cursor-pointer text-sm transition"
                    onClick={() => setCreateOpen(false)}
                  >
                    🏘️ Community
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
            className="relative p-2 rounded-full hover:bg-red-100 transition-all duration-300 cursor-pointer"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <UserCircleIcon className="w-10 h-10 text-[#820000] hover:scale-110 transition-transform" />

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
