import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import localStorageService from "../../service/localStorage.service";
import { useDispatch, useSelector } from "react-redux";
import {
    getQuestionIsOver,
    getStatisticsComplitedTest,
    loadingStatisticPassedTest,
} from "../../store/question";
import { useEffect } from "react";
import { containerStyle, nextQuestionButton, textCenter } from "./styles";

export default function ComplitedTest() {
    const dispatch = useDispatch();
    const testIsComplited = useSelector(getQuestionIsOver());
    const jsessionId = localStorageService.getSessionQuestionId();
    const statisticComplitedTest = useSelector(getStatisticsComplitedTest());
    const { count_ticket, count_correct_ticket } = statisticComplitedTest;

    const hundleClick = () => {
        localStorageService.removeSessionQuestionId();
    }

    useEffect(() => {
        dispatch(loadingStatisticPassedTest({
            payload: {
                jsessionId,
            }
        }))
    }, [testIsComplited, dispatch, jsessionId])


    const resultTest = () => {
        const { count_ticket, count_correct_ticket } = statisticComplitedTest;

        switch (count_ticket - count_correct_ticket) {
            case 0:
                return (
                    <>
                        <h3 style={textCenter}>
                            Все правильно молодец!
                        </h3>
                    </>
                )
            case 1:
                return (
                    <>
                        <h3 style={textCenter}>
                            Всего один неправильный ответ, неплохо!
                        </h3>
                    </>
                )
            case 2:
                return (
                    <>
                        <h3 style={textCenter}>
                            2 ошибки! Нужно стараться лучше!
                        </h3>
                    </>
                )
            default:
                return (
                    <>
                        <h1 style={textCenter}>
                            Ебаный творог иди учи теорию!
                        </h1>
                    </>
                )
        }
    }

    return (
        <div style={containerStyle}>
            <h1 style={textCenter}>
                Экзамен завершен!
            </h1>
            <h4 style={textCenter}>
                Вы ответили правильно на {count_correct_ticket} из {count_ticket} вопросов
            </h4>
            {resultTest()}
            <div style={nextQuestionButton}>
                <Link to="/">
                    <Button onClick={hundleClick}>На главную</Button>
                </Link>
            </div>
        </div>
    )
}