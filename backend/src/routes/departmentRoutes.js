const express = require('express');
const departmentController = require('../controllers/departmentController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, departmentController.getDepartments);
router.post('/', protect, authorize('admin', 'hr'), departmentController.createDepartment);
router.put('/:id', protect, authorize('admin', 'hr'), departmentController.updateDepartment);
router.delete('/:id', protect, authorize('admin'), departmentController.deleteDepartment);

module.exports = router;
