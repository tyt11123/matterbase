import { createSlice } from '@reduxjs/toolkit';
import { catalogManageCompanyType } from './catalogAsyncThunk';

const catalogManageCompanyTypeSlice = createSlice({
  name: "catalog",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isFail: false,
  },
  reducers: {},
  extraReducers: {
    [catalogManageCompanyType.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    [catalogManageCompanyType.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [catalogManageCompanyType.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
    },
  },
});

export default catalogManageCompanyTypeSlice.reducer;