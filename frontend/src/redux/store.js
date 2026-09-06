import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import employeeReducer from './slices/employeeSlice';
import leaveReducer from './slices/leaveSlice';
import permissionReducer from './slices/permissionSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    employee: employeeReducer,
    leave: leaveReducer,
    permission: permissionReducer,
  },
});

export default store;
