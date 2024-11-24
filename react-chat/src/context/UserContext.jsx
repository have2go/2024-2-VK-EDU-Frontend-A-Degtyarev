import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { getUser } from "../api/api";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [data, setData] = useState(null);
    const [tokens, setTokens] = useState({ access: null, refresh: null });
    const navigate = useNavigate();

    const login = (access, refresh) => {
        return getUser(access).then(json => {
            setTokens({ access, refresh });
            setData(json);
            return json;
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
