// src/layout/DashboardLayout.jsx
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";

const DashboardLayout = ({ children, patient }) => {
    

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar patient = {patient}/>
      <div className="flex-1 flex flex-col bg-[#e9f8ff]">
        <Navbar />
        <main className="p-4 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
