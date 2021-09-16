import { createSlice } from '@reduxjs/toolkit';
import { brandGetByID } from './brandAsyncThunk';

const brandGetSlice = createSlice({
  name: "brand",
  initialState: {
    payload: {},
    isLoading: false,
    isSuccess: false,
    isFail: false,
  },
  reducers: {},
  extraReducers: {
    [brandGetByID.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    [brandGetByID.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.payload = { ...action.payload.brand };
    },
    [brandGetByID.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
    },
  },
});

export default brandGetSlice.reducer;