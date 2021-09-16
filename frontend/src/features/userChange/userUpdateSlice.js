import { createSlice } from '@reduxjs/toolkit';
import { userUpdate } from "./userAsyncThunk";

const userUpdateSlice = createSlice({
  name: "userChange",
  initialState: {
    isLoading: false,
    successCode: 0,
    failCode: 0,
  },
  reducers: {},
  extraReducers: {
    [userUpdate.pending]: (state, action) => {
      state.isLoading = true;
      state.successCode = 0;
      state.failCode = 0;
    },
    [userUpdate.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.successCode = action.payload.status;
    },
    [userUpdate.rejected]: (state, action) => {
      state.isLoading = false;
      state.failCode = action.payload.status;
    },
  },
});

export default userUpdateSlice.reducer;