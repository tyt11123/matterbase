import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const brandCreate = createAsyncThunk(
  "brand/create",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/brand/`,
        payload
      );
      return data;
    } catch (err) {
      const { data, status } = err.response;
      return thunkAPI.rejectWithValue({ data, status });
    }
  }
);

export const brandList = createAsyncThunk(
  "brand/list",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/brand/`
      );
      return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const brandEdit = createAsyncThunk(
  "brand/edit",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/brand/`,
        payload
        );
      return data;
    } catch (err) {
      const { data, status } = err.response;
      return thunkAPI.rejectWithValue({ data, status });
    }
  }
);

export const brandGetByID = createAsyncThunk(
  "brand/getByID",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/brand/${id}`
      );
      return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const selectBrandCreate = (state) => state.brandCreate;
export const selectBrandList = (state) => state.brandList;
export const selectBrandEdit = (state) => state.brandEdit;
export const selectBrandGet = (state) => state.brandGet;
