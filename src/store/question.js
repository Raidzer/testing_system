import { createSlice } from "@reduxjs/toolkit"
import httpService from "../service/http.service";
import localStorageService from "../service/localStorage.service";


const initialState = {
    isLoading: true,
    dataQuestion: {},
    error: null,
    idQuestion: null,
    multiAnswer: false,
    jsessionId: localStorageService.getSessionQuestionId(),
    questionIsOver: false,
    statisticComplitedTest: {},
    mistakeFromTestComment: '',
    isMistakeAnswer: false,
}

const userSlice = createSlice({
    name: 'question',
    initialState,
    reducers: {
        setIsLoading: (state) => {
            state.isLoading = true;
        },
        resetIsLoading: (state) => {
            state.isLoading = false;
        },
        setJSessionId: (state, action) => {
            const { x_jsessionid } = action.payload;
            state.jsessionId = x_jsessionid;
        },
        setDataQuestion: (state, action) => {
            const { data } = action.payload;
            const { id, multi_answer } = data;
            state.dataQuestion = data;
            state.idQuestion = id;
            state.multiAnswer = multi_answer;
            state.isLoading = false;
        },
        setQuestionIsOver: (state, action) => {
            const { ticket_over } = action.payload;
            state.questionIsOver = ticket_over;
        },
        setStatisticsComplitedTest: (state, action) => {
            const { data } = action.payload;
            state.statisticComplitedTest = data;
        },
        setMistakeFromTest: (state, action) => {
            const { data } = action.payload;
            const { comment, is_answer } = data
            state.mistakeFromTestComment = comment;
            state.isMistakeAnswer = !is_answer;
        },
        resetMistakeFromTest: (state) => {
            state.mistakeFromTestComment = '';
            state.isMistakeAnswer = false;
        },
    },
})

const { reducer: questionReducer, actions } = userSlice;
const {
    setIsLoading,
    resetIsLoading,
    setJSessionId,
    setDataQuestion,
    setQuestionIsOver,
    setStatisticsComplitedTest,
    setMistakeFromTest,
    resetMistakeFromTest,
} = actions;

export const getInitJSessionId = () =>
    async (dispatch) => {
        dispatch(setIsLoading());
        try {
            const { data } = await httpService.get(`/exam/jsessionid`)
            const { x_jsessionid } = data;
            localStorageService.setSessionQuestionId(x_jsessionid);
            dispatch(setJSessionId(data))
        } catch (error) {
            alert(error);
        }
    }

export const loadingStatisticPassedTest =
    ({ payload }) =>
        async (dispatch) => {
            const { jsessionId } = payload;
            if (jsessionId) {
                try {
                    const { data } = await httpService.get(`exam/statistics;jsessionid=${jsessionId}`);
                    dispatch(setStatisticsComplitedTest({ data }))
                } catch (error) {
                    console.log(error)
                }

            }
        }

/////////////////////////////////////////////////////////////////////
///////////////////Для экзаменов/////////////////////////////////////
/////////////////////////////////////////////////////////////////////

export const loadingDataQuestion =
    ({ payload }) =>
        async (dispatch) => {
            dispatch(setIsLoading());
            const { jsessionId, } = payload;
            try {
                const { data, headers } =
                    await httpService.get(`/exam/ticket;jsessionid=${jsessionId}`)
                const responseJSessionId = headers['x-jsessionid'];
                const { ticket_over } = data
                dispatch(setQuestionIsOver({ ticket_over }))
                if (jsessionId !== responseJSessionId) {
                    alert("Сессия устарела! Пройдите экзамен заново.");
                    await dispatch(getInitJSessionId());
                    localStorageService.setSessionQuestionId(responseJSessionId);
                    await dispatch(loadingDataQuestion({
                        payload: {
                            'jsessionId': responseJSessionId,
                        }
                    }));
                    dispatch(setJSessionId(responseJSessionId))
                }
                dispatch(setDataQuestion({ data }));
            } catch (error) {
                alert("Сессия устарела! Пройдите экзамен заново.");
                dispatch(getInitJSessionId());
                console.log(error);
            }
        }

