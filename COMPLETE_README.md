# 📱 تطبيق إدارة الإجازات والأذونات اليومية
## Professional HR Management Application

**تطبيق Android احترافي متخصص في إدارة ومتابعة الإجازات والأذونات والغياب والمأموريات**

---

## ✨ الميزات الرئيسية

### 🔐 نظام الصلاحيات المتقدم
- ✅ **المدير (Administrator)**: إدارة كاملة للنظام والموظفين والإعدادات
- ✅ **الموارد البشرية (HR)**: إدارة البيانات والسجلات والطلبات
- ✅ **المشرف (Supervisor)**: مراجعة واعتماد طلبات الموظفين
- ✅ **الموظف (Employee)**: تقديم الطلبات وعرض السجلات الشخصية

### 📊 لوحة التحكم المتقدمة
- 📈 إحصائيات شاملة للحضور والغياب والإجازات
- 📊 رسوم بيانية حديثة وتفاعلية (Pie, Bar, Line Charts)
- 🔔 عرض الطلبات المعلقة والمعتمدة والمرفوضة
- 📅 تقويم شهري للحالات الموظفين

### 👥 إدارة الموظفين الشاملة
- ✅ بيانات موظف تفصيلية (شخصية، وظيفية، مالية)
- ✅ ملفات شخصية احترافية مع صور
- ✅ البحث والفلترة والترتيب المتقدم
- ✅ تتبع الأداء والإحصائيات

### 🏖️ نظام الإجازات المتكامل
- 📋 أنواع إجازات قابلة للتخصيص (اعتيادية، مرضية، عارضة، إلخ)
- 🧮 حساب تلقائي لعدد الأيام
- 💾 تتبع الأرصدة المتبقية والمستخدمة
- ⚠️ تنبيهات عند قرب انتهاء الرصيد

### ⏰ نظام الأذونات اليومية
- ⚡ تسجيل سريع للأذونات (ثواني)
- 🔢 حساب تلقائي لمدة الإذن
- 📊 تحديد حد أقصى للأذونات يومياً وشهرياً
- 🚨 تنبيهات عند تجاوز الحد المسموح

### 📈 نظام التقارير الشامل
- 📅 تقارير يومية وشهرية وسنوية
- 🔍 تقارير مخصصة حسب التاريخ والقسم
- 📊 تقارير الإجازات والأذونات والغياب
- 💾 تصدير إلى PDF و Excel

### 📱 واجهة عربية احترافية
- ✅ دعم كامل للغة العربية (RTL)
- ✅ تصميم حديث وسهل الاستخدام
- ✅ متجاوب على جميع الشاشات والأجهزة
- ✅ تصميم Material Design حديث

---

## 🛠️ التقنية المستخدمة

### Frontend
- **React Native** مع **Expo** - تطبيق Android/iOS/Web موحد
- **Redux** - إدارة الحالة المركزية
- **React Navigation** - ملاحة احترافية
- **React Native Paper** - مكتبة Material Design
- **Axios** - طلبات HTTP
- **react-native-chart-kit** - رسوم بيانية
- **date-fns** - معالجة التواريخ

### Backend
- **Node.js** و **Express.js** - خادم قوي وسريع
- **MongoDB** - قاعدة بيانات NoSQL مرنة
- **Mongoose** - ODM لـ MongoDB
- **JWT** - مصادقة آمنة
- **bcryptjs** - تشفير كلمات المرور
- **Joi** - التحقق من صحة البيانات
- **CORS** - الاتصالات الآمنة

### قاعدة البيانات
- **MongoDB** مع 10 جداول رئيسية
- **العلاقات المعقدة** بين الجداول
- **Indexes** لتسريع الاستعلامات
- **Validation Rules** قوية

---

## 📦 هيكل المشروع

