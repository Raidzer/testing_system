import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadingDataThemes } from "../../store/themes";


export default function CreateModal(props) {
    const {
        openForm,
        hundleClickCloseModal,
        modalOptions,
    } = props;

    const [textFieldValue, setTextFieldValue] = useState('');
    const [textFieldValueEmpty, setTextFieldValueEmpty] = useState(false);
    const [textFieldValueDuplicate, setTextFieldValueDuplicate] = useState(false);
    const dispatch = useDispatch();

    const closeModal = () => {
        hundleClickCloseModal();
        setTextFieldValueDuplicate(false);
        setTextFieldValueEmpty(false);
    }

    const hundleClickCreate = async () => {
        if (textFieldValue) {
            await modalOptions.createElement(textFieldValue)
            await dispatch(loadingDataThemes());
            closeModal();
        } else {
            setTextFieldValueEmpty(true)
        }

    }

    const hundleChangeTextModal = (event) => {
        setTextFieldValue(event.target.value)
    }

    const labelErrorText = () => {
        if (textFieldValueEmpty) {
            return "Введите название!"
        } else if (textFieldValueDuplicate) {
            return "Такое имя уже существует!"
        } else {
            return modalOptions.label;
        }
    }

    return (
        <Dialog open={openForm}>
            <DialogTitle>{modalOptions.title}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {modalOptions.contentText}
                </DialogContentText>
                <TextField
                    error={textFieldValueDuplicate || textFieldValueEmpty}
                    autoFocus
                    margin="dense"
                    id="name"
                    label={labelErrorText()}
                    fullWidth
                    variant="standard"
                    onChange={hundleChangeTextModal}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal}>Отменить</Button>
                <Button onClick={hundleClickCreate}>Создать</Button>
            </DialogActions>
        </Dialog>
    )
}
