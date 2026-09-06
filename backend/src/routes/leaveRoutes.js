const express = require('express');
const leaveController = require('../controllers/leaveController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, leaveController.getLeaveRequests);
router.post('/', protect, leaveController.createLeaveRequest);
router.put('/:id/approve', protect, authorize('admin', 'hr', 'supervisor'), leaveController.approveLeaveRequest);
router.put('/:id/reject', protect, authorize('admin', 'hr', 'supervisor'), leaveController.rejectLeaveRequest);

module.exports = router;
