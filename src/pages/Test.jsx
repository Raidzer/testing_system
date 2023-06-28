import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import localStorageService from "../service/localStorage.service";
import QuestionLoader from "../component/Questionloader";
import { getDataQuestion, getInitJSessionId, getQuestionIsOver, loadingDataQuestion, loadingDataQuestionFromTest } from "../store/question";
import ComplitedTest from "../component/question/ComplitedTest";
import FormAnswers from "../component/question/FormAnswers";
import { useEffect } from "react";
import ButtonGoBack from "../component/Button/ButtonGoBack";

function Test() {
    const dispatch = useDispatch();
    const testIsComplited = useSelector(getQuestionIsOver());
    const dataTest = useSelector(getDataQuestion());
    const { quest } = dataTest;
    const { idTheme } = useParams();

    useEffect(() => {
        let jsessionId = localStorageService.getSessionQuestionId();

        const getData = async () => {
            if (!jsessionId) {
                await dispatch(getInitJSessionId());
            }
            jsessionId = localStorageService.getSessionQuestionId();
            if (idTheme) {
                await dispatch(loadingDataQuestionFromTest(
                    {
                        payload: {
                            jsessionId,
                            'idTheme': `/${idTheme}`,
                        }
                    }
                ))
            } else {
                await dispatch(loadingDataQuestion(
                    {
                        payload: {
                            jsessionId,
                        }
                    }
                ))
            }
        }
        getData();
    }, [])

    return (
        <div>
            <div>
                <ButtonGoBack />
            </div>
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}>
                <Box sx={{
                    width: 900,
                    minHeight: 550,
                    height: '100%',
                    backgroundColor: 'silver',
                    paddingLeft: 3,
                    paddingRight: 3,
                    borderRadius: 10,
                    position: 'relative',
                }}>
                    <QuestionLoader>
                        {testIsComplited ?
                            <>
                                <ComplitedTest />
                            </>
                            :
                            <>
                                <h1 style={{
                                    textAlign: 'center'
                                }}>Вопрос теста по теме:</h1>
                                <h4 style={{
                                    minHeight: 100,
                                    height: '100%',
                                }}
                                    dangerouslySetInnerHTML={{ __html: quest }
                                    }
                                ></h4>
                                <FormAnswers />
                            </>
                        }
                    </QuestionLoader>
                </Box>
            </div>
        </div>

    )
}

export default Test;