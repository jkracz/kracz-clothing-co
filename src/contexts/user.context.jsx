import { useState, createContext } from "react";

// the actual value you want to access
export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null,
});

// the wrapper that provides the value
export const UserProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const value = {currentUser, setCurrentUser};

    // you pass the state value and the setter so any child component can use it
    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}