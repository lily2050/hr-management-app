const express = require('express');
const leaveTypeController = require('../controllers/leaveTypeController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, leaveTypeController.getLeaveTypes);
router.post('/', protect, authorize('admin', 'hr'), leaveTypeController.createLeaveType);
router.put('/:id', protect, authorize('admin', 'hr'), leaveTypeController.updateLeaveType);
router.delete('/:id', protect, authorize('admin'), leaveTypeController.deleteLeaveType);

module.exports = router;
