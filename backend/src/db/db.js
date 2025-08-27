const mongoose = require("mongoose");

const connect = async () => {
    try {
        console.log("Connecting to MongoDB...");
        await mongoose.connect(process.env.MONGODB_URI, {
            serverSelectionTimeoutMS: 5000, // 5 seconds timeout
            socketTimeoutMS: 45000, // 45 seconds timeout
        });
        
        console.log("✅ MongoDB connected successfully");
        
        // Log the database name and collections
        const collections = await mongoose.connection.db.listCollections().toArray();
        console.log("📚 Collections in database:", collections.map(c => c.name));
        
    } catch (error) {
        console.error("❌ MongoDB connection error:");
        console.error("Error name:", error.name);
        console.error("Error message:", error.message);
        console.error("Error code:", error.code);
        console.error("Error codeName:", error.codeName);
        
        // Graceful shutdown on connection error
        process.exit(1);
    }
};

// Handle connection events
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

mongoose.connection.on('disconnected', () => {
    console.log('MongoDB disconnected');});

module.exports = connect;