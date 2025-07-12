import React, { useState } from 'react';
import file from '../assets/hello.pdf';
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
    <div className="w-full p-6 bg-white shadow-lg rounded-xl border border-gray-200 space-y-4">
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
    <div className="w-full p-6 bg-white shadow-lg rounded-xl border border-gray-200 space-y-4">
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
    <iframe src={fileUrl} title={title} className="w-full h-[500px] border rounded-md" />
  </div>
);


const Sidebar = ({ item, onClose }) => {
  return (
    <motion.div
      initial={{ x: '100%' }}
      animate={{ x: 0 }}
      exit={{ x: '100%' }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 right-0 h-full w-[90%] md:w-[30%] bg-white shadow-lg z-50 overflow-y-auto p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-semibold text-gray-800">Details</h3>
        <button onClick={onClose}>
          <X className="w-6 h-6 text-gray-700 hover:text-red-500" />
        </button>
      </div>
      <div>
        {item.type === 'record' && (
          <RecordViewer title={item.title} fileUrl={file} />
        )}
        {item.type === 'diagnosis' && <DiagnosisDetails data={item} />}
        {item.type === 'prescription' && <PrescriptionDetails data={item} />}
      </div>
    </motion.div>
  );
};

const Timeline = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="py-10 px-6 lg:px-20 bg-gray-100 min-h-screen flex flex-col items-center justify-center relative">
      <h2 className="text-3xl font-semibold mb-10  text-gray-800">Patient Timeline</h2>
      <div className="relative border-l-2 border-gray-400 ml-4 w-[90%]">
        {timelineData.map((item, index) => {
          const styles = typeStyles[item.type];
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.4, ease: 'easeOut' }}
              className="mb-10 ml-6 -mt-2 group relative"
              onClick={() => setSelectedItem(item)}
            >
              <div className='flex justify-around items-center gap-2'>
                <div className="absolute -left-36 flex items-center space-x-2 w-24">
                  <span className="m-2 hidden md:inline text-sm text-gray-700 font-semibold text-right w-full">
                    {new Date(item.date).toLocaleDateString()}
                  </span>
                </div>
                <span className="absolute -left-11 flex items-center justify-center w-10 h-10 bg-white border-2 border-gray-400 rounded-full z-10">
                  {styles.icon}
                </span>
              </div>

              <div
                className={clsx(
                  'p-3 md:p-5 ml-2 w-max rounded-md shadow-md transition-all duration-300 hover:scale-[1.01] hover:shadow-md',
                  styles.border,
                  styles.bg
                )}
              >
                <h2 className="text-xl font-semibold text-gray-900">{item.title}</h2>
                <p className="text-gray-800 mt-2 text-base">{item.description}</p>
                <span className="inline md:hidden text-xs text-gray-700 font-semibold text-right w-full">
                  {new Date(item.date).toLocaleDateString()}
                </span>
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

export default Timeline;
