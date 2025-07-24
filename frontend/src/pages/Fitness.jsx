import React from 'react';
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

const meals = [
    {
        icon: <Coffee className="text-yellow-500 mt-1" size={28} />,
        title: "Breakfast",
        items: [
            "Oatmeal with fruits",
            "Boiled eggs or paneer slices",
            "Green tea or black coffee",
        ],
    },
    {
        icon: <Apple className="text-red-500 mt-1" size={28} />,
        title: "Morning Snack",
        items: [
            "1 seasonal fruit",
            "Soaked almonds or walnuts",
        ],
    },
    {
        icon: <Drumstick className="text-orange-500 mt-1" size={28} />,
        title: "Lunch",
        items: [
            "Brown rice or multigrain rotis",
            "Protein source (dal/paneer/chicken)",
            "Mixed vegetables & salad",
        ],
    },
    {
        icon: <Candy className="text-purple-500 mt-1" size={28} />,
        title: "Evening Snack",
        items: [
            "Roasted makhana or sprouts chaat",
            "Herbal tea or black coffee",
        ],
    },
    {
        icon: <Salad className="text-green-600 mt-1" size={28} />,
        title: "Dinner",
        items: [
            "Multigrain rotis or khichdi",
            "Veg curry or soup",
            "Salad + turmeric milk (optional)",
        ],
    },
];

const stats = [
    {
        icon: <Gauge className="text-blue-500" size={28} />,
        title: "BMI",
        value: "23.5 (Normal)",
        color: "blue-50",
        text: "blue-800",
    },
    {
        icon: <HeartPulse className="text-red-500" size={28} />,
        title: "Blood Pressure",
        value: "120/80 mmHg",
        color: "rose-50",
        text: "red-800",
    },
    {
        icon: <Droplet className="text-purple-600" size={28} />,
        title: "Glucose",
        value: "95 mg/dL",
        color: "purple-50",
        text: "purple-800",
    },
    {
        icon: <ShieldCheck className="text-orange-500" size={28} />,
        title: "Blood Group",
        value: "B+",
        color: "orange-50",
        text: "orange-800",
    },
    {
        icon: <CandyOff className="text-green-600" size={28} />,
        title: "Sugar",
        value: "Normal",
        color: "green-50",
        text: "green-800",
    },
];

function Fitness() {
    // Example: 5000 steps out of 10000
    const steps = 5000;
    const stepGoal = 10000;
    const stepPercent = Math.min(100, Math.round((steps / stepGoal) * 100));

    return (
        <div className="w-full min-h-screen bg-gray-100 flex items-center justify-center py-8">
            <div className="w-full max-w-6xl bg-white rounded-2xl shadow-2xl p-8 flex flex-col md:flex-row gap-8">
                {/* Left: Diet Plan */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-green-700 mb-4 flex items-center gap-2">
                        <Utensils className="text-green-600" /> Daily Diet Plan
                    </h2>
                    <div className="flex flex-col gap-4">
                        {meals.map((meal, idx) => (
                            <div key={idx} className="bg-green-50 rounded-xl p-4 flex gap-3 items-start shadow">
                                {meal.icon}
                                <div>
                                    <h3 className="font-semibold text-lg text-gray-700">{meal.title}</h3>
                                    <ul className="text-sm text-gray-600 list-disc ml-4">
                                        {meal.items.map((item, i) => (
                                            <li key={i}>{item}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                {/* Right: Health Stats */}
                <div className="flex-1">
                    <h2 className="text-2xl font-bold text-blue-700 mb-4 flex items-center gap-2">
                        <Activity className="text-blue-600" /> Health Stats
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {stats.map((stat, idx) => (
                            <div key={idx} className={`bg-${stat.color} p-4 rounded-xl shadow flex items-center gap-3`}>
                                {stat.icon}
                                <div>
                                    <h3 className={`font-semibold text-${stat.text}`}>{stat.title}</h3>
                                    <p className="text-gray-700">{stat.value}</p>
                                </div>
                            </div>
                        ))}
                        {/* Steps with progress bar */}
                        <div className="bg-purple-50 p-4 rounded-xl shadow flex flex-col gap-2 col-span-1">
                            <div className="flex items-center gap-3">
                                <Footprints className="text-teal-600" size={28} />
                                <h3 className="font-semibold text-teal-800">Steps</h3>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-3 mt-2">
                                <div className="bg-teal-500 h-3 rounded-full transition-all duration-300" style={{ width: `${stepPercent}%` }}></div>
                            </div>
                            <p className="text-gray-700 text-sm">{steps} / {stepGoal} Steps</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Fitness;