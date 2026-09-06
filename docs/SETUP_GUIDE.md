# دليل تشغيل نظام إدارة الموارد البشرية

## 🚀 البدء السريع

### 1. تثبيت المتطلبات
```bash
# Node.js و npm
# MongoDB
```

### 2. تشغيل Backend
```bash
cd backend
npm install
cp .env.example .env
npm run seed  # إنشاء البيانات التجريبية
npm run dev   # تشغيل الخادم
```

سيعمل الخادم على: `http://localhost:5000`

### 3. تشغيل Frontend
```bash
cd frontend
npm install
npm start
```

ثم اختر:
- `a` للـ Android
- `i` للـ iOS
- `w` للـ Web

## 📱 بيانات الدخول التجريبية

### مدير النظام
- البريد: `admin@company.com`
- كلمة المرور: `Admin@123`

### موظف عادي
- البريد: `employee@company.com`
- كلمة المرور: `Employee@123`

## 🛠️ API Endpoints الرئيسية

### المصادقة
- `POST /api/auth/login` - تسجيل الدخول
- `POST /api/auth/logout` - تسجيل الخروج
- `GET /api/auth/me` - بيانات المستخدم الحالي

### الموظفون
- `GET /api/employees` - قائمة الموظفين
- `POST /api/employees` - إضافة موظف
- `PUT /api/employees/:id` - تحديث موظف
- `DELETE /api/employees/:id` - حذف موظف

### الإجازات
- `GET /api/leaves` - قائمة طلبات الإجازات
- `POST /api/leaves` - إنشاء طلب إجازة
- `PUT /api/leaves/:id/approve` - اعتماد الإجازة
- `PUT /api/leaves/:id/reject` - رفض الإجازة

### الأذونات
- `GET /api/permissions` - قائمة الأذونات
- `POST /api/permissions` - إنشاء إذن
- `PUT /api/permissions/:id/approve` - اعتماد الإذن
- `PUT /api/permissions/:id/reject` - رفض الإذن

### الحضور والغياب
- `GET /api/attendance` - سجل الحضور
- `POST /api/attendance` - تسجيل الحضور
- `GET /api/attendance/today` - حضور اليوم

### لوحة التحكم
- `GET /api/dashboard/stats` - إحصائيات عامة
- `GET /api/dashboard/leave-stats` - إحصائيات الإجازات
- `GET /api/dashboard/attendance-stats` - إحصائيات الحضور

## 📝 ملاحظات مهمة

1. تأكد من تشغيل MongoDB قبل بدء الخادم
2. يتم إنشاء البيانات التجريبية تلقائياً عند تشغيل `npm run seed`
3. استخدم Postman أو Insomnia لاختبار API
4. توكن JWT ينتهي بعد 7 أيام

## 🔐 الصلاحيات

- **Admin**: جميع الصلاحيات
- **HR**: إدارة الموظفين والطلبات
- **Supervisor**: مراجعة واعتماد الطلبات
- **Employee**: تقديم الطلبات والعرض فقط

## 📚 التوثيق الكاملة

انظر ملف README.md في الجذر للمزيد من المعلومات.
