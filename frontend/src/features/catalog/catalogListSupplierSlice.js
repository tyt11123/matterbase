import { createSlice } from '@reduxjs/toolkit';
import { catalogListSupplier } from './catalogAsyncThunk';

const catalogListSupplierSlice = createSlice({
  name: "catalog",
  initialState: {
    payload: [],
    isLoading: false,
    isSuccess: false,
    isFail: false,
  },
  reducers: {},
  extraReducers: {
    [catalogListSupplier.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    [catalogListSupplier.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.payload = [...action.payload.list];
    },
    [catalogListSupplier.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
    },
  },
});

export default catalogListSupplierSlice.reducer;