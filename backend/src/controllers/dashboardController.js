const { sendSuccess, sendError } = require('../utils/responseHandler');
const LeaveRequest = require('../models/LeaveRequest');
const Permission = require('../models/Permission');
const Attendance = require('../models/Attendance');
const Mission = require('../models/Mission');
const Employee = require('../models/Employee');

const getDashboardStats = async (req, res, next) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Total employees
    const totalEmployees = await Employee.countDocuments({ status: 'active' });

    // Today's attendance
    const todayAttendance = await Attendance.find({
      date: { $gte: today, $lt: tomorrow }
    });

    const presentToday = todayAttendance.filter(a => a.status === 'present').length;
    const absentToday = todayAttendance.filter(a => a.status === 'absent').length;
    const onLeaveToday = todayAttendance.filter(a => a.status === 'leave').length;
    const onMissionToday = todayAttendance.filter(a => a.status === 'mission').length;
    const permissionToday = todayAttendance.filter(a => a.status === 'permission').length;

    // Pending requests
    const pendingLeaves = await LeaveRequest.countDocuments({ status: 'pending' });
    const pendingPermissions = await Permission.countDocuments({ status: 'pending' });
    const pendingMissions = await Mission.countDocuments({ status: 'pending' });

    // Approved and rejected
    const approvedLeaves = await LeaveRequest.countDocuments({ status: 'approved' });
    const rejectedLeaves = await LeaveRequest.countDocuments({ status: 'rejected' });

    sendSuccess(res, 200, {
      totalEmployees,
      presentToday,
      absentToday,
      onLeaveToday,
      onMissionToday,
      permissionToday,
      pendingLeaves,
      pendingPermissions,
      pendingMissions,
      approvedLeaves,
      rejectedLeaves
    });
  } catch (error) {
    next(error);
  }
};

const getLeaveStats = async (req, res, next) => {
  try {
    const leaveStats = await LeaveRequest.aggregate([
      { $match: { status: 'approved' } },
      { $group: { _id: '$leaveType', count: { $sum: 1 } } },
      { $lookup: { from: 'leavetypes', localField: '_id', foreignField: '_id', as: 'leaveTypeInfo' } }
    ]);

    sendSuccess(res, 200, leaveStats);
  } catch (error) {
    next(error);
  }
};

const getAttendanceStats = async (req, res, next) => {
  try {
    const { startDate, endDate } = req.query;
    let query = {};

    if (startDate && endDate) {
      query.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate)
      };
    }

    const attendanceStats = await Attendance.aggregate([
      { $match: query },
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    sendSuccess(res, 200, attendanceStats);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getDashboardStats,
  getLeaveStats,
  getAttendanceStats
};
