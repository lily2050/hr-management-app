const mongoose = require('mongoose');

const auditLogSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      enum: ['create', 'update', 'delete', 'approve', 'reject'],
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
    recordId: mongoose.Schema.Types.ObjectId,
    changes: mongoose.Schema.Types.Mixed,
    oldValues: mongoose.Schema.Types.Mixed,
    newValues: mongoose.Schema.Types.Mixed,
    ipAddress: String,
    userAgent: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('AuditLog', auditLogSchema);
