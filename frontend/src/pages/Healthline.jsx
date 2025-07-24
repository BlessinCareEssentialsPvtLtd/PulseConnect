import React, { useState } from 'react';
// import file from '../assets/hello.pdf';
import { FileText, Stethoscope, Pill, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import clsx from 'clsx';
import { timelineData } from '../dummydata/PatientsData.js';

timelineData.sort((a, b) => new Date(a.date) - new Date(b.date));

const typeStyles = {
    record: {
        icon: <FileText className="text-blue-800 w-6 h-6" />,
        border: 'border-blue-600',
        bg: 'bg-blue-100',
    },
    diagnosis: {
        icon: <Stethoscope className="text-blue-800 w-6 h-6" />,
        border: 'border-blue-600',
        bg: 'bg-blue-100',
    },
    prescription: {
        icon: <Pill className="text-blue-800 w-6 h-6" />,
        border: 'border-blue-600',
        bg: 'bg-blue-100',
    },
};

const PrescriptionDetails = ({ data }) => {
    return (
        <div className="w-full p-4 sm:p-6 bg-white shadow-lg rounded-xl border border-gray-200 space-y-4">
            <h2 className="text-2xl font-bold text-blue-800">{data.title}</h2>

            <div className="space-y-3">
                {data.medicines.map((med, index) => (
                    <div
                        key={index}
                        className="p-3 bg-blue-50 rounded-md border border-blue-200"
                    >
                        <p className="font-semibold text-gray-800">{med.name}</p>
                        <p className="text-sm text-gray-600">
                            Dosage: {med.dosage}, Frequency: {med.frequency}, Duration: {med.duration}
                        </p>
                    </div>
                ))}
            </div>

            <div className="mt-4">
                <h3 className="font-medium text-gray-700">Instructions:</h3>
                <p className="text-gray-600">{data.instructions}</p>
            </div>
        </div>
    );
};

const DiagnosisDetails = ({ data }) => {
    return (
        <div className="w-full p-4 sm:p-6 bg-white shadow-lg rounded-xl border border-gray-200 space-y-4">
            <h2 className="text-2xl font-bold text-red-700">{data.topic}</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <h3 className="font-medium text-gray-700">Doctor</h3>
                    <p className="text-gray-600">{data.doctor}</p>
                </div>
                <div>
                    <h3 className="font-medium text-gray-700">Hospital</h3>
                    <p className="text-gray-600">{data.hospital}</p>
                </div>
                <div className="md:col-span-2">
                    <h3 className="font-medium text-gray-700">Date</h3>
                    <p className="text-gray-600">{new Date(data.date).toLocaleDateString()}</p>
                </div>
                <div className="md:col-span-2">
                    <h3 className="font-medium text-gray-700">Notes</h3>
                    <p className="text-gray-600">{data.notes}</p>
                </div>
            </div>
        </div>
    );
};

const RecordViewer = ({ title, fileUrl }) => (
    <div>
        <h4 className="text-lg font-semibold mb-2">{title}</h4>
        {fileUrl ? (
            <iframe src={fileUrl} title={title} className="w-full h-[300px] sm:h-[500px] border rounded-md" />
        ) : (
            <div className="w-full h-40 flex items-center justify-center bg-gray-100 border rounded-md text-gray-500 text-center">
                No file available for this record.
            </div>
        )}
    </div>
);

const Sidebar = ({ item, onClose }) => {
    // Use item.fileUrl if available, else undefined
    const fileUrl = item.fileUrl || undefined;
    return (
        <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed top-0 right-0 h-full w-full sm:w-[90%] md:w-[30%] bg-white shadow-lg z-50 overflow-y-auto p-3 sm:p-6"
        >
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-semibold text-gray-800">Details</h3>
                <button onClick={onClose}>
                    <X className="w-6 h-6 text-gray-700 hover:text-red-500" />
                </button>
            </div>
            <div>
                {item.type === 'record' && (
                    <RecordViewer title={item.title} fileUrl={fileUrl} />
                )}
                {item.type === 'diagnosis' && <DiagnosisDetails data={item} />}
                {item.type === 'prescription' && <PrescriptionDetails data={item} />}
            </div>
        </motion.div>
    );
};

const Healthline = () => {
    const [selectedItem, setSelectedItem] = useState(null);

    return (
        <div className="py-6 px-2 sm:py-10 sm:px-6 lg:px-20 bg-gray-100 min-h-screen flex flex-col items-center justify-center relative">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-6 sm:mb-10 text-gray-800">Patient Timeline</h2>
            <div className="relative border-l-2 border-gray-400 w-full sm:w-[90%]">
                {timelineData.map((item, index) => {
                    const styles = typeStyles[item.type];
                    return (
                        <motion.div
                            key={item.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
                            className="mb-8 sm:mb-10 mt-2 group relative"
                            onClick={() => setSelectedItem(item)}
                        >
                            {/* Timeline icon and date: stacked on mobile, left on sm+ */}
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
                                {/* Date label */}
                                <span className="block sm:hidden text-xs text-gray-700 font-semibold">
                                    {new Date(item.date).toLocaleDateString()}
                                </span>
                                {/* Icon */}
                                <span className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 bg-white border-2 border-gray-400 rounded-full z-10 mb-2 sm:mb-0 sm:absolute sm:-left-11">
                                    {styles.icon}
                                </span>
                                {/* Date label for sm+ */}
                                <span className="hidden sm:block absolute -left-36 w-24 text-sm text-gray-700 font-semibold text-right">
                                    {new Date(item.date).toLocaleDateString()}
                                </span>
                            </div>
                            <div
                                className={clsx(
                                    'p-2 sm:p-3 md:p-5 rounded-md shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-md cursor-pointer',
                                    styles.border,
                                    styles.bg
                                )}
                            >
                                <h2 className="text-base sm:text-xl font-semibold text-gray-900">{item.title}</h2>
                                <p className="text-gray-800 mt-1 sm:mt-2 text-sm sm:text-base">{item.description}</p>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <AnimatePresence>
                {selectedItem && <Sidebar item={selectedItem} onClose={() => setSelectedItem(null)} />}
            </AnimatePresence>
        </div>
    );
};

export default Healthline;