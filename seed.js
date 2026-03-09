const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Complaint = require('./models/Complaint');
const dotenv = require('dotenv');

dotenv.config();

const seed = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/sk-marketing');
        console.log('Connected to MongoDB for seeding...');

        // Clear existing data
        await User.deleteMany();
        await Complaint.deleteMany();

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);

        // Create Admin
        const admin = new User({
            name: 'SK Operations Head',
            email: 'admin@skmarketing.com',
            password: hashedPassword,
            role: 'admin'
        });
        await admin.save();

        // Create Branch Manager
        const branch = new User({
            name: 'SBI Mumbai Manager',
            email: 'fort@sbi.com',
            password: hashedPassword,
            role: 'branch',
            bank: 'SBI',
            branchName: 'Mumbai Fort'
        });
        await branch.save();

        // Create Sample Complaints
        const complaints = [
            {
                branchId: branch._id,
                branchName: branch.branchName,
                bank: branch.bank,
                acType: 'Split AC',
                issueCategory: 'Not Cooling',
                urgency: 'Urgent',
                description: 'Unit 4 in the back office is not cooling at all.',
                status: 'Pending'
            },
            {
                branchId: branch._id,
                branchName: branch.branchName,
                bank: branch.bank,
                acType: 'Window AC',
                issueCategory: 'Strange Noise',
                urgency: 'Normal',
                description: 'Manager office AC making loud rattling sound.',
                status: 'Assigned',
                technician: 'Rahul Sharma'
            }
        ];
        await Complaint.insertMany(complaints);

        console.log('✅ Seeding completed successfully!');
        process.exit();
    } catch (err) {
        console.error('❌ Seeding failed:', err);
        process.exit(1);
    }
};

seed();
