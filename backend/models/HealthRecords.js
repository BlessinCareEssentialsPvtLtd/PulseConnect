import mongoose from 'mongoose';

const healthRecordSchema = new mongoose.Schema({
  fileName: {
    type: String,
    required: true
  },
  patient_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  uploaded_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  file_url: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  isVerified:{
    type: Boolean,
    default: false
  },
  created_at: {
    type: Date,
    default: Date.now
  },
});

export default mongoose.model('HealthRecords', healthRecordSchema);