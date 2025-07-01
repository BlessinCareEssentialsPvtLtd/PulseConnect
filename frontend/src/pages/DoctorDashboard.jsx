import {
  CalendarDays,
  ClipboardPlus,
  MoveUpRight,
  QrCode,
  ScanLine,
} from "lucide-react";
import React, { useEffect, useState } from "react";

import PatientData from "../dummydata/doctorDashboardPatientData.json";
import "../App.css";
import Layout from "../components/layout";
import Calendar from "react-calendar";

const DoctorDashboard = () => {
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [value, onChange] = useState(new Date());

  useEffect(() => {
    console.log("Selected Date:", value);
  }, [value]);

  return (
    <Layout>
      <div
        className="bg-[#F5F5F5] flex lg:flex-row flex-col p-4 my-2 gap-4 rounded-lg border border-gray-200 w-[95%]  sm:w-[91%] lg:w-[77%] shadow-lg h-full"
        id="mainDashboard"
      >
        <div className="  w-full h-[70%] lg:w-[70%] lg:h-full flex flex-col gap-4">
          <div
            className="h-auto w-full bg-blue-800 text-white rounded-lg p-4 shadow-md flex flex-col items-center justify-between gap-5"
            id="welcomeDiv"
          >
            <div className="flex w-full items-center justify-between">
              <h2 className="text-xl font-bold">
                Dr. {" " + "Jonathan Brooks"}👋
              </h2>
              <p className="text-sm hidden md:block">
                Here's your schedule for today.
              </p>
            </div>
            <div className="flex flex-col items-start justify-center gap-4 w-full">
              <div className="flex items-center justify-between w-full">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Enter username"
                    className="rounded-lg px-4 py-2 w-48 text-sm text-blue-800 font-bold 
                        bg-gray-200 placeholder-blue-500 border border-white/30 
                          shadow-sm focus:ring-2 focus:ring-white/70 focus:outline-none 
                          transition duration-200"
                  />

                  {/* <button className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 cursor-pointer">
                    Request Access
                  </button> */}
                </div>
                {/* <div className="flex items-center gap-4">
                  <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <div className="flex items-center justify-center">
                      <QrCode size={48} />
                    </div>
                    <label className="text-sm text-white-500 mt-2">
                      Show QR
                    </label>
                  </div>
                  <div className="flex flex-col items-center gap-2 cursor-pointer">
                    <div className="flex items-center justify-center">
                      <ScanLine size={48} />
                    </div>
                    <label className="text-sm text-white-500 mt-2">
                      Scan QR
                    </label>
                  </div>
                </div> */}
              </div>
            </div>
          </div>
          <div
            className="h-[85%] w-full flex flex-col rounded-lg p-4 bg-white"
            id="patientList"
          >
            <div className="flex items-center justify-between mb-4 h-[10%]">
              <h3 className="text-base md:text-lg font-bold flex items-center gap-0.5 md:gap-2 text-blue-800">
                Patient's List
                <span className="text-xs md:text-sm bg-blue-800 text-white rounded-full h-4 w-4 md:h-6 md:w-6 flex justify-center items-center">
                  <span>{PatientData.length}</span>
                </span>
              </h3>
              <div className="flex items-center gap-2 p-2 border border-blue-800 rounded-md ">
                <CalendarDays size={20} className="text-blue-800" />
                <span className="text-xs md:text-sm font-medium text-blue-800">
                  14.10.2023
                </span>
              </div>
            </div>
            <div className="flex gap-4 h-[85%]">
              <div className=" w-full md:w-1/2 h-full flex flex-col gap-2 overflow-y-auto scrollbar_custom">
                {PatientData.length > 0 ? (
                  PatientData.map((patient, index) => (
                    <div
                      className={`h-20 w-full  rounded-lg flex items-center border border-transparent justify-between p-4 hover:bg-gray-100 transition-all duration-200 cursor-pointer gap-1 ${
                        selectedPatient &&
                        selectedPatient.userId === patient.userId
                          ? " border border-blue-800"
                          : ""
                      }`}
                      id="patientCard"
                      key={index}
                      onClick={() => setSelectedPatient(patient)}
                    >
                      <div className="flex gap-4 items-center">
                        <img
                          src="https://img.freepik.com/free-photo/portrait-father-his-backyard_23-2149489567.jpg?semt=ais_hybrid&w=740"
                          alt="Profile"
                          className="h-12 w-12 rounded-full object-cover shadow-md object-top"
                        />
                        <div>
                          <p className="font-medium">{patient.CheckUpType}</p>
                          <p className="text-sm text-gray-500">
                            {patient.PatientName}
                          </p>
                        </div>
                      </div>
                      <p className="px-3 py-1 bg-blue-800 text-white rounded-lg text-sm font-medium w-24 text-center">
                        {patient.Time}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <p className="text-gray-500">No appointments today.</p>
                  </div>
                )}
              </div>
              <div className="w-1/2  min-h-[520px] h-fit  bg-[#F5F5F5] rounded-lg shadow-sm items-center justify-center hidden md:flex text-base p-6">
                {selectedPatient ? (
                  <div className="h-full w-full">
                    <div
                      className="h-[25%] w-full flex flex-col md:flex-row items-center justify-between gap-4 bg-blue-800 text-white rounded-lg p-4"
                      id="patientDetails"
                    >
                      <div className="flex items-center gap-4">
                        <img
                          src="https://img.freepik.com/free-photo/portrait-father-his-backyard_23-2149489567.jpg?semt=ais_hybrid&w=740"
                          alt="Profile"
                          className="h-16 w-16 md:h-20 md:w-20 rounded-full object-cover shadow-md object-top"
                        />
                        <div className="flex flex-col w-auto h-full justify-center gap-1">
                          <p className="text-base md:text-lg font-medium">
                            {selectedPatient.PatientName}
                          </p>
                          <p className="text-sm text-gray-300">
                            Reservation ID: {selectedPatient.userId}
                          </p>
                          <p className="text-sm text-gray-300">
                            Age: {selectedPatient.Age || "N/A"}
                          </p>
                          <p className="text-sm text-gray-300">
                            Contact: {selectedPatient.ContactNumber || "N/A"}
                          </p>
                        </div>
                      </div>
                      <div className="w-10 h-10 md:w-12 md:h-12 border border-white rounded-full flex items-center justify-center cursor-pointer hover:border-4 transition-all duration-100">
                        <MoveUpRight />
                      </div>
                    </div>
                    <div
                      className="mt-4 border-y border-y-blue-800 py-2"
                      id="patientComplain"
                    >
                      <p className="font-medium text-blue-800 text-base md:text-lg">
                        Complain
                      </p>
                      <div className="flex items-center justify-start gap-3 mt-2 flex-wrap">
                        {selectedPatient.Complain.map((complain, index) => (
                          <div
                            className="bg-white p-2 rounded-lg border border-gray-300 shadow-sm text-sm md:text-base"
                            key={index}
                          >
                            {complain}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div
                      className="border-b border-b-blue-800 mt-4 pb-4"
                      id="lastCheckUp"
                    >
                      <p className="text-sm md:text-base text-gray-500">
                        Last Checkup:{" "}
                        <span className="font-medium text-blue-800 ml-auto">
                          {selectedPatient.LastCheckup || "N/A"}
                        </span>
                      </p>
                      <p className="text-sm md:text-base text-gray-500 mt-2">
                        Prescription:{" "}
                        <span className="font-medium text-blue-800 ml-auto underline cursor-pointer hover:text-blue-600">
                          {selectedPatient.Prescription || "N/A"}
                        </span>
                      </p>
                      <p className="text-sm md:text-base text-gray-500 mt-2">
                        Doctor Notes:{" "}
                        <span className="font-medium text-blue-800 ml-auto">
                          {selectedPatient.DoctorNotes || "N/A"}
                        </span>
                      </p>
                    </div>
                    <div
                      className="border-b border-b-blue-800 mt-4 pb-4 flex flex-col gap-4"
                      id="patientDocuments"
                    >
                      <p className="font-medium text-blue-800 text-base md:text-lg">
                        User Documents:
                      </p>
                      <div className="flex flex-wrap items-center justify-start gap-4">
                        <ClipboardPlus
                          size={32}
                          className="text-blue-800 cursor-pointer"
                        />
                        <ClipboardPlus
                          size={32}
                          className="text-blue-800 cursor-pointer"
                        />
                        <ClipboardPlus
                          size={32}
                          className="text-blue-800 cursor-pointer"
                        />
                        <ClipboardPlus
                          size={32}
                          className="text-blue-800 cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    Select a patient to view details.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div
          className="bg-gray-50  h-[30%] w-full lg:w-[25%] lg:h-full rounded-lg p-4 border border-gray-200 shadow-md mx-auto"
          id="calendarDiv"
        >
          <h3 className="text-lg font-bold mb-4">Calendar</h3>
          <p className="text-blue-800">
            <Calendar
              onChange={onChange}
              value={value}
              className="text-blue-800 h-[50%]"
            />
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
