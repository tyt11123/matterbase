import { createSlice } from '@reduxjs/toolkit';
import { regSignup } from "./regAsyncThunk";

const regSignupSlice = createSlice({
  name: "registration",
  initialState: {
    payload: {},
    isLoading: false,
    isSuccess: false,
    isFail: false,
  },
  reducers: {},
  extraReducers: {
    [regSignup.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    [regSignup.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.payload = action.payload;
    },
    [regSignup.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
      state.payload = action.payload;
    },
  },
});

export default regSignupSlice.reducer;