import { createSlice } from "@reduxjs/toolkit";
import authService from "../service/auth.service";

const initialState = {
    registerSuccessful: false,
    registerInProcess: false,
    error: null,
}

const registerSlice = createSlice({
    name: "register",
    initialState,
    reducers: {
        setRegisterSuccessful: (state) => {
            state.registerSuccessful = true;
        },
        resetRegisterSuccessful: (state) => {
            state.registerSuccessful = false;
        },
        setRegisterInProcess: (state) => {
            state.registerInProcess = true;
        },
        resetRegisterInProcess: (state) => {
            state.registerInProcess = false;
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

const { reducer: registerReduser, actions } = registerSlice;
const {
    setRegisterSuccessful,
    setRegisterInProcess,
    resetRegisterInProcess,
    resetRegisterSuccessful,
    setError,
    resetError,
} = actions;

export const register =
    ({ payload }) =>
        async (dispatch) => {
            const { firstName, lastName, username, password } = payload;
            dispatch(setRegisterInProcess());
            try {
                await authService.register({
                    firstName,
                    lastName,
                    username,
                    password,
                })
                dispatch(resetRegisterInProcess());
                dispatch(setRegisterSuccessful());
            } catch (error) {
                dispatch(resetRegisterInProcess());
                dispatch(setError(error.message));
                console.log(error.message)
            }
        }

export const resetSuccessfull = () => (dispatch) => dispatch(resetRegisterSuccessful());
export const resetTextError = () => (dispatch) => dispatch(resetError());

export const getRegisterInProcess = () => (state) => state.register.registerInProcess;
export const getStatusRegistration = () => (state) => state.register.registerSuccessful;
export const getErrorText = () => (state) => state.register.error;

export default registerReduser;