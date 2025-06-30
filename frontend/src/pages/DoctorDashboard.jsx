import {
  CalendarDays,
  ClipboardPlus,
  MoveUpRight,
  QrCode,
  ScanLine,
} from "lucide-react";
import React from "react";

import PatientData from "../dummydata/doctorDashboardPatientData.json";
import "../App.css";
import Layout from "../components/layout";
import Appointments from "../components/Appointments";

const DoctorDashboard = () => {
  const [selectedPatient, setSelectedPatient] = React.useState(null);

  return (
    <Layout>
      <div
        className="bg-white flex lg:flex-row flex-col p-4 gap-4 rounded-lg border border-gray-200 w-[83%] sm:w-[92%] lg:w-[78%] shadow-lg"
        id="mainDashboard"
      >
        <div className="  w-full h-[70%] lg:w-[70%] lg:h-full flex flex-col gap-4">
          <div
            className="h-auto w-full bg-blue-800 text-white rounded-lg p-4 shadow-md flex flex-col items-center justify-between gap-5"
            id="welcomeDiv"
          >
            <div className="flex w-full items-center justify-between">
              <h2 className="text-xl font-bold">
                Welcome, Dr. {" " + "Jonathan Brooks"}👋
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

                  <button className="bg-blue-700 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 cursor-pointer">
                    Request Access
                  </button>
                </div>
                <div className="flex items-center gap-4">
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
                </div>
              </div>
            </div>
          </div>
          <div
            className="h-[70%] w-full flex flex-col rounded-lg p-4 border-blue-800 border"
            id="patientList"
          >
            <div className="flex items-center justify-between mb-4 h-[10%]">
              <h3 className="text-lg font-bold flex items-center gap-2 text-blue-800">
                Patient's List
                <span className="text-sm bg-blue-800 text-white rounded-full h-6 w-6 flex justify-center items-center">
                  <span>{PatientData.length}</span>
                </span>
              </h3>
              <div className="flex items-center gap-2 p-2 border border-blue-800 rounded-md ">
                <CalendarDays size={20} className="text-blue-800" />
                <span className="text-sm font-medium text-blue-800">
                  14.10.2023
                </span>
              </div>
            </div>
            <div className="flex gap-4 h-[85%]">
              <div className="w-1/2 h-full flex flex-col gap-2 overflow-y-scroll scrollbar_custom">
                {PatientData.length > 0 ? (
                  PatientData.map((patient, index) => (
                    <div
                      className="h-20 w-full  rounded-lg flex items-center border border-transparent border-b border-b-blue-800 hover:border-blue-800 justify-between p-4 hover:bg-gray-100 transition-all duration-200 cursor-pointer gap-1"
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
              <div className="w-1/2 h-full bg-gray-50 rounded-lg shadow-sm flex items-center justify-center border border-blue-800 p-2">
                {selectedPatient ? (
                  <div className="h-full w-full  ">
                    <div
                      className=" h-[20%] w-full  flex items-center justify-between gap-2 bg-blue-800 text-white rounded-lg p-2"
                      id="patientDetails"
                    >
                      <div className="flex items-center gap-2">
                        <img
                          src="https://img.freepik.com/free-photo/portrait-father-his-backyard_23-2149489567.jpg?semt=ais_hybrid&w=740"
                          alt="Profile"
                          className="h-16 w-16 rounded-full object-cover shadow-md object-top"
                        />
                        <div className=" flex flex-col w-auto h-full  justify-center">
                          <p className="text-base">
                            {selectedPatient.PatientName}
                          </p>
                          <p className=" text-xs text-gray-300">
                            Reservation ID : {selectedPatient.userId}
                          </p>
                        </div>
                      </div>
                      <div className=" w-10 h-10 border border-white rounded-full flex items-center justify-center cursor-pointer hover:border-4 transition-all duration-100">
                        <MoveUpRight />
                      </div>
                    </div>
                    <div
                      className=" mt-3 border-y border-y-blue-800 py-1"
                      id="patientComplain"
                    >
                      <p>Complain</p>
                      <div className="flex items-center justify-start gap-3">
                        <div className=" bg-white p-1 rounded-lg border border-gray-300 shadow-sm">
                          Heart Pain
                        </div>
                        <div className=" bg-white p-1 rounded-lg border border-gray-300 shadow-sm">
                          High Pressure
                        </div>
                        <div className=" bg-white p-1 rounded-lg border border-gray-300 shadow-sm">
                          Diziness
                        </div>
                      </div>
                    </div>
                    <div
                      className=" border-b border-b-blue-800 mt-2 pb-2"
                      id="lastCheckUp"
                    >
                      <p className="text-sm text-gray-500 ">
                        Last Checkup:{" "}
                        <span className="font-medium text-blue-800 ml-auto">
                          24.09.2023
                        </span>
                      </p>
                      <p className="text-sm text-gray-500 mt-1">
                        Prescription:{" "}
                        <span className="font-medium text-blue-800 ml-auto underline cursor-pointer hover:text-blue-600">
                          ghsdhig38yth
                        </span>
                      </p>
                    </div>
                    <div
                      className=" border-b border-b-blue-800 mt-2 pb-2 flex items-center justify-evenly gap-2"
                      id="patientDocuments"
                    >
                      <p className="w-auto h-auto ">User Documents :</p>
                      <div className="flex flex-1 items-center justify-evenly">
                        <ClipboardPlus
                          size={40}
                          className=" text-blue-800 cursor-pointer"
                        />
                        <ClipboardPlus
                          size={40}
                          className=" text-blue-800 cursor-pointer"
                        />
                        <ClipboardPlus
                          size={40}
                          className=" text-blue-800 cursor-pointer"
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
          className="bg-gray-50 w-full h-[30%] lg:w-[30%] lg:h-full rounded-lg p-4 border border-gray-200 shadow-md"
          id="calendarDiv"
        >
          <h3 className="text-lg font-bold mb-4">Calendar</h3>
          <p className="text-blue-800">
            <Appointments />
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default DoctorDashboard;
