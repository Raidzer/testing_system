import { createSlice } from "@reduxjs/toolkit";
import authService from "../service/auth.service";
import localStorageService from "../service/localStorage.service";

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
    }
})

const { reducer: usersReducer, actions } = userSlice;
const { setAuth, resetAuth, authRequestInProcess } = actions;

export const login =
    ({ payload }) =>
        async (dispatch) => {
            const { login, password } = payload;
            dispatch(authRequestInProcess())
            try {
                const data = await authService.login({ login, password })
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


export const getAuthStatus = () => (state) => state.session.auth;
export const getProcessAuthStatus = () => (state) => state.session.authInProcess;

export default usersReducer;