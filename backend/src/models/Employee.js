const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    employeeCode: {
      type: String,
      required: [true, 'كود الموظف مطلوب'],
      unique: true,
    },
    jobNumber: {
      type: String,
      unique: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Department',
      required: true,
    },
    section: String,
    position: String,
    grade: String,
    hireDate: Date,
    birthDate: Date,
    nationalId: {
      type: String,
      unique: true,
    },
    directManager: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
    },
    status: {
      type: String,
      enum: ['active', 'inactive', 'on_leave', 'terminated'],
      default: 'active',
    },
    // Leave Balance
    annualLeaveBalance: {
      type: Number,
      default: 30,
    },
    usedAnnualLeave: {
      type: Number,
      default: 0,
    },
    emergencyLeaveBalance: {
      type: Number,
      default: 5,
    },
    usedEmergencyLeave: {
      type: Number,
      default: 0,
    },
    medicalLeaveBalance: {
      type: Number,
      default: 15,
    },
    usedMedicalLeave: {
      type: Number,
      default: 0,
    },
    // Permission tracking
    monthlyPermissionHours: {
      type: Number,
      default: 8,
    },
    usedPermissionHours: {
      type: Number,
      default: 0,
    },
    notes: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Employee', employeeSchema);
