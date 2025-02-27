import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const getActiveClass = (path) =>
    location.pathname === path
      ? "bg-black text-white"
      : "hover:bg-gray-300 transition-all duration-300";
  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-4 left-4 z-50">
        <GiHamburgerMenu
          className="text-black h-8 w-8 cursor-pointer"
          onClick={() => setIsOpen(true)}
        />
      </div>

      {/* Sidebar */}
      <div
        className={`fixed top-1/2 -left-10 sm:left-10 transform -translate-y-1/2 flex flex-col items-center bg-gray-100 p-3 rounded-3xl shadow-lg h-[80vh] w-16 gap-4 justify-between transition-all duration-300 md:translate-x-0 z-50
          ${isOpen ? "translate-x-12" : "-translate-x-full"} md:flex`}
      >
        {/* Close Button for Mobile */}
        <div className="md:hidden w-full flex justify-end p-2">
          <IoMdClose
            className="text-black h-8 w-8 cursor-pointer"
            onClick={() => setIsOpen(false)}
          />
        </div>

        {/* Top Section */}
        {/* Top Section */}
        <div className="flex flex-col items-center gap-4">
          <div
            className={`p-3 rounded-full ${getActiveClass("/")}`}
            onClick={() => navigate("/")}
          >
            <HiOutlineHome size={24} className="cursor-pointer" />
          </div>

          <div
            className={`p-3 rounded-full ${getActiveClass("/medicalrecords")}`}
            data-tooltip-id="tooltip"
            data-tooltip-content="Medical Records"
            onClick={() => navigate("/medicalrecords")}
          >
            <IoFitnessOutline size={24} className="cursor-pointer" />
          </div>

          <div
            className={`p-3 rounded-full ${getActiveClass("/checklist")}`}
            data-tooltip-id="tooltip"
            data-tooltip-content="Checklist"
            onClick={() => navigate("/checklist")}
          >
            <GoChecklist size={24} className="cursor-pointer" />
          </div>
        </div>

        {/* Middle Section */}
        <div className="relative">
          <div
            className="p-3 rounded-full hover:bg-gray-300 cursor-pointer"
            data-tooltip-id="tooltip"
            data-tooltip-content="Notifications"
          >
            <IoMdNotificationsOutline size={24} />
          </div>
          <span className="absolute top-1 right-2 bg-red-500 w-2 h-2 rounded-full"></span>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col items-center gap-4">
          <div
            className="p-3 rounded-full hover:bg-gray-300"
            data-tooltip-id="tooltip"
            data-tooltip-content="Settings"
          >
            <CiSettings size={24} className="cursor-pointer" />
          </div>
          <div
            onClick={() => navigate("/userdashboard")}
            className="bg-white p-1 rounded-full shadow-md cursor-pointer"
          >
            <img
              src="https://plus.unsplash.com/premium_photo-1700353612860-bd8ab8d71f05?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              className="h-12 w-12 rounded-full object-cover"
              alt="Profile"
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
    </>
  );
};

export default Navbar;
