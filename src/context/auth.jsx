import React from "react";
import { createContext, useContext, useEffect, useReducer } from "react";
import { initialState, reducer } from "../context/reducer";

const AuthContext = createContext(undefined);

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  //persistedUser
  useEffect(() => {
    const user = localStorage.getItem("token");
    if (user) {
      dispatch({ type: "USER", payload: user });
    }
  }, []);

  const value = { state, dispatch };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  return useContext(AuthContext);
};
