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
    }
})

const { reducer: registerReduser, actions } = registerSlice;
const { setRegisterSuccessful, setRegisterInProcess, resetRegisterInProcess, resetRegisterSuccessful } = actions;

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
                console.log(error);
            }
        }

export const resetSuccessfull = () => (dispatch) => dispatch(resetRegisterSuccessful());

export const getRegisterInProcess = () => (state) => state.register.registerInProcess;
export const getStatusRegistration = () => (state) => state.register.registerSuccessful;

export default registerReduser;