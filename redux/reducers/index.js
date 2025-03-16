import { combineReducers } from "redux";
import { loginReducer } from "./loginReducer";
import { scheduleReducer } from "./scheduleReducer";

export const rootReducer = combineReducers(
    {
        loginRoot: loginReducer,
        scheduleRoot: scheduleReducer
    }
)