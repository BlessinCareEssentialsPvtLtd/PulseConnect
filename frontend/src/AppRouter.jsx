import { createBrowserRouter, RouterProvider } from "react-router";
import { useState } from "react";
import Dashboard from "./pages/Dashboard";
import DoctorDashboard from "./pages/DoctorDashboard";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

const AppRouter = () => {
  const [isUser, setIsUser] = useState(false); // you can toggle this somehow in real app

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
  ]);

  return <RouterProvider router={router} />;
};

export default AppRouter;
