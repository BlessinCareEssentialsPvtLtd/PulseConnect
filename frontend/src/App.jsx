import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  const [showProfileComponent, setShowProfileComponent] = useState(false);

  const toggleProfileComponent = (value) => {
    setShowProfileComponent(value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex p-4 min-w-full bg-[#e9f8ff]">
        {/* Main content: Sidebar + Dashboard */}
        <Sidebar toggleProfileFunction={toggleProfileComponent} />
        <Dashboard
          showProfile={showProfileComponent}
          toggleProfileFunction={toggleProfileComponent}
        />
      </div>
    </div>
  );
}

export default App;
