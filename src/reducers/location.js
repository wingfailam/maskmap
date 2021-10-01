import * as types from "../constants/ActionTypes";
const location = (
  state = { isFetching: false, location: { lat: 23.97565, lng: 120.973882 } },
  action
) => {
  switch (action.type) {
    case types.REQUEST_LOCATION:
      return Object.assign({}, state, { isFetching: true });
    case types.RECEIVE_LOCATION:
      return Object.assign({}, state, {
        isFetching: false,
        location: action.location
      });
    default:
      return state;
  }
};

export default location;
