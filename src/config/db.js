const mongoose = require('mongoose');

function connectDB() {
    mongoose.connect(process.env.DB_CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    // Connection successful
    mongoose.connection.once('open', () => {
        console.log('Connected to MongoDB successfully.');
    });

    // Connection errors
    mongoose.connection.on('error', (err) => {
        console.error('MongoDB connection error:', err);
    });
}

module.exports = connectDB;
