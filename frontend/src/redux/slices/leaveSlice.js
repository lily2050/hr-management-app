import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import leaveService from '../../services/leaveService';

export const fetchLeaveRequests = createAsyncThunk(
  'leave/fetchLeaveRequests',
  async (params, { rejectWithValue }) => {
    try {
      const response = await leaveService.getLeaveRequests(params);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'خطأ في جلب طلبات الإجازة');
    }
  }
);

const initialState = {
  leaveRequests: [],
  loading: false,
  error: null,
  total: 0,
};

const leaveSlice = createSlice({
  name: 'leave',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLeaveRequests.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchLeaveRequests.fulfilled, (state, action) => {
        state.loading = false;
        state.leaveRequests = action.payload.leaveRequests;
        state.total = action.payload.total;
      })
      .addCase(fetchLeaveRequests.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = leaveSlice.actions;
export default leaveSlice.reducer;
