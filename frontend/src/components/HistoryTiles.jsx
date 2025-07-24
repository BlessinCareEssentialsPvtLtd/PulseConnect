import { NotebookPen } from "lucide-react";
import { useEffect, useState } from "react";
import { useAuth } from "../context/Authcontext";
import axios from "axios";

const HistoryTiles = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();

  useEffect(() => {
    if (!user?.uniqueId) {
      setError("Patient not found");
      setLoading(false);
      return;
    }
    axios.get(`/api/access/treatment-entries/${user.uniqueId}`)
      .then(res => {
        setEntries(res.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load treatment history");
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center text-blue-600">Loading history...</div>;
  if (error) return <div className="text-center text-red-600">{error}</div>;

  if (entries.length === 0) {
    return <div className="text-center text-gray-500">No treatment history found.</div>;
  }

  return (
    <div className="sm:grid-cols-2 lg:grid-cols-2 gap-6 w-full mb-12 pb-5">
      {entries.map((item, idx) => (
        <div
          key={item._id || idx}
          className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition duration-300"
        >
          <div className="flex items-start gap-4">
            {/* Icon Box */}
            <div className="min-w-[40px] min-h-[40px] rounded-full bg-gradient-to-tr from-blue-500 to-blue-700 text-white flex items-center justify-center shadow-sm">
              <NotebookPen size={18} />
            </div>

            {/* Info */}
            <div className="flex-1">
              <h3 className="text-base font-semibold text-gray-800">Diagnosis: {item.diagnosis}</h3>
              <p className="text-xs text-gray-400">Doctor: {item.doctorId}</p>
              <p className="text-sm text-gray-600 mt-1">
                {item.prescription && item.prescription.length > 0 && (
                  <span>
                    <b>Prescription:</b> {item.prescription.map((p, i) => `${p.drug} (${p.dosage}, ${p.times}/day)`).join(", ")}
                  </span>
                )}
              </p>
              <p className="text-xs text-gray-500 mt-2">{new Date(item.createdAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryTiles;
