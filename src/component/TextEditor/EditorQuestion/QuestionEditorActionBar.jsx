import styled from "@emotion/styled";
import { Save } from "@mui/icons-material";
import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import ButtonGoBack from "../../Button/ButtonGoBack";
import { useTranslation } from "react-i18next";
import { updateQuestion } from "../../../service/admin.service";
import utilsArray from "../../../utils/utilsArray";
import ErrorModal from "../../Modal/ErrorModal";
import { useFetcher } from "react-router-dom";

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[500],
    '&:hover': {
        backgroundColor: grey[700],
    },
}));

export default function QuestionEditorActionBar(props) {
    const {
        disable,
        answers,
        question,
        dataQuestion,
        comment,
        reloadAnswer,
        changeIndex,
        title,
    } = props;
    const [dataIsLoading, setDataIsLoading] = useState(false);
    const [textError, setTextError] = useState('');
    const [loadDataError, setLoadDataError] = useState(false);
    const [disableLoad, setDisableLoad] = useState(true);
    const { t } = useTranslation();

    useEffect(() => {
        setDisableLoad(utilsArray.isEqual(answers, dataQuestion.answers))
    }, [answers, dataQuestion])

    useEffect(() => {
        console.log(changeIndex)
    }, [changeIndex])

    const resetUploadDataError = () => {
        setTextError('');
        setLoadDataError(false);
    }

    const handleClickSave = async () => {
        setDataIsLoading(true);
        utilsArray.isMultiAnswers(answers)
        let newDataQuestion = dataQuestion;
        newDataQuestion.question = question;
        newDataQuestion.answers = answers;
        newDataQuestion.multi_answer = utilsArray.isMultiAnswers(answers);
        newDataQuestion.comment = comment;

        if (!newDataQuestion.question) {
            setTextError('Введите текст вопроса!');
            setLoadDataError(true);
        } else if (utilsArray.isEmpty(newDataQuestion.answers)) {
            setTextError('Добавьте хотя бы один ответ!');
            setLoadDataError(true);
        } else if (!utilsArray.haveTrueAnswer(newDataQuestion.answers)) {
            setTextError('Хотя бы один из ответов должен быть верным!');
            setLoadDataError(true);
        } else {
            await updateQuestion(newDataQuestion);
            reloadAnswer();
            resetUploadDataError();
        }
        setTimeout(() => {
            setDataIsLoading(false);
        }, 2000)
    }

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <h2 style={{ marginRight: 'auto' }}>
                {`${t('administrator_panel.question.editor')} ${title}`}
            </h2>
            <ButtonGoBack />
            <ColorButton
                startIcon={<Save />}
                disabled={dataIsLoading || (disable && disableLoad) || changeIndex !== null}
                onClick={handleClickSave}
            >
                {t('save')}
            </ColorButton>
            <ErrorModal
                hundleClickCloseErrorModal={resetUploadDataError}
                titleText={textError}
                open={loadDataError}
            />
        </Box>
    )
}