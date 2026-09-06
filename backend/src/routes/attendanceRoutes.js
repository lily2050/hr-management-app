const express = require('express');
const attendanceController = require('../controllers/attendanceController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, attendanceController.getAttendance);
router.get('/today', protect, attendanceController.getTodayAttendance);
router.post('/', protect, authorize('admin', 'hr'), attendanceController.recordAttendance);
router.put('/:id', protect, authorize('admin', 'hr'), attendanceController.updateAttendance);

module.exports = router;
