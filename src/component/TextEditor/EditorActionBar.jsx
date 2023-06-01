import styled from "@emotion/styled";
import { Save } from "@mui/icons-material";
import { Button } from "@mui/material";
import { grey } from "@mui/material/colors";
import { Box } from "@mui/system";
import { useState } from "react";
import { updateArticle } from "../../service/admin.service";
import ButtonGoBack from "../Button/ButtonGoBack";
import { useTranslation } from "react-i18next";

const ColorButton = styled(Button)(({ theme }) => ({
    color: theme.palette.getContrastText(grey[500]),
    backgroundColor: grey[500],
    '&:hover': {
        backgroundColor: grey[700],
    },
}));

export default function EditorActionBar(props) {
    const {
        id,
        title,
        idTheme,
        description,
        disable,
    } = props;
    const [dataIsLoading, setDataIsLoading] = useState(false)
    const { t } = useTranslation();

    const handleClickSave = async () => {
        setDataIsLoading(true)
        await updateArticle({ id, title, idTheme, description })
        setTimeout(() => {
            setDataIsLoading(false)
        }, 3000);

    }

    return (
        <Box display="flex" alignItems="center" justifyContent="space-between">
            <h2 style={{ marginRight: 'auto' }}>
                {t('administrator_panel.article.editor_actions')}
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