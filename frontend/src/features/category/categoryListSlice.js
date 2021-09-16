import { createSlice } from '@reduxjs/toolkit';
import { categoryList } from './categoryAsyncThunk';

const categoryListSlice = createSlice({
  name: "category",
  initialState: {
    payload: [],
    isLoading: false,
    isSuccess: false,
    isFail: false,
  },
  reducers: {},
  extraReducers: {
    [categoryList.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    [categoryList.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.payload = [...action.payload.list];
    },
    [categoryList.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
    },
  },
});

export default categoryListSlice.reducer;