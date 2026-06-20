const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const taskRoutes = require('./routes/taskRoutes');

const app = express();

// Connect Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json()); // Allows parsing JSON data

// API Routes
app.use('/api/tasks', taskRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));