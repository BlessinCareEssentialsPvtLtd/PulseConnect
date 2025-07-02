// src/components/PulseCard.jsx
import { Edit3, Send, Share2 } from "lucide-react";

const PulseCard = ({ patient }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-start sm:items-center w-full border border-blue-100 hover:shadow-lg transition duration-300">

      {/* Left Side: Patient Info */}
      <div className="flex items-start sm:items-center gap-5 flex-1">
        {/* Profile Image */}
        {patient?.photo ? (
          <img
            src={patient.photo}
            alt="Patient"
            className="w-20 h-20 rounded-full object-cover border-4 border-blue-200"
          />
        ) : (
          <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center text-white text-xl font-semibold">
            ?
          </div>
        )}

        {/* Text Info */}
        <div className="text-sm sm:text-base space-y-1">
          <h2 className="font-semibold text-lg text-blue-900">{patient?.name || "John Doe"}</h2>
          <p><span className="font-medium text-gray-600">ID:</span> <span className="text-blue-700">{patient?.uniqueId || "JEKvkajb78w92r"}</span></p>
          <p><span className="font-medium text-gray-600">DOB:</span> {patient?.dob || "1999-06-24"}</p>
          <p><span className="font-medium text-gray-600">Gender:</span> {patient?.gender || "M"}</p>
          <p className="text-gray-700">
            <span className="font-medium text-gray-600">Address:</span>{" "}
            {patient?.place || "2nd Street Dorm, NY, USA"}
          </p>
        </div>
      </div>

      {/* Right Side: Vertical Action Icons */}
      <div className="flex sm:flex-col gap-4 sm:ml-6 mt-4 sm:mt-0">
        <button className="hover:text-blue-600 text-gray-500 transition" title="Edit">
          <Edit3 size={20} />
        </button>
        <button className="hover:text-blue-600 text-gray-500 transition" title="Send">
          <Send size={20} />
        </button>
        <button className="hover:text-blue-600 text-gray-500 transition" title="Share">
          <Share2 size={20} />
        </button>
      </div>
    </div>
  );
};

export default PulseCard;
