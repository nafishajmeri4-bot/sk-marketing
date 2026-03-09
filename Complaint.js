const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
    branchId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    branchName: { type: String, required: true },
    bank: { type: String, required: true },
    acType: { type: String, required: true },
    issueCategory: { type: String, required: true },
    urgency: { type: String, enum: ['Normal', 'Urgent', 'Emergency'], default: 'Normal' },
    description: { type: String },
    status: { type: String, enum: ['Pending', 'Assigned', 'On-Site', 'Completed'], default: 'Pending' },
    technician: { type: String, default: 'Unassigned' },
    photoUrl: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Complaint', complaintSchema);
