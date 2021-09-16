import { createSlice } from '@reduxjs/toolkit';
import { catalogListCompanyType } from './catalogAsyncThunk';

const catalogListCompanyTypeSlice = createSlice({
  name: "catalog",
  initialState: {
    payload: [],
    isLoading: false,
    isSuccess: false,
    isFail: false,
  },
  reducers: {},
  extraReducers: {
    [catalogListCompanyType.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    [catalogListCompanyType.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.payload = [...action.payload.list];
    },
    [catalogListCompanyType.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
    },
  },
});

export default catalogListCompanyTypeSlice.reducer;