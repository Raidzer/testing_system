import {
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    Slide
} from "@mui/material";
import { forwardRef } from "react";
import { presESC, presEnter } from "../../utils/pressButton";

const Transition = forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

export default function DeleteModal(props) {
    const {
        open,
        hundleClickCloseDeleteModal,
        confirmDelete,
        titleText,
    } = props;

    const closeModal = () => {
        hundleClickCloseDeleteModal();
    }

    const hundleClickConfirmDelete = () => {
        confirmDelete();
        closeModal();
    }

    const hundleKeyDown = (event) => {
        if (presEnter(event)) {
            hundleClickConfirmDelete();
        } else if (presESC(event)) {
            closeModal();
        }
    }

    return (
        <div>
            <Dialog
                open={open}
                TransitionComponent={Transition}
                keepMounted
                onClose={closeModal}
                aria-describedby="alert-dialog-slide-description"
                onKeyDown={hundleKeyDown}
            >
                <DialogTitle>{titleText}</DialogTitle>
                <DialogActions style={{ justifyContent: 'space-between' }}>
                    <div>
                        <Button onClick={hundleClickConfirmDelete}>Да</Button>
                    </div>
                    <div>
                        <Button onClick={closeModal}>Нет</Button>
                    </div>
                </DialogActions>
            </Dialog>
        </div>
    );
}