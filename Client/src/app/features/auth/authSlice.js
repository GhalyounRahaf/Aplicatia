import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");

console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhh7hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh");

const initialState = {
  token: token || undefined,
  isLoggedIn: token ? true : false,
  loggedInUserData: undefined,
//   isAdmin:true
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loginUser: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
      state.loggedInUserData = action.payload.data;
    //   state.isAdmin= action.payload.data;
      // state.role = decode.role;
    },
    logoutUser: (state) => {
      state.isLoggedIn = false;
      state.token = undefined;
      state.loggedInUserData = undefined;
      toast.success("You have successfully logged out");
    },
  },
});

// console.log(cartSlice);
export const { loginUser, logoutUser, changeMode } = authSlice.actions;

export default authSlice.reducer;
