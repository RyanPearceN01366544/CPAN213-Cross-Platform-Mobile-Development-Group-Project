import { combineReducers } from "redux";
import { scheduleReducer } from "./scheduleReducer.js";

export const rootReducer = combineReducers( // Setting it up like this just in case we add accounts.
    {
        scheduleRoot: scheduleReducer
    }
)