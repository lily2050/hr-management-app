# 🔌 دليل التكامل والإضافات

## تكامل Services خارجية

### 1. تكامل البريد الإلكتروني (Email)

```javascript
// backend/src/services/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS
  }
});

const sendLeaveApprovalEmail = async (employee, leaveRequest) => {
  await transporter.sendMail({
    to: employee.email,
    subject: 'تم اعتماد طلب الإجازة',
    html: `<h2>تم اعتماد إجازتك</h2><p>من ${leaveRequest.startDate} إلى ${leaveRequest.endDate}</p>`
  });
};

module.exports = { sendLeaveApprovalEmail };
```

### 2. تكامل SMS

```javascript
// backend/src/services/smsService.js
const twilio = require('twilio');

const client = twilio(process.env.TWILIO_SID, process.env.TWILIO_TOKEN);

const sendLeaveNotification = async (phone, message) => {
  await client.messages.create({
    body: message,
    from: process.env.TWILIO_PHONE,
    to: phone
  });
};

module.exports = { sendLeaveNotification };
```

### 3. تكامل التخزين السحابي (Cloud Storage)

```javascript
// backend/src/services/storageService.js
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY
});

const uploadDocument = async (file, path) => {
  const params = {
    Bucket: process.env.AWS_BUCKET,
    Key: path,
    Body: file
  };
  return await s3.upload(params).promise();
};

module.exports = { uploadDocument };
```

---

## إضافة ميزات جديدة

### إضافة نوع تقرير جديد

1. أنشئ controller جديد
2. أضف routes جديد
3. استخدم MongoDB aggregation

```javascript
// مثال: تقرير الموظفين الأفضل أداءً
const getBestPerformers = async (req, res) => {
  const performers = await Employee.aggregate([
    { $match: { status: 'active' } },
    { $lookup: { from: 'leaveRequests', localField: '_id', foreignField: 'employee', as: 'leaves' } },
    { $addFields: { leaveCount: { $size: '$leaves' } } },
    { $sort: { leaveCount: 1 } },
    { $limit: 10 }
  ]);
  res.json(performers);
};
```

### إضافة نظام الإشعارات الفعلي

```javascript
// backend/src/services/notificationService.js
const Notification = require('../models/Notification');

const createNotification = async (userId, type, message, relatedId) => {
  const notification = await Notification.create({
    user: userId,
    type,
    message,
    relatedId
  });
  
  // ارسل WebSocket event
  io.to(userId).emit('notification', notification);
  
  return notification;
};
```

### إضافة نظام الموافقات متعددة المستويات

```javascript
// backend/src/models/ApprovalWorkflow.js
const approvalWorkflowSchema = new mongoose.Schema({
  leaveRequest: mongoose.Schema.ObjectId,
  levels: [
    {
      level: Number,
      approver: mongoose.Schema.ObjectId,
      status: String, // pending, approved, rejected
      date: Date,
      notes: String
    }
  ]
});
```

---

## اختبار الميزات الجديدة

### اختبار Unit
```bash
npm install --save-dev jest
npm test
```

### اختبار Integration
```bash
# استخدم Postman Collection
```

---

## الأداء والتحسينات

### 1. Caching
```javascript
const redis = require('redis');
const client = redis.createClient();

const getEmployeesWithCache = async () => {
  const cached = await client.get('employees');
  if (cached) return JSON.parse(cached);
  
  const employees = await Employee.find();
  await client.setex('employees', 3600, JSON.stringify(employees));
  return employees;
};
```

### 2. Pagination
```javascript
const getEmployees = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;
  return Employee.find().skip(skip).limit(limit);
};
```

### 3. Indexing
```javascript
// في Schema
employeeSchema.index({ email: 1 });
employeeSchema.index({ department: 1 });
employeeSchema.index({ createdAt: -1 });
```

---

## أمان إضافي

### 1. Rate Limiting
```javascript
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
});

app.use('/api/', limiter);
```

### 2. CSRF Protection
```javascript
const csrf = require('csurf');
const csrfProtection = csrf({ cookie: false });

app.post('/api/leaves', csrfProtection, ...);
```

### 3. Input Sanitization
```javascript
const mongoSanitize = require('express-mongo-sanitize');
app.use(mongoSanitize());
```

---

## الخطوات التالية

1. إضافة WebSocket للإشعارات الفعلية
2. تطبيق نظام السجلات المتقدم
3. إضافة Analytics والرسوم البيانية المتقدمة
4. تكامل مع أنظمة الرواتب
5. تطبيق التطبيق الويب (Web Version)

