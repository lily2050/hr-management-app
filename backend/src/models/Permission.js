const mongoose = require('mongoose');

const permissionSchema = new mongoose.Schema(
  {
    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Employee',
      required: true,
    },
    date: {
      type: Date,
      required: [true, 'التاريخ مطلوب'],
    },
    outTime: {
      type: String,
      required: [true, 'وقت الخروج مطلوب'],
    },
    returnTime: {
      type: String,
      required: [true, 'وقت العودة مطلوب'],
    },
    duration: {
      type: Number, // in minutes
      required: true,
    },
    permissionType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'PermissionType',
      required: true,
    },
    reason: String,
    status: {
      type: String,
      enum: ['pending', 'approved', 'rejected', 'cancelled'],
      default: 'pending',
    },
    approvedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    approvalDate: Date,
    notes: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Permission', permissionSchema);
