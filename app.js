const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());

app.use(express.json());

// Routes
const userRoute = require("./routes/user.route");
const announceRoute = require("./routes/Announce.route");

app.use("/api/user", userRoute);
app.use("/api/announce", announceRoute);

// Database connection
mongoose.connect(process.env.DATABASE)
    .then(() => {
        console.log("Connected successfully to the database");
        // Start server only after database connection
        const PORT = process.env.PORT || 3001;
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    })
    .catch((err) => {
        console.error("Error connecting to the database:", err);
        process.exit(1);
    });

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

module.exports = app;