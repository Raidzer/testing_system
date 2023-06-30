/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Checkbox, Grid, IconButton, Input, Typography } from "@mui/material";
import QuestionTextEditor from "../../TextEditor/EditorQuestion/QuestionTextEditor";
import { useEffect, useState } from "react";
import utilsString from "../../../utils/utilsString";
import { Add, Check, Close, Delete, Mode } from "@mui/icons-material";
import DeleteModal from "../../Modal/DeleteModal";
import { useParams } from "react-router";
import { getDataQuestion } from "../../../service/data.service";
import { IsLoading } from "../../IsLoading";
import { presESC, presEnter } from "../../../utils/pressButton";
import utilsObject from "../../../utils/utilsObject";

export default function QuestionEditor() {
    const [answers, setAnswers] = useState([]);
    const [newAnswer, setNewAnswers] = useState("");
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const { idQuestion } = useParams();
    const [dataQuestion, setDataQuestion] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [changeIndex, setChangeIndex] = useState(null);
    const [changeTextAnswer, setChangeTextAnswer] = useState("")

    useEffect(() => {
        fetchDataQuestion();
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        if (dataQuestion.answers) {
            const dataAnswers = utilsObject.deepClone(dataQuestion.answers)
            setAnswers(dataAnswers);
        }
    }, [dataQuestion])

    const fetchDataQuestion = async () => {
        const data = await getDataQuestion({ idQuestion })
        setDataQuestion(data);
    }

    const addTextField = () => {
        if (!utilsString.isEmptyString(newAnswer)) {
            setAnswers([...answers, { answer: newAnswer, correctAnswer: false }]);
            setNewAnswers("");
        }
    }

    const deleteTextField = () => {
        const newAnswers = answers.filter((answer, index) => {
            if (index !== deleteIndex) {
                return answer;
            }
            return null;
        });
        setAnswers(newAnswers);
    }

    const hundleAddNewAnswer = (event) => {
        const value = event.target.value;
        setNewAnswers(value);
    }

    const handleKeyDown = (event) => {
        if (presEnter(event)) {
            addTextField();
        }
    };

    const hundleCheckCorrectAnswer = (index) => {
        const updateAnswers = [...answers];
        updateAnswers[index].correctAnswer = !updateAnswers[index].correctAnswer;
        setAnswers(updateAnswers);
    }

    const hundleClickOpenDeleteModal = (event, index) => {
        event.currentTarget.blur();
        setOpenDeleteModal(true);
        setDeleteIndex(index)
    }

    const hundleClickCloseDeleteModal = () => {
        setOpenDeleteModal(false);
        setDeleteIndex(null);
    }

    const hundleClickChangeAnswer = (index, answer) => {
        setChangeTextAnswer(answer);
        setChangeIndex(index);
    }

    const hundleChangeAnswer = (event) => {
        const value = event.target.value;
        setChangeTextAnswer(value);
    }

    const hundleClickConfirmChangeAnswer = (index) => {
        if (utilsString.isEmptyString(changeTextAnswer)) {
            return null;
        }
        const updateAnswers = [...answers];
        updateAnswers[index].answer = changeTextAnswer;
        setAnswers(updateAnswers);
        setChangeIndex(null);
        setChangeTextAnswer(null);
    }

    const hundleClickDiscardChangeAnswer = () => {
        setChangeIndex(null);
        setChangeTextAnswer(null);
    }

    const hundleKeyDownConfirmChangeAnswer = (event, index) => {
        if (presEnter(event)) {
            hundleClickConfirmChangeAnswer(index)
        } if (presESC(event)) {
            hundleClickDiscardChangeAnswer();
        }
    }

    const arrayAnswers = () => {
        return (
            <Grid item xs={6}>
                {
                    answers.map((item, index) => {
                        const { answer, correctAnswer } = item;
                        return (
                            <Box
                                key={index}
                                sx={{
                                    width: "1000px",
                                    display: "flex",
                                    justifyContent: "space-between",
                                    borderBottom: '1px solid grey',
                                    marginBottom: '25px',
                                }}
                            >
                                <Checkbox
                                    checked={correctAnswer}
                                    onClick={() => hundleCheckCorrectAnswer(index)}
                                    title="Верный ответ"
                                />
                                {changeIndex === index ?
                                    <Input
                                        autoFocus
                                        value={changeTextAnswer}
                                        onChange={hundleChangeAnswer}
                                        onKeyDown={(event) => hundleKeyDownConfirmChangeAnswer(event, index)}
                                        sx={{ width: '100%' }}
                                    />
                                    :
                                    <Typography
                                        variant="body1"
                                    >
                                        {answer}
                                    </Typography>
                                }
                                <Box
                                    sx={{
                                        display: 'flex'
                                    }}
                                >
                                    {changeIndex === index ?
                                        <IconButton
                                            title="Подтвердить"
                                            onClick={
                                                () => {
                                                    hundleClickConfirmChangeAnswer(index);
                                                }
                                            }
                                        >
                                            <Check />
                                        </IconButton>
                                        :
                                        <IconButton
                                            title="Изменить"
                                            onClick={
                                                () => {
                                                    hundleClickChangeAnswer(index, answer);
                                                }
                                            }
                                        >
                                            <Mode />
                                        </IconButton>
                                    }
                                    {changeIndex === index ?
                                        <IconButton
                                            onClick={hundleClickDiscardChangeAnswer}
                                            title="Отменить"
                                        >
                                            <Close />
                                        </IconButton>
                                        :
                                        <IconButton
                                            onClick={
                                                (event) =>
                                                    hundleClickOpenDeleteModal(event, index)
                                            }
                                            title="Удалить"
                                        >
                                            <Delete />
                                        </IconButton>
                                    }
                                </Box>
                            </Box>
                        )
                    })
                }
                <DeleteModal
                    open={openDeleteModal}
                    hundleClickCloseDeleteModal={hundleClickCloseDeleteModal}
                    confirmDelete={() => deleteTextField()}
                    titleText='Вы уверены что хотите удалить выбранный ответ?'
                />
            </Grid >
        )
    }

    return (
        <>
            {isLoading ? <IsLoading /> :
                <Box>
                    <QuestionTextEditor
                        answers={answers}
                        initData={dataQuestion.question}
                        dataQuestion={dataQuestion}
                        initComment={dataQuestion.comment}
                        reloadAnswer={fetchDataQuestion}
                    />
                    <Box
                        sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                        }}
                    >
                        <Box>
                            <h3>Варианты ответов:</h3>
                        </Box>
                        <Box
                            sx={{
                                width: '100vh',
                                display: 'flex',
                                marginBottom: '25px',
                            }}
                        >
                            <Input
                                placeholder="Текст ответа"
                                value={newAnswer}
                                onChange={hundleAddNewAnswer}
                                onKeyDown={handleKeyDown}
                                sx={{ width: '100%' }}
                            />
                            <IconButton
                                onClick={addTextField}
                                title="Добавить ответ"
                            >
                                <Add />
                            </IconButton>
                        </Box>
                        <Box>
                            {arrayAnswers()}
                        </Box>
                    </Box>
                </Box>
            }
        </>

    )
}