import React from "react";
import {
  Coffee,
  Salad,
  Apple,
  Drumstick,
  Sandwich,
  Utensils,
  Candy,
  Activity,
  HeartPulse,
  Droplet,
  ShieldCheck,
  Gauge,
  CandyOff,
  Footprints,
} from "lucide-react";

function Fitness() {
  return (
    <div className="w-full max-h-full bg-gray-100 grid place-items-center">
      <div className="w-[90%] h-[90%] rounded-xl bg-white shadow-2xl p-6">
        <h1 className="text-3xl font-bold mb-2 text-gray-800">
          Fitness Tracker
        </h1>
        <p className="text-gray-600 mb-6 text-sm">
          Track your health and progress
        </p>

        <div className="m-2 h-[80%] w-full grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Left Side */}
          <div className="bg-[#f0fdf4] rounded-xl shadow-md flex items-center justify-center">
            <div className="p-2 pl-4 flex flex-col gap-5">
              <h2 className="text-2xl font-bold text-green-700 flex items-center gap-2">
                <Utensils className="text-green-600" /> Daily Diet Plan
              </h2>
              <div className="flex justify-start gap-4 items-center flex-wrap">
                {/* Breakfast */}
                <div className="flex items-start gap-3">
                  <Coffee className="text-yellow-500 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Breakfast
                    </h3>
                    <p className="text-sm text-gray-600">
                      • Oatmeal with fruits
                      <br />
                      • Boiled eggs or paneer slices
                      <br />• Green tea or black coffee
                    </p>
                  </div>
                </div>

                {/* Morning Snack */}
                <div className="flex items-start gap-3">
                  <Apple className="text-red-500 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Morning Snack
                    </h3>
                    <p className="text-sm text-gray-600">
                      • 1 seasonal fruit
                      <br />• Soaked almonds or walnuts
                    </p>
                  </div>
                </div>

                {/* Lunch */}
                <div className="flex items-start gap-3">
                  <Drumstick className="text-orange-500 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Lunch
                    </h3>
                    <p className="text-sm text-gray-600">
                      • Brown rice or multigrain rotis
                      <br />
                      • Protein source (dal/paneer/chicken)
                      <br />• Mixed vegetables & salad
                    </p>
                  </div>
                </div>

                {/* Evening Snack */}
                <div className="flex items-start gap-3">
                  <Candy className="text-purple-500 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Evening Snack
                    </h3>
                    <p className="text-sm text-gray-600">
                      • Roasted makhana or sprouts chaat
                      <br />• Herbal tea or black coffee
                    </p>
                  </div>
                </div>

                {/* Dinner */}
                <div className="flex items-start gap-3">
                  <Salad className="text-green-600 mt-1" size={24} />
                  <div>
                    <h3 className="text-lg font-semibold text-gray-700">
                      Dinner
                    </h3>
                    <p className="text-sm text-gray-600">
                      • Multigrain rotis or khichdi
                      <br />
                      • Veg curry or soup
                      <br />• Salad + turmeric milk (optional)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 h-full">
            {/* BMI Card */}
            <div className="bg-blue-50 p-4 rounded-xl shadow-md flex items-start gap-3">
              <Gauge className="text-blue-500 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-blue-800">BMI</h2>
                <p className="text-gray-700">23.5 (Normal)</p>
              </div>
            </div>

            {/* Blood Pressure Card */}
            <div className="bg-rose-50 p-4 rounded-xl shadow-md flex items-start gap-3">
              <HeartPulse className="text-red-500 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-red-800">
                  Blood Pressure
                </h2>
                <p className="text-gray-700">120/80 mmHg</p>
              </div>
            </div>

            {/* Glucose Card */}
            <div className="bg-purple-50 p-4 rounded-xl shadow-md flex items-start gap-3">
              <Droplet className="text-purple-600 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-purple-800">
                  Glucose
                </h2>
                <p className="text-gray-700">95 mg/dL</p>
              </div>
            </div>

            {/* Blood Group Card */}
            <div className="bg-orange-50 p-4 rounded-xl shadow-md flex items-start gap-3">
              <ShieldCheck className="text-orange-500 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-orange-800">
                  Blood Group
                </h2>
                <p className="text-gray-700">B+</p>
              </div>
            </div>

            {/* Steps */}
            <div className="bg-purple-50 p-4 rounded-xl shadow-md flex items-start gap-3">
              <Footprints className="text-teal-600 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-teal-800">Steps</h2>
                <p className="text-gray-700">5000 Steps</p>
              </div>
            </div>

            {/* Sugar Card */}
            <div className="bg-green-50 p-4 rounded-xl shadow-md flex items-start gap-3">
              <CandyOff className="text-green-600 mt-1" />
              <div>
                <h2 className="text-lg font-semibold text-green-800">Sugar</h2>
                <p className="text-gray-700">Normal</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Fitness;
