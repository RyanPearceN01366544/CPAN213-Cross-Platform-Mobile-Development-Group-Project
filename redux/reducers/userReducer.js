import {   
    SET_USE_PM,
    SET_STARTING_WEEKDAY
} from "../actionTypes"

const initialState = {
    settings: {
        usePmTime: true,
        useStartingDay: "Sunday",
    }
}

export const userReducer = (state = initialState, action) => {
    switch (action["type"]) {
        case SET_USE_PM: {
            return {
                ...state,
                settings: {
                    usePmTime: action.payload,
                    useStartingDay: state.settings.useStartingDay
                }
            }
        }
        case SET_STARTING_WEEKDAY: {
            return {
                ...state,
                settings: {
                    usePmTime: state.settings.usePmTime,
                    useStartingDay: action.payload
                }
            }
        }
        default: return state;
    }
}