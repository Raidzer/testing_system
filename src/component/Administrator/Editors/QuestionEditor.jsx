import { Box, Button, Checkbox, Grid, IconButton, Input, Typography } from "@mui/material";
import QuestionTextEditor from "../../TextEditor/EditorQuestion/QuestionTextEditor";
import { useEffect, useState } from "react";
import utilsString from "../../../utils/utilsString";
import { Add, Delete, Mode } from "@mui/icons-material";
import DeleteModal from "../../Modal/DeleteModal";
import { useParams } from "react-router";
import { getDataQuestion } from "../../../service/data.service";
import { IsLoading } from "../../IsLoading";

export default function QuestionEditor() {
    const [answers, setAnswers] = useState([]);
    const [newAnswer, setNewAnswers] = useState("");
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const { idQuestion, idTheme } = useParams();
    const [dataQuestion, setDataQuestion] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetchDataQuestion();
    }, [])

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    useEffect(() => {
        const dataAnswers = dataQuestion.answers;
        if (dataAnswers) {
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

    const deleteTextField = (deleteIndex) => {
        const newAnswers = answers.filter(({ answer }, index) => index !== deleteIndex);
        setAnswers(newAnswers);
    }

    const hundleAddNewAnswer = (event) => {
        const value = event.target.value;
        setNewAnswers(value);
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            addTextField();
        }
    };

    const hundleCheckCorrectAnswer = (index) => {
        const updateAnswers = [...answers];
        updateAnswers[index].correctAnswer = !updateAnswers[index].correctAnswer;
        setAnswers(updateAnswers);
    }

    const hundleClickOpenDeleteModal = () => {
        setOpenDeleteModal(true)
    }

    const hundleClickCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    }

    const test = () => {
        console.log(answers);
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
                                <Typography
                                    variant="body1"
                                >
                                    {answer}
                                </Typography>
                                <Box
                                    sx={{
                                        display: 'flex'
                                    }}
                                >
                                    <IconButton
                                        title="Изменить"
                                    >
                                        <Mode />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => hundleClickOpenDeleteModal()}
                                        title="Удалить"
                                    >
                                        <Delete />
                                    </IconButton>
                                    <DeleteModal
                                        open={openDeleteModal}
                                        hundleClickCloseDeleteModal={hundleClickCloseDeleteModal}
                                        confirmDelete={() => deleteTextField(index)}
                                        titleText='Вы уверены что хотите удалить выбранный ответ?'
                                    />
                                </Box>
                            </Box>
                        )
                    })
                }
            </Grid >
        )
    }

    return (
        <>
            {isLoading ? <IsLoading /> :
                <Box>
                    <QuestionTextEditor
                        answers={answers}
                        initData={dataQuestion.quest}
                        dataQuestion={dataQuestion}
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
                        <Box>
                            <Button onClick={test}>Узнать ответы</Button>
                        </Box>
                    </Box>
                </Box>
            }
        </>

    )
}