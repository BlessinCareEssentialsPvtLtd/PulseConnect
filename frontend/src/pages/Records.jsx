import React, { useEffect, useState } from "react";
import {
  FileText,
  FileImage,
  FileDigit,
  FileType2,
  Search,
  MoreVertical,
  FileWarning,
} from "lucide-react";
import moment from "moment";
import Layout from "../components/layout";

// Sample file data
const filesData = [
  {
    id: 1,
    fileName: "X-ray Image",
    type: "jpg",
    uploadedAt: "2025-07-03T10:15:00",
    url: "/assets/xray.jpg",
  },
  {
    id: 2,
    fileName: "Sugar Report.pdf",
    type: "pdf",
    uploadedAt: "2025-07-03T11:45:00",
  },
  {
    id: 3,
    fileName: "Diabetes Test Result.docx",
    type: "docx",
    uploadedAt: "2025-07-02T08:30:00",
  },
  {
    id: 4,
    fileName: "Tuberculosis_Scan.png",
    type: "png",
    uploadedAt: "2025-07-02T17:30:00",
    url: "/assets/tb_scan.png",
  },
  {
    id: 5,
    fileName: "Blood Test - Hemoglobin.pdf",
    type: "pdf",
    uploadedAt: "2025-07-01T09:00:00",
  },
  {
    id: 6,
    fileName: "notes.txt",
    type: "txt",
    uploadedAt: "2025-07-01T14:20:00",
  },
  {
    id: 7,
    fileName: "Covid19 RT-PCR Result.jpg",
    type: "jpg",
    uploadedAt: "2025-06-30T16:40:00",
    url: "/assets/rtpcr.jpg",
  },
  {
    id: 8,
    fileName: "Cancer Biopsy Report.pdf",
    type: "pdf",
    uploadedAt: "2025-06-29T10:10:00",
  },
  {
    id: 9,
    fileName: "Heart ECG Report.png",
    type: "png",
    uploadedAt: "2025-06-29T12:30:00",
    url: "/assets/ecg.png",
  },
  {
    id: 10,
    fileName: "Allergy Test Results.docx",
    type: "docx",
    uploadedAt: "2025-06-28T09:15:00",
  },
  {
    id: 11,
    fileName: "Kidney Function Report.pdf",
    type: "pdf",
    uploadedAt: "2025-06-27T11:00:00",
  },
  {
    id: 12,
    fileName: "Liver Function Test.txt",
    type: "txt",
    uploadedAt: "2025-06-26T08:00:00",
  },
];


// Group files by upload date
const groupFilesByDate = (files) => {
  const groups = {};
  files.forEach((file) => {
    const date = moment(file.uploadedAt).format("YYYY-MM-DD");
    if (!groups[date]) groups[date] = [];
    groups[date].push(file);
  });
  return groups;
};

// Icon render logic
const getFileIcon = (file) => {
  if (["jpg", "jpeg", "png", "gif"].includes(file.type)) {
    return (
      <img
        src={file.url}
        alt={file.fileName}
        className="h-12 w-12 object-cover rounded"
      />
    );
  }
  switch (file.type) {
    case "pdf":
      return <FileDigit className="text-red-500 h-12 w-12" />;
    case "docx":
      return <FileType2 className="text-blue-500 h-12 w-12" />;
    case "txt":
      return <FileText className="text-green-500 h-12 w-12" />;
    default:
      return <FileText className="text-gray-400 h-12 w-12" />;
  }
};

