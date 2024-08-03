import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const URL = process.env.REACT_APP_SERVER_URI;

console.log(URL);

const initialState = {
  //login-data
  loginData: {},
  loginDataLoading: false,
  loginDataError: {},

  //register-data
  registerData: {},
  registerDataLoading: false,
  registerDataError: {},

  //user-data
  userData: {},
  userDataLoading: false,
  userDataError: {},

  //logout
  logoutData: {},
  logoutDataLoading: false,
  logoutDataError: {},
};

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (data) => {
    const response = await axios.post(`${URL}api/sign-up`, data);
    return response;
  }
);

export const userLogin = createAsyncThunk("auth/userLogin", async (data) => {
  const response = await axios.post(`${URL}api/sign-in`, data, {
    withCredentials: true,
  });
  return response?.data;
});

export const User = createAsyncThunk("auth/User", async () => {
  const response = await axios.get(`${URL}api/user`, {
    withCredentials: true,
  });
  return response?.data;
});

export const Logout = createAsyncThunk("auth/Logout", async () => {
  const response = await axios.post(`${URL}api/logout`, {
    withCredentials: true,
  });

  return response?.data;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state, action) => {
      state.registerDataLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.registerDataLoading = false;
      state.registerData = action.payload.data;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.registerDataLoading = false;
      state.registerDataError = action.payload.error;
    });
    builder.addCase(userLogin.pending, (state, action) => {
      state.loginDataLoading = true;
    });
    builder.addCase(userLogin.fulfilled, (state, action) => {
      state.loginDataLoading = false;
      state.loginData = action.payload.data;
    });
    builder.addCase(userLogin.rejected, (state, action) => {
      state.loginDataLoading = false;
      state.loginDataError = action.payload.error;
    });
    builder.addCase(User.pending, (state, action) => {
      state.userDataLoading = true;
    });
    builder.addCase(User.fulfilled, (state, action) => {
      state.userDataLoading = false;
      state.userData = action?.payload || {};
    });
    builder.addCase(User.rejected, (state, action) => {
      state.userDataLoading = false;
      state.userDataError = action?.payload;
    });
    builder.addCase(Logout.pending, (state, action) => {
      state.logoutDataLoading = true;
    });
    builder.addCase(Logout.fulfilled, (state, action) => {
      document.cookie =
        "token=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/; domain=.travelhat.onrender.com";
      state.logoutDataLoading = false;
      state.userData = {};
      state.logoutDataError = action.payload.error;
    });
  },
});

const { reducer: userReducers } = userSlice;
export default userReducers;
