import HealthRecord from '../models/HealthRecords.js';
import cloudinary from '../utils/cloudinary.js';
import fs from 'fs';

// ===============
// Upload Record
// ===============
export const uploadHealthRecord = async (req, res) => {
  try {
    const { fileName, description, patient_id,uploaded_by } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, error: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: 'auto',
      folder: 'health_records',
    });

    fs.unlinkSync(req.file.path);

    const record = new HealthRecord({
      fileName,
      patient_id,
      uploaded_by,
      file_url: result.secure_url,
      description,
    });

    await record.save();

    res.status(201).json({ success: true, message: 'Health record uploaded', record });

  } catch (error) {
    console.error('Upload error:', error.message);
    res.status(500).json({ success: false, error: 'Upload failed' });
  }
};

// ===============
// Get Records By Patient
// ===============
export const getHealthRecordsByPatient = async (req, res) => {
  try {
    const { patientId } = req.params;

    const records = await HealthRecord.find({ patient_id: patientId }).sort({ created_at: -1 });

    res.status(200).json({ success: true, records });
  } catch (error) {
    console.error('Fetch error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to fetch health records' });
  }
};

// ===============
// Delete Record
// ===============
export const deleteHealthRecord = async (req, res) => {
  console.log('Delete request body:', req.body);
  try {
    const { recordId,userId } = req.body;

    const record = await HealthRecord.findById(recordId);
    if (!record) {
      return res.status(404).json({ success: false, error: 'Record not found' });
    }

    // Only uploader can delete
    if (String(record.patient_id) !== userId) {
      return res.status(403).json({ success: false, error: 'Unauthorized to delete this record' });
    }

    // Delete from Cloudinary
    if (record.cloudinary_id) {
      await cloudinary.uploader.destroy(record.cloudinary_id, { resource_type: 'auto' });
    }

    await HealthRecord.findByIdAndDelete(recordId);

    res.status(200).json({ success: true, message: 'Record deleted successfully' });
    console.log('Record deleted successfully:', recordId);
  } catch (error) {
    console.error('Delete error:', error.message);
    res.status(500).json({ success: false, error: 'Failed to delete health record' });
  }
};