import { useLocation } from "react-router-dom";

const PatientDashboard = () => {
  const location = useLocation();
  const { patient } = location.state || {};

  if (!patient) {
    return (
      <div className="text-center mt-10 text-red-500">
        No patient data found. Please login again.
      </div>
    );
  }

  const fieldOrder = [
    "name",
    "email",
    "phone",
    "gender",
    "dob",
    "uniqueId",
    "place",
    "city",
    "taluka",
    "district",
    "state",
    "nation"
  ];

  return (
    <div className="max-w-2xl mx-auto mt-10 p-8 shadow-lg rounded-xl bg-green-50">
      <h1 className="text-2xl font-bold mb-6 text-green-800 text-center">Patient Dashboard</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {fieldOrder.map((field) => (
          <div key={field} className="bg-white p-4 rounded shadow text-gray-700">
            <strong className="text-green-700 capitalize">{field}:</strong>{" "}
            <span>{patient[field]}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PatientDashboard;
