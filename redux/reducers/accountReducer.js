import { LOGIN, LOGOUT } from "../actionTypes"

const initialState = {
    username: "",
    password: "",
}

const accountReducer = (state = initialState, action) => {
    switch(action["type"]) {
        case LOGIN: {
            
            return state;
        }
        case LOGOUT: {

            return state;
        }
    }
}