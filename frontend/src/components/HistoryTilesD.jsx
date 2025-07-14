// src/components/HistoryTiles.jsx
import { NotebookPen } from "lucide-react";
const data = [
  { title: "Records", subtitle: "Patient Records", desc: "New entries available" },
  { title: "Prescriptions", subtitle: "Manage Prescriptions", desc: "You have new requests" },
  { title: "Family", subtitle: "Linked Dependents", desc: "X family members" },
  { title: "Fitness", subtitle: "Health Plans", desc: "Activity goals updated" },
];
const HistoryTiles = ({ isDoctor }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    {data.map((item,i) => (
      <div key={i} className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition">
        <div className="flex gap-3 items-start">
          <div className="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded">
            <NotebookPen size={18}/>
          </div>
          <div>
            <h3 className="font-semibold text-sm">{item.title}</h3>
            <p className="text-xs text-gray-500">{item.subtitle}</p>
            <p className="text-xs mt-1 text-gray-700">{item.desc}</p>
          </div>
        </div>
      </div>
    ))}
  </div>
);
export default HistoryTiles;
