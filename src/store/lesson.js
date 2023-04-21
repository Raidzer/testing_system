import { createSlice } from "@reduxjs/toolkit"
import httpService from "../service/http.service";


const initialState = {
    isLoadig: false,
    dataId: { id: null },
    data: { description: null },
    error: null,
}

const userSlice = createSlice({
    name: "lesson",
    initialState,
    reducers: {
        setIsLoading: (state) => {
            state.isLoadig = true;
        },
        resetIsLoading: (state) => {
            state.isLoadig = false;
        },
        setData: (state, action) => {
            state.data = action.payload;
        },
        resetData: (state) => {
            state.data = initialState.data;
        }
    }
})

const { reducer: lessonReducer, actions } = userSlice;
const { setIsLoading, resetIsLoading, setData } = actions;

export const getDataArticle =
    ({ payload }) =>
        async (dispatch) => {
            const { id } = payload;
            dispatch(setIsLoading());
            try {
                const { data } = await httpService.get(`/articles/${id}`)
                dispatch(setData(data))
                dispatch(resetIsLoading());
            } catch (error) {
                console.log(error)
            }
        }

export const getStatusLoadingLesson = () => (state) => state.lesson.isLoadig;
export const getDataLesson = () => (state) => state.lesson.data;

export default lessonReducer;