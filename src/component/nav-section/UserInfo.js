import { Box, ClickAwayListener, Menu, MenuItem, Typography } from "@mui/material"
import { AnimatedIcon } from "../../layouts/navigator/styles";
import { useState } from "react";
import { Face } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import authService from "../../service/auth.service";
import { logout } from "../../store/session";
import { styled, alpha } from '@mui/material/styles';

const StyledAccount = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2, 2.5),
    borderRadius: Number(theme.shape.borderRadius) * 1.5,
    backgroundColor: alpha(theme.palette.grey[500], 0.12),
}));

export const UserInfo = (props) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);

    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    async function handleLogout() {
        try {
            await authService.logout();
            dispatch(logout());

        } catch (error) {
            console.log(error);
            dispatch(logout());
        }
    }

    return (
        <StyledAccount>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Box sx={{ ml: 2, maxWidth: 150 }}>
                    <Typography variant="subtitle2" sx={{ color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {props.firstName}
                    </Typography>
                    <Typography variant="subtitle2" sx={{ color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {props.lastName}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Пользователь
                    </Typography>
                </Box>
                <AnimatedIcon
                    sx={{ ml: 5 }}
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    id="basic-button"
                    onClick={handleClick}
                >
                    <Face />
                </AnimatedIcon>
                <ClickAwayListener mouseEvent="onMouseDown" touchEvent="onTouchStart" onClickAway={handleClose}>
                    <Menu
                        id="basic-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        MenuListProps={{
                            'aria-labelledby': 'basic-button',
                        }}
                    >
                        <MenuItem onClick={handleLogout}>Выйти</MenuItem>
                    </Menu>
                </ClickAwayListener>
            </Box>
        </StyledAccount>
    )
}