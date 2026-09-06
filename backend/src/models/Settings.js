const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema(
  {
    organizationName: {
      type: String,
      default: 'الشركة العربية',
    },
    organizationLogo: String,
    organizationAddress: String,
    organizationPhone: String,
    organizationEmail: String,
    // Leave Settings
    annualLeaveBalance: {
      type: Number,
      default: 30,
    },
    emergencyLeaveBalance: {
      type: Number,
      default: 5,
    },
    medicalLeaveBalance: {
      type: Number,
      default: 15,
    },
    // Permission Settings
    dailyPermissionLimit: {
      type: Number,
      default: 2, // hours
    },
    monthlyPermissionLimit: {
      type: Number,
      default: 8, // hours
    },
    yearlyPermissionLimit: {
      type: Number,
      default: 40, // hours
    },
    // Working Hours
    workStartTime: {
      type: String,
      default: '08:00',
    },
    workEndTime: {
      type: String,
      default: '17:00',
    },
    // Timezone
    timezone: {
      type: String,
      default: 'Asia/Riyadh',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Settings', settingsSchema);
