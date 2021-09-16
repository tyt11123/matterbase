import { createSlice } from '@reduxjs/toolkit';
import { userEditAdmin } from "./userAsyncThunk";

const userEditAdminSlice = createSlice({
  name: "userChange",
  initialState: {
    isLoading: false,
    isSuccess: false,
    failCode: 0,
  },
  reducers: {},
  extraReducers: {
    [userEditAdmin.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.failCode = 0;
    },
    [userEditAdmin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [userEditAdmin.rejected]: (state, action) => {
      state.isLoading = false;
      state.failCode = action.payload.status;
    },
  },
});

export default userEditAdminSlice.reducer;