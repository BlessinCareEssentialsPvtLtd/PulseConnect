import express from 'express';
import upload from '../middleware/upload.js';
// import { verifyToken } from '../middleware/auth.js';
import {
    uploadHealthRecord,
    getHealthRecordsByPatient,
    deleteHealthRecord,
} from '../controllers/healthRecords.js';

const router = express.Router();

// Upload (protected)
// router.post('/upload', verifyToken, upload.single('file'), uploadHealthRecord);
router.post('/upload', upload.single('file'), uploadHealthRecord);

// Get records by patient ID
// router.get('/patient/:patientId', verifyToken, getHealthRecordsByPatient);
router.get('/patient/:patientId', getHealthRecordsByPatient);

// Delete record by ID
// router.delete('/:recordId', verifyToken, deleteHealthRecord);
router.post('/delete', deleteHealthRecord);


export default router;