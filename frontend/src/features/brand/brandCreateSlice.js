import { createSlice } from '@reduxjs/toolkit';
import { brandCreate } from './brandAsyncThunk';

const brandCreateSlice = createSlice({
  name: "brand",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isFail: false,
  },
  reducers: {},
  extraReducers: {
    [brandCreate.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    [brandCreate.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [brandCreate.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
    },
  },
});

export default brandCreateSlice.reducer;