import { createSlice } from '@reduxjs/toolkit';
import { userVerifyRecovery } from "./userAsyncThunk";

const userVerifyRecoverySlice = createSlice({
  name: "userChange",
  initialState: {
    isLoading: false,
    isSuccess: false,
    failCode: 0,
  },
  reducers: {},
  extraReducers: {
    [userVerifyRecovery.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.failCode = 0;
    },
    [userVerifyRecovery.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [userVerifyRecovery.rejected]: (state, action) => {
      state.isLoading = false;
      state.failCode = action.payload.status;
    },
  },
});

export default userVerifyRecoverySlice.reducer;