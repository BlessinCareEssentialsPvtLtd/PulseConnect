import React from "react";
import {
  Dumbbell,
  Edit3,
  FileText,
  Pill,
  Send,
  Share2,
  Users,
  ArrowRight,
  HeartPlus,
  NotepadText,
  Video,
  NotebookPen
} from "lucide-react";

import { MapPin, Clock } from "lucide-react";
import RightSideProfile from "../components/RightSideProfile";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Layout from "../components/layout";
import Appointments from "../components/Appointments";
import { AnimatePresence, motion } from "framer-motion"; // ✅ fixed wrong import

/* ───────────────────────── constants ───────────────────────── */

const quickLinks = [
  { icon: FileText, label: "Records" },
  { icon: Users, label: "Family" },
  { icon: Dumbbell, label: "Fitness" },
  { icon: Pill, label: "Medicine" },
];

const timelineEvents = [
  {
    strTime: "10:22",
    endTime: "11:43",
    title: "Consultation",
    location: "Floor 2, Room 32",
  },
  {
    strTime: "12:00",
    endTime: "12:30",
    title: "X-Ray",
    location: "Floor 1, Room 5",
  },
  {
    strTime: "13:15",
    endTime: "13:45",
    title: "Check-up",
    location: "Room 12",
  },
];

const historyTiles = [
  { title: "Records", subtitle: "History", desc: "3 new doctors added" },
  {
    title: "Medicines",
    subtitle: "Know Medicines",
    desc: "2 prescriptions saved",
  },
  { title: "Family", subtitle: "Records", desc: "1 family member linked" },
  { title: "Fitness", subtitle: "Get Diet", desc: "Workout goal updated" },
];

/* ───────────────────────── sub-components ───────────────────────── */

const PulseCard = () => (
  <div className="rounded-xl h-full w-full">
    <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-transparent h-full w-full mb-1">
      <div className="relative w-full md:w-[80%] h-full bg-white pl-8 p-2 rounded-lg shadow-lg ">
        <h1 className="text-xl font-bold text-primary mb-2">Pulse Card</h1>
        <div className="flex flex-1 justify-start items-end w-full md:mb-[10%] md:absolute bottom-0">
          {/* Left: user info */}
          <div className="w-full md:h-[40%] md:w-[80%] ">
            <div className="border-2  border-blue-700 rounded-t-2xl h-6" />
            <div className="border-2  border-blue-700 rounded-b-2xl p-3 flex gap-3">
              <div className="w-12 h-12 sm:w-14 sm:h-14 bg-blue-400 rounded-full flex-shrink-0" />

              <div className="text-xs sm:text-sm flex-1">
                <h2 className="font-semibold text-sm">John Doe</h2>
                <p className="font-semibold text-xs">
                  ID: <span className="text-blue-700">JEKvkajb78w92r</span>
                </p>
                <div className="mt-1 text-gray-600 text-sm leading-snug">
                  <p className=" text-xs">DOB: 24 | 06 | 1999</p>
                  <p className=" text-xs">Gender: M</p>
                  <p className="break-words text-xs">
                    Address: Name. Address. New York, NY 10003, USA. 2nd Street Dorm.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: icons */}
          <div className="flex flex-col items-center gap-2 ml-3">
            <Edit3 size={20} />
            <Send size={20} />
            <Share2 size={20} />
          </div>
        </div>
      </div>
      {/* Quick links */}
      <div className="h-full w-full md:w-[15%] bg-white rounded-xl p-2 shadow-lg">
      <div className="flex md:flex-col flex-row justify-evenly items-center gap-4 my-2 h-full ">
        {quickLinks.map(({ icon: Icon, label }) => (
          <button key={label} className="flex flex-col items-center">
            <Icon size={20} />
            <span className="text-xs font-medium mt-1">{label}</span>
          </button>
        ))}
      </div>

      </div>
    </div>

  </div>
);


const Timeline = () => (
  <div className="rounded-md bg-white p-2 w-full">
    <h2 className="text-xl font-bold mb-1 text-primary">Timeline</h2>

    <div className="flex flex-col gap-2 w-[95%] mx-auto my-2">
      {timelineEvents.map(({ strTime, endTime, title, location }) => (
        <div
          key={`${title}-${strTime}`}
          className="flex items-start gap- border border-[#e6f0ff] rounded-md p-2 bg-[#f7fbfe]"
        >
          {/* Time Badge with Icon */}
          <div className="flex flex-col items-center gap-1 text-[11px] font-medium text-blue-700 min-w-[90px]">
            <span className="flex gap-1 items-center">
            <Clock size={12} />
            {strTime}
            </span>
            <span className="flex gap-1 items-center">
            <Clock size={12} />
            {endTime}
            </span>
          </div>

          {/* Timeline Details */}
          <div className="flex-1">
            <h3 className="text-sm font-medium text-gray-800 leading-tight">{title}</h3>
            <div className="flex items-center text-[11px] text-gray-600 mt-0.5">
              <MapPin size={10} className="mr-1" />
              {location}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);


const HistoryCards = () => (
  <div className="mt-4 rounded-xl bg-white p-4 flex flex-wrap gap-3">
    {historyTiles.map(({ title, subtitle, desc }, index) => (
      <div
        key={`${title}-${index}`}
        className="flex bg-white rounded-lg border border-gray-100 shadow p-3 basis-full min-[881px]:basis-[calc(50%-0.375rem)]"
      >
        <div className="flex items-start gap-3 w-full">
          {/* Icon or visual */}
          <div className="w-10 h-10 bg-[#0260c8] rounded-md flex items-center justify-center text-white">
            <NotebookPen size={18} />
          </div>

          {/* Content */}
          <div className="flex-1">
            <h4 className="text-base font-semibold text-gray-800">{title}</h4>
            <p className="text-sm text-gray-600">{subtitle}</p>
            <p className="text-sm font-medium mt-1 text-gray-700">{desc}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);


/* ───────────────────────── main component ───────────────────────── */

export default function Dashboard({ showProfile, toggleProfileFunction }) {
  return (
    <Layout>
      {/*By flex*/}
      <div className="flex flex-col w-[90%] bg-[#e9f8ff] p-2">
        <div className="flex w-full max-[780px]:flex-col mt-4">
          <div className="w-full md:w-[48%] ml-4">
            <PulseCard />
          </div>
          <div className="w-full md:w-[48%] ml-4 mt-4 md:mt-0">
            <Timeline />
          </div>
        </div>
        <div className="flex w-full max-[780px]:flex-col mt-4">
          <div className="w-full md:w-[48%] ml-4">
            <Appointments />
          </div>
          <div className="w-full md:w-[48%] ml-4 mt-4 md:mt-0">
            <HistoryCards />
          </div>
        </div>
      </div>
      {/*By flex*/}




      {/* Profile Overlay */}
      <AnimatePresence>
        {showProfile && (
          <motion.div
            className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center"
            onClick={() => toggleProfileFunction(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <RightSideProfile
              show={showProfile}
              toggleProfileFunction={toggleProfileFunction}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Layout>
  );
}
