import { createStore } from "redux";
import rootReducer from "./rootReducer";
import { combineReducers } from "redux";


const RootReducer = combineReducers({
  user: rootReducer
})
export const store = createStore(RootReducer)