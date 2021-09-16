import { createSlice } from '@reduxjs/toolkit';
import { regVerifyRegistration } from "./regAsyncThunk";

const regVerifyRegistrationSlice = createSlice({
  name: "registration",
  initialState: {
    payload: {},
    isLoading: false,
    isSuccess: false,
    isFail: false,
  },
  reducers: {},
  extraReducers: {
    [regVerifyRegistration.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    [regVerifyRegistration.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.payload = action.payload;
    },
    [regVerifyRegistration.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
      state.payload = action.payload;
    },
  },
});

export default regVerifyRegistrationSlice.reducer;