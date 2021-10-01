import * as types from "../constants/ActionTypes";

const store = (state = {}, action) => {
  switch (action.type) {
    case types.SELECT_STORE:
      return Object.assign({}, state, action.store);
    default:
      return state;
  }
};

export default store;
