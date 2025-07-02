import React, { useState, useEffect } from "react";
import statesAndDistrictsData from "../data/statesAndDistricts.json";

const steps = ["Personal", "Medical", "Other"];

function CompleteProfile() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    state: "",
    district: "",
    address: "",
    pinCode: "",
    dateOfBirth: "",
    emergencyContact: "",
    gender: "",
    bloodGroup: "",
    height: "",
    weight: "",
    allergies: "",
    conditions: "",
    occupation: "",
    notes: "",
  });

  const [districtOptions, setDistrictOptions] = useState([]);
  const [statesAndDistricts, setStatesAndDistricts] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    setStatesAndDistricts(statesAndDistrictsData);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "state") {
      setDistrictOptions(statesAndDistricts[value] || []);
      setFormData((prev) => ({ ...prev, state: value, district: "" }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateStep = () => {
    const requiredFieldsByStep = {
      0: [
        "fullName",
        "contactNumber",
        "email",
        "state",
        "district",
        "address",
        "pinCode",
        "dateOfBirth",
        "emergencyContact",
        "gender",
      ],
      1: ["bloodGroup", "allergies", "conditions"],
      2: ["occupation", "notes", "emergencyContact"],
    };

    const fields = requiredFieldsByStep[step];

    for (let field of fields) {
      if (!formData[field] || formData[field] === "") {
        setErrorMsg("Please fill all required fields.");
        return false;
      }
    }

    setErrorMsg("");
    return true;
  };

  const nextStep = () => {
    if (validateStep()) setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setErrorMsg("");
    if (step > 0) setStep((prev) => prev - 1);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block mb-1 text-sm font-medium">
                Full Name
              </label>
              <input
                name="fullName"
                value={formData.fullName}
                placeholder="Enter Full Name"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Date of Birth
              </label>
              <input
                name="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Gender</label>
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl"
                required
              >
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">
                Contact Number
              </label>
              <input
                name="contactNumber"
                value={formData.contactNumber}
                placeholder="Enter Contact Number"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl"
                required
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
                placeholder="Enter Emergency Contact"
                className="w-full px-4 py-2 border rounded-xl"
                required
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Email</label>
              <input
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl"
                required
                placeholder="you@blessin.com"
              />
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">State</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl"
              >
                <option value="">Select State</option>
                {Object.keys(statesAndDistricts).map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">District</label>
              <select
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl"
              >
                <option value="">Select District</option>
                {districtOptions.map((district) => (
                  <option key={district} value={district}>
                    {district}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">PIN code</label>
              <input
                name="pinCode"
                value={formData.pinCode}
                placeholder="123456"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block mb-1 text-sm font-medium">
                Full Address
              </label>
              <input
                name="address"
                value={formData.address}
                placeholder="Enter Full Address"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl"
              />
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
              <select
                name="bloodGroup"
                id="bloodGroup"
                className="w-full px-4 py-2 border rounded-xl"
              >
                <option value="">Select Blood Group</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
                <option value="AB+">AB+</option>
                <option value="AB-">AB-</option>
              </select>
            </div>
            <div>
              <label className="block mb-1 text-sm font-medium">Height</label>
              <input
                name="height"
                value={formData.height}
                type="number"
                min="0"
                placeholder="Enter Height (cm)"
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-xl"
              />
            </div>

            <div>
              <label className="block mb-1 text-sm font-medium">Weight</label>
              <input
                name="weight"
                type="number"
                min="0"
                value={formData.weight}
                placeholder="Enter Weight (kg)"
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
      {errorMsg && (
        <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded-lg border border-red-300 w-full max-w-2xl text-sm">
          {errorMsg}
        </div>
      )}

      <div className="relative mb-8 w-full max-w-2xl">
        <div
          className="absolute top-[45%] left-[22%] h-1 w-full bg-green-500 z-20 transition-all duration-300"
          style={{ width: `${(step / (steps.length - 1)) * 60}%` }}
        />
        <div className="flex justify-between items-center w-full bg-white px-8 p-4 rounded-xl shadow-xl relative">
          {steps.map((s, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className="flex z-21 flex-col items-center flex-1 text-sm font-medium py-2 cursor-pointer"
            >
              <div
                className={`h-5 w-15 flex items-center justify-center border-1 rounded-2xl mb-1 text-[10px] ${
                  i < step
                    ? "bg-green-500 text-white border-green-500"
                    : i === step
                    ? "bg-white text-indigo-600 border-indigo-600"
                    : "bg-gray-200 text-gray-400 border-gray-300"
                }`}
              >
                {s}
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 space-y-6">
        <form className="space-y-6">{renderStep()}</form>
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
              onClick={() => {
                if (validateStep()) console.log("Submit:", formData);
              }}
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
