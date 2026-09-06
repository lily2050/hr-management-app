const { sendSuccess, sendError } = require('../utils/responseHandler');
const Mission = require('../models/Mission');

const getMissions = async (req, res, next) => {
  try {
    const { employee, status, page = 1, limit = 10 } = req.query;
    let query = {};

    if (employee) query.employee = employee;
    if (status) query.status = status;

    const skip = (page - 1) * limit;
    const missions = await Mission.find(query)
      .populate('employee')
      .populate('approvedBy')
      .skip(skip)
      .limit(parseInt(limit))
      .sort({ createdAt: -1 });

    const total = await Mission.countDocuments(query);
    sendSuccess(res, 200, { missions, total, page, limit });
  } catch (error) {
    next(error);
  }
};

const createMission = async (req, res, next) => {
  try {
    const mission = await Mission.create(req.body);
    await mission.populate('employee');
    sendSuccess(res, 201, mission, 'تم إنشاء المأمورية بنجاح');
  } catch (error) {
    next(error);
  }
};

const approveMission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { notes } = req.body;

    const mission = await Mission.findByIdAndUpdate(
      id,
      {
        status: 'approved',
        approvedBy: req.user._id,
        approvalDate: new Date(),
        notes
      },
      { new: true }
    ).populate('employee');

    if (!mission) {
      return sendError(res, 404, 'المأمورية غير موجودة');
    }

    sendSuccess(res, 200, mission, 'تم اعتماد المأمورية');
  } catch (error) {
    next(error);
  }
};

const rejectMission = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { rejectionReason } = req.body;

    const mission = await Mission.findByIdAndUpdate(
      id,
      {
        status: 'rejected',
        approvedBy: req.user._id,
        approvalDate: new Date(),
        rejectionReason
      },
      { new: true }
    ).populate('employee');

    if (!mission) {
      return sendError(res, 404, 'المأمورية غير موجودة');
    }

    sendSuccess(res, 200, mission, 'تم رفض المأمورية');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getMissions,
  createMission,
  approveMission,
  rejectMission
};
