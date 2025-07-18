import { createBrowserRouter, RouterProvider } from "react-router";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import { ShowProfileProvider } from "./context/showProfileContext";
import PatientPage from "./components/PatientPage";

const AppRouter = () => {
  const [showProfileComponent, setShowProfileComponent] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/dashboard",
      element: (
        <>
          <Navbar />
          <Sidebar />
          <Dashboard />
        </>
      ),
    },
    {
      path: "/doctorDashboard",
      element: (
        <>
          <Navbar />
          {/* <Sidebar /> */}
          <DoctorDashboard />
        </>
      ),
    },
    {
      path: "/",

      element: (
        <>
          <Navbar />
          <PatientPage />
        </>
      ),
    },
    {
      path: "pulsescan/user/:userId",
      element: (
        <>
          <Navbar />
          <PatientPage />
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
