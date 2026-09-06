const express = require('express');
const employeeController = require('../controllers/employeeController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, employeeController.getEmployees);
router.get('/:id', protect, employeeController.getEmployeeById);
router.post('/', protect, authorize('admin', 'hr'), employeeController.createEmployee);
router.put('/:id', protect, authorize('admin', 'hr'), employeeController.updateEmployee);
router.delete('/:id', protect, authorize('admin'), employeeController.deleteEmployee);

module.exports = router;
