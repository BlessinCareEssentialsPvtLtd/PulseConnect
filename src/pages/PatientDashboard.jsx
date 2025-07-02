// src/pages/PatientDashboard.jsx
import DashboardLayout from "../layout/DashboardLayout";
import PulseCard from "../components/PulseCard";
import Timeline from "../components/Timeline";
import Appointments from "../components/Appointments";
import HistoryTiles from "../components/HistoryTiles";

import { useLocation } from "react-router-dom";

const PatientDashboard = () => {
  const location = useLocation();
  const patient = {
    name: location.state.patient.name,
    uniqueId: location.state.patient.uniqueId,
    email: location.state.patient.email,
    phone: location.state.patient.phone,
    userName: location.state.patient.username,
    dob: location.state.patient.dob,
    gender: location.state.patient.gender,
    place: `${location.state.patient.place}, ${location.state.patient.city},${location.state.patient.district}, ${location.state.patient.state}, ${location.state.patient.nation}`,
    photo: location.state.patient.photo,
  };

  console.log("Full Patient Data:", location.state.patient);
  return (
    <DashboardLayout  patient={patient}>
     
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-2 gap-6">
        <PulseCard patient={patient} />
        <Timeline />
        <Appointments />
        <HistoryTiles />
      </div>
    </DashboardLayout>
  );
};

export default PatientDashboard;
