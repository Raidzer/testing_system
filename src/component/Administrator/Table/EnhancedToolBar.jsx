import { LibraryAdd, Mode } from "@mui/icons-material";
import { ClickAwayListener, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography, alpha } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import { useState } from "react";
import { Link } from "react-router-dom";

export default function EnhancedTableToolbar(props) {
    const {
        selected,
        title,
        lableActionButton,
        idSelected
    } = props;
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
        console.log(selected)
    };

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
                        <IconButton>
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
                            <MenuItem
                                component={Link}
                                to={`/administrator/theme/${idSelected}/articles`}
                                onClick={handleClose}
                            >
                                Изменить главу
                            </MenuItem>
                            <MenuItem
                                component={Link}
                                to={`/administrator/theme/${idSelected}/questions`}
                                onClick={handleClose}
                            >
                                Изменить вопросы
                            </MenuItem>
                        </Menu>
                    </ClickAwayListener>
                </>
            ) : (
                <Tooltip title={`Добавить ${lableActionButton}`}>
                    <IconButton>
                        <LibraryAdd />
                    </IconButton>
                </Tooltip>
            )}
        </Toolbar>
    );
}