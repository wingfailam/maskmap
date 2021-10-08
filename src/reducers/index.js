import { combineReducers } from "redux";
// import location from "./location";
import * as types from "../constants/ActionTypes";
import location from "./location";
import shops from "./shops";
import store from "./store";
import rwd from "./rwd";

const rootReducer = combineReducers({ location, shops, store, rwd });
export default rootReducer;
