require('dotenv').config();
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect to Database
connectDB();

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/employees', employeeRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'نظام إدارة الموارد البشرية يعمل بشكل صحيح' });
});

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`الخادم يعمل على المنفذ ${PORT}`);
});
