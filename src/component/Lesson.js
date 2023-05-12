import { useSelector } from "react-redux";
import { getDataLesson } from "../store/lesson";

export const Lesson = () => {
    const dataLesson = useSelector(getDataLesson());
    const { description } = dataLesson;

    return (
        <>
            {
                description ?
                    <div dangerouslySetInnerHTML={{ __html: description }
                    } /> :
                    <div>Добро пожаловать в систему обучения персонала эксплуатации АСУ ИС!</div>
            }
        </>
    )
}