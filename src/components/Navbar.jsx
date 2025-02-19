import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { CiSearch, CiSettings } from "react-icons/ci";
import { HiOutlineHome } from "react-icons/hi2";
import { IoFitnessOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { GoChecklist } from "react-icons/go";
import { IoMdNotificationsOutline } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";
import { Tooltip } from "react-tooltip";
import { TfiAnnouncement } from "react-icons/tfi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const getActiveClass = (path) =>
    location.pathname === path
      ? "bg-[#566246] text-white"
      : "hover:bg-[#C0BABC]";

  return (
    <div>
      {/* Hamburger Icon for Mobile */}
      <div className="md:hidden z-50 flex justify-between items-center">
        <GiHamburgerMenu
          className="text-black h-8 w-8 cursor-pointer absolute top-2 left-5"
          onClick={() => setIsOpen(true)}
        />
      </div>

      {/* Sidebar */}
      <div
        className={`bg-[#e6e9d9] text-white h-screen md:h-[90vh] w-[20vw] md:w-[4vw] rounded-2xl py-5 gap-5 flex flex-col items-center justify-between transition-all duration-300 fixed top-0 left-0 z-50 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } md:translate-x-0 md:relative md:flex`}
      >
        {/* Close Button for Mobile */}
        <div className="md:hidden w-full flex justify-end p-4">
          <IoMdClose
            className="text-black h-8 w-8 cursor-pointer absolute top-2 right-5"
            onClick={() => setIsOpen(false)}
          />
        </div>

        {/* Profile & Search */}
        <div className="flex flex-col gap-5 items-center w-full">
          <div className="profile cursor-pointer border p-1 bg-white border-white rounded-full">
            <img
              className="rounded-full h-12 w-12 object-cover object-center"
              src="https://images.unsplash.com/photo-1738332465678-be640ebb3a82?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Profile"
            />
          </div>
          <div className="h-10 w-11 bg-[#b1b1ad] rounded-xl flex items-center justify-center p-1 cursor-pointer">
            <CiSearch
              className="h-5 w-5 text-black"
              data-tooltip-id="tooltip"
              data-tooltip-content="Search"
            />
          </div>
        </div>

        {/* Navigation Icons */}
        <div className="flex flex-col gap-5 items-center w-full">
          <HiOutlineHome
            className={`h-8 w-8 md:w-12 text-black cursor-pointer rounded-lg p-1 transition-all duration-300 ${getActiveClass(
              "/"
            )}`}
            data-tooltip-id="tooltip"
            data-tooltip-content="Home"
          />
          <IoFitnessOutline
            className={`h-8 w-8 md:w-12 text-black cursor-pointer rounded-lg p-1 transition-all duration-300 ${getActiveClass(
              "/fitness"
            )}`}
            data-tooltip-id="tooltip"
            data-tooltip-content="Fitness"
          />
          <GoChecklist
            className={`h-8 w-8 md:w-12 text-black cursor-pointer rounded-lg p-1 transition-all duration-300 ${getActiveClass(
              "/checklist"
            )}`}
            data-tooltip-id="tooltip"
            data-tooltip-content="Checklist"
          />
        </div>

        {/* Profile & Notifications */}
        <div className="flex flex-col gap-5 items-center w-full mt-10">
          <IoMdNotificationsOutline
            className={`h-8 w-8 md:w-12 text-black cursor-pointer rounded-lg p-1 transition-all duration-300 ${getActiveClass(
              "/notifications"
            )}`}
            data-tooltip-id="tooltip"
            data-tooltip-content="Notifications"
          />
          <TfiAnnouncement
            className={`h-8 w-8 md:w-12 text-black cursor-pointer rounded-lg p-1 transition-all duration-300 ${getActiveClass(
              "/notifications"
            )}`}
            data-tooltip-id="tooltip"
            data-tooltip-content="Announcements"
          />
        </div>

        {/* Settings */}
        <div className="flex flex-col items-center w-full gap-2">
          <hr className="w-10 border-black" />
          <CiSettings
            className={`h-10 w-8 md:w-12 text-black cursor-pointer hover:text-gray-600 transition-all duration-300 ${getActiveClass(
              "/settings"
            )}`}
            data-tooltip-id="tooltip"
            data-tooltip-content="Settings"
          />
        </div>
      </div>

      {/* Tooltip Component */}
      <Tooltip
        id="tooltip"
        place="right"
        effect="solid"
        delayShow={100}
        className="bg-gray-700 text-white p-2 z-50 rounded-md text-sm shadow-md"
      />
    </div>
  );
};

export default Navbar;
