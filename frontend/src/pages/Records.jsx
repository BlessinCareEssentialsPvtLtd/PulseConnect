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
    name: "X-ray Image",
    type: "jpg",
    uploadedAt: "2025-07-03T10:15:00",
    url: "/assets/xray.jpg",
  },
  {
    id: 2,
    name: "Sugar Report.pdf",
    type: "pdf",
    uploadedAt: "2025-07-03T11:45:00",
  },
  {
    id: 3,
    name: "Diabetes Test Result.docx",
    type: "docx",
    uploadedAt: "2025-07-02T08:30:00",
  },
  {
    id: 4,
    name: "Tuberculosis_Scan.png",
    type: "png",
    uploadedAt: "2025-07-02T17:30:00",
    url: "/assets/tb_scan.png",
  },
  {
    id: 5,
    name: "Blood Test - Hemoglobin.pdf",
    type: "pdf",
    uploadedAt: "2025-07-01T09:00:00",
  },
  {
    id: 6,
    name: "notes.txt",
    type: "txt",
    uploadedAt: "2025-07-01T14:20:00",
  },
  {
    id: 7,
    name: "Covid19 RT-PCR Result.jpg",
    type: "jpg",
    uploadedAt: "2025-06-30T16:40:00",
    url: "/assets/rtpcr.jpg",
  },
  {
    id: 8,
    name: "Cancer Biopsy Report.pdf",
    type: "pdf",
    uploadedAt: "2025-06-29T10:10:00",
  },
  {
    id: 9,
    name: "Heart ECG Report.png",
    type: "png",
    uploadedAt: "2025-06-29T12:30:00",
    url: "/assets/ecg.png",
  },
  {
    id: 10,
    name: "Allergy Test Results.docx",
    type: "docx",
    uploadedAt: "2025-06-28T09:15:00",
  },
  {
    id: 11,
    name: "Kidney Function Report.pdf",
    type: "pdf",
    uploadedAt: "2025-06-27T11:00:00",
  },
  {
    id: 12,
    name: "Liver Function Test.txt",
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
        alt={file.name}
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

  useEffect(() => {
    const sortedFiles = [...filesData].sort(
      (a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt)
    );
    const grouped = groupFilesByDate(sortedFiles);
    setGroupedFiles(grouped);
  }, []);

  const filteredGroupedFiles = Object.entries(groupedFiles).reduce(
    (acc, [date, files]) => {
      const filtered = files.filter((file) =>
        file.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      if (filtered.length > 0) acc[date] = filtered;
      return acc;
    },
    {}
  );

  const hasResults = Object.keys(filteredGroupedFiles).length > 0;

  return (
    <Layout>
      <div className="w-full bg-gray-50 p-8">
        {/* Header with Search */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-10 gap-4">
          <h2 className="text-3xl font-semibold text-center sm:text-left">
            📁 Patient File Records
          </h2>
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search files..."
              className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Files Section */}
        {hasResults ? (
          <div className="space-y-10 max-w-7xl mx-auto">
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
                          {file.name}
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
    </Layout>
  );
};

export default GroupedFileManager;
