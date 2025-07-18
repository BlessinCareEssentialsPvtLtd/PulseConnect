import React from "react";
import {
  User,
  Calendar,
  Phone,
  Mail,
  AlertCircle,
  FileText,
  Shield,
  MapPin,
  Clock,
} from "lucide-react";

const PatientPage = () => {
  return (
    <div className=" h-auto lg:h-screen bg-gray-50 overflow-hidden">
      {/* Navbar */}
      <div className="w-full h-16 bg-white shadow-sm border-b border-gray-200 flex items-center px-6">
        <h1 className="text-xl font-bold text-blue-800">HealthCare Portal</h1>
      </div>

      {/* Main Container */}
      <div className=" h-auto lg:h-[calc(100vh-4rem)] p-4">
        <div className="bg-white rounded-xl shadow-lg border border-blue-100 h-full overflow-hidden">
          <div className="p-4 h-full">
            <div className="flex flex-col lg:flex-row gap-4 h-full">
              {/* Left Section */}
              <div className="w-full lg:w-[35%] space-y-4">
                {/* Profile Card */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-100 to-blue-200 border-2 border-blue-300 flex items-center justify-center">
                      <User className="w-8 h-8 text-blue-800" />
                    </div>
                    <div className="flex-1 w-full text-center sm:text-left">
                      <h2 className="text-lg font-bold text-blue-800">
                        Sarah Johnson
                      </h2>
                      <p className="text-sm text-blue-600">
                        Patient ID: P-2024-001
                      </p>
                      <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-2 text-xs text-blue-700">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>Age: 34</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-3 h-3" />
                          <span>+1 555-0123</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-3 h-3" />
                          <span>New York, NY</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Access Controls */}
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
                  <h3 className="text-sm font-semibold text-blue-800 flex items-center gap-2">
                    <Shield className="w-4 h-4" />
                    Access Controls
                  </h3>

                  {/* Access Row 1 */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="bg-blue-800 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-blue-700 transition-colors">
                      Read Access
                    </button>
                    <select className="flex-1 bg-white border border-blue-300 px-2 py-1.5 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option>24 hours</option>
                      <option>1 week</option>
                      <option>1 month</option>
                    </select>
                    <button className="bg-white border border-blue-300 text-blue-800 px-3 py-1.5 rounded text-xs font-medium hover:bg-blue-50 transition-colors">
                      Request
                    </button>
                  </div>

                  {/* Access Row 2 */}
                  <div className="flex flex-col sm:flex-row gap-2">
                    <button className="bg-blue-800 text-white px-3 py-1.5 rounded text-xs font-medium hover:bg-blue-700 transition-colors">
                      Write Access
                    </button>
                    <select className="flex-1 bg-white border border-blue-300 px-2 py-1.5 rounded text-xs focus:outline-none focus:ring-1 focus:ring-blue-500">
                      <option>1 week</option>
                      <option>24 hours</option>
                      <option>1 month</option>
                    </select>
                    <button className="bg-white border border-blue-300 text-blue-800 px-3 py-1.5 rounded text-xs font-medium hover:bg-blue-50 transition-colors">
                      Request
                    </button>
                  </div>

                  {/* SOS Family Button */}
                  <button className="w-full bg-red-600 text-white px-4 py-2 rounded text-xs font-medium hover:bg-red-700 transition-colors flex items-center justify-center gap-2">
                    <AlertCircle className="w-3 h-3" />
                    SOS Family
                  </button>
                </div>
              </div>

              {/* Right Section */}
              <div className="w-full lg:w-[65%] flex flex-col">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex-1">
                  <h2 className="text-lg font-bold text-blue-800 mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Patient Details
                  </h2>

                  <div className="space-y-3 h-full">
                    {/* Allergies Section */}
                    <div className="bg-white border border-blue-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-4 h-4 text-red-600" />
                        <h3 className="text-sm font-semibold text-blue-800">
                          Allergies
                        </h3>
                      </div>
                      <div className="bg-red-50 border border-red-200 rounded p-2">
                        <div className="flex flex-wrap gap-1">
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                            Penicillin
                          </span>
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                            Shellfish
                          </span>
                          <span className="bg-red-100 text-red-800 px-2 py-1 rounded text-xs">
                            Latex
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Health Records Section */}
                    <div className="bg-white border border-blue-200 rounded-lg p-3 hover:shadow-sm transition-shadow flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="w-4 h-4 text-blue-600" />
                        <h3 className="text-sm font-semibold text-blue-800">
                          Health Records
                        </h3>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded p-3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Blood Type:</span>
                              <span className="font-medium">O+</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Height:</span>
                              <span className="font-medium">5'6"</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">Weight:</span>
                              <span className="font-medium">140 lbs</span>
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between">
                              <span className="text-gray-600">Last Visit:</span>
                              <span className="font-medium">Dec 15, 2024</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Next Appointment:
                              </span>
                              <span className="font-medium">Jan 20, 2025</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-600">
                                Primary Doctor:
                              </span>
                              <span className="font-medium">Dr. Smith</span>
                            </div>
                          </div>
                        </div>
                        <div className="mt-3 pt-2 border-t border-blue-200">
                          <p className="text-xs text-blue-600">
                            Recent: Annual checkup completed, vitals normal
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Insurance Section */}
                    <div className="bg-white border border-blue-200 rounded-lg p-3 hover:shadow-sm transition-shadow">
                      <div className="flex items-center gap-2 mb-2">
                        <Shield className="w-4 h-4 text-green-600" />
                        <h3 className="text-sm font-semibold text-blue-800">
                          Insurance
                        </h3>
                      </div>
                      <div className="bg-green-50 border border-green-200 rounded p-2">
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                          <div className="text-xs">
                            <p className="text-green-700 font-medium">
                              BlueCross BlueShield
                            </p>
                            <p className="text-green-600">
                              Policy: BC-2024-789456
                            </p>
                            <p className="text-green-600">
                              Status: Active • Expires: Dec 2025
                            </p>
                          </div>
                          <button className="bg-green-600 text-white px-3 py-1 rounded text-xs hover:bg-green-700 transition-colors">
                            View Details
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientPage;
