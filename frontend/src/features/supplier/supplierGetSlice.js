import { createSlice } from '@reduxjs/toolkit';
import { supplierGetByID, supplierGetByEmail } from './supplierAsyncThunk';

const supplierGetSlice = createSlice({
  name: "supplier",
  initialState: {
    payload: {},
    isLoading: false,
    isSuccess: false,
    isFail: false,
  },
  reducers: {},
  extraReducers: {
    [supplierGetByID.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    [supplierGetByID.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.payload = { ...action.payload.supplier };
    },
    [supplierGetByID.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
    },
    [supplierGetByEmail.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    [supplierGetByEmail.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.payload = { ...action.payload.supplier };
    },
    [supplierGetByEmail.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
    },
  },
});

export default supplierGetSlice.reducer;