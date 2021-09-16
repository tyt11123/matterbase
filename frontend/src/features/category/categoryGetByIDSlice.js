import { createSlice } from '@reduxjs/toolkit';
import { categoryGetByID } from './categoryAsyncThunk';

const categoryGetByIDSlice = createSlice({
  name: "category",
  initialState: {
    payload: [],
    isLoading: false,
    isSuccess: false,
    isFail: false,
  },
  reducers: {},
  extraReducers: {
    [categoryGetByID.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    [categoryGetByID.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.payload = [...action.payload.list];
    },
    [categoryGetByID.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
    },
  },
});

export default categoryGetByIDSlice.reducer;