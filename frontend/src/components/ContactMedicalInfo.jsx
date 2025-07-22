import React from "react";
import { Phone, Mail, MapPin, User } from "lucide-react";

const ContactMedicalInfo = ({ patient }) => {
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Contact Information Section */}
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Contact Information
          </h2>

          <div className="space-y-6">
            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Phone className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Phone</p>
                <p className="text-gray-900">{patient.emergencyContact}</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <Mail className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">Email</p>
                <p className="text-gray-900">{patient.email}</p>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <MapPin className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Address
                </p>
                <p className="text-gray-900">{patient.address}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Emergency Contact and Medical Information Section */}
        <div className="space-y-8">
          {/* Emergency Contact */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Emergency Contact
            </h2>

            <div className="flex items-center gap-4">
              <div className="flex-shrink-0">
                <User className="w-5 h-5 text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-medium text-gray-700 mb-1">
                  Emergency Contact
                </p>
                <p className="text-gray-900">{patient.emergencyContact}</p>
              </div>
            </div>
          </div>

          {/* Medical Information */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Medical Information
            </h2>

            <div className="space-y-4">
              {/* Blood Type */}
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Blood Type:</span>
                <span className="text-gray-900 font-medium">
                  {patient.bloodGroup}
                </span>
              </div>

              {/* Status */}
              <div className="flex justify-between items-center">
                <span className="text-gray-700">Status:</span>
                <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactMedicalInfo;
