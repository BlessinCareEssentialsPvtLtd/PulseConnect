const mongoose = require('mongoose');

const requestSchema = new mongoose.Schema({
    patientUID: {
        type: String,
        required: true,
    },
    doctorID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
    },
    PatientName: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    doctorName: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['pending', 'approved', 'rejected'],
        default: 'pending',
    },
    read: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },

    expiresAt: {
        type: Date,
        required: true,
    },
});

const Request = mongoose.model('Request', requestSchema);

module.exports = Request;