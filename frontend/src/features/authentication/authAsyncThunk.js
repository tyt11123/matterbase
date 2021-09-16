import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const authLogout = createAsyncThunk(
  "authentication/logout",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/login/clearCookies`
      );
      sessionStorage.removeItem("userInfo");
      return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const authLogin = createAsyncThunk(
  "authentication/login",
  async (values, thunkAPI) => {
    try {
      const { data, status } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/login/`,
        values
      );
      return { data, status };
    } catch (err) {
      const { data, status } = err.response;
      return thunkAPI.rejectWithValue({ data, status });
    }
  }
);

export const authPreflight = createAsyncThunk(
  "authentication/preflight",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/login/preflight`
      );
      sessionStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const authUserInfo = createAsyncThunk(
  "authentication/userInfo",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/login/tokenUserInfo`
      );
      sessionStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const authUserLocation = createAsyncThunk(
  "authentication/userLocation",
  async (ip, _) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/geoplugin/http://www.geoplugin.net/json.gp?ip=${ip}`,
        { withCredentials: false }
      );
      const { geoplugin_countryCode, geoplugin_countryName } = data;
      const countryCode = geoplugin_countryCode ? geoplugin_countryCode : "AQ";
      const countryName = geoplugin_countryName ? geoplugin_countryName : "Unknown";
      sessionStorage.setItem("countryCode", countryCode);
      sessionStorage.setItem("countryName", countryName);
      return { countryCode, countryName };
    } catch (err) {
      return { countryCode: "AQ", countryName: "Unknown" };
    };
  }
);

export const selectAuthLogin = state => state.authLogin;
export const selectAuthUserInfo = state => state.authUserInfo;
