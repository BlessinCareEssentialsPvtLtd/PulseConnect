import { useLocation } from "react-router-dom";


const DoctorDashboard = () => {
  const location = useLocation();
  const { doctor } = location.state || {};

  console.log("Location state:", location.state);

  
  if (!doctor) {
    return <div className="text-center mt-10 text-red-500">No doctor data found.</div>;
  }

  const fieldOrder = [
    "name", "email", "gender", "specialization", "dob",
    "uniqueId", "place", "city", "taluka", "district", "state", "nation"
  ];


  return (
   <div className="max-w-2xl mx-auto mt-10 p-8 shadow-lg rounded-xl bg-blue-50">
      <h1 className="text-2xl font-bold mb-6 text-blue-800 text-center">Doctor Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fieldOrder.map((field) => (
          <div key={field} className="bg-white p-4 rounded shadow text-gray-700">
            <strong className="text-blue-700 capitalize">{field}:</strong>{" "}
            <span>{doctor[field]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorDashboard;
