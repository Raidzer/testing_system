import { TextField } from "@mui/material";
import { useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import utilsString from "../../utils/utilsString";


export default function TextFieldWithError(props) {
    const {
        id,
        label,
        name,
        autoComplete,
        disabled,
        sendField,
        autoFocus,
        required,
        InputProps,
        type,
    } = props
    const [isEmpty, setIsEmpty] = useState(false);
    const [text, setText] = useState('');
    const { t } = useTranslation();

    useEffect(() => {
        if (sendField) {
            checkEmptyField(text);
        }
    }, [sendField])

    const checkEmptyField = (str) => {
        setIsEmpty(utilsString.isEmptyString(str))
    }

    const hundleChange = (e) => {
        setText(e.target.value);
    }

    return (
        <TextField
            margin="normal"
            error={isEmpty}
            helperText={isEmpty ? t('modal_window.error.empty_text') : ""}
            required={required}
            fullWidth
            id={id}
            label={label}
            name={name}
            autoComplete={autoComplete}
            autoFocus={autoFocus}
            disabled={disabled}
            onChange={hundleChange}
            InputProps={InputProps}
            type={type}
        />
    )
}