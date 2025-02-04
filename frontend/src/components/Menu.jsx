import React from "react";
import { FaHome } from "react-icons/fa";
import { FaRegCalendar } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { FiLogOut } from "react-icons/fi";
import { Link, useLocation } from "react-router-dom";

function Menu() {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <nav className="fixed bg-zinc-900 text-white w-full bottom-0 py-4">
      <ul className="grid grid-cols-5 gap-10">
        <Link to={"/"}>
          <li
            className={`flex flex-col items-center space-y-2 ${
              location.pathname === "/" ? "text-primary" : "text-white"
            } hover:text-primary transition-all`}
          >
            <FaHome size={22} />
            <p className="font-bold">Home</p>
          </li>
        </Link>
        <Link to={"calendar"}>
          <li
            className={`flex flex-col items-center space-y-2 ${
              location.pathname === "/calendar" ? "text-primary" : "text-white"
            } hover:text-primary transition-all`}
          >
            <FaRegCalendar size={22} />
            <p className="font-bold">Calendar</p>
          </li>
        </Link>
        <Link to={"profile"}>
          <li
            className={`flex flex-col items-center space-y-2 ${
              location.pathname === "/profile" ? "text-primary" : "text-white"
            } hover:text-primary transition-all`}
          >
            <FaRegUser size={22} />
            <p className="font-bold">Profile</p>
          </li>
        </Link>
        <Link to={"settings"}>
          <li
            className={`flex flex-col items-center space-y-2 ${
              location.pathname === "/settings" ? "text-primary" : "text-white"
            }  hover:text-primary transition-all`}
          >
            <IoSettingsOutline size={24} />
            <p className="font-bold">Settings</p>
          </li>
        </Link>

        <li className="flex flex-col items-center space-y-2 hover:text-primary transition-all">
          <FiLogOut size={22} />
          <p className="font-bold">Log Out</p>
        </li>
      </ul>
    </nav>
  );
}

export default Menu;
