const { sendSuccess, sendError } = require('../utils/responseHandler');
const PermissionType = require('../models/PermissionType');

const getPermissionTypes = async (req, res, next) => {
  try {
    const permissionTypes = await PermissionType.find({ isActive: true });
    sendSuccess(res, 200, permissionTypes);
  } catch (error) {
    next(error);
  }
};

const createPermissionType = async (req, res, next) => {
  try {
    const permissionType = await PermissionType.create(req.body);
    sendSuccess(res, 201, permissionType, 'تم إنشاء نوع الإذن بنجاح');
  } catch (error) {
    next(error);
  }
};

const updatePermissionType = async (req, res, next) => {
  try {
    const permissionType = await PermissionType.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!permissionType) {
      return sendError(res, 404, 'نوع الإذن غير موجود');
    }

    sendSuccess(res, 200, permissionType, 'تم تحديث نوع الإذن بنجاح');
  } catch (error) {
    next(error);
  }
};

const deletePermissionType = async (req, res, next) => {
  try {
    const permissionType = await PermissionType.findByIdAndUpdate(
      req.params.id,
      { isActive: false },
      { new: true }
    );

    if (!permissionType) {
      return sendError(res, 404, 'نوع الإذن غير موجود');
    }

    sendSuccess(res, 200, permissionType, 'تم حذف نوع الإذن بنجاح');
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getPermissionTypes,
  createPermissionType,
  updatePermissionType,
  deletePermissionType
};
