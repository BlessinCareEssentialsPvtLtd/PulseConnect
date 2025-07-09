import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import DashboardLayout from "../layout/DashboardLayout";
import DoctorProfileCard from "../components/DoctorProfileCard";
import DoctorStats from "../components/DoctorStats";
import DoctorAppointments from "../components/DoctorAppointments";
import HistoryTilesD from "../components/HistoryTilesD";

const DoctorDashboard = () => {
  const location = useLocation();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    const docData = location.state?.doctor;
    if (docData) {
      setDoctor(docData);
      localStorage.setItem("doctorData", JSON.stringify(docData));
    } else {
      const stored = localStorage.getItem("doctorData");
      if (stored) setDoctor(JSON.parse(stored));
    }
  }, [location.state]);

  if (!doctor) {
    return <div className="text-center mt-20 text-red-600">No doctor data found.</div>;
  }

  return (
    <DashboardLayout patient={doctor}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DoctorProfileCard doctor={doctor} />
        <DoctorStats doctor={doctor} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <DoctorAppointments doctorId={doctor.uniqueId} />
        <HistoryTilesD isDoctor={true} />
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;
