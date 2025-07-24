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
    // Generate initials for avatar
    const getInitials = (name) => {
        return name
            .split(' ')
            .map((n) => n[0])
            .join('')
            .toUpperCase();
    };
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
        <div className="w-full bg-white flex flex-col md:flex-row items-center md:items-stretch p-3 md:p-4 gap-3 md:gap-4 rounded-lg shadow hover:shadow-lg border border-gray-200 transition-all duration-200">
            {/* Avatar */}
            <div className="flex-shrink-0 flex items-center justify-center w-14 h-14 md:w-20 md:h-20 rounded-full bg-blue-100 border border-blue-300 text-blue-700 font-bold text-xl md:text-2xl">
                {getInitials(name)}
            </div>
            {/* Info */}
            <div className="flex-1 flex flex-col md:flex-row w-full gap-2 md:gap-8 justify-between items-center md:items-center">
                <div className="flex flex-col gap-1 text-center md:text-left">
                    <p className="text-black text-base font-semibold flex items-center gap-1 justify-center md:justify-start">
                        <Fingerprint size={16} strokeWidth={1.5} /> Pulse ID: {pulseId}
                    </p>
                    <p className="text-black text-base font-medium flex items-center gap-1 justify-center md:justify-start">
                        <User size={16} strokeWidth={1.5} /> {name}
                    </p>
                    <p className="text-gray-600 text-sm flex items-center gap-1 justify-center md:justify-start">
                        <Users size={14} strokeWidth={1.5} /> {relation}
                    </p>
                </div>
                <div className="flex flex-col gap-1 text-center md:text-left">
                    <p className="text-gray-700 text-sm flex items-center gap-1 justify-center md:justify-start">
                        <Calendar size={14} strokeWidth={1.5} /> Age: {age}
                    </p>
                    <p className="text-gray-700 text-sm flex items-center gap-1 justify-center md:justify-start">
                        <VenetianMask size={14} strokeWidth={1.5} /> Gender: {gender}
                    </p>
                    <p className="text-gray-700 text-sm flex items-center gap-1 justify-center md:justify-start">
                        <Droplet size={14} strokeWidth={1.5} /> Blood: {bloodGroup}
                    </p>
                </div>
            </div>
            {/* Show button */}
            <div className="flex items-center mt-2 md:mt-0">
                <button
                    onClick={handleShow}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md cursor-pointer hover:bg-blue-500 transition duration-200 shadow"
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
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 px-2 md:px-0"
            onClick={onClose}
        >
            <div
                className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md text-black relative max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close icon */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 text-gray-400 hover:text-blue-600 text-xl font-bold"
                    aria-label="Close"
                >
                    ×
                </button>
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
                    className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-md w-full hover:bg-blue-500 cursor-pointer transition duration-200"
                >
                    Close
                </button>
            </div>
        </div>
    );
}
// Main Component
function Family() {
    const [selectedMember, setSelectedMember] = useState(null);
    const [search, setSearch] = useState("");
    // Demo data (replace with real data in future)
    const members = [
        {
            name: "Mr. Smith",
            relation: "Brother",
            pulseId: "12345",
            age: "40",
            gender: "Male",
            bloodGroup: "A+",
            contact: "+91-9999999999",
            address: "123 Main Street, City",
        },
        {
            name: "Mrs. Linda",
            relation: "Mother",
            pulseId: "67890",
            age: "62",
            gender: "Female",
            bloodGroup: "B+",
            contact: "+91-8888888888",
            address: "456 Park Lane, City",
        },
    ];
    // Filter members by search
    const filteredMembers = members.filter((m) =>
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.relation.toLowerCase().includes(search.toLowerCase()) ||
        m.pulseId.includes(search)
    );
    const handleShow = (memberData) => {
        setSelectedMember(memberData);
    };
    const handleClose = () => {
        setSelectedMember(null);
    };
    return (
        <div className="min-h-screen w-full max-w-full overflow-x-hidden bg-gray-100 flex flex-col items-center md:items-start md:flex-row md:justify-center md:p-8 p-2 relative">
            {/* Main content */}
            <div className="w-full max-w-full flex flex-col items-center gap-4">
                {/* Search bar and Add button */}
                <div className="w-full max-w-full flex gap-2 items-center mb-2 px-0 md:px-0">
                    <input
                        type="text"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        placeholder="Search by name, relation, or Pulse ID..."
                        className="flex-1 min-w-0 px-4 py-2 border border-gray-300 rounded-lg shadow focus:outline-none focus:ring-2 focus:ring-blue-400 bg-white text-black"
                    />
                    <button
                        className="hidden md:block px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-500 transition duration-200"
                    >
                        Add
                    </button>
                </div>
                {/* Family Member Cards */}
                <div className="w-full max-w-full flex flex-col gap-4">
                    <h1 className="text-black font-semibold text-2xl mb-2">Family Members</h1>
                    {filteredMembers.length === 0 ? (
                        <div className="text-gray-500 text-center py-8">No family members found.</div>
                    ) : (
                        filteredMembers.map((member, idx) => (
                            <FamilyMemberBlock key={idx} {...member} onShow={handleShow} />
                        ))
                    )}
                </div>
            </div>
            {/* Floating Add button for mobile */}
            <button
                className="md:hidden fixed bottom-6 right-6 bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-3xl shadow-lg hover:bg-blue-500 transition duration-200 z-50"
                aria-label="Add family member"
            >
                +
            </button>
            {/* Popup Modal */}
            <MemberPopup member={selectedMember} onClose={handleClose} />
        </div>
    );
}

export default Family;
