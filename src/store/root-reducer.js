import { combineReducers } from "redux";

import userReducer from "./reducers/user.reducer";

combineReducers({
  user: userReducer,
});

export default combineReducers;
