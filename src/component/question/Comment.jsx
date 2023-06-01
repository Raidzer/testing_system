import { useDispatch, useSelector } from "react-redux";
import { getCommentMistake, loadingDataQuestionFromTest } from "../../store/question";
import { useState } from "react";
import { Box, Button, Modal } from "@mui/material";
import { useParams } from "react-router";
import localStorageService from "../../service/localStorage.service";
import { useTranslation } from "react-i18next";

export default function Comment() {
    const commentMistake = useSelector(getCommentMistake());
    const [openModal, setOpenModal] = useState(true);
    const dispatch = useDispatch();
    const { idTheme } = useParams();
    const { t } = useTranslation();
    let jsessionId = localStorageService.getSessionQuestionId();


    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        pt: 2,
        px: 4,
        pb: 3,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    };

    const handleClose = async () => {
        await dispatch(loadingDataQuestionFromTest({
            payload: {
                jsessionId,
                'idTheme': `/${idTheme}`,
            }
        }));
        setOpenModal(false);

    }

    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleClose}
                aria-labelledby="parent-modal-title"
                aria-describedby="parent-modal-description"
            >
                <Box sx={{ ...style, width: 500 }}>
                    <h2 id="parent-modal-title">{t('exam_panel.no_correct_answer')}</h2>
                    <p id="parent-modal-description">
                        {commentMistake}
                    </p>
                    <Button
                        onClick={() => handleClose()}
                        sx={{
                            mt: 2,
                        }}
                    >
                        {t('exam_panel.next_question')} </Button>
                </Box>
            </Modal>
        </div >
    )
}