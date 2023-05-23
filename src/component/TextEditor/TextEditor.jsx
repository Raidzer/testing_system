import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Box } from '@mui/material';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { useEffect, useState } from 'react';
import { IsLoading } from '../IsLoading';

const editorConfiguration = {
    toolbar: {
        shouldNotGroupWhenFull: true,
    }
};

function TextEditor(props) {
    const {
        initData,
    } = props;
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setIsLoading(false);
        }, 5000);
    }, []);

    return (
        <>
            {isLoading ? <IsLoading /> :
                <Box
                    sx={{
                        width: '100%',
                        minHeight: '300px',
                    }}>
                    <h2>Редактор глав</h2>
                    <CKEditor
                        editor={Editor}
                        config={editorConfiguration}
                        data={initData}
                        onReady={editor => {
                            console.log('Editor готов', editor);
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
            }
        </>

    )
}

export default TextEditor;