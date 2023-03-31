import { createContext, useEffect, useReducer } from "react";
import { onAuthStateChangedListener, createUserDocFromAuth } from "../utils/firebase/firebase.utils";

// the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// make it easy to access action types
export const USER_ACTION_TYPES = {
    "SET_CURRENT_USER": "SET_CURRENT_USER"
}

const userReducer = (state, action) => {
    const { type, payload } = action;

    switch(type) {
        case "SET_CURRENT_USER":
            return {
                ...state,
                currentUser: payload
            }
        default:
            throw new Error(`Unhandled type ${type} in userReducer`);
    }
}

const INITIAL_STATE = {
    currentUser: null
}

// the wrapper that provides the value
export const UserProvider = ({ children }) => {
    const [ state, dispatch ] = useReducer(userReducer, INITIAL_STATE) // hook takes the reducer you want and it's initial state
    // a dispatch func is returned which is how you call the reducer

    const { currentUser } = state; // setting the current user returned by reducer hook (this will be used by other parts of app)
    const setCurrentUser = (user) => {
        // when you use the dispatch function, you just want to pass it the action obj
        // the actual reducer will maintain current state
        dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user });
    }

    const value = {currentUser, setCurrentUser};

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if(user) {
                createUserDocFromAuth(user);
            }
            setCurrentUser(user);
        });

        return unsubscribe;
    }, []);

    // you pass the state value and the setter so any child component can use it
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}