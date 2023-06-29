import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Box } from '@mui/material';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import {  useState } from 'react';
import uploadFileAdapterCKEditor from './adapterQuestionUpload';
import { useParams } from 'react-router';
import "./style.css";
import QuestionEditorActionBar from './QuestionEditorActionBar';


function QuestionTextEditor(props) {
    const {
        initData,
        id,
        title,
        answers,
        dataQuestion,
        initComment,
        reloadAnswer,
    } = props;
    const { idArticle, idTheme, idQuestion } = useParams()
    const [description, setDescription] = useState(initData);
    const [comment, setComment] = useState(initComment);

    function uploadImageAdapter(editor) {
        editor.plugins.get('FileRepository').createUploadAdapter = (loader) => {
            return new uploadFileAdapterCKEditor(
                loader,
                idTheme,
                idArticle,
                idQuestion
            );
        };
    }

    const editorConfiguration = {
        extraPlugins: [uploadImageAdapter],
        toolbar: {
            shouldNotGroupWhenFull: true,
        },
        image: {
            upload: {
                types: ['png', 'gif', 'jpeg']
            }
        }
    }

    return (
        <>
            <Box
                sx={{
                    width: '100%',
                    minHeight: '500px',
                    minWidth: '100%',
                    resize: 'none',
                }}>
                <QuestionEditorActionBar
                    id={id}
                    title={title}
                    idTheme={idTheme}
                    description={description}
                    answers={answers}
                    question={description}
                    dataQuestion={dataQuestion}
                    comment={comment}
                    reloadAnswer={reloadAnswer}
                />
                <h1>Вопрос:</h1>
                <CKEditor
                    editor={Editor}
                    config={editorConfiguration}
                    data={initData}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setDescription(data)
                    }}
                    uploadComplete={() => console.log('загрузка завершена')}
                />
                <h1>Подсказка:</h1>
                <CKEditor
                    editor={Editor}
                    config={editorConfiguration}
                    data={initComment}
                    onChange={(event, editor) => {
                        const data = editor.getData();
                        setComment(data)
                    }}
                    uploadComplete={() => console.log('загрузка завершена')}
                />
            </Box>
        </>
    )
}

export default QuestionTextEditor;