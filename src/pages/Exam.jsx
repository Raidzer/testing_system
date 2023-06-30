import { Box } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadingDataQuestion, getInitJSessionId, getDataQuestion, getQuestionIsOver } from "../store/question";
import localStorageService from "../service/localStorage.service";
import QuestionLoader from "../component/Questionloader";
import FormAnswers from "../component/question/FormAnswers";
import ComplitedTest from "../component/question/ComplitedTest";
import ButtonGoBack from "../component/Button/ButtonGoBack";



function Exam() {
    const dispatch = useDispatch();
    const dataTest = useSelector(getDataQuestion());
    const { question } = dataTest;
    const testIsComplited = useSelector(getQuestionIsOver());

    useEffect(() => {
        let jsessionId = localStorageService.getSessionQuestionId();

        const getData = async () => {
            if (!jsessionId) {
                await dispatch(getInitJSessionId());
            }
            jsessionId = localStorageService.getSessionQuestionId();
            await dispatch(loadingDataQuestion(
                {
                    payload: {
                        jsessionId,
                    }
                }
            ))
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
                                }}>Вопрос экзамена:</h1>
                                <h4 style={{
                                    minHeight: 100,
                                    height: '100%',
                                }}
                                    dangerouslySetInnerHTML={{ __html: question }}
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

export default Exam;