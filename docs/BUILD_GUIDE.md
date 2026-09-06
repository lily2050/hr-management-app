# 🚀 دليل البناء والنشر

## بناء APK للـ Android

### المتطلبات
- Android SDK
- Java Development Kit (JDK)
- Expo CLI

### الخطوات

```bash
cd frontend

# بناء APK
eas build --platform android --local

# أو باستخدام Expo Go
gnpm install -g eas-cli
eas build --platform android
```

## بناء IPA للـ iOS

```bash
cd frontend
eas build --platform ios
```

## نشر على Google Play Store

```bash
# إنشاء keystore
keytool -genkey -v -keystore my-app.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key

# بناء APK موقعة
eas build --platform android --release
```

## التطويّر المحلي

```bash
# تشغيل Expo Dev Server
cd frontend
npm start

# ثم اختر:
# - a للـ Android
# - i للـ iOS  
# - w للـ Web
```

## استخدام Expo Go

1. ثبت تطبيق Expo Go على هاتفك
2. اسح رمز QR المعروض في Terminal
3. سيفتح التطبيق تلقائياً

---

## أفضل الممارسات

### للتطوير
- ✅ استخدم Expo Dev Client للتطوير المتقدم
- ✅ فعّل Hot Reload
- ✅ اختبر على أجهزة فعلية أيضاً

### للإنتاج
- ✅ قم بتعطيل Debug Mode
- ✅ استخدم المتغيرات البيئية
- ✅ وقّع الـ App بـ Keystore الخاص بك
- ✅ اختبر كل ميزة قبل النشر

---

## استكشاف الأخطاء

### مشكلة: Expo CLI لم تثبت
```bash
npm install -g expo-cli
```

### مشكلة: محاكي Android لا يعمل
```bash
# تحقق من Android SDK
android --version

# أعد تشغيل المحاكي
emulator -list-avds
emulator -avd <avd-name>
```

### مشكلة: Metro Bundler عالق
```bash
# امسح cache وابدأ من جديد
npm start -- --reset-cache
```
