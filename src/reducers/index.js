import { CREATE_USER, LOGIN_AUTH, UPDATE_USER } from "../actions/index";
import { combineReducers } from "redux";

const initialValues = {
  user: {},
};

const loginAuth = (state = initialValues, action) => {
  switch (action.type) {
    case LOGIN_AUTH:
      return {
        ...state,
        user: action.payload,
      };
    case CREATE_USER:
      return {
        ...state,
        user: action.payload,
      };
    case UPDATE_USER:
      return { ...state, user: action.payload };
    default:
      return state;
  }
};
const extra = (state = { value: "this_is_extra_reducer" }, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
const loginApp = combineReducers({
  loginAuth,
  extra,
});

export default loginApp;
