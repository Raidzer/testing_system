import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { loadingDataThemes } from "../../store/themes";
import utilsString from "../../utils/utilsString";
import { useTranslation } from "react-i18next";


export default function CreateModal(props) {
    const {
        openForm,
        hundleClickCloseModal,
        modalOptions,
        selected,
        idSelected,
        idTheme,
    } = props;

    const [textFieldValue, setTextFieldValue] = useState(selected[0]);
    const [textFieldValueEmpty, setTextFieldValueEmpty] = useState(false);
    const [textFieldValueDuplicate, setTextFieldValueDuplicate] = useState(false);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    const closeModal = () => {
        hundleClickCloseModal();
        setTextFieldValueDuplicate(false);
        setTextFieldValueEmpty(false);
    }

    const hundleClickCreate = async () => {
        if (!utilsString.isEmptyString(textFieldValue)) {
            try {
                await modalOptions
                    .createElement({
                        title: textFieldValue,
                        id: idSelected[0],
                        idTheme,
                    })
                await dispatch(loadingDataThemes());
                closeModal();
            } catch (error) {
                setTextFieldValueDuplicate(true);
            }
        } else {
            setTextFieldValueEmpty(true)
        }
    }

    const hundleClickUpdate = async () => {
        if (!utilsString.isEmptyString(textFieldValue)) {
            try {
                await modalOptions
                    .updateElement({
                        title: textFieldValue,
                        id: idSelected[0],
                        idTheme,
                    })
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
            return t('modal_window.error.empty_text')
        } else if (textFieldValueDuplicate) {
            return t('modal_window.error.duplicate_text')
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
                <Button onClick={closeModal}>{t("cancel")}</Button>
                <Button onClick={
                    idSelected[0] ? hundleClickUpdate : hundleClickCreate
                }>
                    {idSelected[0] ? t('change') : t("save")}
                </Button>
            </DialogActions>
        </Dialog>
    )
}
