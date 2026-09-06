const mongoose = require('mongoose');

const permissionTypeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'نوع الإذن مطلوب'],
      unique: true,
    },
    nameAr: {
      type: String,
      required: true,
    },
    description: String,
    color: {
      type: String,
      default: '#FF9800',
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

module.exports = mongoose.model('PermissionType', permissionTypeSchema);
