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
      {/* Main content: Sidebar + Dashboard */}
      <div className="relative flex flex-1 overflow-hidden">
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
