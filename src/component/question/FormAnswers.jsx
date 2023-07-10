import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getDataQuestion, getMultiAnswer, getStatusMistakeAnswer, sendAnswers, sendAnswersFromTest } from "../../store/question";
import { useEffect, useState } from "react";
import { nextQuestionButton } from "./styles";
import { useParams } from "react-router";
import Comment from "./Comment";
import { useTranslation } from "react-i18next";


export default function FormAnswers() {
    const { answers, id } = useSelector(getDataQuestion());
    const mutliAnswer = useSelector(getMultiAnswer());
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [disableSendForm, setDisableSendForm] = useState(true);
    const dispatch = useDispatch();
    const { idTheme } = useParams();
    const isMistake = useSelector(getStatusMistakeAnswer());
    const { t } = useTranslation();
    useEffect(() => {
        setDisableSendForm(selectedAnswers.length === 0);
    }, [selectedAnswers])

    const handleCheck = (id) => {
        if (selectedAnswers.includes(id)) {
            setSelectedAnswers(
                selectedAnswers.filter(
                    (selectedId) => selectedId !== id)
            );
        } else {
            mutliAnswer ?
                setSelectedAnswers([...selectedAnswers, id]) : setSelectedAnswers([id]);
        }
    }

    const handleSubmit = async () => {
        if (idTheme) {
            await dispatch(sendAnswersFromTest({
                payload: {
                    'ticket_id': id,
                    'answers_id': selectedAnswers,
                    'idTheme': `/${idTheme}`,
                },
            }))
        } else {
            await dispatch(sendAnswers({
                payload: {
                    'ticket_id': id,
                    'answers_id': selectedAnswers,
                },
            }))
        }
    }

    const answersForm = () => {
        let shuffledAnswers = answers.map((answer) => ({ ...answer }));
        shuffledAnswers.sort(() => Math.random() - 0.5);
        return (
            <>
                {shuffledAnswers.map((answer) => (
                    <FormControlLabel
                        key={answer.id}
                        id={answer.id}
                        control={
                            <Checkbox
                                onClick={() => handleCheck(answer.id)}
                                checked={selectedAnswers.includes(answer.id)}
                            />
                        }
                        label={answer.answer}
                    />
                ))}
                {isMistake ? <Comment /> : null}
                <div style={nextQuestionButton}>
                    <Button
                        onClick={handleSubmit}
                        disabled={disableSendForm}
                    >
                        {t('exam_panel.send_answer')} </Button>
                </div>
            </>
        )
    }

    return (
        <FormGroup id={id}>
            {answersForm()}
        </FormGroup>
    );
}