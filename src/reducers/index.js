import { combineReducers } from "redux";
import { login } from "./login.reducer";
import { globalError } from "./error.reducer";

const rootReducer = combineReducers({ login, globalError });

export default rootReducer;
