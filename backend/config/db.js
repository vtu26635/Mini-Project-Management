const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Connects to your local MongoDB instance
        await mongoose.connect('mongodb://127.0.0.1:27017/project_portal');
        console.log("MongoDB Connected Successfully!");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;