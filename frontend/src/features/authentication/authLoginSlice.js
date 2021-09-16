import { createSlice } from '@reduxjs/toolkit';
import { authLogin } from "./authAsyncThunk";

const authLoginSlice = createSlice({
  name: "authentication",
  initialState: {
    isLoading: false,
    successCode: 0,
    failCode: 0,
  },
  reducers: {},
  extraReducers: {
    [authLogin.pending]: (state, action) => {
      state.isLoading = true;
      state.successCode = 0;
      state.failCode = 0;
    },
    [authLogin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.successCode = action.payload.status;
    },
    [authLogin.rejected]: (state, action) => {
      state.isLoading = false;
      state.failCode = action.payload.status;
    },
  },
});

export default authLoginSlice.reducer;