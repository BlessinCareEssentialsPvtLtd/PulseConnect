import React from "react";
import { ArrowRight, HeartPlus, NotepadText, Video } from "lucide-react";
import { motion } from "motion/react";

const RightSideProfile = ({ show }) => {
  return (
    <motion.div
      className=" w-[25%] rounded-lg shadow-lg border-blue-800 border p-4 bg-white fixed top-2.5 right-2.5 transition-all duration-300 z-[4] min-w-[240px]"
      initial={{ opacity: 0, x: 400 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 400 }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className=" flex flex-col justify-center items-center text-sm"
        id="profileDiv"
      >
        <img
          src="https://img.freepik.com/free-photo/portrait-father-his-backyard_23-2149489567.jpg?semt=ais_hybrid&w=740"
          className="h-28 w-28 rounded-full object-cover object-top shadow-md"
        />
        <h1 className="text-xl font-semibold mt-4">Jonathan Brooks</h1>
        <h2 className="text-lg  mt-2">30 Years</h2>
        <div className="flex  justify-center items-center mt-4 border-b border-slate-300 pb-5 w-[90%] ">
          <div className="flex flex-col h-full px-4 " id="bloodGroup">
            <p className="text-base">Blood</p>
            <p className="text-lg text-blue-800 text-center">AB+</p>
          </div>
          <div
            className="flex flex-col px-4 h-full border-x-2 border-slate-300"
            id="height"
          >
            <p className="text-base">Height</p>
            <p className="text-lg text-blue-800 text-center">180cm</p>
          </div>
          <div className="flex flex-col h-full px-4" id="weight">
            <p className="text-base">Weight</p>
            <p className="text-lg text-blue-800 text-center">70Kg</p>
          </div>
        </div>
        <div className=" w-full mt-3 h-60 p-2 overflow-hidden" id="healthPlans">
          <div className=" flex justify-between items-center">
            <p className="flex w-full gap-x-3">
              <HeartPlus size={28} color="#193cb8" />{" "}
              <span className="text-lg font-semibold">Health Plans</span>
            </p>
            <ArrowRight size={28} />
          </div>
          <div className=" h-44 w-full overflow-y-scroll my-2 text-base text-slate-600">
            <ul className="list-disc pl-5">
              <li>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam numquam labore corrupti
              </li>
              <li>
                Reprehenderit vel nam quidem incidunt perspiciatis?
                Reprehenderit, voluptatum et? Reprehenderit, voluptatum et?
              </li>
              <li>
                Reprehenderit vel nam quidem incidunt perspiciatis?
                Reprehenderit, voluptatum et?
              </li>
            </ul>
          </div>
        </div>
        <div
          className=" w-full p-2 border-y border-slate-300 "
          id="healthRecords"
        >
          <div className=" flex justify-between ">
            <p className="flex w-full gap-x-3">
              <NotepadText color="#193cb8" size={28} />
              <span className="text-lg font-semibold">My Health Records</span>
            </p>
            <ArrowRight />
          </div>
        </div>
        <div
          className=" w-full p-2 border-b border-slate-300"
          id="Appointments"
        >
          <div className=" flex justify-between">
            <p className="flex w-full gap-x-3">
              <Video color="#193cb8" size={28} />{" "}
              <span className="text-lg font-semibold">Appointments</span>
            </p>
            <ArrowRight />
          </div>
        </div>
        {/* <div className="w-full h-40 bg-slate-300 rounded-2xl my-3"></div> */}
      </div>
    </motion.div>
  );
};

export default RightSideProfile;
