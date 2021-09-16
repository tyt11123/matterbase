import { createSlice } from '@reduxjs/toolkit';
import { brandEdit } from './brandAsyncThunk';

const brandEditSlice = createSlice({
  name: "brand",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isFail: false,
  },
  reducers: {},
  extraReducers: {
    [brandEdit.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    [brandEdit.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [brandEdit.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
    },
  },
});

export default brandEditSlice.reducer;