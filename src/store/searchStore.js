import { createSlice } from "@reduxjs/toolkit";
import { getThemeTitleFromId } from "./themes";
import httpService from "../service/http.service";

const initialState = {
  isLoading: true,
  data: [],
  error: { isError: false, errorMessage: null },
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setIsLoading: (state) => {
      state.isLoading = true;
    },
    resetIsLoading: (state) => {
      state.isLoading = false;
    },
    setData: (state, action) => {
      const data = action.payload;
      state.data = data;
    },
    setError: (state, action) => {
      const error = action.payload;
      state.error = { isError: true, errorMessage: error };
    },
    resetError: (state) => {
      state.error = null;
    },
  },
});

const { reducer: searchReducer, actions } = searchSlice;

const { setIsLoading, setData, resetIsLoading } = actions;

export const searchData =
  ({ payload }) =>
  async (dispatch) => {
    const { query } = payload;
    dispatch(setIsLoading());
    try {
      const { data } = await httpService.get(`/search?query=${query}`);
      const readyData = data.reduce((acc, item) => {
        const result = {
          titleTheme: dispatch(getThemeTitleFromId(item.idTheme)),
          idTheme: item.idTheme,
          idArticle: item.idArticle,
          titleArticle: item.titleArticle,
          descriptionPart: item.descriptionPart,
        };
        acc.push(result);
        return acc;
      }, []);
      dispatch(setData(readyData));
      dispatch(resetIsLoading());
    } catch (error) {
      dispatch(setData(error.message));
    }
  };

export const searchIsLoading = () => (state) => state.search.isLoading;
export const searchError = () => (state) => state.search.error;
export const searchList = () => (state) => state.search.data;

export default searchReducer;
