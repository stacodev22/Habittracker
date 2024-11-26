// ~ Import Functionalities from redux-toolkit
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

// ~ Import Toast from react-toastify
import { toast } from "react-toastify";

// & Declare Initial State
const INITIAL_STATE = {
  currentUser: null,
};

// / Get UserName
export const getUser = createAsyncThunk("username", async (userName) => {
  // & Save User in Localstorage
  window.localStorage.setItem("token", true);
  window.localStorage.setItem("userName", userName);
  toast.success(`${userName} LogIn Successfully!!`);
  // & Return the username
  return userName;
});

// / Get LoggedInUser Data From Localstorage
export const checkCurrentUser = createAsyncThunk(
  "checkUserLoggedIn",
  async () => {
    // % Set Current User
    const getUser = window.localStorage.getItem("userName");

    if (getUser) {
      toast.success(`${getUser} is already loggedIn`);
      return getUser;
    }
  }
);

// - LogOut User Function
export const logOutFunction = createAsyncThunk("logoutUser", async () => {
  window.localStorage.removeItem("token");
  window.localStorage.removeItem("userName");
});

// # User Tool Kit Slice Function
const userToolkit = createSlice({
  name: "user",
  initialState: INITIAL_STATE,
  reducers: {},
  extraReducers: (builder) => {
    // / Get User From Localstorage
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.currentUser = action.payload;
    });
    // / Check Current User
    builder.addCase(checkCurrentUser.fulfilled, (state, action) => {
      if (action.payload === undefined || action.payload === null) {
        state.currentUser = null;
        state.error = action.payload?.error;
      } else {
        state.currentUser = action.payload;
      }
    });

    // - Logout Function
    builder.addCase(logOutFunction.fulfilled, (state, action) => {
      state.currentUser = null;
    });
  },
});

// & User Reducer
export const userReducer = userToolkit.reducer;

// & User State Selector
export const userSelector = (state) => state.userReducer.currentUser;
