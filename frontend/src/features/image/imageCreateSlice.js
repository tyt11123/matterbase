import { createSlice } from '@reduxjs/toolkit';
import { imageCreate, imageCreateReset } from './imageAsyncThunk';

const imageCreateSlice = createSlice({
  name: "image",
  initialState: {
    payload: {},
    isLoading: false,
    isSuccess: false,
    isFail: false,
    imageOwner: undefined,
  },
  reducers: {},
  extraReducers: {
    [imageCreate.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
    },
    [imageCreate.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.payload = { ...action.payload.image };
      state.imageOwner = action.payload.label;
    },
    [imageCreate.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
    },
    [imageCreateReset]: (state, action) => {
      state.payload = {};
      state.isLoading = false;
      state.isSuccess = false;
      state.isFail = false;
      state.imageOwner = undefined;
    },
  },
});

export default imageCreateSlice.reducer;