import {   
    FETCH_SCHEDULE_NODES,
    ADD_SCHEDULE_NODE, 
    EDIT_SCHEDULE_NODE,
    DELETE_SCHEDULE_NODE
} from "../actionTypes"

const initialState = {
    schedule: [] // WIll edit later for each day.
}

export const scheduleReducer = (state = initialState, action) => {

    switch (action["type"]) {
        case FETCH_SCHEDULE_NODES: {
            return {
                ...state,
                schedule: action.payload
            }
        }
        case ADD_SCHEDULE_NODE: return state;
        case EDIT_SCHEDULE_NODE: return state;
        case DELETE_SCHEDULE_NODE: return state;
        default: return state;
    }
}