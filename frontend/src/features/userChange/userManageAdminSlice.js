import { createSlice } from '@reduxjs/toolkit';
import { userManageAdmin } from "./userAsyncThunk";

const userManageAdminSlice = createSlice({
  name: "userChange",
  initialState: {
    payload: [],
    isLoading: false,
    isSuccess: false,
    isFail: false,
  },
  reducers: {},
  extraReducers: {
    [userManageAdmin.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    [userManageAdmin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [userManageAdmin.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
    },
  },
});

export default userManageAdminSlice.reducer;