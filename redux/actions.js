import {
    LOGIN,
    LOGOUT,
    ADD_SCHEDULE_NODE,
    EDIT_SCHEDULE_NODE,
    REMOVE_SCHEDULE_NODE
} from "./actionTypes"

export const login = (details) => ({
    type: LOGIN,
    payload: details
});
export const logout = () => ({
    type: LOGOUT,
    payload: null
});

export const addScheduleNode = (node) => ({
    type: ADD_SCHEDULE_NODE,
    payload: node,
});
export const editScheduleNode = (node) => ({
    type: EDIT_SCHEDULE_NODE,
    payload: node,
});
export const removeScheduleNode = (node) => ({
    type: REMOVE_SCHEDULE_NODE,
    payload: node,
});