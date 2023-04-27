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
                        <h3>Все правильно молодец!</h3>
                    </>
                )
            case 1:
                return (
                    <>
                        <h3>Всего один неправильный ответ, неплохо!</h3>
                    </>
                )
            case 2:
                return (
                    <>
                        <h3>2 ошибки! Нужно стараться лучше!</h3>
                    </>
                )
            default:
                return (
                    <>
                        <h1>Ебаный творог иди учи теорию!</h1>
                    </>
                )
        }
    }


    return (
        <div>
            <h1>Вы прошли тест </h1>
            <h5>Вы ответили правильно на {count_correct_ticket} из {count_ticket} вопросов</h5>
            {resultTest()}
            <Link to="/">
                <Button onClick={hundleClick}>На главную</Button>
            </Link>
        </div>
    )
}