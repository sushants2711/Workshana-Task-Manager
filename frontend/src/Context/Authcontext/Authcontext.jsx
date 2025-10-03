import React, { createContext, useContext, useState } from 'react'

export const Authcontext = createContext();

export const allAuthContext = () => useContext(Authcontext);

export const AuthcontextProvider = ({ children }) => {
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const setUserDetailsInLocalStorage = (name, email) => {
        localStorage.setItem("name", name);
        localStorage.setItem("email", email);

        setUserName(name);
        setUserEmail(email);
    };

    const fetchDetailsFromLocalStorage = () => {
        const name = localStorage.getItem("name");
        const email = localStorage.getItem("email");

        if (name && email) {
            setUserName(name);
            setUserEmail(email);
        }
    };

    const removeUserDetailsFromLocalStorage = () => {
        localStorage.removeItem("name");
        localStorage.removeItem("email");

        setUserName("");
        setUserEmail("");
    };
    return (
        <Authcontext.Provider value={{ userName, userEmail, setUserDetailsInLocalStorage, fetchDetailsFromLocalStorage, removeUserDetailsFromLocalStorage }}>
            {children}
        </Authcontext.Provider>
    )
}