import { combineReducers } from "redux";
import { userReducer } from "./userReducer";
import { scheduleReducer } from "./scheduleReducer";

export const rootReducer = combineReducers( // Setting it up like this just in case we add accounts.
    {
        userRoot: userReducer,
        scheduleRoot: scheduleReducer
    }
)