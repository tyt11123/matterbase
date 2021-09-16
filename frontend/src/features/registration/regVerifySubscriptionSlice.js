import { createSlice } from '@reduxjs/toolkit';
import { regVerifySubscription } from "./regAsyncThunk";

const regVerifySubscriptionSlice = createSlice({
  name: "registration",
  initialState: {
    payload: {},
    isLoading: false,
    isSuccess: false,
    isFail: false,
  },
  reducers: {},
  extraReducers: {
    [regVerifySubscription.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    [regVerifySubscription.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.payload = action.payload;
    },
    [regVerifySubscription.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
      state.payload = action.payload;
    },
  },
});

export default regVerifySubscriptionSlice.reducer;