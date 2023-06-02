import { createSlice } from "@reduxjs/toolkit";
import authService from "../service/auth.service";
import localStorageService from "../service/localStorage.service";
import { setInfoUser } from "./user";

const initialState = localStorageService.getAcessToken()
    ? {
        auth: localStorageService.getUserId(),
        authInProcess: false,
        error: null,
    } : {
        auth: null,
        authInProcess: false,
        error: null,
    }

const userSlice = createSlice({
    name: "session",
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
        setError: (state, action) => {
            const errorText = action.payload;
            state.error = errorText;
        },
        resetError: (state) => {
            state.error = null;
        }
    }
})

const { reducer: sessionReducer, actions } = userSlice;
const { 
    setAuth, 
    resetAuth, 
    authRequestInProcess, 
    setError, 
    resetError, 
} = actions;

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
                const { user_info } = data;
                const { first_name, last_name, roles } = user_info;
                dispatch(setInfoUser({ first_name, last_name, roles }))
                localStorageService.setTokens(data);
                dispatch(setAuth());
                dispatch(resetError());
            } catch (error) {
                dispatch(resetAuth());
                dispatch(setError(error.message));
            }
        }

export const logout = () => (dispatch) => dispatch(resetAuth());
export const resetTextError = () => (dispatch) => dispatch(resetError());

export const getAuthStatus = () => (state) => state.session.auth;
export const getProcessAuthStatus = () => (state) => state.session.authInProcess;
export const getErrorText = () => (state) => state.session.error;

export default sessionReducer;