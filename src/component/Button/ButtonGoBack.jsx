import { ArrowBack } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router";
import localStorageService from "../../service/localStorage.service";
import { useTranslation } from "react-i18next";

export default function ButtonGoBack() {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const hundleClickBack = () => {
        navigate(-1);
        localStorageService.removeSessionQuestionId();
    }

    return (
        <Tooltip title={t("back")}>
            <IconButton onClick={hundleClickBack}>
                <ArrowBack />
            </IconButton>
        </Tooltip>
    )
}