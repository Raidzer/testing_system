import { ArrowBack } from "@mui/icons-material";
import { IconButton, Tooltip } from "@mui/material";
import { useNavigate } from "react-router";
import localStorageService from "../../service/localStorage.service";

export default function ButtonGoBack() {
    const navigate = useNavigate();

    const hundleClickBack = () => {
        navigate(-1);
        localStorageService.removeSessionQuestionId();
    }

    return (
        <Tooltip title={`Назад`}>
            <IconButton onClick={hundleClickBack}>
                <ArrowBack />
            </IconButton>
        </Tooltip>
    )
}