import { createSlice } from "@reduxjs/toolkit";
import { Data } from "../../utils";

export const credentialsSlice = createSlice({
  name: "credentials",
  initialState: {
    user: Data.read("user") || null,
    token: Data.read("token") || null,
  },
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
      Data._set("user", action.payload.user);
      state.token = action.payload.token;
      Data._set("token", action.payload.token);
    },
    logout: (state) => {
      state.user = null;
      Data.delete("user");
      state.token = null;
      Data.delete("token");
    },
  },
});

export const { login, logout } = credentialsSlice.actions;

export default credentialsSlice.reducer;
