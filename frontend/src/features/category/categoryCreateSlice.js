import { createSlice } from '@reduxjs/toolkit';
import { categoryCreate } from './categoryAsyncThunk';

const categoryCreateSlice = createSlice({
  name: "category",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isFail: false,
  },
  reducers: {},
  extraReducers: {
    [categoryCreate.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    [categoryCreate.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [categoryCreate.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
    },
  },
});

export default categoryCreateSlice.reducer;