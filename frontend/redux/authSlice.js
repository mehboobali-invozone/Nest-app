import { createSlice } from "@reduxjs/toolkit";

let user = null;
let token = null;

if (typeof window !== "undefined") {

  try {

    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    user =
      storedUser && storedUser !== "undefined"
        ? JSON.parse(storedUser)
        : null;

    token =
      storedToken && storedToken !== "undefined"
        ? storedToken
        : null;

  } catch (error) {

    console.log("LocalStorage Error:", error);

    user = null;
    token = null;

  }

}

const authSlice = createSlice({
  name: "auth",

  initialState: {
    user,
    token,
  },

  reducers: {

    loginSuccess: (state, action) => {

      state.user = action.payload.user;
      state.token = action.payload.token;

      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("token", action.payload.token);
    },

    logout: (state) => {

      state.user = null;
      state.token = null;

      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }

  },
});

export const { loginSuccess, logout } = authSlice.actions;

export default authSlice.reducer;