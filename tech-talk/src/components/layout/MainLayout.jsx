import React, { useState, useRef } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ProfileMenu from "./ProfileMenu";
import useClickOutside from "../../hooks/useClickOutside";
import { Outlet } from "react-router-dom";

function MainLayout() {
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef(null);

  useClickOutside(profileRef, () => setProfileOpen(false));

  return (
    <div className="h-screen w-full bg-gray-50 relative flex flex-col overflow-hidden">
      <Header setProfileOpen={setProfileOpen} profileOpen={profileOpen} profileRef={profileRef} />

      <div className="flex flex-1 overflow-hidden">
        <Sidebar />

        <main className="flex-1 p-6 overflow-y-auto bg-gray-50">
          <Outlet />
        </main>

        <ProfileMenu
          open={profileOpen}
          setOpen={setProfileOpen}
          profileRef={profileRef}
        />
      </div>
    </div>
  );
}

export default MainLayout;
