import mongoose from 'mongoose';
import dotenv from 'dotenv';
import HealthRecord from '../backend/models/HealthRecords.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI; // Ensure this is set in your .env

const seedHealthRecords = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ MongoDB connected');

    const dummyPatientId = '64a4a9f1e3c8fa001234abcd';
    const dummyUserId = '64a4a9f1e3c8fa00abcd1234';

    const sampleRecords = [
      {
        fileName: 'Chest X-Ray',
        patient_id: dummyPatientId,
        uploaded_by: dummyUserId,
        file_url: 'https://res.cloudinary.com/demo/image/upload/v1620000001/chest-xray.jpg',
        description: 'Chest X-ray to check for infection',
        isVerified: 'verified',
      },
      {
        fileName: 'CBC Blood Test',
        patient_id: dummyPatientId,
        uploaded_by: dummyUserId,
        file_url: 'https://res.cloudinary.com/demo/image/upload/v1620000002/cbc-report.pdf',
        description: 'Complete blood count test',
        isVerified: 'rejected',
      },
      {
        fileName: 'MRI Brain Scan',
        patient_id: dummyPatientId,
        uploaded_by: dummyUserId,
        file_url: 'https://res.cloudinary.com/demo/image/upload/v1620000003/mri-brain.jpg',
        description: 'MRI report for neurological check',
        isVerified: 'verified',
      },
      {
        fileName: 'Diabetes Report',
        patient_id: dummyPatientId,
        uploaded_by: dummyUserId,
        file_url: 'https://res.cloudinary.com/demo/image/upload/v1620000004/diabetes.pdf',
        description: 'Fasting blood sugar levels',
        isVerified: 'pending',
      },
      {
        fileName: 'Prescription March 2025',
        patient_id: dummyPatientId,
        uploaded_by: dummyUserId,
        file_url: 'https://res.cloudinary.com/demo/image/upload/v1620000005/prescription-march.txt',
        description: 'Dr. Smith’s prescriptions',
        isVerified: 'verified',
      },
      {
        fileName: 'Urine Test',
        patient_id: dummyPatientId,
        uploaded_by: dummyUserId,
        file_url: 'https://res.cloudinary.com/demo/image/upload/v1620000006/urine-test.pdf',
        description: 'Urinalysis for UTI detection',
        isVerified: 'rejected',
      },
      {
        fileName: 'ECG Report',
        patient_id: dummyPatientId,
        uploaded_by: dummyUserId,
        file_url: 'https://res.cloudinary.com/demo/image/upload/v1620000007/ecg.jpg',
        description: 'Heart rhythm report',
        isVerified: 'verified',
      },
      {
        fileName: 'Eye Report',
        patient_id: dummyPatientId,
        uploaded_by: dummyUserId,
        file_url: 'https://res.cloudinary.com/demo/image/upload/v1620000008/eye-report.jpg',
        description: 'Retina and vision scan',
        isVerified: 'pending',
      },
    ];

    // Optional: clear existing records
    await HealthRecord.deleteMany({});
    const inserted = await HealthRecord.insertMany(sampleRecords);

    console.log(`✅ Seeded ${inserted.length} health records.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error.message);
    process.exit(1);
  }
};

seedHealthRecords();
