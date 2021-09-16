import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const imageCreate = createAsyncThunk(
  "image/create",
  async (payload, thunkAPI) => {
    const { label, ...values } = payload;
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/image/`,
        values
      );
      return { ...data, label };
    } catch (err) {
      const data = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const imageCreateReset = createAction("image/create");
    
export const selectImageCreate = (state) => state.imageCreate;
