import { Button, Dialog, DialogActions, DialogTitle, Slide } from "@mui/material";
import { forwardRef } from "react";
import pressButton from "../../utils/pressButton";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function ErrorModal(props) {
    const {
        hundleClickCloseErrorModal,
        titleText,
        open,
    } = props;

    const closeModal = () => {
        hundleClickCloseErrorModal();
    }

    const handleKeyPress = (event) => {
        if (pressButton.pressESC(event)) {
            closeModal();
        }
    };

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={closeModal}
                aria-describedby="alert-dialog-slide-description"
                maxWidth={'xl'}
                onKeyDown={handleKeyPress}
            >
                <DialogTitle style={{ textAlign: 'center' }}>
                    {titleText}
                </DialogTitle>
                <DialogActions style={{ justifyContent: 'center' }}>
                    <div>
                        <Button onClick={closeModal}>ОК</Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}