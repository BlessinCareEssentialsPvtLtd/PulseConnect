import React from "react";
import { Calendar, User, FileText, Plus } from "lucide-react";

const MedicalRecord = () => {
  const records = [
    {
      id: 1,
      title: "Hypertension",
      date: "2024-06-15",
      doctor: "Dr. Smith",
      treatment: "Prescribed Lisinopril 10mg daily",
      notes: "Blood pressure: 140/90. Patient advised on lifestyle changes.",
    },
    {
      id: 2,
      title: "Annual Checkup",
      date: "2024-05-20",
      doctor: "Dr. Smith",
      treatment: "Routine blood work ordered",
      notes: "Overall health good. Recommended flu vaccination.",
    },
    {
      id: 3,
      title: "Upper Respiratory Infection",
      date: "2024-03-10",
      doctor: "Dr. Johnson",
      treatment: "Prescribed Amoxicillin 500mg",
      notes: "Symptoms: cough, fever, congestion. Follow-up in 1 week.",
    },
  ];

  return (
    <div className="w-full mx-auto p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">
          Medical Records History
        </h1>
        <button className="flex items-center gap-2 bg-blue-800 text-white px-4 py-2 rounded-lg hover:bg-blue-900 transition-colors">
          <Plus className="w-4 h-4" />
          Add New Record
        </button>
      </div>
      {/* Records List */}
      <div className="space-y-6">
        {records.map((record) => (
          <div
            key={record.id}
            className="bg-white rounded-lg shadow-sm border-l-4 border-blue-800 p-6"
          >
            {/* Record Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {record.title}
                </h3>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {record.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <User className="w-4 h-4" />
                    {record.doctor}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1 text-blue-800 text-sm font-medium">
                <FileText className="w-4 h-4" />
                Medical Record
              </div>
            </div>

            {/* Treatment Section */}
            <div className="mb-4">
              <h4 className="text-sm font-medium text-gray-700 mb-2">
                Treatment
              </h4>
              <p className="text-gray-900">{record.treatment}</p>
            </div>

            {/* Notes Section */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Notes</h4>
              <p className="text-gray-600">{record.notes}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicalRecord;