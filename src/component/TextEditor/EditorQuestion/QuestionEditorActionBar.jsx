import styled from "@emotion/styled";
import { Alarm, Save } from "@mui/icons-material";
import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useState } from "react";
import ButtonGoBack from "../../Button/ButtonGoBack";
import { useTranslation } from "react-i18next";
import { updateArticle, updateQuestion, updateQuestionTest } from "../../../service/admin.service";
import utilsArray from "../../../utils/utilsArray";

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[500],
    '&:hover': {
        backgroundColor: grey[700],
    },
}));

export default function QuestionEditorActionBar(props) {
    const {
        id,
        title,
        idTheme,
        description,
        disable,
        answers,
        quest,
        idQuestion,
        dataQuestion,
        comment,
    } = props;
    const [dataIsLoading, setDataIsLoading] = useState(false)
    const { t } = useTranslation();

    const handleClickSave = async () => {
        setDataIsLoading(true);
        utilsArray.isMultiAnswers(answers)
        let newDataQuestion = dataQuestion;
        newDataQuestion.quest = quest;
        newDataQuestion.answers = answers;
        newDataQuestion.multi_answer = utilsArray.isMultiAnswers(answers);
        newDataQuestion.comment = comment;

        if (!newDataQuestion.quest) {
            alert('Введите текст вопроса!')
        } else if (utilsArray.isEmpty(newDataQuestion.answers)) {
            alert('Добавьте хотя бы один ответ!')
        } else if (!utilsArray.haveTrueAnswer(newDataQuestion.answers)) {
            alert('Хотя бы один из ответов должен быть верным!')
        } else {
            await updateQuestion(newDataQuestion);
        }
        setDataIsLoading(false);
    }

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <h2 style={{ marginRight: 'auto' }}>
                {t('administrator_panel.question.editor')}
            </h2>
            <ButtonGoBack />
            <ColorButton
                startIcon={<Save />}
                disabled={dataIsLoading || disable}
                onClick={handleClickSave}
            >
                {t('save')}
            </ColorButton>
        </Box>
    )
}