import { createSlice } from "@reduxjs/toolkit"
import httpService from "../service/http.service";


const initialState = {
    isLoading: true,
    themesData: null,
    error: null,
}

const themesSlice = createSlice({
    name: 'themes',
    initialState,
    reducers: {
        setIsLoading: (state) => {
            state.isLoading = true;
        },
        resetIsLoading: (state) => {
            state.isLoading = false;
        },
        setData: (state, action) => {
            const { data } = action.payload;
            state.data = data;
        },
    }
})

const { reducer: themesReducer, actions } = themesSlice;
const { setIsLoading, resetIsLoading, setData } = actions;

export const loadingDataThemes =
    () =>
        async (dispath) => {
            dispath(setIsLoading());
            try {
                const { data } = await httpService.get('themes');
                dispath(setData({ data }));
                dispath(resetIsLoading());
            } catch (error) {
                console.log(error);
            }
        }

export const getStatusLoadingThemes = () => (state) => state.themes.isLoading;
export const getDataThemes = () => (state) => state.themes.data;

export default themesReducer;