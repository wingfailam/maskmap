import { bindActionCreators } from "redux";
import * as types from "../constants/ActionTypes";
const rwd = (
  state = {
    width: 992,
    page: true,
  },
  action
) => {
  switch (action.type) {
    case types.SET_WIDTH:
      return Object.assign({}, state, {
        width: action.width,
      });
    case types.SET_PAGE:
      return Object.assign({}, state, {
        page: !state.page,
      });

    default:
      return state;
  }
};
export default rwd;
