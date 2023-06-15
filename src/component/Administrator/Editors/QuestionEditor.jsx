import { Box, Button, Checkbox, FormControl, FormControlLabel, Grid, IconButton, Input, Typography } from "@mui/material";
import QuestionTextEditor from "../../TextEditor/EditorQuestion/QuestionTextEditor";
import { useEffect, useState } from "react";
import utilsArray from "../../../utils/utilsArray";
import utilsString from "../../../utils/utilsString";
import { Add, Delete, Mode } from "@mui/icons-material";
import DeleteModal from "../../Modal/DeleteModal";

export default function QuestionEditor() {
    const [answers, setAnswers] = useState([]);
    const [newAnswer, setNewAnswers] = useState("");
    const [changeAnswer, setChangeAnswer] = useState({});
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    const addTextField = () => {
        if (!utilsString.isEmptyString(newAnswer)) {
            setAnswers([...answers, { textAnswer: newAnswer, correctAnswer: false }]);
            setNewAnswers("");
        }
    }

    const deleteTextField = (deleteIndex) => {
        const newAnswers = answers.filter(({ textAnswer }, index) => index !== deleteIndex);
        setAnswers(newAnswers);
    }

    const hundleChangeNewAnswer = (event) => {
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
                    answers.map((answer, index) => {
                        const { textAnswer, correctAnswer } = answer;
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
                                    {textAnswer}
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
        <Box>
            <QuestionTextEditor />
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
                        onChange={hundleChangeNewAnswer}
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
    )
}