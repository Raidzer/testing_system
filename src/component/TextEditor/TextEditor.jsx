import { CKEditor } from '@ckeditor/ckeditor5-react';
import { Box } from '@mui/material';
import Editor from 'ckeditor5-custom-build/build/ckeditor';
import { useEffect, useState } from 'react';
import { IsLoading } from '../IsLoading';

const editorConfiguration = {
    toolbar: {
        shouldNotGroupWhenFull: true,
    },
    simpleUpload: {
        uploadUrl: 'http://localhost',
        headers: {
            'X-CSRF-TOKEN': 'CSRF-Token',
            Authorization: 'Bearer <JSON Web Token>'
        },
    },
    image: {
        upload: {
            types: ['png', 'gif', 'jpeg']
        }
    }
}

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
                        onChange={(event, editor) => {
                            const data = editor.getData();
                            console.log({ event, editor, data });
                        }}
                    />
                </Box>
            }
        </>

    )
}

export default TextEditor;