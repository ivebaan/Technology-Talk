import React from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  CursorArrowRippleIcon,
  ArrowTrendingUpIcon,
  BookmarkIcon,
  AcademicCapIcon,
  ChatBubbleLeftRightIcon,
  UserGroupIcon,
  CalendarDaysIcon,
  NewspaperIcon,
  ShieldCheckIcon
} from "@heroicons/react/24/solid";
import { SettingsIcon } from "lucide-react";

function Sidebar() {
  return (
    <aside className="w-60 bg-white p-4 shadow-md overflow-y-auto">
      <ul className="space-y-1 w-full">
        <NavLinkItem to="/app/home" icon={<HomeIcon className="h-4 w-4" />} label="Home" />
        <NavLinkItem to="/app/communities" icon={<CursorArrowRippleIcon className="h-4 w-4" />} label="Explore Communities" />
        <NavLinkItem to="/app/trending" icon={<ArrowTrendingUpIcon className="h-4 w-4" />} label="Trending" />
        <NavLinkItem to="/app/favorites" icon={<BookmarkIcon className="h-4 w-4" />} label="Favorites" />
      </ul>

      <hr className="border-t border-gray-300 w-full my-4" />
      <h2 className="text-gray-400 font-medium">COMMUNITIES</h2>
      <ul className="space-y-1 w-full mt-4">
        <NavLinkItem to="/app/citacad" icon={<CircleIcon bgColor="bg-yellow-400" text="☀" />} label="t/CITAcademics" />
        <NavLinkItem to="/app/citech" icon={<CircleIcon bgColor="bg-gray-400" text="🖥️" />} label="t/BSIT" />
        <NavLinkItem to="/app/citlove" icon={<CircleIcon bgColor="bg-red-800" text="❤︎" />} label="t/CITHeartzz" />
        <NavLinkItem to="/app/citmentalhealth" icon={<CircleIcon bgColor="bg-green-800" text="💭" />} label="t/CITMentalHealth" />
      </ul>

      <hr className="border-t border-gray-300 w-full my-4" />
      <ul className="space-y-1 w-full">
        <NavLinkItem to="/app/user-agreement"icon={<NewspaperIcon className="h-4 w-4" />} label="User Agreement" />
        <NavLinkItem to="/app/privacy-policy" icon={<ShieldCheckIcon className="h-4 w-4" />} label="Privacy & Policy" />
        <NavLinkItem to="/app/settings" icon={<SettingsIcon className="h-4 w-4" />} label="Settings" />
      </ul>
    </aside>
  );
}

const SidebarItem = ({ icon, label }) => (
  <li className="flex items-center gap-2 p-3 hover:bg-gray-200 rounded-lg cursor-pointer">
    {icon}
    <span className="text-[#820000] font-medium">{label}</span>
  </li>
);

const NavLinkItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
        isActive ? "bg-[#820000] text-white" : "hover:bg-gray-200 text-[#820000]"
      }`
    }
  >
    {icon}
    <span className="font-medium">{label}</span>
  </NavLink>
);

const CircleIcon = ({ bgColor, text }) => (
  <div className={`${bgColor} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm`}>
    {text}
  </div>
);

export default Sidebar;
