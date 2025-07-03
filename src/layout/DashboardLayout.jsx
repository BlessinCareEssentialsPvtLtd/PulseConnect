// src/layout/DashboardLayout.jsx
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children, patient }) => {
  return (
    <div className="flex flex-col md:flex-row h-screen bg-[#e9f8ff] overflow-hidden">
      
      {/* Sidebar visible on all screens (adapts layout inside Sidebar.jsx) */}
      <Sidebar patient={patient} />

      <div className="flex-1 flex flex-col w-full h-full pb-16 md:pb-0"> {/* pb-16 for space under bottom navbar */}
        <Navbar />
        <main className="flex-1 p-4 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
