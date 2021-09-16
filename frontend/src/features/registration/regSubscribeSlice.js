import { createSlice } from '@reduxjs/toolkit';
import { regSubscribe } from "./regAsyncThunk";

const regSubscribeSlice = createSlice({
  name: "registration",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isFail: false,
  },
  reducers: {},
  extraReducers: {
    [regSubscribe.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    [regSubscribe.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [regSubscribe.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
    },
  },
});

export default regSubscribeSlice.reducer;