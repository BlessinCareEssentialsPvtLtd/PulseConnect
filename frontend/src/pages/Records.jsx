import React, { useState, useEffect } from "react";
import { FileText, Search, CheckCircle, XCircle, Clock, UploadCloud } from "lucide-react";
import moment from "moment";
import Layout from "../components/layout";

// Helper to determine group label
const getGroupLabel = (date) => {
  const today = moment();
  const uploaded = moment(date);

  if (uploaded.isSame(today, "day")) return "Today";
  if (uploaded.isSame(today.clone().subtract(1, "day"), "day")) return "Yesterday";
  if (uploaded.isAfter(today.clone().subtract(7, "days"))) return "Earlier this week";
  if (uploaded.isAfter(today.clone().subtract(14, "days"))) return "Last week";
  if (uploaded.isSame(today, "month")) return "Earlier this month";
  if (uploaded.isSame(today.clone().subtract(1, "month"), "month")) return "Last month";
  return "Older";
};

// Group files by upload label
const groupFiles = (files) => {
  const grouped = {};
  files.forEach((file) => {
    const label = getGroupLabel(file.created_at);
    if (!grouped[label]) grouped[label] = [];
    grouped[label].push(file);
  });
  return grouped;
};

const FileExplorerStyle = () => {
  const [files, setFiles] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    file: null,
    fileName: "",
    description: "",
  });

  const PATIENT_ID = "64a4a9f1e3c8fa001234abcd";

  useEffect(() => {
    const fetchFiles = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(`http://localhost:5000/api/records/patient/${PATIENT_ID}`);
        const data = await response.json();

        if (response.ok && data.success) {
          setFiles(data.records);
        } else {
          throw new Error(data.error || "Failed to fetch records.");
        }
      } catch (err) {
        console.error("Fetch error:", err.message);
        setError("Error fetching health records.");
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  const filteredFiles = files.filter((file) =>
    file.fileName.toLowerCase().includes(search.toLowerCase())
  );

  const grouped = groupFiles(filteredFiles);

  const handleFormChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "file") {
      setFormData({ ...formData, file: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.file || !formData.fileName || !formData.description) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setUploading(true);
      const data = new FormData();
      data.append("file", formData.file);
      data.append("fileName", formData.fileName);
      data.append("description", formData.description);
      data.append("patient_id", PATIENT_ID);
      data.append("uploaded_by", PATIENT_ID); // optional static value

      const res = await fetch("http://localhost:5000/api/records/upload", {
        method: "POST",
        body: data,
      });

      const result = await res.json();

      if (res.ok && result.success) {
        setFiles((prev) => [...prev, result.record]);
        setShowForm(false);
        setFormData({ file: null, fileName: "", description: "" });
      } else {
        throw new Error(result.error || "Upload failed.");
      }
    } catch (err) {
      alert("Error uploading file: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <Layout>
      <div className="w-full h-full bg-[#E9F8FF] flex flex-col justify-start md:ml-12 p-6 font-sans">
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">📁 File Explorer</h2>
          <div className="flex gap-2 items-center">
            <div className="relative w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search files..."
                className="pl-10 pr-4 py-2 rounded-lg w-full focus:outline-none bg-white focus:ring-2 focus:ring-blue-500"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-2 rounded-md"
            >
              <span className="flex justify-between items-center p-2 ">
              <UploadCloud size={18} className="mr-2" />
                Add Record
              </span>
            </button>
          </div>
        </div>

        {/* Upload Form */}
        {showForm && (
          <form
            onSubmit={handleFormSubmit}
            className="bg-white rounded-md shadow-md p-6 mb-6 border border-blue-200"
          >
            <div className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                type="text"
                name="fileName"
                placeholder="Enter file name"
                value={formData.fileName}
                onChange={handleFormChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none"
              />
              <label className="flex-1 border border-gray-300 rounded px-4 py-2 text-center cursor-pointer text-gray-500 bg-white hover:bg-gray-100">
                {formData.file ? formData.file.name : "Click to upload file"}
                <input
                  type="file"
                  name="file"
                  accept="*"
                  onChange={handleFormChange}
                  className="hidden"
                />
              </label>
              <input
                type="text"
                name="description"
                placeholder="Short description"
                value={formData.description}
                onChange={handleFormChange}
                className="flex-1 px-4 py-2 border border-gray-300 rounded focus:outline-none"
              />
              <button
                type="submit"
                disabled={uploading}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
              >
                <UploadCloud size={18} />
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
          </form>
        )}

        {/* Loading or Error */}
        {loading ? (
          <div className="text-center py-10 text-blue-500 font-medium">Loading records...</div>
        ) : error ? (
          <div className="text-center py-10 text-red-500 font-medium">{error}</div>
        ) : (
          <div className="overflow-auto bg-[#E9F8FF] ml-2 rounded-lg shadow-sm">
            <table className="min-w-full text-sm text-left text-white">
              <thead className="bg-gray-100 text-blue-900">
                <tr>
                  <th className="p-3 font-medium w-10"></th>
                  <th className="p-3 font-medium">Name</th>
                  <th className="p-3 font-medium">Date Uploaded</th>
                  <th className="p-3 font-medium">Description</th>
                  <th className="p-3 font-medium text-right">Size</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(grouped).map((groupLabel) => (
                  <React.Fragment key={groupLabel}>
                    <tr className="bg-blue-50">
                      <td colSpan="5" className="p-2 m-2 text-blue-900 uppercase text-xs tracking-wide">
                        {groupLabel}
                      </td>
                    </tr>
                    {grouped[groupLabel].map((file) => (
                      <tr key={file._id}>
                        <td colSpan="5" className="p-2">
                          <a
                            href={file.file_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center bg-[#E9F8FF] hover:bg-white/40 text-gray-700 px-3 py-3 p-4 rounded transition cursor-pointer"
                            style={{
                              boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.08)",
                            }}
                          >
                            <div className="w-8 flex justify-center">
                              <FileText className="w-5 h-5 text-blue-500" />
                            </div>
                            <div className="flex-1 flex items-center gap-2 pl-2">
                              {file.fileName}
                              {file.isVerified === true && (
                                <CheckCircle size={18} className="text-green-600" />
                              )}
                              {file.isVerified === false && (
                                <XCircle size={18} className="text-red-600" />
                              )}
                              {file.isVerified === undefined && (
                                <Clock size={18} className="text-blue-600 bg-gray-200 rounded-full p-[2px]" />
                              )}
                            </div>
                            <div className="w-[220px]">
                              {moment(file.created_at).format("MMM D, YYYY h:mm A")}
                            </div>
                            <div className="w-[200px] text-sm">{file.description}</div>
                            <div className="text-right w-[100px]">-</div>
                          </a>
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}

                {filteredFiles.length === 0 && (
                  <tr>
                    <td colSpan={5} className="p-6 text-center text-gray-500">
                      No files found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default FileExplorerStyle;
