import React from "react";
import {
  Dumbbell,
  Edit3Icon,
  FileText,
  Pill,
  QrCode,
  Send,
  Share2Icon,
  Users,
} from "lucide-react";
import RightSideProfile from "../components/RightSideProfile";
import { AnimatePresence, motion } from "motion/react";

function Dashboard({ showProfile, toggleProfileFunction }) {
  return (
    <div className="relative flex gap-4 items-start justify-around w-full mt-1 p-4 z-[1]">
      {/* Left Section  */}
      <div className="flex-1 min-h-full w-[30vw] bg-gray-200 rounded-xl  p-4">
        <div className="m-4 p-2 text-left flex flex-col items-start justify-center w-full">
          <h1 className="text-5xl font-medium font-sans ">Plus Card</h1>
          {/* Pulse Card  */}
          <div className="mx-auto w-[90%] h-max rounded-md p-2 mt-4">
            <div className="outer border-4 border-blue-700 rounded-t-2xl h-12"></div>
            <div className="outer border-4 border-blue-700 rounded-b-2xl h-64 p-2">
              <div className="min-h-full w-full flex justify-around items-start p-2">
                <div className="w-[20%]">
                  <div className="aspect-square h-28 bg-blue-400 rounded-full"></div>
                </div>
                <div className="w-[70%] flex flex-col items-start justify-start">
                  <div>
                    <h2 className="text-2xl font-semibold my-2">John Doe</h2>
                    <h2 className="text-2xl font-semibold my-2">
                      ID:
                      <span className="text-blue-700 m-2">JEKvkajb78w92r</span>
                    </h2>
                  </div>
                  <div className="flex items-start justify-between w-full mt-2">
                    <div className="flex flex-col items-start justify-start gap-2">
                      <h2 className="text-xl font-medium text-gray-600">
                        DOB:
                      </h2>
                      <h2 className="text-xl font-medium text-gray-600">
                        Gender:
                      </h2>
                      <h2 className="text-xl font-medium text-gray-600">
                        Address:
                      </h2>
                    </div>
                    {/* // QR code */}
                    <div>
                      <div className=" ">
                        <QrCode size={80} color="black" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Add Share Btns  */}
            <div className="flex items-center justify-end mt-4 gap-4">
              <Edit3Icon size={30} color="black" />
              <Send size={30} color="black" />
              <Share2Icon size={30} color="black" className="mx-2" />
            </div>

            {/* Add Main Options  */}
            <div className="flex items-center justify-around mt-4 gap-4">
              <div className="flex flex-col items-center cursor-pointer">
                <FileText size={50} className="" />
                <span className="text-xl font-semibold mt-2">Records</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer">
                <Users size={50} className="" />
                <span className="text-xl font-semibold mt-2">Family</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer">
                <Dumbbell size={50} className="" />
                <span className="text-xl font-semibold mt-2">Fitness</span>
              </div>
              <div className="flex flex-col items-center cursor-pointer">
                <Pill size={50} className="" />
                <span className="text-xl font-semibold mt-2">
                  Prescriptions
                </span>
              </div>
            </div>
          </div>
          {/* Appointments section*/}
          <section className="mt-4 p-8 w-full m-2">
            <h1 className="text-5xl font-medium font-sans ">Appointments</h1>
            <div className="w-full h-[20rem] bg-stone-500 border-2 border-black mt-4 rounded-md p-4"></div>
          </section>
        </div>
      </div>
      {/* Right Section */}
      <div className="flex-1 min-h-full flex items-center justify-center  w-[30vw] bg-gray-200 rounded-md">
        hello
      </div>
      {/* Profile Section */}
      <AnimatePresence mode="wait">
        {showProfile && (
          <motion.div
            className=" absolute inset-0 z-[3]  w-full h-full bg-black/50"
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
    </div>
  );
}

export default Dashboard;
