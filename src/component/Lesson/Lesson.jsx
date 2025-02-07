import { useDispatch, useSelector } from "react-redux";
import {
  getDataArticle,
  getDataLesson,
  resetDataDiscription,
} from "../../store/lesson";
import "./style.css";
import { Box } from "@mui/material";
import Welcome from "../Welcome";
import { useEffect } from "react";
import { useParams } from "react-router";
import { IsLoading } from "../IsLoading";

export default function Lesson() {
  const { description } = useSelector(getDataLesson());
  const { idTheme } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(
      getDataArticle({
        payload: {
          id: idTheme,
        },
      })
    );
  }, [idTheme]);

  useEffect(() => {
    return () => dispatch(resetDataDiscription());
  }, []);

  return (
    <>
      {description ? (
        <Box
          className="lessonDiv"
          dangerouslySetInnerHTML={{ __html: description }}
        />
      ) : (
        <IsLoading />
      )}
    </>
  );
}
