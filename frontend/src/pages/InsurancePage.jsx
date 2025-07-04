import React from "react";

export default function InsurancePage() {
  return (
    <div className="p-15 max-w-7xl mx-auto space-y-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-blue-800">Health Insurance Guide</h1>

      {/* Section 1: What is Health Insurance */}
      <section className="bg-white p-5 rounded-lg shadow border">
        <h2 className="text-xl font-semibold mb-2">What is Health Insurance?</h2>
        <p className="text-gray-600">
          Health insurance is a contract between you and an insurance company
          that requires the insurer to pay some or all of your medical
          expenses in exchange for a premium. It helps reduce the financial
          burden of medical costs.
        </p>
      </section>

      {/* Section 2: Types of Insurance */}
      <section className="bg-white p-5 rounded-lg shadow border">
        <h2 className="text-xl font-semibold mb-4">Types of Health Insurance in India</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 border rounded">
            <h4 className="font-semibold">Government Schemes</h4>
            <p className="text-sm text-gray-700">Ayushman Bharat, ESIC, CGHS</p>
          </div>
          <div className="p-4 bg-blue-50 border rounded">
            <h4 className="font-semibold">Private Insurance</h4>
            <p className="text-sm text-gray-700">ICICI Lombard, HDFC Ergo</p>
          </div>
          <div className="p-4 bg-blue-50 border rounded">
            <h4 className="font-semibold">Group/Corporate Plans</h4>
            <p className="text-sm text-gray-700">Employer-sponsored insurance</p>
          </div>
        </div>
      </section>

      {/* Section 3: Upload Policy (Optional) */}
      <section className="bg-white p-5 rounded-lg shadow border">
        <h2 className="text-xl font-semibold mb-2">Upload Your Insurance Policy</h2>
        <input type="file" className="mt-2 border px-3 py-2 rounded w-full" />
      </section>

      {/* Section 4: Popular Insurers */}
      <section className="bg-white p-5 rounded-lg shadow border">
        <h2 className="text-xl font-semibold mb-4">Popular Insurers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="p-4 border rounded">
            <h4 className="font-semibold text-blue-700">Star Health</h4>
            <p className="text-sm text-gray-600">Cashless hospital network</p>
          </div>
          <div className="p-4 border rounded">
            <h4 className="font-semibold text-blue-700">HDFC Ergo</h4>
            <p className="text-sm text-gray-600">Pre-existing cover after 3 yrs</p>
          </div>
          <div className="p-4 border rounded">
            <h4 className="font-semibold text-blue-700">Niva Bupa</h4>
            <p className="text-sm text-gray-600">Digital-first claims</p>
          </div>
        </div>
      </section>
    </div>
  );
}
