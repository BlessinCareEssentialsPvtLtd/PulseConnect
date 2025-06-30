import React, { useState } from "react";
import { Calendar, momentLocalizer, Navigate } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const localizer = momentLocalizer(moment);

const CustomToolbar = ({ label, onNavigate }) => {

  return (
    <div className="flex justify-between items-center px-2 mb-2">
      <button
        onClick={() => onNavigate(Navigate.PREVIOUS)}
        className="p-2 rounded hover:bg-gray-200"
      >
        <ChevronLeft size={20} />
      </button>
      <h2 className="text-lg font-medium text-center">{label}</h2>
      <button
        onClick={() => onNavigate(Navigate.NEXT)}
        className="p-2 rounded hover:bg-gray-200"
      >
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

function Appointments( {events}) {

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedDayEvents, setSelectedDayEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  const handleSelectSlot = (slotInfo) => {
    const clickedDate = moment(slotInfo.start).startOf("day");
    const dayEvents = events.filter((event) =>
      moment(event.start).isSame(clickedDate, "day")
    );

    if (dayEvents.length > 0) {
      setSelectedDate(slotInfo.start);
      setSelectedDayEvents(dayEvents);
    } else {
      setSelectedDate(null);
      setSelectedDayEvents([]);
    }
  };


  return (
    <section className="mt-4 w-full z-[1] relative">
      <div className="bg-gray-100 rounded-xl shadow-xl p-4 md:p-6 max-w-full  mx-auto">
        <h2 className="text-xl sm:text-2xl font-medium font-sans my-4 ml-3">
          Appointments
        </h2>
        <div className="h-80 sm:h-67 md:min-h-70 min-[650px]:min-h-80 min-[1700px]:min-h-90">
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            selectable
            onSelectSlot={handleSelectSlot}
            defaultView="month"
            date={currentDate}
            onNavigate={(date) => setCurrentDate(date)}
            style={{ height: "100%", zIndex: 4 }}
            components={{
              toolbar: CustomToolbar,
            }}
            popup
            longPressThreshold={1}
          />
        </div>
      </div>

      {/* Popup for day appointments */}
      {selectedDate && selectedDayEvents.length > 0 && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
          <div className="bg-white rounded-xl shadow-xl p-6 w-[90%] max-w-md">
            <h3 className="text-lg font-bold mb-4">
              Appointments on {moment(selectedDate).format("MMMM Do YYYY")}
            </h3>
            <ul className="space-y-3">
              {selectedDayEvents.map((event, index) => (
                <li key={index} className="border-b pb-2">
                  <p className="font-semibold">{event.title}</p>
                  <p className="text-sm text-gray-600">{event.description}</p>
                  <p className="text-sm text-gray-500">
                    {moment(event.start).format("hh:mm A")} -{" "}
                    {moment(event.end).format("hh:mm A")}
                  </p>
                </li>
              ))}
            </ul>
            <div className="mt-5 text-right">
              <button
                onClick={() => {
                  setSelectedDate(null);
                  setSelectedDayEvents([]);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default Appointments;
