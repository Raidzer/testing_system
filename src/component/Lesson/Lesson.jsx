import { useSelector } from "react-redux";
import { getDataLesson } from "../../store/lesson";
import "./Lesson.css";
import { Box } from "@mui/material";

export default function Lesson() {
    const { description } = useSelector(getDataLesson());

    return (
        <>
            {
                description ?
                    <Box className='lessonDiv' dangerouslySetInnerHTML={{ __html: description }
                    } /> :
                    <div>Добро пожаловать в систему обучения персонала эксплуатации АСУ ИС!</div>
            }
        </>
    )
}