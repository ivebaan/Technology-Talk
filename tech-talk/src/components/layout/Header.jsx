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
import LogoutConfirmation from "../cards/LogoutConfirmation";
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
      <header className="h-16 flex shadow-md justify-between bg-white border-b border-gray-200 px-4 flex-shrink-0">
        {/* Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
          onClick={() => navigate("/app/home")}
        >
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
            className="w-full pl-9 pr-3 py-1.5 text-sm rounded-full focus:outline-none focus:ring-1 transition-all bg-gray-100 text-gray-900 focus:ring-[#820000] focus:bg-white"
          />
          {searchQuery && (
            <ul className="absolute top-11 left-0 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-40 overflow-auto z-20">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((c, index) => (
                  <li
                    key={index}
                    className="px-3 py-2 text-xs cursor-pointer transition hover:bg-gray-50 text-gray-900 hover:text-[#820000]"
                    onClick={() => {
                      navigate(`/app/community/${c}`);
                      setSearchQuery("");
                    }}
                  >
                    r/{c}
                  </li>
                ))
              ) : (
                <li className="px-3 py-2 text-xs text-center text-gray-500">
                  No results
                </li>
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
              className="text-sm cursor-pointer px-3 py-1.5 rounded transition font-semibold flex items-center gap-1 hover:bg-gray-100 text-[#820000]"
            >
              <SquarePlusIcon className="h-4 w-4" />
              Create
            </button>

            {createOpen && (
              <div className="absolute right-0 mt-1 w-40 rounded-lg shadow-md z-40 bg-white border border-gray-200">
                <Link to="/app/create-post">
                  <div
                    className="px-3 py-2 cursor-pointer text-sm transition hover:bg-gray-100 text-gray-900 border-b border-gray-100"
                    onClick={() => setCreateOpen(false)}
                  >
                    Create Post
                  </div>
                </Link>
                <Link to="/app/create-community">
                  <div
                    className="px-3 py-2 cursor-pointer text-sm transition hover:bg-gray-100 text-gray-900"
                    onClick={() => setCreateOpen(false)}
                  >
                    Create Community
                  </div>
                </Link>
              </div>
            )}
          </div>

          {/* Profile Menu */}
          <div
            ref={profileRef}
            className="relative p-2 rounded-full transition-all duration-300 cursor-pointer hover:bg-red-100"
            onClick={() => setProfileOpen(!profileOpen)}
          >
            <UserCircleIcon className="w-10 h-10 hover:scale-110 transition-transform text-[#820000]" />

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
