import { createStore, combineReducers } from "redux";
import BeverageMenuReducer from "./Reducers/BeverageMenuReducer";
import BeverageQueueReducer from "./Reducers/BeverageQueueReducer";

export default createStore(
  combineReducers({
    BeverageMenu: BeverageMenuReducer,
    BeverageQueue: BeverageQueueReducer
  })
);
