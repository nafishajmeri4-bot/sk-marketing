const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth } = require('../middleware/auth');

// @route   POST api/auth/register
// @desc    Register a user
// @access  Public
router.post('/register', async (req, res) => {
    const { name, email, password, role, bank, branchName } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) return res.status(400).json({ msg: 'User already exists' });

        user = new User({ name, email, password, role, bank, branchName });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();

        const payload = { id: user.id, role: user.role, name: user.name, bank: user.bank, branchName: user.branchName };
        jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: payload });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'Invalid Credentials' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' });

        const payload = { id: user.id, role: user.role, name: user.name, bank: user.bank, branchName: user.branchName };
        jwt.sign(payload, process.env.JWT_SECRET || 'secret', { expiresIn: 360000 }, (err, token) => {
            if (err) throw err;
            res.json({ token, user: payload });
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   GET api/auth/branches
// @desc    Get all branch users
// @access  Private/Admin
router.get('/branches', [auth], async (req, res) => {
    try {
        const branches = await User.find({ role: 'branch' }).select('-password');
        res.json(branches);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

// @route   PUT api/auth/password/:id
// @desc    Update user password
// @access  Private
router.put('/password/:id', auth, async (req, res) => {
    const { password } = req.body;

    // Check if admin OR if user is updating their own password
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
        return res.status(403).json({ msg: 'Not authorized to change this password' });
    }

    try {
        let user = await User.findById(req.params.id);
        if (!user) return res.status(404).json({ msg: 'User not found' });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.json({ msg: 'Password updated successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
});

module.exports = router;
