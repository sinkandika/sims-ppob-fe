import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getToken, removeToken, setToken } from "../../services/tokenService";
import { loginAPI, registerAPI } from "./authService";

// login, register, logout system

// get token from localstorage
const localToken = getToken(); // from tokenService.js

const initialState = {
    token: localToken,
    isAuthenticated: !!localToken,
    isLoading: false,
    error: null,
    registerSuccess: false,
};

// redux for login
export const login = createAsyncThunk(
    "auth/login",
    async (credentials, thunkAPI) => {
        try {
            const data = await loginAPI(credentials); // token from authService.js
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(error.message || "login gagal");
        }
    }
);

// redux for register
export const register = createAsyncThunk(
    "auth/register",
    async (payload, thunkAPI) => {
        try {
            const data = await registerAPI(payload);
            return data;
        } catch (error) {
            return thunkAPI.rejectWithValue(
                error.response?.data?.message || "Registrasi gagal"
            );
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    // login n register
    extraReducers: (builder) => {
        builder
        // login pending
        .addCase(login.pending, (s) => {
            s.isLoading = true;
            s.error = null;
        })
        // login success
        .addCase(login.fulfilled, (s, act) => {
            s.isLoading = false;
            s.token = act.payload.token;
            s.isAuthenticated = true ;
            setToken(act.payload.token);
        })
        // login failed
        .addCase(login.rejected, (s, act) => {
            s.isLoading = false;
            s.error = act.payload;
        })
        // register pending
        .addCase(register.pending, (s) => {
            s.isLoading = true;
            s.error = null;
            s.registerSuccess = false;
        })
        // register success
        .addCase(register.fulfilled, (s) => {
            s.isLoading = false;
            s.registerSuccess = true;
        })
        .addCase(register.rejected, (s, a) => {
            s.isLoading = false;
            s.error = a.payload;
        });
    },
    // logout n register
    reducers: {
        // logout
        logout: (s) => {
            s.token = null;
            s.isAuthenticated = false;
            s.error = null;
            removeToken(); // from tokenService.js
        },
        // register reset (for link/route)
        resetRegisterState: (s) => {
            s.registerSuccess = false;
            s.error = null;
        },
    },
});

export const { logout, resetRegisterState } = authSlice.actions;
export default authSlice.reducer;

