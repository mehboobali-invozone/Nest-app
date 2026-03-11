"use client";

import { createContext, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginSuccess, logout } from "@/redux/authSlice";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
const dispatch = useDispatch();
const authState = useSelector((s)=>s.auth);

const login = (data)=>{
dispatch(loginSuccess(res.data.user))
};

const signOut = ()=>{
dispatch(logout());
};

return (

<AuthContext.Provider
value={{
authState,
login,
logout:signOut
}}
>
{children}

</AuthContext.Provider>

);
};

export const useAuth = ()=>{
return useContext(AuthContext);
};