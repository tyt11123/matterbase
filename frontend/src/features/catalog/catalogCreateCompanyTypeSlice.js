import { createSlice } from '@reduxjs/toolkit';
import { catalogCreateCompanyType } from './catalogAsyncThunk';

const catalogCreateCompanyTypeSlice = createSlice({
  name: "catalog",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isFail: false,
  },
  reducers: {},
  extraReducers: {
    [catalogCreateCompanyType.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    [catalogCreateCompanyType.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [catalogCreateCompanyType.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
    },
  },
});

export default catalogCreateCompanyTypeSlice.reducer;