const express = require('express');
const router = express.Router();
const Complaint = require('../models/Complaint');
const { auth, adminOnly } = require('../middleware/auth');

// @route   GET api/complaints
// @desc    Get all complaints (Admin view)
// @access  Private/Admin
router.get('/', [auth, adminOnly], async (req, res) => {
    try {
        const complaints = await Complaint.find().sort({ createdAt: -1 });
        res.json(complaints);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   POST api/complaints
// @desc    Create a new complaint
// @access  Private/Branch
router.post('/', auth, async (req, res) => {
    const { acType, issueCategory, urgency, description, photoUrl } = req.body;
    try {
        const newComplaint = new Complaint({
            branchId: req.user.id,
            branchName: req.user.branchName,
            bank: req.user.bank,
            acType,
            issueCategory,
            urgency,
            description,
            photoUrl
        });

        const complaint = await newComplaint.save();
        res.json(complaint);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/complaints/:id
// @desc    Update complaint status/technician
// @access  Private/Admin
router.put('/:id', [auth, adminOnly], async (req, res) => {
    const { status, technician } = req.body;
    try {
        let complaint = await Complaint.findById(req.params.id);
        if (!complaint) return res.status(404).json({ msg: 'Complaint not found' });

        complaint = await Complaint.findByIdAndUpdate(
            req.params.id,
            { $set: { status, technician } },
            { new: true }
        );
        res.json(complaint);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
