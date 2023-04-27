import { Button } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { loadingDataQuestion, getInitJSessionId, getDataQuestion, getQuestionIsOver } from "../store/question";
import localStorageService from "../service/localStorage.service";
import QuestionLoader from "../component/Questionloader";
import FormAnswers from "../component/question/FormAnswers";
import ComplitedTest from "../component/question/ComplitedTest";


function FinalTest() {
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
                    <Button onClick={hundleClick}>На главную</Button>
                </Link>
            </div>
            <div>
                <QuestionLoader>
                    {testIsComplited ?
                        <>
                            <ComplitedTest />
                        </>
                        :
                        <>
                            <h1>Вопрос теста:</h1>
                            <h5>{quest}</h5>
                            <FormAnswers />
                        </>
                    }
                </QuestionLoader>
            </div>
        </div>

    )
}

export default FinalTest;