const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const seedAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/greenscape');

        const adminExists = await User.findOne({ email: 'admin@greenscape.com' });

        if (!adminExists) {
            await User.create({
                name: 'Admin User',
                email: 'admin@greenscape.com',
                password: 'admin123',
                phone: '9999999999',
                role: 'admin',
                address: 'Main Nursery, Green Valley'
            });
            console.log('✅ Admin user created successfully!');
        } else {
            console.log('ℹ️ Admin user already exists.');
        }

        process.exit();
    } catch (error) {
        console.error(`❌ Error seeding admin: ${error.message}`);
        process.exit(1);
    }
};

seedAdmin();
