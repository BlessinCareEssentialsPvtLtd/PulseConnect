import React, { useState, useEffect } from "react";
import {
    FileText,
    Search,
    UploadCloud,
    Trash2,
    CheckCircle,
    XCircle,
    Clock,
} from "lucide-react";
import moment from "moment";

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

const groupFiles = (files) => {
    const grouped = {};
    files.forEach((file) => {
        const label = getGroupLabel(file.created_at);
        if (!grouped[label]) grouped[label] = [];
        grouped[label].push(file);
    });
    return grouped;
};

const FileExplorer = () => {
    const [files, setFiles] = useState([]);
    const [search, setSearch] = useState("");
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState("");

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
                setError("Failed to load files.");
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
            const selected = files[0];
            if (selected && selected.size > 2 * 1024 * 1024) {
                alert("File must be smaller than 2MB.");
                return;
            }
            setFormData({ ...formData, file: selected });
        } else {
            setFormData({ ...formData, [name]: value });
        }
    };

    const handleFormSubmit = async (e) => {
        e.preventDefault();
        if (!formData.file || !formData.fileName || !formData.description) {
            alert("Please fill in all fields.");
            return;
        }

        try {
            setUploading(true);
            const data = new FormData();
            data.append("file", formData.file);
            data.append("fileName", formData.fileName);
            data.append("description", formData.description);
            data.append("patient_id", PATIENT_ID);
            data.append("uploaded_by", PATIENT_ID);

            const res = await fetch("http://localhost:5000/api/records/upload", {
                method: "POST",
                body: data,
            });

            const result = await res.json();

            if (res.ok && result.success) {
                setFiles((prev) => [...prev, result.record]);
                setFormData({ file: null, fileName: "", description: "" });
                setShowForm(false);
            } else {
                throw new Error(result.error || "Upload failed.");
            }
        } catch (err) {
            alert("Upload error: " + err.message);
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (recordId) => {
        if (!window.confirm("Are you sure?")) return;
        try {
            const res = await fetch("http://localhost:5000/api/records/delete", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ recordId, userId: PATIENT_ID }),
            });
            const result = await res.json();
            if (res.ok && result.success) {
                setFiles((prev) => prev.filter((f) => f._id !== recordId));
            } else throw new Error(result.error || "Delete failed.");
        } catch (err) {
            alert("Delete error: " + err.message);
        }
    };

    return (
        <div className="w-full p-4 sm:p-6 md:p-8 bg-white font-sans">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 gap-4">
                <h2 className="text-2xl font-bold text-blue-800">📁 My Records</h2>
                <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
                    <div className="relative w-full sm:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search files..."
                            className="pl-10 pr-4 py-2 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                    >
                        <UploadCloud size={18} />
                        Add File
                    </button>
                </div>
            </div>

            {/* Upload Form */}
            {showForm && (
                <form
                    onSubmit={handleFormSubmit}
                    className="border border-blue-300 bg-blue-50 p-4 rounded-lg mb-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <input
                            type="text"
                            name="fileName"
                            placeholder="File Name"
                            value={formData.fileName}
                            onChange={handleFormChange}
                            className="px-4 py-2 border border-gray-300 rounded-md"
                        />
                        <input
                            type="file"
                            name="file"
                            onChange={handleFormChange}
                            className="file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                        />
                        <input
                            type="text"
                            name="description"
                            placeholder="Short Description"
                            value={formData.description}
                            onChange={handleFormChange}
                            className="px-4 py-2 border border-gray-300 rounded-md"
                        />
                        <button
                            type="submit"
                            disabled={uploading}
                            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
                        >
                            {uploading ? "Uploading..." : "Upload"}
                        </button>
                    </div>
                </form>
            )}

            {/* Files Display */}
            {loading ? (
                <div className="text-center text-blue-600 py-10">Loading files...</div>
            ) : error ? (
                <div className="text-center text-red-500 py-10">{error}</div>
            ) : filteredFiles.length === 0 ? (
                <div className="text-center text-gray-400 py-10">No files found.</div>
            ) : (
                Object.keys(grouped).map((group) => (
                    <div key={group} className="mb-6">
                        <h3 className="text-gray-700 text-sm font-semibold uppercase mb-2">{group}</h3>
                        <div className="space-y-3">
                            {grouped[group].map((file) => (
                                <div
                                    key={file._id}
                                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between bg-white shadow-sm border border-gray-200 px-4 py-3 rounded-lg hover:bg-gray-50 transition"
                                >
                                    <a
                                        href={file.file_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-3 text-blue-700 font-medium"
                                    >
                                        <FileText className="w-5 h-5" />
                                        {file.fileName}
                                        {file.isVerified === "verified" && <CheckCircle className="text-green-600" size={18} />}
                                        {file.isVerified === "rejected" && <XCircle className="text-red-600" size={18} />}
                                        {file.isVerified === "pending" && <Clock className="text-yellow-600" size={18} />}
                                    </a>
                                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-6 mt-2 sm:mt-0 text-gray-600 text-sm">
                                        <span>{moment(file.created_at).format("MMM D, YYYY")}</span>
                                        <span className="truncate max-w-[200px]">{file.description}</span>
                                        <button
                                            onClick={() => handleDelete(file._id)}
                                            className="text-red-500 hover:text-red-600"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default FileExplorer;
