import { createSlice } from '@reduxjs/toolkit';
import { userListAdmin } from "./userAsyncThunk";

const userListAdminSlice = createSlice({
  name: "userChange",
  initialState: {
    payload: [],
    isLoading: false,
    isSuccess: false,
    isFail: false,
  },
  reducers: {},
  extraReducers: {
    [userListAdmin.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    [userListAdmin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.payload = [...action.payload.list];
    },
    [userListAdmin.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
    },
  },
});

export default userListAdminSlice.reducer;