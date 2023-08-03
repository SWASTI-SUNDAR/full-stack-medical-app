const mongoose = require('mongoose');
const colors = require("colors");
const connectDB = async () => {
    try {
        mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connected');
    } catch (error) {
        console.log(error)
    }
}

module.exports = connectDB;