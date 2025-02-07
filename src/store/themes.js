import { createSlice } from "@reduxjs/toolkit";
import httpService from "../service/http.service";

const initialState = {
  isLoading: true,
  themesData: [],
  error: null,
  selectedThemeId: null,
  selectedArticleId: null,
};

const themesSlice = createSlice({
  name: "themes",
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
    setSelectThemeId: (state, action) => {
      const id = action.payload;
      state.selectedThemeId = id;
    },
    setSelectArticleId: (state, action) => {
      const id = action.payload;
      state.selectedArticleId = id;
    },
  },
});

const { reducer: themesReducer, actions } = themesSlice;
const {
  setIsLoading,
  resetIsLoading,
  setData,
  setSelectThemeId,
  setSelectArticleId,
} = actions;

export const loadingDataThemes = () => async (dispatch) => {
  dispatch(setIsLoading());
  try {
    const { data } = await httpService.get("themes");
    dispatch(setData({ data }));
    dispatch(resetIsLoading());
  } catch (error) {
    console.log(error);
  }
};

export const setThemeId = (themeId) => async (dispatch) => {
  dispatch(setSelectThemeId(themeId));
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  await delay(600);
};

export const setSelectedArticleId = (articleId) => async (dispatch) => {
  dispatch(setSelectArticleId(articleId));
};

export const getThemeTitleFromId = (id) => (dispatch, getState) => {
  const themes = getState().themes.themesData;
  const theme = themes.find((theme) => theme.id === id);
  return theme?.title;
};

export const getStatusLoadingThemes = () => (state) => state.themes.isLoading;
export const getDataThemes = () => (state) => state.themes.themesData;
export const getSelectedThemeId = () => (state) => state.themes.selectedThemeId;
export const getSelectedArticleId = () => (state) =>
  state.themes.selectedArticleId;

export default themesReducer;
