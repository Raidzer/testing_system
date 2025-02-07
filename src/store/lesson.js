import { createSlice } from "@reduxjs/toolkit";
import httpService from "../service/http.service";
import { removeSessionQuestionId } from "../service/localStorage.service";

const initialState = {
  isLoading: true,
  dataId: { id: null },
  data: { description: undefined },
  error: null,
};

const userSlice = createSlice({
  name: "lesson",
  initialState,
  reducers: {
    setIsLoading: (state) => {
      state.isLoading = true;
    },
    resetIsLoading: (state) => {
      state.isLoading = false;
    },
    setData: (state, action) => {
      state.data = action.payload;
    },
    resetData: (state) => {
      state.data = initialState.data;
    },
  },
});

const { reducer: lessonReducer, actions } = userSlice;
const { setIsLoading, resetIsLoading, setData, resetData } = actions;

export const getDataArticle =
  ({ payload }) =>
  async (dispatch) => {
    removeSessionQuestionId();
    const { id } = payload;
    dispatch(setIsLoading());
    try {
      const { data } = await httpService.get(`/articles/${id}`);
      dispatch(setData(data));
      dispatch(resetIsLoading());
    } catch (error) {
      console.log(error);
      dispatch(resetIsLoading());
    }
  };

export const resetDataDiscription = () => (dispatch, state) =>
  dispatch(resetData());

export const getStatusLoadingLesson = () => (state) => state.lesson.isLoading;
export const getDataLesson = () => (state) => state.lesson.data;

export default lessonReducer;
