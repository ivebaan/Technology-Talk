import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/images/nice.png";
import { MagnifyingGlassIcon, BellIcon, UserCircleIcon } from "@heroicons/react/24/solid";
import { SquarePlusIcon } from "lucide-react";

function Header({ setProfileOpen, profileOpen, profileRef }) {
  return (
    <header className="h-20 flex shadow-sm justify-between bg-white px-4 flex-shrink-0">
      <div className="flex items-center p-1">
        <img src={logo} className="object-fill cursor-pointer h-16" alt="TechTalk Logo" />
        <h1 className="font-bold text-xl text-[#820000] ml-2">TechTalk</h1>
      </div>

      <div className="flex items-center">
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
          <input
            type="text"
            placeholder="Search categories..."
            className="w-100 pl-10 p-2 bg-gray-200 rounded-full focus:outline-[#820000]"
          />
        </div>
      </div>

      <div className="flex items-center space-x-2 p-2">
        <Link to="/app/create-post">
          <button className="text-md cursor-pointer hover:bg-gray-200 p-3 rounded-full transition-all duration-300 font-semibold text-[#820000] flex items-center gap-2">
            <SquarePlusIcon className="h-4 w-4 text-[#820000]" />
            Create
          </button>
        </Link>

        <div className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300 cursor-pointer">
            <Link to="/app/notifications">
            <button className="text-md cursor-pointer hover:bg-gray-200 p-3 rounded-full transition-all duration-300 font-semibold text-[#820000] flex items-center gap-2">
          <BellIcon className="w-7 h-7 text-[#820000]" />
          </button>
          </Link>
        </div>
        

        <div
          ref={profileRef}
          className="relative p-2 rounded-full hover:bg-gray-200 transition-all duration-300 cursor-pointer"
          onClick={() => setProfileOpen(!profileOpen)}
        >
          <UserCircleIcon className="w-10 h-10 text-[#820000]" />
        </div>
      </div>
    </header>
  );
}

export default Header;
