const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', require('./routes/authRoutes'));
app.use('/api/grievances', require('./routes/grievanceRoutes'));

// Health check
app.get('/', (req, res) => {
  res.json({
    message: '🎓 Student Grievance Management API is running',
    version: '1.0.0',
    endpoints: {
      auth: ['POST /api/register', 'POST /api/login'],
      grievances: [
        'POST /api/grievances',
        'GET /api/grievances',
        'GET /api/grievances/search?title=xyz',
        'GET /api/grievances/:id',
        'PUT /api/grievances/:id',
        'DELETE /api/grievances/:id',
      ],
    },
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: `Route ${req.originalUrl} not found` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
