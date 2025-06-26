import {
  Dumbbell,
  Edit3Icon,
  FileText,
  Pill,
  QrCode,
  Send,
  Share2Icon,
  Users,
} from "lucide-react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Appointments from "../components/Appointments";

function Dashboard() {
  const timelineEvents = [
    {
      time: "10:20 - 11:29",
      title: "Consultation",
      location: "Floor 2, Room 32",
    },
    { time: "12:00 - 12:30", title: "X-Ray", location: "Floor 1, Room 5" },
    { time: "13:00 - 13:45", title: "Checkup", location: "Room 12" },
  ];

  return (
    <div className="relative flex flex-col md:flex-row gap-4 items-center md:items-start justify-around w-full mt-1 md:p-4">
      {/* Left Section */}
      <div className="flex-1 h-max md:min-h-full w-full md:w-[24rem] rounded-xl p-0 md:p-4 gap-4">
        <div className="p-2 text-left flex flex-col items-center md:items-start justify-center w-full">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-medium font-sans">
            Plus Card
          </h1>

          {/* Pulse Card */}
          <div className="mx-auto w-full h-max rounded-xl p-2 mt-4">
            <div className="border-2 border-blue-700 max-w-[40rem] rounded-t-2xl h-8 md:h-10" />
            <div className="border-2 border-blue-700 rounded-b-2xl max-w-[40rem] h-40 md:h-52 p-2">
              <div className="h-full w-full flex justify-between items-start p-2">
                <div className="w-[22%] h-full">
                  <div className="aspect-square h-16 md:h-20 bg-blue-400 rounded-full"></div>
                </div>
                <div className="w-[75%] h-full flex flex-col items-start justify-start">
                  <div>
                    <h2 className="text-lg md:text-xl font-semibold mb-1">
                      John Doe
                    </h2>
                    <h2 className="text-lg md:text-xl font-semibold">
                      ID:
                      <span className="text-blue-700 ml-2">JEKvkajb78w92r</span>
                    </h2>
                  </div>
                  <div className="flex items-start justify-between w-full mt-2">
                    <div className="flex flex-col items-start gap-1 w-2/3 truncate text-sm text-gray-600">
                      <h2>DOB: 24|06|1999</h2>
                      <h2>Gender: M</h2>
                      <h2>
                        Address: Name. Address. New York, NY 10003, USA. 2nd
                        Street Dorm.
                      </h2>
                    </div>
                    <div className="w-1/3 flex justify-center items-center">
                      <QrCode size={64} color="black" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex items-center justify-between p-2 mt-2">
              {/* Main Options */}
              <div className="flex items-center justify-around mt-4 gap-3">
                {[
                  {
                    icon: FileText,
                    label: "Records",
                  },
                  {
                    icon: Users,
                    label: "Family",
                  },
                  {
                    icon: Dumbbell,
                    label: "Fitness",
                  },
                  {
                    icon: Pill,
                    label: "Prescriptions",
                  },
                ].map(({ icon: Icon, label }, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center cursor-pointer"
                  >
                    <Icon size={20} className="md:hidden inline" />
                    <Icon size={30} className="hidden md:inline" />
                    <span className="text-sm md:text-base font-semibold mt-1">
                      {label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Share Buttons */}
              <div className="flex items-center justify-end mt-4 md:mt-6 gap-4">
                <Edit3Icon size={24} color="black" />
                <Send size={24} color="black" />
                <Share2Icon size={24} color="black" />
              </div>
            </div>
          </div>

          {/* Appointments */}
          <Appointments />
        </div>
      </div>

      {/* Right Section */}
      <div className="flex-1 h-max md:min-h-full flex items-start justify-center w-full md:w-[24rem] rounded-md">
        <div className="min-h-screen w-full p-5 rounded-xl">
          <h2 className="text-2xl my-3 font-semibold">Timeline</h2>
          <div className="w-full">
            {timelineEvents.map((event, i) => (
              <div key={i} className="flex w-full mb-4">
                <div className="flex w-[20%] flex-col items-center p-4 bg-gray-400 rounded-l-md">
                  {event.time.split(" - ").map((t, j) => (
                    <span key={j} className="text-sm md:text-xl">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex flex-col justify-center w-[80%] p-2 pl-[5%] bg-gray-200 rounded-r-md">
                  <h2 className="text-lg md:text-2xl">{event.title}</h2>
                  <p>{event.location}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Below cards Section */}
          <div className="w-full grid grid-cols-2 gap-4 mt-6">
            {[
              { title: "Records", desc: "3 New doctors added" },
              { title: "Prescription", desc: "3 New doctors added" },
              { title: "Family", desc: "3 New doctors added" },
              { title: "Fitness", desc: "3 New doctors added" },
              { title: "Family", desc: "3 New doctors added" },
              { title: "Fitness", desc: "3 New doctors added" },
            ].map((item, i) => (
              <div
                key={i}
                className="w-full flex flex-col bg-gray-300 rounded-md p-4"
              >
                <div className="flex">
                  <div className="w-12 h-12 m-4 bg-red-500"></div>
                  <div className="p-3 ml-3">
                    <div className="text-2xl font-semibold">{item.title}</div>
                    <div>History</div>
                  </div>
                </div>
                <div className="text-xl ml-3">{item.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
