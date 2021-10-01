import { combineReducers } from "redux";
// import location from "./location";
import * as types from "../constants/ActionTypes";
import location from "./location";
import shops from "./shops";
import store from "./store";

const rootReducer = combineReducers({ location, shops, store });
export default rootReducer;
