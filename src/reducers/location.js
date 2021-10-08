import * as types from "../constants/ActionTypes";
const location = (
  state = {
    isFetching: false,
    location: { lat: 25.0477541, lng: 121.5140006 },
    showModal: false,
  },
  action
) => {
  switch (action.type) {
    case types.REQUEST_LOCATION:
      return Object.assign({}, state, { isFetching: true });
    case types.RECEIVE_LOCATION:
      return Object.assign({}, state, {
        isFetching: false,
        location: action.location,
      });
    case types.SHOW_MODAL:
      return Object.assign({}, state, {
        isFetching: false,
        showModal: action.show,
      });

    default:
      return state;
  }
};

export default location;
