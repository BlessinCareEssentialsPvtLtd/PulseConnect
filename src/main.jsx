import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import DoctorSignup from './pages/DoctorSignup';
import VerifyOTP from './pages/VerifyOTP';
import DoctorLogin from './pages/DoctorLogin';
import './index.css';


import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/doctor-signup" element={<DoctorSignup />} />
        <Route path="/verify-otp" element={<VerifyOTP />} />
        <Route path="/login/doctor" element={<DoctorLogin />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
