import React, { useState } from "react";

const steps = [1, 2, 3];

function CompleteProfile() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    age: "",
    gender: "",
    bloodGroup: "",
    allergies: "",
    conditions: "",
    occupation: "",
    emergencyContact: "",
    notes: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const nextStep = () => {
    if (step < steps.length - 1) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 0) setStep(step - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Full Name
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Age</label>
              <input
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl"
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
          </div>
        );

      case 1:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Blood Group
              </label>
              <input
                name="bloodGroup"
                value={formData.bloodGroup}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Allergies
              </label>
              <input
                name="allergies"
                value={formData.allergies}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 text-sm font-medium">
                Previous Conditions
              </label>
              <textarea
                name="conditions"
                rows={3}
                value={formData.conditions}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 text-sm font-medium">
                Occupation
              </label>
              <input
                name="occupation"
                value={formData.occupation}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Emergency Contact
              </label>
              <input
                name="emergencyContact"
                value={formData.emergencyContact}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 text-sm font-medium">Notes</label>
              <textarea
                name="notes"
                rows={3}
                value={formData.notes}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl"
              />
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="flex justify-between items-center mb-4 w-full max-w-2xl rounded-xl shadow-xl bg-white px-8 p-4">
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`flex flex-col items-center flex-1 text-sm font-medium py-2 border-b-4 cursor-pointer `}
          >
            <div
              className={`h-10 w-10 bg-gray-200 flex items-center justify-center border-2 border-white rounded-full mb-1 ${
                step === i
                  ? "border-indigo-600 text-indigo-600"
                  : "border-transparent text-gray-400 hover:text-indigo-400"
              }`}
            >
              {i + 1}
            </div>
            {/* <span className="text-xs">{s}</span> */}
          </button>
        ))}
      </div>
      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 space-y-6">
        {/* Step Progress Bar */}

        {/* Step Content */}
        <form className="space-y-6">{renderStep()}</form>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={step === 0}
            className="px-6 py-2 rounded-xl bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:opacity-50"
          >
            Previous
          </button>

          {step < steps.length - 1 ? (
            <button
              onClick={nextStep}
              className="px-6 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700"
            >
              Next
            </button>
          ) : (
            <button
              onClick={() => console.log("Submit:", formData)}
              className="px-6 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
            >
              Submit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CompleteProfile;
