import { createSlice } from "@reduxjs/toolkit";
import httpService from "../service/http.service";

const initialState = {
    firstName: null,
    lastName: null,
    roles: null,
    error: null,
    loading: false,
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setInfoUserStore: (state, action) => {
            const { first_name, last_name, roles } = action.payload;
            state.firstName = first_name;
            state.lastName = last_name;
            state.roles = roles;
        },
        setLoading: (state) => {
            state.loading = true;
        },
        resetLoading: (state) => {
            state.loading = false;
        },
    },
})

const { reducer: userReduser, actions } = userSlice;
const { setInfoUserStore, setLoading, resetLoading } = actions;

export const setInfoUser = (payload) => (dispatch) => {
    dispatch(setInfoUserStore(payload));
}

export const getInfoUser =
    () =>
        async (dispatch) => {
            dispatch(setLoading());
            try {
                const { data } = await httpService.get('auth/signinfo')
                const { first_name, last_name, roles } = data
                dispatch(setInfoUser({ first_name, last_name, roles }))
            } catch (error) {
                console.log(error)
            }
            dispatch(resetLoading());
        }

export const getFirstName = () => (state) => state.user.firstName;
export const getLastName = () => (state) => state.user.lastName;
export const getStatusLoading = () => (state) => state.user.loading;

export default userReduser;