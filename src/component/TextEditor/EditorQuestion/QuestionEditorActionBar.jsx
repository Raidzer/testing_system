import styled from "@emotion/styled";
import { Save } from "@mui/icons-material";
import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useState } from "react";
import ButtonGoBack from "../../Button/ButtonGoBack";
import { useTranslation } from "react-i18next";
import { updateArticle } from "../../../service/admin.service";

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
    } = props;
    const [dataIsLoading, setDataIsLoading] = useState(false)
    const { t } = useTranslation();

    const handleClickSave = async () => {
        console.log(answers)
        /*
        setDataIsLoading(true)
        await updateArticle({ id, title, idTheme, description })
        setTimeout(() => {
            setDataIsLoading(false)
        }, 3000);
*/
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