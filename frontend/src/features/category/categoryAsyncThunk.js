import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const categoryCreate = createAsyncThunk(
  "category/create",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/category/`,
        payload
      );
      return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const categoryList = createAsyncThunk(
  "category/list",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/category/`
      );
      return data;
    } catch (err) {
      const { data, status } = err.response;
      return thunkAPI.rejectWithValue({ data, status });
    }
  }
);

export const categoryEdit = createAsyncThunk(
  "category/edit",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/category/`,
        payload
        );
      return data;
    } catch (err) {
      const { data, status } = err.response;
      return thunkAPI.rejectWithValue({ data, status });
    }
  }
);

export const categoryGetByID = createAsyncThunk(
  "category/getByID",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/category/${id}`
      );
      return data;
    } catch (err) {
      const { data, status } = err.response;
      return thunkAPI.rejectWithValue({ data, status });
    }
  }
);

export const categoryDelete = createAsyncThunk(
  "category/deleteByID",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/api/category/${id}`
      );
      return data;
    } catch (err) {
      const { data, status } = err.response;
      return thunkAPI.rejectWithValue({ data, status });
    }
  }
);

export const selectCategoryCreate = (state) => state.categoryCreate;
export const selectCategoryList = (state) => state.categoryList;
export const selectCategoryEdit = (state) => state.categoryEdit;
export const selectCategoryDelete = (state) => state.categoryDelete;
export const selectCategoryGetByID = (state) => state.categoryGetByID;
