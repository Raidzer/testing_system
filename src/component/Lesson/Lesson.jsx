import { useSelector } from "react-redux";
import { getDataLesson } from "../../store/lesson";
import "./style.css";
import { Box } from "@mui/material";
import { useTranslation } from 'react-i18next';


export default function Lesson() {
    const { description } = useSelector(getDataLesson());
    const { t } = useTranslation();

    return (
        <>
            {
                description ?
                    <Box
                        className="lessonDiv"
                        dangerouslySetInnerHTML={{ __html: description }
                        }
                    /> :
                    <div>
                        {t("welcome")}
                    </div>
            }
        </>
    )
}