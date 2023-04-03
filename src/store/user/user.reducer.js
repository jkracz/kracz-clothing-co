import { USER_ACTION_TYPES } from "./user.types";

// need to pass initial state for the first time the reducer runs
export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case USER_ACTION_TYPES.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: payload
            }
        // need to return state bc every reducer will get hit when using redux
        // returning state lets the app know to not update this reducer
        default:
            return state;
    }
}

const INITIAL_STATE = {
    currentUser: null
}

// when using redux, the reducer receives every action that is ever dispatched
// as a result, we need to return the default state