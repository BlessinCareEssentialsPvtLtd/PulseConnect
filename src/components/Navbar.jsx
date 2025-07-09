import { useEffect, useState } from "react";
import {  Search, LogOut, AlertTriangle, Bell, Sun, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { div } from "framer-motion/client";
import blueTick from '../assets/image.png';

const Navbar = () => {
  const navigate = useNavigate();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState(null); // 👈 for modal
  const [showModal, setShowModal] = useState(false); // 👈 control popup


  // Debounced search function
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (query.trim().length > 0) {
        axios
          .get(`/api/auth/doctors?search=${query}`)
          .then((res) => {
  if (Array.isArray(res.data)) {
    setResults(res.data);
  } else {
    setResults([]);
    console.error("Expected array but got:", res.data);
  }
  setShowDropdown(true);
})

          .catch((err) => {
            console.error(err);
            setResults([]);
          });
      } else {
        setResults([]);
        setShowDropdown(false);
      }
    }, 300); // delay to reduce API hits

    return () => clearTimeout(delayDebounce);
  }, [query]);

  const handleLogout = () => {
    navigate("/");
  };

 const handleSelectDoctor = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
    setQuery("");
    setShowDropdown(false);
  };

  return (
  <>
    <header className="w-full h-auto bg-white flex flex-col sm:flex-row items-center justify-between px-4 sm:px-6 border-b shadow-sm sticky top-0 z-50 py-2">
      
      {/* Search bar */}
      <div className="relative w-full sm:w-1/2 max-w-md mb-2 sm:mb-0">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search doctor by name..."
          className="bg-blue-50 pl-10 pr-4 py-2 rounded-full text-sm w-full border border-blue-100 focus:ring-2 ring-blue-200 outline-none placeholder:text-sm"
        />
        <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />

        {/* Dropdown */}
       {showDropdown && (
  <ul className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-md max-h-60 overflow-auto">
    {results.length > 0 ? (
      results.map((doctor) => (
        <li
          key={doctor._id}
          onClick={() => handleSelectDoctor(doctor)}
          className="px-4 py-2 hover:bg-blue-50 cursor-pointer text-sm"
        >
          {doctor.name}
        </li>
      ))
    ) : (
      <li className="px-4 py-2 text-gray-500 text-sm">No doctors found</li>
    )}
  </ul>
)}

      </div>

      {/* Right icons */}
      <div className="flex items-center space-x-4 sm:space-x-6 mt-1 sm:mt-0">
        <button title="Alerts" className="text-blue-700 hover:text-blue-900 transition">
          <AlertTriangle size={20} />
        </button>
        <button title="Notifications" className="text-blue-700 hover:text-blue-900 transition">
          <Bell size={20} />
        </button>
        <button title="Toggle Theme" className="text-blue-700 hover:text-blue-900 transition">
          <Sun size={20} />
        </button>
        <button
          onClick={handleLogout}
          className="flex items-center gap-1 bg-red-100 hover:bg-red-200 text-red-600 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition"
        >
          <LogOut size={16} />
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>
    </header>

     {/* ================================
          Doctor Info Modal
        ================================= */}
{showModal && selectedDoctor && (
  <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-xl shadow-2xl w-[95%] max-w-2xl relative p-6">
      {/* Close Button */}
      <button
        onClick={() => setShowModal(false)}
        className="absolute top-4 right-4 text-gray-400 hover:text-red-500"
      >
        ✕
      </button>

      {/* Doctor Header */}
      <div className="flex items-center gap-6 border-b pb-4">
        <img
          src={selectedDoctor.photo}
          alt="Doctor"
          className="w-24 h-24 rounded-lg object-cover border-2 border-blue-500"
        />
        <div>
          <h2 className="text-2xl font-bold text-blue-800">{selectedDoctor.name}  {selectedDoctor.isVerified === true ? (
    <img
      src={blueTick}
      alt="Verified"
      className="inline-block w-5 h-5 ml-2 align-middle"
    />
  ) : (
    <span
      className="inline-block w-3 h-3 ml-2 rounded-full bg-red-500 align-middle"
      title="Not Verified"
    />
  )}</h2>
          <p className="text-sm text-gray-700">{selectedDoctor.degree}</p>
          <p className="text-sm text-gray-700">{selectedDoctor.email}</p>
          <p className="text-sm text-gray-700">
            <strong>Specialization:</strong> {selectedDoctor.specialization || "N/A"}
          </p>
        </div>
      </div>

      {/* Details Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6 text-center">
        <div className="bg-blue-50 rounded-md p-3">
          <p className="text-sm text-gray-500">Experience</p>
          <p className="font-semibold text-blue-800">{selectedDoctor.experience || "N/A"} years</p>
        </div>
        <div className="bg-blue-50 rounded-md p-3">
          <p className="text-sm text-gray-500">Doctor ID</p>
          <p className="font-semibold text-blue-800">{selectedDoctor.uniqueId}</p>
        </div>
        <div className="bg-blue-50 rounded-md p-3 col-span-2 sm:col-span-2">
          <p className="text-sm text-gray-500">Address</p>
          <p className="font-semibold text-blue-800">
            {selectedDoctor.place}
          </p>
        </div>
      </div>

      {/* Close Button */}
      <div className="mt-6 flex justify-end">
        <button
          onClick={() => setShowModal(false)}
          className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}


    </>

  );
};

export default Navbar;
