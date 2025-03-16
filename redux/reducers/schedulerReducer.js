import { ADD_SCHEDULE_NODE, EDIT_SCHEDULE_NODE, REMOVE_SCHEDULE_NODE } from "../actionTypes"

const initialState = {
    schedule: [] // WIll edit later for each day.
}

export const scheduleReducer = (state, action) => {

    switch (action["type"]) {
        case ADD_SCHEDULE_NODE: {
            
            return state;
        }
        case EDIT_SCHEDULE_NODE: {

            return state;
        }
        case REMOVE_SCHEDULE_NODE: {

            return state;
        }
        default: return state;
    }
}