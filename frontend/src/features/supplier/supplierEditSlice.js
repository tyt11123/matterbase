import { createSlice } from '@reduxjs/toolkit';
import { supplierEdit } from './supplierAsyncThunk';

const supplierEditSlice = createSlice({
  name: "supplier",
  initialState: {
    isLoading: false,
    isSuccess: false,
    failCode: 0,
  },
  reducers: {},
  extraReducers: {
    [supplierEdit.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.failCode = 0;
    },
    [supplierEdit.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [supplierEdit.rejected]: (state, action) => {
      state.isLoading = false;
      state.failCode = action.payload.status;
    },
  },
});

export default supplierEditSlice.reducer;