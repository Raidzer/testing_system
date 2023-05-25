import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Box } from '@mui/material';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { useEffect, useState } from 'react';
import { IsLoading } from '../IsLoading';
import uploadFileAdapterCKEditor from './adapterUpload';
import { useParams } from 'react-router';

function TextEditor(props) {
    const {
        initData,
    } = props;
    const [isLoading, setIsLoading] = useState(true);
    const { idArticle, idTheme, idQuestion } = useParams()

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
                    }}>
                    <h2>Редактор глав</h2>
                    <CKEditor
                        editor={Editor}
                        config={editorConfiguration}
                        data={initData}
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log({ data });
                        }}
                        uploadComplete={() => console.log('загрузка завершена')}
                    />
                </Box>
            }
        </>

    )
}

export default TextEditor;