import { createSlice } from '@reduxjs/toolkit';
import { manuJoin } from "./manuAsyncThunk";

const manuJoinSlice = createSlice({
  name: "manufacturer",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isFail: false,
  },
  reducers: {},
  extraReducers: {
    [manuJoin.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    [manuJoin.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [manuJoin.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
    },
  },
});

export default manuJoinSlice.reducer;