// src/components/Timeline.jsx
import { MapPin, Clock } from "lucide-react";

const timeline = [
  { time: "10:22 - 11:43", title: "Consultation", location: "Floor 2, Room 32" },
  { time: "12:00 - 12:30", title: "X-Ray", location: "Floor 1, Room 5" },
  { time: "13:15 - 13:45", title: "Check-up", location: "Room 12" },
];

const Timeline = () => {
  return (
    <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-200 h-full">
      <h2 className="text-xl font-semibold mb-5 text-blue-900">Today’s Timeline</h2>
      <div className="relative pl-4 border-l-2 border-blue-200 space-y-6">
        {timeline.map((item, index) => (
          <div key={index} className="relative flex gap-3 items-start group">
            <span className="absolute -left-[9px] top-1 w-3 h-3 bg-blue-600 rounded-full border-2 border-white shadow-md" />
            <div className="flex flex-col text-sm bg-blue-50 px-4 py-2 rounded-xl w-full border border-blue-100 hover:shadow-sm transition">
              <div className="flex items-center text-blue-700 font-medium mb-1 text-xs">
                <Clock size={14} className="mr-1" />
                {item.time}
              </div>
              <div>
                <p className="font-semibold text-gray-800">{item.title}</p>
                <p className="text-gray-500 flex items-center text-xs mt-1">
                  <MapPin size={12} className="mr-1" />
                  {item.location}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Timeline;
