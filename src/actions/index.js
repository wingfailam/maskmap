import fetch from "isomorphic-fetch";
import * as types from "../constants/ActionTypes";

export function selectStore(store) {
  return {
    type: types.SELECT_STORE,
    store,
  };
}

export function requestShops() {
  return {
    type: types.REQUEST_SHOPS,
  };
}
export function receiveShops(data) {
  return {
    type: types.RECEIVE_SHOPS,
    data,
  };
}

export function requestLocation() {
  return {
    type: types.REQUEST_LOCATION,
  };
}
export function receiveLocation(location) {
  return {
    type: types.RECEIVE_LOCATION,
    location,
  };
}

export function showModal(show) {
  return {
    type: types.SHOW_MODAL,
    show,
  };
}

export function fetchShops() {
  return (dispatch) => {
    dispatch(requestShops());
    return fetch(
      `https://raw.githubusercontent.com/kiang/pharmacies/master/json/points.json`
    )
      .then((response) => response.json())
      .then((data) => dispatch(receiveShops(data)));
  };
}
