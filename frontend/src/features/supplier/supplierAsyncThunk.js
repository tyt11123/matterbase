import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const supplierCreate = createAsyncThunk(
  "supplier/create",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/supplier/`,
        payload
      );
      return data;
    } catch (err) {
      const { data, status } = err.response;
      return thunkAPI.rejectWithValue({ data, status });
    }
  }
);

export const supplierList = createAsyncThunk(
  "supplier/list",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/supplier/`
      );
      return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const supplierEdit = createAsyncThunk(
  "supplier/edit",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/supplier/`,
        payload
        );
      return data;
    } catch (err) {
      const { data, status } = err.response;
      return thunkAPI.rejectWithValue({ data, status });
    }
  }
);

export const supplierGetByID = createAsyncThunk(
  "supplier/getByID",
  async (id, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/supplier/${id}`
      );
      return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const supplierGetByEmail = createAsyncThunk(
  "supplier/getByEmail",
  async (email, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/supplier/email/${email}`
      );
      return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const selectSupplierCreate = (state) => state.supplierCreate;
export const selectSupplierList = (state) => state.supplierList;
export const selectSupplierEdit = (state) => state.supplierEdit;
export const selectSupplierGet = (state) => state.supplierGet;
