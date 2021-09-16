import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const catalogCreateCompanyType = createAsyncThunk(
  "catalog/createCompanyType",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/companyType/`,
        payload
      );
      return data;
    } catch (err) {
      const { data, status } = err.response;
      return thunkAPI.rejectWithValue({ data, status });
    }
  }
);

export const catalogListCompanyType = createAsyncThunk(
  "catalog/listCompanyType",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/companyType/`
      );
      return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const catalogManageCompanyType = createAsyncThunk(
  "catalog/manageCompanyType",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/companyType/`,
        payload
        );
      return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const catalogListCountry = createAsyncThunk(
  "catalog/listCountry",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/country/`
      );
      return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const catalogListSupplier = createAsyncThunk(
  "catalog/listSupplier",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/supplier/dropdown/`
      );
      return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const selectCatalogCreateCompanyType = (state) => state.catalogCreateCompanyType;
export const selectCatalogListCompanyType = (state) => state.catalogListCompanyType;
export const selectCatalogManageCompanyType = (state) => state.catalogManageCompanyType;
export const selectCatalogListCountry = (state) => state.catalogListCountry;
export const selectCatalogListSupplier = (state) => state.catalogListSupplier;
