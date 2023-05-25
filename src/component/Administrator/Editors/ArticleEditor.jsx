import { useEffect} from "react";
import { useParams } from "react-router";
import { IsLoading } from "../../IsLoading";
import { useDispatch, useSelector } from "react-redux";
import { getDataArticle, getDataLesson, getStatusLoadingLesson } from "../../../store/lesson";
import TextEditor from "../../TextEditor/TextEditor";

function ArticleEditor() {
    const { idArticle } = useParams();
    let articleIsLoading = useSelector(getStatusLoadingLesson());
    const { description } = useSelector(getDataLesson());
    const dispatch = useDispatch();
    const { idTheme } = useParams();

    useEffect(() => {
        dispatch(getDataArticle({
            payload: {
                id: idArticle,
            }
        }))
    }, [])

    return (
        <div>
            {
                articleIsLoading ? <IsLoading /> :
                    <TextEditor
                        initData={description}
                        idTheme={idTheme}
                    />
            }
        </div>
    )
}

export default ArticleEditor;