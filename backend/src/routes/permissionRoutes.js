const express = require('express');
const permissionController = require('../controllers/permissionController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, permissionController.getPermissions);
router.post('/', protect, permissionController.createPermission);
router.put('/:id/approve', protect, authorize('admin', 'hr', 'supervisor'), permissionController.approvePermission);
router.put('/:id/reject', protect, authorize('admin', 'hr', 'supervisor'), permissionController.rejectPermission);

module.exports = router;
