import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();
   

    const goToLogin = () => {
        navigate("/login/doctor");
    }

    const goToSignup = () => {
        navigate("singup/doctor");
    }

  return (
   <div className="max-w-md mx-auto mt-10 p-6 shadow-lg rounded-xl bg-white text-center">
    <h2 className="text-2xl font-bold mb-4 text-blue-800">This is Home Pages</h2>
    <div className="flex flex-col gap-4">
        <button
            onClick={goToLogin}
            className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
        >
            Login Doctor
        </button>
        <button
            onClick={goToSignup}
            className="bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
        >
            Signup Doctor
        </button>
    </div>
   </div>
    
  );
};

export default HomePage;
