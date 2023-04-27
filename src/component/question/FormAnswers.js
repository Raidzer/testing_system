import { Box, Button, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { getDataQuestion, getMultiAnswer, sendAnswers } from "../../store/question";
import { useEffect, useState } from "react";


export default function FormAnswers() {
    const { answers, id } = useSelector(getDataQuestion());
    const mutliAnswer = useSelector(getMultiAnswer());
    const [selectedAnswers, setSelectedAnswers] = useState([]);
    const [disableSendForm, setDisableSendForm] = useState(true);
    const dispatch = useDispatch();

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
                <div style={{
                    position: 'absolute',
                    bottom: 0,
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <Button
                        onClick={handleSubmit}
                        disabled={disableSendForm}
                    >
                        Следующий вопрос
                    </Button>
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