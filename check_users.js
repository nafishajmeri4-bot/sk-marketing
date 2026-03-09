const mongoose = require('mongoose');
const User = require('./models/User');
require('dotenv').config();

const test = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');
        const users = await User.find({}, 'name email role');
        console.log('Found Users:', JSON.stringify(users, null, 2));
        process.exit();
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
};

test();
