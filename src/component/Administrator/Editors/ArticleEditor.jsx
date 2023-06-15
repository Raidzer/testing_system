import { useEffect} from "react";
import { useParams } from "react-router";
import { IsLoading } from "../../IsLoading";
import { useDispatch, useSelector } from "react-redux";
import { getDataArticle, getDataLesson, getStatusLoadingLesson } from "../../../store/lesson";
import TextEditor from "../../TextEditor/EditorArticles/TextEditor";

function ArticleEditor() {
    const { idArticle } = useParams();
    let articleIsLoading = useSelector(getStatusLoadingLesson());
    const { description, id, title } = useSelector(getDataLesson());
    const dispatch = useDispatch();

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
                        id={id}
                        title={title}
                    />
            }
        </div>
    )
}

export default ArticleEditor;