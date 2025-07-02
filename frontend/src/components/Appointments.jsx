import React, { useState } from "react";
import { Calendar, momentLocalizer, Views } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { CalendarCheck, CalendarX2 } from "lucide-react";


const localizer = momentLocalizer(moment);

const Appointments = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  

  const events = [
    {
      title: "Demo Appointment with John",
      start: new Date(2025, 6, 3, 14, 0),
      end: new Date(2025, 6, 3, 15, 0),
    },
    {
      title: "Client Onboarding",
      start: new Date(2025, 6, 4),
      end: new Date(2025, 6, 4),
      allDay: true,
    },
  ];

  const getEventsForDate = (date) =>
    events.filter((event) => moment(event.start).isSame(moment(date), "day"));

  const handleCellClick = (slotInfo) => {
    setSelectedDate(slotInfo.start);
  };

  const selectedEvents = getEventsForDate(selectedDate);

  return (
    <div className="flex flex-wrap justify-evenly gap-4 ">
      {/* Calendar */}
      <section className="w-[250px] h-[250px] rounded-lg bg-[#f5fbff] p-2 ">
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          defaultView={Views.MONTH}
          views={{ month: true }}
          toolbar={false}
          selectable={true}
          onSelectSlot={handleCellClick}
          onSelectEvent={(event) => setSelectedDate(event.start)}
          date={currentDate}
          onNavigate={setCurrentDate}
          style={{ height: "100%", fontSize: "10px" }}
          dayPropGetter={(date) => {
            const hasEvent = events.some((e) => moment(e.start).isSame(date, "day"));
            return {
              style: {
                backgroundColor: hasEvent ? "#bfdbfe" : "transparent",
              },
            };
          }}
          className="compact-calendar"
        />
      </section>

      {/* Appointments */}
      <section className="w-[250px] h-[250px] rounded-lg bg-[#f5fbff]  p-3 overflow-y-auto text-[13px]">
        <h1 className="font-semibold text-base flex items-center gap-1">
          <CalendarCheck size={14} />
          Appointments
        </h1>
        <h2 className="font-semibold mt-1 mb-2 text-xs">
          {moment(selectedDate).format("MMMM D, YYYY")}
        </h2>

        {selectedEvents.length > 0 ? (
            <ul className="space-y-2">
              {selectedEvents.map((event, idx) => (
                <li
                  key={idx}
                  className="flex items-center gap-2 bg-white p-2 rounded shadow-sm"
                >
                  <CalendarCheck size={16} className="text-blue-600 mt-1" />
                  <p className="text-xs font-medium text-gray-800">{event.title}</p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="flex items-start gap-2 text-gray-600 bg-gray-100 p-3 rounded shadow-sm">
              <CalendarX2 size={18} className="mt-1 text-gray-500" />
              <p className="text-xs">
                No appointments on{" "}
                <span className="font-semibold text-gray-700">
                  {moment(selectedDate).format("MMMM D, YYYY")}
                </span>
              </p>
            </div>
          )}
      </section>
    </div>
  );
};

export default Appointments;
