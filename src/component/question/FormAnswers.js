import { Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getDataQuestion, getIdQuestion, getMultiAnswer, getQuestionIsOver, sendAnswers } from "../../store/question";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import localStorageService from "../../service/localStorage.service";
import httpService from "../../service/http.service";


export default function FormAnswers() {
    const { answers, id } = useSelector(getDataQuestion());
    const mutliAnswer = useSelector(getMultiAnswer());
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [disableSendForm, setDisableSendForm] = useState(true);
    const dispatch = useDispatch();
    const questionIsOver = useSelector(getQuestionIsOver());

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
        await dispatch(sendAnswers({
            payload: {
                'ticket_id': id,
                'answers_id': selectedAnswers,
            },
        }))
    }

    const hundleClick = () => {
        localStorageService.removeSessionQuestionId();
    }

    const answersForm = () => {
        return (
            <>
                {answers.map((answer) => (
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
                <Button onClick={handleSubmit} disabled={disableSendForm}>Отправить ответ</Button>
            </>
        )
    }

    return (
        <FormGroup id={id}>
            {questionIsOver ?
                <Link to="/">
                    <Button onClick={hundleClick}>Перейти на главную</Button>
                </Link>
                : answersForm()
            }
        </FormGroup>
    );
}