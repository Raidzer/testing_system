import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadingDataThemes } from "../../store/themes";


export default function CreateModal(props) {
    const {
        openForm,
        hundleClickCloseModal,
        modalOptions,
        selected,
        idSelected,
    } = props;

    const [textFieldValue, setTextFieldValue] = useState(selected[0]);
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
            try {
                await modalOptions.createElement(textFieldValue, idSelected[0])
                await dispatch(loadingDataThemes());
                closeModal();
            } catch (error) {
                setTextFieldValueDuplicate(true);
            }
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
            <DialogTitle>
                {idSelected[0] ?
                    modalOptions.titleChange :
                    modalOptions.titleNew
                }
            </DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {modalOptions.contentText}
                </DialogContentText>
                <TextField
                    error={textFieldValueDuplicate || textFieldValueEmpty}
                    autoFocus
                    margin="dense"
                    id="name"
                    defaultValue={selected[0]}
                    label={labelErrorText()}
                    fullWidth
                    variant="standard"
                    onChange={hundleChangeTextModal}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={closeModal}>Отменить</Button>
                <Button onClick={hundleClickCreate}>
                    {idSelected[0] ? "Изменить" : "Создать"}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
