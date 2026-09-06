import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import employeeService from '../../services/employeeService';

export const fetchEmployees = createAsyncThunk(
  'employee/fetchEmployees',
  async (params, { rejectWithValue }) => {
    try {
      const response = await employeeService.getEmployees(params);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'خطأ في جلب بيانات الموظفين');
    }
  }
);

const initialState = {
  employees: [],
  loading: false,
  error: null,
  total: 0,
};

const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEmployees.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEmployees.fulfilled, (state, action) => {
        state.loading = false;
        state.employees = action.payload.employees;
        state.total = action.payload.total;
      })
      .addCase(fetchEmployees.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = employeeSlice.actions;
export default employeeSlice.reducer;
