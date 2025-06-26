import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const localizer = momentLocalizer(moment);

const CustomToolbar = ({ label, onNavigate }) => {
  return (
    <div className="flex justify-between items-center px-2 mb-2">
      <button onClick={() => onNavigate('PREV')} className="p-2 rounded hover:bg-gray-200">
        <ChevronLeft size={20} />
      </button>
      <h2 className="text-lg font-medium text-center">{label}</h2>
      <button onClick={() => onNavigate('NEXT')} className="p-2 rounded hover:bg-gray-200">
        <ChevronRight size={20} />
      </button>
    </div>
  );
};

function Appointments() {
  const [events, setEvents] = useState([
    {
      title: 'Doctor Appointment',
      start: new Date(2025, 5, 28, 10, 0),
      end: new Date(2025, 5, 28, 11, 0),
      description: 'Dr. Sharma at ABC Clinic',
    },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    startTime: '',
    endTime: '',
  });

  const handleSelectSlot = (slotInfo) => {
    setSelectedDate(slotInfo.start);
    setShowForm(true);
  };

  const handleFormChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { title, description, startTime, endTime } = formData;

    const start = new Date(selectedDate);
    const end = new Date(selectedDate);

    const [startHour, startMin] = startTime.split(':');
    const [endHour, endMin] = endTime.split(':');

    start.setHours(+startHour, +startMin);
    end.setHours(+endHour, +endMin);

    const newEvent = {
      title,
      start,
      end,
      description,
    };

    setEvents([...events, newEvent]);
    setShowForm(false);
    setFormData({ title: '', description: '', startTime: '', endTime: '' });
  };

  const handleEventClick = (event) => {
    alert(`Title: ${event.title}\nDescription: ${event.description}`);
  };

  return (
    <section className="p-4 w-full md:w-[60%]">
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 max-w-full md:max-w-[90%]  mx-auto">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Appointments</h2>
        <div className='h-60'>
          <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          selectable={true}
          onSelectSlot={handleSelectSlot}
          onSelectEvent={handleEventClick}
          defaultView="month"
          style={{ height: '100%' }}
          components={{
            toolbar: CustomToolbar,
          }}
          popup
          longPressThreshold={1}
        />
        </div>
      </div>

      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 z-50">
          <div className="bg-white p-8 rounded-lg shadow-xl w-[90%] md:w-[36rem] max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">New Appointment</h2>
            <form onSubmit={handleFormSubmit} className="flex flex-col gap-5">
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Enter title"
                  value={formData.title}
                  onChange={handleFormChange}
                  className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="flex flex-col">
                <label className="mb-1 font-medium text-gray-700">Description</label>
                <textarea
                  name="description"
                  placeholder="Optional notes or location"
                  value={formData.description}
                  onChange={handleFormChange}
                  rows={3}
                  className="border border-gray-300 p-3 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex gap-4">
                <div className="flex-1 flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">Start Time</label>
                  <input
                    type="time"
                    name="startTime"
                    value={formData.startTime}
                    onChange={handleFormChange}
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <label className="mb-1 font-medium text-gray-700">End Time</label>
                  <input
                    type="time"
                    name="endTime"
                    value={formData.endTime}
                    onChange={handleFormChange}
                    className="border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-5 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Add Appointment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}

export default Appointments;