```
hr-management-app/
├── backend/                           # خادم Node.js
│   ├── src/
│   │   ├── models/                   # نماذج MongoDB (11 model)
│   │   ├── controllers/              # معالجات الطلبات (8 controllers)
│   │   ├── routes/                   # مسارات API (11 routes)
│   │   ├── middleware/               # البرمجيات الوسيطة (auth, error)
│   │   ├── services/                 # خدمات الأعمال
│   │   ├── utils/                    # أدوات مساعدة (validation, response)
│   │   ├── config/                   # إعدادات (database)
│   │   └── index.js                  # نقطة الدخول الرئيسية
│   ├── seeds/                        # بيانات تجريبية
│   ├── package.json
│   ├── .env.example
│   └── .gitignore
│
├── frontend/                          # تطبيق React Native
│   ├── src/
│   │   ├── screens/                  # شاشات التطبيق (7 screens)
│   │   ├── components/               # مكونات قابلة لإعادة الاستخدام
│   │   ├── navigation/               # ملاحة التطبيق
│   │   ├── redux/
│   │   │   ├── store.js
│   │   │   └── slices/               # Redux slices (4 slices)
│   │   ├── services/                 # خدمات API (4 services)
│   │   ├── utils/                    # أدوات مساعدة
│   │   ├── constants/                # الثوابت والألوان
│   │   └── styles/                   # الأنماط العامة
│   ├── App.js                        # نقطة الدخول الرئيسية
│   ├── app.json                      # إعدادات Expo
│   ├── package.json
│   └── .gitignore
│
├── docs/                              # التوثيق
│   └── SETUP_GUIDE.md                # دليل التشغيل
│
└── README.md                          # هذا الملف
```

---

## 🚀 البدء السريع

### المتطلبات
- **Node.js** v14 أو أحدث
- **npm** أو **yarn**
- **MongoDB** يعمل محلياً أو في السحابة
- **Expo CLI** (للـ Frontend)

### خطوات التثبيت والتشغيل

#### 1️⃣ تثبيت Backend
```bash
cd backend
npm install
cp .env.example .env

# تعديل .env مع بيانات MongoDB لديك

# إنشاء البيانات التجريبية
npm run seed

# تشغيل الخادم
npm run dev
```

✅ الخادم يعمل على: `http://localhost:5000`
✅ API Health Check: `http://localhost:5000/api/health`

#### 2️⃣ تثبيت Frontend
```bash
cd frontend
npm install
npm start
```

اختر منصتك:
- اضغط `a` للـ Android Emulator
- اضغط `i` للـ iOS Simulator
- اضغط `w` لـ Web Browser

---

## 📝 بيانات الدخول التجريبية

### 1️⃣ مدير النظام (Admin)
```
البريد الإلكتروني: admin@company.com
كلمة المرور: Admin@123
الصلاحية: إدارة كاملة
```

### 2️⃣ مدير الموارد البشرية (HR)
```
البريد الإلكتروني: hr@company.com
كلمة المرور: HR@123
الصلاحية: إدارة الموظفين والطلبات
```

### 3️⃣ مشرف الإدارة (Supervisor)
```
البريد الإلكتروني: supervisor@company.com
كلمة المرور: Supervisor@123
الصلاحية: مراجعة واعتماد الطلبات
```

### 4️⃣ موظف عادي (Employee)
```
البريد الإلكتروني: employee@company.com
كلمة المرور: Employee@123
الصلاحية: تقديم الطلبات والعرض فقط
```

---

## 📚 API Endpoints الرئيسية

### 🔐 المصادقة
```
POST   /api/auth/login         - تسجيل الدخول
POST   /api/auth/logout        - تسجيل الخروج
GET    /api/auth/me            - بيانات المستخدم الحالي
POST   /api/auth/register      - تسجيل مستخدم جديد
```

### 👥 الموظفون
```
GET    /api/employees                    - قائمة الموظفين
GET    /api/employees/:id                - بيانات موظف واحد
POST   /api/employees                    - إضافة موظف جديد
PUT    /api/employees/:id                - تعديل بيانات موظف
DELETE /api/employees/:id                - حذف موظف
```

### 🏖️ الإجازات
```
GET    /api/leaves                       - قائمة طلبات الإجازات
POST   /api/leaves                       - تقديم طلب إجازة
PUT    /api/leaves/:id/approve           - اعتماد إجازة
PUT    /api/leaves/:id/reject            - رفض إجازة
GET    /api/leave-types                  - أنواع الإجازات
```

### ⏰ الأذونات
```
GET    /api/permissions                  - قائمة الأذونات
POST   /api/permissions                  - تقديم طلب إذن
PUT    /api/permissions/:id/approve      - اعتماد إذن
PUT    /api/permissions/:id/reject       - رفض إذن
GET    /api/permission-types             - أنواع الأذونات
```

### 📊 الحضور والغياب
```
GET    /api/attendance                   - سجل الحضور
POST   /api/attendance                   - تسجيل حضور
PUT    /api/attendance/:id               - تعديل حضور
GET    /api/attendance/today             - حضور اليوم
```

### 🚗 المأموريات
```
GET    /api/missions                     - قائمة المأموريات
POST   /api/missions                     - إنشاء مأمورية
PUT    /api/missions/:id/approve         - اعتماد مأمورية
PUT    /api/missions/:id/reject          - رفض مأمورية
```

