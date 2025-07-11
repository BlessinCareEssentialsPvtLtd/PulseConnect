import React from "react";

const SuggestedTimes = ({
  selectedDoctor,
  selectedDate,
  appointments,
  onSelect,
  selectedTime, // new prop
}) => {
  // Generate half-hour slots from 10:00 AM to 10:00 PM (excluding 1 PM - 5 PM)
  const allSlots = [];

  for (let hour = 10; hour < 22; hour++) {
    if (hour >= 13 && hour < 17) continue;

    const hour12 = hour % 12 === 0 ? 12 : hour % 12;
    const suffix = hour < 12 ? "AM" : "PM";

    allSlots.push(`${hour12}:00 ${suffix}`);
    allSlots.push(`${hour12}:30 ${suffix}`);
  }

  // Get booked slots for selected doctor & date
  const bookedSlots = appointments
    .filter(
      (appt) =>
        appt.doctor === selectedDoctor &&
        appt.date ===
          (selectedDate instanceof Date
            ? selectedDate.toLocaleDateString("en-CA")
            : selectedDate) &&
        (appt.status === "Approved" || appt.status === "Pending" || appt.status === "Confirmed")
    )
    .map((appt) => appt.time);

  // Filter out booked slots
  const availableSlots = allSlots.filter((slot) => !bookedSlots.includes(slot));

  return (
    <div>
      <h4 className="text-gray-700 mb-2">Choose Time:</h4>
      <div className="flex flex-wrap gap-2">
        {availableSlots.length > 0 ? (
          availableSlots.map((slot) => (
            <button
              key={slot}
              onClick={() => onSelect(slot)}
              className={`px-3 py-1 rounded text-sm transition ${
                slot === selectedTime
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {slot}
            </button>
          ))
        ) : (
          <span className="text-red-500">No slots available</span>
        )}
      </div>
    </div>
  );
};

export default SuggestedTimes;
