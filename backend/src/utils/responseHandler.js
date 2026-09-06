const sendSuccess = (res, statusCode, data, message = 'تم بنجاح') => {
  res.status(statusCode).json({
    success: true,
    message,
    data
  });
};

const sendError = (res, statusCode, message = 'حدث خطأ') => {
  res.status(statusCode).json({
    success: false,
    message
  });
};

module.exports = { sendSuccess, sendError };
