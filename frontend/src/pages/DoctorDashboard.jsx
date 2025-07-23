import { useEffect, useState } from "react";
import DashboardLayout from "../layout/DashboardLayout";
import DoctorProfileCard from "../components/DoctorProfileCard";
import DoctorStats from "../components/DoctorStats";
import DoctorAppointments from "../components/DoctorAppointments";
import HistoryTilesD from "../components/HistoryTilesD";
import PatientRequests from "../components/PatientRequests";
import { useAuth } from "../context/Authcontext";

const DoctorDashboard = () => {
  const { user } = useAuth();
  const [doctor, setDoctor] = useState(null);

  useEffect(() => {
    if (user) {
      setDoctor(user);
    }
  }, [user]);

  if (!doctor) {
    return <div className="text-center mt-20 text-red-600">No doctor data found.</div>;
  }

  return (
    <DashboardLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DoctorProfileCard doctor={doctor} />
        <DoctorStats doctor={doctor} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        <DoctorAppointments doctorId={doctor.uniqueId} />
        <PatientRequests doctor={doctor} />
      </div>
    </DashboardLayout>
  );
};

export default DoctorDashboard;

