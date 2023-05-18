import { createSlice } from "@reduxjs/toolkit"
import httpService from "../service/http.service";
import localStorageService from "../service/localStorage.service";


const initialState = {
    isLoading: true,
    themesData: [],
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
            state.themesData = data;
        },
    }
})

const { reducer: themesReducer, actions } = themesSlice;
const {
    setIsLoading,
    resetIsLoading,
    setData,
    setSelectThemeId,
} = actions;

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

export const setThemeId =
    ({ payload }) =>
        (dispath) => {
            const { selectThemeId } = payload;
            localStorageService.setSelectedThemeId(selectThemeId);
            dispath(setSelectThemeId({ selectThemeId }));
        }

export const getStatusLoadingThemes = () => (state) => state.themes.isLoading;
export const getDataThemes = () => (state) => state.themes.themesData;

export default themesReducer;