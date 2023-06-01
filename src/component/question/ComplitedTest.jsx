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
import { useTranslation } from "react-i18next";

export default function ComplitedTest() {
    const dispatch = useDispatch();
    const testIsComplited = useSelector(getQuestionIsOver());
    const jsessionId = localStorageService.getSessionQuestionId();
    const statisticComplitedTest = useSelector(getStatisticsComplitedTest());
    const { count_ticket, count_correct_ticket } = statisticComplitedTest;
    const { t } = useTranslation();

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
                            {t('exam_panel.statistic_exam.all_correct')}
                        </h3>
                    </>
                )
            case 1:
                return (
                    <>
                        <h3 style={textCenter}>
                            {t('exam_panel.statistic_exam.one_uncorrect')} </h3>
                    </>
                )
            case 2:
                return (
                    <>
                        <h3 style={textCenter}>
                            {t('exam_panel.statistic_exam.two_uncorrect')} </h3>
                    </>
                )
            default:
                return (
                    <>
                        <h1 style={textCenter}>
                            {t('exam_panel.statistic_exam.three_uncorrect')} </h1>
                    </>
                )
        }
    }

    return (
        <div style={containerStyle}>
            <h1 style={textCenter}>
                {t('exam_panel.exam_finish')} </h1>
            <h4 style={textCenter}>
                {t('exam_panel.exam_finish_statistic', { count_correct_ticket, count_ticket })}
            </h4>
            {resultTest()}
            <div style={nextQuestionButton}>
                <Link to="/">
                    <Button onClick={hundleClick}>{t('not_found.link_text')}</Button>
                </Link>
            </div>
        </div>
    )
}