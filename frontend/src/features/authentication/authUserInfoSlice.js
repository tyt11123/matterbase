import { createSlice } from "@reduxjs/toolkit";
import { authLogout, authPreflight, authUserInfo, authUserLocation } from "./authAsyncThunk";
import { userUpdate, userEditAdmin, userUpdateFederated } from "../userChange/userAsyncThunk";

const {
  csrfToken,
  ip,
  isFederatedLoginFail,
  ...initialUserInfo
} = JSON.parse(sessionStorage.getItem("userInfo")) || {};

const authUserInfoSlice = createSlice({
  name: "authentication",
  initialState: {
    isLoading: false,
    isSuccess: false,
    isFail: false,
    isLoggedOut: false,
    payload: {...initialUserInfo},
    csrfToken: undefined,
    ip: undefined,
    isFederatedLoginFail: false,
    countryCode: sessionStorage.getItem("countryCode") || "AQ",
    countryName: sessionStorage.getItem("countryName") || "Unknown",
  },
  reducers: {},
  extraReducers: {
    [authPreflight.pending]: (state, action) => {
      state.isLoggedOut = false;
    },
    [authPreflight.fulfilled]: (state, action) => {
      const { csrfToken, ip, isFederatedLoginFail, ...userInfo } = action.payload;
      state.payload = { ...userInfo };
      state.csrfToken = csrfToken;
      state.ip = ip;
      state.isFederatedLoginFail = isFederatedLoginFail ? true : false;
    },
    [authUserLocation.fulfilled]: (state, action) => {
      state.countryCode = action.payload.countryCode;
      state.countryName = action.payload.countryName;
    },
    [authUserInfo.pending]: (state, action) => {
      state.isLoading = true;
      state.isSuccess = false;
      state.isFail = false;
      state.payload = {};
    },
    [authUserInfo.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.payload = { ...action.payload };
    },
    [authUserInfo.rejected]: (state, action) => {
      state.isLoading = false;
      state.isFail = true;
    },
    [userUpdate.fulfilled]: (state, action) => {
      if (action.payload.status === 200) {
        state.payload = { ...action.payload.data };
      };
      if (action.payload.status === 205) {
        state.isLoggedOut = true;
        state.payload = {};
      };
    },
    [userEditAdmin.fulfilled]: (state, action) => {
      state.payload = { ...action.payload };
    },
    [userUpdateFederated.fulfilled]: (state, action) => {
      state.payload = { ...action.payload };
    },
    [authLogout.fulfilled]: (state, action) => {
      state.isLoggedOut = true;
      state.payload = {};
    },
  },
});

export default authUserInfoSlice.reducer;