export const sendAnswers =
    ({ payload }) =>
        async (dispatch) => {
            const { ticket_id, answers_id } = payload;
            let jsessionId = localStorageService.getSessionQuestionId();

            try {
                await httpService.post(`exam/ticket/result;jsessionid=${jsessionId}`,
                    {
                        ticket_id,
                        answers_id,
                    });
                dispatch(setIsLoading());
                await dispatch(loadingDataQuestion({
                    payload: {
                        jsessionId,

                    },
                }))
                dispatch(resetIsLoading());
            } catch (error) {
                alert("Сессия устарела! Пройдите экзамен заново.");
                await dispatch(getInitJSessionId());
                jsessionId = localStorageService.getSessionQuestionId();
                await dispatch(loadingDataQuestion({
                    payload: {
                        jsessionId,
                    }
                }));
                console.log(error)
            }
        }

///////////////////////////////////////////////////////////////////////////

////////////////////////////////////////////////////
///////// Для тестов по темам //////////////////////
////////////////////////////////////////////////////


export const loadingDataQuestionFromTest =
    ({ payload }) =>
        async (dispatch) => {
            dispatch(setIsLoading());
            const { jsessionId, idTheme } = payload;
            dispatch(resetMistakeFromTest());
            try {
                const { data, headers } =
                    await httpService.get(`/exam/ticket${idTheme};jsessionid=${jsessionId}`)
                const responseJSessionId = headers['x-jsessionid'];
                const { ticket_over } = data
                dispatch(setQuestionIsOver({ ticket_over }))
                if (jsessionId !== responseJSessionId) {
                    alert("Сессия устарела! Пройдите экзамен заново.");
                    await dispatch(getInitJSessionId());
                    localStorageService.setSessionQuestionId(responseJSessionId);
                    await dispatch(loadingDataQuestionFromTest({
                        payload: {
                            'jsessionId': responseJSessionId,
                        }
                    }));
                    dispatch(setJSessionId(responseJSessionId))
                }
                dispatch(setDataQuestion({ data }));
            } catch (error) {
                alert("Сессия устарела! Пройдите экзамен заново.");
                dispatch(getInitJSessionId());
                console.log(error);
            }
        }

export const sendAnswersFromTest =
    ({ payload }) =>
        async (dispatch) => {
            const { ticket_id, answers_id, idTheme } = payload;
            let jsessionId = localStorageService.getSessionQuestionId();

            try {
                const { data } =
                    await httpService.post(`exam/ticket/result;jsessionid=${jsessionId}`,
                        {
                            ticket_id,
                            answers_id,
                        });
                const { is_answer } = data;

                if (is_answer) {
                    dispatch(setIsLoading());
                    console.log('dfsd')
                    await dispatch(loadingDataQuestionFromTest({
                        payload: {
                            jsessionId,
                            idTheme,
                        },
                    }))
                    dispatch(resetIsLoading());
                } else {
                    dispatch(setMistakeFromTest({ data }))
                }

            } catch (error) {
                alert("Сессия устарела! Пройдите экзамен заново.");
                await dispatch(getInitJSessionId());
                jsessionId = localStorageService.getSessionQuestionId();
                await dispatch(loadingDataQuestionFromTest({
                    payload: {
                        jsessionId,
                        idTheme,
                    }
                }));
                console.log(error)
            }
        }

/////////////////////////////////////////////////////////////////////////////

export const getJsessionId = () => (state) => state.question.jsessionId;
export const getDataQuestion = () => (state) => state.question.dataQuestion;
export const getStatusLoadigQuestion = () => (state) => state.question.isLoading;
export const getIdQuestion = () => (state) => state.question.idQuestion;
export const getMultiAnswer = () => (state) => state.question.multiAnswer;
export const getQuestionIsOver = () => (state) => state.question.questionIsOver;
export const getStatisticsComplitedTest = () => (state) => state.question.statisticComplitedTest;
export const getCommentMistake = () => (state) => state.question.mistakeFromTestComment;
export const getStatusMistakeAnswer = () => (state) => state.question.isMistakeAnswer;


export default questionReducer;