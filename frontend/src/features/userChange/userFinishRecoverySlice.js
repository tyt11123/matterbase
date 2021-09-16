import { createSlice } from '@reduxjs/toolkit';
import { userFinishRecovery } from "./userAsyncThunk";

const userFinishRecoverySlice = createSlice({
  name: "userChange",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isFail: false,
  },
  reducers: {},
  extraReducers: {
    [userFinishRecovery.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    [userFinishRecovery.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [userFinishRecovery.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
    },
  },
});

export default userFinishRecoverySlice.reducer;