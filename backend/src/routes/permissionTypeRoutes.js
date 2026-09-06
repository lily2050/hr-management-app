const express = require('express');
const permissionTypeController = require('../controllers/permissionTypeController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, permissionTypeController.getPermissionTypes);
router.post('/', protect, authorize('admin', 'hr'), permissionTypeController.createPermissionType);
router.put('/:id', protect, authorize('admin', 'hr'), permissionTypeController.updatePermissionType);
router.delete('/:id', protect, authorize('admin'), permissionTypeController.deletePermissionType);

module.exports = router;
