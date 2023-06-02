import { Alert, Collapse, IconButton } from "@mui/material";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';

export default function AlertClose(props) {
    const { text } = props;
    const [open, setOpen] = useState(true);

    return (
        <>
            <Collapse in={open}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpen(false);
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                >
                    {text}
                </Alert>
            </Collapse>
        </>
    )
}