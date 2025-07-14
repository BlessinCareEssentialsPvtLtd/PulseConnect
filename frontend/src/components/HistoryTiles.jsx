import { NotebookPen } from "lucide-react";

const data = [
  { title: "Records", subtitle: "History", desc: "3 new doctors added" },
  { title: "Medicines", subtitle: "Know Medicines", desc: "2 prescriptions saved" },
  { title: "Family", subtitle: "Records", desc: "1 family member linked" },
  { title: "Fitness", subtitle: "Get Diet", desc: "Workout goal updated" },
];

const HistoryTiles = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full">
      {data.map((item, idx) => (
        <div
          key={idx}
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300"
        >
          <div className="flex items-start gap-4">
            {/* Icon Box */}
            <div className="min-w-[40px] min-h-[40px] rounded-full bg-gradient-to-tr from-blue-500 to-blue-700 text-white flex items-center justify-center shadow-sm">
              <NotebookPen size={18} />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-800">{item.title}</h3>
              <p className="text-xs text-gray-400">{item.subtitle}</p>
              <p className="text-sm text-gray-600 mt-1">{item.desc}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryTiles;
