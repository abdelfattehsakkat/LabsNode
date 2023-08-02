// src/config/db.js

const mongoose = require('mongoose');

const url = 'mongodb://localhost:27017/mydb'; // Replace "mydb" with your desired database name

const connectDB = async () => {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
  }
};

module.exports = connectDB;