const GroupedFileManager = () => {
  const [groupedFiles, setGroupedFiles] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [showForm, setshowForm] = useState(false)

  useEffect(() => {
    const sortedFiles = [...filesData].sort(
      (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
    );
    const grouped = groupFilesByDate(sortedFiles);
    setGroupedFiles(grouped);
  }, []);

  const [newFile, setNewFile] = useState({
    fileName: "",
    type: "",
    url: "",
  });

  const handleChange = (e) => {
    const { fileName, value } = e.target;
    setNewFile((prev) => ({ ...prev, [fileName]: value }));
  };

  const handleAddFile = (e) => {
    e.preventDefault();

    if (!newFile.fileName || !newFile.type) {
      alert("Please enter both name and type.");
      return;
    }

    const fileToAdd = {
      id: Date.now(), // Unique ID
      ...newFile,
      uploadedAt: new Date().toISOString(),
    };

    console.log("🆕 File to Add:", fileToAdd);
    // 🔁 You can call a prop function or backend API here

    // Clear the form
    setNewFile({ fileName: "", type: "", url: "" });
  };

  const filteredGroupedFiles = Object.entries(groupedFiles).reduce(
    (acc, [date, files]) => {
      const filtered = files.filter((file) =>
        file.fileName.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filtered.length > 0) acc[date] = filtered;
      return acc;
    },
    {}
  );


const FORM = () => {
  const handleOverlayClick = () => {
    setshowForm(false);
  };

  const stopPropagation = (e) => {
    e.stopPropagation(); // Prevent form clicks from closing the overlay
  };

  return (
    <div
      className="absolute h-full w-full top-10 left-0 bg-white/65 m-[-2rem] z-[1]"
      onClick={handleOverlayClick}
    >
      <form
        onClick={stopPropagation}
        onSubmit={handleAddFile}
        className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto my-10 space-y-4"
      >
        <h2 className="text-2xl font-bold mb-2">➕ Add New File</h2>

        {/* File Name */}
        <div>
          <label className="block text-gray-700">File Name</label>
          <input
            type="text"
            name="name"
            value={newFile.fileName}
            onChange={handleChange}
            className="mt-1 w-full border-2 border-gray-400 rounded px-3 py-2 focus:ring-4 focus:border-none focus:ring-blue-400"
            placeholder="e.g., Project Report"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={newFile.description}
            onChange={handleChange}
            className="mt-1 w-full border-2 border-gray-400 rounded px-3 py-2 focus:ring-4 focus:border-none focus:ring-blue-400"
            placeholder="Brief about the file..."
            rows={3}
          />
        </div>


        {/* File Upload */}
        <div className="">
          <label className="block text-gray-700">Upload File</label>
          <input
            type="file"
            name="file"
            onChange={handleChange}
            className="mt-1 w-full border-2 cursor-pointer border-gray-400 p-2"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Add File
        </button>
      </form>
    </div>
  );
};


  const hasResults = Object.keys(filteredGroupedFiles).length > 0;

  return (
    <Layout>
      <div className="w-full m-4 font-sans bg-[#E9F8FF] p-8 relative flex flex-col items-center">
            <div>
              {/* Header with Search */}
              <div className="flex w-full flex-col sm:flex-row justify-around items-center mb-10 gap-4 mx-4">
                <h2 className="md:text-3xl text-2xl font-semibold text-center sm:text-left">
                  📁 Patient File Records
                </h2>
                <div className="relative w-full sm:w-80 flex items-center gap-2 justify-around">
                  <div>
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search files..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div>
                    <button
                      onClick={() => setshowForm(!showForm)}
                      className="bg-primary text-white p-2 rounded hover:bg-primary  whitespace-nowrap"
                    >
                      Add Files
                    </button>
                  </div>
                </div>
              </div>

              {/* Files Section */}
              {hasResults ? (
                <div className="space-y-10 max-w-7xl mx-4">
                  {Object.entries(filteredGroupedFiles).map(([date, files]) => (
                    <div
                      key={date}
                      className="bg-white p-6 rounded-lg shadow-md border border-gray-100"
                    >
                      <h3 className="text-xl font-bold text-gray-800 mb-6">
                        {moment(date).calendar(null, {
                          sameDay: "[Today]",
                          lastDay: "[Yesterday]",
                          lastWeek: "dddd, MMM D",
                          sameElse: "MMMM D, YYYY",
                        })}
                      </h3>

                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {files.map((file) => (
                          <div
                            key={file.id}
                            className="aspect-square bg-gray-50 border border-gray-200 rounded-lg p-2 flex flex-col justify-around items-center hover:shadow transition"
                          >
                            <div>{getFileIcon(file)}</div>
                            <section className="flex items-center justify-between w-full">
                              <div className="text-sm font-medium text-center mt-2 text-gray-800 truncate w-full">
                                {file.fileName}
                              </div>
                              <MoreVertical className="w-4 h-4 text-gray-400 mt-1 cursor-pointer hover:text-gray-600" />
                            </section>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[60vh] text-center text-gray-600">
                  <FileWarning className="w-16 h-16 text-yellow-500 mb-4" />
                  <h3 className="text-2xl font-semibold mb-2">No Records Found</h3>
                  <p className="text-gray-500">Try searching with a different name.</p>
                </div>
              )}
            </div>
            {showForm && <FORM />}
        </div>
    </Layout>
  );
};

export default GroupedFileManager;
