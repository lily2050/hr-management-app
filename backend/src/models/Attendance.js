const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ['present', 'absent', 'leave', 'permission', 'mission', 'holiday'],
      default: 'present',
    },
    checkInTime: Date,
    checkOutTime: Date,
    notes: String,
    relatedLeave: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'LeaveRequest',
    },
    relatedPermission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Permission',
    },
    relatedMission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Mission',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Attendance', attendanceSchema);
