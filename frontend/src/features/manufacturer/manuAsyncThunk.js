import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const manuJoin = createAsyncThunk(
  "manufacturer/join",
  async (values, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/manufacturer/`,
        values
      );
      return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const selectManuJoin = (state) => state.manuJoin;
