const express = require('express');
const dashboardController = require('../controllers/dashboardController');
const { protect } = require('../middleware/auth');

const router = express.Router();

router.get('/stats', protect, dashboardController.getDashboardStats);
router.get('/leave-stats', protect, dashboardController.getLeaveStats);
router.get('/attendance-stats', protect, dashboardController.getAttendanceStats);

module.exports = router;
