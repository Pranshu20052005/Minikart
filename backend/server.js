require('dotenv').config();
const app = require("./src/app");
const connect = require("./src/db/db");

const PORT = process.env.PORT || 3000;

// Connect to database first
connect().then(() => {
    // Start the server after successful database connection
    const server = app.listen(PORT, '0.0.0.0', () => {
        console.log(`🚀 Server running on port ${PORT}`);
        console.log(`🌐 Environment: ${process.env.NODE_ENV || 'development'}`);
        console.log(`🔗 MongoDB URI: ${process.env.MONGODB_URI ? 'Configured' : 'Not configured'}`);
    });

    // Handle server errors
    server.on('error', (error) => {
        if (error.syscall !== 'listen') {
            throw error;
        }

        // Handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(`Port ${PORT} requires elevated privileges`);
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`Port ${PORT} is already in use`);
                process.exit(1);
                break;
            default:
                throw error;
        }
    });
}).catch(error => {
    console.error('Failed to start server:', error);
    process.exit(1);
});