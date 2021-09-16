import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const userUpdate = createAsyncThunk(
  "userChange/update",
  async (payload, thunkAPI) => {
    try {
      const { data, status } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/`,
        payload
      );
      if (status === 205) sessionStorage.removeItem("userInfo");
      return { data, status };
    } catch (err) {
      const { data, status } = err.response;
      return thunkAPI.rejectWithValue({ data, status });
    }
  }
);

export const userCreateAdmin = createAsyncThunk(
  "userChange/createAdmin",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/admin/`,
        payload
      );
      return data;
    } catch (err) {
      const { data, status } = err.response;
      return thunkAPI.rejectWithValue({ data, status });
    }
  }
);

export const userListAdmin = createAsyncThunk(
  "userChange/listAdmin",
  async (_, thunkAPI) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/adminList/`
      );
      return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const userManageAdmin = createAsyncThunk(
  "userChange/manageAdmin",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/admin/override/`,
        payload
      );
      return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const userEditAdmin = createAsyncThunk(
  "userChange/editAdmin",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/admin/`,
        payload
      );
      return data;
    } catch (err) {
      const { data, status } = err.response;
      return thunkAPI.rejectWithValue({ data, status });
    }
  }
);

export const userForgetPassword = createAsyncThunk(
  "userChange/forgetPassword",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/recovery/`,
        payload
      );
      return data;
    } catch (err) {
      const { data, status } = err.response;
      return thunkAPI.rejectWithValue({ data, status });
    }
  }
);

export const userVerifyRecovery = createAsyncThunk(
  "userChange/verifyRecovery",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/verify/recovery/`,
        payload
      );
      return data;
    } catch (err) {
      const { data, status } = err.response;
      return thunkAPI.rejectWithValue({ data, status });
    }
  }
);

export const userFinishRecovery = createAsyncThunk(
  "userChange/finishRecovery",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/confirmRecovery/`,
        payload
      );
      return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const userUpdateFederated = createAsyncThunk(
  "userChange/updateFederated",
  async (payload, thunkAPI) => {
    try {
      const { data } = await axios.put(
        `${process.env.REACT_APP_BACKEND_URL}/api/user/federated`,
        payload
      );
      return data;
    } catch (err) {
      const { data } = err.response;
      return thunkAPI.rejectWithValue(data);
    }
  }
);

export const selectUserUpdate = (state) => state.userUpdate;
export const selectUserCreateAdmin = (state) => state.userCreateAdmin;
export const selectUserListAdmin = (state) => state.userListAdmin;
export const selectUserManageAdmin = (state) => state.userManageAdmin;
export const selectUserEditAdmin = (state) => state.userEditAdmin;
export const selectUserForgetPassword = (state) => state.userForgetPassword;
export const selectUserVerifyRecovery = (state) => state.userVerifyRecovery;
export const selectUserFinishRecovery = (state) => state.userFinishRecovery;
export const selectUserFederatedInfo = (state) => state.userFederatedInfo;
