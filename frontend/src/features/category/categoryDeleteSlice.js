import { createSlice } from '@reduxjs/toolkit';
import { categoryDelete } from './categoryAsyncThunk';

const categoryDeleteSlice = createSlice({
  name: "category",
  initialState: {
    isLoading: false,
    isSuccess: false,
    failCode: 0,
  },
  reducers: {},
  extraReducers: {
    [categoryDelete.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.failCode = 0;
    },
    [categoryDelete.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [categoryDelete.rejected]: (state, action) => {
      state.isLoading = false;
      state.failCode = action.payload.status;
    },
  },
});

export default categoryDeleteSlice.reducer;