import { USER_ACTION_TYPES } from "./user.types";


const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
}

// need to pass initial state for the first time the reducer runs
export const userReducer = (state = INITIAL_STATE, action) => {
    const { type, payload } = action;

    switch(type) {
        case USER_ACTION_TYPES.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: payload
            }
        case USER_ACTION_TYPES.SIGN_OUT_SUCCESS:
            return {...state, currentUser: null}
        case USER_ACTION_TYPES.SIGN_OUT_FAILED:
        case USER_ACTION_TYPES.SIGN_UP_FAILED:
        case USER_ACTION_TYPES.SIGN_IN_FAILURE:
            return {...state, error: payload}
        // need to return state bc every reducer will get hit when using redux
        // returning state lets the app know to not update this reducer
        default:
            return state;
    }
}

// when using redux, the reducer receives every action that is ever dispatched
// as a result, we need to return the default state