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
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

function Sidebar({ toggleProfileFunction }) {
  const [showSubMenu, setShowSubMenu] = useState(null);
  return (
    <div className="w-[25vw] h-screen p-4 bg-stone-200 shadow-lg">
      <div className="flex flex-col h-full items-center gap-8">
        {/* Profile Card */}
        <div
          className="w-full bg-white rounded-xl flex items-center gap-4 p-3 hover:bg-gray-100 transition-all duration-200 ease-in-out cursor-pointer shadow-sm"
          id="profile"
          onClick={() => toggleProfileFunction((prev) => !prev)}
        >
          <img
            src="https://img.freepik.com/free-photo/portrait-father-his-backyard_23-2149489567.jpg?semt=ais_hybrid&w=740"
            alt="Profile"
            className="h-14 w-14 rounded-full object-cover object-top shadow-md"
          />
          <div className="flex flex-col flex-1 text-center">
            <h1 className="text-lg font-semibold text-gray-800">
              Jonathan Brooks
            </h1>
            <p className="text-sm text-gray-500">30 Years</p>
          </div>
        </div>

        {/* Navigation */}
        <ul className="flex flex-col gap-4 w-full text-gray-800 text-base font-medium">
          {/* Dashboard */}
          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-300 transition cursor-pointer">
            <LayoutDashboard size={24} className="text-blue-800" />
            <span>Dashboard</span>
          </li>

          {/* Healthline */}
          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-300 transition cursor-pointer">
            <HeartPulse size={24} className="text-blue-800" />
            <span>Healthline</span>
          </li>

          {/* Medical Records w/ submenu */}
          <li className="flex flex-col gap-2 p-3 rounded-lg hover:bg-gray-300 transition cursor-pointer">
            <div
              className="flex items-center gap-2 w-full"
              onClick={() =>
                setShowSubMenu((prev) =>
                  prev === "medicalRecords" ? null : "medicalRecords"
                )
              }
            >
              <FileText size={24} className="text-blue-800" />
              <span>Medical Records</span>
              <ChevronDown
                size={16}
                className={`ml-auto text-blue-800 ${
                  setShowSubMenu === "medicalRecords"
                } `}
              />
            </div>
            <AnimatePresence mode="wait">
              {showSubMenu === "medicalRecords" && (
                <motion.ul
                  className="ml-7 flex flex-col gap-2 mt-2 text-sm"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <li className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
                    <Pill size={18} className="text-blue-800" />
                    Medications
                  </li>
                  <li className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
                    <Lock size={18} className="text-blue-800" />
                    Doc Lock
                  </li>
                  <li className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
                    <BrainCircuit size={18} className="text-blue-800" />
                    Skills
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          {/* Appointment w/ submenu */}
          <li className="flex flex-col gap-2 p-3 rounded-lg hover:bg-gray-300 transition cursor-pointer overflow-hidden">
            <div
              className="flex items-center gap-2 w-full"
              onClick={() =>
                setShowSubMenu(
                  showSubMenu === "appointment" ? null : "appointment"
                )
              }
            >
              <CalendarCheck size={24} className="text-blue-800" />
              <span>Appointment</span>
              <ChevronDown size={16} className="ml-auto text-blue-800" />
            </div>
            <AnimatePresence mode="wait">
              {showSubMenu === "appointment" && (
                <motion.ul
                  className="ml-7 flex flex-col gap-2 mt-2 text-sm"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                >
                  <li className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
                    <CalendarPlus size={18} className="text-blue-800" />
                    Book Now
                  </li>
                  <li className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
                    <CalendarClock size={18} className="text-blue-800" />
                    Upcoming
                  </li>
                  <li className="flex items-center gap-2 hover:bg-gray-200 p-2 rounded-lg cursor-pointer">
                    <Clock size={18} className="text-blue-800" />
                    Past Records
                  </li>
                </motion.ul>
              )}
            </AnimatePresence>
          </li>

          {/* Family */}
          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-300 transition cursor-pointer">
            <Users size={24} className="text-blue-800" />
            <span>Family</span>
          </li>

          {/* Fitness */}
          <li className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-300 transition cursor-pointer">
            <Dumbbell size={24} className="text-blue-800" />
            <span>Fitness</span>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;
