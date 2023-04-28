import { Box, IconButton } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadingDataQuestion, getInitJSessionId, getDataQuestion, getQuestionIsOver } from "../store/question";
import localStorageService from "../service/localStorage.service";
import QuestionLoader from "../component/Questionloader";
import FormAnswers from "../component/question/FormAnswers";
import ComplitedTest from "../component/question/ComplitedTest";
import { Home } from "@mui/icons-material";


function Exam() {
    const dispatch = useDispatch();
    const dataTest = useSelector(getDataQuestion());
    const { quest } = dataTest;
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

    const hundleClick = () => {
        localStorageService.removeSessionQuestionId();

    }

    return (
        <div>
            <div>
                <Link to="/">
                    <IconButton onClick={hundleClick}>
                        <Home fontSize="large"/>
                    </IconButton>
                </Link>
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
                                    textAlign:'center'
                                }}>Вопрос экзамена:</h1>
                                <h4 style={{
                                    minHeight: 100,
                                    height: '100%',
                                }}>{quest}</h4>
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