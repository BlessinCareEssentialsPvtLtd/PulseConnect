import { createBrowserRouter, RouterProvider } from "react-router";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { ShowProfileProvider } from "./context/showProfileContext";

const AppRouter = () => {
  const [isUser, setIsUser] = useState(true); // you can toggle this somehow in real app

  const [showProfileComponent, setShowProfileComponent] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: isUser ? (
        <>
          <Navbar />
          <Sidebar />
          <Dashboard />
        </>
      ) : (
        <>
          <Navbar />
          <Sidebar />
          <DoctorDashboard />
        </>
      ),
    },
    {
      path: "/dashboard",
      element: (
        <>
          <Navbar />
          <Sidebar />
          <DoctorDashboard />
        </>
      ),
    },
  ]);

  return (
    <ShowProfileProvider
      value={{ showProfileComponent, setShowProfileComponent }}
    >
      <RouterProvider router={router} />
    </ShowProfileProvider>
  );
};

export default AppRouter;
