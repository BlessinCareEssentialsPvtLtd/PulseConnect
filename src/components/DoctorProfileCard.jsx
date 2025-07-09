import { FaCheckCircle } from "react-icons/fa";
import { MdCancel } from "react-icons/md";
import tickImg from "../assets/image.png"
const DoctorProfileCard = ({ doctor }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow border border-blue-200">
      <div className="flex items-center gap-4">
        <img
          src={doctor.photo}
          alt="Doctor"
          className="w-20 h-20 rounded-full object-cover border-2 border-blue-300"
        />
        <div>
          <h2 className="text-xl font-semibold text-blue-700 flex items-center gap-2">
            {doctor.name}
            {doctor.isVerified ? (
              <img src={tickImg} width={20}/>
            ) : (
              <MdCancel className="text-red-500" title="Not Verified" />
            )}
          </h2>
          <p className="text-gray-700">{doctor.specialization}</p>
          <p className="text-sm text-gray-500">{doctor.degree}</p>
        </div>
      </div>
      <div className="mt-4 space-y-1 text-sm text-gray-700">
        <p><strong>Email:</strong> {doctor.email}</p>
        <p><strong>Experience:</strong> {doctor.experience} years</p>
        <p><strong>Doctor ID:</strong> {doctor.uniqueId}</p>
        <p><strong>Location:</strong> {doctor.place}, {doctor.city}, {doctor.taluka}</p>
        <p><strong>District:</strong> {doctor.district}</p>
        <p><strong>State:</strong> {doctor.state}, {doctor.nation}</p>
      </div>
    </div>
  );
};

export default DoctorProfileCard;
