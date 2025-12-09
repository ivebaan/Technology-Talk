import React, { useEffect, useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import {
  HomeIcon,
  CursorArrowRippleIcon,
  ArrowTrendingUpIcon,
  BookmarkIcon,
  NewspaperIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/solid";
import { SettingsIcon } from "lucide-react";
import { getJoinedCommunities } from "../../api/api";
import { UserContext } from "../../context/UserContext";

export default function Sidebar() {
  const [joinedCommunities, setJoinedCommunities] = useState([]);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    if (!currentUser?.id) return;
    const fetchJoinedCommunities = async () => {
      try {
        const res = await getJoinedCommunities(currentUser.id);
        setJoinedCommunities(res.data);
      } catch (err) {
        setJoinedCommunities([]);
      }
    };
    fetchJoinedCommunities();
  }, [currentUser]);

  return (
    <aside className="w-56 bg-white p-3 border-r border-gray-200 overflow-y-auto">
      {/* Main navigation links */}
      <ul className="space-y-0.5 w-full">
        <NavLinkItem
          to="/app/home"
          icon={<HomeIcon className="h-4 w-4" />}
          label="Home"
        />
        <NavLinkItem
          to="/app/communities"
          icon={<CursorArrowRippleIcon className="h-4 w-4" />}
          label="Explore"
        />
        <NavLinkItem
          to="/app/trending"
          icon={<ArrowTrendingUpIcon className="h-4 w-4" />}
          label="Trending"
        />
        <NavLinkItem
          to="/app/favorites"
          icon={<BookmarkIcon className="h-4 w-4" />}
          label="Saved"
        />
      </ul>

      <hr className="border-t border-gray-200 w-full my-3" />
      <h2 className="text-gray-500 font-semibold text-xs px-3 py-1">COMMUNITIES</h2>
      <ul className="space-y-0.5 w-full mt-2">
        {joinedCommunities.length > 0 ? (
          joinedCommunities.map((uc) => (
            <NavLinkItem
              key={uc.community.communityId}
              to={`/app/r/${uc.community.name}`}
              icon={
                <CircleIcon
                  bgColor="bg-[#820000]"
                  text={uc.community.name[0].toUpperCase()}
                />
              }
              label={`r/${uc.community.name}`}
            />
          ))
        ) : (
          <li className="text-gray-500 px-3 py-2 text-xs">
            No joined communities
          </li>
        )}
      </ul>

      <hr className="border-t border-gray-200 w-full my-3" />
      {/* Footer / Policy links */}
      <ul className="space-y-0.5 w-full">
        <NavLinkItem
          to="/app/user-agreement"
          icon={<NewspaperIcon className="h-4 w-4" />}
          label="User Agreement"
        />
        <NavLinkItem
          to="/app/privacy-policy"
          icon={<ShieldCheckIcon className="h-4 w-4" />}
          label="Privacy"
        />
        <NavLinkItem
          to="/app/settings"
          icon={<SettingsIcon className="h-4 w-4" />}
          label="Settings"
        />
      </ul>
    </aside>
  );
}

const NavLinkItem = ({ to, icon, label }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-all duration-300 ${
        isActive
          ? "bg-[#820000] text-white"
          : "hover:bg-gray-200 text-[#820000]"
      }`
    }
  >
    {icon}
    <span className="font-medium">{label}</span>
  </NavLink>
);

const CircleIcon = ({ bgColor, text }) => (
  <div
    className={`${bgColor} w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-sm`}
  >
    {text}
  </div>
);
