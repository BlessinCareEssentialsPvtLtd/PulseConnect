import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";

const steps = ["Patient Info", "Observations", "Diagnosis"];

function Diagnose() {
    const location = useLocation();
    // doctorId and patientId should be passed via location.state or query params
    const doctorId = location.state?.doctorId;
    const patientId = location.state?.patientId;

    const [step, setStep] = useState(0);
    const [errorMsg, setErrorMsg] = useState("");
    const [invalidSteps, setInvalidSteps] = useState(new Set());
    const [access, setAccess] = useState(false);
    const [patientData, setPatientData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitStatus, setSubmitStatus] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        age: "",
        gender: "",
        existingConditions: "",
        bloodPressure: "",
        bloodSugar: "",
        eyeColor: "",
        tongueColor: "",
        skinCondition: "",
        customSymptoms: "",
        diagnosis: "",
        prescription: [{ drug: "", dosage: "", times: "" }],
    });

    useEffect(() => {
        if (!doctorId || !patientId) {
            setErrorMsg("Doctor or Patient ID missing.");
            setLoading(false);
            return;
        }
        // Check access
        const checkAccessAndFetch = async () => {
            try {
                const { data: accessRes } = await axios.get(`/api/access/check-access?doctorId=${doctorId}&patientId=${patientId}`);
                if (!accessRes.access) {
                    setErrorMsg("Access not granted or expired.");
                    setAccess(false);
                    setLoading(false);
                    return;
                }
                setAccess(true);
                // Fetch patient data
                const { data: patient } = await axios.get(`/api/access/patient-data?doctorId=${doctorId}&patientId=${patientId}`);
                setPatientData(patient);
                setFormData((prev) => ({
                    ...prev,
                    name: patient.fullName || "",
                    age: patient.dob ? (new Date().getFullYear() - parseInt(patient.dob.split("-")[0], 10)).toString() : "",
                    gender: patient.gender || "",
                    existingConditions: patient.chronicDiseases || "",
                }));
                setLoading(false);
            } catch (err) {
                setErrorMsg("Access denied or patient not found.");
                setAccess(false);
                setLoading(false);
            }
        };
        checkAccessAndFetch();
        // eslint-disable-next-line
    }, [doctorId, patientId]);

    useEffect(() => {
        if (errorMsg) {
            const timer = setTimeout(() => setErrorMsg(""), 2000);
            return () => clearTimeout(timer);
        }
    }, [errorMsg]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handlePrescriptionChange = (index, e) => {
        const updated = [...formData.prescription];
        updated[index][e.target.name] = e.target.value;
        setFormData({ ...formData, prescription: updated });
    };

    const addPrescription = () => {
        setFormData((prev) => ({
            ...prev,
            prescription: [...prev.prescription, { drug: "", dosage: "", times: "" }],
        }));
    };

    const validateStepFields = (stepKey) => {
        const requiredFieldsByStep = {
            0: ["name", "age", "gender", "existingConditions"],
            1: ["bloodPressure", "bloodSugar"],
        };

        const fields = requiredFieldsByStep[stepKey] || [];
        return fields.every((field) => formData[field]?.trim());
    };

    const validateStep = () => {
        const isValid = validateStepFields(step);

        setInvalidSteps((prev) => {
            const updated = new Set(prev);
            if (isValid) updated.delete(step);
            else updated.add(step);
            return updated;
        });

        if (!isValid) setErrorMsg("Please fill all required fields.");
        return isValid;
    };

    const nextStep = () => {
        if (validateStep()) setStep((prev) => prev + 1);
    };

    const prevStep = () => {
        setErrorMsg("");
        if (step > 0) setStep((prev) => prev - 1);
    };

    const handleSubmit = async () => {
        setSubmitStatus("");
        try {
            await axios.post("/api/access/treatment-entry", {
                doctorId,
                patientId,
                diagnosis: formData.diagnosis,
                prescription: formData.prescription,
                notes: formData.customSymptoms,
            });
            setSubmitStatus("Treatment entry submitted!");
        } catch {
            setSubmitStatus("Failed to submit treatment entry.");
        }
    };

    const renderStep = () => {
        switch (step) {
            case 0:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium">Name</label>
                            <input
                                disabled
                                value={formData.name}
                                className="w-full p-2 border rounded-xl bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Age</label>
                            <input
                                disabled
                                value={formData.age}
                                className="w-full p-2 border rounded-xl bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Gender</label>
                            <input
                                disabled
                                value={formData.gender}
                                className="w-full p-2 border rounded-xl bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Existing Conditions</label>
                            <input
                                disabled
                                value={formData.existingConditions}
                                className="w-full p-2 border rounded-xl bg-gray-100 cursor-not-allowed"
                            />
                        </div>
                    </div>
                );

            case 1:
                return (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium">Blood Pressure</label>
                            <input
                                name="bloodPressure"
                                value={formData.bloodPressure}
                                onChange={handleChange}
                                placeholder="e.g. 120/80"
                                className="w-full p-2 border rounded-xl"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Blood Sugar</label>
                            <input
                                name="bloodSugar"
                                value={formData.bloodSugar}
                                onChange={handleChange}
                                placeholder="e.g. 100 mg/dL"
                                className="w-full p-2 border rounded-xl"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Eye Color</label>
                            <input
                                name="eyeColor"
                                value={formData.eyeColor}
                                onChange={handleChange}
                                placeholder="e.g. Pale, Yellow"
                                className="w-full p-2 border rounded-xl"
                            />
                        </div>
                        <div>
                            <label className="block mb-1 text-sm font-medium">Tongue Color</label>
                            <input
                                name="tongueColor"
                                value={formData.tongueColor}
                                onChange={handleChange}
                                placeholder="e.g. White coating"
                                className="w-full p-2 border rounded-xl"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block mb-1 text-sm font-medium">Skin Condition</label>
                            <input
                                name="skinCondition"
                                value={formData.skinCondition}
                                onChange={handleChange}
                                placeholder="e.g. Red patches, rashes"
                                className="w-full p-2 border rounded-xl"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block mb-1 text-sm font-medium">Custom Symptoms</label>
                            <textarea
                                name="customSymptoms"
                                value={formData.customSymptoms}
                                onChange={handleChange}
                                placeholder="Enter other symptoms"
                                className="w-full p-2 border rounded-xl h-24"
                            />
                        </div>
                    </div>
                );

            case 2:
                return (
                    <div className="space-y-4">
                        <div>
                            <label className="block mb-1 text-sm font-medium">Diagnosis / Findings</label>
                            <textarea
                                name="diagnosis"
                                value={formData.diagnosis}
                                onChange={handleChange}
                                placeholder="Final diagnosis or finding"
                                className="w-full p-2 border rounded-xl h-24"
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="block mb-1 text-sm font-medium">Prescription</label>
                            {formData.prescription.map((item, index) => (
                                <div key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                                    <input
                                        name="drug"
                                        value={item.drug}
                                        onChange={(e) => handlePrescriptionChange(index, e)}
                                        placeholder="Drug"
                                        className="p-2 border rounded-xl"
                                    />
                                    <input
                                        name="dosage"
                                        value={item.dosage}
                                        onChange={(e) => handlePrescriptionChange(index, e)}
                                        placeholder="Dosage"
                                        className="p-2 border rounded-xl"
                                    />
                                    <input
                                        name="times"
                                        value={item.times}
                                        onChange={(e) => handlePrescriptionChange(index, e)}
                                        placeholder="Times/day"
                                        className="p-2 border rounded-xl"
                                    />
                                </div>
                            ))}
                            <button
                                type="button"
                                onClick={addPrescription}
                                className="text-blue-600 text-sm underline cursor-pointer"
                            >
                                + Add another medicine
                            </button>
                        </div>
                    </div>
                );

            default:
                return null;
        }
    };

    if (loading) {
        return <div className="text-center mt-20 text-blue-600">Loading...</div>;
    }
    if (!access) {
        return <div className="text-center mt-20 text-red-600">{errorMsg || "Access not granted."}</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
            {/* Progress Bar */}
            <div className="relative mb-8 w-full max-w-2xl">
                <div
                    className="absolute top-[45%] left-[25%] h-1 bg-green-500 z-20 transition-all duration-300 rounded-3xl"
                    style={{ width: step === 0 ? "0%" : `${(step / (steps.length - 1)) * 60}%` }}
                />
                <div className="flex justify-between items-center w-full bg-white px-8 py-4 rounded-xl shadow-xl relative">
                    {steps.map((label, i) => {
                        const isInvalid = invalidSteps.has(i);
                        const isCurrent = i === step;
                        const isComplete = i < step && !isInvalid;

                        let bg = "bg-gray-200 text-gray-400 border-gray-300";
                        if (isCurrent) bg = "bg-white text-indigo-600 border-indigo-600";
                        else if (isInvalid) bg = "bg-red-100 text-red-600 border-red-500";
                        else if (isComplete) bg = "bg-green-500 text-white border-green-500";

                        return (
                            <button
                                key={i}
                                onClick={() => setStep(i)}
                                className="flex flex-col items-center flex-1 text-sm font-medium z-21 cursor-pointer"
                            >
                                <div className={`h-5 px-2 flex items-center justify-center rounded-2xl text-[10px] border ${bg}`}>
                                    {label}
                                </div>
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Error Message */}
            {errorMsg && (
                <div className="bg-red-100 text-red-700 px-4 py-2 mb-4 rounded-lg border border-red-300 w-full max-w-2xl text-sm sticky top-[10vh]">
                    {errorMsg}
                </div>
            )}

            {/* Main Form Area */}
            <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl p-8 space-y-6">
                <form className="space-y-6">{renderStep()}</form>
                <div className="flex justify-between">
                    <button
                        onClick={prevStep}
                        disabled={step === 0}
                        className="px-6 py-2 rounded-xl bg-gray-300 text-gray-700 hover:bg-gray-400 disabled:opacity-50 cursor-pointer"
                    >
                        Previous
                    </button>
                    {step < steps.length - 1 ? (
                        <button
                            onClick={nextStep}
                            className="px-6 py-2 rounded-xl bg-indigo-600 text-white hover:bg-indigo-700 cursor-pointer"
                        >
                            Next
                        </button>
                    ) : (
                        <button
                            onClick={handleSubmit}
                            className="px-6 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700 cursor-pointer"
                        >
                            Submit
                        </button>
                    )}
                </div>
                {submitStatus && <div className="text-green-700 mt-2 text-sm">{submitStatus}</div>}
            </div>
        </div>
    );
}

export default Diagnose;
