import React, { useState } from "react";
import {
  User,
  Users,
  Fingerprint,
  Calendar,
  VenetianMask,
  Droplet,
  Phone,
  MapPin,
} from "lucide-react";

// Reusable Component for Each Family Member Block
function FamilyMemberBlock({
  name,
  relation,
  pulseId,
  age,
  gender,
  bloodGroup,
  contact,
  address,
  onShow,
}) {
  const handleShow = () => {
    onShow({
      name,
      relation,
      pulseId,
      age,
      gender,
      bloodGroup,
      contact,
      address,
    });
  };

  return (
    <div className="h-[20%] w-full bg-white shadow-2xl flex md:p-4 p-2 md:gap-2 border border-gray-200">
      <div className="w-full h-full flex justify-between items-center">
        {/* Left section */}
        <div className="w-full h-full flex justify-start items-center p-[1%] gap-2">
          <div className="h-[100%] aspect-square bg-white p-4 rounded-full border border-gray-200"></div>
          <div className="w-full h-full bg-white flex flex-col justify-center p-2 space-y-1">
            <p className="text-black text-sm font-medium flex items-center gap-1">
              <Fingerprint size={14} strokeWidth={1.5} />
              Pulse ID: {pulseId}
            </p>
            <p className="text-black text-sm font-medium flex items-center gap-1">
              <User size={14} strokeWidth={1.5} />
              Name: {name}
            </p>
            <p className="text-black text-sm flex items-center gap-1">
              <Users size={14} strokeWidth={1.5} />
              Relation: {relation}
            </p>
          </div>
        </div>

        {/* Right section */}
        <div className="w-full h-full flex justify-start items-center p-[1%] gap-2 ">
          <div className="w-full h-full bg-white flex flex-col justify-center p-2 space-y-1">
            <p className="text-black text-sm flex items-center gap-1">
              <Calendar size={14} strokeWidth={1.5} />
              Age: {age}
            </p>
            <p className="text-black text-sm flex items-center gap-1">
              <VenetianMask size={14} strokeWidth={1.5} />
              Gender: {gender}
            </p>
            <p className="text-black text-sm flex items-center gap-1">
              <Droplet size={14} strokeWidth={1.5} />
              Blood Group: {bloodGroup}
            </p>
          </div>
        </div>
      </div>

      {/* Show button */}
      <div className="h-full flex justify-start items-center p-[1%] gap-2 ">
        <button
          onClick={handleShow}
          className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-500 transition duration-200"
        >
          Show
        </button>
      </div>
    </div>
  );
}

// Popup Modal for Member Details
function MemberPopup({ member, onClose }) {
  if (!member) return null;

  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-2xl w-[90%] max-w-md text-black"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4 text-center">
          Member Details
        </h2>
        <div className="space-y-2 text-sm">
          <p className="flex items-center gap-2">
            <User size={16} strokeWidth={1.5} />
            <strong>Name:</strong> {member.name}
          </p>
          <p className="flex items-center gap-2">
            <Users size={16} strokeWidth={1.5} />
            <strong>Relation:</strong> {member.relation}
          </p>
          <p className="flex items-center gap-2">
            <Fingerprint size={16} strokeWidth={1.5} />
            <strong>Pulse ID:</strong> {member.pulseId}
          </p>
          <p className="flex items-center gap-2">
            <Calendar size={16} strokeWidth={1.5} />
            <strong>Age:</strong> {member.age}
          </p>
          <p className="flex items-center gap-2">
            <VenetianMask size={16} strokeWidth={1.5} />
            <strong>Gender:</strong> {member.gender}
          </p>
          <p className="flex items-center gap-2">
            <Droplet size={16} strokeWidth={1.5} />
            <strong>Blood Group:</strong> {member.bloodGroup}
          </p>
          <p className="flex items-center gap-2">
            <Phone size={16} strokeWidth={1.5} />
            <strong>Contact:</strong> {member.contact}
          </p>
          <p className="flex items-center gap-2">
            <MapPin size={16} strokeWidth={1.5} />
            <strong>Address:</strong> {member.address}
          </p>
        </div>
        <button
          onClick={onClose}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md w-full hover:bg-blue-500"
        >
          Close
        </button>
      </div>
    </div>
  );
}

// Main Component
function FamilyCorner() {
  const [selectedMember, setSelectedMember] = useState(null);

  const handleShow = (memberData) => {
    setSelectedMember(memberData);
  };

  const handleClose = () => {
    setSelectedMember(null);
  };

  return (
    <div className="min-h-screen w-full bg-gray-200 flex justify-center md:p-4 p-2">
      {/* Left side */}
      <div className="w-[70%] md:p-4 flex flex-col items-center justify-center gap-4">
        {/* Search bar */}
        <div className="text-white h-[6%] w-full flex justify-end">
          <div className="h-full w-[60%] px-2 flex items-center text-black">
            <input
              type="text"
              placeholder="Search..."
              className="w-full h-full px-4 py-1 border border-gray-300 outline-none rounded-sm focus:outline-none focus:ring-1 focus:ring-blue-500 shadow-2xl bg-white"
            />
          </div>
          <div className="h-full w-[20%]">
            <button className="h-full w-full cursor-pointer bg-blue-600 hover:bg-blue-500 font-semibold shadow-2xl">
              Search
            </button>
          </div>
        </div>

        {/* Family Member Cards */}
        <div className="text-white h-full w-full bg-white shadow-2xl md:p-4 p-2 flex flex-col gap-y-2 rounded-xl">
          <h1 className="text-black font-semibold mb-2">Family Members</h1>
          <FamilyMemberBlock
            name="Mr. Smith"
            relation="Brother"
            pulseId="12345"
            age="40"
            gender="Male"
            bloodGroup="A+"
            contact="+91-9999999999"
            address="123 Main Street, City"
            onShow={handleShow}
          />
          <FamilyMemberBlock
            name="Mrs. Linda"
            relation="Mother"
            pulseId="67890"
            age="62"
            gender="Female"
            bloodGroup="B+"
            contact="+91-8888888888"
            address="456 Park Lane, City"
            onShow={handleShow}
          />
        </div>
      </div>

      {/* Right side (optional sidebar) */}
      <div className="w-[30%] md:p-4 pl-2 text-black">
        <div className="w-full h-full bg-white rounded-xl shadow-2xl md:p-4 p-2">
          <h1 className="text-black font-semibold mb-2">Family Corner</h1>
        </div>
      </div>

      {/* Popup Modal */}
      <MemberPopup member={selectedMember} onClose={handleClose} />
    </div>
  );
}

export default FamilyCorner;
