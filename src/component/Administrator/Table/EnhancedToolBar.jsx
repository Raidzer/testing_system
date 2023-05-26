import { LibraryAdd, Mode } from "@mui/icons-material";
import {
    Button,
    ClickAwayListener,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    IconButton,
    Menu,
    MenuItem,
    TextField,
    Toolbar,
    Tooltip,
    Typography,
    alpha
} from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loadingDataThemes } from "../../../store/themes";
import { createNewTheme, deleteTheme } from "../../../service/admin.service";

export default function EnhancedTableToolbar(props) {
    const {
        selected,
        title,
        lableActionButton,
        menuItems,
        getData,
        idSelected,
        modalOptions,
    } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const [openForm, setOpenForm] = useState(false);
    const [textFieldValue, setTextFieldValue] = useState('');
    const dispatch = useDispatch();
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClickMenuItem = () => {
        handleClose();
        if (getData) {
            getData();
        }
    }

    const hundleClickOpenModal = () => {
        setOpenForm(true)
    }

    const hundleClickCloseModal = () => {
        setOpenForm(false)
    }

    const hundleChangeTextModal = (event) => {
        setTextFieldValue(event.target.value)
    }

    const hundleClickCreate = async () => {
        await createNewTheme(textFieldValue)
        await dispatch(loadingDataThemes());
        hundleClickCloseModal();
    }

    const hundleClickDelete = async (idSelected) => {
        await Promise.all(idSelected.map(async (id) => {
            await deleteTheme(id);
        }));
        dispatch(loadingDataThemes())
    }

    return (
        <Toolbar
            sx={{
                pl: { sm: 2 },
                pr: { xs: 1, sm: 1 },
                ...(selected.length > 0 && {
                    bgcolor: (theme) =>
                        alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
                }),
            }}
        >
            {selected.length > 0 ? (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    color="inherit"
                    variant="subtitle1"
                    component="div"
                >
                    {selected}
                </Typography>
            ) : (
                <Typography
                    sx={{ flex: '1 1 100%' }}
                    variant="h6"
                    id="tableTitle"
                    component="div"
                >
                    {title}
                </Typography>
            )}
            {selected.length > 0 ? (
                <>
                    <Tooltip title={`Изменить ${lableActionButton}`}>
                        <IconButton onClick={handleClick}>
                            <Mode />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={`Удалить ${lableActionButton}`}>
                        <IconButton onClick={() => hundleClickDelete(idSelected)}>
                            <DeleteIcon />
                        </IconButton>
                    </Tooltip>
                    <ClickAwayListener
                        mouseEvent="onMouseDown"
                        touchEvent="onTouchStart"
                        onClickAway={handleClose}
                    >
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            {menuItems.map((item, index) => {
                                return (
                                    <MenuItem
                                        component={Link}
                                        to={item.to}
                                        onClick={handleClickMenuItem}
                                        key={index}
                                    >
                                        {item.text}
                                    </MenuItem>
                                )
                            })}
                        </Menu>
                    </ClickAwayListener>
                </>
            ) : (
                <Tooltip title={`Добавить ${lableActionButton}`}>
                    <IconButton onClick={hundleClickOpenModal}>
                        <LibraryAdd />
                    </IconButton>
                </Tooltip>
            )}
            {modalOptions ?
                <Dialog open={openForm} onClose={handleClose}>
                    <DialogTitle>{modalOptions.title}</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            {modalOptions.contentText}
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            label={modalOptions.label}
                            fullWidth
                            variant="standard"
                            onChange={hundleChangeTextModal}
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={hundleClickCloseModal}>Отменить</Button>
                        <Button onClick={hundleClickCreate}>Создать</Button>
                    </DialogActions>
                </Dialog> : null
            }

        </Toolbar>
    );
}