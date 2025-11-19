import React from "react";
import { MdSettings, MdMarkEmailRead } from "react-icons/md";

const notifications = [
  {
    id: 1,
    title: "Because you joined r/ComputerScience",
    description: "Pagkakapoys",
    time: "3h",
    icon: "rod",
  },
  {
    id: 2,
    title: "CITMentalHealth",
    description: "Mental Health matters the most, in all ways.",
    time: "6d",
    icon: "sun",
  },
];


const Notifications = () => {
  return (
    <div className="max-w-2xl mx-auto mt-10 p-4 shadow-sm bg-white rounded-2xl">
      <div className="flex items-center justify-between px-4 py-3">
        <h2 className="font-semibold text-xl">Notifications</h2>
        <div className="flex items-center gap-3 text-gray-500">
          <button title="Mark all as read">
            <MdMarkEmailRead size={22} />
          </button>
          <button title="Settings">
            <MdSettings size={22} />
          </button>
        </div>
      </div>

      <div>
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className="flex items-start gap-4 px-5 py-5 hover:bg-gray-100 cursor-pointer rounded-lg"
          >
            <div className="flex-shrink-0 mt-1">
              {notif.icon === "rod" && (
                <div className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  R
                </div>
              )}
              {notif.icon === "sun" && (
                <div className="w-12 h-12 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                  ☀
                </div>
              )}
            </div>

            <div className="flex-1">
              <p className="font-medium text-lg mb-1">{notif.title}</p>
              <p className="text-gray-500 text-base">{notif.description}</p>
            </div>

            <div className="text-gray-400 text-sm flex-shrink-0 mt-1">{notif.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Notifications;
