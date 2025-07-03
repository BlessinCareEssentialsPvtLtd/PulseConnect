// Dashboard.jsx
import React from "react";
import {
  Dumbbell,
  Edit3,
  FileText,
  Pill,
  Send,
  Share2,
  Users,
} from "lucide-react";
import { ArrowRight, HeartPlus, NotepadText, Video } from "lucide-react";
import RightSideProfile from "../components/RightSideProfile";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Layout from "../components/layout";
import Appointments from "../components/Appointments";
import { AnimatePresence, motion } from "motion/react";

/* ───────────────────────── constants ───────────────────────── */

const quickLinks = [
  { icon: FileText, label: "Records" },
  { icon: Users, label: "Family" },
  { icon: Dumbbell, label: "Fitness" },
  { icon: Pill, label: "Prescriptions" },
];

const timelineEvents = [
  {
    strTime: "10:22",
    endTime: "11:43",
    title: "Consultation",
    location: "Floor 2, Room 32",
  },
  {
    strTime: "10:22",
    endTime: "11:43",
    title: "X-Ray",
    location: "Floor 1, Room 5",
  },
  {
    strTime: "10:22",
    endTime: "11:43",
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
  { title: "Fitness", subtitle: "Get Diet", desc: "Workout goal updated" },
];

const events = [
  {
    title: "Doctor Appointment",
    start: new Date(2025, 5, 28, 10, 0),
    end: new Date(2025, 5, 28, 11, 0),
    description: "Dr. Sharma at ABC Clinic",
  },
  {
    title: "Meeting with Designer",
    start: new Date(2025, 5, 28, 14, 0),
    end: new Date(2025, 5, 28, 15, 0),
    description: "UI design discussion",
  },
];

/* ───────────────────────── sub-components ───────────────────────── */

const PulseCard = () => (
  <div className="rounded-xl shadow-xl bg-white p-4 w-full">
    <h1 className="text-2xl font-medium mb-4">Pulse Card</h1>

    {/* card body */}
    <div className="flex w-full justify-center">
      {/* left –– coloured frame + info */}
      <div className="w-full max-w-md sm:w-[90%] md:w-[80%]">
        <div className="border-2 border-blue-700 rounded-t-2xl h-8" />
        <div className="border-2 border-blue-700 rounded-b-2xl p-4 flex flex-col sm:flex-row gap-1 sm:gap-4">
          {/* Avatar */}
          <div className="flex-shrink-0 flex justify-end sm:justify-start">
            <div className="w-12 h-12 sm:w-16 sm:h-16 xl:w-20 xl:h-20 bg-blue-400 rounded-full" />
          </div>

          {/* Details */}
          <div className="flex-1 flex flex-col justify-start text-xs sm:text-sm xl:text-base">
            <h2 className="font-semibold text-sm sm:text-base xl:text-xl">
              John Doe
            </h2>
            <p className="font-semibold">
              ID: <span className="text-blue-700">JEKvkajb78w92r</span>
            </p>

            <div className="mt-2 text-gray-600 space-y-1 break-words">
              <p>DOB: 24 | 06 | 1999</p>
              <p>Gender: M</p>
              <p className="whitespace-pre-wrap break-words leading-snug">
                Address: Name. Address. New York, NY 10003, USA. 2nd Street
                Dorm.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* right –– edit/share icons */}
      <div className="flex flex-col items-center justify-center ml-4 space-y-3">
        <Edit3 size={24} />
        <Send size={24} />
        <Share2 size={24} />
      </div>
    </div>

    {/* quick links */}
    <div className="flex justify-evenly mt-5">
      {quickLinks.map(({ icon: Icon, label }) => (
        <button key={label} className="flex flex-col items-center">
          <Icon size={28} />
          <span className="text-sm font-semibold mt-1">{label}</span>
        </button>
      ))}
    </div>
  </div>
);

const Timeline = () => (
  <div className="rounded-xl shadow-xl bg-white p-4">
    <h2 className="text-2xl font-semibold mb-4">Timeline</h2>

    <div className="space-y-4">
      {timelineEvents.map(({ strTime, endTime, title, location }) => (
        <div key={title} className="flex">
          {/* time block */}
          <div className="w-1/4 bg-[#ffffff] flex flex-col text-center rounded-l-md p-2 border-[1px] border-gray-100">
            <span className="font-semibold">{strTime}</span>
            <span className="font-semibold">-</span>
            <span className="font-semibold">{endTime}</span>
          </div>

          {/* text block */}
          <div className="w-3/4 bg-[#e9f8ff] rounded-r-md p-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <p className="text-sm">{location}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
);

const HistoryCards = () => (
  <div
    className="
    mt-4 rounded-xl shadow-xl bg-white p-4
    flex flex-wrap gap-4
  "
  >
    {historyTiles.map(({ title, subtitle, desc }) => (
      <div
        key={title}
        /* width rules: full width ≤880 px, half width above */
        className="
        flex bg-white rounded border-1 border-gray-100 shadow-md p-4
        basis-full
        max-[880px]:basis-full
        min-[881px]:basis-[calc(50%-0.5rem)]
      "
      >
        <div className="flex flex-col w-full">
          {/* top row */}
          <div className="flex w-full">
            <div className="w-12 h-12 md:h-10 bg-red-500 rounded-md mr-4" />
            <div>
              <h4 className="text-xl sm:text-lg font-semibold">{title}</h4>
              <p className="text-sm">{subtitle}</p>
            </div>
          </div>
          {/* bottom line */}
          <p className="text-sm font-semibold mt-2">{desc}</p>
        </div>
      </div>
    ))}
  </div>
);

/* ───────────────────────── main component ───────────────────────── */

function Dashboard({ showProfile, toggleProfileFunction }) {
  return (
    <Layout>
      {/*By flex*/}
      <div className="flex flex-col w-[90%] bg-[#e9f8ff] p-2">
        <div className="flex w-full max-[780px]:flex-col mt-4">
          <div className="w-full ml-4">
            <PulseCard />
          </div>
          <div className="w-full ml-4 mt-4 md:mt-0">
            <Timeline />
          </div>
        </div>
        <div className="flex w-full max-[780px]:flex-col mt-4">
          <div className="w-full ml-4">
            <Appointments />
          </div>
          <div className="w-full ml-4 mt-4 md:mt-0">
            <HistoryCards />
          </div>
        </div>
      </div>
      {/*By flex*/}

      {/* profile overlay */}
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

export default Dashboard;
