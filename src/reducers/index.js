import { combineReducers } from "redux";

//REDUCER IMPORTS
import recordsReducer from "./records";

export default combineReducers({
  records: recordsReducer,
});
