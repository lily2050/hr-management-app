const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'خطأ في التحقق من البيانات',
      errors: Object.values(err.errors).map(e => e.message)
    });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'معرف غير صحيح' });
  }

  if (err.code === 11000) {
    return res.status(400).json({ message: 'هذا السجل موجود بالفعل' });
  }

  res.status(err.statusCode || 500).json({
    message: err.message || 'حدث خطأ في الخادم'
  });
};

module.exports = errorHandler;
