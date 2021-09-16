import { createSlice } from '@reduxjs/toolkit';
import { userCreateAdmin } from "./userAsyncThunk";

const userCreateAdminSlice = createSlice({
  name: "userChange",
  initialState: {
    isLoading: false,
    isSuccess: false,
    failCode: 0,
  },
  reducers: {},
  extraReducers: {
    [userCreateAdmin.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.failCode = 0;
    },
    [userCreateAdmin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [userCreateAdmin.rejected]: (state, action) => {
      state.isLoading = false;
      state.failCode = action.payload.status;
    },
  },
});

export default userCreateAdminSlice.reducer;