import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Box, Button } from '@mui/material';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { useDispatch, useSelector } from 'react-redux';
import { getDataArticle, getDataLesson } from '../../store/lesson';

const editorConfiguration = {
    toolbar: {
        shouldNotGroupWhenFull: true,
    }
};

function TextEditor() {
    const dispatch = useDispatch();
    const { description } = useSelector(getDataLesson())

    const handleClick = () => {
        dispatch(getDataArticle({
            payload: {
                id: 6,
            }
        }));
        console.log(description);
    }

    return (
        <Box
            sx={{
                width: '100%',
                minHeight: '300px',
            }}>
            <Button onClick={handleClick}>Кнопка получения данных</Button>
            <h2>Редактор глав</h2>
            <CKEditor
                editor={Editor}
                config={editorConfiguration}
                data={description}
                onReady={editor => {
                    console.log('Editor is ready to use!', editor);
                }}
                onChange={(event, editor) => {
                    const data = editor.getData();
                    console.log({ event, editor, data });
                }}
                onBlur={(event, editor) => {
                    console.log('Blur.', editor);
                }}
                onFocus={(event, editor) => {
                    console.log('Focus.', editor);
                }}
            />
        </Box>
    )
}

export default TextEditor;