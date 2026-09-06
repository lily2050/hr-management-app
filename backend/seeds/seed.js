require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('../src/config/database');
const User = require('../src/models/User');
const Employee = require('../src/models/Employee');
const Department = require('../src/models/Department');
const LeaveType = require('../src/models/LeaveType');
const PermissionType = require('../src/models/PermissionType');
const Settings = require('../src/models/Settings');
const LeaveRequest = require('../src/models/LeaveRequest');
const Permission = require('../src/models/Permission');
const Attendance = require('../src/models/Attendance');
const Mission = require('../src/models/Mission');

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Department.deleteMany({});
    await Employee.deleteMany({});
    await LeaveType.deleteMany({});
    await PermissionType.deleteMany({});
    await LeaveRequest.deleteMany({});
    await Permission.deleteMany({});
    await Attendance.deleteMany({});
    await Mission.deleteMany({});

    // Create departments
    const departments = await Department.create([
      { name: 'IT', nameAr: 'تكنولوجيا المعلومات', description: 'قسم تكنولوجيا المعلومات', code: 'IT' },
      { name: 'HR', nameAr: 'الموارد البشرية', description: 'قسم الموارد البشرية', code: 'HR' },
      { name: 'Finance', nameAr: 'المالية', description: 'قسم المالية', code: 'FIN' },
      { name: 'Sales', nameAr: 'المبيعات', description: 'قسم المبيعات', code: 'SAL' },
      { name: 'Operations', nameAr: 'العمليات', description: 'قسم العمليات', code: 'OPS' }
    ]);

    // Create users
    const users = await User.create([
      {
        email: 'admin@company.com',
        username: 'admin',
        password: 'Admin@123',
        fullName: 'مدير النظام',
        role: 'admin',
        department: departments[0]._id
      },
      {
        email: 'hr@company.com',
        username: 'hr_manager',
        password: 'HR@123',
        fullName: 'مدير الموارد البشرية',
        role: 'hr',
        department: departments[1]._id
      },
      {
        email: 'supervisor@company.com',
        username: 'supervisor',
        password: 'Supervisor@123',
        fullName: 'مشرف الإدارة',
        role: 'supervisor',
        department: departments[0]._id
      },
      {
        email: 'employee@company.com',
        username: 'employee1',
        password: 'Employee@123',
        fullName: 'موظف عادي',
        role: 'employee',
        department: departments[0]._id
      },
      {
        email: 'employee2@company.com',
        username: 'employee2',
        password: 'Employee@123',
        fullName: 'أحمد محمد علي',
        role: 'employee',
        department: departments[2]._id
      },
      {
        email: 'employee3@company.com',
        username: 'employee3',
        password: 'Employee@123',
        fullName: 'فاطمة خالد حسن',
        role: 'employee',
        department: departments[3]._id
      }
    ]);

    // Create employees
    const employees = await Employee.create([
      {
        userId: users[3]._id,
        employeeCode: 'EMP001',
        jobNumber: 'JOB001',
        department: departments[0]._id,
        position: 'مهندس برمجيات',
        grade: 'مهندس أول',
        hireDate: new Date('2020-01-15'),
        birthDate: new Date('1990-05-20'),
        nationalId: '1234567890123',
        directManager: null,
        status: 'active',
        annualLeaveBalance: 30,
        usedAnnualLeave: 5,
        medicalLeaveBalance: 15,
        usedMedicalLeave: 2,
        emergencyLeaveBalance: 5,
        usedEmergencyLeave: 0,
        monthlyPermissionHours: 8,
        usedPermissionHours: 2
      },
      {
        userId: users[4]._id,
        employeeCode: 'EMP002',
        jobNumber: 'JOB002',
        department: departments[2]._id,
        position: 'محاسب',
        grade: 'محاسب أول',
        hireDate: new Date('2019-06-10'),
        birthDate: new Date('1988-03-15'),
        nationalId: '9876543210123',
        directManager: null,
        status: 'active',
        annualLeaveBalance: 30,
        usedAnnualLeave: 10,
        medicalLeaveBalance: 15,
        usedMedicalLeave: 5,
        emergencyLeaveBalance: 5,
        usedEmergencyLeave: 1,
        monthlyPermissionHours: 8,
        usedPermissionHours: 3
      },
      {
        userId: users[5]._id,
        employeeCode: 'EMP003',
        jobNumber: 'JOB003',
        department: departments[3]._id,
        position: 'مدير مبيعات',
        grade: 'مدير',
        hireDate: new Date('2018-08-20'),
        birthDate: new Date('1985-12-10'),
        nationalId: '5555555555555',
        directManager: null,
        status: 'active',
        annualLeaveBalance: 30,
        usedAnnualLeave: 8,
        medicalLeaveBalance: 15,
        usedMedicalLeave: 0,
        emergencyLeaveBalance: 5,
        usedEmergencyLeave: 0,
        monthlyPermissionHours: 8,
        usedPermissionHours: 1
      }
    ]);

    // Create leave types
    const leaveTypes = await LeaveType.create([
      { name: 'Annual', nameAr: 'إجازة اعتيادية', annualBalance: 30, color: '#2196F3', description: 'إجازة سنوية' },
      { name: 'Medical', nameAr: 'إجازة مرضية', annualBalance: 15, color: '#FF9800', description: 'إجازة مرضية' },
      { name: 'Emergency', nameAr: 'إجازة عارضة', annualBalance: 5, color: '#F44336', description: 'إجازة عارضة' },
      { name: 'Wedding', nameAr: 'إجازة زواج', annualBalance: 5, color: '#E91E63', description: 'إجازة زواج' },
      { name: 'Death', nameAr: 'إجازة وفاة', annualBalance: 3, color: '#795548', description: 'إجازة وفاة' },
      { name: 'Pilgrimage', nameAr: 'إجازة حج', annualBalance: 30, color: '#9C27B0', description: 'إجازة حج' },
      { name: 'Unpaid', nameAr: 'إجازة بدون أجر', annualBalance: 10, color: '#607D8B', description: 'إجازة بدون أجر' },
      { name: 'Maternity', nameAr: 'إجازة أمومة', annualBalance: 90, color: '#4CAF50', description: 'إجازة أمومة' }
    ]);

    // Create permission types
    const permissionTypes = await PermissionType.create([
      { name: 'Personal', nameAr: 'إذن شخصي', color: '#2196F3', description: 'إذن شخصي' },
      { name: 'Medical', nameAr: 'إذن طبي', color: '#FF9800', description: 'إذن طبي' },
      { name: 'Official', nameAr: 'إذن رسمي', color: '#4CAF50', description: 'إذن رسمي' },
      { name: 'Emergency', nameAr: 'إذن طارئ', color: '#F44336', description: 'إذن طارئ' },
      { name: 'Other', nameAr: 'إذن آخر', color: '#9C27B0', description: 'إذن آخر' }
    ]);

    // Create settings
    await Settings.create({
      organizationName: 'الشركة العربية',
      organizationAddress: 'جدة، المملكة العربية السعودية',
      organizationPhone: '+966-12-1234567',
      organizationEmail: 'info@company.com',
      annualLeaveBalance: 30,
      emergencyLeaveBalance: 5,
      medicalLeaveBalance: 15,
      dailyPermissionLimit: 2,
      monthlyPermissionLimit: 8,
      yearlyPermissionLimit: 40,
      workStartTime: '08:00',
      workEndTime: '17:00'
    });

    // Create sample leave requests
    await LeaveRequest.create([
      {
        employee: employees[0]._id,
        leaveType: leaveTypes[0]._id,
        startDate: new Date('2026-09-10'),
        endDate: new Date('2026-09-15'),
        days: 6,
        reason: 'عطلة صيفية',
        status: 'pending'
      },
      {
        employee: employees[1]._id,
        leaveType: leaveTypes[1]._id,
        startDate: new Date('2026-09-08'),
        endDate: new Date('2026-09-09'),
        days: 2,
        reason: 'مرض',
        status: 'approved',
        approvedBy: users[1]._id,
        approvalDate: new Date()
      }
    ]);

    // Create sample permissions
    await Permission.create([
      {
        employee: employees[0]._id,
        date: new Date('2026-09-06'),
        outTime: '14:00',
        returnTime: '15:30',
        duration: 90,
        permissionType: permissionTypes[0]._id,
        reason: 'مقابلة طبية',
        status: 'approved',
        approvedBy: users[1]._id,
        approvalDate: new Date()
      },
      {
        employee: employees[1]._id,
        date: new Date('2026-09-06'),
        outTime: '11:00',
        returnTime: '12:00',
        duration: 60,
        permissionType: permissionTypes[2]._id,
        reason: 'مشوار رسمي',
        status: 'pending'
      }
    ]);

    // Create today's attendance
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    await Attendance.create([
      {
        employee: employees[0]._id,
        date: today,
        status: 'present',
        checkInTime: new Date(today.getTime() + 8 * 60 * 60 * 1000),
        checkOutTime: new Date(today.getTime() + 17 * 60 * 60 * 1000)
      },
      {
        employee: employees[1]._id,
        date: today,
        status: 'absent'
      },
      {
        employee: employees[2]._id,
        date: today,
        status: 'leave',
        relatedLeave: null
      }
    ]);

    // Create sample missions
    await Mission.create([
      {
        employee: employees[0]._id,
        startDate: new Date('2026-09-10'),
        endDate: new Date('2026-09-12'),
        location: 'الرياض',
        reason: 'اجتماع عملاء',
        organization: 'شركة xyz',
        status: 'pending'
      },
      {
        employee: employees[2]._id,
        startDate: new Date('2026-09-08'),
        endDate: new Date('2026-09-09'),
        location: 'الدمام',
        reason: 'مؤتمر صناعي',
        organization: 'غرفة التجارة',
        status: 'approved',
        approvedBy: users[1]._id,
        approvalDate: new Date()
      }
    ]);

    console.log('✅ تم إنشاء البيانات التجريبية بنجاح!');
    process.exit(0);
  } catch (error) {
    console.error('❌ خطأ في إنشاء البيانات:', error.message);
    process.exit(1);
  }
};

seedDatabase();
