import { createSlice } from '@reduxjs/toolkit';
import { supplierCreate } from './supplierAsyncThunk';

const supplierCreateSlice = createSlice({
  name: "supplier",
  initialState: {
    isLoading: false,
    isSuccess: false,
    failCode: 0,
  },
  reducers: {},
  extraReducers: {
    [supplierCreate.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.failCode = 0;
    },
    [supplierCreate.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [supplierCreate.rejected]: (state, action) => {
      state.isLoading = false;
      state.failCode = action.payload.status;
    },
  },
});

export default supplierCreateSlice.reducer;