import React from 'react'
import Dashboard from './pages/Dashboard'
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import './App.css'

function App() {
 
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      {/* Main content: Sidebar + Dashboard */}
      <div className="relative flex flex-1 overflow-hidden">
        <Sidebar />
        <Dashboard />
      </div>
    </div>
  );

}

export default App
