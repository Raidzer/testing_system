import { useDispatch, useSelector } from "react-redux";
import { getDataArticle, getDataLesson } from "../../store/lesson";
import "./style.css";
import { Box } from "@mui/material";
import Welcome from "../Welcome";
import { useEffect } from "react";
import { useParams } from "react-router";


export default function Lesson() {
    const { description } = useSelector(getDataLesson());
    const { idTheme } = useParams();
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getDataArticle({
            payload: {
                id: idTheme,
            }
        }));
    }, [idTheme])

    return (
        <>
            {
                description ?
                    <Box
                        className="lessonDiv"
                        dangerouslySetInnerHTML={{ __html: description }}
                    /> :
                    <Welcome />
            }
        </>
    )
}