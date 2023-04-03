import createAction from "../../utils/reducer/reducer.utils";
import { USER_ACTION_TYPES } from "./user.types";

export const setCurrentUser = (user) => {
    // when you use the dispatch function, you just want to pass it the action obj
    // the actual reducer will maintain current state
    return createAction(USER_ACTION_TYPES.SET_CURRENT_USER, user);
}