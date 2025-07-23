// src/context/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(() => localStorage.getItem("token"));
    const [role, setRole] = useState(() => localStorage.getItem("role"));
    const [user, setUser] = useState(() => {
        const saved = localStorage.getItem("docData") || localStorage.getItem("patientData");
        return saved ? JSON.parse(saved) : null;
    });

    // Keep localStorage in sync with context state
    useEffect(() => {
        if (token && role && user) {
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);
            if (role === "doctor") {
                localStorage.setItem("doctorData", JSON.stringify(user));
                localStorage.removeItem("patientData");
            } else {
                localStorage.setItem("patientData", JSON.stringify(user));
                localStorage.removeItem("doctorData");
            }
        } else {
            localStorage.removeItem("token");
            localStorage.removeItem("role");
            localStorage.removeItem("doctorData");
            localStorage.removeItem("patientData");
        }
    }, [token, role, user]);

    const login = (newToken, newRole, newUser) => {
        setToken(newToken);
        setRole(newRole);
        setUser(newUser);
    };

    const logout = () => {
        setToken(null);
        setRole(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ token, role, user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
