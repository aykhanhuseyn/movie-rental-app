import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import credentials from "../slices";

const reducer = combineReducers({
  credentials,
});

export default configureStore({
  reducer,
});
