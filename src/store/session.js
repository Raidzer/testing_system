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
    }
})

const { reducer: sessionReducer, actions } = userSlice;
const { setAuth, resetAuth, authRequestInProcess } = actions;

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
                const { user_info } = data;
                const { first_name, last_name, roles } = user_info;
                dispatch(setInfoUser({ first_name, last_name, roles }))
                localStorageService.setTokens(data);
                dispatch(setAuth());
            } catch (error) {
                console.log(error)
                dispatch(resetAuth())
            }
        }

export const logout = () => (dispatch) => dispatch(resetAuth());

export const getAuthStatus = () => (state) => state.session.auth;
export const getProcessAuthStatus = () => (state) => state.session.authInProcess;

export default sessionReducer;