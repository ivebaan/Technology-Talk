import React from "react";
import { Outlet, NavLink } from "react-router-dom";
import logo from "../assets/images/tech.png";
import {
  UsersIcon,
  ShieldCheckIcon,
  HomeIcon,
  CalendarDaysIcon,
  AcademicCapIcon,
  BellIcon,
  UserCircleIcon,
  MagnifyingGlassIcon,
  CursorArrowRippleIcon,
  ArrowTrendingUpIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  NewspaperIcon,
  BookmarkIcon,
} from "@heroicons/react/24/solid";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Communities from "../pages/Communities";


function Layout() {
  return (
    <div className="h-screen w-full bg-gray-100 relative flex flex-col">
      {/* Header */}
      <div className="h-20 flex shadow-sm justify-between bg-white px-4">
        <div className="flex items-center p-1">
          <img
            src={logo}
            className="object-fill cursor-pointer h-16"
            alt="TechTalk Logo"
          />
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
          <button className="text-lg cursor-pointer hover:bg-gray-200 p-3 rounded-full transition-all duration-300 font-semibold text-[#820000]">
            + Create
          </button>
          <div className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300 cursor-pointer">
            <BellIcon className="w-7 h-7 text-[#820000]" />
          </div>
          <div className="p-2 rounded-full hover:bg-gray-200 transition-all duration-300 cursor-pointer">
            <UserCircleIcon className="w-10 h-10 text-[#820000]" />
          </div>
        </div>
      </div>

      {/* Sidebar + Main */}
      <div className="flex flex-1">
        <aside className="w-60 bg-white p-4 shadow-md">
          <ul className="space-y-1 w-full">
            <li>
              <NavLink
                to="/app/home"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-[#820000] text-white"
                      : "hover:bg-gray-200 text-[#820000]"
                  }`
                }
              >
                <HomeIcon className="h-4 w-4" />
                <span className="font-medium">Home</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/app/communities"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-[#820000] text-white"
                      : "hover:bg-gray-200 text-[#820000]"
                  }`
                }
              >
                <CursorArrowRippleIcon className="h-4 w-4" />
                <span className="font-medium">Explore Communities</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/trending"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-[#820000] text-white"
                      : "hover:bg-gray-200 text-[#820000]"
                  }`
                }
              >
                <ArrowTrendingUpIcon className="h-4 w-4" />
                <span className="font-medium">Trending</span>
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/favorites"
                className={({ isActive }) =>
                  `flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
                    isActive
                      ? "bg-[#820000] text-white"
                      : "hover:bg-gray-200 text-[#820000]"
                  }`
                }
              >
                <BookmarkIcon className="h-4 w-4" />
                <span className="font-medium">Favorites</span>
              </NavLink>
            </li>
          </ul>

          <hr className="border-t border-gray-300 w-full my-4" />

          <h2 className="text-gray-400 font-medium">CATEGORIES</h2>

          <ul className="space-y-1 w-full mt-4">
            <li className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded-lg cursor-pointer">
              <AcademicCapIcon className="h-4 w-4 text-[#820000]" />
              <span className="text-[#820000] font-medium">Academics</span>
            </li>

            <li className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded-lg cursor-pointer">
              <ChatBubbleLeftRightIcon className="h-4 w-4 text-[#820000]" />
              <span className="text-[#820000] font-medium">Q & A</span>
            </li>

            <li className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded-lg cursor-pointer">
              <UserGroupIcon className="h-4 w-4 text-[#820000]" />
              <span className="text-[#820000] font-medium">Campus Life</span>
            </li>

            <li className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded-lg cursor-pointer">
              <CalendarDaysIcon className="h-4 w-4 text-[#820000]" />
              <span className="text-[#820000] font-medium">Events</span>
            </li>
          </ul>

          <hr className="border-t border-gray-300 w-full my-4" />

          <ul className="space-y-1 w-full">
            <li className="flex items-center gap-2 p-3 mt-4 hover:bg-gray-200 rounded-lg cursor-pointer">
              <NewspaperIcon className="h-4 w-4 text-[#820000]" />
              <span className="text-[#820000] font-medium">User Agreement</span>
            </li>
            <li className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded-lg cursor-pointer">
              <ShieldCheckIcon className="h-4 w-4 text-[#820000]" />
              <span className="text-[#820000] font-medium">
                Privacy & Policy
              </span>
            </li>
            <li className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded-lg cursor-pointer">
              <UsersIcon className="h-4 w-4 text-[#820000]" />
              <span className="text-[#820000] font-medium">Accessibility</span>
            </li>
          </ul>
        </aside>

        {/* 🔄 Main Content */}
        <main className="p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default Layout;
