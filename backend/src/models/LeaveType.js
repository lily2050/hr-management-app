const mongoose = require('mongoose');

const leaveTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'نوع الإجازة مطلوب'],
      unique: true,
    },
    nameAr: {
      type: String,
      required: true,
    },
    annualBalance: {
      type: Number,
      required: true,
    },
    description: String,
    color: {
      type: String,
      default: '#2196F3',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('LeaveType', leaveTypeSchema);
