import { createSlice } from '@reduxjs/toolkit';
import { catalogListCountry } from './catalogAsyncThunk';

const catalogListCountrySlice = createSlice({
  name: "catalog",
  initialState: {
    payload: [],
    isLoading: false,
    isSuccess: false,
    isFail: false,
  },
  reducers: {},
  extraReducers: {
    [catalogListCountry.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    [catalogListCountry.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.payload = [...action.payload.list];
    },
    [catalogListCountry.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
    },
  },
});

export default catalogListCountrySlice.reducer;