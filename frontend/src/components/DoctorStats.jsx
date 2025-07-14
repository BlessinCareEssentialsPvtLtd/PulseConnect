// src/components/DoctorStats.jsx
const DoctorStats = ({ doctor }) => (
  <div className="bg-white p-6 rounded-lg shadow-md space-y-4">
    <h3 className="text-xl font-semibold text-blue-700">Your Overview</h3>
    <div className="grid grid-cols-2 gap-4">
      {[
        ["Today's Appts", doctor.todayAppointments || 0],
        ["Total Patients", doctor.totalPatients || 0],
        ["Prescriptions", doctor.prescriptions || 0],
        ["Pending Requests", doctor.pendingRequests || 0],
      ].map(([label, value], i) => (
        <div key={i} className="bg-blue-50 p-4 rounded-md">
          <p className="text-sm text-gray-600">{label}</p>
          <p className="text-2xl font-bold text-blue-800">{value}</p>
        </div>
      ))}
    </div>
  </div>
);

export default DoctorStats;
