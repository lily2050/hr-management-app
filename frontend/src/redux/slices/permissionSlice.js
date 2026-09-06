import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import permissionService from '../../services/permissionService';

export const fetchPermissions = createAsyncThunk(
  'permission/fetchPermissions',
  async (params, { rejectWithValue }) => {
    try {
      const response = await permissionService.getPermissions(params);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'خطأ في جلب الأذونات');
    }
  }
);

const initialState = {
  permissions: [],
  loading: false,
  error: null,
  total: 0,
};

const permissionSlice = createSlice({
  name: 'permission',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPermissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPermissions.fulfilled, (state, action) => {
        state.loading = false;
        state.permissions = action.payload.permissions;
        state.total = action.payload.total;
      })
      .addCase(fetchPermissions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { clearError } = permissionSlice.actions;
export default permissionSlice.reducer;