### 📈 لوحة التحكم
```
GET    /api/dashboard/stats              - إحصائيات عامة
GET    /api/dashboard/leave-stats        - إحصائيات الإجازات
GET    /api/dashboard/attendance-stats   - إحصائيات الحضور
```

### ⚙️ الإعدادات
```
GET    /api/settings                     - الإعدادات
PUT    /api/settings                     - تحديث الإعدادات
GET    /api/departments                  - الإدارات
```

---

## 🔒 الأمان والحماية

✅ **تشفير كلمات المرور**
- استخدام bcryptjs مع 10 rounds
- عدم تخزين كلمات المرور بصيغة نصية

✅ **المصادقة والتفويض**
- JWT tokens مع صلاحية 7 أيام
- فحص الصلاحيات على كل طلب
- معالجة الجلسات بأمان

✅ **التحقق من البيانات**
- Validation على Frontend و Backend
- Joi schemas قوية
- معالجة الأخطاء الشاملة

✅ **سجل العمليات (Audit Log)**
- تسجيل جميع العمليات الحساسة
- تتبع من قام بالتعديل ومتى
- حفظ القيم القديمة والجديدة

✅ **حماية CORS**
- السماح بطلبات من domains معينة
- رفع الرؤوس الأمنية

---

## 📊 البيانات التجريبية

تم إنشاء بيانات تجريبية شاملة عند تشغيل `npm run seed`:

- **5 إدارات** متنوعة
- **6 مستخدمين** بأدوار مختلفة
- **3 موظفين** بيانات كاملة
- **8 أنواع إجازات** (اعتيادية، مرضية، إلخ)
- **5 أنواع أذونات** (شخصية، طبية، رسمية، إلخ)
- **طلبات إجازات معتمدة ومرفوضة**
- **أذونات ومأموريات** متنوعة
- **سجلات حضور** لليوم

---

## 📋 قائمة الميزات (Features Checklist)

### Backend
- ✅ نظام المصادقة الكامل
- ✅ جميع Models و Controllers
- ✅ جميع Routes و API Endpoints
- ✅ نظام الصلاحيات (Roles)
- ✅ معالجة الأخطاء الشاملة
- ✅ Validation Rules
- ✅ بيانات تجريبية (Seed)
- ✅ CORS و Security Headers
- ✅ Audit Logging

### Frontend
- ✅ Redux Store مع Slices
- ✅ Navigation Structure
- ✅ Login/Auth Screens
- ✅ Dashboard Screen
- ✅ Employee Management Screens
- ✅ Leave Request Screens
- ✅ Permission Screens
- ✅ Attendance Screens
- ✅ Report Screens
- ✅ Settings Screens
- ✅ API Services
- ✅ RTL Support (Arabic)
- ✅ Material Design UI

---

## 🐛 استكشاف الأخطاء

### المشكلة: خطأ في الاتصال بـ MongoDB
```
الحل: تأكد من:
1. MongoDB يعمل على localhost:27017
2. قاعدة البيانات موجودة: hr_management
3. تحديث MONGODB_URI في .env
```

### المشكلة: Frontend لا يتصل بـ Backend
```
الحل:
1. تأكد من تشغيل Backend على http://localhost:5000
2. تحديث API_URL في frontend/src/services/
3. مسح cache Expo: expo start -c
```

### المشكلة: JWT Token Expired
```
الحل:
1. إعادة تسجيل الدخول
2. تحديث .env مع JWT_EXPIRE الجديد
3. مسح localStorage في المتصفح
```

---

## 📞 الدعم والمساعدة

للأسئلة والمساعدة:
1. فتح Issue في GitHub
2. قراءة التوثيق في `docs/SETUP_GUIDE.md`
3. مراجعة الـ API Documentation
4. اختبار بـ Postman

---

## 📄 الترخيص

MIT License - يمكنك استخدام واستعديل المشروع بحرية

---

## 👨‍💻 المطور

تطبيق احترافي متكامل لإدارة الموارد البشرية

**الإصدار**: 1.0.0
**تاريخ الإنشاء**: سبتمبر 2026

---

## 🎯 الخطوات التالية

بعد التثبيت، يمكنك:

1. **اختبار API** باستخدام Postman
2. **تشغيل التطبيق** على محاكي Android/iOS
3. **تخصيص الإعدادات** حسب احتياجات شركتك
4. **إضافة المزيد من الميزات**
5. **نشر على Google Play Store و App Store**

---

**شكراً لاستخدام تطبيق إدارة الموارد البشرية!** 🎉
