import { useEffect, useState } from "react";
import axios from "axios";
import { CheckCircle, XCircle, BellOff } from "lucide-react";

export default function NotificationPage() {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/appointments")
      .then((res) => {
        const notifs = res.data.filter(
          (appt) =>
            appt.notification &&
            (appt.status === "Confirmed" || appt.status === "Rejected")
        );
        setNotifications(notifs);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch notifications:", err);
        setError("Something went wrong while fetching notifications.");
        setLoading(false);
      });
  }, []);

  const markAsRead = async (id) => {
    try {
      await axios.put(`http://localhost:8080/api/appointments/${id}`, {
        notification: false,
      });
      setNotifications((prev) => prev.filter((n) => n._id !== id));
    } catch (err) {
      console.error("Failed to mark notification as read:", err);
    }
  };

  return (
    <div className="py-20 max-w-3xl mx-auto px-4">
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>

      {loading ? (
        <p className="text-gray-600">Loading notifications...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : notifications.length === 0 ? (
        <div className="flex items-center gap-2 text-gray-500">
          <BellOff size={20} />
          <p>No new notifications</p>
        </div>
      ) : (
        notifications.map((n) => (
          <div
            key={n._id}
            className="bg-white shadow p-4 rounded-lg flex justify-between items-center border border-gray-200 hover:bg-gray-50 transition"
          >
            <div className="flex items-center gap-3">
              {n.status === "Confirmed" ? (
                <CheckCircle size={20} className="text-green-600" />
              ) : (
                <XCircle size={20} className="text-red-600" />
              )}
              <div>
                <p className="font-medium">
                  Appointment with Dr. <span className="font-semibold">{n.doctor}</span> was{" "}
                  <span
                    className={`${
                      n.status === "Confirmed" ? "text-green-600" : "text-red-600"
                    } font-medium`}
                  >
                    {n.status.toLowerCase()}
                  </span>.
                </p>
                <p className="text-sm text-gray-500">
                  Date: {n.date} | Time: {n.time}
                </p>
              </div>
            </div>

            <button
              onClick={() => markAsRead(n._id)}
              className="text-sm text-blue-600 hover:underline"
            >
              Mark as read
            </button>
          </div>
        ))
      )}
    </div>
  );
}
