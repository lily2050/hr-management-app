const express = require('express');
const missionController = require('../controllers/missionController');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

router.get('/', protect, missionController.getMissions);
router.post('/', protect, missionController.createMission);
router.put('/:id/approve', protect, authorize('admin', 'hr', 'supervisor'), missionController.approveMission);
router.put('/:id/reject', protect, authorize('admin', 'hr', 'supervisor'), missionController.rejectMission);

module.exports = router;
