import { LibraryAdd, Mode, Settings } from "@mui/icons-material";
import {
    ClickAwayListener,
    IconButton,
    Menu,
    MenuItem,
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
import CreateModal from "../../Modal/CreateModal";
import ButtonGoBack from "../../Button/ButtonGoBack";
import { useTranslation } from "react-i18next";
import DeleteModal from "../../Modal/DeleteModal";

export default function EnhancedTableToolbar(props) {
    const {
        selected,
        title,
        lableActionButton,
        menuItems,
        idSelected,
        modalOptions,
        deleteElement,
        idTheme,
        titleDeleteModalText,
    } = props;

    const [anchorEl, setAnchorEl] = useState(null);
    const [openNameModal, setOpenNameModal] = useState(false);
    const [openDeleteModal, setOpenDeleteModal] = useState(false);
    const dispatch = useDispatch();
    const open = Boolean(anchorEl);
    const { t } = useTranslation();

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const hundleClickOpenNameModal = () => {
        setOpenNameModal(true);
    }

    const hundleClickCloseNameModal = () => {
        setOpenNameModal(false);
    }

    const hundleClickOpenDeleteModal = (event) => {
        event.currentTarget.blur();
        setOpenDeleteModal(true);
    }

    const hundleClickCloseDeleteModal = () => {
        setOpenDeleteModal(false);
    }

    const hundleClickDelete = async (idSelected) => {
        await Promise.all(idSelected.map(async (id) => {
            await deleteElement({ id, idTheme });
        }));
        dispatch(loadingDataThemes());
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
                    <Tooltip title={t("rename")}>
                        <IconButton onClick={hundleClickOpenNameModal}>
                            <Mode />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={`${t("setting")} ${lableActionButton}`}>
                        <IconButton onClick={handleClick}>
                            <Settings />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title={`${t('delete')} ${lableActionButton}`}>
                        <IconButton onClick={(event) => hundleClickOpenDeleteModal(event)}>
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
                <>
                    <ButtonGoBack />
                    <Tooltip title={`${t("add")} ${lableActionButton}`}>
                        <IconButton onClick={hundleClickOpenNameModal}>
                            <LibraryAdd />
                        </IconButton>
                    </Tooltip>
                </>
            )}
            {modalOptions ?
                <CreateModal
                    openForm={openNameModal}
                    hundleClickCloseModal={hundleClickCloseNameModal}
                    modalOptions={modalOptions}
                    selected={selected}
                    idSelected={idSelected}
                    idTheme={idTheme}
                /> : null
            }
            <DeleteModal
                open={openDeleteModal}
                hundleClickCloseDeleteModal={hundleClickCloseDeleteModal}
                confirmDelete={() => hundleClickDelete(idSelected)}
                titleText={titleDeleteModalText}
            />
        </Toolbar>
    );
}