import { createSlice } from "@reduxjs/toolkit";
import authService from "../service/auth.service";
import localStorageService from "../service/localStorage.service";

const initialState = localStorageService.getAcessToken()
    ? {
        auth: localStorageService.getUserId(),
        authInProcess: false,
        registerInProcess: false,
        error: null,
    } : {
        auth: null,
        authInProcess: false,
        registerInProcess: false,
        error: null,
    }

const userSlice = createSlice({
    name: "users",
    initialState,
    reducers: {
        setAuth: (state) => {
            state.auth = true;
            state.authInProcess = null;
        },
        resetAuth: (state) => {
            state.auth = null;
            state.authInProcess = null;
        },
        authRequestInProcess: (state) => {
            state.authInProcess = true;
        },
        registerRequestInProcess: (state) => {
            state.registerInProcess = true;
        },
        registerRequestOutProcess: (state) => {
            state.registerInProcess = false;
        },
    }
})

const { reducer: usersReducer, actions } = userSlice;
const { setAuth, resetAuth, authRequestInProcess, registerRequestInProcess, registerRequestOutProcess } = actions;

export const login =
    ({ payload }) =>
        async (dispatch) => {
            const { username, password } = payload;
            dispatch(authRequestInProcess())
            try {
                const data = await authService.login({ 
                    username, 
                    password 
                })
                if (data.status === 401) {
                    throw new Error(data.error);
                }
                localStorageService.setTokens(data);
                dispatch(setAuth());
            } catch (error) {
                console.log(error)
                dispatch(resetAuth())
            }
        }

export const register =
    ({ payload }) =>
        async (dispatch) => {
            const { userFullName, username, password } = payload;
            dispatch(registerRequestInProcess())
            try {
                await authService.register({
                    userFullName,
                    username,
                    password,
                })
            } catch (error) {
                console.log(error);
            }
        }

export const logout = () => (dispatch) => dispatch(resetAuth());

export const getAuthStatus = () => (state) => state.session.auth;
export const getProcessAuthStatus = () => (state) => state.session.authInProcess;

export default usersReducer;