import React, { useState } from "react";
import {
  LayoutDashboard,
  HeartPulse,
  FileText,
  CalendarCheck,
  Users,
  Dumbbell,
  ChevronDown,
  Pill,
  Lock,
  BrainCircuit,
  CalendarPlus,
  CalendarClock,
  Clock,
  ActivityIcon,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

function Sidebar({ toggleProfileFunction }) {
  const [showSubMenu, setShowSubMenu] = useState(null);
  const [currentSelected, setCurrentSelected] = useState("Dashboard");

  const navItems = [
    {
      label: "Dashboard",
      icon: LayoutDashboard,
      subMenu: null,
    },
    {
      label: "Healthline",
      icon: HeartPulse,
      subMenu: null,
    },
    {
      label: "Medical Records",
      icon: FileText,
      subMenu: [
        { label: "Medications", icon: Pill },
        { label: "Doc Lock", icon: Lock },
        { label: "Skills", icon: BrainCircuit },
      ],
    },
    {
      label: "Appointment",
      icon: CalendarCheck,
      subMenu: [
        { label: "Book Now", icon: CalendarPlus },
        { label: "Upcoming", icon: CalendarClock },
        { label: "Past Records", icon: Clock },
      ],
    },
    {
      label: "Family",
      icon: Users,
      subMenu: null,
    },
    {
      label: "Fitness",
      icon: Dumbbell,
      subMenu: null,
    },
  ];

  return (
    <div className="w-[48px] md:w-[80px] lg:w-[20vw] h-screen p-1 md:p-4 bg-[#99bbff] shadow-lg z-[6] fixed overflow-y-scroll lg:overflow-y-auto ">
      <div className="flex flex-col h-full items-center justify-center gap-8 lg:justify-start">
        {/* Left Section: Logo */}
        <div className="flex lg:items-center justify-center text-blue-800 gap-3 w-full h-20 items-start lg:h-auto">
          <ActivityIcon className="text-blue-800 w-8 h-8" />
          <h1 className="font-mono font-semibold text-xl hidden lg:block">
            PulseConnect
          </h1>
        </div>

        {/* Profile Card */}
        <div
          className="w-full lg:bg-white rounded-xl flex items-center gap-4 lg:p-3 hover:bg-gray-100 transition-all duration-200 ease-in-out cursor-pointer lg:shadow-sm justify-center lg:justify-start"
          id="profile"
          onClick={() => toggleProfileFunction((prev) => !prev)}
        >
          <img
            src="https://img.freepik.com/free-photo/portrait-father-his-backyard_23-2149489567.jpg?semt=ais_hybrid&w=740"
            alt="Profile"
            className=" h-9 w-9 lg:h-14 lg:w-14 rounded-full object-cover object-top shadow-md"
          />
          <div className=" flex-col flex-1 text-center hidden lg:flex">
            <h1 className="text-lg font-semibold text-gray-800">
              Jonathan Brooks
            </h1>
            <p className="text-sm text-gray-500">30 Years</p>
          </div>
        </div>

        {/* Navigation */}
        <ul className="flex flex-col gap-4 w-full text-gray-800 text-sm lg:text-base font-medium justify-center">
          {navItems.map((item, index) => (
            <li
              key={index}
              className={`flex flex-col gap-2 p-2 rounded-lg transition cursor-pointer lg:border-transparent ${
                item.subMenu ? "overflow-hidden " : ""
              } ${
                item.label === currentSelected
                  ? " bg-blue-800 hover:bg-blue-700"
                  : "hover:bg-[#b3ccff]"
              }`}
              onClick={() => setCurrentSelected(item.label)}
            >
              <div
                className={`flex items-center justify-center lg:justify-start gap-2 w-full ${
                  item.label === currentSelected ? " text-white" : ""
                } `}
                onClick={() =>
                  item.subMenu &&
                  setShowSubMenu((prev) =>
                    prev === item.label ? null : item.label
                  )
                }
              >
                <item.icon
                  size={24}
                  className={
                    "text-blue-800" +
                    `${item.label === currentSelected ? " text-white" : ""}`
                  }
                />
                <span className="hidden lg:block">{item.label}</span>
                {item.subMenu && (
                  <ChevronDown
                    size={16}
                    className={`ml-auto  hidden lg:block ${
                      showSubMenu === item.label
                        ? "rotate-180 transition-all duration-200"
                        : ""
                    } ${
                      item.label === currentSelected
                        ? " text-white"
                        : "text-blue-800"
                    }`}
                  />
                )}
              </div>
              {item.subMenu && (
                <AnimatePresence mode="wait">
                  {showSubMenu === item.label && (
                    <motion.ul
                      className="ml-7 flex flex-col gap-2 mt-2 text-sm"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                    >
                      {item.subMenu.map((subItem, subIndex) => (
                        <li
                          key={subIndex}
                          className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer ${
                            item.label === currentSelected
                              ? " text-white hover:bg-blue-500"
                              : "hover:bg-[#aac4ff]"
                          }`}
                        >
                          <subItem.icon
                            size={18}
                            className={`${
                              item.label === currentSelected
                                ? " text-white"
                                : "text-blue-800"
                            }`}
                          />
                          {subItem.label}
                        </li>
                      ))}
                    </motion.ul>
                  )}
                </AnimatePresence>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
