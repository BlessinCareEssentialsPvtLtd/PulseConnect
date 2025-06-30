import React, { useState } from "react";
import Dashboard from "./pages/Dashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import "./App.css";
import Fitness from "./components/Fitness";

function App() {
  const [showProfileComponent, setShowProfileComponent] = useState(false);

  const toggleProfileComponent = (value) => {
    setShowProfileComponent(value);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex flex-1 min-w-full bg-[#e9f8ff] h-[calc(100vh-64px)]">
        {/* Sidebar and Fitness components taking full height */}
        <Sidebar toggleProfileFunction={toggleProfileComponent} />
        <Fitness />
      </div>
    </div>
  );
}

export default App;
