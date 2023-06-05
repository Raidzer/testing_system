import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { loadingDataThemes } from "../../store/themes";
import utilsString from "../../utils/utilsString";
import { useTranslation } from "react-i18next";
import AlertClose from "../Alert/AlertClose";
import TextFieldWithError from "../TextField/TextFieldWithError";

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
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        setTextFieldValue(selected[0])
    }, [selected[0]])

    const closeModal = () => {
        hundleClickCloseModal();
        setTextFieldValueDuplicate(false);
        setTextFieldValueEmpty(false);
    }

    const hundleClickCreate = async () => {
        setIsLoading(true);
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
        setTimeout(() => {
            setIsLoading(false);
        }, 100)
    }

    const hundleClickUpdate = async () => {
        setIsLoading(true);
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
            setTextFieldValueDuplicate(false);
            setTextFieldValueEmpty(true)
        }
        setTimeout(() => {
            setIsLoading(false);
        }, 100)
    }

    const hundleChangeTextModal = (value) => {
        setTextFieldValue(value)
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
                {textFieldValueDuplicate ?
                    <AlertClose text={labelErrorText()} /> : null}
                <TextFieldWithError
                    id="name"
                    label={modalOptions.label}
                    name="name"
                    autoFocus={true}
                    defaultValue={selected[0]}
                    onChange={hundleChangeTextModal}
                    sendField={isLoading}
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
