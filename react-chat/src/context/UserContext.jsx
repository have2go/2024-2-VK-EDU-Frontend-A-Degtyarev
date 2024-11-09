import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [tokens, setTokens] = useState({ access: null, refresh: null });
    const navigate = useNavigate();

    const login = (access, refresh) => {
        return fetch("https://vkedu-fullstack-div2.ru/api/user/current/", {
            headers: {
                Authorization: `Bearer ${access}`,
                "Content-Type": "application/json",
            },
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                return Promise.reject(response);
            })
            .then(json => {
                setTokens({ access, refresh });
                setData(json);
                return json;
                // navigate(`/`);
            })
            .catch(response => {
                console.log(response);
            });
    };

    const logout = () => {
        setData(null);
        setTokens({ access: null, refresh: null });
    };

    const value = {
        data,
        setData,
        tokens,
        setTokens,
        login,
        logout,
    };

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
