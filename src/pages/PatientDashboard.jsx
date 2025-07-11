import DashboardLayout from "../layout/DashboardLayout";
import PulseCard from "../components/PulseCard";
import Timeline from "../components/Timeline";
import Appointments from "../components/Appointments";
import HistoryTiles from "../components/HistoryTiles";

import { useLocation } from "react-router-dom";

const PatientDashboard = () => {
  const location = useLocation();

  // ✅ Get patient data from location.state or fallback to localStorage
  const patientData = location.state?.patient || JSON.parse(localStorage.getItem("patientData"));

  if (!patientData) {
    return (
      <div className="text-center mt-10 text-red-600">
        Patient data not found. Please login again.
      </div>
    );
  }

  const patient = {
    name: patientData.name,
    uniqueId: patientData.uniqueId,
    email: patientData.email,
    phone: patientData.phone,
    userName: patientData.username,
    dob: patientData.dob,
    gender: patientData.gender,
    place: `${patientData.place}, ${patientData.city}, ${patientData.district}, ${patientData.state}, ${patientData.nation}`,
    photo: patientData.photo,
    experience: patientData.experience,
  };

  return (
    <DashboardLayout patient={patient}>
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
