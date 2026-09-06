require('dotenv').config();
require('express-async-errors');
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const errorHandler = require('./middleware/errorHandler');

// Import routes
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const leaveRoutes = require('./routes/leaveRoutes');
const permissionRoutes = require('./routes/permissionRoutes');
const attendanceRoutes = require('./routes/attendanceRoutes');
const missionRoutes = require('./routes/missionRoutes');
const leaveTypeRoutes = require('./routes/leaveTypeRoutes');
const permissionTypeRoutes = require('./routes/permissionTypeRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const settingsRoutes = require('./routes/settingsRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

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
app.use('/api/leaves', leaveRoutes);
app.use('/api/permissions', permissionRoutes);
app.use('/api/attendance', attendanceRoutes);
app.use('/api/missions', missionRoutes);
app.use('/api/leave-types', leaveTypeRoutes);
app.use('/api/permission-types', permissionTypeRoutes);
app.use('/api/departments', departmentRoutes);
app.use('/api/settings', settingsRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'نظام إدارة الموارد البشرية يعمل بشكل صحيح' });
});

// Error handling
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`\n========================================`);
  console.log(`✅ الخادم يعمل على المنفذ ${PORT}`);
  console.log(`📍 الرابط: http://localhost:${PORT}`);
  console.log(`🔗 API Health: http://localhost:${PORT}/api/health`);
  console.log(`========================================\n`);
});
