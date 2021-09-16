import { createSlice } from '@reduxjs/toolkit';
import { userUpdateFederated } from "./userAsyncThunk";

const userFederatedInfoSlice = createSlice({
  name: "userChange",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isFail: false,
  },
  reducers: {},
  extraReducers: {
    [userUpdateFederated.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    [userUpdateFederated.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
    },
    [userUpdateFederated.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
    },
  },
});

export default userFederatedInfoSlice.reducer;