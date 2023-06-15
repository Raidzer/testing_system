import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Box } from '@mui/material';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { useEffect, useState } from 'react';
import { IsLoading } from '../../IsLoading';
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
    } = props;
    const [isLoading, setIsLoading] = useState(true);
    const { idArticle, idTheme, idQuestion } = useParams()
    const [description, setDescription] = useState(initData);

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

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, []);

    return (
        <>
            {isLoading ? <IsLoading /> :
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
                    />
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
                </Box>
            }
        </>

    )
}

export default QuestionTextEditor;