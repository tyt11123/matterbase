import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const regSignup = createAsyncThunk(
  "registration/signup",
  async (values, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/signup/`,
        values
      );
      return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const regVerifyRegistration = createAsyncThunk(
  "registration/verifyRegistration",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/signup/verify/registration/`,
        payload
      );
      return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const regVerifySubscription = createAsyncThunk(
  "registration/verifySubscription",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/signup/verify/subscription/`,
        payload
      );
      return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const regSubscribe = createAsyncThunk(
  "registration/subscribe",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/signup/subscription/`,
        payload
      );
      return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const selectRegSignup = (state) => state.regSignup;
export const selectRegVerifyRegistration = (state) =>
state.regVerifyRegistration;
export const selectRegVerifySubscription = (state) =>
state.regVerifySubscription;
export const selectRegSubscribe = (state) =>
state.regSubscribe;
