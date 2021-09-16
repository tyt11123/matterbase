import { createSlice } from '@reduxjs/toolkit';
import { categoryEdit } from './categoryAsyncThunk';

const categoryEditSlice = createSlice({
  name: "category",
  initialState: {
    isLoading: false,
    isSuccess: false,
    failCode: 0,
  },
  reducers: {},
  extraReducers: {
    [categoryEdit.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.failCode = 0;
    },
    [categoryEdit.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [categoryEdit.rejected]: (state, action) => {
      state.isLoading = false;
      state.failCode = action.payload.status;
    },
  },
});

export default categoryEditSlice.reducer;